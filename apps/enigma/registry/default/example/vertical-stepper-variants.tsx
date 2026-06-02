import { VerticalStepper } from 'ui'

const steps = [
  { label: 'Account details' },
  { label: 'Billing information' },
  { label: 'Review and confirm' },
]

export default function VerticalStepperVariants() {
  return (
    <div className="flex flex-wrap items-start justify-center gap-12">
      {(['sm', 'md'] as const).map((size) => (
        <div key={size} className="flex flex-col gap-2">
          <span className="text-xs text-foreground-lighter">{size}</span>
          <VerticalStepper size={size} steps={steps} currentStep={1} />
        </div>
      ))}
    </div>
  )
}
