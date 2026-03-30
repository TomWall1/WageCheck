/**
 * Registry for hospitality high-intent and scenario pages.
 * Used for static generation and metadata.
 */

export interface HospitalityPage {
  slug: string;
  title: string;        // H1 title (without "| Review My Pay")
  metaTitle: string;     // Full meta title
  metaDescription: string;
  type: 'intent' | 'scenario';
}

export const HOSPITALITY_INTENT_PAGES: HospitalityPage[] = [
  { slug: 'am-i-being-underpaid', title: 'Am I Being Underpaid in Hospitality?', metaTitle: 'Am I Being Underpaid in Hospitality? | Review My Pay', metaDescription: 'The clearest signs you\'re being underpaid under the Hospitality Award — and the fastest way to check your actual shifts against what you\'re owed.', type: 'intent' },
  { slug: 'not-getting-overtime', title: 'Not Getting Overtime in Hospitality?', metaTitle: 'Not Getting Overtime in Hospitality? | Review My Pay', metaDescription: 'If you regularly work more than 38 hours in hospitality and don\'t see overtime on your payslip, you\'re almost certainly owed money. Here\'s how to check.', type: 'intent' },
  { slug: 'hourly-rate-check', title: 'Is My Hospitality Pay Rate Legal?', metaTitle: 'Is My Hospitality Pay Rate Legal? | Review My Pay', metaDescription: 'Is $24, $26, or $30/hr legal for a hospitality worker? The answer depends on your classification level, shift type, and employment status. Check yours now.', type: 'intent' },
  { slug: 'no-penalty-rates-paid', title: 'Employer Not Paying Penalty Rates in Hospitality?', metaTitle: 'No Penalty Rates in Hospitality? | Review My Pay', metaDescription: 'If your employer isn\'t applying penalty rates for weekends or public holidays under the Hospitality Award, here\'s what you\'re owed and what to do about it.', type: 'intent' },
  { slug: 'unpaid-trial-shifts', title: 'Unpaid Trial Shifts in Hospitality — Are They Legal?', metaTitle: 'Unpaid Trial Shifts in Hospitality | Review My Pay', metaDescription: 'Unpaid trial shifts in hospitality are almost never legal. Here\'s what the law says, when you must be paid, and how to recover the money you\'re owed.', type: 'intent' },
  { slug: 'casual-conversion-refused', title: 'Employer Refusing Casual Conversion in Hospitality?', metaTitle: 'Casual Conversion Refused in Hospitality? | RMP', metaDescription: 'After 12 months of regular casual work in hospitality, you have the right to request permanent employment. Here\'s what your employer can and can\'t refuse.', type: 'intent' },
  { slug: 'pay-too-low', title: 'Hospitality Pay Seems Too Low', metaTitle: 'Hospitality Pay Too Low? Check What You\'re Owed', metaDescription: 'If your hospitality pay feels off but you\'re not sure exactly why, this page walks through the most common causes and how to check your actual shift rates.', type: 'intent' },
  { slug: 'flat-rate-hospitality', title: 'Is a Flat Rate Legal in Hospitality?', metaTitle: 'Is a Flat Rate Legal in Hospitality? | Review My Pay', metaDescription: 'Flat rates in hospitality are only legal under strict conditions most employers don\'t actually meet. Here\'s how to check if yours is compliant.', type: 'intent' },
];

