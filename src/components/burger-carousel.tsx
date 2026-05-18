'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BurgerModal, type BurgerDetail } from './burger-modal'

gsap.registerPlugin(ScrollTrigger)

/* ─── Menu data ──────────────────────────────────────────────── */
const BURGERS: (BurgerDetail & { id: number; image: string })[] = [
  {
    id: 1, name: 'MC Simples', tag: 'CLÁSSICO', price: 'R$ 22,90',
    ingredients: ['Pão Brioche', 'Maionese artesanal', '2 fatias de queijo mussarela', '110g de hambúrguer bovino'],
    bg: ['#3B1F05', '#1C0C02'], accent: '#FF8C2A',
    image: '/burgers/mc-simples.jpg',
  },
  {
    id: 2, name: 'X Bacon', tag: '🔥 MAIS PEDIDO', price: 'R$ 28,90',
    ingredients: ['Pão Brioche', '2 tiras de bacon crocante', '110g de hambúrguer bovino', '2 fatias de cheddar'],
    bg: ['#3B0E05', '#1C0502'], accent: '#FF4500',
    image: '/burgers/x-bacon.jpg',
  },
  {
    id: 3, name: 'X Bacon Egg', tag: 'ESPECIAL', price: 'R$ 31,90',
    ingredients: ['Pão Brioche', '2 tiras de bacon crocante', '110g de hambúrguer bovino', '2 fatias de cheddar', 'Ovo caipira'],
    bg: ['#38280A', '#1A1203'], accent: '#FFB020',
    image: '/burgers/x-bacon-egg.jpg',
  },
  {
    id: 4, name: 'Duplo BBQ', tag: 'PREMIUM', price: 'R$ 39,90',
    ingredients: ['Pão Brioche', 'Molho BBQ defumado', 'Cebola roxa caramelizada', '2 tiras de bacon', 'Queijo cheddar', '110g de hambúrguer bovino', 'Queijo cheddar', '110g de hambúrguer bovino'],
    bg: ['#280F02', '#0F0601'], accent: '#CC3800',
    image: '/burgers/duplo-bbq.jpg',
  },
  {
    id: 5, name: 'MC Salad', tag: 'LEVE', price: 'R$ 26,90',
    ingredients: ['Pão Brioche', 'Molho especial da casa', 'Queijo mussarela', 'Alface americana', 'Tomate fresco', 'Cebola', '110g de hambúrguer bovino'],
    bg: ['#0E2808', '#060F03'], accent: '#4CAF50',
    image: '/burgers/mc-salad.jpg',
  },
  {
    id: 6, name: 'Frango Simples', tag: 'FRANGO', price: 'R$ 23,90',
    ingredients: ['Pão Brioche', '2 fatias de queijo mussarela', 'Filé de frango grelhado'],
    bg: ['#2A2008', '#120E03'], accent: '#F0A020',
    image: '/burgers/frango-simples.jpg',
  },
  {
    id: 7, name: 'Frango Bacon', tag: 'FRANGO', price: 'R$ 29,90',
    ingredients: ['Pão Brioche', '2 fatias de queijo cheddar', 'Alface americana', 'Tomate fresco', 'Cebola', 'Filé de frango grelhado', 'Bacon crocante'],
    bg: ['#2A1205', '#120802'], accent: '#E05010',
    image: '/burgers/frango-bacon.jpg',
  },
  {
    id: 8, name: 'Frango Empanado', tag: '🍗 CROCANTE', price: 'R$ 27,90',
    ingredients: ['Pão Brioche', 'Filé de frango empanado e frito', 'Queijo mussarela ou cheddar', 'Alface americana', 'Tomate fresco', 'Molho da casa'],
    bg: ['#1E1600', '#0E0A00'], accent: '#D4900A',
    image: '/burgers/frango-empanado.jpg',
  },
]

