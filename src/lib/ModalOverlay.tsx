import { forwardRef } from 'react'
import { useComposedRefs } from './hooks/use-composed-refs'
import { useDrawerContext } from './utils/context'

export const VaulOverlay = forwardRef<HTMLDivElement, ModalBaseOverlayProps>(
    function ({ children, ...rest }, ref) {
        const { overlayRef, snapPoints, onRelease, shouldFade, isOpen, visible } = useDrawerContext()
        const composedRef = useComposedRefs(ref, overlayRef)
        const hasSnapPoints = snapPoints && snapPoints.length > 0

        return (
            <ModalBaseOverlay
                onMouseUp={onRelease}
                ref={composedRef}
                vaul-drawer-visible={visible ? 'true' : 'false'}
                vaul-overlay=""
                vaul-snap-points={isOpen && hasSnapPoints ? 'true' : 'false'}
                vaul-snap-points-overlay={isOpen && shouldFade ? 'true' : 'false'}
                {...rest}
            />
        )
    },
)

VaulOverlay.displayName = 'mantine-vaul/VaulOverlay'