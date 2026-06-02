'use client'

import * as React from 'react'
import { VerticalStepper } from 'ui'

const steps = [
  {
    label: 'Create project',
    description: 'Choose a name and region for your project.',
  },
  {
    label: 'Set up database',
    description: 'Define your schema and seed initial data.',
  },
  {
    label: 'Connect a client',
    description: 'Install the SDK and add your API keys.',
  },
  {
    label: 'Deploy',
    description: 'Ship your application to production.',
  },
]

export default function VerticalStepperDemo() {
  const [currentStep, setCurrentStep] = React.useState(1)

  return (
    <div className="w-full max-w-sm">
      <VerticalStepper steps={steps} currentStep={currentStep} onStepClick={setCurrentStep} />
    </div>
  )
}
