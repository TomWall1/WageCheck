'use client';

import { useState, useEffect } from 'react';
import { EmploymentType, Shift, CalculationResult } from '@/types';
import { api } from '@/lib/api';
import { formatCurrency, formatHours, getDayLabel, getMultiplierLabel, formatShortDate } from '@/lib/utils';
import clsx from 'clsx';

interface ClassificationResult {
  level: number | null;
  stream: string | null;
  classification: { id: number; title: string; base_rate?: number } | null;
  rationale: string | null;
  confidence: string;
}

interface Props {
  employmentType: EmploymentType;
  age: number | null;
  classificationResult: ClassificationResult;
  shifts: Shift[];
  onShiftsChange: (shifts: Shift[]) => void;
  onResult: (result: CalculationResult) => void;
  onNext: () => void;
  onBack: () => void;
}

type PeriodType = 'weekly' | 'fortnightly';

interface DayEntry {
  date: string;
  dayName: string;
  worked: boolean;
  startTime: string;
  endTime: string;
  mealBreakTaken: boolean;
  mealBreakDuration: number;
  restBreakTaken: boolean;
}

const DAY_NAMES = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const SHORT_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function getMostRecentMonday(): string {
  const today = new Date();
  const dow = today.getDay(); // 0=Sun, 1=Mon...
  const diff = dow === 0 ? 6 : dow - 1; // days since Monday
  const monday = new Date(today);
  monday.setDate(today.getDate() - diff);
  return monday.toISOString().split('T')[0];
}

function addDays(dateStr: string, days: number): string {
  const d = new Date(dateStr + 'T00:00:00');
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
}

function buildWeekDays(mondayStr: string): DayEntry[] {
  return DAY_NAMES.map((dayName, i) => ({
    date: addDays(mondayStr, i),
    dayName,
    worked: false,
    startTime: '09:00',
    endTime: '17:00',
    mealBreakTaken: false,
    mealBreakDuration: 30,
    restBreakTaken: false,
  }));
}

function buildPeriodDays(mondayStr: string, period: PeriodType): DayEntry[] {
  const week1 = buildWeekDays(mondayStr);
  if (period === 'weekly') return week1;
  const week2 = buildWeekDays(addDays(mondayStr, 7));
  return [...week1, ...week2];
}

function formatDisplayDate(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-AU', { day: 'numeric', month: 'short' });
}

