import { mongoSchema } from '@/types/db'
import { MongoClient } from 'mongodb'
import { z } from 'zod'

const mongoClient = new MongoClient(process.env.MONGO_URL)
export const collection = (db: keyof typeof mongoSchema) => {
  const col = mongoSchema[db]
  return (collection: keyof typeof col) => {
    const doc = mongoSchema[db][collection]
    return mongoClient.db(db).collection<z.infer<typeof doc>>(collection)
  }
}
