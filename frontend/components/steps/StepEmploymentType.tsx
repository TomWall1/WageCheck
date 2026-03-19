'use client';

import { useState } from 'react';
import { EmploymentType } from '@/types';
import clsx from 'clsx';

interface Props {
  awardCode: string;
  awardName: string;
  selected: EmploymentType | null;
  age: number | null;
  onSelect: (type: EmploymentType) => void;
  onAgeChange: (age: number | null) => void;
  onNext: () => void;
}

// Junior rate tables per award — percentage of adult rate by age
const JUNIOR_RATES_BY_AWARD: Record<string, { rates: Record<number, number>; cutoff: number; underMin: number }> = {
  MA000009: { rates: { 16: 0.50, 17: 0.60, 18: 0.70, 19: 0.80, 20: 0.90 }, cutoff: 21, underMin: 0.40 },
  MA000003: { rates: { 16: 0.50, 17: 0.60, 18: 0.70, 19: 0.80, 20: 0.90 }, cutoff: 21, underMin: 0.40 },
  MA000004: { rates: { 16: 0.50, 17: 0.60, 18: 0.70, 19: 0.80, 20: 0.90 }, cutoff: 21, underMin: 0.45 },
  MA000119: { rates: { 17: 0.60, 18: 0.70, 19: 0.85 }, cutoff: 20, underMin: 0.50 },
  MA000094: { rates: { 17: 0.65, 18: 0.75, 19: 0.85 }, cutoff: 20, underMin: 0.55 },
  MA000080: { rates: { 17: 0.65, 18: 0.75, 19: 0.85 }, cutoff: 20, underMin: 0.55 },
  // MA000081: no junior rates — adult rate applies at all ages
};

function getJuniorRate(awardCode: string, age: number | null): number | null {
  if (age === null) return null;
  const config = JUNIOR_RATES_BY_AWARD[awardCode] ?? JUNIOR_RATES_BY_AWARD.MA000009;
  if (age >= config.cutoff) return null;
  return config.rates[age] ?? config.underMin;
}

const EMPLOYMENT_TYPES: Array<{
  type: EmploymentType;
  label: string;
  icon: string;
  summary: string;
  detail: string;
  importantNote?: string;
  learnMore?: string[];
}> = [
  {
    type: 'full_time',
    label: 'Full-time',
    icon: '📅',
    summary: 'I work regular hours every week — usually around 38 hours.',
    detail:
      'Full-time employees have set hours and are entitled to paid annual leave (4 weeks per year), paid sick leave (10 days per year), and paid public holidays. You should have a written contract.',
  },
  {
    type: 'part_time',
    label: 'Part-time',
    icon: '🗓️',
    summary: 'I work regular hours but less than full-time.',
    detail:
      'Part-time employees have agreed, regular hours (less than 38 per week). You get the same entitlements as full-time workers, just proportional to your hours. Your hours should be agreed in writing.',
    importantNote:
      "If your hours change week to week and you don't have guaranteed shifts, you might actually be casual — even if your employer hasn't told you that.",
    learnMore: [
      'Under the award, part-time workers must have their regular hours and days of work agreed in writing before they start. This written agreement should specify at least the number of hours guaranteed each week and which days those hours fall on.',
      "If your hours change from week to week — or you're called in based on demand with no set schedule — you may legally be a casual employee, regardless of what your employer calls you.",
      "The distinction matters significantly. Casual employees receive a 25% casual loading on their hourly rate to compensate for the lack of paid leave. If you're being treated as casual without that loading, but also without guaranteed hours, something may not be right.",
      'If you believe you\'re genuinely part-time but your employer is treating you as casual (or vice versa), you can contact the Fair Work Ombudsman on 13 13 94 for free advice.',
    ],
  },
  {
    type: 'casual',
    label: 'Casual',
    icon: '🤙',
    summary: 'I get shifts as they come — no guaranteed hours.',
    detail:
      'Casual employees get 25% extra on top of the base hourly rate (called casual loading). This compensates for not having paid leave or job security. You still get penalty rates, overtime, and allowances on top of this loading.',
    importantNote:
      "If you've been working regular shifts at the same time each week for a long time, you may have the right to request conversion to permanent employment.",
    learnMore: [
      "Under the Fair Work Act, if you've been employed as a casual for 12 months and have worked a regular and systematic pattern of hours for at least the last 6 months, you can formally request to convert to permanent employment (part-time or full-time).",
      'Your employer must respond in writing within 21 days. They can only refuse on genuine operational grounds — for example, if the business genuinely can\'t commit to regular hours for that role.',
      "A 'regular pattern of work' doesn't have to be exactly the same hours every week. Courts and the Fair Work Commission look at whether your shifts were predictable and systematic over time.",
      'Even if you haven\'t formally requested conversion, working a regular casual roster for an extended period can sometimes create legal entitlements. If you think this applies to you, the Fair Work Ombudsman (13 13 94) can give you free, confidential advice.',
    ],
  },
];

