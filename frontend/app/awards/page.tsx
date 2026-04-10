import type { Metadata } from 'next';
import { AWARDS } from '@/lib/awards';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import CheckPayCTA from '@/components/seo/CheckPayCTA';
import AwardSearch from '@/components/seo/AwardSearch';

export const metadata: Metadata = {
  title: 'Australian Modern Awards \u2014 Pay Rates & Conditions | Review My Pay',
  description: 'Complete guide to Australian modern award pay rates, penalty rates, and conditions. Find your award and check what you should be paid.',
  keywords: ['modern awards australia', 'award pay rates', 'fair work awards', 'penalty rates', 'casual pay rates'],
};

export default function AwardsIndexPage() {
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

      <AwardSearch awards={AWARDS} />

      <CheckPayCTA />
    </div>
  );
}
