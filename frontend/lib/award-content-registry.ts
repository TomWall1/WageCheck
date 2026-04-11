/**
 * Unified registry for award deep content.
 * Maps award slugs to their page registries (intent, scenario, role)
 * and lazy-loaded component maps.
 *
 * Adding a new award vertical:
 *  1. Create lib/{award}-pages.ts with page metadata
 *  2. Create components in seo/{award}-intent/, seo/{award}-scenarios/, seo/{award}-roles/
 *  3. Register below in AWARD_DEEP_CONTENT
 */

import dynamic from 'next/dynamic';

/* ------------------------------------------------------------------ */
/*  Shared types                                                       */
/* ------------------------------------------------------------------ */

export interface AwardPage {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  type: 'intent' | 'scenario' | 'role';
}

export interface AwardDeepContent {
  /** Display label used in breadcrumbs */
  label: string;
  /** Custom metadata for the hub page */
  hubMeta?: { title: string; description: string; keywords: string[] };
  /** Custom metadata overrides for sub-pages (key = sub-page slug) */
  subPageMeta?: Record<string, { title: string; description: string }>;

  /** Page registries */
  intentPages: AwardPage[];
  scenarioPages: AwardPage[];
  rolePages: AwardPage[];

  /** Lazy-loaded content components keyed by slug */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  intentComponents: Record<string, React.ComponentType<any>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  scenarioComponents: Record<string, React.ComponentType<any>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  roleComponents: Record<string, React.ComponentType<any>>;

  /** Custom sub-page components (penalty, casual, overtime, etc.) */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  subPageComponents?: Record<string, React.ComponentType<any>>;

  /** Custom hub content component */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  hubComponent?: React.ComponentType<any>;

  /** Async function that fetches rates for this award */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getRates?: () => Promise<any>;
}

/* ------------------------------------------------------------------ */
/*  Import page registries                                             */
/* ------------------------------------------------------------------ */

import {
  HOSPITALITY_INTENT_PAGES,
  HOSPITALITY_SCENARIO_PAGES,
} from './hospitality-pages';

import {
  RESTAURANT_INTENT_PAGES,
  RESTAURANT_SCENARIO_PAGES,
  RESTAURANT_ROLE_PAGES,
} from './restaurant-pages';

import {
  FAST_FOOD_INTENT_PAGES,
  FAST_FOOD_SCENARIO_PAGES,
  FAST_FOOD_ROLE_PAGES,
} from './fast-food-pages';

import {
  RETAIL_INTENT_PAGES,
  RETAIL_SCENARIO_PAGES,
  RETAIL_ROLE_PAGES,
} from './retail-pages';

import {
  CLEANING_INTENT_PAGES,
  CLEANING_SCENARIO_PAGES,
  CLEANING_ROLE_PAGES,
} from './cleaning-pages';

import {
  CLERKS_INTENT_PAGES,
  CLERKS_SCENARIO_PAGES,
  CLERKS_ROLE_PAGES,
} from './clerks-pages';

import {
  SECURITY_INTENT_PAGES,
  SECURITY_SCENARIO_PAGES,
  SECURITY_ROLE_PAGES,
} from './security-pages';

import {
  FITNESS_INTENT_PAGES,
  FITNESS_SCENARIO_PAGES,
  FITNESS_ROLE_PAGES,
} from './fitness-pages';

/* ------------------------------------------------------------------ */
/*  Rate fetchers                                                      */
/* ------------------------------------------------------------------ */

import { getHospitalityRates } from './hospitality-rates';
import { getRestaurantRates } from './restaurant-rates';
import { getAwardRates } from './award-rates';
import { AWARDS } from './awards';
import { generateIntentPages, generateScenarioPages } from './generic-pages';

/* ------------------------------------------------------------------ */
/*  Registry                                                           */
/* ------------------------------------------------------------------ */

