'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import gsap from 'gsap'

interface HeaderProps {
  ready: boolean
}

const NAV: { label: string; href: string; carouselId?: string }[] = [
  { label: 'Cardápio',   href: '#cardápio' },
  { label: 'Sobre',      href: '#sobre' },
  { label: 'Combos',     href: '#cardápio', carouselId: 'carousel-combos' },
  { label: 'Sobremesas', href: '#cardápio', carouselId: 'carousel-sobremesas' },
  { label: 'Porções',   href: '#cardápio', carouselId: 'carousel-porcoes' },
  { label: 'Como Pedir', href: '#como-pedir' },
  { label: 'Avaliações', href: '#avaliacoes' },
  { label: 'Galeria',    href: '#galeria' },
  { label: 'Contato',    href: '#contato' },
]

function scrollToCarouselSection(carouselId: string) {
  const target   = document.getElementById(carouselId)
  const carousel = document.getElementById('cardápio')
  if (!target || !carousel) return

  // Pula a label; o primeiro card começa logo depois
  const firstCardOffset = target.offsetLeft + target.offsetWidth
  const margin          = 40

  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0

  if (isTouch) {
    carousel.scrollTo({ left: Math.max(0, firstCardOffset - margin), behavior: 'smooth' })
    return
  }

  // Desktop com GSAP pin:
  // O GSAP envolve o carrossel num ".pin-spacer" que mantém a posição real no documento.
  // A posição do pin-spacer + offsetLeft do elemento = scroll vertical correto.
  let carouselDocTop = 0
  const spacers = document.querySelectorAll('.pin-spacer')
  for (const spacer of spacers) {
    if (spacer.contains(carousel)) {
      carouselDocTop = (spacer as HTMLElement).offsetTop
      break
    }
  }

  const scrollTo = carouselDocTop + firstCardOffset - margin
  window.scrollTo({ top: Math.max(0, scrollTo), behavior: 'smooth' })
}

