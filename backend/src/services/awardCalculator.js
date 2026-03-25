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
// MA000080:            under 17=55%, 17=65%, 18=75%, 19=85%, 20+=100% (same as MA000094)
// MA000081:            no junior rates — adult rate applies to all ages
// MA000084:            under 16=40%, 16=50%, 17=60%, 18=70%, 19+=100%
// MA000022:            shopping trolley collection only: under 16=45%, 16=50%, 17=60%, 18=70%, 19=80%, 20=90%, 21+=100%
// MA000028:            under 16=50%, 16=60%, 17=70%, 18=80%, 19=90%, 20+=100%
// MA000033:            under 16=50%, 16=60%, 17=70%, 18=80%, 19=90%, 20+=100%
// MA000002:            under 16=45%, 16=50%, 17=60%, 18=70%, 19=80%, 20=90%, 21+=100% (same as MA000004)
// MA000104:            under 16=36.8%, 16=47.3%, 17=57.8%, 18=68.3%, 19=82.5%, 20=97.7%, 21+=100%
// MA000058:            under 17=50%, 17=60%, 18=70%, 19=85%, 20+=100% (same as MA000009)
// MA000026:            under 17=50%, 17=60%, 18=70%, 19=85%, 20+=100% (same as MA000009 default)
// MA000102:            under 19=80%, 19=90%, 20+=100%
// MA000120:            under 17=70%, 17=80%, 18=90%, 19+=100% (educator L1-L2 only; same flat $ for both levels)
// MA000005:            under 17=50%, 17=75%, 18+=100% (adult)
// MA000023:            15=50%, 16=60%, 17=70%, 18+=100% (clerical stream only, applied to all streams in calculator)
// MA000013:            no simple junior multiplier — non-liquor under-19 = 75% of introductory rate ($24.28);
//                      handled as a special base-rate override in calculateEntitlements().
// MA000009: under 17=50%, 17=60%, 18=70%, 19=85%, 20+=100% (adult) — verified from pay guide
// MA000003 + others: under 16=40%, 16=50%, 17=60%, 18=70%, 19=80%, 20=90%, 21+=100%
const JUNIOR_RATES_DEFAULT = { 16: 0.50, 17: 0.60, 18: 0.70, 19: 0.85 }; // MA000009 only
const JUNIOR_RATES_MA000119 = { 17: 0.60, 18: 0.70, 19: 0.85 };
const JUNIOR_RATES_MA000094 = { 17: 0.65, 18: 0.75, 19: 0.85 };
const JUNIOR_RATES_MA000080 = { 17: 0.65, 18: 0.75, 19: 0.85 };

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
  if (awardCode === 'MA000080') {
    if (age >= 20) return 1.0;
    if (age < 17) return 0.55;
    return JUNIOR_RATES_MA000080[age] || 1.0;
  }
  if (awardCode === 'MA000081') {
    return 1.0; // No junior rates under the Live Performance Award
  }
  if (awardCode === 'MA000084') {
    if (age >= 19) return 1.0;
    if (age < 16) return 0.40;
    const MA000084_RATES = { 16: 0.50, 17: 0.60, 18: 0.70 };
    return MA000084_RATES[age] || 1.0;
  }
  if (awardCode === 'MA000102') {
    // MA000102 junior rates: under 19=80%, 19=90%, 20+=100% (adult Grade 1)
    if (age >= 20) return 1.0;
    if (age < 19) return 0.80;
    if (age === 19) return 0.90;
    return 1.0;
  }
  if (awardCode === 'MA000082') {
    // MA000082 junior rates: under 18=70%, 18=80%, 19=90%, 20+=adult
    // Note: 18yr+ who have been continuously employed 12 months must get adult rate.
    if (age >= 20) return 1.0;
    if (age < 18) return 0.70;
    const MA000082_RATES = { 18: 0.80, 19: 0.90 };
    return MA000082_RATES[age] || 1.0;
  }
  if (awardCode === 'MA000120') {
    // MA000120 junior rates (Children's Services Award — educator L1 and L2 only):
    // Under 17: 70%, 17yr: 80%, 18yr: 90%, 19+: adult.
    // Both L1 and L2 juniors earn the same flat dollar amounts ($18.90, $21.60, $24.30).
    // Percentages are exact for L2 ($27.00 base) but approximate for L1 ($26.19 base).
    if (age >= 19) return 1.0;
    if (age < 17) return 0.70;
    const MA000120_RATES = { 17: 0.80, 18: 0.90 };
    return MA000120_RATES[age] || 1.0;
  }
  if (awardCode === 'MA000023') {
    // MA000023 junior rates (clerical stream only per award, applied to all streams here):
    // 15=50%, 16=60%, 17=70%, 18+=100% (adult)
    if (age >= 18) return 1.0;
    if (age <= 15) return 0.50;
    const MA000023_RATES = { 16: 0.60, 17: 0.70 };
    return MA000023_RATES[age] || 1.0;
  }
  if (awardCode === 'MA000005') {
    // MA000005 junior rates: under 17=50%, 17=75%, 18+=100% (adult)
    if (age >= 18) return 1.0;
    if (age < 17) return 0.50;
    if (age === 17) return 0.75;
    return 1.0;
  }
  if (awardCode === 'MA000022') {
    // Junior rates apply only to shopping trolley collection contractors.
    // For all other cleaning work, adult rate applies from commencement.
    if (age >= 21) return 1.0;
    if (age < 16) return 0.45;
    const MA000022_RATES = { 16: 0.50, 17: 0.60, 18: 0.70, 19: 0.80, 20: 0.90 };
    return MA000022_RATES[age] || 1.0;
  }
  if (awardCode === 'MA000028') {
    // MA000028 junior rates: <16=50%, 16=60%, 17=70%, 18=80%, 19=90%, 20+=100%
    if (age >= 20) return 1.0;
    if (age < 16) return 0.50;
    const MA000028_RATES = { 16: 0.60, 17: 0.70, 18: 0.80, 19: 0.90 };
    return MA000028_RATES[age] || 1.0;
  }
  if (awardCode === 'MA000033') {
    // MA000033 junior rates: <16=50%, 16=60%, 17=70%, 18=80%, 19=90%, 20+=100%
    if (age >= 20) return 1.0;
    if (age < 16) return 0.50;
    const MA000033_RATES = { 16: 0.60, 17: 0.70, 18: 0.80, 19: 0.90 };
    return MA000033_RATES[age] || 1.0;
  }
  if (awardCode === 'MA000104') {
    // MA000104 junior rates (Miscellaneous Award Schedule A):
    // <16=36.8%, 16=47.3%, 17=57.8%, 18=68.3%, 19=82.5%, 20=97.7%, 21+=100%
    if (age >= 21) return 1.0;
    if (age < 16) return 0.368;
    const MA000104_RATES = { 16: 0.473, 17: 0.578, 18: 0.683, 19: 0.825, 20: 0.977 };
    return MA000104_RATES[age] || 1.0;
  }
  if (awardCode === 'MA000013') {
    // MA000013: junior rate is NOT a simple multiplier of own classification rate.
    // Non-liquor under-19 = 75% of introductory rate — handled in calculateEntitlements().
    // Liquor employees use separate junior classification (level 2) with own base_hourly.
    return 1.0;
  }
  if (awardCode === 'MA000030' || awardCode === 'MA000095' || awardCode === 'MA000105') {
    return 1.0; // No junior rates specified in these awards' pay guides
  }
  if (awardCode === 'MA000079') {
    return 1.0; // No junior multiplier — student rates are separate classifications
  }
  if (awardCode === 'MA000106') {
    if (age >= 21) return 1.0;
    if (age < 19) return 0.60;
    const RATES = { 19: 0.70, 20: 0.80 };
    return RATES[age] || 1.0;
  }
  if (awardCode === 'MA000091') {
    if (age >= 21) return 1.0;
    if (age < 16) return 0.507;
    const RATES = { 16: 0.507, 17: 0.620, 18: 0.733, 19: 0.846, 20: 0.958 };
    return RATES[age] || 1.0;
  }
  if (awardCode === 'MA000063') {
    // MA000063: Under 19=70%, 19=80%, 20+=adult
    // Note: 18+ driving passenger vehicle in sole control must be paid adult rate (handled by employer)
    if (age >= 20) return 1.0;
    if (age < 19) return 0.70;
    if (age === 19) return 0.80;
    return 1.0;
  }
  if (awardCode === 'MA000101') {
    // MA000101: Under 18=70%, 18=80%, 19=90%, 20+=adult
    // Note: Trade qualified juniors must be paid adult rate (handled by employer)
    if (age >= 20) return 1.0;
    if (age < 18) return 0.70;
    const MA000101_RATES = { 18: 0.80, 19: 0.90 };
    return MA000101_RATES[age] || 1.0;
  }
  // MA000058 (Registered and Licensed Clubs): under 17=50%, 17=60%, 18=70%, 19=85%, 20+=adult (same as MA000009)
  // MA000026 (Graphic Arts, Printing and Publishing): under 17=50%, 17=60%, 18=70%, 19=85%, 20+=adult (same as MA000009)
  if (awardCode === 'MA000058' || awardCode === 'MA000026') {
    if (age >= 20) return 1.0;
    if (age < 17) return 0.50;
    return JUNIOR_RATES_DEFAULT[age] || 1.0;
  }
  // MA000009: under 17=50%, 17=60%, 18=70%, 19=85%, 20+=adult
  if (awardCode === 'MA000009') {
    if (age >= 20) return 1.0;
    if (age < 16) return 0.40;
    return JUNIOR_RATES_DEFAULT[age] || 1.0;
  }
  // MA000003, MA000004, MA000002: under 16=40-45%, 16=50%, 17=60%, 18=70%, 19=80%, 20=90%, 21+=adult
  if (awardCode === 'MA000004' || awardCode === 'MA000002') {
    if (age >= 21) return 1.0;
    if (age < 16) return 0.45;
    const MA000004_RATES = { 16: 0.50, 17: 0.60, 18: 0.70, 19: 0.80, 20: 0.90 };
    return MA000004_RATES[age] || 1.0;
  }
  // MA000003 and remaining defaults: under 16=40%, 16=50%, 17=60%, 18=70%, 19=80%, 20=90%, 21+=adult
  if (age >= 21) return 1.0;
  if (age < 16) return 0.40;
  const DEFAULT_FULL = { 16: 0.50, 17: 0.60, 18: 0.70, 19: 0.80, 20: 0.90 };
  return DEFAULT_FULL[age] || 1.0;
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
  // Use local date parts to avoid UTC timezone shift (toISOString converts to UTC)
  const nextDateStr = `${nextDate.getFullYear()}-${String(nextDate.getMonth() + 1).padStart(2, '0')}-${String(nextDate.getDate()).padStart(2, '0')}`;

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