export const HOSPITALITY_SCENARIO_PAGES: HospitalityPage[] = [
  { slug: '6-days-week-pay', title: 'I Work 6 Days a Week in Hospitality — Do I Get Extra Pay?', metaTitle: '6 Days a Week in Hospitality — Extra Pay?', metaDescription: 'Working 6 days a week in hospitality triggers overtime under the Hospitality Award. Here\'s when it kicks in and what you should be paid for those extra days.', type: 'scenario' },
  { slug: 'casual-late-nights', title: 'Casual Late Nights in Hospitality — Am I Being Paid Correctly?', metaTitle: 'Casual Late Nights in Hospitality — Paid Right?', metaDescription: 'Late night shifts in hospitality attract additional loadings on top of your casual rate. Here\'s what you should be receiving after 7pm and after midnight.', type: 'scenario' },
  { slug: 'split-shifts-pay', title: 'Split Shifts in Hospitality — Am I Being Paid for the Break?', metaTitle: 'Split Shifts in Hospitality — Paid for the Break?', metaDescription: 'Split shifts in hospitality attract an allowance on top of your hourly rate. Most workers never receive it. Here\'s what the award says and what you\'re owed.', type: 'scenario' },
  { slug: 'christmas-day-pay', title: 'Worked Christmas Day in Hospitality — What Am I Owed?', metaTitle: 'Worked Christmas Day in Hospitality — What\'s Owed?', metaDescription: 'Christmas Day is a public holiday — hospitality workers must be paid 2.25\u00d7 the ordinary rate. Here\'s the exact amount you\'re owed and how to check your pay.', type: 'scenario' },
  { slug: 'roster-change-short-notice', title: 'My Hospitality Roster Changed at the Last Minute — Am I Still Paid?', metaTitle: 'Hospitality Roster Changed Last Minute — Pay Rights', metaDescription: 'If your hospitality roster was changed with little notice, your pay entitlements may differ from a normally rostered shift. Here\'s what the award says about it.', type: 'scenario' },
  { slug: 'sent-home-early', title: 'Sent Home Early from a Hospitality Shift — What Do I Get Paid?', metaTitle: 'Sent Home Early from Hospitality Shift — Pay Owed?', metaDescription: 'If you\'re sent home early from a hospitality shift, you\'re still owed a minimum of 3 hours\' pay under the Hospitality Award. Here\'s how it works.', type: 'scenario' },
  { slug: 'cash-in-hand', title: 'Hospitality Cash in Hand — Is This Legal?', metaTitle: 'Hospitality Cash in Hand — Is This Legal?', metaDescription: 'Being paid cash in hospitality isn\'t illegal — but paying below award rates, skipping payslips, or not paying super while using cash is. Know your rights here.', type: 'scenario' },
  { slug: 'supervisor-pay', title: "I'm a Hospitality Supervisor — Should I Get More Pay?", metaTitle: "Hospitality Supervisor — Should I Get More Pay?", metaDescription: 'Supervisory duties in hospitality typically attract a higher classification level and pay rate. Here\'s how to check if your current level is correct.', type: 'scenario' },
  { slug: 'double-shift', title: 'Working a Double Shift in Hospitality — How Is It Paid?', metaTitle: 'Double Shift in Hospitality — How Is It Paid?', metaDescription: 'Double shifts in hospitality trigger daily overtime and potentially multiple penalty rate periods. Here\'s how each hour should be calculated under the award.', type: 'scenario' },
  { slug: 'no-payslip', title: 'Hospitality Casual, No Payslip — What Are My Rights?', metaTitle: 'Hospitality Casual, No Payslip — Your Rights', metaDescription: 'Every employee in Australia is entitled to a payslip — including casual hospitality workers. Here\'s what must be on it and what to do if you\'re not getting one.', type: 'scenario' },
  { slug: '50-hour-week', title: 'No Overtime Paid for a 50-Hour Hospitality Week', metaTitle: 'No Overtime for 50-Hour Hospitality Week?', metaDescription: 'A 50-hour week in hospitality means 12 hours of overtime you\'re almost certainly owed. Here\'s exactly how it should be calculated under the Hospitality Award.', type: 'scenario' },
  { slug: 'late-night-transport', title: 'Late Night Hospitality Finish — Do I Get Transport Paid?', metaTitle: 'Late Night Hospitality — Transport Allowance?', metaDescription: 'Some hospitality workers finishing late at night are entitled to a transport allowance under the Hospitality Award. Here\'s when it applies and what you\'re owed.', type: 'scenario' },
  { slug: 'trainee-pay', title: 'Hospitality Trainee Pay Rates 2025', metaTitle: 'Hospitality Trainee Pay Rates 2025 — What Applies?', metaDescription: 'Trainees and apprentices in hospitality have specific pay rates under the award. Here\'s what applies and how to check you\'re being paid the correct rate.', type: 'scenario' },
  { slug: 'australia-day-pay', title: 'Worked Australia Day in Hospitality — Is It Double Time?', metaTitle: 'Australia Day in Hospitality — Is It Double Time?', metaDescription: 'Australia Day is a public holiday — hospitality workers are entitled to 2.25x their ordinary rate, not just double time. Here\'s what you\'re actually owed.', type: 'scenario' },
  { slug: 'missed-meal-break', title: 'No Meal Break on a 10-Hour Hospitality Shift — Is That Legal?', metaTitle: 'No Meal Break on 10-Hour Hospitality Shift — Legal?', metaDescription: 'Hospitality workers are entitled to meal breaks on extended shifts. If you work through without one, a meal allowance applies. Here\'s what you\'re owed.', type: 'scenario' },
  { slug: 'pay-doesnt-match-roster', title: "My Hospitality Pay Doesn't Match My Roster", metaTitle: "Hospitality Pay Doesn't Match Roster — What to Do", metaDescription: 'If your hospitality pay doesn\'t match the shifts on your roster, you may be owed the difference. Here\'s how to identify and address the shortfall step by step.', type: 'scenario' },
  { slug: 'unpaid-staff-meeting', title: 'Staff Meeting Not Paid in Hospitality — Is That Normal?', metaTitle: 'Unpaid Staff Meeting in Hospitality — Normal?', metaDescription: 'Staff meetings in hospitality are working time and must be paid at the applicable rate. If you attended a meeting without pay, here\'s what you\'re owed.', type: 'scenario' },
  { slug: 'regular-casual-status', title: 'Working Every Week Casual in Hospitality — Am I Actually Casual?', metaTitle: 'Regular Casual in Hospitality — Am I Still Casual?', metaDescription: 'If you work a regular pattern every week as a casual in hospitality, you may qualify for permanent employment and the entitlements that come with it.', type: 'scenario' },
  { slug: 'tips-and-pay', title: 'Tips Not in My Pay — Is My Employer Keeping Them?', metaTitle: 'Tips Not in My Pay — Employer Keeping Them?', metaDescription: 'Tips in Australian hospitality are not an award entitlement — but they cannot be used to offset your minimum pay. Here\'s what you need to know.', type: 'scenario' },
  { slug: 'sunday-casual-rate', title: 'Sunday Hospitality Shift — Casual Rate or Sunday Rate?', metaTitle: 'Sunday Hospitality — Casual Rate or Sunday Rate?', metaDescription: 'For casual hospitality workers, the Sunday rate applies on top of the casual loading — not instead of it. Here\'s exactly what your Sunday shift should pay.', type: 'scenario' },
  { slug: 'public-holiday-not-worked', title: "Public Holiday I Didn't Work in Hospitality — Do I Get Paid?", metaTitle: "Public Holiday Not Worked in Hospitality — Paid?", metaDescription: 'Permanent hospitality workers are entitled to a paid day off on public holidays they don\'t work. Here\'s how it applies under the Hospitality Award (MA000009).', type: 'scenario' },
  { slug: 'good-friday-pay', title: "Working Good Friday in Hospitality — What's the Rate?", metaTitle: "Good Friday in Hospitality — What's the Rate?", metaDescription: 'Good Friday is a national public holiday — hospitality workers must be paid 2.25x their ordinary rate. Here\'s exactly what you\'re owed for that shift.', type: 'scenario' },
  { slug: 'underpaid-super', title: 'Underpaid Super in Hospitality — What Can I Do?', metaTitle: 'Underpaid Super in Hospitality — What Can I Do?', metaDescription: 'If your superannuation hasn\'t been paid correctly in hospitality, here\'s how to check your entitlements and what to do to recover what you\'re owed.', type: 'scenario' },
  { slug: 'student-pay-rates', title: 'Student Working in Hospitality — Are Pay Rates Different?', metaTitle: 'Student Hospitality Pay — Are Rates Different?', metaDescription: 'Being a student doesn\'t change your hospitality pay entitlements. If you\'re under 21, junior rates may apply — but only within the limits set by the award.', type: 'scenario' },
  { slug: 'manager-overtime', title: 'Hospitality Manager Not Getting Overtime — Is That Right?', metaTitle: 'Hospitality Manager — No Overtime Paid?', metaDescription: 'Most hospitality managers are entitled to overtime — unless their salary genuinely covers all award obligations. Here\'s how to check if yours is compliant.', type: 'scenario' },
  { slug: 'all-in-rate', title: 'Hospitality All-In Rate Agreement — Is This Legal?', metaTitle: 'Hospitality All-In Rate — Is This Legal?', metaDescription: 'All-in rate arrangements in hospitality are legal only under strict conditions. Here\'s what makes them compliant — and what crosses into underpayment.', type: 'scenario' },
  { slug: 'night-audit-pay', title: 'Night Audit in Hospitality — What Are the Pay Rates?', metaTitle: 'Night Audit Hospitality — What Are the Pay Rates?', metaDescription: 'Night audit in hospitality typically qualifies for Level 3 classification plus late-night loadings. Here\'s what your overnight shifts should actually pay you.', type: 'scenario' },
  { slug: 'annual-leave-loading', title: 'Annual Leave Loading in Hospitality — Does a Casual Get It?', metaTitle: 'Annual Leave Loading in Hospitality — Casuals?', metaDescription: 'Casual hospitality workers don\'t receive annual leave loading — but permanent workers may be entitled to it. Here\'s what the Hospitality Award says about it.', type: 'scenario' },
  { slug: 'below-award-pay', title: 'Paid Below Award Rate in Hospitality — What Can I Do?', metaTitle: 'Paid Below Award Rate in Hospitality — Next Steps', metaDescription: 'If you\'re being paid below the Hospitality Award minimum, you\'re owed the difference — going back up to 6 years. Here\'s how to check and what to do next.', type: 'scenario' },
  { slug: 'level-2-shift-breakdown', title: 'Hospitality Level 2 Pay — Which Shifts Attract Extra?', metaTitle: 'Hospitality Level 2 — Which Shifts Pay Extra?', metaDescription: 'A complete breakdown of what Level 2 hospitality workers should be paid across every shift type — weekdays, evenings, weekends, and public holidays.', type: 'scenario' },
];

export function getIntentPage(slug: string): HospitalityPage | undefined {
  return HOSPITALITY_INTENT_PAGES.find(p => p.slug === slug);
}

export function getScenarioPage(slug: string): HospitalityPage | undefined {
  return HOSPITALITY_SCENARIO_PAGES.find(p => p.slug === slug);
}

export function getAllIntentSlugs(): string[] {
  return HOSPITALITY_INTENT_PAGES.map(p => p.slug);
}

export function getAllScenarioSlugs(): string[] {
  return HOSPITALITY_SCENARIO_PAGES.map(p => p.slug);
}
