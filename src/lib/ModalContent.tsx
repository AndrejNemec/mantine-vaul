import type { ComponentPropsWithoutRef, PropsWithChildren} from 'react'
import { forwardRef, useEffect, useRef } from 'react'
import { useComposedRefs } from './hooks/use-composed-refs'
import { useDrawerContext } from './utils/context'

export type ContentProps = ComponentPropsWithoutRef<any> & {
    onAnimationEnd?: (open: boolean) => void;
}


export const VaulContent = forwardRef<HTMLDivElement, PropsWithChildren<ContentProps>>(function (
    { children, onAnimationEnd, style, ...rest },
    ref,
) {
    const {
        drawerRef,
        onPress,
        onRelease,
        onDrag,
        dismissible,
        keyboardIsOpen,
        snapPointsOffset,
        visible,
        closeDrawer,
        modal,
        openProp,
        onOpenChange,
        setVisible,
        direction,
    } = useDrawerContext()
    const composedRef = useComposedRefs(ref, drawerRef)
    const pointerStartRef = useRef<{ x: number; y: number } | null>(null)

    useEffect(() => {
        // Trigger enter animation without using CSS animation
        setVisible(true)

        setTimeout(() => {
            console.log(drawerRef.current)
        }, 1000)
    }, [])

    const isDeltaInDirection = (delta: { x: number; y: number }, direction: DrawerDirection, threshold = 0) => {
        const deltaX = Math.abs(delta.x)
        const deltaY = Math.abs(delta.y)
        const isDeltaX = deltaX > deltaY
        if (direction === 'left' || direction === 'right') {
            return isDeltaX && deltaX > threshold
        } else {
            return !isDeltaX && deltaY > threshold
        }
    }


    /*
          onOpenAutoFocus={(e) => {
            if (onOpenAutoFocus) {
              onOpenAutoFocus(e);
            } else {
              e.preventDefault();
              drawerRef.current?.focus();
            }
          }}
    */

    /*
    onPointerDownOutside={(e) => {
            onPointerDownOutside?.(e);
            if (!modal || e.defaultPrevented) {
              e.preventDefault();
              return;
            }
            if (keyboardIsOpen.current) {
              keyboardIsOpen.current = false;
            }
            e.preventDefault();
            onOpenChange?.(false);
            if (!dismissible || openProp !== undefined) {
              return;
            }
    
            closeDrawer();
          }}
    */

    return (
        <FocusTrap active={true}>
            <div
                ref={composedRef}
                vaul-drawer=""
                vaul-drawer-direction={direction}
                vaul-drawer-visible={visible ? 'true' : 'false'}
                role="dialog"
                tabIndex={-1}
                aria-modal
                className={classes.content}
                style={{
                    ...(snapPointsOffset && snapPointsOffset.length > 0
                        ? ({
                            //@ts-ignore
                            '--snap-point-height': `${snapPointsOffset[0]!}px`,
                            ...style,
                        } as CSSProperties)
                        : style as any), ...style
                }}
                onPointerDown={(event) => {
                    rest.onPointerDown?.(event)
                    pointerStartRef.current = { x: event.clientX, y: event.clientY }
                    onPress(event)
                }}
                onPointerMove={(event) => {
                    rest.onPointerMove?.(event)
                    if (!pointerStartRef.current) return null
                    const yPosition = event.clientY - pointerStartRef.current.y
                    const xPosition = event.clientX - pointerStartRef.current.x

                    const isHorizontalSwipe = ['left', 'right'].includes(direction)
                    const clamp = ['left', 'top'].includes(direction) ? Math.min : Math.max

                    const clampedX = isHorizontalSwipe ? clamp(0, xPosition) : 0
                    const clampedY = !isHorizontalSwipe ? clamp(0, yPosition) : 0
                    const swipeStartThreshold = event.pointerType === 'touch' ? 10 : 2
                    const delta = { x: clampedX, y: clampedY }

                    const isAllowedToSwipe = isDeltaInDirection(delta, direction, swipeStartThreshold)
                    if (isAllowedToSwipe) onDrag(event)
                    else if (Math.abs(xPosition) > swipeStartThreshold || Math.abs(yPosition) > swipeStartThreshold) {
                        pointerStartRef.current = null
                    }
                }}
                onPointerUp={(event) => {
                    rest.onPointerUp?.(event)
                    pointerStartRef.current = null
                    onRelease(event)
                }}
            >
                {children}
            </div>
        </FocusTrap >
    )
})

VaulContent.displayName = 'mantine-vaul/VaulContent'