import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'The Game of Lifestyle - TGOL Digital',
  description: 'A sensual, cheeky party game for couples and groups',
  keywords: 'party game, couples game, adult game, lifestyle game, sensual game',
  authors: [{ name: 'TGOL Digital' }],
  creator: 'TGOL Digital',
  publisher: 'TGOL Digital',
  robots: 'noindex, nofollow', // Since this is adult content
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-tgol-cream min-h-screen font-futura">
        {children}
      </body>
    </html>
  )
}