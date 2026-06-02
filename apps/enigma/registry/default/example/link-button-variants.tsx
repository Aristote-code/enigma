import { LinkButton } from 'ui'

export default function LinkButtonVariants() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-4">
        <LinkButton variant="gray">Gray</LinkButton>
        <LinkButton variant="black">Black</LinkButton>
        <LinkButton variant="primary">Primary</LinkButton>
        <LinkButton variant="destructive">Destructive</LinkButton>
      </div>
      <div className="flex items-center gap-4">
        <LinkButton size="medium">Medium</LinkButton>
        <LinkButton size="small">Small</LinkButton>
        <LinkButton underline>Underlined</LinkButton>
        <LinkButton disabled>Disabled</LinkButton>
      </div>
    </div>
  )
}
