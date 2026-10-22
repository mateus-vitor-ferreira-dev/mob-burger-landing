'use client'

import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '@/lib/motion'

gsap.registerPlugin(ScrollTrigger)

const WORDS: { text: string; accent: boolean }[] = [
  { text: 'SEM',      accent: false },
  { text: 'APP',      accent: true  },
  { text: '—',        accent: false },
  { text: 'SEM',      accent: false },
  { text: 'TAXA',     accent: true  },
  { text: '—',        accent: false },
  { text: 'SEM',      accent: false },
  { text: 'FRESCURA', accent: true  },
  { text: '—',        accent: false },
  { text: 'SÓ',       accent: false },
  { text: 'MOB',      accent: true  },
]

export function PinnedReveal() {
  const sectionRef = useRef<HTMLElement>(null)
  const labelRef   = useRef<HTMLParagraphElement>(null)
  const wordsRef   = useRef<(HTMLSpanElement | null)[]>([])

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return

    // Sem scroll-jacking para quem prefere menos movimento: frase inteira, já acesa
    if (prefersReducedMotion()) {
      wordsRef.current.forEach((el) => { if (el) el.style.opacity = '1' })
      return
    }

    const ctx = gsap.context(() => {
      const section = sectionRef.current
      if (!section) return
      const words = wordsRef.current.filter((el): el is HTMLSpanElement => el !== null)

      // Label faz fade-in quando a seção entra no viewport
      gsap.from(labelRef.current, {
        opacity: 0, y: 16, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: section, start: 'top 80%' },
      })

      // Palavras acendem progressivamente com o scroll (pin)
      gsap.fromTo(
        words,
        { opacity: 0.07 },
        {
          opacity: 1,
          stagger: { each: 0.35 },
          scrollTrigger: {
            trigger: section,
            pin: true,
            start: 'top top',
            // Celular: pin mais curto para não "prender" o polegar por tanto tempo
            end: () => `+=${words.length * (window.innerWidth < 768 ? 140 : 220)}px`,
            invalidateOnRefresh: true,
            scrub: 0.7,
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="grain"
      style={{
        background: 'var(--mob-black)',
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(2rem, 5vw, 5rem) clamp(1.25rem, 5vw, 5rem)',
        borderTop: '1px solid var(--mob-border)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Ambient glow */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,69,0,0.07) 0%, transparent 70%)',
      }} />

      {/* Label */}
      <p
        ref={labelRef}
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.75rem',
          letterSpacing: '0.3em',
          color: 'var(--mob-fire)',
          textTransform: 'uppercase',
          marginBottom: 'clamp(2.5rem, 5vh, 4.5rem)',
          position: 'relative', zIndex: 1,
        }}
      >
        Por que M.O.B?
      </p>

      {/* Words — leitores de tela recebem a frase inteira de uma vez */}
      <p className="sr-only">Sem app, sem taxa, sem frescura: só M.O.B.</p>
      <div
        aria-hidden
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2.8rem, 8vw, 8.5rem)',
          lineHeight: 1.05,
          letterSpacing: '-0.01em',
          textAlign: 'center',
          userSelect: 'none',
          position: 'relative', zIndex: 1,
          maxWidth: '1100px',
        }}
      >
        {WORDS.map((word, i) => (
          <span key={i} style={{ display: 'inline-block', margin: '0 0.12em' }}>
            <span
              ref={(el) => { wordsRef.current[i] = el }}
              style={{
                color: word.accent ? 'var(--mob-fire)' : 'var(--mob-text)',
                opacity: 0.07,
                display: 'inline-block',
                fontSize: word.text === '—' ? '0.6em' : undefined,
              }}
            >
              {word.text}
            </span>
          </span>
        ))}
      </div>

      {/* Scroll hint */}
      <div aria-hidden className="hidden md:flex" style={{
        position: 'absolute', bottom: '2rem', left: '50%',
        transform: 'translateX(-50%)',
        flexDirection: 'column', alignItems: 'center', gap: '0.4rem',
        opacity: 0.5,
      }}>
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: '0.65rem',
          letterSpacing: '0.22em', color: 'var(--mob-muted)', textTransform: 'uppercase',
        }}>
          Rolar
        </p>
        <div className="scroll-hint-line" style={{
          width: '1px', height: '30px',
          background: 'linear-gradient(to bottom, var(--mob-fire), transparent)',
        }} />
      </div>
    </section>
  )
}
