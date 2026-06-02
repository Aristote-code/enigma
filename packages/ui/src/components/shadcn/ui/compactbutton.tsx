'use client'

import { cva, type VariantProps } from 'class-variance-authority'
import { Slot as SlotPrimitive } from 'radix-ui'
import * as React from 'react'

import { cn } from '../../../lib/utils/cn'

const compactButtonVariants = cva(
  'inline-flex items-center justify-center rounded-md transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-foreground-muted focus-visible:ring-offset-2 ring-offset-background disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        stroke:
          'border border-default bg-background text-foreground-light shadow-sm hover:bg-surface-100 hover:text-foreground',
        ghost: 'bg-transparent text-foreground-light hover:bg-surface-100 hover:text-foreground',
        filled: 'bg-surface-200 text-foreground-light hover:bg-surface-300 hover:text-foreground',
      },
      size: {
        sm: 'size-6',
        md: 'size-7',
        lg: 'size-8',
      },
      fullRadius: {
        true: 'rounded-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'stroke',
      size: 'md',
      fullRadius: false,
    },
  }
)

export interface CompactButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof compactButtonVariants> {
  asChild?: boolean
}

const CompactButton = React.forwardRef<HTMLButtonElement, CompactButtonProps>(
  ({ className, variant, size, fullRadius, asChild = false, ...props }, ref) => {
    const Comp = asChild ? SlotPrimitive.Slot : 'button'
    return (
      <Comp
        className={cn(compactButtonVariants({ variant, size, fullRadius, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
CompactButton.displayName = 'CompactButton'

export { CompactButton, compactButtonVariants }
