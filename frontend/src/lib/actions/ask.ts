'use server'

import { ChatLog } from '@/lib/types/user'
import { getCollection } from '@/lib/utils/db'

export async function ask({ threadId, prompt }: { threadId: string; prompt: string }): Promise<ChatLog[] | undefined> {
  const askTimestamp = new Date()
  const col = getCollection('testThreadsDB')('testThreads')
  const res = await fetch(`${process.env.BACKEND_URL}/chat/${prompt}`)
  if (!res.ok) return undefined

  const ans: string = await res.text()
  const ansTimestamp = new Date()

  const r1 = col.updateOne(
    {
      'threads.threadId': threadId,
    },
    {
      $push: {
        'threads.$.chatLog': {
          $each: [
            {
              timestamp: askTimestamp,
              role: 'user',
              content: prompt,
            },
            {
              timestamp: ansTimestamp,
              role: 'ai',
              content: ans,
            },
          ],
        },
      },
      $set: {
        'threads.$.updateAt': new Date(),
      },
    },
  )

  if (!r1) return undefined

  return [
    {
      timestamp: new Date(),
      role: 'user',
      content: prompt,
    },
    {
      timestamp: new Date(),
      role: 'ai',
      content: ans,
    },
  ]
}
