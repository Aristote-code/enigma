import { Info } from 'lucide-react'
import { Hint } from 'ui'

export default function HintDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <Hint icon={<Info />}>Your password must be at least 8 characters long.</Hint>
    </div>
  )
}
