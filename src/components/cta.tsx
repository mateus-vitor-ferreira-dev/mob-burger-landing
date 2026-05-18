'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function CTA() {
  const sectionRef = useRef<HTMLElement>(null)
  const line1Ref   = useRef<HTMLDivElement>(null)
  const line2Ref   = useRef<HTMLDivElement>(null)
  const subRef     = useRef<HTMLParagraphElement>(null)
  const btnRef     = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      })

      tl.from([line1Ref.current, line2Ref.current], {
        yPercent: 110,
        opacity: 0,
        stagger: 0.1,
        duration: 0.85,
        ease: 'power3.out',
      })
        .from(subRef.current, { opacity: 0, y: 20, duration: 0.55, ease: 'power2.out' }, '-=0.3')
        .from(btnRef.current, { opacity: 0, y: 20, scale: 0.95, duration: 0.55, ease: 'power2.out' }, '-=0.3')

      /* Glow pulse on button */
      gsap.to(btnRef.current, {
        boxShadow: '0 0 50px rgba(255,69,0,0.65), 0 0 120px rgba(255,69,0,0.25)',
        duration: 1.4,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="pedido"
      className="grain relative overflow-hidden"
      style={{
        background: 'var(--mob-surface)',
        padding: 'clamp(5rem, 12vw, 10rem) clamp(1.5rem, 5vw, 5rem)',
        borderTop: '1px solid var(--mob-border)',
        textAlign: 'center',
      }}
    >
      {/* Background radial */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 80% 70% at 50% 100%, rgba(255,69,0,0.14) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.7rem',
          letterSpacing: '0.25em',
          color: 'var(--mob-fire)',
          textTransform: 'uppercase',
          marginBottom: '2rem',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.6rem',
        }}>
          <span style={{ width: '24px', height: '1px', background: 'var(--mob-fire)', display: 'inline-block' }} />
          Pronto para pedir?
          <span style={{ width: '24px', height: '1px', background: 'var(--mob-fire)', display: 'inline-block' }} />
        </p>

        <h2 style={{ fontFamily: 'var(--font-display)', lineHeight: 0.88, letterSpacing: '-0.01em' }}>
          <div className="overflow-clip">
            <div
              ref={line1Ref}
              style={{ fontSize: 'clamp(4rem, 12vw, 11rem)', color: 'var(--mob-text)' }}
            >
              BATEU A
            </div>
          </div>
          <div className="overflow-clip">
            <div
              ref={line2Ref}
              style={{ fontSize: 'clamp(4.5rem, 14vw, 13rem)', color: 'var(--mob-fire)' }}
            >
              FOME?
            </div>
          </div>
        </h2>

        <p
          ref={subRef}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.9rem, 1.5vw, 1.15rem)',
            color: 'var(--mob-muted)',
            lineHeight: 1.65,
            maxWidth: '520px',
            margin: '2rem auto 3rem',
          }}
        >
          Monte o seu pedido direto pelo site, pague por Pix ou cartão e receba na sua porta
          em até 30 minutos. Sem intermediários, sem comissão.
        </p>

        <a
          ref={btnRef}
          href="https://wa.me/5535997209115"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
            letterSpacing: '0.08em',
            background: 'var(--mob-fire)',
            color: '#fff',
            padding: 'clamp(0.9rem, 2vw, 1.2rem) clamp(2rem, 5vw, 3.5rem)',
            borderRadius: '9999px',
            display: 'inline-block',
            transition: 'transform 0.2s',
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.transform = 'scale(1.04)')}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.transform = 'scale(1)')}
        >
          Fazer Pedido Agora
        </a>

        {/* Social proof */}
        <div className="flex items-center justify-center gap-6 mt-10 flex-wrap">
          {['⚡ Resposta imediata', '🔒 Pagamento seguro', '📍 Lavras/MG'].map((item) => (
            <span
              key={item}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.78rem',
                color: 'var(--mob-muted)',
                letterSpacing: '0.05em',
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
