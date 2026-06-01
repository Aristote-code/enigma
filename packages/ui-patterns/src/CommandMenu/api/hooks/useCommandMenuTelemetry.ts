'use client'

import { useCallback } from 'react'

import { useCommandMenuTelemetryContext } from './useCommandMenuTelemetryContext'
import { useCommandMenuOpen } from './viewHooks'

export interface CommandMenuTelemetryEvent {
  action: string
  properties: Record<string, unknown>
  groups?: Record<string, unknown>
}

export type CommandMenuTelemetryCallback = (event: CommandMenuTelemetryEvent) => void

export interface UseCommandMenuTelemetryOptions {
  app: string
  onTelemetry?: CommandMenuTelemetryCallback
}

export function useCommandMenuTelemetry({ app, onTelemetry }: UseCommandMenuTelemetryOptions) {
  const sendTelemetry = useCallback(
    (
      triggerType: 'keyboard_shortcut' | 'search_input' = 'search_input',
      groups: Record<string, unknown> = {},
      triggerLocation?: string
    ) => {
      if (!onTelemetry) return

      onTelemetry({
        action: 'command_menu_opened',
        properties: {
          trigger_type: triggerType,
          trigger_location: triggerLocation,
          app,
        },
        groups,
      })
    },
    [app, onTelemetry]
  )

  return { sendTelemetry }
}

export const useCommandMenuOpenedTelemetry: (
  trigger?: 'keyboard_shortcut' | 'search_input'
) => () => void = (trigger = 'search_input') => {
  const telemetryContext = useCommandMenuTelemetryContext()
  const open = useCommandMenuOpen()

  const sendTelemetry = useCallback(() => {
    if (!open && telemetryContext?.onTelemetry) {
      telemetryContext.onTelemetry({
        action: 'command_menu_opened',
        properties: {
          trigger_type: trigger,
          trigger_location: 'user_dropdown_menu',
          app: telemetryContext.app,
        },
        groups: {},
      })
    }
  }, [open, trigger, telemetryContext])

  return sendTelemetry
}
