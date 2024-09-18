import type {
  ExtendComponent,
  Factory,
  MantineRadius,
  MantineShadow,
  MantineThemeComponent,
  RemoveScroll,
  StylesApiProps
} from '@mantine/core'
import { createVarsResolver, getRadius, getSize, useProps, useStyles } from '@mantine/core'
import { useFocusReturn, useUncontrolled } from '@mantine/hooks'
import type { ComponentPropsWithRef } from 'react'
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { Drawer } from 'vaul'
import { VaulContextProvider } from './context'
import type { ScrollAreaComponent, VaulClasses } from './types'
import classes from './vaul.module.css'
import { VaulBody } from './VaulBody'
import { VaulCloseTarget } from './VaulCloseTarget'
import { VaulContent } from './VaulContent'
import { VaulDescription } from './VaulDescription'
import { VaulFooter } from './VaulFooter'
import { VaulHandler } from './VaulHandler'
import { VaulHeader } from './VaulHeader'
import { VaulOverlay } from './VaulOverlay'
import { VaulPortal } from './VaulPortal'
import { VaulTarget } from './VaulTarget'
import { VaulTitle } from './VaulTitle'

export type VaulDirection = 'top' | 'bottom' | 'left' | 'right'

export type VaulStylesNames =
  | 'content'
  | 'overlay'
  | 'header'
  | 'title'
  | 'handler'
  | 'body'
  | 'footer'
  | 'description'
  | 'target'
  | 'closeTarget'

export type VaulCssVariables = {
  content: '--vaul-radius' | '--vaul-z-index' | '--vaul-handler-radius'
  overlay: '--vaul-overlay-z-index'
}

export interface BaseVaulRootProps {
  defaultActiveSnapPoint?: number | string | null
  activeSnapPoint?: number | string | null
  setActiveSnapPoint?: (snapPoint: number | string | null | undefined) => void

  dismissible?: boolean
  defaultOpened?: boolean
  opened?: boolean
  onOpenChange?: (value: boolean) => void
  onCloseAnimationEnd?: () => void

  direction?: VaulDirection
  snapPoints?: (string | number)[]
  fadeFromIndex?: number

  scrollLockTimeout?: number
  closeThreshold?: number
  maxHeight?: number | string

  portalTarget?: HTMLElement | null

  closeOnClickOutside?: boolean
  closeOnEscape?: boolean

  radius?: MantineRadius
  handlerRadius?: MantineRadius
  shadow?: MantineShadow

  zIndex?: number
  overlayZIndex?: number

  trapFocus?: boolean
  returnFocus?: boolean
  lockScroll?: boolean

  scrollAreaComponent?: ScrollAreaComponent
  removeScrollProps?: Omit<ComponentPropsWithRef<typeof RemoveScroll>, 'children'>
}

export interface VaulRootProps extends BaseVaulRootProps, StylesApiProps<VaulRootFactory> {
  __staticSelector?: string
  children: ReactNode
}

export type VaulRootFactory = Factory<{
  props: VaulRootProps
  stylesNames: VaulStylesNames
  vars: VaulCssVariables
  staticComponents: {
    Root: typeof VaulRoot
    Portal: typeof VaulPortal
    Overlay: typeof VaulOverlay
    Content: typeof VaulContent
    Body: typeof VaulBody
    Header: typeof VaulHeader
    Title: typeof VaulTitle
    Description: typeof VaulDescription
    Footer: typeof VaulFooter
    Handler: typeof VaulHandler
    Target: typeof VaulTarget
    CloseTarget: typeof VaulTarget
  }
}>

const varsResolver = createVarsResolver<VaulRootFactory>(
  // eslint-disable-next-line no-empty-pattern
  (_, { radius, handlerRadius, zIndex, overlayZIndex, shadow, maxHeight }) => ({
    content: {
      '--vaul-radius': radius === undefined ? undefined : getRadius(radius),
      '--vaul-z-index': zIndex === undefined ? undefined : `${zIndex}`,
      '--vaul-handler-radius': radius === undefined ? undefined : getRadius(handlerRadius),
      '--vaul-shadow': shadow === undefined ? undefined : getSize(shadow, 'vaul-shadow'),
      '--vaul-max-height': maxHeight === undefined ? undefined : maxHeight
    },
    overlay: {
      '--vaul-overlay-z-index': overlayZIndex === undefined ? undefined : `${overlayZIndex}`
    }
  })
)

const defaultProps: Omit<VaulRootProps, 'children'> = {
  __staticSelector: 'VaulRoot',
  closeOnEscape: true,
  closeOnClickOutside: true,
  trapFocus: true,
  returnFocus: true,
  dismissible: true,
  lockScroll: true,
  snapPoints: [1]
}

