/**
 * Registry for fast food high-intent, scenario, and role pages.
 * Used for static generation and metadata.
 */

export interface FastFoodPage {
  slug: string;
  title: string;        // H1 title (without "| Review My Pay")
  metaTitle: string;     // Full meta title
  metaDescription: string;
  type: 'intent' | 'scenario' | 'role';
}

export const FAST_FOOD_INTENT_PAGES: FastFoodPage[] = [
  { slug: 'am-i-being-underpaid', title: 'Am I Being Underpaid in Fast Food?', metaTitle: 'Am I Being Underpaid in Fast Food? | Review My Pay', metaDescription: 'The clearest signs you\'re being underpaid under the Fast Food Award — and the fastest way to check your actual shifts against what you\'re owed right now.', type: 'intent' },
  { slug: 'not-paid-sunday-rate', title: 'Not Getting Sunday Rates in Fast Food?', metaTitle: 'Not Getting Sunday Rates in Fast Food? | RMP', metaDescription: 'If your Sunday fast food pay looks the same as a weekday, penalty rates are missing. Check exactly what your Sunday shift should pay under the award.', type: 'intent' },
  { slug: 'junior-rates-correct', title: 'Are My Fast Food Junior Rates Correct?', metaTitle: 'Are My Fast Food Junior Rates Correct? | RMP', metaDescription: 'Junior rates under the Fast Food Award depend on your age and classification. Penalty rates still apply on top. Check your exact entitlements here.', type: 'intent' },
  { slug: 'hourly-rate-check', title: 'Is My Fast Food Pay Rate Legal?', metaTitle: 'Is My Fast Food Pay Rate Legal? | Review My Pay', metaDescription: 'Whether your fast food rate is legal depends on your age, classification, and shift type. Enter your details and check in under 60 seconds.', type: 'intent' },
  { slug: 'unpaid-trial-shifts', title: 'Unpaid Trial Shifts in Fast Food — Are They Legal?', metaTitle: 'Unpaid Trial Shifts in Fast Food | Review My Pay', metaDescription: 'Unpaid trial shifts in fast food are almost never legal. Here\'s what the law says, when you must be paid, and how to recover the money you\'re owed.', type: 'intent' },
  { slug: 'roster-changes-short-notice', title: 'Fast Food Roster Changed at Short Notice — My Rights', metaTitle: 'Fast Food Roster Changed Short Notice | RMP', metaDescription: 'If your fast food roster was changed with little notice, your pay entitlements may differ from a normally rostered shift. Know your rights under the award.', type: 'intent' },
];

