import { MongoClient } from 'mongodb'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const uid = searchParams.get('uid')

  const MONGODB_URI = 'mongodb://mongodb:27017'
  const client = new MongoClient(MONGODB_URI)
  const db = client.db('testThreadsDB')
  const coll = db.collection('testThreads')

  try {
    await client.connect()
    const result = await coll.findOne(
      { uid: uid },
      { projection: { _id: 0, 'threads.threadId': 1, 'threads.title': 1 } },
    )
    const threadsInfo = result.threads.map((thread) => ({
      threadId: thread.threadId,
      title: thread.title,
    }))

    await client.close()
    return NextResponse.json({ threadsInfo: threadsInfo })
  } catch (error) {
    await client.close()
    return NextResponse.json({ 'Error finding document': error })
  }
}