export const VaulRoot = (_props: VaulRootProps) => {
  const props = useProps('VaulRoot', defaultProps, _props)

  const {
    __staticSelector,
    children,

    defaultActiveSnapPoint: defaultActiveSnapPointProp,
    activeSnapPoint: activeSnapPointProp,
    setActiveSnapPoint: setActiveSnapPointProp,

    snapPoints,
    fadeFromIndex,

    direction = 'bottom',
    scrollLockTimeout,
    closeThreshold,
    dismissible = true,
    opened: openedProp,
    defaultOpened: defaultOpenedProp,
    onOpenChange: onOpenChangeProp,
    onCloseAnimationEnd,

    portalTarget,

    closeOnClickOutside = true,
    closeOnEscape = true,

    trapFocus = true,
    returnFocus = true,
    lockScroll = true,

    removeScrollProps = {},
    classNames,
    styles,
    unstyled,
    vars,
    scrollAreaComponent,
    variant = 'default'
  } = props

  const [opened, onOpenChange] = useUncontrolled({
    value: openedProp,
    onChange: onOpenChangeProp,
    defaultValue: defaultOpenedProp,
    finalValue: false
  })

  const [activeSnapPoint, setActiveSnapPoint] = useUncontrolled({
    value: activeSnapPointProp,
    onChange: setActiveSnapPointProp,
    defaultValue: defaultActiveSnapPointProp,
    finalValue: undefined
  })

  const [isVisible, setIsVisible] = useState<boolean>(opened)
  const animationTimeoutRef = useRef<number>()

  useEffect(() => {
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current)
        animationTimeoutRef.current = undefined
      }
    }
  }, [])

  const showOverlay = useMemo<boolean>(() => {
    if (!isVisible || !opened) {
      return false
    }

    if (
      !snapPoints ||
      snapPoints.length === 0 ||
      activeSnapPoint === undefined ||
      activeSnapPoint === null ||
      fadeFromIndex === undefined ||
      fadeFromIndex === null
    ) {
      return true
    }

    if (fadeFromIndex === -1) {
      return false
    }

    const currentSnapPointIndex = snapPoints.indexOf(activeSnapPoint)
    return currentSnapPointIndex === fadeFromIndex
  }, [activeSnapPoint, fadeFromIndex, isVisible, opened, snapPoints])

  const overlayRef = useRef<HTMLDivElement>(null)

  const getStyles = useStyles<VaulRootFactory>({
    name: __staticSelector!,
    rootSelector: 'content',
    classes,
    props,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver
  })

  useFocusReturn({ opened, shouldReturnFocus: trapFocus && returnFocus })

  return (
    <VaulContextProvider
      value={{
        opened,
        setOpened: onOpenChange,
        closeOnClickOutside,
        getStyles,
        variant,
        unstyled,
        trapFocus,
        closeOnEscape,
        removeScrollProps,
        portalTarget,
        isVisible,
        showOverlay,
        overlayRef,
        scrollAreaComponent,
        lockScroll
      }}>
      <Drawer.Root
        open={opened}
        onOpenChange={(value) => {
          onOpenChange(value)
          if (value) {
            setIsVisible(true)
          }
          if (!value) {
            animationTimeoutRef.current = window.setTimeout(() => {
              setIsVisible(false)
              onCloseAnimationEnd?.()
            }, 0.5 * 1000)
          }
        }}
        snapPoints={snapPoints as []}
        activeSnapPoint={activeSnapPoint}
        setActiveSnapPoint={setActiveSnapPoint}
        fadeFromIndex={fadeFromIndex}
        direction={direction}
        scrollLockTimeout={scrollLockTimeout}
        closeThreshold={closeThreshold}
        dismissible={dismissible}
        shouldScaleBackground={false}
        modal={false}
        noBodyStyles
        setBackgroundColorOnScale={false}
        disablePreventScroll>
        {children}
      </Drawer.Root>
    </VaulContextProvider>
  )
}

const extendVaul = (c: ExtendComponent<VaulRootFactory>): MantineThemeComponent => c

VaulRoot.displayName = 'mantine-vaul/VaulRoot'
VaulRoot.classes = classes as VaulClasses
VaulRoot.extend = extendVaul
VaulRoot.Root = VaulRoot
VaulRoot.Portal = VaulPortal
VaulRoot.Content = VaulContent
VaulRoot.Overlay = VaulOverlay
VaulRoot.Handler = VaulHandler
VaulRoot.Header = VaulHeader
VaulRoot.Title = VaulTitle
VaulRoot.Description = VaulDescription
VaulRoot.Body = VaulBody
VaulRoot.Footer = VaulFooter
VaulRoot.Target = VaulTarget
VaulRoot.CloseTarget = VaulCloseTarget
