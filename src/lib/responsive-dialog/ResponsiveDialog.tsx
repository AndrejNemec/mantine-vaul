import type { CloseButtonProps, DrawerRootProps, ExtendComponent, Factory, MantineBreakpoint, MantineRadius, MantineShadow, MantineThemeComponent, ModalBaseOverlayProps, ModalRootProps, RemoveScroll } from '@mantine/core'
import { Box, Drawer, Modal, createSafeContext, useMatches, useProps } from '@mantine/core'
import { Vaul, type VaulProps } from '../Vaul'
import { useCallback, type ComponentPropsWithRef, type ReactNode } from 'react'
import type { ScrollAreaComponent } from '../types'
import { useUncontrolled } from '@mantine/hooks'
import classes from './responsive-dialog.module.css'

export type ResponsiveModalShowType = 'modal' | 'vaul' | 'drawer'

export type ResponsiveDialogContextValue = {
    type: ResponsiveModalShowType
    close: () => void
}

const [ResponsiveDialogProvider, useResponsiveDialog] = createSafeContext<ResponsiveDialogContextValue>('[mantine-vaul]: ResponsiveDialog was not found, make sure you are using useResponsiveDialog hook inside <ResponsiveDialog/>.')

export interface ResponsiveDialogProps {
    opened: boolean
    onClose: (value: boolean) => void

    trapFocus?: boolean
    returnFocus?: boolean
    lockScroll?: boolean
    withCloseButton?: boolean
    closeButtonProps?: CloseButtonProps
    withOverlay?: boolean
    overlayProps?: ModalBaseOverlayProps
    closeOnClickOutside?: boolean
    closeOnEscape?: boolean
    shadow?: MantineShadow
    zIndex?: number
    radius?: MantineRadius | number

    removeScrollProps?: Omit<ComponentPropsWithRef<typeof RemoveScroll>, 'children'>
    scrollAreaComponent?: ScrollAreaComponent

    matches?: Partial<Record<MantineBreakpoint, ResponsiveModalShowType>>

    modalProps?: Partial<Omit<ModalRootProps, 'opened' | 'onClose' | 'children'>>
    drawerProps?: Partial<Omit<DrawerRootProps, 'opened' | 'onClose' | 'children'>>
    vaulProps?: Partial<Omit<VaulProps, 'opened' | 'onOpenChange' | 'defaultOpened' | 'children'>>

    title?: ReactNode
    children: ReactNode | ((props: { close: () => void, type: ResponsiveModalShowType, opened: boolean, }) => ReactNode)
    footer?: ReactNode
    footerProps?: Record<string, any>
}

export type ResponsiveDialogFactory = Factory<{
    props: ResponsiveDialogProps
}>

const defaultProps: Partial<ResponsiveDialogProps> = {
    trapFocus: true,
    returnFocus: true,
    lockScroll: true,
    withCloseButton: true,
    withOverlay: true,
    closeOnClickOutside: true,
    closeOnEscape: true,
    matches: {
        base: 'vaul',
        lg: 'modal',
        xl: 'drawer'
    }
}

