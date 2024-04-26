import type { BoxProps, CompoundStylesApiProps, ElementProps, ExtendComponent, Factory, MantineThemeComponent } from '@mantine/core'
import { Box, factory, useProps } from '@mantine/core'
import type { VaulClasses } from './utils'
import { useVaulContext } from './utils'
import classes from './vaul.module.css'
import { useDrag } from '@use-gesture/react'
import { useRef } from 'react'
import { useMergedRef } from '@mantine/hooks'

export interface VaulHeaderProps extends BoxProps, CompoundStylesApiProps<VaulHeaderFactory>, ElementProps<'div'> {
}
export type VaulHeaderStylesNames = 'header'

export type VaulHeaderFactory = Factory<{
    props: VaulHeaderProps
    ref: HTMLDivElement
    stylesNames: VaulHeaderStylesNames
    compound: true
}>

const defaultProps: VaulHeaderProps = {

}

export const VaulHeader = factory<VaulHeaderFactory>((_props, refProp) => {
    const ref = useRef<HTMLDivElement>(null)
    const mergedRefs = useMergedRef(ref, refProp)

    const {
        style,
        className,
        classNames,
        styles,
        vars,
        mod,
        ...rest
    } = useProps('VaulHeader', defaultProps, _props)

    const {
        getStyles,
        variant,
        handleGestureEnd,
        handleGestureMove
    } = useVaulContext()

    useDrag(({ down, movement: [_, my], event }) => {
        event.stopPropagation()
        if (down) {
            handleGestureMove(my, true)
        } else {
            handleGestureEnd()
        }
    }, {
        eventOptions: { passive: false },
        target: ref
    })

    return (
        <Box
            ref={mergedRefs}
            mod={[{ part: 'header' }, mod]}
            {...getStyles('header', { className, classNames, styles, style, variant })}
            {...rest as any}
        />
    )
})

const extendVaulHeader = (c: ExtendComponent<VaulHeaderFactory>): MantineThemeComponent => c

VaulHeader.displayName = 'mantine-vaul/VaulHeader'
VaulHeader.classes = classes as VaulClasses
VaulHeader.extend = extendVaulHeader