import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from 'ui'

export default function AvatarGroupVariants() {
  return (
    <div className="flex flex-col items-center gap-8">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <div key={size} className="flex flex-col items-center gap-2">
          <span className="text-xs text-foreground-lighter">{size}</span>
          <AvatarGroup size={size} max={3}>
            <Avatar>
              <AvatarImage src="https://github.com/mildtomato.png" alt="@mildtomato" />
              <AvatarFallback>MT</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>AB</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>CD</AvatarFallback>
            </Avatar>
          </AvatarGroup>
        </div>
      ))}
    </div>
  )
}
