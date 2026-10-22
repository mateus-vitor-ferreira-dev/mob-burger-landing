'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MagneticButton } from './magnetic-button'
import { ScrambleText } from './scramble-text'
import { HandCoins, MapPin, Zap } from 'lucide-react'
import { prefersReducedMotion } from '@/lib/motion'

gsap.registerPlugin(ScrollTrigger)

export function CTA() {
  const sectionRef = useRef<HTMLElement>(null)
  const line1Ref   = useRef<HTMLDivElement>(null)
  const line2Ref   = useRef<HTMLDivElement>(null)
  const subRef     = useRef<HTMLParagraphElement>(null)
  const btnRef     = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
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

      /* Glow pulse on button — sutil */
      gsap.to(btnRef.current, {
        boxShadow: '0 0 28px rgba(255,69,0,0.55)',
        duration: 1.6,
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
        padding: 'clamp(5rem, 12vw, 10rem) 0',
        borderTop: '1px solid var(--mob-border)',
        textAlign: 'center',
      }}
    >
      {/* Background radial */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 80% 70% at 50% 100%, rgba(255,69,0,0.14) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="mob-container" style={{ position: 'relative', zIndex: 10, maxWidth: '900px' }}>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.75rem',
          letterSpacing: '0.25em',
          color: 'var(--mob-fire)',
          textTransform: 'uppercase',
          marginBottom: '2rem',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.6rem',
        }}>
          <span aria-hidden style={{ width: '24px', height: '1px', background: 'var(--mob-fire)', display: 'inline-block' }} />
          Pronto para pedir?
          <span aria-hidden style={{ width: '24px', height: '1px', background: 'var(--mob-fire)', display: 'inline-block' }} />
        </p>

        <h2 style={{ fontFamily: 'var(--font-display)', lineHeight: 0.88, letterSpacing: '-0.01em' }}>
          <span className="block overflow-clip">
            <span
              ref={line1Ref}
              style={{ display: 'block', fontSize: 'clamp(4rem, 12vw, 11rem)', color: 'var(--mob-text)' }}
            >
              BATEU A
            </span>
          </span>
          <span className="block overflow-clip">
            <span
              ref={line2Ref}
              style={{ display: 'block', fontSize: 'clamp(4.5rem, 14vw, 13rem)', color: 'var(--mob-fire)' }}
            >
              <ScrambleText text="FOME?" duration={0.65} delay={0.6} />
            </span>
          </span>
        </h2>

        <p
          ref={subRef}
          className="body-copy"
          style={{
            fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
            maxWidth: '520px',
            margin: '2rem auto 3rem',
          }}
        >
          Monte o seu pedido pelo WhatsApp, receba na sua porta em 40–60 minutos e pague na
          entrega com Pix, cartão ou dinheiro. Sem intermediários, sem comissão.
        </p>

        <MagneticButton radius={130} strength={0.42}>
          <a
            ref={btnRef}
            href="https://wa.me/5535997209115"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{
              fontSize: 'clamp(1.25rem, 2.5vw, 1.5rem)',
              letterSpacing: '0.08em',
              minHeight: '56px',
              padding: 'clamp(0.9rem, 2vw, 1.2rem) clamp(2rem, 5vw, 3.5rem)',
              // box-shadow fica por conta do pulso do GSAP — transição CSS nela atrapalharia
              transition: 'background-color 0.2s, transform 0.2s',
            }}
          >
            Fazer Pedido Agora
          </a>
        </MagneticButton>

        {/* Social proof */}
        <ul style={{ listStyle: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem 1.5rem', marginTop: '2.5rem', flexWrap: 'wrap' }}>
          {[
            { icon: Zap,         label: 'Resposta imediata' },
            { icon: HandCoins,   label: 'Pague na entrega' },
            { icon: MapPin,      label: 'Lavras/MG' },
          ].map(({ icon: Icon, label }) => (
            <li
              key={label}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                color: 'var(--mob-muted)',
                letterSpacing: '0.03em',
                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              }}
            >
              <Icon aria-hidden size={16} style={{ color: 'var(--mob-fire)' }} />
              {label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