const ResponsiveDialog = (_props: ResponsiveDialogProps) => {
    const {
        opened: openedProp,
        onClose: onCloseProp,
        title,
        children: childrenProp,
        footer,
        matches,
        drawerProps,
        vaulProps,
        modalProps,
        scrollAreaComponent,
        removeScrollProps,
        lockScroll,
        trapFocus,
        returnFocus,
        withCloseButton,
        closeButtonProps,
        withOverlay,
        overlayProps,
        closeOnClickOutside,
        closeOnEscape,
        shadow,
        zIndex,
        radius,
        footerProps
    } = useProps('ResponsiveDialog', defaultProps, _props)

    const type = useMatches<ResponsiveModalShowType>(matches!)
    const [opened, onOpenChange] = useUncontrolled({
        value: openedProp,
        onChange: onCloseProp,
        defaultValue: false,
        finalValue: false
    })

    const close = useCallback(() => {
        onOpenChange(false)
    }, [onOpenChange])

    const hasHeader = !!title || withCloseButton

    const children = typeof childrenProp === 'function' ? childrenProp({ close, type, opened }) : childrenProp

    const renderDialog = () => {
        switch (type) {
            case 'modal':
                return (
                    <Modal.Root
                        opened={opened}
                        onClose={close}
                        scrollAreaComponent={scrollAreaComponent}
                        removeScrollProps={removeScrollProps}
                        lockScroll={lockScroll}
                        closeOnEscape={closeOnEscape}
                        closeOnClickOutside={closeOnClickOutside}
                        shadow={shadow}
                        zIndex={zIndex}
                        trapFocus={trapFocus}
                        returnFocus={returnFocus}
                        {...modalProps}
                    >
                        {withOverlay && <Modal.Overlay {...overlayProps} />}
                        <Modal.Content radius={radius}>
                            {hasHeader && (
                                <Modal.Header>
                                    {title && <Modal.Title>{title}</Modal.Title>}
                                    {withCloseButton && <Modal.CloseButton {...closeButtonProps as any} />}
                                </Modal.Header>
                            )}
                            <Modal.Body>{children}</Modal.Body>
                            {footer && (
                                <Box {...footerProps} data-part='footer' className={`${classes.footer} ${footerProps?.className}`}>
                                    {footer}
                                </Box>
                            )}
                        </Modal.Content>
                    </Modal.Root>
                )
            case 'drawer':
                return (
                    <Drawer.Root
                        opened={opened}
                        onClose={close}
                        scrollAreaComponent={scrollAreaComponent}
                        removeScrollProps={removeScrollProps}
                        lockScroll={lockScroll}
                        closeOnEscape={closeOnEscape}
                        closeOnClickOutside={closeOnClickOutside}
                        shadow={shadow}
                        zIndex={zIndex}
                        trapFocus={trapFocus}
                        returnFocus={returnFocus}
                        {...drawerProps}
                    >
                        {withOverlay && <Drawer.Overlay {...overlayProps} />}
                        <Drawer.Content>
                            {hasHeader && (
                                <Drawer.Header>
                                    {title && <Drawer.Title>{title}</Drawer.Title>}
                                    {withCloseButton && <Drawer.CloseButton {...closeButtonProps as any} />}
                                </Drawer.Header>
                            )}
                            <Drawer.Body>{children}</Drawer.Body>
                            {footer && (
                                <Box {...footerProps} data-part='footer' className={`${classes.footer} ${footerProps?.className}`}>
                                    {footer}
                                </Box>
                            )}
                        </Drawer.Content>
                    </Drawer.Root>
                )
            default:
                return (
                    <Vaul
                        title={title}
                        footer={footer}
                        opened={opened}
                        onOpenChange={(value) => {
                            if (!value) {
                                close()
                            }
                        }}
                        scrollAreaComponent={scrollAreaComponent}
                        removeScrollProps={removeScrollProps}
                        lockScroll={lockScroll}
                        closeOnEscape={closeOnEscape}
                        closeOnClickOutside={closeOnClickOutside}
                        withCloseButton={withCloseButton}
                        closeButtonProps={closeButtonProps}
                        withOverlay={withOverlay}
                        overlayProps={overlayProps}
                        shadow={shadow}
                        zIndex={zIndex}
                        radius={radius}
                        trapFocus={trapFocus}
                        returnFocus={returnFocus}
                        {...vaulProps}
                    >
                        {children}
                    </Vaul>
                )
        }
    }

    return (
        <ResponsiveDialogProvider value={{ type, close }}>
            {renderDialog()}
        </ResponsiveDialogProvider>

    )
}

const extendResponsiveDialog = (c: ExtendComponent<ResponsiveDialogFactory>): MantineThemeComponent => c

ResponsiveDialog.displayName = 'mantine-vaul/ResponsiveDialog'
ResponsiveDialog.extend = extendResponsiveDialog

export {
    useResponsiveDialog,
    ResponsiveDialog
}