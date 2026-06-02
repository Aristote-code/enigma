import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '../../../lib/utils/cn'

const tagVariants = cva(
  'inline-flex items-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground-muted',
  {
    variants: {
      variant: {
        stroke:
          'border border-default bg-transparent text-foreground-light hover:bg-surface-100 hover:text-foreground',
        filled:
          'border border-transparent bg-surface-200 text-foreground-light hover:bg-surface-300 hover:text-foreground',
      },
      size: {
        sm: 'h-6 px-2 text-xs gap-1',
        md: 'h-7 px-2.5 text-sm gap-1.5',
        lg: 'h-8 px-3 text-sm gap-2',
      },
      disabled: {
        true: 'opacity-50 pointer-events-none',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'stroke',
      size: 'md',
      disabled: false,
    },
  }
)

export interface TagProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'disabled'>, VariantProps<typeof tagVariants> {
  icon?: React.ReactNode
  onDismiss?: () => void
}

const Tag = React.forwardRef<HTMLDivElement, TagProps>(
  ({ className, variant, size, disabled, icon, onDismiss, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(tagVariants({ variant, size, disabled }), className)} {...props}>
        {icon && <span className="shrink-0">{icon}</span>}
        <span>{children}</span>
        {onDismiss && (
          <button
            type="button"
            aria-label="Dismiss"
            disabled={disabled === true}
            onClick={onDismiss}
            className="inline-flex items-center justify-center rounded-full size-3.5 hover:bg-surface-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground-muted"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>
    )
  }
)
Tag.displayName = 'Tag'

export { Tag, tagVariants }
