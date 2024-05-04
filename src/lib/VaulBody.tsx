import type { BoxProps, CompoundStylesApiProps, ElementProps, ExtendComponent, Factory, MantineThemeComponent } from '@mantine/core'
import { Box, factory, useProps } from '@mantine/core'
import classes from './vaul.module.css'
import type { VaulClasses } from './types'
import { useVaulContext } from './context'

export interface VaulBodyProps extends BoxProps, CompoundStylesApiProps<VaulBodyFactory>, ElementProps<'div'> {
}
export type VaulBodyStylesNames = 'body'

export type VaulBodyFactory = Factory<{
    props: VaulBodyProps
    ref: HTMLDivElement
    stylesNames: VaulBodyStylesNames
    compound: true
}>

const defaultProps: VaulBodyProps = {

}

export const VaulBody = factory<VaulBodyFactory>((_props, ref) => {
    const {
        style,
        className,
        classNames,
        styles,
        vars,
        children,
        ...rest
    } = useProps('VaulBody', defaultProps, _props)

    const {
        getStyles,
        variant
    } = useVaulContext()

    return (
        <Box
            ref={ref}
            {...getStyles('body', { className, classNames, styles, style, variant })}
            {...rest as any}
        >
            {children}
        </Box>
    )
})

const extendVaulBody = (c: ExtendComponent<VaulBodyFactory>): MantineThemeComponent => c

VaulBody.displayName = 'mantine-vaul/VaulBody'
VaulBody.classes = classes as VaulClasses
VaulBody.extend = extendVaulBody