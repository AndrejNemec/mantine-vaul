import type { CSSProperties, PointerEvent } from 'react'
import { useEffect, useRef } from 'react'
import type { BoxProps, CompoundStylesApiProps, ElementProps, ExtendComponent, Factory, MantineThemeComponent } from '@mantine/core'
import { Box, FocusTrap, factory, useProps } from '@mantine/core'
import type { DrawerDirection, VaulClasses } from './utils'
import { useVaulContext } from './utils'
import { useComposedRefs } from './hooks'
import classes from './vaul.module.css'

export interface VaulContentProps extends BoxProps, CompoundStylesApiProps<VaulContentFactory>, ElementProps<'div'> {
}
export type VaulContentStylesNames = 'content'

export type VaulContentFactory = Factory<{
    props: VaulContentProps
    ref: HTMLDivElement
    stylesNames: VaulContentStylesNames
    compound: true
}>

const defaultProps: VaulContentProps = {

}

export const VaulContent = factory<VaulContentFactory>((_props, ref,) => {
    const {
        children,
        style: styleProp = {},
        className: classNameProp,
        classNames,
        styles,
        vars,
        ...rest
    } = useProps('VaulContent', defaultProps, _props)

    const {
        drawerRef,
        onPress,
        onRelease,
        onDrag,
        snapPointsOffset,
        visible,
        setVisible,
        direction,
        isOpen,
        getStyles,
        variant,
        trapFocus,
    } = useVaulContext()

    const composedRef = useComposedRefs(ref, drawerRef)
    const pointerStartRef = useRef<{ x: number, y: number, } | null>(null)

    useEffect(() => {
        // Trigger enter animation without using CSS animation
        setVisible(true)
    }, [])

    const isDeltaInDirection = (delta: { x: number, y: number, }, direction: DrawerDirection, threshold = 0) => {
        const deltaX = Math.abs(delta.x)
        const deltaY = Math.abs(delta.y)
        const isDeltaX = deltaX > deltaY
        if (direction === 'left' || direction === 'right') {
            return isDeltaX && deltaX > threshold
        }
        return !isDeltaX && deltaY > threshold
    }

    const style = {
        ...(snapPointsOffset && snapPointsOffset.length > 0 ? ({
            '--snap-point-height': `${snapPointsOffset[0]!}px`,
            ...styleProp,
        }) : {}),
        ...styleProp
    } as CSSProperties

    const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
        rest.onPointerDown?.(event)
        pointerStartRef.current = { x: event.clientX, y: event.clientY }
        onPress(event)
    }

    const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
        rest.onPointerMove?.(event)
        if (!pointerStartRef.current) return null
        const yPosition = event.clientY - pointerStartRef.current.y
        const xPosition = event.clientX - pointerStartRef.current.x

        const isHorizontalSwipe = ['left', 'right'].includes(direction)
        const clamp = ['left', 'top'].includes(direction) ? Math.min : Math.max

        const clampedX = isHorizontalSwipe ? clamp(0, xPosition) : 0
        const clampedY = !isHorizontalSwipe ? clamp(0, yPosition) : 0
        const swipeStartThreshold = event.pointerType === 'touch' ? 10 : 2
        const delta = { x: clampedX, y: clampedY }

        const isAllowedToSwipe = isDeltaInDirection(delta, direction, swipeStartThreshold)
        if (isAllowedToSwipe) {
            onDrag(event)
            return
        }
        if (Math.abs(xPosition) > swipeStartThreshold || Math.abs(yPosition) > swipeStartThreshold) {
            pointerStartRef.current = null
        }
    }

    const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
        rest.onPointerUp?.(event)
        pointerStartRef.current = null
        onRelease(event)
    }

    return (
        <Box
            ref={composedRef}
            role="dialog"
            aria-modal
            tabIndex={-1}
            data-part="content"
            data-state={isOpen ? 'open' : 'closed'}
            data-direction={direction}
            data-visible={visible ? 'true' : 'false'}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            {...getStyles('content', { className: classNameProp, classNames, styles, style, variant })}
            {...rest as any}
        >
            <FocusTrap active={isOpen && trapFocus}>
                {children}
            </FocusTrap>
        </Box>
    )
})

const extendVaulContent = (c: ExtendComponent<VaulContentFactory>): MantineThemeComponent => c

VaulContent.displayName = 'mantine-vaul/VaulContent'
VaulContent.classes = classes as VaulClasses
VaulContent.extend = extendVaulContent