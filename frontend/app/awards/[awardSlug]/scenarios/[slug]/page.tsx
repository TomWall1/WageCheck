import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAwardBySlug } from '@/lib/awards';
import { getScenarioPage, getAllScenarioSlugs } from '@/lib/hospitality-pages';
import { getRestaurantScenarioPage, getAllRestaurantScenarioSlugs } from '@/lib/restaurant-pages';
import { getHospitalityRates } from '@/lib/hospitality-rates';
import { getRestaurantRates } from '@/lib/restaurant-rates';
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const restaurantScenarioComponents: Record<string, React.ComponentType<any>> = {
  'sunday-rate-wrong': dynamic(() => import('@/components/seo/restaurant-scenarios/RScenarioSundayRateWrong')),
  'wrong-award-cafe': dynamic(() => import('@/components/seo/restaurant-scenarios/RScenarioWrongAwardCafe')),
  'trade-qualified-wrong-level': dynamic(() => import('@/components/seo/restaurant-scenarios/RScenarioTradeQualified')),
  'split-shift-allowance-missing': dynamic(() => import('@/components/seo/restaurant-scenarios/RScenarioSplitShift')),
  'kitchen-overtime-unpaid': dynamic(() => import('@/components/seo/restaurant-scenarios/RScenarioKitchenOvertime')),
  'junior-rate-no-penalty': dynamic(() => import('@/components/seo/restaurant-scenarios/RScenarioJuniorNoPenalty')),
  'public-holiday-restaurant': dynamic(() => import('@/components/seo/restaurant-scenarios/RScenarioPublicHoliday')),
  'late-night-no-loading': dynamic(() => import('@/components/seo/restaurant-scenarios/RScenarioLateNight')),
  'casual-conversion-restaurant': dynamic(() => import('@/components/seo/restaurant-scenarios/RScenarioCasualConversion')),
  'restaurant-flat-rate-legal': dynamic(() => import('@/components/seo/restaurant-scenarios/RScenarioFlatRate')),
  'saturday-rate-wrong': dynamic(() => import('@/components/seo/restaurant-scenarios/RScenarioSaturdayRate')),
  'classification-never-reviewed': dynamic(() => import('@/components/seo/restaurant-scenarios/RScenarioClassification')),
  'no-payslip-restaurant': dynamic(() => import('@/components/seo/restaurant-scenarios/RScenarioNoPayslip')),
  'cash-in-hand-restaurant': dynamic(() => import('@/components/seo/restaurant-scenarios/RScenarioCashInHand')),
  'super-restaurant': dynamic(() => import('@/components/seo/restaurant-scenarios/RScenarioSuper')),
  '21st-birthday-restaurant': dynamic(() => import('@/components/seo/restaurant-scenarios/RScenario21stBirthday')),
  'introductory-rate-too-long': dynamic(() => import('@/components/seo/restaurant-scenarios/RScenarioIntroRate')),
  'sent-home-early-restaurant': dynamic(() => import('@/components/seo/restaurant-scenarios/RScenarioSentHome')),
  'chef-salary-overtime': dynamic(() => import('@/components/seo/restaurant-scenarios/RScenarioChefSalary')),
  'no-overtime-restaurant': dynamic(() => import('@/components/seo/restaurant-scenarios/RScenarioNoOvertime')),
  'christmas-day-restaurant': dynamic(() => import('@/components/seo/restaurant-scenarios/RScenarioChristmasDay')),
  'good-friday-restaurant': dynamic(() => import('@/components/seo/restaurant-scenarios/RScenarioGoodFriday')),
  'tool-allowance-cook': dynamic(() => import('@/components/seo/restaurant-scenarios/RScenarioToolAllowance')),
  'meal-allowance-missed': dynamic(() => import('@/components/seo/restaurant-scenarios/RScenarioMealAllowance')),
  'pay-doesnt-match-roster': dynamic(() => import('@/components/seo/restaurant-scenarios/RScenarioPayDoesntMatch')),
  'annualised-salary-restaurant': dynamic(() => import('@/components/seo/restaurant-scenarios/RScenarioAnnualisedSalary')),
  'below-award-restaurant': dynamic(() => import('@/components/seo/restaurant-scenarios/RScenarioBelowAward')),
  'toil-restaurant': dynamic(() => import('@/components/seo/restaurant-scenarios/RScenarioToil')),
  'level3-shift-breakdown': dynamic(() => import('@/components/seo/restaurant-scenarios/RScenarioLevel3Breakdown')),
  'underpaid-years': dynamic(() => import('@/components/seo/restaurant-scenarios/RScenarioUnderpaidYears')),
};

interface Props { params: Promise<{ awardSlug: string; slug: string }>; }

export function generateStaticParams() {
  const hospitality = getAllScenarioSlugs().map(slug => ({ awardSlug: 'hospitality-award', slug }));
  const restaurant = getAllRestaurantScenarioSlugs().map(slug => ({ awardSlug: 'restaurant-award', slug }));
  return [...hospitality, ...restaurant];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { awardSlug, slug } = await params;
  const page = awardSlug === 'restaurant-award' ? getRestaurantScenarioPage(slug) : getScenarioPage(slug);
  if (!page) return {};
  return { title: page.metaTitle, description: page.metaDescription };
}

export default async function ScenarioPage({ params }: Props) {
  const { awardSlug, slug } = await params;
  const award = getAwardBySlug(awardSlug);

  const isHospitality = awardSlug === 'hospitality-award';
  const isRestaurant = awardSlug === 'restaurant-award';

  const page = isRestaurant ? getRestaurantScenarioPage(slug) : getScenarioPage(slug);
  if (!award || !page || (!isHospitality && !isRestaurant)) notFound();

  const ScenarioContent = isRestaurant ? restaurantScenarioComponents[slug] : scenarioComponents[slug];
  const awardLabel = isRestaurant ? 'Restaurant Award' : 'Hospitality Award';
  const awardPath = `/awards/${awardSlug}`;

  let rates;
  try {
    rates = isRestaurant ? await getRestaurantRates() : await getHospitalityRates();
  } catch { /* rates stay undefined — components handle gracefully */ }

  return (
    <div>
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Awards', href: '/awards' },
        { label: awardLabel, href: awardPath },
        { label: page.title, href: `${awardPath}/scenarios/${slug}` },
      ]} />

      <SubPageNav awardSlug={awardSlug} />

      <h1 style={{
        fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.5rem', fontWeight: 600,
        letterSpacing: '-0.03em', color: 'var(--secondary)', marginBottom: '8px',
      }}>
        {page.title}
      </h1>

      {ScenarioContent ? (
        <ScenarioContent rates={rates} />
      ) : (
        <p style={{ fontSize: '14px', color: 'var(--secondary-muted)', fontStyle: 'italic' }}>
          This scenario page is being expanded. Check back soon or use the calculator to check your pay now.
        </p>
      )}
    </div>
  );
}
