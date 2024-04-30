// This hook is copied from https://github.com/amannn/react-hooks/blob/main/packages/use-presence/src/usePresence.tsx, thanks

import { useEffect, useState } from 'react'

type SharedTransitionConfig = {
  transitionDuration: number
}

type SeparateTransitionConfig = {
  enterTransitionDuration: number
  exitTransitionDuration: number
}

export const usePresence = (
  isVisible: boolean,
  opts: (
    | SharedTransitionConfig
    | SeparateTransitionConfig
    | (SharedTransitionConfig & SeparateTransitionConfig)
  ) & {
    initialEnter?: boolean
  }
) => {
  const exitTransitionDuration =
    'exitTransitionDuration' in opts
      ? opts.exitTransitionDuration
      : opts.transitionDuration
  const enterTransitionDuration =
    'enterTransitionDuration' in opts
      ? opts.enterTransitionDuration
      : opts.transitionDuration

  const initialEnter = opts.initialEnter ?? false
  const [animateIsVisible, setAnimateIsVisible] = useState(
    initialEnter ? false : isVisible
  )
  const [isMounted, setIsMounted] = useState(isVisible)
  const [hasEntered, setHasEntered] = useState(
    initialEnter ? false : isVisible
  )

  const isExiting = isMounted && !isVisible
  const isEntering = isVisible && !hasEntered
  const isAnimating = isEntering || isExiting

  useEffect(() => {
    if (isVisible) {
      setIsMounted(true)
    } else {
      setHasEntered(false)
      setAnimateIsVisible(false)

      const timeoutId = setTimeout(() => {
        setIsMounted(false)
      }, exitTransitionDuration)

      return () => {
        clearTimeout(timeoutId)
      }
    }
  }, [isVisible, exitTransitionDuration])

  useEffect(() => {
    if (isVisible && isMounted && !animateIsVisible) {
      // Force a reflow so the initial styles are flushed to the DOM
      if (typeof document !== 'undefined') {
        // We need a side effect so Terser doesn't remove this statement
        (window as any)._usePresenceReflow = document.body.offsetHeight
      }

      const animationFrameId = requestAnimationFrame(() => {
        setAnimateIsVisible(true)
      })

      return () => {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [animateIsVisible, enterTransitionDuration, isMounted, isVisible])

  useEffect(() => {
    if (animateIsVisible && !hasEntered) {
      const timeoutId = setTimeout(() => {
        setHasEntered(true)
      }, enterTransitionDuration)

      return () => {
        clearTimeout(timeoutId)
      }
    }
  }, [animateIsVisible, enterTransitionDuration, hasEntered])

  return {
    isMounted,
    isVisible: animateIsVisible,
    isAnimating,
    isEntering,
    isExiting
  }
}