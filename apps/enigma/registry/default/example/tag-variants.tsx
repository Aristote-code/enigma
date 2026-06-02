import { Hash } from 'lucide-react'
import { Tag } from 'ui'

export default function TagVariants() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <Tag variant="stroke">Stroke</Tag>
        <Tag variant="filled">Filled</Tag>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Tag size="sm">Small</Tag>
        <Tag size="md">Medium</Tag>
        <Tag size="lg">Large</Tag>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Tag icon={<Hash size={12} />}>With icon</Tag>
        <Tag onDismiss={() => {}}>Dismissible</Tag>
        <Tag disabled>Disabled</Tag>
      </div>
    </div>
  )
}
