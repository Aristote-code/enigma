import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '../../../lib/utils/cn'

const notificationVariants = cva(
  'relative flex gap-3 p-4 rounded-lg border border-default bg-background shadow-sm text-sm',
  {
    variants: {
      variant: {
        info: '[&>[data-slot=icon]]:text-brand',
        success: '[&>[data-slot=icon]]:text-brand-600',
        warning: '[&>[data-slot=icon]]:text-warning',
        error: '[&>[data-slot=icon]]:text-destructive',
        neutral: '[&>[data-slot=icon]]:text-foreground-light',
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  }
)

export interface NotificationProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof notificationVariants> {
  icon?: React.ReactNode
  onDismiss?: () => void
}

const Notification = React.forwardRef<HTMLDivElement, NotificationProps>(
  ({ className, variant, icon, onDismiss, children, ...props }, ref) => (
    <div
      ref={ref}
      role="status"
      className={cn(notificationVariants({ variant }), className)}
      {...props}
    >
      {icon && <NotificationIcon>{icon}</NotificationIcon>}
      <div className="flex-1 min-w-0">{children}</div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss"
          className={cn(
            'absolute top-3 right-3',
            'inline-flex items-center justify-center rounded-md',
            'size-6 shrink-0',
            'transition-colors',
            'text-foreground-muted',
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
Notification.displayName = 'Notification'

const NotificationIcon = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      data-slot="icon"
      className={cn('shrink-0 mt-0.5 [&>svg]:size-5', className)}
      {...props}
    />
  )
)
NotificationIcon.displayName = 'NotificationIcon'

const NotificationTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn('text-sm font-medium text-foreground leading-none tracking-tight', className)}
    {...props}
  />
))
NotificationTitle.displayName = 'NotificationTitle'

const NotificationDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('text-sm text-foreground-lighter mt-1', className)} {...props} />
))
NotificationDescription.displayName = 'NotificationDescription'

const NotificationTimestamp = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn('text-xs text-foreground-muted mt-1 block', className)}
    {...props}
  />
))
NotificationTimestamp.displayName = 'NotificationTimestamp'

const NotificationActions = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex gap-2 mt-2', className)} {...props} />
  )
)
NotificationActions.displayName = 'NotificationActions'

export {
  Notification,
  NotificationIcon,
  NotificationTitle,
  NotificationDescription,
  NotificationTimestamp,
  NotificationActions,
  notificationVariants,
}
