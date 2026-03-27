import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAwardBySlug, getAllAwardSlugs } from '@/lib/awards';
import { serverFetch } from '@/lib/api-server';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import SubPageNav from '@/components/seo/SubPageNav';
import CheckPayCTA from '@/components/seo/CheckPayCTA';
import HospitalityAllowancesContent from '@/components/seo/awards/HospitalityAllowancesContent';
import { getHospitalityRates } from '@/lib/hospitality-rates';

interface Props { params: Promise<{ awardSlug: string }>; }

export function generateStaticParams() {
  return getAllAwardSlugs().map(slug => ({ awardSlug: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { awardSlug } = await params;
  const award = getAwardBySlug(awardSlug);
  if (!award) return {};
  if (awardSlug === 'hospitality-award') {
    return {
      title: 'Hospitality Award Allowances 2025\u201326 | Review My Pay',
      description: 'Hospitality Award allowances explained: meal, split shift, first aid, uniform, tool, and vehicle. What triggers each one and current dollar amounts under MA000009.',
    };
  }
  return {
    title: `${award.shortName} Allowances 2025 — Meal, Uniform, Vehicle & More | Review My Pay`,
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
        {awardSlug === 'hospitality-award' ? 'Hospitality Award Allowances 2025\u201326' : `${award.shortName} — Allowances`}
      </h1>

      {awardSlug === 'hospitality-award' ? (
        <HospitalityAllowancesContent rates={await getHospitalityRates()} />
      ) : (
      <>
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
        See also: <a href={`/awards/${awardSlug}/pay-rates`} style={{ color: 'var(--primary)', textDecoration: 'underline' }}>Pay rates</a> | <a href="/guides/allowances-and-loadings" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>Allowances & loadings guide</a>
      </p>

      <CheckPayCTA awardCode={award.code} awardName={award.shortName} />
      </>
      )}
    </div>
  );
}
