'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MagneticButton } from './magnetic-button'
import { prefersReducedMotion } from '@/lib/motion'

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
    // Sem movimento: o conteúdo já está no estado final (números incluídos)
    if (!ready || prefersReducedMotion()) return

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


      // Contador animado nos stats
      sectionRef.current?.querySelectorAll('[data-to]').forEach((el) => {
        const from    = Number(el.getAttribute('data-from') ?? 0)
        const to      = Number(el.getAttribute('data-to')   ?? 0)
        const suffix  = el.getAttribute('data-suffix') ?? ''
        const isRange = el.getAttribute('data-range') === 'true'

        const obj = { val: from }
        gsap.to(obj, {
          val: to,
          duration: 1.8,
          ease: 'power2.out',
          roundProps: 'val',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          onUpdate() {
            el.textContent = isRange
              ? `${from}–${to}${suffix}`   // range fixo: 40-60min
              : `${obj.val}${suffix}`
          },
        })
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
        padding: 'calc(var(--header-h) + clamp(1.5rem, 5vh, 4rem)) 0 clamp(3rem, 8vh, 7rem)',
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

      <div className="mob-container" style={{ position: 'relative', zIndex: 2 }}>
      {/* Eyebrow */}
      <p
        ref={eyebrowRef}
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.75rem',
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
        <span aria-hidden style={{ width: '28px', height: '1px', background: 'var(--mob-fire)', display: 'inline-block' }} />
        Artesanal · Lavras/MG
      </p>

      {/* ── BRAND NAME + M.O.B ghost ── */}
      <div
        className="grid grid-cols-1 sm:grid-cols-[auto_1fr]"
        style={{
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
          <span className="block overflow-clip">
            <span
              ref={line1Ref}
              className="hero-line-xl"
              style={{
                display: 'block',
                background: 'linear-gradient(to bottom, #FFFDE7 0%, #FFE082 25%, #FFCA28 55%, #FFB300 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}
            >
              MURILO
            </span>
          </span>

          {/* ORIGINAL */}
          <span className="block overflow-clip">
            <span
              ref={line2Ref}
              className="hero-line-md"
              style={{
                display: 'block',
                background: 'linear-gradient(to bottom, #FFB300 0%, #FF8F00 30%, #FF6D00 65%, #F4511E 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}
            >
              ORIGINAL&rsquo;S
            </span>
          </span>

          {/* BURGER */}
          <span className="block overflow-clip">
            <span
              ref={line3Ref}
              className="hero-line-xl"
              style={{
                display: 'block',
                background: 'linear-gradient(to bottom, #E64A19 0%, #C62828 45%, #B71C1C 75%, #7B1414 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}
            >
              BURGER
            </span>
          </span>
        </h1>

        {/* Right — M · O · B ghost editorial (decorativo; some no celular) */}
        <div
          aria-hidden
          className="hidden sm:flex"
          style={{
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
            fontSize: '0.65rem',
            letterSpacing: '0.22em',
            color: 'rgba(255,150,0,0.3)',
            marginTop: '0.5rem',
            textAlign: 'center',
          }}>
            ORIGINAL&rsquo;S
          </p>
        </div>
      </div>

      {/* ── Bottom row ── */}
      <div
        ref={bottomRef}
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: '2rem',
        }}
      >
        {/* Left: tagline + CTAs */}
        <div style={{ maxWidth: '420px' }}>
          <p className="body-copy" style={{ fontSize: 'clamp(1rem, 1.4vw, 1.1rem)', marginBottom: '1.75rem' }}>
            Ingredientes premium, pão brioche fresquinho e aquele blend que você não encontra em
            nenhuma rede. Peça agora direto, sem comissão.
          </p>

          <div className="grid grid-cols-1 min-[400px]:flex min-[400px]:flex-wrap" style={{ gap: '0.75rem' }}>
            <MagneticButton>
              <a href="#pedido" className="btn btn-primary w-full">
                Fazer Pedido
              </a>
            </MagneticButton>
            <a href="/cardapio.html" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              Ver Cardápio
              <span className="sr-only"> (abre em nova aba)</span>
            </a>
          </div>
        </div>

        {/* Right: stats com contador animado */}
        <dl style={{ display: 'flex', gap: 'clamp(1.5rem, 3vw, 3rem)', alignItems: 'flex-end' }}>
          {[
            { id: 'stat-opcoes',    from: 0,   to: 22,  suffix: '+',   label: 'opções' },
            { id: 'stat-artesanal', from: 0,   to: 100, suffix: '%',   label: 'artesanal' },
            { id: 'stat-entrega',   from: 40,  to: 60,  suffix: 'min', label: 'entrega', range: true },
          ].map(({ id, from, to, suffix, label, range }, i) => (
            <div key={label} style={{ textAlign: 'center', position: 'relative', display: 'flex', flexDirection: 'column-reverse' }}>
              {i > 0 && (
                <span aria-hidden style={{
                  position: 'absolute', left: '-1.5rem', top: '50%',
                  width: '1px', height: '24px',
                  background: 'var(--mob-border)', transform: 'translateY(-50%)',
                }} />
              )}
              <dt style={{
                fontFamily: 'var(--font-body)', fontSize: '0.7rem',
                color: 'var(--mob-muted)', letterSpacing: '0.12em',
                textTransform: 'uppercase', marginTop: '0.2rem',
              }}>
                {label}
              </dt>
              <dd
                id={id}
                data-from={from} data-to={to} data-suffix={suffix} data-range={range ? 'true' : ''}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
                  color: 'var(--mob-fire)', lineHeight: 1,
                }}
              >
                {range ? `${from}–${to}${suffix}` : `${to}${suffix}`}
              </dd>
            </div>
          ))}
        </dl>
      </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        aria-hidden
        className="hidden md:flex [@media(max-height:700px)]:hidden"
        style={{
          position: 'absolute', bottom: '2rem', left: '50%',
          transform: 'translateX(-50%)',
          flexDirection: 'column',
          alignItems: 'center', gap: '0.4rem',
        }}
      >
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: '0.65rem',
          letterSpacing: '0.22em', color: 'var(--mob-muted)',
          textTransform: 'uppercase',
        }}>
          Role
        </p>
        <div className="scroll-hint-line" style={{
          width: '1px', height: '36px',
          background: 'linear-gradient(to bottom, var(--mob-fire), transparent)',
        }} />
      </div>
    </section>
  )
}
