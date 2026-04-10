/**
 * Registry for clerks high-intent, scenario, and role pages.
 * Used for static generation and metadata.
 */

export interface ClerksPage {
  slug: string;
  title: string;        // H1 title (without "| Review My Pay")
  metaTitle: string;     // Full meta title
  metaDescription: string;
  type: 'intent' | 'scenario' | 'role';
}

export const CLERKS_INTENT_PAGES: ClerksPage[] = [
  { slug: 'am-i-being-underpaid', title: 'Am I Being Underpaid Under the Clerks Award?', metaTitle: 'Am I Being Underpaid Under Clerks Award? | RMP', metaDescription: 'The clearest signs you\'re being underpaid under the Clerks Award — and the fastest way to check your actual shifts against what you\'re legally owed.', type: 'intent' },
  { slug: 'not-getting-overtime', title: 'Not Getting Overtime Under the Clerks Award?', metaTitle: 'Not Getting Overtime Under Clerks Award? | RMP', metaDescription: 'If you regularly work more than 38 hours a week in an office and don\'t see overtime on your payslip, you\'re almost certainly owed money. Check yours now.', type: 'intent' },
  { slug: 'hourly-rate-check', title: 'Is My Office Pay Rate Legal?', metaTitle: 'Is My Office Pay Rate Legal? | Review My Pay', metaDescription: 'Your legal pay rate under the Clerks Award depends on your classification level, employment type, and shift timing. Check yours against the award now.', type: 'intent' },
  { slug: 'pay-too-low', title: 'My Office Pay Seems Too Low', metaTitle: 'Office Pay Too Low? Check What You\'re Owed | RMP', metaDescription: 'If your office pay feels off but you\'re not sure exactly why, this page walks through the most common causes and how to check your actual entitlements.', type: 'intent' },
  { slug: 'flat-rate-clerks', title: 'Is a Flat Rate Legal for Clerks?', metaTitle: 'Is a Flat Rate Legal for Clerks? | Review My Pay', metaDescription: 'Flat rates under the Clerks Award are only legal under strict conditions most employers don\'t meet. Here\'s how to check yours covers every entitlement.', type: 'intent' },
];

export const CLERKS_SCENARIO_PAGES: ClerksPage[] = [
  { slug: 'overtime-not-paid-clerks', title: 'Working Extra Hours in the Office and Not Getting Overtime', metaTitle: 'Extra Office Hours, No Overtime? | Review My Pay', metaDescription: 'Every hour beyond 38 in a week triggers overtime under the Clerks Award. If you regularly work extra hours without overtime pay, you\'re being underpaid.', type: 'scenario' },
  { slug: 'below-award-clerks', title: 'Paid Below Award Rate Under the Clerks Award — What Can I Do?', metaTitle: 'Paid Below Clerks Award? | Review My Pay', metaDescription: 'You\'re owed the difference and you can recover it going back up to 6 years. Paying below the Clerks Award minimum is a contravention — here\'s what to do.', type: 'scenario' },
  { slug: 'public-holiday-clerks', title: 'Worked a Public Holiday Under the Clerks Award — What Am I Owed?', metaTitle: 'Worked a Public Holiday Under Clerks Award? | RMP', metaDescription: 'Office workers who work on public holidays are entitled to penalty rates well above ordinary pay. Check what you should have been paid for that shift.', type: 'scenario' },
  { slug: 'no-payslip-clerks', title: 'Office Job With No Payslip — What Are My Rights?', metaTitle: 'Office Job With No Payslip? | Review My Pay', metaDescription: 'Every employee in Australia is entitled to a payslip within one working day of each pay period. No payslip in an office job is a red flag — know your rights.', type: 'scenario' },
  { slug: 'casual-conversion-clerks', title: 'Casual to Permanent Under the Clerks Award — Can I Convert?', metaTitle: 'Casual to Permanent Under Clerks Award? | RMP', metaDescription: 'After 12 months of regular casual work under the Clerks Award, you can request conversion to permanent employment. Learn the full process and your rights.', type: 'scenario' },
  { slug: 'saturday-rate-wrong-clerks', title: 'My Saturday Rate Looks Wrong Under the Clerks Award', metaTitle: 'Clerks Award Saturday Rate Wrong? | Review My Pay', metaDescription: 'If your Saturday rate is the same as a weekday under the Clerks Award, Saturday penalty rates haven\'t been applied. Check what you should be paid here.', type: 'scenario' },
  { slug: 'super-not-paid-clerks', title: 'Clerks Award Super Not Being Paid — What Can I Do?', metaTitle: 'Clerks Award Super Not Being Paid? | Review My Pay', metaDescription: 'All office workers including casuals are entitled to super at 12% of ordinary time earnings. If your employer isn\'t paying it, here\'s how to recover it.', type: 'scenario' },
  { slug: 'classification-wrong-clerks', title: 'My Clerks Award Classification Seems Wrong', metaTitle: 'Clerks Award Classification Wrong? | Review My Pay', metaDescription: 'Your classification must reflect your current duties, not the level set when you started. If your responsibilities have grown, your pay level should too.', type: 'scenario' },
];

export const CLERKS_ROLE_PAGES: ClerksPage[] = [
  { slug: 'admin-assistant-pay-rates', title: 'Admin Assistant Pay Rates Australia 2025–26', metaTitle: 'Admin Assistant Pay Rates 2025–26 | Clerks Award', metaDescription: 'Pay rates for admin assistants under the Clerks Award — classification levels, overtime rates, and the most common underpayments for office workers.', type: 'role' },
  { slug: 'receptionist-pay-rates', title: 'Receptionist Pay Rates Australia 2025–26', metaTitle: 'Receptionist Pay Rates 2025–26 | Clerks Award', metaDescription: 'Receptionist pay rates under the Clerks Award — classification levels, penalty rates, and how to check if your employer is paying you the correct amount.', type: 'role' },
  { slug: 'data-entry-pay-rates', title: 'Data Entry Operator Pay Rates 2025–26', metaTitle: 'Data Entry Operator Pay Rates 2025–26 | Clerks Award', metaDescription: 'Data entry operator pay rates under the Clerks Award — classification levels, overtime rates, and how to check your rate matches your actual duties.', type: 'role' },
];

export function getClerksIntentPage(slug: string): ClerksPage | undefined {
  return CLERKS_INTENT_PAGES.find(p => p.slug === slug);
}

export function getClerksScenarioPage(slug: string): ClerksPage | undefined {
  return CLERKS_SCENARIO_PAGES.find(p => p.slug === slug);
}

export function getClerksRolePage(slug: string): ClerksPage | undefined {
  return CLERKS_ROLE_PAGES.find(p => p.slug === slug);
}

export function getAllClerksIntentSlugs(): string[] {
  return CLERKS_INTENT_PAGES.map(p => p.slug);
}

export function getAllClerksScenarioSlugs(): string[] {
  return CLERKS_SCENARIO_PAGES.map(p => p.slug);
}

export function getAllClerksRoleSlugs(): string[] {
  return CLERKS_ROLE_PAGES.map(p => p.slug);
}
