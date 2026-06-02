import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '../../../lib/utils/cn'

const bannerVariants = cva(
  'relative w-full flex items-center gap-3 px-4 py-3 rounded-lg border text-sm',
  {
    variants: {
      variant: {
        info: 'bg-brand-200 text-brand border-brand-300',
        warning: 'bg-warning-200 text-warning border-warning-300',
        error: 'bg-destructive-200 text-destructive border-destructive-300',
        success: 'bg-green-100 text-green-900 border-green-200',
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  }
)

export interface BannerProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof bannerVariants> {
  icon?: React.ReactNode
  action?: React.ReactNode
  onDismiss?: () => void
}

const Banner = React.forwardRef<HTMLDivElement, BannerProps>(
  ({ className, variant, icon, action, onDismiss, children, ...props }, ref) => (
    <div ref={ref} role="alert" className={cn(bannerVariants({ variant }), className)} {...props}>
      {icon && <BannerIcon>{icon}</BannerIcon>}
      <BannerContent>{children}</BannerContent>
      {action && <BannerAction>{action}</BannerAction>}
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss"
          className={cn(
            'inline-flex items-center justify-center rounded-md',
            'size-6 shrink-0',
            'transition-colors',
            'hover:bg-surface-200 hover:text-foreground',
            'focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-foreground-muted',
            'disabled:pointer-events-none disabled:opacity-50'
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      )}
    </div>
  )
)
Banner.displayName = 'Banner'

const BannerIcon = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span ref={ref} className={cn('shrink-0 [&>svg]:size-4', className)} {...props} />
  )
)
BannerIcon.displayName = 'BannerIcon'

const BannerContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex-1 min-w-0', className)} {...props} />
  )
)
BannerContent.displayName = 'BannerContent'

const BannerAction = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('shrink-0', className)} {...props} />
  )
)
BannerAction.displayName = 'BannerAction'

export { Banner, BannerIcon, BannerContent, BannerAction, bannerVariants }
