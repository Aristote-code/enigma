import { cva, type VariantProps } from 'class-variance-authority'
import { Star } from 'lucide-react'
import * as React from 'react'

import { cn } from '../../../lib/utils/cn'

const ratingVariants = cva('inline-flex items-center', {
  variants: {
    size: {
      sm: 'gap-0.5',
      md: 'gap-1',
      lg: 'gap-1.5',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

const ICON_SIZE: Record<string, number> = {
  sm: 16,
  md: 20,
  lg: 24,
}

export interface RatingProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>,
    VariantProps<typeof ratingVariants> {
  /** Current rating value. Supports half values such as 2.5. */
  value?: number
  /** Maximum number of stars. */
  max?: number
  /** When true the rating is display-only. */
  readOnly?: boolean
  /** Called with the new value when the user clicks a star. */
  onChange?: (value: number) => void
}

/**
 * Renders a single star that can be empty, half-filled, or fully filled.
 * Half-fill is achieved with a clip-path so the filled icon covers exactly
 * 50% of the star area.
 */
function RatingStar({ filled, iconSize }: { filled: 'full' | 'half' | 'empty'; iconSize: number }) {
  if (filled === 'full') {
    return (
      <Star
        size={iconSize}
        className="text-warning fill-warning"
        strokeWidth={1.5}
        aria-hidden="true"
      />
    )
  }

  if (filled === 'half') {
    return (
      <span className="relative inline-flex" style={{ width: iconSize, height: iconSize }}>
        {/* Empty star behind */}
        <Star
          size={iconSize}
          className="absolute inset-0 text-foreground-muted"
          strokeWidth={1.5}
          aria-hidden="true"
        />
        {/* Filled star clipped to left half */}
        <span
          className="absolute inset-0 overflow-hidden"
          style={{ width: iconSize / 2 }}
          aria-hidden="true"
        >
          <Star size={iconSize} className="text-warning fill-warning" strokeWidth={1.5} />
        </span>
      </span>
    )
  }

  // empty
  return (
    <Star size={iconSize} className="text-foreground-muted" strokeWidth={1.5} aria-hidden="true" />
  )
}

function getStarState(starIndex: number, value: number): 'full' | 'half' | 'empty' {
  if (value >= starIndex + 1) return 'full'
  if (value >= starIndex + 0.5) return 'half'
  return 'empty'
}

const Rating = React.forwardRef<HTMLDivElement, RatingProps>(
  ({ className, value = 0, max = 5, readOnly = false, size = 'md', onChange, ...props }, ref) => {
    const [hoverValue, setHoverValue] = React.useState<number | null>(null)
    const iconSize = ICON_SIZE[size ?? 'md']
    const displayValue = hoverValue !== null && !readOnly ? hoverValue : value

    return (
      <div
        ref={ref}
        role={readOnly ? 'img' : 'radiogroup'}
        aria-label={`Rating: ${value} out of ${max}`}
        className={cn(
          ratingVariants({ size }),
          readOnly ? 'cursor-default' : 'cursor-pointer',
          className
        )}
        onMouseLeave={() => {
          if (!readOnly) setHoverValue(null)
        }}
        {...props}
      >
        {Array.from({ length: max }, (_, i) => {
          const starState = getStarState(i, displayValue)

          if (readOnly) {
            return (
              <span key={i} className="inline-flex">
                <RatingStar filled={starState} iconSize={iconSize} />
              </span>
            )
          }

          return (
            <button
              key={i}
              type="button"
              role="radio"
              aria-checked={value >= i + 1}
              aria-label={`${i + 1} star${i + 1 === 1 ? '' : 's'}`}
              className={cn(
                'inline-flex rounded-sm transition-transform',
                'hover:scale-110',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground-muted',
                'disabled:pointer-events-none disabled:opacity-50'
              )}
              onMouseEnter={() => setHoverValue(i + 1)}
              onClick={() => onChange?.(i + 1)}
            >
              <RatingStar filled={starState} iconSize={iconSize} />
            </button>
          )
        })}
      </div>
    )
  }
)

Rating.displayName = 'Rating'

export { Rating, ratingVariants }
