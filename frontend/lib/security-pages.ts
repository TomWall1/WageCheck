/**
 * Registry for security high-intent, scenario, and role pages.
 * Used for static generation and metadata.
 */

export interface SecurityPage {
  slug: string;
  title: string;        // H1 title (without "| Review My Pay")
  metaTitle: string;     // Full meta title
  metaDescription: string;
  type: 'intent' | 'scenario' | 'role';
}

export const SECURITY_INTENT_PAGES: SecurityPage[] = [
  { slug: 'am-i-being-underpaid', title: 'Am I Being Underpaid as a Security Guard?', metaTitle: 'Am I Being Underpaid in Security? | Review My Pay', metaDescription: 'The clearest signs you\'re being underpaid under the Security Award — and the fastest way to check your actual shifts against what you\'re legally owed.', type: 'intent' },
  { slug: 'not-getting-overtime', title: 'Not Getting Overtime in Security?', metaTitle: 'Not Getting Overtime in Security? | Review My Pay', metaDescription: 'If you regularly work more than 38 hours a week in security and don\'t see overtime on your payslip, you\'re almost certainly owed money. Check yours now.', type: 'intent' },
  { slug: 'hourly-rate-check', title: 'Is My Security Pay Rate Legal?', metaTitle: 'Is My Security Pay Rate Legal? | Review My Pay', metaDescription: 'Your legal security pay rate depends on your classification level, employment type, and shift timing. Enter your details and check yours against the award.', type: 'intent' },
  { slug: 'pay-too-low', title: 'My Security Pay Seems Too Low', metaTitle: 'Security Pay Too Low? Check What You\'re Owed | RMP', metaDescription: 'If your security pay feels off but you\'re not sure exactly why, this page walks through the most common causes and how to check your actual shift rates.', type: 'intent' },
  { slug: 'flat-rate-security', title: 'Is a Flat Rate Legal in Security?', metaTitle: 'Is a Flat Rate Legal in Security? | Review My Pay', metaDescription: 'Flat rates in security are only legal under strict conditions most employers don\'t meet. Here\'s how to check if yours covers every award entitlement.', type: 'intent' },
];

export const SECURITY_SCENARIO_PAGES: SecurityPage[] = [
  { slug: 'overnight-shift-security', title: 'Overnight Security Shift — What\'s the Pay Rate?', metaTitle: 'Overnight Security Shift — Pay Rate? | Review My Pay', metaDescription: 'Overnight security shifts attract additional penalty loadings on top of your base rate. Here\'s what you should be receiving for every hour after midnight.', type: 'scenario' },
  { slug: 'public-holiday-security', title: 'Worked a Public Holiday in Security — What Am I Owed?', metaTitle: 'Worked a Public Holiday in Security? | Review My Pay', metaDescription: 'Security workers who work on public holidays are entitled to penalty rates well above ordinary pay. Check what you should have been paid for that shift.', type: 'scenario' },
  { slug: 'sent-home-early-security', title: 'Sent Home Early From a Security Shift — What Am I Owed?', metaTitle: 'Sent Home Early From Security Shift? | Review My Pay', metaDescription: 'If you\'re sent home early from a security shift, you\'re still owed a minimum number of hours\' pay under the Security Award. Here\'s how it works.', type: 'scenario' },
  { slug: 'cash-in-hand-security', title: 'Security Cash in Hand — Is This Legal?', metaTitle: 'Security Cash in Hand — Is This Legal? | RMP', metaDescription: 'Being paid cash in security isn\'t illegal — but paying below award rates, skipping payslips, or not paying super while using cash is. Know your rights.', type: 'scenario' },
  { slug: 'no-payslip-security', title: 'Security Job With No Payslip — What Are My Rights?', metaTitle: 'Security Job With No Payslip? | Review My Pay', metaDescription: 'Every employee in Australia is entitled to a payslip within one working day of each pay period. No payslip in security is a red flag — know your rights.', type: 'scenario' },
  { slug: 'overtime-not-paid-security', title: 'Working Extra Hours in Security and Not Getting Overtime', metaTitle: 'Extra Hours in Security, No Overtime? | Review My Pay', metaDescription: 'Every hour beyond 38 in a week triggers overtime under the Security Award. If you regularly work extra hours without overtime pay, you\'re being underpaid.', type: 'scenario' },
  { slug: 'below-award-security', title: 'Paid Below Award Rate in Security — What Can I Do?', metaTitle: 'Paid Below Award in Security? | Review My Pay', metaDescription: 'You\'re owed the difference and you can recover it going back up to 6 years. Paying below the Security Award minimum is a contravention — here\'s what to do.', type: 'scenario' },
  { slug: 'super-not-paid-security', title: 'Security Super Not Being Paid — What Can I Do?', metaTitle: 'Security Super Not Being Paid? | Review My Pay', metaDescription: 'All security workers including casuals are entitled to super at 12% of ordinary time earnings. If your employer isn\'t paying it, here\'s how to recover it.', type: 'scenario' },
];

export const SECURITY_ROLE_PAGES: SecurityPage[] = [
  { slug: 'security-guard-pay-rates', title: 'Security Guard Pay Rates Australia 2025–26', metaTitle: 'Security Guard Pay Rates 2025–26 | Security Award', metaDescription: 'Pay rates for security guards under the Security Award — overnight penalties, weekend loadings, and the most common underpayments for guards in Australia.', type: 'role' },
  { slug: 'crowd-controller-pay-rates', title: 'Crowd Controller Pay Rates Australia 2025–26', metaTitle: 'Crowd Controller Pay Rates 2025–26 | Security Award', metaDescription: 'Crowd controller pay rates under the Security Award — classification levels, penalty rates, and how to check if your employer is paying you correctly.', type: 'role' },
  { slug: 'patrol-officer-pay-rates', title: 'Patrol Officer Pay Rates Australia 2025–26', metaTitle: 'Patrol Officer Pay Rates 2025–26 | Security Award', metaDescription: 'Patrol officer pay rates under the Security Award — overnight loadings, weekend penalties, and how to check your rate matches your actual duties.', type: 'role' },
];

export function getSecurityIntentPage(slug: string): SecurityPage | undefined {
  return SECURITY_INTENT_PAGES.find(p => p.slug === slug);
}

export function getSecurityScenarioPage(slug: string): SecurityPage | undefined {
  return SECURITY_SCENARIO_PAGES.find(p => p.slug === slug);
}

export function getSecurityRolePage(slug: string): SecurityPage | undefined {
  return SECURITY_ROLE_PAGES.find(p => p.slug === slug);
}

export function getAllSecurityIntentSlugs(): string[] {
  return SECURITY_INTENT_PAGES.map(p => p.slug);
}

export function getAllSecurityScenarioSlugs(): string[] {
  return SECURITY_SCENARIO_PAGES.map(p => p.slug);
}

export function getAllSecurityRoleSlugs(): string[] {
  return SECURITY_ROLE_PAGES.map(p => p.slug);
}
