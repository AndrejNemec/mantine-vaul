import { useCallback, useEffect, useLayoutEffect, useRef, useState, type PointerEvent, type ReactNode } from 'react'
import { BORDER_RADIUS, CLOSE_THRESHOLD, DRAG_CLASS, NESTED_DISPLACEMENT, SCROLL_LOCK_TIMEOUT, TRANSITIONS, VELOCITY_THRESHOLD, WINDOW_TOP_OFFSET } from './utils/constants'
import type { ScrollAreaComponent, VaulClasses } from './utils'
import { VaulContextProvider, dampenValue, getElement, getSetValueByIndex, getTranslate, isVertical, reset, set, useVaulContext } from './utils'
import type { ExtendComponent, Factory, MantineRadius, MantineThemeComponent, PortalProps, StylesApiProps } from '@mantine/core'
import { Box, Portal, createVarsResolver, getRadius, useProps, useStyles } from '@mantine/core'
import { isIOS, isInput, usePositionFixed, usePreventScroll, useSnapPoints } from './hooks'
import { useFocusReturn, useId, useWindowEvent } from '@mantine/hooks'
import classes from './vaul.module.css'
import { VaulContent } from './VaulContent'
import { VaulOverlay } from './VaulOverlay'
import { VaulHandler } from './VaulHandler'
import { VaulHeader } from './VaulHeader'
import { VaulTitle } from './VaulTitle'
import { VaulBody } from './VaulBody'
import { VaulFooter } from './VaulFooter'

export type VaulRootStylesNames =
    | 'root'
    | 'content'
    | 'overlay'
    | 'header'
    | 'title'
    | 'handler'
    | 'body'
    | 'footer'

export type VaulRootCssVariables = {
    root: '--vaul-radius' | '--vaul-z-index' | '--vaul-handler-radius' | '--vaul-overlay-z-index'
}

export interface BaseVaulRootProps {
    activeSnapPoint?: number | string | null
    setActiveSnapPoint?: (snapPoint: number | string | null) => void
    open?: boolean
    closeThreshold?: number
    onOpenChange?: (open: boolean) => void
    shouldScaleBackground?: boolean
    scrollLockTimeout?: number
    fixed?: boolean
    dismissible?: boolean
    onDrag?: (event: PointerEvent<HTMLDivElement>, percentageDragged: number) => void
    onRelease?: (event: PointerEvent<HTMLDivElement>, open: boolean) => void
    onClose?: () => void
    direction?: 'top' | 'bottom' | 'left' | 'right'
    preventScrollRestoration?: boolean
    disablePreventScroll?: boolean
    portalTarget?: PortalProps['target']
    root?: string | HTMLElement
    closeOnOutsideClick?: boolean
    closeOnEscape?: boolean
    snapPoints?: (number | string)[]
    fadeFromIndex?: number
    radius?: MantineRadius
    handlerRadius?: MantineRadius
    zIndex?: number
    handlerZIndex?: number
    scrollAreaComponent?: ScrollAreaComponent
    id?: string
    trapFocus?: boolean
    returnFocus?: boolean
}

export interface VaulRootProps extends BaseVaulRootProps, StylesApiProps<VaulRootFactory> {
    __staticSelector?: string
    children: ReactNode
}

export type VaulRootFactory = Factory<{
    props: VaulRootProps
    stylesNames: VaulRootStylesNames
    vars: VaulRootCssVariables
}>

const varsResolver = createVarsResolver<VaulRootFactory>(
    // eslint-disable-next-line no-empty-pattern
    (_, { radius, handlerRadius, zIndex, handlerZIndex }) => ({
        root: {
            '--vaul-radius': radius === undefined ? undefined : getRadius(radius),
            '--vaul-z-index': zIndex === undefined ? undefined : `${zIndex}`,
            '--vaul-handler-radius': radius === undefined ? undefined : getRadius(handlerRadius),
            '--vaul-overlay-z-index': handlerZIndex === undefined ? undefined : `${handlerZIndex - 1}`,
        },
    })
)

