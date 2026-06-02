'use client'

import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '../../../lib/utils/cn'

const digitInputVariants = cva('flex', {
  variants: {
    gap: {
      default: 'gap-2',
      tight: 'gap-1',
      loose: 'gap-3',
    },
  },
  defaultVariants: {
    gap: 'default',
  },
})

const digitBoxVariants = cva(
  'w-10 h-12 text-center text-lg font-semibold rounded-lg border bg-background text-foreground transition-all duration-150 outline-none',
  {
    variants: {
      variant: {
        default: 'border-control focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20',
        error: 'border-destructive focus:border-destructive focus:ring-2 focus:ring-destructive/20',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface DigitInputProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>,
    VariantProps<typeof digitInputVariants> {
  /** Number of digit boxes to render */
  length?: number
  /** Current value as a string of digits */
  value?: string
  /** Callback fired when the value changes */
  onChange?: (value: string) => void
  /** Whether the input is disabled */
  disabled?: boolean
  /** Show error styling on all boxes */
  isError?: boolean
  /** Auto-focus the first input on mount */
  autoFocus?: boolean
}

const DigitInput = React.forwardRef<HTMLDivElement, DigitInputProps>(
  (
    {
      className,
      length = 6,
      value = '',
      onChange,
      disabled = false,
      isError = false,
      autoFocus = false,
      gap,
      ...props
    },
    ref
  ) => {
    const inputRefs = React.useRef<(HTMLInputElement | null)[]>([])

    const digits = React.useMemo(() => {
      const arr = value.split('').slice(0, length)
      while (arr.length < length) {
        arr.push('')
      }
      return arr
    }, [value, length])

    React.useEffect(() => {
      if (autoFocus && inputRefs.current[0]) {
        inputRefs.current[0].focus()
      }
    }, [autoFocus])

    const focusInput = (index: number) => {
      if (index >= 0 && index < length && inputRefs.current[index]) {
        inputRefs.current[index]?.focus()
      }
    }

    const updateValue = (newDigits: string[]) => {
      const newValue = newDigits.join('')
      onChange?.(newValue)
    }

    const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value

      // Only accept single digit
      if (inputValue.length > 1) return

      if (inputValue && !/^[0-9]$/.test(inputValue)) return

      const newDigits = [...digits]
      newDigits[index] = inputValue
      updateValue(newDigits)

      // Auto-focus next box when a digit is entered
      if (inputValue && index < length - 1) {
        focusInput(index + 1)
      }
    }

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Backspace') {
        if (digits[index]) {
          // Clear current box
          const newDigits = [...digits]
          newDigits[index] = ''
          updateValue(newDigits)
        } else if (index > 0) {
          // Move to previous box and clear it
          focusInput(index - 1)
          const newDigits = [...digits]
          newDigits[index - 1] = ''
          updateValue(newDigits)
        }
        e.preventDefault()
      } else if (e.key === 'ArrowLeft' && index > 0) {
        focusInput(index - 1)
        e.preventDefault()
      } else if (e.key === 'ArrowRight' && index < length - 1) {
        focusInput(index + 1)
        e.preventDefault()
      }
    }

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault()
      const pastedData = e.clipboardData.getData('text/plain').replace(/\D/g, '').slice(0, length)

      if (!pastedData) return

      const newDigits = [...digits]
      for (let i = 0; i < pastedData.length; i++) {
        newDigits[i] = pastedData[i]
      }
      updateValue(newDigits)

      // Focus the box after the last pasted digit, or the last box
      const nextIndex = Math.min(pastedData.length, length - 1)
      focusInput(nextIndex)
    }

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      e.target.select()
    }

    const boxVariant = isError ? 'error' : 'default'

    return (
      <div ref={ref} className={cn(digitInputVariants({ gap }), className)} {...props}>
        {digits.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el
            }}
            type="text"
            inputMode="numeric"
            pattern="[0-9]"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            onFocus={handleFocus}
            disabled={disabled}
            aria-label={`Digit ${index + 1} of ${length}`}
            className={cn(
              digitBoxVariants({ variant: boxVariant }),
              'disabled:pointer-events-none disabled:opacity-50'
            )}
          />
        ))}
      </div>
    )
  }
)

DigitInput.displayName = 'DigitInput'

export { DigitInput, digitInputVariants, digitBoxVariants }
