import type { BoxProps, CompoundStylesApiProps, ElementProps, ExtendComponent, Factory, MantineThemeComponent } from '@mantine/core'
import { Box, factory, useProps } from '@mantine/core'
import type { VaulClasses } from './utils'
import { useVaulContext } from './utils'
import classes from './vaul.module.css'

export interface VaulFooterProps extends BoxProps, CompoundStylesApiProps<VaulFooterFactory>, ElementProps<'div'> {
}
export type VaulFooterStylesNames = 'footer'

export type VaulFooterFactory = Factory<{
    props: VaulFooterProps
    ref: HTMLDivElement
    stylesNames: VaulFooterStylesNames
    compound: true
}>

const defaultProps: VaulFooterProps = {

}

export const VaulFooter = factory<VaulFooterFactory>((_props, ref,) => {
    const {
        style,
        className,
        classNames,
        styles,
        vars,
        mod,
        ...rest
    } = useProps('VaulFooter', defaultProps, _props)

    const {
        getStyles,
        variant
    } = useVaulContext()

    return (
        <Box
            ref={ref}
            mod={[{ part: 'footer' }, mod]}
            {...getStyles('footer', { className, classNames, styles, style, variant })}
            {...rest as any}
        />
    )
})

const extendVaulFooter = (c: ExtendComponent<VaulFooterFactory>): MantineThemeComponent => c

VaulFooter.displayName = 'mantine-vaul/VaulFooter'
VaulFooter.classes = classes as VaulClasses
VaulFooter.extend = extendVaulFooter