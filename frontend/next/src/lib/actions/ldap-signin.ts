'use server'

import { createClient } from 'ldapjs'

export async function ldapSignIn(username: string, password: string) {
  const client = createClient({
    url: process.env.LDAP_URL,
  })

  return new Promise<boolean>((resolve) => {
    client.bind(`cn=${username},ou=people,dc=ldap,dc=centre,dc=com`, password, (err) => {
      client.unbind()
      resolve(err ? false : true)
    })
  })
}
