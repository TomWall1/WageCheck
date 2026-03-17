/**
 * Award calculator — deterministic wage calculation engine
 * Hospitality Industry (General) Award 2020 [MA000009]
 */

const AWARD_CODE = 'MA000009';

/**
 * Given shifts, classification, and employment type, calculate what's owed.
 * All amounts in AUD.
 */

/**
 * Determine day type from a date string (YYYY-MM-DD) and a list of public holidays
 * Returns: 'weekday' | 'saturday' | 'sunday' | 'public_holiday'
 */
function getDayType(dateStr, publicHolidays = []) {
  const date = new Date(dateStr + 'T00:00:00');
  const dayOfWeek = date.getDay(); // 0=Sun, 1=Mon, ..., 6=Sat

  if (publicHolidays.includes(dateStr)) return 'public_holiday';
  if (dayOfWeek === 0) return 'sunday';
  if (dayOfWeek === 6) return 'saturday';
  return 'weekday';
}

/**
 * Parse a time string 'HH:MM' to minutes since midnight
 */
function timeToMinutes(timeStr) {
  if (!timeStr) return null;
  const [h, m] = timeStr.split(':').map(Number);
  return h * 60 + m;
}

/**
 * Calculate total minutes between two time strings on the same day.
 * Handles overnight shifts (finish < start).
 */
function shiftDurationMinutes(startTime, endTime) {
  let start = timeToMinutes(startTime);
  let end = timeToMinutes(endTime);
  if (end <= start) end += 24 * 60; // overnight
  return end - start;
}

/**
 * For each hour of a shift, determine which penalty multiplier applies.
 * Returns an array of { hour, multiplier, dayType } segments.
 *
 * This handles overnight shifts spanning midnight.
 */
function calculateShiftSegments(dateStr, startTime, endTime, employmentType, penaltyRates, publicHolidays = []) {
  const segments = [];
  const startMinutes = timeToMinutes(startTime);
  let endMinutes = timeToMinutes(endTime);
  if (endMinutes <= startMinutes) endMinutes += 24 * 60;

  // Build list of day types for each minute of the shift
  // (shifts can cross midnight so we need the next day too)
  const startDate = new Date(dateStr + 'T00:00:00');
  const nextDate = new Date(startDate);
  nextDate.setDate(nextDate.getDate() + 1);
  const nextDateStr = nextDate.toISOString().split('T')[0];

  function getDayTypeForMinute(minuteFromStart) {
    const absoluteMinute = startMinutes + minuteFromStart;
    const currentDateStr = absoluteMinute >= 24 * 60 ? nextDateStr : dateStr;
    return getDayType(currentDateStr, publicHolidays);
  }

  const totalMinutes = endMinutes - startMinutes;

  // Work through the shift in 1-minute chunks, but group consecutive same-multiplier periods
  let currentGroup = null;

  for (let i = 0; i < totalMinutes; i++) {
    const minuteOfDay = (startMinutes + i) % (24 * 60);
    const dayType = getDayTypeForMinute(i);
    const currentDateStr = (startMinutes + i) >= 24 * 60 ? nextDateStr : dateStr;

    // Find applicable penalty rate
    const applicableRates = penaltyRates.filter(r => {
      if (r.employment_type !== employmentType) return false;
      if (r.day_type !== dayType) return false;
      if (r.time_band_start && r.time_band_end) {
        const bandStart = timeToMinutes(r.time_band_start);
        const bandEnd = timeToMinutes(r.time_band_end);
        if (bandEnd <= bandStart) {
          // overnight band (e.g. 23:00 to 07:00)
          return minuteOfDay >= bandStart || minuteOfDay < bandEnd;
        }
        return minuteOfDay >= bandStart && minuteOfDay < bandEnd;
      }
      return true; // no time band restriction — applies all day
    });

    // Take highest multiplier if multiple apply
    const multiplier = applicableRates.length > 0
      ? Math.max(...applicableRates.map(r => parseFloat(r.multiplier)))
      : 1.0;

    const key = `${dayType}_${multiplier}`;
    if (currentGroup && currentGroup.key === key) {
      currentGroup.minutes++;
    } else {
      if (currentGroup) segments.push(currentGroup);
      currentGroup = { key, dayType, multiplier, minutes: 1 };
    }
  }
  if (currentGroup) segments.push(currentGroup);

  return segments;
}

