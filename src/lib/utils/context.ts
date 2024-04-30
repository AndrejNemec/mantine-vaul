import type { GetStylesApi} from '@mantine/core'
import { createSafeContext } from '@mantine/core'
import type { VaulRootFactory } from '../VaulRoot'

export type ScrollAreaComponent = React.FC<any>

export type DrawerContextValue = {
  getStyles: GetStylesApi<VaulRootFactory>
  variant: string | undefined
  unstyled: boolean | undefined
  opened: boolean
  activeSnapPointIndex: number
  largestSnapPointWithoutOverlayIndex: number
  closeOnOutsideClick: boolean
  closeOnEscape: boolean
  trapFocus: boolean
  scrollContainerProps?: Record<string, any>
  handleDissmiss: () => void
  handleGestureMove: (event: { y: number, event: TouchEvent, source: 'content' | 'header', }) => void
  handleGestureEnd: () => void
}

const [VaulContextProvider, useVaulContext] = createSafeContext<DrawerContextValue>('[mantine-vaul] VaulContext was not found, make sure you are using Mantine Vaul components inside <VaulRoot/>.')

export {
  VaulContextProvider,
  useVaulContext,
}
