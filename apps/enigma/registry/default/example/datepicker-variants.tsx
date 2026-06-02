'use client'

import * as React from 'react'
import { Datepicker } from 'ui'

export default function DatepickerVariants() {
  const [date, setDate] = React.useState<Date | undefined>(new Date(2026, 5, 2))

  return (
    <div className="flex flex-col items-center gap-3">
      <Datepicker placeholder="Select a date" />
      <Datepicker
        value={date}
        onChange={setDate}
        formatLabel={(d) => d.toLocaleDateString('en-US', { dateStyle: 'short' })}
      />
      <Datepicker value={date} disabled />
    </div>
  )
}
