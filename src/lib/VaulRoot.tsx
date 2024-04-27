import type { ComponentPropsWithRef, RefObject } from 'react'
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import type { ScrollAreaComponent, VaulClasses } from './utils'
import { VaulContextProvider, throttle } from './utils'
import type { ExtendComponent, Factory, MantineRadius, MantineShadow, MantineThemeComponent, PortalProps, StylesApiProps } from '@mantine/core'
import { Box, Portal, RemoveScroll, createVarsResolver, getRadius, useProps, useStyles, getSize } from '@mantine/core'
import { useFocusReturn, useId, useMergedRef, useUncontrolled, useWindowEvent } from '@mantine/hooks'
import classes from './vaul.module.css'
import { VaulContent } from './VaulContent'
import { VaulOverlay } from './VaulOverlay'
import { VaulHandler } from './VaulHandler'
import { VaulHeader } from './VaulHeader'
import { VaulTitle } from './VaulTitle'
import { VaulBody } from './VaulBody'
import { VaulFooter } from './VaulFooter'
import { getSetValueByIndex } from './utils/getSetValueByIndex'

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
    largestUndimmedSnapPointIndex?: number
    expansionSwitchThreshold?: number

    dismissible?: boolean
    defaultOpened?: boolean
    opened?: boolean
    onClose?: (value: boolean) => void

    portalTarget?: PortalProps['target']

    scrollAreaComponent?: ScrollAreaComponent
    scrollAreaComponentProps?: Record<string, any>
    scrollContainerRef?: RefObject<HTMLDivElement>

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
    children: ReactNode | ((props: { close: () => void, scrollContainerRef: RefObject<HTMLDivElement>, opened: boolean, }) => ReactNode)
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
    largestUndimmedSnapPointIndex: -1,
    expansionSwitchThreshold: 50,
    snapPoints: ['50%', '97%'],
    defaultActiveSnapPointIndex: 0
}

const openedVauls = new Set<string>()

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
        largestUndimmedSnapPointIndex,
        expansionSwitchThreshold,

        dismissible,
        opened,
        defaultOpened,
        onClose,

        portalTarget,

        scrollAreaComponent,
        scrollAreaComponentProps,

        closeOnOutsideClick,
        closeOnEscape,

        trapFocus,
        returnFocus,

        removeScrollProps,

        classNames,
        styles,
        unstyled,
        vars,
        variant = 'default',
        scrollContainerRef: scrollContainerRefProp
    } = props

    const id = useId(idProp)
    const _scrollContainerRef = useRef<HTMLDivElement>(null)
    const scrollContainerRef = useMergedRef(_scrollContainerRef, scrollContainerRefProp)


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

    const [prevSnapPointIndex, setPrevSnapPointIndex] = useState<number>(0)
    const [viewportHeight, setViewportHeight] = useState<number>(0)

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

    useWindowEvent(
        'keydown',
        (event) => {
            if (event.key === 'Escape' && closeOnEscape) {
                if (openedVauls.has(id) && getSetValueByIndex(openedVauls, openedVauls.size - 1) === id) {
                    const shouldTrigger = (event.target as HTMLElement)?.getAttribute('data-mantine-stop-propagation') !== 'true'
                    if (!shouldTrigger) {
                        return
                    }
                    onChange(false)
                }
            }
        },
        { capture: true }
    )

    useFocusReturn({ opened: value, shouldReturnFocus: trapFocus && returnFocus })

    useEffect(() => {
        if (value) {
            openedVauls.add(id)
        } else {
            openedVauls.delete(id)
        }
        return () => {
            openedVauls.delete(id)
        }
    }, [value, id])

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
    const isSmallestSnapPoint = useMemo<boolean>(() => activeSnapPointIndex === 0, [activeSnapPointIndex])
    const [transform, setTransform] = useState<number>(0)

    const updateSnapPointIndex = useCallback((value: number) => {
        setActiveSnapPointIndex!(value)
        setPrevSnapPointIndex(activeSnapPointIndex!)
    }, [activeSnapPointIndex])

    const handleDissmiss = useCallback(() => {
        if (dismissible) {
            updateSnapPointIndex(0)
            onChange?.(false)
        }
    }, [dismissible, updateSnapPointIndex])

    const resultingTransform = useMemo(() => Math.max(
        transform + (opened ? -currentSnapPoint : 0),
        -largetsSnapPoint
    ), [currentSnapPoint, largetsSnapPoint, opened, transform])


    const handleGestureMove = useCallback((y: number, disableScrollCondition: boolean = false) => {
        const scrollTop = _scrollContainerRef.current?.scrollTop

        if (scrollTop && scrollTop > 0 && !disableScrollCondition) {
            return
        }

        const delta = y
        if (isLargestSnapPoint) {
            setTransform(delta >= 0 ? delta : 0)
        } else {
            setTransform(delta)
        }
    }, [isLargestSnapPoint])

    const handleGestureEnd = useCallback(() => {
        if (transform > expansionSwitchThreshold!) {
            if (isSmallestSnapPoint) {
                onClose?.(false)
            } else {
                updateSnapPointIndex(activeSnapPointIndex! - 1)
                _scrollContainerRef.current?.scrollTo(0, 0)
            }
        } else if (transform < -expansionSwitchThreshold!) {
            updateSnapPointIndex(activeSnapPointIndex! + 1)
        }
        setTransform(0)
    }, [expansionSwitchThreshold, isSmallestSnapPoint, onClose, transform, updateSnapPointIndex])

    return (
        <VaulContextProvider
            value={{
                opened: value,
                onClose: onChange,
                activeSnapPointIndex,
                snapPoints,
                setActiveSnapPointIndex,
                dismissible,
                closeOnEscape,
                closeOnOutsideClick,
                getStyles,
                variant,
                unstyled,
                id,
                scrollAreaComponent,
                trapFocus,
                expansionSwitchThreshold,
                prevSnapPointIndex,
                updateSnapPointIndex,
                handleDissmiss,
                largestUndimmedSnapPointIndex,
                scrollContainerRef,
                scrollAreaComponentProps,
                parsedSnapPoints,
                currentSnapPoint,
                largetsSnapPoint,
                isLargestSnapPoint,
                isSmallestSnapPoint,
                transform,
                setTransform,
                viewportHeight,
                handleGestureMove,
                handleGestureEnd,
                resultingTransform
            }}
        >
            <Portal target={portalTarget}>
                <RemoveScroll
                    enabled={value}
                    {...removeScrollProps}
                >
                    <Box
                        {...getStyles('root')}
                        id={id}
                        variant={variant}
                        mod={{ state: value ? 'opened' : 'closed' }}
                        __vars={{
                            '--vaul-largets-snap-point': `${largetsSnapPoint}px`,
                        }}
                    >
                        {typeof children === 'function' ? children({ close: () => onChange(false), opened: value, scrollContainerRef: _scrollContainerRef }) : children}
                    </Box>
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