import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '../../../lib/utils/cn'

const statusBadgeDotVariants = cva('size-1.5 rounded-full inline-block shrink-0', {
  variants: {
    variant: {
      online: 'bg-green-800',
      offline: 'bg-foreground-muted',
      away: 'bg-warning',
      busy: 'bg-destructive',
      neutral: 'bg-foreground-lighter',
    },
  },
  defaultVariants: {
    variant: 'neutral',
  },
})

const statusBadgeVariants = cva(
  'inline-flex items-center rounded-full border border-default bg-surface-100 text-foreground-light',
  {
    variants: {
      size: {
        sm: 'h-5 px-2 text-xs',
        md: 'h-6 px-2.5 text-sm',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

export interface StatusBadgeProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusBadgeVariants>,
    VariantProps<typeof statusBadgeDotVariants> {}

const StatusBadge = React.forwardRef<HTMLDivElement, StatusBadgeProps>(
  ({ className, variant = 'neutral', size = 'md', children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(statusBadgeVariants({ size }), className)} {...props}>
        <span className={cn(statusBadgeDotVariants({ variant }), children && 'mr-1.5')} />
        {children}
      </div>
    )
  }
)
StatusBadge.displayName = 'StatusBadge'

export { StatusBadge, statusBadgeVariants, statusBadgeDotVariants }
