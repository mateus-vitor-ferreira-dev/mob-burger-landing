'use client'

import { forwardRef, useLayoutEffect, useRef, useState } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BurgerModal, type BurgerDetail } from './burger-modal'

gsap.registerPlugin(ScrollTrigger)

/* ─── Menu data ──────────────────────────────────────────────── */

const BURGERS: (BurgerDetail & { id: number; image: string })[] = [
  {
    id: 1, name: 'Mob Classic', tag: 'BEST SELLER', price: 'R$ 22,90',
    ingredients: ['Pão Brioche', 'Blend bovino 110g', 'Mussarela/Cheddar', 'Molho especial da casa'],
    bg: ['#3B1F05', '#1C0C02'], accent: '#FF8C2A',
    image: '/burgers/mob-classic.png',
  },
  {
    id: 2, name: 'Mob Bacon', tag: 'CLÁSSICO', price: 'R$ 27,90',
    ingredients: ['Pão Brioche', 'Blend bovino 110g', 'Bacon defumado crocante em tiras', 'Dupla fatia mussarela/cheddar', 'Molho especial da casa'],
    bg: ['#3B0E05', '#1C0502'], accent: '#FF4500',
    image: '/burgers/mob-bacon.png',
  },
  {
    id: 3, name: 'Mob Godfather', tag: 'PREMIUM', price: 'R$ 39,90',
    ingredients: ['Pão Brioche', 'Duplo blend 110g', 'Bacon defumado crocante em tiras', 'Ovo frito', 'Dupla fatia mussarela/cheddar', 'Molho especial'],
    bg: ['#2A0000', '#110000'], accent: '#CC0000',
    image: '/burgers/mob-godfather.png',
  },
  {
    id: 4, name: 'Mob Sunrise', tag: 'ESPECIAL', price: 'R$ 26,90',
    ingredients: ['Pão Brioche', 'Blend bovino 110g', 'Ovo frito', 'Presunto', 'Mussarela/Cheddar', 'Molho especial'],
    bg: ['#38280A', '#1A1203'], accent: '#FFB020',
    image: '/burgers/mob-sunrise.png',
  },
  {
    id: 5, name: 'Mob Duplo Bacon BBQ', tag: '🔥 DUPLO BBQ', price: 'R$ 37,90',
    ingredients: ['Pão Brioche', 'Duplo blend 110g', 'Bacon defumado crocante em tiras', 'Duplo mussarela/cheddar', 'Molho BBQ'],
    bg: ['#2E1500', '#140A00'], accent: '#FF6B35',
    image: '/burgers/mob-chaos.png',
  },
  {
    id: 6, name: 'Mob Salad', tag: 'LEVE', price: 'R$ 26,90',
    ingredients: ['Pão Brioche', 'Blend bovino 110g', 'Duplo mussarela/cheddar', 'Alface', 'Tomate', 'Molho da casa'],
    bg: ['#0E2808', '#060F03'], accent: '#4CAF50',
    image: '/burgers/mob-deli.png',
  },
  {
    id: 7, name: 'Mob Italian', tag: 'ITALIANO', price: 'R$ 27,90',
    ingredients: ['Pão Brioche', 'Blend bovino 110g', 'Mussarela/Cheddar', 'Presunto', 'Molho especial'],
    bg: ['#2A1A00', '#120C00'], accent: '#D4A520',
    image: '/burgers/mob-italian.png',
  },
  {
    id: 8, name: 'Mob Brunch', tag: 'BRUNCH', price: 'R$ 29,90',
    ingredients: ['Pão Brioche', 'Blend bovino 110g', 'Ovo frito', 'Presunto', 'Duplo mussarela/cheddar', 'Molho especial'],
    bg: ['#2A2008', '#120E03'], accent: '#F0C040',
    image: '/burgers/mob-brunch.png',
  },
  {
    id: 9, name: 'Mob King', tag: '👑 KING', price: 'R$ 39,90',
    ingredients: ['Pão Brioche', 'Duplo blend 110g', 'Ovo frito', 'Bacon defumado crocante em tiras', 'Dupla fatia mussarela/cheddar', 'Molho especial', 'Alface'],
    bg: ['#1A1200', '#0A0800'], accent: '#D4AF37',
    image: '/burgers/mob-king.png',
  },
  {
    id: 10, name: 'Mob Street', tag: 'STREET', price: 'R$ 24,90',
    ingredients: ['Pão Brioche', 'Blend bovino 110g', 'Mussarela/Cheddar', 'Alface', 'Tomate', 'Molho especial'],
    bg: ['#2A1005', '#120700'], accent: '#FF7F50',
    image: '/burgers/mob-street.png',
  },
  {
    id: 11, name: 'Mob Beast', tag: '⚡ BEAST', price: 'R$ 44,90',
    ingredients: ['Pão Brioche', 'Duplo blend 110g', 'Bacon defumado crocante em tiras', 'Ovo frito', 'Dupla fatia mussarela/cheddar', 'Presunto', 'Alface', 'Tomate', 'Molho especial'],
    bg: ['#1A0000', '#0A0000'], accent: '#8B0000',
    image: '/burgers/mob-beast.png',
  },
  {
    id: 12, name: 'Mob Joker', tag: 'IMPREVISÍVEL', price: 'R$ 27,90',
    ingredients: ['Pão Brioche', 'Blend bovino 110g', 'Bacon defumado crocante em tiras', 'Mussarela/Cheddar', 'Alface', 'Molho especial'],
    bg: ['#1A0828', '#0A0312'], accent: '#9B59B6',
    image: '/burgers/mob-joker.png',
  },
  {
    id: 13, name: 'Mob Original', tag: 'ORIGINAL', price: 'R$ 26,00',
    ingredients: ['Pão Brioche', 'Blend bovino 110g', 'Bacon', 'Mussarela/Cheddar', 'Alface', 'Tomate', 'Molho especial'],
    bg: ['#2A1805', '#120B02'], accent: '#E67E22',
    image: '/burgers/mob-original.png',
  },
  {
    id: 14, name: 'Mob Full', tag: '🏆 FULL', price: 'R$ 48,00',
    ingredients: ['Pão Brioche', 'Duplo blend 110g', 'Bacon', 'Ovo frito', 'Presunto', 'Mussarela/Cheddar', 'Alface', 'Tomate', 'Molho especial'],
    bg: ['#280000', '#0F0000'], accent: '#C0392B',
    image: '/burgers/mob-full.png',
  },
]

