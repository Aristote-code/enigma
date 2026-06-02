import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '../../../lib/utils/cn'

const avatarGroupVariants = cva('flex items-center', {
  variants: {
    size: {
      sm: '[&>*]:-ml-1.5',
      md: '[&>*]:-ml-2',
      lg: '[&>*]:-ml-3',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

const overflowIndicatorVariants = cva(
  'relative flex shrink-0 items-center justify-center rounded-full border-2 border-background bg-surface-200 font-medium text-foreground-lighter ring-2 ring-background',
  {
    variants: {
      size: {
        sm: 'h-6 w-6 text-[10px]',
        md: 'h-8 w-8 text-xs',
        lg: 'h-10 w-10 text-sm',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

export interface AvatarGroupProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof avatarGroupVariants> {
  /** Maximum number of avatars to display before showing the +N indicator */
  max?: number
}

const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ className, size, max, children, ...props }, ref) => {
    const childArray = React.Children.toArray(children)
    const totalCount = childArray.length
    const hasOverflow = max !== undefined && totalCount > max
    const visibleChildren = hasOverflow ? childArray.slice(0, max) : childArray
    const overflowCount = hasOverflow ? totalCount - max : 0

    return (
      <div ref={ref} className={cn(avatarGroupVariants({ size }), className)} {...props}>
        {visibleChildren.map((child) => {
          if (!React.isValidElement(child)) return child
          return React.cloneElement(child as React.ReactElement<{ className?: string }>, {
            className: cn(
              'ring-2 ring-background',
              (child as React.ReactElement<{ className?: string }>).props.className
            ),
          })
        })}
        {hasOverflow && (
          <span className={cn(overflowIndicatorVariants({ size }))}>+{overflowCount}</span>
        )}
      </div>
    )
  }
)
AvatarGroup.displayName = 'AvatarGroup'

export { AvatarGroup, avatarGroupVariants }
