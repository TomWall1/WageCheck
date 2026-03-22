'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { WageCheckState, EmploymentType, AllowanceAnswer, AwardCode, ClassificationOutcome, CalculationResult, Shift } from '@/types';
import { api } from '@/lib/api';

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
  MA000033: 'Nursery Industry Award',
  MA000002: 'Clerks Award',
  MA000104: 'Miscellaneous Award',
  MA000013: 'Racing Clubs Events Award',
  MA000030: 'Market & Social Research Award',
  MA000063: 'Passenger Vehicle Transportation Award',
  MA000095: 'Car Parking Award',
  MA000105: 'Funeral Industry Award',
  MA000101: 'Gardening & Landscaping Award',
};

export const STEP_PATHS = [
  '/check/employment',
  '/check/role',
  '/check/shifts',
  '/check/allowances',
  '/check/rights',
  '/check/results',
];

export const STEP_LABELS = [
  'Employment type',
  'Your role',
  'Your shifts',
  'Allowances',
  'Your rights',
  'Results',
];

export const TOTAL_STEPS = 6;

interface WageCheckContextValue {
  awardCode: AwardCode | null;
  awardName: string;
  currentStep: number;
  state: WageCheckState;
  prefetchedQuestions: unknown[] | null;
  updateState: (updates: Partial<WageCheckState>) => void;
  setEmploymentType: (type: EmploymentType) => void;
  setAge: (age: number | null) => void;
  setClassificationAnswers: (answers: Record<string, string>) => void;
  setClassificationResult: (result: ClassificationOutcome) => void;
  setShifts: (shifts: Shift[]) => void;
  setCalculationResult: (result: CalculationResult) => void;
  setAllowanceAnswers: (answers: AllowanceAnswer[]) => void;
  setAmountActuallyPaid: (amount: string) => void;
  nextStep: () => void;
  prevStep: () => void;
  handleStartOver: () => void;
}

const WageCheckContext = createContext<WageCheckContextValue | null>(null);

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

export function WageCheckProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [awardCode, setAwardCode] = useState<AwardCode | null>(null);
  const [state, setState] = useState<WageCheckState>(INITIAL_STATE);
  const [prefetchedQuestions, setPrefetchedQuestions] = useState<unknown[] | null>(null);

  // Initialize award from URL param on first mount
  useEffect(() => {
    const award = searchParams.get('award');
    if (award && !awardCode) {
      const code = award as AwardCode;
      setAwardCode(code);
      setState({ ...INITIAL_STATE, awardCode: code });
    }
  }, [searchParams, awardCode]);

  // Prefetch classification questions when award is set
  useEffect(() => {
    if (!awardCode) return;
    setPrefetchedQuestions(null);
    api.getQuestions(awardCode)
      .then((data: unknown) => setPrefetchedQuestions(data as unknown[]))
      .catch(() => {});
  }, [awardCode]);

  // Redirect to landing if no award selected
  useEffect(() => {
    if (!awardCode && !searchParams.get('award')) {
      router.replace('/');
    }
  }, [awardCode, searchParams, router]);

  const currentStep = STEP_PATHS.indexOf(pathname) + 1 || 1;

  const awardName = awardCode ? (AWARD_NAMES[awardCode] ?? awardCode) : '';

  const updateState = useCallback((updates: Partial<WageCheckState>) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  const nextStep = useCallback(() => {
    const nextIdx = STEP_PATHS.indexOf(pathname) + 1;
    if (nextIdx < STEP_PATHS.length) {
      router.push(STEP_PATHS[nextIdx]);
    }
  }, [pathname, router]);

  const prevStep = useCallback(() => {
    router.back();
  }, [router]);

  const handleStartOver = useCallback(() => {
    setAwardCode(null);
    setState(INITIAL_STATE);
    setPrefetchedQuestions(null);
    router.push('/');
  }, [router]);

  const value: WageCheckContextValue = {
    awardCode,
    awardName,
    currentStep,
    state: { ...state, step: currentStep, awardCode },
    prefetchedQuestions,
    updateState,
    setEmploymentType: (type) => updateState({ employmentType: type }),
    setAge: (age) => updateState({ age }),
    setClassificationAnswers: (answers) => updateState({ classificationAnswers: answers }),
    setClassificationResult: (result) => updateState({ classificationResult: result }),
    setShifts: (shifts) => updateState({ shifts }),
    setCalculationResult: (result) => updateState({ calculationResult: result }),
    setAllowanceAnswers: (answers) => updateState({ allowanceAnswers: answers }),
    setAmountActuallyPaid: (amount) => updateState({ amountActuallyPaid: amount }),
    nextStep,
    prevStep,
    handleStartOver,
  };

  return (
    <WageCheckContext.Provider value={value}>
      {children}
    </WageCheckContext.Provider>
  );
}

export function useWageCheck() {
  const ctx = useContext(WageCheckContext);
  if (!ctx) throw new Error('useWageCheck must be used within WageCheckProvider');
  return ctx;
}
