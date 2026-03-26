import { MetadataRoute } from 'next';
import { AWARDS } from '@/lib/awards';
import { GUIDES } from '@/lib/guides';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://reviewmypay.com.au';
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

  return [...staticPages, ...awardPages, ...guidePages];
}
