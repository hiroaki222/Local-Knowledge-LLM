'use client'

import RedirectProvider from '@/components/RedirectProvider'
import { Provider } from 'jotai'
import { SessionProvider } from 'next-auth/react'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider>
      <SessionProvider>
        <RedirectProvider>{children}</RedirectProvider>
      </SessionProvider>
    </Provider>
  )
}