export const FAST_FOOD_SCENARIO_PAGES: FastFoodPage[] = [
  { slug: 'sunday-shift-no-penalty', title: 'Sunday Fast Food Shift — Where\'s My Penalty Rate?', metaTitle: 'Sunday Fast Food Shift — No Penalty Rate? | RMP', metaDescription: 'If your Sunday fast food pay looks the same as a weekday, your employer isn\'t applying the correct penalty rate. Check what you\'re actually owed here.', type: 'scenario' },
  { slug: 'junior-rate-after-21', title: 'I Turned 21 Working in Fast Food — Has My Rate Changed?', metaTitle: 'Turned 21 in Fast Food — Rate Changed? | RMP', metaDescription: 'Full adult rates apply from your 21st birthday under the Fast Food Award. If your rate hasn\'t changed, you\'ve been underpaid from that date. Check yours.', type: 'scenario' },
  { slug: 'no-break-5-hour-shift', title: 'No Break on a 5-Hour Fast Food Shift — Is That Legal?', metaTitle: 'No Break on 5-Hour Fast Food Shift? | RMP', metaDescription: 'Fast food workers are entitled to rest and meal breaks on shifts over a certain length. If you missed yours, here\'s what the award says you\'re owed.', type: 'scenario' },
  { slug: 'cash-in-hand-fast-food', title: 'Fast Food Cash in Hand — Is This Legal?', metaTitle: 'Fast Food Cash in Hand — Is This Legal? | RMP', metaDescription: 'Cash is legal as a payment method, but paying below award rates, skipping payslips, or not paying super while using cash is not. Know your rights here.', type: 'scenario' },
  { slug: 'sent-home-early-fast-food', title: 'Sent Home Early From a Fast Food Shift — What Am I Owed?', metaTitle: 'Sent Home Early From Fast Food Shift? | RMP', metaDescription: 'If you\'re sent home early from a fast food shift, minimum engagement rules still apply. You\'re owed pay for the minimum hours. Check your entitlements.', type: 'scenario' },
  { slug: 'public-holiday-fast-food', title: 'Worked a Public Holiday in Fast Food — What Am I Owed?', metaTitle: 'Public Holiday in Fast Food — What\'s Owed? | RMP', metaDescription: 'Public holidays in fast food attract higher penalty rates whether you\'re casual or permanent. Check exactly what your public holiday shift should pay.', type: 'scenario' },
  { slug: 'christmas-day-fast-food', title: 'Worked Christmas Day in Fast Food — What\'s the Rate?', metaTitle: 'Christmas Day in Fast Food — What\'s the Rate? | RMP', metaDescription: 'Christmas Day is a public holiday — fast food workers must be paid the applicable penalty rate. Here\'s the exact amount you\'re owed and how to check.', type: 'scenario' },
  { slug: 'no-payslip-fast-food', title: 'Fast Food Job With No Payslip — What Are My Rights?', metaTitle: 'Fast Food Job With No Payslip? | Review My Pay', metaDescription: 'Every employee is entitled to a payslip within one working day of each pay period. Working without payslips is a red flag for underpayment. Know your rights.', type: 'scenario' },
  { slug: 'late-night-loading-fast-food', title: 'Fast Food Shift After 10pm — Am I Getting a Loading?', metaTitle: 'Fast Food Shift After 10pm — Getting a Loading? | RMP', metaDescription: 'The Fast Food Award adds a loading for late-night work. If your rate is flat from evening to close, those loadings are missing. Check what you\'re owed.', type: 'scenario' },
  { slug: '50-hour-week-fast-food', title: 'No Overtime for a 50-Hour Fast Food Week', metaTitle: 'No Overtime for 50-Hour Fast Food Week? | RMP', metaDescription: 'A 50-hour week in fast food means overtime hours you\'re almost certainly owed. Here\'s exactly how it should be calculated under the Fast Food Award.', type: 'scenario' },
  { slug: 'overtime-not-paid-fast-food', title: 'Working Extra Hours in Fast Food and Not Getting Overtime', metaTitle: 'Fast Food Extra Hours, No Overtime? | RMP', metaDescription: 'If you regularly work beyond your ordinary hours in fast food without overtime appearing on your payslip, you\'re likely being underpaid. Check here.', type: 'scenario' },
  { slug: 'casual-every-week-fast-food', title: 'Working Every Week Casual in Fast Food — Am I Still Casual?', metaTitle: 'Regular Casual in Fast Food — Still Casual? | RMP', metaDescription: 'If you work a regular pattern every week as a casual in fast food, you may qualify for permanent employment and the entitlements that come with it.', type: 'scenario' },
  { slug: 'super-not-paid-fast-food', title: 'Fast Food Super Not Being Paid — What Can I Do?', metaTitle: 'Fast Food Super Not Paid? What to Do | RMP', metaDescription: 'All fast food workers including casuals are entitled to super at the current rate on ordinary time earnings. If it\'s missing, here\'s how to fix it.', type: 'scenario' },
  { slug: 'flat-rate-fast-food', title: 'My Fast Food Job Pays a Flat Rate — Is It Legal?', metaTitle: 'Fast Food Flat Rate — Is It Legal? | Review My Pay', metaDescription: 'A flat rate in fast food is only legal if it genuinely covers every award entitlement including penalty rates for every shift type. Check yours now.', type: 'scenario' },
  { slug: 'under-18-fast-food-rights', title: 'Under 18 Working Fast Food — What Are My Pay Rights?', metaTitle: 'Under 18 in Fast Food — Pay Rights | Review My Pay', metaDescription: 'Workers under 18 in fast food have specific junior rates, but penalty rates and other entitlements still apply on top. Check your exact rate here.', type: 'scenario' },
  { slug: 'delivery-driver-pay', title: 'Fast Food Delivery Driver Pay — Am I Being Paid Correctly?', metaTitle: 'Fast Food Delivery Driver Pay — Correct? | RMP', metaDescription: 'If you\'re employed as a fast food delivery driver, the Fast Food Award sets your minimum rate. Check whether your pay meets the legal minimum here.', type: 'scenario' },
  { slug: 'training-shift-unpaid', title: 'Unpaid Training Shift in Fast Food — Is This Legal?', metaTitle: 'Unpaid Training Shift in Fast Food? | RMP', metaDescription: 'Training time in fast food is work and must be paid at the applicable rate. If you attended training without pay, here\'s what you\'re owed and what to do.', type: 'scenario' },
  { slug: 'double-shift-fast-food', title: 'Working a Double Shift in Fast Food — How Is It Paid?', metaTitle: 'Double Shift in Fast Food — How Is It Paid? | RMP', metaDescription: 'Double shifts in fast food trigger daily overtime and potentially multiple penalty rate periods. Here\'s how each hour should be calculated under the award.', type: 'scenario' },
  { slug: 'roster-changed-last-minute', title: 'Fast Food Roster Changed Last Minute — Am I Still Paid?', metaTitle: 'Fast Food Roster Changed Last Minute? | RMP', metaDescription: 'If your fast food roster was changed at the last minute, your pay entitlements may differ. Here\'s what the award says about late roster changes and pay.', type: 'scenario' },
  { slug: 'student-pay-fast-food', title: 'Student Working Fast Food — Are Pay Rates Different?', metaTitle: 'Student Fast Food Pay — Rates Different? | RMP', metaDescription: 'Being a student doesn\'t change your fast food pay entitlements. If you\'re under 21, junior rates may apply — but only within the limits set by the award.', type: 'scenario' },
  { slug: 'closing-shift-unpaid-time', title: 'Closing Duties After Clock-Off in Fast Food — Is That Legal?', metaTitle: 'Closing Duties After Clock-Off? | Review My Pay', metaDescription: 'If you\'re doing closing duties after clocking off in fast food, that\'s unpaid work and it\'s not legal. You must be paid for all time your employer requires.', type: 'scenario' },
  { slug: 'pay-doesnt-match-hours', title: 'My Fast Food Pay Doesn\'t Match My Hours', metaTitle: 'Fast Food Pay Doesn\'t Match Hours? | RMP', metaDescription: 'If your fast food payslip doesn\'t match the hours you worked, the shortfall is owed to you. Check your entitlements and learn how to raise the issue.', type: 'scenario' },
  { slug: 'meal-allowance-fast-food', title: 'Meal Allowance in Fast Food — Am I Entitled?', metaTitle: 'Fast Food Meal Allowance — Am I Entitled? | RMP', metaDescription: 'If you worked overtime through a meal time in fast food, a meal allowance may apply under the award. Most fast food workers never receive this payment.', type: 'scenario' },
  { slug: 'grade-1-after-6-months', title: 'Still on Grade 1 After 6 Months in Fast Food — Is That Right?', metaTitle: 'Still Grade 1 After 6 Months in Fast Food? | RMP', metaDescription: 'If your duties have expanded but your classification hasn\'t changed, you may be on the wrong grade. Check what level your fast food role should be at.', type: 'scenario' },
  { slug: 'good-friday-fast-food', title: 'Worked Good Friday in Fast Food — What\'s the Rate?', metaTitle: 'Good Friday in Fast Food — What\'s the Rate? | RMP', metaDescription: 'Good Friday is a national public holiday — fast food workers must be paid the applicable penalty rate. Here\'s exactly what you\'re owed for that shift.', type: 'scenario' },
  { slug: 'australia-day-fast-food', title: 'Worked Australia Day in Fast Food — Is It Double Time?', metaTitle: 'Australia Day in Fast Food — Double Time? | RMP', metaDescription: 'Australia Day is a public holiday — fast food workers are entitled to the applicable public holiday penalty rate, not just double time. Check yours here.', type: 'scenario' },
  { slug: 'below-award-fast-food', title: 'Paid Below Award Rate in Fast Food — What Can I Do?', metaTitle: 'Paid Below Award in Fast Food? | Review My Pay', metaDescription: 'You\'re owed the difference and you can recover it. Paying below the Fast Food Award minimum rate is a contravention — learn the steps to claim back pay.', type: 'scenario' },
  { slug: 'casual-conversion-fast-food', title: 'Casual to Permanent in Fast Food — Can I Convert?', metaTitle: 'Casual to Permanent in Fast Food | Review My Pay', metaDescription: 'After 12 months of regular casual work in fast food, you can request conversion to permanent employment under the Fair Work Act. Learn the process here.', type: 'scenario' },
  { slug: 'midnight-shift-fast-food', title: 'Fast Food Shift Past Midnight — What\'s the Loading?', metaTitle: 'Fast Food Shift Past Midnight — Loading? | RMP', metaDescription: 'Shifts past midnight in fast food attract additional loadings on top of your base rate. If your rate is flat after midnight, those loadings are missing.', type: 'scenario' },
  { slug: 'laundry-allowance-fast-food', title: 'Washing My Own Uniform for Fast Food — Is There an Allowance?', metaTitle: 'Fast Food Laundry Allowance — Am I Owed? | RMP', metaDescription: 'If you\'re required to launder your own fast food uniform, a laundry allowance may apply under the award. Most fast food workers never receive this payment.', type: 'scenario' },
];

