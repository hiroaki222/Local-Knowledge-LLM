'use client'

import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function RedirectProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const session = useSession()
  const authenticated = ['/', '/login', '/register']
  const unauthenticated = ['/chat']

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
