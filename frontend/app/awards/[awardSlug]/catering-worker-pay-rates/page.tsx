import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAwardBySlug } from '@/lib/awards';
import { getRestaurantRates } from '@/lib/restaurant-rates';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import SubPageNav from '@/components/seo/SubPageNav';
import RestaurantCateringContent from '@/components/seo/restaurant-roles/RestaurantCateringContent';

interface Props { params: Promise<{ awardSlug: string }>; }

const h1Style: React.CSSProperties = {
  fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.5rem', fontWeight: 600,
  letterSpacing: '-0.03em', color: 'var(--secondary)', marginBottom: '8px',
};

export function generateStaticParams() {
  return [{ awardSlug: 'restaurant-award' }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { awardSlug } = await params;
  const award = getAwardBySlug(awardSlug);
  if (!award) return {};
  return {
    title: 'Catering Worker Pay Rates 2025–26 | Restaurant Award',
    description: 'Pay rates for catering workers under the Restaurant Award — when the Restaurant Award applies to catering, penalty rates, and common underpayments.',
  };
}

export default async function CateringWorkerPayRatesPage({ params }: Props) {
  const { awardSlug } = await params;
  const award = getAwardBySlug(awardSlug);
  if (!award || awardSlug !== 'restaurant-award') notFound();

  const rates = await getRestaurantRates();

  return (
    <div>
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Awards', href: '/awards' },
        { label: 'Restaurant Award', href: '/awards/restaurant-award' },
        { label: 'Catering Worker Pay Rates', href: '/awards/restaurant-award/catering-worker-pay-rates' },
      ]} />
      <SubPageNav awardSlug={awardSlug} />
      <h1 style={h1Style}>Catering Worker Pay Rates 2025&ndash;26</h1>
      <RestaurantCateringContent rates={rates} />
    </div>
  );
}
