import { getCollection } from '@/lib/utils/db'
import { ObjectId } from 'mongodb'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const uid = searchParams.get('uid')

    const coll = getCollection('chatsdb')('users')
    const result = await coll.findOne(
      { uid: uid! },
      { projection: { _id: 0, 'threads.threadId': 1, 'threads.title': 1 } },
    )
    const threadsInfo = result!.threads.map((thread) => ({
      threadId: thread.threadId,
      title: thread.title,
    }))
    return NextResponse.json({ success: true, threadsInfo: threadsInfo })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal Server Error', success: false }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const threadId = searchParams.get('threadId')

    const coll = getCollection('chatsdb')('users')
    const result = await coll.updateOne(
      { 'threads.threadId': new ObjectId(threadId) },
      { $pull: { threads: { threadId: new ObjectId(threadId) } } },
    )
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal Server Error', success: false }, { status: 500 })
  }
}
