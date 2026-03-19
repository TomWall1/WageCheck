/**
 * Award calculator — deterministic wage calculation engine
 * Supports: MA000009 (Hospitality), MA000003 (Fast Food), MA000119 (Restaurant)
 */

const DEFAULT_AWARD_CODE = 'MA000009';

// ── Superannuation ────────────────────────────────────────────────────────
// SGC rate from 1 July 2025. Super applies to OTE (ordinary time earnings).
// OTE includes: ordinary hours pay + penalty rates on ordinary hours.
// OTE excludes: overtime, missed-break double time, expense allowances.
const SGC_RATE = 0.12; // 12%

// ── Junior rates ──────────────────────────────────────────────────────────
// Applied to the base rate. Casual loading applies on top.
// MA000009 / MA000003: under 16=40%, 16=50%, 17=60%, 18=70%, 19=80%, 20=90%, 21+=100%
// MA000119:            under 17=50%, 17=60%, 18=70%, 19=85%, 20+=100%
// MA000004:            under 16=45%, 16=50%, 17=60%, 18=70%, 19=80%, 20=90%, 21+=100%
// MA000094:            under 17=55%, 17=65%, 18=75%, 19=85%, 20+=100%
const JUNIOR_RATES_DEFAULT = { 16: 0.50, 17: 0.60, 18: 0.70, 19: 0.80, 20: 0.90 };
const JUNIOR_RATES_MA000119 = { 17: 0.60, 18: 0.70, 19: 0.85 };
const JUNIOR_RATES_MA000094 = { 17: 0.65, 18: 0.75, 19: 0.85 };

function getJuniorMultiplier(age, awardCode = DEFAULT_AWARD_CODE) {
  if (!age) return 1.0;
  if (awardCode === 'MA000119') {
    if (age >= 20) return 1.0;
    if (age < 17) return 0.50;
    return JUNIOR_RATES_MA000119[age] || 1.0;
  }
  if (awardCode === 'MA000094') {
    if (age >= 20) return 1.0;
    if (age < 17) return 0.55;
    return JUNIOR_RATES_MA000094[age] || 1.0;
  }
  if (age >= 21) return 1.0;
  if (age < 16) return awardCode === 'MA000004' ? 0.45 : 0.40;
  return JUNIOR_RATES_DEFAULT[age] || 1.0;
}

// ── Day type ──────────────────────────────────────────────────────────────
function getDayType(dateStr, publicHolidays = []) {
  const date = new Date(dateStr + 'T00:00:00');
  const dow = date.getDay(); // 0=Sun, 6=Sat
  if (publicHolidays.includes(dateStr)) return 'public_holiday';
  if (dow === 0) return 'sunday';
  if (dow === 6) return 'saturday';
  return 'weekday';
}

function timeToMinutes(timeStr) {
  if (!timeStr) return null;
  const [h, m] = timeStr.split(':').map(Number);
  return h * 60 + m;
}

function shiftDurationMinutes(startTime, endTime) {
  let start = timeToMinutes(startTime);
  let end = timeToMinutes(endTime);
  if (end <= start) end += 24 * 60;
  return end - start;
}

function getISOWeek(dateStr) {
  const date = new Date(dateStr + 'T00:00:00');
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return `${d.getUTCFullYear()}-W${Math.ceil((((d - yearStart) / 86400000) + 1) / 7)}`;
}

