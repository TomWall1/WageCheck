'use client';

import { useEffect, useState } from 'react';
import { EmploymentType } from '@/types';
import { api } from '@/lib/api';
import clsx from 'clsx';

interface Question {
  id: number;
  question_key: string;
  question_text: string;
  help_text: string | null;
  question_type: string;
  stream: string | null;
  parent_question_key: string | null;
  parent_answer_key: string | null;
  sort_order: number;
  answers: Array<{
    id: number;
    answer_key: string;
    answer_text: string;
    sort_order: number;
  }>;
}

interface ClassificationFull {
  id: number;
  level: number;
  stream: string;
  title: string;
  description: string;
  duties: string[];
  indicative_tasks: string[];
}

interface PayRateRow {
  rate_type: string;
  rate_amount: string;
  effective_date: string;
}

interface ClassificationResult {
  level: number | null;
  stream: string | null;
  classification: {
    id: number;
    title: string;
    description: string;
    duties: string[];
    indicative_tasks: string[];
    base_rate?: number;
    level: number;
    stream: string;
    rate_effective_date?: string;
  } | null;
  rationale: string | null;
  confidence: string;
}

interface Props {
  awardCode: string;
  employmentType: EmploymentType;
  age: number | null;
  answers: Record<string, string>;
  prefetchedQuestions?: unknown[] | null;
  onAnswersChange: (answers: Record<string, string>) => void;
  onResult: (result: ClassificationResult) => void;
  onNext: () => void;
  onBack: () => void;
}

const STREAM_LABELS: Record<string, string> = {
  food_beverage: 'Food & Beverage',
  kitchen: 'Kitchen',
  front_office: 'Front Office',
  general: 'General',
  solo: 'Working alone',
  responsible: 'Responsible for 2+ employees',
  introductory: 'Introductory',
  retail: 'Retail',
  fitness: 'Fitness Industry',
  cleaning: 'Cleaning',
  storeworker: 'Storeworker / Wholesale',
  dancer: 'Company Dancer',
  touring_sl: 'Touring Sound & Lighting',
  exhibition: 'Exhibition',
  horticulture: 'Horticulture',
  nursery: 'Nursery',
  clerical: 'Clerical / Administrative',
  call_centre: 'Call Centre',
  racecourse: 'Racecourse Attendant',
  official: 'Raceday Official',
  liquor: 'Liquor Employee',
  research: 'Market & Social Research',
  transport: 'Passenger Vehicle Transport',
  car_parking: 'Car Parking',
  funeral: 'Funeral Industry',
  landscaping: 'Gardening & Landscaping',
  cinema: 'Cinema',
  tv_broadcasting: 'TV Broadcasting',
  radio: 'Radio Broadcasting',
  motion_picture: 'Motion Picture Production',
  journalist: 'Journalism',
  real_estate: 'Real Estate',
  security: 'Security Services',
  graduate: 'Graduates of Architecture',
  registered: 'Registered Architects',
  student: 'Students of Architecture',
  bachelor_pathway: "Bachelor's Pathway to Master",
};

const STREAM_ORDER_MA000009 = ['kitchen', 'food_beverage', 'front_office', 'general'];
const STREAM_ORDER_MA000003 = ['general', 'solo', 'responsible'];
const STREAM_ORDER_MA000119 = ['introductory', 'food_beverage', 'kitchen', 'general'];
const STREAM_ORDER_MA000004 = ['retail'];
const STREAM_ORDER_MA000094 = ['fitness'];
const STREAM_ORDER_MA000080 = ['general', 'exhibition'];
const STREAM_ORDER_MA000081 = ['general', 'touring_sl', 'dancer'];
const STREAM_ORDER_MA000084 = ['storeworker'];
const STREAM_ORDER_MA000022 = ['cleaning'];
const STREAM_ORDER_MA000028 = ['horticulture'];
const STREAM_ORDER_MA000033 = ['nursery'];
const STREAM_ORDER_MA000002 = ['clerical', 'call_centre'];
const STREAM_ORDER_MA000104 = ['general'];
const STREAM_ORDER_MA000013 = ['racecourse', 'official', 'liquor'];
const STREAM_ORDER_MA000030 = ['research'];
const STREAM_ORDER_MA000063 = ['transport'];
const STREAM_ORDER_MA000095 = ['car_parking'];
const STREAM_ORDER_MA000105 = ['funeral'];
const STREAM_ORDER_MA000101 = ['landscaping'];
const STREAM_ORDER_MA000091 = ['cinema', 'tv_broadcasting', 'radio', 'motion_picture', 'journalist'];
const STREAM_ORDER_MA000106 = ['real_estate'];
const STREAM_ORDER_MA000079 = ['graduate', 'registered', 'student', 'bachelor_pathway'];
const STREAM_ORDER_MA000016 = ['security'];