const CHICKEN: (BurgerDetail & { id: string; image: string })[] = [
  {
    id: 'ch1', name: 'Mob Chicken', tag: 'FRANGO', price: 'R$ 27,00',
    ingredients: ['Pão Brioche', 'Frango grelhado na chapa', 'Mussarela/Cheddar', 'Alface', 'Tomate', 'Molho especial'],
    bg: ['#2A2008', '#120E03'], accent: '#F4D03F',
    image: '/burgers/mob-chicken.png',
  },
  {
    id: 'ch2', name: 'Mob Chicken Bacon', tag: 'FRANGO', price: 'R$ 32,00',
    ingredients: ['Pão Brioche', 'Frango grelhado', 'Bacon crocante', 'Mussarela/Cheddar', 'Alface'],
    bg: ['#2A1205', '#120802'], accent: '#E67E22',
    image: '/burgers/mob-chicken-bacon.png',
  },
  {
    id: 'ch3', name: 'Mob Chicken Sunrise', tag: 'FRANGO', price: 'R$ 31,00',
    ingredients: ['Pão Brioche', 'Frango grelhado', 'Ovo frito', 'Presunto', 'Mussarela/Cheddar', 'Molho especial'],
    bg: ['#2A1A00', '#120C00'], accent: '#F0A030',
    image: '/burgers/mob-chicken-sunrise.png',
  },
  {
    id: 'ch4', name: 'Mob Chicken Full', tag: 'FULL', price: 'R$ 40,00',
    ingredients: ['Pão Brioche', 'Frango grelhado', 'Bacon', 'Ovo frito', 'Presunto', 'Mussarela/Cheddar', 'Alface', 'Tomate', 'Molho especial'],
    bg: ['#1E1600', '#0E0A00'], accent: '#D4900A',
    image: '/burgers/mob-chicken-full.png',
  },
]

