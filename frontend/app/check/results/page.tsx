'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useWageCheck } from '@/contexts/WageCheckContext';
import StepResults from '@/components/steps/StepResults';

export default function ResultsPage() {
  const router = useRouter();
  const { state, setAmountActuallyPaid, handleStartOver } = useWageCheck();

  useEffect(() => {
    if (!state.calculationResult) router.replace('/check/shifts');
  }, [state.calculationResult, router]);

  if (!state.calculationResult || !state.employmentType) return null;

  return (
    <StepResults
      state={state}
      onAmountPaidChange={setAmountActuallyPaid}
      onStartOver={handleStartOver}
    />
  );
}
