import { getCollection } from '@/lib/utils/db'
import { ObjectId } from 'mongodb'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest, { params: { thread_id } }: { params: { thread_id: string } }) {
  try {
    const coll = getCollection('chatsdb')('users')
    const result = await coll.findOne(
      { 'threads.threadId': new ObjectId(thread_id) },
      { projection: { _id: 0, 'threads.$': 1 } },
    )
    const chatLog = result.threads[0].chatLog
    return NextResponse.json({ chatLog })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal Server Error', success: false }, { status: 500 })
  }
}
