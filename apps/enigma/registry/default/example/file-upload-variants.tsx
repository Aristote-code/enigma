import { FileUpload } from 'ui'

export default function FileUploadVariants() {
  return (
    <div className="grid w-full gap-6 sm:grid-cols-3">
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium text-foreground-light">Default</span>
        <FileUpload variant="default" />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium text-foreground-light">Error</span>
        <FileUpload variant="error" />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium text-foreground-light">Disabled</span>
        <FileUpload disabled />
      </div>
    </div>
  )
}
