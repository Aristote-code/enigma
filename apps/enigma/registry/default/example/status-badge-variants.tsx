import { StatusBadge } from 'ui'

export default function StatusBadgeVariants() {
  return (
    <div className="flex flex-row flex-wrap items-center gap-3">
      <StatusBadge variant="online">Online</StatusBadge>
      <StatusBadge variant="offline">Offline</StatusBadge>
      <StatusBadge variant="away">Away</StatusBadge>
      <StatusBadge variant="busy">Busy</StatusBadge>
      <StatusBadge variant="neutral">Neutral</StatusBadge>
    </div>
  )
}
