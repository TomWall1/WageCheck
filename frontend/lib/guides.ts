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
}

export const GUIDES: GuideInfo[] = [
  { slug: 'what-is-a-modern-award', title: 'What Is a Modern Award?', description: 'Plain-English explanation of what modern awards are, who they cover, and how to find yours.', keywords: ['modern award australia', 'what is a modern award', 'fair work awards'], brief: 'What modern awards are, who they cover, how to find yours. Foundation page for the entire site.' },
  { slug: 'penalty-rates-australia', title: 'Penalty Rates in Australia', description: 'What penalty rates are, when they apply, and key examples from hospitality, retail, and fast food.', keywords: ['penalty rates australia', 'weekend penalty rates', 'public holiday pay'], brief: 'What penalty rates are, when they apply, key examples from hospitality/retail/fast food.' },
  { slug: 'casual-loading-explained', title: 'Casual Loading Explained', description: 'The 25% casual loading explained: what it compensates for and how it stacks with penalty rates.', keywords: ['casual loading australia', 'casual loading 25%', 'casual pay rates'], brief: 'The 25% loading explained: what it compensates for, how it stacks with penalty rates.' },
  { slug: 'overtime-pay-australia', title: 'Overtime Pay in Australia', description: 'Time-and-a-half, double-time, daily vs weekly triggers, TOIL, and common employer errors.', keywords: ['overtime pay australia', 'overtime rates', 'time and a half'], brief: 'Time-and-a-half, double-time, daily vs weekly triggers, TOIL, common employer errors.' },
  { slug: 'am-i-being-underpaid', title: 'Am I Being Underpaid?', description: 'How to check if you are being underpaid under your Fair Work modern award in Australia.', keywords: ['am I being underpaid', 'underpaid australia', 'check my pay'], brief: 'How to check: find your award, find your classification, check penalty rates. The highest-converting guide.' },
  { slug: 'how-to-report-underpayment', title: 'How to Report Underpayment', description: 'Step-by-step guide to reporting underpayment in Australia: employer discussion, FWO complaint, legal options.', keywords: ['report underpayment australia', 'fair work complaint', 'wage theft report'], brief: 'Step-by-step: raise with employer, FWO complaint, legal options, what to document.' },
  { slug: 'minimum-wage-australia-2025', title: 'Minimum Wage Australia 2025', description: 'Current Australian minimum wage, annual FWC review, and the difference between national minimum and award minimums.', keywords: ['minimum wage australia 2025', 'national minimum wage', 'minimum hourly rate'], brief: 'National Minimum Wage vs award minimums. Annual FWC review. Current rate.' },
  { slug: 'public-holiday-pay-australia', title: 'Public Holiday Pay in Australia', description: 'Your rights to public holiday pay, double-time rules, and the right to refuse unreasonable holiday work.', keywords: ['public holiday pay australia', 'double time public holiday', 'working on public holiday'], brief: 'Right to refuse unreasonable holiday work. Double-time rules. National vs state holidays.' },
  { slug: 'casual-vs-part-time', title: 'Casual vs Part-Time: What\'s the Difference?', description: 'Legal distinctions between casual and part-time employment in Australia, including entitlements and conversion rights.', keywords: ['casual vs part time australia', 'casual conversion', 'part time rights'], brief: 'Legal distinctions, entitlements, casual conversion provisions. Common misconceptions.' },
  { slug: 'wage-theft-australia', title: 'Wage Theft in Australia', description: 'FWO recovery statistics, most affected industries, and the new criminal wage theft provisions.', keywords: ['wage theft australia', 'underpayment statistics', 'criminal wage theft'], brief: 'FWO recovery statistics, most affected industries, new criminal wage theft provisions.' },
  { slug: 'flat-rate-vs-award', title: 'Flat Rate vs Award Pay', description: 'Can an employer pay a flat rate instead of award rates? When is it legal and what must it include?', keywords: ['flat rate vs award', 'flat rate pay australia', 'annualised salary award'], brief: 'Can an employer pay a flat rate instead of award rates? When is it legal, what must it include?' },
  { slug: 'how-to-read-your-payslip', title: 'How to Read Your Payslip', description: 'Payslip line-by-line guide: ordinary hours, penalty lines, super, tax, deductions, and red flags.', keywords: ['how to read payslip australia', 'payslip explained', 'payslip requirements'], brief: 'Payslip line-by-line: ordinary hours, penalty lines, super, tax, deductions. Red flags to watch for.' },
  { slug: 'allowances-and-loadings', title: 'Award Allowances & Loadings', description: 'Most common award allowances in Australia: meal, uniform, vehicle, tool allowances with dollar amounts.', keywords: ['award allowances australia', 'meal allowance', 'uniform allowance'], brief: 'Most common allowances (meal, uniform, vehicle, tool) with dollar amounts.' },
  { slug: 'superannuation-casual-workers', title: 'Superannuation for Casual Workers', description: 'When super must be paid for casual workers, how to check, and how to report unpaid super.', keywords: ['superannuation casual workers', 'super casual employees', 'unpaid super'], brief: '$450 threshold abolition (2022). When super must be paid. How to check and report unpaid super.' },
  { slug: 'hospitality-vs-restaurant-award', title: 'Hospitality vs Restaurant Award', description: 'Which award covers you? Industry and employer tests to determine if the Hospitality or Restaurant Award applies.', keywords: ['hospitality vs restaurant award', 'which award covers me', 'award coverage'], brief: 'Which award covers you? Industry and employer tests. Simple decision tree.' },
];

export function getGuideBySlug(slug: string): GuideInfo | undefined {
  return GUIDES.find(g => g.slug === slug);
}

export function getAllGuideSlugs(): string[] {
  return GUIDES.map(g => g.slug);
}
