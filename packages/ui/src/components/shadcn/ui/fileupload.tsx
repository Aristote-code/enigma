'use client'

import { cva, type VariantProps } from 'class-variance-authority'
import { File, Upload, X } from 'lucide-react'
import * as React from 'react'

import { cn } from '../../../lib/utils/cn'

const fileUploadVariants = cva(
  'flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-8 text-center transition-colors',
  {
    variants: {
      variant: {
        default: 'border-default bg-surface-75 hover:bg-surface-200',
        error: 'border-destructive bg-destructive-200/50',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  if (bytes < 1024) return `${bytes} Bytes`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export interface FileUploadProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>,
    VariantProps<typeof fileUploadVariants> {
  /** Comma-separated list of accepted file types (e.g. "image/*,.pdf") */
  accept?: string
  /** Maximum file size in bytes */
  maxSize?: number
  /** Allow selecting multiple files */
  multiple?: boolean
  /** Called with the current array of files whenever it changes */
  onFilesChange?: (files: File[]) => void
  /** Disable the upload zone */
  disabled?: boolean
}

const FileUpload = React.forwardRef<HTMLDivElement, FileUploadProps>(
  (
    {
      className,
      variant = 'default',
      accept,
      maxSize,
      multiple = false,
      onFilesChange,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const [files, setFiles] = React.useState<File[]>([])
    const [isDragOver, setIsDragOver] = React.useState(false)
    const inputRef = React.useRef<HTMLInputElement>(null)

    const updateFiles = React.useCallback(
      (nextFiles: File[]) => {
        setFiles(nextFiles)
        onFilesChange?.(nextFiles)
      },
      [onFilesChange]
    )

    const addFiles = React.useCallback(
      (incoming: FileList | null) => {
        if (!incoming || incoming.length === 0) return

        const newFiles = Array.from(incoming).filter((file) => {
          if (maxSize && file.size > maxSize) return false
          return true
        })

        if (newFiles.length === 0) return

        if (multiple) {
          updateFiles([...files, ...newFiles])
        } else {
          updateFiles([newFiles[0]])
        }
      },
      [files, maxSize, multiple, updateFiles]
    )

    const removeFile = React.useCallback(
      (index: number) => {
        const nextFiles = files.filter((_, i) => i !== index)
        updateFiles(nextFiles)
      },
      [files, updateFiles]
    )

    const handleDragOver = React.useCallback(
      (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (!disabled) setIsDragOver(true)
      },
      [disabled]
    )

    const handleDragLeave = React.useCallback((e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragOver(false)
    }, [])

    const handleDrop = React.useCallback(
      (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragOver(false)
        if (!disabled) {
          addFiles(e.dataTransfer.files)
        }
      },
      [addFiles, disabled]
    )

    const handleClick = React.useCallback(() => {
      if (!disabled) {
        inputRef.current?.click()
      }
    }, [disabled])

    const handleInputChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        addFiles(e.target.files)
        // Reset so re-selecting the same file triggers onChange
        if (inputRef.current) {
          inputRef.current.value = ''
        }
      },
      [addFiles]
    )

    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleClick()
        }
      },
      [handleClick]
    )

    return (
      <div ref={ref} className={cn('flex flex-col gap-3', className)} {...props}>
        {/* Drop zone */}
        <div
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-disabled={disabled}
          aria-label="File upload drop zone"
          className={cn(
            fileUploadVariants({ variant }),
            isDragOver && 'border-brand bg-brand-200/50',
            disabled && 'pointer-events-none opacity-50',
            'cursor-pointer'
          )}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Upload
            size={24}
            className={cn('text-foreground-muted', isDragOver && 'text-brand')}
            aria-hidden="true"
          />
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium text-foreground">Drag & drop files here</p>
            <p className="text-xs text-foreground-lighter">
              or <span className="text-brand underline underline-offset-2">click to browse</span>
            </p>
          </div>
          {(accept || maxSize) && (
            <p className="text-xs text-foreground-muted">
              {accept && <span>Accepted: {accept}</span>}
              {accept && maxSize && <span> &middot; </span>}
              {maxSize && <span>Max size: {formatFileSize(maxSize)}</span>}
            </p>
          )}
        </div>

        {/* Hidden file input */}
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          className="hidden"
          onChange={handleInputChange}
          tabIndex={-1}
          aria-hidden="true"
        />

        {/* File list */}
        {files.length > 0 && (
          <ul className="flex flex-col gap-2" role="list" aria-label="Selected files">
            {files.map((file, index) => (
              <li
                key={`${file.name}-${file.size}-${index}`}
                className="flex items-center gap-2 rounded-md border border-default bg-surface-75 p-2 text-sm"
              >
                <File size={16} className="shrink-0 text-foreground-muted" aria-hidden="true" />
                <span className="min-w-0 flex-1 truncate text-foreground">{file.name}</span>
                <span className="shrink-0 text-xs text-foreground-lighter">
                  {formatFileSize(file.size)}
                </span>
                <button
                  type="button"
                  aria-label={`Remove ${file.name}`}
                  className={cn(
                    'inline-flex shrink-0 items-center justify-center rounded-md p-1 transition-colors',
                    'text-foreground-muted hover:bg-surface-200 hover:text-foreground',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground-muted'
                  )}
                  onClick={(e) => {
                    e.stopPropagation()
                    removeFile(index)
                  }}
                  disabled={disabled}
                >
                  <X size={14} aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }
)

FileUpload.displayName = 'FileUpload'

export { FileUpload, fileUploadVariants }