const defaultProps: Omit<VaulRootProps, 'children'> = {
    __staticSelector: 'VaulRoot',
    open: false,
    shouldScaleBackground: false,
    closeThreshold: CLOSE_THRESHOLD,
    scrollLockTimeout: SCROLL_LOCK_TIMEOUT,
    dismissible: true,
    direction: 'bottom',
    preventScrollRestoration: true,
    disablePreventScroll: false,
    closeOnEscape: true,
    closeOnOutsideClick: true,
    fadeFromIndex: undefined,
    root: '[data-mantine-vaul-wrapper]',
    trapFocus: true,
    returnFocus: true
}

const openedVauls = new Set<string>()

const InternalVaulRoot = ({ nested = false, ..._props }: VaulRootProps & { nested?: boolean, }) => {
    const props = useProps('VaulRoot', defaultProps, _props)

    const {
        __staticSelector,
        open: openProp,
        onOpenChange,
        scrollAreaComponent,
        children,
        shouldScaleBackground,
        onDrag: onDragProp,
        onRelease: onReleaseProp,
        snapPoints,
        closeThreshold = CLOSE_THRESHOLD,
        scrollLockTimeout = SCROLL_LOCK_TIMEOUT,
        dismissible = true,
        fadeFromIndex = snapPoints ? snapPoints.length - 1 : undefined,
        activeSnapPoint: activeSnapPointProp,
        setActiveSnapPoint: setActiveSnapPointProp,
        fixed,
        onClose,
        direction = 'bottom',
        preventScrollRestoration = true,
        disablePreventScroll = false,
        portalTarget,
        closeOnEscape = true,
        closeOnOutsideClick = true,
        classNames,
        styles,
        unstyled,
        vars,
        variant = 'default',
        id,
        root,
        trapFocus,
        returnFocus
    } = props

    const vaulUid = useId(id)
    const [isOpen = false, setIsOpen] = useState<boolean>(false)
    const [hasBeenOpened, setHasBeenOpened] = useState<boolean>(false)
    const [visible, setVisible] = useState<boolean>(false)
    const [mounted, setMounted] = useState<boolean>(false)
    const [isDragging, setIsDragging] = useState<boolean>(false)
    const [justReleased, setJustReleased] = useState<boolean>(false)
    const overlayRef = useRef<HTMLDivElement>(null)
    const openTime = useRef<Date | null>(null)
    const dragStartTime = useRef<Date | null>(null)
    const dragEndTime = useRef<Date | null>(null)
    const lastTimeDragPrevented = useRef<Date | null>(null)
    const isAllowedToDrag = useRef<boolean>(false)
    const nestedOpenChangeTimer = useRef<NodeJS.Timeout | null>(null)
    const pointerStart = useRef(0)
    const keyboardIsOpen = useRef(false)
    const previousDiffFromInitial = useRef(0)
    const drawerRef = useRef<HTMLDivElement>(null)
    const drawerHeightRef = useRef(drawerRef.current?.getBoundingClientRect().height || 0)
    const initialDrawerHeight = useRef(0)

    const getStyles = useStyles<VaulRootFactory>({
        name: __staticSelector!,
        classes,
        props,
        classNames,
        styles,
        unstyled,
        vars,
        varsResolver,
    })

    const onSnapPointChange = useCallback((activeSnapPointIndex: number) => {
        // Change openTime ref when we reach the last snap point to prevent dragging for 500ms incase it's scrollable.
        if (snapPoints && activeSnapPointIndex === snapPointsOffset.length - 1) {
            openTime.current = new Date()
        }
    }, [])

    useWindowEvent(
        'keydown',
        (event) => {
            if (event.key === 'Escape' && closeOnEscape) {
                if (openedVauls.has(vaulUid) && getSetValueByIndex(openedVauls, openedVauls.size - 1) === vaulUid) {
                    const shouldTrigger =
                        (event.target as HTMLElement)?.getAttribute('data-mantine-stop-propagation') !== 'true'
                    shouldTrigger && closeDrawer()
                }
            }
        },
        { capture: true }
    )

    useFocusReturn({ opened: isOpen, shouldReturnFocus: trapFocus && returnFocus })

    useEffect(() => {
        if (isOpen) {
            openedVauls.add(vaulUid)
        } else {
            openedVauls.delete(vaulUid)
        }
        return () => {
            openedVauls.delete(vaulUid)
        }
    }, [isOpen, vaulUid])

    const {
        activeSnapPoint,
        activeSnapPointIndex,
        setActiveSnapPoint,
        onRelease: onReleaseSnapPoints,
        snapPointsOffset,
        onDrag: onDragSnapPoints,
        shouldFade,
        getPercentageDragged: getSnapPointsPercentageDragged,
    } = useSnapPoints({
        snapPoints,
        activeSnapPointProp,
        setActiveSnapPointProp,
        drawerRef,
        fadeFromIndex: fadeFromIndex as number,
        overlayRef,
        onSnapPointChange,
        direction,
    })

    usePreventScroll({
        isDisabled: !isOpen || isDragging || justReleased || !hasBeenOpened || disablePreventScroll,
    })

    const { restorePositionSetting } = usePositionFixed({
        isOpen,
        modal: false,
        nested,
        hasBeenOpened,
        preventScrollRestoration,
    })

    function getScale() {
        return (window.innerWidth - WINDOW_TOP_OFFSET) / window.innerWidth
    }

    function onPress(event: PointerEvent<HTMLDivElement>) {
        if (!dismissible && !snapPoints) return
        if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) return
        drawerHeightRef.current = drawerRef.current?.getBoundingClientRect().height || 0
        setIsDragging(true)
        dragStartTime.current = new Date()

        // iOS doesn't trigger mouseUp after scrolling so we need to listen to touched in order to disallow dragging
        if (isIOS()) {
            window.addEventListener('touchend', () => (isAllowedToDrag.current = false), { once: true })
        }
        // Ensure we maintain correct pointer capture even when going outside of the drawer
        (event.target as HTMLElement).setPointerCapture(event.pointerId)

        pointerStart.current = isVertical(direction) ? event.clientY : event.clientX
    }

    function shouldDrag(el: EventTarget, isDraggingInDirection: boolean) {
        let element = el as HTMLElement
        const highlightedText = window.getSelection()?.toString()
        const swipeAmount = drawerRef.current ? getTranslate(drawerRef.current, direction) : null
        const date = new Date()

        if (element.hasAttribute('data-mantine-vaul-no-drag') || element.closest('[data-mantine-vaul-no-drag]')) {
            return false
        }

        if (direction === 'right' || direction === 'left') {
            return true
        }

        // Allow scrolling when animating
        if (openTime.current && date.getTime() - openTime.current.getTime() < 500) {
            return false
        }

        if (swipeAmount !== null) {
            if (direction === 'bottom' ? swipeAmount > 0 : swipeAmount < 0) {
                return true
            }
        }

        // Don't drag if there's highlighted text
        if (highlightedText && highlightedText.length > 0) {
            return false
        }

        // Disallow dragging if drawer was scrolled within `scrollLockTimeout`
        if (
            lastTimeDragPrevented.current &&
            date.getTime() - lastTimeDragPrevented.current.getTime() < scrollLockTimeout &&
            swipeAmount === 0
        ) {
            lastTimeDragPrevented.current = date
            return false
        }

        if (isDraggingInDirection) {
            lastTimeDragPrevented.current = date

            // We are dragging down so we should allow scrolling
            return false
        }

        // Keep climbing up the DOM tree as long as there's a parent
        while (element) {
            // Check if the element is scrollable
            if (element.scrollHeight > element.clientHeight) {
                if (element.scrollTop !== 0) {
                    lastTimeDragPrevented.current = new Date()

                    // The element is scrollable and not scrolled to the top, so don't drag
                    return false
                }

                if (element.getAttribute('role') === 'dialog') {
                    return true
                }
            }

            // Move up to the parent element
            element = element.parentNode as HTMLElement
        }

        // No scrollable parents not scrolled to the top found, so drag
        return true
    }

    function onDrag(event: PointerEvent<HTMLDivElement>) {
        if (!drawerRef.current) {
            return
        }
        // We need to know how much of the drawer has been dragged in percentages so that we can transform background accordingly
        if (isDragging) {
            const directionMultiplier = direction === 'bottom' || direction === 'right' ? 1 : -1
            const draggedDistance =
                (pointerStart.current - (isVertical(direction) ? event.clientY : event.clientX)) * directionMultiplier
            const isDraggingInDirection = draggedDistance > 0

            // Pre condition for disallowing dragging in the close direction.
            const noCloseSnapPointsPreCondition = snapPoints && !dismissible && !isDraggingInDirection

            // Disallow dragging down to close when first snap point is the active one and dismissible prop is set to false.
            if (noCloseSnapPointsPreCondition && activeSnapPointIndex === 0) return

            // We need to capture last time when drag with scroll was triggered and have a timeout between
            const absDraggedDistance = Math.abs(draggedDistance)
            const wrapper = getElement(root)

            // Calculate the percentage dragged, where 1 is the closed position
            let percentageDragged = absDraggedDistance / drawerHeightRef.current
            const snapPointPercentageDragged = getSnapPointsPercentageDragged(absDraggedDistance, isDraggingInDirection)

            if (snapPointPercentageDragged !== null) {
                percentageDragged = snapPointPercentageDragged
            }

            // Disallow close dragging beyond the smallest snap point.
            if (noCloseSnapPointsPreCondition && percentageDragged >= 1) {
                return
            }

            if (!isAllowedToDrag.current && !shouldDrag(event.target, isDraggingInDirection)) return
            drawerRef.current.classList.add(DRAG_CLASS)
            // If shouldDrag gave true once after pressing down on the drawer, we set isAllowedToDrag to true and it will remain true until we let go, there's no reason to disable dragging mid way, ever, and that's the solution to it
            isAllowedToDrag.current = true
            set(drawerRef.current, {
                transition: 'none',
            })

            set(overlayRef.current, {
                transition: 'none',
            })

            if (snapPoints) {
                onDragSnapPoints({ draggedDistance })
            }

            // Run this only if snapPoints are not defined or if we are at the last snap point (highest one)
            if (isDraggingInDirection && !snapPoints) {
                const dampenedDraggedDistance = dampenValue(draggedDistance)

                const translateValue = Math.min(dampenedDraggedDistance * -1, 0) * directionMultiplier
                set(drawerRef.current, {
                    transform: isVertical(direction)
                        ? `translate3d(0, ${translateValue}px, 0)`
                        : `translate3d(${translateValue}px, 0, 0)`,
                })
                return
            }

            const opacityValue = 1 - percentageDragged

            if (shouldFade || (fadeFromIndex && activeSnapPointIndex === fadeFromIndex - 1)) {
                onDragProp?.(event, percentageDragged)

                set(
                    overlayRef.current,
                    {
                        opacity: `${opacityValue}`,
                        transition: 'none',
                    },
                    true,
                )
            }

            if (!nested && wrapper && overlayRef.current && shouldScaleBackground) {
                // Calculate percentageDragged as a fraction (0 to 1)
                const scaleValue = Math.min(getScale() + percentageDragged * (1 - getScale()), 1)
                const borderRadiusValue = 8 - percentageDragged * 8

                const translateValue = Math.max(0, 14 - percentageDragged * 14)

                set(
                    wrapper,
                    {
                        borderRadius: `${borderRadiusValue}px`,
                        transform: isVertical(direction)
                            ? `scale(${scaleValue}) translate3d(0, ${translateValue}px, 0)`
                            : `scale(${scaleValue}) translate3d(${translateValue}px, 0, 0)`,
                        transition: 'none',
                    },
                    true,
                )
            }

            if (!snapPoints) {
                const translateValue = absDraggedDistance * directionMultiplier

                set(drawerRef.current, {
                    transform: isVertical(direction)
                        ? `translate3d(0, ${translateValue}px, 0)`
                        : `translate3d(${translateValue}px, 0, 0)`,
                })
            }
        }
    }

    useEffect(() => {
        return () => {
            scaleBackground(false)
            restorePositionSetting()
        }
    }, [])

    useEffect(() => {
        function onVisualViewportChange() {
            if (!drawerRef.current) return

            const focusedElement = document.activeElement as HTMLElement
            if (isInput(focusedElement) || keyboardIsOpen.current) {
                const visualViewportHeight = window.visualViewport?.height || 0
                // This is the height of the keyboard
                let diffFromInitial = window.innerHeight - visualViewportHeight
                const drawerHeight = drawerRef.current.getBoundingClientRect().height || 0
                if (!initialDrawerHeight.current) {
                    initialDrawerHeight.current = drawerHeight
                }
                const offsetFromTop = drawerRef.current.getBoundingClientRect().top

                // visualViewport height may change due to some subtle changes to the keyboard. Checking if the height changed by 60 or more will make sure that they keyboard really changed its open state.
                if (Math.abs(previousDiffFromInitial.current - diffFromInitial) > 60) {
                    keyboardIsOpen.current = !keyboardIsOpen.current
                }

                if (snapPoints && snapPoints.length > 0 && snapPointsOffset && activeSnapPointIndex) {
                    const activeSnapPointHeight = snapPointsOffset[activeSnapPointIndex] || 0
                    diffFromInitial += activeSnapPointHeight
                }

                previousDiffFromInitial.current = diffFromInitial
                // We don't have to change the height if the input is in view, when we are here we are in the opened keyboard state so we can correctly check if the input is in view
                if (drawerHeight > visualViewportHeight || keyboardIsOpen.current) {
                    const height = drawerRef.current.getBoundingClientRect().height
                    let newDrawerHeight = height

                    if (height > visualViewportHeight) {
                        newDrawerHeight = visualViewportHeight - WINDOW_TOP_OFFSET
                    }
                    // When fixed, don't move the drawer upwards if there's space, but rather only change it's height so it's fully scrollable when the keyboard is open
                    if (fixed) {
                        drawerRef.current.style.height = `${height - Math.max(diffFromInitial, 0)}px`
                    } else {
                        drawerRef.current.style.height = `${Math.max(newDrawerHeight, visualViewportHeight - offsetFromTop)}px`
                    }
                } else {
                    drawerRef.current.style.height = `${initialDrawerHeight.current}px`
                }

                if (snapPoints && snapPoints.length > 0 && !keyboardIsOpen.current) {
                    drawerRef.current.style.bottom = `0px`
                } else {
                    // Negative bottom value would never make sense
                    drawerRef.current.style.bottom = `${Math.max(diffFromInitial, 0)}px`
                }
            }
        }

        window.visualViewport?.addEventListener('resize', onVisualViewportChange)
        return () => window.visualViewport?.removeEventListener('resize', onVisualViewportChange)
    }, [activeSnapPointIndex, snapPoints, snapPointsOffset])

    function closeDrawer() {
        if (!drawerRef.current) return

        cancelDrag()

        onClose?.()
        set(drawerRef.current, {
            transform: isVertical(direction)
                ? `translate3d(0, ${direction === 'bottom' ? '100%' : '-100%'}, 0)`
                : `translate3d(${direction === 'right' ? '100%' : '-100%'}, 0, 0)`,
            transition: `transform ${TRANSITIONS.DURATION}s cubic-bezier(${TRANSITIONS.EASE.join(',')})`,
        })

        set(overlayRef.current, {
            opacity: '0',
            transition: `opacity ${TRANSITIONS.DURATION}s cubic-bezier(${TRANSITIONS.EASE.join(',')})`,
        })

        scaleBackground(false)

        setTimeout(() => {
            setVisible(false)
            setIsOpen(false)
        }, 300)

        setTimeout(() => {
            // reset(document.documentElement, 'scrollBehavior');
            if (snapPoints) {
                setActiveSnapPoint(snapPoints[0])
            }
        }, TRANSITIONS.DURATION * 1000) // seconds to ms
    }

    useEffect(() => {
        if (!isOpen && shouldScaleBackground) {
            if (nested) {
                return
            }
            const id = setTimeout(() => {
                reset(document.body)
            }, 200)

            return () => clearTimeout(id)
        }
    }, [isOpen, shouldScaleBackground])

    // LayoutEffect to prevent extra render where openProp and isOpen are not synced yet
    useLayoutEffect(() => {
        if (openProp) {
            setIsOpen(true)
            setHasBeenOpened(true)
        } else {
            closeDrawer()
        }
    }, [openProp])

    // This can be done much better
    useEffect(() => {
        if (mounted) {
            onOpenChange?.(isOpen)
        }
    }, [isOpen])

    useEffect(() => {
        setMounted(true)
    }, [])

    function resetDrawer() {
        if (!drawerRef.current) return
        const wrapper = getElement(root)
        const currentSwipeAmount = getTranslate(drawerRef.current, direction)

        set(drawerRef.current, {
            transform: 'translate3d(0, 0, 0)',
            transition: `transform ${TRANSITIONS.DURATION}s cubic-bezier(${TRANSITIONS.EASE.join(',')})`,
        })

        set(overlayRef.current, {
            transition: `opacity ${TRANSITIONS.DURATION}s cubic-bezier(${TRANSITIONS.EASE.join(',')})`,
            opacity: '1',
        })

        // Don't reset background if swiped upwards
        if (!nested && shouldScaleBackground && currentSwipeAmount && currentSwipeAmount > 0 && isOpen) {
            set(
                wrapper,
                {
                    borderRadius: `${BORDER_RADIUS}px`,
                    overflow: 'hidden',
                    ...(isVertical(direction)
                        ? {
                            transform: `scale(${getScale()}) translate3d(0, calc(env(safe-area-inset-top) + 14px), 0)`,
                            transformOrigin: 'top',
                        }
                        : {
                            transform: `scale(${getScale()}) translate3d(calc(env(safe-area-inset-top) + 14px), 0, 0)`,
                            transformOrigin: 'left',
                        }),
                    transitionProperty: 'transform, border-radius',
                    transitionDuration: `${TRANSITIONS.DURATION}s`,
                    transitionTimingFunction: `cubic-bezier(${TRANSITIONS.EASE.join(',')})`,
                },
                true,
            )
        }
    }

    function cancelDrag() {
        if (!isDragging || !drawerRef.current) return

        drawerRef.current.classList.remove(DRAG_CLASS)
        isAllowedToDrag.current = false
        setIsDragging(false)
        dragEndTime.current = new Date()
    }

    function onRelease(event: PointerEvent<HTMLDivElement>) {
        if (!isDragging || !drawerRef.current) return

        drawerRef.current.classList.remove(DRAG_CLASS)
        isAllowedToDrag.current = false
        setIsDragging(false)
        dragEndTime.current = new Date()
        const swipeAmount = getTranslate(drawerRef.current, direction)

        if (!shouldDrag(event.target, false) || !swipeAmount || Number.isNaN(swipeAmount)) return

        if (dragStartTime.current === null) return

        const timeTaken = dragEndTime.current.getTime() - dragStartTime.current.getTime()
        const distMoved = pointerStart.current - (isVertical(direction) ? event.clientY : event.clientX)
        const velocity = Math.abs(distMoved) / timeTaken

        if (velocity > 0.05) {
            // `justReleased` is needed to prevent the drawer from focusing on an input when the drag ends, as it's not the intent most of the time.
            setJustReleased(true)

            setTimeout(() => {
                setJustReleased(false)
            }, 200)
        }

        if (snapPoints) {
            const directionMultiplier = direction === 'bottom' || direction === 'right' ? 1 : -1
            onReleaseSnapPoints({
                draggedDistance: distMoved * directionMultiplier,
                closeDrawer,
                velocity,
                dismissible,
            })
            onReleaseProp?.(event, true)
            return
        }

        // Moved upwards, don't do anything
        if (direction === 'bottom' || direction === 'right' ? distMoved > 0 : distMoved < 0) {
            resetDrawer()
            onReleaseProp?.(event, true)
            return
        }

        if (velocity > VELOCITY_THRESHOLD) {
            closeDrawer()
            onReleaseProp?.(event, false)
            return
        }

        const visibleDrawerHeight = Math.min(drawerRef.current.getBoundingClientRect().height ?? 0, window.innerHeight)

        if (swipeAmount >= visibleDrawerHeight * closeThreshold) {
            closeDrawer()
            onReleaseProp?.(event, false)
            return
        }

        onReleaseProp?.(event, true)
        resetDrawer()
    }

    useEffect(() => {
        // Trigger enter animation without using CSS animation
        if (isOpen) {
            set(document.documentElement, {
                scrollBehavior: 'auto',
            })

            openTime.current = new Date()
            scaleBackground(true)
        }
    }, [isOpen])

    useEffect(() => {
        if (drawerRef.current && visible) {
            // Find all scrollable elements inside our drawer and assign a class to it so that we can disable overflow when dragging to prevent pointermove not being captured
            const children = drawerRef?.current?.querySelectorAll('*')
            children?.forEach((child: Element) => {
                const htmlChild = child as HTMLElement
                if (htmlChild.scrollHeight > htmlChild.clientHeight || htmlChild.scrollWidth > htmlChild.clientWidth) {
                    htmlChild.classList.add('vaul-scrollable')
                }
            })
        }
    }, [visible])

    function scaleBackground(open: boolean) {
        const wrapper = getElement(root)

        if (!wrapper || !shouldScaleBackground || nested) return

        if (open) {
            // setting original styles initially
            set(document.body, {
                background: document.body.style.backgroundColor || document.body.style.background,
            })
            // setting body styles, with cache ignored, so that we can get correct original styles in reset
            set(
                document.body,
                {
                    background: 'black',
                },
                true,
            )

            set(wrapper, {
                borderRadius: `${BORDER_RADIUS}px`,
                overflow: 'hidden',
                ...(isVertical(direction)
                    ? {
                        transform: `scale(${getScale()}) translate3d(0, calc(env(safe-area-inset-top) + 14px), 0)`,
                        transformOrigin: 'top',
                    }
                    : {
                        transform: `scale(${getScale()}) translate3d(calc(env(safe-area-inset-top) + 14px), 0, 0)`,
                        transformOrigin: 'left',
                    }),
                transitionProperty: 'transform, border-radius',
                transitionDuration: `${TRANSITIONS.DURATION}s`,
                transitionTimingFunction: `cubic-bezier(${TRANSITIONS.EASE.join(',')})`,
            })
        } else {
            // Exit
            reset(wrapper, 'overflow')
            reset(wrapper, 'transform')
            reset(wrapper, 'borderRadius')
            set(wrapper, {
                transitionProperty: 'transform, border-radius',
                transitionDuration: `${TRANSITIONS.DURATION}s`,
                transitionTimingFunction: `cubic-bezier(${TRANSITIONS.EASE.join(',')})`,
            })
        }
    }

    function onNestedOpenChange(o: boolean) {
        const scale = o ? (window.innerHeight - NESTED_DISPLACEMENT) / window.innerHeight : 1
        const y = o ? -NESTED_DISPLACEMENT : 0

        if (nestedOpenChangeTimer.current) {
            window.clearTimeout(nestedOpenChangeTimer.current)
        }

        set(drawerRef.current, {
            transition: `transform ${TRANSITIONS.DURATION}s cubic-bezier(${TRANSITIONS.EASE.join(',')})`,
            transform: `scale(${scale}) translate3d(0, ${y}px, 0)`,
        })

        if (!o && drawerRef.current) {
            nestedOpenChangeTimer.current = setTimeout(() => {
                const translateValue = getTranslate(drawerRef.current as HTMLElement, direction)
                set(drawerRef.current, {
                    transition: 'none',
                    transform: isVertical(direction)
                        ? `translate3d(0, ${translateValue}px, 0)`
                        : `translate3d(${translateValue}px, 0, 0)`,
                })
            }, 500)
        }
    }

    function onNestedDrag(event: PointerEvent<HTMLDivElement>, percentageDragged: number) {
        if (percentageDragged < 0) return

        const initialDim = isVertical(direction) ? window.innerHeight : window.innerWidth
        const initialScale = (initialDim - NESTED_DISPLACEMENT) / initialDim
        const newScale = initialScale + percentageDragged * (1 - initialScale)
        const newTranslate = -NESTED_DISPLACEMENT + percentageDragged * NESTED_DISPLACEMENT

        set(drawerRef.current, {
            transform: isVertical(direction)
                ? `scale(${newScale}) translate3d(0, ${newTranslate}px, 0)`
                : `scale(${newScale}) translate3d(${newTranslate}px, 0, 0)`,
            transition: 'none',
        })
    }

    function onNestedRelease(event: PointerEvent<HTMLDivElement>, o: boolean) {
        const dim = isVertical(direction) ? window.innerHeight : window.innerWidth
        const scale = o ? (dim - NESTED_DISPLACEMENT) / dim : 1
        const translate = o ? -NESTED_DISPLACEMENT : 0

        if (o) {
            set(drawerRef.current, {
                transition: `transform ${TRANSITIONS.DURATION}s cubic-bezier(${TRANSITIONS.EASE.join(',')})`,
                transform: isVertical(direction)
                    ? `scale(${scale}) translate3d(0, ${translate}px, 0)`
                    : `scale(${scale}) translate3d(${translate}px, 0, 0)`,
            })
        }
    }

    return (
        <VaulContextProvider
            value={{
                visible,
                activeSnapPoint,
                snapPoints,
                setActiveSnapPoint,
                drawerRef,
                overlayRef,
                scaleBackground,
                onOpenChange,
                onPress,
                setVisible,
                onRelease,
                onDrag,
                dismissible,
                isOpen,
                shouldFade,
                closeDrawer,
                onNestedDrag,
                onNestedOpenChange,
                onNestedRelease,
                keyboardIsOpen,
                openProp,
                snapPointsOffset,
                direction,
                closeOnEscape,
                closeOnOutsideClick,
                getStyles,
                variant,
                unstyled,
                uid: vaulUid,
                scrollAreaComponent,
                trapFocus: trapFocus!
            }}
        >
            <Portal target={portalTarget}>
                <Box
                    {...getStyles('root')}
                    id={vaulUid}
                    variant={variant}
                >
                    {isOpen ? children : null}
                </Box>
            </Portal>
        </VaulContextProvider>
    )
}

