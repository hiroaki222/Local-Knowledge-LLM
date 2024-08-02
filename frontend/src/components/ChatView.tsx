'use client'

import type { Thread } from '@/lib/types/user'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useEffect, useRef } from 'react'

export default function ChatView({ thread }: { thread: Thread }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }, [thread])

  return (
    <>
      <div className="flex-1 overflow-hidden px-4 py-6 sm:px-6">
        <div className="h-full pr-4">
          <div className="grid gap-4">
            {thread.chatLog.map((v, i) =>
              v.role == 'user' ? (
                <div className="flex items-start justify-end gap-4" key={`user-${i}`}>
                  <div className="grid gap-1">
                    <div className="text-m max-w-[500px] whitespace-pre-wrap rounded-lg bg-primary p-3 text-primary-foreground">
                      {v.content}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-4" key={`ai-${i}`}>
                  <Avatar className="size-8 border-2">
                    <AvatarImage src="/neurology.svg" />
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1">
                    <div className="text-m max-w-[500px] whitespace-pre-wrap rounded-lg bg-muted p-3">{v.content}</div>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
      <div ref={ref} />
    </>
  )
}
