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
  if (dc?.subPageMeta?.['casual-employees']) {
    return { title: dc.subPageMeta['casual-employees'].title, description: dc.subPageMeta['casual-employees'].description };
  }
  return {
    title: `${award.shortName} Casual Pay Rates 2025 \u2014 Loading, Penalties & Rights | Review My Pay`,
    description: `Casual pay rates under the ${award.shortName}: 25% casual loading, penalty rates, minimum engagement, and casual conversion rights.`,
  };
}

export default async function CasualEmployeesPage({ params }: Props) {
  const { awardSlug } = await params;
  const award = getAwardBySlug(awardSlug);
  if (!award) notFound();

  const dc = getDeepContent(awardSlug);

  if (dc?.subPageComponents?.['casual-employees']) {
    const CasualContent = dc.subPageComponents['casual-employees'];
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
          { label: 'Casual Employees', href: `/awards/${awardSlug}/casual-employees` },
        ]} />
        <SubPageNav awardSlug={awardSlug} currentPage="casual-employees" />
        <h1 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.5rem', fontWeight: 600, letterSpacing: '-0.03em', color: 'var(--secondary)', marginBottom: '8px' }}>
          {award.shortName} Casual Pay Rates 2025&ndash;26
        </h1>
        <CasualContent rates={rates} awardCode={award.code} awardName={award.shortName} awardSlug={awardSlug} />
      </div>
    );
  }

  return (
    <div>
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Awards', href: '/awards' },
        { label: award.shortName, href: `/awards/${awardSlug}` },
        { label: 'Casual Employees', href: `/awards/${awardSlug}/casual-employees` },
      ]} />

      <SubPageNav awardSlug={awardSlug} currentPage="casual-employees" />

      <h1 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.5rem', fontWeight: 600, letterSpacing: '-0.03em', color: 'var(--secondary)', marginBottom: '8px' }}>
        {award.shortName} &mdash; Casual Employees
      </h1>

      <p style={{ fontSize: '12.5px', color: 'var(--secondary-muted)', marginBottom: '1rem', fontStyle: 'italic' }}>
        Last updated: March 2026
      </p>
      <p style={{ fontSize: '14px', color: 'var(--secondary-muted)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
        Casual employees receive a 25% loading on top of the base hourly rate. This loading compensates for not receiving paid leave, notice of termination, and redundancy pay.
      </p>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.1rem', fontWeight: 500, color: 'var(--secondary)', marginBottom: '8px' }}>
          What is casual loading?
        </h2>
        <p style={{ fontSize: '14px', color: 'var(--secondary-muted)', lineHeight: 1.7 }}>
          The 25% casual loading is paid instead of entitlements that permanent employees receive, including annual leave, personal/carer&apos;s leave, notice of termination, and redundancy pay. The casual loading is applied to the ordinary hourly rate before any penalty rate multipliers.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.1rem', fontWeight: 500, color: 'var(--secondary)', marginBottom: '8px' }}>
          Casual conversion rights
        </h2>
        <p style={{ fontSize: '14px', color: 'var(--secondary-muted)', lineHeight: 1.7 }}>
          Under the Fair Work Act, casual employees who have worked regular hours for at least 12 months may have the right to request conversion to permanent (full-time or part-time) employment. Employers must offer conversion to eligible casual employees, or provide written reasons for not doing so.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.1rem', fontWeight: 500, color: 'var(--secondary)', marginBottom: '8px' }}>
          Do casual penalty rates stack?
        </h2>
        <p style={{ fontSize: '14px', color: 'var(--secondary-muted)', lineHeight: 1.7 }}>
          Casual penalty rate multipliers are applied to the casual base rate (which already includes the 25% loading). For example, a casual employee earning $30.00/hr (including loading) working on a Sunday at a 2.0x multiplier would earn $60.00/hr &mdash; not $30.00 + 25% + 2.0x.
        </p>
      </section>

      <p style={{ fontSize: '13px', color: 'var(--secondary-muted)', lineHeight: 1.7 }}>
        See also: <a href={`/awards/${awardSlug}/penalty-rates`} style={{ color: 'var(--primary)', textDecoration: 'underline' }}>Penalty rates</a> | <a href={`/awards/${awardSlug}/pay-rates`} style={{ color: 'var(--primary)', textDecoration: 'underline' }}>Full pay rate tables</a> | <a href="/guides/casual-loading-explained" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>Casual loading explained</a>
      </p>

      <div style={{ fontSize: '13px', color: 'var(--secondary-muted)', lineHeight: 1.7, marginTop: '1.5rem', marginBottom: '1.5rem' }}>
        <p>
          <strong>Source:</strong>{' '}
          <a href="https://www.fairwork.gov.au/employment-conditions/types-of-employees/casual-employees" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>
            Fair Work Ombudsman &mdash; casual employees
          </a>. Casual loading and conversion rights are set by the Fair Work Act 2009 and the applicable modern award.
        </p>
      </div>

      <CheckPayCTA awardCode={award.code} awardName={award.shortName} />
    </div>
  );
}
