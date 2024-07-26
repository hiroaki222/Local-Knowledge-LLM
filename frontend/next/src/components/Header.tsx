import { MessageCircleIcon } from 'lucide-react'
import { Session } from './Session'

export function Header() {
  return (
    <header className="sticky top-0 flex h-16 w-full items-center gap-2 border-b bg-background px-4">
      <MessageCircleIcon />
      <h1 className="text-xl font-bold">チャットボット</h1>
      <Session />
    </header>
  )
}
