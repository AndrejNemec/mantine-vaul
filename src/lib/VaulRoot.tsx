import type { ComponentPropsWithRef } from 'react'
import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { VaulClasses } from './utils'
import { VaulContextProvider, throttle } from './utils'
import type { ExtendComponent, Factory, MantineRadius, MantineShadow, MantineThemeComponent, PortalProps, StylesApiProps } from '@mantine/core'
import { Box, Portal, RemoveScroll, createVarsResolver, getRadius, useProps, useStyles, getSize } from '@mantine/core'
import { useFocusReturn, useId, useUncontrolled } from '@mantine/hooks'
import classes from './vaul.module.css'
import { VaulContent } from './VaulContent'
import { VaulOverlay } from './VaulOverlay'
import { VaulHandler } from './VaulHandler'
import { VaulHeader } from './VaulHeader'
import { VaulTitle } from './VaulTitle'
import { VaulBody } from './VaulBody'
import { VaulFooter } from './VaulFooter'
import { setAttributeToElement, setVariableToElement } from './utils/styleHelpers'
import { AnimatePresence } from './AnimatePresence'

export type VaulRootStylesNames =
    | 'root'
    | 'content'
    | 'inner'
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
    id?: string

    defaultActiveSnapPointIndex?: number
    activeSnapPointIndex?: number
    setActiveSnapPointIndex?: (index: number) => void

    snapPoints?: Array<string | number>
    largestSnapPointWithoutOverlayIndex?: number
    expansionSwitchThreshold?: number

    dismissible?: boolean
    defaultOpened?: boolean
    opened?: boolean
    onClose?: (value: boolean) => void

    portalTarget?: PortalProps['target']

    closeOnOutsideClick?: boolean
    closeOnEscape?: boolean

    radius?: MantineRadius
    handlerRadius?: MantineRadius
    shadow?: MantineShadow

    zIndex?: number
    overlayZIndex?: number

    trapFocus?: boolean
    returnFocus?: boolean

    removeScrollProps?: ComponentPropsWithRef<typeof RemoveScroll>
}

export interface VaulRootProps extends BaseVaulRootProps, StylesApiProps<VaulRootFactory> {
    __staticSelector?: string
    children: ReactNode | ((props: { close: () => void, opened: boolean, }) => ReactNode)
}

export type VaulRootFactory = Factory<{
    props: VaulRootProps
    stylesNames: VaulRootStylesNames
    vars: VaulRootCssVariables
}>

const varsResolver = createVarsResolver<VaulRootFactory>(
    // eslint-disable-next-line no-empty-pattern
    (_, { radius, handlerRadius, zIndex, overlayZIndex, shadow }) => ({
        root: {
            '--vaul-radius': radius === undefined ? undefined : getRadius(radius),
            '--vaul-z-index': zIndex === undefined ? undefined : `${zIndex}`,
            '--vaul-handler-radius': radius === undefined ? undefined : getRadius(handlerRadius),
            '--vaul-overlay-z-index': overlayZIndex === undefined ? undefined : `${overlayZIndex}`,
            '--vaul-shadow': shadow === undefined ? undefined : getSize(shadow, 'vaul-shadow')
        },
    })
)

const defaultProps: Omit<VaulRootProps, 'children'> = {
    __staticSelector: 'VaulRoot',
    opened: false,
    closeOnEscape: true,
    closeOnOutsideClick: true,
    trapFocus: true,
    returnFocus: true,
    dismissible: true,
    largestSnapPointWithoutOverlayIndex: -1,
    expansionSwitchThreshold: 50,
    snapPoints: ['50%', '97%'],
    defaultActiveSnapPointIndex: 0
}

