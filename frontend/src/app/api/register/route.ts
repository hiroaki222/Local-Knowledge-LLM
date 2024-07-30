import ldap from 'ldapjs'
import { NextResponse } from 'next/server'

//export const runtime = 'nodejs';

const createClient = () => {
  if (!process.env.LDAP_URI) {
    throw new Error('LDAP_URI is not defined in environment variables')
  }
  return new Promise((resolve, reject) => {
    const client = ldap.createClient({
      url: process.env.LDAP_URI,
      timeout: 5000,
      connectTimeout: 10000,
    })

    client.on('error', (err) => {
      console.error('LDAP connection error:', err)
      reject(err)
    })

    client.on('connect', () => {
      console.log('LDAP connection successful')
      resolve(client)
    })
  })
}

export async function POST(req: Request) {
  const { userId, password } = await req.json()

  try {
    const client = await createClient()

    await new Promise((resolve, reject) => {
      client.bind(process.env.LDAP_ADMIN_DN, process.env.LDAP_ADMIN_PASSWORD, (error) => {
        if (error) {
          console.error('LDAP管理者バインドエラー:', error)
          reject(error)
        } else {
          resolve(true)
        }
      })
    })

    const newUserDN = `uid=${userId},${process.env.LDAP_BASE_DN}`
    const newUser = {
      uid: userId,
      objectClass: ['inetOrgPerson', 'simpleSecurityObject'],
      userPassword: password,
      cn: userId,
      sn: userId,
    }

    await new Promise((resolve, reject) => {
      client.add(newUserDN, newUser, (addError) => {
        if (addError) {
          console.error('ユーザー追加エラー:', addError)
          reject(addError)
        } else {
          resolve(true)
        }
      })
    })

    client.unbind()
    return NextResponse.json({ message: 'アカウント登録に成功しました' }, { status: 200 })
  } catch (error) {
    console.error('アカウント登録エラー:', error)
    if (error instanceof Error) {
      return NextResponse.json({ error: `アカウント登録に失敗しました: ${error.message}` }, { status: 500 })
    } else {
      return NextResponse.json({ error: 'アカウント登録に失敗しました: 不明なエラー' }, { status: 500 })
    }
  }
}
