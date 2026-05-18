export function MarqueeStrip() {
  const items = [
    'M.O.B BURGER',
    'LAVRAS · MG',
    'FEITO NA HORA',
    'INGREDIENTES FRESCOS',
    'PIX · CARTÃO',
    'SEM COMISSÃO',
    'PEÇA AGORA',
  ]

  const repeated = [...items, ...items]

  return (
    <div
      style={{
        background: 'var(--mob-fire)',
        overflow: 'hidden',
        padding: '0.65rem 0',
        borderTop:    '1px solid rgba(255,255,255,0.1)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      <div className="marquee-track flex items-center gap-0 whitespace-nowrap w-max">
        {repeated.map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(0.85rem, 1.5vw, 1rem)',
              letterSpacing: '0.18em',
              color: '#fff',
              padding: '0 2.5rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '2.5rem',
            }}
          >
            {item}
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'rgba(255,255,255,0.55)', display: 'inline-block' }} />
          </span>
        ))}
      </div>
    </div>
  )
}
