'use client'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'

export default function PromptForm() {
  const [prompt, setPrompt] = useState('')
  function handleInputChange() {}
  function handleSubmit() {}
  return (
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
