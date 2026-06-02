'use client'

import * as React from 'react'
import { ProgressCircle } from 'ui'

export default function ProgressCircleDemo() {
  const [value, setValue] = React.useState(0)

  React.useEffect(() => {
    const timer = setTimeout(() => setValue(66), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex items-center justify-center">
      <ProgressCircle value={value} size="lg" />
    </div>
  )
}