/**
 * Calculate overtime for a set of shifts over a period
 */
function calculateOvertime(shifts, employmentType, baseHourlyRate, overtimeRates) {
  if (employmentType === 'casual') {
    // Casuals don't get overtime under the Hospitality Award
    return { overtimePay: 0, overtimeMinutes: 0, overtimeBreakdown: [] };
  }

  const weeklyRates = overtimeRates.filter(r =>
    r.employment_type === employmentType && r.period === 'weekly'
  ).sort((a, b) => parseFloat(a.threshold_hours) - parseFloat(b.threshold_hours));

  const dailyRates = overtimeRates.filter(r =>
    r.employment_type === employmentType && r.period === 'daily'
  ).sort((a, b) => parseFloat(a.threshold_hours) - parseFloat(b.threshold_hours));

  // Group shifts by ISO week
  const shiftsByWeek = {};
  for (const shift of shifts) {
    const weekKey = getISOWeek(shift.date);
    if (!shiftsByWeek[weekKey]) shiftsByWeek[weekKey] = [];
    shiftsByWeek[weekKey].push(shift);
  }

  let totalOvertimePay = 0;
  let totalOvertimeMinutes = 0;
  const breakdown = [];

  for (const [weekKey, weekShifts] of Object.entries(shiftsByWeek)) {
    // Daily overtime
    for (const shift of weekShifts) {
      const ordinaryMinutes = shift.ordinaryMinutes || 0;
      const thresholdMinutes = parseFloat(dailyRates[0]?.threshold_hours || 10) * 60;

      if (ordinaryMinutes > thresholdMinutes) {
        const overtimeMinutes = ordinaryMinutes - thresholdMinutes;
        const overtimeHours = overtimeMinutes / 60;
        const multiplier = parseFloat(dailyRates[0]?.multiplier || 1.5);
        const pay = overtimeHours * baseHourlyRate * multiplier;
        totalOvertimePay += pay;
        totalOvertimeMinutes += overtimeMinutes;
        breakdown.push({
          type: 'daily',
          date: shift.date,
          overtimeMinutes,
          multiplier,
          pay,
        });
      }
    }

    // Weekly overtime
    const totalWeeklyMinutes = weekShifts.reduce((sum, s) => sum + (s.ordinaryMinutes || 0), 0);
    const weeklyThresholdMinutes = 38 * 60;

    if (totalWeeklyMinutes > weeklyThresholdMinutes) {
      const overtimeMinutes = totalWeeklyMinutes - weeklyThresholdMinutes;
      const firstBand = Math.min(overtimeMinutes, 2 * 60); // first 2 hours at 1.5x
      const secondBand = Math.max(0, overtimeMinutes - 2 * 60); // after that at 2x

      const pay1 = (firstBand / 60) * baseHourlyRate * 1.5;
      const pay2 = (secondBand / 60) * baseHourlyRate * 2.0;

      totalOvertimePay += pay1 + pay2;
      totalOvertimeMinutes += overtimeMinutes;
      breakdown.push({
        type: 'weekly',
        weekKey,
        overtimeMinutes,
        firstBandMinutes: firstBand,
        secondBandMinutes: secondBand,
        pay: pay1 + pay2,
      });
    }
  }

  return {
    overtimePay: Math.round(totalOvertimePay * 100) / 100,
    overtimeMinutes: totalOvertimeMinutes,
    overtimeBreakdown: breakdown,
  };
}

