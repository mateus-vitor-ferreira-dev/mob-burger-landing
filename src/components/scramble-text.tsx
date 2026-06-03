'use client'

import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#@$%&!?'

interface ScrambleTextProps {
  text: string
  style?: React.CSSProperties
  className?: string
  duration?: number   // segundos para resolver
  delay?: number
  once?: boolean
}

export function ScrambleText({ text, style, className, duration = 0.7, delay = 0, once = true }: ScrambleTextProps) {
  const spanRef = useRef<HTMLSpanElement>(null)
  const rafRef  = useRef<number | null>(null)

  useLayoutEffect(() => {
    const el = spanRef.current
    if (!el) return

    const original = text
    const fps = 60
    const totalFrames = Math.round(duration * fps)

    const runScramble = () => {
      let frame = 0
      if (rafRef.current) cancelAnimationFrame(rafRef.current)

      const tick = () => {
        const progress = frame / totalFrames
        el.textContent = original
          .split('')
          .map((ch, i) => {
            if (ch === ' ') return ' '
            if (i / original.length < progress) return original[i]
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          })
          .join('')

        frame++
        if (frame <= totalFrames) {
          rafRef.current = requestAnimationFrame(tick)
        } else {
          el.textContent = original
        }
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 82%',
        once,
        onEnter: () => {
          if (delay > 0) {
            setTimeout(runScramble, delay * 1000)
          } else {
            runScramble()
          }
        },
      })
    })

    return () => {
      ctx.revert()
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [text, duration, delay, once])

  return (
    <span ref={spanRef} style={style} className={className}>
      {text}
    </span>
  )
}
