'use server'

import { getCollection } from '@/lib/utils/db'
import { ObjectId } from 'mongodb'

export async function createThread({
  prompt,
  uuid,
}: {
  prompt: string
  uuid: string | undefined
}): Promise<string | undefined> {
  if (!uuid) return undefined

  const coll = getCollection('chatsdb')('users')
  coll.findOne({ uid: uuid })

  const r1 = await coll.findOne({ uid: uuid })
  if (!r1) {
    const r2 = await coll.insertOne({
      threads: [],
      uid: uuid,
    })
    if (!r2.acknowledged) return undefined
  }

  const threadId = new ObjectId()
  const r3 = await coll.updateOne(
    { uid: uuid },
    {
      $push: {
        threads: {
          chatLog: [],
          createAt: new Date(),
          threadId,
          title: prompt,
          updateAt: new Date(),
        },
      },
    },
  )

  if (r3.acknowledged && 0 < r3.modifiedCount) {
    return threadId.toString()
  }

  return undefined
}
