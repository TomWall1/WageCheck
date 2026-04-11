import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found | Review My Pay',
  description: 'The page you are looking for does not exist. Find your award and check your pay rates.',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '50vh', textAlign: 'center', padding: '2rem' }}>
      <h1 style={{
        fontFamily: 'Fraunces, Georgia, serif',
        fontSize: '2rem',
        fontWeight: 600,
        letterSpacing: '-0.03em',
        color: 'var(--secondary)',
        marginBottom: '1rem',
      }}>
        Page not found
      </h1>
      <p style={{ fontSize: '15px', color: 'var(--secondary-muted)', lineHeight: 1.6, maxWidth: '440px', marginBottom: '2rem' }}>
        The page you are looking for does not exist or may have been moved.
      </p>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <a href="/" style={{
          display: 'inline-block', padding: '10px 20px', background: 'var(--primary)',
          color: '#fff', borderRadius: '8px', textDecoration: 'none', fontSize: '14px', fontWeight: 600,
        }}>
          Go to homepage
        </a>
        <a href="/awards" style={{
          display: 'inline-block', padding: '10px 20px', border: '1.5px solid var(--border)',
          color: 'var(--secondary)', borderRadius: '8px', textDecoration: 'none', fontSize: '14px', fontWeight: 600,
        }}>
          Browse awards
        </a>
        <a href="/check-my-pay" style={{
          display: 'inline-block', padding: '10px 20px', border: '1.5px solid var(--border)',
          color: 'var(--secondary)', borderRadius: '8px', textDecoration: 'none', fontSize: '14px', fontWeight: 600,
        }}>
          Check my pay
        </a>
      </div>
    </div>
  );
}
