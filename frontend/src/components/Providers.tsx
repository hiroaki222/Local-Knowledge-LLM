'use client'

import RedirectProvider from '@/components/RedirectProvider'
// import { Provider } from 'jotai'
import { SessionProvider } from 'next-auth/react'

import { Toaster } from './ui/sonner'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    // <Provider>
    <SessionProvider>
      <RedirectProvider>
        {children}
        <Toaster />
      </RedirectProvider>
    </SessionProvider>
    // </Provider>
  )
}
