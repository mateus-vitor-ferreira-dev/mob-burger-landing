'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import gsap from 'gsap'

interface HeaderProps {
  ready: boolean
}

const NAV = ['Cardápio', 'Sobre', 'Combos', 'Contato']

export function Header({ ready }: HeaderProps) {
  const headerRef = useRef<HTMLElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  /* Fade in after intro */
  useEffect(() => {
    if (!ready) return
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 0.1 },
    )
  }, [ready])

  /* Scroll listener */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
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
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 clamp(2rem, 6vw, 6rem)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '4.5rem' }}>
          {/* Logo */}
          <a href="#" className="flex items-center">
            <Image
              src="/mob-logo.png"
              alt="M.O.B Burger"
              width={80}
              height={80}
              style={{ width: 'auto', height: 'clamp(44px, 5vw, 58px)' }}
              priority
            />
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.8rem',
                  letterSpacing: '0.1em',
                  color: 'var(--mob-muted)',
                  textTransform: 'uppercase',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'var(--mob-text)')}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'var(--mob-muted)')}
              >
                {item}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="#pedido"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1rem',
                letterSpacing: '0.05em',
                background: 'var(--mob-fire)',
                color: '#fff',
                padding: '0.55rem 1.4rem',
                borderRadius: '9999px',
                transition: 'opacity 0.2s, transform 0.2s',
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
          {NAV.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.8rem',
                letterSpacing: '0.05em',
                color: 'var(--mob-muted)',
                padding: '0.3rem 0',
              }}
            >
              {item}
            </a>
          ))}
          <a
            href="#pedido"
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
