const authOptions = {
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.username = user.username
        token.password = user.password
      }
      return token
    },
    async session({ session, token }) {
      return { ...session, password: token.password, username: token.username }
    },
  },
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        if (!credentials) return null
        const ok = await ldapSignIn(credentials.username, credentials.password)
        return ok ? { id: credentials.username, password: credentials.password, username: credentials.username } : null

        // return new Promise((resolve, reject) => {
        //   const client = ldap.createClient({
        //     url: process.env.LDAP_URL,
        //   })

        //   const userDN = `cn=${credentials.userId},ou=people,${process.env.LDAP_BASE_DN}`

        //   client.bind(userDN, credentials.password, (error) => {
        //     if (error) {
        //       console.error('LDAP認証失敗:', error)
        //       reject(new Error('認証に失敗しました'))
        //     } else {
        //       console.log('LDAP認証成功')
        //       resolve({
        //         id: credentials.userId,
        //         name: credentials.userId,
        //       })
        //     }
        //     client.unbind()
        //   })
        // })
      },
      credentials: {
        password: { label: 'パスワード', type: 'password' },
        username: { label: 'ユーザーID', type: 'text' },
      },
      name: 'LDAP',
    }),
  ],
} satisfies AuthOptions
