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

function employmentLabel(type: string) {
  return { full_time: 'Full-time', part_time: 'Part-time', casual: 'Casual' }[type] || type;
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-AU', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
}

function formatTime(t: string) {
  const [h, m] = t.split(':').map(Number);
  const period = h >= 12 ? 'pm' : 'am';
  const hour = h % 12 || 12;
  return `${hour}:${m.toString().padStart(2, '0')}${period}`;
}

export default function StepResults({ state, onAmountPaidChange, onStartOver }: Props) {
  const [allowanceInfo, setAllowanceInfo] = useState<AllowanceInfo[]>([]);
  const [allowancesPaid, setAllowancesPaid] = useState('');
  const [superPaid, setSuperPaid] = useState('');
  const { calculationResult, employmentType, classificationResult, allowanceAnswers, amountActuallyPaid } = state;

  useEffect(() => {
    api.getAllowances(state.awardCode)
      .then((data: unknown) => setAllowanceInfo(data as AllowanceInfo[]))
      .catch(() => {});
  }, [state.awardCode]);

  if (!calculationResult || !employmentType || !classificationResult) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Something went wrong. Please start over.</p>
        <button onClick={onStartOver} className="btn-primary mt-4">Start over</button>
      </div>
    );
  }

  const { summary, baseHourlyRate, shifts } = calculationResult;
  const triggeredAllowances = allowanceAnswers.filter(a => a.triggered);
  const allowanceInfoByType = Object.fromEntries(allowanceInfo.map(a => [a.allowance_type, a]));

  const paidAmount = parseFloat(amountActuallyPaid.replace(/[^0-9.]/g, ''));
  const hasPaidAmount = !isNaN(paidAmount) && paidAmount > 0;
  const underpayment = hasPaidAmount ? summary.totalPayOwed - paidAmount : null;
  const wasUnderpaid = underpayment !== null && underpayment > 0.50;
  const wasOverpaid = underpayment !== null && underpayment < -0.50;

  // Compute total allowances owed (additional, not included in wages)
  const totalAllowancesOwed = triggeredAllowances.reduce((sum, a) => {
    const info = allowanceInfoByType[a.type];
    if (!info || !info.amount) return sum;
    if (a.detail && info.amount_type === 'per_km') return sum + info.amount * parseFloat(a.detail || '0');
    return sum + info.amount;
  }, 0);

  const paidAllowances = parseFloat(allowancesPaid.replace(/[^0-9.]/g, ''));
  const hasPaidAllowances = !isNaN(paidAllowances) && paidAllowances >= 0 && allowancesPaid !== '';
  const allowanceDiff = hasPaidAllowances ? totalAllowancesOwed - paidAllowances : null;

  const paidSuper = parseFloat(superPaid.replace(/[^0-9.]/g, ''));
  const hasPaidSuper = !isNaN(paidSuper) && paidSuper >= 0 && superPaid !== '';
  const superDiff = hasPaidSuper ? (summary.superAmount ?? 0) - paidSuper : null;

  const sgcPct = `${(summary.sgcRate * 100).toFixed(0)}%`;

  function handleDownloadReport() {
    const dateGenerated = new Date().toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' });
    const clsTitle = classificationResult?.classification?.title || `Level ${classificationResult?.level}`;
    const triggeredAllowanceLines = triggeredAllowances.map(a => {
      const info = allowanceInfoByType[a.type];
      if (!info) return '';
      const superApplies = a.type === 'split_shift' || a.type === 'first_aid';
      let amtStr = '';
      if (a.detail && info.amount_type === 'per_km' && info.amount) {
        amtStr = formatCurrency(info.amount * parseFloat(a.detail || '0'));
      } else if (info.amount) {
        amtStr = `${formatCurrency(info.amount)} ${info.per_unit?.replace(/_/g, ' ') || ''}`;
      }
      return `<tr><td>${info.name}</td><td>${amtStr}</td><td>${superApplies ? 'Yes' : 'No (expense reimbursement)'}</td></tr>`;
    }).join('');

    // Build per-shift breakdown HTML
    const shiftBreakdownHtml = shifts.map(shift => {
      const segRows = shift.segments.map(seg =>
        `<tr>
          <td>${seg.rateLabel || seg.dayType}</td>
          <td style="text-align:right">${seg.hours.toFixed(2)}</td>
          <td style="text-align:right">${formatCurrency(seg.effectiveRate)}/hr</td>
          <td style="text-align:right">${formatCurrency(seg.pay)}</td>
        </tr>`
      ).join('');
      return `
        <tr style="background:#f8fafc">
          <td colspan="4"><strong>${formatDate(shift.date)}</strong> — ${formatTime(shift.startTime)}–${formatTime(shift.endTime)} (${formatHours(shift.workedHours)} worked)</td>
        </tr>
        ${segRows}
      `;
    }).join('');

    // Super breakdown HTML
    const superRows = (summary.superBreakdown || []).map(row =>
      `<tr>
        <td>${row.rateLabel}</td>
        <td style="text-align:right">${row.effectiveRate !== null ? formatCurrency(row.effectiveRate) + '/hr' : '—'}</td>
        <td style="text-align:right">${row.hours.toFixed(2)}</td>
        <td style="text-align:right">${formatCurrency(row.totalPay)}</td>
        <td style="text-align:right">${row.superApplies ? sgcPct : '0%'}</td>
        <td style="text-align:right">${row.superApplies ? formatCurrency(row.superAmount) : '—'}</td>
      </tr>`
    ).join('');

    const awardLabel = state.awardCode === 'MA000003'
      ? 'Fast Food Industry Award 2020 [MA000003]'
      : state.awardCode === 'MA000119'
        ? 'Restaurant Industry Award 2020 [MA000119]'
        : state.awardCode === 'MA000004'
          ? 'General Retail Industry Award 2020 [MA000004]'
          : state.awardCode === 'MA000094'
            ? 'Fitness Industry Award 2020 [MA000094]'
            : 'Hospitality Industry (General) Award 2020 [MA000009]';

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>WageCheck Pay Entitlements Estimate</title>
<style>
  body { font-family: Arial, Helvetica, sans-serif; color: #111; margin: 40px; font-size: 13px; line-height: 1.5; }
  h1 { font-size: 22px; color: #1e40af; margin-bottom: 4px; }
  h2 { font-size: 15px; color: #1e3a8a; border-bottom: 1px solid #bfdbfe; padding-bottom: 4px; margin-top: 24px; }
  .disclaimer { background: #fef9c3; border: 1px solid #fde047; padding: 12px; border-radius: 6px; font-size: 12px; margin: 16px 0; }
  .disclaimer strong { color: #854d0e; }
  table { width: 100%; border-collapse: collapse; margin-top: 8px; }
  th { background: #eff6ff; text-align: left; padding: 6px 8px; font-size: 12px; color: #1e40af; }
  th.r { text-align: right; }
  td { padding: 6px 8px; border-bottom: 1px solid #e5e7eb; vertical-align: top; }
  .total-row td { font-weight: bold; background: #eff6ff; }
  .super-row td { color: #166534; }
  .footer { margin-top: 32px; font-size: 11px; color: #6b7280; border-top: 1px solid #e5e7eb; padding-top: 12px; }
  .meta { color: #6b7280; font-size: 12px; }
  .info-box { background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 6px; padding: 10px 12px; font-size: 12px; margin-top: 8px; }
  @media print { body { margin: 20px; } }
</style>
</head>
<body>
<h1>WageCheck — Pay Entitlements Estimate</h1>
<p class="meta">Generated: ${dateGenerated} &nbsp;|&nbsp; wagecheck.vercel.app</p>

<div class="disclaimer">
  <strong>IMPORTANT — READ BEFORE USING THIS DOCUMENT</strong><br>
  This report is an <strong>estimate only</strong>, generated automatically from information entered by the user.
  It is <strong>not legal advice</strong> and should not be relied upon as a definitive statement of entitlements.
  Actual entitlements depend on the specific facts of your employment, any enterprise agreement or IFA in place,
  correct classification, accurate shift records, and current award rates. Pay rates are based on the
  ${awardLabel}, effective 1 July 2025.
  Always verify at <strong>fairwork.gov.au</strong> or seek independent legal advice before taking action.
</div>

<h2>Employment Details</h2>
<table>
  <tr><td><strong>Employment type</strong></td><td>${employmentLabel(employmentType!)}</td></tr>
  <tr><td><strong>Classification</strong></td><td>${clsTitle}</td></tr>
  <tr><td><strong>Stream / Level</strong></td><td>${classificationResult?.stream ? (classificationResult.stream.replace('_', ' ')) : ''} — Level ${classificationResult?.level}</td></tr>
  <tr><td><strong>Base hourly rate</strong></td><td>${formatCurrency(baseHourlyRate)}/hr (incl. casual loading if applicable)</td></tr>
  <tr><td><strong>Rates effective</strong></td><td>1 July 2025</td></tr>
</table>

<h2>Pay Summary</h2>
<table>
  <tr><th>Component</th><th class="r">Amount</th><th>Super applies?</th></tr>
  <tr><td>Ordinary hours pay</td><td style="text-align:right">${formatCurrency(summary.ordinaryPay)}</td><td>Yes (${sgcPct})</td></tr>
  ${summary.penaltyPay > 0 ? `<tr><td>Penalty rate loading</td><td style="text-align:right">${formatCurrency(summary.penaltyPay)}</td><td>Yes (${sgcPct})</td></tr>` : ''}
  ${summary.missedBreakPay > 0 ? `<tr><td>Missed break double time penalty</td><td style="text-align:right">${formatCurrency(summary.missedBreakPay)}</td><td>No (overtime-type penalty)</td></tr>` : ''}
  ${summary.overtimePay > 0 ? `<tr><td>Overtime loading</td><td style="text-align:right">${formatCurrency(summary.overtimePay)}</td><td>No</td></tr>` : ''}
  ${summary.mealAllowancePay > 0 ? `<tr><td>Meal allowance for overtime (${summary.mealAllowancesOwed} × ${formatCurrency(summary.mealAllowanceRate)})</td><td style="text-align:right">${formatCurrency(summary.mealAllowancePay)}</td><td>No (expense allowance)</td></tr>` : ''}
  <tr class="total-row"><td>Total wages owed</td><td style="text-align:right">${formatCurrency(summary.totalPayOwed)}</td><td>—</td></tr>
</table>

<h2>Pay Breakdown by Shift</h2>
<table>
  <tr>
    <th>Date / Pay category</th>
    <th class="r">Hours</th>
    <th class="r">Rate</th>
    <th class="r">Pay</th>
  </tr>
  ${shiftBreakdownHtml}
</table>

${triggeredAllowances.length > 0 ? `
<h2>Allowances (additional, not included in wages total)</h2>
<table>
  <tr><th>Allowance</th><th>Amount</th><th>Super applies?</th></tr>
  ${triggeredAllowanceLines}
</table>
` : ''}

<h2>Superannuation Breakdown</h2>
<table>
  <tr>
    <th>Pay category</th>
    <th class="r">Rate</th>
    <th class="r">Hours</th>
    <th class="r">Total pay</th>
    <th class="r">Super %</th>
    <th class="r">Super $</th>
  </tr>
  ${superRows}
  <tr class="super-row total-row">
    <td colspan="3"><strong>Super-eligible earnings (OTE)</strong></td>
    <td style="text-align:right"><strong>${formatCurrency(summary.superEligiblePay)}</strong></td>
    <td style="text-align:right"><strong>${sgcPct}</strong></td>
    <td style="text-align:right"><strong>${formatCurrency(summary.superAmount)}</strong></td>
  </tr>
</table>
<div class="info-box">
  <strong>Super is paid on top of your wages — it goes directly to your super fund account.</strong><br>
  <strong>Due dates:</strong> Super must be paid into your fund on or before the <strong>28th day of the month following each quarter</strong>
  (i.e. by 28 October, 28 January, 28 April, and 28 July each year).<br>
  <strong>From 1 July 2026 — Payday Super:</strong> Super will be required to be in your account within <strong>7 days of each pay day</strong>.
  This is a significant change — late super will attract penalties for employers.<br>
  If your super is missing or late, contact the <strong>ATO on 13 28 65</strong> or check your super fund balance online.
  Unpaid super is recoverable for up to 4 years.
</div>

${summary.allBreakViolations.length > 0 ? `
<h2>Break Entitlement Concerns</h2>
<ul>${summary.allBreakViolations.map(v => `<li>${v.message} (${v.date})</li>`).join('')}</ul>
` : ''}

${(hasPaidAmount || hasPaidAllowances || hasPaidSuper) ? `
<h2>Payment Comparison</h2>
<table>
  <tr><th>Component</th><th class="r">Award minimum</th><th class="r">Actually paid</th><th class="r">Difference</th></tr>
  ${hasPaidAmount ? `<tr>
    <td>Wages</td>
    <td style="text-align:right">${formatCurrency(summary.totalPayOwed)}</td>
    <td style="text-align:right">${formatCurrency(paidAmount)}</td>
    <td style="text-align:right;${wasUnderpaid ? 'color:#dc2626;font-weight:bold' : ''}">${wasUnderpaid ? '-' : ''}${formatCurrency(Math.abs(underpayment!))}</td>
  </tr>` : ''}
  ${hasPaidAllowances && totalAllowancesOwed > 0 ? `<tr>
    <td>Allowances</td>
    <td style="text-align:right">${formatCurrency(totalAllowancesOwed)}</td>
    <td style="text-align:right">${formatCurrency(paidAllowances)}</td>
    <td style="text-align:right;${(allowanceDiff ?? 0) > 0.50 ? 'color:#dc2626;font-weight:bold' : ''}">${(allowanceDiff ?? 0) > 0.50 ? '-' : ''}${formatCurrency(Math.abs(allowanceDiff ?? 0))}</td>
  </tr>` : ''}
  ${hasPaidSuper ? `<tr>
    <td>Superannuation</td>
    <td style="text-align:right">${formatCurrency(summary.superAmount)}</td>
    <td style="text-align:right">${formatCurrency(paidSuper)}</td>
    <td style="text-align:right;${(superDiff ?? 0) > 0.50 ? 'color:#dc2626;font-weight:bold' : ''}">${(superDiff ?? 0) > 0.50 ? '-' : ''}${formatCurrency(Math.abs(superDiff ?? 0))}</td>
  </tr>` : ''}
</table>
` : ''}

<h2>What to do if you've been underpaid</h2>
<ol>
  <li>Speak with your employer if you feel safe to do so — it may be an error.</li>
  <li>Contact the <strong>Fair Work Ombudsman</strong>: <strong>13 13 94</strong> or fairwork.gov.au. They can investigate and recover money on your behalf.</li>
  <li>Contact your union (if applicable) or a community legal centre for free advice.</li>
  <li>Regarding unpaid super: contact the <strong>ATO on 13 28 65</strong>. Unpaid super is recoverable for up to 4 years.</li>
</ol>

<div class="footer">
  <strong>Disclaimer:</strong> This document is an automated estimate based solely on information entered by the user into WageCheck (wagecheck.vercel.app).
  It is not legal advice and is subject to the accuracy of the inputs provided. The ${awardLabel} rates shown are effective 1 July 2025.
  Enterprise agreements, IFAs, or annualised salary arrangements may override award rates.
  Always verify your entitlements at fairwork.gov.au or seek advice from a qualified employment lawyer or the Fair Work Ombudsman before taking action.
  WageCheck accepts no liability for any decisions made based on this report.
</div>

<script>window.print();</script>
</body>
</html>`;

    const reportWindow = window.open('', '_blank');
    if (!reportWindow) {
      alert('Please allow pop-ups to download the report.');
      return;
    }
    reportWindow.document.write(html);
    reportWindow.document.close();
  }

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
          {summary.missedBreakPay > 0 && (
            <div className="flex justify-between py-1 border-b border-brand-100">
              <span className="text-gray-600">Missed break double time</span>
              <span className="font-medium">{formatCurrency(summary.missedBreakPay)}</span>
            </div>
          )}
          {summary.overtimePay > 0 && (
            <div className="flex justify-between py-1 border-b border-brand-100">
              <span className="text-gray-600">Overtime loading</span>
              <span className="font-medium">{formatCurrency(summary.overtimePay)}</span>
            </div>
          )}
          {summary.mealAllowancePay > 0 && (
            <div className="flex justify-between py-1 border-b border-brand-100">
              <span className="text-gray-600">
                Meal allowance (overtime)
                {summary.mealAllowancesOwed > 1 && ` ×${summary.mealAllowancesOwed}`}
              </span>
              <span className="font-medium">{formatCurrency(summary.mealAllowancePay)}</span>
            </div>
          )}
          <div className="flex justify-between py-1 font-bold text-base">
            <span>Total wages owed</span>
            <span>{formatCurrency(summary.totalPayOwed)}</span>
          </div>
          {summary.superAmount !== undefined && (
            <div className="flex justify-between py-1 border-t border-brand-200 pt-2 mt-1">
              <span className="text-gray-600 text-sm">Super owed (on top of wages)</span>
              <span className="font-semibold text-brand-700">{formatCurrency(summary.superAmount)}</span>
            </div>
          )}
        </div>
      </div>

      {/* Pay breakdown by shift */}
      <div className="card space-y-3">
        <h3 className="font-bold text-gray-900">Pay breakdown by shift</h3>
        <p className="text-sm text-gray-500">
          Hours worked in each pay category, with the rate and total for each.
        </p>
        <div className="space-y-4">
          {shifts.map((shift, si) => (
            <details key={si} open={shifts.length === 1}>
              <summary className="cursor-pointer list-none flex justify-between items-center py-2 border-b border-gray-200">
                <div>
                  <span className="font-semibold text-gray-900 text-sm">{formatDate(shift.date)}</span>
                  <span className="text-gray-500 text-sm ml-2">
                    {formatTime(shift.startTime)}–{formatTime(shift.endTime)}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-semibold text-gray-900">{formatCurrency(shift.totalPay)}</span>
                  <span className="text-xs text-gray-400 ml-1">{formatHours(shift.workedHours)}</span>
                </div>
              </summary>
              <div className="mt-2 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 text-gray-600 text-xs">
                      <th className="text-left px-2 py-1.5 rounded-l font-medium">Pay category</th>
                      <th className="text-right px-2 py-1.5 font-medium">Hours</th>
                      <th className="text-right px-2 py-1.5 font-medium">Rate</th>
                      <th className="text-right px-2 py-1.5 rounded-r font-medium">Pay</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {shift.segments.map((seg, gi) => (
                      <tr key={gi}>
                        <td className="px-2 py-1.5 text-gray-700">{seg.rateLabel}</td>
                        <td className="px-2 py-1.5 text-right text-gray-600">{seg.hours.toFixed(2)}</td>
                        <td className="px-2 py-1.5 text-right text-gray-600">{formatCurrency(seg.effectiveRate)}/hr</td>
                        <td className="px-2 py-1.5 text-right font-medium text-gray-900">{formatCurrency(seg.pay)}</td>
                      </tr>
                    ))}
                    <tr className="bg-gray-50 font-semibold text-sm">
                      <td className="px-2 py-1.5 text-gray-900" colSpan={3}>Shift total</td>
                      <td className="px-2 py-1.5 text-right text-gray-900">{formatCurrency(shift.totalPay)}</td>
                    </tr>
                  </tbody>
                </table>
                {shift.mealBreakMinutes > 0 && (
                  <p className="text-xs text-gray-400 mt-1 px-2">
                    Includes {shift.mealBreakMinutes} min unpaid meal break deducted.
                  </p>
                )}
              </div>
            </details>
          ))}
        </div>
      </div>

      {/* Allowances */}
      {triggeredAllowances.length > 0 && (
        <div className="card space-y-3">
          <h3 className="font-bold text-gray-900">Allowances owed (additional)</h3>
          <p className="text-sm text-gray-500">
            These are on top of your shift pay and are not included in the wages total above.
          </p>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-xs">
                <th className="text-left px-2 py-1.5 rounded-l font-medium">Allowance</th>
                <th className="text-right px-2 py-1.5 rounded-r font-medium">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {triggeredAllowances.map(a => {
                const info = allowanceInfoByType[a.type];
                if (!info) return null;
                let amtDisplay = '—';
                if (a.detail && info.amount_type === 'per_km' && info.amount) {
                  amtDisplay = formatCurrency(info.amount * parseFloat(a.detail || '0'));
                } else if (info.amount) {
                  amtDisplay = `${formatCurrency(info.amount)} ${info.per_unit?.replace(/_/g, ' ') || ''}`;
                }
                return (
                  <tr key={a.type}>
                    <td className="px-2 py-1.5 text-gray-700">{info.name}</td>
                    <td className="px-2 py-1.5 text-right font-medium text-gray-900">{amtDisplay}</td>
                  </tr>
                );
              })}
            </tbody>
            {totalAllowancesOwed > 0 && (
              <tfoot>
                <tr className="bg-gray-50 font-semibold text-sm">
                  <td className="px-2 py-1.5 text-gray-900">Total allowances</td>
                  <td className="px-2 py-1.5 text-right text-gray-900">{formatCurrency(totalAllowancesOwed)}</td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      )}

      {/* Superannuation — detailed breakdown */}
      {summary.superAmount !== undefined && (
        <div className="card space-y-4">
          <div>
            <h3 className="font-bold text-gray-900">Superannuation breakdown</h3>
            <p className="text-sm text-gray-500 mt-1">
              Super is paid by your employer on top of your wages — it goes directly to your super fund.
              Current SGC rate: {sgcPct} (from 1 July 2025).
            </p>
          </div>

          {/* Per-category table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-gray-600 text-xs">
                  <th className="text-left px-2 py-2 rounded-l font-medium">Pay category</th>
                  <th className="text-right px-2 py-2 font-medium">Hours</th>
                  <th className="text-right px-2 py-2 font-medium">Rate</th>
                  <th className="text-right px-2 py-2 font-medium">Total pay</th>
                  <th className="text-right px-2 py-2 font-medium">Super %</th>
                  <th className="text-right px-2 py-2 rounded-r font-medium">Super $</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {(summary.superBreakdown || []).map((row, i) => (
                  <tr key={i}>
                    <td className="px-2 py-2 text-gray-700">{row.rateLabel}</td>
                    <td className="px-2 py-2 text-right text-gray-600">{row.hours.toFixed(2)}</td>
                    <td className="px-2 py-2 text-right text-gray-600">
                      {row.effectiveRate !== null ? `${formatCurrency(row.effectiveRate)}/hr` : '—'}
                    </td>
                    <td className="px-2 py-2 text-right text-gray-900 font-medium">{formatCurrency(row.totalPay)}</td>
                    <td className="px-2 py-2 text-right">
                      {row.superApplies
                        ? <span className="text-success-700 font-semibold">{sgcPct}</span>
                        : <span className="text-gray-400">0%</span>}
                    </td>
                    <td className="px-2 py-2 text-right font-medium">
                      {row.superApplies
                        ? <span className="text-success-700">{formatCurrency(row.superAmount)}</span>
                        : <span className="text-gray-400">—</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-brand-50 font-bold text-sm">
                  <td className="px-2 py-2 text-gray-900" colSpan={3}>Super-eligible earnings (OTE)</td>
                  <td className="px-2 py-2 text-right text-gray-900">{formatCurrency(summary.superEligiblePay)}</td>
                  <td className="px-2 py-2 text-right text-brand-700">{sgcPct}</td>
                  <td className="px-2 py-2 text-right text-brand-700">{formatCurrency(summary.superAmount)}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Super due dates notice */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 space-y-2 text-sm">
            <p className="font-semibold text-amber-900">When must super be paid?</p>
            <p className="text-amber-800">
              <strong>Currently:</strong> Super must be in your super fund account on or before the{' '}
              <strong>28th day of the month following each quarter</strong> (i.e. by 28 October,
              28 January, 28 April, and 28 July each year).
            </p>
            <p className="text-amber-800">
              <strong>From 1 July 2026 — Payday Super:</strong> Super must be paid into your fund{' '}
              <strong>within 7 days of each pay day</strong>. This is a major change — employers who
              pay late will face automatic penalties. Check your super fund balance regularly
              to confirm contributions are arriving on time.
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
      <div className="card space-y-4">
        <div>
          <h3 className="font-bold text-gray-900">Were you actually paid this much?</h3>
          <p className="text-sm text-gray-600 mt-1">
            Enter what you were actually paid for this period and we'll compare each component.
            Leave any field blank if you don't know it.
          </p>
        </div>

        <div className="space-y-3">
          {/* Wages */}
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-900">
              Wages received
              <span className="text-gray-400 font-normal ml-2">(award minimum: {formatCurrency(summary.totalPayOwed)})</span>
            </label>
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
                'rounded-lg px-3 py-2 text-sm',
                wasUnderpaid ? 'bg-danger-50 border border-danger-100' :
                wasOverpaid ? 'bg-gray-50 border border-gray-200' :
                'bg-success-50 border border-success-100'
              )}>
                {wasUnderpaid && (
                  <p className="font-semibold text-danger-700">
                    Possible underpayment: {formatCurrency(Math.abs(underpayment!))}
                  </p>
                )}
                {wasOverpaid && (
                  <p className="text-gray-700">Paid above award minimum — {formatCurrency(Math.abs(underpayment!))} over.</p>
                )}
                {!wasUnderpaid && !wasOverpaid && (
                  <p className="text-gray-700">Matches award minimum.</p>
                )}
              </div>
            )}
          </div>

          {/* Allowances */}
          {triggeredAllowances.length > 0 && (
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-900">
                Allowances received
                <span className="text-gray-400 font-normal ml-2">
                  (estimated owed: {totalAllowancesOwed > 0 ? formatCurrency(totalAllowancesOwed) : 'varies'})
                </span>
              </label>
              <div className="flex items-center gap-2">
                <span className="text-gray-700 font-medium">$</span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  value={allowancesPaid}
                  onChange={e => setAllowancesPaid(e.target.value)}
                  className="input-field max-w-xs"
                />
              </div>
              {hasPaidAllowances && allowanceDiff !== null && (
                <div className={clsx(
                  'rounded-lg px-3 py-2 text-sm',
                  allowanceDiff > 0.50 ? 'bg-danger-50 border border-danger-100' :
                  allowanceDiff < -0.50 ? 'bg-gray-50 border border-gray-200' :
                  'bg-success-50 border border-success-100'
                )}>
                  {allowanceDiff > 0.50 && (
                    <p className="font-semibold text-danger-700">
                      Possible allowance shortfall: {formatCurrency(Math.abs(allowanceDiff))}
                    </p>
                  )}
                  {allowanceDiff < -0.50 && (
                    <p className="text-gray-700">Paid above estimated allowances — {formatCurrency(Math.abs(allowanceDiff))} over.</p>
                  )}
                  {Math.abs(allowanceDiff) <= 0.50 && (
                    <p className="text-gray-700">Matches estimated allowances.</p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Superannuation */}
          {summary.superAmount !== undefined && (
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-900">
                Superannuation received
                <span className="text-gray-400 font-normal ml-2">(estimated owed: {formatCurrency(summary.superAmount)})</span>
              </label>
              <p className="text-xs text-gray-400">
                Check your super fund account or payslip for the amount contributed this period.
              </p>
              <div className="flex items-center gap-2">
                <span className="text-gray-700 font-medium">$</span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  value={superPaid}
                  onChange={e => setSuperPaid(e.target.value)}
                  className="input-field max-w-xs"
                />
              </div>
              {hasPaidSuper && superDiff !== null && (
                <div className={clsx(
                  'rounded-lg px-3 py-2 text-sm',
                  superDiff > 0.50 ? 'bg-danger-50 border border-danger-100' :
                  superDiff < -0.50 ? 'bg-gray-50 border border-gray-200' :
                  'bg-success-50 border border-success-100'
                )}>
                  {superDiff > 0.50 && (
                    <p className="font-semibold text-danger-700">
                      Possible super shortfall: {formatCurrency(Math.abs(superDiff))}
                    </p>
                  )}
                  {superDiff < -0.50 && (
                    <p className="text-gray-700">Super paid above estimated minimum — {formatCurrency(Math.abs(superDiff))} over.</p>
                  )}
                  {Math.abs(superDiff) <= 0.50 && (
                    <p className="text-gray-700">Super matches estimated minimum.</p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {(wasUnderpaid || (allowanceDiff !== null && allowanceDiff > 0.50) || (superDiff !== null && superDiff > 0.50)) && (
          <p className="text-xs text-gray-500 pt-1">
            These are estimates based on the information you provided. Your actual entitlements may differ
            depending on your specific arrangement, applicable enterprise agreements, and the accuracy of the information entered.
          </p>
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
      {(wasUnderpaid || (allowanceDiff !== null && allowanceDiff > 0.50) || (superDiff !== null && superDiff > 0.50)) && (
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

      {/* Download report */}
      <div className="card space-y-3">
        <h3 className="font-bold text-gray-900">Download this report</h3>
        <p className="text-sm text-gray-600">
          Save a PDF copy of your pay estimate to share with your employer or keep for your records.
          The report includes a clear disclaimer that it is an estimate only, not legal advice.
        </p>
        <button onClick={handleDownloadReport} className="btn-secondary w-full">
          Download Report (PDF)
        </button>
        <p className="text-xs text-gray-400 text-center">
          Your browser will open a print dialog — choose "Save as PDF".
        </p>
      </div>

      <button onClick={onStartOver} className="btn-ghost w-full text-center">
        Start a new check →
      </button>
    </div>
  );
}
