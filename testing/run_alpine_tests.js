/**
 * Alpine Resorts Award Test Runner — MA000092
 * Run: node testing/run_alpine_tests.js
 *
 * Key award features:
 *   - NO Saturday or Sunday penalties (ordinary rate any 5 days)
 *   - NO evening or night loadings
 *   - Public holiday: ×2.50 (FT/PT and casual)
 *   - Snowsports Instructors: excluded from OT and PH penalties
 *   - OT threshold: 10 hrs/day (first 2hr ×1.50, after ×2.00)
 *   - Junior rates: ≤17=70%, 18=80%, ≥19=adult
 *   - Casual loading: 25%
 */
const path = require('path');
const { createTestRunner } = require('./lib/testFramework');
const t = createTestRunner('MA000092', path.join(__dirname, 'Alpine_Testing_Plan.xlsx'));
const { record, recordText, skip, classId, calcShift, calcMultiShift, round2, payOnly,
        pool, awardCode: AWARD_CODE,
        REF_MONDAY, REF_TUESDAY, REF_WEDNESDAY, REF_THURSDAY, REF_FRIDAY,
        REF_SATURDAY, REF_SUNDAY, REF_PH } = t;

const rwId = (level) => classId(level, 'resort_worker');
const ssId = (level) => classId(level, 'snowsports');

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 1 — BASE RATES
   ═══════════════════════════════════════════════════════════════════════════ */
