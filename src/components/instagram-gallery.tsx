'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '@/lib/motion'

gsap.registerPlugin(ScrollTrigger)

const PHOTOS = [
  { src: '/burgers/mob-joker.webp',      alt: 'Mob Joker' },
  { src: '/burgers/mob-beast.webp',      alt: 'Mob Beast' },
  { src: '/burgers/mob-full.webp',       alt: 'Mob Full' },
  { src: '/burgers/mob-original.webp',   alt: 'Mob Original' },
  { src: '/burgers/mob-chaos.webp',      alt: 'Mob Chaos' },
  { src: '/burgers/mob-king.webp',       alt: 'Mob King' },
  { src: '/burgers/mob-chicken-full.webp', alt: 'Mob Chicken Full' },
  { src: '/burgers/mob-brunch.webp',     alt: 'Mob Brunch' },
  { src: '/burgers/sobremesa-mob-brownie.webp', alt: 'Mob Brownie' },
]

export function InstagramGallery() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.from('.ig-photo', {
        opacity: 0, scale: 0.9, stagger: 0.07, duration: 0.55, ease: 'power2.out',
        immediateRender: false,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', invalidateOnRefresh: true },
      })
      gsap.from('.ig-header', {
        opacity: 0, y: 24, duration: 0.6, ease: 'power2.out',
        immediateRender: false,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 88%', invalidateOnRefresh: true },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="galeria"
      style={{
        background: 'var(--mob-black)',
        borderTop: '1px solid var(--mob-border)',
        padding: 'clamp(4rem, 8vw, 7rem) 0',
      }}
    >
      <div className="mob-container">

        {/* Header */}
        <div className="ig-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <h2 className="eyebrow">Instagram</h2>
            <div aria-hidden style={{ width: '60px', height: '1px', background: 'var(--mob-border)' }} />
          </div>

          <a
            href="https://www.instagram.com/murilooriginalburger?igsh=MWkxczJzbGp4MnY3Mg=="
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
            style={{
              fontFamily: 'var(--font-body)', fontSize: '0.8rem',
              letterSpacing: '0.08em', minHeight: '44px',
              padding: '0.55rem 1.25rem',
            }}
          >
            <svg aria-hidden viewBox="0 0 24 24" style={{ width: '14px', height: '14px' }} xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="2" width="20" height="20" rx="5" fill="currentColor"/>
              <circle cx="12" cy="12" r="4.5" fill="none" stroke="var(--mob-black)" strokeWidth="1.5"/>
              <circle cx="17.5" cy="6.5" r="1" fill="var(--mob-black)"/>
            </svg>
            @murilooriginalburger
          </a>
        </div>

        {/* Grid */}
        <ul style={{
          listStyle: 'none',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '4px',
          borderRadius: '12px',
          overflow: 'hidden',
        }}>
          {PHOTOS.map(({ src, alt }) => (
            <li
              key={src}
              className="ig-photo"
              style={{
                position: 'relative',
                aspectRatio: '1 / 1',
                overflow: 'hidden',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement
                el.querySelector('img')!.style.transform = 'scale(1.08)'
                const overlay = el.querySelector('.ig-overlay') as HTMLElement
                if (overlay) overlay.style.opacity = '1'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement
                el.querySelector('img')!.style.transform = 'scale(1)'
                const overlay = el.querySelector('.ig-overlay') as HTMLElement
                if (overlay) overlay.style.opacity = '0'
              }}
            >
              <Image
                src={src} alt={alt} fill
                sizes="(max-width: 768px) 33vw, 420px"
                style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
              />
              {/* Hover overlay */}
              <div
                aria-hidden
                className="ig-overlay"
                style={{
                  position: 'absolute', inset: 0,
                  background: 'rgba(0,0,0,0.55)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  opacity: 0, transition: 'opacity 0.3s',
                }}
              >
                <p style={{
                  fontFamily: 'var(--font-display)', fontSize: 'clamp(0.8rem, 1.5vw, 1.1rem)',
                  color: '#fff', letterSpacing: '0.05em', textAlign: 'center', padding: '0 0.5rem',
                }}>
                  {alt}
                </p>
              </div>
            </li>
          ))}
        </ul>

        {/* Follow CTA */}
        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--mob-muted)', marginBottom: '1rem' }}>
            Siga para acompanhar novidades, promoções e bastidores
          </p>
          <a
            href="https://www.instagram.com/murilooriginalburger?igsh=MWkxczJzbGp4MnY3Mg=="
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
            style={{
              // Tons mais escuros do gradiente do Instagram: o texto branco fica legível
              background: 'linear-gradient(135deg, #c13584, #c4302b, #b3245d)',
              color: '#fff',
            }}
          >
            Seguir no Instagram
          </a>
        </div>
      </div>
    </section>
  )
}
