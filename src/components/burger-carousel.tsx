'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const BURGERS = [
  {
    id: 1,
    name: 'MC Simples',
    desc: 'Pão brioche · maionese · 2 fatias de mussarela · 110g de hambúrguer',
    tag: 'CLÁSSICO',
    bg: 'linear-gradient(160deg, #3d2200 0%, #1a0d00 50%, #0a0805 100%)',
    image: '/burgers/mc-simples.jpg',
  },
  {
    id: 2,
    name: 'X Bacon',
    desc: 'Pão brioche · 2 tiras de bacon · 110g de hambúrguer · 2 fatias de cheddar',
    tag: '🔥 MAIS PEDIDO',
    bg: 'linear-gradient(160deg, #3d0e00 0%, #1a0500 50%, #0a0805 100%)',
    image: '/burgers/x-bacon.jpg',
  },
  {
    id: 3,
    name: 'X Bacon Egg',
    desc: 'Pão brioche · 2 tiras de bacon · cheddar · ovo caipira · 110g de hambúrguer',
    tag: 'ESPECIAL',
    bg: 'linear-gradient(160deg, #3a2d00 0%, #1a1500 50%, #0a0805 100%)',
    image: '/burgers/x-bacon-egg.jpg',
  },
  {
    id: 4,
    name: 'Duplo BBQ',
    desc: 'Pão brioche · molho BBQ · cebola caramelizada · 2 bacons · cheddar duplo · 220g',
    tag: 'PREMIUM',
    bg: 'linear-gradient(160deg, #2d1200 0%, #150800 50%, #0a0805 100%)',
    image: '/burgers/duplo-bbq.jpg',
  },
  {
    id: 5,
    name: 'MC Salad',
    desc: 'Pão brioche · molho especial · queijo · alface · tomate · cebola · 110g',
    tag: 'LEVE',
    bg: 'linear-gradient(160deg, #0e2d00 0%, #071500 50%, #0a0805 100%)',
    image: '/burgers/mc-salad.jpg',
  },
  {
    id: 6,
    name: 'Frango Simples',
    desc: 'Pão brioche · 2 fatias de mussarela · filé de frango grelhado',
    tag: 'FRANGO',
    bg: 'linear-gradient(160deg, #2d2200 0%, #151000 50%, #0a0805 100%)',
    image: '/burgers/frango-simples.jpg',
  },
  {
    id: 7,
    name: 'Frango Bacon',
    desc: 'Pão brioche · cheddar · alface · tomate · cebola · frango grelhado com bacon',
    tag: 'FRANGO',
    bg: 'linear-gradient(160deg, #2d1500 0%, #150a00 50%, #0a0805 100%)',
    image: '/burgers/frango-bacon.jpg',
  },
  {
    id: 8,
    name: 'Frango Empanado',
    desc: 'Pão brioche · filé empanado e frito · queijo · alface · tomate · molho da casa',
    tag: '🍗 CROCANTE',
    bg: 'linear-gradient(160deg, #251a00 0%, #120d00 50%, #0a0805 100%)',
    image: '/burgers/frango-empanado.jpg',
  },
]

