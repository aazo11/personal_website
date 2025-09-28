import type { Metadata } from 'next'
import '../styles/globals.css'
import { LayoutWithTheme } from './components/LayoutWithTheme'
import { Navigation } from './components/Navigation'

export const metadata: Metadata = {
  title: 'aazo11 - Tech Founder & DevTools Investor',
  description: 'Personal website of aazo11 - Tech founder turned investor in devtools and software infrastructure',
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