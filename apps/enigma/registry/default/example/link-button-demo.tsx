import { ArrowRight } from 'lucide-react'
import { LinkButton } from 'ui'

export default function LinkButtonDemo() {
  return (
    <div className="flex items-center gap-3">
      <LinkButton>Learn more</LinkButton>
      <LinkButton variant="primary">
        View docs
        <ArrowRight size={14} />
      </LinkButton>
    </div>
  )
}
