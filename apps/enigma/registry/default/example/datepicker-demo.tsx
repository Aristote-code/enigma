'use client'

import * as React from 'react'
import { Datepicker } from 'ui'

export default function DatepickerDemo() {
  const [date, setDate] = React.useState<Date | undefined>()

  return (
    <div className="flex items-center justify-center">
      <Datepicker value={date} onChange={setDate} />
    </div>
  )
}
