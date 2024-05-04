import type { BoxProps, ExtendComponent, MantineThemeComponent, PolymorphicFactory, StylesApiProps } from '@mantine/core'
import { UnstyledButton, polymorphicFactory, useProps } from '@mantine/core'
import { useVaulContext } from './context'
import { Drawer } from 'vaul'
import type { ReactNode } from 'react'

export interface VaulTargetProps extends BoxProps, StylesApiProps<VaulTargetFactory> {
    children?: ReactNode
}

export type VaulTargetFactory = PolymorphicFactory<{
    props: VaulTargetProps
    defaultRef: HTMLButtonElement
    defaultComponent: 'button'
    compound: true
}>

const defaultProps: VaulTargetProps = {

}

export const VaulTarget = polymorphicFactory<VaulTargetFactory>((_props, ref) => {
    const {
        style,
        className,
        classNames,
        styles,
        vars,
        children,
        ...rest
    } = useProps('VaulTarget', defaultProps, _props)

    const {
        getStyles,
        variant,
    } = useVaulContext()

    return (
        <Drawer.Trigger asChild>
            <UnstyledButton
                {...rest as any}
                ref={ref}
                {...getStyles('target', { className, classNames, styles, style, variant })}
            >
                {children}
            </UnstyledButton>
        </Drawer.Trigger>
    )
})

const extendVaulTarget = (c: ExtendComponent<VaulTargetFactory>): MantineThemeComponent => c

VaulTarget.displayName = 'mantine-vaul/VaulTarget'
VaulTarget.extend = extendVaulTarget