'use client'

import { useRef } from 'react'

type ResultBox<T> = { v: T }

export function useConstant<T>(fn: () => T): T {
  const ref = useRef<ResultBox<T> | null>(null)

  if (!ref.current) {
    ref.current = { v: fn() }
  }

  return ref.current.v
}