function getISOWeek(dateStr) {
  const date = new Date(dateStr + 'T00:00:00');
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return `${d.getUTCFullYear()}-W${Math.ceil((((d - yearStart) / 86400000) + 1) / 7)}`;
}

/**
 * Check break compliance for a shift.
 * Returns array of violations.
 */
function checkBreakCompliance(shift, breakEntitlements) {
  const violations = [];
  const shiftMinutes = shiftDurationMinutes(shift.startTime, shift.endTime);
  const shiftHours = shiftMinutes / 60;

  // Meal break check (if shift > 5 hours)
  const mealBreakRule = breakEntitlements.find(b => b.break_type === 'meal');
  if (mealBreakRule && shiftHours > parseFloat(mealBreakRule.shift_hours_min)) {
    if (!shift.mealBreakTaken || shift.mealBreakDuration < mealBreakRule.break_duration_min) {
      violations.push({
        type: 'meal_break',
        severity: 'warning',
        message: `You worked more than ${mealBreakRule.shift_hours_min} hours but ${!shift.mealBreakTaken ? 'did not take a meal break' : `your meal break was only ${shift.mealBreakDuration} minutes (minimum is ${mealBreakRule.break_duration_min} minutes)`}.`,
        entitlement: mealBreakRule.description,
      });
    }
  }

  // Rest break check (for every 4-hour period)
  const restBreakRule = breakEntitlements.find(b => b.break_type === 'rest');
  if (restBreakRule) {
    const requiredRestBreaks = Math.floor(shiftHours / parseFloat(restBreakRule.shift_hours_min));
    if (requiredRestBreaks > 0 && !shift.restBreakTaken) {
      violations.push({
        type: 'rest_break',
        severity: 'warning',
        message: `You should have had ${requiredRestBreaks} paid 10-minute rest break${requiredRestBreaks > 1 ? 's' : ''} during this shift.`,
        entitlement: restBreakRule.description,
      });
    }
  }

  return violations;
}

/**
 * Main calculation function — takes structured input, returns full breakdown.
 */
