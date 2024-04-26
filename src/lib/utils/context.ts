import type { GetStylesApi} from '@mantine/core'
import { createSafeContext } from '@mantine/core'
import type { BaseVaulRootProps, VaulRootFactory } from '../VaulRoot'
import type { Dispatch, SetStateAction } from 'react'

export type ScrollAreaComponent = React.FC<any>

export type DrawerContextValue = Omit<BaseVaulRootProps, 'scrollContainerRef'> & {
  getStyles: GetStylesApi<VaulRootFactory>
  variant: string | undefined
  unstyled: boolean | undefined
  prevSnapPointIndex: number
  updateSnapPointIndex: (value: number) => void
  handleDissmiss: () => void
  scrollContainerRef: (node: HTMLDivElement | null) => void
  parsedSnapPoints: number[]
  currentSnapPoint: number
  largetsSnapPoint: number
  isLargestSnapPoint: boolean
  isSmallestSnapPoint: boolean
  transform: number
  resultingTransform: number
  setTransform: Dispatch<SetStateAction<number>>
  viewportHeight: number
  handleGestureMove: (y: number, disableScrollCondition?: boolean) => void
  handleGestureEnd: () => void
}

const [VaulContextProvider, useVaulContext] = createSafeContext<DrawerContextValue>('[mantine-vaul] VaulContext was not found, make sure you are using Mantine Vaul components inside <VaulRoot/>.')

export {
  VaulContextProvider,
  useVaulContext,
}