export const FAST_FOOD_ROLE_PAGES: FastFoodPage[] = [
  { slug: 'junior-pay-rates', title: 'Fast Food Junior Pay Rates Australia 2025–26', metaTitle: 'Fast Food Junior Pay Rates 2025–26 | RMP', metaDescription: 'Junior pay rates under the Fast Food Award by age — penalty rates on top, common underpayments, and how to check your rate is correct for your age.', type: 'role' },
  { slug: 'crew-member-pay-rates', title: 'Fast Food Crew Member Pay Rates Australia 2025–26', metaTitle: 'Fast Food Crew Member Pay Rates 2025–26 | RMP', metaDescription: 'Pay rates for fast food crew members under the Fast Food Award — base rates, penalty rates, overtime, and the most common underpayments for crew.', type: 'role' },
  { slug: 'delivery-driver-pay-rates', title: 'Fast Food Delivery Driver Pay Rates 2025–26', metaTitle: 'Fast Food Delivery Driver Pay Rates 2025–26 | RMP', metaDescription: 'Pay rates for fast food delivery drivers under the Fast Food Award — base rates, vehicle allowances, penalty rates, and how to check you\'re paid right.', type: 'role' },
  { slug: 'shift-supervisor-pay-rates', title: 'Fast Food Shift Supervisor Pay Rates 2025–26', metaTitle: 'Fast Food Shift Supervisor Pay Rates 2025–26 | RMP', metaDescription: 'Pay rates for fast food shift supervisors under the Fast Food Award — classification level, penalty rates, overtime, and common underpayment signs.', type: 'role' },
];

export function getFastFoodIntentPage(slug: string): FastFoodPage | undefined {
  return FAST_FOOD_INTENT_PAGES.find(p => p.slug === slug);
}

export function getFastFoodScenarioPage(slug: string): FastFoodPage | undefined {
  return FAST_FOOD_SCENARIO_PAGES.find(p => p.slug === slug);
}

export function getFastFoodRolePage(slug: string): FastFoodPage | undefined {
  return FAST_FOOD_ROLE_PAGES.find(p => p.slug === slug);
}

export function getAllFastFoodIntentSlugs(): string[] {
  return FAST_FOOD_INTENT_PAGES.map(p => p.slug);
}

export function getAllFastFoodScenarioSlugs(): string[] {
  return FAST_FOOD_SCENARIO_PAGES.map(p => p.slug);
}

export function getAllFastFoodRoleSlugs(): string[] {
  return FAST_FOOD_ROLE_PAGES.map(p => p.slug);
}
