import PromptForm from '@/components/PromptForm'
import { auth } from '@/lib/utils/auth'

export default async function Chat() {
  const session = await auth()
  if (!session) return <></>

  return (
    <>
      <div className=" h-[64.25rem]" />
      <PromptForm uuid={session.uuid} />
    </>
  )
}