export const AWARD_DEEP_CONTENT: Record<string, AwardDeepContent> = {
  'hospitality-award': {
    label: 'Hospitality Award',
    hubMeta: {
      title: 'Hospitality Award Pay Rates 2025\u201326 | Review My Pay',
      description: 'Check current Hospitality Award pay rates, penalty rates, overtime, and allowances. Free tool calculates exactly what you\u2019re owed under MA000009.',
      keywords: ['hospitality award pay rates', 'hospitality award penalty rates', 'hospitality award 2025', 'MA000009', 'hospitality casual pay rates'],
    },
    subPageMeta: {
      'pay-rates': { title: 'Hospitality Award Pay Rates 2025\u201326 | Review My Pay', description: 'Full Hospitality Award pay rates for all classification levels \u2014 permanent and casual. Updated 1 July 2025. Check your rate is correct for your level.' },
      'penalty-rates': { title: 'Hospitality Award Penalty Rates 2025\u201326 | Review My Pay', description: 'Full Hospitality Award penalty rates for weekends, public holidays, and late nights. See every multiplier and dollar amount under MA000009.' },
      'casual-employees': { title: 'Hospitality Award Casual Pay Rates 2025\u201326 | Review My Pay', description: 'Casual pay rates under the Hospitality Award including 25% loading, penalty rates, and conversion rights. Check if your casual rate is correct.' },
      'overtime': { title: 'Hospitality Award Overtime Rates 2025\u201326 | Review My Pay', description: 'Overtime rates under the Hospitality Award \u2014 when overtime kicks in, time-and-a-half and double-time rates, and how to check your payslip.' },
      'allowances': { title: 'Hospitality Award Allowances 2025\u201326 | Review My Pay', description: 'All allowances under the Hospitality Award \u2014 meal, uniform, split shift, first aid, and more. Current dollar amounts and when each applies.' },
      'classifications': { title: 'Hospitality Award Classification Levels | Review My Pay', description: 'Hospitality Award classification levels 1\u20135 \u2014 duties, indicative tasks, and pay rates for each level. Check if your classification is correct.' },
    },
    intentPages: HOSPITALITY_INTENT_PAGES,
    scenarioPages: HOSPITALITY_SCENARIO_PAGES,
    rolePages: [
      { slug: 'waitstaff-pay-rates', title: 'Waitstaff Pay Rates Australia 2025\u201326', metaTitle: 'Waitstaff Pay Rates 2025\u201326 | Hospitality Award', metaDescription: 'Pay rates for waitstaff under the Hospitality Award \u2014 Sunday rates, split shift allowance, and the most common underpayments for front-of-house staff.', type: 'role' },
      { slug: 'cook-pay-rates', title: 'Cook Pay Rates Australia 2025\u201326', metaTitle: 'Cook Pay Rates 2025\u201326 | Hospitality Award', metaDescription: 'Cook and chef pay rates under the Hospitality Award \u2014 trade qualifications, classification levels, Sunday rates, and how to check if your level is wrong.', type: 'role' },
      { slug: 'kitchen-hand-pay-rates', title: 'Kitchen Hand Pay Rates Australia 2025\u201326', metaTitle: 'Kitchen Hand Pay Rates 2025\u201326 | Hospitality Award', metaDescription: 'Kitchen hand pay rates under the Hospitality Award \u2014 Level 1 rates, weekend penalties, and why kitchen hands are the most frequently underpaid hospitality workers.', type: 'role' },
      { slug: 'bartender-pay-rates', title: 'Bartender Pay Rates Australia 2025\u201326', metaTitle: 'Bartender Pay Rates 2025\u201326 | Hospitality Award', metaDescription: 'Bartender pay rates under the Hospitality Award \u2014 late-night penalties, public holiday rates, and worked examples for typical bar shifts.', type: 'role' },
      { slug: 'hotel-worker-pay-rates', title: 'Hotel Worker Pay Rates Australia 2025\u201326', metaTitle: 'Hotel Worker Pay Rates 2025\u201326 | Hospitality Award', metaDescription: 'Hotel worker pay rates under the Hospitality Award \u2014 rooms division, weekend rates, rostering rules, and night audit classification.', type: 'role' },
      { slug: 'function-centre-pay-rates', title: 'Function Centre Worker Pay Rates 2025\u201326', metaTitle: 'Function Centre Pay Rates 2025\u201326 | Hospitality Award', metaDescription: 'Function centre and event staff pay rates under the Hospitality Award \u2014 casual rates, late finish penalties, and broken shift allowance.', type: 'role' },
    ],
    intentComponents: {
      'am-i-being-underpaid': dynamic(() => import('@/components/seo/intent/IntentAmIUnderpaid')),
      'not-getting-overtime': dynamic(() => import('@/components/seo/intent/IntentNotGettingOvertime')),
      'hourly-rate-check': dynamic(() => import('@/components/seo/intent/IntentHourlyRateCheck')),
      'no-penalty-rates-paid': dynamic(() => import('@/components/seo/intent/IntentNoPenaltyRates')),
      'unpaid-trial-shifts': dynamic(() => import('@/components/seo/intent/IntentUnpaidTrialShifts')),
      'casual-conversion-refused': dynamic(() => import('@/components/seo/intent/IntentCasualConversion')),
      'pay-too-low': dynamic(() => import('@/components/seo/intent/IntentPayTooLow')),
      'flat-rate-hospitality': dynamic(() => import('@/components/seo/intent/IntentFlatRate')),
    },
    scenarioComponents: {
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
    },
    roleComponents: {
      // Hospitality roles have dedicated page files — no registry components needed
    },
    hubComponent: dynamic(() => import('@/components/seo/awards/HospitalityHubContent')),
    subPageComponents: {
      'penalty-rates': dynamic(() => import('@/components/seo/awards/HospitalityPenaltyContent')),
      'casual-employees': dynamic(() => import('@/components/seo/awards/HospitalityCasualContent')),
      'overtime': dynamic(() => import('@/components/seo/awards/HospitalityOvertimeContent')),
      'allowances': dynamic(() => import('@/components/seo/awards/HospitalityAllowancesContent')),
      'classifications': dynamic(() => import('@/components/seo/awards/HospitalityClassificationsContent')),
    },
    getRates: getHospitalityRates,
  },

  'restaurant-award': {
    label: 'Restaurant Award',
    hubMeta: {
      title: 'Restaurant Award Pay Rates 2025\u201326 | Review My Pay',
      description: 'Check Restaurant Award pay rates, penalty rates, and overtime for 2025\u201326. If you work in a restaurant or caf\u00e9, see what you\u2019re actually owed.',
      keywords: ['restaurant award pay rates', 'restaurant award penalty rates', 'restaurant award 2025', 'MA000119', 'restaurant casual pay rates'],
    },
    subPageMeta: {
      'pay-rates': { title: 'Restaurant Award Pay Rates 2025\u201326 | Review My Pay', description: 'Full Restaurant Award pay rates for all classification levels \u2014 permanent and casual. Updated 1 July 2025. Check your rate is correct for your level.' },
      'penalty-rates': { title: 'Restaurant Award Penalty Rates 2025\u201326 | Review My Pay', description: 'Restaurant Award penalty rates for Saturdays, Sundays, and public holidays. The Sunday rate differs by classification level \u2014 check yours is correct here.' },
      'casual-employees': { title: 'Restaurant Award Casual Pay Rates 2025\u201326 | Review My Pay', description: 'Casual pay rates under the Restaurant Award including 25% loading, penalty rates, and conversion rights. Check if your casual rate is correct.' },
      'overtime': { title: 'Restaurant Award Overtime Rates 2025\u201326 | Review My Pay', description: 'Overtime rates under the Restaurant Award \u2014 daily and weekly triggers, time-and-a-half and double-time, and how to check your payslip is correct.' },
      'allowances': { title: 'Restaurant Award Allowances 2025\u201326 | Review My Pay', description: 'All allowances under the Restaurant Award \u2014 meal, tool, split shift, uniform, and more. Current dollar amounts and when each applies.' },
      'classifications': { title: 'Restaurant Award Classification Levels | Review My Pay', description: 'Restaurant Award classification levels \u2014 duties, indicative tasks, and pay rates. Check if your classification matches the work you actually do.' },
    },
    intentPages: RESTAURANT_INTENT_PAGES,
    scenarioPages: RESTAURANT_SCENARIO_PAGES,
    rolePages: RESTAURANT_ROLE_PAGES,
    intentComponents: {
      'am-i-being-underpaid': dynamic(() => import('@/components/seo/restaurant-intent/RestaurantIntentUnderpaid')),
      'wrong-award-applied': dynamic(() => import('@/components/seo/restaurant-intent/RestaurantIntentWrongAward')),
      'not-getting-overtime': dynamic(() => import('@/components/seo/restaurant-intent/RestaurantIntentOvertime')),
      'junior-pay-rates': dynamic(() => import('@/components/seo/restaurant-intent/RestaurantIntentJuniorPay')),
      'pay-too-low': dynamic(() => import('@/components/seo/restaurant-intent/RestaurantIntentPayTooLow')),
      'flat-rate-restaurant': dynamic(() => import('@/components/seo/restaurant-intent/RestaurantIntentFlatRate')),
    },
    scenarioComponents: {
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
    },
    roleComponents: {
      'waitstaff-pay-rates': dynamic(() => import('@/components/seo/restaurant-roles/RestaurantWaitstaffContent')),
      'cook-pay-rates': dynamic(() => import('@/components/seo/restaurant-roles/RestaurantCookContent')),
      'cafe-worker-pay-rates': dynamic(() => import('@/components/seo/restaurant-roles/RestaurantCafeWorkerContent')),
      'catering-worker-pay-rates': dynamic(() => import('@/components/seo/restaurant-roles/RestaurantCateringContent')),
    },
    hubComponent: dynamic(() => import('@/components/seo/awards/RestaurantHubContent')),
    subPageComponents: {
      'pay-rates': dynamic(() => import('@/components/seo/awards/RestaurantPayRatesContent')),
      'penalty-rates': dynamic(() => import('@/components/seo/awards/RestaurantPenaltyContent')),
      'casual-employees': dynamic(() => import('@/components/seo/awards/RestaurantCasualContent')),
      'overtime': dynamic(() => import('@/components/seo/awards/RestaurantOvertimeContent')),
      'allowances': dynamic(() => import('@/components/seo/awards/RestaurantAllowancesContent')),
      'classifications': dynamic(() => import('@/components/seo/awards/RestaurantClassificationsContent')),
    },
    getRates: getRestaurantRates,
  },

  'fast-food-award': {
    label: 'Fast Food Award',
    hubMeta: {
      title: 'Fast Food Award Pay Rates 2025\u201326 | Review My Pay',
      description: 'Check Fast Food Industry Award pay rates, penalty rates, and junior rates for 2025\u201326. Free tool calculates what you\u2019re owed under MA000003.',
      keywords: ['fast food award pay rates', 'fast food penalty rates', 'fast food award 2025', 'MA000003', 'fast food junior rates'],
    },
    subPageMeta: {
      'pay-rates': { title: 'Fast Food Award Pay Rates 2025\u201326 | Review My Pay', description: 'Full Fast Food Award pay rates for all grades \u2014 permanent, casual, and junior. Updated 1 July 2025. Check your rate is correct.' },
      'penalty-rates': { title: 'Fast Food Award Penalty Rates 2025\u201326 | Review My Pay', description: 'Fast Food Award penalty rates for weekends and public holidays. Saturday is ordinary time \u2014 Sunday and public holiday rates explained here.' },
      'casual-employees': { title: 'Fast Food Award Casual Pay Rates 2025\u201326 | Review My Pay', description: 'Casual pay rates under the Fast Food Award including 25% loading, penalty rates, and minimum engagement. Check if your casual rate is correct.' },
      'overtime': { title: 'Fast Food Award Overtime Rates 2025\u201326 | Review My Pay', description: 'Overtime rates under the Fast Food Award \u2014 triggers, time-and-a-half and double-time rates, and how to check your payslip.' },
      'allowances': { title: 'Fast Food Award Allowances 2025\u201326 | Review My Pay', description: 'All allowances under the Fast Food Award \u2014 meal, laundry, cold work, and more. Current dollar amounts and when each applies.' },
      'classifications': { title: 'Fast Food Award Classification Grades | Review My Pay', description: 'Fast Food Award classification grades \u2014 duties, experience requirements, and pay rates. Check if your grade matches the work you do.' },
    },
    intentPages: FAST_FOOD_INTENT_PAGES,
    scenarioPages: FAST_FOOD_SCENARIO_PAGES,
    rolePages: FAST_FOOD_ROLE_PAGES,
    intentComponents: {
      'am-i-being-underpaid': dynamic(() => import('@/components/seo/fast-food-intent/FFIntentUnderpaid')),
      'not-paid-sunday-rate': dynamic(() => import('@/components/seo/fast-food-intent/FFIntentSundayRate')),
      'junior-rates-correct': dynamic(() => import('@/components/seo/fast-food-intent/FFIntentJuniorRates')),
      'hourly-rate-check': dynamic(() => import('@/components/seo/fast-food-intent/FFIntentHourlyRateCheck')),
      'unpaid-trial-shifts': dynamic(() => import('@/components/seo/fast-food-intent/FFIntentUnpaidTrialShifts')),
      'roster-changes-short-notice': dynamic(() => import('@/components/seo/fast-food-intent/FFIntentRosterChanges')),
    },
    scenarioComponents: {
      'sunday-shift-no-penalty': dynamic(() => import('@/components/seo/fast-food-scenarios/FFScenarioSundayNoPenalty')),
      'junior-rate-after-21': dynamic(() => import('@/components/seo/fast-food-scenarios/FFScenarioJuniorAfter21')),
      'no-break-5-hour-shift': dynamic(() => import('@/components/seo/fast-food-scenarios/FFScenarioNoBreak')),
      'cash-in-hand-fast-food': dynamic(() => import('@/components/seo/fast-food-scenarios/FFScenarioCashInHand')),
      'sent-home-early-fast-food': dynamic(() => import('@/components/seo/fast-food-scenarios/FFScenarioSentHome')),
      'public-holiday-fast-food': dynamic(() => import('@/components/seo/fast-food-scenarios/FFScenarioPublicHoliday')),
      'christmas-day-fast-food': dynamic(() => import('@/components/seo/fast-food-scenarios/FFScenarioChristmasDay')),
      'no-payslip-fast-food': dynamic(() => import('@/components/seo/fast-food-scenarios/FFScenarioNoPayslip')),
      'late-night-loading-fast-food': dynamic(() => import('@/components/seo/fast-food-scenarios/FFScenarioLateNight')),
      '50-hour-week-fast-food': dynamic(() => import('@/components/seo/fast-food-scenarios/FFScenario50HourWeek')),
      'overtime-not-paid-fast-food': dynamic(() => import('@/components/seo/fast-food-scenarios/FFScenarioOvertimeNotPaid')),
      'casual-every-week-fast-food': dynamic(() => import('@/components/seo/fast-food-scenarios/FFScenarioCasualEveryWeek')),
      'super-not-paid-fast-food': dynamic(() => import('@/components/seo/fast-food-scenarios/FFScenarioSuperNotPaid')),
      'flat-rate-fast-food': dynamic(() => import('@/components/seo/fast-food-scenarios/FFScenarioFlatRate')),
      'under-18-fast-food-rights': dynamic(() => import('@/components/seo/fast-food-scenarios/FFScenarioUnder18Rights')),
      'delivery-driver-pay': dynamic(() => import('@/components/seo/fast-food-scenarios/FFScenarioDeliveryDriverPay')),
      'training-shift-unpaid': dynamic(() => import('@/components/seo/fast-food-scenarios/FFScenarioTrainingUnpaid')),
      'double-shift-fast-food': dynamic(() => import('@/components/seo/fast-food-scenarios/FFScenarioDoubleShift')),
      'roster-changed-last-minute': dynamic(() => import('@/components/seo/fast-food-scenarios/FFScenarioRosterChanged')),
      'student-pay-fast-food': dynamic(() => import('@/components/seo/fast-food-scenarios/FFScenarioStudentPay')),
      'closing-shift-unpaid-time': dynamic(() => import('@/components/seo/fast-food-scenarios/FFScenarioClosingShift')),
      'pay-doesnt-match-hours': dynamic(() => import('@/components/seo/fast-food-scenarios/FFScenarioPayDoesntMatch')),
      'meal-allowance-fast-food': dynamic(() => import('@/components/seo/fast-food-scenarios/FFScenarioMealAllowance')),
      'grade-1-after-6-months': dynamic(() => import('@/components/seo/fast-food-scenarios/FFScenarioGrade1After6Months')),
      'good-friday-fast-food': dynamic(() => import('@/components/seo/fast-food-scenarios/FFScenarioGoodFriday')),
      'australia-day-fast-food': dynamic(() => import('@/components/seo/fast-food-scenarios/FFScenarioAustraliaDay')),
      'below-award-fast-food': dynamic(() => import('@/components/seo/fast-food-scenarios/FFScenarioBelowAward')),
      'casual-conversion-fast-food': dynamic(() => import('@/components/seo/fast-food-scenarios/FFScenarioCasualConversion')),
      'midnight-shift-fast-food': dynamic(() => import('@/components/seo/fast-food-scenarios/FFScenarioMidnightShift')),
      'laundry-allowance-fast-food': dynamic(() => import('@/components/seo/fast-food-scenarios/FFScenarioLaundryAllowance')),
    },
    roleComponents: {
      'junior-pay-rates': dynamic(() => import('@/components/seo/fast-food-roles/FFJuniorPayContent')),
      'crew-member-pay-rates': dynamic(() => import('@/components/seo/fast-food-roles/FFCrewMemberContent')),
      'delivery-driver-pay-rates': dynamic(() => import('@/components/seo/fast-food-roles/FFDeliveryDriverContent')),
      'shift-supervisor-pay-rates': dynamic(() => import('@/components/seo/fast-food-roles/FFShiftSupervisorContent')),
    },
    hubComponent: dynamic(() => import('@/components/seo/awards/FastFoodHubContent')),
    subPageComponents: {
      'pay-rates': dynamic(() => import('@/components/seo/awards/FastFoodPayRatesContent')),
      'penalty-rates': dynamic(() => import('@/components/seo/awards/FastFoodPenaltyContent')),
      'casual-employees': dynamic(() => import('@/components/seo/awards/FastFoodCasualContent')),
      'overtime': dynamic(() => import('@/components/seo/awards/FastFoodOvertimeContent')),
      'allowances': dynamic(() => import('@/components/seo/awards/FastFoodAllowancesContent')),
      'classifications': dynamic(() => import('@/components/seo/awards/FastFoodClassificationsContent')),
    },
    getRates: () => getAwardRates('MA000003'),
  },

  'retail-award': {
    label: 'Retail Award',
    hubMeta: {
      title: 'Retail Award Pay Rates 2025\u201326 | Review My Pay',
      description: 'Check General Retail Industry Award pay rates, penalty rates, and overtime for 2025\u201326. Free tool calculates what you\u2019re owed under MA000004.',
      keywords: ['retail award pay rates', 'retail award penalty rates', 'retail award 2025', 'MA000004', 'retail casual pay rates'],
    },
    intentPages: RETAIL_INTENT_PAGES,
    scenarioPages: RETAIL_SCENARIO_PAGES,
    rolePages: RETAIL_ROLE_PAGES,
    intentComponents: {
      'am-i-being-underpaid': dynamic(() => import('@/components/seo/retail-intent/RetailIntentUnderpaid')),
      'not-getting-overtime': dynamic(() => import('@/components/seo/retail-intent/RetailIntentOvertime')),
      'sunday-rate-check': dynamic(() => import('@/components/seo/retail-intent/RetailIntentSundayRate')),
      'hourly-rate-check': dynamic(() => import('@/components/seo/retail-intent/RetailIntentHourlyRate')),
      'pay-too-low': dynamic(() => import('@/components/seo/retail-intent/RetailIntentPayTooLow')),
      'flat-rate-retail': dynamic(() => import('@/components/seo/retail-intent/RetailIntentFlatRate')),
    },
    scenarioComponents: {
      'sunday-rate-wrong-retail': dynamic(() => import('@/components/seo/retail-scenarios/RetailScenarioSundayRate')),
      'christmas-day-retail': dynamic(() => import('@/components/seo/retail-scenarios/RetailScenarioChristmasDay')),
      'sent-home-early-retail': dynamic(() => import('@/components/seo/retail-scenarios/RetailScenarioSentHome')),
      'no-payslip-retail': dynamic(() => import('@/components/seo/retail-scenarios/RetailScenarioNoPayslip')),
      'cash-in-hand-retail': dynamic(() => import('@/components/seo/retail-scenarios/RetailScenarioCashInHand')),
      'casual-conversion-retail': dynamic(() => import('@/components/seo/retail-scenarios/RetailScenarioCasualConversion')),
      'overtime-not-paid-retail': dynamic(() => import('@/components/seo/retail-scenarios/RetailScenarioOvertimeNotPaid')),
      'public-holiday-retail': dynamic(() => import('@/components/seo/retail-scenarios/RetailScenarioPublicHoliday')),
      'late-night-retail': dynamic(() => import('@/components/seo/retail-scenarios/RetailScenarioLateNight')),
      'below-award-retail': dynamic(() => import('@/components/seo/retail-scenarios/RetailScenarioBelowAward')),
      'super-not-paid-retail': dynamic(() => import('@/components/seo/retail-scenarios/RetailScenarioSuperNotPaid')),
      'good-friday-retail': dynamic(() => import('@/components/seo/retail-scenarios/RetailScenarioGoodFriday')),
    },
    roleComponents: {
      'sales-assistant-pay-rates': dynamic(() => import('@/components/seo/retail-roles/RetailSalesAssistantContent')),
      'cashier-pay-rates': dynamic(() => import('@/components/seo/retail-roles/RetailCashierContent')),
      'supervisor-pay-rates': dynamic(() => import('@/components/seo/retail-roles/RetailSupervisorContent')),
    },
    hubComponent: dynamic(() => import('@/components/seo/awards/RetailHubContent')),
    // subPageComponents not yet created for Retail — pages use generic fallback
    getRates: () => getAwardRates('MA000004'),
  },

  'cleaning-award': {
    label: 'Cleaning Award',
    hubMeta: {
      title: 'Cleaning Services Award Pay Rates 2025\u201326 | Review My Pay',
      description: 'Check Cleaning Services Award pay rates, penalty rates, and allowances for 2025\u201326. Free tool calculates what you\u2019re owed under MA000022.',
      keywords: ['cleaning award pay rates', 'cleaning award penalty rates', 'cleaning award 2025', 'MA000022'],
    },
    intentPages: CLEANING_INTENT_PAGES,
    scenarioPages: CLEANING_SCENARIO_PAGES,
    rolePages: CLEANING_ROLE_PAGES,
    intentComponents: {
      'am-i-being-underpaid': dynamic(() => import('@/components/seo/cleaning-intent/CleaningIntentUnderpaid')),
      'not-getting-overtime': dynamic(() => import('@/components/seo/cleaning-intent/CleaningIntentOvertime')),
      'hourly-rate-check': dynamic(() => import('@/components/seo/cleaning-intent/CleaningIntentHourlyRate')),
      'pay-too-low': dynamic(() => import('@/components/seo/cleaning-intent/CleaningIntentPayTooLow')),
      'flat-rate-cleaning': dynamic(() => import('@/components/seo/cleaning-intent/CleaningIntentFlatRate')),
    },
    scenarioComponents: {
      'sunday-rate-wrong-cleaning': dynamic(() => import('@/components/seo/cleaning-scenarios/CleaningScenarioSundayRate')),
      'sent-home-early-cleaning': dynamic(() => import('@/components/seo/cleaning-scenarios/CleaningScenarioSentHome')),
      'no-payslip-cleaning': dynamic(() => import('@/components/seo/cleaning-scenarios/CleaningScenarioNoPayslip')),
      'cash-in-hand-cleaning': dynamic(() => import('@/components/seo/cleaning-scenarios/CleaningScenarioCashInHand')),
      'public-holiday-cleaning': dynamic(() => import('@/components/seo/cleaning-scenarios/CleaningScenarioPublicHoliday')),
      'overtime-not-paid-cleaning': dynamic(() => import('@/components/seo/cleaning-scenarios/CleaningScenarioOvertimeNotPaid')),
      'below-award-cleaning': dynamic(() => import('@/components/seo/cleaning-scenarios/CleaningScenarioBelowAward')),
      'super-not-paid-cleaning': dynamic(() => import('@/components/seo/cleaning-scenarios/CleaningScenarioSuperNotPaid')),
    },
    roleComponents: {
      'cleaner-pay-rates': dynamic(() => import('@/components/seo/cleaning-roles/CleaningCleanerContent')),
      'janitor-pay-rates': dynamic(() => import('@/components/seo/cleaning-roles/CleaningJanitorContent')),
      'supervisor-pay-rates': dynamic(() => import('@/components/seo/cleaning-roles/CleaningSupervisorContent')),
    },
    hubComponent: dynamic(() => import('@/components/seo/awards/CleaningHubContent')),
    getRates: () => getAwardRates('MA000022'),
  },

  'clerks-award': {
    label: 'Clerks Award',
    hubMeta: {
      title: 'Clerks Award Pay Rates 2025\u201326 | Review My Pay',
      description: 'Check Clerks \u2014 Private Sector Award pay rates, penalty rates, and overtime for 2025\u201326. Free tool calculates what you\u2019re owed under MA000002.',
      keywords: ['clerks award pay rates', 'clerks award penalty rates', 'clerks award 2025', 'MA000002'],
    },
    intentPages: CLERKS_INTENT_PAGES,
    scenarioPages: CLERKS_SCENARIO_PAGES,
    rolePages: CLERKS_ROLE_PAGES,
    intentComponents: {
      'am-i-being-underpaid': dynamic(() => import('@/components/seo/clerks-intent/ClerksIntentUnderpaid')),
      'not-getting-overtime': dynamic(() => import('@/components/seo/clerks-intent/ClerksIntentOvertime')),
      'hourly-rate-check': dynamic(() => import('@/components/seo/clerks-intent/ClerksIntentHourlyRate')),
      'pay-too-low': dynamic(() => import('@/components/seo/clerks-intent/ClerksIntentPayTooLow')),
      'flat-rate-clerks': dynamic(() => import('@/components/seo/clerks-intent/ClerksIntentFlatRate')),
    },
    scenarioComponents: {
      'overtime-not-paid-clerks': dynamic(() => import('@/components/seo/clerks-scenarios/ClerksScenarioOvertimeNotPaid')),
      'below-award-clerks': dynamic(() => import('@/components/seo/clerks-scenarios/ClerksScenarioBelowAward')),
      'public-holiday-clerks': dynamic(() => import('@/components/seo/clerks-scenarios/ClerksScenarioPublicHoliday')),
      'no-payslip-clerks': dynamic(() => import('@/components/seo/clerks-scenarios/ClerksScenarioNoPayslip')),
      'casual-conversion-clerks': dynamic(() => import('@/components/seo/clerks-scenarios/ClerksScenarioCasualConversion')),
      'saturday-rate-wrong-clerks': dynamic(() => import('@/components/seo/clerks-scenarios/ClerksScenarioSaturdayRate')),
      'super-not-paid-clerks': dynamic(() => import('@/components/seo/clerks-scenarios/ClerksScenarioSuperNotPaid')),
      'classification-wrong-clerks': dynamic(() => import('@/components/seo/clerks-scenarios/ClerksScenarioClassification')),
    },
    roleComponents: {
      'admin-assistant-pay-rates': dynamic(() => import('@/components/seo/clerks-roles/ClerksAdminAssistantContent')),
      'receptionist-pay-rates': dynamic(() => import('@/components/seo/clerks-roles/ClerksReceptionistContent')),
      'data-entry-pay-rates': dynamic(() => import('@/components/seo/clerks-roles/ClerksDataEntryContent')),
    },
    hubComponent: dynamic(() => import('@/components/seo/awards/ClerksHubContent')),
    getRates: () => getAwardRates('MA000002'),
  },

  'security-award': {
    label: 'Security Award',
    hubMeta: {
      title: 'Security Services Award Pay Rates 2025\u201326 | Review My Pay',
      description: 'Check Security Services Industry Award pay rates, penalty rates, and allowances for 2025\u201326. Free tool calculates what you\u2019re owed under MA000016.',
      keywords: ['security award pay rates', 'security guard pay rates', 'security award 2025', 'MA000016'],
    },
    intentPages: SECURITY_INTENT_PAGES,
    scenarioPages: SECURITY_SCENARIO_PAGES,
    rolePages: SECURITY_ROLE_PAGES,
    intentComponents: {
      'am-i-being-underpaid': dynamic(() => import('@/components/seo/security-intent/SecurityIntentUnderpaid')),
      'not-getting-overtime': dynamic(() => import('@/components/seo/security-intent/SecurityIntentOvertime')),
      'hourly-rate-check': dynamic(() => import('@/components/seo/security-intent/SecurityIntentHourlyRate')),
      'pay-too-low': dynamic(() => import('@/components/seo/security-intent/SecurityIntentPayTooLow')),
      'flat-rate-security': dynamic(() => import('@/components/seo/security-intent/SecurityIntentFlatRate')),
    },
    scenarioComponents: {
      'overnight-shift-security': dynamic(() => import('@/components/seo/security-scenarios/SecurityScenarioOvernightShift')),
      'public-holiday-security': dynamic(() => import('@/components/seo/security-scenarios/SecurityScenarioPublicHoliday')),
      'sent-home-early-security': dynamic(() => import('@/components/seo/security-scenarios/SecurityScenarioSentHome')),
      'cash-in-hand-security': dynamic(() => import('@/components/seo/security-scenarios/SecurityScenarioCashInHand')),
      'no-payslip-security': dynamic(() => import('@/components/seo/security-scenarios/SecurityScenarioNoPayslip')),
      'overtime-not-paid-security': dynamic(() => import('@/components/seo/security-scenarios/SecurityScenarioOvertimeNotPaid')),
      'below-award-security': dynamic(() => import('@/components/seo/security-scenarios/SecurityScenarioBelowAward')),
      'super-not-paid-security': dynamic(() => import('@/components/seo/security-scenarios/SecurityScenarioSuperNotPaid')),
    },
    roleComponents: {
      'security-guard-pay-rates': dynamic(() => import('@/components/seo/security-roles/SecurityGuardContent')),
      'crowd-controller-pay-rates': dynamic(() => import('@/components/seo/security-roles/SecurityCrowdControllerContent')),
      'patrol-officer-pay-rates': dynamic(() => import('@/components/seo/security-roles/SecurityPatrolOfficerContent')),
    },
    hubComponent: dynamic(() => import('@/components/seo/awards/SecurityHubContent')),
    getRates: () => getAwardRates('MA000016'),
  },

  'fitness-award': {
    label: 'Fitness Award',
    hubMeta: {
      title: 'Fitness Industry Award Pay Rates 2025\u201326 | Review My Pay',
      description: 'Check Fitness Industry Award pay rates, penalty rates, and allowances for 2025\u201326. Free tool calculates what you\u2019re owed under MA000094.',
      keywords: ['fitness award pay rates', 'personal trainer pay rates', 'fitness award 2025', 'MA000094'],
    },
    intentPages: FITNESS_INTENT_PAGES,
    scenarioPages: FITNESS_SCENARIO_PAGES,
    rolePages: FITNESS_ROLE_PAGES,
    intentComponents: {
      'am-i-being-underpaid': dynamic(() => import('@/components/seo/fitness-intent/FitnessIntentUnderpaid')),
      'not-getting-overtime': dynamic(() => import('@/components/seo/fitness-intent/FitnessIntentOvertime')),
      'hourly-rate-check': dynamic(() => import('@/components/seo/fitness-intent/FitnessIntentHourlyRate')),
      'pay-too-low': dynamic(() => import('@/components/seo/fitness-intent/FitnessIntentPayTooLow')),
      'flat-rate-fitness': dynamic(() => import('@/components/seo/fitness-intent/FitnessIntentFlatRate')),
    },
    scenarioComponents: {
      'early-morning-fitness': dynamic(() => import('@/components/seo/fitness-scenarios/FitnessScenarioEarlyMorning')),
      'public-holiday-fitness': dynamic(() => import('@/components/seo/fitness-scenarios/FitnessScenarioPublicHoliday')),
      'split-shift-fitness': dynamic(() => import('@/components/seo/fitness-scenarios/FitnessScenarioSplitShift')),
      'cash-in-hand-fitness': dynamic(() => import('@/components/seo/fitness-scenarios/FitnessScenarioCashInHand')),
      'no-payslip-fitness': dynamic(() => import('@/components/seo/fitness-scenarios/FitnessScenarioNoPayslip')),
      'overtime-not-paid-fitness': dynamic(() => import('@/components/seo/fitness-scenarios/FitnessScenarioOvertimeNotPaid')),
      'below-award-fitness': dynamic(() => import('@/components/seo/fitness-scenarios/FitnessScenarioBelowAward')),
      'super-not-paid-fitness': dynamic(() => import('@/components/seo/fitness-scenarios/FitnessScenarioSuperNotPaid')),
    },
    roleComponents: {
      'personal-trainer-pay-rates': dynamic(() => import('@/components/seo/fitness-roles/FitnessPersonalTrainerContent')),
      'gym-instructor-pay-rates': dynamic(() => import('@/components/seo/fitness-roles/FitnessGymInstructorContent')),
      'swim-teacher-pay-rates': dynamic(() => import('@/components/seo/fitness-roles/FitnessSwimTeacherContent')),
    },
    hubComponent: dynamic(() => import('@/components/seo/awards/FitnessHubContent')),
    getRates: () => getAwardRates('MA000094'),
  },
};

