import { X } from 'lucide-react'
import { CompactButton } from 'ui'

export default function CompactButtonDemo() {
  return (
    <CompactButton aria-label="Dismiss">
      <X size={14} strokeWidth={2} />
    </CompactButton>
  )
}
