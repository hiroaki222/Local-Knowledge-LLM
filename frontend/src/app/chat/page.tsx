import PromptForm from '@/components/PromptForm'
import { auth } from '@/lib/utils/auth'

export default async function Chat() {
  const session = await auth()
  if (!session) return <></>

  return (
    <div className=" flex min-h-[calc(100dvh-4rem)] flex-col">
      <div className=" grow"></div>
      <PromptForm uuid={session.uuid} />
    </div>
  )
}
