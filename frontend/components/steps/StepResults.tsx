'use client';

import { WageCheckState, AllowanceInfo } from '@/types';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { formatCurrency, formatHours, employmentTypeLabel } from '@/lib/utils';
import clsx from 'clsx';

interface Props {
  state: WageCheckState;
  onAmountPaidChange: (amount: string) => void;
  onStartOver: () => void;
}

export default function StepResults({ state, onAmountPaidChange, onStartOver }: Props) {
  const [allowanceInfo, setAllowanceInfo] = useState<AllowanceInfo[]>([]);
  const { calculationResult, employmentType, classificationResult, allowanceAnswers, amountActuallyPaid } = state;

  useEffect(() => {
    api.getAllowances()
      .then((data: unknown) => setAllowanceInfo(data as AllowanceInfo[]))
      .catch(() => {});
  }, []);

  if (!calculationResult || !employmentType || !classificationResult) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Something went wrong. Please start over.</p>
        <button onClick={onStartOver} className="btn-primary mt-4">Start over</button>
      </div>
    );
  }

  const { summary, baseHourlyRate } = calculationResult;
  const triggeredAllowances = allowanceAnswers.filter(a => a.triggered);
  const allowanceInfoByType = Object.fromEntries(allowanceInfo.map(a => [a.allowance_type, a]));

  const paidAmount = parseFloat(amountActuallyPaid.replace(/[^0-9.]/g, ''));
  const hasPaidAmount = !isNaN(paidAmount) && paidAmount > 0;
  const underpayment = hasPaidAmount ? summary.totalPayOwed - paidAmount : null;
  const wasUnderpaid = underpayment !== null && underpayment > 0.50;
  const wasOverpaid = underpayment !== null && underpayment < -0.50;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">Your results</h2>
        <p className="text-gray-600">
          Here's a summary of what the award says you should have been paid.
        </p>
      </div>

      {/* Main summary card */}
      <div className="card bg-brand-50 border-brand-200 space-y-4">
        <div>
          <p className="text-sm text-gray-500">Based on</p>
          <p className="font-semibold text-gray-900">
            {employmentTypeLabel(employmentType)} —{' '}
            {classificationResult.classification?.title || `Level ${classificationResult.level}`}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Base rate: {formatCurrency(baseHourlyRate)}/hr
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-lg p-3">
            <p className="text-xs text-gray-500">Hours worked</p>
            <p className="text-2xl font-bold text-gray-900">{formatHours(summary.totalWorkedHours)}</p>
          </div>
          <div className="bg-white rounded-lg p-3">
            <p className="text-xs text-gray-500">Total owed (award minimum)</p>
            <p className="text-2xl font-bold text-brand-700">{formatCurrency(summary.totalPayOwed)}</p>
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between py-1 border-b border-brand-100">
            <span className="text-gray-600">Ordinary hours pay</span>
            <span className="font-medium">{formatCurrency(summary.ordinaryPay)}</span>
          </div>
          {summary.penaltyPay > 0 && (
            <div className="flex justify-between py-1 border-b border-brand-100">
              <span className="text-gray-600">Penalty rate loading</span>
              <span className="font-medium">{formatCurrency(summary.penaltyPay)}</span>
            </div>
          )}
          {summary.overtimePay > 0 && (
            <div className="flex justify-between py-1 border-b border-brand-100">
              <span className="text-gray-600">Overtime pay</span>
              <span className="font-medium">{formatCurrency(summary.overtimePay)}</span>
            </div>
          )}
          <div className="flex justify-between py-1 font-bold text-base">
            <span>Total</span>
            <span>{formatCurrency(summary.totalPayOwed)}</span>
          </div>
        </div>
      </div>

      {/* Allowances */}
      {triggeredAllowances.length > 0 && (
        <div className="card space-y-3">
          <h3 className="font-bold text-gray-900">Allowances owed (additional)</h3>
          <p className="text-sm text-gray-500">
            These are on top of your shift pay and are not included in the total above.
          </p>
          <ul className="space-y-3">
            {triggeredAllowances.map(a => {
              const info = allowanceInfoByType[a.type];
              if (!info) return null;
              return (
                <li key={a.type} className="text-sm">
                  <p className="font-semibold text-gray-900">{info.name}</p>
                  <p className="text-gray-600">{info.description}</p>
                  {info.amount && (
                    <p className="text-success-700 font-semibold mt-1">
                      {formatCurrency(info.amount)} {info.per_unit?.replace('_', ' ')}
                    </p>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Superannuation */}
      {summary.superAmount !== undefined && (
        <div className="card space-y-4">
          <div>
            <h3 className="font-bold text-gray-900">Superannuation estimate</h3>
            <p className="text-sm text-gray-500 mt-1">
              Super is paid by your employer on top of your wages — it goes directly to your super fund.
              Current SGC rate: {(summary.sgcRate * 100).toFixed(1)}% (from 1 July 2025).
            </p>
          </div>

          <div className="space-y-1 text-sm">
            <p className="font-semibold text-gray-700 text-xs uppercase tracking-wide">Shift pay — super eligibility</p>
            <div className="space-y-1">
              <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
                <span className="text-gray-600">Ordinary hours + penalty rates</span>
                <span className="flex items-center gap-2">
                  <span className="text-xs bg-success-100 text-success-700 px-2 py-0.5 rounded-full font-medium">super ✓</span>
                  <span className="font-medium w-20 text-right">{formatCurrency(summary.superEligiblePay)}</span>
                </span>
              </div>
              {summary.overtimePay > 0 && (
                <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
                  <span className="text-gray-600">Overtime pay</span>
                  <span className="flex items-center gap-2">
                    <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">no super</span>
                    <span className="text-gray-500 w-20 text-right">{formatCurrency(summary.overtimePay)}</span>
                  </span>
                </div>
              )}
              {summary.missedBreakPay > 0 && (
                <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
                  <span className="text-gray-600">Missed break double time</span>
                  <span className="flex items-center gap-2">
                    <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">no super</span>
                    <span className="text-gray-500 w-20 text-right">{formatCurrency(summary.missedBreakPay)}</span>
                  </span>
                </div>
              )}
            </div>

            {triggeredAllowances.length > 0 && (
              <>
                <p className="font-semibold text-gray-700 text-xs uppercase tracking-wide pt-3">Allowances — super eligibility</p>
                <div className="space-y-1">
                  {triggeredAllowances.map(a => {
                    const info = allowanceInfoByType[a.type];
                    if (!info) return null;
                    // Expense reimbursements: no super. Shift/responsibility loadings: super applies.
                    const superApplies = a.type === 'split_shift' || a.type === 'first_aid';
                    return (
                      <div key={a.type} className="flex justify-between items-center py-1.5 border-b border-gray-100">
                        <span className="text-gray-600">{info.name}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          superApplies ? 'bg-success-100 text-success-700' : 'bg-gray-100 text-gray-500'
                        }`}>
                          {superApplies ? 'super ✓' : 'no super'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>

          <div className="bg-brand-50 rounded-lg p-4 space-y-1">
            <div className="flex justify-between items-baseline">
              <span className="font-semibold text-gray-900">Estimated super owed</span>
              <span className="text-2xl font-bold text-brand-700">{formatCurrency(summary.superAmount)}</span>
            </div>
            <p className="text-xs text-gray-500">
              {formatCurrency(summary.superEligiblePay)} ordinary/penalty pay × {(summary.sgcRate * 100).toFixed(1)}% SGC
            </p>
          </div>

          <div className="info-box text-xs space-y-1.5">
            <p>
              <strong>Why isn't super paid on overtime?</strong> The ATO defines super-eligible earnings as
              "ordinary time earnings" (OTE). Overtime is excluded from OTE, so no super is payable on it.
              Penalty rates on ordinary hours (weekends, public holidays) are OTE and do attract super.
            </p>
            <p>
              <strong>Expense allowances</strong> (meal, vehicle, laundry) are not OTE — they reimburse your actual costs.
              Shift allowances (split shift, first aid) are OTE and attract super.
            </p>
            <p>
              If your employer isn't paying your super, contact the ATO on <strong>13 28 65</strong> or check your super fund balance.
              Unpaid super is recoverable for up to 4 years.
            </p>
          </div>
        </div>
      )}

      {/* Break violations */}
      {summary.allBreakViolations.length > 0 && (
        <div className="warning-box space-y-2">
          <h3 className="font-semibold text-gray-900">Break entitlement concerns</h3>
          <ul className="text-sm space-y-1">
            {summary.allBreakViolations.map((v, i) => (
              <li key={i}>⚠️ {v.message}</li>
            ))}
          </ul>
          <p className="text-sm text-gray-600">
            If your employer didn't provide required breaks, this may be a breach of the award.
            Contact Fair Work for advice.
          </p>
        </div>
      )}

      {/* What were you actually paid? */}
      <div className="card space-y-3">
        <h3 className="font-bold text-gray-900">Were you actually paid this much?</h3>
        <p className="text-sm text-gray-600">
          If you know what you were actually paid for this period, enter it below
          and we'll compare.
        </p>
        <div className="flex items-center gap-2">
          <span className="text-gray-700 font-medium">$</span>
          <input
            type="number"
            step="0.01"
            min="0"
            placeholder="0.00"
            value={amountActuallyPaid}
            onChange={e => onAmountPaidChange(e.target.value)}
            className="input-field max-w-xs"
          />
        </div>

        {hasPaidAmount && (
          <div className={clsx(
            'rounded-xl p-4 space-y-2',
            wasUnderpaid ? 'bg-danger-50 border border-danger-100' :
            wasOverpaid ? 'bg-gray-50 border border-gray-200' :
            'bg-success-50 border border-success-100'
          )}>
            {wasUnderpaid && (
              <>
                <p className="font-bold text-danger-700">
                  Possible underpayment: {formatCurrency(Math.abs(underpayment!))}
                </p>
                <p className="text-sm text-gray-700">
                  Based on what you've told us, you may have been paid {formatCurrency(Math.abs(underpayment!))} less
                  than the award minimum for this period.
                </p>
                <p className="text-sm text-gray-600">
                  This is an estimate based on the information you provided. Your actual entitlements may be
                  different depending on your specific arrangement with your employer.
                </p>
              </>
            )}
            {wasOverpaid && (
              <p className="text-sm text-gray-700">
                You appear to have been paid more than the award minimum — great! This is allowed.
                Some employers pay above award rates.
              </p>
            )}
            {!wasUnderpaid && !wasOverpaid && (
              <p className="text-sm text-gray-700">
                What you were paid appears to match the award minimum fairly closely.
              </p>
            )}
          </div>
        )}
      </div>

      {/* Warnings */}
      <div className="space-y-4">
        <h3 className="font-bold text-gray-900 text-lg">Important things to know</h3>

        {/* IFA warning */}
        <details className="card cursor-pointer">
          <summary className="font-semibold text-gray-900 list-none flex justify-between items-center">
            <span>Individual Flexibility Arrangements (IFAs)</span>
            <span className="text-gray-400 text-sm">Tap to read</span>
          </summary>
          <div className="mt-3 text-sm text-gray-600 space-y-2">
            <p>
              Your employer may have a written agreement with you that varies some award conditions.
              This is called an <strong>Individual Flexibility Arrangement</strong>.
            </p>
            <p>An IFA is <strong>only valid</strong> if:</p>
            <ul className="space-y-1 ml-4">
              {[
                'It is in writing and signed by both you and your employer',
                'You genuinely agreed to it — you cannot be forced into one',
                'It leaves you better off overall (not just in some areas)',
                'It specifies which award conditions it changes',
                'A copy was given to you within 14 days of signing',
                'It includes a dispute resolution process',
              ].map((req, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-brand-500 shrink-0">•</span>
                  {req}
                </li>
              ))}
            </ul>
            <p>
              <strong>You can cancel an IFA</strong> by giving your employer 13 weeks' written notice.
              You don't need a reason.
            </p>
          </div>
        </details>

        {/* Annualised salary warning */}
        <details className="card cursor-pointer">
          <summary className="font-semibold text-gray-900 list-none flex justify-between items-center">
            <span>Annualised salary arrangements</span>
            <span className="text-gray-400 text-sm">Tap to read</span>
          </summary>
          <div className="mt-3 text-sm text-gray-600 space-y-2">
            <p>
              Some employers pay a flat annual salary instead of hourly rates with penalties and overtime.
            </p>
            <p>If your employer does this, they <strong>must</strong>:</p>
            <ul className="space-y-1 ml-4">
              {[
                'Put the arrangement in writing',
                'Calculate in advance how many overtime and penalty rate hours are included',
                "Pay you at least what you'd earn under the award",
                'Do a reconciliation at least every 12 months — comparing what you received against what the award would have paid',
                'Pay the difference if you were underpaid during that year',
              ].map((req, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-brand-500 shrink-0">•</span>
                  {req}
                </li>
              ))}
            </ul>
            <p>
              If your employer hasn't done this reconciliation, or if your salary is less than your award entitlements,
              you may be owed money.
            </p>
          </div>
        </details>
      </div>

      {/* Call to action */}
      {wasUnderpaid && (
        <div className="card bg-danger-50 border-danger-100 space-y-3">
          <h3 className="font-bold text-danger-700">Think you've been underpaid?</h3>
          <p className="text-sm text-gray-700">Here's what you can do:</p>
          <ol className="text-sm text-gray-700 space-y-2">
            <li className="flex gap-2">
              <span className="font-bold text-brand-600 shrink-0">1.</span>
              <span>Talk to your employer first if you feel safe to do so. It might be a mistake.</span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-brand-600 shrink-0">2.</span>
              <span>Contact the <strong>Fair Work Ombudsman</strong> — they can investigate and recover money for you.
                Phone: <a href="tel:131394" className="underline font-semibold">13 13 94</a>.
                You can also lodge an anonymous tip at fairwork.gov.au.</span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-brand-600 shrink-0">3.</span>
              <span>Contact your union (if you have one) or a community legal centre for free advice.</span>
            </li>
          </ol>
        </div>
      )}

      {/* Legal disclaimer */}
      <div className="info-box text-sm space-y-2">
        <p>
          <strong>Remember:</strong> This tool gives you general information based on what you've told us.
          It is not legal advice. The actual amount you're owed may be different depending on your specific
          situation, any agreements with your employer, and the accuracy of the information you entered.
        </p>
        <p>
          Pay rates shown are effective <strong>1 July 2025</strong>. Rates are updated each July —
          check <a href="https://www.fairwork.gov.au" target="_blank" rel="noopener noreferrer" className="underline">fairwork.gov.au</a> for the latest.
        </p>
      </div>

      <button onClick={onStartOver} className="btn-ghost w-full text-center">
        Start a new check →
      </button>
    </div>
  );
}
