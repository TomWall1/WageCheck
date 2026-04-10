/**
 * Registry for retail high-intent, scenario, and role pages.
 * Used for static generation and metadata.
 */

export interface RetailPage {
  slug: string;
  title: string;        // H1 title (without "| Review My Pay")
  metaTitle: string;     // Full meta title
  metaDescription: string;
  type: 'intent' | 'scenario' | 'role';
}

export const RETAIL_INTENT_PAGES: RetailPage[] = [
  { slug: 'am-i-being-underpaid', title: 'Am I Being Underpaid in Retail?', metaTitle: 'Am I Being Underpaid in Retail? | Review My Pay', metaDescription: 'The clearest signs you\'re being underpaid under the Retail Award — and the fastest way to check your actual shifts against what you\'re legally owed.', type: 'intent' },
  { slug: 'not-getting-overtime', title: 'Not Getting Overtime in Retail?', metaTitle: 'Not Getting Overtime in Retail? | Review My Pay', metaDescription: 'If you regularly work more than 38 hours a week in retail and don\'t see overtime on your payslip, you\'re almost certainly owed money. Check yours now.', type: 'intent' },
  { slug: 'sunday-rate-check', title: 'Is My Retail Sunday Rate Correct?', metaTitle: 'Is My Retail Sunday Rate Correct? | Review My Pay', metaDescription: 'Sunday penalty rates in retail are higher than most workers realise. If your Sunday pay looks the same as a weekday, your employer is likely underpaying you.', type: 'intent' },
  { slug: 'hourly-rate-check', title: 'Is My Retail Pay Rate Legal?', metaTitle: 'Is My Retail Pay Rate Legal? | Review My Pay', metaDescription: 'Your legal retail pay rate depends on your classification level, employment type, and shift timing. Enter your details and check yours against the award now.', type: 'intent' },
  { slug: 'pay-too-low', title: 'My Retail Pay Seems Too Low', metaTitle: 'Retail Pay Too Low? Check What You\'re Owed | RMP', metaDescription: 'If your retail pay feels off but you\'re not sure exactly why, this page walks through the most common causes and how to check your actual shift rates.', type: 'intent' },
  { slug: 'flat-rate-retail', title: 'Is a Flat Rate Legal in Retail?', metaTitle: 'Is a Flat Rate Legal in Retail? | Review My Pay', metaDescription: 'Flat rates in retail are only legal under strict conditions most employers don\'t actually meet. Here\'s how to check if yours covers every award entitlement.', type: 'intent' },
];

