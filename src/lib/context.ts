import type { GetStylesApi} from '@mantine/core'
import { createSafeContext } from '@mantine/core'
import type { VaulRootFactory } from './VaulRoot'
import type { RefObject } from 'react'

export type DrawerContextValue = {
  getStyles: GetStylesApi<VaulRootFactory>
  variant: string | undefined
  unstyled: boolean | undefined
  opened: boolean
  setOpened: (opened: boolean) => void
  isVisible: boolean
  closeOnOutsideClick: boolean
  closeOnEscape: boolean
  trapFocus: boolean
  removeScrollProps: Record<string, any>
  portalTarget?: HTMLElement | null
  showOverlay: boolean
  overlayRef: RefObject<HTMLDivElement | null>
}

const [VaulContextProvider, useVaulContext] = createSafeContext<DrawerContextValue>('[mantine-vaul] VaulContext was not found, make sure you are using Mantine Vaul components inside <VaulRoot/>.')

export {
  VaulContextProvider,
  useVaulContext,
}
