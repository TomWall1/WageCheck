import type { Metadata } from 'next';
import { Suspense } from 'react';
import GuidesIndex from './GuidesIndex';

export const metadata: Metadata = {
  title: 'Workplace Rights Guides — Pay, Awards & Entitlements | Review My Pay',
  description: 'Plain-English guides to Australian workplace rights: modern awards, penalty rates, casual loading, overtime, wage theft, and how to check if you\'re being underpaid.',
  keywords: ['workplace rights australia', 'modern award guide', 'penalty rates explained', 'casual loading', 'overtime australia'],
};

export default function GuidesPage() {
  return (
    <Suspense>
      <GuidesIndex />
    </Suspense>
  );
}
