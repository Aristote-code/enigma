'use client'

import * as React from 'react'
import { DigitInput } from 'ui'

export default function DigitInputDemo() {
  const [value, setValue] = React.useState('')

  return (
    <div className="flex flex-col items-center gap-3">
      <DigitInput length={6} value={value} onChange={setValue} autoFocus />
      <span className="text-xs text-foreground-lighter">
        {value ? `Code: ${value}` : 'Enter your 6-digit code'}
      </span>
    </div>
  )
}
