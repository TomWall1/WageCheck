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
  if (dc?.subPageMeta?.['pay-rates']) {
    return { title: dc.subPageMeta['pay-rates'].title, description: dc.subPageMeta['pay-rates'].description };
  }
  return {
    title: `${award.shortName} Pay Rates 2025 \u2014 Full Rate Tables | Review My Pay`,
    description: `Current ${award.shortName} pay rates for full-time, part-time, and casual employees. All classification levels with hourly rates updated for 2025.`,
  };
}

interface Classification {
  id: number; level: number; stream: string; title: string; description: string;
  duties: string[]; indicative_tasks: string[];
}
interface PayRate {
  classification_id: number; employment_type: string; rate_type: string;
  rate_amount: string; effective_date: string;
}

export default async function PayRatesPage({ params }: Props) {
  const { awardSlug } = await params;
  const award = getAwardBySlug(awardSlug);
  if (!award) notFound();

  const dc = getDeepContent(awardSlug);

  // If this award has a custom pay-rates component, render it
  if (dc?.subPageComponents?.['pay-rates']) {
    const PayRatesContent = dc.subPageComponents['pay-rates'];
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
          { label: 'Pay Rates', href: `/awards/${awardSlug}/pay-rates` },
        ]} />
        <SubPageNav awardSlug={awardSlug} currentPage="pay-rates" />
        <h1 style={{
          fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.5rem', fontWeight: 600,
          letterSpacing: '-0.03em', color: 'var(--secondary)', marginBottom: '8px',
        }}>
          {award.shortName} Pay Rates 2025&ndash;26
        </h1>
        <PayRatesContent rates={rates} awardCode={award.code} awardName={award.shortName} awardSlug={awardSlug} />
      </div>
    );
  }

  // Generic template
  let classifications: Classification[] = [];
  let rates: PayRate[] = [];
  try {
    classifications = await serverFetch<Classification[]>(`/api/award/classifications?award=${award.code}`);
    const ratePromises = classifications.map(c =>
      serverFetch<PayRate[]>(`/api/award/rates?award=${award.code}&classification_id=${c.id}&employment_type=full_time`)
        .catch(() => [] as PayRate[])
    );
    const allRates = await Promise.all(ratePromises);
    rates = allRates.flat();
  } catch { /* API unavailable \u2014 render template */ }

  const rateMap: Record<number, number> = {};
  for (const r of rates) {
    if (r.rate_type === 'base_hourly' && !(r.classification_id in rateMap)) {
      rateMap[r.classification_id] = parseFloat(r.rate_amount);
    }
  }

  const sorted = [...classifications].sort((a, b) => a.level - b.level);

  return (
    <div>
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Awards', href: '/awards' },
        { label: award.shortName, href: `/awards/${awardSlug}` },
        { label: 'Pay Rates', href: `/awards/${awardSlug}/pay-rates` },
      ]} />

      <SubPageNav awardSlug={awardSlug} currentPage="pay-rates" />

      <h1 style={{
        fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.5rem', fontWeight: 600,
        letterSpacing: '-0.03em', color: 'var(--secondary)', marginBottom: '8px',
      }}>
        {award.shortName} Pay Rates 2025
      </h1>

      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1rem', fontStyle: 'italic' }}>
        Last updated: March 2026 &middot; Rates effective 1 July 2025
      </p>
      <p style={{ fontSize: '14px', color: 'var(--secondary-muted)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
        Current hourly pay rates under the {award.fullName}, effective from 1 July 2025.
        Casual rates include the 25% casual loading.
      </p>

      {sorted.length > 0 ? (
        <div style={{ overflowX: 'auto', marginBottom: '2rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13.5px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border)', textAlign: 'left' }}>
                <th style={{ padding: '10px 12px', color: 'var(--secondary)', fontWeight: 600 }}>Classification</th>
                <th style={{ padding: '10px 12px', color: 'var(--secondary)', fontWeight: 600 }}>Level</th>
                <th style={{ padding: '10px 12px', color: 'var(--secondary)', fontWeight: 600 }}>FT/PT Hourly</th>
                <th style={{ padding: '10px 12px', color: 'var(--secondary)', fontWeight: 600 }}>Casual Hourly</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map(c => {
                const base = rateMap[c.id];
                const casual = base ? Math.round(base * 1.25 * 100) / 100 : null;
                return (
                  <tr key={c.id} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '10px 12px', color: 'var(--secondary-muted)' }}>{c.title}</td>
                    <td style={{ padding: '10px 12px', color: 'var(--secondary-muted)' }}>{c.level}</td>
                    <td style={{ padding: '10px 12px', color: 'var(--secondary)', fontWeight: 500 }}>
                      {base ? `$${base.toFixed(2)}` : '\u2014'}
                    </td>
                    <td style={{ padding: '10px 12px', color: 'var(--secondary)', fontWeight: 500 }}>
                      {casual ? `$${casual.toFixed(2)}` : '\u2014'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p style={{ fontSize: '14px', color: 'var(--secondary-muted)', fontStyle: 'italic' }}>
          Pay rate data is being loaded. Please check back shortly.
        </p>
      )}

      <div style={{ fontSize: '13px', color: 'var(--secondary-muted)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
        <p>
          <strong>Source:</strong> Fair Work Ombudsman pay guide for {award.code}. Rates are updated annually following the Fair Work Commission Annual Wage Review, typically effective from 1 July.
        </p>
      </div>

      <CheckPayCTA awardCode={award.code} awardName={award.shortName} />
    </div>
  );
}
