import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://reviewmypay.com'),
  title: 'Review My Pay — Know Your Workplace Rights',
  description:
    'Find out what you should be paid under your Fair Work modern award. Free, plain-English, and built for workers — not lawyers.',
  keywords: ['wage theft', 'hospitality award', 'retail award', 'fitness award', 'fair work', 'underpaid', 'Australia', 'award wages'],
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    siteName: 'Review My Pay',
  },
  twitter: {
    card: 'summary',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU">
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-G8305YSV8S"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-G8305YSV8S');
        `}</Script>
        {/* Google AdSense — must be in raw HTML for crawler verification */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2221570965183279"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-screen flex flex-col">

        {/* Legal disclaimer — quiet strip */}
        <div style={{
          background: 'var(--accent-light)',
          borderBottom: '1px solid rgba(255,183,77,0.35)',
          padding: '5px 16px',
          textAlign: 'center',
          fontSize: '11.5px',
          color: 'var(--accent-dark)',
          letterSpacing: '0.01em',
        }}>
          General information only — not legal advice. First speak with your employer, then if unsuccessful{' '}
          <a
            href="https://www.fairwork.gov.au"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'underline', fontWeight: 600 }}
          >
            contact Fair Work
          </a>{' '}
          or an employment lawyer.
        </div>

        {/* Header */}
        <header style={{
          background: '#ffffff',
          borderBottom: '1.5px solid var(--border)',
          padding: '14px 16px',
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }} className="flex items-center justify-between">
            <a href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
              <svg width="160" height="52" viewBox="0 0 200 80" xmlns="http://www.w3.org/2000/svg">
                <text x="100" y="30" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="20" fill="#263238">REVIEW MY</text>
                <line x1="70" y1="42" x2="130" y2="42" stroke="#FFB74D" strokeWidth="3" strokeLinecap="round"/>
                <text x="100" y="70" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="900" fontSize="32" fill="#FFB74D">PAY</text>
              </svg>
            </a>
            <nav style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <a href="/awards" className="nav-link">Awards</a>
              <a href="/guides" className="nav-link">Guides</a>
              <a href="/about" className="nav-link">About</a>
              <a href="/contact" className="nav-link">Contact</a>
            </nav>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 px-4 py-10">
          {children}
        </main>

        {/* Footer */}
        <footer style={{
          background: '#ffffff',
          borderTop: '1.5px solid var(--border)',
          padding: '40px 16px 24px',
          marginTop: '2rem',
        }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>

            {/* Footer columns */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: '2rem',
              paddingBottom: '2rem',
              borderBottom: '1px solid var(--border)',
            }}>
              {/* Navigate */}
              <div>
                <p style={{ fontSize: '11.5px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--secondary)', marginBottom: '12px' }}>
                  Navigate
                </p>
                <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[
                    { href: '/', label: 'Home' },
                    { href: '/awards', label: 'Awards' },
                    { href: '/guides', label: 'Guides' },
                    { href: '/check-my-pay', label: 'Check My Pay' },
                    { href: '/about', label: 'About' },
                    { href: '/contact', label: 'Contact' },
                  ].map((link) => (
                    <a key={link.href} href={link.href} style={{ fontSize: '13px', color: 'var(--secondary-muted)', textDecoration: 'none', transition: 'color 0.15s' }}>
                      {link.label}
                    </a>
                  ))}
                </nav>
              </div>

              {/* Legal */}
              <div>
                <p style={{ fontSize: '11.5px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--secondary)', marginBottom: '12px' }}>
                  Legal
                </p>
                <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <a href="/privacy" style={{ fontSize: '13px', color: 'var(--secondary-muted)', textDecoration: 'none' }}>Privacy Policy</a>
                </nav>
                <p style={{ fontSize: '12px', color: 'var(--secondary-muted)', lineHeight: 1.6, marginTop: '12px' }}>
                  General information only — not legal advice. Not affiliated with the Fair Work Ombudsman.
                </p>
              </div>

              {/* Contact */}
              <div>
                <p style={{ fontSize: '11.5px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--secondary)', marginBottom: '12px' }}>
                  Get help
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: 'var(--secondary-muted)' }}>
                  <a href="/contact" style={{ color: 'var(--secondary-muted)', textDecoration: 'none' }}>
                    Contact us
                  </a>
                  <div>
                    Fair Work Ombudsman:{' '}
                    <a href="tel:131394" style={{ color: 'var(--secondary)', fontWeight: 600, textDecoration: 'none' }}>13 13 94</a>
                  </div>
                  <a href="https://www.fairwork.gov.au" target="_blank" rel="noopener noreferrer"
                    style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 500 }}>
                    fairwork.gov.au
                  </a>
                </div>
              </div>
            </div>

            {/* Copyright bar */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: '1.25rem',
              fontSize: '12px',
              color: 'var(--secondary-muted)',
              gap: '8px',
            }}>
              <span>&copy; {new Date().getFullYear()} Review My Pay</span>
              <span style={{ fontSize: '11.5px', opacity: 0.7 }}>
                Built in Australia for Australian workers
              </span>
            </div>

          </div>
        </footer>


      </body>
    </html>
  );
}
