'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { X } from 'lucide-react'
import { lockScroll, prefersReducedMotion, unlockScroll } from '@/lib/motion'

export interface BurgerDetail {
  name: string
  tag: string
  ingredients: string[]
  bg: [string, string]
  accent: string
  price?: string
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
  const closeRef       = useRef<HTMLButtonElement>(null)
  const closingRef     = useRef(false)
  const onCloseRef     = useRef(onClose)
  onCloseRef.current   = onClose

  /* ── Open animation ── */
  useEffect(() => {
    if (!burger) return

    closingRef.current = false
    const items = ingredientsRef.current?.querySelectorAll('li') ?? []

    const tl = gsap.timeline()
    // Sem movimento: tudo aparece de uma vez
    if (prefersReducedMotion()) tl.timeScale(1000)

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

  /* ── Foco, teclado e scroll da página enquanto aberto ── */
  const isOpen = burger !== null
  useEffect(() => {
    if (!isOpen) return
    const opener = document.activeElement as HTMLElement | null
    lockScroll()
    closeRef.current?.focus({ preventScroll: true })

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose()
        return
      }
      // Mantém o Tab dentro do diálogo
      if (e.key !== 'Tab' || !panelRef.current) return
      const focusables = panelRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
      const first = focusables[0]
      const last  = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    window.addEventListener('keydown', onKey)

    return () => {
      window.removeEventListener('keydown', onKey)
      unlockScroll()
      opener?.focus({ preventScroll: true })
    }
  }, [isOpen])

  function handleClose() {
    if (closingRef.current) return
    closingRef.current = true
    const tl = gsap.timeline({ onComplete: () => onCloseRef.current() })
    if (prefersReducedMotion()) tl.timeScale(1000)
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
        aria-hidden
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
        role="dialog"
        aria-modal="true"
        aria-labelledby="burger-modal-title"
        style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          maxWidth: '1200px',
          marginInline: 'auto',
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
          ref={closeRef}
          type="button"
          onClick={handleClose}
          aria-label="Fechar detalhes"
          className="carousel-arrow"
          style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', zIndex: 10 }}
        >
          <X aria-hidden size={22} />
        </button>

        {/* Foto + detalhes: empilhados no celular, lado a lado a partir de 768px (ver .modal-grid) */}
        <div className="modal-grid">

          {/* LEFT — photo, full burger visible */}
          <div className="modal-media" style={{
            position: 'relative',
            background: `linear-gradient(135deg, ${burger.bg[0]} 0%, ${burger.bg[1]} 100%)`,
            overflow: 'hidden',
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
                  sizes="(max-width: 768px) 90vw, 540px"
                  style={{
                    objectFit: 'contain',       // ← mostra a foto inteira, sem corte
                    objectPosition: 'center',
                    filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.7))',
                  }}
                />
              </div>
            ) : (
              <span aria-hidden style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(4rem, 10vw, 8rem)', color: burger.accent }}>
                M.O.B
              </span>
            )}

            {/* Tag */}
            <div style={{ position: 'absolute', top: '1.25rem', left: '1.25rem', zIndex: 2 }}>
              <span style={{
                fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 600,
                letterSpacing: '0.14em', textTransform: 'uppercase',
                background: 'rgba(8,7,11,0.75)', color: '#fff',
                border: `1px solid ${burger.accent}`,
                padding: '0.3rem 0.8rem', borderRadius: '9999px',
              }}>
                {burger.tag}
              </span>
            </div>
          </div>

          {/* RIGHT — ingredients */}
          <div className="modal-body" style={{
            display: 'flex',
            flexDirection: 'column',
            padding: 'clamp(1.25rem, 3vw, 2.5rem)',
            paddingBottom: 0,
          }}>
            {/* Name */}
            <h2
              ref={titleRef}
              id="burger-modal-title"
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

            {/* Price */}
            {burger.price && (
              <p style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
                color: burger.accent,
                lineHeight: 1,
                marginBottom: '0.5rem',
                letterSpacing: '0.02em',
              }}>
                {burger.price}
              </p>
            )}

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
                fontFamily: 'var(--font-body)', fontSize: '0.72rem',
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
                    fontSize: '1rem',
                    color: 'var(--mob-text)',
                    opacity: 0,  // GSAP starts from 0
                  }}
                >
                  <span aria-hidden style={{
                    width: '7px', height: '7px', borderRadius: '50%',
                    background: burger.accent, flexShrink: 0,
                    boxShadow: `0 0 6px ${burger.accent}80`,
                  }} />
                  {ing}
                </li>
              ))}
            </ul>

            {/* CTA */}
            {/* Fica grudado no rodapé enquanto a lista rola (celular) */}
            <div className="modal-cta" style={{ paddingBottom: 'max(1.25rem, env(safe-area-inset-bottom))' }}>
              <a
                ref={ctaRef}
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp w-full"
                style={{
                  borderRadius: '12px',
                  minHeight: '52px',
                  whiteSpace: 'normal',
                  textAlign: 'center',
                  opacity: 0,
                }}
              >
                Pedir {burger.name} no WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
