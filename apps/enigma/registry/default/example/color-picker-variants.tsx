'use client'

import * as React from 'react'
import { ColorPicker } from 'ui'

export default function ColorPickerVariants() {
  const [color, setColor] = React.useState('#22c55e')

  return (
    <div className="flex flex-col items-center gap-8">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <div key={size} className="flex flex-col items-center gap-2">
          <span className="text-xs text-foreground-lighter">{size}</span>
          <ColorPicker size={size} value={color} onChange={setColor} />
        </div>
      ))}
    </div>
  )
}
