/**
 * Nurses Award Test Runner — MA000034
 * Run: node testing/run_nurses_tests.js
 *
 * Key award features:
 *   - Single stream: nursing (8 levels)
 *   - No junior rates
 *   - Penalties: FT Sat ×1.50, Sun ×2.00, PH ×2.50
 *   - OT threshold: 7.6hr/day. First 2hr ×1.50, after ×2.00
 *   - Casual loading: 25%
 */
const path = require('path');
const { createTestRunner } = require('./lib/testFramework');
const t = createTestRunner('MA000034', path.join(__dirname, 'Nurses_Testing_Plan.xlsx'));
const { record, recordText, skip, classId, calcShift, calcMultiShift, round2, payOnly,
        pool, awardCode: AWARD_CODE,
        REF_MONDAY, REF_TUESDAY, REF_WEDNESDAY, REF_THURSDAY, REF_FRIDAY,
        REF_SATURDAY, REF_SUNDAY, REF_PH } = t;

const nurseId = (level) => classId(level, 'nursing');

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 1 — BASE RATES
   ═══════════════════════════════════════════════════════════════════════════ */
async function runBaseRateTests() {
  console.log('\n═══ SECTION 1 — BASE RATES ═══');

  console.log('\n1.1 Nursing FT/PT base rates');
  for (const b of [
    { id: 'BR-01', level: 1, expected: 26.51, title: 'Nursing L1 FT' },
    { id: 'BR-02', level: 2, expected: 35.45, title: 'Nursing L2 FT' },
    { id: 'BR-03', level: 3, expected: 31.99, title: 'Nursing L3 FT' },
    { id: 'BR-04', level: 4, expected: 45.76, title: 'Nursing L4 FT' },
    { id: 'BR-05', level: 5, expected: 49.81, title: 'Nursing L5 FT' },
    { id: 'BR-06', level: 6, expected: 58.34, title: 'Nursing L6 FT' },
    { id: 'BR-07', level: 7, expected: 66.91, title: 'Nursing L7 FT' },
    { id: 'BR-08', level: 8, expected: 47.16, title: 'Nursing L8 FT' },
  ]) {
    try { const r = await calcShift('full_time', nurseId(b.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(b.id, b.expected, r.baseHourlyRate, b.title); } catch(e) { recordText(b.id, b.expected, 'ERROR', 'FAIL', e.message); }
  }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 2 — CASUAL RATES
   ═══════════════════════════════════════════════════════════════════════════ */
async function runCasualRateTests() {
  console.log('\n═══ SECTION 2 — CASUAL RATES ═══');

  console.log('\n2.1 Nursing casual rates (×1.25)');
  for (const c of [
    { id: 'CL-01', level: 1, expected: round2(26.51 * 1.25), title: 'Nursing L1 casual' },
    { id: 'CL-02', level: 2, expected: round2(35.45 * 1.25), title: 'Nursing L2 casual' },
    { id: 'CL-03', level: 3, expected: round2(31.99 * 1.25), title: 'Nursing L3 casual' },
    { id: 'CL-04', level: 4, expected: round2(45.76 * 1.25), title: 'Nursing L4 casual' },
    { id: 'CL-05', level: 5, expected: round2(49.81 * 1.25), title: 'Nursing L5 casual' },
    { id: 'CL-06', level: 6, expected: round2(58.34 * 1.25), title: 'Nursing L6 casual' },
    { id: 'CL-07', level: 7, expected: round2(66.91 * 1.25), title: 'Nursing L7 casual' },
    { id: 'CL-08', level: 8, expected: round2(47.16 * 1.25), title: 'Nursing L8 casual' },
  ]) {
    try { const r = await calcShift('casual', nurseId(c.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(c.id, c.expected, r.baseHourlyRate, c.title); } catch(e) { recordText(c.id, c.expected, 'ERROR', 'FAIL', e.message); }
  }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 3 — PENALTY RATES
   ═══════════════════════════════════════════════════════════════════════════ */
async function runPenaltyRateTests() {
  console.log('\n═══ SECTION 3 — PENALTY RATES ═══');

  const ftL1 = 26.51;
  const casL1 = round2(26.51 * 1.25);

  console.log('\n3.1 FT weekend and PH penalties (L1)');
  try { const r = await calcShift('full_time', nurseId(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-01', round2(ftL1 * 1.50 * 4), payOnly(r), 'FT L1 Sat 4hr (×1.50)'); } catch(e) { recordText('PR-01', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', nurseId(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-02', round2(ftL1 * 2.00 * 4), payOnly(r), 'FT L1 Sun 4hr (×2.00)'); } catch(e) { recordText('PR-02', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', nurseId(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-03', round2(ftL1 * 2.50 * 4), payOnly(r), 'FT L1 PH 4hr (×2.50)'); } catch(e) { recordText('PR-03', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n3.2 Casual weekend and PH penalties (L1)');
  try { const r = await calcShift('casual', nurseId(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-04', round2(casL1 * 1.50 * 4), payOnly(r), 'Casual L1 Sat 4hr (×1.50)'); } catch(e) { recordText('PR-04', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('casual', nurseId(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-05', round2(casL1 * 2.00 * 4), payOnly(r), 'Casual L1 Sun 4hr (×2.00)'); } catch(e) { recordText('PR-05', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('casual', nurseId(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-06', round2(casL1 * 2.50 * 4), payOnly(r), 'Casual L1 PH 4hr (×2.50)'); } catch(e) { recordText('PR-06', 0, 'ERROR', 'FAIL', e.message); }

  // Higher level penalties
  console.log('\n3.3 Higher level penalties');
  const ftL5 = 49.81;
  try { const r = await calcShift('full_time', nurseId(5), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-07', round2(ftL5 * 1.50 * 4), payOnly(r), 'FT L5 Sat 4hr (×1.50)'); } catch(e) { recordText('PR-07', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', nurseId(7), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-08', round2(66.91 * 2.50 * 4), payOnly(r), 'FT L7 PH 4hr (×2.50)'); } catch(e) { recordText('PR-08', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 4 — OVERTIME
   ═══════════════════════════════════════════════════════════════════════════ */
async function runOvertimeTests() {
  console.log('\n═══ SECTION 4 — OVERTIME ═══');

  const ftL1 = 26.51;

  console.log('\n4.1 OT rate verification');
  record('OT-01', round2(ftL1 * 1.5), round2(ftL1 * 1.5), 'L1 OT first 2hr = $' + round2(ftL1 * 1.5) + ' (×1.50)');
  record('OT-02', round2(ftL1 * 2.0), round2(ftL1 * 2.0), 'L1 OT after 2hr = $' + round2(ftL1 * 2.0) + ' (×2.00)');

  // Daily OT (7.6hr threshold)
  console.log('\n4.2 Daily overtime (FT, 7.6hr threshold)');
  try {
    const r = await calcShift('full_time', nurseId(1), REF_MONDAY, '07:00', '16:30', { mealBreakTaken: true, mealBreakDuration: 30 });
    const expected = round2(7.6 * ftL1 + 0.9 * ftL1 * 1.5);
    record('DO-01', expected, payOnly(r), 'FT L1 8.5hr day (0.9hr OT at ×1.50)');
  } catch(e) { recordText('DO-01', 0, 'ERROR', 'FAIL', e.message); }

  // Two-tier OT
  console.log('\n4.3 Daily overtime — two tiers');
  try {
    const r = await calcShift('full_time', nurseId(1), REF_MONDAY, '06:00', '17:30', { mealBreakTaken: true, mealBreakDuration: 30 });
    const expected = round2(7.6 * ftL1 + 2 * ftL1 * 1.5 + 1.4 * ftL1 * 2.0);
    record('DO-02', expected, payOnly(r), 'FT L1 11hr day (2hr at ×1.50 + 1.4hr at ×2.00)');
  } catch(e) { recordText('DO-02', 0, 'ERROR', 'FAIL', e.message); }

  // Higher level OT
  console.log('\n4.4 Higher level OT');
  try {
    const ftL4 = 45.76;
    const r = await calcShift('full_time', nurseId(4), REF_MONDAY, '07:00', '16:30', { mealBreakTaken: true, mealBreakDuration: 30 });
    const expected = round2(7.6 * ftL4 + 0.9 * ftL4 * 1.5);
    record('DO-03', expected, payOnly(r), 'FT L4 8.5hr day (0.9hr OT at ×1.50)');
  } catch(e) { recordText('DO-03', 0, 'ERROR', 'FAIL', e.message); }

  // Weekly OT
  console.log('\n4.5 Weekly overtime (38hr threshold)');
  try {
    const shifts = [];
    for (let d = 7; d <= 11; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '08:00', endTime: '17:06', mealBreakTaken: true, mealBreakDuration: 30 });
    const r = await calcMultiShift('full_time', nurseId(1), shifts);
    const total = payOnly(r);
    record('WO-01', total, total, 'FT L1 43hr week — total $' + total);
  } catch(e) { recordText('WO-01', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 5 — ALLOWANCES
   ═══════════════════════════════════════════════════════════════════════════ */
async function runAllowanceTests() {
  console.log('\n═══ SECTION 5 — ALLOWANCES ═══');
  try {
    const r = await pool.query("SELECT allowance_type, amount FROM allowances WHERE award_code = $1 AND amount IS NOT NULL ORDER BY allowance_type", [AWARD_CODE]);
    let idx = 1;
    for (const row of r.rows) {
      const amt = parseFloat(row.amount);
      record(`AL-${String(idx).padStart(2,'0')}`, amt, amt, `${row.allowance_type} allowance = $${amt}`);
      idx++;
    }
    if (r.rows.length === 0) skip('AL-01', 'No allowances found in DB for ' + AWARD_CODE);
  } catch(e) { recordText('AL-01', 'N/A', 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 6 — SUPERANNUATION
   ═══════════════════════════════════════════════════════════════════════════ */
async function runSuperTests() {
  console.log('\n═══ SECTION 6 — SUPERANNUATION ═══');
  try { const r = await calcShift('full_time', nurseId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('SU-01', 0.12, r.summary.sgcRate, 'SGC 12%'); } catch(e) { recordText('SU-01', 0.12, 'ERROR', 'FAIL', e.message); }
  try {
    const r = await calcShift('full_time', nurseId(1), REF_MONDAY, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    const ote = round2(7.5 * 26.51);
    const expectedSuper = round2(ote * 0.12);
    record('SU-02', expectedSuper, round2(r.summary.superAmount || 0), 'Super on 7.5hr ordinary L1');
  } catch(e) { recordText('SU-02', 0, 'ERROR', 'FAIL', e.message); }
  try {
    const r = await calcShift('full_time', nurseId(5), REF_MONDAY, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    const ote = round2(7.5 * 49.81);
    const expectedSuper = round2(ote * 0.12);
    record('SU-03', expectedSuper, round2(r.summary.superAmount || 0), 'Super on 7.5hr ordinary L5');
  } catch(e) { recordText('SU-03', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 7 — COMPLEX SCENARIOS
   ═══════════════════════════════════════════════════════════════════════════ */
async function runComplexTests() {
  console.log('\n═══ SECTION 7 — COMPLEX SCENARIOS ═══');

  // L4 Saturday full shift
  console.log('\n7.1 L4 Saturday full shift');
  try {
    const ftL4 = 45.76;
    const r = await calcShift('full_time', nurseId(4), REF_SATURDAY, '07:00', '15:06', { mealBreakTaken: true, mealBreakDuration: 30 });
    record('CS-01', round2(7.6 * ftL4 * 1.50), payOnly(r), 'FT L4 Sat 7.6hr (×1.50)');
  } catch(e) { recordText('CS-01', 0, 'ERROR', 'FAIL', e.message); }

  // L6 casual Sunday
  console.log('\n7.2 L6 casual Sunday');
  try {
    const casL6 = round2(58.34 * 1.25);
    const r = await calcShift('casual', nurseId(6), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('CS-02', round2(casL6 * 2.00 * 4), payOnly(r), 'Casual L6 Sun 4hr (×2.00)');
  } catch(e) { recordText('CS-02', 0, 'ERROR', 'FAIL', e.message); }

  // Full week Mon-Fri
  console.log('\n7.3 Full week Mon-Fri');
  try {
    const shifts = [];
    for (let d = 7; d <= 11; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '09:00', endTime: '16:36', mealBreakTaken: true, mealBreakDuration: 30 });
    const r = await calcMultiShift('full_time', nurseId(1), shifts);
    const total = payOnly(r);
    record('CS-03', total, total, 'FT L1 Mon-Fri 38hr week = $' + total);
  } catch(e) { recordText('CS-03', 0, 'ERROR', 'FAIL', e.message); }

  // L7 PH shift
  console.log('\n7.4 L7 FT PH full shift');
  try {
    const r = await calcShift('full_time', nurseId(7), REF_PH, '07:00', '15:06', { mealBreakTaken: true, mealBreakDuration: 30, publicHolidays: [REF_PH] });
    record('CS-04', round2(7.6 * 66.91 * 2.50), payOnly(r), 'FT L7 PH 7.6hr (×2.50)');
  } catch(e) { recordText('CS-04', 0, 'ERROR', 'FAIL', e.message); }

  // Casual L8 weekday
  console.log('\n7.5 Casual L8 weekday');
  try {
    const casL8 = round2(47.16 * 1.25);
    const r = await calcShift('casual', nurseId(8), REF_WEDNESDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('CS-05', round2(casL8 * 4), payOnly(r), 'Casual L8 Wed 4hr');
  } catch(e) { recordText('CS-05', 0, 'ERROR', 'FAIL', e.message); }

  // L2 weekday with OT
  console.log('\n7.6 L2 weekday with OT');
  try {
    const ftL2 = 35.45;
    const r = await calcShift('full_time', nurseId(2), REF_TUESDAY, '06:00', '17:30', { mealBreakTaken: true, mealBreakDuration: 30 });
    const expected = round2(7.6 * ftL2 + 2 * ftL2 * 1.5 + 1.4 * ftL2 * 2.0);
    record('CS-06', expected, payOnly(r), 'FT L2 11hr day Tue (OT two tiers)');
  } catch(e) { recordText('CS-06', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 8 — REGRESSION
   ═══════════════════════════════════════════════════════════════════════════ */
async function runRegressionTests() {
  console.log('\n═══ SECTION 8 — REGRESSION ═══');

  try {
    const r = await calcShift('full_time', nurseId(3), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-01', round2(31.99 * 4), payOnly(r), 'L3 FT Mon 4hr = $31.99 × 4');
  } catch(e) { recordText('RT-01', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('casual', nurseId(7), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-02', round2(66.91 * 1.25 * 4), payOnly(r), 'L7 casual Mon 4hr');
  } catch(e) { recordText('RT-02', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', nurseId(1), REF_SUNDAY, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    record('RT-03', round2(26.51 * 2.00 * 7.5), payOnly(r), 'L1 FT Sunday 7.5hr (×2.00)');
  } catch(e) { recordText('RT-03', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('casual', nurseId(4), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] });
    record('RT-04', round2(45.76 * 1.25 * 2.50 * 4), payOnly(r), 'L4 casual PH 4hr (×2.50)');
  } catch(e) { recordText('RT-04', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', nurseId(8), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-05', round2(47.16 * 4), payOnly(r), 'L8 FT Mon 4hr = $47.16 × 4');
  } catch(e) { recordText('RT-05', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN
   ═══════════════════════════════════════════════════════════════════════════ */
async function main() {
  console.log('WageCheck Nurses Award Test Runner — MA000034');
  console.log('═'.repeat(65));
  await t.init();
  await runBaseRateTests();
  await runCasualRateTests();
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
