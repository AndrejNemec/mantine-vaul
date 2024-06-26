import type { BoxProps, CompoundStylesApiProps, ElementProps, ExtendComponent, Factory, MantineThemeComponent } from '@mantine/core'
import { Box, FocusTrap, factory, useProps } from '@mantine/core'
import { useId } from '@mantine/hooks'
import { Drawer } from 'vaul'
import { useVaulContext } from './context'
import type { VaulClasses } from './types'
import classes from './vaul.module.css'

export interface VaulContentProps extends BoxProps, CompoundStylesApiProps<VaulContentFactory>, ElementProps<'div'> {
}
export type VaulContentStylesNames = 'content'

export type VaulContentFactory = Factory<{
    props: VaulContentProps
    ref: HTMLDivElement
    stylesNames: VaulContentStylesNames
    compound: true
}>

const defaultProps: VaulContentProps = {
}

export const VaulContent = factory<VaulContentFactory>((_props, ref) => {
    const {
        children,
        style,
        className: classNameProp,
        classNames,
        styles,
        vars,
        id: idProp,
        mod,
        onKeyDown,
        ...rest
    } = useProps('VaulContent', defaultProps, _props)

    const id = useId(idProp)

    const {
        opened,
        setOpened,
        trapFocus,
        getStyles,
        variant,
        closeOnEscape
    } = useVaulContext()

    return (
        <FocusTrap active={opened && trapFocus}>
            <Drawer.Content
                asChild
                onOpenAutoFocus={(event) => event.preventDefault()}
                onCloseAutoFocus={(event) => event.preventDefault()}
                onInteractOutside={(event) => event.preventDefault()}
                onEscapeKeyDown={(event) => event.preventDefault()}
            >
                <Box
                    ref={ref}
                    id={id}
                    role="dialog"
                    aria-modal
                    tabIndex={-1}
                    {...rest as any}
                    {...getStyles('content', { className: classNameProp, classNames, styles, style, variant })}
                    mod={[
                        {
                            part: 'content'
                        },
                        mod
                    ]}
                    onKeyDown={(event) => {
                        onKeyDown?.(event)
                        if (event.key === 'Escape' && closeOnEscape) {
                            setOpened(false)
                        }
                    }}
                >
                    {children}
                </Box>
            </Drawer.Content>
        </FocusTrap>
    )
})

const extendVaulContent = (c: ExtendComponent<VaulContentFactory>): MantineThemeComponent => c

VaulContent.displayName = 'mantine-vaul/VaulContent'
VaulContent.classes = classes as VaulClasses
VaulContent.extend = extendVaulContent