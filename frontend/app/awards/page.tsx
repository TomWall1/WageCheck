import type { Metadata } from 'next';
import { AWARDS } from '@/lib/awards';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import CheckPayCTA from '@/components/seo/CheckPayCTA';

export const metadata: Metadata = {
  title: 'Australian Modern Awards — Pay Rates & Conditions | Review My Pay',
  description: 'Complete guide to Australian modern award pay rates, penalty rates, and conditions. Find your award and check what you should be paid.',
  keywords: ['modern awards australia', 'award pay rates', 'fair work awards', 'penalty rates', 'casual pay rates'],
};

export default function AwardsIndexPage() {
  const sorted = [...AWARDS].sort((a, b) => a.shortName.localeCompare(b.shortName));

  return (
    <div>
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Awards', href: '/awards' },
      ]} />

      <div style={{ paddingBottom: '1.5rem', borderBottom: '1.5px solid var(--border)', marginBottom: '2rem' }}>
        <h1 style={{
          fontFamily: 'Fraunces, Georgia, serif',
          fontSize: '1.75rem',
          fontWeight: 600,
          letterSpacing: '-0.03em',
          color: 'var(--secondary)',
          lineHeight: 1.2,
        }}>
          Australian Modern Awards
        </h1>
        <p style={{ fontSize: '15px', color: 'var(--secondary-muted)', marginTop: '8px', lineHeight: 1.6 }}>
          Modern awards set minimum pay rates, conditions, and entitlements for employees in different industries. Find your award below to see current pay rates, penalty rates, overtime rules, and more.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
        gap: '1rem',
      }}>
        {sorted.map(award => (
          <a
            key={award.code}
            href={`/awards/${award.slug}`}
            style={{
              display: 'block',
              padding: '16px 20px',
              border: '1.5px solid var(--border)',
              borderRadius: '10px',
              textDecoration: 'none',
              transition: 'border-color 0.15s, box-shadow 0.15s',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span style={{
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '0.06em',
                color: '#ffffff',
                background: 'var(--primary)',
                padding: '2px 6px',
                borderRadius: '4px',
              }}>
                {award.code}
              </span>
              <span style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--secondary)' }}>
                {award.shortName}
              </span>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--secondary-muted)', lineHeight: 1.5, margin: 0 }}>
              {award.description}
            </p>
          </a>
        ))}
      </div>

      <CheckPayCTA />
    </div>
  );
}
