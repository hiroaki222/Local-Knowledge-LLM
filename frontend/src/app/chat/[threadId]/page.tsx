import Chat from '@/components/Chat'

export default function ChatPage({ params }: { params: { threadId: string } }) {
  return (
    <>
      <Chat threadId={params.threadId} />
    </>
  )
}
