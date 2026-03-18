import React from 'react'
import './styles.css'
import Header from './components/header/Header'
import NextTopLoader from 'nextjs-toploader'

export const metadata = {
  title: 'Radio Huns',
  description:
    'Radio Huns, the voice of South Asian community in Ottawa since 2001, is the longest running South Asian radio program in North America.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <NextTopLoader color="#E75023" />
        <main>
          <Header />
          <div className="">{children}</div>
        </main>
      </body>
    </html>
  )
}
