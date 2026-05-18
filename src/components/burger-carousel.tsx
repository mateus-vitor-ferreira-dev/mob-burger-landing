'use client'

import { useEffect, useLayoutEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const BURGERS = [
  {
    id: 1,
    name: 'MC Simples',
    desc: 'Pão brioche · maionese · 2 fatias de mussarela · 110g de hambúrguer',
    tag: 'CLÁSSICO',
    image: 'https://document-export.canva.com/pNRrs/DAHJ7BpNRrs/83/thumbnail/0002.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQYCGKMUHWEOTUD6Q%2F20260517%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20260517T065039Z&X-Amz-Expires=68790&X-Amz-Signature=4c25770e5890485d70d563b2d60bd197dca9f7e82ab453035cac7685dd67dae2&X-Amz-SignedHeaders=host',
  },
  {
    id: 2,
    name: 'X Bacon',
    desc: 'Pão brioche · 2 tiras de bacon · 110g de hambúrguer · 2 fatias de cheddar',
    tag: '🔥 MAIS PEDIDO',
    image: 'https://document-export.canva.com/pNRrs/DAHJ7BpNRrs/83/thumbnail/0005.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQYCGKMUHWEOTUD6Q%2F20260517%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20260517T155541Z&X-Amz-Expires=34939&X-Amz-Signature=c0147c6d9e45b5405c4446214374acdb9c0eb783f65e5ab65322391fba5f30bf&X-Amz-SignedHeaders=host',
  },
  {
    id: 3,
    name: 'X Bacon Egg',
    desc: 'Pão brioche · 2 tiras de bacon · 110g de hambúrguer · 2 fatias de cheddar · ovo',
    tag: 'ESPECIAL',
    image: 'https://document-export.canva.com/pNRrs/DAHJ7BpNRrs/85/thumbnail/0004.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQYCGKMUHWEOTUD6Q%2F20260517%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20260517T050733Z&X-Amz-Expires=73914&X-Amz-Signature=02cdc6b46829fc0866dfdebb3490478d2620845abc620788895fc371fff71d22&X-Amz-SignedHeaders=host',
  },
  {
    id: 4,
    name: 'Duplo BBQ',
    desc: 'Pão brioche · molho BBQ · cebola roxa caramelizada · 2 fatias de bacon · cheddar duplo · 220g de hambúrguer',
    tag: 'PREMIUM',
    image: 'https://document-export.canva.com/pNRrs/DAHJ7BpNRrs/83/thumbnail/0003.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQYCGKMUHWEOTUD6Q%2F20260517%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20260517T104249Z&X-Amz-Expires=54384&X-Amz-Signature=e812f35e61a80e08734f0d6f122a6fc588e682d695d7f5345529d9d2cc787c84&X-Amz-SignedHeaders=host',
  },
  {
    id: 5,
    name: 'MC Salad',
    desc: 'Pão brioche · molho especial · queijo · alface · tomate · cebola · 110g hambúrguer',
    tag: 'LEVE',
    image: 'https://document-export.canva.com/pNRrs/DAHJ7BpNRrs/83/thumbnail/0004.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQYCGKMUHWEOTUD6Q%2F20260517%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20260517T072625Z&X-Amz-Expires=67993&X-Amz-Signature=7a8e29d153cf28e12d481da8f577abbdfd104935617f9c8e7e666f8e500b4c33&X-Amz-SignedHeaders=host',
  },
  {
    id: 6,
    name: 'Frango Simples',
    desc: 'Pão brioche · 2 fatias de mussarela · filé de frango grelhado',
    tag: 'FRANGO',
    image: 'https://document-export.canva.com/pNRrs/DAHJ7BpNRrs/83/thumbnail/0006.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQYCGKMUHWEOTUD6Q%2F20260517%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20260517T042745Z&X-Amz-Expires=77463&X-Amz-Signature=1ae727305ab03b9988eaaa8441b3d765ece2483523976b1d2fafa4a4abef7694&X-Amz-SignedHeaders=host',
  },
  {
    id: 7,
    name: 'Frango Salada',
    desc: 'Pão brioche · molho · tomate · alface · 2 fatias de mussarela · frango grelhado',
    tag: 'FRANGO',
    image: 'https://document-export.canva.com/pNRrs/DAHJ7BpNRrs/83/thumbnail/0007.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQYCGKMUHWEOTUD6Q%2F20260517%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20260517T104728Z&X-Amz-Expires=52994&X-Amz-Signature=1f933a55b4a29c9e72ae5f96b7424e322f4e3ceb1f921b761532ec9485c6b316&X-Amz-SignedHeaders=host',
  },
  {
    id: 8,
    name: 'Frango Bacon',
    desc: 'Pão brioche · cheddar · alface · tomate · cebola · frango grelhado com bacon',
    tag: 'FRANGO',
    image: 'https://document-export.canva.com/pNRrs/DAHJ7BpNRrs/83/thumbnail/0008.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQYCGKMUHWEOTUD6Q%2F20260517%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20260517T064948Z&X-Amz-Expires=67873&X-Amz-Signature=a2be2feb18621740269977f05317f748a836324e0b198562635d8c572f3194b8&X-Amz-SignedHeaders=host',
  },
  {
    id: 9,
    name: 'Frango Empanado',
    desc: 'Pão brioche · filé empanado e frito · queijo · alface · tomate · molho da casa',
    tag: '🍗 CROCANTE',
    image: 'https://document-export.canva.com/pNRrs/DAHJ7BpNRrs/83/thumbnail/0009.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQYCGKMUHWEOTUD6Q%2F20260517%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20260517T155136Z&X-Amz-Expires=35912&X-Amz-Signature=ae43a78efe45b73d196be1547891e2217c72859143751ff003259fad26c9db4b&X-Amz-SignedHeaders=host',
  },
]

export function BurgerCarousel() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef   = useRef<HTMLDivElement>(null)
  const titleRef   = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return

    const ctx = gsap.context(() => {
      const track   = trackRef.current
      const section = sectionRef.current
      if (!track || !section) return

      /* ── Title reveal ── */
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
        },
      })

      /* ── Horizontal scroll ── */
      const getDistance = () => track.scrollWidth - window.innerWidth

      gsap.to(track, {
        x: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger:            section,
          pin:                true,
          scrub:              0.8,
          invalidateOnRefresh: true,
          end:                () => '+=' + getDistance(),
        },
      })

      /* ── Cards stagger on scroll-enter ── */
      gsap.utils.toArray<HTMLElement>('.burger-card').forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          y: 50,
          duration: 0.6,
          ease: 'power2.out',
          delay: i * 0.05,
          scrollTrigger: {
            trigger:            section,
            start:              'top 70%',
            toggleActions:      'play none none none',
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="cardápio"
      style={{ background: 'var(--mob-surface)', overflow: 'hidden' }}
    >
      <div
        ref={trackRef}
        style={{ display: 'flex', alignItems: 'stretch', willChange: 'transform' }}
      >
        {/* Sticky title card */}
        <div
          ref={titleRef}
          style={{
            minWidth: 'clamp(280px, 28vw, 400px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: 'clamp(2rem, 5vw, 5rem)',
            borderRight: '1px solid var(--mob-border)',
            flexShrink: 0,
          }}
        >
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.7rem',
            letterSpacing: '0.22em',
            color: 'var(--mob-fire)',
            textTransform: 'uppercase',
            marginBottom: '1rem',
          }}>
            Nosso Cardápio
          </p>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3.5rem, 7vw, 7rem)',
            color: 'var(--mob-text)',
            lineHeight: 0.9,
            letterSpacing: '-0.01em',
          }}>
            FEITO<br />
            <span style={{ color: 'var(--mob-fire)' }}>PRA</span><br />
            VOCÊ
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.82rem',
            color: 'var(--mob-muted)',
            marginTop: '1.5rem',
            lineHeight: 1.6,
          }}>
            Arraste para explorar<br />
            todos os burgers ↗
          </p>
        </div>

        {/* Burger cards */}
        {BURGERS.map((b) => (
          <div
            key={b.id}
            className="burger-card"
            style={{
              minWidth: 'clamp(260px, 28vw, 360px)',
              height: '100vh',
              display: 'flex',
              flexDirection: 'column',
              flexShrink: 0,
              borderRight: '1px solid var(--mob-border)',
              position: 'relative',
              overflow: 'hidden',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              const img = e.currentTarget.querySelector('.card-img') as HTMLElement
              if (img) gsap.to(img, { scale: 1.06, duration: 0.5, ease: 'power2.out' })
            }}
            onMouseLeave={(e) => {
              const img = e.currentTarget.querySelector('.card-img') as HTMLElement
              if (img) gsap.to(img, { scale: 1, duration: 0.5, ease: 'power2.out' })
            }}
          >
            {/* Image */}
            <div style={{ position: 'relative', flex: '1', overflow: 'hidden', background: 'var(--mob-card)' }}>
              <div
                className="card-img"
                style={{ position: 'absolute', inset: 0, transformOrigin: 'center' }}
              >
                <Image
                  src={b.image}
                  alt={b.name}
                  fill
                  sizes="360px"
                  style={{ objectFit: 'cover', objectPosition: 'center' }}
                  unoptimized
                />
              </div>
              {/* Gradient overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to bottom, transparent 40%, rgba(8,7,11,0.95) 100%)',
                  zIndex: 1,
                }}
              />
              {/* Tag */}
              <div style={{ position: 'absolute', top: '1rem', left: '1rem', zIndex: 2 }}>
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  background: 'var(--mob-fire)',
                  color: '#fff',
                  padding: '0.25rem 0.65rem',
                  borderRadius: '9999px',
                }}>
                  {b.tag}
                </span>
              </div>
            </div>

            {/* Info */}
            <div style={{
              padding: '1.25rem 1.5rem 1.75rem',
              background: 'var(--mob-card)',
              borderTop: '1px solid var(--mob-border)',
            }}>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)',
                color: 'var(--mob-text)',
                letterSpacing: '0.02em',
                lineHeight: 1,
                marginBottom: '0.5rem',
              }}>
                {b.name}
              </h3>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.75rem',
                color: 'var(--mob-muted)',
                lineHeight: 1.5,
                marginBottom: '1rem',
              }}>
                {b.desc}
              </p>
              <a
                href="#pedido"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.9rem',
                  letterSpacing: '0.06em',
                  color: 'var(--mob-fire)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  transition: 'gap 0.2s',
                }}
              >
                Pedir agora →
              </a>
            </div>
          </div>
        ))}

        {/* End padding */}
        <div style={{ minWidth: 'clamp(2rem, 5vw, 5rem)', flexShrink: 0 }} />
      </div>
    </section>
  )
}
