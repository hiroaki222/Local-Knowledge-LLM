import { MongoClient } from 'mongodb';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(request: NextRequest){
  const { searchParams } = new URL(request.url)
  const uid = searchParams.get('uid')

  const MONGODB_URI = "mongodb://mongodb:27017"
  const client = new MongoClient(MONGODB_URI)
  const db = client.db('testThreadsDB')
  const coll = db.collection('testThreads')

  let result: Object | null
  try {
    await client.connect()
    result = await coll.findOne({uid: uid})
    const titles: string[] = result.threads.map(thread => thread.title);
    await client.close()
    return NextResponse.json({"titles":titles})
  } catch (error) {
    await client.close()
    return NextResponse.json({"Error finding document" : error})
  }
}