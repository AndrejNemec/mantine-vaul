import type { GetStylesApi} from '@mantine/core'
import { createSafeContext } from '@mantine/core'
import type { VaulRootFactory } from './VaulRoot'
import type { RefObject } from 'react'
import type { ScrollAreaComponent } from './types'

export type DrawerContextValue = {
  getStyles: GetStylesApi<VaulRootFactory>
  variant: string | undefined
  unstyled: boolean | undefined
  opened: boolean
  setOpened: (opened: boolean) => void
  isVisible: boolean
  closeOnClickOutside: boolean
  closeOnEscape: boolean
  trapFocus: boolean
  removeScrollProps: Record<string, any>
  scrollAreaComponent?: ScrollAreaComponent
  portalTarget?: HTMLElement | null
  showOverlay: boolean
  overlayRef: RefObject<HTMLDivElement | null>
  lockScroll: boolean
}

const [VaulContextProvider, useVaulContext] = createSafeContext<DrawerContextValue>('[mantine-vaul] VaulContext was not found, make sure you are using Mantine Vaul components inside <VaulRoot/>.')

export {
  VaulContextProvider,
  useVaulContext,
}