export default function StepTimesheet({
  employmentType,
  age,
  classificationResult,
  shifts,
  onShiftsChange,
  onResult,
  onNext,
  onBack,
}: Props) {
  const [period, setPeriod] = useState<PeriodType>('weekly');
  const [weekStart, setWeekStart] = useState<string>(getMostRecentMonday());
  const [days, setDays] = useState<DayEntry[]>(() => buildPeriodDays(getMostRecentMonday(), 'weekly'));
  const [calculating, setCalculating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [expandedDay, setExpandedDay] = useState<string | null>(null);

  // Rebuild days when period or week start changes
  useEffect(() => {
    setDays(buildPeriodDays(weekStart, period));
    setResult(null);
  }, [period, weekStart]);

  function updateDay(date: string, updates: Partial<DayEntry>) {
    setDays(prev => prev.map(d => d.date === date ? { ...d, ...updates } : d));
    setResult(null);
  }

  function toggleWorked(date: string) {
    const day = days.find(d => d.date === date)!;
    const nowWorked = !day.worked;
    updateDay(date, { worked: nowWorked });
    if (nowWorked && expandedDay !== date) setExpandedDay(date);
    else if (!nowWorked && expandedDay === date) setExpandedDay(null);
  }

  const workedDays = days.filter(d => d.worked);

  async function handleCalculate() {
    if (!classificationResult.classification) return;
    if (workedDays.length === 0) { setError('Mark at least one day as worked.'); return; }

    setCalculating(true);
    setError(null);
    try {
      const apiShifts = workedDays.map(d => ({
        date: d.date,
        startTime: d.startTime,
        endTime: d.endTime,
        mealBreakTaken: d.mealBreakTaken,
        mealBreakDuration: d.mealBreakDuration,
        restBreakTaken: d.restBreakTaken,
      }));

      const res = await api.calculate({
        employmentType,
        classificationId: classificationResult.classification.id,
        shifts: apiShifts,
        age: age ?? undefined,
      }) as CalculationResult;

      setResult(res);
      // Sync to parent as Shift[]
      onShiftsChange(workedDays.map(d => ({
        id: d.date,
        date: d.date,
        startTime: d.startTime,
        endTime: d.endTime,
        mealBreakTaken: d.mealBreakTaken,
        mealBreakDuration: d.mealBreakDuration,
        restBreakTaken: d.restBreakTaken,
      })));
      onResult(res);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Calculation failed. Please try again.');
    } finally {
      setCalculating(false);
    }
  }

  const empLabel = employmentType === 'full_time' ? 'Full-time' : employmentType === 'part_time' ? 'Part-time' : 'Casual';
  const week2Start = addDays(weekStart, 7);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">Enter your shifts</h2>
        <p className="text-gray-600">
          Tick the days you worked and fill in your start and finish times.
          We'll calculate what you should have been paid for each day.
        </p>
        <div className="info-box text-sm">
          <strong>{empLabel} — Level {classificationResult.level}:</strong>{' '}
          {classificationResult.classification?.title}
          {classificationResult.classification?.base_rate && (
            <span className="ml-2 font-semibold text-brand-700">
              ${Number(classificationResult.classification.base_rate).toFixed(2)}/hr
              {age && age < 21 && <span className="text-warning-700"> (before junior rate)</span>}
            </span>
          )}
        </div>
      </div>

      {/* Period selector */}
      <div className="card space-y-4">
        <div>
          <p className="font-semibold text-gray-900 mb-2">What period do you want to check?</p>
          <div className="flex gap-3">
            {(['weekly', 'fortnightly'] as PeriodType[]).map(p => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={clsx(
                  'flex-1 py-2.5 rounded-lg border-2 text-sm font-semibold transition-all capitalize',
                  period === p
                    ? 'border-brand-600 bg-brand-50 text-brand-700'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                )}
              >
                {p === 'weekly' ? 'One week' : 'Two weeks (fortnightly)'}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Monday of {period === 'fortnightly' ? 'the first week' : 'the week'}
          </label>
          <input
            type="date"
            value={weekStart}
            onChange={e => setWeekStart(e.target.value)}
            className="input-field max-w-xs"
          />
          <p className="text-xs text-gray-400 mt-1">Pick any Monday — we'll show you Mon–Sun from there.</p>
        </div>
      </div>

      {/* Week 1 grid */}
      <WeekGrid
        label={period === 'fortnightly' ? `Week 1 — Mon ${formatDisplayDate(weekStart)} to Sun ${formatDisplayDate(addDays(weekStart, 6))}` : undefined}
        days={days.slice(0, 7)}
        expandedDay={expandedDay}
        onToggle={toggleWorked}
        onExpand={setExpandedDay}
        onUpdate={updateDay}
      />

      {/* Week 2 grid */}
      {period === 'fortnightly' && (
        <WeekGrid
          label={`Week 2 — Mon ${formatDisplayDate(week2Start)} to Sun ${formatDisplayDate(addDays(week2Start, 6))}`}
          days={days.slice(7)}
          expandedDay={expandedDay}
          onToggle={toggleWorked}
          onExpand={setExpandedDay}
          onUpdate={updateDay}
        />
      )}

      {workedDays.length > 0 && !result && (
        <div className="space-y-2">
          <p className="text-sm text-gray-500 text-center">
            {workedDays.length} day{workedDays.length !== 1 ? 's' : ''} selected
          </p>
          <button onClick={handleCalculate} disabled={calculating} className="btn-primary w-full">
            {calculating ? 'Calculating...' : 'Calculate what I should have been paid →'}
          </button>
        </div>
      )}

      {error && <div className="danger-box text-sm">{error}</div>}

      {/* Results */}
      {result && <CalculationBreakdown result={result} onRecalculate={() => setResult(null)} onNext={onNext} onBack={onBack} />}

      {!result && (
        <button onClick={onBack} className="btn-ghost">← Back</button>
      )}
    </div>
  );
}

// ── Week grid component ────────────────────────────────────────────────────
function WeekGrid({ label, days, expandedDay, onToggle, onExpand, onUpdate }: {
  label?: string;
  days: DayEntry[];
  expandedDay: string | null;
  onToggle: (date: string) => void;
  onExpand: (date: string | null) => void;
  onUpdate: (date: string, updates: Partial<DayEntry>) => void;
}) {
  return (
    <div className="space-y-2">
      {label && <h3 className="font-semibold text-gray-700 text-sm">{label}</h3>}
      <div className="space-y-2">
        {days.map(day => (
          <DayCard
            key={day.date}
            day={day}
            expanded={expandedDay === day.date}
            onToggle={() => onToggle(day.date)}
            onExpand={() => onExpand(expandedDay === day.date ? null : day.date)}
            onUpdate={(updates) => onUpdate(day.date, updates)}
          />
        ))}
      </div>
    </div>
  );
}

// ── Day card ───────────────────────────────────────────────────────────────
function DayCard({ day, expanded, onToggle, onExpand, onUpdate }: {
  day: DayEntry;
  expanded: boolean;
  onToggle: () => void;
  onExpand: () => void;
  onUpdate: (updates: Partial<DayEntry>) => void;
}) {
  const isWeekend = day.dayName === 'Saturday' || day.dayName === 'Sunday';

  return (
    <div className={clsx(
      'rounded-xl border-2 transition-all',
      day.worked ? 'border-brand-400 bg-white' : 'border-gray-200 bg-gray-50',
      isWeekend && !day.worked && 'border-warning-100 bg-warning-50'
    )}>
      {/* Day header row */}
      <div className="flex items-center gap-3 p-3">
        <button
          onClick={onToggle}
          className={clsx(
            'w-6 h-6 rounded-md border-2 flex items-center justify-center shrink-0 transition-all',
            day.worked ? 'bg-brand-600 border-brand-600' : 'border-gray-300 bg-white'
          )}
        >
          {day.worked && <span className="text-white text-xs font-bold">✓</span>}
        </button>

        <div className="flex-1">
          <span className={clsx('font-semibold', isWeekend ? 'text-warning-700' : 'text-gray-900')}>
            {day.dayName}
          </span>
          <span className="text-gray-400 text-sm ml-2">{formatDisplayDate(day.date)}</span>
          {isWeekend && <span className="ml-2 text-xs text-warning-600 font-medium">penalty rates</span>}
        </div>

        {day.worked && (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>{day.startTime} – {day.endTime}</span>
            <button onClick={onExpand} className="text-brand-600 hover:text-brand-700 font-medium">
              {expanded ? 'Done' : 'Edit'}
            </button>
          </div>
        )}
      </div>

      {/* Expanded time inputs */}
      {day.worked && expanded && (
        <div className="px-3 pb-3 space-y-4 border-t border-gray-100 pt-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start time</label>
              <input
                type="time"
                value={day.startTime}
                onChange={e => onUpdate({ startTime: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Finish time</label>
              <input
                type="time"
                value={day.endTime}
                onChange={e => onUpdate({ endTime: e.target.value })}
                className="input-field"
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id={`meal-${day.date}`}
                checked={day.mealBreakTaken}
                onChange={e => onUpdate({ mealBreakTaken: e.target.checked })}
                className="mt-0.5 h-4 w-4 rounded border-gray-300 text-brand-600"
              />
              <div className="flex-1">
                <label htmlFor={`meal-${day.date}`} className="text-sm font-medium text-gray-700 cursor-pointer">
                  I took an unpaid meal break
                </label>
                {!day.mealBreakTaken && (
                  <p className="text-xs text-warning-600 mt-0.5">
                    If your shift is over 5 hours without a break, double time applies from the 5-hour mark.
                  </p>
                )}
                {day.mealBreakTaken && (
                  <div className="mt-2 flex items-center gap-2">
                    <select
                      value={day.mealBreakDuration}
                      onChange={e => onUpdate({ mealBreakDuration: Number(e.target.value) })}
                      className="select-field text-sm py-1 max-w-[140px]"
                    >
                      <option value={20}>20 minutes</option>
                      <option value={30}>30 minutes</option>
                      <option value={45}>45 minutes</option>
                      <option value={60}>1 hour</option>
                    </select>
                    <span className="text-xs text-gray-500">unpaid</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id={`rest-${day.date}`}
                checked={day.restBreakTaken}
                onChange={e => onUpdate({ restBreakTaken: e.target.checked })}
                className="mt-0.5 h-4 w-4 rounded border-gray-300 text-brand-600"
              />
              <label htmlFor={`rest-${day.date}`} className="text-sm font-medium text-gray-700 cursor-pointer">
                I was given a paid 10-minute rest break
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Calculation breakdown component ───────────────────────────────────────
function CalculationBreakdown({ result, onRecalculate, onNext, onBack }: {
  result: CalculationResult;
  onRecalculate: () => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const { summary, shifts, baseHourlyRate, isJuniorRate, juniorMultiplier } = result as CalculationResult & { isJuniorRate?: boolean; juniorMultiplier?: number };
  const [expandedShift, setExpandedShift] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      {/* Summary card */}
      <div className="card bg-brand-50 border-brand-200 space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-gray-500">Base rate used</p>
            <p className="font-bold text-gray-900">
              {formatCurrency(baseHourlyRate)}/hr
              {isJuniorRate && juniorMultiplier && (
                <span className="text-warning-700 font-normal text-sm ml-1">
                  (junior rate — {Math.round(juniorMultiplier * 100)}% of adult)
                </span>
              )}
            </p>
          </div>
          <button onClick={onRecalculate} className="text-sm text-brand-600 underline">
            Edit shifts
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-lg p-3">
            <p className="text-xs text-gray-500">Total hours worked</p>
            <p className="text-2xl font-bold text-gray-900">{formatHours(summary.totalWorkedHours)}</p>
          </div>
          <div className="bg-white rounded-lg p-3">
            <p className="text-xs text-gray-500">Total pay owed</p>
            <p className="text-2xl font-bold text-brand-700">{formatCurrency(summary.totalPayOwed)}</p>
          </div>
        </div>

        {/* Pay component breakdown */}
        <div className="bg-white rounded-lg p-3 space-y-2 text-sm">
          <div className="flex justify-between py-1 border-b border-gray-100">
            <span className="text-gray-600">Ordinary hours</span>
            <span className="font-medium">{formatCurrency(summary.ordinaryPay)}</span>
          </div>
          {summary.penaltyPay > 0 && (
            <div className="flex justify-between py-1 border-b border-gray-100">
              <span className="text-gray-600">Penalty rate loading</span>
              <span className="font-medium text-warning-700">+ {formatCurrency(summary.penaltyPay)}</span>
            </div>
          )}
          {(summary as any).missedBreakPay > 0 && (
            <div className="flex justify-between py-1 border-b border-gray-100">
              <span className="text-gray-600">Missed break penalty (double time)</span>
              <span className="font-medium text-warning-700">+ {formatCurrency((summary as any).missedBreakPay)}</span>
            </div>
          )}
          {summary.overtimePay > 0 && (
            <div className="flex justify-between py-1 border-b border-gray-100">
              <span className="text-gray-600">Overtime</span>
              <span className="font-medium text-warning-700">+ {formatCurrency(summary.overtimePay)}</span>
            </div>
          )}
          <div className="flex justify-between pt-1 font-bold text-base">
            <span>Total</span>
            <span>{formatCurrency(summary.totalPayOwed)}</span>
          </div>
        </div>
      </div>

      {/* Per-day breakdown */}
      <div className="space-y-2">
        <h3 className="font-bold text-gray-900">Day-by-day breakdown</h3>
        {shifts.map((shift, i) => (
          <div key={i} className="card p-0 overflow-hidden">
            {/* Day header */}
            <button
              onClick={() => setExpandedShift(expandedShift === shift.date ? null : shift.date)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
            >
              <div>
                <span className="font-semibold text-gray-900">{formatShortDate(shift.date)}</span>
                <span className="text-gray-500 text-sm ml-2">
                  {shift.startTime} – {shift.endTime} · {formatHours(shift.workedHours)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-gray-900">{formatCurrency(shift.totalPay)}</span>
                <span className="text-gray-400 text-sm">{expandedShift === shift.date ? '▲' : '▼'}</span>
              </div>
            </button>

            {/* Expanded detail */}
            {expandedShift === shift.date && (
              <div className="border-t border-gray-100 p-4 space-y-3">
                {/* Rate breakdown table */}
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-xs text-gray-500 border-b border-gray-100">
                      <th className="text-left pb-2">Period / Rate type</th>
                      <th className="text-right pb-2">Calculation</th>
                      <th className="text-right pb-2">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {shift.segments.map((seg: any, j: number) => {
                      const effectiveRate = seg.baseRate * seg.multiplier + (seg.addition_per_hour || 0);
                      return (
                        <tr key={j} className={clsx(seg.missedBreakPenalty && 'bg-warning-50')}>
                          <td className="py-1.5 text-gray-700">
                            <div className="font-medium">{seg.dayLabel}</div>
                            <div className={clsx('text-xs', seg.missedBreakPenalty ? 'text-warning-600 font-medium' : 'text-gray-400')}>
                              {seg.rateLabel}
                            </div>
                            {seg.explanation && (
                              <div className="text-xs text-warning-700 mt-0.5 italic">{seg.explanation}</div>
                            )}
                          </td>
                          <td className="py-1.5 text-right text-gray-600 text-sm">
                            {formatHours(seg.hours)} × {formatCurrency(effectiveRate)}/hr
                          </td>
                          <td className="py-1.5 text-right font-medium">{formatCurrency(seg.pay)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr className="border-t border-gray-200 font-bold">
                      <td colSpan={3} className="pt-2">Day total</td>
                      <td className="pt-2 text-right">{formatCurrency(shift.totalPay)}</td>
                    </tr>
                  </tfoot>
                </table>

                {/* Break violations */}
                {shift.breakViolations.length > 0 && (
                  <div className="space-y-1">
                    {shift.breakViolations.map((v: any, j: number) => (
                      <div key={j} className="warning-box text-xs">⚠️ {v.message}</div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Break violation summary */}
      {summary.allBreakViolations.length > 0 && (
        <div className="warning-box space-y-2">
          <p className="font-semibold">Break entitlement issues</p>
          <ul className="text-sm space-y-1">
            {summary.allBreakViolations.map((v: any, i: number) => (
              <li key={i}>• {formatShortDate(v.date)}: {v.message}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex gap-3">
        <button onClick={onBack} className="btn-secondary flex-1">← Back</button>
        <button onClick={onNext} className="btn-primary flex-1">Next — Allowances →</button>
      </div>
    </div>
  );
}