export const RETAIL_SCENARIO_PAGES: RetailPage[] = [
  { slug: 'sunday-rate-wrong-retail', title: 'My Retail Sunday Pay Looks Wrong', metaTitle: 'Retail Sunday Pay Wrong? Check Your Rate | RMP', metaDescription: 'If your Sunday rate looks the same as a weekday in retail, it\'s almost certainly wrong. Check the Retail Award Sunday rates for your classification level.', type: 'scenario' },
  { slug: 'christmas-day-retail', title: 'Worked Christmas Day in Retail — What Am I Owed?', metaTitle: 'Worked Christmas Day in Retail? | Review My Pay', metaDescription: 'Christmas Day is a public holiday — retail workers must be paid at the applicable penalty rate. Here\'s the exact amount you\'re owed and how to check your pay.', type: 'scenario' },
  { slug: 'sent-home-early-retail', title: 'Sent Home Early From a Retail Shift — What Am I Owed?', metaTitle: 'Sent Home Early From Retail Shift? | Review My Pay', metaDescription: 'If you\'re sent home early from a retail shift, you\'re still owed a minimum number of hours\' pay under the Retail Award. Here\'s how minimum engagement works.', type: 'scenario' },
  { slug: 'no-payslip-retail', title: 'Retail Job With No Payslip — What Are My Rights?', metaTitle: 'Retail Job With No Payslip? | Review My Pay', metaDescription: 'Every employee in Australia is entitled to a payslip within one working day of each pay period. No payslip in retail is a red flag — know your rights here.', type: 'scenario' },
  { slug: 'cash-in-hand-retail', title: 'Retail Cash in Hand — Is This Legal?', metaTitle: 'Retail Cash in Hand — Is This Legal? | Review My Pay', metaDescription: 'Being paid cash in retail isn\'t illegal — but paying below award rates, skipping payslips, or not paying super while using cash is. Know your rights here.', type: 'scenario' },
  { slug: 'casual-conversion-retail', title: 'Casual to Permanent in Retail — Can I Convert?', metaTitle: 'Casual to Permanent in Retail? | Review My Pay', metaDescription: 'After 12 months of regular casual work in retail, you can request conversion to permanent employment under the Fair Work Act. Learn the full process here.', type: 'scenario' },
  { slug: 'overtime-not-paid-retail', title: 'Working Extra Hours in Retail and Not Getting Overtime', metaTitle: 'Extra Hours in Retail, No Overtime? | Review My Pay', metaDescription: 'Every hour beyond 38 in a week triggers overtime under the Retail Award. If you regularly work extra hours without overtime pay, you\'re being underpaid.', type: 'scenario' },
  { slug: 'public-holiday-retail', title: 'Worked a Public Holiday in Retail — What Am I Owed?', metaTitle: 'Worked a Public Holiday in Retail? | Review My Pay', metaDescription: 'Retail workers who work on public holidays are entitled to penalty rates well above ordinary pay. Check what you should have been paid for that shift here.', type: 'scenario' },
  { slug: 'late-night-retail', title: 'Retail Shift After 6pm — Am I Getting a Loading?', metaTitle: 'Retail Shift After 6pm — Getting a Loading? | RMP', metaDescription: 'The Retail Award includes penalty loadings for evening and late-night work. If your rate is flat from open to close, those loadings are likely missing.', type: 'scenario' },
  { slug: 'below-award-retail', title: 'Paid Below Award Rate in Retail — What Can I Do?', metaTitle: 'Paid Below Award in Retail? | Review My Pay', metaDescription: 'You\'re owed the difference and you can recover it going back up to 6 years. Paying below the Retail Award minimum is a contravention — here\'s what to do.', type: 'scenario' },
  { slug: 'super-not-paid-retail', title: 'Retail Super Not Being Paid — What Can I Do?', metaTitle: 'Retail Super Not Being Paid? | Review My Pay', metaDescription: 'All retail workers including casuals are entitled to super at 12% of ordinary time earnings. If your employer isn\'t paying it, here\'s how to recover it.', type: 'scenario' },
  { slug: 'good-friday-retail', title: 'Worked Good Friday in Retail — What\'s the Rate?', metaTitle: 'Worked Good Friday in Retail? | Review My Pay', metaDescription: 'Good Friday is a national public holiday — retail workers must be paid the applicable penalty rate. Here\'s exactly what you\'re owed for that shift.', type: 'scenario' },
];

export const RETAIL_ROLE_PAGES: RetailPage[] = [
  { slug: 'sales-assistant-pay-rates', title: 'Sales Assistant Pay Rates Australia 2025–26', metaTitle: 'Sales Assistant Pay Rates 2025–26 | Retail Award', metaDescription: 'Pay rates for sales assistants under the Retail Award — weekend penalties, evening loadings, and the most common underpayments for shop floor workers.', type: 'role' },
  { slug: 'cashier-pay-rates', title: 'Cashier Pay Rates Australia 2025–26', metaTitle: 'Cashier Pay Rates 2025–26 | Retail Award', metaDescription: 'Cashier pay rates under the Retail Award — classification levels, Sunday rates, evening loadings, and how to check if your employer is paying correctly.', type: 'role' },
  { slug: 'supervisor-pay-rates', title: 'Retail Supervisor Pay Rates Australia 2025–26', metaTitle: 'Retail Supervisor Pay Rates 2025–26 | Retail Award', metaDescription: 'Supervisor pay rates under the Retail Award — higher classification levels, penalty rates, and how to check your rate matches your actual responsibilities.', type: 'role' },
];

export function getRetailIntentPage(slug: string): RetailPage | undefined {
  return RETAIL_INTENT_PAGES.find(p => p.slug === slug);
}

export function getRetailScenarioPage(slug: string): RetailPage | undefined {
  return RETAIL_SCENARIO_PAGES.find(p => p.slug === slug);
}

export function getRetailRolePage(slug: string): RetailPage | undefined {
  return RETAIL_ROLE_PAGES.find(p => p.slug === slug);
}

export function getAllRetailIntentSlugs(): string[] {
  return RETAIL_INTENT_PAGES.map(p => p.slug);
}

export function getAllRetailScenarioSlugs(): string[] {
  return RETAIL_SCENARIO_PAGES.map(p => p.slug);
}

export function getAllRetailRoleSlugs(): string[] {
  return RETAIL_ROLE_PAGES.map(p => p.slug);
}
