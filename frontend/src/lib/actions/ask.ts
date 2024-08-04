'use server'

import { ChatLog } from '@/lib/types/user'
import { getCollection } from '@/lib/utils/db'

export async function ask({ prompt, threadId }: { prompt: string; threadId: string }): Promise<ChatLog[] | undefined> {
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
              content: prompt,
              role: 'user',
              timestamp: askTimestamp,
            },
            {
              content: ans,
              role: 'ai',
              timestamp: ansTimestamp,
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
      content: prompt,
      role: 'user',
      timestamp: new Date(),
    },
    {
      content: ans,
      role: 'ai',
      timestamp: new Date(),
    },
  ]
}
