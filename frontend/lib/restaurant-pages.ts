/**
 * Registry for restaurant high-intent, scenario, and role pages.
 * Used for static generation and metadata.
 */

export interface RestaurantPage {
  slug: string;
  title: string;        // H1 title (without "| Review My Pay")
  metaTitle: string;     // Full meta title
  metaDescription: string;
  type: 'intent' | 'scenario' | 'role';
}

export const RESTAURANT_INTENT_PAGES: RestaurantPage[] = [
  { slug: 'am-i-being-underpaid', title: 'Am I Being Underpaid in a Restaurant or Café?', metaTitle: 'Am I Being Underpaid at a Restaurant? | Review My Pay', metaDescription: 'The clearest signs you\'re being underpaid under the Restaurant Award — and the fastest way to check your actual shifts against what you\'re owed.', type: 'intent' },
  { slug: 'wrong-award-applied', title: 'Hospitality Award Applied to a Restaurant or Café — Is That Wrong?', metaTitle: 'Wrong Award Applied to Your Restaurant? | Review My Pay', metaDescription: 'If your employer uses Hospitality Award rates for a standalone restaurant or café, every Saturday and Sunday shift may be calculated from the wrong multipliers.', type: 'intent' },
  { slug: 'not-getting-overtime', title: 'Not Getting Overtime at a Restaurant or Café?', metaTitle: 'Not Getting Overtime at a Restaurant? | Review My Pay', metaDescription: 'If you regularly work past 7.6 hours in a shift or 38 hours a week at a restaurant or café, you\'re almost certainly owed overtime under the award.', type: 'intent' },
  { slug: 'junior-pay-rates', title: 'Restaurant Award Junior Pay Rates 2025–26', metaTitle: 'Restaurant Award Junior Pay Rates 2025–26 | Review My Pay', metaDescription: 'Junior pay rates under the Restaurant Award — age percentages, penalty rates on top, and the most common errors for under-21 workers in restaurants and cafés.', type: 'intent' },
  { slug: 'pay-too-low', title: 'My Restaurant or Café Pay Feels Too Low — Check What You\'re Owed', metaTitle: 'Restaurant or Café Pay Too Low? Check Here | Review My Pay', metaDescription: 'If your pay in a restaurant or café feels off but you\'re not sure why, this page walks through the most common causes and how to check your actual shifts.', type: 'intent' },
  { slug: 'flat-rate-restaurant', title: 'Is a Flat Rate Legal in a Restaurant or Café?', metaTitle: 'Is a Flat Rate Legal in a Restaurant? | Review My Pay', metaDescription: 'Flat rates in restaurants and cafés are only legal when they genuinely cover every award entitlement including Sunday and public holiday rates.', type: 'intent' },
];

