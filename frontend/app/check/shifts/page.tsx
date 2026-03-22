'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useWageCheck } from '@/contexts/WageCheckContext';
import StepTimesheet from '@/components/steps/StepTimesheet';

export default function ShiftsPage() {
  const router = useRouter();
  const { awardCode, state, setShifts, setCalculationResult, nextStep, prevStep } = useWageCheck();

  useEffect(() => {
    if (!state.classificationResult) router.replace('/check/role');
  }, [state.classificationResult, router]);

  if (!awardCode || !state.employmentType || !state.classificationResult) return null;

  return (
    <StepTimesheet
      awardCode={awardCode}
      employmentType={state.employmentType}
      age={state.age}
      classificationResult={state.classificationResult}
      shifts={state.shifts}
      onShiftsChange={setShifts}
      onResult={setCalculationResult}
      onNext={nextStep}
      onBack={prevStep}
    />
  );
}
