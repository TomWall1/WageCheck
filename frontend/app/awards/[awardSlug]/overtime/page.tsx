import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAwardBySlug, getAllAwardSlugs } from '@/lib/awards';
import { getDeepContent } from '@/lib/award-content-registry';
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
  if (dc?.subPageMeta?.['overtime']) {
    return { title: dc.subPageMeta['overtime'].title, description: dc.subPageMeta['overtime'].description };
  }
  return {
    title: `${award.shortName} Overtime Rates 2025 \u2014 Daily & Weekly Thresholds | Review My Pay`,
    description: `Overtime rules under the ${award.shortName}: daily and weekly thresholds, time-and-a-half, double-time, and TOIL provisions.`,
  };
}

export default async function OvertimePage({ params }: Props) {
  const { awardSlug } = await params;
  const award = getAwardBySlug(awardSlug);
  if (!award) notFound();

  const dc = getDeepContent(awardSlug);

  if (dc?.subPageComponents?.['overtime']) {
    const OvertimeContent = dc.subPageComponents['overtime'];
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
          { label: 'Overtime', href: `/awards/${awardSlug}/overtime` },
        ]} />
        <SubPageNav awardSlug={awardSlug} currentPage="overtime" />
        <h1 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.5rem', fontWeight: 600, letterSpacing: '-0.03em', color: 'var(--secondary)', marginBottom: '8px' }}>
          {award.shortName} Overtime Rates 2025&ndash;26
        </h1>
        <OvertimeContent rates={rates} awardCode={award.code} awardName={award.shortName} awardSlug={awardSlug} />
      </div>
    );
  }

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
        {award.shortName} &mdash; Overtime Rates
      </h1>

      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1rem', fontStyle: 'italic' }}>
        Last updated: March 2026
      </p>
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
          Some awards allow employers and employees to agree to take time off instead of being paid overtime. TOIL must be agreed in writing and taken at the overtime rate &mdash; for example, 1 hour of overtime at time-and-a-half equals 1.5 hours of TOIL.
        </p>
      </section>

      <p style={{ fontSize: '13px', color: 'var(--secondary-muted)', lineHeight: 1.7 }}>
        See also: <a href={`/awards/${awardSlug}/penalty-rates`} style={{ color: 'var(--primary)', textDecoration: 'underline' }}>Penalty rates</a> | <a href={`/awards/${awardSlug}/pay-rates`} style={{ color: 'var(--primary)', textDecoration: 'underline' }}>Full pay rate tables</a> | <a href="/guides/overtime-pay-australia" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>Overtime pay guide</a>
      </p>

      <div style={{ fontSize: '13px', color: 'var(--secondary-muted)', lineHeight: 1.7, marginTop: '1.5rem', marginBottom: '1.5rem' }}>
        <p>
          <strong>Source:</strong>{' '}
          <a href="https://www.fairwork.gov.au/pay-and-wages/overtime" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>
            Fair Work Ombudsman &mdash; overtime
          </a>. Overtime thresholds and rates are set by the applicable modern award and the Fair Work Act 2009.
        </p>
      </div>

      <CheckPayCTA awardCode={award.code} awardName={award.shortName} />
    </div>
  );
}
