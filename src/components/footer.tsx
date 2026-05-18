import Image from 'next/image'

export function Footer() {
  return (
    <footer
      style={{
        background: 'var(--mob-black)',
        borderTop: '1px solid var(--mob-border)',
        padding: 'clamp(2.5rem, 5vw, 4rem) clamp(1.5rem, 5vw, 5rem)',
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 'clamp(2rem, 4vw, 3rem)',
            marginBottom: '3rem',
          }}
        >
          {/* Brand */}
          <div>
            <Image
              src="/mob-logo.png"
              alt="M.O.B Burger"
              width={120}
              height={120}
              style={{ width: 'clamp(80px, 10vw, 120px)', height: 'auto', marginBottom: '0.75rem' }}
            />
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.8rem',
                color: 'var(--mob-muted)',
                lineHeight: 1.6,
                maxWidth: '220px',
              }}
            >
              Felicidade tem cheiro de hambúrguer na chapa.
            </p>
          </div>

          {/* Links */}
          <div>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.65rem',
              letterSpacing: '0.2em',
              color: 'var(--mob-fire)',
              textTransform: 'uppercase',
              marginBottom: '1rem',
            }}>
              Navegação
            </p>
            {['Cardápio', 'Sobre', 'Combos', 'Fazer Pedido'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.85rem',
                  color: 'var(--mob-muted)',
                  marginBottom: '0.5rem',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'var(--mob-text)')}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'var(--mob-muted)')}
              >
                {item}
              </a>
            ))}
          </div>

          {/* Contact */}
          <div>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.65rem',
              letterSpacing: '0.2em',
              color: 'var(--mob-fire)',
              textTransform: 'uppercase',
              marginBottom: '1rem',
            }}>
              Contato
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[
                { label: 'Instagram',  value: '@mcburguer0' },
                { label: 'WhatsApp',   value: '(35) 99720-9115' },
                { label: 'Localização', value: 'Lavras, MG' },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', color: 'var(--mob-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    {label}
                  </p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--mob-text)' }}>
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Hours */}
          <div>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.65rem',
              letterSpacing: '0.2em',
              color: 'var(--mob-fire)',
              textTransform: 'uppercase',
              marginBottom: '1rem',
            }}>
              Horário
            </p>
            {[
              { day: 'Seg – Sex',  time: '18h – 23h' },
              { day: 'Sábados',   time: '12h – 00h' },
              { day: 'Domingos',  time: '12h – 22h' },
            ].map(({ day, time }) => (
              <div key={day} className="flex justify-between gap-4 mb-1.5" style={{ maxWidth: '180px' }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--mob-muted)' }}>{day}</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--mob-text)' }}>{time}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid var(--mob-border)',
            paddingTop: '1.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: 'var(--mob-muted)' }}>
            © 2025 Mob Burger — Todos os direitos reservados
          </p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: 'var(--mob-muted)' }}>
            Desenvolvido por{' '}
            <span style={{ color: 'var(--mob-fire)' }}>Codexa</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