/* ------------------------------------------------------------------ */
/*  Auto-register remaining awards with generic components             */
/* ------------------------------------------------------------------ */

// Generic component map — same components work for every auto-registered award
const genericIntentComponents: Record<string, React.ComponentType<any>> = { // eslint-disable-line @typescript-eslint/no-explicit-any
  'am-i-being-underpaid': dynamic(() => import('@/components/seo/generic/GenericIntentUnderpaid')),
  'not-getting-overtime': dynamic(() => import('@/components/seo/generic/GenericIntentOvertime')),
  'hourly-rate-check': dynamic(() => import('@/components/seo/generic/GenericIntentHourlyRate')),
  'pay-too-low': dynamic(() => import('@/components/seo/generic/GenericIntentPayTooLow')),
  'flat-rate-legal': dynamic(() => import('@/components/seo/generic/GenericIntentFlatRate')),
  'no-penalty-rates': dynamic(() => import('@/components/seo/generic/GenericIntentNoPenalty')),
};

const genericScenarioComponents: Record<string, React.ComponentType<any>> = { // eslint-disable-line @typescript-eslint/no-explicit-any
  'public-holiday': dynamic(() => import('@/components/seo/generic/GenericScenarioPublicHoliday')),
  'sent-home-early': dynamic(() => import('@/components/seo/generic/GenericScenarioSentHome')),
  'cash-in-hand': dynamic(() => import('@/components/seo/generic/GenericScenarioCashInHand')),
  'no-payslip': dynamic(() => import('@/components/seo/generic/GenericScenarioNoPayslip')),
  'overtime-not-paid': dynamic(() => import('@/components/seo/generic/GenericScenarioOvertimeNotPaid')),
  'below-award': dynamic(() => import('@/components/seo/generic/GenericScenarioBelowAward')),
  'super-not-paid': dynamic(() => import('@/components/seo/generic/GenericScenarioSuperNotPaid')),
  'casual-conversion': dynamic(() => import('@/components/seo/generic/GenericScenarioCasualConversion')),
};

