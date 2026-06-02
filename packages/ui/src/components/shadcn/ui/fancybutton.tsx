'use client'

import { cva, type VariantProps } from 'class-variance-authority'
import { Slot as SlotPrimitive } from 'radix-ui'
import * as React from 'react'

import { cn } from '../../../lib/utils/cn'

const fancyButtonVariants = cva(
  'relative inline-flex items-center justify-center font-medium ring-offset-background transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-foreground-muted focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 before:absolute before:inset-0 before:rounded-[inherit] before:bg-gradient-to-b before:from-white/[.12] before:to-transparent before:pointer-events-none',
  {
    variants: {
      variant: {
        brand: 'bg-brand text-white shadow-lg hover:bg-brand/90',
        neutral: 'bg-foreground text-background shadow-lg hover:bg-foreground/90',
        destructive: 'bg-destructive text-white shadow-lg hover:bg-destructive/90',
        basic:
          'bg-background text-foreground-light border border-default shadow-sm hover:bg-surface-100 hover:text-foreground',
      },
      size: {
        medium: 'h-10 px-3.5 gap-3 rounded-lg text-sm',
        small: 'h-9 px-3 gap-2 rounded-lg text-sm',
        xsmall: 'h-8 px-2.5 gap-1.5 rounded-md text-xs',
      },
    },
    defaultVariants: {
      variant: 'brand',
      size: 'medium',
    },
  }
)

export interface FancyButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof fancyButtonVariants> {
  asChild?: boolean
}

const FancyButton = React.forwardRef<HTMLButtonElement, FancyButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? SlotPrimitive.Slot : 'button'
    return (
      <Comp
        className={cn(fancyButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
FancyButton.displayName = 'FancyButton'

const FancyButtonIcon = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => {
    return <span className={cn('shrink-0 size-5', className)} ref={ref} {...props} />
  }
)
FancyButtonIcon.displayName = 'FancyButtonIcon'

export { FancyButton, FancyButtonIcon, fancyButtonVariants }