export const VaulRoot = ({ onDrag, onOpenChange, ...rest }: VaulRootProps) => {
    const context = useVaulContext(false)
    const { onNestedDrag, onNestedOpenChange, onNestedRelease } = context || {}

    if (context) {

        return (
            <InternalVaulRoot
                nested
                onClose={() => {
                    onNestedOpenChange?.(false)
                }}
                onDrag={(e, p) => {
                    onNestedDrag(e, p)
                    onDrag?.(e, p)
                }}
                onOpenChange={(o) => {
                    if (o) {
                        onNestedOpenChange?.(o)
                    }
                    onOpenChange?.(o)
                }}
                onRelease={onNestedRelease}
                {...rest as VaulRootProps}
            />
        )
    }

    return (
        <InternalVaulRoot
            {...rest}
            onDrag={onDrag}
            onOpenChange={onOpenChange}
            nested={false}
        />
    )
}

const extendVaul = (c: ExtendComponent<VaulRootFactory>): MantineThemeComponent => c

VaulRoot.displayName = 'mantine-vaul/VaulRoot'
VaulRoot.classes = classes as VaulClasses
VaulRoot.extend = extendVaul
VaulRoot.Root = VaulRoot
VaulRoot.Content = VaulContent
VaulRoot.Overlay = VaulOverlay
VaulRoot.Handler = VaulHandler
VaulRoot.Header = VaulHeader
VaulRoot.Title = VaulTitle
VaulRoot.Body = VaulBody
VaulRoot.Footer = VaulFooter