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
  const backdropRef = useRef<HTMLDivElement>(null)
  const panelRef    = useRef<HTMLDivElement>(null)
  const imgFailed   = useRef(false)

  /* ── Open animation ── */
  useEffect(() => {
    if (!burger) return

    imgFailed.current = false

    const tl = gsap.timeline()
    tl.fromTo(backdropRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: 'power2.out' },
    )
    tl.fromTo(panelRef.current,
      { y: '100%' },
      { y: '0%', duration: 0.45, ease: 'power3.out' },
      '<0.05',
    )
  }, [burger])

  /* ── Keyboard close ── */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  /* ── Prevent body scroll when open ── */
  useEffect(() => {
    if (burger) document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [burger])

  function handleClose() {
    const tl = gsap.timeline({ onComplete: onClose })
    tl.to(panelRef.current,    { y: '100%', duration: 0.38, ease: 'power3.in' })
    tl.to(backdropRef.current, { opacity: 0, duration: 0.25, ease: 'power2.in' }, '<0.05')
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
          background: 'rgba(4,3,6,0.82)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
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
          maxHeight: '88svh',
          overflowY: 'auto',
          transform: 'translateY(100%)',
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
            background: 'var(--mob-card)',
            border: '1px solid var(--mob-border)',
            color: 'var(--mob-muted)',
            fontSize: '1.1rem', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 2, transition: 'color 0.2s',
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--mob-text)')}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--mob-muted)')}
        >
          ✕
        </button>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0,1fr)',
          gap: 0,
        }}>
          {/* Image strip */}
          <div style={{
            position: 'relative',
            height: 'clamp(180px, 30vw, 320px)',
            background: `linear-gradient(160deg, ${burger.bg[0]} 0%, ${burger.bg[1]} 100%)`,
            overflow: 'hidden',
            flexShrink: 0,
          }}>
            {burger.image && (
              <Image
                src={burger.image}
                alt={burger.name}
                fill
                sizes="100vw"
                style={{ objectFit: 'cover', objectPosition: 'center' }}
                unoptimized
                onError={() => { imgFailed.current = true }}
              />
            )}
            {/* Gradient overlay */}
            <div style={{
              position: 'absolute', inset: 0,
              background: `linear-gradient(to bottom, transparent 30%, rgba(16,14,23,0.95) 100%)`,
            }} />
            {/* Tag */}
            <div style={{ position: 'absolute', top: '1rem', left: '1.5rem' }}>
              <span style={{
                fontFamily: 'var(--font-body)', fontSize: '0.6rem',
                letterSpacing: '0.18em', textTransform: 'uppercase',
                background: burger.accent, color: '#fff',
                padding: '0.25rem 0.7rem', borderRadius: '9999px',
              }}>
                {burger.tag}
              </span>
            </div>
            {/* Name over image */}
            <div style={{
              position: 'absolute', bottom: '1.25rem', left: '1.5rem', right: '4rem',
            }}>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                color: '#fff', lineHeight: 0.95,
                letterSpacing: '-0.01em',
                textShadow: '0 2px 20px rgba(0,0,0,0.6)',
              }}>
                {burger.name}
              </h2>
            </div>
          </div>

          {/* Content */}
          <div style={{ padding: 'clamp(1.5rem, 4vw, 2.5rem)' }}>
            {/* Ingredients */}
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: '0.65rem',
              letterSpacing: '0.22em', color: burger.accent,
              textTransform: 'uppercase', marginBottom: '1.25rem',
            }}>
              Ingredientes
            </p>

            <ul style={{ listStyle: 'none', padding: 0, margin: 0, marginBottom: '2rem' }}>
              {burger.ingredients.map((ing, i) => (
                <li
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.65rem 0',
                    borderBottom: '1px solid var(--mob-border)',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'clamp(0.85rem, 1.5vw, 1rem)',
                    color: 'var(--mob-text)',
                  }}
                >
                  <span style={{
                    width: '6px', height: '6px', borderRadius: '50%',
                    background: burger.accent, flexShrink: 0,
                  }} />
                  {ing}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                letterSpacing: '0.06em',
                background: burger.accent,
                color: '#fff',
                padding: '0.9rem 2rem',
                borderRadius: '9999px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                width: '100%',
                transition: 'opacity 0.2s, transform 0.2s',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.opacity = '0.9'
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
  )
}
