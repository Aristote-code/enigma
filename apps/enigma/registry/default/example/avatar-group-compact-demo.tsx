import { Avatar, AvatarFallback, AvatarGroupCompact, AvatarImage } from 'ui'

export default function AvatarGroupCompactDemo() {
  return (
    <AvatarGroupCompact max={3}>
      <Avatar className="h-6 w-6">
        <AvatarImage src="https://github.com/mildtomato.png" alt="@mildtomato" />
        <AvatarFallback className="text-[10px]">MT</AvatarFallback>
      </Avatar>
      <Avatar className="h-6 w-6">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback className="text-[10px]">SC</AvatarFallback>
      </Avatar>
      <Avatar className="h-6 w-6">
        <AvatarFallback className="text-[10px]">AB</AvatarFallback>
      </Avatar>
      <Avatar className="h-6 w-6">
        <AvatarFallback className="text-[10px]">CD</AvatarFallback>
      </Avatar>
      <Avatar className="h-6 w-6">
        <AvatarFallback className="text-[10px]">EF</AvatarFallback>
      </Avatar>
    </AvatarGroupCompact>
  )
}
