import { ProgressCircle } from 'ui'

export default function ProgressCircleVariants() {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-end gap-4">
        <ProgressCircle value={60} size="xs" />
        <ProgressCircle value={60} size="sm" />
        <ProgressCircle value={60} size="md" />
        <ProgressCircle value={60} size="lg" />
      </div>
      <div className="flex items-center gap-4">
        <ProgressCircle value={75} color="brand" />
        <ProgressCircle value={75} color="success" />
        <ProgressCircle value={75} color="warning" />
        <ProgressCircle value={75} color="destructive" />
      </div>
    </div>
  )
}