// ── Segment calculation ───────────────────────────────────────────────────
// Returns minute-by-minute segments grouped by {dayType, multiplier, addition_per_hour}.
// Evening/night loadings are flat $/hr additions (addition_per_hour > 0) with multiplier=1.0.
// Multiplier-based rates and addition-based rates are mutually exclusive by design
// (addition rates always have multiplier=1.0 and apply only on weekdays).
function calculateShiftSegments(dateStr, startTime, endTime, employmentType, penaltyRates, publicHolidays = []) {
  const startMinutes = timeToMinutes(startTime);
  let endMinutes = timeToMinutes(endTime);
  if (endMinutes <= startMinutes) endMinutes += 24 * 60;

  const startDate = new Date(dateStr + 'T00:00:00');
  const nextDate = new Date(startDate);
  nextDate.setDate(nextDate.getDate() + 1);
  const nextDateStr = nextDate.toISOString().split('T')[0];

  const totalMinutes = endMinutes - startMinutes;
  let currentGroup = null;
  const segments = [];

  for (let i = 0; i < totalMinutes; i++) {
    const absoluteMinute = startMinutes + i;
    const minuteOfDay = absoluteMinute % (24 * 60);
    const currentDateStr = absoluteMinute >= 24 * 60 ? nextDateStr : dateStr;
    const dayType = getDayType(currentDateStr, publicHolidays);

    const applicableRates = penaltyRates.filter(r => {
      if (r.employment_type !== employmentType) return false;
      if (r.day_type !== dayType) return false;
      if (r.time_band_start && r.time_band_end) {
        const bandStart = timeToMinutes(r.time_band_start);
        const bandEnd = timeToMinutes(r.time_band_end);
        if (bandEnd <= bandStart) return minuteOfDay >= bandStart || minuteOfDay < bandEnd;
        return minuteOfDay >= bandStart && minuteOfDay < bandEnd;
      }
      return true;
    });

    // Separate multiplier-based rates from flat-addition rates
    const multiplierRates = applicableRates.filter(r => !parseFloat(r.addition_per_hour));
    const additionRates = applicableRates.filter(r => parseFloat(r.addition_per_hour) > 0);

    const multiplier = multiplierRates.length > 0
      ? Math.max(...multiplierRates.map(r => parseFloat(r.multiplier)))
      : 1.0;
    const addition_per_hour = additionRates.length > 0
      ? Math.max(...additionRates.map(r => parseFloat(r.addition_per_hour)))
      : 0;

    const key = `${dayType}_${multiplier}_${addition_per_hour}`;
    if (currentGroup && currentGroup.key === key) {
      currentGroup.minutes++;
    } else {
      if (currentGroup) segments.push(currentGroup);
      currentGroup = { key, dayType, multiplier, addition_per_hour, minutes: 1 };
    }
  }
  if (currentGroup) segments.push(currentGroup);
  return segments;
}

// ── Missed meal break — double time after 5 hours (Award clause 20.6) ────
// If no meal break was taken and shift > 5 hours, hours beyond 5 hours are
// paid at double time (or the existing penalty rate if already higher).
function applyMissedBreakPenalty(segments, mealBreakTaken) {
  if (mealBreakTaken) return { segments, missedBreakApplied: false };

  const THRESHOLD = 5 * 60; // 300 minutes
  const totalWorked = segments.reduce((s, seg) => s + seg.minutes, 0);
  if (totalWorked <= THRESHOLD) return { segments, missedBreakApplied: false };

  let cumulative = 0;
  const result = [];

  for (const seg of segments) {
    if (cumulative >= THRESHOLD) {
      result.push({ ...seg, multiplier: Math.max(seg.multiplier, 2.0), missedBreakPenalty: true });
    } else if (cumulative + seg.minutes > THRESHOLD) {
      const before = THRESHOLD - cumulative;
      const after = seg.minutes - before;
      result.push({ ...seg, minutes: before });
      result.push({ ...seg, minutes: after, multiplier: Math.max(seg.multiplier, 2.0), missedBreakPenalty: true });
    } else {
      result.push(seg);
    }
    cumulative += seg.minutes;
  }

  return { segments: result, missedBreakApplied: true };
}

