'use client'

import { forwardRef, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, ChevronLeft, ChevronRight, Drumstick, Hamburger } from 'lucide-react'
import { BurgerModal, type BurgerDetail } from './burger-modal'
import { hasFinePointer, PINNED_CAROUSEL_MQ, prefersReducedMotion } from '@/lib/motion'

gsap.registerPlugin(ScrollTrigger)

/* ─── Menu data ──────────────────────────────────────────────── */

const BURGERS: (BurgerDetail & { id: number; image: string })[] = [
  {
    id: 1, name: 'Mob Classic', tag: 'BEST SELLER', price: 'R$ 22,90',
    ingredients: ['Pão Brioche', 'Blend bovino 110g', 'Mussarela/Cheddar', 'Molho especial da casa'],
    bg: ['#3B1F05', '#1C0C02'], accent: '#FF8C2A',
    image: '/burgers/mob-classic.webp',
  },
  {
    id: 2, name: 'Mob Bacon', tag: 'CLÁSSICO', price: 'R$ 27,90',
    ingredients: ['Pão Brioche', 'Blend bovino 110g', 'Bacon defumado crocante em tiras', 'Dupla fatia mussarela/cheddar', 'Molho especial da casa'],
    bg: ['#3B0E05', '#1C0502'], accent: '#FF4500',
    image: '/burgers/mob-bacon.webp',
  },
  {
    id: 3, name: 'Mob Godfather', tag: 'PREMIUM', price: 'R$ 39,90',
    ingredients: ['Pão Brioche', 'Duplo blend 110g', 'Bacon defumado crocante em tiras', 'Ovo frito', 'Dupla fatia mussarela/cheddar', 'Molho especial'],
    bg: ['#2A0000', '#110000'], accent: '#CC0000',
    image: '/burgers/mob-godfather.webp',
  },
  {
    id: 4, name: 'Mob Sunrise', tag: 'ESPECIAL', price: 'R$ 26,90',
    ingredients: ['Pão Brioche', 'Blend bovino 110g', 'Ovo frito', 'Presunto', 'Mussarela/Cheddar', 'Molho especial'],
    bg: ['#38280A', '#1A1203'], accent: '#FFB020',
    image: '/burgers/mob-sunrise.webp',
  },
  {
    id: 5, name: 'Mob Duplo Bacon BBQ', tag: '🔥 DUPLO BBQ', price: 'R$ 37,90',
    ingredients: ['Pão Brioche', 'Duplo blend 110g', 'Bacon defumado crocante em tiras', 'Duplo mussarela/cheddar', 'Molho BBQ'],
    bg: ['#2E1500', '#140A00'], accent: '#FF6B35',
    image: '/burgers/mob-chaos.webp',
  },
  {
    id: 6, name: 'Mob Salad', tag: 'LEVE', price: 'R$ 26,90',
    ingredients: ['Pão Brioche', 'Blend bovino 110g', 'Duplo mussarela/cheddar', 'Alface', 'Tomate', 'Molho da casa'],
    bg: ['#0E2808', '#060F03'], accent: '#4CAF50',
    image: '/burgers/mob-deli.webp',
  },
  {
    id: 7, name: 'Mob Italian', tag: 'ITALIANO', price: 'R$ 27,90',
    ingredients: ['Pão Brioche', 'Blend bovino 110g', 'Mussarela/Cheddar', 'Presunto', 'Molho especial'],
    bg: ['#2A1A00', '#120C00'], accent: '#D4A520',
    image: '/burgers/mob-italian.webp',
  },
  {
    id: 8, name: 'Mob Brunch', tag: 'BRUNCH', price: 'R$ 29,90',
    ingredients: ['Pão Brioche', 'Blend bovino 110g', 'Ovo frito', 'Presunto', 'Duplo mussarela/cheddar', 'Molho especial'],
    bg: ['#2A2008', '#120E03'], accent: '#F0C040',
    image: '/burgers/mob-brunch.webp',
  },
  {
    id: 9, name: 'Mob King', tag: '👑 KING', price: 'R$ 39,90',
    ingredients: ['Pão Brioche', 'Duplo blend 110g', 'Ovo frito', 'Bacon defumado crocante em tiras', 'Dupla fatia mussarela/cheddar', 'Molho especial', 'Alface'],
    bg: ['#1A1200', '#0A0800'], accent: '#D4AF37',
    image: '/burgers/mob-king.webp',
  },
  {
    id: 10, name: 'Mob Street', tag: 'STREET', price: 'R$ 24,90',
    ingredients: ['Pão Brioche', 'Blend bovino 110g', 'Mussarela/Cheddar', 'Alface', 'Tomate', 'Molho especial'],
    bg: ['#2A1005', '#120700'], accent: '#FF7F50',
    image: '/burgers/mob-street.webp',
  },
  {
    id: 11, name: 'Mob Beast', tag: '⚡ BEAST', price: 'R$ 44,90',
    ingredients: ['Pão Brioche', 'Duplo blend 110g', 'Bacon defumado crocante em tiras', 'Ovo frito', 'Dupla fatia mussarela/cheddar', 'Presunto', 'Alface', 'Tomate', 'Molho especial'],
    bg: ['#1A0000', '#0A0000'], accent: '#8B0000',
    image: '/burgers/mob-beast.webp',
  },
  {
    id: 12, name: 'Mob Joker', tag: 'IMPREVISÍVEL', price: 'R$ 27,90',
    ingredients: ['Pão Brioche', 'Blend bovino 110g', 'Bacon defumado crocante em tiras', 'Mussarela/Cheddar', 'Alface', 'Molho especial'],
    bg: ['#1A0828', '#0A0312'], accent: '#9B59B6',
    image: '/burgers/mob-joker.webp',
  },
  {
    id: 13, name: 'Mob Original', tag: 'ORIGINAL', price: 'R$ 26,00',
    ingredients: ['Pão Brioche', 'Blend bovino 110g', 'Bacon', 'Mussarela/Cheddar', 'Alface', 'Tomate', 'Molho especial'],
    bg: ['#2A1805', '#120B02'], accent: '#E67E22',
    image: '/burgers/mob-original.webp',
  },
  {
    id: 14, name: 'Mob Full', tag: '🏆 FULL', price: 'R$ 48,00',
    ingredients: ['Pão Brioche', 'Duplo blend 110g', 'Bacon', 'Ovo frito', 'Presunto', 'Mussarela/Cheddar', 'Alface', 'Tomate', 'Molho especial'],
    bg: ['#280000', '#0F0000'], accent: '#C0392B',
    image: '/burgers/mob-full.webp',
  },
]

