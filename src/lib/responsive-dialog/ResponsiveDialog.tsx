import type { CloseButtonProps, DrawerRootProps, Factory, MantineBreakpoint, MantineRadius, MantineShadow, ModalBaseOverlayProps, ModalRootProps, RemoveScroll } from '@mantine/core'
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

    modalProps?: Omit<ModalRootProps, 'opened' | 'onClose'>
    drawerProps?: Omit<DrawerRootProps, 'opened' | 'onClose'>
    vaulProps?: Omit<VaulProps, 'opened' | 'onOpenChange' | 'defaultOpened'>

    title?: ReactNode
    children: ReactNode
    footer?: ReactNode
    footerProps?: Record<string, any>
}

export type ResponsiveDialogFactory = Factory<{
    props: VaulProps
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
        children,
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
        footerProps,
        ...props
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
                        onOpenChange={onOpenChange}
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

export {
    useResponsiveDialog,
    ResponsiveDialog
}