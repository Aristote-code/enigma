import { Rating } from 'ui'

export default function RatingVariants() {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-center gap-3">
        <span className="w-10 text-sm text-foreground-light">sm</span>
        <Rating size="sm" value={3.5} readOnly />
      </div>
      <div className="flex items-center gap-3">
        <span className="w-10 text-sm text-foreground-light">md</span>
        <Rating size="md" value={3.5} readOnly />
      </div>
      <div className="flex items-center gap-3">
        <span className="w-10 text-sm text-foreground-light">lg</span>
        <Rating size="lg" value={3.5} readOnly />
      </div>
    </div>
  )
}