const CHICKEN: (BurgerDetail & { id: string; image: string })[] = [
  {
    id: 'ch1', name: 'Mob Chicken', tag: 'FRANGO', price: 'R$ 27,00',
    ingredients: ['Pão Brioche', 'Frango grelhado na chapa', 'Mussarela/Cheddar', 'Alface', 'Tomate', 'Molho especial'],
    bg: ['#2A2008', '#120E03'], accent: '#F4D03F',
    image: '/burgers/mob-chicken.webp',
  },
  {
    id: 'ch2', name: 'Mob Chicken Bacon', tag: 'FRANGO', price: 'R$ 32,00',
    ingredients: ['Pão Brioche', 'Frango grelhado', 'Bacon crocante', 'Mussarela/Cheddar', 'Alface'],
    bg: ['#2A1205', '#120802'], accent: '#E67E22',
    image: '/burgers/mob-chicken-bacon.webp',
  },
  {
    id: 'ch3', name: 'Mob Chicken Sunrise', tag: 'FRANGO', price: 'R$ 31,00',
    ingredients: ['Pão Brioche', 'Frango grelhado', 'Ovo frito', 'Presunto', 'Mussarela/Cheddar', 'Molho especial'],
    bg: ['#2A1A00', '#120C00'], accent: '#F0A030',
    image: '/burgers/mob-chicken-sunrise.webp',
  },
  {
    id: 'ch4', name: 'Mob Chicken Full', tag: 'FULL', price: 'R$ 40,00',
    ingredients: ['Pão Brioche', 'Frango grelhado', 'Bacon', 'Ovo frito', 'Presunto', 'Mussarela/Cheddar', 'Alface', 'Tomate', 'Molho especial'],
    bg: ['#1E1600', '#0E0A00'], accent: '#D4900A',
    image: '/burgers/mob-chicken-full.webp',
  },
]

