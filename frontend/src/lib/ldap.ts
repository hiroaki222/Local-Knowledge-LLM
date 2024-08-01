import ldap from 'ldapjs'

export async function authenticate(username: string, password: string) {
  return new Promise((resolve, reject) => {
    const client = ldap.createClient({
      url: process.env.LDAP_URL,
    })

    client.bind(username, password, (error) => {
      if (error) {
        client.unbind()
        reject(error)
      } else {
        client.search(
          process.env.LDAP_BASE_DN,
          {
            filter: `(uid=${username})`,
            scope: 'sub',
          },
          (err, res) => {
            if (err) {
              client.unbind()
              reject(err)
            } else {
              res.on('searchEntry', (entry) => {
                client.unbind()
                resolve({
                  cn: entry.object.cn,
                  dn: entry.objectName,
                })
              })
              res.on('error', (err) => {
                client.unbind()
                reject(err)
              })
              res.on('end', () => {
                client.unbind()
              })
            }
          },
        )
      }
    })
  })
}
