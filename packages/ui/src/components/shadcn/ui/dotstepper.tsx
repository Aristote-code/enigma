import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '../../../lib/utils/cn'

const dotStepperVariants = cva('flex items-center gap-2', {
  variants: {
    size: {
      sm: 'gap-1.5',
      md: 'gap-2',
      lg: 'gap-3',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

const DOT_SIZE: Record<string, string> = {
  sm: 'size-1.5',
  md: 'size-2.5',
  lg: 'size-3',
}

export interface DotStepperProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'>,
    VariantProps<typeof dotStepperVariants> {
  /** Total number of steps. */
  totalSteps: number
  /** Zero-based index of the current step. */
  currentStep: number
  /** Called with the step index when a dot is clicked. */
  onStepClick?: (step: number) => void
}

const DotStepper = React.forwardRef<HTMLDivElement, DotStepperProps>(
  ({ className, totalSteps, currentStep, onStepClick, size = 'md', ...props }, ref) => {
    const dotSize = DOT_SIZE[size ?? 'md']
    const interactive = typeof onStepClick === 'function'

    return (
      <div
        ref={ref}
        role="tablist"
        aria-label={`Step ${currentStep + 1} of ${totalSteps}`}
        className={cn(dotStepperVariants({ size }), className)}
        {...props}
      >
        {Array.from({ length: totalSteps }, (_, i) => {
          const isCurrent = i === currentStep
          const isCompleted = i < currentStep

          return (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={isCurrent}
              aria-label={`Step ${i + 1}`}
              disabled={!interactive}
              className={cn(
                'rounded-full transition-all',
                dotSize,
                isCurrent && 'bg-brand scale-125',
                isCompleted && !isCurrent && 'bg-brand',
                !isCurrent && !isCompleted && 'bg-surface-300',
                interactive ? 'cursor-pointer' : 'cursor-default',
                interactive && 'hover:bg-surface-200',
                interactive && isCurrent && 'hover:bg-brand',
                interactive && isCompleted && 'hover:bg-brand',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground-muted',
                'disabled:pointer-events-none'
              )}
              onClick={() => onStepClick?.(i)}
            />
          )
        })}
      </div>
    )
  }
)

DotStepper.displayName = 'DotStepper'

export { DotStepper, dotStepperVariants }