const COMBOS: (BurgerDetail & { id: string; image: string; imageFit: 'cover' | 'contain' })[] = [
  {
    id: 'k0a', name: 'Combo Fritas', tag: 'COMBO', price: '+ R$ 9,90',
    ingredients: ['Burger à escolha', 'Batata Frita 200g'],
    bg: ['#2A1800', '#120C00'], accent: '#FFB300',
    image: '/burgers/combo-mob-fritas.webp', imageFit: 'cover',
  },
  {
    id: 'k0b', name: 'Combo Completo', tag: 'COMBO', price: '+ R$ 14,00',
    ingredients: ['Burger à escolha', 'Batata Frita 200g', 'Coca-Cola Lata 350ml'],
    bg: ['#1A0A00', '#0A0500'], accent: '#FF6B00',
    image: '/burgers/combo-mob-completo.webp', imageFit: 'cover',
  },
  {
    id: 'k1', name: 'Combo Clássico', tag: 'COMBO', price: 'R$ 38,00',
    ingredients: ['Mob Classic', 'Bebida lata'],
    bg: ['#2A0E05', '#110502'], accent: '#FF4500',
    image: '/burgers/combo-mob-combo-classico.webp', imageFit: 'contain',
  },
  {
    id: 'k2', name: 'Combo Premium', tag: 'COMBO', price: 'A partir R$ 55',
    ingredients: ['Qualquer burger (B-01 a B-12)', 'Bebida lata', '1 Sobremesa'],
    bg: ['#1A0000', '#0A0000'], accent: '#CC0000',
    image: '/burgers/combo-mob-combo-premium.webp', imageFit: 'contain',
  },
  {
    id: 'k3', name: 'Combo Sweet', tag: 'COMBO', price: 'R$ 44,00',
    ingredients: ['Mob Original', 'Bebida lata', '1 Cookie'],
    bg: ['#2A1800', '#120C00'], accent: '#E67E22',
    image: '/burgers/combo-mob-combo-sweet.webp', imageFit: 'contain',
  },
  {
    id: 'k4', name: 'Mob Para 2', tag: '💑 DUO', price: 'A partir R$ 78',
    ingredients: ['2 Burgers à escolha', '2 Bebidas lata', '1 Sobremesa compartilhada'],
    bg: ['#0A1A24', '#030A10'], accent: '#2196F3',
    image: '/burgers/combo-mob-para-2.webp', imageFit: 'contain',
  },
  {
    id: 'k5', name: 'Mob Família', tag: 'FAMÍLIA', price: 'A partir R$ 148',
    ingredients: ['4 Burgers à escolha', '4 Bebidas lata', '2 Sobremesas'],
    bg: ['#0A2410', '#030F08'], accent: '#4CAF50',
    image: '/burgers/combo-mob-familia.webp', imageFit: 'contain',
  },
]

const PORCOES: (BurgerDetail & { id: string; image: string; imageFit: 'cover' | 'contain' })[] = [
  {
    id: 'p1', name: 'Batata Frita', tag: '🍟 PORÇÃO', price: 'R$ 11,90',
    ingredients: ['Batata frita 200g', 'Crocante por fora', 'Macia por dentro'],
    bg: ['#2A1E00', '#120E00'], accent: '#FFB300',
    image: '/burgers/batata-frita.webp', imageFit: 'contain',
  },
]

const SOBREMESAS: (BurgerDetail & { id: string; image: string; imageFit: 'cover' | 'contain' })[] = [
  {
    id: 's1', name: 'Mob Bombom de Morango', tag: '🍓 SOBREMESA', price: 'R$ 8,00',
    ingredients: ['Bombom artesanal de morango'],
    bg: ['#280A15', '#100408'], accent: '#E91E63',
    image: '/burgers/sobremesa-mob-bombom-de-morango.webp', imageFit: 'contain',
  },
  {
    id: 's2', name: 'Mob Brownie', tag: '🍫 SOBREMESA', price: 'R$ 12,00',
    ingredients: ['Ninho', 'Nutella', 'Bis', 'KitKat', 'Confete'],
    bg: ['#1A0800', '#0A0300'], accent: '#A0522D',
    image: '/burgers/sobremesa-mob-brownie.webp', imageFit: 'contain',
  },
  {
    id: 's3', name: 'Mob Cookie', tag: '🍪 SOBREMESA', price: 'R$ 7,00',
    ingredients: ['Cookie clássico artesanal'],
    bg: ['#2A1600', '#120A00'], accent: '#CD853F',
    image: '/burgers/sobremesa-mob-cookie.webp', imageFit: 'contain',
  },
  {
    id: 's4', name: 'Mob Cookie Nutella', tag: '🍪 SOBREMESA', price: 'R$ 10,00',
    ingredients: ['Cookie artesanal', 'Recheado com Nutella'],
    bg: ['#2A1000', '#120700'], accent: '#D2691E',
    image: '/burgers/sobremesa-mob-cookie-nutella.webp', imageFit: 'contain',
  },
]

