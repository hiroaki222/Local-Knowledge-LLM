'use client'

import { Thread } from '@/lib/types/user'
import { PlusIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from './ui/button'

export function Threads({ threads }: { threads: Thread[] }) {
  const pathname = usePathname()

  return (
    <>
      <div className="grid gap-2 p-2">
        <Link href="/" className="grid w-full place-self-stretch">
          <Button
            variant={pathname === '/' ? 'secondary' : 'ghost'}
            className="flex items-center justify-items-end gap-2"
          >
            <p className="flex-grow">新しいスレッド</p>
            <PlusIcon size={16} className="flex-none justify-items-end" />
          </Button>
        </Link>
        {threads.map((thread, i) => (
          <Link key={i} href={`/${thread.id}`} className="grid w-full place-self-stretch">
            <Button variant={pathname === `/${thread.id}` ? 'secondary' : 'ghost'}>{thread.title}</Button>
          </Link>
        ))}
      </div>
    </>
  )
}
