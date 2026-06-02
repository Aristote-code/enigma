import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '../../../lib/utils/cn'

const KbdVariants = cva(
  'inline-flex items-center justify-center rounded-md border border-default bg-surface-100 font-mono text-foreground-light shadow-sm',
  {
    variants: {
      size: {
        sm: 'h-5 min-w-5 px-1 text-[10px]',
        md: 'h-6 min-w-6 px-1.5 text-xs',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

export interface KbdProps
  extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof KbdVariants> {}

const Kbd = React.forwardRef<HTMLElement, KbdProps>(
  ({ className, size, children, ...props }, ref) => {
    return (
      <kbd ref={ref} className={cn(KbdVariants({ size }), className)} {...props}>
        {children}
      </kbd>
    )
  }
)
Kbd.displayName = 'Kbd'

export { Kbd }
