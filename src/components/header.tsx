'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { lockScroll, prefersReducedMotion, unlockScroll } from '@/lib/motion'

interface HeaderProps {
  ready: boolean
}

const WHATSAPP_URL = 'https://wa.me/5535997209115'

/* Seções principais — aparecem no header do desktop (≥1024px) */
const NAV: { label: string; href: string; sectionId: string }[] = [
  { label: 'Cardápio',   href: '#cardápio',   sectionId: 'cardápio' },
  { label: 'Sobre',      href: '#sobre',      sectionId: 'sobre' },
  { label: 'Como Pedir', href: '#como-pedir', sectionId: 'como-pedir' },
  { label: 'Avaliações', href: '#avaliacoes', sectionId: 'avaliacoes' },
  { label: 'Galeria',    href: '#galeria',    sectionId: 'galeria' },
  { label: 'Contato',    href: '#contato',    sectionId: 'contato' },
]

/* Atalhos para dentro do carrossel — só no menu mobile, agrupados sob "Cardápio" */
const MENU_SHORTCUTS: { label: string; carouselId: string }[] = [
  { label: 'Combos',     carouselId: 'carousel-combos' },
  { label: 'Sobremesas', carouselId: 'carousel-sobremesas' },
  { label: 'Porções',    carouselId: 'carousel-porcoes' },
]

function scrollToCarouselSection(carouselId: string) {
  const target   = document.getElementById(carouselId)
  const carousel = document.getElementById('cardápio')
  if (!target || !carousel) return

  // Pula a label; o primeiro card começa logo depois
  const firstCardOffset = target.offsetLeft + target.offsetWidth
  const margin          = 40
  const behavior: ScrollBehavior = prefersReducedMotion() ? 'auto' : 'smooth'

  // Modo nativo (touch, telas menores, reduced motion): rola o viewport do carrossel
  if (!carousel.classList.contains('is-pinned')) {
    carousel.scrollIntoView({ behavior })
    carousel.querySelector('.carousel-viewport')?.scrollTo({ left: Math.max(0, firstCardOffset - margin), behavior })
    return
  }

  // Desktop com GSAP pin:
  // O GSAP envolve o carrossel num ".pin-spacer" que mantém a posição real no documento.
  // A posição do pin-spacer + offsetLeft do elemento = scroll vertical correto.
  const spacer = carousel.closest('.pin-spacer') as HTMLElement | null
  const carouselDocTop = spacer?.offsetTop ?? 0

  window.scrollTo({ top: Math.max(0, carouselDocTop + firstCardOffset - margin), behavior })
}

