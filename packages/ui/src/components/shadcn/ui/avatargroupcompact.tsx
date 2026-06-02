import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '../../../lib/utils/cn'

const avatarGroupCompactVariants = cva('inline-flex items-center rounded-full bg-surface-100 p-1', {
  variants: {
    size: {
      sm: 'gap-1',
      md: 'gap-1.5',
      lg: 'gap-2',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

const compactStackVariants = cva('flex items-center', {
  variants: {
    size: {
      sm: '[&>*]:-ml-1.5 [&>*:first-child]:ml-0',
      md: '[&>*]:-ml-2 [&>*:first-child]:ml-0',
      lg: '[&>*]:-ml-2.5 [&>*:first-child]:ml-0',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

const compactCountVariants = cva('shrink-0 pr-1 font-medium text-foreground-light', {
  variants: {
    size: {
      sm: 'text-[10px]',
      md: 'text-xs',
      lg: 'text-sm',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export interface AvatarGroupCompactProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof avatarGroupCompactVariants> {
  /** Maximum number of avatars to display before collapsing into a +N count */
  max?: number
}

/**
 * A condensed avatar stack inside a pill, with a trailing `+N` count.
 * Useful in tight spaces such as table cells and list rows.
 */
const AvatarGroupCompact = React.forwardRef<HTMLDivElement, AvatarGroupCompactProps>(
  ({ className, size, max = 3, children, ...props }, ref) => {
    const childArray = React.Children.toArray(children)
    const totalCount = childArray.length
    const hasOverflow = totalCount > max
    const visibleChildren = hasOverflow ? childArray.slice(0, max) : childArray
    const overflowCount = hasOverflow ? totalCount - max : 0

    return (
      <div ref={ref} className={cn(avatarGroupCompactVariants({ size }), className)} {...props}>
        <div className={cn(compactStackVariants({ size }))}>
          {visibleChildren.map((child) => {
            if (!React.isValidElement(child)) return child
            return React.cloneElement(child as React.ReactElement<{ className?: string }>, {
              className: cn(
                'ring-2 ring-surface-100',
                (child as React.ReactElement<{ className?: string }>).props.className
              ),
            })
          })}
        </div>
        {overflowCount > 0 && (
          <span className={cn(compactCountVariants({ size }))}>+{overflowCount}</span>
        )}
      </div>
    )
  }
)
AvatarGroupCompact.displayName = 'AvatarGroupCompact'

export { AvatarGroupCompact, avatarGroupCompactVariants }