const COMBOS: (BurgerDetail & { id: string; image: string; imageFit: 'cover' | 'contain' })[] = [
  {
    id: 'k1', name: 'Combo Clássico', tag: 'COMBO', price: 'R$ 38,00',
    ingredients: ['Mob Classic', 'Bebida lata'],
    bg: ['#2A0E05', '#110502'], accent: '#FF4500',
    image: '/burgers/combo-mob-combo-classico.png', imageFit: 'contain',
  },
  {
    id: 'k2', name: 'Combo Premium', tag: 'COMBO', price: 'A partir R$ 55',
    ingredients: ['Qualquer burger (B-01 a B-12)', 'Bebida lata', '1 Sobremesa'],
    bg: ['#1A0000', '#0A0000'], accent: '#CC0000',
    image: '/burgers/combo-mob-combo-premium.png', imageFit: 'contain',
  },
  {
    id: 'k3', name: 'Combo Sweet', tag: 'COMBO', price: 'R$ 44,00',
    ingredients: ['Mob Original', 'Bebida lata', '1 Cookie'],
    bg: ['#2A1800', '#120C00'], accent: '#E67E22',
    image: '/burgers/combo-mob-combo-sweet.png', imageFit: 'contain',
  },
  {
    id: 'k4', name: 'Mob Para 2', tag: '💑 DUO', price: 'A partir R$ 78',
    ingredients: ['2 Burgers à escolha', '2 Bebidas lata', '1 Sobremesa compartilhada'],
    bg: ['#0A1A24', '#030A10'], accent: '#2196F3',
    image: '/burgers/combo-mob-para-2.png', imageFit: 'contain',
  },
  {
    id: 'k5', name: 'Mob Família', tag: 'FAMÍLIA', price: 'A partir R$ 148',
    ingredients: ['4 Burgers à escolha', '4 Bebidas lata', '2 Sobremesas'],
    bg: ['#0A2410', '#030F08'], accent: '#4CAF50',
    image: '/burgers/combo-mob-familia.png', imageFit: 'contain',
  },
]

const SOBREMESAS: (BurgerDetail & { id: string; image: string; imageFit: 'cover' | 'contain' })[] = [
  {
    id: 's1', name: 'Mob Bombom de Morango', tag: '🍓 SOBREMESA', price: 'R$ 8,00',
    ingredients: ['Bombom artesanal de morango'],
    bg: ['#280A15', '#100408'], accent: '#E91E63',
    image: '/burgers/sobremesa-mob-bombom-de-morango.png', imageFit: 'contain',
  },
  {
    id: 's2', name: 'Mob Brownie', tag: '🍫 SOBREMESA', price: 'R$ 12,00',
    ingredients: ['Ninho', 'Nutella', 'Bis', 'KitKat', 'Confete'],
    bg: ['#1A0800', '#0A0300'], accent: '#A0522D',
    image: '/burgers/sobremesa-mob-brownie.png', imageFit: 'contain',
  },
  {
    id: 's3', name: 'Mob Cookie', tag: '🍪 SOBREMESA', price: 'R$ 7,00',
    ingredients: ['Cookie clássico artesanal'],
    bg: ['#2A1600', '#120A00'], accent: '#CD853F',
    image: '/burgers/sobremesa-mob-cookie.png', imageFit: 'contain',
  },
  {
    id: 's4', name: 'Mob Cookie Nutella', tag: '🍪 SOBREMESA', price: 'R$ 10,00',
    ingredients: ['Cookie artesanal', 'Recheado com Nutella'],
    bg: ['#2A1000', '#120700'], accent: '#D2691E',
    image: '/burgers/sobremesa-mob-cookie-nutella.png', imageFit: 'contain',
  },
]

// All card items in order for ref tracking
const ALL_CARDS = [
  ...BURGERS.map((b) => ({ ...b, id: String(b.id) })),
  ...CHICKEN,
  ...COMBOS,
  ...SOBREMESAS,
] as (BurgerDetail & { id: string; image?: string })[]

/* ─── Card ───────────────────────────────────────────────────── */
const Card = forwardRef<
  HTMLDivElement,
  { burger: BurgerDetail & { image?: string; imageFit?: 'cover' | 'contain' }; onOpen: (b: BurgerDetail) => void }
