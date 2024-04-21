import type {  RefObject, PointerEvent, MutableRefObject } from 'react'
import { type DrawerDirection } from './types'

interface DrawerContextValue {
  drawerRef: RefObject<HTMLDivElement>;
  overlayRef: RefObject<HTMLDivElement>;
  scaleBackground: (open: boolean) => void;
  onPress: (event: PointerEvent<HTMLDivElement>) => void;
  onRelease: (event: PointerEvent<HTMLDivElement>) => void;
  onDrag: (event: PointerEvent<HTMLDivElement>) => void;
  onNestedDrag: (event: PointerEvent<HTMLDivElement>, percentageDragged: number) => void;
  onNestedOpenChange: (o: boolean) => void;
  onNestedRelease: (event: PointerEvent<HTMLDivElement>, open: boolean) => void;
  dismissible: boolean;
  isOpen: boolean;
  keyboardIsOpen: MutableRefObject<boolean>;
  snapPointsOffset: number[] | null;
  snapPoints?: (number | string)[] | null;
  modal: boolean;
  shouldFade: boolean;
  activeSnapPoint?: number | string | null;
  setActiveSnapPoint: (o: number | string | null) => void;
  visible: boolean;
  closeDrawer: () => void;
  setVisible: (o: boolean) => void;
  openProp?: boolean;
  onOpenChange?: (o: boolean) => void;
  direction?: DrawerDirection;
}

export const DrawerContext = createContext<DrawerContextValue>({
  drawerRef: { current: null },
  overlayRef: { current: null },
  scaleBackground: () => {},
  onPress: () => {},
  onRelease: () => {},
  onDrag: () => {},
  onNestedDrag: () => {},
  onNestedOpenChange: () => {},
  onNestedRelease: () => {},
  openProp: undefined,
  dismissible: false,
  isOpen: false,
  keyboardIsOpen: { current: false },
  snapPointsOffset: null,
  snapPoints: null,
  modal: false,
  shouldFade: false,
  activeSnapPoint: null,
  onOpenChange: () => {},
  setActiveSnapPoint: () => {},
  visible: false,
  closeDrawer: () => {},
  setVisible: () => {},
  direction: 'bottom',
})

export const useDrawerContext = () => useContext(DrawerContext)