// ── Break compliance ──────────────────────────────────────────────────────
function checkBreakCompliance(shift, breakEntitlements) {
  const violations = [];
  const shiftMinutes = shiftDurationMinutes(shift.startTime, shift.endTime);
  const shiftHours = shiftMinutes / 60;

  const mealRule = breakEntitlements.find(b => b.break_type === 'meal');
  if (mealRule && shiftHours > parseFloat(mealRule.shift_hours_min)) {
    if (!shift.mealBreakTaken) {
      violations.push({
        type: 'meal_break',
        severity: 'warning',
        message: `No meal break taken on a ${shiftHours.toFixed(1)}-hour shift. Hours after the 5-hour mark have been calculated at double time (as per the award).`,
        entitlement: mealRule.description,
      });
    } else if (shift.mealBreakDuration < mealRule.break_duration_min) {
      violations.push({
        type: 'meal_break',
        severity: 'warning',
        message: `Your meal break was only ${shift.mealBreakDuration} minutes — the award requires at least ${mealRule.break_duration_min} minutes.`,
        entitlement: mealRule.description,
      });
    }
  }

  const restRule = breakEntitlements.find(b => b.break_type === 'rest');
  if (restRule) {
    const requiredRestBreaks = Math.floor(shiftHours / parseFloat(restRule.shift_hours_min));
    if (requiredRestBreaks > 0 && !shift.restBreakTaken) {
      violations.push({
        type: 'rest_break',
        severity: 'warning',
        message: `You should have received ${requiredRestBreaks} paid 10-minute rest break${requiredRestBreaks > 1 ? 's' : ''} during this shift. These are paid breaks your employer must provide.`,
        entitlement: restRule.description,
      });
    }
  }

  return violations;
}

