'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { lockScroll, prefersReducedMotion, unlockScroll } from '@/lib/motion'

const SEEN_KEY = 'mob-intro-seen'

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
    const finish = () => {
      // Marca só ao terminar: no StrictMode o efeito roda duas vezes na montagem
      try { sessionStorage.setItem(SEEN_KEY, '1') } catch {}
      if (wrapRef.current) {
        wrapRef.current.style.pointerEvents = 'none'
        wrapRef.current.style.visibility    = 'hidden'
      }
      onComplete()
    }

    // Quem prefere menos movimento ou já viu a intro nesta sessão vai direto ao conteúdo
    let seen = false
    try { seen = sessionStorage.getItem(SEEN_KEY) === '1' } catch {}
    if (seen || prefersReducedMotion()) {
      finish()
      return
    }
    lockScroll()

    const tl = gsap.timeline({
      onComplete() {
        unlockScroll()
        finish()
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
      .to(logoRef.current, { opacity: 0, duration: 0.3, ease: 'power1.in' }, '+=0.6')

      /* ── curtain splits ── */
      .addLabel('curtain', '-=0.15')
      .to(topRef.current,    { yPercent: -100, duration: 0.85, ease: 'power3.inOut' }, 'curtain')
      .to(bottomRef.current, { yPercent:  100, duration: 0.85, ease: 'power3.inOut' }, '<')

    // Clique, toque ou qualquer tecla pulam direto para a cortina
    const skip = () => { if (tl.time() < tl.labels.curtain) tl.seek('curtain') }
    window.addEventListener('keydown', skip)
    window.addEventListener('pointerdown', skip)

    return () => {
      tl.kill()
      window.removeEventListener('keydown', skip)
      window.removeEventListener('pointerdown', skip)
      // Se o timeline foi interrompido antes do fim, devolve a trava
      if (tl.progress() < 1) unlockScroll()
    }
  }, [onComplete])

  return (
    <div
      ref={wrapRef}
      style={{ visibility: 'hidden' }}
      className="fixed inset-0 z-[9999] overflow-hidden pointer-events-auto"
      aria-hidden
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
            src="/mob-logo.webp"
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
            fontSize: 'clamp(0.7rem, 1.2vw, 0.85rem)',
            color: 'var(--mob-muted)',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            marginTop: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            justifyContent: 'center',
          }}
        >
          <span style={{ color: 'var(--mob-fire)' }}>Original&apos;s</span>
          <span style={{ opacity: 0.25, margin: '0 0.4rem' }}>·</span>
          Smash Burger
          <span style={{ opacity: 0.25, margin: '0 0.4rem' }}>·</span>
          Lavras/MG
        </p>
      </div>
    </div>
  )
}
