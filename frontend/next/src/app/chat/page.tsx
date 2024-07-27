'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

export default function Chat() {
  const [thread, setThread] = useState()
  const [chat, setChat] = useState([])
  const [threadId, setThreadId] = useState(null)
  const [prompt, setPrompt] = useState('')
  const hasLoadedBefore = useRef(true)
  //const uid = '8234a9d1-12e4-4567-89ab-0c1de2f34567'
  const uid = '34a5678b-90cd-4567-a12b-3e4f5g6789h0'

  useEffect(() => {
    if (hasLoadedBefore.current) {
      async function fetchThreads(uid: String) {
        const threadList = []
        try {
          const response = await (await fetch(`/api/thread?uid=${uid}`)).json()
          const titles = response.threadsInfo
          for (let i = 0; i < titles.length; i++) {
            threadList.push(
              <button
                className="block flex w-full items-center gap-3 rounded-md bg-muted/50 p-2 transition-colors hover:bg-muted"
                key={i}
                onClick={() => handleClick(titles[i].threadId, true)}
              >
                <div className="truncate">
                  <div className="text-sm text-foreground">{titles[i].title}</div>
                </div>
              </button>,
            )
          }
          //handleClick(titles[0].threadId, true)
          return threadList
        } catch (error) {
          console.error(error)
          return []
        }
      }
      setThread(fetchThreads(uid))
      hasLoadedBefore.current = false
    }
  }, [])

  useEffect(() => {
    fetchChatLog(threadId)
  }, [threadId])

  async function fetchChatLog(threadId: String) {
    const chatList = []
    try {
      const response = await (await fetch(`/api/chat?thread_id=${threadId}`)).json()
      const chatLog = response.chatLog
      if (chatLog && chatLog.length > 0) {
        for (let i = 0; i < chatLog.length; i++) {
          switch (chatLog[i].role) {
            case 'user':
              chatList.push(
                <div key={`user-${i}`} className="flex items-start justify-end gap-4">
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
                <div key={`ai-${i}`} className="flex items-start gap-4">
                  <Avatar className="h-8 w-8 border-2">
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

  async function fetchAnswer() {
    const response = await fetch(`/api/chat?thread_id=${threadId}&prompt=${encodeURIComponent(prompt)}`, {
      method: 'POST',
    })
    if (!response.ok) {
      console.error('API failed')
      throw new Error('API failed')
    }
  }

  function handleClick(thread: String, flag: Boolean) {
    setThreadId(thread)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(event.target.value)
  }

  const handleSubmit = async () => {
    setPrompt('')
    await fetchAnswer()
    await fetchChatLog(threadId)
  }
  return (
    <div className="flex h-screen w-full flex-col bg-background">
      <header className="flex items-center justify-between border-b bg-background px-4 py-3 shadow-sm sm:px-6">
        <div className="flex items-center gap-2">
          <MessageCircleIcon className="h-6 w-6 text-primary" />
          <h1 className="text-lg font-semibold">チャットボット</h1>
        </div>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Image src="account.svg" alt="プロフィール" width={50} height={50} />
          <span className="sr-only">プロフィール</span>
        </Button>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <div className="hidden w-60 border-r bg-background p-4 sm:block">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-medium">スレッド</h2>
            <Button
              key={'1e2bdf64-3e37-4c57-87a6-c1a88a9b9b5c'}
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => handleClick('', false)}
            >
              <PlusIcon className="h-5 w-5" />
              <span className="sr-only">新しいスレッド</span>
            </Button>
          </div>
          <div className="space-y-2 overflow-auto">{thread}</div>
        </div>
        <div className="flex flex-1 flex-col">
          <div className="flex-1 overflow-hidden px-4 py-6 sm:px-6">
            <div className="h-full overflow-y-auto pr-4">
              <div className="grid gap-4">{chat}</div>
            </div>
          </div>
          <div className="border-t bg-background px-4 py-3 sm:px-6">
            <div className="relative">
              <Textarea
                placeholder="質問を入力..."
                className="border-neutral-400 min-h-[48px] w-full rounded-2xl border pr-16 shadow-sm"
                value={prompt}
                onChange={handleInputChange}
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-3 top-3"
                disabled={!prompt.trim()}
                onClick={() => handleSubmit()}
              >
                <ArrowUpIcon className="h-4 w-4" />
                <span className="sr-only">送信</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ArrowUpIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m5 12 7-7 7 7" />
      <path d="M12 19V5" />
    </svg>
  )
}

function MessageCircleIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  )
}

function PlusIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}

function XIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}
