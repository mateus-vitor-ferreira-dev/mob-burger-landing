'use client'

import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

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
            end: `+=${words.length * 220}px`,
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
        padding: 'clamp(2rem, 5vw, 5rem)',
        borderTop: '1px solid var(--mob-border)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Ambient glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,69,0,0.07) 0%, transparent 70%)',
      }} />

      {/* Label */}
      <p
        ref={labelRef}
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.7rem',
          letterSpacing: '0.3em',
          color: 'var(--mob-fire)',
          textTransform: 'uppercase',
          marginBottom: 'clamp(2.5rem, 5vh, 4.5rem)',
          position: 'relative', zIndex: 1,
        }}
      >
        Por que M.O.B?
      </p>

      {/* Words */}
      <div
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
      <div style={{
        position: 'absolute', bottom: '2rem', left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem',
        opacity: 0.25,
      }}>
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: '0.55rem',
          letterSpacing: '0.22em', color: 'var(--mob-muted)', textTransform: 'uppercase',
        }}>
          Rolar
        </p>
        <div style={{
          width: '1px', height: '30px',
          background: 'linear-gradient(to bottom, var(--mob-fire), transparent)',
          animation: 'pulse 1.8s ease-in-out infinite',
        }} />
      </div>
    </section>
  )
}
