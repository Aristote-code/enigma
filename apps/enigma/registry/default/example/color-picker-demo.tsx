'use client'

import * as React from 'react'
import { ColorPicker } from 'ui'

const presets = [
  '#000000',
  '#ef4444',
  '#f97316',
  '#eab308',
  '#22c55e',
  '#06b6d4',
  '#3b82f6',
  '#a855f7',
]

export default function ColorPickerDemo() {
  const [color, setColor] = React.useState('#3b82f6')

  return (
    <div className="flex flex-col items-center gap-3">
      <ColorPicker value={color} onChange={setColor} presets={presets} />
    </div>
  )
}
