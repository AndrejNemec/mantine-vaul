import type {
  BoxProps,
  CompoundStylesApiProps,
  ElementProps,
  ExtendComponent,
  MantineThemeComponent,
  PolymorphicFactory
} from '@mantine/core'
import { Box, polymorphicFactory, useProps } from '@mantine/core'
import { Drawer } from 'vaul'
import { useVaulContext } from './context'
import type { VaulClasses } from './types'
import classes from './vaul.module.css'

export interface VaulTitleProps extends BoxProps, CompoundStylesApiProps<VaulTitleFactory>, ElementProps<'h2'> {}

export type VaulTitleStylesNames = 'title'

export type VaulTitleFactory = PolymorphicFactory<{
  props: VaulTitleProps
  ref: HTMLHeadingElement
  defaultRef: HTMLHeadingElement
  defaultComponent: 'h2'
  stylesNames: VaulTitleStylesNames
  compound: true
}>

const defaultProps: VaulTitleProps = {}

export const VaulTitle = polymorphicFactory<VaulTitleFactory>((_props: VaulTitleProps & { component?: any }, ref) => {
  const {
    style,
    className,
    classNames,
    styles,
    component = 'h2',
    vars,
    mod,
    ...rest
  } = useProps('VaulTitle', defaultProps, _props)

  const { getStyles, variant } = useVaulContext()

  return (
    <Drawer.Title asChild>
      <Box
        ref={ref}
        mod={[{ part: 'title' }, mod]}
        component={component}
        {...getStyles('title', { className, classNames, styles, style, variant })}
        {...(rest as any)}
      />
    </Drawer.Title>
  )
})

const extendVaulTitle = (c: ExtendComponent<VaulTitleFactory>): MantineThemeComponent => c

VaulTitle.displayName = 'mantine-vaul/VaulTitle'
VaulTitle.classes = classes as VaulClasses
VaulTitle.extend = extendVaulTitle
