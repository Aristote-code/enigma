import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '../../../lib/utils/cn'

const sizeConfig = {
  xs: { dimension: 16, strokeWidth: 2, radius: 6 },
  sm: { dimension: 24, strokeWidth: 2.5, radius: 9.5 },
  md: { dimension: 36, strokeWidth: 3, radius: 14.5 },
  lg: { dimension: 48, strokeWidth: 3, radius: 20.5 },
} as const

const progressCircleVariants = cva('shrink-0', {
  variants: {
    size: {
      xs: 'h-4 w-4',
      sm: 'h-6 w-6',
      md: 'h-9 w-9',
      lg: 'h-12 w-12',
    },
    color: {
      brand: '[&_circle.fill]:stroke-brand',
      success: '[&_circle.fill]:stroke-brand-600',
      warning: '[&_circle.fill]:stroke-warning',
      destructive: '[&_circle.fill]:stroke-destructive',
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'brand',
  },
})

export interface ProgressCircleProps
  extends
    Omit<React.SVGAttributes<SVGSVGElement>, 'color'>,
    VariantProps<typeof progressCircleVariants> {
  /** Progress value from 0 to 100 */
  value?: number
}

const ProgressCircle = React.forwardRef<SVGSVGElement, ProgressCircleProps>(
  ({ className, value = 0, size = 'md', color = 'brand', ...props }, ref) => {
    const clampedValue = Math.max(0, Math.min(100, value))
    const { dimension, strokeWidth, radius } = sizeConfig[size ?? 'md']
    const circumference = 2 * Math.PI * radius
    const offset = circumference - (clampedValue / 100) * circumference

    return (
      <svg
        ref={ref}
        viewBox={`0 0 ${dimension} ${dimension}`}
        fill="none"
        className={cn(progressCircleVariants({ size, color }), className)}
        style={{ transform: 'rotate(-90deg)' }}
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
        {...props}
      >
        <circle
          className="track stroke-surface-200"
          cx={dimension / 2}
          cy={dimension / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        <circle
          className="fill transition-all duration-300 ease-in-out"
          cx={dimension / 2}
          cy={dimension / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
    )
  }
)
ProgressCircle.displayName = 'ProgressCircle'

export { ProgressCircle, progressCircleVariants }
