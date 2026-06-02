import { Avatar, AvatarFallback, AvatarGroupCompact, AvatarImage } from 'ui'

const sizeToAvatar = {
  sm: 'h-5 w-5',
  md: 'h-6 w-6',
  lg: 'h-7 w-7',
} as const

export default function AvatarGroupCompactVariants() {
  return (
    <div className="flex flex-col items-center gap-8">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <div key={size} className="flex flex-col items-center gap-2">
          <span className="text-xs text-foreground-lighter">{size}</span>
          <AvatarGroupCompact size={size} max={3}>
            <Avatar className={sizeToAvatar[size]}>
              <AvatarImage src="https://github.com/mildtomato.png" alt="@mildtomato" />
              <AvatarFallback className="text-[10px]">MT</AvatarFallback>
            </Avatar>
            <Avatar className={sizeToAvatar[size]}>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback className="text-[10px]">SC</AvatarFallback>
            </Avatar>
            <Avatar className={sizeToAvatar[size]}>
              <AvatarFallback className="text-[10px]">AB</AvatarFallback>
            </Avatar>
            <Avatar className={sizeToAvatar[size]}>
              <AvatarFallback className="text-[10px]">CD</AvatarFallback>
            </Avatar>
          </AvatarGroupCompact>
        </div>
      ))}
    </div>
  )
}
