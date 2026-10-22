'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Bike, Hamburger, MessageCircle } from 'lucide-react'
import { prefersReducedMotion } from '@/lib/motion'

gsap.registerPlugin(ScrollTrigger)

const STEPS = [
  {
    num: '01',
    icon: Hamburger,
    title: 'Escolha',
    desc: 'Explore o cardápio e monte seu pedido — são 18 smash burgers, 4 frango, 5 combos e sobremesas artesanais.',
  },
  {
    num: '02',
    icon: MessageCircle,
    title: 'Peça',
    desc: 'Envie seu pedido direto pelo WhatsApp. Sem cadastro, sem app de terceiros, sem comissão.',
  },
  {
    num: '03',
    icon: Bike,
    title: 'Receba',
    desc: 'Seu lanche sai da chapa e chega na sua porta em 40–60 minutos. Quentinho, fresquinho, do jeito certo.',
  },
]

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
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
      <div className="mob-container">

        {/* Label */}
        <div className="hiw-title" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: 'clamp(2rem, 5vw, 4rem)' }}>
          <h2 className="eyebrow">Como pedir</h2>
          <div aria-hidden style={{ flex: 1, height: '1px', background: 'var(--mob-border)' }} />
        </div>

        <ol style={{
          listStyle: 'none',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(240px, 100%), 1fr))',
          gap: 'clamp(2.5rem, 4vw, 2rem)',
          alignItems: 'start',
        }}>
          {STEPS.map((step) => (
            <li
              key={step.num}
              className="hiw-step"
              style={{ position: 'relative' }}
            >
              {/* Step number + ícone na mesma linha */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <p aria-hidden style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(3.5rem, 6vw, 5rem)',
                color: 'var(--mob-fire)',
                opacity: 0.3,
                lineHeight: 1,
                letterSpacing: '-0.02em',
              }}>
                {step.num}
              </p>
              <span className="icon-tile" aria-hidden>
                <step.icon size={24} strokeWidth={1.75} />
              </span>
              </div>

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
              <p className="body-copy">
                {step.desc}
              </p>
            </li>
          ))}
        </ol>

        {/* CTA inline */}
        <div style={{ marginTop: 'clamp(3rem, 5vw, 4rem)', display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          <a
            href="https://wa.me/5535997209115"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Pedir agora pelo WhatsApp
          </a>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--mob-muted)' }}>
            Tempo médio de resposta: <strong style={{ color: 'var(--mob-text)' }}>menos de 2 min</strong>
          </p>
        </div>
      </div>
    </section>
  )
}