const COMBOS: (BurgerDetail & { id: string })[] = [
  {
    id: 'c1', name: 'Combo Bacon', tag: 'COMBO', price: 'R$ 39,90',
    ingredients: ['X Bacon', 'Batata frita pequena', 'Refri 200ml'],
    bg: ['#2A0E05', '#110502'], accent: '#FF4500',
  },
  {
    id: 'c2', name: 'Combo Frango', tag: 'COMBO', price: 'R$ 37,90',
    ingredients: ['Frango Empanado', 'Batata frita pequena', 'Brownie'],
    bg: ['#1E1600', '#0E0A00'], accent: '#D4900A',
  },
  {
    id: 'c3', name: 'Par Perfeito', tag: '💑 DUO', price: 'R$ 59,90',
    ingredients: ['2x MC Salad', 'Batata frita média', '2x Coca-Cola 200ml'],
    bg: ['#0A1A24', '#030A10'], accent: '#2196F3',
  },
]

/* ─── Card ───────────────────────────────────────────────────── */
function Card({
  burger,
  onOpen,
}: {
  burger: BurgerDetail & { image?: string }
  onOpen: (b: BurgerDetail) => void
}) {
  const [imgFailed, setImgFailed] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleEnter = () => { const el = cardRef.current?.querySelector('.c-inner'); if (el) gsap.to(el, { scale: 1.04, duration: 0.45, ease: 'power2.out' }) }
  const handleLeave = () => { const el = cardRef.current?.querySelector('.c-inner'); if (el) gsap.to(el, { scale: 1,    duration: 0.45, ease: 'power2.out' }) }

  return (
    <div
      ref={cardRef}
      className="burger-card"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={() => onOpen(burger)}
      style={{
        minWidth: 'clamp(260px, 25vw, 340px)',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        borderRight: '1px solid var(--mob-border)',
        overflow: 'hidden',
        cursor: 'pointer',
      }}
    >
      {/* Visual area */}
      <div style={{
        flex: 1, position: 'relative', overflow: 'hidden',
        background: `linear-gradient(160deg, ${burger.bg[0]} 0%, ${burger.bg[1]} 100%)`,
      }}>
        <div className="c-inner" style={{ position: 'absolute', inset: 0, transformOrigin: 'center' }}>
          {burger.image && !imgFailed && (
            <Image
              src={burger.image} alt={burger.name} fill sizes="340px"
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              unoptimized onError={() => setImgFailed(true)}
            />
          )}
          {(imgFailed || !burger.image) && (
            <>
              <div style={{
                position: 'absolute', width: '70%', height: '70%',
                borderRadius: '50%', top: '15%', left: '15%',
                background: `radial-gradient(circle, ${burger.accent}30 0%, transparent 70%)`,
                filter: 'blur(28px)',
              }} />
              <div style={{
                position: 'absolute', inset: 0,
                background: `linear-gradient(125deg, ${burger.accent}12 0%, transparent 50%, rgba(0,0,0,0.3) 100%)`,
              }} />
              <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontSize: 'clamp(4.5rem, 7vw, 7rem)', lineHeight: 1,
                  filter: `drop-shadow(0 0 24px ${burger.accent}80)`, opacity: 0.9 }}>
                  {burger.name.includes('Frango') ? '🍗' : burger.tag.includes('COMBO') ? '🍟' : '🍔'}
                </span>
              </div>
            </>
          )}
        </div>

        <div style={{
          position: 'absolute', inset: 0, zIndex: 2,
          background: 'linear-gradient(to bottom, transparent 40%, rgba(8,7,11,0.9) 100%)',
          pointerEvents: 'none',
        }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: burger.accent, zIndex: 3, opacity: 0.85 }} />
        <div style={{ position: 'absolute', top: '1rem', left: '1.25rem', zIndex: 4 }}>
          <span style={{
            fontFamily: 'var(--font-body)', fontSize: '0.58rem',
            letterSpacing: '0.18em', textTransform: 'uppercase',
            background: burger.accent, color: '#fff',
            padding: '0.22rem 0.65rem', borderRadius: '9999px',
          }}>
            {burger.tag}
          </span>
        </div>

        {/* Click hint */}
        <div style={{
          position: 'absolute', bottom: '4.5rem', right: '1.25rem', zIndex: 4,
          fontFamily: 'var(--font-body)', fontSize: '0.58rem',
          letterSpacing: '0.12em', color: 'rgba(255,255,255,0.45)',
          textTransform: 'uppercase',
        }}>
          Ver ingredientes ↑
        </div>
      </div>

      {/* Info */}
      <div style={{
        padding: '1.1rem 1.4rem 1.6rem',
        background: 'var(--mob-card)',
        borderTop: `2px solid ${burger.accent}50`,
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.35rem' }}>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.5rem, 2.2vw, 2rem)',
            color: 'var(--mob-text)', letterSpacing: '0.02em',
            lineHeight: 1,
          }}>
            {burger.name}
          </h3>
          {burger.price && (
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.2rem, 1.8vw, 1.6rem)',
              color: burger.accent,
              lineHeight: 1,
              flexShrink: 0,
            }}>
              {burger.price}
            </span>
          )}
        </div>
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: '0.7rem',
          color: 'var(--mob-muted)',
        }}>
          {burger.ingredients.length} ingredientes · toque para ver
        </p>
      </div>
    </div>
  )
}

