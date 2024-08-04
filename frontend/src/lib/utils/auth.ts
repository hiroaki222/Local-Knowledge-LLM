import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next'
import { AuthOptions, getServerSession } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

import { ldapSignIn } from '../actions/ldap-signin'

export const authOptions = {
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email
        token.uuid = user.uuid
      }
      return token
    },
    async session({ session: { expires }, token: { email, uuid } }) {
      return { email, expires, uuid }
    },
  },
  pages: {
    signIn: '/login',
    signOut: '/login',
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        if (!credentials) return null
        const { email, password } = credentials
        const uuid = await ldapSignIn(email, password)
        // return uuid ? { email, id: uuid, uuid } : null
        return uuid ? { email, id: uuid, uuid } : null
      },
      credentials: {
        email: { label: 'email', type: 'email' },
        password: { label: 'password', type: 'password' },
      },
      id: 'ldap',
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
} satisfies AuthOptions

export function auth(
  ...args: [] | [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']] | [NextApiRequest, NextApiResponse]
) {
  return getServerSession(...args, authOptions)
}
