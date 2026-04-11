import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAwardBySlug } from '@/lib/awards';
import {
  getDeepContent,
  getDeepScenarioPage,
  generateAllScenarioParams,
} from '@/lib/award-content-registry';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import SubPageNav from '@/components/seo/SubPageNav';

interface Props { params: Promise<{ awardSlug: string; slug: string }>; }

export function generateStaticParams() {
  return generateAllScenarioParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { awardSlug, slug } = await params;
  const page = getDeepScenarioPage(awardSlug, slug);
  if (!page) return {};
  return { title: page.metaTitle, description: page.metaDescription };
}

export default async function ScenarioPage({ params }: Props) {
  const { awardSlug, slug } = await params;
  const award = getAwardBySlug(awardSlug);
  const dc = getDeepContent(awardSlug);

  const page = getDeepScenarioPage(awardSlug, slug);
  if (!award || !dc || !page) notFound();

  const ScenarioContent = dc.scenarioComponents[slug];

  let rates;
  if (dc.getRates) {
    try { rates = await dc.getRates(); } catch { /* rates stay undefined — components handle gracefully */ }
  }

  return (
    <div>
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Awards', href: '/awards' },
        { label: dc.label, href: `/awards/${awardSlug}` },
        { label: page.title, href: `/awards/${awardSlug}/scenarios/${slug}` },
      ]} />

      <SubPageNav awardSlug={awardSlug} />

      <h1 style={{
        fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.5rem', fontWeight: 600,
        letterSpacing: '-0.03em', color: 'var(--secondary)', marginBottom: '8px',
      }}>
        {page.title}
      </h1>

      {ScenarioContent ? (
        <ScenarioContent
          rates={rates}
          awardCode={award.code}
          awardName={award.shortName}
          awardSlug={awardSlug}
        />
      ) : (
        <p style={{ fontSize: '14px', color: 'var(--secondary-muted)', fontStyle: 'italic' }}>
          This scenario page is being expanded. Check back soon or use the calculator to check your pay now.
        </p>
      )}

      {/* Article schema for AI search visibility */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: page.title,
        description: page.metaDescription,
        dateModified: new Date().toISOString().split('T')[0],
        author: { '@type': 'Organization', name: 'Review My Pay', url: 'https://reviewmypay.com' },
        publisher: { '@type': 'Organization', name: 'Review My Pay', url: 'https://reviewmypay.com' },
        mainEntityOfPage: `https://reviewmypay.com/awards/${awardSlug}/scenarios/${slug}`,
      }) }} />
    </div>
  );
}
