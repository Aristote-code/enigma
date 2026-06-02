'use client'

import * as React from 'react'
import { SegmentedControl } from 'ui'

const items = [
  { value: 'list', label: 'List' },
  { value: 'board', label: 'Board' },
  { value: 'calendar', label: 'Calendar' },
]

export default function SegmentedControlDemo() {
  const [value, setValue] = React.useState('list')

  return (
    <div className="flex items-center justify-center">
      <SegmentedControl items={items} value={value} onValueChange={setValue} />
    </div>
  )
}
