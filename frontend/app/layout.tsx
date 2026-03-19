import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'WageCheck — Know Your Workplace Rights',
  description:
    'Find out what you should be paid under your Fair Work modern award. Free, plain-English, and built for workers — not lawyers.',
  keywords: ['wage theft', 'hospitality award', 'retail award', 'fitness award', 'fair work', 'underpaid', 'Australia', 'award wages'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU">
      <body className="min-h-screen flex flex-col">

        {/* Legal disclaimer — quiet strip */}
        <div style={{
          background: '#FFFBEB',
          borderBottom: '1px solid #FDE68A',
          padding: '5px 16px',
          textAlign: 'center',
          fontSize: '11.5px',
          color: '#92400E',
          letterSpacing: '0.01em',
        }}>
          General information only — not legal advice. If you think you&apos;ve been underpaid,{' '}
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

        {/* Header — typographic wordmark */}
        <header style={{
          background: '#FFFFFF',
          borderBottom: '1px solid #E4DFD8',
          padding: '14px 16px',
        }}>
          <div className="max-w-2xl mx-auto flex items-baseline justify-between">
            <a href="/" style={{ textDecoration: 'none' }}>
              <span style={{
                fontFamily: 'Fraunces, Georgia, serif',
                fontWeight: 500,
                fontSize: '1.375rem',
                color: '#111111',
                letterSpacing: '-0.03em',
              }}>
                WageCheck
              </span>
            </a>
            <div style={{
              fontSize: '11px',
              color: '#6B6560',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              fontWeight: 500,
              textAlign: 'right',
              lineHeight: 1.5,
            }}>
              <div>Fair Work Modern Awards</div>
              <div style={{ color: '#A09890' }}>Effective 1 July 2025</div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 px-4 py-10">
          <div className="max-w-2xl mx-auto">
            {children}
          </div>
        </main>

        {/* Footer */}
        <footer style={{
          background: '#FFFFFF',
          borderTop: '1px solid #E4DFD8',
          padding: '24px 16px',
          marginTop: '2rem',
        }}>
          <div className="max-w-2xl mx-auto" style={{ fontSize: '12px', color: '#6B6560', lineHeight: 1.7 }}>
            <p style={{ marginBottom: '8px' }}>
              <span style={{ color: '#44403C', fontWeight: 600 }}>This tool provides general information only — not legal advice.</span>{' '}
              Pay rates shown are minimum rates under the applicable Fair Work modern award, effective 1 July 2025.
              Always verify current rates at{' '}
              <a
                href="https://www.fairwork.gov.au"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'underline', color: '#1B5A9C' }}
              >
                fairwork.gov.au
              </a>
              . Rates are updated each July.
            </p>
            <p style={{ color: '#A09890' }}>
              WageCheck does not store any personal information. Your shift details exist only in your browser session.
              {' '}·{' '}
              Fair Work Ombudsman: 13 13 94
            </p>
          </div>
        </footer>

      </body>
    </html>
  );
}
