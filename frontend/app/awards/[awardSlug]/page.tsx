import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AWARDS, getAwardBySlug, getAllAwardSlugs } from '@/lib/awards';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import SubPageNav from '@/components/seo/SubPageNav';
import CheckPayCTA from '@/components/seo/CheckPayCTA';
import HospitalityHubContent from '@/components/seo/awards/HospitalityHubContent';

interface Props {
  params: Promise<{ awardSlug: string }>;
}

export function generateStaticParams() {
  return getAllAwardSlugs().map(slug => ({ awardSlug: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { awardSlug } = await params;
  const award = getAwardBySlug(awardSlug);
  if (!award) return {};
  // Custom metadata for hospitality hub
  if (awardSlug === 'hospitality-award') {
    return {
      title: 'Hospitality Award Pay Rates 2025\u201326 | Review My Pay',
      description: 'Check current Hospitality Award pay rates, penalty rates, overtime, and allowances. Free tool calculates exactly what you\u2019re owed under MA000009.',
      keywords: ['hospitality award pay rates', 'hospitality award penalty rates', 'hospitality award 2025', 'MA000009', 'hospitality casual pay rates'],
    };
  }
  return {
    title: `${award.shortName} Pay Rates 2025 — Penalty Rates, Overtime & Conditions | Review My Pay`,
    description: `${award.fullName} pay rates, penalty rates, overtime, casual loading, allowances, and classifications. Updated for 2025.`,
    keywords: [award.shortName.toLowerCase(), `${award.shortName.toLowerCase()} pay rates`, `${award.shortName.toLowerCase()} penalty rates`, 'fair work award'],
  };
}

export default async function AwardHubPage({ params }: Props) {
  const { awardSlug } = await params;
  const award = getAwardBySlug(awardSlug);
  if (!award) notFound();

  const subPages = [
    { slug: 'pay-rates', label: 'Pay Rates', desc: 'Base hourly rates for all classification levels and employment types.' },
    { slug: 'penalty-rates', label: 'Penalty Rates', desc: 'Weekend, evening, and public holiday penalty rate multipliers.' },
    { slug: 'casual-employees', label: 'Casual Employees', desc: 'Casual loading, minimum engagement, and casual conversion rights.' },
    { slug: 'overtime', label: 'Overtime', desc: 'Daily and weekly overtime thresholds and rates.' },
    { slug: 'allowances', label: 'Allowances', desc: 'Meal, uniform, vehicle, and other allowance entitlements.' },
    { slug: 'classifications', label: 'Classifications', desc: 'Classification levels, duties, and indicative tasks.' },
  ];

  return (
    <div>
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Awards', href: '/awards' },
        { label: award.shortName, href: `/awards/${awardSlug}` },
      ]} />

      <SubPageNav awardSlug={awardSlug} currentPage="" />

      {/* Hospitality gets full custom content; others get generic template */}
      {awardSlug === 'hospitality-award' ? (
        <>
          <div style={{ paddingBottom: '1.5rem', borderBottom: '1.5px solid var(--border)', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span style={{
                fontSize: '11px', fontWeight: 600, letterSpacing: '0.06em',
                color: '#ffffff', background: 'var(--primary)', padding: '3px 8px', borderRadius: '4px',
              }}>
                MA000009
              </span>
              <span style={{ fontSize: '12px', color: 'var(--secondary-muted)' }}>
                Last updated: March 2026 &middot; Rates effective 1 July 2025
              </span>
            </div>
            <h1 style={{
              fontFamily: 'Fraunces, Georgia, serif',
              fontSize: '1.75rem',
              fontWeight: 600,
              letterSpacing: '-0.03em',
              color: 'var(--secondary)',
              lineHeight: 1.2,
            }}>
              Hospitality Award Pay Rates 2025&ndash;26
            </h1>
          </div>
          <HospitalityHubContent />
        </>
      ) : (
        <>
          <div style={{ paddingBottom: '1.5rem', borderBottom: '1.5px solid var(--border)', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span style={{
                fontSize: '11px', fontWeight: 600, letterSpacing: '0.06em',
                color: '#ffffff', background: 'var(--primary)', padding: '3px 8px', borderRadius: '4px',
              }}>
                {award.code}
              </span>
            </div>
            <h1 style={{
              fontFamily: 'Fraunces, Georgia, serif',
              fontSize: '1.75rem',
              fontWeight: 600,
              letterSpacing: '-0.03em',
              color: 'var(--secondary)',
              lineHeight: 1.2,
            }}>
              {award.shortName} Pay Rates 2025
            </h1>
            <p style={{ fontSize: '15px', color: 'var(--secondary-muted)', marginTop: '8px', lineHeight: 1.6 }}>
              {award.description} Current rates effective from 1 July 2025 following the Annual Wage Review.
            </p>
          </div>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.15rem', fontWeight: 500, color: 'var(--secondary)', marginBottom: '12px' }}>
              Who does this award cover?
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--secondary-muted)', lineHeight: 1.7 }}>
              The {award.fullName} covers employees working in related industries across Australia. Common roles include: {award.examples}.
            </p>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.15rem', fontWeight: 500, color: 'var(--secondary)', marginBottom: '12px' }}>
              Key entitlements
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: '1rem',
            }}>
              {subPages.map(page => (
                <a
                  key={page.slug}
                  href={`/awards/${awardSlug}/${page.slug}`}
                  style={{
                    display: 'block',
                    padding: '14px 16px',
                    border: '1.5px solid var(--border)',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    transition: 'border-color 0.15s',
                  }}
                >
                  <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px' }}>
                    {page.label} &rarr;
                  </p>
                  <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', lineHeight: 1.4, margin: 0 }}>
                    {page.desc}
                  </p>
                </a>
              ))}
            </div>
          </section>

          <CheckPayCTA awardCode={award.code} awardName={award.shortName} />
        </>
      )}
    </div>
  );
}
