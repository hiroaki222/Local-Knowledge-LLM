import type { Thread } from '@/lib/types/user'

import ChatView from '@/components/ChatView'
import PromptForm from '@/components/PromptForm'
import { auth } from '@/lib/utils/auth'
import { headers } from 'next/headers'

export default async function ChatPage({ params: { threadId } }: { params: { threadId: string } }) {
  const session = await auth()
  if (!session) return <></>

  const hostname = headers().get('host')
  const res = await fetch(`${hostname}/api/chat/${threadId}`, { next: { tags: [threadId] } })
  const thread: Thread = await res.json()

  return (
    <>
      <ChatView thread={thread} />
      <PromptForm threadId={threadId} uuid={session.uuid} />
    </>
  )
}
