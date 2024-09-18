import type {
  BoxProps,
  ExtendComponent,
  MantineThemeComponent,
  PolymorphicFactory,
  StylesApiProps
} from '@mantine/core'
import { UnstyledButton, polymorphicFactory, useProps } from '@mantine/core'
import type { ReactNode } from 'react'
import { Drawer } from 'vaul'
import { useVaulContext } from './context'

export interface VaulCloseTargetProps extends BoxProps, StylesApiProps<VaulCloseTargetFactory> {
  children?: ReactNode
}

export type VaulCloseTargetFactory = PolymorphicFactory<{
  props: VaulCloseTargetProps
  defaultRef: HTMLButtonElement
  defaultComponent: 'button'
  compound: true
}>

const defaultProps: VaulCloseTargetProps = {}

export const VaulCloseTarget = polymorphicFactory<VaulCloseTargetFactory>((_props, ref) => {
  const { style, className, classNames, styles, vars, children, ...rest } = useProps(
    'VaulCloseTarget',
    defaultProps,
    _props
  )

  const { getStyles, variant } = useVaulContext()

  return (
    <Drawer.Close asChild>
      <UnstyledButton
        {...(rest as any)}
        ref={ref}
        {...getStyles('closeTarget', { className, classNames, styles, style, variant })}>
        {children}
      </UnstyledButton>
    </Drawer.Close>
  )
})

const extendVaulCloseTarget = (c: ExtendComponent<VaulCloseTargetFactory>): MantineThemeComponent => c

VaulCloseTarget.displayName = 'mantine-vaul/VaulCloseTarget'
VaulCloseTarget.extend = extendVaulCloseTarget
