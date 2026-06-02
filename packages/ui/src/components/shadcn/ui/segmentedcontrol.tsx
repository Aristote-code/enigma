'use client'

import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '../../../lib/utils/cn'

const segmentedControlVariants = cva('inline-flex items-center rounded-lg bg-surface-200 p-0.5', {
  variants: {
    size: {
      sm: 'text-xs',
      md: 'text-sm',
    },
    disabled: {
      true: 'opacity-50 pointer-events-none',
      false: '',
    },
  },
  defaultVariants: {
    size: 'md',
    disabled: false,
  },
})

const segmentedControlItemVariants = cva(
  'relative rounded-md font-medium transition-colors cursor-pointer select-none text-foreground-lighter',
  {
    variants: {
      size: {
        sm: 'py-1 px-2.5 text-xs',
        md: 'py-1.5 px-3 text-sm',
      },
      active: {
        true: 'bg-background text-foreground shadow-sm',
        false: 'hover:text-foreground-light',
      },
    },
    defaultVariants: {
      size: 'md',
      active: false,
    },
  }
)

export interface SegmentedControlItem {
  value: string
  label: React.ReactNode
}

export interface SegmentedControlProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, 'disabled'>,
    VariantProps<typeof segmentedControlVariants> {
  items: SegmentedControlItem[]
  value?: string
  onValueChange?: (value: string) => void
}

const SegmentedControl = React.forwardRef<HTMLDivElement, SegmentedControlProps>(
  ({ className, items, value, onValueChange, size, disabled, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="tablist"
        className={cn(segmentedControlVariants({ size, disabled }), className)}
        {...props}
      >
        {items.map((item) => {
          const isActive = item.value === value

          return (
            <button
              key={item.value}
              type="button"
              role="tab"
              aria-selected={isActive}
              disabled={disabled === true}
              onClick={() => onValueChange?.(item.value)}
              className={cn(
                segmentedControlItemVariants({ size, active: isActive }),
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground-muted'
              )}
            >
              {item.label}
            </button>
          )
        })}
      </div>
    )
  }
)
SegmentedControl.displayName = 'SegmentedControl'

export { SegmentedControl, segmentedControlVariants, segmentedControlItemVariants }
