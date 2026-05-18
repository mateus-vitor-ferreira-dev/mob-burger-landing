'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
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
          <div ref={btnsRef} className="flex flex-wrap gap-3 mt-8">
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

        {/* Right — stats badge */}
        <div className="hidden lg:flex justify-center items-center">
          <div
            ref={cardRef}
            style={{
              background: 'var(--mob-card)',
              border: '1px solid var(--mob-border)',
              borderRadius: '24px',
              padding: '2.5rem',
              width: '100%',
              maxWidth: '420px',
            }}
          >
            {/* Logo */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <Image
                src="/mob-logo.png"
                alt="M.O.B Burger"
                width={200}
                height={200}
                style={{
                  width: '180px',
                  height: 'auto',
                  filter: 'drop-shadow(0 0 30px rgba(255,90,0,0.45))',
                }}
              />
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              {[
                { num: '9+',    label: 'opções' },
                { num: '100%', label: 'artesanal' },
                { num: '30min', label: 'entrega' },
              ].map(({ num, label }) => (
                <div key={label}>
                  <p
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '2.2rem',
                      color: 'var(--mob-fire)',
                      lineHeight: 1,
                    }}
                  >
                    {num}
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.7rem',
                      color: 'var(--mob-muted)',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      marginTop: '0.25rem',
                    }}
                  >
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
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
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
