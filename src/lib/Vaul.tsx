import type { CloseButtonProps, ExtendComponent, Factory, MantineThemeComponent, StylesApiProps } from '@mantine/core'
import { CloseButton, factory, useProps } from '@mantine/core'
import type { ReactNode } from 'react'
import type { VaulClasses } from './types'
import classes from './vaul.module.css'
import type { VaulBodyProps } from './VaulBody'
import { VaulBody } from './VaulBody'
import { VaulCloseTarget } from './VaulCloseTarget'
import type { VaulContentProps } from './VaulContent'
import { VaulContent } from './VaulContent'
import { VaulDescription } from './VaulDescription'
import type { VaulFooterProps } from './VaulFooter'
import { VaulFooter } from './VaulFooter'
import { VaulHandler, type VaulHandlerProps } from './VaulHandler'
import type { VaulHeaderProps } from './VaulHeader'
import { VaulHeader } from './VaulHeader'
import type { VaulOverlayProps } from './VaulOverlay'
import { VaulOverlay } from './VaulOverlay'
import { VaulPortal } from './VaulPortal'
import type { BaseVaulRootProps, VaulCssVariables, VaulStylesNames } from './VaulRoot'
import { VaulRoot } from './VaulRoot'
import { VaulTarget } from './VaulTarget'
import type { VaulTitleProps } from './VaulTitle'
import { VaulTitle } from './VaulTitle'

export interface VaulProps extends BaseVaulRootProps, StylesApiProps<VaulFactory> {
  __staticSelector?: string
  target?: ReactNode
  children: ReactNode
  headerProps?: VaulHeaderProps
  contentProps?: VaulContentProps
  title?: ReactNode
  titleProps?: VaulTitleProps
  footer?: ReactNode
  footerProps?: VaulFooterProps
  withOverlay?: boolean
  overlayProps?: VaulOverlayProps
  withHandler?: boolean
  handlerProps?: VaulHandlerProps
  bodyProps?: VaulBodyProps
  withCloseButton?: boolean
  closeButtonProps?: CloseButtonProps
}

export type VaulFactory = Factory<{
  props: VaulProps
  ref: HTMLDivElement
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
    CloseTarget: typeof VaulCloseTarget
  }
}>

const defaultProps: Partial<VaulProps> = {
  withOverlay: true,
  withHandler: true,
  withCloseButton: true
}

export const Vaul = factory<VaulFactory>((_props, ref) => {
  const {
    children,
    headerProps,
    title,
    titleProps,
    footer,
    footerProps,
    withOverlay,
    overlayProps,
    withHandler,
    handlerProps,
    contentProps,
    bodyProps,
    target,
    withCloseButton,
    closeButtonProps,
    ...others
  } = useProps('Vaul', defaultProps, _props)

  return (
    <VaulRoot.Root {...others}>
      {target}
      {withOverlay && <VaulRoot.Overlay {...overlayProps} />}
      <VaulRoot.Portal>
        <VaulRoot.Content ref={ref} {...contentProps}>
          <Vaul.Header {...headerProps}>
            {withHandler && <Vaul.Handler {...handlerProps} />}
            {title && <Vaul.Title {...titleProps}>{title}</Vaul.Title>}
            {withCloseButton && (
              <VaulCloseTarget
                component={CloseButton}
                pos='absolute'
                top={16}
                right={16}
                {...(closeButtonProps as any)}
              />
            )}
          </Vaul.Header>
          <Vaul.Body {...bodyProps}>{children}</Vaul.Body>
          {footer && <Vaul.Footer {...footerProps}>{footer}</Vaul.Footer>}
        </VaulRoot.Content>
      </VaulRoot.Portal>
    </VaulRoot.Root>
  )
})

const extendVaul = (c: ExtendComponent<VaulFactory>): MantineThemeComponent => c

Vaul.displayName = 'mantine-vaul/Vaul'
Vaul.classes = classes as VaulClasses
Vaul.extend = extendVaul
Vaul.Root = VaulRoot
Vaul.Portal = VaulPortal
Vaul.Content = VaulContent
Vaul.Overlay = VaulOverlay
Vaul.Handler = VaulHandler
Vaul.Header = VaulHeader
Vaul.Title = VaulTitle
Vaul.Description = VaulDescription
Vaul.Body = VaulBody
Vaul.Footer = VaulFooter
Vaul.Target = VaulTarget
Vaul.CloseTarget = VaulCloseTarget
