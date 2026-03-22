'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useWageCheck } from '@/contexts/WageCheckContext';
import StepRightsSummary from '@/components/steps/StepRightsSummary';

export default function RightsPage() {
  const router = useRouter();
  const { awardCode, state, nextStep, prevStep } = useWageCheck();

  useEffect(() => {
    if (!state.classificationResult) router.replace('/check/role');
  }, [state.classificationResult, router]);

  if (!awardCode || !state.employmentType || !state.classificationResult) return null;

  return (
    <StepRightsSummary
      awardCode={awardCode}
      employmentType={state.employmentType}
      classificationResult={state.classificationResult}
      onNext={nextStep}
      onBack={prevStep}
    />
  );
}
