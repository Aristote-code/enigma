'use client'

import { Calendar as CalendarIcon } from 'lucide-react'
import * as React from 'react'

import { cn } from '../../../lib/utils/cn'
import { Calendar } from './calendar'
import { Popover, PopoverContent, PopoverTrigger } from './popover'

function formatDate(date?: Date) {
  if (!date) return ''
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
}

export interface DatepickerProps {
  /** Currently selected date (controlled). */
  value?: Date
  /** Called when a date is selected. */
  onChange?: (date: Date | undefined) => void
  /** Placeholder shown when no date is selected. */
  placeholder?: string
  /** Disable the trigger. */
  disabled?: boolean
  className?: string
  /** Format the selected date label. Defaults to a localized long date. */
  formatLabel?: (date: Date) => string
}

/**
 * A single-date picker composing Popover + Calendar with a button trigger.
 */
const Datepicker = React.forwardRef<HTMLButtonElement, DatepickerProps>(
  ({ value, onChange, placeholder = 'Pick a date', disabled, className, formatLabel }, ref) => {
    const [open, setOpen] = React.useState(false)
    const label = value ? (formatLabel ? formatLabel(value) : formatDate(value)) : placeholder

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            ref={ref}
            type="button"
            disabled={disabled}
            className={cn(
              'inline-flex h-10 w-[280px] items-center gap-2 rounded-md border border-control bg-background px-3 text-sm transition-colors',
              'hover:border-foreground-muted focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-foreground-muted focus-visible:ring-offset-2',
              'disabled:pointer-events-none disabled:opacity-50',
              value ? 'text-foreground' : 'text-foreground-lighter',
              className
            )}
          >
            <CalendarIcon className="size-4 shrink-0 text-foreground-muted" strokeWidth={1.5} />
            <span className="truncate">{label}</span>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            onSelect={(date) => {
              onChange?.(date)
              setOpen(false)
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    )
  }
)
Datepicker.displayName = 'Datepicker'

export { Datepicker }