export const VaulRoot = (_props: VaulRootProps) => {
    const props = useProps('VaulRoot', defaultProps, _props)

    const {
        __staticSelector,
        children,
        id: idProp,

        defaultActiveSnapPointIndex: defaultActiveSnapPointIndexProp,
        activeSnapPointIndex: activeSnapPointIndexProp,
        setActiveSnapPointIndex: setActiveSnapPointIndexProp,

        snapPoints,
        largestSnapPointWithoutOverlayIndex,
        expansionSwitchThreshold,

        dismissible,
        opened,
        defaultOpened,
        onClose,

        portalTarget,

        closeOnOutsideClick,
        closeOnEscape,

        trapFocus,
        returnFocus,

        removeScrollProps,

        classNames,
        styles,
        unstyled,
        vars,
        variant = 'default'
    } = props

    const id = useId(idProp)

    const [value, onChange] = useUncontrolled<boolean>({
        value: opened,
        onChange: onClose,
        defaultValue: defaultOpened,
        finalValue: false,
    })

    const [activeSnapPointIndex, setActiveSnapPointIndex] = useUncontrolled<number>({
        value: activeSnapPointIndexProp,
        onChange: setActiveSnapPointIndexProp,
        defaultValue: defaultActiveSnapPointIndexProp,
        finalValue: 0,
    })

    const [viewportHeight, setViewportHeight] = useState<number>(typeof window !== 'undefined' ? window.innerHeight : 0)

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

    useFocusReturn({ opened: value, shouldReturnFocus: trapFocus && returnFocus })

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const resizeListener = throttle(() => {
                setViewportHeight(window.innerHeight)
            }, 100)
            setViewportHeight(window.innerHeight)
            window.addEventListener('resize', resizeListener)
            return () => {
                window.removeEventListener('resize', resizeListener)
            }
        }
    }, [])

    useEffect(() => {
        if (document.getElementById(id) && opened) {
            // Find all scrollable elements inside our drawer and assign a class to it so that we can disable overflow when dragging to prevent pointermove not being captured
            const children = document.getElementById(id)?.querySelectorAll('*')
            children?.forEach((child: Element) => {
                const htmlChild = child as HTMLElement
                if (htmlChild.scrollHeight > htmlChild.clientHeight || htmlChild.scrollWidth > htmlChild.clientWidth) {
                    htmlChild.classList.add(classes.mantineVaulScrollable)
                }
            })
        }
    }, [id, opened])

    const parsedSnapPoints = useMemo<number[]>(() => {
        return snapPoints!.map((d) => {
            if (typeof d === 'number') {
                return d
            } else if (typeof d === 'string') {
                if (!d.endsWith('%')) {
                    return undefined
                }
                const parsed = +d.slice(0, -1)
                if (Number.isNaN(parsed)) {
                    return undefined
                }
                return Math.round((parsed / 100) * viewportHeight)
            }
            return undefined
        }).filter((v) => v !== undefined) as number[]
    }, [snapPoints, viewportHeight])

    const currentSnapPoint = useMemo<number>(() => parsedSnapPoints[activeSnapPointIndex!], [activeSnapPointIndex, parsedSnapPoints])
    const largetsSnapPoint = useMemo<number>(() => parsedSnapPoints[parsedSnapPoints.length - 1], [parsedSnapPoints])
    const isLargestSnapPoint = useMemo<boolean>(() => activeSnapPointIndex === (parsedSnapPoints.length - 1), [activeSnapPointIndex, parsedSnapPoints.length])

    const handleDissmiss = useCallback(() => {
        if (dismissible) {
            setActiveSnapPointIndex(0)
            onChange?.(false)
        }
    }, [dismissible, onChange, setActiveSnapPointIndex])

    const shouldDrag = (target: HTMLElement) => {
        let element = target as HTMLElement
        const highlightedText = window.getSelection()?.toString()

        if (element.hasAttribute('data-mantine-vaul-no-drag') || element.closest('[data-mantine-vaul-no-drag]')) {
            return false
        }

        if (highlightedText && highlightedText.length > 0) {
            return false
        }

        while (element) {
            if (element.scrollHeight > element.clientHeight) {
                if (element.scrollTop !== 0) {
                    return false
                }
            }
            element = element.parentNode as HTMLElement
        }
        return true
    }

    const handleGestureMove = useCallback(({ y, event, source }: { y: number, event: TouchEvent, source: 'content' | 'header', }) => {
        if (!shouldDrag(event.target as HTMLElement) && source === 'content') {
            return
        }
        setAttributeToElement(document.getElementById(id)!, 'data-animate', 'false')
        const delta = y
        if (activeSnapPointIndex === (parsedSnapPoints.length - 1)) {
            setVariableToElement(document.getElementById(id)!, '--vaul-transform', `${delta >= 0 ? delta : 0}px`)
        } else {
            setVariableToElement(document.getElementById(id)!, '--vaul-transform', `${delta}px`)
        }
    }, [activeSnapPointIndex, id, parsedSnapPoints.length])

    const handleGestureEnd = useCallback(() => {
        const transform = parseInt(getComputedStyle(document.getElementById(id)!).getPropertyValue('--vaul-transform'))
        if (transform > expansionSwitchThreshold!) {
            if (activeSnapPointIndex === 0) {
                onChange?.(false)
            } else {
                setActiveSnapPointIndex(activeSnapPointIndex! - 1)
                setVariableToElement(document.getElementById(id)!, '--vaul-transform', `${0}px`)
            }
        } else if (transform < -expansionSwitchThreshold!) {
            setActiveSnapPointIndex(activeSnapPointIndex! + 1)
            setVariableToElement(document.getElementById(id)!, '--vaul-transform', `${0}px`)
        }
        setAttributeToElement(document.getElementById(id)!, 'data-animate', 'true')
    }, [activeSnapPointIndex, expansionSwitchThreshold, id, onChange, setActiveSnapPointIndex])

    return (
        <VaulContextProvider
            value={{
                opened: value,
                activeSnapPointIndex,
                closeOnOutsideClick: closeOnOutsideClick!,
                getStyles,
                variant,
                unstyled,
                trapFocus: trapFocus!,
                handleDissmiss,
                largestSnapPointWithoutOverlayIndex: largestSnapPointWithoutOverlayIndex!,
                handleGestureMove,
                handleGestureEnd,
                closeOnEscape: closeOnEscape!
            }}
        >
            <Portal target={portalTarget}>
                <RemoveScroll
                    enabled={value}
                    {...removeScrollProps}
                >
                    <AnimatePresence
                        isVisible={value}
                        transitionDuration={500}
                    >
                        {({ isAnimating, isVisible }) => (
                            <Box
                                {...getStyles('root')}
                                id={id}
                                variant={variant}
                                mod={{
                                    part: 'root',
                                    state: value ? 'opened' : 'closed',
                                    animate: isAnimating,
                                    'no-scroll': !isLargestSnapPoint
                                }}
                                __vars={{
                                    '--vaul-height': `${largetsSnapPoint}px`,
                                    '--vaul-transform': `0px`,
                                    '--vaul-current-snap-point': `${isVisible ? currentSnapPoint : 0}px`
                                }}
                            >
                                {typeof children === 'function' ? children({ close: () => onChange(false), opened: value }) : children}
                            </Box>
                        )}
                    </AnimatePresence>
                </RemoveScroll>
            </Portal>
        </VaulContextProvider>
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