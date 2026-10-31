import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { Bricolage_Grotesque } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage',
  display: 'swap',
  axes: ['opsz', 'wdth'],
})

export const metadata: Metadata = {
  title: {
    default: 'Elfarofando',
    template: '%s | Elfarofando',
  },
  description:
    'Noticias gastronomicas, avaliacoes de restaurantes e receitas pra quem come de verdade.',
  openGraph: {
    title: 'Elfarofando',
    description:
      'Noticias gastronomicas, avaliacoes de restaurantes e receitas pra quem come de verdade.',
    url: 'https://www.elfarofando.com',
    siteName: 'Elfarofando',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Elfarofando',
    description:
      'Noticias gastronomicas, avaliacoes de restaurantes e receitas pra quem come de verdade.',
  },
  metadataBase: new URL('https://www.elfarofando.com'),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="pt-BR" className={bricolage.variable}>
      <body className="font-display antialiased">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
