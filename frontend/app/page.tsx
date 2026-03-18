'use client';

import { useState, useEffect } from 'react';
import { WageCheckState, EmploymentType, AllowanceAnswer } from '@/types';
import { api } from '@/lib/api';
import StepEmploymentType from '@/components/steps/StepEmploymentType';
import StepClassification from '@/components/steps/StepClassification';
import StepTimesheet from '@/components/steps/StepTimesheet';
import StepAllowances from '@/components/steps/StepAllowances';
import StepRightsSummary from '@/components/steps/StepRightsSummary';
import StepResults from '@/components/steps/StepResults';
import ProgressBar from '@/components/ui/ProgressBar';

const TOTAL_STEPS = 6;

const STEP_LABELS = [
  'Employment type',
  'Your role',
  'Your shifts',
  'Allowances',
  'Your rights',
  'Results',
];

const INITIAL_STATE: WageCheckState = {
  step: 1,
  employmentType: null,
  age: null,
  classificationAnswers: {},
  classificationResult: null,
  shifts: [],
  calculationResult: null,
  allowanceAnswers: [],
  amountActuallyPaid: '',
};

export default function HomePage() {
  const [state, setState] = useState<WageCheckState>(INITIAL_STATE);
  const [prefetchedQuestions, setPrefetchedQuestions] = useState<unknown[] | null>(null);

  // Warm up the backend and prefetch questions while user is on step 1
  useEffect(() => {
    api.getQuestions()
      .then((data: unknown) => setPrefetchedQuestions(data as unknown[]))
      .catch(() => { /* will fall back to fetching in StepClassification */ });
  }, []);

  function updateState(updates: Partial<WageCheckState>) {
    setState(prev => ({ ...prev, ...updates }));
  }

  function goToStep(step: number) {
    setState(prev => ({ ...prev, step }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function nextStep() {
    goToStep(state.step + 1);
  }

  function prevStep() {
    goToStep(state.step - 1);
  }

  return (
    <div className="space-y-6">
      {state.step > 1 && (
        <ProgressBar
          currentStep={state.step}
          totalSteps={TOTAL_STEPS}
          labels={STEP_LABELS}
        />
      )}

      {state.step === 1 && (
        <StepEmploymentType
          selected={state.employmentType}
          age={state.age}
          onSelect={(type: EmploymentType) => updateState({ employmentType: type })}
          onAgeChange={(age: number | null) => updateState({ age })}
          onNext={nextStep}
        />
      )}

      {state.step === 2 && state.employmentType && (
        <StepClassification
          employmentType={state.employmentType}
          age={state.age}
          answers={state.classificationAnswers}
          prefetchedQuestions={prefetchedQuestions}
          onAnswersChange={(answers) => updateState({ classificationAnswers: answers })}
          onResult={(result) => updateState({ classificationResult: result })}
          onNext={nextStep}
          onBack={prevStep}
        />
      )}

      {state.step === 3 && state.employmentType && state.classificationResult && (
        <StepTimesheet
          employmentType={state.employmentType}
          age={state.age}
          classificationResult={state.classificationResult}
          shifts={state.shifts}
          onShiftsChange={(shifts) => updateState({ shifts })}
          onResult={(result) => updateState({ calculationResult: result })}
          onNext={nextStep}
          onBack={prevStep}
        />
      )}

      {state.step === 4 && (
        <StepAllowances
          employmentType={state.employmentType!}
          answers={state.allowanceAnswers}
          onAnswersChange={(answers: AllowanceAnswer[]) => updateState({ allowanceAnswers: answers })}
          onNext={nextStep}
          onBack={prevStep}
        />
      )}

      {state.step === 5 && state.employmentType && state.classificationResult && (
        <StepRightsSummary
          employmentType={state.employmentType}
          classificationResult={state.classificationResult}
          onNext={nextStep}
          onBack={prevStep}
        />
      )}

      {state.step === 6 && state.calculationResult && state.employmentType && (
        <StepResults
          state={state}
          onAmountPaidChange={(amount) => updateState({ amountActuallyPaid: amount })}
          onStartOver={() => setState(INITIAL_STATE)}
        />
      )}
    </div>
  );
}
