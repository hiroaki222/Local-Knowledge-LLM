'use client'

import type { Thread } from '@/lib/types/user'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
// import { useEffect, useRef } from 'react'

export default function ChatView({ thread }: { thread: Thread }) {
  return (
    <>
      <div className="grid min-h-[64.25rem] content-end gap-4 p-4">
        {thread.chatLog.map((v, i) =>
          v.role == 'user' ? (
            <div className="flex items-start justify-end gap-4" key={`user-${i}`}>
              <div className="grid gap-1">
                <div className=" max-w-[500px] whitespace-pre-wrap rounded-md bg-primary p-3 text-primary-foreground">
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
                <div className=" max-w-[500px] whitespace-pre-wrap rounded-md bg-muted p-3">{v.content}</div>
              </div>
            </div>
          ),
        )}
      </div>
    </>
  )
}
