import Image from 'next/image'

const FOOTER_LINKS = [
  { label: 'Cardápio',     href: '#cardápio' },
  { label: 'Sobre',        href: '#sobre' },
  { label: 'Como Pedir',   href: '#como-pedir' },
  { label: 'Fazer Pedido', href: '#pedido' },
]

const footerHeading: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: '0.72rem',
  fontWeight: 400,
  letterSpacing: '0.2em',
  color: 'var(--mob-fire)',
  textTransform: 'uppercase',
  marginBottom: '1rem',
}

export function Footer() {
  return (
    <footer
      style={{
        background: 'var(--mob-black)',
        borderTop: '1px solid var(--mob-border)',
        padding: 'clamp(2.5rem, 5vw, 4rem) 0',
      }}
    >
      <div className="mob-container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))',
            gap: 'clamp(2rem, 4vw, 3rem)',
            marginBottom: '3rem',
          }}
        >
          {/* Brand */}
          <div>
            <Image
              src="/mob-logo.webp"
              alt="M.O.B Burger"
              width={120}
              height={120}
              style={{ width: 'clamp(80px, 10vw, 120px)', height: 'auto', marginBottom: '0.75rem' }}
            />
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: '0.72rem',
              letterSpacing: '0.15em', color: 'var(--mob-fire)',
              textTransform: 'uppercase', marginBottom: '0.4rem',
            }}>
              Original&apos;s
            </p>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem',
                color: 'var(--mob-muted)',
                lineHeight: 1.6,
                maxWidth: '240px',
              }}
            >
              Felicidade tem cheiro de hambúrguer na chapa.
            </p>
          </div>

          {/* Links */}
          <nav aria-labelledby="footer-nav-title">
            <h2 id="footer-nav-title" style={footerHeading}>
              Navegação
            </h2>
            <ul style={{ listStyle: 'none' }}>
              {FOOTER_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-link"
                    style={{
                      display: 'inline-block',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.95rem',
                      padding: '0.3rem 0',
                    }}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h2 style={footerHeading}>
              Contato
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[
                { label: 'Instagram',   value: '@murilooriginalburger', href: 'https://www.instagram.com/murilooriginalburger?igsh=MWkxczJzbGp4MnY3Mg==' },
                { label: 'WhatsApp',    value: '(35) 99720-9115',       href: 'https://wa.me/5535997209115' },
                { label: 'Localização', value: 'Lavras, MG',            href: undefined },
              ].map(({ label, value, href }) => (
                <div key={label}>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: 'var(--mob-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    {label}
                  </p>
                  {href ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="footer-contact-link"
                      style={{ display: 'inline-block', fontFamily: 'var(--font-body)', fontSize: '0.95rem', padding: '0.15rem 0' }}
                    >
                      {value}
                    </a>
                  ) : (
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--mob-text)' }}>
                      {value}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Hours */}
          <div>
            <h2 style={footerHeading}>
              Horário
            </h2>
            {[
              { day: 'Seg – Qua', time: '18h30 – 22h30' },
              { day: 'Qui – Dom', time: '18h30 – 23h' },
            ].map(({ day, time }) => (
              <div key={day} className="flex justify-between gap-4 mb-1.5" style={{ maxWidth: '220px' }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--mob-muted)' }}>{day}</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--mob-text)' }}>{time}</p>
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
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--mob-muted)' }}>
            {`© ${new Date().getFullYear()} Original's — Todos os direitos reservados`}
          </p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--mob-muted)' }}>
            Desenvolvido por{' '}
            <span style={{ color: 'var(--mob-fire)' }}>Codexa</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