export function Header({ ready }: HeaderProps) {
  const headerRef = useRef<HTMLElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const [activeNav, setActiveNav] = useState<string | null>(null)

  /* Fade in after intro */
  useEffect(() => {
    if (!ready) return
    if (prefersReducedMotion()) {
      gsap.set(headerRef.current, { opacity: 1 })
      return
    }
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 0.1 },
    )
  }, [ready])

  /* Scroll listener — destaca a seção que está no meio da tela */
  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      setScrolled(window.scrollY > 60)

      const probe = window.innerHeight * 0.5
      const current = NAV.find(({ sectionId }) => {
        const rect = document.getElementById(sectionId)?.getBoundingClientRect()
        return rect && rect.top <= probe && rect.bottom > probe
      })
      setActiveNav(current?.sectionId ?? null)
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update) }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  /* Menu mobile: trava o scroll da página, fecha com Esc e ao passar para o layout desktop */
  useEffect(() => {
    if (!menuOpen) return
    lockScroll()

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setMenuOpen(false)
      toggleRef.current?.focus()
    }
    const desktop = window.matchMedia('(min-width: 1024px)')
    const onDesktop = () => { if (desktop.matches) setMenuOpen(false) }

    window.addEventListener('keydown', onKey)
    desktop.addEventListener('change', onDesktop)
    return () => {
      unlockScroll()
      window.removeEventListener('keydown', onKey)
      desktop.removeEventListener('change', onDesktop)
    }
  }, [menuOpen])

  const solid = scrolled || menuOpen

  return (
    <header
      ref={headerRef}
      style={{ opacity: ready ? undefined : 0 }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className="transition-[background-color,border-color,backdrop-filter] duration-500"
        style={{
          background: solid ? 'rgba(8,7,11,0.92)' : 'transparent',
          backdropFilter: solid ? 'blur(14px)' : 'none',
          WebkitBackdropFilter: solid ? 'blur(14px)' : 'none',
          borderBottom: solid ? '1px solid var(--mob-border)' : '1px solid transparent',
        }}
      >
        <div className="mob-container flex items-center gap-6" style={{ height: 'var(--header-h)' }}>
          {/* Logo */}
          <a href="#" className="flex items-center shrink-0" aria-label="M.O.B Burger — voltar ao topo">
            <Image
              src="/mob-logo.webp"
              alt=""
              width={80}
              height={80}
              style={{ width: 'auto', height: 'clamp(44px, 5vw, 56px)' }}
              priority
            />
          </a>

          {/* Desktop nav + CTA agrupados à direita */}
          <div className="hidden lg:flex items-center gap-8 ml-auto">
            <nav aria-label="Seções da página">
              <ul className="flex items-center gap-6 xl:gap-8">
                {NAV.map((item) => {
                  const isActive = activeNav === item.sectionId
                  return (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        aria-current={isActive ? 'true' : undefined}
                        className="text-link inline-block whitespace-nowrap py-2"
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.8rem',
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          borderBottom: `1.5px solid ${isActive ? 'var(--mob-fire)' : 'transparent'}`,
                          color: isActive ? 'var(--mob-text)' : undefined,
                        }}
                      >
                        {item.label}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </nav>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ minHeight: '44px', padding: '0.6rem 1.4rem', fontSize: '1rem' }}
            >
              Fazer Pedido
            </a>
          </div>

          {/* Hamburger (mobile/tablet) */}
          <button
            ref={toggleRef}
            type="button"
            className="lg:hidden ml-auto flex flex-col items-center justify-center gap-1.5 rounded-full"
            style={{ width: '48px', height: '48px', marginRight: '-12px' }}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
            aria-controls="menu-mobile"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                aria-hidden
                style={{
                  display: 'block',
                  width: '24px',
                  height: '2px',
                  background: 'var(--mob-text)',
                  borderRadius: '2px',
                  transition: 'transform 0.25s, opacity 0.25s',
                  transform:
                    menuOpen && i === 0
                      ? 'translateY(8px) rotate(45deg)'
                      : menuOpen && i === 2
                      ? 'translateY(-8px) rotate(-45deg)'
                      : 'none',
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>
      </div>

      {/* Mobile menu — ocupa a altura disponível e rola se precisar */}
      <div
        id="menu-mobile"
        className="lg:hidden"
        inert={!menuOpen}
        style={{
          background: 'rgba(8,7,11,0.97)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          maxHeight: menuOpen ? 'calc(100svh - var(--header-h))' : '0',
          overflowY: menuOpen ? 'auto' : 'hidden',
          overscrollBehavior: 'contain',
          visibility: menuOpen ? 'visible' : 'hidden',
          transition: 'max-height 0.4s ease, visibility 0.4s',
          borderBottom: menuOpen ? '1px solid var(--mob-border)' : 'none',
        }}
      >
        <nav aria-label="Menu" className="mob-container" style={{ paddingTop: '0.75rem', paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom))' }}>
          <ul className="flex flex-col">
            {NAV.map((item) => {
              const isActive = activeNav === item.sectionId
              return (
                <li key={item.label} style={{ borderBottom: '1px solid var(--mob-border)' }}>
                  <a
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    aria-current={isActive ? 'true' : undefined}
                    className="flex items-center"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.75rem',
                      letterSpacing: '0.05em',
                      color: isActive ? 'var(--mob-fire)' : 'var(--mob-text)',
                      minHeight: '56px',
                    }}
                  >
                    {item.label}
                  </a>

                  {item.sectionId === 'cardápio' && (
                    <div className="flex flex-wrap gap-2" style={{ paddingBottom: '0.9rem' }}>
                      {MENU_SHORTCUTS.map((s) => (
                        <button
                          key={s.carouselId}
                          type="button"
                          onClick={() => {
                            setMenuOpen(false)
                            // Espera o menu destravar o scroll da página
                            requestAnimationFrame(() => scrollToCarouselSection(s.carouselId))
                          }}
                          className="btn btn-outline"
                          style={{ minHeight: '40px', padding: '0.5rem 1rem', fontSize: '0.95rem' }}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                  )}
                </li>
              )
            })}
          </ul>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="btn btn-primary w-full"
            style={{ marginTop: '1.5rem', fontSize: '1.3rem', minHeight: '56px' }}
          >
            Fazer Pedido
          </a>
        </nav>
      </div>
    </header>
  )
}
