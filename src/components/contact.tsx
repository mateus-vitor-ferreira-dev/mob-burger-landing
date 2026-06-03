'use client'

export function Contact() {
  return (
    <section
      id="contato"
      style={{
        background: 'var(--mob-black)',
        borderTop: '1px solid var(--mob-border)',
        padding: 'clamp(4rem, 8vw, 7rem) 0',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 clamp(2rem, 6vw, 6rem)' }}>

        {/* Label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3.5rem' }}>
          <span style={{
            fontFamily: 'var(--font-body)', fontSize: '0.7rem',
            letterSpacing: '0.25em', color: 'var(--mob-fire)', textTransform: 'uppercase',
          }}>
            Fale com a gente
          </span>
          <div style={{ flex: 1, height: '1px', background: 'var(--mob-border)' }} />
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 'clamp(1.5rem, 3vw, 2.5rem)',
        }}>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/murilooriginalburger?igsh=MWkxczJzbGp4MnY3Mg=="
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex', alignItems: 'flex-start', gap: '1.25rem',
              background: 'var(--mob-card)', border: '1px solid var(--mob-border)',
              borderRadius: '20px', padding: 'clamp(1.5rem, 2.5vw, 2rem)',
              transition: 'border-color 0.3s, transform 0.3s', textDecoration: 'none',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.borderColor = 'rgba(255,69,0,0.4)'
              el.style.transform = 'translateY(-4px)'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.borderColor = 'var(--mob-border)'
              el.style.transform = 'translateY(0)'
            }}
          >
            <svg viewBox="0 0 48 48" style={{ width: '2.2rem', height: '2.2rem', flexShrink: 0, marginTop: '0.05rem' }} xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="ig-g1" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f09433"/>
                  <stop offset="25%" stopColor="#e6683c"/>
                  <stop offset="50%" stopColor="#dc2743"/>
                  <stop offset="75%" stopColor="#cc2366"/>
                  <stop offset="100%" stopColor="#bc1888"/>
                </linearGradient>
              </defs>
              <rect x="4" y="4" width="40" height="40" rx="10" fill="url(#ig-g1)"/>
              <circle cx="24" cy="24" r="9" fill="none" stroke="white" strokeWidth="3"/>
              <circle cx="35" cy="13" r="2.5" fill="white"/>
            </svg>
            <div>
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: '0.65rem',
                letterSpacing: '0.18em', color: 'var(--mob-fire)',
                textTransform: 'uppercase', marginBottom: '0.4rem',
              }}>
                Instagram
              </p>
              <p style={{
                fontFamily: 'var(--font-display)', fontSize: 'clamp(1.2rem, 2vw, 1.6rem)',
                color: 'var(--mob-text)', letterSpacing: '0.02em',
              }}>
                @murilooriginalburger
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--mob-muted)', marginTop: '0.3rem' }}>
                Acompanhe novidades e promoções
              </p>
            </div>
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/5535997209115"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex', alignItems: 'flex-start', gap: '1.25rem',
              background: 'var(--mob-card)', border: '1px solid var(--mob-border)',
              borderRadius: '20px', padding: 'clamp(1.5rem, 2.5vw, 2rem)',
              transition: 'border-color 0.3s, transform 0.3s', textDecoration: 'none',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.borderColor = 'rgba(37,211,102,0.4)'
              el.style.transform = 'translateY(-4px)'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.borderColor = 'var(--mob-border)'
              el.style.transform = 'translateY(0)'
            }}
          >
            <svg viewBox="0 0 48 48" style={{ width: '2.2rem', height: '2.2rem', flexShrink: 0, marginTop: '0.05rem' }} xmlns="http://www.w3.org/2000/svg">
              <path fill="#25D366" d="M24 4C13 4 4 13 4 24c0 3.6.96 7 2.64 9.94L4 44l10.36-2.6A19.9 19.9 0 0 0 24 44c11 0 20-9 20-20S35 4 24 4z"/>
              <path fill="#fff" d="M35 28.9c-.45-.22-2.64-1.3-3.05-1.45-.4-.15-.7-.22-1 .22-.3.45-1.15 1.45-1.4 1.75-.26.3-.52.34-.97.11-.45-.22-1.9-.7-3.62-2.23-1.34-1.2-2.24-2.67-2.5-3.12-.26-.45-.03-.7.2-.92.2-.2.44-.52.67-.78.22-.26.3-.45.44-.74.15-.3.08-.56-.04-.78-.11-.22-1-2.42-1.38-3.3-.36-.87-.73-.75-1-.76l-.86-.02c-.3 0-.78.11-1.19.56-.4.45-1.53 1.5-1.53 3.65s1.57 4.23 1.79 4.52c.22.3 3.1 4.73 7.5 6.63 1.05.45 1.87.72 2.5.92.05.02.1.03.16.05 1.02.32 1.95.28 2.69.17.82-.12 2.53-1.03 2.89-2.03.35-.99.35-1.84.24-2.02-.1-.18-.38-.3-.83-.52z"/>
            </svg>
            <div>
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: '0.65rem',
                letterSpacing: '0.18em', color: '#25D366',
                textTransform: 'uppercase', marginBottom: '0.4rem',
              }}>
                WhatsApp
              </p>
              <p style={{
                fontFamily: 'var(--font-display)', fontSize: 'clamp(1.2rem, 2vw, 1.6rem)',
                color: 'var(--mob-text)', letterSpacing: '0.02em',
              }}>
                (35) 99720-9115
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--mob-muted)', marginTop: '0.3rem' }}>
                Pedidos e dúvidas direto no chat
              </p>
            </div>
          </a>

          {/* Horário */}
          <div
            style={{
              background: 'var(--mob-card)',
              border: '1px solid var(--mob-border)',
              borderRadius: '20px', padding: 'clamp(1.5rem, 2.5vw, 2rem)',
              transition: 'border-color 0.3s, transform 0.3s',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.borderColor = 'rgba(59,130,246,0.45)'
              el.style.transform = 'translateY(-4px)'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.borderColor = 'var(--mob-border)'
              el.style.transform = 'translateY(0)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem' }}>
              <span style={{ fontSize: '2rem', lineHeight: 1, marginTop: '0.1rem' }}>🕐</span>
              <div style={{ width: '100%' }}>
                <p style={{
                  fontFamily: 'var(--font-body)', fontSize: '0.65rem',
                  letterSpacing: '0.18em', color: 'var(--mob-fire)',
                  textTransform: 'uppercase', marginBottom: '0.75rem',
                }}>
                  Horário de Funcionamento
                </p>
                {[
                  { day: 'Seg – Qua', time: '18h30 – 22h30' },
                  { day: 'Qui – Dom', time: '18h30 – 23h' },
                ].map(({ day, time }) => (
                  <div key={day} style={{
                    display: 'flex', justifyContent: 'space-between',
                    marginBottom: '0.4rem', maxWidth: '220px',
                  }}>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--mob-muted)' }}>{day}</p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--mob-text)', fontWeight: 500 }}>{time}</p>
                  </div>
                ))}
                <p style={{
                  fontFamily: 'var(--font-body)', fontSize: '0.72rem',
                  color: 'var(--mob-muted)', marginTop: '0.75rem',
                }}>
                  📍 Lavras, MG
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
