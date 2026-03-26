import type { Metadata } from 'next';
import { GUIDES } from '@/lib/guides';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import CheckPayCTA from '@/components/seo/CheckPayCTA';

export const metadata: Metadata = {
  title: 'Workplace Rights Guides — Pay, Awards & Entitlements | Review My Pay',
  description: 'Plain-English guides to Australian workplace rights: modern awards, penalty rates, casual loading, overtime, wage theft, and how to check if you\'re being underpaid.',
  keywords: ['workplace rights australia', 'modern award guide', 'penalty rates explained', 'casual loading', 'overtime australia'],
};

export default function GuidesIndexPage() {
  return (
    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
      ]} />

      <div style={{ paddingBottom: '1.5rem', borderBottom: '1.5px solid var(--border)', marginBottom: '2rem' }}>
        <h1 style={{
          fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.75rem', fontWeight: 600,
          letterSpacing: '-0.03em', color: 'var(--secondary)', lineHeight: 1.2,
        }}>
          Workplace Rights Guides
        </h1>
        <p style={{ fontSize: '15px', color: 'var(--secondary-muted)', marginTop: '8px', lineHeight: 1.6 }}>
          Everything you need to know about modern awards, pay rates, penalty rates, and your rights as an Australian worker — in plain English.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {GUIDES.map(guide => (
          <a
            key={guide.slug}
            href={`/guides/${guide.slug}`}
            style={{
              display: 'block',
              padding: '16px 20px',
              border: '1.5px solid var(--border)',
              borderRadius: '10px',
              textDecoration: 'none',
              transition: 'border-color 0.15s',
            }}
          >
            <p style={{ fontSize: '15px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
              {guide.title} &rarr;
            </p>
            <p style={{ fontSize: '13px', color: 'var(--secondary-muted)', lineHeight: 1.5, margin: 0 }}>
              {guide.description}
            </p>
          </a>
        ))}
      </div>

      <CheckPayCTA />
    </div>
  );
}
