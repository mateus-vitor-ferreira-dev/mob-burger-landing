'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'

interface IntroProps {
  onComplete: () => void
}

export function Intro({ onComplete }: IntroProps) {
  const wrapRef    = useRef<HTMLDivElement>(null)
  const topRef     = useRef<HTMLDivElement>(null)
  const bottomRef  = useRef<HTMLDivElement>(null)
  const logoRef    = useRef<HTMLDivElement>(null)
  const mobRef     = useRef<HTMLDivElement>(null)
  const tagRef     = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    const tl = gsap.timeline({
      onComplete() {
        document.body.style.overflow = ''
        if (wrapRef.current) {
          wrapRef.current.style.pointerEvents = 'none'
          wrapRef.current.style.visibility    = 'hidden'
        }
        onComplete()
      },
    })

    tl.set(wrapRef.current, { visibility: 'visible' })

      /* ── logo slams in ── */
      .from(mobRef.current, {
        scale: 0.5, opacity: 0, duration: 0.7, ease: 'back.out(1.7)',
      })

      /* ── impact punch ── */
      .to(mobRef.current, {
        scale: 1.06, duration: 0.08, ease: 'power2.in', yoyo: true, repeat: 1,
      })

      /* ── tagline ── */
      .from(tagRef.current, {
        opacity: 0, y: 14, duration: 0.35, ease: 'power2.out',
      }, '-=0.05')

      /* ── logo fades before curtain ── */
      .to(logoRef.current, { opacity: 0, duration: 0.3, ease: 'power1.in' }, '+=1.0')

      /* ── curtain splits ── */
      .to(topRef.current,    { yPercent: -100, duration: 0.85, ease: 'power3.inOut' }, '-=0.15')
      .to(bottomRef.current, { yPercent:  100, duration: 0.85, ease: 'power3.inOut' }, '<')

    return () => {
      tl.kill()
      document.body.style.overflow = ''
    }
  }, [onComplete])

  return (
    <div
      ref={wrapRef}
      style={{ visibility: 'hidden' }}
      className="fixed inset-0 z-[9999] overflow-hidden pointer-events-auto"
    >
      {/* Top panel */}
      <div
        ref={topRef}
        className="absolute inset-x-0 top-0 h-1/2"
        style={{ background: 'var(--mob-black)' }}
      />
      {/* Bottom panel */}
      <div
        ref={bottomRef}
        className="absolute inset-x-0 bottom-0 h-1/2"
        style={{ background: 'var(--mob-black)' }}
      />

      {/* Centered logo — sits above both panels */}
      <div
        ref={logoRef}
        className="absolute inset-0 flex flex-col items-center justify-center z-10 select-none"
      >
        <div ref={mobRef} style={{ filter: 'drop-shadow(0 0 40px rgba(255,90,0,0.5))' }}>
          <Image
            src="/mob-logo.png"
            alt="M.O.B Burger"
            width={420}
            height={420}
            style={{ width: 'clamp(200px, 35vw, 420px)', height: 'auto' }}
            priority
          />
        </div>
        <p
          ref={tagRef}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.7rem, 1.5vw, 1rem)',
            color: 'var(--mob-muted)',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            marginTop: '0.75rem',
          }}
        >
          Lavras · MG
        </p>
      </div>
    </div>
  )
}
