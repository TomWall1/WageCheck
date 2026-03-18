'use client';

import { EmploymentType } from '@/types';
import clsx from 'clsx';

interface Props {
  selected: EmploymentType | null;
  age: number | null;
  onSelect: (type: EmploymentType) => void;
  onAgeChange: (age: number | null) => void;
  onNext: () => void;
}

const JUNIOR_RATES: Record<number, number> = {
  15: 0.40, 16: 0.50, 17: 0.60, 18: 0.70, 19: 0.80, 20: 0.90,
};

const EMPLOYMENT_TYPES: Array<{
  type: EmploymentType;
  label: string;
  icon: string;
  summary: string;
  detail: string;
  importantNote?: string;
}> = [
  {
    type: 'full_time',
    label: 'Full-time',
    icon: '📅',
    summary: 'I work regular hours every week — usually around 38 hours.',
    detail:
      'Full-time employees have set hours and are entitled to paid annual leave (4 weeks per year), paid sick leave (10 days per year), and paid public holidays. You should have a written contract.',
    importantNote: undefined,
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
  },
];

export default function StepEmploymentType({ selected, age, onSelect, onAgeChange, onNext }: Props) {
  const juniorRate = age && JUNIOR_RATES[age];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-gray-900">
          Let's check your pay
        </h1>
        <p className="text-gray-600 text-lg">
          This tool checks what you should be paid under the{' '}
          <strong>Hospitality Industry General Award 2020</strong> — the minimum
          pay rules that cover most hospitality workers in Australia.
        </p>
        <p className="text-gray-500">
          First, what kind of employment are you in?
        </p>
      </div>

      <div className="space-y-3">
        {EMPLOYMENT_TYPES.map(({ type, label, icon, summary, detail, importantNote }) => (
          <button
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
                <div className="warning-box text-sm">
                  <strong>Worth knowing:</strong> {importantNote}
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      {selected && (
        <div className="info-box text-sm">
          <strong>Not sure?</strong> If you're unsure which category applies to you,
          casual is common in hospitality — but the label your employer uses isn't always
          what the law says you are. If you're being treated as casual but work regular
          set hours each week, seek advice.
        </div>
      )}

      {/* Age input */}
      <div className="card space-y-3">
        <div>
          <label className="block font-semibold text-gray-900 mb-1">How old are you?</label>
          <p className="text-sm text-gray-500 mb-3">
            Under-21s are paid a percentage of the adult rate under the award. Enter your age
            so we can calculate the right rate for you. If you're 21 or over, junior rates don't apply.
          </p>
          <div className="flex items-center gap-3">
            <input
              type="number"
              min={14}
              max={70}
              placeholder="e.g. 19"
              value={age ?? ''}
              onChange={e => {
                const val = parseInt(e.target.value);
                onAgeChange(isNaN(val) ? null : val);
              }}
              className="input-field max-w-[120px]"
            />
            <span className="text-gray-500 text-sm">years old</span>
          </div>
        </div>

        {juniorRate && (
          <div className="warning-box text-sm">
            <strong>Junior rate applies.</strong> At age {age}, the award sets your minimum pay
            at <strong>{Math.round(juniorRate * 100)}% of the adult rate</strong>.
            This is automatically factored into your calculation.
          </div>
        )}
        {age && age >= 21 && (
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
