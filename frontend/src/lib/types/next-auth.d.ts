import 'next-auth'

declare module 'next-auth' {
  interface User {
    email: string
    uuid: string
  }
  interface Session {
    email: string
    uuid: string
  }
}
