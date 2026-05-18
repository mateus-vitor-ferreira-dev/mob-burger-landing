'use client'

import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const BURGERS = [
  {
    id: 1,
    name: 'MC Simples',
    desc: 'Pão brioche · maionese · 2 fatias de mussarela · 110g de hambúrguer',
    tag: 'CLÁSSICO',
    emoji: '🍔',
    bg: 'linear-gradient(145deg, #2d1a08 0%, #100a03 60%, #0a0a0a 100%)',
    glow: 'rgba(255,140,40,0.25)',
    imagePath: '/burgers/mc-simples.jpg',
  },
  {
    id: 2,
    name: 'X Bacon',
    desc: 'Pão brioche · 2 tiras de bacon · 110g de hambúrguer · 2 fatias de cheddar',
    tag: '🔥 MAIS PEDIDO',
    emoji: '🥓',
    bg: 'linear-gradient(145deg, #2d0c08 0%, #10030a 60%, #0a0a0a 100%)',
    glow: 'rgba(255,60,20,0.28)',
    imagePath: '/burgers/x-bacon.jpg',
  },
  {
    id: 3,
    name: 'X Bacon Egg',
    desc: 'Pão brioche · 2 tiras de bacon · cheddar · ovo caipira · 110g de hambúrguer',
    tag: 'ESPECIAL',
    emoji: '🍳',
    bg: 'linear-gradient(145deg, #2a2000 0%, #100d00 60%, #0a0a0a 100%)',
    glow: 'rgba(255,200,0,0.22)',
    imagePath: '/burgers/x-bacon-egg.jpg',
  },
  {
    id: 4,
    name: 'Duplo BBQ',
    desc: 'Pão brioche · molho BBQ · cebola caramelizada · 2 bacons · cheddar duplo · 220g',
    tag: 'PREMIUM',
    emoji: '🔥',
    bg: 'linear-gradient(145deg, #1e0a00 0%, #0d0500 60%, #0a0a0a 100%)',
    glow: 'rgba(200,60,0,0.30)',
    imagePath: '/burgers/duplo-bbq.jpg',
  },
  {
    id: 5,
    name: 'MC Salad',
    desc: 'Pão brioche · molho especial · queijo · alface · tomate · cebola · 110g',
    tag: 'LEVE',
    emoji: '🥗',
    bg: 'linear-gradient(145deg, #0a1e08 0%, #050d03 60%, #0a0a0a 100%)',
    glow: 'rgba(60,180,40,0.20)',
    imagePath: '/burgers/mc-salad.jpg',
  },
  {
    id: 6,
    name: 'Frango Simples',
    desc: 'Pão brioche · 2 fatias de mussarela · filé de frango grelhado',
    tag: 'FRANGO',
    emoji: '🍗',
    bg: 'linear-gradient(145deg, #1a1500 0%, #0d0c00 60%, #0a0a0a 100%)',
    glow: 'rgba(220,170,0,0.22)',
    imagePath: '/burgers/frango-simples.jpg',
  },
  {
    id: 7,
    name: 'Frango Bacon',
    desc: 'Pão brioche · cheddar · alface · tomate · cebola · frango grelhado com bacon',
    tag: 'FRANGO',
    emoji: '🥩',
    bg: 'linear-gradient(145deg, #200c08 0%, #100503 60%, #0a0a0a 100%)',
    glow: 'rgba(200,80,20,0.25)',
    imagePath: '/burgers/frango-bacon.jpg',
  },
  {
    id: 8,
    name: 'Frango Empanado',
    desc: 'Pão brioche · filé empanado e frito · queijo · alface · tomate · molho da casa',
    tag: '🍗 CROCANTE',
    emoji: '✨',
    bg: 'linear-gradient(145deg, #1a1000 0%, #0d0800 60%, #0a0a0a 100%)',
    glow: 'rgba(180,130,0,0.22)',
    imagePath: '/burgers/frango-empanado.jpg',
  },
]

