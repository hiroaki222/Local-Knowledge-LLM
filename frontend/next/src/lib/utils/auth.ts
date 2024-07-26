import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next'
import { AuthOptions, getServerSession } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { ldapSignIn } from '../actions/ldap-signin'

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: 'ldap',
      credentials: {
        username: { label: 'username', type: 'email' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) return null
        const ok = await ldapSignIn(credentials.username, credentials.password)
        return ok ? { id: credentials.username, username: credentials.username, password: credentials.password } : null
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.username = user.username
        token.password = user.password
      }
      return token
    },
    async session({ session, token }) {
      return { ...session, username: token.username, password: token.password }
    },
  },
  pages: {
    signIn: "/login",
    signOut: "/login",
    newUser: "/register"
    },
} satisfies AuthOptions

export function auth(
  ...args: [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']] | [NextApiRequest, NextApiResponse] | []
) {
  return getServerSession(...args, authOptions)
}
