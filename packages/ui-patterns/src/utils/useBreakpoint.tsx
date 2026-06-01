'use client'

import { useState } from 'react'
import { useIsomorphicLayoutEffect, useWindowSize } from 'react-use'

const twBreakpointMap = {
  sm: 639,
  md: 767,
  lg: 1023,
  xl: 1279,
  '2xl': 1535,
}

export function useBreakpoint(breakpoint: number | keyof typeof twBreakpointMap = 'lg') {
  const [isBreakpoint, setIsBreakpoint] = useState(false)
  const { width } = useWindowSize()

  const _breakpoint = typeof breakpoint === 'string' ? twBreakpointMap[breakpoint] : breakpoint

  useIsomorphicLayoutEffect(() => {
    if (width <= _breakpoint) {
      setIsBreakpoint(true)
    } else {
      setIsBreakpoint(false)
    }
  }, [width])

  return isBreakpoint
}
