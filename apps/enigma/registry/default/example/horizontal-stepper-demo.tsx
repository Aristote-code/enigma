'use client'

import * as React from 'react'
import { HorizontalStepper } from 'ui'

const steps = [{ label: 'Account' }, { label: 'Profile' }, { label: 'Billing' }, { label: 'Done' }]

export default function HorizontalStepperDemo() {
  const [currentStep, setCurrentStep] = React.useState(1)

  return (
    <div className="w-full max-w-md">
      <HorizontalStepper steps={steps} currentStep={currentStep} onStepClick={setCurrentStep} />
    </div>
  )
}
