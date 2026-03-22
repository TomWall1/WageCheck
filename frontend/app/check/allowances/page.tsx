'use client';

import { useWageCheck } from '@/contexts/WageCheckContext';
import StepAllowances from '@/components/steps/StepAllowances';
import { AllowanceAnswer } from '@/types';

export default function AllowancesPage() {
  const { awardCode, state, setAllowanceAnswers, nextStep, prevStep } = useWageCheck();

  if (!awardCode || !state.employmentType) return null;

  return (
    <StepAllowances
      awardCode={awardCode}
      employmentType={state.employmentType}
      stream={state.classificationResult?.stream ?? null}
      answers={state.allowanceAnswers}
      onAnswersChange={(answers: AllowanceAnswer[]) => setAllowanceAnswers(answers)}
      onNext={nextStep}
      onBack={prevStep}
    />
  );
}
