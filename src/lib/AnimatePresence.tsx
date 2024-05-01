import { memo, type ReactNode } from 'react'
import type { SeparateTransitionConfig, SharedTransitionConfig} from './hooks/usePresence'
import { usePresence } from './hooks/usePresence'

export type AnimatePresenceProps = {
    isVisible: boolean
    initialEnter?: boolean
    children: (props: Omit<ReturnType<typeof usePresence>, 'isMounted'>) => ReactNode
} & (SharedTransitionConfig | SeparateTransitionConfig | (SharedTransitionConfig & SeparateTransitionConfig))

export const AnimatePresence = memo(({ isVisible, children, ...props }: AnimatePresenceProps) => {
    const { isMounted, ...rest } = usePresence(isVisible, props)

    if (!isMounted) return null

    return (
        <>
            {children(rest)}
        </>
    )
})

AnimatePresence.displayName = 'mantine-vaul/AnimatePresence'