/* ─── Separator label ────────────────────────────────────────── */
function SectionLabel({ label }: { label: string }) {
  return (
    <div style={{
      minWidth: 'clamp(120px, 12vw, 180px)',
      height: '100vh',
      display: 'flex', flexShrink: 0,
      alignItems: 'center', justifyContent: 'center',
      borderRight: '1px solid var(--mob-border)',
      background: 'var(--mob-black)',
    }}>
      <p style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(1rem, 2vw, 1.4rem)',
        color: 'var(--mob-fire)', letterSpacing: '0.25em',
        writingMode: 'vertical-rl', textOrientation: 'mixed',
        transform: 'rotate(180deg)',
      }}>
        {label}
      </p>
    </div>
  )
}

/* ─── Main carousel ──────────────────────────────────────────── */
export function BurgerCarousel() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef   = useRef<HTMLDivElement>(null)
  const titleRef   = useRef<HTMLDivElement>(null)
  const [selected, setSelected] = useState<BurgerDetail | null>(null)

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
          pin: true, scrub: 0.8,
          invalidateOnRefresh: true,
          end: () => '+=' + getDistance(),
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <>
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
              Toque em qualquer burger<br />para ver os ingredientes ↗
            </p>
          </div>

          {/* Burger cards */}
          {BURGERS.map((b) => (
            <Card key={b.id} burger={b} onOpen={setSelected} />
          ))}

          {/* Combos separator + cards */}
          <SectionLabel label="COMBOS" />
          {COMBOS.map((c) => (
            <Card key={c.id} burger={c} onOpen={setSelected} />
          ))}

          {/* End CTA */}
          <div style={{
            minWidth: 'clamp(300px, 32vw, 440px)',
            height: '100vh',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            flexShrink: 0, padding: '3rem',
            background: 'var(--mob-black)',
            borderLeft: '1px solid var(--mob-border)',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1.5rem',
              filter: 'drop-shadow(0 0 20px rgba(255,69,0,0.4))' }}>🍔</div>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: '0.65rem',
              letterSpacing: '0.25em', color: 'var(--mob-fire)',
              textTransform: 'uppercase', marginBottom: '1.25rem',
            }}>
              Pronto para pedir?
            </p>
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.8rem, 5.5vw, 5rem)',
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
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'scale(1.04)'
              ;(e.currentTarget as HTMLElement).style.boxShadow = '0 0 24px rgba(255,69,0,0.5)'
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'scale(1)'
              ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
            }}
            >
              Fazer Pedido
            </a>
          </div>

        </div>
      </section>

      {/* Modal — fora da section para não ser afetado pelo pin do GSAP */}
      <BurgerModal burger={selected} onClose={() => setSelected(null)} />
    </>
  )
}
