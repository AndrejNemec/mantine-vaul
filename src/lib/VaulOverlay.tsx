import type { PointerEvent, MouseEvent } from 'react'
import { useComposedRefs } from './hooks/use-composed-refs'
import { useVaulContext } from './utils/context'
import type { CompoundStylesApiProps, ElementProps, ExtendComponent, Factory, MantineThemeComponent, OverlayProps } from '@mantine/core'
import { Overlay, factory, useProps } from '@mantine/core'
import classes from './vaul.module.css'
import type { VaulClasses } from './utils'

export type VaulOverlayStylesNames = 'overlay'

export interface VaulOverlayProps extends Omit<OverlayProps, 'styles' | 'classNames' | 'variant' | 'vars' | 'fixed'>,
    ElementProps<'div', 'color'>,
    CompoundStylesApiProps<VaulOverlayFactory> {

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
        onMouseUp: onMouseUpProp,
        className,
        zIndex,
        onClick: onClickProp,
        vars,
        classNames,
        styles,
        style,
        ...rest
    } = useProps('VaulContent', defaultProps, _props)

    const {
        overlayRef,
        snapPoints,
        onRelease,
        shouldFade,
        isOpen,
        visible,
        closeOnOutsideClick,
        closeDrawer,
        getStyles,
        variant
    } = useVaulContext()
    const composedRef = useComposedRefs(ref, overlayRef)
    const hasSnapPoints = snapPoints && snapPoints.length > 0

    const onMouseUp = (event: PointerEvent<HTMLDivElement>) => {
        onRelease(event)
        onMouseUpProp?.(event)
    }

    const onClick = (event: MouseEvent<HTMLDivElement>) => {
        if (closeOnOutsideClick) {
            closeDrawer()
        }
        onClickProp?.(event)
    }

    return (
        <Overlay
            fixed
            zIndex={zIndex}
            ref={composedRef}
            onMouseUp={onMouseUp}
            onClick={onClick}
            data-part="overlay"
            data-visible={visible ? 'true' : 'false'}
            data-state={isOpen ? 'open' : 'closed'}
            data-snap-points={isOpen && hasSnapPoints ? 'true' : 'false'}
            data-snap-points-overlay={isOpen && shouldFade ? 'true' : 'false'}
            {...getStyles('overlay', { classNames, style, styles, className, variant })}
            {...rest}
        />
    )
})

const extendVaulOverlay = (c: ExtendComponent<VaulOverlayFactory>): MantineThemeComponent => c

VaulOverlay.displayName = 'mantine-vaul/VaulOverlay'
VaulOverlay.classes = classes as VaulClasses
VaulOverlay.extend = extendVaulOverlay