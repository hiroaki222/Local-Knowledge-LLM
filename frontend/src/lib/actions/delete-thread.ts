'use server'

import { ObjectId } from 'mongodb'
import { revalidateTag } from 'next/cache'

import { getCollection } from '../utils/db'

export async function deleteThread({ threadId, uuid }: { threadId: string; uuid: string }): Promise<boolean> {
  const coll = getCollection('chatsdb')('users')

  const result = await coll.updateOne(
    { 'threads.threadId': new ObjectId(threadId) },
    { $pull: { threads: { threadId: new ObjectId(threadId) } } },
  )
  if (!result) return false

  revalidateTag(uuid)

  return true
}
