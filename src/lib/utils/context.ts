import type {  RefObject, PointerEvent, MutableRefObject } from 'react'
import {createContext, useContext} from 'react'
import { type DrawerDirection } from './types'
import type { GetStylesApi } from '@mantine/core'
import type { VaulRootFactory } from '../VaulRoot'

export type ScrollAreaComponent = React.FC<any>

export type DrawerContextValue = {
  drawerRef: RefObject<HTMLDivElement>
  overlayRef: RefObject<HTMLDivElement>
  scaleBackground: (open: boolean) => void
  onPress: (event: PointerEvent<HTMLDivElement>) => void
  onRelease: (event: PointerEvent<HTMLDivElement>) => void
  onDrag: (event: PointerEvent<HTMLDivElement>) => void
  onNestedDrag: (event: PointerEvent<HTMLDivElement>, percentageDragged: number) => void
  onNestedOpenChange: (o: boolean) => void
  onNestedRelease: (event: PointerEvent<HTMLDivElement>, open: boolean) => void
  dismissible: boolean
  isOpen: boolean
  keyboardIsOpen: MutableRefObject<boolean>
  snapPointsOffset: number[] | null
  snapPoints?: (number | string)[] | null
  shouldFade: boolean
  activeSnapPoint?: number | string | null
  setActiveSnapPoint: (o: number | string | null) => void
  visible: boolean
  closeDrawer: () => void
  setVisible: (o: boolean) => void
  openProp?: boolean
  onOpenChange?: (o: boolean) => void
  direction: DrawerDirection
  closeOnEscape: boolean
  closeOnOutsideClick: boolean
  getStyles: GetStylesApi<VaulRootFactory>
  variant: string | undefined
  unstyled: boolean | undefined
  uid: string
  scrollAreaComponent: ScrollAreaComponent | undefined
  trapFocus: boolean
}

export const VaulContext = createContext<DrawerContextValue>(null as unknown as DrawerContextValue)
const { Provider: VaulContextProvider } = VaulContext

const useVaulContext = (throwNotFoundContext: boolean = true) => {
  const context = useContext(VaulContext)
  if (throwNotFoundContext && !context) {
    throw new Error('[mantine-vaul] VaulContext was not found, make sure you are using Mantine Vaul components inside <VaulRoot/>.')
  }
  return context
}

export {
  VaulContextProvider,
  useVaulContext,
}
