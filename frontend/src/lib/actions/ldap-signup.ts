'use server'

import { Attribute, Change, createClient } from 'ldapjs'
import { v4 } from 'uuid'

export async function ldapSignUp(username: string, password: string) {
  const uid = v4()
  const client = createClient({
    url: process.env.LDAP_URL,
  })

  const bind = await new Promise<boolean>((resolve) => {
    client.bind('uid=admin,ou=people,dc=example,dc=com', 'password', (err) => {
      resolve(err ? false : true)
    })
  })

  if (!bind) return false

  const add = await new Promise<boolean>((resolve) => {
    client.add(
      `uid=${uid},ou=people,dc=example,dc=com`,
      {
        cn: username,
        email: `${username}@email.com`,
      },
      (err) => {
        resolve(err ? false : true)
      },
    )
  })

  if (!add) return false

  return await new Promise<boolean>((resolve) => {
    client.modify(
      `uid=${uid},ou=people,dc=example,dc=com`,
      new Change({
        operation: 'replace',
        modification: new Attribute({
          type: 'userPassword',
          values: [password],
        }),
      }),
      (err) => {
        client.unbind()
        resolve(err ? false : true)
      },
    )
  })
}
