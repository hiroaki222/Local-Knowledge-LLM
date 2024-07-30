import Alert from '@/components/Alert'
import ChatView from '@/components/ChatView'
import Header from '@/components/Header'
import PromptForm from '@/components/PromptForm'
import ThreadList from '@/components/ThreadList'

export default function Chat() {
  return (
    <div className="flex h-screen w-full flex-col bg-background">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <ThreadList />
        <div className="flex flex-1 flex-col">
          <ChatView />
          <PromptForm />
        </div>
      </div>
      <Alert />
    </div>
  )
}
