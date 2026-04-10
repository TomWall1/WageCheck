/**
 * Registry for cleaning high-intent, scenario, and role pages.
 * Used for static generation and metadata.
 */

export interface CleaningPage {
  slug: string;
  title: string;        // H1 title (without "| Review My Pay")
  metaTitle: string;     // Full meta title
  metaDescription: string;
  type: 'intent' | 'scenario' | 'role';
}

export const CLEANING_INTENT_PAGES: CleaningPage[] = [
  { slug: 'am-i-being-underpaid', title: 'Am I Being Underpaid as a Cleaner?', metaTitle: 'Am I Being Underpaid as a Cleaner? | Review My Pay', metaDescription: 'The clearest signs you\'re being underpaid under the Cleaning Award — and the fastest way to check your actual shifts against what you\'re legally owed.', type: 'intent' },
  { slug: 'not-getting-overtime', title: 'Not Getting Overtime as a Cleaner?', metaTitle: 'Not Getting Overtime as a Cleaner? | Review My Pay', metaDescription: 'If you regularly work more than 38 hours a week cleaning and don\'t see overtime on your payslip, you\'re almost certainly owed money. Check yours now.', type: 'intent' },
  { slug: 'hourly-rate-check', title: 'Is My Cleaning Pay Rate Legal?', metaTitle: 'Is My Cleaning Pay Rate Legal? | Review My Pay', metaDescription: 'Your legal cleaning pay rate depends on your classification level, employment type, and shift timing. Enter your details and check yours against the award.', type: 'intent' },
  { slug: 'pay-too-low', title: 'My Cleaning Pay Seems Too Low', metaTitle: 'Cleaning Pay Too Low? Check What You\'re Owed | RMP', metaDescription: 'If your cleaning pay feels off but you\'re not sure exactly why, this page walks through the most common causes and how to check your actual shift rates.', type: 'intent' },
  { slug: 'flat-rate-cleaning', title: 'Is a Flat Rate Legal for Cleaning Work?', metaTitle: 'Is a Flat Rate Legal for Cleaning? | Review My Pay', metaDescription: 'Flat rates for cleaning work are only legal under strict conditions most employers don\'t meet. Here\'s how to check if yours covers every award entitlement.', type: 'intent' },
];

export const CLEANING_SCENARIO_PAGES: CleaningPage[] = [
  { slug: 'sunday-rate-wrong-cleaning', title: 'My Cleaning Sunday Pay Looks Wrong', metaTitle: 'Cleaning Sunday Pay Wrong? Check Your Rate | RMP', metaDescription: 'If your Sunday rate looks the same as a weekday for cleaning, it\'s almost certainly wrong. Check the Cleaning Award Sunday rates for your level here.', type: 'scenario' },
  { slug: 'sent-home-early-cleaning', title: 'Sent Home Early From a Cleaning Shift — What Am I Owed?', metaTitle: 'Sent Home Early From Cleaning Shift? | Review My Pay', metaDescription: 'If you\'re sent home early from a cleaning shift, you\'re still owed a minimum number of hours\' pay under the Cleaning Award. Here\'s how it works.', type: 'scenario' },
  { slug: 'no-payslip-cleaning', title: 'Cleaning Job With No Payslip — What Are My Rights?', metaTitle: 'Cleaning Job With No Payslip? | Review My Pay', metaDescription: 'Every employee in Australia is entitled to a payslip within one working day of each pay period. No payslip in cleaning is a red flag — know your rights.', type: 'scenario' },
  { slug: 'cash-in-hand-cleaning', title: 'Cleaning Cash in Hand — Is This Legal?', metaTitle: 'Cleaning Cash in Hand — Is This Legal? | RMP', metaDescription: 'Being paid cash for cleaning isn\'t illegal — but paying below award rates, skipping payslips, or not paying super while using cash is. Know your rights.', type: 'scenario' },
  { slug: 'public-holiday-cleaning', title: 'Worked a Public Holiday Cleaning — What Am I Owed?', metaTitle: 'Worked a Public Holiday Cleaning? | Review My Pay', metaDescription: 'Cleaning workers who work on public holidays are entitled to penalty rates well above ordinary pay. Check what you should have been paid for that shift.', type: 'scenario' },
  { slug: 'overtime-not-paid-cleaning', title: 'Working Extra Hours Cleaning and Not Getting Overtime', metaTitle: 'Extra Hours Cleaning, No Overtime? | Review My Pay', metaDescription: 'Every hour beyond 38 in a week triggers overtime under the Cleaning Award. If you regularly work extra hours without overtime pay, you\'re being underpaid.', type: 'scenario' },
  { slug: 'below-award-cleaning', title: 'Paid Below Award Rate as a Cleaner — What Can I Do?', metaTitle: 'Paid Below Award as a Cleaner? | Review My Pay', metaDescription: 'You\'re owed the difference and you can recover it going back up to 6 years. Paying below the Cleaning Award minimum is a contravention — here\'s what to do.', type: 'scenario' },
  { slug: 'super-not-paid-cleaning', title: 'Cleaning Super Not Being Paid — What Can I Do?', metaTitle: 'Cleaning Super Not Being Paid? | Review My Pay', metaDescription: 'All cleaning workers including casuals are entitled to super at 12% of ordinary time earnings. If your employer isn\'t paying it, here\'s how to recover it.', type: 'scenario' },
];

export const CLEANING_ROLE_PAGES: CleaningPage[] = [
  { slug: 'cleaner-pay-rates', title: 'Cleaner Pay Rates Australia 2025–26', metaTitle: 'Cleaner Pay Rates 2025–26 | Cleaning Award', metaDescription: 'Pay rates for cleaners under the Cleaning Award — weekend penalties, overtime rates, and the most common underpayments for cleaning workers in Australia.', type: 'role' },
  { slug: 'janitor-pay-rates', title: 'Janitor Pay Rates Australia 2025–26', metaTitle: 'Janitor Pay Rates 2025–26 | Cleaning Award', metaDescription: 'Janitor pay rates under the Cleaning Award — classification levels, penalty rates, and how to check if your employer is paying you the correct amount.', type: 'role' },
  { slug: 'supervisor-pay-rates', title: 'Cleaning Supervisor Pay Rates 2025–26', metaTitle: 'Cleaning Supervisor Pay Rates 2025–26 | Award', metaDescription: 'Supervisor pay rates under the Cleaning Award — higher classification levels, penalty rates, and how to check your rate matches your responsibilities.', type: 'role' },
];

export function getCleaningIntentPage(slug: string): CleaningPage | undefined {
  return CLEANING_INTENT_PAGES.find(p => p.slug === slug);
}

export function getCleaningScenarioPage(slug: string): CleaningPage | undefined {
  return CLEANING_SCENARIO_PAGES.find(p => p.slug === slug);
}

export function getCleaningRolePage(slug: string): CleaningPage | undefined {
  return CLEANING_ROLE_PAGES.find(p => p.slug === slug);
}

export function getAllCleaningIntentSlugs(): string[] {
  return CLEANING_INTENT_PAGES.map(p => p.slug);
}

export function getAllCleaningScenarioSlugs(): string[] {
  return CLEANING_SCENARIO_PAGES.map(p => p.slug);
}

export function getAllCleaningRoleSlugs(): string[] {
  return CLEANING_ROLE_PAGES.map(p => p.slug);
}
