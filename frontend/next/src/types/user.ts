import { z } from 'zod'

export const zUser = z.object({
  uid: z.string(),
  threads: z.array(
    z.object({
      title: z.string(),
      createAt: z.date(),
      updateAt: z.date(),
      chatLog: z.array(
        z.object({
          timestamp: z.date(),
          role: z.union([z.literal('user'), z.literal('ai')]),
          content: z.string(),
        }),
      ),
    }),
  ),
})

export type User = z.infer<typeof zUser>
