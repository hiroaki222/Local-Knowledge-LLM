'use server'

import { Thread } from '@/lib/types/user'
import { getCollection } from '@/lib/utils/db'
import { ObjectId } from 'mongodb'

export async function createThread({
  content,
  title,
  uid,
}: {
  content: string
  title: string
  uid: string
}): Promise<string | undefined> {
  const col = getCollection('testThreadsDB')('testThreads')
  const r1 = await col.findOne({ uid })
  if (!r1) {
    const r2 = await col.insertOne({ threads: [], uid })
    if (!r2.acknowledged) return undefined
  }

  const doc = r1 ?? { threads: [], uid }

  const thread: Thread = {
    chatLog: [{ content, role: 'user', timestamp: new Date() }],
    createAt: new Date(),
    threadId: new ObjectId(),
    title: title,
    updateAt: new Date(),
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
