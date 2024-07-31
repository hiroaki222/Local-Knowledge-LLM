import { getCollection } from '@/lib/utils/db'
import { ObjectId } from 'mongodb'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const threadId = searchParams.get('thread_id')

    const coll = getCollection('chatsdb')('users')
    const result = await coll.findOne(
      { 'threads.threadId': new ObjectId(threadId) },
      { projection: { _id: 0, 'threads.$': 1 } },
    )
    const chatLog = result.threads[0].chatLog
    return NextResponse.json({ chatLog })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal Server Error', success: false }, { status: 500 })
  }
}