// ── Minimum shift (minimum engagement) ───────────────────────────────────
// If an employee works less than the minimum engagement period, they must still
// be paid for the full minimum at the applicable penalty rate for that day.
// Values are in HOURS. Full-time is omitted (contracted hours apply).
const MINIMUM_SHIFT_HOURS = {
  MA000009: { casual: 2, part_time: 2 },
  MA000003: { casual: 3, part_time: 3 },
  MA000119: { casual: 2, part_time: 2 },
  MA000004: { casual: 3, part_time: 3 },
  MA000094: { casual: 2, part_time: 2 },
  MA000080: { casual: 2, part_time: 2 },
  MA000081: { casual: 2, part_time: 2 },
  MA000084: { casual: 2, part_time: 2 },
  MA000022: { casual: 2, part_time: 2 },
  MA000028: { casual: 2, part_time: 2 },
  MA000033: { casual: 2, part_time: 2 },
  MA000002: { casual: 3, part_time: 3 },
  MA000104: { casual: 2, part_time: 2 },
  MA000013: { casual: 4, part_time: 4, full_time: 4 },
  MA000102: { casual: 2, part_time: 2 },
  MA000082: { casual: 2, part_time: 2 },
  MA000120: { casual: 2, part_time: 2 },
  MA000023: { casual: 3, part_time: 3 },
  MA000005: { casual: 3, part_time: 3 },
  MA000058: { casual: 2, part_time: 2 },
  MA000026: { casual: 2, part_time: 2 },
  MA000030: { casual: 3, part_time: 3 },
  MA000063: { casual: 2, part_time: 2 },
  MA000095: { casual: 3, part_time: 3 },
  MA000105: { casual: 2, part_time: 2 },
  MA000101: { casual: 2, part_time: 2 },
};