// All card items in order for ref tracking
const ALL_CARDS = [
  ...BURGERS.map((b) => ({ ...b, id: String(b.id) })),
  ...CHICKEN,
  ...COMBOS,
  ...SOBREMESAS,
  ...PORCOES,
] as (BurgerDetail & { id: string; image?: string })[]

/* ─── Card ───────────────────────────────────────────────────── */
const Card = forwardRef<
  HTMLDivElement,
  {
    burger: BurgerDetail & { image?: string; imageFit?: 'cover' | 'contain' }
    onOpen: (b: BurgerDetail) => void
    onFocusCard: (el: HTMLElement) => void
  }
>(function Card({ burger, onOpen, onFocusCard }, forwardedRef) {
  const [imgFailed, setImgFailed] = useState(false)
  const hoverRef  = useRef<HTMLDivElement>(null)
  const panelRef  = useRef<HTMLDivElement>(null)

  const setRef = (el: HTMLDivElement | null) => {
    (hoverRef as React.MutableRefObject<HTMLDivElement | null>).current = el
    if (typeof forwardedRef === 'function') forwardedRef(el)
    else if (forwardedRef)
      (forwardedRef as React.MutableRefObject<HTMLDivElement | null>).current = el
  }

  // Zoom + painel de ingredientes: só com mouse (no touch o toque abre o modal)
  const showDetails = () => {
    if (!hasFinePointer()) return
    const quick = prefersReducedMotion()
    const inner = hoverRef.current?.querySelector('.c-inner')
    if (inner && !quick) gsap.to(inner, { scale: 1.04, duration: 0.45, ease: 'power2.out' })
    if (panelRef.current)
      gsap.to(panelRef.current, { y: '0%', duration: quick ? 0 : 0.4, ease: 'power3.out' })
  }
  const hideDetails = () => {
    if (!hasFinePointer()) return
    const quick = prefersReducedMotion()
    const inner = hoverRef.current?.querySelector('.c-inner')
    if (inner) gsap.to(inner, { scale: 1, duration: quick ? 0 : 0.45, ease: 'power2.out' })
    if (panelRef.current)
      gsap.to(panelRef.current, { y: '105%', duration: quick ? 0 : 0.35, ease: 'power2.in' })
  }

  const FallbackIcon = burger.name.toLowerCase().includes('chicken') ? Drumstick : Hamburger

  return (
    <div
      ref={setRef}
      className="burger-card carousel-panel"
      role="button"
      tabIndex={0}
      aria-haspopup="dialog"
      aria-label={`${burger.name}${burger.price ? `, ${burger.price}` : ''}. Ver ingredientes e pedir`}
      onMouseEnter={showDetails}
      onMouseLeave={hideDetails}
      onFocus={(e) => { showDetails(); onFocusCard(e.currentTarget) }}
      onBlur={hideDetails}
      onClick={() => onOpen(burger)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onOpen(burger)
        }
      }}
      style={{
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
              src={burger.image} alt="" fill sizes="(max-width: 640px) 85vw, 420px"
              style={{
                objectFit: 'contain',
                objectPosition: 'center',
                padding: burger.imageFit === 'contain' ? '1.25rem' : '0.5rem',
              }}
              onError={() => setImgFailed(true)}
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
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FallbackIcon aria-hidden strokeWidth={1.25} style={{ width: '40%', height: '40%', color: burger.accent, opacity: 0.8 }} />
              </div>
            </>
          )}
        </div>

        <div aria-hidden style={{
          position: 'absolute', inset: 0, zIndex: 2,
          background: 'linear-gradient(to bottom, transparent 40%, rgba(8,7,11,0.9) 100%)',
          pointerEvents: 'none',
        }} />
        <div aria-hidden style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: burger.accent, zIndex: 3, opacity: 0.85 }} />
        <div style={{ position: 'absolute', top: '1rem', left: '1.25rem', zIndex: 4 }}>
          <span style={{
            fontFamily: 'var(--font-body)', fontSize: '0.68rem', fontWeight: 600,
            letterSpacing: '0.14em', textTransform: 'uppercase',
            background: 'rgba(8,7,11,0.75)', color: '#fff',
            border: `1px solid ${burger.accent}`,
            padding: '0.3rem 0.75rem', borderRadius: '9999px',
            backdropFilter: 'blur(6px)',
          }}>
            {burger.tag}
          </span>
        </div>

        {/* Tags flutuantes — 3 ingredientes principais, sempre visíveis */}
        <div aria-hidden style={{
          position: 'absolute', bottom: '1.25rem',
          left: '1rem', right: '1rem',
          zIndex: 5, display: 'flex', flexWrap: 'wrap', gap: '0.35rem',
          pointerEvents: 'none',
        }}>
          {burger.ingredients.slice(0, 3).map((ing) => (
            <span key={ing} style={{
              fontFamily: 'var(--font-body)', fontSize: '0.68rem',
              letterSpacing: '0.04em',
              color: 'rgba(255,255,255,0.92)',
              background: 'rgba(8,7,11,0.7)',
              border: `1px solid ${burger.accent}66`,
              padding: '0.25rem 0.6rem', borderRadius: '9999px',
              backdropFilter: 'blur(6px)',
              whiteSpace: 'nowrap',
              maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis',
            }}>
              {ing}
            </span>
          ))}
          {burger.ingredients.length > 3 && (
            <span style={{
              fontFamily: 'var(--font-body)', fontSize: '0.68rem', fontWeight: 600,
              color: '#fff',
              background: 'rgba(8,7,11,0.7)',
              border: `1px solid ${burger.accent}66`,
              padding: '0.25rem 0.6rem', borderRadius: '9999px',
              backdropFilter: 'blur(6px)',
            }}>
              +{burger.ingredients.length - 3}
            </span>
          )}
        </div>

        {/* Painel hover — lista completa, sobe no hover/foco (desktop) */}
        <div
          ref={panelRef}
          aria-hidden
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
            fontFamily: 'var(--font-body)', fontSize: '0.7rem',
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: burger.accent, marginBottom: '0.6rem',
          }}>
            Ingredientes
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
            {burger.ingredients.map((ing) => (
              <li key={ing} style={{
                fontFamily: 'var(--font-body)', fontSize: '0.85rem',
                color: 'rgba(255,255,255,0.88)',
                display: 'flex', alignItems: 'center', gap: '0.5rem',
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
        padding: '1.1rem 1.4rem 1.4rem',
        background: 'var(--mob-card)',
        borderTop: `2px solid ${burger.accent}50`,
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '0.5rem' }}>
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
              fontSize: 'clamp(1.3rem, 1.8vw, 1.6rem)',
              color: burger.accent, lineHeight: 1, flexShrink: 0,
              whiteSpace: 'nowrap',
            }}>
              {burger.price}
            </span>
          )}
        </div>
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--mob-muted)',
          display: 'flex', alignItems: 'center', gap: '0.35rem',
        }}>
          {burger.ingredients.length} ingredientes · Ver detalhes
          <ArrowRight aria-hidden size={14} />
        </p>
      </div>
    </div>
  )
})

