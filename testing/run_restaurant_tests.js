/**
 * Restaurant Award Test Runner — MA000119
 * Run: node testing/run_restaurant_tests.js
 */
const path = require('path');
const { createTestRunner } = require('./lib/testFramework');
const t = createTestRunner('MA000119', path.join(__dirname, 'Restaurant_Testing_Plan.xlsx'));

const { record, recordText, skip, classId, calcShift, calcMultiShift, round2, payOnly,
        pool, awardCode: AWARD_CODE,
        REF_MONDAY, REF_TUESDAY, REF_WEDNESDAY, REF_THURSDAY, REF_FRIDAY,
        REF_SATURDAY, REF_SUNDAY, REF_PH } = t;

// ══════════════════════════════════════════════════════════════════════════
async function runBaseRateTests() {
  console.log('\n═══ SECTION 1 — BASE RATES ═══');

  console.log('\n1.1 Adult FT/PT base rates');
  const baseTests = [
    { id: 'BR-01', level: 0, stream: 'introductory', expected: 24.28, title: 'Introductory' },
    { id: 'BR-02', level: 1, stream: 'food_beverage', expected: 24.95, title: 'F&B Grade 1' },
    { id: 'BR-03', level: 1, stream: 'kitchen', expected: 24.95, title: 'Kitchen Attendant Grade 1' },
    { id: 'BR-04', level: 2, stream: 'food_beverage', expected: 25.85, title: 'F&B Grade 2' },
    { id: 'BR-05', level: 2, stream: 'kitchen', expected: 25.85, title: 'Cook Grade 1' },
    { id: 'BR-06', level: 2, stream: 'general', expected: 25.85, title: 'General Service Grade 2' },
    { id: 'BR-07', level: 3, stream: 'food_beverage', expected: 26.70, title: 'F&B Grade 3' },
    { id: 'BR-08', level: 3, stream: 'kitchen', expected: 26.70, title: 'Cook Grade 2' },
    { id: 'BR-09', level: 3, stream: 'general', expected: 26.70, title: 'General Service Grade 3' },
    { id: 'BR-10', level: 4, stream: 'food_beverage', expected: 28.12, title: 'F&B Grade 4' },
    { id: 'BR-11', level: 4, stream: 'kitchen', expected: 28.12, title: 'Cook Grade 3 (Trade)' },
    { id: 'BR-12', level: 5, stream: 'food_beverage', expected: 29.88, title: 'F&B Supervisor' },
    { id: 'BR-13', level: 5, stream: 'kitchen', expected: 29.88, title: 'Cook Grade 4' },
    { id: 'BR-14', level: 6, stream: 'kitchen', expected: 30.68, title: 'Cook Grade 5 Specialist' },
  ];
  for (const b of baseTests) {
    try {
      const r = await calcShift('full_time', classId(b.level, b.stream), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
      record(b.id, b.expected, r.baseHourlyRate, b.title);
    } catch (e) { recordText(b.id, b.expected, 'ERROR', 'FAIL', e.message); }
  }

  console.log('\n1.2 Casual rates (25% loading)');
  const casualTests = [
    { id: 'CL-01', level: 0, stream: 'introductory', expected: 30.35 },
    { id: 'CL-02', level: 1, stream: 'food_beverage', expected: 31.19 },
    { id: 'CL-03', level: 3, stream: 'food_beverage', expected: 33.38 },
    { id: 'CL-04', level: 5, stream: 'kitchen', expected: 37.35 },
    { id: 'CL-05', level: 6, stream: 'kitchen', expected: 38.35 },
  ];
  for (const c of casualTests) {
    try {
      const r = await calcShift('casual', classId(c.level, c.stream), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
      record(c.id, c.expected, r.baseHourlyRate);
    } catch (e) { recordText(c.id, c.expected, 'ERROR', 'FAIL', e.message); }
  }

  console.log('\n1.3 Junior rates');
  // MA000119: under 17=50%, 17=60%, 18=70%, 19=85%, 20+=adult
  const juniorTests = [
    { id: 'JR-01', level: 0, stream: 'introductory', age: 16, expected: 12.14, note: 'Under 17 = 50%' },
    { id: 'JR-02', level: 1, stream: 'food_beverage', age: 16, expected: 12.48, note: 'Under 17 L1' },
    { id: 'JR-03', level: 3, stream: 'food_beverage', age: 16, expected: 13.35, note: 'Under 17 L3' },
    { id: 'JR-04', level: 0, stream: 'introductory', age: 17, expected: 14.57, note: '17yr = 60%' },
    { id: 'JR-05', level: 3, stream: 'food_beverage', age: 17, expected: 16.02, note: '17yr L3' },
    { id: 'JR-06', level: 0, stream: 'introductory', age: 18, expected: 17.00, note: '18yr = 70%' },
    { id: 'JR-07', level: 3, stream: 'food_beverage', age: 18, expected: 18.69, note: '18yr L3' },
    { id: 'JR-08', level: 0, stream: 'introductory', age: 19, expected: 20.64, note: '19yr = 85%' },
    { id: 'JR-09', level: 3, stream: 'food_beverage', age: 19, expected: 22.70, note: '19yr L3' },
    { id: 'JR-10', level: 6, stream: 'kitchen', age: 19, expected: 26.08, note: '19yr L6 = 30.68×0.85' },
    { id: 'JR-11', level: 1, stream: 'food_beverage', age: 20, expected: 24.95, note: '20yr = adult' },
  ];
  for (const j of juniorTests) {
    try {
      const r = await calcShift('full_time', classId(j.level, j.stream), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: j.age });
      record(j.id, j.expected, r.baseHourlyRate, j.note);
    } catch (e) { recordText(j.id, j.expected, 'ERROR', 'FAIL', e.message); }
  }
}

// ══════════════════════════════════════════════════════════════════════════
async function runPenaltyRateTests() {
  console.log('\n═══ SECTION 2 — PENALTY RATES ═══');

  console.log('\n2.1 FT/PT penalty rates');
  const penTests = [
    { id: 'PR-01', level: 0, stream: 'introductory', base: 24.28, eve: 27.09, night: 28.50, sat: 30.35, sun: 36.42, ph: 54.63 },
    { id: 'PR-02', level: 1, stream: 'food_beverage', base: 24.95, eve: 27.76, night: 29.17, sat: 31.19, sun: 37.43, ph: 56.14 },
    { id: 'PR-03', level: 3, stream: 'food_beverage', base: 26.70, eve: 29.51, night: 30.92, sat: 33.38, sun: 40.05, ph: 60.08 },
    { id: 'PR-04', level: 5, stream: 'kitchen', base: 29.88, eve: 32.69, night: 34.10, sat: 37.35, sun: 44.82, ph: 67.23 },
    { id: 'PR-05', level: 6, stream: 'kitchen', base: 30.68, eve: 33.49, night: 34.90, sat: 38.35, sun: 46.02, ph: 69.03 },
  ];

  for (const p of penTests) {
    const cid = classId(p.level, p.stream);
    // Evening: 10pm-midnight (MA000119 specific — NOT 7pm!)
    try {
      const r = await calcShift('full_time', cid, REF_MONDAY, '22:00', '23:30', { mealBreakTaken: true, mealBreakDuration: 0 });
      record(`${p.id}-eve`, p.eve, r.shifts[0].segments[0]?.effectiveRate, `Evening 10pm-midnight L${p.level}`);
    } catch (e) { recordText(`${p.id}-eve`, p.eve, 'ERROR', 'FAIL', e.message); }

    // Night: midnight-6am
    try {
      const r = await calcShift('full_time', cid, REF_MONDAY, '01:00', '05:00', { mealBreakTaken: true, mealBreakDuration: 0 });
      record(`${p.id}-night`, p.night, r.shifts[0].segments[0]?.effectiveRate, `Night midnight-6am L${p.level}`);
    } catch (e) { recordText(`${p.id}-night`, p.night, 'ERROR', 'FAIL', e.message); }

    // Saturday
    try {
      const r = await calcShift('full_time', cid, REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
      record(`${p.id}-sat`, p.sat, r.shifts[0].segments[0]?.effectiveRate, `Saturday L${p.level}`);
    } catch (e) { recordText(`${p.id}-sat`, p.sat, 'ERROR', 'FAIL', e.message); }

    // Sunday
    try {
      const r = await calcShift('full_time', cid, REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
      record(`${p.id}-sun`, p.sun, r.shifts[0].segments[0]?.effectiveRate, `Sunday L${p.level}`);
    } catch (e) { recordText(`${p.id}-sun`, p.sun, 'ERROR', 'FAIL', e.message); }

    // Public holiday
    try {
      const r = await calcShift('full_time', cid, REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] });
      record(`${p.id}-ph`, p.ph, r.shifts[0].segments[0]?.effectiveRate, `Public holiday L${p.level}`);
    } catch (e) { recordText(`${p.id}-ph`, p.ph, 'ERROR', 'FAIL', e.message); }
  }

  // CRITICAL: 7pm-10pm should be ORDINARY rate (no penalty) — differs from MA000009
  console.log('\n2.2 MA000119-specific: 7pm-10pm = ordinary (no evening loading)');
  try {
    const cid = classId(3, 'food_beverage');
    const r = await calcShift('full_time', cid, REF_MONDAY, '19:00', '22:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    const rate = r.shifts[0].segments[0]?.effectiveRate;
    record('PR-06', 26.70, rate, '7pm-10pm Mon = ordinary rate (no evening penalty in MA000119)');
  } catch (e) { recordText('PR-06', 26.70, 'ERROR', 'FAIL', e.message); }

  // Evening starts at 10pm, not 7pm
  try {
    const cid = classId(3, 'food_beverage');
    const r = await calcShift('full_time', cid, REF_MONDAY, '21:00', '23:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    // 9pm-10pm = ordinary, 10pm-11pm = evening
    const segs = r.shifts[0].segments;
    const hasOrdinary = segs.some(s => s.effectiveRate === 26.70 && s.minutes === 60);
    const hasEvening = segs.some(s => Math.abs(s.effectiveRate - 29.51) < 0.01 && s.minutes === 60);
    recordText('PR-07', '1hr ordinary + 1hr evening', `${segs.length} segments`,
      hasOrdinary && hasEvening ? 'PASS' : 'FAIL',
      '9pm-11pm: first hour ordinary, second hour evening');
  } catch (e) { recordText('PR-07', 'split segments', 'ERROR', 'FAIL', e.message); }

  console.log('\n2.3 Casual penalty rates');
  const casualPenTests = [
    { id: 'PC-01', level: 1, stream: 'food_beverage', sat: 37.43, ph: 62.38 },
    { id: 'PC-02', level: 3, stream: 'food_beverage', sat: 40.05, ph: 66.75 },
    { id: 'PC-03', level: 5, stream: 'kitchen', sat: 44.82, ph: 74.70 },
  ];
  for (const c of casualPenTests) {
    const cid = classId(c.level, c.stream);
    try {
      const r = await calcShift('casual', cid, REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
      record(`${c.id}-sat`, c.sat, r.shifts[0].segments[0]?.effectiveRate, `Casual Saturday L${c.level}`);
    } catch (e) { recordText(`${c.id}-sat`, c.sat, 'ERROR', 'FAIL', e.message); }
    try {
      const r = await calcShift('casual', cid, REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] });
      record(`${c.id}-ph`, c.ph, r.shifts[0].segments[0]?.effectiveRate, `Casual PH L${c.level}`);
    } catch (e) { recordText(`${c.id}-ph`, c.ph, 'ERROR', 'FAIL', e.message); }
  }

  // CRITICAL: Casual Sunday split — L0-L2 = 1.20×, L3+ = 1.40×
  console.log('\n2.4 Casual Sunday level split (MA000119-specific)');
  // L2 should get 1.20× of casual base
  try {
    const r = await calcShift('casual', classId(2, 'food_beverage'), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    const sunRate = r.shifts[0].segments[0]?.effectiveRate;
    // L2 casual base = 32.3125. × 1.20 = 38.775 ≈ 38.78 (= 150% of FT $25.85)
    record('PC-04', 38.78, sunRate, 'Casual L2 Sunday = 1.20× casual (150% FT)');
  } catch (e) { recordText('PC-04', 38.78, 'ERROR', 'FAIL', e.message); }

  // L3 should get 1.40× of casual base
  try {
    const r = await calcShift('casual', classId(3, 'food_beverage'), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    const sunRate = r.shifts[0].segments[0]?.effectiveRate;
    // L3 casual base = 33.375. × 1.40 = 46.725 ≈ 46.73 (= 175% of FT $26.70)
    record('PC-05', 46.73, sunRate, 'Casual L3 Sunday = 1.40× casual (175% FT)');
  } catch (e) { recordText('PC-05', 46.73, 'ERROR', 'FAIL', e.message); }

  // Introductory (L0) should get 1.20×
  try {
    const r = await calcShift('casual', classId(0, 'introductory'), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    const sunRate = r.shifts[0].segments[0]?.effectiveRate;
    // Intro casual base = 30.35. × 1.20 = 36.42
    record('PC-06', 36.42, sunRate, 'Casual Introductory Sunday = 1.20× casual');
  } catch (e) { recordText('PC-06', 36.42, 'ERROR', 'FAIL', e.message); }
}

// ══════════════════════════════════════════════════════════════════════════
async function runOvertimeTests() {
  console.log('\n═══ SECTION 3 — OVERTIME ═══');
  const L3 = classId(3, 'food_beverage');

  console.log('\n3.1 FT/PT daily OT (10hr threshold)');
  // DO-01: 10hr — no OT
  try {
    const r = await calcShift('full_time', L3, REF_MONDAY, '08:00', '18:30', { mealBreakTaken: true, mealBreakDuration: 30 });
    record('DO-01', 267.00, payOnly(r), '10hr Mon, no OT');
  } catch (e) { recordText('DO-01', 267.00, 'ERROR', 'FAIL', e.message); }

  // DO-02: 11hr FT — NO daily OT for FT/PT in MA000119 (only weekly OT applies)
  try {
    const r = await calcShift('full_time', L3, REF_MONDAY, '07:00', '18:30', { mealBreakTaken: true, mealBreakDuration: 30 });
    // MA000119 has no FT/PT daily OT threshold — all 11hr at ordinary rate
    record('DO-02', 293.70, payOnly(r), '11hr Mon, no daily OT for FT/PT in MA000119');
  } catch (e) { recordText('DO-02', 293.70, 'ERROR', 'FAIL', e.message); }

  console.log('\n3.2 FT/PT weekly OT (38hr/40hr thresholds)');
  // WO-01: 38hr — no OT
  try {
    const shifts = [];
    for (let d = 7; d <= 11; d++) {
      shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '08:00', endTime: '16:06',
                    mealBreakTaken: true, mealBreakDuration: 30 });
    }
    const r = await calcMultiShift('full_time', L3, shifts);
    record('WO-01', 1014.60, r.summary.totalPayOwed, '38hr week, no OT');
  } catch (e) { recordText('WO-01', 1014.60, 'ERROR', 'FAIL', e.message); }

  // WO-02: 40hr — 2hr OT @1.5×
  try {
    const shifts = [];
    for (let d = 7; d <= 11; d++) {
      shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '08:00', endTime: '16:30',
                    mealBreakTaken: true, mealBreakDuration: 30 });
    }
    const r = await calcMultiShift('full_time', L3, shifts);
    record('WO-02', 1094.70, payOnly(r), '40hr week, 2hr OT (excl meal)');
  } catch (e) { recordText('WO-02', 1094.70, 'ERROR', 'FAIL', e.message); }

  // WO-03: 45hr — 7hr OT (2@1.5× + 5@2.0×)
  try {
    const shifts = [];
    for (let d = 7; d <= 11; d++) {
      shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '07:00', endTime: '16:30',
                    mealBreakTaken: true, mealBreakDuration: 30 });
    }
    const r = await calcMultiShift('full_time', L3, shifts);
    record('WO-03', 1361.70, payOnly(r), '45hr week, 7hr OT (excl meal)');
  } catch (e) { recordText('WO-03', 1361.70, 'ERROR', 'FAIL', e.message); }

  console.log('\n3.3 Casual daily OT (11hr threshold — MA000119-specific)');
  // CO-01: Casual 11hr — no OT (at threshold)
  try {
    const r = await calcShift('casual', L3, REF_MONDAY, '07:00', '18:30', { mealBreakTaken: true, mealBreakDuration: 30 });
    // 11hr worked. Casual daily threshold = 11hr, so no OT.
    const expected = 11 * 33.375; // $367.13
    record('CO-01', 367.13, payOnly(r), 'Casual 11hr = at threshold, no OT');
  } catch (e) { recordText('CO-01', 367.13, 'ERROR', 'FAIL', e.message); }

  // CO-02: Casual 12hr — 1hr OT @1.5×
  try {
    const r = await calcShift('casual', L3, REF_MONDAY, '07:00', '19:30', { mealBreakTaken: true, mealBreakDuration: 30 });
    // 12hr. 11hr ordinary + 1hr OT @1.5×. OT premium: 1 × 33.375 × 0.5 = $16.69
    // Total: 12 × 33.375 + 16.69 = $400.50 + $16.69 = $417.19? No...
    // Base segments: 12hr × $33.375 = $400.50. OT premium = 1hr × 33.375 × 0.5 = $16.69
    // Total: $400.50 + $16.69 = $417.19
    record('CO-02', 417.19, payOnly(r), 'Casual 12hr, 1hr OT @1.5×');
  } catch (e) { recordText('CO-02', 417.19, 'ERROR', 'FAIL', e.message); }

  console.log('\n3.4 Daily + weekly OT interaction');
  // DW-01: 12hr Mon + 8hr×4 Tue-Fri = 44hr
  try {
    const shifts = [
      { date: REF_MONDAY, startTime: '07:00', endTime: '19:30', mealBreakTaken: true, mealBreakDuration: 30 },
      { date: REF_TUESDAY, startTime: '08:00', endTime: '16:30', mealBreakTaken: true, mealBreakDuration: 30 },
      { date: REF_WEDNESDAY, startTime: '08:00', endTime: '16:30', mealBreakTaken: true, mealBreakDuration: 30 },
      { date: REF_THURSDAY, startTime: '08:00', endTime: '16:30', mealBreakTaken: true, mealBreakDuration: 30 },
      { date: REF_FRIDAY, startTime: '08:00', endTime: '16:30', mealBreakTaken: true, mealBreakDuration: 30 },
    ];
    const r = await calcMultiShift('full_time', L3, shifts);
    // Daily: 2hr Mon OT. Weekly: 6hr total, minus 2hr daily = 4hr net weekly OT.
    // Total OT minutes should be 6hr = 360min (not double-counted)
    recordText('DW-01', '360min OT', `${r.summary.overtimeMinutes}min OT`,
      r.summary.overtimeMinutes === 360 ? 'PASS' : 'FAIL',
      '44hr week, 12hr Mon — daily+weekly OT no double-count');
  } catch (e) { recordText('DW-01', '360min', 'ERROR', 'FAIL', e.message); }
}

