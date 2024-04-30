import type { BoxProps, CompoundStylesApiProps, ElementProps, ExtendComponent, Factory, MantineThemeComponent } from '@mantine/core'
import { Box, FocusTrap, factory, useProps } from '@mantine/core'
import type { VaulClasses } from './utils'
import { useVaulContext } from './utils'
import classes from './vaul.module.css'
import { useDrag } from '@use-gesture/react'
import { useId, useMergedRef } from '@mantine/hooks'
import { useRef } from 'react'

export interface VaulContentProps extends BoxProps, CompoundStylesApiProps<VaulContentFactory>, ElementProps<'div'> {
    scrollContainerProps?: Record<string, any>
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

export const VaulContent = factory<VaulContentFactory>((_props, refProp) => {
    const ref = useRef<HTMLDivElement>(null)
    const mergedRefs = useMergedRef(ref, refProp)

    const {
        children,
        style,
        className: classNameProp,
        classNames,
        styles,
        vars,
        id: idProp,
        mod,
        scrollContainerProps: scrollContainerPropsProp,
        onKeyDown,
        ...rest
    } = useProps('VaulContent', defaultProps, _props)

    const id = useId(idProp)

    const {
        opened,
        trapFocus,
        getStyles,
        variant,
        handleGestureEnd,
        handleGestureMove,
        scrollContainerProps,
        closeOnEscape,
        handleDissmiss
    } = useVaulContext()

    const scrollContainerMergedRefs = useMergedRef(scrollContainerPropsProp?.ref, scrollContainerProps?.ref)

    useDrag(({ down, movement: [, y], event }) => {
        event.stopPropagation()
        if (down) {
            handleGestureMove({ y, event: event as TouchEvent, source: 'content' })
            return
        }
        handleGestureEnd()
    }, {
        eventOptions: { passive: true },
        target: ref
    })

    return (
        <FocusTrap active={opened && trapFocus}>
            <Box
                ref={mergedRefs}
                id={id}
                role="dialog"
                aria-modal
                tabIndex={-1}
                {...rest as any}
                onKeyDown={(event) => {
                    onKeyDown?.(event)
                    if (event.key !== 'Escape') {
                        return
                    }
                    if (closeOnEscape) {
                        handleDissmiss()
                    }
                }}
                {...getStyles('content', { className: classNameProp, classNames, styles, style, variant })}
                mod={[
                    {
                        part: 'content'
                    },
                    mod
                ]}
            >
                <Box {...scrollContainerPropsProp} {...getStyles('inner')} ref={scrollContainerMergedRefs}>
                    {children}
                </Box>
            </Box>
        </FocusTrap>

    )
})

const extendVaulContent = (c: ExtendComponent<VaulContentFactory>): MantineThemeComponent => c

VaulContent.displayName = 'mantine-vaul/VaulContent'
VaulContent.classes = classes as VaulClasses
VaulContent.extend = extendVaulContent