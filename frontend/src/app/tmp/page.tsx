'use client'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Textarea } from '@/components/ui/textarea'
import { Trash } from 'lucide-react'
import Image from 'next/image'
import { signOut } from 'next-auth/react'
import { useEffect, useRef, useState } from 'react'

export default function Chat() {
  const [thread, setThread] = useState()
  const [chat, setChat] = useState([])
  const [threadId, setThreadId] = useState(null)
  const [prompt, setPrompt] = useState('')
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [threadDelete, setThreadDelete] = useState<null | object>(null)
  const hasLoadedBefore = useRef(true)
  const ref = useRef<HTMLDivElement>(null)
  //const uid = '8234a9d1-12e4-4567-89ab-0c1de2f34567'
  const uid = '56b7c890-d12e-5678-f901-4567g8901h23'

  useEffect(() => {
    if (ref.current) ref.current.scrollIntoView({ behavior: 'smooth' })
  }, [chat])

  useEffect(() => {
    if (hasLoadedBefore.current) {
      async function fetchThreads(uid: string) {
        const threadList = []
        try {
          const response = await (await fetch(`/api/thread?uid=${uid}`)).json()
          const titles = response.threadsInfo
          for (let i = 0; i < titles.length; i++) {
            threadList.push(
              <div
                className="flex w-full cursor-pointer items-center justify-between rounded-md bg-muted/50 p-2 transition-colors hover:bg-muted"
                key={i}
                onClick={() => handleClick(titles[i].threadId, true)}
              >
                <div className="grow text-left">
                  <div className="truncate">
                    <div className="text-sm text-foreground">{titles[i].title}</div>
                  </div>
                </div>
                <button
                  className="p-2"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDelete(titles[i].title)
                  }}
                >
                  <Trash className="size-4" />
                </button>
              </div>,
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

  async function fetchChatLog(thread: string) {
    const chatList = []
    try {
      const response = await (await fetch(`/api/chat?thread_id=${thread}`)).json()
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

  async function fetchAnswer() {
    const response = await fetch(`/api/chat?thread_id=${threadId}&prompt=${encodeURIComponent(prompt)}`, {
      method: 'POST',
    })
    if (!response.ok) {
      console.error('API failed')
      throw new Error('API failed')
    }
  }

  function handleClick(thread: string, flag: boolean) {
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

  function handleDelete(title: string) {
    setThreadDelete(title)
    setIsAlertOpen(true)
  }

  function confirmDelete() {
    if (threadDelete) {
      // ここで実際の削除処理を行います
      console.log(`「${threadDelete}」を削除しました`)
      setThreadDelete(null)
    }
    setIsAlertOpen(false)
  }

  function cancelDelete() {
    setThreadDelete(null)
    setIsAlertOpen(false)
  }

  async function handleNewThread() {
    setChat(<></>)
    //createThread(uid: uid, title:'', content,"")
  }

  return (
    <div className="flex h-screen w-full flex-col bg-background">
      <header className="flex items-center justify-between border-b bg-background px-4 py-3 shadow-sm sm:px-6">
        <div className="flex items-center gap-2">
          <MessageCircleIcon className="size-6 text-primary" />
          <h1 className="text-lg font-semibold">チャットボット</h1>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="rounded-full" size="icon" variant="ghost">
              <Image alt="プロフィール" height={50} src="account.svg" width={50} />
              <span className="sr-only">プロフィール</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {/* <DropdownMenuLabel>マイアカウント</DropdownMenuLabel>
          <DropdownMenuSeparator /> */}
            <DropdownMenuItem>プロフィール</DropdownMenuItem>
            <DropdownMenuItem>設定</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOut({ callbackUrl: '/login' })}>ログアウト</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <div className="hidden w-60 border-r bg-background p-4 sm:block">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-medium">スレッド</h2>
            <Button
              className="rounded-full"
              key={'1e2bdf64-3e37-4c57-87a6-c1a88a9b9b5c'}
              onClick={() => handleNewThread('', false)}
              size="icon"
              variant="ghost"
            >
              <PlusIcon className="size-5" />
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
        </div>
      </div>
      <AlertDialog onOpenChange={setIsAlertOpen} open={isAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>「{threadDelete}」を本当に削除しますか？</AlertDialogTitle>
            <AlertDialogDescription>この操作は取り消せません。データが完全に削除されます。</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelDelete}>キャンセル</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>削除</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

function ArrowUpIcon(props: any) {
  return (
    <svg
      {...props}
      fill="none"
      height="24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
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
      fill="none"
      height="24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  )
}

function PlusIcon(props: any) {
  return (
    <svg
      {...props}
      fill="none"
      height="24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
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
      fill="none"
      height="24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}
