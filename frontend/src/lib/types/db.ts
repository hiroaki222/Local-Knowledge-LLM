import { z } from 'zod'

import { zUser } from './user'

export const mongoSchema = {
  chatsdb: {
    users: zUser,
  },
} satisfies {
  [db: string]: {
    [collection: string]: z.AnyZodObject
  }
}
