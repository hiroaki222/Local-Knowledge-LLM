'use client'

import { chatAtom, isPendingAtom } from '@/lib/utils/atom'
import { useSetAtom } from 'jotai'
import { Loader2Icon, SendIcon } from 'lucide-react'
import { useEffect, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { a } from './a'
import { Button } from './ui/button'
import { Input } from './ui/input'

export function InputBar() {
  const setChat = useSetAtom(chatAtom)
  const [isPending, startTransition] = useTransition()
  const setIsPending = useSetAtom(isPendingAtom)
  const { handleSubmit, register, reset } = useForm<{ prompt: string }>()

  useEffect(() => {
    setIsPending(isPending)
  }, [isPending])

  return (
    <form
      className="flex place-items-center gap-2"
      onSubmit={handleSubmit(({ prompt }) =>
        startTransition(async () => {
          a({ prompt })
          // ask({ threadId, prompt })
          reset()
        }),
      )}
    >
      <Input
        disabled={isPending}
        type="text"
        placeholder="質問を入力..."
        className="flex-grow"
        {...register('prompt', { required: true })}
      />
      <Button
        size="icon"
        type="submit"
        className="flex-none"
        onClick={() => {
          setChat((prev) => [...prev, 'ababa'])
        }}
        disabled={isPending}
      >
        {isPending ? <Loader2Icon size={16} className="animate-spin" /> : <SendIcon size={16} />}
      </Button>
    </form>
  )
}
