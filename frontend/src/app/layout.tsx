import { Providers } from '@/components/Providers'
import { Metadata } from 'next'
import { Noto_Sans_JP } from 'next/font/google'

import './globals.css'

export const metadata: Metadata = {
  description: 'Local Knowledge LLM',
  title: 'Local Knowledge LLM',
}

const font = Noto_Sans_JP({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className={font.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
