import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from 'ui'

export default function AvatarGroupDemo() {
  return (
    <AvatarGroup max={4}>
      <Avatar>
        <AvatarImage src="https://github.com/mildtomato.png" alt="@mildtomato" />
        <AvatarFallback>MT</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>SC</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://github.com/vercel.png" alt="@vercel" />
        <AvatarFallback>VC</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>CD</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>EF</AvatarFallback>
      </Avatar>
    </AvatarGroup>
  )
}
