'use server'

import { Attribute, Change, createClient } from 'ldapjs'

/**
 * uidとpasswordを受け取り、新規ユーザーを作成できたらuuidを返すよ！
 */
export async function ldapSignUp(uid: string, password: string): Promise<string | undefined> {
  const client = createClient({
    url: process.env.LDAP_URL,
  })

  // clientにadminをバインド (別ユーザーを作成できるようになる)
  const bind = await new Promise<boolean>((resolve) => {
    client.bind(`uid=admin,ou=people,dc=example,dc=com`, 'password', (err) => {
      resolve(err ? false : true)
    })
  })
  if (!bind) return

  // 新規ユーザー作成
  const add = await new Promise<boolean>((resolve) => {
    client.add(
      `uid=${uid},ou=people,dc=example,dc=com`,
      {
        email: uid,
      },
      (err) => {
        resolve(err ? false : true)
      },
    )
  })
  if (!add) return

  // パスワード割り当て
  const modify = await new Promise<boolean>((resolve) => {
    client.modify(
      `uid=${uid},ou=people,dc=example,dc=com`,
      new Change({
        modification: new Attribute({
          type: 'userPassword',
          values: [password],
        }),
        operation: 'replace',
      }),
      (err) => {
        resolve(err ? false : true)
      },
    )
  })
  if (!modify) return

  // ユーザーのuuidを取得する
  return new Promise((resolve) => {
    client.search(
      `uid=${uid},ou=people,dc=example,dc=com`,
      {
        attributes: ['uuid'],
      },
      (err, res) => {
        if (err) {
          client.unbind()
          resolve(undefined)
        }

        let uuid: string | undefined = undefined

        res.on('searchEntry', (entry) => {
          uuid = entry.pojo.attributes[0].values[0]
        })
        res.on('end', () => {
          res.removeAllListeners()
          client.unbind()
          resolve(uuid)
        })
        res.on('error', () => {
          res.removeAllListeners()
          client.unbind()
          resolve(undefined)
        })
      },
    )
  })
}
