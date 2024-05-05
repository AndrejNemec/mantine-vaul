import type { BoxProps, CompoundStylesApiProps, ElementProps, ExtendComponent, Factory, MantineThemeComponent } from '@mantine/core'
import { Box, NativeScrollArea, factory, useProps } from '@mantine/core'
import classes from './vaul.module.css'
import type { ScrollAreaComponent, VaulClasses } from './types'
import { useVaulContext } from './context'
import type { FC } from 'react'

export interface VaulBodyProps extends BoxProps, CompoundStylesApiProps<VaulBodyFactory>, ElementProps<'div'> {
    scrollAreaComponent?: ScrollAreaComponent
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
        scrollAreaComponent,
        ...rest
    } = useProps('VaulBody', defaultProps, _props)

    const {
        getStyles,
        variant,
        scrollAreaComponent: contextScrollAreaComponent,
    } = useVaulContext()

    const Scroll: FC<any> = scrollAreaComponent || contextScrollAreaComponent || NativeScrollArea

    return (
        <Box
            ref={ref}
            {...getStyles('body', { className, classNames, styles, style, variant })}
            {...rest as any}
        >
            <Scroll style={{ height: '100%' }}>
                {children}
            </Scroll>
        </Box>
    )
})

const extendVaulBody = (c: ExtendComponent<VaulBodyFactory>): MantineThemeComponent => c

VaulBody.displayName = 'mantine-vaul/VaulBody'
VaulBody.classes = classes as VaulClasses
VaulBody.extend = extendVaulBody