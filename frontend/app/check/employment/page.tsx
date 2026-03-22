'use client';

import { useWageCheck } from '@/contexts/WageCheckContext';
import StepEmploymentType from '@/components/steps/StepEmploymentType';
import { EmploymentType } from '@/types';

export default function EmploymentPage() {
  const { awardCode, awardName, state, setEmploymentType, setAge, nextStep } = useWageCheck();

  if (!awardCode) return null;

  return (
    <StepEmploymentType
      awardCode={awardCode}
      awardName={awardName}
      selected={state.employmentType}
      age={state.age}
      onSelect={(type: EmploymentType) => setEmploymentType(type)}
      onAgeChange={(age: number | null) => setAge(age)}
      onNext={nextStep}
    />
  );
}
