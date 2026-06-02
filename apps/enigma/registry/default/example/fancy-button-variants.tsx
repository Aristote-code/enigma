import { FancyButton } from 'ui'

export default function FancyButtonVariants() {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-center gap-3">
        <FancyButton variant="brand">Brand</FancyButton>
        <FancyButton variant="neutral">Neutral</FancyButton>
        <FancyButton variant="destructive">Destructive</FancyButton>
        <FancyButton variant="basic">Basic</FancyButton>
      </div>
      <div className="flex items-center gap-3">
        <FancyButton size="medium">Medium</FancyButton>
        <FancyButton size="small">Small</FancyButton>
        <FancyButton size="xsmall">Xsmall</FancyButton>
      </div>
    </div>
  )
}
