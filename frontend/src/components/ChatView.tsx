'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useEffect, useRef, useState } from 'react'

export default function ChatView(o: object) {
  const [chat, setChat] = useState()
  const hasLoadedBefore = useRef(true)
  const ref = useRef<HTMLDivElement>(null)
  const threadId = o.threadId

  useEffect(() => {
    if (ref.current) ref.current.scrollIntoView({ behavior: 'smooth' })
  }, [chat])

  async function fetchChatLog(threadId: string) {
    const chatList = []
    try {
      const response = await (await fetch(`/api/chat/${threadId}`, { next: { tags: ['chatLog'] } })).json()
      const chatLog = response.chatLog
      if (chatLog && chatLog.length > 0) {
        for (let i = 0; i < chatLog.length; i++) {
          switch (chatLog[i].role) {
            case 'user':
              chatList.push(
                <div className="flex items-start justify-end gap-4" key={`user-${i}`}>
                  <div className="grid gap-1">
                    <div className="text-m max-w-[500px] whitespace-pre-wrap rounded-lg bg-primary p-3 text-primary-foreground">
                      {chatLog[i].content}
                    </div>
                  </div>
                </div>,
              )
              break
            case 'ai':
              chatList.push(
                <div className="flex items-start gap-4" key={`ai-${i}`} ref={ref}>
                  <Avatar className="size-8 border-2">
                    <AvatarImage src="/neurology.svg" />
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1">
                    <div className="text-m max-w-[500px] whitespace-pre-wrap rounded-lg bg-muted p-3">
                      {chatLog[i].content}
                    </div>
                  </div>
                </div>,
              )
              break
          }
        }
      }
      setChat(chatList)
      return
    } catch (error) {
      console.error(error)
      setChat(<></>)
      return
    }
  }

  useEffect(() => {
    if (hasLoadedBefore.current) {
      fetchChatLog(threadId)
      hasLoadedBefore.current = false
    }
  })

  return (
    <div className="flex-1 overflow-hidden px-4 py-6 sm:px-6">
      <div className="h-full overflow-y-auto pr-4">
        <div className="grid gap-4">{chat}</div>
      </div>
    </div>
  )
}
