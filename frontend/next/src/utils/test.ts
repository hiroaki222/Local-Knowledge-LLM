import { MongoClient } from "mongodb";

const MONGODB_URI = "mongodb://mongodb:27017";
const client = new MongoClient(MONGODB_URI);
const db = client.db("testThreadsDB");
const coll = db.collection("testThreads");

async function func() {
  try {
    await client.connect();
    const result = await coll.findOne(
      {
        uid: "8234a9d1-12e4-4567-89ab-0c1de2f34567",
        "threads.title": "AIとの対話",
      },
      {
        projection: {
          "threads.$": 1,
        },
      }
    );
    const chatLog = result.threads[0].chatLog;
    console.log(chatLog);
  } catch (error) {
    console.error("Error finding document:", error);
  } finally {
    await client.close();
  }
}

func();
