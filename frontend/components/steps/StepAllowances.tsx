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

// Each allowance has a primary question and optional follow-ups.
// triggered = true only when all follow-up conditions are met.
interface AllowanceQuestion {
  type: string;
  primary: string;
  primaryHelp?: string;
  followUps?: Array<{
    key: string;           // stored as `${type}_${key}`
    question: string;
    help?: string;
    // Answer that means the allowance IS triggered (default: 'no' = allowance triggered)
    triggeredWhen: 'yes' | 'no';
  }>;
}

const ALLOWANCE_QUESTIONS: AllowanceQuestion[] = [
  {
    type: 'meal',
    primary: 'Did you work any overtime during this period?',
    primaryHelp: 'Overtime means hours beyond your ordinary hours — for full-time that\'s beyond 38 hours a week.',
    followUps: [
      {
        key: 'no_notice',
        question: 'Were you given at least 24 hours\' notice that you\'d need to work overtime?',
        help: 'If your employer told you the day before or with enough notice, the meal allowance may not apply.',
        triggeredWhen: 'no', // allowance triggered when answer is 'no' (no notice given)
      },
      {
        key: 'meal_period',
        question: 'Did a meal time (breakfast, lunch, or dinner) fall during your overtime?',
        triggeredWhen: 'yes',
      },
    ],
  },
  {
    type: 'split_shift',
    primary: 'Was your shift split into two or more separate parts on the same day?',
    primaryHelp: 'For example, you worked 10am–2pm, went home, then came back for 5pm–9pm.',
    followUps: [
      {
        key: 'gap_over_1hr',
        question: 'Was the gap between your work periods more than 1 hour?',
        triggeredWhen: 'yes',
      },
    ],
  },
  {
    type: 'uniform_laundry',
    primary: 'Does your employer require you to wear a specific uniform or particular clothing for work?',
    primaryHelp: 'This means your employer tells you what you must wear — not just "wear black" or "look smart".',
    followUps: [
      {
        key: 'employer_provides_cleaning',
        question: 'Does your employer launder or dry-clean the uniform for you, or pay for you to have it cleaned?',
        help: 'If your employer provides laundering (or reimburses you), no allowance is owed. If you have to wash it yourself at your own cost, you\'re owed a laundry allowance.',
        triggeredWhen: 'no', // triggered when employer does NOT provide cleaning
      },
    ],
  },
  {
    type: 'vehicle',
    primary: 'Did you use your own car, motorbike, or other vehicle for work purposes during this period?',
    primaryHelp: 'For example, making deliveries or running errands for your employer — not just commuting to work.',
    followUps: [
      {
        key: 'km',
        question: 'Approximately how many kilometres did you travel for work?',
        help: 'We\'ll use this to calculate the allowance amount.',
        triggeredWhen: 'yes', // this is a special numeric follow-up, handled separately
      },
    ],
  },
  {
    type: 'first_aid',
    primary: 'Do you hold a current first aid certificate?',
    followUps: [
      {
        key: 'appointed',
        question: 'Has your employer specifically appointed you as the person responsible for first aid at your workplace?',
        help: 'Simply holding a certificate is not enough — your employer must have asked you to act as first aider.',
        triggeredWhen: 'yes',
      },
    ],
  },
];

type FollowUpAnswers = Record<string, string>;

