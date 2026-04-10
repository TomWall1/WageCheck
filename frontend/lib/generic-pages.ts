/**
 * Universal page registry — generates intent, scenario, and hub metadata
 * for ANY award using its name and code. Used by awards that don't have
 * hand-crafted page registries.
 *
 * Each award gets:
 *   - 6 intent pages (high-intent search queries)
 *   - 8 scenario pages (specific real-world situations)
 *   - 1 hub page (enhanced with generic hub component)
 */

import type { AwardPage } from './award-content-registry';
import type { AwardInfo } from './awards';

/** Standard intent slugs — same for every award */
const INTENT_TEMPLATES = [
  {
    slugSuffix: 'am-i-being-underpaid',
    titleTemplate: (name: string) => `Am I Being Underpaid Under the ${name}?`,
    metaTitleTemplate: (name: string) => `Am I Being Underpaid? | ${name}`,
    metaDescTemplate: (name: string) => `The clearest signs you're being underpaid under the ${name} — and the fastest way to check your actual shifts against what you're owed.`,
  },
  {
    slugSuffix: 'not-getting-overtime',
    titleTemplate: (name: string) => `Not Getting Overtime Under the ${name}?`,
    metaTitleTemplate: (name: string) => `Not Getting Overtime? | ${name}`,
    metaDescTemplate: (name: string) => `If you regularly work more than 38 hours under the ${name} and don't see overtime on your payslip, you're almost certainly owed money.`,
  },
  {
    slugSuffix: 'hourly-rate-check',
    titleTemplate: (name: string) => `Is My ${name} Pay Rate Legal?`,
    metaTitleTemplate: (name: string) => `Is My Pay Rate Legal? | ${name}`,
    metaDescTemplate: (name: string) => `Check if your hourly rate is legal under the ${name}. The answer depends on your classification level, shift type, and employment status.`,
  },
  {
    slugSuffix: 'pay-too-low',
    titleTemplate: (name: string) => `My ${name} Pay Seems Too Low`,
    metaTitleTemplate: (name: string) => `Pay Too Low? | ${name}`,
    metaDescTemplate: (name: string) => `If your pay under the ${name} feels off but you're not sure why, this page walks through the most common causes and how to check.`,
  },
  {
    slugSuffix: 'flat-rate-legal',
    titleTemplate: (name: string) => `Is a Flat Rate Legal Under the ${name}?`,
    metaTitleTemplate: (name: string) => `Flat Rate Legal? | ${name}`,
    metaDescTemplate: (name: string) => `Flat rates under the ${name} are only legal under strict conditions most employers don't meet. Here's how to check if yours is compliant.`,
  },
  {
    slugSuffix: 'no-penalty-rates',
    titleTemplate: (name: string) => `Not Getting Penalty Rates Under the ${name}?`,
    metaTitleTemplate: (name: string) => `No Penalty Rates? | ${name}`,
    metaDescTemplate: (name: string) => `If your employer isn't applying penalty rates for weekends or public holidays under the ${name}, here's what you're owed and what to do.`,
  },
];

/** Standard scenario slugs — same for every award */
const SCENARIO_TEMPLATES = [
  {
    slugSuffix: 'public-holiday',
    titleTemplate: (name: string) => `Worked a Public Holiday Under the ${name} — What Am I Owed?`,
    metaTitleTemplate: (name: string) => `Public Holiday Pay | ${name}`,
    metaDescTemplate: (name: string) => `Public holiday rates under the ${name} are significantly higher than ordinary rates. Check what you should have been paid here.`,
  },
  {
    slugSuffix: 'sent-home-early',
    titleTemplate: (name: string) => `Sent Home Early From a ${name} Shift — What Am I Owed?`,
    metaTitleTemplate: (name: string) => `Sent Home Early? | ${name}`,
    metaDescTemplate: (name: string) => `Minimum engagement rules under the ${name} mean you're owed a minimum number of hours even if sent home early. Check your entitlement.`,
  },
  {
    slugSuffix: 'cash-in-hand',
    titleTemplate: (name: string) => `Cash in Hand Under the ${name} — Is This Legal?`,
    metaTitleTemplate: (name: string) => `Cash in Hand Legal? | ${name}`,
    metaDescTemplate: (name: string) => `Being paid cash under the ${name} isn't illegal — but paying below award rates, skipping payslips, or not paying super while using cash is.`,
  },
  {
    slugSuffix: 'no-payslip',
    titleTemplate: (name: string) => `${name} Job With No Payslip — What Are My Rights?`,
    metaTitleTemplate: (name: string) => `No Payslip? Your Rights | ${name}`,
    metaDescTemplate: (name: string) => `Every employee under the ${name} is entitled to a payslip within one working day of each pay period. No payslip is a red flag for underpayment.`,
  },
  {
    slugSuffix: 'overtime-not-paid',
    titleTemplate: (name: string) => `Working Extra Hours Under the ${name} and Not Getting Overtime`,
    metaTitleTemplate: (name: string) => `No Overtime Paid? | ${name}`,
    metaDescTemplate: (name: string) => `Every hour beyond 38 in a week triggers overtime under the ${name}. If you regularly work extra without overtime pay, you're likely owed money.`,
  },
  {
    slugSuffix: 'below-award',
    titleTemplate: (name: string) => `Paid Below Award Rate Under the ${name} — What Can I Do?`,
    metaTitleTemplate: (name: string) => `Below Award Rate? | ${name}`,
    metaDescTemplate: (name: string) => `You're owed the difference and can recover it going back 6 years. Paying below the ${name} minimum is a contravention — learn the steps.`,
  },
  {
    slugSuffix: 'super-not-paid',
    titleTemplate: (name: string) => `Super Not Being Paid Under the ${name} — What Can I Do?`,
    metaTitleTemplate: (name: string) => `Super Not Paid? | ${name}`,
    metaDescTemplate: (name: string) => `All employees under the ${name} are entitled to superannuation at 11.5% of ordinary time earnings. Check if your employer is paying correctly.`,
  },
  {
    slugSuffix: 'casual-conversion',
    titleTemplate: (name: string) => `Casual to Permanent Under the ${name} — Can I Convert?`,
    metaTitleTemplate: (name: string) => `Casual Conversion | ${name}`,
    metaDescTemplate: (name: string) => `After 12 months of regular casual work under the ${name}, you can request conversion to permanent employment. Learn the process here.`,
  },
];

/**
 * Generate intent pages for an award.
 */
export function generateIntentPages(award: AwardInfo): AwardPage[] {
  return INTENT_TEMPLATES.map(t => ({
    slug: t.slugSuffix,
    title: t.titleTemplate(award.shortName),
    metaTitle: t.metaTitleTemplate(award.shortName),
    metaDescription: t.metaDescTemplate(award.shortName),
    type: 'intent' as const,
  }));
}

/**
 * Generate scenario pages for an award.
 */
export function generateScenarioPages(award: AwardInfo): AwardPage[] {
  return SCENARIO_TEMPLATES.map(t => ({
    slug: t.slugSuffix,
    title: t.titleTemplate(award.shortName),
    metaTitle: t.metaTitleTemplate(award.shortName),
    metaDescription: t.metaDescTemplate(award.shortName),
    type: 'scenario' as const,
  }));
}

/** The standard intent slugs (for component mapping) */
export const GENERIC_INTENT_SLUGS = INTENT_TEMPLATES.map(t => t.slugSuffix);

/** The standard scenario slugs (for component mapping) */
export const GENERIC_SCENARIO_SLUGS = SCENARIO_TEMPLATES.map(t => t.slugSuffix);
