import type { Metadata } from 'next'
import { Bebas_Neue, DM_Sans } from 'next/font/google'
import './globals.css'

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm',
})

export const metadata: Metadata = {
  title: 'M.O.B — Murilo Original Burger · Lavras/MG',
  description:
    'Murilo Original Burger — hamburguer artesanal em Lavras/MG. Peça online com Pix ou cartão, sem comissão de terceiros.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${bebasNeue.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  )
}
