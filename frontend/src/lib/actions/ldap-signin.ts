'use server'

import { createClient } from 'ldapjs'

/**
 * uidとpasswordを受け取り、認証が成功すればuuidを返すよ！
 */
export async function ldapSignIn(uid: string, password: string): Promise<string | undefined> {
  const client = createClient({
    url: process.env.LDAP_URL,
  })

  // clientにadminをバインド (別ユーザーを検索できるようになる)
  const bind = await new Promise<boolean>((resolve) => {
    client.bind(`uid=admin,ou=people,dc=example,dc=com`, 'password', (err) => {
      resolve(err ? false : true)
    })
  })
  if (!bind) return

  // uidとパスワードで認証する
  const auth = await new Promise<boolean>((resolve) => {
    client.bind(`uid=${uid},ou=people,dc=example,dc=com`, password, (err) => {
      resolve(err ? false : true)
    })
  })
  if (!auth) return

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
