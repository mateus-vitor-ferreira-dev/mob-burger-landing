'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PHOTOS = [
  { src: '/burgers/mob-joker.png',      alt: 'Mob Joker' },
  { src: '/burgers/mob-beast.png',      alt: 'Mob Beast' },
  { src: '/burgers/mob-full.png',       alt: 'Mob Full' },
  { src: '/burgers/mob-original.png',   alt: 'Mob Original' },
  { src: '/burgers/mob-chaos.png',      alt: 'Mob Chaos' },
  { src: '/burgers/mob-king.png',       alt: 'Mob King' },
  { src: '/burgers/mob-chicken-full.png', alt: 'Mob Chicken Full' },
  { src: '/burgers/mob-brunch.png',     alt: 'Mob Brunch' },
  { src: '/burgers/sobremesa-mob-brownie.png', alt: 'Mob Brownie' },
]

export function InstagramGallery() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
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
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 clamp(2rem, 6vw, 6rem)' }}>

        {/* Header */}
        <div className="ig-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{
              fontFamily: 'var(--font-body)', fontSize: '0.7rem',
              letterSpacing: '0.25em', color: 'var(--mob-fire)', textTransform: 'uppercase',
            }}>
              Instagram
            </span>
            <div style={{ width: '60px', height: '1px', background: 'var(--mob-border)' }} />
          </div>

          <a
            href="https://www.instagram.com/murilooriginalburger?igsh=MWkxczJzbGp4MnY3Mg=="
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'var(--font-body)', fontSize: '0.78rem',
              letterSpacing: '0.1em', color: 'var(--mob-text)',
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.55rem 1.25rem', borderRadius: '9999px',
              border: '1px solid var(--mob-border)',
              textTransform: 'uppercase',
              transition: 'border-color 0.2s, color 0.2s',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.borderColor = 'rgba(255,69,0,0.4)'
              el.style.color = 'var(--mob-fire)'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.borderColor = 'var(--mob-border)'
              el.style.color = 'var(--mob-text)'
            }}
          >
            <svg viewBox="0 0 24 24" style={{ width: '14px', height: '14px' }} xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="2" width="20" height="20" rx="5" fill="currentColor"/>
              <circle cx="12" cy="12" r="4.5" fill="none" stroke="var(--mob-black)" strokeWidth="1.5"/>
              <circle cx="17.5" cy="6.5" r="1" fill="var(--mob-black)"/>
            </svg>
            @murilooriginalburger
          </a>
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '4px',
          borderRadius: '12px',
          overflow: 'hidden',
        }}>
          {PHOTOS.map(({ src, alt }, i) => (
            <div
              key={src}
              className="ig-photo"
              style={{
                position: 'relative',
                aspectRatio: '1 / 1',
                overflow: 'hidden',
                cursor: 'pointer',
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
                unoptimized
              />
              {/* Hover overlay */}
              <div
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
            </div>
          ))}
        </div>

        {/* Follow CTA */}
        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: 'var(--mob-muted)', marginBottom: '1rem' }}>
            Siga para acompanhar novidades, promoções e bastidores
          </p>
          <a
            href="https://www.instagram.com/murilooriginalburger?igsh=MWkxczJzbGp4MnY3Mg=="
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'var(--font-display)', fontSize: '0.95rem',
              letterSpacing: '0.06em',
              background: 'linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366)',
              color: '#fff', padding: '0.7rem 2rem',
              borderRadius: '9999px', display: 'inline-block',
              transition: 'opacity 0.2s, transform 0.2s',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0.88'; (e.currentTarget as HTMLElement).style.transform = 'scale(1.03)' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = '1'; (e.currentTarget as HTMLElement).style.transform = 'scale(1)' }}
          >
            Seguir no Instagram
          </a>
        </div>
      </div>
    </section>
  )
}
