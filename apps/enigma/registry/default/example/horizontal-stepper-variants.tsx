import { HorizontalStepper } from 'ui'

const steps = [
  { label: 'Connect', description: 'Link your data' },
  { label: 'Configure', description: 'Set options' },
  { label: 'Review', description: 'Confirm changes' },
]

export default function HorizontalStepperVariants() {
  return (
    <div className="flex w-full max-w-md flex-col gap-10">
      <div className="flex flex-col gap-2">
        <span className="text-xs text-foreground-lighter">sm</span>
        <HorizontalStepper steps={steps} currentStep={1} size="sm" />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-xs text-foreground-lighter">md</span>
        <HorizontalStepper steps={steps} currentStep={1} size="md" />
      </div>
    </div>
  )
}
