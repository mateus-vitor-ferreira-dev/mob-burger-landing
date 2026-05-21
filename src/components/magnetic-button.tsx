'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface MagneticButtonProps {
  children: React.ReactNode
  radius?: number
  strength?: number
  className?: string
}

export function MagneticButton({ children, radius = 110, strength = 0.38, className }: MagneticButtonProps) {
  const wrapRef  = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Sem efeito em dispositivos touch
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return

    const wrap  = wrapRef.current
    const inner = innerRef.current
    if (!wrap || !inner) return

    const onMove = (e: MouseEvent) => {
      const rect = wrap.getBoundingClientRect()
      const cx = rect.left + rect.width  / 2
      const cy = rect.top  + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.hypot(dx, dy)

      if (dist < radius) {
        const pull = (1 - dist / radius) * strength
        gsap.to(inner, {
          x: dx * pull * 2,
          y: dy * pull * 2,
          duration: 0.3,
          ease: 'power2.out',
          overwrite: 'auto',
        })
      } else {
        gsap.to(inner, {
          x: 0, y: 0,
          duration: 0.65,
          ease: 'elastic.out(1, 0.4)',
          overwrite: 'auto',
        })
      }
    }

    const onLeave = () => gsap.to(inner, {
      x: 0, y: 0,
      duration: 0.65,
      ease: 'elastic.out(1, 0.4)',
      overwrite: 'auto',
    })

    window.addEventListener('mousemove', onMove)
    wrap.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      wrap.removeEventListener('mouseleave', onLeave)
    }
  }, [radius, strength])

  return (
    <div ref={wrapRef} className={className} style={{ display: 'inline-block', position: 'relative' }}>
      <div ref={innerRef}>
        {children}
      </div>
    </div>
  )
}
