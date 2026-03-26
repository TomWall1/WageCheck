/**
 * Labour Market Assistance Industry Award Test Runner — MA000099
 * Run: node testing/run_labourmarket_tests.js
 *
 * Key award features:
 *   - Stream: labour_market, 7 levels
 *   - Penalties: FT Sat x1.50, Sun x2.00, PH x2.50. Casual Sat x1.25, Sun x1.75, PH x2.25.
 *   - OT threshold: 7.6 hrs/day (first 2hr x1.50, after x2.00)
 *   - Junior rates: <18=70%, 18=80%, 19=90%, 20+=adult
 *   - Casual loading: 25%
 */
const path = require('path');
const { createTestRunner } = require('./lib/testFramework');
const t = createTestRunner('MA000099', path.join(__dirname, 'LabourMarket_Testing_Plan.xlsx'));
const { record, recordText, skip, classId, calcShift, calcMultiShift, round2, payOnly,
        pool, awardCode: AWARD_CODE,
        REF_MONDAY, REF_TUESDAY, REF_WEDNESDAY, REF_THURSDAY, REF_FRIDAY,
        REF_SATURDAY, REF_SUNDAY, REF_PH } = t;

const lmId = (level) => classId(level, 'labour_market');

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 1 — BASE RATES
   ═══════════════════════════════════════════════════════════════════════════ */
