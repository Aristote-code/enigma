import { DotStepper } from 'ui'

export default function DotStepperVariants() {
  return (
    <div className="flex flex-col items-center gap-8">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <div key={size} className="flex flex-col items-center gap-2">
          <span className="text-xs text-foreground-lighter">{size}</span>
          <DotStepper size={size} totalSteps={5} currentStep={2} />
        </div>
      ))}
    </div>
  )
}