export default function StepAllowances({ employmentType, answers, onAnswersChange, onNext, onBack }: Props) {
  const [allowanceInfo, setAllowanceInfo] = useState<AllowanceInfo[]>([]);
  const [loading, setLoading] = useState(true);
  // Primary yes/no answers
  const [primaryAnswers, setPrimaryAnswers] = useState<Record<string, boolean | null>>({});
  // Follow-up answers
  const [followUpAnswers, setFollowUpAnswers] = useState<FollowUpAnswers>({});
  // Vehicle km
  const [vehicleKm, setVehicleKm] = useState<string>('');

  useEffect(() => {
    api.getAllowances()
      .then((data: unknown) => setAllowanceInfo(data as AllowanceInfo[]))
      .finally(() => setLoading(false));
  }, []);

  // Derive triggered allowances and sync to parent whenever answers change
  useEffect(() => {
    const result: AllowanceAnswer[] = [];

    for (const q of ALLOWANCE_QUESTIONS) {
      const primary = primaryAnswers[q.type];
      if (primary === null || primary === undefined) continue;

      if (!primary) {
        // Primary is 'no' — allowance definitely doesn't apply
        result.push({ type: q.type, triggered: false });
        continue;
      }

      // Primary is 'yes' — check follow-ups
      if (!q.followUps || q.followUps.length === 0) {
        result.push({ type: q.type, triggered: true });
        continue;
      }

      // Vehicle is special — just needs km > 0
      if (q.type === 'vehicle') {
        const km = parseFloat(vehicleKm);
        result.push({ type: q.type, triggered: !isNaN(km) && km > 0, detail: vehicleKm });
        continue;
      }

      // Check all follow-ups are answered and conditions met
      let allAnswered = true;
      let triggered = true;

      for (const fu of q.followUps) {
        const fuKey = `${q.type}_${fu.key}`;
        const fuAnswer = followUpAnswers[fuKey];
        if (!fuAnswer) { allAnswered = false; break; }
        // Check if the follow-up condition is met
        if (fuAnswer !== fu.triggeredWhen) triggered = false;
      }

      if (allAnswered) {
        result.push({ type: q.type, triggered });
      }
    }

    onAnswersChange(result);
  }, [primaryAnswers, followUpAnswers, vehicleKm]);

  function setPrimary(type: string, val: boolean) {
    setPrimaryAnswers(prev => ({ ...prev, [type]: val }));
    // Reset follow-ups if primary changes
    setFollowUpAnswers(prev => {
      const next = { ...prev };
      Object.keys(next).forEach(k => { if (k.startsWith(`${type}_`)) delete next[k]; });
      return next;
    });
  }

  function setFollowUp(type: string, key: string, val: string) {
    setFollowUpAnswers(prev => ({ ...prev, [`${type}_${key}`]: val }));
  }

  const allowanceInfoByType = Object.fromEntries(
    allowanceInfo.map(a => [`${a.allowance_type}_${a.effective_date?.substring(0, 4)}`, a])
  );
  // Get latest rate for each type
  const latestAllowance = (type: string): AllowanceInfo | undefined => {
    const matches = allowanceInfo.filter(a => a.allowance_type === type).sort(
      (a, b) => (b.effective_date || '').localeCompare(a.effective_date || '')
    );
    return matches[0];
  };

  const triggeredAllowances = answers.filter(a => a.triggered);
  const allQuestionsAnswered = ALLOWANCE_QUESTIONS.every(q => {
    const primary = primaryAnswers[q.type];
    if (primary === null || primary === undefined) return false;
    if (!primary) return true; // 'no' = done
    if (q.type === 'vehicle') return true;
    if (!q.followUps) return true;
    return q.followUps.every(fu => followUpAnswers[`${q.type}_${fu.key}`]);
  });

  if (loading) return <div className="text-center py-12 text-gray-500">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">Allowances</h2>
        <p className="text-gray-600">
          As well as your hourly rate and penalty rates, certain situations entitle you to extra
          allowances. Answer these questions to find out if any apply.
        </p>
      </div>

      <div className="space-y-4">
        {ALLOWANCE_QUESTIONS.map(q => {
          const primary = primaryAnswers[q.type];
          const info = latestAllowance(q.type);

          return (
            <div key={q.type} className="card space-y-4">
              {/* Primary question */}
              <div className="space-y-2">
                <p className="font-semibold text-gray-900">{q.primary}</p>
                {q.primaryHelp && <p className="text-sm text-gray-500">{q.primaryHelp}</p>}
                <div className="flex gap-3">
                  {[true, false].map(val => (
                    <button
                      key={String(val)}
                      onClick={() => setPrimary(q.type, val)}
                      className={clsx(
                        'flex-1 py-2.5 rounded-lg border-2 text-sm font-semibold transition-all',
                        primary === val
                          ? 'border-brand-600 bg-brand-50 text-brand-700'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300'
                      )}
                    >
                      {val ? 'Yes' : 'No'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Follow-up questions */}
              {primary === true && q.followUps && q.followUps.map(fu => {
                const fuKey = `${q.type}_${fu.key}`;

                // Vehicle km input is special
                if (q.type === 'vehicle' && fu.key === 'km') {
                  return (
                    <div key={fu.key} className="space-y-2 pl-4 border-l-2 border-brand-200">
                      <p className="text-sm font-medium text-gray-900">{fu.question}</p>
                      {fu.help && <p className="text-xs text-gray-500">{fu.help}</p>}
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min={0}
                          step={0.1}
                          placeholder="0"
                          value={vehicleKm}
                          onChange={e => setVehicleKm(e.target.value)}
                          className="input-field max-w-[120px]"
                        />
                        <span className="text-gray-500 text-sm">km</span>
                        {vehicleKm && parseFloat(vehicleKm) > 0 && info?.amount && (
                          <span className="text-success-600 font-semibold text-sm">
                            = {formatCurrency(parseFloat(vehicleKm) * info.amount)}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={fu.key} className="space-y-2 pl-4 border-l-2 border-brand-200">
                    <p className="text-sm font-medium text-gray-900">{fu.question}</p>
                    {fu.help && <p className="text-xs text-gray-500">{fu.help}</p>}
                    <div className="flex gap-3">
                      {['yes', 'no'].map(val => (
                        <button
                          key={val}
                          onClick={() => setFollowUp(q.type, fu.key, val)}
                          className={clsx(
                            'flex-1 py-2 rounded-lg border-2 text-sm font-semibold transition-all capitalize',
                            followUpAnswers[fuKey] === val
                              ? 'border-brand-600 bg-brand-50 text-brand-700'
                              : 'border-gray-200 text-gray-600 hover:border-gray-300'
                          )}
                        >
                          {val}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}

              {/* Result for this allowance */}
              {(() => {
                const thisAnswer = answers.find(a => a.type === q.type);
                if (!thisAnswer) return null;

                if (thisAnswer.triggered && info) {
                  return (
                    <div className="success-box text-sm space-y-1">
                      <p className="font-semibold text-success-700">✓ {info.name} applies</p>
                      <p className="text-gray-700">{info.description}</p>
                      {info.amount && q.type !== 'vehicle' && (
                        <p className="font-semibold text-success-700">
                          Rate: {formatCurrency(info.amount)} {info.per_unit?.replace('_', ' ')}
                        </p>
                      )}
                      {q.type === 'vehicle' && info.amount && vehicleKm && (
                        <p className="font-semibold text-success-700">
                          {parseFloat(vehicleKm).toFixed(1)} km × {formatCurrency(info.amount)}/km = {formatCurrency(parseFloat(vehicleKm) * info.amount)}
                        </p>
                      )}
                    </div>
                  );
                }

                if (primary === false) {
                  return (
                    <p className="text-sm text-gray-400 italic">This allowance does not apply.</p>
                  );
                }

                return null;
              })()}
            </div>
          );
        })}
      </div>

      {/* Summary */}
      {triggeredAllowances.length > 0 && (
        <div className="card bg-success-50 border-success-100 space-y-3">
          <h3 className="font-bold text-gray-900">Allowances owed this period:</h3>
          <ul className="space-y-2 text-sm">
            {triggeredAllowances.map(a => {
              const info = latestAllowance(a.type);
              if (!info) return null;
              return (
                <li key={a.type} className="flex justify-between items-start gap-2">
                  <span className="text-gray-700">{info.name}</span>
                  {info.amount && a.type !== 'vehicle' && (
                    <span className="font-semibold text-success-700 shrink-0">
                      {formatCurrency(info.amount)} {info.per_unit?.replace('_', ' ')}
                    </span>
                  )}
                  {a.type === 'vehicle' && info.amount && a.detail && (
                    <span className="font-semibold text-success-700 shrink-0">
                      {formatCurrency(parseFloat(a.detail) * info.amount)}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
          <p className="text-xs text-gray-500">
            These are additional to your shift pay calculated on the previous step.
          </p>
        </div>
      )}

      {allQuestionsAnswered && triggeredAllowances.length === 0 && (
        <div className="info-box text-sm">
          No allowances appear to apply for this period based on your answers.
        </div>
      )}

      <div className="flex gap-3">
        <button onClick={onBack} className="btn-secondary flex-1">← Back</button>
        <button onClick={onNext} className="btn-primary flex-1">Next — Your rights →</button>
      </div>
    </div>
  );
}
