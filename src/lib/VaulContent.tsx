import {
  Box,
  BoxProps,
  CompoundStylesApiProps,
  ElementProps,
  ExtendComponent,
  Factory,
  FocusTrap,
  MantineThemeComponent,
  RemoveScroll,
  factory,
  useProps
} from '@mantine/core'
import { useId } from '@mantine/hooks'
import { ComponentPropsWithRef } from 'react'
import { Drawer } from 'vaul'
import { useVaulContext } from './context'
import type { VaulClasses } from './types'
import classes from './vaul.module.css'

export interface VaulContentProps extends BoxProps, CompoundStylesApiProps<VaulContentFactory>, ElementProps<'div'> {
  removeScrollProps?: Omit<ComponentPropsWithRef<typeof RemoveScroll>, 'children'>
}
export type VaulContentStylesNames = 'content'

export type VaulContentFactory = Factory<{
  props: VaulContentProps
  ref: HTMLDivElement
  stylesNames: VaulContentStylesNames
  compound: true
}>

const defaultProps: VaulContentProps = {}

export const VaulContent = factory<VaulContentFactory>((_props, ref) => {
  const {
    children,
    style,
    className: classNameProp,
    classNames,
    styles,
    vars,
    id: idProp,
    mod,
    onKeyDown,
    removeScrollProps,
    ...rest
  } = useProps('VaulContent', defaultProps, _props)

  const id = useId(idProp)

  const {
    opened,
    setOpened,
    trapFocus,
    getStyles,
    variant,
    closeOnEscape,
    removeScrollProps: removeScrollPropsProp,
    lockScroll,
    descriptionId
  } = useVaulContext()

  return (
    <RemoveScroll
      enabled={opened && lockScroll}
      {...removeScrollProps}
      {...(removeScrollPropsProp as Record<string, any>)}>
      <FocusTrap active={opened && trapFocus}>
        <Drawer.Content
          asChild
          aria-describedby={descriptionId}
          onOpenAutoFocus={(event) => event.preventDefault()}
          onCloseAutoFocus={(event) => event.preventDefault()}
          onInteractOutside={(event) => event.preventDefault()}
          onEscapeKeyDown={(event) => event.preventDefault()}>
          <Box
            ref={ref}
            id={id}
            role='dialog'
            aria-modal
            tabIndex={-1}
            {...(rest as any)}
            {...getStyles('content', { className: classNameProp, classNames, styles, style, variant })}
            mod={[
              {
                part: 'content'
              },
              mod
            ]}
            onKeyDown={(event) => {
              onKeyDown?.(event)
              if (event.key === 'Escape' && closeOnEscape) {
                setOpened(false)
              }
            }}>
            {children}
          </Box>
        </Drawer.Content>
      </FocusTrap>
    </RemoveScroll>
  )
})

const extendVaulContent = (c: ExtendComponent<VaulContentFactory>): MantineThemeComponent => c

VaulContent.displayName = 'mantine-vaul/VaulContent'
VaulContent.classes = classes as VaulClasses
VaulContent.extend = extendVaulContent
