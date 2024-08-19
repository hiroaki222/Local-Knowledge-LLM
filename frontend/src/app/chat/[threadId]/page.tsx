import type { Thread } from '@/lib/types/user'

import ChatView from '@/components/ChatView'
import PromptForm from '@/components/PromptForm'
import { headers } from 'next/headers'

export default async function ChatPage({ params: { threadId } }: { params: { threadId: string } }) {
  const hostname = headers().get('host')
  const res = await fetch(`http://${hostname}/api/chat/${threadId}`, { next: { tags: ['chatLog'] } })
  const thread: Thread = await res.json()

  return (
    <main>
      <ChatView thread={thread} />
      <PromptForm threadId={threadId} />
    </main>
  )
}
