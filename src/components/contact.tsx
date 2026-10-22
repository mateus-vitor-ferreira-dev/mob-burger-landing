import { Clock, MapPin } from 'lucide-react'

const HOURS = [
  { day: 'Seg – Qua', time: '18h30 – 22h30' },
  { day: 'Qui – Dom', time: '18h30 – 23h' },
]

function InstagramIcon() {
  return (
    <svg aria-hidden viewBox="0 0 48 48" style={{ width: '2.5rem', height: '2.5rem', flexShrink: 0 }} xmlns="http://www.w3.org/2000/svg">
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
  )
}

function WhatsAppIcon() {
  return (
    <svg aria-hidden viewBox="0 0 48 48" style={{ width: '2.5rem', height: '2.5rem', flexShrink: 0 }} xmlns="http://www.w3.org/2000/svg">
      <path fill="#25D366" d="M24 4C13 4 4 13 4 24c0 3.6.96 7 2.64 9.94L4 44l10.36-2.6A19.9 19.9 0 0 0 24 44c11 0 20-9 20-20S35 4 24 4z"/>
      <path fill="#fff" d="M35 28.9c-.45-.22-2.64-1.3-3.05-1.45-.4-.15-.7-.22-1 .22-.3.45-1.15 1.45-1.4 1.75-.26.3-.52.34-.97.11-.45-.22-1.9-.7-3.62-2.23-1.34-1.2-2.24-2.67-2.5-3.12-.26-.45-.03-.7.2-.92.2-.2.44-.52.67-.78.22-.26.3-.45.44-.74.15-.3.08-.56-.04-.78-.11-.22-1-2.42-1.38-3.3-.36-.87-.73-.75-1-.76l-.86-.02c-.3 0-.78.11-1.19.56-.4.45-1.53 1.5-1.53 3.65s1.57 4.23 1.79 4.52c.22.3 3.1 4.73 7.5 6.63 1.05.45 1.87.72 2.5.92.05.02.1.03.16.05 1.02.32 1.95.28 2.69.17.82-.12 2.53-1.03 2.89-2.03.35-.99.35-1.84.24-2.02-.1-.18-.38-.3-.83-.52z"/>
    </svg>
  )
}

const cardLabel: React.CSSProperties = {
  fontFamily: 'var(--font-body)', fontSize: '0.72rem',
  letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '0.4rem',
}

const cardValue: React.CSSProperties = {
  fontFamily: 'var(--font-display)', fontSize: 'clamp(1.35rem, 2vw, 1.6rem)',
  color: 'var(--mob-text)', letterSpacing: '0.02em', overflowWrap: 'anywhere',
}

const cardHint: React.CSSProperties = {
  fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--mob-muted)', marginTop: '0.3rem',
}

export function Contact() {
  return (
    <section
      id="contato"
      aria-labelledby="contato-title"
      style={{
        background: 'var(--mob-black)',
        borderTop: '1px solid var(--mob-border)',
        padding: 'clamp(4rem, 8vw, 7rem) 0',
      }}
    >
      <div className="mob-container">

        {/* Label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: 'clamp(2rem, 5vw, 3.5rem)' }}>
          <h2 id="contato-title" className="eyebrow">Fale com a gente</h2>
          <div aria-hidden style={{ flex: 1, height: '1px', background: 'var(--mob-border)' }} />
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))',
          gap: 'clamp(1rem, 3vw, 2.5rem)',
        }}>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/murilooriginalburger?igsh=MWkxczJzbGp4MnY3Mg=="
            target="_blank"
            rel="noopener noreferrer"
            className="card card-interactive"
            style={{
              display: 'flex', alignItems: 'flex-start', gap: '1.25rem',
              padding: 'clamp(1.5rem, 2.5vw, 2rem)',
            }}
          >
            <InstagramIcon />
            <div style={{ minWidth: 0 }}>
              <p style={{ ...cardLabel, color: 'var(--mob-fire)' }}>Instagram</p>
              <p style={cardValue}>@murilooriginalburger</p>
              <p style={cardHint}>Acompanhe novidades e promoções</p>
            </div>
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/5535997209115"
            target="_blank"
            rel="noopener noreferrer"
            className="card card-interactive"
            style={{
              display: 'flex', alignItems: 'flex-start', gap: '1.25rem',
              padding: 'clamp(1.5rem, 2.5vw, 2rem)',
              ['--card-accent' as string]: 'rgba(37,211,102,0.45)',
            }}
          >
            <WhatsAppIcon />
            <div style={{ minWidth: 0 }}>
              <p style={{ ...cardLabel, color: '#25D366' }}>WhatsApp</p>
              <p style={cardValue}>(35) 99720-9115</p>
              <p style={cardHint}>Pedidos e dúvidas direto no chat</p>
            </div>
          </a>

          {/* Horário — informativo, sem hover (não é clicável) */}
          <div className="card" style={{ padding: 'clamp(1.5rem, 2.5vw, 2rem)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem' }}>
              <span className="icon-tile" aria-hidden style={{ width: '2.5rem', height: '2.5rem', borderRadius: '10px' }}>
                <Clock size={20} />
              </span>
              <div style={{ width: '100%' }}>
                <h3 style={{ ...cardLabel, color: 'var(--mob-fire)', fontWeight: 400, marginBottom: '0.75rem' }}>
                  Horário de Funcionamento
                </h3>
                <dl style={{ maxWidth: '240px' }}>
                  {HOURS.map(({ day, time }) => (
                    <div key={day} style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', marginBottom: '0.4rem' }}>
                      <dt style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--mob-muted)' }}>{day}</dt>
                      <dd style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--mob-text)', fontWeight: 500 }}>{time}</dd>
                    </div>
                  ))}
                </dl>
                <p style={{ ...cardHint, marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <MapPin aria-hidden size={14} style={{ color: 'var(--mob-fire)' }} />
                  Lavras, MG
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
