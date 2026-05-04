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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Nunito:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&family=Jost:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
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