export default function StepClassification({ awardCode, employmentType, age, answers, prefetchedQuestions, onAnswersChange, onResult, onNext, onBack }: Props) {
  const isFF = awardCode === 'MA000003';
  const isRest = awardCode === 'MA000119';
  const isRetail = awardCode === 'MA000004';
  const isFitness = awardCode === 'MA000094';
  const isAmusement = awardCode === 'MA000080';
  const isLivePerf = awardCode === 'MA000081';
  const isStorage = awardCode === 'MA000084';
  const isCleaning = awardCode === 'MA000022';
  const isHort = awardCode === 'MA000028';
  const isNursery = awardCode === 'MA000033';
  const isClerks = awardCode === 'MA000002';
  const isMisc = awardCode === 'MA000104';
  const isRacing = awardCode === 'MA000013';
  const isResearch = awardCode === 'MA000030';
  const isTransport = awardCode === 'MA000063';
  const isCarParking = awardCode === 'MA000095';
  const isFuneral = awardCode === 'MA000105';
  const isLandscaping = awardCode === 'MA000101';
  const isBREC = awardCode === 'MA000091';
  const isRE = awardCode === 'MA000106';
  const isArch = awardCode === 'MA000079';
  const isSec = awardCode === 'MA000016';
  const isParentGated = isFF || isRest || isRetail || isFitness || isAmusement || isLivePerf || isStorage || isCleaning || isHort || isNursery || isClerks || isMisc || isRacing || isResearch || isTransport || isCarParking || isFuneral || isLandscaping || isBREC || isRE || isArch || isSec;
  const STREAM_ORDER = isFF ? STREAM_ORDER_MA000003
    : isRest ? STREAM_ORDER_MA000119
    : isRetail ? STREAM_ORDER_MA000004
    : isFitness ? STREAM_ORDER_MA000094
    : isAmusement ? STREAM_ORDER_MA000080
    : isLivePerf ? STREAM_ORDER_MA000081
    : isStorage ? STREAM_ORDER_MA000084
    : isCleaning ? STREAM_ORDER_MA000022
    : isHort ? STREAM_ORDER_MA000028
    : isNursery ? STREAM_ORDER_MA000033
    : isClerks ? STREAM_ORDER_MA000002
    : isMisc ? STREAM_ORDER_MA000104
    : isRacing ? STREAM_ORDER_MA000013
    : isResearch ? STREAM_ORDER_MA000030
    : isTransport ? STREAM_ORDER_MA000063
    : isCarParking ? STREAM_ORDER_MA000095
    : isFuneral ? STREAM_ORDER_MA000105
    : isLandscaping ? STREAM_ORDER_MA000101
    : isBREC ? STREAM_ORDER_MA000091
    : isRE ? STREAM_ORDER_MA000106
    : isArch ? STREAM_ORDER_MA000079
    : isSec ? STREAM_ORDER_MA000016
    : STREAM_ORDER_MA000009;
  const awardShortName = isFF ? 'Fast Food Award'
    : isRest ? 'Restaurant Industry Award'
    : isRetail ? 'Retail Award'
    : isFitness ? 'Fitness Industry Award'
    : isAmusement ? 'Amusement, Events & Recreation Award'
    : isLivePerf ? 'Live Performance Award'
    : isStorage ? 'Storage Services & Wholesale Award'
    : isCleaning ? 'Cleaning Services Award'
    : isHort ? 'Horticulture Award'
    : isNursery ? 'Nursery Industry Award'
    : isClerks ? 'Clerks Award'
    : isMisc ? 'Miscellaneous Award'
    : isRacing ? 'Racing Clubs Events Award'
    : isResearch ? 'Market & Social Research Award'
    : isTransport ? 'Passenger Vehicle Transportation Award'
    : isCarParking ? 'Car Parking Award'
    : isFuneral ? 'Funeral Industry Award'
    : isLandscaping ? 'Gardening & Landscaping Award'
    : isBREC ? 'Broadcasting & Cinemas Award'
    : isRE ? 'Real Estate Award'
    : isArch ? 'Architects Award'
    : isSec ? 'Security Services Award'
    : 'Hospitality Award';
  // Which path the user chose
  const [knowsClassification, setKnowsClassification] = useState<boolean | null>(null);

  // Direct-select path state
  const [allClassifications, setAllClassifications] = useState<ClassificationFull[]>([]);
  const [selectedClassId, setSelectedClassId] = useState<number | ''>('');
  const [directLoading, setDirectLoading] = useState(false);
  const [directResult, setDirectResult] = useState<ClassificationResult | null>(null);

  // Questionnaire path state
  const [questions, setQuestions] = useState<Question[]>(
    prefetchedQuestions ? (prefetchedQuestions as Question[]) : []
  );
  const [questionsLoading, setQuestionsLoading] = useState(!prefetchedQuestions);
  const [classifying, setClassifying] = useState(false);
  const [questionResult, setQuestionResult] = useState<ClassificationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch questions if not prefetched
  useEffect(() => {
    if (prefetchedQuestions) return;
    api.getQuestions(awardCode)
      .then((data: unknown) => setQuestions(data as Question[]))
      .catch(() => setError('Could not load questions. Please check your connection.'))
      .finally(() => setQuestionsLoading(false));
  }, [prefetchedQuestions, awardCode]);

  // Fetch all classifications when user selects "yes, I know"
  async function handleKnowsAnswer(knows: boolean) {
    setKnowsClassification(knows);
    if (knows && allClassifications.length === 0) {
      setDirectLoading(true);
      try {
        const data = await api.getClassifications(undefined, awardCode) as ClassificationFull[];
        setAllClassifications(data);
      } catch {
        setError('Could not load classifications. Please check your connection.');
      } finally {
        setDirectLoading(false);
      }
    }
  }

  // Confirm a directly selected classification
  async function handleConfirmDirect() {
    if (!selectedClassId) return;
    setDirectLoading(true);
    setError(null);
    try {
      const ratesData = await api.getRates(selectedClassId as number, employmentType, awardCode) as PayRateRow[];
      const baseRateRow = ratesData
        .filter(r => r.rate_type === 'base_hourly')
        .sort((a, b) => b.effective_date.localeCompare(a.effective_date))[0];
      const cls = allClassifications.find(c => c.id === selectedClassId);
      if (!cls) return;
      const res: ClassificationResult = {
        level: cls.level,
        stream: cls.stream,
        classification: {
          id: cls.id,
          title: cls.title,
          description: cls.description,
          duties: cls.duties,
          indicative_tasks: cls.indicative_tasks,
          base_rate: baseRateRow ? parseFloat(baseRateRow.rate_amount) : undefined,
          level: cls.level,
          stream: cls.stream,
          rate_effective_date: baseRateRow?.effective_date,
        },
        rationale: 'Classification selected directly by user',
        confidence: 'high',
      };
      setDirectResult(res);
      onResult(res);
    } catch {
      setError('Could not fetch rate for this classification. Please try again.');
    } finally {
      setDirectLoading(false);
    }
  }

  // Questionnaire helpers
  const selectedStream = answers.stream;

  const visibleQuestions = questions.filter(q => {
    if (isParentGated) {
      // MA000003 & MA000119: parent-based gating
      if (q.parent_question_key) {
        return answers[q.parent_question_key] === q.parent_answer_key;
      }
      return true;
    }
    // MA000009: stream-based gating
    if (q.question_key === 'stream') return true;
    if (!selectedStream) return false;
    if (q.stream === null) return true;
    return q.stream === selectedStream;
  });

  function handleAnswer(questionKey: string, answerKey: string) {
    const newAnswers = { ...answers, [questionKey]: answerKey };
    // Reset any child questions when a parent question changes
    const childKeys = questions
      .filter(q => q.parent_question_key === questionKey)
      .map(q => q.question_key);
    childKeys.forEach(k => delete newAnswers[k]);
    // MA000009: also reset stream-specific answers when stream changes
    if (questionKey === 'stream') {
      const keysToReset = Object.keys(newAnswers).filter(
        k => k !== 'stream' && k !== 'experience' && !childKeys.includes(k)
      );
      keysToReset.forEach(k => delete newAnswers[k]);
    }
    onAnswersChange(newAnswers);
    setQuestionResult(null);
  }

  async function handleClassify() {
    setClassifying(true);
    setError(null);
    try {
      const res = await api.classify(answers, employmentType, awardCode) as ClassificationResult;
      setQuestionResult(res);
      onResult(res);
    } catch {
      setError('Could not determine classification. Please try again.');
    } finally {
      setClassifying(false);
    }
  }

  const streamQuestions = visibleQuestions.filter(q => q.question_key !== 'stream');
  const answeredStreamQuestions = streamQuestions.filter(q => answers[q.question_key]);
  const canClassify = isParentGated
    ? visibleQuestions.length > 0 && visibleQuestions.every(q => answers[q.question_key])
    : (selectedStream && streamQuestions.length > 0 &&
        answeredStreamQuestions.length >= Math.min(streamQuestions.length, 2));

  // ── Shared result display ───────────────────────────────────────────────────
  const activeResult = directResult || questionResult;

  function renderRateBox(result: ClassificationResult) {
    if (!result.classification?.base_rate) return null;
    const effectiveDate = result.classification.rate_effective_date
      ? new Date(result.classification.rate_effective_date).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })
      : '1 July 2025';

    // MA000013 liquor: all-in casual rate — no loading display, no junior multiplier
    if (isRacing && result.classification.stream === 'liquor') {
      return (
        <div className="bg-white rounded-lg p-4 border border-brand-200 space-y-1">
          <p className="text-sm text-gray-600">Your all-inclusive hourly rate (Mon–Sat)</p>
          <p className="text-3xl font-bold text-gray-900">
            ${Number(result.classification.base_rate).toFixed(2)}
            <span className="text-lg text-gray-500 font-normal">/hr</span>
          </p>
          <p className="text-sm text-gray-500">All-inclusive rate — casual loading, leave, and weekend penalties are already built in (clause 12.9).</p>
          <p className="text-xs text-gray-400">Effective {effectiveDate} — verify at fairwork.gov.au</p>
        </div>
      );
    }

    // MA000013 non-liquor under-19: junior rate = 75% of introductory FT rate ($24.28 × 0.75 = $18.21)
    if (isRacing && age && age < 19) {
      const INTRO_FT = 24.28;
      const juniorFT = INTRO_FT * 0.75;
      const displayRate = employmentType === 'casual' ? juniorFT * 1.25 : juniorFT;
      return (
        <div className="bg-white rounded-lg p-4 border border-brand-200 space-y-1">
          <p className="text-sm text-gray-600">Your minimum hourly rate (under-19 junior)</p>
          <p className="text-3xl font-bold text-gray-900">
            ${displayRate.toFixed(2)}
            <span className="text-lg text-gray-500 font-normal">/hr</span>
          </p>
          <p className="text-sm text-warning-700">Junior rate: 75% of the introductory rate (${INTRO_FT.toFixed(2)}/hr), regardless of your grade.</p>
          {employmentType === 'casual' && (
            <p className="text-sm text-gray-500">Includes the 25% casual loading (base: ${juniorFT.toFixed(2)}/hr + 25%).</p>
          )}
          <p className="text-xs text-gray-400">Effective {effectiveDate} — verify at fairwork.gov.au</p>
        </div>
      );
    }

    const JUNIOR_DEFAULT: Record<number, number> = { 15: 0.40, 16: 0.50, 17: 0.60, 18: 0.70, 19: 0.80, 20: 0.90 };
    const JUNIOR_MA000004: Record<number, number> = { 15: 0.45, 16: 0.50, 17: 0.60, 18: 0.70, 19: 0.80, 20: 0.90 };
    const JUNIOR_MA000002: Record<number, number> = { 15: 0.45, 16: 0.50, 17: 0.60, 18: 0.70, 19: 0.80, 20: 0.90 };
    const JUNIOR_MA000119: Record<number, number> = { 17: 0.60, 18: 0.70, 19: 0.85 };
    const JUNIOR_MA000094: Record<number, number> = { 17: 0.65, 18: 0.75, 19: 0.85 };
    const JUNIOR_MA000028: Record<number, number> = { 15: 0.50, 16: 0.60, 17: 0.70, 18: 0.80, 19: 0.90 };
    const JUNIOR_MA000033: Record<number, number> = { 15: 0.50, 16: 0.60, 17: 0.70, 18: 0.80, 19: 0.90 };
    const JUNIOR_MA000104: Record<number, number> = { 15: 0.368, 16: 0.473, 17: 0.578, 18: 0.683, 19: 0.825, 20: 0.977 };
    const JUNIOR_MA000091: Record<number, number> = { 16: 0.507, 17: 0.620, 18: 0.733, 19: 0.846, 20: 0.958 };
    const JUNIOR_MA000106: Record<number, number> = { 19: 0.70, 20: 0.80 };
    const juniorTable = isRest ? JUNIOR_MA000119 : isRetail ? JUNIOR_MA000004 : isClerks ? JUNIOR_MA000002 : isFitness ? JUNIOR_MA000094 : isHort ? JUNIOR_MA000028 : isNursery ? JUNIOR_MA000033 : isMisc ? JUNIOR_MA000104 : isBREC ? JUNIOR_MA000091 : isRE ? JUNIOR_MA000106 : JUNIOR_DEFAULT;
    const juniorCutoff = (isRest || isFitness) ? 20 : (isMisc || isBREC || isRE) ? 21 : 21;
    const juniorMult = isArch ? 1.0 : isSec ? 1.0 : (age && age < juniorCutoff) ? (juniorTable[age] ?? (isRest ? 0.50 : isFitness ? 0.55 : (isRetail || isClerks) ? 0.45 : (isHort || isNursery) ? 0.50 : isMisc ? 0.368 : isBREC ? 0.507 : isRE ? 0.70 : 0.40)) : 1.0;
    const displayRate = Number(result.classification.base_rate) * juniorMult;
    return (
      <div className="bg-white rounded-lg p-4 border border-brand-200 space-y-1">
        <p className="text-sm text-gray-600">Your minimum hourly rate</p>
        <p className="text-3xl font-bold text-gray-900">
          ${displayRate.toFixed(2)}
          <span className="text-lg text-gray-500 font-normal">/hr</span>
        </p>
        {employmentType === 'casual' && (
          <p className="text-sm text-gray-500">Includes the 25% casual loading (base: ${(Number(result.classification.base_rate) / 1.25 * juniorMult).toFixed(2)}/hr + 25%).</p>
        )}
        {juniorMult < 1.0 && (
          <p className="text-sm text-warning-700">
            Junior rate applied: {Math.round(juniorMult * 100)}% of adult rate (${Number(result.classification.base_rate).toFixed(2)}/hr).
          </p>
        )}
        <p className="text-xs text-gray-400">Effective {effectiveDate} — verify at fairwork.gov.au</p>
      </div>
    );
  }

  function renderResultCard(result: ClassificationResult, isDirectPick: boolean) {
    if (!result.classification) return null;
    return (
      <div className="space-y-4">
        <div className="card border-brand-200 bg-brand-50 space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold uppercase tracking-wide text-brand-600 bg-brand-100 px-2 py-1 rounded">
                {(isFitness || isRacing)
                  ? (STREAM_LABELS[result.stream || ''] || result.stream)
                  : `${STREAM_LABELS[result.stream || ''] || result.stream} — Level ${result.level}`}
              </span>
            </div>
            <h3 className="text-xl font-bold text-gray-900">{result.classification.title}</h3>
          </div>

          <p className="text-gray-700">{result.classification.description}</p>

          {result.classification.duties && result.classification.duties.length > 0 && (
            <div>
              <p className="font-semibold text-gray-900 text-sm mb-2">Typical duties at this level:</p>
              <ul className="space-y-1">
                {result.classification.duties.slice(0, 5).map((duty, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-brand-500 mt-0.5 shrink-0">•</span>
                    {duty}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {renderRateBox(result)}
        </div>

        {!isDirectPick && (
          <div className="warning-box text-sm space-y-2">
            <p>
              <strong>Important:</strong> This is based on what you've told us about your actual duties.
              The level on your contract or payslip might be different.
            </p>
            <p>
              If your employer has classified you at a <em>lower</em> level than your duties suggest,
              you may be owed back pay at the higher rate. This is worth raising with the Fair Work Ombudsman.
            </p>
            {result.confidence !== 'high' && (
              <p>
                We weren't completely certain about your level — the result above is our best estimate.
                If it doesn't sound right, try adjusting your answers above.
              </p>
            )}
          </div>
        )}

        <div className="flex gap-3">
          <button onClick={onBack} className="btn-secondary flex-1">← Back</button>
          <button onClick={onNext} className="btn-primary flex-1">Next — Enter your shifts →</button>
        </div>
      </div>
    );
  }

  // ── Phase 0: loading ────────────────────────────────────────────────────────
  if (questionsLoading && knowsClassification === false) {
    return <div className="text-center py-12 text-gray-500">Loading...</div>;
  }

  // ── Phase 1: initial choice ─────────────────────────────────────────────────
  if (knowsClassification === null) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-900">Your role</h2>
          <p className="text-gray-600">
            Under the {awardShortName}, your pay rate depends on your{' '}
            <strong>classification level</strong>.
            {isFF
              ? ' Levels run from Grade 1 (entry level) to Grade 3 (experienced/supervising).'
              : isRest
                ? ' Levels run from Introductory (new starters) to Level 6 (specialist tradespeople).'
                : isRetail
                  ? ' Levels run from Level 1 (new starters) to Level 8 (senior management).'
                  : isFitness
                    ? ' Levels run from Level 1 (new starters) to Level 7 (centre managers). Levels 3A and 4A recognise formal qualifications (Cert III and Cert IV).'
                    : isAmusement
                      ? ' Levels run from Introductory (first month) to Grade 10 (general manager). Exhibition employees have a separate grade scale.'
                      : isLivePerf
                        ? ' Production & support staff run from Level 1 to Level 9 (Technical Manager). Touring sound & lighting staff have their own level scale. Company dancers have separate levels.'
                        : isStorage
                          ? ' Grades run from Grade 1 (entry level, 3 sub-levels by tenure) to Grade 4 (most senior).'
                          : isCleaning
                            ? ' Levels run from Level 1 (general cleaning) to Level 3 (highly specialised or high-access work).'
                            : isHort
                              ? ' Levels run from Level 1 (entry level) to Level 5 (foreperson/specialist).'
                              : isNursery
                                ? ' Levels run from Grade 1A (entry level) to Grade 6 (foreperson/specialist). Grades 1A and 1B cover entry-level workers; Grades 2–6 reflect increasing skill and responsibility.'
                                : isClerks
                                  ? ' Levels run from Level 1 Year 1 (new starters) to Level 5 (office/section managers). Call centre specialists have separate Principal and Technical Specialist classifications.'
                                  : isMisc
                                    ? ' Levels run from Level 1 (new starters, under 3 months) to Level 4 (advanced trade or sub-professional). Levels 1–2 are based on tenure; Levels 3–4 require trade qualifications.'
                                    : isRacing
                                      ? ' Racecourse Attendants: Introductory + Grades 1–4. Raceday Officials: Grades 1–4. Liquor employees (bar, cashier, glass collectors) always work as casuals on all-inclusive rates.'
                                      : isBREC
                                        ? ' Five streams: Cinema (Levels 1–7), TV Broadcasting (Levels 1–13), Radio (Levels 1–6), Motion Picture Production (Levels 1–10), and Journalism (Levels 1–11).'
                                        : isRE
                                          ? ' Levels run from Level 1 (associate) to Level 5 (in-charge).'
                                          : isArch
                                            ? ' Classifications include graduates (Levels 1–4), registered architects (Levels 1–3), students (Levels 1–6), and bachelor pathway (Levels 1–3).'
                                            : isSec
                                              ? ' Levels run from Level 1 (entry-level officer) to Level 5 (supervisor/controller).'
                                              : ' Levels run from 1 (entry level) to 5 (senior/management).'}
          </p>
        </div>

        <div className="card space-y-4">
          <p className="font-semibold text-gray-900">Do you know your classification level?</p>
          <p className="text-sm text-gray-500">
            Your classification is sometimes listed on your payslip, contract, or letter of engagement.
            {isFF
              ? ' It might say something like "Grade 1" or "Fast Food Employee Grade 2".'
              : isRest
                ? ' It might say something like "Introductory" or "Food and Beverage Attendant Grade 3".'
                : isRetail
                  ? ' It might say something like "Retail Employee Level 2" or "Level 3".'
                  : isFitness
                    ? ' It might say something like "Fitness Industry Employee Level 3A" or "Level 4A".'
                    : isAmusement
                      ? ' It might say something like "Grade 2" or "Amusement Employee Grade 5".'
                      : isLivePerf
                        ? ' It might say something like "Production & Support Employee Level 3" or "Touring S&L Level 2".'
                        : isStorage
                          ? ' It might say something like "Grade 1" or "Storeworker Grade 2".'
                          : isCleaning
                            ? ' It might say something like "Cleaning Service Employee Level 1" or "Level 2".'
                            : isHort
                              ? ' It might say something like "Horticultural Employee Level 2" or "Level 3".'
                              : isNursery
                                ? ' It might say something like "Nursery Industry Employee Grade 1B" or "Grade 3".'
                                : isClerks
                                  ? ' It might say something like "Clerical Employee Level 2" or "Level 1 Year 3".'
                                  : isMisc
                                    ? ' It might say something like "Miscellaneous Award Level 2" or "Level 3 — trade qualified".'
                                    : isRacing
                                      ? ' It might say something like "Grade 2 Racecourse Attendant" or "Grade 3 Raceday Official".'
                                      : isBREC
                                        ? ' It might say something like "Cinema Worker Level 3" or "TV Broadcasting Operator Grade A".'
                                        : isRE
                                          ? ' It might say something like "Real Estate Employee Level 2" or "Level 3".'
                                          : isArch
                                            ? ' It might say something like "Graduate Level 1" or "Registered Architect Level 2".'
                                            : isSec
                                              ? ' It might say something like "Security Officer Level 2" or "Level 3".'
                                              : ' It might say something like "Level 2" or "Food and Beverage Attendant Grade 2".'}
          </p>
          <div className="space-y-2">
            <button
              onClick={() => handleKnowsAnswer(true)}
              className="w-full text-left px-4 py-3 rounded-lg border-2 border-gray-200 bg-white text-gray-700 hover:border-brand-400 hover:bg-brand-50 transition-all text-sm font-medium"
            >
              Yes — I know my classification, let me select it
            </button>
            <button
              onClick={() => handleKnowsAnswer(false)}
              className="w-full text-left px-4 py-3 rounded-lg border-2 border-gray-200 bg-white text-gray-700 hover:border-brand-400 hover:bg-brand-50 transition-all text-sm font-medium"
            >
              No — help me work out what level I should be
            </button>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button onClick={onBack} className="btn-ghost">← Back</button>
        </div>
      </div>
    );
  }

  // ── Phase 2a: direct classification selection ───────────────────────────────
  if (knowsClassification === true) {
    if (directLoading && allClassifications.length === 0) {
      return <div className="text-center py-12 text-gray-500">Loading classifications...</div>;
    }

    const grouped = STREAM_ORDER.map(stream => ({
      stream,
      label: STREAM_LABELS[stream],
      items: allClassifications
        .filter(c => c.stream === stream)
        .sort((a, b) => a.level - b.level),
    })).filter(g => g.items.length > 0);

    const selectedCls = allClassifications.find(c => c.id === selectedClassId);

    if (directResult) {
      return renderResultCard(directResult, true);
    }

    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-900">Select your classification</h2>
          <p className="text-gray-600">
            Choose the classification that matches your role and level.
          </p>
        </div>

        <div className="card space-y-3">
          <label className="block font-semibold text-gray-900">Your classification</label>
          <select
            value={selectedClassId}
            onChange={e => setSelectedClassId(e.target.value ? parseInt(e.target.value) : '')}
            className="select-field"
          >
            <option value="">— Select your classification —</option>
            {grouped.map(group => (
              <optgroup key={group.stream} label={group.label}>
                {group.items.map(cls => (
                  <option key={cls.id} value={cls.id}>
                    {(isFitness || isRacing) ? cls.title : `Level ${cls.level} — ${cls.title}`}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        {selectedCls && (
          <div className="card bg-gray-50 space-y-3">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wide text-brand-600 bg-brand-100 px-2 py-1 rounded">
                {(isFitness || isRacing) ? STREAM_LABELS[selectedCls.stream] : `${STREAM_LABELS[selectedCls.stream]} — Level ${selectedCls.level}`}
              </span>
            </div>
            <h3 className="font-bold text-gray-900">{selectedCls.title}</h3>
            <p className="text-sm text-gray-600">{selectedCls.description}</p>
            {selectedCls.duties.length > 0 && (
              <ul className="space-y-1">
                {selectedCls.duties.slice(0, 4).map((duty, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-brand-400 mt-0.5 shrink-0">•</span>
                    {duty}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {error && <p className="text-danger-600 text-sm">{error}</p>}

        <div className="flex gap-3">
          <button onClick={() => setKnowsClassification(null)} className="btn-secondary flex-1">
            ← Back
          </button>
          <button
            onClick={handleConfirmDirect}
            disabled={!selectedClassId || directLoading}
            className="btn-primary flex-1"
          >
            {directLoading ? 'Loading...' : 'Use this classification →'}
          </button>
        </div>

        <p className="text-xs text-gray-400 text-center">
          Not sure if this is right?{' '}
          <button
            onClick={() => { setKnowsClassification(false); setSelectedClassId(''); }}
            className="underline text-brand-600"
          >
            Let us help you work it out instead
          </button>
        </p>
      </div>
    );
  }

  // ── Phase 2b: questionnaire ─────────────────────────────────────────────────
  if (error && !questions.length) {
    return (
      <div className="danger-box">
        <p>{error}</p>
        <button onClick={onBack} className="btn-ghost mt-4">← Go back</button>
      </div>
    );
  }

  if (questionResult) {
    return renderResultCard(questionResult, false);
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">What do you do at work?</h2>
        <p className="text-gray-600">
          Answer these questions about your job. We'll use your answers to figure out your{' '}
          <strong>classification level</strong> under the award — which determines your minimum pay rate.
        </p>
      </div>

      <div className="space-y-6">
        {visibleQuestions.map(question => (
          <div key={question.question_key} className="space-y-3">
            <div>
              <p className="font-semibold text-gray-900">{question.question_text}</p>
              {question.help_text && (
                <p className="text-sm text-gray-500 mt-1">{question.help_text}</p>
              )}
            </div>
            <div className="space-y-2">
              {question.answers.map(answer => (
                <button
                  key={answer.answer_key}
                  onClick={() => handleAnswer(question.question_key, answer.answer_key)}
                  className={clsx(
                    'w-full text-left px-4 py-3 rounded-lg border-2 transition-all text-sm',
                    answers[question.question_key] === answer.answer_key
                      ? 'border-brand-600 bg-brand-50 text-brand-900 font-medium'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                  )}
                >
                  {answers[question.question_key] === answer.answer_key && (
                    <span className="mr-2">✓</span>
                  )}
                  {answer.answer_text}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {canClassify && (
        <div className="pt-2">
          <button
            onClick={handleClassify}
            disabled={classifying}
            className="btn-primary w-full"
          >
            {classifying ? 'Working it out...' : 'Work out my classification →'}
          </button>
          {error && <p className="text-danger-500 text-sm mt-2">{error}</p>}
        </div>
      )}

      <div className="flex gap-3 pt-2">
        <button onClick={() => setKnowsClassification(null)} className="btn-ghost">← Back</button>
      </div>
    </div>
  );
}
