import { type PointerEvent } from 'react'
import { useVaulContext } from './context'
import type { CompoundStylesApiProps, ElementProps, ExtendComponent, Factory, MantineThemeComponent, OverlayProps, TransitionOverride } from '@mantine/core'
import { Overlay, Transition, factory, useProps } from '@mantine/core'
import classes from './vaul.module.css'
import type { VaulClasses } from './types'

export type VaulOverlayStylesNames = 'overlay'

export interface VaulOverlayProps extends Omit<OverlayProps, 'styles' | 'classNames' | 'variant' | 'vars' | 'fixed'>,
    ElementProps<'div', 'color'>,
    CompoundStylesApiProps<VaulOverlayFactory> {
    transitionProps?: TransitionOverride
}

export type VaulOverlayFactory = Factory<{
    props: VaulOverlayProps
    ref: HTMLDivElement
    stylesNames: VaulOverlayStylesNames
    compound: true
}>

const defaultProps: VaulOverlayProps = {
}

export const VaulOverlay = factory<VaulOverlayFactory>((_props, ref) => {
    const {
        className,
        zIndex,
        onPointerDown: onPointerDownProp,
        vars,
        classNames,
        styles,
        style,
        mod,
        transitionProps,
        unstyled: unstyledProp,
        ...rest
    } = useProps('VaulContent', defaultProps, _props)

    const {
        closeOnClickOutside,
        getStyles,
        variant,
        unstyled,
        setOpened,
        showOverlay
    } = useVaulContext()

    const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
        if (closeOnClickOutside) {
            setOpened(false)
        }
        onPointerDownProp?.(event)
    }

    return (
        <Transition
            transition="fade"
            duration={300}
            {...transitionProps}
            mounted={showOverlay}
        >
            {(transitionStyles) => (
                <Overlay
                    unstyled={unstyledProp || unstyled}
                    fixed
                    zIndex={zIndex}
                    ref={ref}
                    onPointerDown={onPointerDown}
                    mod={[{ part: 'overlay' }, mod]}
                    {...getStyles('overlay', { classNames, style: [style, transitionStyles], styles, className, variant })}
                    {...rest}
                />
            )}
        </Transition>
    )
})

const extendVaulOverlay = (c: ExtendComponent<VaulOverlayFactory>): MantineThemeComponent => c

VaulOverlay.displayName = 'mantine-vaul/VaulOverlay'
VaulOverlay.classes = classes as VaulClasses
VaulOverlay.extend = extendVaulOverlay