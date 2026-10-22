/* ─── Preferências de movimento e de ponteiro ──────────────────
   Centraliza as media queries usadas pelos efeitos GSAP para que
   CSS e JS concordem sobre quando cada efeito está ativo. */

export const REDUCED_MOTION_MQ = '(prefers-reduced-motion: reduce)'

/** Mouse/trackpad de verdade — cursor customizado, magnetic e tilt só fazem sentido aqui */
export const FINE_POINTER_MQ = '(hover: hover) and (pointer: fine)'

/** Quando o carrossel do cardápio vira scroll horizontal "pinado" pelo GSAP */
export const PINNED_CAROUSEL_MQ =
  '(min-width: 1280px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)'

function matches(query: string) {
  return typeof window !== 'undefined' && window.matchMedia(query).matches
}

export const prefersReducedMotion = () => matches(REDUCED_MOTION_MQ)
export const hasFinePointer       = () => matches(FINE_POINTER_MQ)

/* ─── Trava de scroll da página ─────────────────────────────────
   Trava no <html>: como ele tem overflow-x próprio, o overflow do
   <body> não se propaga para o viewport e não trava nada sozinho.
   Contador para intro, menu e modal não se atropelarem. */
let scrollLocks = 0

export function lockScroll() {
  if (scrollLocks++ === 0) document.documentElement.style.overflow = 'hidden'
}

export function unlockScroll() {
  scrollLocks = Math.max(0, scrollLocks - 1)
  if (scrollLocks === 0) document.documentElement.style.overflow = ''
}