// ── Overtime ──────────────────────────────────────────────────────────────
// Only the PREMIUM above ordinary rate is added here — ordinary pay for all
// worked hours is already included in totalOrdinaryPay. Adding the full OT rate
// would double-count the base portion already paid.
//
// period: 'weekly' → 38hr threshold per ISO week
//         'fortnightly' → 76hr threshold across all shifts (averaging arrangement)
function calculateOvertime(processedShifts, employmentType, baseHourlyRate, overtimeRates, period = 'weekly') {
  if (employmentType === 'casual') {
    return { overtimePay: 0, overtimeMinutes: 0, overtimeBreakdown: [], mealAllowancesOwed: 0 };
  }

  const weeklyRates = overtimeRates
    .filter(r => r.employment_type === employmentType && r.period === 'weekly')
    .sort((a, b) => parseFloat(a.threshold_hours) - parseFloat(b.threshold_hours));

  const dailyRates = overtimeRates
    .filter(r => r.employment_type === employmentType && r.period === 'daily')
    .sort((a, b) => parseFloat(a.threshold_hours) - parseFloat(b.threshold_hours));

  // Multipliers from DB (fall back to award defaults if table is empty)
  const firstBandMultiplier = weeklyRates[0] ? parseFloat(weeklyRates[0].multiplier) : 1.5;
  const secondBandMultiplier = weeklyRates[1] ? parseFloat(weeklyRates[1].multiplier) : 2.0;
  // Weekly threshold per week (38) and second-band threshold per week (40)
  const weeklyThreshold = weeklyRates[0] ? parseFloat(weeklyRates[0].threshold_hours) : 38;
  const secondBandThreshold = weeklyRates[1] ? parseFloat(weeklyRates[1].threshold_hours) : 40;

  // Build list of periods to check
  let periodsToCheck;
  if (period === 'fortnightly') {
    // Treat all shifts as a single averaging period (76 hr threshold)
    periodsToCheck = [{ key: 'fortnight', shifts: processedShifts }];
  } else {
    const shiftsByWeek = {};
    for (const shift of processedShifts) {
      const weekKey = getISOWeek(shift.date);
      if (!shiftsByWeek[weekKey]) shiftsByWeek[weekKey] = [];
      shiftsByWeek[weekKey].push(shift);
    }
    periodsToCheck = Object.entries(shiftsByWeek).map(([key, shifts]) => ({ key, shifts }));
  }

  const periodWeeks = period === 'fortnightly' ? 2 : 1;
  const periodThresholdMinutes = weeklyThreshold * periodWeeks * 60;
  const secondBandThresholdMinutes = secondBandThreshold * periodWeeks * 60;

  let totalOvertimePay = 0;
  let totalOvertimeMinutes = 0;
  const breakdown = [];
  let totalMealAllowancesOwed = 0;

  for (const { key, shifts } of periodsToCheck) {
    // Daily overtime (only for individual shifts, regardless of period type)
    for (const shift of shifts) {
      if (!dailyRates.length) continue;
      const dailyThresholdMinutes = parseFloat(dailyRates[0].threshold_hours) * 60;
      if (shift.workedMinutes > dailyThresholdMinutes) {
        const otMinutes = shift.workedMinutes - dailyThresholdMinutes;
        const dailySecondThresholdMinutes = dailyRates[1]
          ? (parseFloat(dailyRates[1].threshold_hours) - parseFloat(dailyRates[0].threshold_hours)) * 60
          : otMinutes;
        const firstDailyBand = Math.min(otMinutes, dailySecondThresholdMinutes);
        const secondDailyBand = Math.max(0, otMinutes - firstDailyBand);
        const m1 = parseFloat(dailyRates[0].multiplier);
        const m2 = dailyRates[1] ? parseFloat(dailyRates[1].multiplier) : 2.0;
        // Premium only (base already counted in ordinaryPay)
        const pay = (firstDailyBand / 60) * baseHourlyRate * (m1 - 1.0)
                  + (secondDailyBand / 60) * baseHourlyRate * (m2 - 1.0);
        totalOvertimePay += pay;
        totalOvertimeMinutes += otMinutes;
        breakdown.push({ type: 'daily', date: shift.date, overtimeMinutes: otMinutes, pay });
      }
    }

    // Period (weekly/fortnightly) overtime
    if (!weeklyRates.length) continue;
    const totalPeriodMinutes = shifts.reduce((s, sh) => s + sh.workedMinutes, 0);
    if (totalPeriodMinutes > periodThresholdMinutes) {
      const overtimeMinutes = totalPeriodMinutes - periodThresholdMinutes;
      const firstBandCap = secondBandThresholdMinutes - periodThresholdMinutes;
      const firstBand = Math.min(overtimeMinutes, firstBandCap);
      const secondBand = Math.max(0, overtimeMinutes - firstBand);
      // Premium only
      const pay = (firstBand / 60) * baseHourlyRate * (firstBandMultiplier - 1.0)
                + (secondBand / 60) * baseHourlyRate * (secondBandMultiplier - 1.0);
      totalOvertimePay += pay;
      totalOvertimeMinutes += overtimeMinutes;

      // Meal allowance: clause 20.3 — one meal per 4 hours of overtime (or part thereof)
      // First meal triggers at start of OT; one more for each subsequent 4-hour block
      const mealAllowancesOwed = Math.ceil(overtimeMinutes / (4 * 60));
      totalMealAllowancesOwed += mealAllowancesOwed;

      breakdown.push({
        type: period === 'fortnightly' ? 'fortnightly' : 'weekly',
        key,
        overtimeMinutes,
        firstBandMinutes: firstBand,
        secondBandMinutes: secondBand,
        pay,
        mealAllowancesOwed,
      });
    }
  }

  return {
    overtimePay: Math.round(totalOvertimePay * 100) / 100,
    overtimeMinutes: totalOvertimeMinutes,
    overtimeBreakdown: breakdown,
    mealAllowancesOwed: totalMealAllowancesOwed,
  };
}

// ── Label helpers ─────────────────────────────────────────────────────────
function getDayLabel(dayType) {
  return { weekday: 'Weekday', saturday: 'Saturday', sunday: 'Sunday', public_holiday: 'Public holiday' }[dayType] || dayType;
}

