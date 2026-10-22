'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { hasFinePointer, prefersReducedMotion } from '@/lib/motion'

const INTERACTIVE = 'a, button, [role="button"], .burger-card'

export function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Só com mouse de verdade e sem preferência por menos movimento.
    // Fora disso os elementos ficam com display: none (ver .custom-cursor no CSS)
    if (!hasFinePointer() || prefersReducedMotion()) return

    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const root = document.documentElement
    let visible = false

    const onMove = (e: MouseEvent) => {
      // Liga no primeiro movimento: evita o anel parado no canto (0,0) antes disso
      if (!visible) {
        visible = true
        root.classList.add('has-custom-cursor')
        gsap.set([dot, ring], { x: e.clientX, y: e.clientY })
      }
      gsap.set(dot, { x: e.clientX, y: e.clientY })
      gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.18, ease: 'power2.out', overwrite: 'auto' })
    }

    // Delegação: funciona também para o que aparece depois (modal, menu)
    const onOver = (e: MouseEvent) => {
      const from = (e.relatedTarget as Element | null)?.closest?.(INTERACTIVE)
      const to   = (e.target as Element).closest?.(INTERACTIVE)
      if (from === to) return
      if (to) {
        gsap.to(ring, { scale: 2.2, opacity: 0.5, duration: 0.25, ease: 'power2.out' })
        gsap.to(dot,  { scale: 0,   opacity: 0,   duration: 0.15 })
      } else {
        gsap.to(ring, { scale: 1,   opacity: 1,   duration: 0.3,  ease: 'elastic.out(1, 0.5)' })
        gsap.to(dot,  { scale: 1,   opacity: 1,   duration: 0.2 })
      }
    }

    // Mouse saiu da janela: esconde para não ficar um anel parado na borda
    const onLeaveWindow = () => gsap.to([dot, ring], { opacity: 0, duration: 0.2 })
    const onEnterWindow = () => gsap.to([dot, ring], { opacity: 1, duration: 0.2 })

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.documentElement.addEventListener('mouseleave', onLeaveWindow)
    document.documentElement.addEventListener('mouseenter', onEnterWindow)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.documentElement.removeEventListener('mouseleave', onLeaveWindow)
      document.documentElement.removeEventListener('mouseenter', onEnterWindow)
      root.classList.remove('has-custom-cursor')
    }
  }, [])

  return (
    <>
      <div ref={dotRef} aria-hidden className="custom-cursor" style={{
        position: 'fixed', top: 0, left: 0, zIndex: 99999,
        width: 6, height: 6, borderRadius: '50%',
        background: 'var(--mob-fire)',
        transform: 'translate(-50%,-50%)',
        pointerEvents: 'none', willChange: 'transform',
      }} />
      <div ref={ringRef} aria-hidden className="custom-cursor" style={{
        position: 'fixed', top: 0, left: 0, zIndex: 99998,
        width: 34, height: 34, borderRadius: '50%',
        border: '1.5px solid rgba(255,69,0,0.75)',
        transform: 'translate(-50%,-50%)',
        pointerEvents: 'none', willChange: 'transform',
      }} />
    </>
  )
}