>(function Card({ burger, onOpen }, forwardedRef) {
  const [imgFailed, setImgFailed] = useState(false)
  const hoverRef  = useRef<HTMLDivElement>(null)
  const panelRef  = useRef<HTMLDivElement>(null)
  const isTouch   = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)

  const setRef = (el: HTMLDivElement | null) => {
    (hoverRef as React.MutableRefObject<HTMLDivElement | null>).current = el
    if (typeof forwardedRef === 'function') forwardedRef(el)
    else if (forwardedRef)
      (forwardedRef as React.MutableRefObject<HTMLDivElement | null>).current = el
  }

  const handleEnter = () => {
    const inner = hoverRef.current?.querySelector('.c-inner')
    if (inner) gsap.to(inner, { scale: 1.04, duration: 0.45, ease: 'power2.out' })
    if (!isTouch && panelRef.current)
      gsap.to(panelRef.current, { y: '0%', duration: 0.4, ease: 'power3.out' })
  }
  const handleLeave = () => {
    const inner = hoverRef.current?.querySelector('.c-inner')
    if (inner) gsap.to(inner, { scale: 1, duration: 0.45, ease: 'power2.out' })
    if (!isTouch && panelRef.current)
      gsap.to(panelRef.current, { y: '105%', duration: 0.35, ease: 'power2.in' })
  }

  return (
    <div
      ref={setRef}
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
        <div className="c-inner" style={{ position: 'absolute', inset: 0, transformOrigin: 'center', background: '#08070B' }}>
          {burger.image && !imgFailed && (
            <Image
              src={burger.image} alt={burger.name} fill sizes="340px"
              style={{
                objectFit: 'contain',
                objectPosition: 'center',
                padding: burger.imageFit === 'contain' ? '1.25rem' : '0.5rem',
              }}
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
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 'clamp(4.5rem, 7vw, 7rem)', lineHeight: 1,
                  filter: `drop-shadow(0 0 24px ${burger.accent}80)`, opacity: 0.9 }}>
                  {burger.name.toLowerCase().includes('chicken') ? '🍗' : burger.tag.includes('COMBO') ? '🍟' : '🍔'}
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

        {/* Tags flutuantes — 3 ingredientes principais, sempre visíveis */}
        <div style={{
          position: 'absolute', bottom: '1.75rem',
          left: '1rem', right: '1rem',
          zIndex: 5, display: 'flex', flexWrap: 'wrap', gap: '0.3rem',
          pointerEvents: 'none',
        }}>
          {burger.ingredients.slice(0, 3).map((ing) => (
            <span key={ing} style={{
              fontFamily: 'var(--font-body)', fontSize: '0.5rem',
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.85)',
              background: 'rgba(8,7,11,0.6)',
              border: `1px solid ${burger.accent}55`,
              padding: '0.2rem 0.55rem', borderRadius: '9999px',
              backdropFilter: 'blur(6px)',
              whiteSpace: 'nowrap',
            }}>
              {ing}
            </span>
          ))}
          {burger.ingredients.length > 3 && (
            <span style={{
              fontFamily: 'var(--font-body)', fontSize: '0.5rem',
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: burger.accent,
              background: 'rgba(8,7,11,0.6)',
              border: `1px solid ${burger.accent}55`,
              padding: '0.2rem 0.55rem', borderRadius: '9999px',
              backdropFilter: 'blur(6px)',
            }}>
              +{burger.ingredients.length - 3}
            </span>
          )}
        </div>

        {/* Painel hover — lista completa, sobe no hover (desktop) */}
        <div
          ref={panelRef}
          style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            zIndex: 6,
            background: 'rgba(8,7,11,0.96)',
            backdropFilter: 'blur(10px)',
            borderTop: `2px solid ${burger.accent}60`,
            padding: '1.1rem 1.25rem 1.4rem',
            transform: 'translateY(105%)',
          }}
        >
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: '0.55rem',
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: burger.accent, marginBottom: '0.6rem',
          }}>
            Ingredientes
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.28rem' }}>
            {burger.ingredients.map((ing) => (
              <li key={ing} style={{
                fontFamily: 'var(--font-body)', fontSize: '0.72rem',
                color: 'rgba(255,255,255,0.82)',
                display: 'flex', alignItems: 'center', gap: '0.4rem',
              }}>
                <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: burger.accent, flexShrink: 0 }} />
                {ing}
              </li>
            ))}
          </ul>
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
            color: 'var(--mob-text)', letterSpacing: '0.02em', lineHeight: 1,
          }}>
            {burger.name}
          </h3>
          {burger.price && (
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.2rem, 1.8vw, 1.6rem)',
              color: burger.accent, lineHeight: 1, flexShrink: 0,
            }}>
              {burger.price}
            </span>
          )}
        </div>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: 'var(--mob-muted)' }}>
          {burger.ingredients.length} ingredientes · toque para ver
        </p>
      </div>
    </div>
  )
})

