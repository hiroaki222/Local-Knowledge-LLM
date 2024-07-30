'use server'

import { Thread } from '@/lib/types/user'
import { getCollection } from '@/lib/utils/db'
import { ObjectId } from 'mongodb'

export async function createThread({
  uid,
  title,
  content,
}: {
  uid: string
  title: string
  content: string
}): Promise<string | undefined> {
  const col = getCollection('testThreadsDB')('testThreads')
  const r1 = await col.findOne({ uid })
  if (!r1) {
    const r2 = await col.insertOne({ uid, threads: [] })
    if (!r2.acknowledged) return undefined
  }

  const doc = r1 ?? { uid, threads: [] }

  const thread: Thread = {
    threadId: new ObjectId(),
    title: title,
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

  if (r3.acknowledged && r3.modifiedCount > 0) {
    console.log(thread.threadId.toString())
    return thread.threadId.toString()
  } else {
    return undefined
  }
}
