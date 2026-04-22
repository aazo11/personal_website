import type { Metadata } from 'next'
import '../styles/globals.css'
import { LayoutWithTheme } from './components/LayoutWithTheme'
import { Navigation } from './components/Navigation'
import { Analytics } from '@vercel/analytics/react'

export const metadata: Metadata = {
  title: 'Amir A. Zohrenejad personal page',
  description: 'Me doing things',
  openGraph: {
    title: 'Amir A. Zohrenejad personal page',
    description: 'Me doing things',
    url: 'https://aazo11.dev',
    siteName: 'aazo11.dev',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Amir A. Zohrenejad personal page',
    description: 'Me doing things',
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-icon.svg',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <LayoutWithTheme>
          <Navigation />
          {children}
        </LayoutWithTheme>
        <Analytics />
      </body>
    </html>
  )
}
