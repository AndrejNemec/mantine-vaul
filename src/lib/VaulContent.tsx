import type { BoxProps, CompoundStylesApiProps, ElementProps, ExtendComponent, Factory, MantineThemeComponent } from '@mantine/core'
import { Box, FocusTrap, NativeScrollArea, factory, useProps } from '@mantine/core'
import type { VaulClasses } from './utils'
import { useVaulContext } from './utils'
import classes from './vaul.module.css'
import { useDrag } from '@use-gesture/react'
import { mergeRefs, useId, useMergedRef } from '@mantine/hooks'
import { useRef } from 'react'

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
        ...rest
    } = useProps('VaulContent', defaultProps, _props)

    const id = useId(idProp)

    const {
        opened,
        trapFocus,
        getStyles,
        variant,
        largetsSnapPoint,
        transform,
        handleGestureEnd,
        handleGestureMove,
        resultingTransform,
        scrollContainerRef,
        scrollAreaComponent,
        scrollAreaComponentProps,
        prevSnapPointIndex,
        activeSnapPointIndex,
        isLargestSnapPoint
    } = useVaulContext()

    useDrag(({ down, movement: [_, my], event }) => {
        event.stopPropagation()
        if (down) {
            handleGestureMove(my)
        } else {
            handleGestureEnd()
        }
    }, {
        eventOptions: { passive: false },
        target: ref
    })

    const Scroll: React.FC<any> = scrollAreaComponent || NativeScrollArea

    return (
        <FocusTrap active={opened && trapFocus}>
            <Box
                ref={mergedRefs}
                id={id}
                role="dialog"
                aria-modal
                tabIndex={-1}
                {...rest as any}
                {...getStyles('content', { className: classNameProp, classNames, styles, style, variant })}
                mod={[{ animate: transform === 0, part: 'content' }, mod]}
                __vars={{
                    '--vaul-height': `${largetsSnapPoint}px`,
                    '--vaul-transform': `${resultingTransform}px`
                }}
            >
                <Box
                    ref={mergeRefs(scrollAreaComponent ? undefined : scrollContainerRef)}
                    mod={{
                        part: 'inner',
                        animate: opened && transform === 0 && (prevSnapPointIndex > activeSnapPointIndex!),
                        largestSnapPoint: isLargestSnapPoint,
                        transform: transform !== 0,
                        customScroll: !!scrollAreaComponent
                    }}
                    {...getStyles('inner')}
                >
                    <Scroll {
                        ...(scrollAreaComponent ? {
                            ...(scrollAreaComponentProps || {}),
                            viewportProps: { ...(scrollAreaComponentProps?.viewportProps || {}), 'data-vaul-scroll-container': true },
                            viewportRef: mergeRefs(scrollContainerRef, scrollAreaComponentProps?.viewportRef)
                        } : {}
                        )}>
                        {children}
                    </Scroll>
                </Box>
            </Box>
        </FocusTrap>

    )
})

const extendVaulContent = (c: ExtendComponent<VaulContentFactory>): MantineThemeComponent => c

VaulContent.displayName = 'mantine-vaul/VaulContent'
VaulContent.classes = classes as VaulClasses
VaulContent.extend = extendVaulContent