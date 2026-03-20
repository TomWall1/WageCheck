'use client';

import { useState, useEffect } from 'react';
import { WageCheckState, EmploymentType, AllowanceAnswer, AwardCode } from '@/types';
import { api } from '@/lib/api';
import LandingPage from '@/components/LandingPage';
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
  awardCode: null,
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
  const [awardCode, setAwardCode] = useState<AwardCode | null>(null);
  const [state, setState] = useState<WageCheckState>(INITIAL_STATE);
  const [prefetchedQuestions, setPrefetchedQuestions] = useState<unknown[] | null>(null);

  // Warm up the backend and prefetch questions when award is selected
  useEffect(() => {
    if (!awardCode) return;
    setPrefetchedQuestions(null);
    api.getQuestions(awardCode)
      .then((data: unknown) => setPrefetchedQuestions(data as unknown[]))
      .catch(() => { /* will fall back to fetching in StepClassification */ });
  }, [awardCode]);

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

  function handleAwardSelect(code: AwardCode) {
    setAwardCode(code);
    setState({ ...INITIAL_STATE, awardCode: code });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleStartOver() {
    setAwardCode(null);
    setState(INITIAL_STATE);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Landing page — award selection
  if (!awardCode) {
    return <LandingPage onSelect={handleAwardSelect} />;
  }

  const AWARD_NAMES: Record<string, string> = {
    MA000009: 'Hospitality Award',
    MA000003: 'Fast Food Award',
    MA000119: 'Restaurant Industry Award',
    MA000004: 'Retail Award',
    MA000094: 'Fitness Industry Award',
    MA000080: 'Amusement & Events Award',
    MA000081: 'Live Performance Award',
    MA000084: 'Storage & Wholesale Award',
    MA000022: 'Cleaning Services Award',
    MA000028: 'Horticulture Award',
  };
  const awardName = AWARD_NAMES[awardCode] ?? awardCode;

  return (
    <div className="space-y-6">
      {/* Award label + restart */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: '1rem',
        borderBottom: '1.5px solid var(--border)',
        marginBottom: '1.5rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            fontSize: '10px',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#ffffff',
            background: 'var(--primary)',
            padding: '2px 7px',
            borderRadius: '4px',
          }}>
            {awardCode}
          </span>
          <span style={{ fontSize: '13px', color: 'var(--secondary-muted)' }}>{awardName}</span>
        </div>
        <button
          onClick={handleStartOver}
          style={{
            fontSize: '12px',
            color: 'var(--secondary-muted)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            textDecoration: 'underline',
            textUnderlineOffset: '2px',
          }}
          onMouseOver={e => (e.currentTarget.style.color = 'var(--secondary)')}
          onMouseOut={e => (e.currentTarget.style.color = 'var(--secondary-muted)')}
        >
          Change award
        </button>
      </div>

      <ProgressBar
        currentStep={state.step}
        totalSteps={TOTAL_STEPS}
        labels={STEP_LABELS}
      />

      {state.step === 1 && (
        <StepEmploymentType
          awardCode={awardCode}
          awardName={awardName}
          selected={state.employmentType}
          age={state.age}
          onSelect={(type: EmploymentType) => updateState({ employmentType: type })}
          onAgeChange={(age: number | null) => updateState({ age })}
          onNext={nextStep}
        />
      )}

      {state.step === 2 && state.employmentType && (
        <StepClassification
          awardCode={awardCode}
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
          awardCode={awardCode}
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
          awardCode={awardCode}
          employmentType={state.employmentType!}
          stream={state.classificationResult?.stream ?? null}
          answers={state.allowanceAnswers}
          onAnswersChange={(answers: AllowanceAnswer[]) => updateState({ allowanceAnswers: answers })}
          onNext={nextStep}
          onBack={prevStep}
        />
      )}

      {state.step === 5 && state.employmentType && state.classificationResult && (
        <StepRightsSummary
          awardCode={awardCode}
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
          onStartOver={handleStartOver}
        />
      )}
    </div>
  );
}
