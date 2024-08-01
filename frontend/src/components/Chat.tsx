'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ArrowUpIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

export default function Chat(o: { threadId: string; }) {
  const [chat, setChat] = useState()
  const [prompt, setPrompt] = useState('')
  const threadId = o.threadId
  const hasLoadedBefore = useRef(true)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) ref.current.scrollIntoView({ behavior: 'smooth' })
  }, [chat])

  async function fetchChatLog(threadId: string) {
    const chatList = []
    try {
      const response = await (await fetch(`/api/chat?thread_id=${threadId}`)).json()
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

  function handleInputChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setPrompt(event.target.value)
  }

  async function handleSubmit() {
    const response = await fetch(`/api/chat?thread_id=${threadId}&prompt=${encodeURIComponent(prompt)}`, {
      method: 'POST',
    })
    const data = await response.json()

    if (!response.ok) {
      console.error(data.error)
      return
    }

    fetchChatLog(data.thread_id)
    setPrompt('')
  }

  return (
    <>
      <div className="flex-1 overflow-hidden px-4 py-6 sm:px-6">
        <div className="h-full overflow-y-auto pr-4">
          <div className="grid gap-4">{chat}</div>
        </div>
      </div>
      <div className="border-t bg-background px-4 py-3 sm:px-6">
        <div className="relative">
          <Textarea
            className="min-h-[48px] w-full rounded-2xl border border-neutral-400 pr-16 shadow-sm"
            onChange={handleInputChange}
            placeholder="質問を入力..."
            value={prompt}
          />
          <Button
            className="absolute right-3 top-3"
            disabled={!prompt.trim()}
            onClick={() => handleSubmit()}
            size="icon"
            type="submit"
          >
            <ArrowUpIcon className="size-4" />
            <span className="sr-only">送信</span>
          </Button>
        </div>
      </div>
    </>
  )
}
