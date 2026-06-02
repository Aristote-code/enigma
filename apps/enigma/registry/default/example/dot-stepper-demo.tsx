'use client'

import * as React from 'react'
import { Button, DotStepper } from 'ui'

const TOTAL_STEPS = 4

export default function DotStepperDemo() {
  const [currentStep, setCurrentStep] = React.useState(0)

  return (
    <div className="flex flex-col items-center gap-4">
      <DotStepper totalSteps={TOTAL_STEPS} currentStep={currentStep} onStepClick={setCurrentStep} />
      <div className="flex items-center gap-2">
        <Button
          type="default"
          disabled={currentStep === 0}
          onClick={() => setCurrentStep((step) => Math.max(0, step - 1))}
        >
          Previous
        </Button>
        <Button
          type="primary"
          disabled={currentStep === TOTAL_STEPS - 1}
          onClick={() => setCurrentStep((step) => Math.min(TOTAL_STEPS - 1, step + 1))}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
