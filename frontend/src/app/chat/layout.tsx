import Header from '@/components/Header'
import ThreadList from '@/components/ThreadList'
import { auth } from '@/lib/utils/auth'
import { headers } from 'next/headers'

export default async function ChatLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session) return <></>

  const hostname = headers().get('host')
  const res = await fetch(`${hostname}/api/thread?uid=${session.uuid}`, { next: { tags: [session.uuid] } }).catch(
    () => undefined,
  )

  if (!res) return <></>

  const data: {
    success: boolean
    threadsInfo: {
      threadId: string
      title: string
    }[]
  } = await res.json()

  return (
    <>
      <Header />
      <div className=" grid grid-cols-[15rem,1fr]">
        <ThreadList threads={data.threadsInfo} uuid={session.uuid} />
        <main>{children}</main>
      </div>
    </>
  )
}
