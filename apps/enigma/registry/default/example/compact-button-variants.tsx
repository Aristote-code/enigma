import { X } from 'lucide-react'
import { CompactButton } from 'ui'

export default function CompactButtonVariants() {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-center gap-3">
        <CompactButton variant="stroke" aria-label="Stroke">
          <X size={14} strokeWidth={2} />
        </CompactButton>
        <CompactButton variant="ghost" aria-label="Ghost">
          <X size={14} strokeWidth={2} />
        </CompactButton>
        <CompactButton variant="filled" aria-label="Filled">
          <X size={14} strokeWidth={2} />
        </CompactButton>
      </div>
      <div className="flex items-center gap-3">
        <CompactButton size="sm" aria-label="Small">
          <X size={12} strokeWidth={2} />
        </CompactButton>
        <CompactButton size="md" aria-label="Medium">
          <X size={14} strokeWidth={2} />
        </CompactButton>
        <CompactButton size="lg" aria-label="Large">
          <X size={16} strokeWidth={2} />
        </CompactButton>
      </div>
      <div className="flex items-center gap-3">
        <CompactButton variant="filled" fullRadius aria-label="Pill stroke">
          <X size={14} strokeWidth={2} />
        </CompactButton>
        <CompactButton variant="ghost" fullRadius aria-label="Pill ghost">
          <X size={14} strokeWidth={2} />
        </CompactButton>
      </div>
    </div>
  )
}
