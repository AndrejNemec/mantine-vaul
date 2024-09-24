import type {
  BoxProps,
  CompoundStylesApiProps,
  ElementProps,
  ExtendComponent,
  MantineThemeComponent,
  PolymorphicFactory
} from '@mantine/core'
import { Box, polymorphicFactory, useProps } from '@mantine/core'
import { useId } from '@mantine/hooks'
import { useEffect } from 'react'
import { Drawer } from 'vaul'
import { useVaulContext } from './context'
import type { VaulClasses } from './types'
import classes from './vaul.module.css'

export interface VaulDescriptionProps
  extends BoxProps,
    CompoundStylesApiProps<VaulDescriptionFactory>,
    ElementProps<'p'> {}

export type VaulDescriptionStylesNames = 'description'

export type VaulDescriptionFactory = PolymorphicFactory<{
  props: VaulDescriptionProps
  ref: HTMLHeadingElement
  defaultRef: HTMLHeadingElement
  defaultComponent: 'p'
  stylesNames: VaulDescriptionStylesNames
  compound: true
}>

const defaultProps: VaulDescriptionProps = {}

export const VaulDescription = polymorphicFactory<VaulDescriptionFactory>(
  (_props: VaulDescriptionProps & { component?: any }, ref) => {
    const {
      style,
      className,
      classNames,
      styles,
      component = 'p',
      vars,
      mod,
      id: idProp,
      ...rest
    } = useProps('VaulDescription', defaultProps, _props)

    const { getStyles, variant, setDescriptionId } = useVaulContext()
    const id = useId(idProp)

    useEffect(() => {
      setDescriptionId(id)
    }, [id])

    return (
      <Drawer.Description asChild>
        <Box
          ref={ref}
          mod={[{ part: 'description' }, mod]}
          component={component}
          {...getStyles('description', { className, classNames, styles, style, variant })}
          {...(rest as any)}
          id={id}
        />
      </Drawer.Description>
    )
  }
)

const extendVaulDescription = (c: ExtendComponent<VaulDescriptionFactory>): MantineThemeComponent => c

VaulDescription.displayName = 'mantine-vaul/VaulDescription'
VaulDescription.classes = classes as VaulClasses
VaulDescription.extend = extendVaulDescription