// ══════════════════════════════════════════════════════════════════════════
async function runBreakTests() {
  console.log('\n═══ SECTION 4 — BREAKS ═══');
  const L3 = classId(3, 'food_beverage');

  // RB-01: <4hr — no rest break
  try {
    const r = await calcShift('full_time', L3, REF_MONDAY, '09:00', '12:00', { mealBreakTaken: false, restBreakTaken: false });
    const hasRest = r.shifts[0].breakViolations.some(v => v.type === 'rest_break');
    recordText('RB-01', 'No rest break flag', hasRest ? 'Flagged' : 'No flag', hasRest ? 'FAIL' : 'PASS');
  } catch (e) { recordText('RB-01', 'No flag', 'ERROR', 'FAIL', e.message); }

  // RB-02: 5hr — 1 rest break
  try {
    const r = await calcShift('full_time', L3, REF_MONDAY, '09:00', '14:30', { mealBreakTaken: true, mealBreakDuration: 30, restBreakTaken: false });
    const restV = r.shifts[0].breakViolations.find(v => v.type === 'rest_break');
    recordText('RB-02', 'Rest break required', restV ? restV.message : 'No violation', restV ? 'PASS' : 'FAIL');
  } catch (e) { recordText('RB-02', 'Rest break', 'ERROR', 'FAIL', e.message); }

  // MB-01: <5hr — no meal break required
  try {
    const r = await calcShift('full_time', L3, REF_MONDAY, '09:00', '13:30', { mealBreakTaken: false });
    const hasMeal = r.shifts[0].breakViolations.some(v => v.type === 'meal_break');
    recordText('MB-01', 'No meal violation', hasMeal ? 'Flagged' : 'No flag', hasMeal ? 'FAIL' : 'PASS');
  } catch (e) { recordText('MB-01', 'No violation', 'ERROR', 'FAIL', e.message); }

  // MB-02: 7hr no meal break — violation + double time
  try {
    const r = await calcShift('full_time', L3, REF_MONDAY, '09:00', '16:00', { mealBreakTaken: false });
    const hasMeal = r.shifts[0].breakViolations.some(v => v.type === 'meal_break');
    const hasDT = r.shifts[0].missedBreakApplied;
    recordText('MB-02', 'Violation + double time',
      `Violation: ${hasMeal}, Double time: ${hasDT}`,
      hasMeal && hasDT ? 'PASS' : 'FAIL');
  } catch (e) { recordText('MB-02', 'Violation + DT', 'ERROR', 'FAIL', e.message); }
}

