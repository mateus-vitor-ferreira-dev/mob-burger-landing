import type { Metadata, Viewport } from 'next'
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
  title: "M.O.B — Original's · Lavras/MG",
  description:
    "Original's — hamburguer artesanal em Lavras/MG. Peça pelo WhatsApp e pague na entrega com Pix, cartão ou dinheiro, sem comissão de terceiros.",
}

export const viewport: Viewport = {
  themeColor: '#08070B',
  colorScheme: 'dark',
  // Permite usar env(safe-area-inset-*) em celulares com notch
  viewportFit: 'cover',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${bebasNeue.variable} ${dmSans.variable}`}>
      <body>
        <a href="#conteudo" className="skip-link">Pular para o conteúdo</a>
        {children}
      </body>
    </html>
  )
}
