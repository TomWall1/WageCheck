import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAwardBySlug } from '@/lib/awards';
import { getRestaurantRates } from '@/lib/restaurant-rates';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import SubPageNav from '@/components/seo/SubPageNav';
import RestaurantCafeWorkerContent from '@/components/seo/restaurant-roles/RestaurantCafeWorkerContent';

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
    title: 'Café Worker Pay Rates 2025–26 | Restaurant Award',
    description: 'Pay rates for café workers under the Restaurant Award — Sunday rates, classification levels, and the most common reason standalone café workers are underpaid.',
  };
}

export default async function CafeWorkerPayRatesPage({ params }: Props) {
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
        { label: 'Café Worker Pay Rates', href: '/awards/restaurant-award/cafe-worker-pay-rates' },
      ]} />
      <SubPageNav awardSlug={awardSlug} />
      <h1 style={h1Style}>Café Worker Pay Rates Australia 2025&ndash;26</h1>
      <RestaurantCafeWorkerContent rates={rates} />
    </div>
  );
}
