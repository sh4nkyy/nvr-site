import type { Metadata } from 'next'
import { Cormorant, Azeret_Mono } from 'next/font/google'
import Cursor from '@/components/Cursor'
import './globals.css'

const cormorant = Cormorant({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['300', '400'],
  style: ['normal', 'italic'],
})

const azeretMono = Azeret_Mono({
  subsets: ['latin'],
  variable: '--font-azeret',
  weight: ['200', '300', '400'],
})

export const metadata: Metadata = {
  title: 'NothingVeryReal',
  description: 'Five artists. Distinct voices. A shared understanding that sound is the closest thing to evidence that anything exists at all.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${azeretMono.variable}`}>
        <Cursor />
        {children}
      </body>
    </html>
  )
}
