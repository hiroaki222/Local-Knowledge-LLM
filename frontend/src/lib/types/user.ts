import { ObjectId } from 'mongodb'
import { z } from 'zod'

const zChatLog = z.object({
  content: z.string(),
  role: z.union([z.literal('user'), z.literal('ai')]),
  timestamp: z.date(),
})

const zThread = z.object({
  chatLog: z.array(zChatLog),
  createAt: z.date(),
  threadId: z.instanceof(ObjectId),
  title: z.string(),
  updateAt: z.date(),
})

export const zUser = z.object({
  threads: z.array(zThread),
  uid: z.string(),
})

export type ChatLog = z.infer<typeof zChatLog>
export type Thread = z.infer<typeof zThread>
export type User = z.infer<typeof zUser>