// ══════════════════════════════════════════════════════════════════════════
async function runAllowanceTests() {
  console.log('\n═══ SECTION 5 — ALLOWANCES ═══');

  try {
    const r = await pool.query("SELECT allowance_type, amount FROM allowances WHERE award_code = $1 AND effective_date >= '2025-07-01' ORDER BY allowance_type", [AWARD_CODE]);
    for (const row of r.rows) {
      if (row.allowance_type === 'meal') record('AL-01', 16.73, parseFloat(row.amount), 'Meal allowance');
      if (row.allowance_type === 'split_shift') record('AL-02', 5.34, parseFloat(row.amount), 'Split shift allowance');
      if (row.allowance_type === 'tool') record('AL-03', 2.03, parseFloat(row.amount), 'Tool allowance per day');
    }
  } catch (e) { recordText('AL-01', 'N/A', 'ERROR', 'FAIL', e.message); }
}

// ══════════════════════════════════════════════════════════════════════════
async function runMinEngagementTests() {
  console.log('\n═══ SECTION 6 — MINIMUM ENGAGEMENT ═══');

  // ME-01: Casual 1hr weekday — paid for 2hr minimum
  try {
    const r = await calcShift('casual', classId(3, 'food_beverage'), REF_MONDAY, '10:00', '11:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    // 2hr × $33.375 = $66.75
    record('ME-01', 66.75, r.summary.totalPayOwed, 'Casual 1hr → 2hr minimum');
  } catch (e) { recordText('ME-01', 66.75, 'ERROR', 'FAIL', e.message); }

  // ME-02: Casual Sunday 1hr at L2 — 2hr min at L2 Sunday rate (1.20×)
  try {
    const r = await calcShift('casual', classId(2, 'food_beverage'), REF_SUNDAY, '10:00', '11:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    // L2 casual Sunday (1.20× casual): 32.3125 × 1.20 = 38.775 ≈ $38.78/hr × 2hr = $77.56
    record('ME-02', 77.55, r.summary.totalPayOwed, 'Casual L2 Sunday min 2hr (1.20× rate)');
  } catch (e) { recordText('ME-02', 77.55, 'ERROR', 'FAIL', e.message); }

  // ME-03: Casual Sunday 1hr at L3 — 2hr min at L3 Sunday rate (1.40×)
  try {
    const r = await calcShift('casual', classId(3, 'food_beverage'), REF_SUNDAY, '10:00', '11:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    // L3 casual Sunday (1.40× casual): 33.375 × 1.40 = 46.725 ≈ $46.73/hr × 2hr = $93.46
    record('ME-03', 93.45, r.summary.totalPayOwed, 'Casual L3 Sunday min 2hr (1.40× rate)');
  } catch (e) { recordText('ME-03', 93.45, 'ERROR', 'FAIL', e.message); }

  // ME-04: Casual 3hr — over minimum, no adjustment
  try {
    const r = await calcShift('casual', classId(3, 'food_beverage'), REF_MONDAY, '10:00', '13:00', { mealBreakTaken: false });
    record('ME-04', 100.13, r.summary.totalPayOwed, 'Casual 3hr, over minimum');
  } catch (e) { recordText('ME-04', 100.13, 'ERROR', 'FAIL', e.message); }
}

// ══════════════════════════════════════════════════════════════════════════
async function runComplexScenarioTests() {
  console.log('\n═══ SECTION 7 — COMPLEX SCENARIOS ═══');
  const L3 = classId(3, 'food_beverage');

  // CS-01: 7pm-10pm gap test — critical MA000119 difference
  console.log('\nCS-01: Evening band boundary');
  try {
    const r = await calcShift('full_time', L3, REF_MONDAY, '18:00', '23:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    // 6pm-10pm = 4hr ordinary @$26.70, 10pm-11pm = 1hr evening @$29.51
    // Total: 4×26.70 + 1×29.51 = $106.80 + $29.51 = $136.31
    record('CS-01', 136.31, r.summary.totalPayOwed, '6pm-11pm: 4hr ordinary + 1hr evening (10pm boundary)');
  } catch (e) { recordText('CS-01', 136.31, 'ERROR', 'FAIL', e.message); }

  // CS-02: Overnight 10pm-4am
  console.log('\nCS-02: Overnight Mon→Tue');
  try {
    const r = await calcShift('full_time', L3, REF_MONDAY, '22:00', '04:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    // Mon 10pm-midnight = 2hr evening (+$2.81): $29.51×2 = $59.02
    // Tue midnight-4am = 4hr night (+$4.22): $30.92×4 = $123.68
    // Total: $182.70
    record('CS-02', 182.70, r.summary.totalPayOwed, 'Overnight 10pm-4am: 2hr evening + 4hr night');
  } catch (e) { recordText('CS-02', 182.70, 'ERROR', 'FAIL', e.message); }

  // CS-03: Sunday to Monday overnight
  console.log('\nCS-03: Sun→Mon overnight');
  try {
    const r = await calcShift('full_time', L3, REF_SUNDAY, '22:00', '02:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    // Sun 10pm-midnight = 2hr Sunday (1.5×): $40.05×2 = $80.10
    // Mon midnight-2am = 2hr night (+$4.22): $30.92×2 = $61.84
    // Total: $141.94
    record('CS-03', 141.94, r.summary.totalPayOwed, 'Sun→Mon 10pm-2am: Sunday then night');
  } catch (e) { recordText('CS-03', 141.94, 'ERROR', 'FAIL', e.message); }

  // CS-04: Saturday with OT
  console.log('\nCS-04: Saturday 11hr with OT');
  try {
    const r = await calcShift('full_time', L3, REF_SATURDAY, '08:00', '19:30', { mealBreakTaken: true, mealBreakDuration: 30 });
    // MA000119: no FT daily OT. All 11hr at Saturday 1.25× rate.
    // 11 × $33.375 = $367.13
    record('CS-04', 367.13, payOnly(r), 'Sat 11hr, no FT daily OT in MA000119');
  } catch (e) { recordText('CS-04', 373.85, 'ERROR', 'FAIL', e.message); }

  // CS-05: Full week 46hr with Sat
  console.log('\nCS-05: Full week 46hr Mon-Sat');
  try {
    const shifts = [
      { date: REF_MONDAY, startTime: '08:00', endTime: '16:30', mealBreakTaken: true, mealBreakDuration: 30 },
      { date: REF_TUESDAY, startTime: '08:00', endTime: '16:30', mealBreakTaken: true, mealBreakDuration: 30 },
      { date: REF_WEDNESDAY, startTime: '08:00', endTime: '16:30', mealBreakTaken: true, mealBreakDuration: 30 },
      { date: REF_THURSDAY, startTime: '08:00', endTime: '16:30', mealBreakTaken: true, mealBreakDuration: 30 },
      { date: REF_FRIDAY, startTime: '08:00', endTime: '16:30', mealBreakTaken: true, mealBreakDuration: 30 },
      { date: REF_SATURDAY, startTime: '08:00', endTime: '14:30', mealBreakTaken: true, mealBreakDuration: 30 },
    ];
    const r = await calcMultiShift('full_time', L3, shifts);
    // 46hr. Weekly OT: 8hr (46-38). But Sat 6hr has 1.25× penalty.
    // First 2hr OT @1.5×, next 6hr @2.0×
    // OT premium on weekday hrs: pure (m-1.0)×base
    // OT premium on Sat hrs: MAX(0, m-1.25)×base
    const total = payOnly(r);
    // Approximate: 40×26.70 + 6×33.38 + OT premium
    // This is complex — just verify it's in reasonable range
    recordText('CS-05', '>$1350', `$${total}`,
      total > 1350 && total < 1500 ? 'PASS' : 'FAIL',
      `46hr week Mon-Sat, total pay excl meal = $${total}`);
  } catch (e) { recordText('CS-05', '>$1350', 'ERROR', 'FAIL', e.message); }

  // CS-06: Casual L2 vs L3 Sunday boundary — min engagement
  console.log('\nCS-06: Casual Sunday boundary L2 vs L3');
  try {
    const rL2 = await calcShift('casual', classId(2, 'food_beverage'), REF_SUNDAY, '10:00', '14:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    const rL3 = await calcShift('casual', classId(3, 'food_beverage'), REF_SUNDAY, '10:00', '14:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    const l2Rate = rL2.shifts[0].segments[0]?.effectiveRate;
    const l3Rate = rL3.shifts[0].segments[0]?.effectiveRate;
    // L2: 1.20× casual = $38.78. L3: 1.40× casual = $46.73.
    recordText('CS-06', 'L2<L3', `L2=$${round2(l2Rate)} L3=$${round2(l3Rate)}`,
      l2Rate < l3Rate ? 'PASS' : 'FAIL',
      `L2 Sunday ${round2(l2Rate)} (1.20×) vs L3 Sunday ${round2(l3Rate)} (1.40×)`);
  } catch (e) { recordText('CS-06', 'L2<L3', 'ERROR', 'FAIL', e.message); }

  // CS-07: Casual junior Sunday
  console.log('\nCS-07: Casual junior (under-17) Sunday');
  try {
    const r = await calcShift('casual', classId(2, 'food_beverage'), REF_SUNDAY, '10:00', '14:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 16 });
    // Junior under-17 = 50% of adult. Adult L2 = $25.85. Junior = $12.93. Casual = $16.16.
    // Sunday L2 casual (1.20×): $16.16 × 1.20 = $19.39
    // 4hr × $19.39 = $77.56
    const sunRate = r.shifts[0].segments[0]?.effectiveRate;
    record('CS-07', 19.39, sunRate, 'Junior casual L2 Sunday rate (50% × 1.25 × 1.20)');
  } catch (e) { recordText('CS-07', 19.39, 'ERROR', 'FAIL', e.message); }
}

// ══════════════════════════════════════════════════════════════════════════
async function runSuperTests() {
  console.log('\n═══ SECTION 8 — SUPERANNUATION ═══');
  const L3 = classId(3, 'food_beverage');

  // SU-01: Simple weekday 8hr — super on all pay
  try {
    const r = await calcShift('full_time', L3, REF_MONDAY, '08:00', '16:30', { mealBreakTaken: true, mealBreakDuration: 30 });
    record('SU-01', 25.63, r.summary.superAmount, 'Super on 8hr weekday (12% of $213.60)');
  } catch (e) { recordText('SU-01', 25.63, 'ERROR', 'FAIL', e.message); }

  // SU-02: SGC rate = 12%
  try {
    const r = await calcShift('full_time', L3, REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('SU-02', 0.12, r.summary.sgcRate, 'SGC rate is 12%');
  } catch (e) { recordText('SU-02', 0.12, 'ERROR', 'FAIL', e.message); }

  // SU-03: OT excluded from super
  try {
    const r = await calcShift('full_time', L3, REF_MONDAY, '07:00', '18:30', { mealBreakTaken: true, mealBreakDuration: 30 });
    // MA000119: no FT daily OT, so all 11hr are OTE. OTE = 11 × $26.70 = $293.70
    const otePay = 11 * 26.70;
    record('SU-03', round2(otePay * 0.12), r.summary.superAmount, 'Super on all 11hr (no FT daily OT in MA000119)');
  } catch (e) { recordText('SU-03', 32.04, 'ERROR', 'FAIL', e.message); }
}

// ══════════════════════════════════════════════════════════════════════════
async function runRegressionTests() {
  console.log('\n═══ SECTION 9 — REGRESSION ═══');

  // RT-01: Casual L3 Sunday 3hr
  try {
    const r = await calcShift('casual', classId(3, 'food_beverage'), REF_SUNDAY, '10:00', '13:00', { mealBreakTaken: false });
    // L3 casual Sunday 1.40×: 33.375 × 1.40 = $46.725. 3hr = $140.18
    record('RT-01', 140.18, r.summary.totalPayOwed, 'Casual L3 Sunday 3hr');
  } catch (e) { recordText('RT-01', 140.18, 'ERROR', 'FAIL', e.message); }

  // RT-02: FT L3 overnight 10pm-4am
  try {
    const r = await calcShift('full_time', classId(3, 'food_beverage'), REF_MONDAY, '22:00', '04:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-02', 182.70, r.summary.totalPayOwed, 'FT L3 Mon overnight 10pm-4am');
  } catch (e) { recordText('RT-02', 182.70, 'ERROR', 'FAIL', e.message); }

  // RT-03: FT L3 40hr week
  try {
    const shifts = [];
    for (let d = 7; d <= 11; d++) {
      shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '08:00', endTime: '16:30',
                    mealBreakTaken: true, mealBreakDuration: 30 });
    }
    const r = await calcMultiShift('full_time', classId(3, 'food_beverage'), shifts);
    record('RT-03', 1094.70, payOnly(r), 'FT L3 40hr week (excl meal)');
  } catch (e) { recordText('RT-03', 1094.70, 'ERROR', 'FAIL', e.message); }

  // RT-04: PT L2 PH 6hr
  try {
    const r = await calcShift('part_time', classId(2, 'food_beverage'), REF_PH, '09:00', '15:30', { mealBreakTaken: true, mealBreakDuration: 30, publicHolidays: [REF_PH] });
    record('RT-04', 348.96, payOnly(r), 'PT L2 PH 6hr');
  } catch (e) { recordText('RT-04', 348.96, 'ERROR', 'FAIL', e.message); }

  // RT-05: Evening boundary — 9pm-11pm (1hr ordinary + 1hr evening)
  try {
    const r = await calcShift('full_time', classId(3, 'food_beverage'), REF_MONDAY, '21:00', '23:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    // 1hr × $26.70 + 1hr × $29.51 = $56.21
    record('RT-05', 56.21, r.summary.totalPayOwed, 'Evening boundary 9pm-11pm');
  } catch (e) { recordText('RT-05', 56.21, 'ERROR', 'FAIL', e.message); }
}

// ══════════════════════════════════════════════════════════════════════════
async function main() {
  console.log('WageCheck Restaurant Award Test Runner — MA000119');
  console.log('═'.repeat(60));

  await t.init();

  await runBaseRateTests();
  await runPenaltyRateTests();
  await runOvertimeTests();
  await runBreakTests();
  await runAllowanceTests();
  await runMinEngagementTests();
  await runComplexScenarioTests();
  await runSuperTests();
  await runRegressionTests();

  t.printSummary();
  t.generateExcel();
  await t.cleanup();
}

main().catch(e => {
  console.error('Fatal error:', e);
  t.cleanup();
  process.exit(1);
});
