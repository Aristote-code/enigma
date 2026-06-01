'use client'

import type * as React from 'react'

export const isBrowser = typeof window !== 'undefined'

export function mergeRefs<T>(...refs: React.Ref<T>[]): React.RefCallback<T> {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(value)
      } else if (ref !== null) {
        if (typeof ref === 'object' && ref !== null && 'current' in ref) {
          ;(ref as any).current = value
        }
      }
    })
  }
}
