import { MetadataRoute } from 'next';
import { AWARDS } from '@/lib/awards';
import { GUIDES } from '@/lib/guides';
import { HOSPITALITY_INTENT_PAGES, HOSPITALITY_SCENARIO_PAGES } from '@/lib/hospitality-pages';
import { RESTAURANT_INTENT_PAGES, RESTAURANT_SCENARIO_PAGES, RESTAURANT_ROLE_PAGES } from '@/lib/restaurant-pages';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://reviewmypay.com';
  const subPages = ['pay-rates', 'penalty-rates', 'casual-employees', 'overtime', 'allowances', 'classifications'];

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/check-my-pay`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/awards`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/guides`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/about`, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${baseUrl}/contact`, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${baseUrl}/privacy`, changeFrequency: 'yearly', priority: 0.1 },
  ];

  const awardPages: MetadataRoute.Sitemap = AWARDS.flatMap(a => [
    { url: `${baseUrl}/awards/${a.slug}`, changeFrequency: 'monthly' as const, priority: 0.8 },
    ...subPages.map(sub => ({
      url: `${baseUrl}/awards/${a.slug}/${sub}`,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]);

  const guidePages: MetadataRoute.Sitemap = GUIDES.map(g => ({
    url: `${baseUrl}/guides/${g.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Hospitality role pages
  const hospitalityRoleSlugs = ['waitstaff-pay-rates', 'cook-pay-rates', 'kitchen-hand-pay-rates', 'bartender-pay-rates', 'hotel-worker-pay-rates', 'function-centre-pay-rates'];

  const hospitalityIntentPages: MetadataRoute.Sitemap = HOSPITALITY_INTENT_PAGES.map(p => ({
    url: `${baseUrl}/awards/hospitality-award/${p.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const hospitalityScenarioPages: MetadataRoute.Sitemap = HOSPITALITY_SCENARIO_PAGES.map(p => ({
    url: `${baseUrl}/awards/hospitality-award/scenarios/${p.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const hospitalityRolePages: MetadataRoute.Sitemap = hospitalityRoleSlugs.map(slug => ({
    url: `${baseUrl}/awards/hospitality-award/${slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const restaurantIntentPages: MetadataRoute.Sitemap = RESTAURANT_INTENT_PAGES.map(p => ({
    url: `${baseUrl}/awards/restaurant-award/${p.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const restaurantScenarioPages: MetadataRoute.Sitemap = RESTAURANT_SCENARIO_PAGES.map(p => ({
    url: `${baseUrl}/awards/restaurant-award/scenarios/${p.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const restaurantRolePages: MetadataRoute.Sitemap = RESTAURANT_ROLE_PAGES.map(p => ({
    url: `${baseUrl}/awards/restaurant-award/${p.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    ...staticPages,
    ...awardPages,
    ...guidePages,
    ...hospitalityIntentPages,
    ...hospitalityScenarioPages,
    ...hospitalityRolePages,
    ...restaurantIntentPages,
    ...restaurantScenarioPages,
    ...restaurantRolePages,
  ];
}
