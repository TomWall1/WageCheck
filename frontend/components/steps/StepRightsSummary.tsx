'use client';

import { EmploymentType } from '@/types';

interface ClassificationResult {
  level: number | null;
  stream: string | null;
  classification: { id: number; title: string; base_rate?: number } | null;
  rationale: string | null;
  confidence: string;
}

interface Props {
  awardCode: string;
  employmentType: EmploymentType;
  classificationResult: ClassificationResult;
  onNext: () => void;
  onBack: () => void;
}

export default function StepRightsSummary({ awardCode, employmentType, classificationResult, onNext, onBack }: Props) {
  const isCasual = employmentType === 'casual';
  const isPartTime = employmentType === 'part_time';
  const isFullTime = employmentType === 'full_time';
  const isFF = awardCode === 'MA000003';
  const isRest = awardCode === 'MA000119';
  const isRetail = awardCode === 'MA000004';
  const classLevel = classificationResult?.level ?? null;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">Your key rights</h2>
        <p className="text-gray-600">
          Here's a plain-English summary of what the award says you're entitled to —
          based on your employment type and role.
        </p>
      </div>

      {/* Breaks */}
      <section className="card space-y-3">
        <h3 className="font-bold text-lg text-gray-900">Breaks</h3>

        <div className="space-y-4 text-sm">
          <div className="flex gap-3">
            <span className="text-xl shrink-0">☕</span>
            <div>
              <p className="font-semibold text-gray-900">Paid rest break — 10 minutes</p>
              <p className="text-gray-600">
                For every 4 hours you work (or part of it), you're entitled to a paid 10-minute rest break.
                This should happen roughly in the middle of each 4-hour block. Your employer cannot make you skip it
                or "bank" it to leave early. It's paid — you don't lose money for taking it.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <span className="text-xl shrink-0">🍽️</span>
            <div>
              <p className="font-semibold text-gray-900">Unpaid meal break — 30 minutes minimum</p>
              <p className="text-gray-600">
                If you work more than 5 hours straight, you must get an unpaid meal break of at least 30 minutes.
                It must start no later than 5 hours after you begin your shift. If your employer doesn't give you
                this break, they may owe you extra pay.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Minimum engagement */}
      <section className="card space-y-3">
        <h3 className="font-bold text-lg text-gray-900">Minimum shift length</h3>

        {isCasual && (
          <div className="text-sm space-y-2">
            <p className="text-gray-700">
              <strong>Casuals must be paid for at least {isRetail ? '3' : '2'} hours per shift</strong> — even if you're sent home early.
            </p>
            <p className="text-gray-600">
              If you show up for a shift and your employer sends you home early, you are still owed{' '}
              {isRetail ? '3' : '2'} full hours at your casual rate (including applicable penalty rates).
            </p>
          </div>
        )}

        {isPartTime && (
          <div className="text-sm space-y-2">
            <p className="text-gray-700">
              <strong>Part-time employees must be paid for at least 3 hours per shift.</strong>
            </p>
            <p className="text-gray-600">
              Your agreed hours should also be set out in writing. If your employer regularly asks you to work
              more than your agreed hours, those extra hours may trigger overtime.
            </p>
          </div>
        )}

        {isFullTime && (
          <div className="text-sm text-gray-600">
            <p>
              Full-time employees have agreed hours (usually 38 per week or a fixed roster).
              Hours worked beyond ordinary hours may attract overtime rates.
            </p>
          </div>
        )}
      </section>

      {/* Penalty rates reminder */}
      <section className="card space-y-3">
        <h3 className="font-bold text-lg text-gray-900">Penalty rates</h3>
        <div className="text-sm space-y-3">
          <p className="text-gray-600">
            The award requires higher rates of pay for unsociable hours. These are minimums — your employer can
            pay more, but not less.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-gray-700">
                  <th className="text-left px-3 py-2 rounded-l-lg">When you work</th>
                  <th className="text-right px-3 py-2 rounded-r-lg">Minimum rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {(isFF ? [
                  { label: 'Weekday (ordinary hours)', rate: 'Ordinary rate' },
                  { label: 'Weekday evening (10pm–midnight)', rate: '+10% loading (×1.10)' },
                  { label: 'Weekday night (midnight–6am)', rate: '+15% loading (×1.15)' },
                  { label: 'Saturday', rate: '+25% penalty (×1.25)' },
                  { label: 'Sunday', rate: classLevel === 1 ? '+25% penalty (×1.25)' : '+50% penalty (×1.50)' },
                  { label: 'Public holiday', rate: 'Double time and a quarter (×2.25)' },
                ] : isRest ? [
                  { label: 'Weekday (ordinary hours)', rate: 'Ordinary rate' },
                  { label: 'Weekday evening (10pm–midnight)', rate: '+$2.81/hr loading' },
                  { label: 'Weekday midnight–6am', rate: '+$4.22/hr loading' },
                  { label: 'Saturday', rate: '+25% penalty (×1.25)' },
                  { label: 'Sunday', rate: '+50% penalty (×1.50)' },
                  { label: 'Public holiday', rate: 'Double time and a quarter (×2.25)' },
                ] : isRetail ? [
                  { label: 'Weekday (ordinary hours)', rate: 'Ordinary rate' },
                  { label: 'Weekday evening (after 6pm)', rate: isCasual ? '+20% penalty (×1.20)' : '+25% penalty (×1.25)' },
                  { label: 'Saturday', rate: isCasual ? '+20% penalty (×1.20)' : '+25% penalty (×1.25)' },
                  { label: 'Sunday', rate: '+50% penalty (×1.50)' },
                  { label: 'Public holiday', rate: 'Double time and a quarter (×2.25)' },
                ] : [
                  { label: 'Weekday (ordinary hours)', rate: 'Ordinary rate' },
                  { label: 'Weekday evening (7pm–midnight)', rate: '+$2.81/hr loading' },
                  { label: 'Weekday midnight–7am', rate: '+$4.22/hr loading' },
                  { label: 'Saturday', rate: '+25% penalty (×1.25)' },
                  { label: 'Sunday', rate: '+50% penalty (time and a half, ×1.5)' },
                  { label: 'Public holiday', rate: 'Double time and a quarter (×2.25)' },
                ]).map(row => (
                  <tr key={row.label}>
                    <td className="px-3 py-2 text-gray-700">{row.label}</td>
                    <td className="px-3 py-2 text-right font-semibold text-gray-900">{row.rate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {isFF && classLevel === 1 && (
            <p className="text-gray-500 text-xs">
              Grade 1 employees have the same Sunday rate as Saturday (×1.25). Grade 2 and 3 employees are paid ×1.50 on Sunday.
            </p>
          )}
          {isRest && isCasual && classLevel !== null && classLevel <= 2 && (
            <p className="text-gray-500 text-xs">
              Casual Introductory, Level 1, and Level 2 employees: Sunday rate is ×1.20 of your casual base (150% of the FT rate). Level 3 and above: ×1.40 of your casual base (175% of the FT rate).
            </p>
          )}
          {isCasual && (
            <p className="text-gray-500 text-xs">
              For casual employees, penalty rates are applied on top of your base casual rate
              (which already includes the 25% loading).
            </p>
          )}
        </div>
      </section>

      {/* Roster changes */}
      <section className="card space-y-3">
        <h3 className="font-bold text-lg text-gray-900">Roster and shift changes</h3>
        <div className="text-sm text-gray-600 space-y-2">
          <p>
            Your employer cannot simply cancel shifts or change your roster at the last minute without consequences.
          </p>
          {isCasual && (
            <p>
              As a casual, your employer should give you as much notice as reasonably possible before cancelling a shift.
              If a shift is cancelled with very short notice after you've already shown up or made arrangements to attend,
              seek advice about whether you're owed payment.
            </p>
          )}
          {(isFullTime || isPartTime) && (
            <p>
              Permanent employees have stronger protections. Employers must genuinely consult before changing regular
              hours or rosters. Significant changes to your hours should be agreed in writing.
            </p>
          )}
        </div>
      </section>

      {/* Leave entitlements */}
      {(isFullTime || isPartTime) && (
        <section className="card space-y-3">
          <h3 className="font-bold text-lg text-gray-900">Leave entitlements</h3>
          <div className="text-sm space-y-3 text-gray-600">
            <div className="flex gap-3">
              <span className="shrink-0 font-bold text-gray-900 w-24">Annual leave</span>
              <p>4 weeks per year (pro-rata for part-time). Must be paid at your normal rate.</p>
            </div>
            <div className="flex gap-3">
              <span className="shrink-0 font-bold text-gray-900 w-24">Sick leave</span>
              <p>10 days per year (pro-rata). Paid at your ordinary rate.</p>
            </div>
            <div className="flex gap-3">
              <span className="shrink-0 font-bold text-gray-900 w-24">Public holidays</span>
              <p>You must be paid for public holidays even if you don't work them. If you are required to work, you're paid at double time and a quarter.</p>
            </div>
          </div>
        </section>
      )}

      {/* Casual — no leave, but casual loading */}
      {isCasual && (
        <section className="card space-y-3">
          <h3 className="font-bold text-lg text-gray-900">Leave entitlements</h3>
          <div className="text-sm space-y-3">
            <div className="warning-box">
              <p className="font-semibold text-gray-900">Casual employees are not entitled to paid leave.</p>
              <p className="text-gray-700 mt-1">
                You do not accrue annual leave, sick leave, or paid public holidays. If you don't work a
                public holiday, you are not paid for it.
              </p>
            </div>
            <div className="bg-brand-50 border border-brand-200 rounded-lg p-3 space-y-2">
              <p className="font-semibold text-gray-900">Instead, you receive a 25% casual loading.</p>
              <p className="text-gray-700">
                The 25% casual loading on top of the base hourly rate is designed to compensate you for
                the lack of paid leave, sick leave, and other permanent entitlements. It must be paid on
                every hour you work — including hours that attract penalty rates.
              </p>
              <p className="text-gray-700">
                For example, if the full-time rate is $25.85/hr, your minimum casual rate is
                $32.31/hr ($25.85 × 1.25).
              </p>
            </div>
            <div className="text-gray-600 space-y-2">
              <p>
                <strong>If you work a public holiday</strong>, you are paid at double time (×2.0) of your
                casual rate — not double time and a quarter like permanent employees.
              </p>
              <p>
                <strong>Conversion to permanent ("employee choice"):</strong> If you have worked regular,
                systematic hours you may be able to request conversion to permanent employment:
              </p>
              <ul className="ml-4 space-y-1 text-gray-600">
                <li>
                  <strong>Large employers (15+ employees):</strong> you can request after <strong>6 months</strong>.
                  Your employer must also proactively offer conversion after 12 months if you have worked
                  a regular pattern of hours for the last 6 months.
                </li>
                <li>
                  <strong>Small employers (under 15 employees):</strong> you can request after <strong>12 months</strong>.
                  Small employers are not required to proactively offer conversion but must respond to your request.
                </li>
              </ul>
              <p>
                Your employer can only refuse on reasonable grounds and must respond in writing.
                Note: employment before 26 August 2024 does not count toward these timeframes.
                Contact Fair Work (13 13 94) for guidance.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* IFA warning */}
      <section className="warning-box space-y-2">
        <h3 className="font-bold text-gray-900">Individual Flexibility Arrangements (IFAs)</h3>
        <p className="text-sm text-gray-700">
          Your employer may have made a written agreement with you that changes some award conditions.
          This is only valid if it leaves you <em>better off overall</em>, was genuinely agreed to (not forced),
          is in writing, and meets specific legal requirements.
        </p>
        <p className="text-sm text-gray-700">
          <strong>You can cancel an IFA</strong> by giving your employer 13 weeks' written notice — you don't need a reason.
          If you think you were pressured into an IFA, get advice.
        </p>
      </section>

      <div className="flex gap-3">
        <button onClick={onBack} className="btn-secondary flex-1">← Back</button>
        <button onClick={onNext} className="btn-primary flex-1">
          See my results →
        </button>
      </div>
    </div>
  );
}
