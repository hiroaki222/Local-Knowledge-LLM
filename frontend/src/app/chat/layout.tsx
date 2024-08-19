import Header from '@/components/Header'
import ThreadList from '@/components/ThreadList'

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  const uid = '56b7c890-d12e-5678-f901-4567g8901h23'

  return (
    <>
      <Header />
      <div className=" grid grid-cols-[15rem,1fr]">
        <ThreadList uid={uid} />
        {children}
      </div>
    </>
  )
}
