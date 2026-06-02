import { cva, type VariantProps } from 'class-variance-authority'
import { Check } from 'lucide-react'
import * as React from 'react'

import { cn } from '../../../lib/utils/cn'

export interface HorizontalStepperStep {
  label: string
  description?: string
}

const horizontalStepperVariants = cva('flex items-start w-full', {
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

const stepCircleVariants = cva(
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

const stepLabelVariants = cva('text-sm mt-2 transition-colors', {
  variants: {
    status: {
      completed: 'text-foreground-lighter',
      current: 'text-foreground font-medium',
      upcoming: 'text-foreground-lighter',
    },
  },
  defaultVariants: {
    status: 'upcoming',
  },
})

const stepLineVariants = cva('h-0.5 flex-1 transition-colors', {
  variants: {
    completed: {
      true: 'bg-brand',
      false: 'bg-default',
    },
  },
  defaultVariants: {
    completed: false,
  },
})

export interface HorizontalStepperProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof horizontalStepperVariants> {
  steps: HorizontalStepperStep[]
  currentStep: number
  onStepClick?: (stepIndex: number) => void
}

const HorizontalStepper = React.forwardRef<HTMLDivElement, HorizontalStepperProps>(
  ({ className, steps, currentStep, onStepClick, size = 'md', ...props }, ref) => {
    const circleHeight = size === 'sm' ? 'h-7' : 'h-8'

    return (
      <div ref={ref} className={cn(horizontalStepperVariants({ size }), className)} {...props}>
        {steps.map((step, index) => {
          const status =
            index < currentStep ? 'completed' : index === currentStep ? 'current' : 'upcoming'
          const isClickable = !!onStepClick
          const isLastStep = index === steps.length - 1

          return (
            <React.Fragment key={index}>
              <div className="flex flex-col items-center text-center shrink-0">
                <button
                  type="button"
                  className={cn(
                    stepCircleVariants({ size, status }),
                    isClickable && 'cursor-pointer',
                    isClickable &&
                      'hover:bg-surface-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground-muted focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                    !isClickable && 'cursor-default'
                  )}
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
                <span className={cn(stepLabelVariants({ status }), 'px-1')}>{step.label}</span>
                {step.description && (
                  <span className="text-xs text-foreground-muted mt-0.5 px-1">
                    {step.description}
                  </span>
                )}
              </div>

              {!isLastStep && (
                <div className={cn('flex items-center flex-1 mx-2', circleHeight)}>
                  <div className={cn(stepLineVariants({ completed: index < currentStep }))} />
                </div>
              )}
            </React.Fragment>
          )
        })}
      </div>
    )
  }
)
HorizontalStepper.displayName = 'HorizontalStepper'

export {
  HorizontalStepper,
  horizontalStepperVariants,
  stepCircleVariants,
  stepLabelVariants,
  stepLineVariants,
}
