import { ObjectId } from 'mongodb'
import { z } from 'zod'

const zChatLog = z.object({
  timestamp: z.date(),
  role: z.union([z.literal('user'), z.literal('ai')]),
  content: z.string(),
})

const zThread = z.object({
  threadId: z.instanceof(ObjectId),
  title: z.string(),
  createAt: z.date(),
  updateAt: z.date(),
  chatLog: z.array(zChatLog),
})

export const zUser = z.object({
  uid: z.string(),
  threads: z.array(zThread),
})

export type ChatLog = z.infer<typeof zChatLog>
export type Thread = z.infer<typeof zThread>
export type User = z.infer<typeof zUser>
