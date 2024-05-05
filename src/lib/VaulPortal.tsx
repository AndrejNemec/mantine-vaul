import type { ExtendComponent, Factory, MantineThemeComponent } from '@mantine/core'
import { RemoveScroll, useProps } from '@mantine/core'
import { Drawer } from 'vaul'
import type { ComponentPropsWithRef, ReactNode } from 'react'
import { useVaulContext } from './context'

export interface VaulPortalProps {
    target?: HTMLElement | null
    removeScrollProps?: Omit<ComponentPropsWithRef<typeof RemoveScroll>, 'children'>
    children: ReactNode
}

export type VaulPortalFactory = Factory<{
    props: VaulPortalProps
}>

const defaultProps: Partial<VaulPortalProps> = {
}

export const VaulPortal = (_props: VaulPortalProps) => {
    const {
        children,
        target,
        removeScrollProps: removeScrollPropsProp
    } = useProps('VaulPortal', defaultProps, _props)

    const {
        opened,
        portalTarget,
        removeScrollProps,
        lockScroll
    } = useVaulContext()

    return (
        <Drawer.Portal container={target || portalTarget}>
            <RemoveScroll
                enabled={opened && lockScroll}
                {...removeScrollProps}
                {...removeScrollPropsProp as Record<string, any>}
            >
                {children}
            </RemoveScroll>
        </Drawer.Portal>
    )
}

const extendVaulContent = (c: ExtendComponent<VaulPortalFactory>): MantineThemeComponent => c

VaulPortal.displayName = 'mantine-vaul/VaulPortal'
VaulPortal.extend = extendVaulContent