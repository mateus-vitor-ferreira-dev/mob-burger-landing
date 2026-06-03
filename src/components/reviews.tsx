'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const REVIEWS = [
  {
    name: 'Maria C.',
    rating: 5,
    text: 'Melhor smash burger que já comi em Lavras. O cheddar derrete perfeito e o pão brioche é incrível. Pedi o Mob King e já virei fã!',
    tag: 'Mob King',
  },
  {
    name: 'João P.',
    rating: 5,
    text: 'Pedi o Mob Beast e me arrependo de não ter pedido dois. Chegou quentinho e bem embalado. A chapa dá um sabor diferente de qualquer outro lugar.',
    tag: 'Mob Beast',
  },
  {
    name: 'Ana L.',
    rating: 5,
    text: 'Combo Clássico vale muito a pena. Atendimento rápido no WhatsApp e pedido certinho. Sem intermediários e ainda mais barato que delivery!',
    tag: 'Combo Clássico',
  },
  {
    name: 'Pedro M.',
    rating: 5,
    text: 'Finalmente um smash burger artesanal decente em Lavras. O Mob Original é simples mas viciante. O molho especial é o diferencial.',
    tag: 'Mob Original',
  },
  {
    name: 'Camila R.',
    rating: 5,
    text: 'O Mob Bacon é absurdo de bom. Cada tira de bacon crocante com aquele cheddar derretendo... pedi três vezes na mesma semana. Sem arrependimento.',
    tag: 'Mob Bacon',
  },
  {
    name: 'Lucas T.',
    rating: 5,
    text: 'Minha namorada e eu pedimos o Mob Para 2 e foi perfeito pro jantar. Embalagem caprichada, chegou na hora e ainda veio a Coca geladinha.',
    tag: 'Mob Para 2',
  },
  {
    name: 'Fernanda S.',
    rating: 5,
    text: 'Tentei o Mob Joker achando que seria parecido com outros burgers, mas cada mordida é diferente. Bacon, mussarela derretida e aquele molho especial... obra de arte.',
    tag: 'Mob Joker',
  },
  {
    name: 'Rafael B.',
    rating: 5,
    text: 'Mob Brownie de sobremesa depois do Mob Godfather. Não precisa de mais nada. Atendimento top pelo WhatsApp, pedido em 2 minutos e entregou dentro do prazo.',
    tag: 'Mob Brownie',
  },
]

function Stars({ count }: { count: number }) {
  return (
    <div style={{ display: 'flex', gap: '2px' }}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" style={{ width: '16px', height: '16px', fill: '#FFB300' }}>
          <path d="M10 1l2.39 4.84L18 6.76l-4 3.9.94 5.5L10 13.77l-4.94 2.39.94-5.5-4-3.9 5.61-.92z"/>
        </svg>
      ))}
    </div>
  )
}

export function Reviews() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.review-card', {
        opacity: 0, y: 48, stagger: 0.15, duration: 0.65, ease: 'power2.out',
        immediateRender: false,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', invalidateOnRefresh: true },
      })
      gsap.from('.review-title', {
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
      id="avaliacoes"
      style={{
        background: 'var(--mob-black)',
        borderTop: '1px solid var(--mob-border)',
        padding: 'clamp(4rem, 8vw, 7rem) 0',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 clamp(2rem, 6vw, 6rem)' }}>

        {/* Header */}
        <div className="review-title" style={{ marginBottom: '3.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <span style={{
              fontFamily: 'var(--font-body)', fontSize: '0.7rem',
              letterSpacing: '0.25em', color: 'var(--mob-fire)', textTransform: 'uppercase',
            }}>
              Avaliações
            </span>
            <div style={{ flex: 1, height: '1px', background: 'var(--mob-border)' }} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
            <p style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3rem, 6vw, 5rem)',
              color: '#FFB300', lineHeight: 1, letterSpacing: '-0.01em',
            }}>
              4.9
            </p>
            <div>
              <Stars count={5} />
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--mob-muted)', marginTop: '0.3rem' }}>
                Baseado em avaliações de clientes reais
              </p>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 'clamp(1rem, 2vw, 1.5rem)',
        }}>
          {REVIEWS.map((r) => (
            <div
              key={r.name}
              className="review-card"
              style={{
                background: 'var(--mob-card)',
                border: '1px solid var(--mob-border)',
                borderRadius: '20px',
                padding: 'clamp(1.5rem, 2.5vw, 2rem)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                transition: 'border-color 0.3s, transform 0.3s',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = 'rgba(255,179,0,0.3)'
                el.style.transform = 'translateY(-4px)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = 'var(--mob-border)'
                el.style.transform = 'translateY(0)'
              }}
            >
              <Stars count={r.rating} />
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: '0.88rem',
                color: 'var(--mob-text)', lineHeight: 1.65, flex: 1,
              }}>
                &ldquo;{r.text}&rdquo;
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'var(--mob-muted)', fontWeight: 600 }}>
                  {r.name}
                </p>
                <span style={{
                  fontFamily: 'var(--font-body)', fontSize: '0.6rem',
                  letterSpacing: '0.12em', color: 'var(--mob-fire)',
                  background: 'rgba(255,69,0,0.08)',
                  padding: '0.2rem 0.6rem', borderRadius: '9999px',
                  textTransform: 'uppercase',
                }}>
                  {r.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
