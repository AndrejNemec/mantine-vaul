import type { ExtendComponent, Factory, MantineThemeComponent } from '@mantine/core'
import { useProps } from '@mantine/core'
import type { ReactNode } from 'react'
import { Drawer } from 'vaul'
import { useVaulContext } from './context'

export interface VaulPortalProps {
  target?: HTMLElement | null
  children: ReactNode
}

export type VaulPortalFactory = Factory<{
  props: VaulPortalProps
}>

const defaultProps: Partial<VaulPortalProps> = {}

export const VaulPortal = (_props: VaulPortalProps) => {
  const { children, target } = useProps('VaulPortal', defaultProps, _props)

  const { portalTarget } = useVaulContext()

  return <Drawer.Portal container={target || portalTarget}>{children}</Drawer.Portal>
}

const extendVaulContent = (c: ExtendComponent<VaulPortalFactory>): MantineThemeComponent => c

VaulPortal.displayName = 'mantine-vaul/VaulPortal'
VaulPortal.extend = extendVaulContent
