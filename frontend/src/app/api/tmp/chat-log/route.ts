import { MongoClient } from 'mongodb'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const uid = searchParams.get('uid')
  const title = searchParams.get('title')

  const MONGODB_URI = 'mongodb://mongodb:27017'
  const client = new MongoClient(MONGODB_URI)
  const db = client.db('testThreadsDB')
  const coll = db.collection('testThreads')

  let result: null | Object
  try {
    await client.connect()
    const result = await coll.findOne(
      {
        'threads.title': title,
        uid: uid,
      },
      {
        projection: {
          'threads.$': 1,
        },
      },
    )
    const chatLog = result.threads[0].chatLog
    await client.close()
    return NextResponse.json({ chatLog })
  } catch (error) {
    await client.close()
    return NextResponse.json({ 'Error finding document': error })
  }
}
