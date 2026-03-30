import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAwardBySlug, getAllAwardSlugs } from '@/lib/awards';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import SubPageNav from '@/components/seo/SubPageNav';
import CheckPayCTA from '@/components/seo/CheckPayCTA';
import HospitalityOvertimeContent from '@/components/seo/awards/HospitalityOvertimeContent';
import RestaurantOvertimeContent from '@/components/seo/awards/RestaurantOvertimeContent';
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
      title: 'Hospitality Award Overtime Rates 2025\u201326 | Review My Pay',
      description: 'Overtime rules under the Hospitality Award: daily triggers, time-and-a-half, double-time, and how overtime interacts with penalty rates. MA000009.',
    };
  }
  if (awardSlug === 'restaurant-award') {
    return {
      title: 'Restaurant Award Overtime Rates 2025\u201326 | Review My Pay',
      description: 'When overtime applies under the Restaurant Award, what it pays, and the most common ways it\u2019s missed for restaurant and caf\u00e9 workers. Check your shifts.',
    };
  }
  return {
    title: `${award.shortName} Overtime Rates 2025 — Daily & Weekly Thresholds | Review My Pay`,
    description: `Overtime rules under the ${award.shortName}: daily and weekly thresholds, time-and-a-half, double-time, and TOIL provisions.`,
  };
}

export default async function OvertimePage({ params }: Props) {
  const { awardSlug } = await params;
  const award = getAwardBySlug(awardSlug);
  if (!award) notFound();

  return (
    <div>
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Awards', href: '/awards' },
        { label: award.shortName, href: `/awards/${awardSlug}` },
        { label: 'Overtime', href: `/awards/${awardSlug}/overtime` },
      ]} />

      <SubPageNav awardSlug={awardSlug} currentPage="overtime" />

      <h1 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.5rem', fontWeight: 600, letterSpacing: '-0.03em', color: 'var(--secondary)', marginBottom: '8px' }}>
        {awardSlug === 'hospitality-award' ? 'Hospitality Award Overtime Rates 2025\u201326' : awardSlug === 'restaurant-award' ? 'Restaurant Award Overtime Rates 2025\u201326' : `${award.shortName} — Overtime Rates`}
      </h1>

      {awardSlug === 'hospitality-award' ? (
        <HospitalityOvertimeContent rates={await getHospitalityRates()} />
      ) : awardSlug === 'restaurant-award' ? (
        <RestaurantOvertimeContent rates={await getRestaurantRates()} />
      ) : (
      <>
      <p style={{ fontSize: '14px', color: 'var(--secondary-muted)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
        Overtime is paid when you work beyond your ordinary hours. Most awards use a two-tier system: time-and-a-half for the first 2 hours, then double-time after that.
      </p>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.1rem', fontWeight: 500, color: 'var(--secondary)', marginBottom: '8px' }}>
          Overtime thresholds
        </h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13.5px', marginBottom: '1rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border)', textAlign: 'left' }}>
                <th style={{ padding: '10px 12px', color: 'var(--secondary)', fontWeight: 600 }}>Trigger</th>
                <th style={{ padding: '10px 12px', color: 'var(--secondary)', fontWeight: 600 }}>First 2 hours</th>
                <th style={{ padding: '10px 12px', color: 'var(--secondary)', fontWeight: 600 }}>After 2 hours</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '10px 12px', color: 'var(--secondary-muted)' }}>Daily (over 7.6 hours)</td>
                <td style={{ padding: '10px 12px', color: 'var(--secondary)', fontWeight: 600 }}>&times;1.5</td>
                <td style={{ padding: '10px 12px', color: 'var(--secondary)', fontWeight: 600 }}>&times;2.0</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '10px 12px', color: 'var(--secondary-muted)' }}>Weekly (over 38 hours)</td>
                <td style={{ padding: '10px 12px', color: 'var(--secondary)', fontWeight: 600 }}>&times;1.5</td>
                <td style={{ padding: '10px 12px', color: 'var(--secondary)', fontWeight: 600 }}>&times;2.0</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.1rem', fontWeight: 500, color: 'var(--secondary)', marginBottom: '8px' }}>
          Time off in lieu (TOIL)
        </h2>
        <p style={{ fontSize: '14px', color: 'var(--secondary-muted)', lineHeight: 1.7 }}>
          Some awards allow employers and employees to agree to take time off instead of being paid overtime. TOIL must be agreed in writing and taken at the overtime rate — for example, 1 hour of overtime at time-and-a-half equals 1.5 hours of TOIL.
        </p>
      </section>

      <p style={{ fontSize: '13px', color: 'var(--secondary-muted)', lineHeight: 1.7 }}>
        See also: <a href={`/awards/${awardSlug}/penalty-rates`} style={{ color: 'var(--primary)', textDecoration: 'underline' }}>Penalty rates</a> | <a href={`/awards/${awardSlug}/pay-rates`} style={{ color: 'var(--primary)', textDecoration: 'underline' }}>Full pay rate tables</a> | <a href="/guides/overtime-pay-australia" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>Overtime pay guide</a>
      </p>

      <CheckPayCTA awardCode={award.code} awardName={award.shortName} />
      </>
      )}
    </div>
  );
}
