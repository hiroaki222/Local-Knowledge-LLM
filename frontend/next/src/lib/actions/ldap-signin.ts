'use server'

import { createClient } from 'ldapjs'

export async function ldapSignIn(username: string, password: string) {
  const client = createClient({
    url: process.env.LDAP_URL,
  })

  return new Promise<boolean>((resolve) => {
    client.bind(`uid=${username},ou=people,dc=example,dc=com`, password, (err) => {
      client.unbind()
      resolve(err ? false : true)
    })
  })
}
