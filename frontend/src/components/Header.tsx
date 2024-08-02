'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MessageCircleIcon } from 'lucide-react'
import Image from 'next/image'
import { signOut } from 'next-auth/react'

export default function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background px-4 py-3 shadow-sm sm:px-6">
      <div className="flex items-center gap-2">
        <MessageCircleIcon className="size-6 text-primary" />
        <h1 className="text-lg font-semibold">チャットボット</h1>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="rounded-full" size="icon" variant="ghost">
            <Image alt="プロフィール" height={50} src="/account.svg" width={50} />
            <span className="sr-only">プロフィール</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>user@example.com</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {/* <DropdownMenuItem>プロフィール</DropdownMenuItem> */}
          <DropdownMenuItem>設定</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => signOut({ callbackUrl: '/login' })}>ログアウト</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
