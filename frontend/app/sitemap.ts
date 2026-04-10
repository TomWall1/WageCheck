import { MetadataRoute } from 'next';
import { AWARDS } from '@/lib/awards';
import { GUIDES } from '@/lib/guides';
import { AWARD_DEEP_CONTENT } from '@/lib/award-content-registry';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://reviewmypay.com';
  const subPages = ['pay-rates', 'penalty-rates', 'casual-employees', 'overtime', 'allowances', 'classifications'];

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/check-my-pay`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/awards`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/guides`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/resources`, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${baseUrl}/about`, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${baseUrl}/contact`, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${baseUrl}/privacy`, changeFrequency: 'yearly', priority: 0.1 },
  ];

  // Award hub + 6 sub-pages for every registered award
  const awardPages: MetadataRoute.Sitemap = AWARDS.flatMap(a => [
    { url: `${baseUrl}/awards/${a.slug}`, changeFrequency: 'monthly' as const, priority: 0.8 },
    ...subPages.map(sub => ({
      url: `${baseUrl}/awards/${a.slug}/${sub}`,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]);

  // Guide pages
  const guidePages: MetadataRoute.Sitemap = GUIDES.map(g => ({
    url: `${baseUrl}/guides/${g.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Deep content pages (intent, scenario, role) from the registry
  const deepContentPages: MetadataRoute.Sitemap = [];

  for (const [awardSlug, dc] of Object.entries(AWARD_DEEP_CONTENT)) {
    // Intent pages
    for (const page of dc.intentPages) {
      deepContentPages.push({
        url: `${baseUrl}/awards/${awardSlug}/${page.slug}`,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      });
    }

    // Scenario pages
    for (const page of dc.scenarioPages) {
      deepContentPages.push({
        url: `${baseUrl}/awards/${awardSlug}/scenarios/${page.slug}`,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      });
    }

    // Role pages
    for (const page of dc.rolePages) {
      deepContentPages.push({
        url: `${baseUrl}/awards/${awardSlug}/${page.slug}`,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      });
    }
  }

  return [
    ...staticPages,
    ...awardPages,
    ...guidePages,
    ...deepContentPages,
  ];
}
