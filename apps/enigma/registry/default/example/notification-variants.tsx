import { AlertTriangle, Bell, CheckCircle, Info, XCircle } from 'lucide-react'
import { Notification, NotificationDescription, NotificationTitle } from 'ui'

export default function NotificationVariants() {
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <Notification variant="info" icon={<Info />}>
        <NotificationTitle>Information</NotificationTitle>
        <NotificationDescription>This is an informational notification.</NotificationDescription>
      </Notification>
      <Notification variant="success" icon={<CheckCircle />}>
        <NotificationTitle>Success</NotificationTitle>
        <NotificationDescription>Your changes have been saved.</NotificationDescription>
      </Notification>
      <Notification variant="warning" icon={<AlertTriangle />}>
        <NotificationTitle>Warning</NotificationTitle>
        <NotificationDescription>Your subscription expires in 3 days.</NotificationDescription>
      </Notification>
      <Notification variant="error" icon={<XCircle />}>
        <NotificationTitle>Error</NotificationTitle>
        <NotificationDescription>Something went wrong while saving.</NotificationDescription>
      </Notification>
      <Notification variant="neutral" icon={<Bell />}>
        <NotificationTitle>Neutral</NotificationTitle>
        <NotificationDescription>You have a new notification.</NotificationDescription>
      </Notification>
    </div>
  )
}