/* ─── Separator label ────────────────────────────────────────── */
function SectionLabel({ label, id }: { label: string; id?: string }) {
  return (
    <div id={id} className="carousel-section-label carousel-panel" style={{
      display: 'flex', flexShrink: 0,
      alignItems: 'center', justifyContent: 'center',
      borderRight: '1px solid var(--mob-border)',
      background: 'transparent',
    }}>
      <h3 style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
        color: 'var(--mob-fire)', letterSpacing: '0.25em',
        writingMode: 'vertical-rl', textOrientation: 'mixed',
        transform: 'rotate(180deg)',
      }}>
        {label}
      </h3>
    </div>
  )
}

/* ─── Main carousel ──────────────────────────────────────────── */
export function BurgerCarousel() {
  const sectionRef   = useRef<HTMLElement>(null)
  const viewportRef  = useRef<HTMLDivElement>(null)
  const trackRef     = useRef<HTMLDivElement>(null)
  const titleRef     = useRef<HTMLDivElement>(null)
  const cardRefs     = useRef<(HTMLDivElement | null)[]>([])
  const activeIdxRef = useRef(0)
  const [activeIdx, setActiveIdx]   = useState(0)
  const [selected, setSelected]     = useState<BurgerDetail | null>(null)
  const [edges, setEdges]           = useState({ start: true, end: false })

  const setActive = useCallback((idx: number) => {
    if (idx === activeIdxRef.current) return
    activeIdxRef.current = idx
    setActiveIdx(idx)
  }, [])

  /* Card mais próximo do centro — `offsetX` é o deslocamento do track */
  const closestCard = useCallback((offsetX: number, viewCenter: number) => {
    let closestIdx = 0
    let closestDist = Infinity
    cardRefs.current.forEach((el, i) => {
      if (!el) return
      const dist = Math.abs(el.offsetLeft + el.offsetWidth / 2 + offsetX - viewCenter)
      if (dist < closestDist) {
        closestDist = dist
        closestIdx = i
      }
    })
    return closestIdx
  }, [])

  /* Desktop com mouse: scroll vertical vira horizontal (pin do GSAP).
     Fora dessa media query o carrossel é um scroll nativo com snap. */
  useLayoutEffect(() => {
    const mm = gsap.matchMedia()

    mm.add(PINNED_CAROUSEL_MQ, () => {
      const track   = trackRef.current
      const section = sectionRef.current
      if (!track || !section) return

      section.classList.add('is-pinned')

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
          onUpdate: () => setActive(closestCard(gsap.getProperty(track, 'x') as number, window.innerWidth / 2)),
        },
      })

      return () => section.classList.remove('is-pinned')
    })

    return () => mm.revert()
  }, [closestCard, setActive])

  /* Modo nativo: acompanha o scroll horizontal para o fundo e as setas */
  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport) return

    let frame = 0
    const update = () => {
      frame = 0
      if (sectionRef.current?.classList.contains('is-pinned')) return
      const { scrollLeft, scrollWidth, clientWidth } = viewport
      setActive(closestCard(-scrollLeft, clientWidth / 2))
      setEdges((prev) => {
        const next = { start: scrollLeft < 8, end: scrollLeft + clientWidth > scrollWidth - 8 }
        return prev.start === next.start && prev.end === next.end ? prev : next
      })
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update) }

    viewport.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      viewport.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [closestCard, setActive])

  const scrollByPage = (dir: 1 | -1) => {
    const viewport = viewportRef.current
    if (!viewport) return
    viewport.scrollBy({
      left: dir * viewport.clientWidth * 0.8,
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    })
  }

  /* Navegação por teclado no modo pinado: o track é movido pelo scroll
     vertical, então o card focado precisa ser trazido para a tela */
  const handleCardFocus = useCallback((el: HTMLElement) => {
    const section = sectionRef.current
    if (!section?.classList.contains('is-pinned')) return
    const rect = el.getBoundingClientRect()
    if (rect.left >= 0 && rect.right <= window.innerWidth) return

    const spacer = section.closest('.pin-spacer') as HTMLElement | null
    const top    = (spacer?.offsetTop ?? 0) + el.offsetLeft - (window.innerWidth - el.offsetWidth) / 2
    window.scrollTo({ top: Math.max(0, top), behavior: 'auto' })
  }, [])

  // Fundo: só o card ativo e os vizinhos ficam montados (cada um é uma foto em tela cheia)
  const bgWindow = (i: number) => Math.abs(i - activeIdx) <= 1

  let cardIndex = 0
  const renderCards = (items: (BurgerDetail & { id: string | number; image?: string; imageFit?: 'cover' | 'contain' })[]) =>
    items.map((item) => {
      const idx = cardIndex++
      return (
        <Card
          key={item.id}
          ref={(el) => { cardRefs.current[idx] = el }}
          burger={item}
          onOpen={setSelected}
          onFocusCard={handleCardFocus}
        />
      )
    })

  return (
    <>
      <section
        ref={sectionRef}
        id="cardápio"
        className="carousel-section"
        aria-labelledby="cardapio-title"
      >
        {/* ─ Background image layer ─ */}
        <div
          aria-hidden
          style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}
        >
          {ALL_CARDS.map((item, i) =>
            item.image && bgWindow(i) ? (
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
                />
                {/* Accent gradient overlay */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: `linear-gradient(135deg, ${item.bg[0]}bb 0%, ${item.bg[1]}88 100%)`,
                }} />
              </div>
            ) : null
          )}
        </div>

        {/* ─ Viewport (scroll nativo) + track (transform no modo pinado) ─ */}
        <div ref={viewportRef} className="carousel-viewport" style={{ position: 'relative', zIndex: 1 }}>
          <div
            ref={trackRef}
            className="carousel-track"
            style={{ display: 'flex', alignItems: 'stretch', willChange: 'transform' }}
          >
            {/* Title card */}
            <div ref={titleRef} className="carousel-title-card carousel-panel" style={{
              display: 'flex', flexDirection: 'column', justifyContent: 'center',
              padding: 'clamp(2rem, 5vw, 5rem) clamp(1.25rem, 6vw, 6rem)',
              borderRight: '1px solid var(--mob-border)', flexShrink: 0,
            }}>
              <p className="eyebrow" style={{ marginBottom: '1rem' }}>
                Nosso Cardápio
              </p>
              <h2 id="cardapio-title" style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(3.5rem, 7vw, 7rem)',
                color: 'var(--mob-text)', lineHeight: 0.9, letterSpacing: '-0.01em',
              }}>
                FEITO<br />
                <span style={{ color: 'var(--mob-fire)' }}>PRA</span><br />
                VOCÊ
              </h2>
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: '0.9rem',
                color: 'var(--mob-muted)', marginTop: '1.5rem', lineHeight: 1.6,
                display: 'flex', alignItems: 'center', gap: '0.4rem',
              }}>
                <span className="hint-swipe">Deslize para o lado e toque num item para ver os detalhes</span>
                <span className="hint-scroll">Role para explorar · clique num item para ver os detalhes</span>
              </p>
            </div>

            {renderCards(BURGERS)}

            <SectionLabel label="CHICKEN" />
            {renderCards(CHICKEN)}

            <SectionLabel label="COMBOS" id="carousel-combos" />
            {renderCards(COMBOS)}

            <SectionLabel label="SOBREMESAS" id="carousel-sobremesas" />
            {renderCards(SOBREMESAS)}

            <SectionLabel label="PORÇÕES" id="carousel-porcoes" />
            {renderCards(PORCOES)}

            {/* End CTA */}
            <div className="carousel-end carousel-panel" style={{
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, padding: 'clamp(2rem, 4vw, 3rem)',
              background: 'transparent',
              textAlign: 'center',
            }}>
              <span className="icon-tile" aria-hidden style={{ width: '4.5rem', height: '4.5rem', borderRadius: '20px', marginBottom: '1.5rem' }}>
                <Hamburger size={36} strokeWidth={1.5} />
              </span>
              <p className="eyebrow" style={{ marginBottom: '1.25rem' }}>
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
              <a href="#pedido" className="btn btn-primary">
                Fazer Pedido
              </a>
            </div>
          </div>
        </div>

        {/* Setas — modo nativo (mouse em telas menores e reforço de descoberta no touch) */}
        <div
          className="carousel-arrows"
          style={{
            position: 'absolute', zIndex: 2,
            right: 'clamp(1rem, 3vw, 2rem)', top: '1rem',
            display: 'flex', gap: '0.5rem',
          }}
        >
          <button
            type="button"
            className="carousel-arrow"
            onClick={() => scrollByPage(-1)}
            disabled={edges.start}
            aria-label="Itens anteriores do cardápio"
          >
            <ChevronLeft aria-hidden size={22} />
          </button>
          <button
            type="button"
            className="carousel-arrow"
            onClick={() => scrollByPage(1)}
            disabled={edges.end}
            aria-label="Próximos itens do cardápio"
          >
            <ChevronRight aria-hidden size={22} />
          </button>
        </div>
      </section>

      {/* Modal — fora da section para não ser afetado pelo pin do GSAP */}
      <BurgerModal burger={selected} onClose={() => setSelected(null)} />
    </>
  )
}
