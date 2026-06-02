'use client'

import { cva, type VariantProps } from 'class-variance-authority'
import { Slot as SlotPrimitive } from 'radix-ui'
import * as React from 'react'

import { cn } from '../../../lib/utils/cn'

const linkButtonVariants = cva(
  'inline-flex items-center underline decoration-transparent underline-offset-[3px] transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-foreground-muted focus-visible:ring-offset-2 disabled:pointer-events-none disabled:text-foreground-muted disabled:no-underline disabled:decoration-transparent',
  {
    variants: {
      variant: {
        gray: 'text-foreground-lighter hover:text-foreground hover:decoration-current focus:text-foreground',
        black: 'text-foreground hover:decoration-current',
        primary: 'text-brand hover:text-brand-600 hover:decoration-current',
        destructive: 'text-destructive hover:text-destructive-600 hover:decoration-current',
      },
      size: {
        medium: 'h-5 gap-1 text-sm',
        small: 'h-4 gap-1 text-xs',
      },
      underline: {
        true: 'decoration-current',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'gray',
      size: 'medium',
      underline: false,
    },
  }
)

export interface LinkButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof linkButtonVariants> {
  asChild?: boolean
}

const LinkButton = React.forwardRef<HTMLButtonElement, LinkButtonProps>(
  ({ className, variant, size, underline, asChild = false, ...props }, ref) => {
    const Comp = asChild ? SlotPrimitive.Slot : 'button'
    return (
      <Comp
        className={cn(linkButtonVariants({ variant, size, underline, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
LinkButton.displayName = 'LinkButton'

export { LinkButton, linkButtonVariants }
