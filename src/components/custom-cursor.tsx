'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return

    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    document.body.style.cursor = 'none'

    const onMove = (e: MouseEvent) => {
      gsap.set(dot, { x: e.clientX, y: e.clientY })
      gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.18, ease: 'power2.out', overwrite: 'auto' })
    }

    const onEnter = () => {
      gsap.to(ring, { scale: 2.2, opacity: 0.5, duration: 0.25, ease: 'power2.out' })
      gsap.to(dot,  { scale: 0,   opacity: 0,   duration: 0.15 })
    }
    const onLeave = () => {
      gsap.to(ring, { scale: 1,   opacity: 1,   duration: 0.3,  ease: 'elastic.out(1, 0.5)' })
      gsap.to(dot,  { scale: 1,   opacity: 1,   duration: 0.2 })
    }

    const bindLinks = () => {
      document.querySelectorAll('a, button, [role="button"], .burger-card').forEach(el => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }

    window.addEventListener('mousemove', onMove)
    bindLinks()

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.body.style.cursor = ''
      document.querySelectorAll('a, button, [role="button"], .burger-card').forEach(el => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])

  return (
    <>
      <div ref={dotRef} aria-hidden style={{
        position: 'fixed', top: 0, left: 0, zIndex: 99999,
        width: 6, height: 6, borderRadius: '50%',
        background: 'var(--mob-fire)',
        transform: 'translate(-50%,-50%)',
        pointerEvents: 'none', willChange: 'transform',
      }} />
      <div ref={ringRef} aria-hidden style={{
        position: 'fixed', top: 0, left: 0, zIndex: 99998,
        width: 34, height: 34, borderRadius: '50%',
        border: '1.5px solid rgba(255,69,0,0.75)',
        transform: 'translate(-50%,-50%)',
        pointerEvents: 'none', willChange: 'transform',
      }} />
    </>
  )
}
