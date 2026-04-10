import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAwardBySlug, getAllAwardSlugs } from '@/lib/awards';
import { getDeepContent } from '@/lib/award-content-registry';
import { serverFetch } from '@/lib/api-server';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import SubPageNav from '@/components/seo/SubPageNav';
import CheckPayCTA from '@/components/seo/CheckPayCTA';

interface Props { params: Promise<{ awardSlug: string }>; }

export function generateStaticParams() {
  return getAllAwardSlugs().map(slug => ({ awardSlug: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { awardSlug } = await params;
  const award = getAwardBySlug(awardSlug);
  if (!award) return {};
  const dc = getDeepContent(awardSlug);
  if (dc?.subPageMeta?.['allowances']) {
    return { title: dc.subPageMeta['allowances'].title, description: dc.subPageMeta['allowances'].description };
  }
  return {
    title: `${award.shortName} Allowances 2025 \u2014 Meal, Uniform, Vehicle & More | Review My Pay`,
    description: `All allowances under the ${award.shortName}: meal, uniform, laundry, vehicle, first aid, and more. Current dollar amounts for 2025.`,
  };
}

interface Allowance {
  allowance_type: string; name: string; description: string;
  amount: string; per_unit: string;
}

export default async function AllowancesPage({ params }: Props) {
  const { awardSlug } = await params;
  const award = getAwardBySlug(awardSlug);
  if (!award) notFound();

  const dc = getDeepContent(awardSlug);

  if (dc?.subPageComponents?.['allowances']) {
    const AllowancesContent = dc.subPageComponents['allowances'];
    let rates;
    if (dc.getRates) {
      try { rates = await dc.getRates(); } catch { /* rates stay undefined */ }
    }
    return (
      <div>
        <Breadcrumbs items={[
          { label: 'Home', href: '/' },
          { label: 'Awards', href: '/awards' },
          { label: award.shortName, href: `/awards/${awardSlug}` },
          { label: 'Allowances', href: `/awards/${awardSlug}/allowances` },
        ]} />
        <SubPageNav awardSlug={awardSlug} currentPage="allowances" />
        <h1 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.5rem', fontWeight: 600, letterSpacing: '-0.03em', color: 'var(--secondary)', marginBottom: '8px' }}>
          {award.shortName} Allowances 2025&ndash;26
        </h1>
        <AllowancesContent rates={rates} awardCode={award.code} awardName={award.shortName} awardSlug={awardSlug} />
      </div>
    );
  }

  let allowances: Allowance[] = [];
  try {
    allowances = await serverFetch<Allowance[]>(`/api/award/allowances?award=${award.code}`);
  } catch { /* API unavailable */ }

  return (
    <div>
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Awards', href: '/awards' },
        { label: award.shortName, href: `/awards/${awardSlug}` },
        { label: 'Allowances', href: `/awards/${awardSlug}/allowances` },
      ]} />

      <SubPageNav awardSlug={awardSlug} currentPage="allowances" />

      <h1 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.5rem', fontWeight: 600, letterSpacing: '-0.03em', color: 'var(--secondary)', marginBottom: '8px' }}>
        {award.shortName} &mdash; Allowances
      </h1>

      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; Rates effective 1 July 2025
      </p>
      <p style={{ fontSize: '14px', color: 'var(--secondary-muted)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
        Allowances are extra payments for specific conditions, skills, or expenses. They are one of the most commonly missed entitlements after penalty rates.
      </p>

      {allowances.length > 0 ? (
        <div style={{ overflowX: 'auto', marginBottom: '2rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13.5px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border)', textAlign: 'left' }}>
                <th style={{ padding: '10px 12px', color: 'var(--secondary)', fontWeight: 600 }}>Allowance</th>
                <th style={{ padding: '10px 12px', color: 'var(--secondary)', fontWeight: 600 }}>Amount</th>
                <th style={{ padding: '10px 12px', color: 'var(--secondary)', fontWeight: 600 }}>When it applies</th>
              </tr>
            </thead>
            <tbody>
              {allowances.map(a => (
                <tr key={a.allowance_type} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px 12px', color: 'var(--secondary)', fontWeight: 500 }}>{a.name}</td>
                  <td style={{ padding: '10px 12px', color: 'var(--secondary-muted)' }}>
                    {a.amount ? `$${parseFloat(a.amount).toFixed(2)} ${a.per_unit?.replace(/_/g, ' ') || ''}` : 'Varies'}
                  </td>
                  <td style={{ padding: '10px 12px', color: 'var(--secondary-muted)', fontSize: '12.5px' }}>{a.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p style={{ fontSize: '14px', color: 'var(--secondary-muted)', fontStyle: 'italic' }}>
          Allowance data is being loaded. Please check back shortly.
        </p>
      )}

      <p style={{ fontSize: '13px', color: 'var(--secondary-muted)', lineHeight: 1.7 }}>
        See also: <a href={`/awards/${awardSlug}/pay-rates`} style={{ color: 'var(--primary)', textDecoration: 'underline' }}>Pay rates</a> | <a href="/guides/allowances-and-loadings" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>Allowances &amp; loadings guide</a>
      </p>

      <div style={{ fontSize: '13px', color: 'var(--secondary-muted)', lineHeight: 1.7, marginTop: '1.5rem', marginBottom: '1.5rem' }}>
        <p>
          <strong>Source:</strong> Fair Work Ombudsman pay guide for{' '}
          <a href="https://www.fairwork.gov.au/pay-and-wages/paying-wages" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>
            {award.code}
          </a>. Allowance amounts are updated annually following the Fair Work Commission Annual Wage Review, typically effective from 1 July.
        </p>
      </div>

      <CheckPayCTA awardCode={award.code} awardName={award.shortName} />
    </div>
  );
}
