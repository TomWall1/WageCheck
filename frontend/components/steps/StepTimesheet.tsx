'use client';

import { useState } from 'react';
import { EmploymentType, Shift, CalculationResult } from '@/types';
import { api } from '@/lib/api';
import { generateShiftId, formatShortDate, formatCurrency, formatHours, getDayLabel, getMultiplierLabel } from '@/lib/utils';
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
  classificationResult: ClassificationResult;
  shifts: Shift[];
  onShiftsChange: (shifts: Shift[]) => void;
  onResult: (result: CalculationResult) => void;
  onNext: () => void;
  onBack: () => void;
}

const EMPTY_SHIFT: Omit<Shift, 'id'> = {
  date: '',
  startTime: '09:00',
  endTime: '17:00',
  mealBreakTaken: false,
  mealBreakDuration: 30,
  restBreakTaken: false,
};

function getTodayStr() {
  return new Date().toISOString().split('T')[0];
}

export default function StepTimesheet({
  employmentType,
  classificationResult,
  shifts,
  onShiftsChange,
  onResult,
  onNext,
  onBack,
}: Props) {
  const [calculating, setCalculating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<CalculationResult | null>(null);

  function addShift() {
    const newShift: Shift = {
      ...EMPTY_SHIFT,
      id: generateShiftId(),
      date: getTodayStr(),
    };
    onShiftsChange([...shifts, newShift]);
  }

  function updateShift(id: string, updates: Partial<Shift>) {
    onShiftsChange(shifts.map(s => s.id === id ? { ...s, ...updates } : s));
    setResult(null);
  }

  function removeShift(id: string) {
    onShiftsChange(shifts.filter(s => s.id !== id));
    setResult(null);
  }

  async function handleCalculate() {
    if (!classificationResult.classification) {
      setError('No classification found. Please go back and complete the classification step.');
      return;
    }

    const validShifts = shifts.filter(s => s.date && s.startTime && s.endTime);
    if (validShifts.length === 0) {
      setError('Please add at least one shift.');
      return;
    }

    setCalculating(true);
    setError(null);
    try {
      const res = await api.calculate({
        employmentType,
        classificationId: classificationResult.classification.id,
        shifts: validShifts.map(s => ({
          date: s.date,
          startTime: s.startTime,
          endTime: s.endTime,
          mealBreakTaken: s.mealBreakTaken,
          mealBreakDuration: s.mealBreakDuration,
          restBreakTaken: s.restBreakTaken,
        })),
      }) as CalculationResult;

      setResult(res);
      onResult(res);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Calculation failed. Please try again.');
    } finally {
      setCalculating(false);
    }
  }

  const empLabel = employmentType === 'full_time' ? 'Full-time' : employmentType === 'part_time' ? 'Part-time' : 'Casual';

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">Enter your shifts</h2>
        <p className="text-gray-600">
          Add each shift you worked. You can add up to two weeks' worth. We'll work out
          what you should have been paid for each one.
        </p>
        <div className="info-box text-sm">
          <strong>{empLabel} — Level {classificationResult.level}:</strong>{' '}
          {classificationResult.classification?.title}
          {classificationResult.classification?.base_rate && (
            <span className="ml-2 text-brand-700 font-semibold">
              ${Number(classificationResult.classification.base_rate).toFixed(2)}/hr
            </span>
          )}
        </div>
      </div>

      {/* Shift list */}
      <div className="space-y-4">
        {shifts.map((shift, idx) => (
          <ShiftCard
            key={shift.id}
            shift={shift}
            index={idx}
            onChange={(updates) => updateShift(shift.id, updates)}
            onRemove={() => removeShift(shift.id)}
          />
        ))}

        <button
          onClick={addShift}
          className="w-full py-4 rounded-xl border-2 border-dashed border-gray-300 text-gray-500 hover:border-brand-400 hover:text-brand-600 transition-colors font-medium"
        >
          + Add a shift
        </button>
      </div>

      {shifts.length > 0 && !result && (
        <button
          onClick={handleCalculate}
          disabled={calculating}
          className="btn-primary w-full"
        >
          {calculating ? 'Calculating...' : 'Calculate what I should have been paid →'}
        </button>
      )}

      {error && (
        <div className="danger-box text-sm">{error}</div>
      )}

      {/* Results preview */}
      {result && (
        <div className="space-y-4">
          <div className="card space-y-4">
            <h3 className="font-bold text-gray-900 text-lg">Pay breakdown</h3>

            {/* Summary */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500">Total hours worked</p>
                <p className="text-xl font-bold text-gray-900">{formatHours(result.summary.totalWorkedHours)}</p>
              </div>
              <div className="bg-brand-50 rounded-lg p-3">
                <p className="text-xs text-gray-500">Total pay owed</p>
                <p className="text-xl font-bold text-brand-700">{formatCurrency(result.summary.totalPayOwed)}</p>
              </div>
              {result.summary.penaltyPay > 0 && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">Ordinary hours pay</p>
                  <p className="text-lg font-semibold text-gray-700">{formatCurrency(result.summary.ordinaryPay)}</p>
                </div>
              )}
              {result.summary.penaltyPay > 0 && (
                <div className="bg-warning-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">Penalty rate loading</p>
                  <p className="text-lg font-semibold text-warning-700">{formatCurrency(result.summary.penaltyPay)}</p>
                </div>
              )}
              {result.summary.overtimePay > 0 && (
                <div className="bg-warning-50 rounded-lg p-3 col-span-2">
                  <p className="text-xs text-gray-500">Overtime pay</p>
                  <p className="text-lg font-semibold text-warning-700">{formatCurrency(result.summary.overtimePay)}</p>
                </div>
              )}
            </div>

            {/* Per-shift breakdown */}
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-900 text-sm">By shift:</h4>
              {result.shifts.map((shiftResult, i) => (
                <div key={i} className="border border-gray-200 rounded-lg p-3 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{formatShortDate(shiftResult.date)}</p>
                      <p className="text-xs text-gray-500">
                        {shiftResult.startTime} – {shiftResult.endTime}
                        {' · '}{formatHours(shiftResult.workedHours)} worked
                      </p>
                    </div>
                    <p className="font-bold text-gray-900">{formatCurrency(shiftResult.totalPay)}</p>
                  </div>

                  {/* Segment breakdown */}
                  {shiftResult.segments.length > 1 && (
                    <div className="space-y-1 pt-1 border-t border-gray-100">
                      {shiftResult.segments.map((seg, j) => (
                        <div key={j} className="flex justify-between text-xs text-gray-500">
                          <span>{getDayLabel(seg.dayType)} — {getMultiplierLabel(seg.multiplier)} ({formatHours(seg.hours)})</span>
                          <span>{formatCurrency(seg.pay)}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Break violations */}
                  {shiftResult.breakViolations.length > 0 && (
                    <div className="warning-box text-xs space-y-1 mt-2">
                      {shiftResult.breakViolations.map((v, j) => (
                        <p key={j}>⚠️ {v.message}</p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Break violations summary */}
          {result.summary.allBreakViolations.length > 0 && (
            <div className="warning-box space-y-2">
              <p className="font-semibold">Break entitlement concerns</p>
              <p className="text-sm">
                Based on what you've entered, it looks like break entitlements may not have been met on some shifts.
                Under the award, your employer is required to provide these breaks.
              </p>
              <ul className="space-y-1 text-sm">
                {result.summary.allBreakViolations.map((v, i) => (
                  <li key={i}>• {formatShortDate(v.date)}: {v.message}</li>
                ))}
              </ul>
            </div>
          )}

          <p className="text-xs text-gray-400 text-center">
            Calculations are based on award minimum rates only. Your employer may owe you more if they pay above award.
          </p>

          <div className="flex gap-3">
            <button onClick={onBack} className="btn-secondary flex-1">← Back</button>
            <button onClick={onNext} className="btn-primary flex-1">Next — Allowances →</button>
          </div>
        </div>
      )}

      {!result && (
        <button onClick={onBack} className="btn-ghost">← Back</button>
      )}
    </div>
  );
}

interface ShiftCardProps {
  shift: Shift;
  index: number;
  onChange: (updates: Partial<Shift>) => void;
  onRemove: () => void;
}

function ShiftCard({ shift, index, onChange, onRemove }: ShiftCardProps) {
  return (
    <div className="card space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="font-semibold text-gray-900">Shift {index + 1}</h4>
        <button onClick={onRemove} className="text-sm text-gray-400 hover:text-danger-500 transition-colors">
          Remove
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
          <input
            type="date"
            value={shift.date}
            onChange={e => onChange({ date: e.target.value })}
            className="input-field"
            max={getTodayStr()}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Start time</label>
          <input
            type="time"
            value={shift.startTime}
            onChange={e => onChange({ startTime: e.target.value })}
            className="input-field"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Finish time</label>
          <input
            type="time"
            value={shift.endTime}
            onChange={e => onChange({ endTime: e.target.value })}
            className="input-field"
          />
        </div>
      </div>

      <div className="space-y-3">
        {/* Meal break */}
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id={`meal-${shift.id}`}
            checked={shift.mealBreakTaken}
            onChange={e => onChange({ mealBreakTaken: e.target.checked })}
            className="mt-1 h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
          />
          <div className="flex-1">
            <label htmlFor={`meal-${shift.id}`} className="text-sm font-medium text-gray-700 cursor-pointer">
              I took an unpaid meal break
            </label>
            {shift.mealBreakTaken && (
              <div className="mt-2 flex items-center gap-2">
                <label className="text-sm text-gray-500 shrink-0">How long?</label>
                <select
                  value={shift.mealBreakDuration}
                  onChange={e => onChange({ mealBreakDuration: Number(e.target.value) })}
                  className="select-field text-sm py-1"
                >
                  <option value={20}>20 minutes</option>
                  <option value={30}>30 minutes</option>
                  <option value={45}>45 minutes</option>
                  <option value={60}>1 hour</option>
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Rest break */}
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id={`rest-${shift.id}`}
            checked={shift.restBreakTaken}
            onChange={e => onChange({ restBreakTaken: e.target.checked })}
            className="mt-1 h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
          />
          <label htmlFor={`rest-${shift.id}`} className="text-sm font-medium text-gray-700 cursor-pointer">
            I was given a paid 10-minute rest break
          </label>
        </div>
      </div>

      <p className="text-xs text-gray-400">
        Tip: If your shift crossed midnight (e.g. 10pm to 3am), enter those times and we'll handle the date change automatically.
      </p>
    </div>
  );
}
