'use server'

import { Thread } from '@/lib/types/user'
import { getCollection } from '@/lib/utils/db'

export async function createThread({ uid, content }: { uid: string; content: string }): Promise<Thread | undefined> {
  const col = getCollection('testThreadsDB')('testThreads')
  const r1 = await col.findOne({ uid })
  if (!r1) {
    const r2 = await col.insertOne({ uid, threads: [] })
    if (!r2.acknowledged) return undefined
  }

  const doc = r1 ?? { uid, threads: [] }

  const thread: Thread = {
    title: content,
    createAt: new Date(),
    updateAt: new Date(),
    chatLog: [{ timestamp: new Date(), role: 'user', content }],
  }

  const r3 = await col.updateOne(
    { uid },
    {
      $push: {
        threads: thread,
      },
    },
  )

  return r3.acknowledged ? thread : undefined
}