function getMinimumShiftMinutes(awardCode, employmentType) {
  const map = MINIMUM_SHIFT_HOURS[awardCode];
  if (!map) return 0;
  return (map[employmentType] || 0) * 60;
}

// ── Overtime ──────────────────────────────────────────────────────────────
// Only the PREMIUM above ordinary rate is added here — ordinary pay for all
// worked hours is already included in totalOrdinaryPay. Adding the full OT rate
// would double-count the base portion already paid.
//
// period: 'weekly' → 38hr threshold per ISO week
//         'fortnightly' → 76hr threshold across all shifts (averaging arrangement)
function calculateOvertime(processedShifts, employmentType, baseHourlyRate, overtimeRates, period = 'weekly') {
  // Casuals: check DB for award-specific casual overtime rates (e.g. MA000094, MA000084, MA000022, MA000119).
  // If no casual rates are seeded, weeklyRates/dailyRates will be empty and nothing is calculated.

  // Deduplicate overtime rates by (period, threshold_hours) — multiple seed runs
  // can leave duplicate entries with the same threshold but different IDs.
  function dedupeOTRates(rates) {
    const seen = new Map();
    for (const r of rates) {
      const key = `${r.period}_${r.threshold_hours}`;
      if (!seen.has(key)) seen.set(key, r);
    }
    return Array.from(seen.values());
  }

  const weeklyRates = dedupeOTRates(overtimeRates
    .filter(r => r.employment_type === employmentType && r.period === 'weekly'))
    .sort((a, b) => parseFloat(a.threshold_hours) - parseFloat(b.threshold_hours));

  const dailyRates = dedupeOTRates(overtimeRates
    .filter(r => r.employment_type === employmentType && r.period === 'daily'))
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
    // Daily overtime — aggregate all shifts on the same DATE so that two 6hr shifts
    // on the same day (12hr total) correctly trigger daily OT.
    let dailyOtMinutesInPeriod = 0;
    if (dailyRates.length) {
      const shiftsByDate = {};
      for (const shift of shifts) {
        if (!shiftsByDate[shift.date]) shiftsByDate[shift.date] = [];
        shiftsByDate[shift.date].push(shift);
      }
      for (const [date, dayShifts] of Object.entries(shiftsByDate)) {
        const totalDayMinutes = dayShifts.reduce((s, sh) => s + sh.workedMinutes, 0);
        const dailyThresholdMinutes = parseFloat(dailyRates[0].threshold_hours) * 60;
        if (totalDayMinutes > dailyThresholdMinutes) {
          const otMinutes = totalDayMinutes - dailyThresholdMinutes;
          const dailySecondThresholdMinutes = dailyRates[1]
            ? (parseFloat(dailyRates[1].threshold_hours) - parseFloat(dailyRates[0].threshold_hours)) * 60
            : otMinutes;
          const firstDailyBand = Math.min(otMinutes, dailySecondThresholdMinutes);
          const secondDailyBand = Math.max(0, otMinutes - firstDailyBand);
          const m1 = parseFloat(dailyRates[0].multiplier);
          const m2 = dailyRates[1] ? parseFloat(dailyRates[1].multiplier) : 2.0;

          // Per-minute higher-of logic: for each OT minute, OT premium is
          // MAX(0, otMultiplier - penaltyMultiplier) × base / 60.
          // Walk backwards from end of the day's segments to find what penalty
          // each OT minute already received.
          const allSegments = dayShifts.flatMap(sh => (sh.segments || []).filter(s => s.dayType !== 'overtime'));
          const daySegMins = [];
          for (const seg of allSegments) {
            for (let m = 0; m < (seg.minutes || 0); m++) {
              daySegMins.push(seg.multiplier || 1.0);
            }
          }
          const dailyOtStartIdx = daySegMins.length - otMinutes;
          let pay = 0;
          let consumedDailyOt = 0;
          for (let i = dailyOtStartIdx; i < daySegMins.length; i++) {
            const penaltyMult = daySegMins[i] || 1.0;
            const otMult = consumedDailyOt < firstDailyBand ? m1 : m2;
            const effectivePremium = Math.max(0, otMult - penaltyMult);
            pay += (1 / 60) * baseHourlyRate * effectivePremium;
            consumedDailyOt++;
          }
          totalOvertimePay += pay;
          totalOvertimeMinutes += otMinutes;
          dailyOtMinutesInPeriod += otMinutes;
          // Meal allowance: one per 4 hours of daily OT (or part thereof)
          const dailyMeals = Math.ceil(otMinutes / (4 * 60));
          totalMealAllowancesOwed += dailyMeals;
          breakdown.push({ type: 'daily', date, overtimeMinutes: otMinutes, pay, mealAllowancesOwed: dailyMeals });
        }
      }
    }

    // Period (weekly/fortnightly) overtime
    // Deduct daily OT minutes already counted to avoid double-paying the premium.
    if (!weeklyRates.length) continue;
    const totalPeriodMinutes = shifts.reduce((s, sh) => s + sh.workedMinutes, 0);
    if (totalPeriodMinutes > periodThresholdMinutes) {
      const rawOvertimeMinutes = totalPeriodMinutes - periodThresholdMinutes;
      const overtimeMinutes = Math.max(0, rawOvertimeMinutes - dailyOtMinutesInPeriod);
      if (overtimeMinutes <= 0) continue; // all OT already covered by daily
      const firstBandCap = secondBandThresholdMinutes - periodThresholdMinutes;
      const firstBand = Math.min(overtimeMinutes, firstBandCap);
      const secondBand = Math.max(0, overtimeMinutes - firstBand);

      // Compute OT premium per-minute using higher-of logic.
      // Walk backwards from the last shift's last segment to find what penalty
      // multiplier each OT minute already received. For each minute, the OT
      // premium is MAX(0, otMultiplier - penaltyMultiplier) × base / 60.
      const allShiftsSorted = [...shifts].sort((a, b) => {
        if (a.date !== b.date) return a.date.localeCompare(b.date);
        return (a.startTime || '').localeCompare(b.startTime || '');
      });
      // Collect all non-OT segments in order with their multipliers
      const allSegMins = [];
      for (const sh of allShiftsSorted) {
        for (const seg of (sh.segments || [])) {
          if (seg.dayType === 'overtime') continue;
          for (let m = 0; m < (seg.minutes || 0); m++) {
            allSegMins.push(seg.multiplier || 1.0);
          }
        }
      }
      // The OT minutes are the LAST N minutes of the total worked period
      const otStartIdx = allSegMins.length - overtimeMinutes;
      let pay = 0;
      let consumedOt = 0;
      for (let i = otStartIdx; i < allSegMins.length; i++) {
        const penaltyMult = allSegMins[i] || 1.0;
        const otMult = consumedOt < firstBand ? firstBandMultiplier : secondBandMultiplier;
        const effectivePremium = Math.max(0, otMult - penaltyMult);
        pay += (1 / 60) * baseHourlyRate * effectivePremium;
        consumedOt++;
      }
      totalOvertimePay += pay;
      totalOvertimeMinutes += overtimeMinutes;

      // Meal allowance: one per 4 hours of weekly OT (or part thereof).
      // Deduct daily OT minutes already counted above to avoid double-counting.
      const uncoveredWeeklyOtMinutes = Math.max(0, overtimeMinutes - dailyOtMinutesInPeriod);
      const mealAllowancesOwed = uncoveredWeeklyOtMinutes > 0
        ? Math.ceil(uncoveredWeeklyOtMinutes / (4 * 60))
        : 0;
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
  if (addition_per_hour === 7.07) return dayType === 'weekday' ? 'Out-of-hours Mon–Fri (8pm–8am) +$7.07/hr' : 'Saturday loading +$7.07/hr';
  if (addition_per_hour === 14.15) return dayType === 'sunday' ? 'Sunday loading +$14.15/hr' : 'Public holiday loading +$14.15/hr';
  if (addition_per_hour === 4.22) return `Night work loading (midnight–7am) +$4.22/hr`;
  if (addition_per_hour === 2.81) return `Evening loading (7pm–midnight) +$2.81/hr`;
  if (addition_per_hour === 12.3)  return 'Sunday — liquor bar (+$12.30/hr above Mon–Sat all-in rate)';
  if (addition_per_hour === 9.86)  return 'Sunday — junior liquor (+$9.86/hr above Mon–Sat all-in rate)';
  if (addition_per_hour === 24.13) return 'Public holiday — liquor bar (+$24.13/hr above Mon–Sat all-in rate)';
  if (addition_per_hour === 19.32) return 'Public holiday — junior liquor (+$19.32/hr above Mon–Sat all-in rate)';
  if (multiplier === 1.0) return 'Ordinary rate (×1.0)';
  if (multiplier === 1.1) return 'Evening loading (10pm–midnight, ×1.10)';
  if (multiplier === 1.12) return 'Outside span of hours — Sunday (×1.12 of casual base)';
  if (multiplier === 1.15) return dayType === 'weekday' ? 'Afternoon/night shift Mon–Fri (×1.15)' : 'Late night loading (midnight–6am, ×1.15)';
  if (multiplier === 1.16) return dayType === 'weekday' ? 'Evening/night loading — casual (7pm–7am, ×1.16 of casual base)' : 'Saturday penalty — casual (×1.16 of casual base = ×1.45 of FT)';
  if (multiplier === 1.2) return dayType === 'weekday' ? 'Evening/night loading (7pm–7am, ×1.20)' : 'Saturday penalty (×1.2)';
  if (multiplier === 1.25) return dayType === 'weekday' ? 'Evening loading (after 6pm, ×1.25)' : 'Saturday penalty (×1.25)';
  if (multiplier === 1.24) return 'Night cleaning (11pm–7am, casual) — ×1.24 of casual base';
  if (multiplier === 1.4) return 'Sunday penalty (×1.4)';
  if (multiplier === 1.6) return dayType === 'sunday' ? 'Casual Sunday (×1.60 of casual base = 200% FT base)' : 'Rate ×1.60';
  if (multiplier === 1.5) return dayType === 'saturday' ? 'Saturday afternoon — time and a half (×1.5)' : 'Sunday / time and a half (×1.5)';
  if (multiplier === 1.8) return 'Public holiday — casual (×1.80 of casual base = 225% of FT)';
  if (multiplier === 2.0) return dayType === 'sunday' ? 'Sunday — double time (×2.0)' : 'Double time (×2.0)';
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
    allPurposeAllowancesPerHour = 0,  // All-purpose allowances (e.g. MA000028 first aid, leading hand, wet work)
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

  // ── All-purpose allowance handling ────────────────────────────────────────
  // All-purpose allowances (e.g. MA000028 first aid, leading hand, wet work) must be
  // added to the FT/PT base rate BEFORE casual loading, penalties, and overtime.
  // For casual employees, the stored base_hourly rate already includes the 25% casual
  // loading. To correctly apply the all-purpose allowance, we fetch the FT base rate,
  // add the allowance, then reapply the casual loading.
  let effectiveBaseRate = rawBaseRate;
  if (allPurposeAllowancesPerHour > 0) {
    if (employmentType === 'casual') {
      // Fetch the FT base rate to correctly add allowance before loading
      const ftRateResult = await db.query(`
        SELECT rate_amount FROM pay_rates
        WHERE award_code = $1 AND classification_id = $2 AND employment_type = 'full_time' AND rate_type = 'base_hourly'
        ORDER BY effective_date DESC LIMIT 1
      `, [awardCode, classificationId]);
      const ftBase = ftRateResult.rows.length ? parseFloat(ftRateResult.rows[0].rate_amount) : rawBaseRate / 1.25;
      effectiveBaseRate = parseFloat(((ftBase + allPurposeAllowancesPerHour) * 1.25).toFixed(4));
    } else {
      effectiveBaseRate = parseFloat((rawBaseRate + allPurposeAllowancesPerHour).toFixed(4));
    }
  }

  // MA000013: junior rates for non-liquor employees (clause 17.2)
  // Under-19 pay = 75% of the introductory rate ($24.28 FT), regardless of classification grade.
  // This overrides effectiveBaseRate before baseHourlyRate is calculated.
  if (awardCode === 'MA000013' && age && age < 19) {
    const streamResult = await db.query('SELECT stream FROM classifications WHERE id = $1', [classificationId]);
    const classStream = streamResult.rows[0]?.stream;
    if (classStream !== 'liquor') {
      const introResult = await db.query(`
        SELECT pr.rate_amount FROM pay_rates pr
        JOIN classifications c ON c.id = pr.classification_id
        WHERE pr.award_code = $1 AND c.level = 0 AND c.stream = 'racecourse'
          AND pr.employment_type = 'full_time' AND pr.rate_type = 'base_hourly'
        ORDER BY pr.effective_date DESC LIMIT 1
      `, [awardCode]);
      if (introResult.rows.length) {
        const introFTRate = parseFloat(introResult.rows[0].rate_amount);
        const juniorFTRate = parseFloat((introFTRate * 0.75).toFixed(4));
        effectiveBaseRate = employmentType === 'casual'
          ? parseFloat((juniorFTRate * 1.25).toFixed(4))
          : juniorFTRate;
      }
    }
  }

  const baseHourlyRate = parseFloat((effectiveBaseRate * juniorMultiplier).toFixed(4));

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

  // MA000003 casual evening/night: the 10%/15% penalty is on the FT ORDINARY rate,
  // not the casual base. The DB stores multipliers (1.10/1.15) which compound with casual
  // loading (giving 137.5%/143.75% instead of correct 135%/140% of FT rate).
  // Fix: convert to addition_per_hour = FT_base × (multiplier - 1.0), multiplier = 1.0.
  if (awardCode === 'MA000003' && employmentType === 'casual') {
    const ftRateForPenalty = await db.query(`
      SELECT rate_amount FROM pay_rates
      WHERE award_code = $1 AND classification_id = $2 AND employment_type = 'full_time' AND rate_type = 'base_hourly'
      ORDER BY effective_date DESC LIMIT 1
    `, [awardCode, classificationId]);
    const ftBase = ftRateForPenalty.rows.length ? parseFloat(ftRateForPenalty.rows[0].rate_amount) : baseHourlyRate / 1.25;
    penaltyRates = penaltyRates.map(r => {
      if (r.day_type === 'weekday' && r.time_band_start && parseFloat(r.multiplier) > 1.0 && !parseFloat(r.addition_per_hour)) {
        const penaltyPct = parseFloat(r.multiplier) - 1.0; // 0.10 or 0.15
        return { ...r, multiplier: '1.0000', addition_per_hour: String(parseFloat((ftBase * penaltyPct).toFixed(4))) };
      }
      return r;
    });
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
  let overtimeRates = overtimeResult.rows;

  // MA000013: liquor employees use all-in Mon–Sat rates (clause 12.9).
  // Sunday and PH additions are flat dollar amounts on top, not multipliers.
  // Casual OT for liquor = ×1.75/×2.25 of Mon–Sat rate (not the ×1.40/×1.80 seeded for non-liquor).
  if (awardCode === 'MA000013' && employmentType === 'casual') {
    const clsResult = await db.query('SELECT stream, level FROM classifications WHERE id = $1', [classificationId]);
    const clsStream = clsResult.rows[0]?.stream;
    const clsLevel = parseInt(clsResult.rows[0]?.level || 1);
    if (clsStream === 'liquor') {
      const isAdult = clsLevel === 1;
      const sundayAdd = isAdult ? 12.30 : 9.86;
      const phAdd    = isAdult ? 24.13 : 19.32;
      penaltyRates = penaltyRates.map(r => {
        if (r.day_type === 'sunday')         return { ...r, multiplier: '1.0', addition_per_hour: String(sundayAdd) };
        if (r.day_type === 'public_holiday') return { ...r, multiplier: '1.0', addition_per_hour: String(phAdd) };
        return r;
      });
      overtimeRates = overtimeRates.map(r => {
        const m = parseFloat(r.multiplier);
        if (m === 1.40) return { ...r, multiplier: '1.75' };
        if (m === 1.80) return { ...r, multiplier: '2.25' };
        return r;
      });
    }
  }

  const breakResult = await db.query(`SELECT * FROM break_entitlements WHERE award_code = $1`, [awardCode]);
  const breakEntitlements = breakResult.rows;

  const processedShifts = [];
  let totalOrdinaryPay = 0;
  let totalPenaltyPay = 0;
  let totalMissedBreakPay = 0;

  for (const shift of shifts) {
    const mealBreakMinutes = shift.mealBreakTaken ? (shift.mealBreakDuration ?? 30) : 0;
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

    // Apply minimum engagement — if worked < minimum, extend the last segment
    // at whatever rate applies (preserves the correct penalty rate for that day).
    const minimumShiftMinutes = getMinimumShiftMinutes(awardCode, employmentType);
    let minimumEngagementApplied = false;
    let payableMinutes = workedMinutes;
    if (minimumShiftMinutes > 0 && workedMinutes < minimumShiftMinutes) {
      const extra = minimumShiftMinutes - workedMinutes;
      if (finalSegments.length > 0) {
        finalSegments[finalSegments.length - 1] = {
          ...finalSegments[finalSegments.length - 1],
          minutes: finalSegments[finalSegments.length - 1].minutes + extra,
        };
      } else {
        // No segments (zero-length shift) — create one at the day's ordinary rate
        const dayType = getDayType(shift.date, publicHolidays);
        const applicable = penaltyRates.filter(r => r.employment_type === employmentType && r.day_type === dayType && !r.time_band_start);
        const multiplier = applicable.length > 0 ? Math.max(...applicable.map(r => parseFloat(r.multiplier))) : 1.0;
        finalSegments.push({ dayType, multiplier, addition_per_hour: 0, minutes: minimumShiftMinutes });
      }
      payableMinutes = minimumShiftMinutes;
      minimumEngagementApplied = true;
    }

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
      workedMinutes: payableMinutes,
      workedHours: Math.round(payableMinutes / 60 * 100) / 100,
      mealBreakMinutes,
      restBreakTaken: !!shift.restBreakTaken,
      ordinaryMinutes: payableMinutes,
      ordinaryPay: Math.round(shiftOrdinaryPay * 100) / 100,
      penaltyExtra: Math.round(shiftPenaltyExtra * 100) / 100,
      missedBreakExtra: Math.round(shiftMissedBreakExtra * 100) / 100,
      totalPay: Math.round(totalShiftPay * 100) / 100,
      missedBreakApplied,
      minimumEngagementApplied,
      minimumShiftHours: minimumEngagementApplied ? minimumShiftMinutes / 60 : null,
      segments: segmentBreakdown,
      breakViolations,
    });
  }

  const overtimeCalc = calculateOvertime(processedShifts, employmentType, baseHourlyRate, overtimeRates, period);

  // ── Attribute OT premium back to per-shift segments for display ───────────
  // The overtime calc runs post-processing on all shifts, so we now fold the
  // premium pay back into each shift's totalPay and segments array so the
  // per-shift breakdown in the UI matches the actual amount owed.
  for (const otEntry of overtimeCalc.overtimeBreakdown) {
    let targetShift = null;
    if (otEntry.type === 'daily') {
      targetShift = processedShifts.find(s => s.date === otEntry.date) || null;
    } else if (otEntry.type === 'weekly') {
      const shiftsInWeek = processedShifts.filter(s => getISOWeek(s.date) === otEntry.key);
      targetShift = shiftsInWeek[shiftsInWeek.length - 1] || null;
    } else {
      // fortnightly: attribute to last shift overall
      targetShift = processedShifts[processedShifts.length - 1] || null;
    }
    if (!targetShift) continue;
    targetShift.totalPay = Math.round((targetShift.totalPay + otEntry.pay) * 100) / 100;
    const otHours = Math.round(otEntry.overtimeMinutes / 60 * 100) / 100;
    const isWeekly = otEntry.type === 'weekly' || otEntry.type === 'fortnightly';
    targetShift.segments.push({
      dayType: 'overtime',
      dayLabel: isWeekly ? 'Weekly overtime loading' : 'Overtime loading',
      multiplier: null,
      addition_per_hour: 0,
      effectiveRate: null,
      rateLabel: isWeekly
        ? `Weekly overtime loading (${otHours}h past 38h threshold)`
        : `Overtime loading (${otHours}h)`,
      missedBreakPenalty: false,
      baseRate: baseHourlyRate,
      minutes: otEntry.overtimeMinutes,
      hours: otHours,
      pay: Math.round(otEntry.pay * 100) / 100,
    });
  }

  // ── Meal allowance — award-specific rules ────────────────────────────────
  // FT/PT only (casuals excluded for all awards).
  let mealAllowancePay = 0;
  let mealAllowanceRate = 0;
  let mealAllowancesOwed = 0; // may differ from overtimeCalc.mealAllowancesOwed for some awards
  let mealAllowanceLabel = '';

  if (employmentType !== 'casual') {
    if (awardCode === 'MA000081') {
      // MA000081 (Live Performance): meal_working triggers when a shift extends past 8pm,
      // not based on overtime hours. One meal per 4-hour interval worked after 8pm.
      const EIGHT_PM = 20 * 60;
      for (const shift of processedShifts) {
        const startMins = timeToMinutes(shift.startTime);
        let endMins = timeToMinutes(shift.endTime);
        if (endMins < startMins) endMins += 24 * 60; // overnight shift
        const workAfter8pmStart = Math.max(startMins, EIGHT_PM);
        if (endMins > EIGHT_PM) {
          const minutesWorkedAfter8pm = endMins - workAfter8pmStart;
          mealAllowancesOwed += Math.ceil(minutesWorkedAfter8pm / (4 * 60));
        }
      }
      if (mealAllowancesOwed > 0) {
        const r = await db.query(
          `SELECT amount FROM allowances WHERE award_code = $1 AND allowance_type = 'meal_working' ORDER BY effective_date DESC LIMIT 1`,
          [awardCode]
        );
        if (r.rows.length) {
          mealAllowanceRate = parseFloat(r.rows[0].amount);
          mealAllowancePay = Math.round(mealAllowanceRate * mealAllowancesOwed * 100) / 100;
          mealAllowanceLabel = `Meal allowance — working past 8pm (${mealAllowancesOwed} × $${mealAllowanceRate.toFixed(2)}) — expense, not OTE`;
        }
      }
    } else if ((awardCode === 'MA000004' || awardCode === 'MA000002' || awardCode === 'MA000104') && overtimeCalc.mealAllowancesOwed > 0) {
      // MA000004 (Retail) / MA000002 (Clerks): two-tier meal pricing.
      // First meal at 'meal' rate ($23.59); subsequent meals at 'meal_second' rate ($21.39).
      mealAllowancesOwed = overtimeCalc.mealAllowancesOwed;
      const [firstR, secondR] = await Promise.all([
        db.query(`SELECT amount FROM allowances WHERE award_code = $1 AND allowance_type = 'meal' ORDER BY effective_date DESC LIMIT 1`, [awardCode]),
        db.query(`SELECT amount FROM allowances WHERE award_code = $1 AND allowance_type = 'meal_second' ORDER BY effective_date DESC LIMIT 1`, [awardCode]),
      ]);
      if (firstR.rows.length) {
        mealAllowanceRate = parseFloat(firstR.rows[0].amount);
        const secondRate = secondR.rows.length ? parseFloat(secondR.rows[0].amount) : mealAllowanceRate;
        const extraMeals = Math.max(0, mealAllowancesOwed - 1);
        mealAllowancePay = Math.round((mealAllowanceRate + secondRate * extraMeals) * 100) / 100;
        mealAllowanceLabel = mealAllowancesOwed > 1
          ? `Meal allowance (1 × $${mealAllowanceRate.toFixed(2)} + ${extraMeals} × $${secondRate.toFixed(2)}) — expense, not OTE`
          : `Meal allowance (1 × $${mealAllowanceRate.toFixed(2)}) — expense, not OTE`;
      }
    } else if (overtimeCalc.mealAllowancesOwed > 0) {
      // All other awards: one meal per 4 hours of overtime at a flat rate.
      mealAllowancesOwed = overtimeCalc.mealAllowancesOwed;
      const r = await db.query(
        `SELECT amount FROM allowances WHERE award_code = $1 AND allowance_type = 'meal' ORDER BY effective_date DESC LIMIT 1`,
        [awardCode]
      );
      if (r.rows.length) {
        mealAllowanceRate = parseFloat(r.rows[0].amount);
        mealAllowancePay = Math.round(mealAllowanceRate * mealAllowancesOwed * 100) / 100;
        mealAllowanceLabel = `Meal allowance (${mealAllowancesOwed} × $${mealAllowanceRate.toFixed(2)}) — expense, not OTE`;
      }
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
          superApplies: !seg.missedBreakPenalty && seg.dayType !== 'overtime',
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
      rateLabel: mealAllowanceLabel,
      effectiveRate: mealAllowanceRate,
      missedBreakPenalty: false,
      superApplies: false,
      totalHours: mealAllowancesOwed,
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
      mealAllowancesOwed,
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
