'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface HeroProps {
  ready: boolean
}

export function Hero({ ready }: HeroProps) {
  const sectionRef  = useRef<HTMLElement>(null)
  const glowRef     = useRef<HTMLDivElement>(null)
  const eyebrowRef  = useRef<HTMLParagraphElement>(null)
  const line1Ref    = useRef<HTMLDivElement>(null)   // MURILO
  const line2Ref    = useRef<HTMLDivElement>(null)   // ORIGINAL
  const line3Ref    = useRef<HTMLDivElement>(null)   // BURGER
  const bottomRef   = useRef<HTMLDivElement>(null)
  const scrollRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ready) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 })

      tl.from(glowRef.current, { opacity: 0, scale: 0.5, duration: 1.6, ease: 'power2.out' })

        .from(eyebrowRef.current, { opacity: 0, y: 10, duration: 0.4, ease: 'power2.out' }, 0.2)

        /* Each word slams up from a clip */
        .from(line1Ref.current, {
          yPercent: 115, opacity: 0, duration: 0.75, ease: 'power3.out',
        }, 0.25)
        .from(line2Ref.current, {
          yPercent: 115, opacity: 0, duration: 0.75, ease: 'power3.out',
        }, 0.4)
        .from(line3Ref.current, {
          yPercent: 115, opacity: 0, duration: 0.75, ease: 'power3.out',
        }, 0.55)

        .from(bottomRef.current, {
          opacity: 0, y: 24, duration: 0.55, ease: 'power2.out',
        }, '-=0.3')

        .from(scrollRef.current, { opacity: 0, duration: 0.4 }, '-=0.2')

      /* Parallax glow */
      gsap.to(glowRef.current, {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [ready])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="grain"
      style={{
        minHeight: '100svh',
        background: 'var(--mob-black)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 'clamp(6rem, 10vh, 9rem) clamp(2rem, 6vw, 6rem) clamp(4rem, 8vh, 7rem)',
      }}
    >
      {/* Ambient fire glow — large, behind everything */}
      <div
        ref={glowRef}
        className="absolute pointer-events-none"
        style={{
          width: 'clamp(600px, 80vw, 1100px)',
          height: 'clamp(600px, 80vw, 1100px)',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(255,110,0,0.13) 0%, rgba(255,69,0,0.05) 45%, transparent 70%)',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Eyebrow */}
      <p
        ref={eyebrowRef}
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.7rem',
          letterSpacing: '0.28em',
          color: 'var(--mob-fire)',
          textTransform: 'uppercase',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.6rem',
          marginBottom: 'clamp(1rem, 3vh, 2.5rem)',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <span style={{ width: '28px', height: '1px', background: 'var(--mob-fire)', display: 'inline-block' }} />
        Artesanal · Lavras/MG
      </p>

      {/* ── BRAND NAME + M.O.B ghost ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'auto 1fr',
          alignItems: 'center',
          gap: 'clamp(1rem, 3vw, 3rem)',
          position: 'relative',
          zIndex: 2,
          marginBottom: 'clamp(2rem, 5vh, 4rem)',
        }}
      >
        {/* Left — brand name fire gradient */}
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            lineHeight: 0.87,
            letterSpacing: '-0.01em',
          }}
        >
          {/* MURILO */}
          <div className="overflow-clip">
            <div
              ref={line1Ref}
              style={{
                fontSize: 'clamp(5.5rem, 19vw, 18rem)',
                background: 'linear-gradient(to bottom, #FFFDE7 0%, #FFE082 25%, #FFCA28 55%, #FFB300 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}
            >
              MURILO
            </div>
          </div>

          {/* ORIGINAL */}
          <div className="overflow-clip">
            <div
              ref={line2Ref}
              style={{
                fontSize: 'clamp(3.5rem, 14.5vw, 14rem)',
                background: 'linear-gradient(to bottom, #FFB300 0%, #FF8F00 30%, #FF6D00 65%, #F4511E 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}
            >
              ORIGINAL
            </div>
          </div>

          {/* BURGER */}
          <div className="overflow-clip">
            <div
              ref={line3Ref}
              style={{
                fontSize: 'clamp(5.5rem, 19vw, 18rem)',
                background: 'linear-gradient(to bottom, #E64A19 0%, #C62828 45%, #B71C1C 75%, #7B1414 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}
            >
              BURGER
            </div>
          </div>
        </h1>

        {/* Right — M · O · B ghost editorial */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 0,
            lineHeight: 0.85,
          }}
        >
          {[
            { letter: 'M', stroke: 'rgba(255,225,80,0.28)' },
            { letter: 'O', stroke: 'rgba(255,140,0,0.24)' },
            { letter: 'B', stroke: 'rgba(200,40,20,0.22)' },
          ].map(({ letter, stroke }) => (
            <span
              key={letter}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(4rem, 14vw, 15rem)',
                color: 'transparent',
                WebkitTextStroke: `2px ${stroke}`,
                display: 'block',
                textAlign: 'center',
                userSelect: 'none',
              }}
            >
              {letter}
            </span>
          ))}
          {/* Label abaixo */}
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.58rem',
            letterSpacing: '0.22em',
            color: 'rgba(255,150,0,0.3)',
            textTransform: 'uppercase',
            marginTop: '0.5rem',
            textAlign: 'center',
          }}>
            Murilo Original Burger
          </p>
        </div>
      </div>

      {/* ── Bottom row ── */}
      <div
        ref={bottomRef}
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: '2rem',
        }}
      >
        {/* Left: tagline + CTAs */}
        <div style={{ maxWidth: '420px' }}>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.85rem, 1.4vw, 1.05rem)',
            color: 'var(--mob-muted)',
            lineHeight: 1.65,
            marginBottom: '1.75rem',
          }}>
            Ingredientes premium, pão brioche fresquinho e aquele blend que você não encontra em
            nenhuma rede. Peça agora direto, sem comissão.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            <a
              href="#pedido"
              style={{
                fontFamily: 'var(--font-display)', fontSize: '1.05rem',
                letterSpacing: '0.06em', background: 'var(--mob-fire)',
                color: '#fff', padding: '0.75rem 2rem', borderRadius: '9999px',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.transform = 'scale(1.04)'
                el.style.boxShadow = '0 0 32px rgba(255,69,0,0.5)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.transform = 'scale(1)'
                el.style.boxShadow = 'none'
              }}
            >
              Fazer Pedido
            </a>
            <a
              href="#cardápio"
              style={{
                fontFamily: 'var(--font-display)', fontSize: '1.05rem',
                letterSpacing: '0.06em', color: 'var(--mob-text)',
                padding: '0.75rem 2rem', borderRadius: '9999px',
                border: '1px solid var(--mob-border)',
                transition: 'border-color 0.2s, color 0.2s',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = 'rgba(255,255,255,0.25)'
                el.style.color = '#fff'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = 'var(--mob-border)'
                el.style.color = 'var(--mob-text)'
              }}
            >
              Ver Cardápio
            </a>
          </div>
        </div>

        {/* Right: stats horizontal */}
        <div style={{
          display: 'flex',
          gap: 'clamp(1.5rem, 3vw, 3rem)',
          alignItems: 'flex-end',
        }}>
          {[
            { num: '9+',    label: 'opções' },
            { num: '100%', label: 'artesanal' },
            { num: '30min', label: 'entrega' },
          ].map(({ num, label }, i) => (
            <div key={label} style={{ textAlign: 'center' }}>
              {i > 0 && (
                <span style={{
                  position: 'absolute',
                  left: '-1.5rem',
                  top: '50%',
                  width: '1px', height: '24px',
                  background: 'var(--mob-border)',
                  transform: 'translateY(-50%)',
                }} />
              )}
              <p style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
                color: 'var(--mob-fire)', lineHeight: 1,
              }}>
                {num}
              </p>
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: '0.62rem',
                color: 'var(--mob-muted)', letterSpacing: '0.12em',
                textTransform: 'uppercase', marginTop: '0.2rem',
              }}>
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        style={{
          position: 'absolute', bottom: '2rem', left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: '0.4rem',
        }}
      >
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: '0.6rem',
          letterSpacing: '0.22em', color: 'var(--mob-muted)',
          textTransform: 'uppercase',
        }}>
          Scroll
        </p>
        <div style={{
          width: '1px', height: '36px',
          background: 'linear-gradient(to bottom, var(--mob-fire), transparent)',
          animation: 'pulse 1.8s ease-in-out infinite',
        }} />
      </div>
    </section>
  )
}
