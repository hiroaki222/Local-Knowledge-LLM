'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

export default function RedirectProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const session = useSession()
  const authenticated = ['/', '/login']
  const unauthenticated = ['/chat']
  //const unauthenticated = []

  useEffect(() => {
    if (session.status == 'loading') return

    if (session.status == 'authenticated') {
      authenticated.includes(pathname) && router.replace('/chat')
    } else {
      unauthenticated.includes(pathname) && router.replace('/login')
    }
  }, [session])

  return session.status !== 'loading' && <>{children}</>
}
