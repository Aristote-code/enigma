'use client'

import { Info } from 'lucide-react'
import * as React from 'react'
import {
  Button,
  Notification,
  NotificationActions,
  NotificationDescription,
  NotificationTimestamp,
  NotificationTitle,
} from 'ui'

export default function NotificationDemo() {
  const [visible, setVisible] = React.useState(true)

  if (!visible) {
    return (
      <Button type="default" onClick={() => setVisible(true)}>
        Show notification
      </Button>
    )
  }

  return (
    <div className="w-full max-w-md">
      <Notification variant="info" icon={<Info />} onDismiss={() => setVisible(false)}>
        <NotificationTitle>New version available</NotificationTitle>
        <NotificationDescription>
          A new version of the design system is ready to install.
        </NotificationDescription>
        <NotificationActions>
          <Button type="default" size="tiny">
            Update now
          </Button>
          <Button type="text" size="tiny" onClick={() => setVisible(false)}>
            Dismiss
          </Button>
        </NotificationActions>
        <NotificationTimestamp>Just now</NotificationTimestamp>
      </Notification>
    </div>
  )
}
