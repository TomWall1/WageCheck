'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useWageCheck } from '@/contexts/WageCheckContext';
import StepClassification from '@/components/steps/StepClassification';

export default function RolePage() {
  const router = useRouter();
  const { awardCode, state, prefetchedQuestions, setClassificationAnswers, setClassificationResult, nextStep, prevStep } = useWageCheck();

  useEffect(() => {
    if (!state.employmentType) router.replace('/check/employment');
  }, [state.employmentType, router]);

  if (!awardCode || !state.employmentType) return null;

  return (
    <StepClassification
      awardCode={awardCode}
      employmentType={state.employmentType}
      age={state.age}
      answers={state.classificationAnswers}
      prefetchedQuestions={prefetchedQuestions}
      onAnswersChange={setClassificationAnswers}
      onResult={setClassificationResult}
      onNext={nextStep}
      onBack={prevStep}
    />
  );
}