export function Header({ ready }: HeaderProps) {
  const headerRef = useRef<HTMLElement>(null)
  const [scrolled,   setScrolled]   = useState(false)
  const [menuOpen,   setMenuOpen]   = useState(false)
  const [activeNav,  setActiveNav]  = useState<string | null>(null)

  /* Fade in after intro */
  useEffect(() => {
    if (!ready) return
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 0.1 },
    )
  }, [ready])

  /* Scroll listener — atualiza item ativo baseado na seção visível */
  useEffect(() => {
    const sectionMap: { id: string; label: string }[] = [
      { id: 'contato',    label: 'Contato' },
      { id: 'galeria',    label: 'Galeria' },
      { id: 'avaliacoes', label: 'Avaliações' },
      { id: 'como-pedir', label: 'Como Pedir' },
      { id: 'cardápio',   label: 'Porções' },
      { id: 'sobre',      label: 'Sobre' },
      { id: 'cardápio',   label: 'Cardápio' },
    ]

    const onScroll = () => {
      setScrolled(window.scrollY > 60)

      // Detecta seção visível (de baixo pra cima para pegar a mais próxima)
      for (const { id, label } of sectionMap) {
        const el = document.getElementById(id)
        if (el && window.scrollY + window.innerHeight * 0.5 >= el.offsetTop) {
          setActiveNav(prev => prev?.startsWith('Combo') || prev === 'Sobremesas' ? prev : label)
          break
        }
      }

      // Se voltou ao topo, limpa
      if (window.scrollY < 80) setActiveNav(null)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      ref={headerRef}
      style={{ opacity: ready ? undefined : 0 }}
      className="fixed inset-x-0 top-0 z-50 transition-all duration-500"
    >
      <div
        className="transition-all duration-500"
        style={{
          background: scrolled ? 'rgba(8,7,11,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(14px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--mob-border)' : '1px solid transparent',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', paddingLeft: 'clamp(1rem, 3vw, 3rem)', paddingRight: 'clamp(1rem, 3vw, 3rem)', display: 'flex', alignItems: 'center', gap: '1.5rem', height: '4.5rem' }}>
          {/* Logo */}
          <a href="#" className="flex items-center shrink-0">
            <Image
              src="/mob-logo.png"
              alt="M.O.B Burger"
              width={80}
              height={80}
              style={{ width: 'auto', height: 'clamp(44px, 5vw, 58px)' }}
              priority
            />
          </a>

          {/* Desktop nav + CTA agrupados à direita */}
          <div className="hidden md:flex items-center gap-6" style={{ marginLeft: 'auto' }}>
            <nav className="flex items-center gap-6">
              {NAV.map((item) => {
                const isActive = activeNav === item.label
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => {
                      setActiveNav(item.label)
                      if (item.carouselId) {
                        e.preventDefault()
                        scrollToCarouselSection(item.carouselId)
                      }
                    }}
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.8rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      transition: 'color 0.2s, border-color 0.2s',
                      cursor: 'pointer',
                      paddingBottom: '3px',
                      borderBottom: isActive
                        ? '1.5px solid var(--mob-fire)'
                        : '1.5px solid transparent',
                      color: isActive ? 'var(--mob-fire)' : 'var(--mob-muted)',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) (e.currentTarget as HTMLElement).style.color = 'var(--mob-text)'
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) (e.currentTarget as HTMLElement).style.color = 'var(--mob-muted)'
                    }}
                  >
                    {item.label}
                  </a>
                )
              })}
            </nav>

            {/* CTA com separação fixa do último item da nav */}
            <a
              href="https://wa.me/5535997209115"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1rem',
                letterSpacing: '0.05em',
                background: 'var(--mob-fire)',
                color: '#fff',
                padding: '0.55rem 1.4rem',
                borderRadius: '9999px',
                transition: 'opacity 0.2s, transform 0.2s',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLElement).style.opacity = '0.88'
                ;(e.currentTarget as HTMLElement).style.transform = 'scale(1.03)'
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLElement).style.opacity = '1'
                ;(e.currentTarget as HTMLElement).style.transform = 'scale(1)'
              }}
            >
              Fazer Pedido
            </a>
          </div>

          {/* Hamburger (mobile) */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-1"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: 'block',
                  width: '24px',
                  height: '2px',
                  background: 'var(--mob-text)',
                  borderRadius: '2px',
                  transition: 'transform 0.25s, opacity 0.25s',
                  transform:
                    menuOpen && i === 0
                      ? 'rotate(45deg) translate(3px, 3px)'
                      : menuOpen && i === 2
                      ? 'rotate(-45deg) translate(3px, -3px)'
                      : 'none',
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        style={{
          background: 'rgba(8,7,11,0.97)',
          backdropFilter: 'blur(16px)',
          maxHeight: menuOpen ? '320px' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.4s ease',
          borderBottom: menuOpen ? '1px solid var(--mob-border)' : 'none',
        }}
      >
        <nav className="flex flex-col gap-1 px-6 py-4">
          {NAV.map((item) => {
            const isActive = activeNav === item.label
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  setActiveNav(item.label)
                  if (item.carouselId) {
                    e.preventDefault()
                    scrollToCarouselSection(item.carouselId)
                  }
                  setMenuOpen(false)
                }}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.8rem',
                  letterSpacing: '0.05em',
                  color: isActive ? 'var(--mob-fire)' : 'var(--mob-muted)',
                  padding: '0.3rem 0',
                  borderBottom: isActive ? '2px solid var(--mob-fire)' : '2px solid transparent',
                  display: 'inline-block',
                }}
              >
                {item.label}
              </a>
            )
          })}
          <a
            href="https://wa.me/5535997209115"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.8rem',
              color: 'var(--mob-fire)',
              padding: '0.3rem 0',
              marginTop: '0.5rem',
            }}
          >
            Fazer Pedido
          </a>
        </nav>
      </div>
    </header>
  )
}
