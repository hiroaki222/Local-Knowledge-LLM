'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { ask } from '@/lib/actions/ask'
import { createThread } from '@/lib/actions/create-thread'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowUpIcon, Loader2Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export default function PromptForm({ threadId, uuid }: { threadId?: string; uuid: string }) {
  const [isPending, startTransition] = useTransition()
  const ref = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const zForm = z.object({
    prompt: z.string().min(1),
  })

  const form = useForm<z.infer<typeof zForm>>({
    defaultValues: {
      prompt: '',
    },
    resolver: zodResolver(zForm),
  })

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }, [form.watch().prompt])

  return (
    <>
      <div ref={ref} />
      <div className=" sticky bottom-0">
        <Form {...form}>
          <form
            className=" relative p-2"
            onSubmit={form.handleSubmit(async ({ prompt }) =>
              startTransition(async () => {
                if (!threadId) {
                  const newThreadId = await createThread({ prompt, uuid })
                  if (!newThreadId) return
                  await ask({ prompt, threadId: newThreadId })
                  router.push(`/chat/${newThreadId}`)
                  return
                }

                await ask({ prompt, threadId })

                form.reset()
              }),
            )}
          >
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      disabled={isPending}
                      {...field}
                      className=" hidden-scrollbar field-sizing min-h-14 resize-none pr-14"
                      placeholder="質問を入力..."
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button className=" absolute bottom-4 right-4" disabled={isPending} size="icon" type="submit">
              {isPending ? <Loader2Icon className=" animate-spin" /> : <ArrowUpIcon />}
            </Button>
          </form>
        </Form>
      </div>
    </>
  )
}
