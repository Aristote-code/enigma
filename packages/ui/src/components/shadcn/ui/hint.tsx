import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '../../../lib/utils/cn'

const hintVariants = cva('flex items-start gap-1.5 text-xs', {
  variants: {
    variant: {
      default: 'text-foreground-lighter',
      error: 'text-destructive',
      success: 'text-green-800',
      warning: 'text-warning',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export interface HintProps
  extends React.HTMLAttributes<HTMLParagraphElement>, VariantProps<typeof hintVariants> {
  icon?: React.ReactNode
  disabled?: boolean
}

const Hint = React.forwardRef<HTMLParagraphElement, HintProps>(
  ({ className, variant, icon, disabled, children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn(hintVariants({ variant }), disabled && 'text-foreground-muted', className)}
        {...props}
      >
        {icon && <span className="shrink-0 size-3.5 mt-0.5">{icon}</span>}
        {children}
      </p>
    )
  }
)
Hint.displayName = 'Hint'

export { Hint, hintVariants }
