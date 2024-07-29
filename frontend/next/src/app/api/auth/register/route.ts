import ldap from 'ldapjs'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { userId, password } = await req.json()

  return new Promise((resolve) => {
    const client = ldap.createClient({
      url: process.env.LDAP_URI,
    })

    client.bind(process.env.LDAP_ADMIN_DN, process.env.LDAP_ADMIN_PASSWORD, (error) => {
      if (error) {
        console.error('LDAP管理者バインドエラー:', error)
        resolve(NextResponse.json({ error: 'アカウント登録に失敗しました' }, { status: 500 }))
        return
      }

      const newUserDN = `uid=${userId},${process.env.LDAP_BASE_DN}`
      const newUser = {
        uid: userId,
        objectClass: ['inetOrgPerson', 'simpleSecurityObject'],
        userPassword: password,
        cn: userId,
        sn: userId,
      }

      client.add(newUserDN, newUser, (addError) => {
        if (addError) {
          console.error('ユーザー追加エラー:', addError)
          resolve(NextResponse.json({ error: 'アカウント登録に失敗しました' }, { status: 500 }))
        } else {
          resolve(NextResponse.json({ message: 'アカウント登録に成功しました' }, { status: 200 }))
        }
        client.unbind()
      })
    })
  })
}
