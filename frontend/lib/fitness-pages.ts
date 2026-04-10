/**
 * Registry for fitness industry high-intent, scenario, and role pages.
 * Used for static generation and metadata.
 */

export interface FitnessPage {
  slug: string;
  title: string;        // H1 title (without "| Review My Pay")
  metaTitle: string;     // Full meta title
  metaDescription: string;
  type: 'intent' | 'scenario' | 'role';
}

export const FITNESS_INTENT_PAGES: FitnessPage[] = [
  { slug: 'am-i-being-underpaid', title: 'Am I Being Underpaid in the Fitness Industry?', metaTitle: 'Am I Being Underpaid in Fitness? | Review My Pay', metaDescription: 'The clearest signs you\'re being underpaid under the Fitness Industry Award — and the fastest way to check your actual shifts against what you\'re owed.', type: 'intent' },
  { slug: 'not-getting-overtime', title: 'Not Getting Overtime in the Fitness Industry?', metaTitle: 'Not Getting Overtime in Fitness? | Review My Pay', metaDescription: 'If you regularly work more than 38 hours a week in the fitness industry and don\'t see overtime on your payslip, you\'re almost certainly owed money.', type: 'intent' },
  { slug: 'hourly-rate-check', title: 'Is My Fitness Industry Pay Rate Legal?', metaTitle: 'Is My Fitness Pay Rate Legal? | Review My Pay', metaDescription: 'Your legal fitness industry pay rate depends on your classification level, employment type, and shift timing. Check yours against the award right now.', type: 'intent' },
  { slug: 'pay-too-low', title: 'My Fitness Industry Pay Seems Too Low', metaTitle: 'Fitness Pay Too Low? Check What You\'re Owed | RMP', metaDescription: 'If your fitness industry pay feels off but you\'re not sure exactly why, this page walks through the most common causes and how to check your shift rates.', type: 'intent' },
  { slug: 'flat-rate-fitness', title: 'Is a Flat Rate Legal in the Fitness Industry?', metaTitle: 'Is a Flat Rate Legal in Fitness? | Review My Pay', metaDescription: 'Flat rates in the fitness industry are only legal under strict conditions most employers don\'t meet. Here\'s how to check yours covers every entitlement.', type: 'intent' },
];

export const FITNESS_SCENARIO_PAGES: FitnessPage[] = [
  { slug: 'early-morning-fitness', title: 'Early Morning Fitness Shift — What\'s the Loading?', metaTitle: 'Early Morning Fitness Shift — Loading? | RMP', metaDescription: 'Early morning shifts in the fitness industry may attract additional penalty loadings. Here\'s what you should be receiving for those pre-dawn starts.', type: 'scenario' },
  { slug: 'public-holiday-fitness', title: 'Worked a Public Holiday in the Fitness Industry — What Am I Owed?', metaTitle: 'Worked a Public Holiday in Fitness? | Review My Pay', metaDescription: 'Fitness workers who work on public holidays are entitled to penalty rates well above ordinary pay. Check what you should have been paid for that shift.', type: 'scenario' },
  { slug: 'split-shift-fitness', title: 'Split Shifts in the Fitness Industry — Am I Being Paid for the Break?', metaTitle: 'Fitness Split Shifts — Paid for the Break? | RMP', metaDescription: 'Split shifts in the fitness industry attract an allowance on top of your hourly rate. Most workers never receive it. Here\'s what you\'re actually owed.', type: 'scenario' },
  { slug: 'cash-in-hand-fitness', title: 'Fitness Industry Cash in Hand — Is This Legal?', metaTitle: 'Fitness Cash in Hand — Is This Legal? | RMP', metaDescription: 'Being paid cash in the fitness industry isn\'t illegal — but paying below award rates, skipping payslips, or not paying super while using cash is.', type: 'scenario' },
  { slug: 'no-payslip-fitness', title: 'Fitness Job With No Payslip — What Are My Rights?', metaTitle: 'Fitness Job With No Payslip? | Review My Pay', metaDescription: 'Every employee in Australia is entitled to a payslip within one working day of each pay period. No payslip in the fitness industry is a red flag.', type: 'scenario' },
  { slug: 'overtime-not-paid-fitness', title: 'Working Extra Hours in the Fitness Industry and Not Getting Overtime', metaTitle: 'Extra Hours in Fitness, No Overtime? | Review My Pay', metaDescription: 'Every hour beyond 38 in a week triggers overtime under the Fitness Industry Award. If you work extra hours without overtime pay, you\'re being underpaid.', type: 'scenario' },
  { slug: 'below-award-fitness', title: 'Paid Below Award Rate in the Fitness Industry — What Can I Do?', metaTitle: 'Paid Below Award in Fitness? | Review My Pay', metaDescription: 'You\'re owed the difference and you can recover it going back up to 6 years. Paying below the Fitness Award minimum is a contravention — here\'s what to do.', type: 'scenario' },
  { slug: 'super-not-paid-fitness', title: 'Fitness Industry Super Not Being Paid — What Can I Do?', metaTitle: 'Fitness Super Not Being Paid? | Review My Pay', metaDescription: 'All fitness workers including casuals are entitled to super at 12% of ordinary time earnings. If your employer isn\'t paying it, here\'s how to recover it.', type: 'scenario' },
];

export const FITNESS_ROLE_PAGES: FitnessPage[] = [
  { slug: 'personal-trainer-pay-rates', title: 'Personal Trainer Pay Rates Australia 2025–26', metaTitle: 'Personal Trainer Pay Rates 2025–26 | Fitness Award', metaDescription: 'Pay rates for personal trainers under the Fitness Industry Award — classification levels, penalty rates, and the most common underpayments for PTs.', type: 'role' },
  { slug: 'gym-instructor-pay-rates', title: 'Gym Instructor Pay Rates Australia 2025–26', metaTitle: 'Gym Instructor Pay Rates 2025–26 | Fitness Award', metaDescription: 'Gym instructor pay rates under the Fitness Industry Award — classification levels, weekend penalties, and how to check your employer is paying correctly.', type: 'role' },
  { slug: 'swim-teacher-pay-rates', title: 'Swim Teacher Pay Rates Australia 2025–26', metaTitle: 'Swim Teacher Pay Rates 2025–26 | Fitness Award', metaDescription: 'Swim teacher pay rates under the Fitness Industry Award — early morning loadings, weekend penalties, and how to check your rate matches your duties.', type: 'role' },
];

export function getFitnessIntentPage(slug: string): FitnessPage | undefined {
  return FITNESS_INTENT_PAGES.find(p => p.slug === slug);
}

export function getFitnessScenarioPage(slug: string): FitnessPage | undefined {
  return FITNESS_SCENARIO_PAGES.find(p => p.slug === slug);
}

export function getFitnessRolePage(slug: string): FitnessPage | undefined {
  return FITNESS_ROLE_PAGES.find(p => p.slug === slug);
}

export function getAllFitnessIntentSlugs(): string[] {
  return FITNESS_INTENT_PAGES.map(p => p.slug);
}

export function getAllFitnessScenarioSlugs(): string[] {
  return FITNESS_SCENARIO_PAGES.map(p => p.slug);
}

export function getAllFitnessRoleSlugs(): string[] {
  return FITNESS_ROLE_PAGES.map(p => p.slug);
}
