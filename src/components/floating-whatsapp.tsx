'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export function FloatingWhatsApp() {
  const btnRef  = useRef<HTMLAnchorElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const btn  = btnRef.current
    const ring = ringRef.current
    if (!btn || !ring) return

    // Botão começa invisível — só aparece via CSS animação (sem transform no início)
    gsap.set(btn, { opacity: 0 })
    gsap.to(btn, { opacity: 1, duration: 0.5, delay: 2.5, ease: 'power2.out' })

    // Anel de pulso separado — não afeta o botão
    gsap.fromTo(ring,
      { scale: 1, opacity: 0.7 },
      { scale: 1.85, opacity: 0, duration: 1.4, ease: 'power1.out', repeat: -1, delay: 3 }
    )
  }, [])

  return (
    <div style={{
      position: 'fixed',
      bottom: '2.5rem',
      right: '2.5rem',
      zIndex: 9500,
      width: '64px',
      height: '64px',
    }}>
      {/* Anel de pulso */}
      <div ref={ringRef} style={{
        position: 'absolute',
        inset: 0,
        borderRadius: '50%',
        background: 'rgba(37,211,102,0.35)',
        opacity: 0,
        pointerEvents: 'none',
      }} />

      {/* Botão */}
      <a
        ref={btnRef}
        href="https://wa.me/5535997209115"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Fazer pedido pelo WhatsApp"
        style={{
          position: 'relative',
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          background: '#25D366',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 6px 24px rgba(37,211,102,0.55)',
          transition: 'transform 0.2s, box-shadow 0.2s',
          zIndex: 1,
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement
          el.style.transform = 'scale(1.12)'
          el.style.boxShadow = '0 8px 32px rgba(37,211,102,0.7)'
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement
          el.style.transform = 'scale(1)'
          el.style.boxShadow = '0 6px 24px rgba(37,211,102,0.55)'
        }}
      >
        <svg viewBox="0 0 48 48" style={{ width: '34px', height: '34px' }} xmlns="http://www.w3.org/2000/svg">
          <path fill="white" d="M24 4C13 4 4 13 4 24c0 3.6.96 7 2.64 9.94L4 44l10.36-2.6A19.9 19.9 0 0 0 24 44c11 0 20-9 20-20S35 4 24 4z"/>
          <path fill="#25D366" d="M35 28.9c-.45-.22-2.64-1.3-3.05-1.45-.4-.15-.7-.22-1 .22-.3.45-1.15 1.45-1.4 1.75-.26.3-.52.34-.97.11-.45-.22-1.9-.7-3.62-2.23-1.34-1.2-2.24-2.67-2.5-3.12-.26-.45-.03-.7.2-.92.2-.2.44-.52.67-.78.22-.26.3-.45.44-.74.15-.3.08-.56-.04-.78-.11-.22-1-2.42-1.38-3.3-.36-.87-.73-.75-1-.76l-.86-.02c-.3 0-.78.11-1.19.56-.4.45-1.53 1.5-1.53 3.65s1.57 4.23 1.79 4.52c.22.3 3.1 4.73 7.5 6.63 1.05.45 1.87.72 2.5.92.82.32 1.95.28 2.69.17.82-.12 2.53-1.03 2.89-2.03.35-.99.35-1.84.24-2.02-.1-.18-.38-.3-.83-.52z"/>
        </svg>
      </a>
    </div>
  )
}
