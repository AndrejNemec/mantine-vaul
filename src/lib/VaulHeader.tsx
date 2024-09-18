import type {
  BoxProps,
  CompoundStylesApiProps,
  ElementProps,
  ExtendComponent,
  Factory,
  MantineThemeComponent
} from '@mantine/core'
import { Box, factory, useProps } from '@mantine/core'
import { useVaulContext } from './context'
import type { VaulClasses } from './types'
import classes from './vaul.module.css'

export interface VaulHeaderProps extends BoxProps, CompoundStylesApiProps<VaulHeaderFactory>, ElementProps<'div'> {}
export type VaulHeaderStylesNames = 'header'

export type VaulHeaderFactory = Factory<{
  props: VaulHeaderProps
  ref: HTMLDivElement
  stylesNames: VaulHeaderStylesNames
  compound: true
}>

const defaultProps: VaulHeaderProps = {}

export const VaulHeader = factory<VaulHeaderFactory>((_props, ref) => {
  const { style, className, classNames, styles, vars, mod, ...rest } = useProps('VaulHeader', defaultProps, _props)

  const { getStyles, variant } = useVaulContext()

  return (
    <Box
      ref={ref}
      mod={[{ part: 'header' }, mod]}
      {...getStyles('header', { className, classNames, styles, style, variant })}
      {...(rest as any)}
    />
  )
})

const extendVaulHeader = (c: ExtendComponent<VaulHeaderFactory>): MantineThemeComponent => c

VaulHeader.displayName = 'mantine-vaul/VaulHeader'
VaulHeader.classes = classes as VaulClasses
VaulHeader.extend = extendVaulHeader
