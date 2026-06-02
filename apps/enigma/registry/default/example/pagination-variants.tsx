'use client'

import * as React from 'react'
import { Pagination } from 'ui'

export default function PaginationVariants() {
  const [page, setPage] = React.useState(3)

  return (
    <div className="flex flex-col items-center gap-8">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <div key={size} className="flex flex-col items-center gap-2">
          <span className="text-xs text-foreground-lighter">{size}</span>
          <Pagination size={size} currentPage={page} totalPages={8} onPageChange={setPage} />
        </div>
      ))}
    </div>
  )
}