function getRateLabel(multiplier, addition_per_hour, missedBreakPenalty, dayType) {
  if (missedBreakPenalty) return `Double time (×2.0) — meal break not taken after 5 hours`;
  if (addition_per_hour === 4.22) return `Night work loading (midnight–7am) +$4.22/hr`;
  if (addition_per_hour === 2.81) return `Evening loading (7pm–midnight) +$2.81/hr`;
  if (multiplier === 1.0) return 'Ordinary rate (×1.0)';
  if (multiplier === 1.1) return 'Evening loading (10pm–midnight, ×1.10)';
  if (multiplier === 1.15) return 'Late night loading (midnight–6am, ×1.15)';
  if (multiplier === 1.2) return dayType === 'weekday' ? 'Evening loading (after 6pm, ×1.20)' : 'Saturday penalty (×1.2)';
  if (multiplier === 1.25) return dayType === 'weekday' ? 'Evening loading (after 6pm, ×1.25)' : 'Saturday penalty (×1.25)';
  if (multiplier === 1.4) return 'Sunday penalty (×1.4)';
  if (multiplier === 1.5) return 'Sunday / time and a half (×1.5)';
  if (multiplier === 2.0) return 'Double time (×2.0)';
  if (multiplier === 2.25) return 'Public holiday — double time and a quarter (×2.25)';
  if (multiplier === 2.5) return 'Public holiday — double time and a half (×2.50)';
  return `×${multiplier}`;
}

