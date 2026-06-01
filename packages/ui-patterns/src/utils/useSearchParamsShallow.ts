'use client'

import { useCallback, useEffect, useId, useMemo, useReducer, useRef } from 'react'

const useSearchParamsShallow = () => {
  const EVENT_NAME = 'ds.events.useSearchParamsShallow'
  const id = useId()
  const timeoutHandle = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const reducer = useCallback(
    (_: URLSearchParams, action: { target: 'int' | 'ext'; newParams: URLSearchParams }) => {
      clearTimeout(timeoutHandle.current)
      if (action.target === 'ext') {
        timeoutHandle.current = setTimeout(() => {
          document.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: { id } }))
        })
      }
      return action.newParams
    },
    [id]
  )

  useEffect(() => () => clearTimeout(timeoutHandle.current), [])

  const [localParams, setLocalParams] = useReducer(reducer, undefined, () => new URLSearchParams())

  useEffect(() => {
    const handler = (event: CustomEvent<{ id: string }>) => {
      if (event.detail.id !== id) {
        const globalParams = new URLSearchParams(window.location.search)
        setLocalParams({ target: 'int', newParams: globalParams })
      }
    }

    document.addEventListener(EVENT_NAME, handler as EventListener)
    return () => document.removeEventListener(EVENT_NAME, handler as EventListener)
  }, [id])

  useEffect(() => {
    const globalParams = new URLSearchParams(window.location.search)
    setLocalParams({ target: 'int', newParams: globalParams })
  }, [])

  const has = useCallback((key: string) => localParams.has(key), [localParams])

  const get = useCallback((key: string) => localParams.get(key), [localParams])

  const getAll = useCallback((key: string) => localParams.getAll(key), [localParams])

  const set = useCallback((key: string, value: any) => {
    if (typeof window === 'undefined') return

    const url = new URL(window.location.href)
    url.searchParams.set(key, value)
    window.history.replaceState(null, '', url)
    setLocalParams({ target: 'ext', newParams: url.searchParams })
  }, [])

  const append = useCallback((key: string, value: any) => {
    if (typeof window === 'undefined') return

    const url = new URL(window.location.href)
    url.searchParams.append(key, value)
    window.history.replaceState(null, '', url)
    setLocalParams({ target: 'ext', newParams: url.searchParams })
  }, [])

  const _delete = useCallback((key: string) => {
    if (typeof window === 'undefined') return

    const url = new URL(window.location.href)
    url.searchParams.delete(key)
    window.history.replaceState(null, '', url)
    setLocalParams({ target: 'ext', newParams: url.searchParams })
  }, [])

  const api = useMemo(
    () => ({
      has,
      get,
      getAll,
      append,
      set,
      delete: _delete,
    }),
    [has, get, getAll, append, set, _delete]
  )

  return api
}

export { useSearchParamsShallow }
