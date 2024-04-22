import type { BoxProps, CompoundStylesApiProps, ElementProps, ExtendComponent, Factory, MantineThemeComponent } from '@mantine/core'
import { Box, factory, useProps } from '@mantine/core'
import type { VaulClasses } from './utils'
import { useVaulContext } from './utils'
import classes from './vaul.module.css'

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
        ...rest
    } = useProps('VaulHandler', defaultProps, _props)

    const {
        getStyles,
        variant
    } = useVaulContext()

    return (
        <Box
            ref={ref}
            data-part="handler"
            {...getStyles('handler', { className, classNames, styles, style, variant })}
            {...rest as any}
        />
    )
})

const extendVaulHandler = (c: ExtendComponent<VaulHandlerFactory>): MantineThemeComponent => c

VaulHandler.displayName = 'mantine-vaul/VaulHandler'
VaulHandler.classes = classes as VaulClasses
VaulHandler.extend = extendVaulHandler