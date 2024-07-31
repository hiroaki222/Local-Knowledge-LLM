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
import { Button } from '@/components/ui/button'
import { Trash } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

export default function ThreadList({ uid }: { uid: string }) {
  const [threads, setThreads] = useState([])
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [threadDelete, setThreadDelete] = useState({ threadId: null, title: null })
  const hasLoadedBefore = useRef(true)

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
            onClick={() => handleClick(titles[i].threadId)}
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
                handleDelete({ threadId: titles[i].threadId, title: titles[i].title })
              }}
            >
              <Trash className="size-4" />
            </button>
          </div>,
        )
      }

      setThreads(threadList)
    } catch (error) {
      console.error(error)
      setThreads(<></>)
    }
  }

  useEffect(() => {
    if (hasLoadedBefore.current) {
      fetchThreads(uid)
      hasLoadedBefore.current = false
    }
  })

  function handleClick(threadId: string) {
    console.log(threadId)
  }

  function handleDelete({ threadId, title }: { threadId: string; title: string }) {
    setThreadDelete({ threadId: threadId, title: title })
    setIsAlertOpen(true)
  }

  function confirmDelete() {
    if (threadDelete) {
      ;(async () => {
        try {
          const response = await fetch(`/api/thread?threadId=${threadDelete.threadId}`, {
            method: 'DELETE',
          })
          await fetchThreads(uid)
        } catch (error) {
          console.error(error)
        }
      })()

      setThreadDelete({ threadId: null, title: null })
    }
    setIsAlertOpen(false)
  }

  function cancelDelete() {
    setThreadDelete({ threadId: null, title: null })
    setIsAlertOpen(false)
  }

  function handleNewThread(a, b) {}
  return (
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
      <div className="space-y-2 overflow-auto">{threads}</div>
      <AlertDialog onOpenChange={setIsAlertOpen} open={isAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>「{threadDelete.title}」を本当に削除しますか？</AlertDialogTitle>
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
