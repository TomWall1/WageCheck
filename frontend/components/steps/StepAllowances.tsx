'use client';

import { useEffect, useState } from 'react';
import { EmploymentType, AllowanceAnswer, AllowanceInfo } from '@/types';
import { api } from '@/lib/api';
import { formatCurrency } from '@/lib/utils';
import clsx from 'clsx';

interface Props {
  employmentType: EmploymentType;
  answers: AllowanceAnswer[];
  onAnswersChange: (answers: AllowanceAnswer[]) => void;
  onNext: () => void;
  onBack: () => void;
}

interface AllowanceQuestion {
  type: string;
  question: string;
  subQuestion?: string;
}

const ALLOWANCE_QUESTIONS: AllowanceQuestion[] = [
  {
    type: 'meal',
    question: 'Did you work overtime that you weren\'t told about the day before?',
    subQuestion: 'If yes, you may be owed a meal allowance for each meal time that fell during your overtime.',
  },
  {
    type: 'split_shift',
    question: 'Was your shift split into two separate parts with more than an hour gap in between?',
    subQuestion: 'For example, did you work 10am–2pm and then come back for 5pm–9pm?',
  },
  {
    type: 'uniform_laundry',
    question: 'Does your employer require you to wear a uniform?',
    subQuestion: 'If your employer doesn\'t launder it for you or cover the cost, you may be owed a laundry allowance.',
  },
  {
    type: 'vehicle',
    question: 'Did you use your own car or motorbike for work purposes during this period?',
    subQuestion: 'For example, making deliveries or running errands for your employer.',
  },
  {
    type: 'first_aid',
    question: 'Do you hold a first aid certificate and act as the first aider at your workplace?',
    subQuestion: 'This means your employer has specifically asked you to be responsible for first aid.',
  },
];

export default function StepAllowances({ employmentType, answers, onAnswersChange, onNext, onBack }: Props) {
  const [allowanceInfo, setAllowanceInfo] = useState<AllowanceInfo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getAllowances()
      .then((data: unknown) => setAllowanceInfo(data as AllowanceInfo[]))
      .finally(() => setLoading(false));
  }, []);

  function getAnswer(type: string): boolean | null {
    const found = answers.find(a => a.type === type);
    return found ? found.triggered : null;
  }

  function setAnswer(type: string, triggered: boolean) {
    const existing = answers.filter(a => a.type !== type);
    onAnswersChange([...existing, { type, triggered }]);
  }

  const triggeredAllowances = answers.filter(a => a.triggered);
  const allowanceInfoByType = Object.fromEntries(allowanceInfo.map(a => [a.allowance_type, a]));

  if (loading) {
    return <div className="text-center py-12 text-gray-500">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">Allowances</h2>
        <p className="text-gray-600">
          On top of your base rate and penalty rates, the award requires certain allowances
          to be paid in specific situations. Answer a few quick questions.
        </p>
      </div>

      <div className="space-y-4">
        {ALLOWANCE_QUESTIONS.map(q => {
          const answer = getAnswer(q.type);
          const info = allowanceInfoByType[q.type];

          return (
            <div key={q.type} className="card space-y-3">
              <p className="font-semibold text-gray-900">{q.question}</p>
              {q.subQuestion && <p className="text-sm text-gray-500">{q.subQuestion}</p>}

              <div className="flex gap-3">
                {[true, false].map(val => (
                  <button
                    key={String(val)}
                    onClick={() => setAnswer(q.type, val)}
                    className={clsx(
                      'flex-1 py-2.5 rounded-lg border-2 text-sm font-semibold transition-all',
                      answer === val
                        ? 'border-brand-600 bg-brand-50 text-brand-700'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    )}
                  >
                    {val ? 'Yes' : 'No'}
                  </button>
                ))}
              </div>

              {/* Show allowance info if triggered */}
              {answer === true && info && (
                <div className="success-box text-sm space-y-1">
                  <p className="font-semibold text-success-700">✓ {info.name} applies</p>
                  <p className="text-gray-700">{info.description}</p>
                  {info.amount && (
                    <p className="font-semibold">
                      Rate: {formatCurrency(info.amount)}{' '}
                      {info.per_unit === 'per_km' ? 'per km'
                        : info.per_unit === 'per_meal' ? 'per meal'
                        : info.per_unit === 'per_shift' ? 'per shift'
                        : info.per_unit === 'per_week' ? 'per week'
                        : ''}
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Summary of triggered allowances */}
      {triggeredAllowances.length > 0 && (
        <div className="card bg-success-50 border-success-100 space-y-3">
          <h3 className="font-bold text-gray-900">Allowances that should have applied:</h3>
          <ul className="space-y-3">
            {triggeredAllowances.map(a => {
              const info = allowanceInfoByType[a.type];
              if (!info) return null;
              return (
                <li key={a.type} className="text-sm space-y-1">
                  <p className="font-semibold text-gray-900">{info.name}</p>
                  <p className="text-gray-600">{info.trigger_condition}</p>
                  {info.amount && (
                    <p className="text-success-700 font-medium">
                      {formatCurrency(info.amount)}{' '}
                      {info.per_unit?.replace('_', ' ')}
                    </p>
                  )}
                </li>
              );
            })}
          </ul>
          <p className="text-xs text-gray-500">
            These amounts are not automatically included in your pay calculation above —
            add them to your total entitlements.
          </p>
        </div>
      )}

      {triggeredAllowances.length === 0 && answers.length >= ALLOWANCE_QUESTIONS.length && (
        <div className="info-box text-sm">
          Based on your answers, no allowances appear to be owed for this period. If your situation changes
          (e.g. you do overtime or use your car for work), come back and check again.
        </div>
      )}

      <div className="flex gap-3">
        <button onClick={onBack} className="btn-secondary flex-1">← Back</button>
        <button onClick={onNext} className="btn-primary flex-1">
          Next — Your rights →
        </button>
      </div>
    </div>
  );
}