export const RESTAURANT_SCENARIO_PAGES: RestaurantPage[] = [
  { slug: 'sunday-rate-wrong', title: 'My Restaurant Sunday Pay Looks Wrong — What Should It Be?', metaTitle: 'Restaurant Sunday Pay Wrong? Check Your Rate', metaDescription: 'If your Sunday rate looks the same as a Tuesday in a restaurant, it\'s almost certainly wrong. Check the Restaurant Award Sunday rates for your level.', type: 'scenario' },
  { slug: 'wrong-award-cafe', title: 'My Café Uses the Hospitality Award — Is That Right?', metaTitle: 'My Café Uses the Hospitality Award — Right?', metaDescription: 'Standalone cafés are covered by the Restaurant Award, not the Hospitality Award. Different penalty multipliers mean different pay on Saturdays and Sundays.', type: 'scenario' },
  { slug: 'trade-qualified-wrong-level', title: 'I\'m a Trade-Qualified Cook But Below Level 4 — Is That Right?', metaTitle: 'Trade-Qualified Cook Below Level 4? | Review My Pay', metaDescription: 'Level 4 is the minimum for any trade-qualified cook under the Restaurant Award. If you\'re below Level 4 with a Certificate III, you\'re being misclassified.', type: 'scenario' },
  { slug: 'split-shift-allowance-missing', title: 'Working Split Shifts in a Restaurant — Where\'s My Allowance?', metaTitle: 'Restaurant Split Shift Allowance Missing?', metaDescription: 'If you work morning and evening service with an unpaid break, you\'re owed a split shift allowance for every qualifying day under the Restaurant Award.', type: 'scenario' },
  { slug: 'kitchen-overtime-unpaid', title: 'Long Kitchen Shifts With No Overtime — What Am I Owed?', metaTitle: 'Long Kitchen Shifts With No Overtime? | Review My Pay', metaDescription: 'If your kitchen shifts regularly exceed 7.6 hours and no overtime appears on your payslip, you\'re almost certainly being underpaid under the Restaurant Award.', type: 'scenario' },
  { slug: 'junior-rate-no-penalty', title: 'Junior Worker in a Restaurant — My Rate Doesn\'t Change on Weekends', metaTitle: 'Junior Restaurant Worker — No Weekend Penalty?', metaDescription: 'Junior rates are a starting point — penalty multipliers apply on top for Saturdays, Sundays, and public holidays under the Restaurant Award.', type: 'scenario' },
  { slug: 'public-holiday-restaurant', title: 'Worked a Public Holiday at a Restaurant — What Am I Owed?', metaTitle: 'Worked a Public Holiday at a Restaurant? | RMP', metaDescription: '2.25× your ordinary rate if you\'re permanent, or the applicable casual public holiday rate under the Restaurant Award. Minimum engagement rules also apply.', type: 'scenario' },
  { slug: 'late-night-no-loading', title: 'Restaurant or Café Shift Finishing After 10pm — Am I Getting a Loading?', metaTitle: 'Restaurant Shift After 10pm — Getting a Loading?', metaDescription: 'The Restaurant Award adds a per-hour loading for work after 10pm and after midnight. If your rate is flat from 6pm to closing, those loadings are missing.', type: 'scenario' },
  { slug: 'casual-conversion-restaurant', title: 'Working Regular Casual Hours at a Restaurant — Can I Convert to Permanent?', metaTitle: 'Casual to Permanent at a Restaurant | Review My Pay', metaDescription: 'After 12 months of regular casual work in a restaurant, you can request conversion to permanent employment under the Fair Work Act. Learn the process here.', type: 'scenario' },
  { slug: 'restaurant-flat-rate-legal', title: 'My Restaurant Pays a Flat Rate — Is It Legal?', metaTitle: 'Restaurant Flat Rate — Is It Legal? | Review My Pay', metaDescription: 'A flat rate satisfies the Restaurant Award only when it genuinely exceeds all penalty scenarios including Sunday and public holiday rates for every shift.', type: 'scenario' },
  { slug: 'saturday-rate-wrong', title: 'My Saturday Pay at a Restaurant Looks Wrong', metaTitle: 'My Saturday Pay at a Restaurant Looks Wrong | Review My Pay', metaDescription: 'If your Saturday rate is the same as a Tuesday at a restaurant, Saturday penalty rates haven\'t been applied. Check what you should actually be paid here.', type: 'scenario' },
  { slug: 'classification-never-reviewed', title: 'My Restaurant Classification Has Never Changed — Is That Right?', metaTitle: 'Restaurant Classification Never Changed? | RMP', metaDescription: 'Classifications must reflect your current duties, not the level set when you started. If your duties have changed, your level should have too.', type: 'scenario' },
  { slug: 'no-payslip-restaurant', title: 'Working at a Restaurant With No Payslip — What Are My Rights?', metaTitle: 'Restaurant Job With No Payslip? | Review My Pay', metaDescription: 'Every employee is entitled to a payslip within one working day of each pay period. Working without payslips is a red flag for underpayment. Know your rights.', type: 'scenario' },
  { slug: 'cash-in-hand-restaurant', title: 'Restaurant Cash in Hand — Is My Pay Legal?', metaTitle: 'Restaurant Cash in Hand — Is My Pay Legal? | Review My Pay', metaDescription: 'Cash is legal as a payment method, but paying below award rates, skipping payslips, or not paying super while using cash is not. Know your entitlements here.', type: 'scenario' },
  { slug: 'super-restaurant', title: 'Superannuation for Restaurant and Café Workers', metaTitle: 'Super for Restaurant and Café Workers | Review My Pay', metaDescription: 'All restaurant and café workers including casuals are entitled to super at 12% of ordinary time earnings. Check if your employer is paying correctly.', type: 'scenario' },
  { slug: '21st-birthday-restaurant', title: 'I Turned 21 Working in a Restaurant — Has My Rate Changed?', metaTitle: 'Turned 21 at a Restaurant — Rate Changed? | RMP', metaDescription: 'Full adult rates apply from your 21st birthday under the Restaurant Award. If your rate hasn\'t changed, you\'ve been underpaid from that date. Check yours.', type: 'scenario' },
  { slug: 'introductory-rate-too-long', title: 'Been at a Restaurant More Than 3 Months on Introductory Rate', metaTitle: 'Introductory Rate Over 3 Months? | Review My Pay', metaDescription: 'The introductory rate applies for the first 3 months in the restaurant industry only. After that, you must be paid at least Level 1 under the award.', type: 'scenario' },
  { slug: 'sent-home-early-restaurant', title: 'Sent Home Early From a Restaurant Shift — What Am I Owed?', metaTitle: 'Sent Home Early From a Restaurant Shift? | RMP', metaDescription: 'You\'re owed at least 2 hours\' pay as a casual under the Restaurant Award. If you were sent home early, minimum engagement rules protect your earnings.', type: 'scenario' },
  { slug: 'chef-salary-overtime', title: 'Chef on a Salary — Am I Still Owed Overtime?', metaTitle: 'Chef on Salary — Still Owed Overtime? | Review My Pay', metaDescription: 'Unless your salary demonstrably exceeds all award obligations in every week including overtime, you may be owed additional pay under the Restaurant Award.', type: 'scenario' },
  { slug: 'no-overtime-restaurant', title: 'Working 40+ Hours at a Restaurant and Not Getting Overtime', metaTitle: 'Working 40+ Hours at a Restaurant, No Overtime?', metaDescription: 'Every hour beyond 38 in a week triggers overtime under the Restaurant Award. If you regularly work 40+ hours without overtime, you\'re likely being underpaid.', type: 'scenario' },
  { slug: 'christmas-day-restaurant', title: 'Worked Christmas Day at a Restaurant — What Am I Owed?', metaTitle: 'Worked Christmas Day at a Restaurant? | RMP', metaDescription: '2.25× your ordinary rate (permanent) or the applicable casual public holiday rate under the Restaurant Award. Check what you should have been paid here.', type: 'scenario' },
  { slug: 'good-friday-restaurant', title: 'Worked Good Friday at a Restaurant — Is the Rate Right?', metaTitle: 'Worked Good Friday at a Restaurant? | Review My Pay', metaDescription: '2.25× for permanent workers, or the applicable casual public holiday rate for casuals under the Restaurant Award. Check your Good Friday rate is right.', type: 'scenario' },
  { slug: 'tool-allowance-cook', title: 'I Bring My Own Knives to the Restaurant — Am I Owed Extra?', metaTitle: 'Bring Your Own Knives? Tool Allowance | RMP', metaDescription: 'The Restaurant Award provides a tool allowance per day when you\'re required to supply your own knives. Most cooks never receive it — check if you\'re owed.', type: 'scenario' },
  { slug: 'meal-allowance-missed', title: 'Worked Unexpected Overtime at a Restaurant Through a Meal Time', metaTitle: 'Overtime Through a Meal Time at a Restaurant? | RMP', metaDescription: 'If you worked unplanned overtime through a meal time, a meal allowance applies under the Restaurant Award. Most restaurant workers never receive this payment.', type: 'scenario' },
  { slug: 'pay-doesnt-match-roster', title: 'My Restaurant Pay Doesn\'t Match My Roster — What Do I Do?', metaTitle: 'Restaurant Pay Doesn\'t Match Roster? | Review My Pay', metaDescription: 'If your payslip doesn\'t match your roster, the shortfall is owed to you. Check your Restaurant Award entitlements and learn how to raise the issue properly.', type: 'scenario' },
  { slug: 'annualised-salary-restaurant', title: 'I\'m on an Annualised Salary at a Restaurant — Is It Legal?', metaTitle: 'Annualised Salary at a Restaurant — Legal?', metaDescription: 'An annualised wage at a restaurant must be at least 25% above the minimum weekly wage and reconciled annually. Learn how to check yours is compliant.', type: 'scenario' },
  { slug: 'below-award-restaurant', title: 'Being Paid Below Award Rate at a Restaurant — What Can I Do?', metaTitle: 'Paid Below Award at a Restaurant? | Review My Pay', metaDescription: 'You\'re owed the difference and you can recover it. Paying below the Restaurant Award minimum rate is a contravention — learn the steps to claim back pay.', type: 'scenario' },
  { slug: 'toil-restaurant', title: 'Taking Time Off Instead of Overtime at a Restaurant — Is 1:1 TOIL Right?', metaTitle: 'TOIL at a Restaurant — Is 1:1 Right? | Review My Pay', metaDescription: '1 hour of time-and-a-half overtime equals 1.5 hours of TOIL minimum under the Restaurant Award. Hour-for-hour TOIL is underpayment — check your rights.', type: 'scenario' },
  { slug: 'level3-shift-breakdown', title: 'Restaurant Level 3 Pay — Which Shifts Attract Extra?', metaTitle: 'Restaurant Level 3 Pay by Shift Type | Review My Pay', metaDescription: 'A complete breakdown of what Level 3 restaurant workers should be paid across every shift type including weekends, public holidays, and overtime shifts.', type: 'scenario' },
  { slug: 'underpaid-years', title: 'I\'ve Been Underpaid at a Restaurant for Years — What Can I Do?', metaTitle: 'Underpaid at a Restaurant for Years? | Review My Pay', metaDescription: 'You can recover up to 6 years of underpayments through the Fair Work Ombudsman for free. See how to check what you\'re owed and start a claim today.', type: 'scenario' },
];

