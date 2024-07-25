'use server'

import { createClient } from 'ldapjs'

export async function ldapSignUp(username: string, password: string) {
  const client = createClient({
    url: process.env.LDAP_URL,
  })

  await new Promise<boolean>((resolve) => {
    client.bind(`cn=admin,ou=people,dc=ldap,dc=centre,dc=com`, 'password', (err) => {
      resolve(err ? false : true)
    })
  })

  return new Promise<boolean>((resolve) => {
    client.add(
      `uid=${username},ou=people,dc=ldap,dc=centre,dc=com`,
      {
        email: username,
        userPassword: password,
      },
      (err) => {
        client.unbind()
        resolve(err ? false : true)
      },
    )
  })
}
