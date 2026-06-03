'use client'

import { useState } from 'react'
import { Intro } from './intro'
import { Header } from './header'
import { Hero } from './hero'
import { MarqueeStrip } from './marquee-strip'
import { BurgerCarousel } from './burger-carousel'
import { Features } from './features'
import { HowItWorks } from './how-it-works'
import { CTA } from './cta'
import { PinnedReveal } from './pinned-reveal'
import { Reviews } from './reviews'
import { Contact } from './contact'
import { InstagramGallery } from './instagram-gallery'
import { Footer } from './footer'
import { CustomCursor } from './custom-cursor'
import { FloatingWhatsApp } from './floating-whatsapp'

export function LandingPage() {
  const [ready, setReady] = useState(false)

  return (
    <>
      <CustomCursor />
      <FloatingWhatsApp />
      <Intro onComplete={() => setReady(true)} />
      <Header ready={ready} />
      <main style={{ background: 'var(--mob-black)' }}>
        <Hero ready={ready} />
        <MarqueeStrip />
        <BurgerCarousel />
        <Features />
        <HowItWorks />
        <PinnedReveal />
        <Reviews />
        <CTA />
        <Contact />
        <InstagramGallery />
      </main>
      <Footer />
    </>
  )
}
