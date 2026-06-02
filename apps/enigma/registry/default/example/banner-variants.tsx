import { AlertTriangle, CheckCircle, Info, XCircle } from 'lucide-react'
import { Banner } from 'ui'

export default function BannerVariants() {
  return (
    <div className="flex w-full flex-col gap-3">
      <Banner variant="info" icon={<Info />}>
        This is an informational banner.
      </Banner>
      <Banner variant="success" icon={<CheckCircle />}>
        Your changes have been saved successfully.
      </Banner>
      <Banner variant="warning" icon={<AlertTriangle />}>
        Your subscription expires in 3 days.
      </Banner>
      <Banner variant="error" icon={<XCircle />}>
        Something went wrong while saving.
      </Banner>
    </div>
  )
}
