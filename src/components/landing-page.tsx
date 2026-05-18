'use client'

import { useState } from 'react'
import { Intro } from './intro'
import { Header } from './header'
import { Hero } from './hero'
import { MarqueeStrip } from './marquee-strip'
import { BurgerCarousel } from './burger-carousel'
import { Features } from './features'
import { CTA } from './cta'
import { Footer } from './footer'

export function LandingPage() {
  const [ready, setReady] = useState(false)

  return (
    <>
      <Intro onComplete={() => setReady(true)} />
      <Header ready={ready} />
      <main style={{ background: 'var(--mob-black)' }}>
        <Hero ready={ready} />
        <MarqueeStrip />
        <BurgerCarousel />
        <Features />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
