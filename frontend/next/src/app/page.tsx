'use client'

import { Chat } from '@/components/Chat'
import { Header } from '@/components/Header'
import { InputBar } from '@/components/InputBar'
import { Threads } from '@/components/Threads'
import { useSession } from 'next-auth/react'

export default function Home() {
  const session = useSession()

  return (
    <>
      <Header />
      <div className="grid md:grid-cols-[16rem,1fr]">
        <aside className="sticky top-16 h-[calc(100dvh-4rem)] overflow-auto border-r bg-background">
          <Threads threads={[{ id: '1', title: 'a', chatLog: [], createAt: new Date(), updateAt: new Date() }]} />
        </aside>
        <main>
          <div className="grid min-h-[calc(100dvh-8rem)] content-end gap-2 p-2 pb-0">
            <Chat />
          </div>
          <div className="sticky bottom-0 grid h-16 w-full bg-background p-2">
            <InputBar />
          </div>
        </main>
      </div>
    </>
  )
}
