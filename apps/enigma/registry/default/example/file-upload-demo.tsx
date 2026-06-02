'use client'

import * as React from 'react'
import { FileUpload } from 'ui'

export default function FileUploadDemo() {
  const [files, setFiles] = React.useState<File[]>([])

  return (
    <div className="w-full max-w-md">
      <FileUpload
        accept="image/*,.pdf"
        maxSize={5 * 1024 * 1024}
        multiple
        onFilesChange={setFiles}
      />
      <p className="mt-3 text-xs text-foreground-lighter">
        {files.length} file{files.length === 1 ? '' : 's'} selected
      </p>
    </div>
  )
}
