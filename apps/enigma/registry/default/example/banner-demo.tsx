'use client'

import { Info } from 'lucide-react'
import * as React from 'react'
import { Banner, Button } from 'ui'

export default function BannerDemo() {
  const [visible, setVisible] = React.useState(true)

  if (!visible) {
    return (
      <Button type="default" onClick={() => setVisible(true)}>
        Show banner
      </Button>
    )
  }

  return (
    <Banner
      variant="info"
      icon={<Info />}
      action={
        <Button type="default" size="tiny">
          Learn more
        </Button>
      }
      onDismiss={() => setVisible(false)}
    >
      A new version of the design system is available.
    </Banner>
  )
}
