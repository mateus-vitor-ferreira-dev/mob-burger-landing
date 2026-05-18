'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'

export interface BurgerDetail {
  name: string
  tag: string
  ingredients: string[]
  bg: [string, string]
  accent: string
  image?: string
}

interface BurgerModalProps {
  burger: BurgerDetail | null
  onClose: () => void
}

export function BurgerModal({ burger, onClose }: BurgerModalProps) {
  const backdropRef    = useRef<HTMLDivElement>(null)
  const panelRef       = useRef<HTMLDivElement>(null)
  const ingredientsRef = useRef<HTMLUListElement>(null)
  const titleRef       = useRef<HTMLHeadingElement>(null)
  const labelRef       = useRef<HTMLParagraphElement>(null)
  const ctaRef         = useRef<HTMLAnchorElement>(null)

  /* ── Open animation ── */
  useEffect(() => {
    if (!burger) return

    const items = ingredientsRef.current?.querySelectorAll('li') ?? []

    const tl = gsap.timeline()

    // 1. backdrop fades in
    tl.fromTo(backdropRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: 'power2.out' },
    )
    // 2. panel slides up
    tl.fromTo(panelRef.current,
      { y: '100%' },
      { y: '0%', duration: 0.45, ease: 'power3.out' },
      '<0.05',
    )
    // 3. title
    tl.fromTo(titleRef.current,
      { opacity: 0, x: -24 },
      { opacity: 1, x: 0, duration: 0.35, ease: 'power2.out' },
      '-=0.1',
    )
    // 4. label "Ingredientes"
    tl.fromTo(labelRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.25 },
      '-=0.1',
    )
    // 5. ingredients stagger
    tl.fromTo(items,
      { opacity: 0, x: -20 },
      {
        opacity: 1, x: 0,
        stagger: 0.07,
        duration: 0.35,
        ease: 'power2.out',
      },
      '-=0.1',
    )
    // 6. CTA
    tl.fromTo(ctaRef.current,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' },
      '-=0.1',
    )
  }, [burger])

  /* ── Keyboard close ── */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  /* ── Prevent body scroll ── */
  useEffect(() => {
    if (burger) document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [burger])

  function handleClose() {
    const tl = gsap.timeline({ onComplete: onClose })
    tl.to(panelRef.current,    { y: '100%', duration: 0.38, ease: 'power3.in' })
    tl.to(backdropRef.current, { opacity: 0, duration: 0.22, ease: 'power2.in' }, '<0.05')
  }

  if (!burger) return null

  const waMsg = encodeURIComponent(`Olá! Quero pedir um ${burger.name} 🍔`)
  const waUrl = `https://wa.me/5535997209115?text=${waMsg}`

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9998 }}>
      {/* Backdrop */}
      <div
        ref={backdropRef}
        onClick={handleClose}
        style={{
          position: 'absolute', inset: 0,
          background: 'rgba(4,3,6,0.85)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          cursor: 'pointer',
        }}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          background: 'var(--mob-surface)',
          borderTop: `3px solid ${burger.accent}`,
          borderRadius: '24px 24px 0 0',
          maxHeight: '90svh',
          overflow: 'hidden',
          transform: 'translateY(100%)',
          display: 'flex',
          flexDirection: 'column',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          aria-label="Fechar"
          style={{
            position: 'absolute', top: '1rem', right: '1.25rem',
            width: '36px', height: '36px', borderRadius: '50%',
            background: 'rgba(0,0,0,0.5)',
            border: '1px solid rgba(255,255,255,0.12)',
            color: 'rgba(255,255,255,0.6)',
            fontSize: '1rem', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 10, transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement
            el.style.color = '#fff'
            el.style.background = 'rgba(255,255,255,0.1)'
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement
            el.style.color = 'rgba(255,255,255,0.6)'
            el.style.background = 'rgba(0,0,0,0.5)'
          }}
        >
          ✕
        </button>

        {/* Two-column layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 45%) minmax(0, 55%)',
          flex: 1,
          overflow: 'hidden',
          // Stack on small screens
          ...(typeof window !== 'undefined' && window.innerWidth < 640
            ? { gridTemplateColumns: '1fr', overflowY: 'auto' }
            : {}),
        }}>

          {/* LEFT — photo, full burger visible */}
          <div style={{
            position: 'relative',
            background: `linear-gradient(135deg, ${burger.bg[0]} 0%, ${burger.bg[1]} 100%)`,
            overflow: 'hidden',
            minHeight: 'clamp(260px, 40vh, 560px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {/* Ambient glow */}
            <div style={{
              position: 'absolute', inset: 0,
              background: `radial-gradient(ellipse at center, ${burger.accent}20 0%, transparent 70%)`,
              pointerEvents: 'none',
            }} />

            {burger.image ? (
              <div style={{
                position: 'relative',
                width: '90%',
                height: '80%',
                maxHeight: '460px',
              }}>
                <Image
                  src={burger.image}
                  alt={burger.name}
                  fill
                  sizes="45vw"
                  style={{
                    objectFit: 'contain',       // ← mostra a foto inteira, sem corte
                    objectPosition: 'center',
                    filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.7))',
                  }}
                  unoptimized
                />
              </div>
            ) : (
              <span style={{
                fontSize: 'clamp(5rem, 10vw, 10rem)',
                filter: `drop-shadow(0 0 40px ${burger.accent}90)`,
              }}>
                {burger.name.includes('Frango') ? '🍗' : '🍔'}
              </span>
            )}

            {/* Tag */}
            <div style={{ position: 'absolute', top: '1.25rem', left: '1.25rem', zIndex: 2 }}>
              <span style={{
                fontFamily: 'var(--font-body)', fontSize: '0.6rem',
                letterSpacing: '0.18em', textTransform: 'uppercase',
                background: burger.accent, color: '#fff',
                padding: '0.25rem 0.75rem', borderRadius: '9999px',
              }}>
                {burger.tag}
              </span>
            </div>
          </div>

          {/* RIGHT — ingredients */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto',
            padding: 'clamp(1.5rem, 3vw, 2.5rem)',
          }}>
            {/* Name */}
            <h2
              ref={titleRef}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                color: '#fff', lineHeight: 0.92,
                letterSpacing: '-0.01em',
                marginBottom: '0.5rem',
                opacity: 0,
              }}
            >
              {burger.name}
            </h2>

            {/* Divider */}
            <div style={{
              width: '3rem', height: '3px',
              background: burger.accent,
              borderRadius: '2px',
              marginBottom: '1.75rem',
            }} />

            {/* Label */}
            <p
              ref={labelRef}
              style={{
                fontFamily: 'var(--font-body)', fontSize: '0.62rem',
                letterSpacing: '0.22em', color: burger.accent,
                textTransform: 'uppercase', marginBottom: '1rem',
                opacity: 0,
              }}
            >
              Ingredientes
            </p>

            {/* List */}
            <ul
              ref={ingredientsRef}
              style={{ listStyle: 'none', padding: 0, margin: 0, flex: 1 }}
            >
              {burger.ingredients.map((ing, i) => (
                <li
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.85rem',
                    padding: '0.7rem 0',
                    borderBottom: '1px solid var(--mob-border)',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'clamp(0.85rem, 1.4vw, 1rem)',
                    color: 'var(--mob-text)',
                    opacity: 0,  // GSAP starts from 0
                  }}
                >
                  <span style={{
                    width: '7px', height: '7px', borderRadius: '50%',
                    background: burger.accent, flexShrink: 0,
                    boxShadow: `0 0 6px ${burger.accent}80`,
                  }} />
                  {ing}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div style={{ paddingTop: '1.75rem' }}>
              <a
                ref={ctaRef}
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(0.95rem, 1.8vw, 1.2rem)',
                  letterSpacing: '0.06em',
                  background: burger.accent,
                  color: '#fff',
                  padding: '0.9rem 1.5rem',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  width: '100%',
                  opacity: 0,
                  transition: 'opacity 0.2s, transform 0.2s',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.opacity = '0.88'
                  el.style.transform = 'scale(1.02)'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.opacity = '1'
                  el.style.transform = 'scale(1)'
                }}
              >
                Pedir {burger.name} no WhatsApp →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
