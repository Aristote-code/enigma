'use client'

import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '../../../lib/utils/cn'

const colorPickerVariants = cva('inline-flex flex-col gap-2', {
  variants: {
    size: {
      sm: 'gap-1.5',
      md: 'gap-2',
      lg: 'gap-3',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

const HEX_REGEX = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/

function isValidHex(value: string): boolean {
  return HEX_REGEX.test(value)
}

/**
 * Normalize a partial hex string into a full 7-character hex color.
 * Returns null when the string cannot be normalized.
 */
function normalizeHex(value: string): string | null {
  const trimmed = value.trim()
  const raw = trimmed.startsWith('#') ? trimmed : `#${trimmed}`
  if (!isValidHex(raw)) return null
  // Expand shorthand (#abc -> #aabbcc)
  if (raw.length === 4) {
    const r = raw[1]
    const g = raw[2]
    const b = raw[3]
    return `#${r}${r}${g}${g}${b}${b}`.toLowerCase()
  }
  return raw.toLowerCase()
}

export interface ColorPickerProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>,
    VariantProps<typeof colorPickerVariants> {
  /** Current hex color value, e.g. "#ff5500". */
  value?: string
  /** Called with the new hex string when the color changes. */
  onChange?: (value: string) => void
  /** Array of preset hex colors to display as a selectable palette. */
  presets?: string[]
  /** When true the picker is non-interactive. */
  disabled?: boolean
}

const ColorPicker = React.forwardRef<HTMLDivElement, ColorPickerProps>(
  (
    { className, value = '#000000', onChange, presets, size = 'md', disabled = false, ...props },
    ref
  ) => {
    const [inputValue, setInputValue] = React.useState(value)

    // Keep the text input in sync when the controlled value changes externally.
    React.useEffect(() => {
      setInputValue(value)
    }, [value])

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
      const raw = e.target.value
      setInputValue(raw)

      const normalized = normalizeHex(raw)
      if (normalized) {
        onChange?.(normalized)
      }
    }

    function handleInputBlur() {
      const normalized = normalizeHex(inputValue)
      if (normalized) {
        setInputValue(normalized)
        onChange?.(normalized)
      } else {
        // Revert to the last valid controlled value.
        setInputValue(value)
      }
    }

    function handlePresetClick(color: string) {
      if (disabled) return
      const normalized = normalizeHex(color) ?? color.toLowerCase()
      setInputValue(normalized)
      onChange?.(normalized)
    }

    return (
      <div ref={ref} className={cn(colorPickerVariants({ size }), className)} {...props}>
        {/* Swatch + hex input row */}
        <div className="inline-flex items-center gap-2">
          <span
            className={cn(
              'size-6 shrink-0 rounded-full border border-default',
              disabled && 'opacity-50'
            )}
            style={{ backgroundColor: isValidHex(value) ? value : '#000000' }}
            aria-hidden="true"
          />
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            disabled={disabled}
            aria-label="Hex color value"
            className={cn(
              'flex h-8 w-28 rounded-md border border-control bg-foreground/[.026] px-3 py-1 text-sm text-foreground',
              'placeholder:text-foreground-muted',
              'focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-foreground-muted focus-visible:ring-offset-2',
              'disabled:pointer-events-none disabled:opacity-50'
            )}
            placeholder="#000000"
          />
        </div>

        {/* Preset palette */}
        {presets && presets.length > 0 && (
          <div className="grid grid-cols-8 gap-1.5" role="listbox" aria-label="Color presets">
            {presets.map((color) => {
              const normalized = normalizeHex(color) ?? color.toLowerCase()
              const isSelected = normalized === (normalizeHex(value) ?? value.toLowerCase())

              return (
                <button
                  key={color}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  aria-label={normalized}
                  disabled={disabled}
                  onClick={() => handlePresetClick(color)}
                  className={cn(
                    'size-6 rounded-full cursor-pointer border-2 ring-2 transition-colors',
                    'focus-visible:outline-hidden focus-visible:ring-brand',
                    'disabled:pointer-events-none disabled:opacity-50',
                    isSelected
                      ? 'border-brand ring-brand'
                      : 'border-transparent ring-transparent hover:border-brand'
                  )}
                  style={{ backgroundColor: normalized }}
                />
              )
            })}
          </div>
        )}
      </div>
    )
  }
)

ColorPicker.displayName = 'ColorPicker'

export { ColorPicker, colorPickerVariants }
