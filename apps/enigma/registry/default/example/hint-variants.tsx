import { AlertTriangle, CheckCircle, Info, XCircle } from 'lucide-react'
import { Hint } from 'ui'

export default function HintVariants() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <Hint variant="default" icon={<Info />}>
        We will never share your email address.
      </Hint>
      <Hint variant="success" icon={<CheckCircle />}>
        Your changes have been saved.
      </Hint>
      <Hint variant="warning" icon={<AlertTriangle />}>
        This action may take a few minutes.
      </Hint>
      <Hint variant="error" icon={<XCircle />}>
        This field is required.
      </Hint>
      <Hint disabled icon={<Info />}>
        This hint is currently disabled.
      </Hint>
    </div>
  )
}
