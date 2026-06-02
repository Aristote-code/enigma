'use client'

import * as React from 'react'
import { Rating } from 'ui'

export default function RatingDemo() {
  const [value, setValue] = React.useState(3)

  return (
    <div className="flex flex-col items-center gap-3">
      <Rating value={value} onChange={setValue} />
      <p className="text-sm text-foreground-light">{value} out of 5</p>
    </div>
  )
}
