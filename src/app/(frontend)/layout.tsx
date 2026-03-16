import React from 'react'
import './styles.css'
import Header from './components/header/Header'
import NextTopLoader from 'nextjs-toploader'
export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Radio Huns',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <NextTopLoader color="#E75023" />
        <main>
          <Header />
          <div className="min-h-screen ">{children}</div>
        </main>
      </body>
    </html>
  )
}
