'use client'
import { Button } from '@/components/ui/button'

export default function ThreadList() {
  const thread = ''
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
      <div className="space-y-2 overflow-auto">{thread}</div>
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
