import type { Metadata } from 'next';
import Script from 'next/script';
import AdSidebar from '@/components/ads/AdSidebar';
import AdMobileAnchor from '@/components/ads/AdMobileAnchor';
import './globals.css';

export const metadata: Metadata = {
  title: 'Review My Pay — Know Your Workplace Rights',
  description:
    'Find out what you should be paid under your Fair Work modern award. Free, plain-English, and built for workers — not lawyers.',
  keywords: ['wage theft', 'hospitality award', 'retail award', 'fitness award', 'fair work', 'underpaid', 'Australia', 'award wages'],
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
        {/* Google AdSense */}
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2221570965183279"
          strategy="afterInteractive"
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
              <a href="/resources" className="nav-link">Resources</a>
              <a href="/contact" className="nav-link">Contact</a>
            </nav>
          </div>
        </header>

        {/* Main content — centered with ad rails on desktop */}
        <main className="flex-1 px-4 py-10 pb-20 md:pb-10">
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'center', gap: '2rem' }}>
            {/* Left ad rail — hidden on mobile */}
            <aside className="hidden lg:block" style={{ width: '160px', flexShrink: 0 }}>
              <div style={{ position: 'sticky', top: '1.5rem' }}>
                <AdSidebar />
              </div>
            </aside>
            {/* Main content column — always centered */}
            <div style={{ width: '100%', maxWidth: '560px', minWidth: 0 }}>
              {children}
            </div>
            {/* Right ad rail — hidden on mobile */}
            <aside className="hidden lg:block" style={{ width: '160px', flexShrink: 0 }}>
              <div style={{ position: 'sticky', top: '1.5rem' }}>
                <AdSidebar />
              </div>
            </aside>
          </div>
        </main>

        {/* Footer */}
        <footer style={{
          background: '#ffffff',
          borderTop: '1.5px solid var(--border)',
          padding: '24px 16px',
          marginTop: '2rem',
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', fontSize: '12px', color: 'var(--secondary-muted)', lineHeight: 1.7 }}>
            <p style={{ marginBottom: '8px' }}>
              <span style={{ color: 'var(--secondary)', fontWeight: 600 }}>This tool provides general information only — not legal advice.</span>{' '}
              Pay rates shown are minimum rates under the applicable Fair Work modern award, effective 1 July 2025.
              Always verify current rates at{' '}
              <a
                href="https://www.fairwork.gov.au"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'underline', color: 'var(--primary)' }}
              >
                fairwork.gov.au
              </a>
              . Rates are updated each July.
            </p>
            <p style={{ opacity: 0.75 }}>
              Review My Pay does not store any personal information. Your shift details exist only in your browser session.
              {' '}·{' '}
              Fair Work Ombudsman: 13 13 94
            </p>
          </div>
        </footer>

        {/* Mobile anchor ad — fixed to bottom, hidden on desktop */}
        <AdMobileAnchor />

      </body>
    </html>
  );
}
