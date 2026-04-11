/**
 * Guide content registry — static metadata for /guides/ pages.
 * Content will be populated over time; this provides the routing skeleton.
 */

export interface GuideInfo {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  brief: string;
  tags: string[];
  /** ISO date string for when this guide was last meaningfully updated */
  lastUpdated: string;
}

export const GUIDES: GuideInfo[] = [
  { slug: 'what-is-a-modern-award', title: 'What Is a Modern Award?', description: 'Plain-English explanation of what modern awards are in Australia, who they cover, how to find which one applies to you, and what pay conditions they set.', keywords: ['modern award australia', 'what is a modern award', 'fair work awards'], brief: 'What modern awards are, who they cover, how to find yours. Foundation page for the entire site.', tags: ['Awards', 'Getting Started'], lastUpdated: '2026-03-18' },
  { slug: 'penalty-rates-australia', title: 'Penalty Rates in Australia', description: 'What penalty rates are, when they apply under Australian modern awards, and key examples from hospitality, retail, and fast food on weekends and holidays.', keywords: ['penalty rates australia', 'weekend penalty rates', 'public holiday pay'], brief: 'What penalty rates are, when they apply, key examples from hospitality/retail/fast food.', tags: ['Awards', 'Pay Rights'], lastUpdated: '2026-03-18' },
  { slug: 'casual-loading-explained', title: 'Casual Loading Explained', description: 'The 25% casual loading explained: what it compensates for, how it stacks with penalty rates on weekends and public holidays, and how to check your payslip.', keywords: ['casual loading australia', 'casual loading 25%', 'casual pay rates'], brief: 'The 25% loading explained: what it compensates for, how it stacks with penalty rates.', tags: ['Casual', 'Pay Rights'], lastUpdated: '2026-03-18' },
  { slug: 'overtime-pay-australia', title: 'Overtime Pay in Australia', description: 'How overtime pay works in Australia: time-and-a-half, double-time, daily vs weekly triggers, TOIL arrangements, and the most common employer errors to watch.', keywords: ['overtime pay australia', 'overtime rates', 'time and a half'], brief: 'Time-and-a-half, double-time, daily vs weekly triggers, TOIL, common employer errors.', tags: ['Pay Rights'], lastUpdated: '2026-03-18' },
  { slug: 'am-i-being-underpaid', title: 'Am I Being Underpaid?', description: 'How to check if you are being underpaid under your Fair Work modern award in Australia. Find your award, check your classification, and compare your actual pay.', keywords: ['am I being underpaid', 'underpaid australia', 'check my pay'], brief: 'How to check: find your award, find your classification, check penalty rates. The highest-converting guide.', tags: ['Pay Rights', 'Getting Started'], lastUpdated: '2026-03-18' },
  { slug: 'how-to-report-underpayment', title: 'How to Report Underpayment', description: 'Step-by-step guide to reporting underpayment in Australia: how to raise it with your employer, lodge a Fair Work Ombudsman complaint, and explore legal options.', keywords: ['report underpayment australia', 'fair work complaint', 'wage theft report'], brief: 'Step-by-step: raise with employer, FWO complaint, legal options, what to document.', tags: ['Pay Rights'], lastUpdated: '2026-03-18' },
  { slug: 'minimum-wage-australia-2025', title: 'Minimum Wage Australia 2025', description: 'Current Australian minimum wage rate, the annual Fair Work Commission review process, and the key difference between the national minimum wage and award rates.', keywords: ['minimum wage australia 2025', 'national minimum wage', 'minimum hourly rate'], brief: 'National Minimum Wage vs award minimums. Annual FWC review. Current rate.', tags: ['Pay Rights', 'Getting Started'], lastUpdated: '2026-03-18' },
  { slug: 'public-holiday-pay-australia', title: 'Public Holiday Pay in Australia', description: 'Your rights to public holiday pay in Australia: penalty rate multipliers, the right to refuse unreasonable holiday work, and how national vs state holidays differ.', keywords: ['public holiday pay australia', 'double time public holiday', 'working on public holiday'], brief: 'Right to refuse unreasonable holiday work. Double-time rules. National vs state holidays.', tags: ['Pay Rights'], lastUpdated: '2026-03-18' },
  { slug: 'casual-vs-part-time', title: 'Casual vs Part-Time: What\'s the Difference?', description: 'Legal distinctions between casual and part-time employment in Australia, including leave entitlements, casual conversion rights, and common misconceptions.', keywords: ['casual vs part time australia', 'casual conversion', 'part time rights'], brief: 'Legal distinctions, entitlements, casual conversion provisions. Common misconceptions.', tags: ['Casual'], lastUpdated: '2026-03-18' },
  { slug: 'wage-theft-australia', title: 'Wage Theft in Australia', description: 'Fair Work Ombudsman recovery statistics, the industries most affected by wage theft, and the new criminal wage theft provisions now in effect across Australia.', keywords: ['wage theft australia', 'underpayment statistics', 'criminal wage theft'], brief: 'FWO recovery statistics, most affected industries, new criminal wage theft provisions.', tags: ['Pay Rights'], lastUpdated: '2026-03-18' },
  { slug: 'flat-rate-vs-award', title: 'Flat Rate vs Award Pay', description: 'Can an employer pay a flat rate instead of award rates in Australia? When a flat rate is legal, what it must include, and how to check yours is compliant.', keywords: ['flat rate vs award', 'flat rate pay australia', 'annualised salary award'], brief: 'Can an employer pay a flat rate instead of award rates? When is it legal, what must it include?', tags: ['Pay Rights', 'Awards'], lastUpdated: '2026-03-18' },
  { slug: 'how-to-read-your-payslip', title: 'How to Read Your Payslip', description: 'Payslip line-by-line guide for Australian workers: ordinary hours, penalty rate lines, superannuation, tax, deductions, and red flags that signal underpayment.', keywords: ['how to read payslip australia', 'payslip explained', 'payslip requirements'], brief: 'Payslip line-by-line: ordinary hours, penalty lines, super, tax, deductions. Red flags to watch for.', tags: ['Getting Started'], lastUpdated: '2026-03-18' },
  { slug: 'allowances-and-loadings', title: 'Award Allowances & Loadings', description: 'The most common award allowances in Australia explained: meal, uniform, vehicle, and tool allowances with current dollar amounts and when each one applies.', keywords: ['award allowances australia', 'meal allowance', 'uniform allowance'], brief: 'Most common allowances (meal, uniform, vehicle, tool) with dollar amounts.', tags: ['Awards', 'Pay Rights'], lastUpdated: '2026-03-18' },
  { slug: 'superannuation-casual-workers', title: 'Superannuation for Casual Workers', description: 'When super must be paid for casual workers in Australia, how to check your super is being paid correctly, and how to report unpaid superannuation to the ATO.', keywords: ['superannuation casual workers', 'super casual employees', 'unpaid super'], brief: '$450 threshold abolition (2022). When super must be paid. How to check and report unpaid super.', tags: ['Casual', 'Pay Rights'], lastUpdated: '2026-03-18' },
  { slug: 'hospitality-vs-restaurant-award', title: 'Hospitality vs Restaurant Award', description: 'Which award covers you? Use the industry and employer tests to determine whether the Hospitality Award or Restaurant Award applies to your role and workplace.', keywords: ['hospitality vs restaurant award', 'which award covers me', 'award coverage'], brief: 'Which award covers you? Industry and employer tests. Simple decision tree.', tags: ['Awards'], lastUpdated: '2026-03-18' },
];

export function getAllTags(): string[] {
  const tags = new Set<string>();
  for (const g of GUIDES) for (const t of g.tags) tags.add(t);
  return Array.from(tags).sort();
}

export function getGuideBySlug(slug: string): GuideInfo | undefined {
  return GUIDES.find(g => g.slug === slug);
}

export function getAllGuideSlugs(): string[] {
  return GUIDES.map(g => g.slug);
}
