'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STEPS = [
  {
    num: '01',
    icon: '🍔',
    title: 'Escolha',
    desc: 'Explore o cardápio e monte seu pedido — são 18 smash burgers, 4 frango, 5 combos e sobremesas artesanais.',
  },
  {
    num: '02',
    icon: '💬',
    title: 'Peça',
    desc: 'Envie seu pedido direto pelo WhatsApp. Sem cadastro, sem app de terceiros, sem comissão.',
  },
  {
    num: '03',
    icon: '🛵',
    title: 'Receba',
    desc: 'Seu lanche sai da chapa e chega na sua porta em 40–60 minutos. Quentinho, fresquinho, do jeito certo.',
  },
]

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hiw-step', {
        opacity: 0, y: 50, stagger: 0.2, duration: 0.7, ease: 'power2.out',
        immediateRender: false,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', invalidateOnRefresh: true },
      })
      gsap.from('.hiw-title', {
        opacity: 0, y: 24, duration: 0.6, ease: 'power2.out',
        immediateRender: false,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', invalidateOnRefresh: true },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="como-pedir"
      style={{
        background: 'var(--mob-surface)',
        borderTop: '1px solid var(--mob-border)',
        padding: 'clamp(4rem, 8vw, 7rem) 0',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 clamp(2rem, 6vw, 6rem)' }}>

        {/* Label */}
        <div className="hiw-title" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '4rem' }}>
          <span style={{
            fontFamily: 'var(--font-body)', fontSize: '0.7rem',
            letterSpacing: '0.25em', color: 'var(--mob-fire)', textTransform: 'uppercase',
          }}>
            Como pedir
          </span>
          <div style={{ flex: 1, height: '1px', background: 'var(--mob-border)' }} />
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 'clamp(1rem, 3vw, 2rem)',
          alignItems: 'start',
        }}>
          {STEPS.map((step, i) => (
            <div
              key={step.num}
              className="hiw-step"
              style={{ position: 'relative' }}
            >
              {/* Connector line */}
              {i < STEPS.length - 1 && (
                <div style={{
                  display: 'none',
                  position: 'absolute',
                  top: '2.75rem', right: '-1rem',
                  width: '2rem', height: '1px',
                  background: 'var(--mob-border)',
                }} />
              )}

              {/* Step number */}
              <p style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(3.5rem, 6vw, 5rem)',
                color: 'var(--mob-fire)',
                opacity: 0.15,
                lineHeight: 1,
                marginBottom: '1rem',
                letterSpacing: '-0.02em',
              }}>
                {step.num}
              </p>

              <div style={{ fontSize: '2.2rem', marginBottom: '1rem', lineHeight: 1 }}>{step.icon}</div>

              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
                color: 'var(--mob-text)',
                letterSpacing: '0.02em',
                lineHeight: 1,
                marginBottom: '0.75rem',
              }}>
                {step.title}
              </h3>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.85rem',
                color: 'var(--mob-muted)',
                lineHeight: 1.65,
              }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA inline */}
        <div style={{ marginTop: 'clamp(3rem, 5vw, 4rem)', display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          <a
            href="https://wa.me/5535997209115"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'var(--font-display)', fontSize: '1rem',
              letterSpacing: '0.06em', background: 'var(--mob-fire)',
              color: '#fff', padding: '0.75rem 2rem',
              borderRadius: '9999px', display: 'inline-block',
              transition: 'opacity 0.2s, transform 0.2s',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0.88'; (e.currentTarget as HTMLElement).style.transform = 'scale(1.03)' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = '1'; (e.currentTarget as HTMLElement).style.transform = 'scale(1)' }}
          >
            Pedir agora pelo WhatsApp
          </a>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'var(--mob-muted)' }}>
            Tempo médio de resposta: <strong style={{ color: 'var(--mob-text)' }}>menos de 2 min</strong>
          </p>
        </div>
      </div>
    </section>
  )
}
