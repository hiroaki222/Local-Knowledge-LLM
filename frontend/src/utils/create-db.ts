import { mongoClient } from '@/lib/utils/db'
;(async () => {
  try {
    await mongoClient.connect()
    await mongoClient.db('chatsdb').createCollection('users')
    console.log('The collection was created successfully')
  } catch (error) {
    console.error(error)
  } finally {
    await mongoClient.close()
  }
})()