const genericHubComponent = dynamic(() => import('@/components/seo/generic/GenericHubContent'));

const genericSubPageComponents: Record<string, React.ComponentType<any>> = { // eslint-disable-line @typescript-eslint/no-explicit-any
  'pay-rates': dynamic(() => import('@/components/seo/generic/GenericPayRatesContent')),
  'penalty-rates': dynamic(() => import('@/components/seo/generic/GenericPenaltyContent')),
  'casual-employees': dynamic(() => import('@/components/seo/generic/GenericCasualContent')),
  'overtime': dynamic(() => import('@/components/seo/generic/GenericOvertimeContent')),
  'allowances': dynamic(() => import('@/components/seo/generic/GenericAllowancesContent')),
  'classifications': dynamic(() => import('@/components/seo/generic/GenericClassificationsContent')),
};

// Auto-register every award that doesn't already have a hand-crafted entry
for (const award of AWARDS) {
  if (AWARD_DEEP_CONTENT[award.slug]) continue; // skip hand-crafted awards

  AWARD_DEEP_CONTENT[award.slug] = {
    label: award.shortName,
    intentPages: generateIntentPages(award),
    scenarioPages: generateScenarioPages(award),
    rolePages: [],
    intentComponents: genericIntentComponents,
    scenarioComponents: genericScenarioComponents,
    roleComponents: {},
    hubComponent: genericHubComponent,
    subPageComponents: genericSubPageComponents,
    getRates: () => getAwardRates(award.code),
  };
}

