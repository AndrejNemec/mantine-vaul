import type { BoxProps, CompoundStylesApiProps, ElementProps, ExtendComponent, Factory, MantineThemeComponent } from '@mantine/core'
import { Box, factory, useProps } from '@mantine/core'
import classes from './vaul.module.css'
import type { VaulClasses } from './types'
import { useVaulContext } from './context'

export interface VaulHandlerProps extends BoxProps, CompoundStylesApiProps<VaulHandlerFactory>, Omit<ElementProps<'div'>, 'children'> {
}
export type VaulHandlerStylesNames = 'handler'

export type VaulHandlerFactory = Factory<{
    props: VaulHandlerProps
    ref: HTMLDivElement
    stylesNames: VaulHandlerStylesNames
    compound: true
}>

const defaultProps: VaulHandlerProps = {

}

export const VaulHandler = factory<VaulHandlerFactory>((_props, ref,) => {
    const {
        style,
        className,
        classNames,
        styles,
        vars,
        mod,
        ...rest
    } = useProps('VaulHandler', defaultProps, _props)

    const {
        getStyles,
        variant
    } = useVaulContext()

    return (
        <Box
            ref={ref}
            mod={[{ part: 'handler' }, mod]}
            {...getStyles('handler', { className, classNames, styles, style, variant })}
            {...rest as any}
        />
    )
})

const extendVaulHandler = (c: ExtendComponent<VaulHandlerFactory>): MantineThemeComponent => c

VaulHandler.displayName = 'mantine-vaul/VaulHandler'
VaulHandler.classes = classes as VaulClasses
VaulHandler.extend = extendVaulHandler