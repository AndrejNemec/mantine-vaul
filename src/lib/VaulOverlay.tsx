import { useMemo, type PointerEvent } from 'react'
import { useVaulContext } from './utils/context'
import type { CompoundStylesApiProps, ElementProps, ExtendComponent, Factory, MantineThemeComponent, OverlayProps, TransitionOverride } from '@mantine/core'
import { Overlay, Transition, factory, useProps } from '@mantine/core'
import classes from './vaul.module.css'
import type { VaulClasses } from './utils'

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
        activeSnapPointIndex,
        largestUndimmedSnapPointIndex,
        opened,
        closeOnOutsideClick,
        getStyles,
        variant,
        handleDissmiss,
        unstyled
    } = useVaulContext()

    const showOverlay = useMemo<boolean>(() => activeSnapPointIndex! > largestUndimmedSnapPointIndex!, [activeSnapPointIndex, largestUndimmedSnapPointIndex])

    const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
        if (closeOnOutsideClick) {
            handleDissmiss()
        }
        onPointerDownProp?.(event)
    }

    return (
        <Transition mounted={(opened! && showOverlay)} {...transitionProps} transition="fade">
            {(transitionStyles) => (
                <Overlay
                    unstyled={unstyledProp || unstyled}
                    fixed
                    zIndex={zIndex}
                    ref={ref}
                    onPointerDown={onPointerDown}
                    mod={[{ part: 'overlay', show: showOverlay }, mod]}
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