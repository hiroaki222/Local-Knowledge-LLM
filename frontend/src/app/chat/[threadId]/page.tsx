import ChatView from '@/components/ChatView'

export default function ChatPage({ params }: { params: { threadId: string } }) {
  //return <ChatView threadId={params.threadId} />
  return <ChatView />
}
