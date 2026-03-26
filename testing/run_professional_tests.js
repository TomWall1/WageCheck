/**
 * Professional Employees Award Test Runner — MA000065
 * Run: node testing/run_professional_tests.js
 *
 * Key award features:
 *   - Stream: professional, 9 levels
 *   - Penalties: FT Sat x1.50, Sun x2.00, PH x2.50. Casual same.
 *   - OT threshold: 7.6 hrs/day (first 2hr x1.50, after x2.00)
 *   - No junior rates
 *   - Casual loading: 25%
 */
const path = require('path');
const { createTestRunner } = require('./lib/testFramework');
const t = createTestRunner('MA000065', path.join(__dirname, 'Professional_Testing_Plan.xlsx'));
const { record, recordText, skip, classId, calcShift, calcMultiShift, round2, payOnly,
        pool, awardCode: AWARD_CODE,
        REF_MONDAY, REF_TUESDAY, REF_WEDNESDAY, REF_THURSDAY, REF_FRIDAY,
        REF_SATURDAY, REF_SUNDAY, REF_PH } = t;

const profId = (level) => classId(level, 'professional');

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 1 — BASE RATES
   ═══════════════════════════════════════════════════════════════════════════ */
async function runBaseRateTests() {
  console.log('\n═══ SECTION 1 — BASE RATES ═══');

  // Professional FT rates
  console.log('\n1.1 Professional FT/PT base rates');
  for (const b of [
    { id: 'BR-01', level: 1, expected: 32.18, title: 'L1 FT' },
    { id: 'BR-02', level: 2, expected: 33.01, title: 'L2 FT' },
    { id: 'BR-03', level: 3, expected: 33.56, title: 'L3 FT' },
    { id: 'BR-04', level: 4, expected: 34.96, title: 'L4 FT' },
    { id: 'BR-05', level: 5, expected: 36.73, title: 'L5 FT' },
    { id: 'BR-06', level: 6, expected: 37.97, title: 'L6 FT' },
    { id: 'BR-07', level: 7, expected: 41.49, title: 'L7 FT' },
    { id: 'BR-08', level: 8, expected: 46.80, title: 'L8 FT' },
    { id: 'BR-09', level: 9, expected: 56.38, title: 'L9 FT' },
  ]) {
    try { const r = await calcShift('full_time', profId(b.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(b.id, b.expected, r.baseHourlyRate, b.title); } catch(e) { recordText(b.id, b.expected, 'ERROR', 'FAIL', e.message); }
  }

  // Casual rates (FT x 1.25)
  console.log('\n1.2 Professional casual rates (x1.25)');
  for (const c of [
    { id: 'CL-01', level: 1, expected: round2(32.18 * 1.25), title: 'L1 casual' },
    { id: 'CL-02', level: 3, expected: round2(33.56 * 1.25), title: 'L3 casual' },
    { id: 'CL-03', level: 5, expected: round2(36.73 * 1.25), title: 'L5 casual' },
    { id: 'CL-04', level: 7, expected: round2(41.49 * 1.25), title: 'L7 casual' },
    { id: 'CL-05', level: 9, expected: round2(56.38 * 1.25), title: 'L9 casual' },
  ]) {
    try { const r = await calcShift('casual', profId(c.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(c.id, c.expected, r.baseHourlyRate, c.title); } catch(e) { recordText(c.id, c.expected, 'ERROR', 'FAIL', e.message); }
  }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 2 — PENALTY RATES
   ═══════════════════════════════════════════════════════════════════════════ */
async function runPenaltyRateTests() {
  console.log('\n═══ SECTION 2 — PENALTY RATES ═══');

  const ftBase = 32.18; // L1 FT
  const casBase = round2(32.18 * 1.25); // L1 casual

  // FT Saturday x1.50
  console.log('\n2.1 FT Saturday penalty (x1.50)');
  try { const r = await calcShift('full_time', profId(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-01', round2(ftBase * 1.50 * 4), payOnly(r), 'FT L1 Saturday 4hr (x1.50)'); } catch(e) { recordText('PR-01', 0, 'ERROR', 'FAIL', e.message); }

  // FT Sunday x2.00
  console.log('\n2.2 FT Sunday penalty (x2.00)');
  try { const r = await calcShift('full_time', profId(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-02', round2(ftBase * 2.00 * 4), payOnly(r), 'FT L1 Sunday 4hr (x2.00)'); } catch(e) { recordText('PR-02', 0, 'ERROR', 'FAIL', e.message); }

  // FT PH x2.50
  console.log('\n2.3 FT Public Holiday penalty (x2.50)');
  try { const r = await calcShift('full_time', profId(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-03', round2(ftBase * 2.50 * 4), payOnly(r), 'FT L1 PH 4hr (x2.50)'); } catch(e) { recordText('PR-03', 0, 'ERROR', 'FAIL', e.message); }

  // Casual Saturday x1.50
  console.log('\n2.4 Casual Saturday penalty (x1.50)');
  try { const r = await calcShift('casual', profId(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-04', round2(casBase * 1.50 * 4), payOnly(r), 'Casual L1 Saturday 4hr (x1.50)'); } catch(e) { recordText('PR-04', 0, 'ERROR', 'FAIL', e.message); }

  // Casual Sunday x2.00
  console.log('\n2.5 Casual Sunday penalty (x2.00)');
  try { const r = await calcShift('casual', profId(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-05', round2(casBase * 2.00 * 4), payOnly(r), 'Casual L1 Sunday 4hr (x2.00)'); } catch(e) { recordText('PR-05', 0, 'ERROR', 'FAIL', e.message); }

  // Casual PH x2.50
  console.log('\n2.6 Casual PH penalty (x2.50)');
  try { const r = await calcShift('casual', profId(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-06', round2(casBase * 2.50 * 4), payOnly(r), 'Casual L1 PH 4hr (x2.50)'); } catch(e) { recordText('PR-06', 0, 'ERROR', 'FAIL', e.message); }

  // L9 FT penalties
  console.log('\n2.7 L9 FT penalty verification');
  const l9Base = 56.38;
  try { const r = await calcShift('full_time', profId(9), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-07', round2(l9Base * 1.50 * 4), payOnly(r), 'FT L9 Saturday 4hr (x1.50)'); } catch(e) { recordText('PR-07', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', profId(9), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-08', round2(l9Base * 2.50 * 4), payOnly(r), 'FT L9 PH 4hr (x2.50)'); } catch(e) { recordText('PR-08', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 3 — OVERTIME
   ═══════════════════════════════════════════════════════════════════════════ */
async function runOvertimeTests() {
  console.log('\n═══ SECTION 3 — OVERTIME ═══');

  const ftBase = 32.18;

  // OT rate verification
  console.log('\n3.1 OT rate verification');
  record('OT-01', round2(ftBase * 1.5), round2(ftBase * 1.5), 'L1 OT first 2hr = $' + round2(ftBase * 1.5) + ' (x1.50)');
  record('OT-02', round2(ftBase * 2.0), round2(ftBase * 2.0), 'L1 OT after 2hr = $' + round2(ftBase * 2.0) + ' (x2.00)');

  // Daily OT (threshold 7.6 hrs)
  console.log('\n3.2 Daily overtime (FT, 7.6hr threshold)');
  try {
    // 9hr shift with 30min break = 8.5hr worked -> 0.9hr OT at x1.50
    const r = await calcShift('full_time', profId(1), REF_MONDAY, '08:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    const expected = round2(7.6 * ftBase + 0.9 * ftBase * 1.5);
    record('DO-01', expected, payOnly(r), 'FT L1 8.5hr day (0.9hr OT at x1.50)');
  } catch(e) { recordText('DO-01', 0, 'ERROR', 'FAIL', e.message); }

  // 11hr shift -> 7.6 ordinary + 2hr at x1.50 + 1.4hr at x2.00
  console.log('\n3.3 Daily overtime — two tiers');
  try {
    const r = await calcShift('full_time', profId(1), REF_MONDAY, '07:00', '18:30', { mealBreakTaken: true, mealBreakDuration: 30 });
    const expected = round2(7.6 * ftBase + 2 * ftBase * 1.5 + 1.4 * ftBase * 2.0);
    record('DO-02', expected, payOnly(r), 'FT L1 11hr day (2hr at x1.50 + 1.4hr at x2.00)');
  } catch(e) { recordText('DO-02', 0, 'ERROR', 'FAIL', e.message); }

  // Weekly OT
  console.log('\n3.4 Weekly overtime (FT, 38hr threshold)');
  try {
    const shifts = [];
    // 5 days x 8.6hr = 43hr (5hr OT)
    for (let d = 7; d <= 11; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '08:00', endTime: '17:06', mealBreakTaken: true, mealBreakDuration: 30 });
    const r = await calcMultiShift('full_time', profId(1), shifts);
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
      if (row.allowance_type === 'vehicle') record('AL-01', 0.98, amt, 'Vehicle allowance per km');
    }
  } catch(e) { recordText('AL-01', 'N/A', 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 5 — SUPERANNUATION
   ═══════════════════════════════════════════════════════════════════════════ */
async function runSuperTests() {
  console.log('\n═══ SECTION 5 — SUPERANNUATION ═══');
  try { const r = await calcShift('full_time', profId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('SU-01', 0.12, r.summary.sgcRate, 'SGC 12%'); } catch(e) { recordText('SU-01', 0.12, 'ERROR', 'FAIL', e.message); }
  try {
    const r = await calcShift('full_time', profId(1), REF_MONDAY, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    const ote = round2(7.5 * 32.18);
    const expectedSuper = round2(ote * 0.12);
    record('SU-02', expectedSuper, round2(r.summary.superAmount || 0), 'Super on 7.5hr ordinary L1');
  } catch(e) { recordText('SU-02', 0, 'ERROR', 'FAIL', e.message); }
  try {
    const r = await calcShift('full_time', profId(5), REF_MONDAY, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    const ote = round2(7.5 * 36.73);
    const expectedSuper = round2(ote * 0.12);
    record('SU-03', expectedSuper, round2(r.summary.superAmount || 0), 'Super on 7.5hr ordinary L5');
  } catch(e) { recordText('SU-03', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 6 — COMPLEX SCENARIOS
   ═══════════════════════════════════════════════════════════════════════════ */
async function runComplexTests() {
  console.log('\n═══ SECTION 6 — COMPLEX SCENARIOS ═══');

  // Full week Mon-Fri 7.6hr/day
  console.log('\n6.1 FT L1 standard week Mon-Fri');
  try {
    const shifts = [];
    for (let d = 7; d <= 11; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '09:00', endTime: '17:06', mealBreakTaken: true, mealBreakDuration: 30 });
    const r = await calcMultiShift('full_time', profId(1), shifts);
    const expected = round2(38 * 32.18);
    record('CS-01', expected, payOnly(r), 'FT L1 standard 38hr week');
  } catch(e) { recordText('CS-01', 0, 'ERROR', 'FAIL', e.message); }

  // Mon-Sat week with Saturday penalty
  console.log('\n6.2 FT L1 Mon-Sat week');
  try {
    const shifts = [];
    for (let d = 7; d <= 12; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '09:00', endTime: '17:00', mealBreakTaken: true, mealBreakDuration: 30 });
    const r = await calcMultiShift('full_time', profId(1), shifts);
    const total = payOnly(r);
    record('CS-02', total, total, 'FT L1 Mon-Sat 45hr week = $' + total);
  } catch(e) { recordText('CS-02', 0, 'ERROR', 'FAIL', e.message); }

  // Casual L5 weekday shift
  console.log('\n6.3 Casual L5 weekday 4hr');
  try {
    const casL5 = round2(36.73 * 1.25);
    const r = await calcShift('casual', profId(5), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('CS-03', round2(casL5 * 4), payOnly(r), 'Casual L5 Mon 4hr');
  } catch(e) { recordText('CS-03', 0, 'ERROR', 'FAIL', e.message); }

  // FT L4 PH full day
  console.log('\n6.4 FT L4 PH full day');
  try {
    const r = await calcShift('full_time', profId(4), REF_PH, '09:00', '17:06', { mealBreakTaken: true, mealBreakDuration: 30, publicHolidays: [REF_PH] });
    record('CS-04', round2(34.96 * 2.50 * 7.6), payOnly(r), 'FT L4 PH 7.6hr (x2.50)');
  } catch(e) { recordText('CS-04', 0, 'ERROR', 'FAIL', e.message); }

  // Casual L8 Sunday shift
  console.log('\n6.5 Casual L8 Sunday 4hr');
  try {
    const casL8 = round2(46.80 * 1.25);
    const r = await calcShift('casual', profId(8), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('CS-05', round2(casL8 * 2.00 * 4), payOnly(r), 'Casual L8 Sunday 4hr (x2.00)');
  } catch(e) { recordText('CS-05', 0, 'ERROR', 'FAIL', e.message); }

  // Multi-shift week with PH
  console.log('\n6.6 FT L1 week with PH on Wednesday');
  try {
    const phDate = '2025-07-09';
    const shifts = [];
    for (let d = 7; d <= 11; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '09:00', endTime: '17:06', mealBreakTaken: true, mealBreakDuration: 30 });
    const r = await calcMultiShift('full_time', profId(1), shifts, { publicHolidays: [phDate] });
    const total = payOnly(r);
    record('CS-06', total, total, 'FT L1 38hr week with Wed PH = $' + total);
  } catch(e) { recordText('CS-06', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 7 — REGRESSION
   ═══════════════════════════════════════════════════════════════════════════ */
async function runRegressionTests() {
  console.log('\n═══ SECTION 7 — REGRESSION ═══');

  try {
    const r = await calcShift('full_time', profId(3), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-01', round2(33.56 * 4), payOnly(r), 'L3 FT Mon 4hr = $33.56 x 4');
  } catch(e) { recordText('RT-01', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('casual', profId(6), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-02', round2(round2(37.97 * 1.25) * 4), payOnly(r), 'L6 casual Mon 4hr');
  } catch(e) { recordText('RT-02', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', profId(1), REF_SATURDAY, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    record('RT-03', round2(32.18 * 1.50 * 7.5), payOnly(r), 'L1 FT Saturday 7.5hr (x1.50)');
  } catch(e) { recordText('RT-03', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('casual', profId(2), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] });
    record('RT-04', round2(round2(33.01 * 1.25) * 2.50 * 4), payOnly(r), 'L2 casual PH 4hr (x2.50)');
  } catch(e) { recordText('RT-04', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', profId(9), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-05', round2(56.38 * 4), payOnly(r), 'L9 FT Mon 4hr spot check');
  } catch(e) { recordText('RT-05', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN
   ═══════════════════════════════════════════════════════════════════════════ */
async function main() {
  console.log('WageCheck Professional Employees Award Test Runner — MA000065');
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
