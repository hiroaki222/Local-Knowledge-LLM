import 'next-auth'
import 'next-auth/jwt'

declare module 'next-auth' {
  interface User {
    email: string
    uuid: string
  }
  type Session = {
    email: string
    uuid: string
  }
}

declare module 'next-auth/jwt' {
  type JWT = {
    email: string
    uuid: string
  }
}
