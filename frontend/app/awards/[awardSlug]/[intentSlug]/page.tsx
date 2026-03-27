import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAwardBySlug } from '@/lib/awards';
import { getIntentPage, getAllIntentSlugs } from '@/lib/hospitality-pages';
import { getHospitalityRates } from '@/lib/hospitality-rates';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import SubPageNav from '@/components/seo/SubPageNav';
import dynamic from 'next/dynamic';

// Intent content components — lazy loaded by slug
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const intentComponents: Record<string, React.ComponentType<any>> = {
  'am-i-being-underpaid': dynamic(() => import('@/components/seo/intent/IntentAmIUnderpaid')),
  'not-getting-overtime': dynamic(() => import('@/components/seo/intent/IntentNotGettingOvertime')),
  'hourly-rate-check': dynamic(() => import('@/components/seo/intent/IntentHourlyRateCheck')),
  'no-penalty-rates-paid': dynamic(() => import('@/components/seo/intent/IntentNoPenaltyRates')),
  'unpaid-trial-shifts': dynamic(() => import('@/components/seo/intent/IntentUnpaidTrialShifts')),
  'casual-conversion-refused': dynamic(() => import('@/components/seo/intent/IntentCasualConversion')),
  'pay-too-low': dynamic(() => import('@/components/seo/intent/IntentPayTooLow')),
  'flat-rate-hospitality': dynamic(() => import('@/components/seo/intent/IntentFlatRate')),
};

interface Props { params: Promise<{ awardSlug: string; intentSlug: string }>; }

export function generateStaticParams() {
  return getAllIntentSlugs().map(slug => ({ awardSlug: 'hospitality-award', intentSlug: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { intentSlug } = await params;
  const page = getIntentPage(intentSlug);
  if (!page) return {};
  return { title: page.metaTitle, description: page.metaDescription };
}

export default async function IntentPage({ params }: Props) {
  const { awardSlug, intentSlug } = await params;
  const award = getAwardBySlug(awardSlug);
  const page = getIntentPage(intentSlug);
  if (!award || !page || awardSlug !== 'hospitality-award') notFound();

  const IntentContent = intentComponents[intentSlug];
  let rates;
  try { rates = await getHospitalityRates(); } catch { /* rates stay undefined */ }

  return (
    <div>
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Awards', href: '/awards' },
        { label: 'Hospitality Award', href: '/awards/hospitality-award' },
        { label: page.title, href: `/awards/hospitality-award/${intentSlug}` },
      ]} />

      <SubPageNav awardSlug={awardSlug} />

      <h1 style={{
        fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.5rem', fontWeight: 600,
        letterSpacing: '-0.03em', color: 'var(--secondary)', marginBottom: '8px',
      }}>
        {page.title}
      </h1>

      {IntentContent ? (
        <IntentContent rates={rates} />
      ) : (
        <p style={{ fontSize: '14px', color: 'var(--secondary-muted)', fontStyle: 'italic' }}>
          This page is being expanded. Check back soon or use the calculator to check your pay now.
        </p>
      )}
    </div>
  );
}