// ── Main calculation ──────────────────────────────────────────────────────
async function calculateEntitlements(input, db) {
  const {
    employmentType,
    classificationId,
    age,
    shifts,
    publicHolidays = [],
    period = 'weekly',
    awardCode = DEFAULT_AWARD_CODE,
  } = input;

  const juniorMultiplier = getJuniorMultiplier(age, awardCode);

  // Fetch the most current base rate
  const rateResult = await db.query(`
    SELECT rate_amount FROM pay_rates
    WHERE award_code = $1 AND classification_id = $2 AND employment_type = $3 AND rate_type = 'base_hourly'
    ORDER BY effective_date DESC LIMIT 1
  `, [awardCode, classificationId, employmentType]);

  if (!rateResult.rows.length) throw new Error('No pay rate found for this classification and employment type');

  const rawBaseRate = parseFloat(rateResult.rows[0].rate_amount);
  const baseHourlyRate = parseFloat((rawBaseRate * juniorMultiplier).toFixed(4));

  // Fetch the effective date of the rate
  const rateDateResult = await db.query(`
    SELECT effective_date FROM pay_rates
    WHERE award_code = $1 AND classification_id = $2 AND employment_type = $3 AND rate_type = 'base_hourly'
    ORDER BY effective_date DESC LIMIT 1
  `, [awardCode, classificationId, employmentType]);
  const effectiveDate = rateDateResult.rows[0]?.effective_date?.toISOString().split('T')[0] || '2025-07-01';

  const penaltyResult = await db.query(
    `SELECT * FROM penalty_rates WHERE award_code = $1 AND employment_type = $2 ORDER BY effective_date DESC`,
    [awardCode, employmentType]
  );
  let penaltyRates = penaltyResult.rows;

  // MA000003 special case: Grade 1 has a lower Sunday rate than Grade 2/3.
  // FT/PT L1 Sunday = ×1.25 (same as Saturday); Casual L1 Sunday = ×1.20 (same as Saturday).
  // Default penalty_rates store the L2/L3 rates; override here for L1.
  if (awardCode === 'MA000003') {
    const levelResult = await db.query(
      'SELECT level FROM classifications WHERE id = $1', [classificationId]
    );
    const classLevel = parseInt(levelResult.rows[0]?.level || 2);
    if (classLevel === 1) {
      const sundayOverride = employmentType === 'casual' ? 1.20 : 1.25;
      penaltyRates = penaltyRates.map(r =>
        r.day_type === 'sunday'
          ? { ...r, multiplier: sundayOverride.toString(), addition_per_hour: null }
          : r
      );
    }
  }

  // MA000119: casual Introductory/L1/L2 Sunday = ×1.20 (150% of FT = 150/125 of casual base).
  // DB stores ×1.40 (L3–L6 default); override here for ≤L2.
  if (awardCode === 'MA000119' && employmentType === 'casual') {
    const levelResult = await db.query(
      'SELECT level FROM classifications WHERE id = $1', [classificationId]
    );
    const classLevel = parseInt(levelResult.rows[0]?.level ?? 3);
    if (classLevel <= 2) {
      penaltyRates = penaltyRates.map(r =>
        r.day_type === 'sunday'
          ? { ...r, multiplier: '1.20', addition_per_hour: null }
          : r
      );
    }
  }

  const overtimeResult = await db.query(
    `SELECT * FROM overtime_rates WHERE award_code = $1 AND employment_type = $2 ORDER BY effective_date DESC`,
    [awardCode, employmentType]
  );
  const overtimeRates = overtimeResult.rows;

  const breakResult = await db.query(`SELECT * FROM break_entitlements WHERE award_code = $1`, [awardCode]);
  const breakEntitlements = breakResult.rows;

  const processedShifts = [];
  let totalOrdinaryPay = 0;
  let totalPenaltyPay = 0;
  let totalMissedBreakPay = 0;

  for (const shift of shifts) {
    const mealBreakMinutes = shift.mealBreakTaken ? (shift.mealBreakDuration || 30) : 0;
    const totalShiftMinutes = shiftDurationMinutes(shift.startTime, shift.endTime);
    const workedMinutes = totalShiftMinutes - mealBreakMinutes;

    // Get base segments (penalty rates by day/time)
    const rawSegments = calculateShiftSegments(
      shift.date, shift.startTime, shift.endTime,
      employmentType, penaltyRates, publicHolidays
    );

    // Deduct meal break from end of segments
    let remainingBreak = mealBreakMinutes;
    const breakAdjusted = rawSegments.map(seg => ({ ...seg }));
    for (let i = breakAdjusted.length - 1; i >= 0 && remainingBreak > 0; i--) {
      const deduct = Math.min(breakAdjusted[i].minutes, remainingBreak);
      breakAdjusted[i].minutes -= deduct;
      remainingBreak -= deduct;
    }
    const nonEmptySegments = breakAdjusted.filter(s => s.minutes > 0);

    // Apply missed break double time penalty
    const { segments: finalSegments, missedBreakApplied } = applyMissedBreakPenalty(
      nonEmptySegments,
      shift.mealBreakTaken
    );

    // Calculate pay per segment
    const segmentBreakdown = [];
    let shiftOrdinaryPay = 0;
    let shiftPenaltyExtra = 0;
    let shiftMissedBreakExtra = 0;

    for (const seg of finalSegments) {
      if (seg.minutes <= 0) continue;
      const hours = seg.minutes / 60;
      const addition_per_hour = seg.addition_per_hour || 0;
      const effectiveHourlyRate = baseHourlyRate * seg.multiplier + addition_per_hour;
      const actualPay = hours * effectiveHourlyRate;
      const ordinaryPay = hours * baseHourlyRate;
      const extra = actualPay - ordinaryPay;

      shiftOrdinaryPay += ordinaryPay;
      if (seg.missedBreakPenalty) {
        shiftMissedBreakExtra += extra;
      } else {
        shiftPenaltyExtra += extra;
      }

      segmentBreakdown.push({
        dayType: seg.dayType,
        dayLabel: getDayLabel(seg.dayType),
        multiplier: seg.multiplier,
        addition_per_hour,
        effectiveRate: effectiveHourlyRate,
        rateLabel: getRateLabel(seg.multiplier, addition_per_hour, seg.missedBreakPenalty, seg.dayType),
        missedBreakPenalty: !!seg.missedBreakPenalty,
        minutes: seg.minutes,
        hours: Math.round(hours * 100) / 100,
        baseRate: baseHourlyRate,
        pay: Math.round(actualPay * 100) / 100,
        explanation: seg.missedBreakPenalty
          ? 'Double time applies because no meal break was provided after 5 hours of work (Award clause 20.6)'
          : null,
      });
    }

    totalOrdinaryPay += shiftOrdinaryPay;
    totalPenaltyPay += shiftPenaltyExtra;
    totalMissedBreakPay += shiftMissedBreakExtra;

    const totalShiftPay = shiftOrdinaryPay + shiftPenaltyExtra + shiftMissedBreakExtra;
    const breakViolations = checkBreakCompliance(shift, breakEntitlements);

    processedShifts.push({
      date: shift.date,
      startTime: shift.startTime,
      endTime: shift.endTime,
      workedMinutes,
      workedHours: Math.round(workedMinutes / 60 * 100) / 100,
      mealBreakMinutes,
      restBreakTaken: !!shift.restBreakTaken,
      ordinaryMinutes: workedMinutes,
      ordinaryPay: Math.round(shiftOrdinaryPay * 100) / 100,
      penaltyExtra: Math.round(shiftPenaltyExtra * 100) / 100,
      missedBreakExtra: Math.round(shiftMissedBreakExtra * 100) / 100,
      totalPay: Math.round(totalShiftPay * 100) / 100,
      missedBreakApplied,
      segments: segmentBreakdown,
      breakViolations,
    });
  }

  const overtimeCalc = calculateOvertime(processedShifts, employmentType, baseHourlyRate, overtimeRates, period);

  // Meal allowance for overtime — FT/PT only, auto-calculated from OT duration
  // Clause 20.3: one meal allowance per 4 hours of overtime (or part thereof)
  let mealAllowancePay = 0;
  let mealAllowanceRate = 0;
  if (overtimeCalc.mealAllowancesOwed > 0 && employmentType !== 'casual') {
    const mealResult = await db.query(
      `SELECT amount FROM allowances WHERE award_code = $1 AND allowance_type = 'meal' ORDER BY effective_date DESC LIMIT 1`,
      [awardCode]
    );
    if (mealResult.rows.length) {
      mealAllowanceRate = parseFloat(mealResult.rows[0].amount);
      mealAllowancePay = Math.round(mealAllowanceRate * overtimeCalc.mealAllowancesOwed * 100) / 100;
    }
  }

  const grandTotal = totalOrdinaryPay + totalPenaltyPay + totalMissedBreakPay + overtimeCalc.overtimePay + mealAllowancePay;

  // ── Per-category super breakdown ────────────────────────────────────────
  // Aggregate all shift segments across all shifts, grouped by rate category.
  // Each entry shows hours, effective rate, total pay, and whether super applies.
  // OTE (ordinary time earnings) = ordinary + penalty rate hours.
  // NOT OTE: overtime (premium and base), missed-break double time (extra only),
  //           expense allowances (meal, vehicle).
  const categoryAgg = new Map();
  for (const shift of processedShifts) {
    for (const seg of shift.segments) {
      const key = `${seg.dayType}_${seg.multiplier}_${seg.addition_per_hour}_${seg.missedBreakPenalty}`;
      if (!categoryAgg.has(key)) {
        categoryAgg.set(key, {
          rateLabel: seg.rateLabel,
          effectiveRate: seg.effectiveRate,
          missedBreakPenalty: !!seg.missedBreakPenalty,
          superApplies: !seg.missedBreakPenalty,
          totalHours: 0,
          totalPay: 0,
        });
      }
      const entry = categoryAgg.get(key);
      entry.totalHours += seg.hours;
      entry.totalPay += seg.pay;
    }
  }

  // Overtime correction: the segment categories above contain base pay for ALL
  // worked hours, including overtime hours (since overtime is computed as premium-only
  // and added separately). We must deduct the OT base pay from OTE categories and
  // fold it into the overtime entry so the breakdown sums correctly.
  if (overtimeCalc.overtimeMinutes > 0) {
    const otHours = overtimeCalc.overtimeMinutes / 60;
    const otBase = otHours * baseHourlyRate;

    // Deduct from the largest OTE category (almost always ordinary weekday rate)
    let remainingDeduction = otBase;
    for (const cat of categoryAgg.values()) {
      if (!cat.superApplies || remainingDeduction <= 0) continue;
      const deduction = Math.min(cat.totalPay, remainingDeduction);
      cat.totalPay -= deduction;
      cat.totalHours = Math.max(0, cat.totalHours - (deduction / baseHourlyRate));
      remainingDeduction -= deduction;
    }
  }

  // Overtime entry: premium + base pay for OT hours (none is OTE)
  if (overtimeCalc.overtimePay > 0 || overtimeCalc.overtimeMinutes > 0) {
    const otHours = overtimeCalc.overtimeMinutes / 60;
    const otBase = otHours * baseHourlyRate;
    categoryAgg.set('_overtime', {
      rateLabel: 'Overtime (not OTE — excluded from super)',
      effectiveRate: null,
      missedBreakPenalty: false,
      superApplies: false,
      totalHours: Math.round(otHours * 100) / 100,
      totalPay: overtimeCalc.overtimePay + otBase,
    });
  }

  if (mealAllowancePay > 0) {
    categoryAgg.set('_meal_allowance', {
      rateLabel: `Meal allowance (${overtimeCalc.mealAllowancesOwed} × $${mealAllowanceRate.toFixed(2)}) — expense, not OTE`,
      effectiveRate: mealAllowanceRate,
      missedBreakPenalty: false,
      superApplies: false,
      totalHours: overtimeCalc.mealAllowancesOwed,
      totalPay: mealAllowancePay,
    });
  }

  const superBreakdown = Array.from(categoryAgg.values()).map(cat => ({
    rateLabel: cat.rateLabel,
    effectiveRate: cat.effectiveRate !== null ? Math.round(cat.effectiveRate * 10000) / 10000 : null,
    hours: Math.round(cat.totalHours * 100) / 100,
    totalPay: Math.round(cat.totalPay * 100) / 100,
    superApplies: cat.superApplies,
    superRate: cat.superApplies ? SGC_RATE : 0,
    superAmount: cat.superApplies ? Math.round(cat.totalPay * SGC_RATE * 100) / 100 : 0,
  }));

  // Derive totals from the breakdown so the footer always equals the sum of rows.
  const superEligiblePay = Math.round(
    superBreakdown.filter(r => r.superApplies).reduce((s, r) => s + r.totalPay, 0) * 100
  ) / 100;
  const superAmount = Math.round(
    superBreakdown.reduce((s, r) => s + r.superAmount, 0) * 100
  ) / 100;

  return {
    baseHourlyRate,
    rawBaseRate,
    juniorMultiplier,
    isJuniorRate: juniorMultiplier < 1.0,
    employmentType,
    effectiveDate,
    period,
    shifts: processedShifts,
    summary: {
      totalWorkedHours: Math.round(processedShifts.reduce((s, sh) => s + sh.workedMinutes, 0) / 60 * 100) / 100,
      ordinaryPay: Math.round(totalOrdinaryPay * 100) / 100,
      penaltyPay: Math.round(totalPenaltyPay * 100) / 100,
      missedBreakPay: Math.round(totalMissedBreakPay * 100) / 100,
      overtimePay: overtimeCalc.overtimePay,
      overtimeMinutes: overtimeCalc.overtimeMinutes,
      mealAllowancePay,
      mealAllowancesOwed: overtimeCalc.mealAllowancesOwed,
      mealAllowanceRate,
      totalPayOwed: Math.round(grandTotal * 100) / 100,
      superEligiblePay: Math.round(superEligiblePay * 100) / 100,
      superAmount,
      sgcRate: SGC_RATE,
      superBreakdown,
      overtimeBreakdown: overtimeCalc.overtimeBreakdown,
      allBreakViolations: processedShifts.flatMap(s => s.breakViolations.map(v => ({ ...v, date: s.date }))),
    },
  };
}

module.exports = {
  calculateEntitlements,
  getDayType,
  shiftDurationMinutes,
  getJuniorMultiplier,
};