/* ─── Separator label ────────────────────────────────────────── */
function SectionLabel({ label, id }: { label: string; id?: string }) {
  return (
    <div id={id} className="carousel-section-label" style={{
      minWidth: 'clamp(120px, 12vw, 180px)',
      height: '100vh',
      display: 'flex', flexShrink: 0,
      alignItems: 'center', justifyContent: 'center',
      borderRight: '1px solid var(--mob-border)',
      background: 'transparent',
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
  const sectionRef   = useRef<HTMLElement>(null)
  const trackRef     = useRef<HTMLDivElement>(null)
  const titleRef     = useRef<HTMLDivElement>(null)
  const cardRefs     = useRef<(HTMLDivElement | null)[]>([])
  const activeIdxRef = useRef(0)
  const [activeIdx, setActiveIdx]   = useState(0)
  const [selected, setSelected]     = useState<BurgerDetail | null>(null)

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouch || window.innerWidth < 1280) return

    const ctx = gsap.context(() => {
      const track   = trackRef.current
      const section = sectionRef.current
      if (!track || !section) return

      gsap.from(titleRef.current, {
        opacity: 0, y: 40, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: section, start: 'top 80%' },
      })

      const getDistance = () => track.scrollWidth - window.innerWidth

      const updateActive = () => {
        const currentX = gsap.getProperty(track, 'x') as number
        const viewCenter = window.innerWidth / 2
        let closestIdx = 0
        let closestDist = Infinity
        cardRefs.current.forEach((el, i) => {
          if (!el) return
          const cardCenter = el.offsetLeft + el.offsetWidth / 2 + currentX
          const dist = Math.abs(cardCenter - viewCenter)
          if (dist < closestDist) {
            closestDist = dist
            closestIdx = i
          }
        })
        if (closestIdx !== activeIdxRef.current) {
          activeIdxRef.current = closestIdx
          setActiveIdx(closestIdx)
        }
      }

      gsap.to(track, {
        x: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true, scrub: 0.8,
          invalidateOnRefresh: true,
          end: () => '+=' + getDistance(),
          onUpdate: updateActive,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const activeBg = ALL_CARDS[activeIdx]

  return (
    <>
      <section
        ref={sectionRef}
        id="cardápio"
        style={{ position: 'relative', background: 'var(--mob-black)' }}
      >
        {/* ─ Background image layer ─ */}
        <div
          aria-hidden
          style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}
        >
          {ALL_CARDS.map((item, i) =>
            item.image ? (
              <div
                key={`bg-${item.id}`}
                style={{
                  position: 'absolute', inset: 0,
                  opacity: i === activeIdx ? 1 : 0,
                  transition: 'opacity 0.75s ease',
                }}
              >
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="100vw"
                  style={{ objectFit: 'cover', filter: 'brightness(0.28) saturate(1.4)' }}
                  unoptimized
                  priority={i === 0}
                />
                {/* Accent gradient overlay */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: `linear-gradient(135deg, ${item.bg[0]}bb 0%, ${item.bg[1]}88 100%)`,
                }} />
              </div>
            ) : null
          )}

          {/* Dark fallback for combo cards (no image) */}
          {activeBg && !activeBg.image && (
            <div style={{
              position: 'absolute', inset: 0,
              background: `linear-gradient(135deg, ${activeBg.bg[0]} 0%, ${activeBg.bg[1]} 100%)`,
              opacity: 0.6,
              transition: 'opacity 0.75s ease',
            }} />
          )}
        </div>

        {/* ─ Scrollable track ─ */}
        <div
          ref={trackRef}
          style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'stretch', willChange: 'transform' }}
        >
          {/* Title card */}
          <div ref={titleRef} className="carousel-title-card" style={{
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
              Deslize para explorar ↗
            </p>
          </div>

          {/* Smash Burger cards */}
          {BURGERS.map((b, i) => (
            <Card
              key={b.id}
              ref={(el) => { cardRefs.current[i] = el }}
              burger={b}
              onOpen={setSelected}
            />
          ))}

          {/* Chicken separator + cards */}
          <SectionLabel label="CHICKEN" />
          {CHICKEN.map((c, i) => (
            <Card
              key={c.id}
              ref={(el) => { cardRefs.current[BURGERS.length + i] = el }}
              burger={c}
              onOpen={setSelected}
            />
          ))}

          {/* Combos separator + cards */}
          <SectionLabel label="COMBOS" id="carousel-combos" />
          {COMBOS.map((c, i) => (
            <Card
              key={c.id}
              ref={(el) => { cardRefs.current[BURGERS.length + CHICKEN.length + i] = el }}
              burger={c}
              onOpen={setSelected}
            />
          ))}

          {/* Sobremesas separator + cards */}
          <SectionLabel label="SOBREMESAS" id="carousel-sobremesas" />
          {SOBREMESAS.map((s, i) => (
            <Card
              key={s.id}
              ref={(el) => { cardRefs.current[BURGERS.length + CHICKEN.length + COMBOS.length + i] = el }}
              burger={s}
              onOpen={setSelected}
            />
          ))}

          {/* End CTA */}
          <div style={{
            minWidth: 'clamp(300px, 32vw, 440px)',
            height: '100vh',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            flexShrink: 0, padding: '3rem',
            background: 'transparent',
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
            <a
              href="#pedido"
              style={{
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
