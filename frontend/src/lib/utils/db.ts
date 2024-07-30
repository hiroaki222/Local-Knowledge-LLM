import { mongoSchema } from '@/lib/types/db'
import { MongoClient } from 'mongodb'
import { z } from 'zod'

export const mongoClient = new MongoClient(process.env.MONGODB_URL)
export const getCollection = (db: keyof typeof mongoSchema) => {
  const col = mongoSchema[db]
  return (collection: keyof typeof col) => {
    const doc = mongoSchema[db][collection]
    return mongoClient.db(db).collection<z.infer<typeof doc>>(collection)
  }
}
