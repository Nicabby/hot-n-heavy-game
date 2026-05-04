import type { Metadata } from 'next'
import './globals.css'
import { GameProvider } from '@/context/GameContext'
import ClientShell from '@/components/ClientShell'

export const metadata: Metadata = {
  title: 'The Game of Lifestyle - TGOL Digital',
  description: 'A sensual, cheeky party game for couples and groups',
  keywords: 'party game, couples game, adult game, lifestyle game, sensual game',
  authors: [{ name: 'TGOL Digital' }],
  creator: 'TGOL Digital',
  publisher: 'TGOL Digital',
  robots: 'noindex, nofollow',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-tgol-cream min-h-screen font-futura">
        <GameProvider>
          <ClientShell>
            {children}
          </ClientShell>
        </GameProvider>
      </body>
    </html>
  )
}
