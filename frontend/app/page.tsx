'use client';

import { useRouter } from 'next/navigation';
import LandingPage from '@/components/LandingPage';
import { AwardCode } from '@/types';

export default function HomePage() {
  const router = useRouter();

  function handleAwardSelect(code: AwardCode) {
    router.push(`/check/employment?award=${code}`);
  }

  return <LandingPage onSelect={handleAwardSelect} />;
}