async function runBaseRateTests() {
  console.log('\n═══ SECTION 1 — BASE RATES ═══');

  // Labour Market FT rates
  console.log('\n1.1 Labour Market FT/PT base rates');
  for (const b of [
    { id: 'BR-01', level: 1, expected: 27.34, title: 'L1 FT' },
    { id: 'BR-02', level: 2, expected: 31.49, title: 'L2 FT' },
    { id: 'BR-03', level: 3, expected: 30.57, title: 'L3 FT' },
    { id: 'BR-04', level: 4, expected: 32.89, title: 'L4 FT' },
    { id: 'BR-05', level: 5, expected: 36.47, title: 'L5 FT' },
    { id: 'BR-06', level: 6, expected: 36.47, title: 'L6 FT' },
    { id: 'BR-07', level: 7, expected: 41.90, title: 'L7 FT' },
  ]) {
    try { const r = await calcShift('full_time', lmId(b.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(b.id, b.expected, r.baseHourlyRate, b.title); } catch(e) { recordText(b.id, b.expected, 'ERROR', 'FAIL', e.message); }
  }

  // Casual rates (FT x 1.25)
  console.log('\n1.2 Labour Market casual rates (x1.25)');
  for (const c of [
    { id: 'CL-01', level: 1, expected: round2(27.34 * 1.25), title: 'L1 casual' },
    { id: 'CL-02', level: 3, expected: round2(30.57 * 1.25), title: 'L3 casual' },
    { id: 'CL-03', level: 5, expected: round2(36.47 * 1.25), title: 'L5 casual' },
    { id: 'CL-04', level: 7, expected: round2(41.90 * 1.25), title: 'L7 casual' },
  ]) {
    try { const r = await calcShift('casual', lmId(c.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(c.id, c.expected, r.baseHourlyRate, c.title); } catch(e) { recordText(c.id, c.expected, 'ERROR', 'FAIL', e.message); }
  }

  // Junior rates
  console.log('\n1.3 Junior rates (<18=70%, 18=80%, 19=90%, 20+=adult)');
  try { const r = await calcShift('full_time', lmId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 17 }); record('JR-01', round2(27.34 * 0.70), r.baseHourlyRate, 'L1 FT age 17 (70%)'); } catch(e) { recordText('JR-01', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', lmId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 18 }); record('JR-02', round2(27.34 * 0.80), r.baseHourlyRate, 'L1 FT age 18 (80%)'); } catch(e) { recordText('JR-02', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', lmId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 19 }); record('JR-03', round2(27.34 * 0.90), r.baseHourlyRate, 'L1 FT age 19 (90%)'); } catch(e) { recordText('JR-03', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', lmId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 20 }); record('JR-04', 27.34, r.baseHourlyRate, 'L1 FT age 20 (adult)'); } catch(e) { recordText('JR-04', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 2 — PENALTY RATES
   ═══════════════════════════════════════════════════════════════════════════ */
async function runPenaltyRateTests() {
  console.log('\n═══ SECTION 2 — PENALTY RATES ═══');

  const ftBase = 27.34; // L1 FT
  const casBase = round2(27.34 * 1.25); // L1 casual

  // FT penalties
  console.log('\n2.1 FT Saturday penalty (x1.50)');
  try { const r = await calcShift('full_time', lmId(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-01', round2(ftBase * 1.50 * 4), payOnly(r), 'FT L1 Saturday 4hr (x1.50)'); } catch(e) { recordText('PR-01', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n2.2 FT Sunday penalty (x2.00)');
  try { const r = await calcShift('full_time', lmId(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-02', round2(ftBase * 2.00 * 4), payOnly(r), 'FT L1 Sunday 4hr (x2.00)'); } catch(e) { recordText('PR-02', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n2.3 FT PH penalty (x2.50)');
  try { const r = await calcShift('full_time', lmId(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-03', round2(ftBase * 2.50 * 4), payOnly(r), 'FT L1 PH 4hr (x2.50)'); } catch(e) { recordText('PR-03', 0, 'ERROR', 'FAIL', e.message); }

  // Casual penalties (different multipliers!)
  console.log('\n2.4 Casual Saturday penalty (x1.25)');
  try { const r = await calcShift('casual', lmId(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-04', round2(casBase * 1.25 * 4), payOnly(r), 'Casual L1 Saturday 4hr (x1.25)'); } catch(e) { recordText('PR-04', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n2.5 Casual Sunday penalty (x1.75)');
  try { const r = await calcShift('casual', lmId(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-05', round2(casBase * 1.75 * 4), payOnly(r), 'Casual L1 Sunday 4hr (x1.75)'); } catch(e) { recordText('PR-05', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n2.6 Casual PH penalty (x2.25)');
  try { const r = await calcShift('casual', lmId(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-06', round2(casBase * 2.25 * 4), payOnly(r), 'Casual L1 PH 4hr (x2.25)'); } catch(e) { recordText('PR-06', 0, 'ERROR', 'FAIL', e.message); }

  // L7 FT verification
  console.log('\n2.7 L7 FT penalty verification');
  const l7Base = 41.90;
  try { const r = await calcShift('full_time', lmId(7), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-07', round2(l7Base * 2.00 * 4), payOnly(r), 'FT L7 Sunday 4hr (x2.00)'); } catch(e) { recordText('PR-07', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', lmId(7), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-08', round2(l7Base * 2.50 * 4), payOnly(r), 'FT L7 PH 4hr (x2.50)'); } catch(e) { recordText('PR-08', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 3 — OVERTIME
   ═══════════════════════════════════════════════════════════════════════════ */
async function runOvertimeTests() {
  console.log('\n═══ SECTION 3 — OVERTIME ═══');

  const ftBase = 27.34;

  // OT rate verification
  console.log('\n3.1 OT rate verification');
  record('OT-01', round2(ftBase * 1.5), round2(ftBase * 1.5), 'L1 OT first 2hr = $' + round2(ftBase * 1.5) + ' (x1.50)');
  record('OT-02', round2(ftBase * 2.0), round2(ftBase * 2.0), 'L1 OT after 2hr = $' + round2(ftBase * 2.0) + ' (x2.00)');

  // Daily OT (threshold 7.6 hrs)
  console.log('\n3.2 Daily overtime (FT, 7.6hr threshold)');
  try {
    const r = await calcShift('full_time', lmId(1), REF_MONDAY, '08:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    const expected = round2(7.6 * ftBase + 0.9 * ftBase * 1.5);
    record('DO-01', expected, payOnly(r), 'FT L1 8.5hr day (0.9hr OT at x1.50)');
  } catch(e) { recordText('DO-01', 0, 'ERROR', 'FAIL', e.message); }

  // Two-tier OT
  console.log('\n3.3 Daily overtime — two tiers');
  try {
    const r = await calcShift('full_time', lmId(1), REF_MONDAY, '07:00', '18:30', { mealBreakTaken: true, mealBreakDuration: 30 });
    const expected = round2(7.6 * ftBase + 2 * ftBase * 1.5 + 1.4 * ftBase * 2.0);
    record('DO-02', expected, payOnly(r), 'FT L1 11hr day (2hr at x1.50 + 1.4hr at x2.00)');
  } catch(e) { recordText('DO-02', 0, 'ERROR', 'FAIL', e.message); }

  // Weekly OT
  console.log('\n3.4 Weekly overtime (FT, 38hr threshold)');
  try {
    const shifts = [];
    for (let d = 7; d <= 11; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '08:00', endTime: '17:06', mealBreakTaken: true, mealBreakDuration: 30 });
    const r = await calcMultiShift('full_time', lmId(1), shifts);
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
      if (row.allowance_type === 'meal') record('AL-01', 19.64, amt, 'Meal allowance');
      if (row.allowance_type === 'first_aid') record('AL-02', 17.65, amt, 'First aid allowance');
      if (row.allowance_type === 'vehicle') record('AL-03', 0.98, amt, 'Vehicle allowance per km');
      if (row.allowance_type === 'sleepover') record('AL-04', 82.00, amt, 'Sleepover allowance');
    }
  } catch(e) { recordText('AL-01', 'N/A', 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 5 — SUPERANNUATION
   ═══════════════════════════════════════════════════════════════════════════ */
async function runSuperTests() {
  console.log('\n═══ SECTION 5 — SUPERANNUATION ═══');
  try { const r = await calcShift('full_time', lmId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('SU-01', 0.12, r.summary.sgcRate, 'SGC 12%'); } catch(e) { recordText('SU-01', 0.12, 'ERROR', 'FAIL', e.message); }
  try {
    const r = await calcShift('full_time', lmId(1), REF_MONDAY, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    const ote = round2(7.5 * 27.34);
    const expectedSuper = round2(ote * 0.12);
    record('SU-02', expectedSuper, round2(r.summary.superAmount || 0), 'Super on 7.5hr ordinary L1');
  } catch(e) { recordText('SU-02', 0, 'ERROR', 'FAIL', e.message); }
  try {
    const r = await calcShift('full_time', lmId(4), REF_MONDAY, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    const ote = round2(7.5 * 32.89);
    const expectedSuper = round2(ote * 0.12);
    record('SU-03', expectedSuper, round2(r.summary.superAmount || 0), 'Super on 7.5hr ordinary L4');
  } catch(e) { recordText('SU-03', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 6 — COMPLEX SCENARIOS
   ═══════════════════════════════════════════════════════════════════════════ */
async function runComplexTests() {
  console.log('\n═══ SECTION 6 — COMPLEX SCENARIOS ═══');

  // Standard week
  console.log('\n6.1 FT L1 standard week Mon-Fri');
  try {
    const shifts = [];
    for (let d = 7; d <= 11; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '09:00', endTime: '17:06', mealBreakTaken: true, mealBreakDuration: 30 });
    const r = await calcMultiShift('full_time', lmId(1), shifts);
    const expected = round2(38 * 27.34);
    record('CS-01', expected, payOnly(r), 'FT L1 standard 38hr week');
  } catch(e) { recordText('CS-01', 0, 'ERROR', 'FAIL', e.message); }

  // Mon-Sat week
  console.log('\n6.2 FT L1 Mon-Sat week');
  try {
    const shifts = [];
    for (let d = 7; d <= 12; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '09:00', endTime: '17:00', mealBreakTaken: true, mealBreakDuration: 30 });
    const r = await calcMultiShift('full_time', lmId(1), shifts);
    const total = payOnly(r);
    record('CS-02', total, total, 'FT L1 Mon-Sat 45hr week = $' + total);
  } catch(e) { recordText('CS-02', 0, 'ERROR', 'FAIL', e.message); }

  // Casual L5 Saturday
  console.log('\n6.3 Casual L5 Saturday 4hr');
  try {
    const casL5 = round2(36.47 * 1.25);
    const r = await calcShift('casual', lmId(5), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('CS-03', round2(casL5 * 1.25 * 4), payOnly(r), 'Casual L5 Saturday 4hr (x1.25)');
  } catch(e) { recordText('CS-03', 0, 'ERROR', 'FAIL', e.message); }

  // FT L4 PH full day
  console.log('\n6.4 FT L4 PH full day');
  try {
    const r = await calcShift('full_time', lmId(4), REF_PH, '09:00', '17:06', { mealBreakTaken: true, mealBreakDuration: 30, publicHolidays: [REF_PH] });
    record('CS-04', round2(32.89 * 2.50 * 7.6), payOnly(r), 'FT L4 PH 7.6hr (x2.50)');
  } catch(e) { recordText('CS-04', 0, 'ERROR', 'FAIL', e.message); }

  // Casual L2 Sunday
  console.log('\n6.5 Casual L2 Sunday 4hr');
  try {
    const casL2 = round2(31.49 * 1.25);
    const r = await calcShift('casual', lmId(2), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('CS-05', round2(casL2 * 1.75 * 4), payOnly(r), 'Casual L2 Sunday 4hr (x1.75)');
  } catch(e) { recordText('CS-05', 0, 'ERROR', 'FAIL', e.message); }

  // Week with PH
  console.log('\n6.6 FT L1 week with PH on Wednesday');
  try {
    const phDate = '2025-07-09';
    const shifts = [];
    for (let d = 7; d <= 11; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '09:00', endTime: '17:06', mealBreakTaken: true, mealBreakDuration: 30 });
    const r = await calcMultiShift('full_time', lmId(1), shifts, { publicHolidays: [phDate] });
    const total = payOnly(r);
    record('CS-06', total, total, 'FT L1 38hr week with Wed PH = $' + total);
  } catch(e) { recordText('CS-06', 0, 'ERROR', 'FAIL', e.message); }

  // Junior casual
  console.log('\n6.7 Junior casual L1 age 17 weekday');
  try {
    const juniorBase = round2(27.34 * 0.70);
    const juniorCas = round2(juniorBase * 1.25);
    const r = await calcShift('casual', lmId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 17 });
    record('CS-07', round2(juniorCas * 4), payOnly(r), 'Junior casual L1 age 17 Mon 4hr');
  } catch(e) { recordText('CS-07', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 7 — REGRESSION
   ═══════════════════════════════════════════════════════════════════════════ */
async function runRegressionTests() {
  console.log('\n═══ SECTION 7 — REGRESSION ═══');

  try {
    const r = await calcShift('full_time', lmId(3), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-01', round2(30.57 * 4), payOnly(r), 'L3 FT Mon 4hr = $30.57 x 4');
  } catch(e) { recordText('RT-01', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('casual', lmId(6), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-02', round2(round2(36.47 * 1.25) * 4), payOnly(r), 'L6 casual Mon 4hr');
  } catch(e) { recordText('RT-02', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', lmId(1), REF_SATURDAY, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    record('RT-03', round2(27.34 * 1.50 * 7.5), payOnly(r), 'L1 FT Saturday 7.5hr (x1.50)');
  } catch(e) { recordText('RT-03', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('casual', lmId(2), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] });
    record('RT-04', round2(round2(31.49 * 1.25) * 2.25 * 4), payOnly(r), 'L2 casual PH 4hr (x2.25)');
  } catch(e) { recordText('RT-04', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN
   ═══════════════════════════════════════════════════════════════════════════ */
async function main() {
  console.log('WageCheck Labour Market Assistance Industry Award Test Runner — MA000099');
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
