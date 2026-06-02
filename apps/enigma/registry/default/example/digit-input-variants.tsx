'use client'

import * as React from 'react'
import { DigitInput } from 'ui'

export default function DigitInputVariants() {
  const [tight, setTight] = React.useState('')
  const [defaultGap, setDefaultGap] = React.useState('')
  const [loose, setLoose] = React.useState('')

  return (
    <div className="flex flex-col items-start gap-8">
      <div className="flex flex-col gap-2">
        <span className="text-xs text-foreground-lighter">gap: tight</span>
        <DigitInput length={4} gap="tight" value={tight} onChange={setTight} />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-xs text-foreground-lighter">gap: default</span>
        <DigitInput length={4} gap="default" value={defaultGap} onChange={setDefaultGap} />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-xs text-foreground-lighter">gap: loose</span>
        <DigitInput length={4} gap="loose" value={loose} onChange={setLoose} />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-xs text-foreground-lighter">isError</span>
        <DigitInput length={4} value="12" isError onChange={() => {}} />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-xs text-foreground-lighter">disabled</span>
        <DigitInput length={4} value="42" disabled onChange={() => {}} />
      </div>
    </div>
  )
}
