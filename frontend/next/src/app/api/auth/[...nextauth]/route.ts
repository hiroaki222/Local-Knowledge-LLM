import ldap from 'ldapjs'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'LDAP',
      credentials: {
        userId: { label: 'ユーザーID', type: 'text' },
        password: { label: 'パスワード', type: 'password' },
      },
      async authorize(credentials) {
        return new Promise((resolve, reject) => {
          const client = ldap.createClient({
            url: process.env.LDAP_URI,
          })

          const userDN = `uid=${credentials.userId},${process.env.LDAP_BASE_DN}`

          client.bind(userDN, credentials.password, (error) => {
            if (error) {
              console.error('LDAP認証失敗:', error)
              reject(new Error('認証に失敗しました'))
            } else {
              console.log('LDAP認証成功')
              resolve({
                id: credentials.userId,
                name: credentials.userId,
              })
            }
            client.unbind()
          })
        })
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      session.user.id = token.id
      return session
    },
  },
  pages: {
    signIn: '/login',
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
