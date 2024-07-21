import { MongoClient} from "mongodb";

const MONGODB_URI = "mongodb://mongodb:27017"
export const client = new MongoClient(MONGODB_URI)

interface UserDoc {
  uid: string
   threads: Thread[] 
}

interface Thread {
  title: string
  createAt: Date
  updateAt: Date
  chatLog: ChatLog[]
}

interface ChatLog {
  timestamp: Date
  role: 'user' | 'ai'
  content: string
}

const db = client.db('testThreadsDB')
const coll = db.collection("testThreads")
const docs = [
  {
    uid : "8234a9d1-12e4-4567-89ab-0c1de2f34567",
    threads: [
      {
        title: 'AIとの対話',
        createAt: new Date('2024-07-19T10:00:00Z'),
        updateAt: new Date('2024-07-19T10:30:00Z'),
        chatLog: [
          {
            timestamp: new Date('2024-07-19T10:00:00Z'),
            role: 'user',
            content: 'こんにちは、AIさん。'
          },
          {
            timestamp: new Date('2024-07-19T10:00:05Z'),
            role: 'ai',
            content: 'こんにちは！どのようなお手伝いができますか？'
          },
          {
            timestamp: new Date('2024-07-19T10:05:00Z'),
            role: 'user',
            content: 'AIの歴史について教えてください。'
          },
          {
            timestamp: new Date('2024-07-19T10:05:10Z'),
            role: 'ai',
            content: 'AIの歴史は1950年代に始まり、様々な発展を遂げてきました。主な出来事として...'
          }
        ]
      },
      {
        title: '料理レシピ相談',
        createAt: new Date('2024-07-19T14:00:00Z'),
        updateAt: new Date('2024-07-19T14:20:00Z'),
        chatLog: [
          {
            timestamp: new Date('2024-07-19T14:00:00Z'),
            role: 'user',
            content: '簡単な夕食のレシピを教えてください。'
          },
          {
            timestamp: new Date('2024-07-19T14:00:15Z'),
            role: 'ai',
            content: 'はい、簡単な夕食レシピをいくつか紹介しましょう。まず、パスタの場合...'
          }
        ]
      }
    ]
  },
  {
    uid : "1f4e5a23-b678-43a1-9cde-5678f1234abc",
    threads: [
      {
        title: '技術的な質問',
        createAt: new Date('2024-07-19T11:00:00Z'),
        updateAt: new Date('2024-07-19T11:15:00Z'),
        chatLog: [
          {
            timestamp: new Date('2024-07-19T11:00:00Z'),
            role: 'user',
            content: 'Prismaの使い方について教えてください。'
          },
          {
            timestamp: new Date('2024-07-19T11:00:10Z'),
            role: 'ai',
            content: 'Prismaは強力なORMツールです。まず、スキーマを定義し...'
          },
          {
            timestamp: new Date('2024-07-19T11:05:00Z'),
            role: 'user',
            content: 'Prismaでリレーションを設定する方法は？'
          },
          {
            timestamp: new Date('2024-07-19T11:05:15Z'),
            role: 'ai',
            content: 'Prismaでリレーションを設定するには、スキーマファイルで関連するモデルを定義し...'
          }
        ]
      }
    ]
  },
  {
    uid: "34a5678b-90cd-4567-a12b-3e4f5g6789h0",
    threads: [
      {
        title: '旅行プラン相談',
        createAt: new Date('2024-07-20T09:00:00Z'),
        updateAt: new Date('2024-07-20T09:45:00Z'),
        chatLog: [
          {
            timestamp: new Date('2024-07-20T09:00:00Z'),
            role: 'user',
            content: '京都への2泊3日の旅行プランを立てたいです。おすすめはありますか？'
          },
          {
            timestamp: new Date('2024-07-20T09:00:20Z'),
            role: 'ai',
            content: '京都への2泊3日の旅行プランですね。以下におすすめのプランを紹介します...'
          },
          {
            timestamp: new Date('2024-07-20T09:10:00Z'),
            role: 'user',
            content: '金閣寺と銀閣寺、どちらがおすすめですか？'
          },
          {
            timestamp: new Date('2024-07-20T09:10:15Z'),
            role: 'ai',
            content: '金閣寺と銀閣寺はどちらも素晴らしい観光地です。それぞれの特徴を比較すると...'
          }
        ]
      }
    ]
  }
];

async function insertFunc(){
  const result = await coll.insertMany(docs);
  console.log(result)
}
insertFunc()