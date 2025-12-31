import type { Metadata } from 'next'
import './globals.css'
import { QueryProvider } from '@/providers/QueryProvider'
import { Navigation } from '@/components/Navigation'

export const metadata: Metadata = {
  title: 'Shame App',
  description: 'Shame App - Track and manage promises',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <div className="min-h-screen flex flex-col bg-background">
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent-600 focus:text-white focus:rounded focus:ring-1 focus:ring-accent-500 focus:ring-offset-1"
            >
              Skip to main content
            </a>
            <Navigation />
            <main id="main-content" className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
              {children}
            </main>
          </div>
        </QueryProvider>
      </body>
    </html>
  )
}

