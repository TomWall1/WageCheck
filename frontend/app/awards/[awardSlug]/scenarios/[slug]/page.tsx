import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAwardBySlug } from '@/lib/awards';
import { getScenarioPage, getAllScenarioSlugs } from '@/lib/hospitality-pages';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import SubPageNav from '@/components/seo/SubPageNav';
import dynamic from 'next/dynamic';

// Scenario content components — lazy loaded by slug
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const scenarioComponents: Record<string, React.ComponentType<any>> = {
  '6-days-week-pay': dynamic(() => import('@/components/seo/scenarios/Scenario6DaysWeek')),
  'casual-late-nights': dynamic(() => import('@/components/seo/scenarios/ScenarioCasualLateNights')),
  'split-shifts-pay': dynamic(() => import('@/components/seo/scenarios/ScenarioSplitShifts')),
  'christmas-day-pay': dynamic(() => import('@/components/seo/scenarios/ScenarioChristmasDay')),
  'roster-change-short-notice': dynamic(() => import('@/components/seo/scenarios/ScenarioRosterChange')),
  'sent-home-early': dynamic(() => import('@/components/seo/scenarios/ScenarioSentHomeEarly')),
  'cash-in-hand': dynamic(() => import('@/components/seo/scenarios/ScenarioCashInHand')),
  'supervisor-pay': dynamic(() => import('@/components/seo/scenarios/ScenarioSupervisorPay')),
  'double-shift': dynamic(() => import('@/components/seo/scenarios/ScenarioDoubleShift')),
  'no-payslip': dynamic(() => import('@/components/seo/scenarios/ScenarioNoPayslip')),
  '50-hour-week': dynamic(() => import('@/components/seo/scenarios/Scenario50HourWeek')),
  'late-night-transport': dynamic(() => import('@/components/seo/scenarios/ScenarioLateNightTransport')),
  'trainee-pay': dynamic(() => import('@/components/seo/scenarios/ScenarioTraineePay')),
  'australia-day-pay': dynamic(() => import('@/components/seo/scenarios/ScenarioAustraliaDay')),
  'missed-meal-break': dynamic(() => import('@/components/seo/scenarios/ScenarioMissedMealBreak')),
  'pay-doesnt-match-roster': dynamic(() => import('@/components/seo/scenarios/ScenarioPayDoesntMatch')),
  'unpaid-staff-meeting': dynamic(() => import('@/components/seo/scenarios/ScenarioUnpaidMeeting')),
  'regular-casual-status': dynamic(() => import('@/components/seo/scenarios/ScenarioRegularCasual')),
  'tips-and-pay': dynamic(() => import('@/components/seo/scenarios/ScenarioTipsAndPay')),
  'sunday-casual-rate': dynamic(() => import('@/components/seo/scenarios/ScenarioSundayCasual')),
  'public-holiday-not-worked': dynamic(() => import('@/components/seo/scenarios/ScenarioPHNotWorked')),
  'good-friday-pay': dynamic(() => import('@/components/seo/scenarios/ScenarioGoodFriday')),
  'underpaid-super': dynamic(() => import('@/components/seo/scenarios/ScenarioUnderpaidSuper')),
  'student-pay-rates': dynamic(() => import('@/components/seo/scenarios/ScenarioStudentPay')),
  'manager-overtime': dynamic(() => import('@/components/seo/scenarios/ScenarioManagerOvertime')),
  'all-in-rate': dynamic(() => import('@/components/seo/scenarios/ScenarioAllInRate')),
  'night-audit-pay': dynamic(() => import('@/components/seo/scenarios/ScenarioNightAudit')),
  'annual-leave-loading': dynamic(() => import('@/components/seo/scenarios/ScenarioAnnualLeave')),
  'below-award-pay': dynamic(() => import('@/components/seo/scenarios/ScenarioBelowAward')),
  'level-2-shift-breakdown': dynamic(() => import('@/components/seo/scenarios/ScenarioLevel2Breakdown')),
};

interface Props { params: Promise<{ awardSlug: string; slug: string }>; }

export function generateStaticParams() {
  return getAllScenarioSlugs().map(slug => ({ awardSlug: 'hospitality-award', slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getScenarioPage(slug);
  if (!page) return {};
  return { title: page.metaTitle, description: page.metaDescription };
}

export default async function ScenarioPage({ params }: Props) {
  const { awardSlug, slug } = await params;
  const award = getAwardBySlug(awardSlug);
  const page = getScenarioPage(slug);
  if (!award || !page || awardSlug !== 'hospitality-award') notFound();

  const ScenarioContent = scenarioComponents[slug];

  return (
    <div>
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Awards', href: '/awards' },
        { label: 'Hospitality Award', href: '/awards/hospitality-award' },
        { label: page.title, href: `/awards/hospitality-award/scenarios/${slug}` },
      ]} />

      <SubPageNav awardSlug={awardSlug} />

      <h1 style={{
        fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.5rem', fontWeight: 600,
        letterSpacing: '-0.03em', color: 'var(--secondary)', marginBottom: '8px',
      }}>
        {page.title}
      </h1>

      {ScenarioContent ? (
        <ScenarioContent />
      ) : (
        <p style={{ fontSize: '14px', color: 'var(--secondary-muted)', fontStyle: 'italic' }}>
          This scenario page is being expanded. Check back soon or use the calculator to check your pay now.
        </p>
      )}
    </div>
  );
}
