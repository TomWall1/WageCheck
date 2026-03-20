export type EmploymentType = 'full_time' | 'part_time' | 'casual';
export type Stream = 'food_beverage' | 'kitchen' | 'front_office' | 'general';

export interface Classification {
  id: number;
  award_code: string;
  level: number;
  stream: Stream;
  title: string;
  description: string;
  duties: string[];
  indicative_tasks: string[];
  base_rate?: number;
}

export interface Shift {
  id: string;
  date: string;           // YYYY-MM-DD
  startTime: string;      // HH:MM
  endTime: string;        // HH:MM
  mealBreakTaken: boolean;
  mealBreakDuration: number;  // minutes
  restBreakTaken: boolean;
}

export interface ShiftSegment {
  dayType: string;
  dayLabel: string;
  multiplier: number;
  addition_per_hour: number;
  effectiveRate: number;
  rateLabel: string;
  missedBreakPenalty: boolean;
  baseRate: number;
  minutes: number;
  hours: number;
  pay: number;
}

export interface ShiftResult {
  date: string;
  startTime: string;
  endTime: string;
  workedHours: number;
  ordinaryPay: number;
  penaltyExtra: number;
  missedBreakExtra: number;
  totalPay: number;
  mealBreakMinutes: number;
  restBreakTaken: boolean;
  segments: ShiftSegment[];
  breakViolations: Array<{
    type: string;
    severity: string;
    message: string;
    entitlement: string;
  }>;
}

export interface SuperBreakdownRow {
  rateLabel: string;
  effectiveRate: number | null;
  hours: number;
  totalPay: number;
  superApplies: boolean;
  superRate: number;
  superAmount: number;
}

export interface CalculationResult {
  baseHourlyRate: number;
  employmentType: EmploymentType;
  effectiveDate: string;
  shifts: ShiftResult[];
  summary: {
    totalWorkedHours: number;
    ordinaryPay: number;
    penaltyPay: number;
    missedBreakPay: number;
    overtimePay: number;
    overtimeMinutes: number;
    mealAllowancePay: number;
    mealAllowancesOwed: number;
    mealAllowanceRate: number;
    totalPayOwed: number;
    superEligiblePay: number;
    superAmount: number;
    sgcRate: number;
    superBreakdown: SuperBreakdownRow[];
    overtimeBreakdown: unknown[];
    allBreakViolations: Array<{
      type: string;
      severity: string;
      message: string;
      entitlement: string;
      date: string;
    }>;
  };
}

export interface AllowanceAnswer {
  type: string;
  triggered: boolean;
  detail?: string;
}

export interface ClassificationOutcome {
  level: number | null;
  stream: string | null;
  classification: {
    id: number;
    title: string;
    description?: string;
    duties?: string[];
    indicative_tasks?: string[];
    base_rate?: number;
    level?: number;
    stream?: string;
    rate_effective_date?: string;
  } | null;
  rationale: string | null;
  confidence: string;
}

export type AwardCode = 'MA000009' | 'MA000003' | 'MA000119' | 'MA000004' | 'MA000094' | 'MA000080' | 'MA000081' | 'MA000084' | 'MA000022' | 'MA000028' | 'MA000033' | 'MA000002' | 'MA000104';

export interface WageCheckState {
  step: number;
  awardCode: AwardCode | null;
  employmentType: EmploymentType | null;
  age: number | null;
  classificationAnswers: Record<string, string>;
  classificationResult: ClassificationOutcome | null;
  shifts: Shift[];
  calculationResult: CalculationResult | null;
  allowanceAnswers: AllowanceAnswer[];
  amountActuallyPaid: string;   // user-entered, for underpayment comparison
}

export interface AllowanceInfo {
  id: number;
  allowance_type: string;
  name: string;
  description: string;
  trigger_condition: string;
  amount: number | null;
  amount_type: string;
  per_unit: string | null;
  is_all_purpose: boolean;
  effective_date: string;
}

export interface ContentBlock {
  block_key: string;
  title: string | null;
  body: string;
  content_type: string;
}
