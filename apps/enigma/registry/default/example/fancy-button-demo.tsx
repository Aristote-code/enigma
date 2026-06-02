import { Sparkles } from 'lucide-react'
import { FancyButton, FancyButtonIcon } from 'ui'

export default function FancyButtonDemo() {
  return (
    <div className="flex items-center gap-3">
      <FancyButton variant="brand">Get started</FancyButton>
      <FancyButton variant="neutral">
        <FancyButtonIcon>
          <Sparkles />
        </FancyButtonIcon>
        Upgrade
      </FancyButton>
      <FancyButton variant="basic">Learn more</FancyButton>
    </div>
  )
}
