'use client'

import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { Button } from './ui/button'

export function Session() {
  const session = useSession()

  return session.status === 'loading' ? null : session.status === 'authenticated' ? (
    <Button className="ml-auto" onClick={() => signOut()} variant="secondary">
      ログアウト
    </Button>
  ) : (
    <Link className="ml-auto" href="/login">
      <Button>ログイン</Button>
    </Link>
  )
}
