import { MongoClient } from "mongodb";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const threadId = searchParams.get("thread_id");

  const MONGODB_URI = "mongodb://mongodb:27017";
  const client = new MongoClient(MONGODB_URI);
  const db = client.db("testThreadsDB");
  const coll = db.collection("testThreads");
  try {
    await client.connect();
    const result = await coll.findOne(
      { "threads.threadId": threadId },
      { projection: { "threads.$": 1, _id: 0 } }
    );
    const chatLog = result.threads[0].chatLog;
    await client.close();
    return NextResponse.json({ chatLog });
  } catch (error) {
    await client.close();
    return NextResponse.json({ "Error finding document": error });
  }
}

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const threadId = searchParams.get("thread_id")
  const prompt = searchParams.get("prompt")

  const MONGODB_URI = "mongodb://mongodb:27017"
  const client = new MongoClient(MONGODB_URI)
  const db = client.db("testThreadsDB")
  const coll = db.collection("testThreads")

  try {
    /* const response = await fetch(`http://backend:8000/chat/${prompt}`)
    const answer = await response.json() */
    const answer = "答えられません"
    await client.connect()
    const result = await coll.updateOne(
      {
        "threads.threadId": threadId,
      },
      {
        $push: {
          "threads.$.chatLog": {
            $each: [
              {
                timestamp: new Date(),
                role: "user",
                content: prompt,
              },
              {
                timestamp: new Date(),
                role: "ai",
                content: answer
              }
            ],
          },
        },
        $set: {
          "threads.$.updateAt": new Date(),
        },
      }
    );
    await client.close();
    return NextResponse.json({"status": result})
  } catch (error) {
    await client.close();
    console.error(error)
    return NextResponse.json({ "Error finding document": error });
  }
}