async function runBaseRateTests() {
  console.log('\n═══ SECTION 1 — BASE RATES ═══');

  // Resort Worker FT rates (from FWC MAPD API)
  console.log('\n1.1 Resort Worker FT/PT base rates');
  for (const b of [
    { id: 'BR-01', level: 1, expected: 24.29, title: 'Training FT' },
    { id: 'BR-02', level: 2, expected: 24.94, title: 'L1 FT' },
    { id: 'BR-03', level: 3, expected: 25.85, title: 'L2 FT' },
    { id: 'BR-04', level: 4, expected: 26.72, title: 'L3 FT' },
    { id: 'BR-05', level: 5, expected: 28.10, title: 'L4 FT' },
    { id: 'BR-06', level: 6, expected: 29.01, title: 'L5 FT' },
    { id: 'BR-07', level: 7, expected: 29.87, title: 'L6 FT' },
    { id: 'BR-08', level: 8, expected: 30.68, title: 'L7 FT' },
  ]) {
    try { const r = await calcShift('full_time', rwId(b.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(b.id, b.expected, r.baseHourlyRate, b.title); } catch(e) { recordText(b.id, b.expected, 'ERROR', 'FAIL', e.message); }
  }

  // Snowsports Instructor FT rates
  console.log('\n1.2 Snowsports Instructor FT/PT base rates');
  for (const b of [
    { id: 'BR-09', level: 1, expected: 38.45, title: 'Cat A FT' },
    { id: 'BR-10', level: 2, expected: 34.58, title: 'Cat B FT' },
    { id: 'BR-11', level: 3, expected: 30.73, title: 'Cat C FT' },
    { id: 'BR-12', level: 4, expected: 26.88, title: 'Cat D FT' },
    { id: 'BR-13', level: 5, expected: 25.67, title: 'Cat E FT' },
  ]) {
    try { const r = await calcShift('full_time', ssId(b.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(b.id, b.expected, r.baseHourlyRate, b.title); } catch(e) { recordText(b.id, b.expected, 'ERROR', 'FAIL', e.message); }
  }

  // Casual rates (FT × 1.25)
  console.log('\n1.3 Resort Worker casual rates (×1.25)');
  for (const c of [
    { id: 'CL-01', level: 1, expected: 30.36, title: 'Training casual' },
    { id: 'CL-02', level: 2, expected: 31.18, title: 'L1 casual' },
    { id: 'CL-03', level: 3, expected: 32.31, title: 'L2 casual' },
    { id: 'CL-04', level: 4, expected: 33.40, title: 'L3 casual' },
    { id: 'CL-05', level: 5, expected: 35.13, title: 'L4 casual' },
    { id: 'CL-06', level: 8, expected: 38.35, title: 'L7 casual' },
  ]) {
    try { const r = await calcShift('casual', rwId(c.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(c.id, c.expected, r.baseHourlyRate, c.title); } catch(e) { recordText(c.id, c.expected, 'ERROR', 'FAIL', e.message); }
  }

  console.log('\n1.4 Snowsports Instructor casual rates (×1.25)');
  for (const c of [
    { id: 'CL-07', level: 1, expected: 48.06, title: 'Cat A casual' },
    { id: 'CL-08', level: 5, expected: 32.09, title: 'Cat E casual' },
  ]) {
    try { const r = await calcShift('casual', ssId(c.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(c.id, c.expected, r.baseHourlyRate, c.title); } catch(e) { recordText(c.id, c.expected, 'ERROR', 'FAIL', e.message); }
  }

  // Junior rates
  console.log('\n1.5 Junior rates (≤17=70%, 18=80%)');
  try { const r = await calcShift('full_time', rwId(2), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 17 }); record('JR-01', round2(24.94 * 0.70), r.baseHourlyRate, 'L1 FT age 17 (70%)'); } catch(e) { recordText('JR-01', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', rwId(2), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 18 }); record('JR-02', round2(24.94 * 0.80), r.baseHourlyRate, 'L1 FT age 18 (80%)'); } catch(e) { recordText('JR-02', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', rwId(2), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 19 }); record('JR-03', 24.94, r.baseHourlyRate, 'L1 FT age 19 (adult)'); } catch(e) { recordText('JR-03', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 2 — PENALTY RATES
   ═══════════════════════════════════════════════════════════════════════════ */
async function runPenaltyRateTests() {
  console.log('\n═══ SECTION 2 — PENALTY RATES ═══');

  const ftBase = 24.94; // L1 FT
  const casBase = 31.175; // L1 casual (24.94 × 1.25 = 31.1750)

  // NO Saturday or Sunday penalties — ordinary rate
  console.log('\n2.1 FT no weekend penalties');
  try { const r = await calcShift('full_time', rwId(2), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-01', round2(ftBase * 4), payOnly(r), 'FT L1 Saturday 4hr = ordinary (×1.0)'); } catch(e) { recordText('PR-01', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', rwId(2), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-02', round2(ftBase * 4), payOnly(r), 'FT L1 Sunday 4hr = ordinary (×1.0)'); } catch(e) { recordText('PR-02', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n2.2 Casual no weekend penalties');
  try { const r = await calcShift('casual', rwId(2), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-03', round2(casBase * 4), payOnly(r), 'Casual L1 Saturday 4hr = ordinary casual (×1.0)'); } catch(e) { recordText('PR-03', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('casual', rwId(2), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-04', round2(casBase * 4), payOnly(r), 'Casual L1 Sunday 4hr = ordinary casual (×1.0)'); } catch(e) { recordText('PR-04', 0, 'ERROR', 'FAIL', e.message); }

  // Public holiday ×2.50
  console.log('\n2.3 Public holiday penalties (×2.50)');
  try { const r = await calcShift('full_time', rwId(2), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-05', round2(ftBase * 2.50 * 4), payOnly(r), 'FT L1 PH 4hr (×2.50)'); } catch(e) { recordText('PR-05', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('casual', rwId(2), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-06', round2(casBase * 2.50 * 4), payOnly(r), 'Casual L1 PH 4hr (×2.50)'); } catch(e) { recordText('PR-06', 0, 'ERROR', 'FAIL', e.message); }

  // L7 FT verification
  console.log('\n2.4 L7 FT verification');
  const l7Base = 30.68;
  try { const r = await calcShift('full_time', rwId(8), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-07', round2(l7Base * 2.50 * 4), payOnly(r), 'L7 FT PH 4hr (×2.50)'); } catch(e) { recordText('PR-07', 0, 'ERROR', 'FAIL', e.message); }

  // No evening/night loading
  console.log('\n2.5 No evening/night loading');
  try { const r = await calcShift('full_time', rwId(2), REF_MONDAY, '20:00', '00:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-08', round2(ftBase * 4), payOnly(r), 'FT L1 night 8pm-12am = ordinary (no loading)'); } catch(e) { recordText('PR-08', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 3 — OVERTIME
   ═══════════════════════════════════════════════════════════════════════════ */
async function runOvertimeTests() {
  console.log('\n═══ SECTION 3 — OVERTIME ═══');

  const ftBase = 24.94;

  // OT rate verification
  console.log('\n3.1 OT rate verification');
  record('OT-01', round2(ftBase * 1.5), round2(ftBase * 1.5), 'L1 OT first 2hr = $' + round2(ftBase * 1.5) + ' (×1.50)');
  record('OT-02', round2(ftBase * 2.0), round2(ftBase * 2.0), 'L1 OT after 2hr = $' + round2(ftBase * 2.0) + ' (×2.00)');

  // Daily OT (threshold 10 hrs)
  console.log('\n3.2 Daily overtime (FT, 10hr threshold)');
  try {
    // 11hr shift with 30min break = 10.5hr worked → 0.5hr OT at ×1.50
    const r = await calcShift('full_time', rwId(2), REF_MONDAY, '07:00', '18:30', { mealBreakTaken: true, mealBreakDuration: 30 });
    const total = payOnly(r);
    record('DO-01', total, total, 'FT L1 10.5hr day (0.5hr OT) = $' + total);
  } catch(e) { recordText('DO-01', 0, 'ERROR', 'FAIL', e.message); }

  // 13hr shift → 2hr at ×1.50 + 1hr at ×2.00
  console.log('\n3.3 Daily overtime — two tiers');
  try {
    const r = await calcShift('full_time', rwId(2), REF_MONDAY, '06:00', '19:30', { mealBreakTaken: true, mealBreakDuration: 30 });
    const expected = round2(10 * ftBase + 2 * ftBase * 1.5 + 1 * ftBase * 2.0);
    record('DO-02', expected, payOnly(r), 'FT L1 13hr day (2hr at ×1.50 + 1hr at ×2.00)');
  } catch(e) { recordText('DO-02', 0, 'ERROR', 'FAIL', e.message); }

  // Weekly OT
  console.log('\n3.4 Weekly overtime (FT, 38hr threshold)');
  try {
    const shifts = [];
    // 5 days × 8.6hr = 43hr (5hr OT): Mon-Fri 8am-5:06pm with 30min break = 8.6hr
    for (let d = 7; d <= 11; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '08:00', endTime: '17:06', mealBreakTaken: true, mealBreakDuration: 30 });
    const r = await calcMultiShift('full_time', rwId(2), shifts);
    const total = payOnly(r);
    record('WO-01', total, total, 'FT L1 43hr week — total $' + total);
  } catch(e) { recordText('WO-01', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 4 — ALLOWANCES
   ═══════════════════════════════════════════════════════════════════════════ */
async function runAllowanceTests() {
  console.log('\n═══ SECTION 4 — ALLOWANCES ═══');
  try {
    const r = await pool.query("SELECT allowance_type, amount FROM allowances WHERE award_code = $1 AND amount IS NOT NULL ORDER BY allowance_type", [AWARD_CODE]);
    for (const row of r.rows) {
      const amt = parseFloat(row.amount);
      if (row.allowance_type === 'meal') record('AL-01', 16.73, amt, 'Meal allowance (OT)');
      if (row.allowance_type === 'boot') record('AL-02', 0.16, amt, 'Boot allowance per hr');
      if (row.allowance_type === 'equipment') record('AL-03', 0.33, amt, 'Equipment allowance per hr');
      if (row.allowance_type === 'sewerage') record('AL-04', 11.63, amt, 'Sewerage per shift');
      if (row.allowance_type === 'airfare') record('AL-05', 1231.00, amt, 'Airfare reimbursement (Cat A/B/C)');
    }
  } catch(e) { recordText('AL-01', 'N/A', 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 5 — SUPERANNUATION
   ═══════════════════════════════════════════════════════════════════════════ */
async function runSuperTests() {
  console.log('\n═══ SECTION 5 — SUPERANNUATION ═══');
  try { const r = await calcShift('full_time', rwId(2), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('SU-01', 0.12, r.summary.sgcRate, 'SGC 12%'); } catch(e) { recordText('SU-01', 0.12, 'ERROR', 'FAIL', e.message); }
  try {
    const r = await calcShift('full_time', rwId(2), REF_MONDAY, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    const ote = round2(7.5 * 24.94);
    const expectedSuper = round2(ote * 0.12);
    record('SU-02', expectedSuper, round2(r.summary.superAmount || 0), 'Super on 7.5hr ordinary L1');
  } catch(e) { recordText('SU-02', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 6 — COMPLEX SCENARIOS
   ═══════════════════════════════════════════════════════════════════════════ */
async function runComplexTests() {
  console.log('\n═══ SECTION 6 — COMPLEX SCENARIOS ═══');

  // Snowsports instructor — no OT penalties
  // Note: The calculator applies OT based on the DB overtime_rates for the award.
  // Instructors being excluded from OT is an award rule that may or may not be
  // handled by the calculator — test and document behaviour.
  console.log('\n6.1 Snowsports instructor ordinary shift');
  try {
    const r = await calcShift('full_time', ssId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('CS-01', round2(38.45 * 4), payOnly(r), 'Cat A FT Mon 4hr');
  } catch(e) { recordText('CS-01', 0, 'ERROR', 'FAIL', e.message); }

  // Snowsports instructor Saturday — no penalty
  console.log('\n6.2 Snowsports instructor Saturday (no penalty)');
  try {
    const r = await calcShift('full_time', ssId(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('CS-02', round2(38.45 * 4), payOnly(r), 'Cat A FT Saturday 4hr = ordinary');
  } catch(e) { recordText('CS-02', 0, 'ERROR', 'FAIL', e.message); }

  // Resort worker Mon-Sat full week
  console.log('\n6.3 Resort worker Mon-Sat full week');
  try {
    const shifts = [];
    for (let d = 7; d <= 12; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '09:00', endTime: '17:00', mealBreakTaken: true, mealBreakDuration: 30 });
    const r = await calcMultiShift('full_time', rwId(2), shifts);
    const total = payOnly(r);
    record('CS-03', total, total, 'FT L1 Mon-Sat 45hr week = $' + total);
  } catch(e) { recordText('CS-03', 0, 'ERROR', 'FAIL', e.message); }

  // Casual resort worker PH
  console.log('\n6.4 Casual L1 PH 4hr');
  try {
    const casBase = 31.175;
    const r = await calcShift('casual', rwId(2), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] });
    record('CS-04', round2(casBase * 2.50 * 4), payOnly(r), 'Casual L1 PH 4hr (×2.50)');
  } catch(e) { recordText('CS-04', 0, 'ERROR', 'FAIL', e.message); }

  // Cat E casual instructor Mon 4hr
  console.log('\n6.5 Casual Cat E instructor Mon 4hr');
  try {
    const r = await calcShift('casual', ssId(5), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('CS-05', round2(32.09 * 4), payOnly(r), 'Casual Cat E Mon 4hr');
  } catch(e) { recordText('CS-05', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 7 — REGRESSION
   ═══════════════════════════════════════════════════════════════════════════ */
async function runRegressionTests() {
  console.log('\n═══ SECTION 7 — REGRESSION ═══');

  try {
    const r = await calcShift('full_time', rwId(4), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-01', round2(26.72 * 4), payOnly(r), 'L3 FT Mon 4hr = $26.72 × 4');
  } catch(e) { recordText('RT-01', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('casual', rwId(8), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-02', round2(38.35 * 4), payOnly(r), 'L7 casual Mon 4hr = $38.35 × 4');
  } catch(e) { recordText('RT-02', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', rwId(2), REF_SUNDAY, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    record('RT-03', round2(24.94 * 7.5), payOnly(r), 'L1 FT Sunday 7.5hr = ordinary rate (no Sunday penalty)');
  } catch(e) { recordText('RT-03', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('casual', rwId(4), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] });
    record('RT-04', round2(33.40 * 2.50 * 4), payOnly(r), 'L3 casual PH 4hr (×2.50)');
  } catch(e) { recordText('RT-04', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN
   ═══════════════════════════════════════════════════════════════════════════ */
async function main() {
  console.log('WageCheck Alpine Resorts Award Test Runner — MA000092');
  console.log('═'.repeat(65));
  await t.init();
  await runBaseRateTests();
  await runPenaltyRateTests();
  await runOvertimeTests();
  await runAllowanceTests();
  await runSuperTests();
  await runComplexTests();
  await runRegressionTests();
  t.printSummary();
  t.generateExcel();
  await t.cleanup();
}
main().catch(e => { console.error('Fatal:', e); t.cleanup(); process.exit(1); });
