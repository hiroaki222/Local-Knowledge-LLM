import { getCollection } from '@/lib/utils/db'
import { ObjectId } from 'mongodb'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
  const { searchParams } = new URL(request.url)
  const thread_id = searchParams.get('thread_id')
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

export async function POST(request:NextRequest){
  try {
    const { searchParams } = new URL(request.url)
    const thread_id = searchParams.get('thread_id')
    const prompt = searchParams.get('prompt')

    const coll = getCollection('chatsdb')('users')
    /* const response = await fetch(`http://backend:8000/chat/${prompt}`)
    const answer = await response.json() */
    const answer = '答えられません'
    const result = await coll.updateOne(
      { 'threads.threadId': new ObjectId(thread_id!) },
      {
        $push: {
          'threads.$.chatLog': {
            $each: [
              {
                content: prompt,
                role: 'user',
                timestamp: new Date(),
              },
              {
                content: answer,
                role: 'ai',
                timestamp: new Date(),
              },
            ],
          },
        },
        $set: {
          'threads.$.updateAt': new Date(),
        },
      },
    )
    return NextResponse.json({ success: true, thread_id: thread_id })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal Server Error', success: false }, { status: 500 })
  }
}