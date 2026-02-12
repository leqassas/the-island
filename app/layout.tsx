import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import CustomCursor from '@/components/CustomCursor'
import PageTransition from '@/components/PageTransition'

export const metadata: Metadata = {
  title: 'The Island | Technology & Art',
  description: 'A showcase of creative works at the intersection of technology and art',
  keywords: ['creative coding', 'portfolio', 'art', 'technology', 'web development'],
  authors: [{ name: 'The Island' }],
  openGraph: {
    title: 'The Island',
    description: 'A showcase of creative works at the intersection of technology and art',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&family=Inter:wght@100..900&family=JetBrains+Mono:wght@100..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <CustomCursor />
        <Navigation />
        <PageTransition>
          {children}
        </PageTransition>
        <Footer />
      </body>
    </html>
  )
}