export default function StepEmploymentType({ awardCode, awardName, selected, age, onSelect, onAgeChange, onNext }: Props) {
  const [expandedNote, setExpandedNote] = useState<string | null>(null);
  const juniorRate = getJuniorRate(awardCode, age);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-gray-900">
          Let&apos;s check your pay
        </h1>
        <p className="text-gray-600 text-lg">
          This tool checks what you should be paid under the{' '}
          <strong>{awardName} 2020</strong> — the minimum pay rules that cover your workplace.
        </p>
        <p className="text-gray-500">
          First, what kind of employment are you in?
        </p>
      </div>

      <div className="space-y-3">
        {EMPLOYMENT_TYPES.map(({ type, label, icon, summary, detail, importantNote, learnMore }) => (
          <div
            key={type}
            onClick={() => onSelect(type)}
            className={clsx(
              'choice-card w-full text-left',
              selected === type && 'selected'
            )}
          >
            <div className="text-2xl mt-0.5 shrink-0">{icon}</div>
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-900 text-lg">{label}</span>
                {selected === type && (
                  <span className="text-brand-600 text-sm font-medium">✓ Selected</span>
                )}
              </div>
              <p className="text-gray-700 font-medium">{summary}</p>
              <p className="text-gray-500 text-sm">{detail}</p>
              {importantNote && (
                <div
                  className="warning-box text-sm"
                  onClick={e => e.stopPropagation()}
                >
                  <p><strong>Worth knowing:</strong> {importantNote}</p>
                  {learnMore && (
                    <button
                      onClick={() => setExpandedNote(expandedNote === type ? null : type)}
                      className="text-warning-700 underline font-medium mt-1 text-sm"
                    >
                      {expandedNote === type ? '↑ Show less' : '↓ Learn more'}
                    </button>
                  )}
                  {expandedNote === type && learnMore && (
                    <div className="mt-3 pt-3 border-t border-warning-200 space-y-2">
                      {learnMore.map((para, i) => (
                        <p key={i} className="text-gray-700">{para}</p>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <div className="info-box text-sm">
          <strong>Not sure?</strong> If you&apos;re unsure which category applies to you,
          seek advice from the Fair Work Ombudsman (13 13 94). The label your employer uses
          isn&apos;t always what the law says you are.
        </div>
      )}

      {/* Age dropdown */}
      <div className="card space-y-3">
        <div>
          <label className="block font-semibold text-gray-900 mb-1">How old are you?</label>
          <p className="text-sm text-gray-500 mb-3">
            Junior employees are paid a percentage of the adult rate under the award.
            If you&apos;re old enough to receive the adult rate, junior rates don&apos;t apply.
          </p>
          <select
            value={age === null ? '21' : String(age)}
            onChange={e => {
              const val = e.target.value;
              onAgeChange(val === '21' ? null : parseInt(val));
            }}
            className="select-field max-w-[200px]"
          >
            <option value="21">21+ (adult rate)</option>
            <option value="20">20 years old</option>
            <option value="19">19 years old</option>
            <option value="18">18 years old</option>
            <option value="17">17 years old</option>
            <option value="16">16 years old</option>
            <option value="15">15 years old</option>
            <option value="14">14 years old</option>
          </select>
        </div>

        {juniorRate !== null && age !== null && (
          <div className="warning-box text-sm">
            <strong>Junior rate applies.</strong> At age {age}, the {awardName} sets your minimum pay
            at <strong>{Math.round(juniorRate * 100)}% of the adult rate</strong>.
            This is automatically factored into your calculation.
          </div>
        )}
        {juniorRate === null && (
          <div className="success-box text-sm">
            Adult rate applies — no junior rate reduction.
          </div>
        )}
      </div>

      <div className="flex justify-end pt-2">
        <button
          onClick={onNext}
          disabled={!selected}
          className="btn-primary"
        >
          Next — Tell us about your role →
        </button>
      </div>
    </div>
  );
}
