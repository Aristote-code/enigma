import { cva, type VariantProps } from 'class-variance-authority'
import { Check } from 'lucide-react'
import * as React from 'react'

import { cn } from '../../../lib/utils/cn'

const verticalStepperVariants = cva('flex flex-col', {
  variants: {
    size: {
      sm: 'gap-0',
      md: 'gap-0',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

const verticalStepCircleVariants = cva(
  'rounded-full flex items-center justify-center font-medium border-2 shrink-0 transition-colors',
  {
    variants: {
      size: {
        sm: 'size-7 text-xs',
        md: 'size-8 text-sm',
      },
      status: {
        completed: 'bg-brand border-brand-500 text-white',
        current: 'border-brand-500 text-brand bg-background',
        upcoming: 'border-default text-foreground-muted bg-background',
      },
    },
    defaultVariants: {
      size: 'md',
      status: 'upcoming',
    },
  }
)

const verticalStepLineVariants = cva(
  'w-0.5 flex-1 mx-auto my-1 min-h-6 rounded-full transition-colors',
  {
    variants: {
      completed: {
        true: 'bg-brand',
        false: 'bg-default',
      },
    },
    defaultVariants: {
      completed: false,
    },
  }
)

export interface VerticalStepperStep {
  /** Label displayed for the step */
  label: string
  /** Optional description text below the label */
  description?: string
  /** Optional content rendered below the description when the step is active */
  content?: React.ReactNode
}

export interface VerticalStepperProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>,
    VariantProps<typeof verticalStepperVariants> {
  /** Array of step definitions */
  steps: VerticalStepperStep[]
  /** Zero-based index of the currently active step */
  currentStep: number
  /** Called when a step indicator is clicked */
  onStepClick?: (stepIndex: number) => void
}

function getStepStatus(index: number, currentStep: number): 'completed' | 'current' | 'upcoming' {
  if (index < currentStep) return 'completed'
  if (index === currentStep) return 'current'
  return 'upcoming'
}

const VerticalStepper = React.forwardRef<HTMLDivElement, VerticalStepperProps>(
  ({ className, steps, currentStep, onStepClick, size = 'md', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(verticalStepperVariants({ size }), className)}
        role="list"
        {...props}
      >
        {steps.map((step, index) => {
          const status = getStepStatus(index, currentStep)
          const isLast = index === steps.length - 1
          const isClickable = !!onStepClick

          return (
            <div key={index} className="flex gap-3" role="listitem">
              {/* Left column: circle + connecting line */}
              <div className="flex flex-col items-center">
                <button
                  type="button"
                  className={cn(
                    verticalStepCircleVariants({ size, status }),
                    isClickable && 'cursor-pointer',
                    isClickable &&
                      'hover:bg-surface-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground-muted focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                    !isClickable && 'cursor-default'
                  )}
                  tabIndex={isClickable ? 0 : -1}
                  onClick={() => onStepClick?.(index)}
                  disabled={!isClickable}
                  aria-current={status === 'current' ? 'step' : undefined}
                  aria-label={`Step ${index + 1}: ${step.label}${status === 'completed' ? ' (completed)' : status === 'current' ? ' (current)' : ''}`}
                >
                  {status === 'completed' ? (
                    <Check className={size === 'sm' ? 'size-3.5' : 'size-4'} strokeWidth={2.5} />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </button>
                {!isLast && (
                  <div
                    className={cn(verticalStepLineVariants({ completed: index < currentStep }))}
                  />
                )}
              </div>

              {/* Right column: label + description + content */}
              <div className={cn('pb-6', isLast && 'pb-0')}>
                <p
                  className={cn(
                    'text-sm font-medium',
                    size === 'md' && 'pt-1',
                    size === 'sm' && 'pt-0.5',
                    status === 'current' ? 'text-foreground' : 'text-foreground-lighter'
                  )}
                >
                  {step.label}
                </p>
                {step.description && (
                  <p className="text-sm text-foreground-lighter mt-0.5">{step.description}</p>
                )}
                {step.content && status === 'current' && <div className="mt-2">{step.content}</div>}
              </div>
            </div>
          )
        })}
      </div>
    )
  }
)
VerticalStepper.displayName = 'VerticalStepper'

export {
  VerticalStepper,
  verticalStepperVariants,
  verticalStepCircleVariants,
  verticalStepLineVariants,
}
