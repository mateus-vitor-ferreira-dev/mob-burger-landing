'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Flame, HandCoins, Leaf } from 'lucide-react'
import { ScrambleText } from './scramble-text'
import { hasFinePointer, prefersReducedMotion } from '@/lib/motion'

gsap.registerPlugin(ScrollTrigger)

const ITEMS = [
  {
    icon: Leaf,
    title: 'Ingredientes Frescos',
    desc: 'Tudo preparado no dia, sem congelados. Pão brioche fresquinho, blend bovino selecionado e vegetais de qualidade.',
  },
  {
    icon: Flame,
    title: 'Feito na Hora',
    desc: 'Seu pedido só começa quando você confirma. Nada fica esperando na prateleira — sai da chapa pra você.',
  },
  {
    icon: HandCoins,
    title: 'Pague na Entrega',
    desc: 'Pix, cartão ou dinheiro, direto com o entregador. Nada de pagar adiantado: você só acerta quando o lanche chega quentinho na sua porta.',
  },
]

export function Features() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      // immediateRender: false evita que GSAP aplique opacity:0 antes do trigger disparar
      gsap.from('.feat-card', {
        opacity: 0,
        y: 60,
        stagger: 0.18,
        duration: 0.75,
        ease: 'power2.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          invalidateOnRefresh: true,
        },
      })
      gsap.from('.feat-title', {
        opacity: 0,
        y: 30,
        duration: 0.65,
        ease: 'power2.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          invalidateOnRefresh: true,
        },
      })

      // Recalcular posições após o pin do carrossel ser configurado
      ScrollTrigger.refresh()
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="sobre"
      style={{
        background: 'var(--mob-black)',
        padding: 'clamp(4rem, 10vw, 9rem) 0',
        borderTop: '1px solid var(--mob-border)',
      }}
    >
      <div className="mob-container">
        {/* Section label */}
        <div className="feat-title" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: 'clamp(2rem, 5vw, 4rem)' }}>
          <h2>
            <ScrambleText text="Por que Mob Burger?" duration={0.8} className="eyebrow" />
          </h2>
          <div aria-hidden style={{ flex: 1, height: '1px', background: 'var(--mob-border)' }} />
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))',
            gap: 'clamp(1rem, 2vw, 1.5rem)',
            perspective: '1000px',
          }}
        >
          {ITEMS.map((item) => (
            <div
              key={item.title}
              className="feat-card card"
              style={{
                padding: 'clamp(1.75rem, 3vw, 2.5rem)',
                transformStyle: 'preserve-3d',
              }}
              onMouseMove={(e) => {
                // Tilt 3D só com mouse e sem preferência por menos movimento
                if (!hasFinePointer() || prefersReducedMotion()) return
                const el = e.currentTarget as HTMLElement
                const rect = el.getBoundingClientRect()
                const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 18
                const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 18
                gsap.to(el, {
                  rotateX: -y, rotateY: x,
                  translateZ: 12,
                  borderColor: 'rgba(255,69,0,0.4)',
                  duration: 0.3, ease: 'power2.out', overwrite: 'auto',
                })
              }}
              onMouseLeave={(e) => {
                if (!hasFinePointer() || prefersReducedMotion()) return
                const el = e.currentTarget as HTMLElement
                gsap.to(el, {
                  rotateX: 0, rotateY: 0, translateZ: 0,
                  borderColor: 'var(--mob-border)',
                  duration: 0.6, ease: 'elastic.out(1, 0.5)', overwrite: 'auto',
                })
              }}
            >
              <span className="icon-tile" aria-hidden style={{ marginBottom: '1.25rem' }}>
                <item.icon size={26} strokeWidth={1.75} />
              </span>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.6rem, 2.5vw, 2rem)',
                color: 'var(--mob-text)',
                letterSpacing: '0.02em',
                lineHeight: 1,
                marginBottom: '0.75rem',
              }}>
                {item.title}
              </h3>
              <p className="body-copy">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
