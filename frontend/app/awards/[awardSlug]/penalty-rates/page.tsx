import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAwardBySlug, getAllAwardSlugs } from '@/lib/awards';
import { serverFetch } from '@/lib/api-server';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import SubPageNav from '@/components/seo/SubPageNav';
import CheckPayCTA from '@/components/seo/CheckPayCTA';
import HospitalityPenaltyContent from '@/components/seo/awards/HospitalityPenaltyContent';
import RestaurantPenaltyContent from '@/components/seo/awards/RestaurantPenaltyContent';
import { getHospitalityRates } from '@/lib/hospitality-rates';
import { getRestaurantRates } from '@/lib/restaurant-rates';

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
      title: 'Hospitality Award Penalty Rates 2025\u201326 | Review My Pay',
      description: 'Full Hospitality Award penalty rates for weekends, public holidays, and late nights. See every multiplier and dollar amount under MA000009.',
    };
  }
  if (awardSlug === 'restaurant-award') {
    return {
      title: 'Restaurant Award Penalty Rates 2025\u201326 | Review My Pay',
      description: 'Restaurant Award penalty rates for Saturdays, Sundays, and public holidays. The Sunday rate differs by classification level \u2014 check yours is correct here.',
    };
  }
  return {
    title: `${award.shortName} Penalty Rates 2025 — Weekend, Evening & Public Holiday | Review My Pay`,
    description: `${award.shortName} penalty rate multipliers for Saturday, Sunday, public holidays, evenings, and late nights. Full-time, part-time, and casual rates.`,
  };
}

interface PenaltyRate {
  employment_type: string; day_type: string; multiplier: string;
  time_band_label: string | null; description: string;
}

export default async function PenaltyRatesPage({ params }: Props) {
  const { awardSlug } = await params;
  const award = getAwardBySlug(awardSlug);
  if (!award) notFound();

  let penalties: PenaltyRate[] = [];
  try {
    penalties = await serverFetch<PenaltyRate[]>(`/api/award/penalty-rates?award=${award.code}`);
  } catch { /* API unavailable */ }

  const ftPenalties = penalties.filter(p => p.employment_type === 'full_time');
  const casualPenalties = penalties.filter(p => p.employment_type === 'casual');

  const dayOrder = ['weekday', 'saturday', 'sunday', 'public_holiday'];
  const dayLabels: Record<string, string> = {
    weekday: 'Monday – Friday', saturday: 'Saturday',
    sunday: 'Sunday', public_holiday: 'Public Holiday',
  };

  return (
    <div>
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Awards', href: '/awards' },
        { label: award.shortName, href: `/awards/${awardSlug}` },
        { label: 'Penalty Rates', href: `/awards/${awardSlug}/penalty-rates` },
      ]} />

      <SubPageNav awardSlug={awardSlug} currentPage="penalty-rates" />

      <h1 style={{
        fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.5rem', fontWeight: 600,
        letterSpacing: '-0.03em', color: 'var(--secondary)', marginBottom: '8px',
      }}>
        {awardSlug === 'hospitality-award' ? 'Hospitality Award Penalty Rates 2025\u201326' : awardSlug === 'restaurant-award' ? 'Restaurant Award Penalty Rates 2025\u201326' : `${award.shortName} Penalty Rates 2025`}
      </h1>

      {awardSlug === 'hospitality-award' ? (
        <HospitalityPenaltyContent rates={await getHospitalityRates()} />
      ) : awardSlug === 'restaurant-award' ? (
        <RestaurantPenaltyContent rates={await getRestaurantRates()} />
      ) : (
      <>
      <p style={{ fontSize: '14px', color: 'var(--secondary-muted)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
        Penalty rates are higher pay rates for working at particular times — weekends, public holidays, evenings, and late nights. These multipliers are applied to your base hourly rate.
      </p>

      {ftPenalties.length > 0 && (
        <>
          <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.1rem', fontWeight: 500, color: 'var(--secondary)', marginBottom: '12px' }}>
            Full-time &amp; part-time penalty rates
          </h2>
          <div style={{ overflowX: 'auto', marginBottom: '2rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13.5px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border)', textAlign: 'left' }}>
                  <th style={{ padding: '10px 12px', color: 'var(--secondary)', fontWeight: 600 }}>Day</th>
                  <th style={{ padding: '10px 12px', color: 'var(--secondary)', fontWeight: 600 }}>Multiplier</th>
                  <th style={{ padding: '10px 12px', color: 'var(--secondary)', fontWeight: 600 }}>Description</th>
                </tr>
              </thead>
              <tbody>
                {dayOrder.map(day => {
                  const p = ftPenalties.find(r => r.day_type === day);
                  if (!p) return null;
                  return (
                    <tr key={day} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '10px 12px', color: 'var(--secondary-muted)' }}>{dayLabels[day] || day}</td>
                      <td style={{ padding: '10px 12px', color: 'var(--secondary)', fontWeight: 600 }}>&times;{parseFloat(p.multiplier).toFixed(1)}</td>
                      <td style={{ padding: '10px 12px', color: 'var(--secondary-muted)' }}>{p.description}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}

      {casualPenalties.length > 0 && (
        <>
          <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.1rem', fontWeight: 500, color: 'var(--secondary)', marginBottom: '12px' }}>
            Casual penalty rates
          </h2>
          <p style={{ fontSize: '13.5px', color: 'var(--secondary-muted)', marginBottom: '12px', lineHeight: 1.6 }}>
            Casual penalty rate multipliers are applied to the casual base rate, which already includes the 25% casual loading.
          </p>
          <div style={{ overflowX: 'auto', marginBottom: '2rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13.5px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border)', textAlign: 'left' }}>
                  <th style={{ padding: '10px 12px', color: 'var(--secondary)', fontWeight: 600 }}>Day</th>
                  <th style={{ padding: '10px 12px', color: 'var(--secondary)', fontWeight: 600 }}>Multiplier</th>
                  <th style={{ padding: '10px 12px', color: 'var(--secondary)', fontWeight: 600 }}>Description</th>
                </tr>
              </thead>
              <tbody>
                {dayOrder.map(day => {
                  const p = casualPenalties.find(r => r.day_type === day);
                  if (!p) return null;
                  return (
                    <tr key={day} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '10px 12px', color: 'var(--secondary-muted)' }}>{dayLabels[day] || day}</td>
                      <td style={{ padding: '10px 12px', color: 'var(--secondary)', fontWeight: 600 }}>&times;{parseFloat(p.multiplier).toFixed(1)}</td>
                      <td style={{ padding: '10px 12px', color: 'var(--secondary-muted)' }}>{p.description}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}

      <div style={{ fontSize: '13px', color: 'var(--secondary-muted)', lineHeight: 1.7, marginBottom: '1rem' }}>
        <p><strong>Tip:</strong> Sunday shifts are the most commonly underpaid in many awards. If you regularly work weekends, use our calculator to check your pay is correct.</p>
      </div>

      <CheckPayCTA awardCode={award.code} awardName={award.shortName} />
      </>
      )}
    </div>
  );
}
