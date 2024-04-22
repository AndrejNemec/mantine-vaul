import type { ReactNode } from 'react'
import type { BaseVaulRootProps, VaulRootCssVariables, VaulRootStylesNames } from './VaulRoot'
import type { VaulOverlayProps } from './VaulOverlay'
import { VaulOverlay } from './VaulOverlay'
import type { VaulFooterProps } from './VaulFooter'
import { VaulFooter } from './VaulFooter'
import type { VaulTitleProps } from './VaulTitle'
import { VaulTitle } from './VaulTitle'
import type { VaulHeaderProps } from './VaulHeader'
import { VaulHeader } from './VaulHeader'
import { VaulHandler, type VaulHandlerProps } from './VaulHandler'
import type { VaulContentProps } from './VaulContent'
import { VaulContent } from './VaulContent'
import type { VaulBodyProps } from './VaulBody'
import { VaulBody } from './VaulBody'
import type { ExtendComponent, Factory, MantineThemeComponent, StylesApiProps } from '@mantine/core'
import { factory, useProps } from '@mantine/core'
import { VaulRoot } from './VaulRoot'
import type { VaulClasses } from './utils'
import classes from './vaul.module.css'

export type VaulStylesNames = VaulRootStylesNames
export type VaulCssVariables = VaulRootCssVariables

export interface VaulProps extends BaseVaulRootProps, StylesApiProps<VaulFactory> {
    __staticSelector?: string
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
}

export type VaulFactory = Factory<{
    props: VaulProps
    ref: HTMLDivElement
    stylesNames: VaulStylesNames
    vars: VaulCssVariables
    staticComponents: {
        Root: typeof VaulRoot
        Overlay: typeof VaulOverlay
        Content: typeof VaulContent
        Body: typeof VaulBody
        Header: typeof VaulHeader
        Title: typeof VaulTitle
        Footer: typeof VaulFooter
        Handler: typeof VaulHandler
    }
}>

const defaultProps: Partial<VaulProps> = {
    withOverlay: true,
    withHandler: true
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
        ...others
    } = useProps('Vaul', defaultProps, _props)

    return (
        <VaulRoot.Root {...others}>
            {withOverlay && (
                <VaulOverlay {...overlayProps} />
            )}
            <VaulRoot.Content ref={ref} {...contentProps}>
                <Vaul.Header {...headerProps}>
                    {withHandler && (
                        <Vaul.Handler {...handlerProps} />
                    )}
                    {title && (
                        <Vaul.Title {...titleProps}>
                            {title}
                        </Vaul.Title>
                    )}
                </Vaul.Header>
                <Vaul.Body {...bodyProps}>
                    {children}
                </Vaul.Body>
                {footer &&
                    <Vaul.Footer {...footerProps}>
                        {footer}
                    </Vaul.Footer>
                }
            </VaulRoot.Content>
        </VaulRoot.Root>
    )
})

const extendVaul = (c: ExtendComponent<VaulFactory>): MantineThemeComponent => c

Vaul.displayName = 'mantine-vaul/Vaul'
Vaul.classes = classes as VaulClasses
Vaul.extend = extendVaul
Vaul.Root = VaulRoot
Vaul.Content = VaulContent
Vaul.Overlay = VaulOverlay
Vaul.Handler = VaulHandler
Vaul.Header = VaulHeader
Vaul.Title = VaulTitle
Vaul.Body = VaulBody
Vaul.Footer = VaulFooter