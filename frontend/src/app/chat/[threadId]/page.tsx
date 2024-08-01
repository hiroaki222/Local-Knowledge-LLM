import ChatView from '@/components/ChatView'
import PromptForm from '@/components/PromptForm'

export default function ChatPage({ params }: { params: { threadId: string } }) {
  return (
    <>
      <ChatView threadId={params.threadId} />
      <PromptForm />
    </>
  )
  //return <ChatView />
}
