// This code comes from https://github.com/radix-ui/primitives/blob/main/packages/react/use-controllable-state/src/useControllableState.tsx

import type { Dispatch} from 'react'
import { useCallback, useEffect, useMemo, useRef, useState, type SetStateAction } from 'react'

type UseControllableStateParams<T> = {
  prop?: T | undefined;
  defaultProp?: T | undefined;
  onChange?: (state: T) => void;
}

type SetStateFn<T> = (prevState?: T) => T

function useCallbackRef<T extends (...args: any[]) => any>(callback: T | undefined): T {
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  })

  // https://github.com/facebook/react/issues/19240
  return useMemo(() => ((...args) => callbackRef.current?.(...args)) as T, [])
}

function useUncontrolledState<T>({ defaultProp, onChange }: Omit<UseControllableStateParams<T>, 'prop'>) {
  const uncontrolledState = useState<T | undefined>(defaultProp)
  const [value] = uncontrolledState
  const prevValueRef = useRef(value)
  const handleChange = useCallbackRef(onChange)

  useEffect(() => {
    if (prevValueRef.current !== value) {
      handleChange(value as T)
      prevValueRef.current = value
    }
  }, [value, prevValueRef, handleChange])

  return uncontrolledState
}
export function useControllableState<T>({ prop, defaultProp, onChange = () => {} }: UseControllableStateParams<T>) {
  const [uncontrolledProp, setUncontrolledProp] = useUncontrolledState({ defaultProp, onChange })
  const isControlled = prop !== undefined
  const value = isControlled ? prop : uncontrolledProp
  const handleChange = useCallbackRef(onChange)

  const setValue: Dispatch<SetStateAction<T | undefined>> = useCallback(
    (nextValue) => {
      if (isControlled) {
        const setter = nextValue as SetStateFn<T>
        const value = typeof nextValue === 'function' ? setter(prop) : nextValue
        if (value !== prop) handleChange(value as T)
      } else {
        setUncontrolledProp(nextValue)
      }
    },
    [isControlled, prop, setUncontrolledProp, handleChange],
  )

  return [value, setValue] as const
}
