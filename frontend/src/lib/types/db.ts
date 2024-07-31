import { z } from 'zod'

import { zUser } from './user'

export const mongoSchema = {
  testThreadsDB: {
    testThreads: zUser,
  },
} satisfies {
  [db: string]: {
    [collection: string]: z.AnyZodObject
  }
}
