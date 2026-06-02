import { cva, type VariantProps } from 'class-variance-authority'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import * as React from 'react'

import { cn } from '../../../lib/utils/cn'

const paginationVariants = cva('flex items-center gap-1', {
  variants: {
    size: {
      sm: 'gap-0.5',
      md: 'gap-1',
      lg: 'gap-1.5',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

const PAGE_BUTTON_SIZE: Record<string, string> = {
  sm: 'size-7 text-xs',
  md: 'size-8 text-sm',
  lg: 'size-9 text-base',
}

/**
 * Generates the list of page indicators to render.
 *
 * Returns an array of page numbers and `'ellipsis-start'` / `'ellipsis-end'`
 * markers that the component maps to non-interactive dots.
 */
function generatePages(
  currentPage: number,
  totalPages: number,
  siblingCount: number
): (number | 'ellipsis-start' | 'ellipsis-end')[] {
  // When everything fits without ellipsis
  const totalSlots = siblingCount * 2 + 5 // first + last + current + 2 ellipsis slots + siblings
  if (totalPages <= totalSlots) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages)

  const showLeftEllipsis = leftSiblingIndex > 2
  const showRightEllipsis = rightSiblingIndex < totalPages - 1

  if (!showLeftEllipsis && showRightEllipsis) {
    // Near the start: show more pages on the left
    const leftItemCount = 3 + 2 * siblingCount
    const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1)
    return [...leftRange, 'ellipsis-end', totalPages]
  }

  if (showLeftEllipsis && !showRightEllipsis) {
    // Near the end: show more pages on the right
    const rightItemCount = 3 + 2 * siblingCount
    const rightRange = Array.from(
      { length: rightItemCount },
      (_, i) => totalPages - rightItemCount + i + 1
    )
    return [1, 'ellipsis-start', ...rightRange]
  }

  // Middle: ellipsis on both sides
  const middleRange = Array.from(
    { length: rightSiblingIndex - leftSiblingIndex + 1 },
    (_, i) => leftSiblingIndex + i
  )
  return [1, 'ellipsis-start', ...middleRange, 'ellipsis-end', totalPages]
}

export interface PaginationProps
  extends
    Omit<React.HTMLAttributes<HTMLElement>, 'onChange'>,
    VariantProps<typeof paginationVariants> {
  /** The currently active page (1-indexed). */
  currentPage: number
  /** Total number of pages. */
  totalPages: number
  /** Called when the user selects a different page. */
  onPageChange: (page: number) => void
  /** Number of sibling pages shown on each side of the current page. */
  siblingCount?: number
}

const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  (
    { className, currentPage, totalPages, onPageChange, siblingCount = 1, size = 'md', ...props },
    ref
  ) => {
    const pages = generatePages(currentPage, totalPages, siblingCount)
    const buttonSize = PAGE_BUTTON_SIZE[size ?? 'md']

    const isFirstPage = currentPage <= 1
    const isLastPage = currentPage >= totalPages

    return (
      <nav
        ref={ref}
        role="navigation"
        aria-label="Pagination"
        className={cn(paginationVariants({ size }), className)}
        {...props}
      >
        {/* Previous button */}
        <button
          type="button"
          aria-label="Go to previous page"
          disabled={isFirstPage}
          className={cn(
            buttonSize,
            'inline-flex items-center justify-center rounded-md border border-default',
            'text-foreground-light transition-colors',
            'hover:bg-surface-200 hover:text-foreground',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground-muted',
            'disabled:pointer-events-none disabled:opacity-50'
          )}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <ChevronLeft size={16} aria-hidden="true" />
        </button>

        {/* Page numbers and ellipses */}
        {pages.map((page, index) => {
          if (page === 'ellipsis-start' || page === 'ellipsis-end') {
            return (
              <span
                key={page}
                aria-hidden="true"
                className={cn(
                  buttonSize,
                  'inline-flex items-center justify-center text-foreground-muted select-none'
                )}
              >
                &hellip;
              </span>
            )
          }

          const isCurrent = page === currentPage
          return (
            <button
              key={page}
              type="button"
              aria-label={`Go to page ${page}`}
              aria-current={isCurrent ? 'page' : undefined}
              className={cn(
                buttonSize,
                'inline-flex items-center justify-center rounded-md font-medium transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground-muted',
                'disabled:pointer-events-none disabled:opacity-50',
                isCurrent
                  ? 'bg-brand text-white'
                  : 'text-foreground-light hover:bg-surface-200 hover:text-foreground'
              )}
              onClick={() => {
                if (!isCurrent) onPageChange(page)
              }}
            >
              {page}
            </button>
          )
        })}

        {/* Next button */}
        <button
          type="button"
          aria-label="Go to next page"
          disabled={isLastPage}
          className={cn(
            buttonSize,
            'inline-flex items-center justify-center rounded-md border border-default',
            'text-foreground-light transition-colors',
            'hover:bg-surface-200 hover:text-foreground',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground-muted',
            'disabled:pointer-events-none disabled:opacity-50'
          )}
          onClick={() => onPageChange(currentPage + 1)}
        >
          <ChevronRight size={16} aria-hidden="true" />
        </button>
      </nav>
    )
  }
)

Pagination.displayName = 'Pagination'

export { Pagination, paginationVariants, generatePages }
