'use client'

import * as React from 'react'
import { Pagination } from 'ui'

export default function PaginationDemo() {
  const [currentPage, setCurrentPage] = React.useState(4)
  const totalPages = 10

  return (
    <div className="flex flex-col items-center gap-3">
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      <p className="text-sm text-foreground-light">
        Page {currentPage} of {totalPages}
      </p>
    </div>
  )
}
