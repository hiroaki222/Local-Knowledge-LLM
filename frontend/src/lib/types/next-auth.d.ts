import 'next-auth'

declare module 'next-auth' {
  interface User {
    username: string
    password: string
  }
  interface Session {
    username: string
    password: string
  }
}