async function calculateEntitlements(input, db) {
  const {
    employmentType,       // 'full_time' | 'part_time' | 'casual'
    classificationId,
    shifts,               // array of shift objects
    publicHolidays = [],  // array of 'YYYY-MM-DD' strings
  } = input;

  // Fetch base rate
  const rateResult = await db.query(`
    SELECT rate_amount FROM pay_rates
    WHERE award_code = $1
      AND classification_id = $2
      AND employment_type = $3
      AND rate_type = 'base_hourly'
    ORDER BY effective_date DESC
    LIMIT 1
  `, [AWARD_CODE, classificationId, employmentType]);

  if (!rateResult.rows.length) {
    throw new Error('No pay rate found for this classification and employment type');
  }
  const baseHourlyRate = parseFloat(rateResult.rows[0].rate_amount);

  // Fetch penalty rates
  const penaltyResult = await db.query(`
    SELECT * FROM penalty_rates
    WHERE award_code = $1 AND employment_type = $2
    ORDER BY effective_date DESC
  `, [AWARD_CODE, employmentType]);
  const penaltyRates = penaltyResult.rows;

  // Fetch overtime rates
  const overtimeResult = await db.query(`
    SELECT * FROM overtime_rates
    WHERE award_code = $1 AND employment_type = $2
    ORDER BY effective_date DESC
  `, [AWARD_CODE, employmentType]);
  const overtimeRates = overtimeResult.rows;

  // Fetch break entitlements
  const breakResult = await db.query(`
    SELECT * FROM break_entitlements WHERE award_code = $1
  `, [AWARD_CODE]);
  const breakEntitlements = breakResult.rows;

  // Process each shift
  const processedShifts = [];
  let totalOrdinaryPay = 0;
  let totalPenaltyPay = 0;

  for (const shift of shifts) {
    const mealBreakMinutes = shift.mealBreakTaken ? (shift.mealBreakDuration || 30) : 0;
    const totalShiftMinutes = shiftDurationMinutes(shift.startTime, shift.endTime);
    const workedMinutes = totalShiftMinutes - mealBreakMinutes;
    const workedHours = workedMinutes / 60;

    const segments = calculateShiftSegments(
      shift.date, shift.startTime, shift.endTime,
      employmentType, penaltyRates, publicHolidays
    );

    // Calculate pay per segment
    const segmentBreakdown = [];
    let shiftOrdinaryPay = 0;
    let shiftPenaltyExtra = 0;

    // Adjust segments for meal break (proportionally reduce from last segment)
    let remainingBreakMinutes = mealBreakMinutes;
    const adjustedSegments = [...segments];
    for (let i = adjustedSegments.length - 1; i >= 0 && remainingBreakMinutes > 0; i--) {
      const deduct = Math.min(adjustedSegments[i].minutes, remainingBreakMinutes);
      adjustedSegments[i] = { ...adjustedSegments[i], minutes: adjustedSegments[i].minutes - deduct };
      remainingBreakMinutes -= deduct;
    }

    for (const seg of adjustedSegments) {
      if (seg.minutes <= 0) continue;
      const hours = seg.minutes / 60;
      const pay = hours * baseHourlyRate * seg.multiplier;
      const ordinaryPay = hours * baseHourlyRate;
      const penaltyExtra = pay - ordinaryPay;

      shiftOrdinaryPay += ordinaryPay;
      shiftPenaltyExtra += penaltyExtra;

      segmentBreakdown.push({
        dayType: seg.dayType,
        multiplier: seg.multiplier,
        minutes: seg.minutes,
        hours: Math.round(hours * 100) / 100,
        pay: Math.round(pay * 100) / 100,
      });
    }

    const breakViolations = checkBreakCompliance(shift, breakEntitlements);
    const totalShiftPay = shiftOrdinaryPay + shiftPenaltyExtra;

    totalOrdinaryPay += shiftOrdinaryPay;
    totalPenaltyPay += shiftPenaltyExtra;

    processedShifts.push({
      date: shift.date,
      startTime: shift.startTime,
      endTime: shift.endTime,
      totalMinutes: totalShiftMinutes,
      workedMinutes,
      workedHours: Math.round(workedHours * 100) / 100,
      mealBreakMinutes,
      restBreakTaken: shift.restBreakTaken || false,
      ordinaryMinutes: workedMinutes,
      ordinaryPay: Math.round(shiftOrdinaryPay * 100) / 100,
      penaltyExtra: Math.round(shiftPenaltyExtra * 100) / 100,
      totalPay: Math.round(totalShiftPay * 100) / 100,
      segments: segmentBreakdown,
      breakViolations,
    });
  }

  // Overtime
  const overtimeResult2 = calculateOvertime(processedShifts, employmentType, baseHourlyRate, overtimeRates);

  const grandTotal = totalOrdinaryPay + totalPenaltyPay + overtimeResult2.overtimePay;

  return {
    baseHourlyRate,
    employmentType,
    effectiveDate: '2024-07-01',
    shifts: processedShifts,
    summary: {
      totalWorkedHours: Math.round(processedShifts.reduce((s, sh) => s + sh.workedMinutes, 0) / 60 * 100) / 100,
      ordinaryPay: Math.round(totalOrdinaryPay * 100) / 100,
      penaltyPay: Math.round(totalPenaltyPay * 100) / 100,
      overtimePay: overtimeResult2.overtimePay,
      overtimeMinutes: overtimeResult2.overtimeMinutes,
      totalPayOwed: Math.round(grandTotal * 100) / 100,
      overtimeBreakdown: overtimeResult2.overtimeBreakdown,
      allBreakViolations: processedShifts.flatMap(s => s.breakViolations.map(v => ({ ...v, date: s.date }))),
    },
  };
}

module.exports = {
  calculateEntitlements,
  getDayType,
  shiftDurationMinutes,
  checkBreakCompliance,
};