export function BurgerCarousel() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef   = useRef<HTMLDivElement>(null)
  const titleRef   = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return

    const ctx = gsap.context(() => {
      const track   = trackRef.current
      const section = sectionRef.current
      if (!track || !section) return

      gsap.from(titleRef.current, {
        opacity: 0, y: 40, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: section, start: 'top 80%' },
      })

      const getDistance = () => track.scrollWidth - window.innerWidth

      gsap.to(track, {
        x: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          end: () => '+=' + getDistance(),
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="cardápio"
      style={{ background: 'var(--mob-surface)', overflow: 'hidden' }}
    >
      <div
        ref={trackRef}
        style={{ display: 'flex', alignItems: 'stretch', willChange: 'transform' }}
      >
        {/* Sticky title card */}
        <div
          ref={titleRef}
          style={{
            minWidth: 'clamp(280px, 28vw, 420px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: 'clamp(2rem, 5vw, 5rem) clamp(2rem, 6vw, 6rem)',
            borderRight: '1px solid var(--mob-border)',
            flexShrink: 0,
          }}
        >
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.7rem',
            letterSpacing: '0.22em',
            color: 'var(--mob-fire)',
            textTransform: 'uppercase',
            marginBottom: '1rem',
          }}>
            Nosso Cardápio
          </p>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3.5rem, 7vw, 7rem)',
            color: 'var(--mob-text)',
            lineHeight: 0.9,
            letterSpacing: '-0.01em',
          }}>
            FEITO<br />
            <span style={{ color: 'var(--mob-fire)' }}>PRA</span><br />
            VOCÊ
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.82rem',
            color: 'var(--mob-muted)',
            marginTop: '1.5rem',
            lineHeight: 1.6,
          }}>
            Arraste ou role para<br />
            explorar o cardápio ↗
          </p>
        </div>

        {/* Burger cards */}
        {BURGERS.map((b) => (
          <div
            key={b.id}
            className="burger-card"
            style={{
              minWidth: 'clamp(280px, 26vw, 360px)',
              height: '100vh',
              display: 'flex',
              flexDirection: 'column',
              flexShrink: 0,
              borderRight: '1px solid var(--mob-border)',
              position: 'relative',
              overflow: 'hidden',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget.querySelector('.card-visual'), { scale: 1.04, duration: 0.5, ease: 'power2.out' })
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget.querySelector('.card-visual'), { scale: 1, duration: 0.5, ease: 'power2.out' })
            }}
          >
            {/* Visual area — gradient + emoji (swap for <Image> when photos are ready) */}
            <div
              className="card-visual"
              style={{
                flex: 1,
                background: b.bg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
                transformOrigin: 'center',
              }}
            >
              {/* Glow spot */}
              <div style={{
                position: 'absolute',
                width: '60%',
                height: '60%',
                borderRadius: '50%',
                background: `radial-gradient(circle, ${b.glow} 0%, transparent 70%)`,
                filter: 'blur(30px)',
              }} />

              {/* Emoji */}
              <span style={{
                fontSize: 'clamp(5rem, 8vw, 8rem)',
                lineHeight: 1,
                position: 'relative',
                zIndex: 1,
                filter: 'drop-shadow(0 4px 24px rgba(0,0,0,0.5))',
              }}>
                {b.emoji}
              </span>

              {/* Bottom gradient fade */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to bottom, transparent 50%, rgba(8,7,11,0.95) 100%)',
              }} />

              {/* Tag */}
              <div style={{ position: 'absolute', top: '1rem', left: '1rem', zIndex: 2 }}>
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  background: 'var(--mob-fire)',
                  color: '#fff',
                  padding: '0.25rem 0.65rem',
                  borderRadius: '9999px',
                }}>
                  {b.tag}
                </span>
              </div>

              {/* Hint: path for real photo */}
              <div style={{
                position: 'absolute',
                bottom: '1rem',
                right: '1rem',
                fontFamily: 'var(--font-body)',
                fontSize: '0.55rem',
                color: 'rgba(255,255,255,0.2)',
                letterSpacing: '0.05em',
              }}>
                foto: {b.imagePath}
              </div>
            </div>

            {/* Info */}
            <div style={{
              padding: '1.25rem 1.5rem 1.75rem',
              background: 'var(--mob-card)',
              borderTop: '1px solid var(--mob-border)',
            }}>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)',
                color: 'var(--mob-text)',
                letterSpacing: '0.02em',
                lineHeight: 1,
                marginBottom: '0.5rem',
              }}>
                {b.name}
              </h3>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.75rem',
                color: 'var(--mob-muted)',
                lineHeight: 1.5,
                marginBottom: '1rem',
              }}>
                {b.desc}
              </p>
              <a
                href="#pedido"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.95rem',
                  letterSpacing: '0.06em',
                  color: 'var(--mob-fire)',
                }}
              >
                Pedir agora →
              </a>
            </div>
          </div>
        ))}

        <div style={{ minWidth: 'clamp(2rem, 5vw, 5rem)', flexShrink: 0 }} />
      </div>
    </section>
  )
}
