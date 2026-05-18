'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const ITEMS = [
  {
    icon: '🌿',
    title: 'Ingredientes Frescos',
    desc: 'Tudo preparado no dia, sem congelados. Pão brioche fresquinho, blend bovino selecionado e vegetais de qualidade.',
  },
  {
    icon: '🔥',
    title: 'Feito na Hora',
    desc: 'Seu pedido só começa quando você confirma. Nada fica esperando na prateleira — sai da chapa pra você.',
  },
  {
    icon: '💳',
    title: 'Pix ou Cartão',
    desc: 'Pague direto pelo site, sem app de terceiros. Pix na hora ou cartão de crédito em até 3x sem juros.',
  },
]

export function Features() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.feat-card', {
        opacity: 0,
        y: 60,
        stagger: 0.18,
        duration: 0.75,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 72%',
        },
      })
      gsap.from('.feat-title', {
        opacity: 0,
        y: 30,
        duration: 0.65,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="sobre"
      style={{
        background: 'var(--mob-black)',
        padding: 'clamp(4rem, 10vw, 9rem) 0',
        borderTop: '1px solid var(--mob-border)',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 clamp(2rem, 6vw, 6rem)' }}>
        {/* Section label */}
        <div className="feat-title flex items-center gap-4 mb-14">
          <span style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.7rem',
            letterSpacing: '0.25em',
            color: 'var(--mob-fire)',
            textTransform: 'uppercase',
          }}>
            Por que Mob Burger?
          </span>
          <div style={{ flex: 1, height: '1px', background: 'var(--mob-border)' }} />
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 'clamp(1rem, 2vw, 1.5rem)',
          }}
        >
          {ITEMS.map((item) => (
            <div
              key={item.title}
              className="feat-card"
              style={{
                background: 'var(--mob-card)',
                border: '1px solid var(--mob-border)',
                borderRadius: '20px',
                padding: 'clamp(1.75rem, 3vw, 2.5rem)',
                transition: 'border-color 0.3s, transform 0.3s',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = 'rgba(255,69,0,0.35)'
                el.style.transform   = 'translateY(-4px)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = 'var(--mob-border)'
                el.style.transform   = 'translateY(0)'
              }}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '1.25rem', lineHeight: 1 }}>
                {item.icon}
              </div>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.6rem, 2.5vw, 2rem)',
                color: 'var(--mob-text)',
                letterSpacing: '0.02em',
                lineHeight: 1,
                marginBottom: '0.75rem',
              }}>
                {item.title}
              </h3>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.85rem',
                color: 'var(--mob-muted)',
                lineHeight: 1.65,
              }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
