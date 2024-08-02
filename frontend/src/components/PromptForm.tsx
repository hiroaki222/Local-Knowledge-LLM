'use client'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { SubmitPrompt } from '@/lib/actions/submit-prompt'
import { ArrowUpIcon } from 'lucide-react'
import React, { useState } from 'react'

export default function PromptForm({ threadId }: { threadId: string }) {
  const [prompt, setPrompt] = useState('')

  function handleInputChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setPrompt(event.target.value)
  }

  async function handleSubmit() {
    await fetch(`/api/prompt?thread_id=${threadId}&prompt=${encodeURIComponent(prompt)}`, {
      method: 'POST',
    })
    setPrompt('')
    SubmitPrompt()
  }
  return (
    <div className="sticky bottom-0 border-t bg-background px-4 py-3 sm:px-6">
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
  )
}
