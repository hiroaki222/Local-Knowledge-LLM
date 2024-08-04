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
import { deleteThread } from '@/lib/actions/delete-thread'
import { PlusIcon, Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function ThreadList({
  threads,
  uuid,
}: {
  threads: { threadId: string; title: string }[]
  uuid: string
}) {
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [threadDelete, setThreadDelete] = useState<{ threadId: null | string; title: null | string }>({
    threadId: null,
    title: null,
  })
  const router = useRouter()

  function handleDelete({ threadId, title }: { threadId: string; title: string }) {
    setThreadDelete({ threadId: threadId, title: title })
    setIsAlertOpen(true)
  }

  function confirmDelete() {
    return (async () => {
      if (!threadDelete.threadId) return

      const { threadId } = threadDelete
      await deleteThread({ threadId, uuid })

      setThreadDelete({ threadId: null, title: null })
      setIsAlertOpen(false)
    })()
  }

  function cancelDelete() {
    setThreadDelete({ threadId: null, title: null })
    setIsAlertOpen(false)
  }

  return (
    <aside className=" sticky top-16 h-[calc(100dvh-4rem)] overflow-auto border-r bg-background p-4 sm:block">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-medium">スレッド</h2>
        <Button
          className="rounded-full"
          key={'1e2bdf64-3e37-4c57-87a6-c1a88a9b9b5c'}
          onClick={() => router.push('/chat')}
          size="icon"
          variant="ghost"
        >
          <PlusIcon className="size-5" />
          <span className="sr-only">新しいスレッド</span>
        </Button>
      </div>
      <div className="space-y-2 overflow-auto">
        {threads.map(({ threadId, title }, i) => (
          <>
            <div
              className="flex w-full cursor-pointer items-center justify-between rounded-md bg-muted/50 p-2 transition-colors hover:bg-muted"
              key={i}
              onClick={() => router.push(`/chat/${threadId}`)}
            >
              <div className="grow text-left">
                <div className="truncate">
                  <div className="text-sm text-foreground">{title}</div>
                </div>
              </div>
              <button
                className="p-2"
                onClick={(e) => {
                  e.stopPropagation()
                  handleDelete({ threadId, title })
                }}
              >
                <Trash className="size-4" />
              </button>
            </div>
          </>
        ))}
      </div>
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
    </aside>
  )
}
