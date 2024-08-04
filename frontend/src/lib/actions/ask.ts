'use server'

import { getCollection } from '@/lib/utils/db'
import { ObjectId } from 'mongodb'
import { revalidateTag } from 'next/cache'

export async function ask({ prompt, threadId }: { prompt: string; threadId: string }) {
  const coll = getCollection('chatsdb')('users')
  /* const response = await fetch(`http://backend:8000/chat/${prompt}`)
    const answer = await response.json() */
  const answer = '答えられません'
  await coll.updateOne(
    { 'threads.threadId': new ObjectId(threadId) },
    {
      $push: {
        'threads.$.chatLog': {
          $each: [
            {
              content: prompt,
              role: 'user',
              timestamp: new Date(),
            },
            {
              content: answer,
              role: 'ai',
              timestamp: new Date(),
            },
          ],
        },
      },
      $set: {
        'threads.$.updateAt': new Date(),
      },
    },
  )

  revalidateTag(threadId)
}