/* ------------------------------------------------------------------ */
/*  Helper functions                                                   */
/* ------------------------------------------------------------------ */

export function getDeepContent(awardSlug: string): AwardDeepContent | undefined {
  return AWARD_DEEP_CONTENT[awardSlug];
}

export function hasDeepContent(awardSlug: string): boolean {
  return awardSlug in AWARD_DEEP_CONTENT;
}

/** Get all slugs that have deep content for static generation */
export function getAllDeepContentSlugs(): string[] {
  return Object.keys(AWARD_DEEP_CONTENT);
}

/** Get intent page metadata */
export function getDeepIntentPage(awardSlug: string, intentSlug: string): AwardPage | undefined {
  const dc = AWARD_DEEP_CONTENT[awardSlug];
  if (!dc) return undefined;
  return dc.intentPages.find(p => p.slug === intentSlug)
    || dc.rolePages.find(p => p.slug === intentSlug);
}

/** Get scenario page metadata */
export function getDeepScenarioPage(awardSlug: string, scenarioSlug: string): AwardPage | undefined {
  const dc = AWARD_DEEP_CONTENT[awardSlug];
  if (!dc) return undefined;
  return dc.scenarioPages.find(p => p.slug === scenarioSlug);
}

/** Generate all static params for intent + role pages across all awards */
export function generateAllIntentParams(): { awardSlug: string; intentSlug: string }[] {
  const params: { awardSlug: string; intentSlug: string }[] = [];
  for (const [slug, dc] of Object.entries(AWARD_DEEP_CONTENT)) {
    for (const page of dc.intentPages) {
      params.push({ awardSlug: slug, intentSlug: page.slug });
    }
    for (const page of dc.rolePages) {
      params.push({ awardSlug: slug, intentSlug: page.slug });
    }
  }
  return params;
}

/** Generate all static params for scenario pages across all awards */
export function generateAllScenarioParams(): { awardSlug: string; slug: string }[] {
  const params: { awardSlug: string; slug: string }[] = [];
  for (const [awardSlug, dc] of Object.entries(AWARD_DEEP_CONTENT)) {
    for (const page of dc.scenarioPages) {
      params.push({ awardSlug, slug: page.slug });
    }
  }
  return params;
}
