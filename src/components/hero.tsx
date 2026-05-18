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
  const line1Ref    = useRef<HTMLDivElement>(null)
  const line2Ref    = useRef<HTMLDivElement>(null)
  const line3Ref    = useRef<HTMLDivElement>(null)
  const subRef      = useRef<HTMLParagraphElement>(null)
  const btnsRef     = useRef<HTMLDivElement>(null)
  const scrollRef   = useRef<HTMLDivElement>(null)
  const eyebrowRef  = useRef<HTMLParagraphElement>(null)
  const cardRef     = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ready) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 })

      tl.from(glowRef.current,  { opacity: 0, scale: 0.6, duration: 1.4, ease: 'power2.out' })
        .from([line1Ref.current, line2Ref.current, line3Ref.current], {
          yPercent: 110, opacity: 0,
          stagger: 0.12,
          duration: 0.8, ease: 'power3.out',
        }, 0.1)
        .from(subRef.current,  { opacity: 0, y: 18, duration: 0.5, ease: 'power2.out' }, '-=0.3')
        .from(btnsRef.current, { opacity: 0, y: 18, duration: 0.5, ease: 'power2.out' }, '-=0.3')
        .from(cardRef.current, { opacity: 0, x: 24, duration: 0.5, ease: 'power2.out' }, '-=0.4')
        .from(scrollRef.current,{ opacity: 0, duration: 0.4 }, '-=0.2')

      /* Parallax glow on scroll */
      gsap.to(glowRef.current, {
        yPercent: 35,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end:   'bottom top',
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
      className="grain relative flex flex-col justify-center overflow-hidden"
      style={{
        minHeight: '100svh',
        background: 'var(--mob-black)',
        paddingTop: '5rem',
      }}
    >
      {/* Ambient fire glow */}
      <div
        ref={glowRef}
        className="absolute pointer-events-none"
        style={{
          width:  'clamp(500px, 70vw, 900px)',
          height: 'clamp(500px, 70vw, 900px)',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(255,100,0,0.18) 0%, rgba(255,69,0,0.07) 45%, transparent 70%)',
          right: '-15%',
          top:   '50%',
          transform: 'translateY(-50%)',
          filter: 'blur(40px)',
        }}
      />

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '1280px', margin: '0 auto', width: '100%', padding: '0 clamp(2rem, 6vw, 6rem)', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2.5rem', alignItems: 'center' }}>
        {/* Left — copy */}
        <div>
          {/* Eyebrow */}
          <div className="overflow-clip mb-3">
            <p
              ref={eyebrowRef}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.72rem',
                letterSpacing: '0.25em',
                color: 'var(--mob-fire)',
                textTransform: 'uppercase',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <span style={{ width: '24px', height: '1px', background: 'var(--mob-fire)', display: 'inline-block' }} />
              Artesanal · Lavras/MG
            </p>
          </div>

          {/* Headline */}
          <h1 style={{ fontFamily: 'var(--font-display)', lineHeight: 0.92, letterSpacing: '-0.01em' }}>
            <div className="overflow-clip">
              <div
                ref={line1Ref}
                style={{ fontSize: 'clamp(4rem, 11vw, 10rem)', color: 'var(--mob-text)' }}
              >
                O MELHOR
              </div>
            </div>
            <div className="overflow-clip">
              <div
                ref={line2Ref}
                style={{
                  fontSize: 'clamp(4.5rem, 13vw, 12rem)',
                  color: 'var(--mob-fire)',
                  WebkitTextStroke: '0px',
                }}
              >
                BURGER
              </div>
            </div>
            <div className="overflow-clip">
              <div
                ref={line3Ref}
                style={{
                  fontSize: 'clamp(2.2rem, 6vw, 5.5rem)',
                  color: 'var(--mob-text)',
                  opacity: 0.55,
                }}
              >
                DE LAVRAS
              </div>
            </div>
          </h1>

          {/* Subtitle */}
          <p
            ref={subRef}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
              color: 'var(--mob-muted)',
              lineHeight: 1.65,
              maxWidth: '420px',
              marginTop: '1.5rem',
            }}
          >
            Ingredientes selecionados, pão brioche fresquinho e aquele blend que você não encontra
            em nenhuma rede. Peça agora direto, sem comissão.
          </p>

          {/* Buttons */}
          <div ref={btnsRef} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '2rem' }}>
            <a
              href="#pedido"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.05rem',
                letterSpacing: '0.06em',
                background: 'var(--mob-fire)',
                color: '#fff',
                padding: '0.75rem 2rem',
                borderRadius: '9999px',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.transform  = 'scale(1.04)'
                el.style.boxShadow  = '0 0 32px rgba(255,69,0,0.5)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.transform  = 'scale(1)'
                el.style.boxShadow  = 'none'
              }}
            >
              Fazer Pedido
            </a>
            <a
              href="#cardápio"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.05rem',
                letterSpacing: '0.06em',
                color: 'var(--mob-text)',
                padding: '0.75rem 2rem',
                borderRadius: '9999px',
                border: '1px solid var(--mob-border)',
                transition: 'border-color 0.2s, color 0.2s',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = 'rgba(255,255,255,0.25)'
                el.style.color       = '#fff'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = 'var(--mob-border)'
                el.style.color       = 'var(--mob-text)'
              }}
            >
              Ver Cardápio
            </a>
          </div>
        </div>

        {/* Right — M.O.B animated display */}
        <div className="lg-show" ref={cardRef}>
          <div
            style={{
              background: 'var(--mob-card)',
              border: '1px solid var(--mob-border)',
              borderRadius: '28px',
              padding: '2.5rem 2rem',
              width: '100%',
              maxWidth: '420px',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Ambient fire glow inside card */}
            <div style={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              background: 'radial-gradient(ellipse 80% 60% at 50% 80%, rgba(255,80,0,0.12) 0%, transparent 70%)',
            }} />

            {/* M.O.B animated letters */}
            <div
              className="mob-fire"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(4.5rem, 9vw, 8.5rem)',
                letterSpacing: '0.06em',
                lineHeight: 1,
                background: 'linear-gradient(135deg, #FFD060 0%, #FF6200 55%, #CC2800 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                position: 'relative',
                zIndex: 1,
                marginBottom: '0.25rem',
              }}
            >
              M.O.B
            </div>

            {/* M · MURILO / O · ORIGINAL / B · BURGER */}
            <div style={{
              display: 'flex', flexDirection: 'column', gap: '0.2rem',
              marginBottom: '1.75rem', position: 'relative', zIndex: 1,
            }}>
              {[
                { letter: 'M', word: 'MURILO' },
                { letter: 'O', word: 'ORIGINAL' },
                { letter: 'B', word: 'BURGER' },
              ].map(({ letter, word }) => (
                <div key={letter} style={{
                  display: 'flex', alignItems: 'center', gap: '0.6rem',
                  justifyContent: 'center',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.9rem',
                    color: 'var(--mob-fire)',
                    lineHeight: 1,
                    minWidth: '0.9rem',
                  }}>
                    {letter}
                  </span>
                  <span style={{
                    width: '1px', height: '10px',
                    background: 'var(--mob-border)',
                    flexShrink: 0,
                  }} />
                  <span style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.65rem',
                    letterSpacing: '0.2em',
                    color: 'var(--mob-muted)',
                    textTransform: 'uppercase',
                  }}>
                    {word}
                  </span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '0.5rem', position: 'relative', zIndex: 1,
            }}>
              {[
                { num: '9+',    label: 'opções' },
                { num: '100%', label: 'artesanal' },
                { num: '30min', label: 'entrega' },
              ].map(({ num, label }) => (
                <div key={label} style={{
                  background: 'rgba(255,255,255,0.04)',
                  borderRadius: '12px', padding: '0.75rem 0.5rem',
                }}>
                  <p style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)',
                    color: 'var(--mob-fire)', lineHeight: 1,
                  }}>
                    {num}
                  </p>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.62rem', color: 'var(--mob-muted)',
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                    marginTop: '0.2rem',
                  }}>
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}
      >
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.65rem',
            letterSpacing: '0.2em',
            color: 'var(--mob-muted)',
            textTransform: 'uppercase',
          }}
        >
          Scroll
        </p>
        <div
          style={{
            width: '1px',
            height: '40px',
            background: 'linear-gradient(to bottom, var(--mob-fire), transparent)',
            animation: 'pulse 1.8s ease-in-out infinite',
          }}
        />
      </div>
    </section>
  )
}