function BurgerCard({ b }: { b: typeof BURGERS[0] }) {
  const [imgFailed, setImgFailed] = useState(false)

  return (
    <div
      className="burger-card"
      style={{
        minWidth: 'clamp(280px, 26vw, 360px)',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        borderRight: '1px solid var(--mob-border)',
        overflow: 'hidden',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => gsap.to(e.currentTarget.querySelector('.card-inner'), { scale: 1.03, duration: 0.5, ease: 'power2.out' })}
      onMouseLeave={(e) => gsap.to(e.currentTarget.querySelector('.card-inner'), { scale: 1, duration: 0.5, ease: 'power2.out' })}
    >
      {/* Visual */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden', background: b.bg }}>
        <div className="card-inner" style={{ position: 'absolute', inset: 0, transformOrigin: 'center' }}>
          {!imgFailed && (
            <Image
              src={b.image}
              alt={b.name}
              fill
              sizes="360px"
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              unoptimized
              onError={() => setImgFailed(true)}
            />
          )}
        </div>

        {/* Bottom gradient */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 2,
          background: 'linear-gradient(to bottom, transparent 45%, rgba(8,7,11,0.92) 100%)',
        }} />

        {/* Tag */}
        <div style={{ position: 'absolute', top: '1rem', left: '1.25rem', zIndex: 3 }}>
          <span style={{
            fontFamily: 'var(--font-body)', fontSize: '0.6rem',
            letterSpacing: '0.18em', textTransform: 'uppercase',
            background: 'var(--mob-fire)', color: '#fff',
            padding: '0.25rem 0.7rem', borderRadius: '9999px',
          }}>
            {b.tag}
          </span>
        </div>
      </div>

      {/* Info */}
      <div style={{
        padding: '1.25rem 1.5rem 1.75rem',
        background: 'var(--mob-card)',
        borderTop: '1px solid var(--mob-border)',
        flexShrink: 0,
      }}>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)',
          color: 'var(--mob-text)', letterSpacing: '0.02em',
          lineHeight: 1, marginBottom: '0.5rem',
        }}>
          {b.name}
        </h3>
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: '0.75rem',
          color: 'var(--mob-muted)', lineHeight: 1.5, marginBottom: '1rem',
        }}>
          {b.desc}
        </p>
        <a href="#pedido" style={{
          fontFamily: 'var(--font-display)', fontSize: '0.95rem',
          letterSpacing: '0.06em', color: 'var(--mob-fire)',
        }}>
          Pedir agora →
        </a>
      </div>
    </div>
  )
}

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
      <div ref={trackRef} style={{ display: 'flex', alignItems: 'stretch', willChange: 'transform' }}>

        {/* Title card */}
        <div ref={titleRef} style={{
          minWidth: 'clamp(280px, 28vw, 420px)',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: 'clamp(2rem, 5vw, 5rem) clamp(2rem, 6vw, 6rem)',
          borderRight: '1px solid var(--mob-border)', flexShrink: 0,
        }}>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: '0.7rem',
            letterSpacing: '0.22em', color: 'var(--mob-fire)',
            textTransform: 'uppercase', marginBottom: '1rem',
          }}>
            Nosso Cardápio
          </p>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3.5rem, 7vw, 7rem)',
            color: 'var(--mob-text)', lineHeight: 0.9, letterSpacing: '-0.01em',
          }}>
            FEITO<br />
            <span style={{ color: 'var(--mob-fire)' }}>PRA</span><br />
            VOCÊ
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: '0.82rem',
            color: 'var(--mob-muted)', marginTop: '1.5rem', lineHeight: 1.6,
          }}>
            Role para explorar<br />todos os burgers ↗
          </p>
        </div>

        {/* Burger cards */}
        {BURGERS.map((b) => <BurgerCard key={b.id} b={b} />)}

        {/* End card — CTA que preenche o espaço restante */}
        <div style={{
          minWidth: 'clamp(320px, 35vw, 480px)',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          padding: '3rem',
          background: 'var(--mob-black)',
          borderLeft: '1px solid var(--mob-border)',
          textAlign: 'center',
        }}>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: '0.65rem',
            letterSpacing: '0.25em', color: 'var(--mob-fire)',
            textTransform: 'uppercase', marginBottom: '1.5rem',
          }}>
            Pronto para pedir?
          </p>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3rem, 6vw, 5.5rem)',
            color: 'var(--mob-text)', lineHeight: 0.9,
            letterSpacing: '-0.01em', marginBottom: '2rem',
          }}>
            ESCOLHEU?<br />
            <span style={{ color: 'var(--mob-fire)' }}>AGORA<br />PEDE.</span>
          </h3>
          <a href="#pedido" style={{
            fontFamily: 'var(--font-display)', fontSize: '1.1rem',
            letterSpacing: '0.06em', background: 'var(--mob-fire)',
            color: '#fff', padding: '0.85rem 2.2rem',
            borderRadius: '9999px', display: 'inline-block',
          }}>
            Fazer Pedido
          </a>
        </div>

      </div>
    </section>
  )
}