export const RESTAURANT_ROLE_PAGES: RestaurantPage[] = [
  { slug: 'waitstaff-pay-rates', title: 'Waitstaff Pay Rates Australia 2025–26', metaTitle: 'Waitstaff Pay Rates 2025–26 | Restaurant Award', metaDescription: 'Pay rates for waitstaff under the Restaurant Award — Sunday rates, split shift allowance, and the most common underpayments for front-of-house staff.', type: 'role' },
  { slug: 'cook-pay-rates', title: 'Cook Pay Rates Australia 2025–26', metaTitle: 'Cook Pay Rates 2025–26 | Restaurant Award', metaDescription: 'Cook and chef pay rates under the Restaurant Award — trade qualifications, classification levels, Sunday rates, and how to check if your level is wrong.', type: 'role' },
  { slug: 'cafe-worker-pay-rates', title: 'Café Worker Pay Rates Australia 2025–26', metaTitle: 'Café Worker Pay Rates 2025–26 | Restaurant Award', metaDescription: 'Pay rates for café workers under the Restaurant Award — Sunday rates, classification levels, and the most common reason standalone café workers are underpaid.', type: 'role' },
  { slug: 'catering-worker-pay-rates', title: 'Catering Worker Pay Rates 2025–26', metaTitle: 'Catering Worker Pay Rates 2025–26 | Restaurant Award', metaDescription: 'Pay rates for catering workers under the Restaurant Award — when the Restaurant Award applies to catering, penalty rates, and common underpayments.', type: 'role' },
];

export function getRestaurantIntentPage(slug: string): RestaurantPage | undefined {
  return RESTAURANT_INTENT_PAGES.find(p => p.slug === slug);
}

export function getRestaurantScenarioPage(slug: string): RestaurantPage | undefined {
  return RESTAURANT_SCENARIO_PAGES.find(p => p.slug === slug);
}

export function getRestaurantRolePage(slug: string): RestaurantPage | undefined {
  return RESTAURANT_ROLE_PAGES.find(p => p.slug === slug);
}

export function getAllRestaurantIntentSlugs(): string[] {
  return RESTAURANT_INTENT_PAGES.map(p => p.slug);
}

export function getAllRestaurantScenarioSlugs(): string[] {
  return RESTAURANT_SCENARIO_PAGES.map(p => p.slug);
}

export function getAllRestaurantRoleSlugs(): string[] {
  return RESTAURANT_ROLE_PAGES.map(p => p.slug);
}
