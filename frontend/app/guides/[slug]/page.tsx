import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getGuideBySlug, getAllGuideSlugs } from '@/lib/guides';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import CheckPayCTA from '@/components/seo/CheckPayCTA';
import dynamic from 'next/dynamic';
import { getHospitalityRates, HospitalityRateData } from '@/lib/hospitality-rates';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const guideComponents: Record<string, React.ComponentType<any>> = {
  'what-is-a-modern-award': dynamic(() => import('@/components/seo/guides/GuideWhatIsModernAward')),
  'penalty-rates-australia': dynamic(() => import('@/components/seo/guides/GuidePenaltyRates')),
  'casual-loading-explained': dynamic(() => import('@/components/seo/guides/GuideCasualLoading')),
  'overtime-pay-australia': dynamic(() => import('@/components/seo/guides/GuideOvertimePay')),
  'am-i-being-underpaid': dynamic(() => import('@/components/seo/guides/GuideAmIUnderpaid')),
  'how-to-report-underpayment': dynamic(() => import('@/components/seo/guides/GuideReportUnderpayment')),
  'minimum-wage-australia-2025': dynamic(() => import('@/components/seo/guides/GuideMinimumWage')),
  'public-holiday-pay-australia': dynamic(() => import('@/components/seo/guides/GuidePublicHolidayPay')),
  'casual-vs-part-time': dynamic(() => import('@/components/seo/guides/GuideCasualVsPartTime')),
  'wage-theft-australia': dynamic(() => import('@/components/seo/guides/GuideWageTheft')),
  'flat-rate-vs-award': dynamic(() => import('@/components/seo/guides/GuideFlatRateVsAward')),
  'how-to-read-your-payslip': dynamic(() => import('@/components/seo/guides/GuideReadPayslip')),
  'allowances-and-loadings': dynamic(() => import('@/components/seo/guides/GuideAllowancesLoadings')),
  'superannuation-casual-workers': dynamic(() => import('@/components/seo/guides/GuideSuperCasual')),
  'hospitality-vs-restaurant-award': dynamic(() => import('@/components/seo/guides/GuideHospitalityVsRestaurant')),
};

interface Props { params: Promise<{ slug: string }>; }

export function generateStaticParams() {
  return getAllGuideSlugs().map(slug => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};
  return {
    title: `${guide.title} | Review My Pay`,
    description: guide.description,
    keywords: guide.keywords,
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const GuideContent = guideComponents[slug];

  // Guides that reference hospitality rates need live data
  const guidesNeedingRates = [
    'casual-loading-explained', 'allowances-and-loadings', 'flat-rate-vs-award',
    'minimum-wage-australia-2025', 'public-holiday-pay-australia',
    'how-to-read-your-payslip', 'superannuation-casual-workers',
  ];
  let rates: HospitalityRateData | undefined;
  if (guidesNeedingRates.includes(slug)) {
    try { rates = await getHospitalityRates(); } catch { /* rates stay undefined */ }
  }

  return (
    <div style={{ maxWidth: '640px', margin: '0 auto' }}>
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: guide.title, href: `/guides/${slug}` },
      ]} />

      <div style={{ paddingBottom: '1.5rem', borderBottom: '1.5px solid var(--border)', marginBottom: '2rem' }}>
        <h1 style={{
          fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.5rem', fontWeight: 600,
          letterSpacing: '-0.03em', color: 'var(--secondary)', lineHeight: 1.2,
        }}>
          {guide.title}
        </h1>
        <p style={{ fontSize: '15px', color: 'var(--secondary-muted)', marginTop: '8px', lineHeight: 1.6 }}>
          {guide.description}
        </p>
        {guide.tags && guide.tags.length > 0 && (
          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginTop: '10px' }}>
            {guide.tags.map(tag => (
              <a
                key={tag}
                href={`/guides?tag=${encodeURIComponent(tag)}`}
                style={{
                  fontSize: '10.5px',
                  fontWeight: 500,
                  color: 'var(--primary)',
                  background: 'var(--primary-light)',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  textDecoration: 'none',
                }}
              >
                {tag}
              </a>
            ))}
          </div>
        )}
      </div>

      {GuideContent ? (
        <GuideContent rates={rates} />
      ) : (
        <div style={{ fontSize: '14.5px', color: 'var(--secondary-muted)', lineHeight: 1.75 }}>
          <p>{guide.brief}</p>
          <p style={{ marginTop: '1.5rem', fontStyle: 'italic', fontSize: '13px' }}>
            This guide is being expanded with detailed content. Check back soon for the full article, or use our pay calculator to check your pay now.
          </p>
        </div>
      )}

      <div style={{ marginTop: '2rem', fontSize: '13px', color: 'var(--secondary-muted)' }}>
        <p>
          <a href="/guides" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>&larr; All guides</a>
          {' | '}
          <a href="/awards" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>Browse awards</a>
        </p>
      </div>

      <CheckPayCTA />

      {/* Article schema for AI search visibility */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: guide.title,
        description: guide.description,
        datePublished: guide.lastUpdated,
        dateModified: guide.lastUpdated,
        author: {
          '@type': 'Organization',
          name: 'Review My Pay',
          url: 'https://reviewmypay.com',
        },
        publisher: {
          '@type': 'Organization',
          name: 'Review My Pay',
          url: 'https://reviewmypay.com',
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `https://reviewmypay.com/guides/${slug}`,
        },
        inLanguage: 'en-AU',
        isAccessibleForFree: true,
        keywords: guide.keywords.join(', '),
      }) }} />
    </div>
  );
}
