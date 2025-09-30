import type { Metadata } from 'next'
import '../styles/globals.css'
import { LayoutWithTheme } from './components/LayoutWithTheme'
import { Navigation } from './components/Navigation'

export const metadata: Metadata = {
  title: 'aazo11 - Tech Founder & DevTools Investor',
  description: 'Personal website of aazo11 - Tech founder turned investor in devtools and software infrastructure',
  openGraph: {
    title: 'aazo11 - Tech Founder & DevTools Investor',
    description: 'Personal website of aazo11 - Tech founder turned investor in devtools and software infrastructure',
    url: 'https://aazo11.dev',
    siteName: 'aazo11.dev',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'aazo11 - Tech Founder & DevTools Investor',
    description: 'Personal website of aazo11 - Tech founder turned investor in devtools and software infrastructure',
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
      </body>
    </html>
  )
}