'use client'

import * as React from 'react'
import { SegmentedControl } from 'ui'

const items = [
  { value: 'day', label: 'Day' },
  { value: 'week', label: 'Week' },
  { value: 'month', label: 'Month' },
]

export default function SegmentedControlVariants() {
  const [size, setSize] = React.useState('week')
  const [md, setMd] = React.useState('week')

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs text-foreground-lighter">sm</span>
        <SegmentedControl size="sm" items={items} value={size} onValueChange={setSize} />
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs text-foreground-lighter">md</span>
        <SegmentedControl size="md" items={items} value={md} onValueChange={setMd} />
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs text-foreground-lighter">disabled</span>
        <SegmentedControl disabled items={items} value="week" />
      </div>
    </div>
  )
}
