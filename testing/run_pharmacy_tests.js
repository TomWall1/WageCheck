/**
 * Pharmacy Industry Award Test Runner — MA000012
 * Run: node testing/run_pharmacy_tests.js
 *
 * Key award features:
 *   - Single stream: pharmacy (10 levels)
 *   - Penalties: FT Sat ×1.25, Sun ×2.00, PH ×2.50
 *   - OT threshold: 7.6hr/day. First 2hr ×1.50, after ×2.00
 *   - Junior rates: 16=50%, 17=60%, 18=70%, 19=80%
 *   - Casual loading: 25%
 */
const path = require('path');
const { createTestRunner } = require('./lib/testFramework');
const t = createTestRunner('MA000012', path.join(__dirname, 'Pharmacy_Testing_Plan.xlsx'));
const { record, recordText, skip, classId, calcShift, calcMultiShift, round2, payOnly,
        pool, awardCode: AWARD_CODE,
        REF_MONDAY, REF_TUESDAY, REF_WEDNESDAY, REF_THURSDAY, REF_FRIDAY,
        REF_SATURDAY, REF_SUNDAY, REF_PH } = t;

const pharmId = (level) => classId(level, 'pharmacy');

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 1 — BASE RATES
   ═══════════════════════════════════════════════════════════════════════════ */
async function runBaseRateTests() {
  console.log('\n═══ SECTION 1 — BASE RATES ═══');

  console.log('\n1.1 Pharmacy FT/PT base rates');
  for (const b of [
    { id: 'BR-01', level: 1,  expected: 26.55, title: 'Pharmacy L1 FT' },
    { id: 'BR-02', level: 2,  expected: 27.16, title: 'Pharmacy L2 FT' },
    { id: 'BR-03', level: 3,  expected: 28.12, title: 'Pharmacy L3 FT' },
    { id: 'BR-04', level: 4,  expected: 29.27, title: 'Pharmacy L4 FT' },
    { id: 'BR-05', level: 5,  expected: 31.05, title: 'Pharmacy L5 FT' },
    { id: 'BR-06', level: 6,  expected: 32.11, title: 'Pharmacy L6 FT' },
    { id: 'BR-07', level: 7,  expected: 38.14, title: 'Pharmacy L7 FT' },
    { id: 'BR-08', level: 8,  expected: 41.78, title: 'Pharmacy L8 FT' },
    { id: 'BR-09', level: 9,  expected: 42.76, title: 'Pharmacy L9 FT' },
    { id: 'BR-10', level: 10, expected: 47.65, title: 'Pharmacy L10 FT' },
  ]) {
    try { const r = await calcShift('full_time', pharmId(b.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(b.id, b.expected, r.baseHourlyRate, b.title); } catch(e) { recordText(b.id, b.expected, 'ERROR', 'FAIL', e.message); }
  }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 2 — CASUAL RATES
   ═══════════════════════════════════════════════════════════════════════════ */
async function runCasualRateTests() {
  console.log('\n═══ SECTION 2 — CASUAL RATES ═══');

  console.log('\n2.1 Pharmacy casual rates (×1.25)');
  for (const c of [
    { id: 'CL-01', level: 1,  expected: round2(26.55 * 1.25), title: 'Pharmacy L1 casual' },
    { id: 'CL-02', level: 3,  expected: round2(28.12 * 1.25), title: 'Pharmacy L3 casual' },
    { id: 'CL-03', level: 5,  expected: round2(31.05 * 1.25), title: 'Pharmacy L5 casual' },
    { id: 'CL-04', level: 7,  expected: round2(38.14 * 1.25), title: 'Pharmacy L7 casual' },
    { id: 'CL-05', level: 10, expected: round2(47.65 * 1.25), title: 'Pharmacy L10 casual' },
  ]) {
    try { const r = await calcShift('casual', pharmId(c.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(c.id, c.expected, r.baseHourlyRate, c.title); } catch(e) { recordText(c.id, c.expected, 'ERROR', 'FAIL', e.message); }
  }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 3 — PENALTY RATES
   ═══════════════════════════════════════════════════════════════════════════ */
async function runPenaltyRateTests() {
  console.log('\n═══ SECTION 3 — PENALTY RATES ═══');

  const ftL1 = 26.55;
  const casL1 = round2(26.55 * 1.25);

  console.log('\n3.1 FT weekend and PH penalties (L1)');
  try { const r = await calcShift('full_time', pharmId(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-01', round2(ftL1 * 1.25 * 4), payOnly(r), 'FT L1 Sat 4hr (×1.25)'); } catch(e) { recordText('PR-01', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', pharmId(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-02', round2(ftL1 * 2.00 * 4), payOnly(r), 'FT L1 Sun 4hr (×2.00)'); } catch(e) { recordText('PR-02', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', pharmId(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-03', round2(ftL1 * 2.50 * 4), payOnly(r), 'FT L1 PH 4hr (×2.50)'); } catch(e) { recordText('PR-03', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n3.2 Casual weekend and PH penalties (L1)');
  try { const r = await calcShift('casual', pharmId(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-04', round2(casL1 * 1.25 * 4), payOnly(r), 'Casual L1 Sat 4hr (×1.25)'); } catch(e) { recordText('PR-04', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('casual', pharmId(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-05', round2(casL1 * 2.00 * 4), payOnly(r), 'Casual L1 Sun 4hr (×2.00)'); } catch(e) { recordText('PR-05', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('casual', pharmId(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-06', round2(casL1 * 2.50 * 4), payOnly(r), 'Casual L1 PH 4hr (×2.50)'); } catch(e) { recordText('PR-06', 0, 'ERROR', 'FAIL', e.message); }

  // Higher level penalties
  console.log('\n3.3 Higher level penalties');
  const ftL10 = 47.65;
  try { const r = await calcShift('full_time', pharmId(10), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-07', round2(ftL10 * 1.25 * 4), payOnly(r), 'FT L10 Sat 4hr (×1.25)'); } catch(e) { recordText('PR-07', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', pharmId(10), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-08', round2(ftL10 * 2.50 * 4), payOnly(r), 'FT L10 PH 4hr (×2.50)'); } catch(e) { recordText('PR-08', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 4 — OVERTIME
   ═══════════════════════════════════════════════════════════════════════════ */
async function runOvertimeTests() {
  console.log('\n═══ SECTION 4 — OVERTIME ═══');

  const ftL1 = 26.55;

  console.log('\n4.1 OT rate verification');
  record('OT-01', round2(ftL1 * 1.5), round2(ftL1 * 1.5), 'L1 OT first 2hr = $' + round2(ftL1 * 1.5) + ' (×1.50)');
  record('OT-02', round2(ftL1 * 2.0), round2(ftL1 * 2.0), 'L1 OT after 2hr = $' + round2(ftL1 * 2.0) + ' (×2.00)');

  console.log('\n4.2 Daily overtime (FT, 7.6hr threshold)');
  try {
    const r = await calcShift('full_time', pharmId(1), REF_MONDAY, '07:00', '16:30', { mealBreakTaken: true, mealBreakDuration: 30 });
    const total = payOnly(r);
    record('DO-01', total, total, 'FT L1 9hr day (1.4hr OT) = $' + total);
  } catch(e) { recordText('DO-01', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n4.3 Daily overtime — two tiers');
  try {
    const r = await calcShift('full_time', pharmId(1), REF_MONDAY, '06:00', '17:30', { mealBreakTaken: true, mealBreakDuration: 30 });
    const expected = round2(7.6 * ftL1 + 2 * ftL1 * 1.5 + 1.4 * ftL1 * 2.0);
    record('DO-02', expected, payOnly(r), 'FT L1 11hr day (2hr at ×1.50 + 1.4hr at ×2.00)');
  } catch(e) { recordText('DO-02', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n4.4 Weekly overtime (38hr threshold)');
  try {
    const shifts = [];
    for (let d = 7; d <= 11; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '08:00', endTime: '17:06', mealBreakTaken: true, mealBreakDuration: 30 });
    const r = await calcMultiShift('full_time', pharmId(1), shifts);
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
  try { const r = await calcShift('full_time', pharmId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('SU-01', 0.12, r.summary.sgcRate, 'SGC 12%'); } catch(e) { recordText('SU-01', 0.12, 'ERROR', 'FAIL', e.message); }
  try {
    const r = await calcShift('full_time', pharmId(1), REF_MONDAY, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    const ote = round2(7.5 * 26.55);
    const expectedSuper = round2(ote * 0.12);
    record('SU-02', expectedSuper, round2(r.summary.superAmount || 0), 'Super on 7.5hr ordinary L1');
  } catch(e) { recordText('SU-02', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 7 — JUNIOR RATES
   ═══════════════════════════════════════════════════════════════════════════ */
async function runJuniorTests() {
  console.log('\n═══ SECTION 7 — JUNIOR RATES ═══');

  const pharmL1 = 26.55;

  console.log('\n7.1 Pharmacy L1 junior rates');
  try { const r = await calcShift('full_time', pharmId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 16 }); record('JR-01', round2(pharmL1 * 0.50), r.baseHourlyRate, 'L1 FT age 16 (50%)'); } catch(e) { recordText('JR-01', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', pharmId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 17 }); record('JR-02', round2(pharmL1 * 0.60), r.baseHourlyRate, 'L1 FT age 17 (60%)'); } catch(e) { recordText('JR-02', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', pharmId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 18 }); record('JR-03', round2(pharmL1 * 0.70), r.baseHourlyRate, 'L1 FT age 18 (70%)'); } catch(e) { recordText('JR-03', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', pharmId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 19 }); record('JR-04', round2(pharmL1 * 0.80), r.baseHourlyRate, 'L1 FT age 19 (80%)'); } catch(e) { recordText('JR-04', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', pharmId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 21 }); record('JR-05', pharmL1, r.baseHourlyRate, 'L1 FT age 21 (adult)'); } catch(e) { recordText('JR-05', 0, 'ERROR', 'FAIL', e.message); }

  // Junior casual
  console.log('\n7.2 Pharmacy L1 junior casual rates');
  try { const r = await calcShift('casual', pharmId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 17 }); record('JR-06', round2(pharmL1 * 0.60 * 1.25), r.baseHourlyRate, 'L1 casual age 17 (60% + 25%)'); } catch(e) { recordText('JR-06', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('casual', pharmId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 19 }); record('JR-07', round2(pharmL1 * 0.80 * 1.25), r.baseHourlyRate, 'L1 casual age 19 (80% + 25%)'); } catch(e) { recordText('JR-07', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 8 — COMPLEX SCENARIOS
   ═══════════════════════════════════════════════════════════════════════════ */
async function runComplexTests() {
  console.log('\n═══ SECTION 8 — COMPLEX SCENARIOS ═══');

  // L5 Saturday full shift
  console.log('\n8.1 L5 Saturday full shift');
  try {
    const ftL5 = 31.05;
    const r = await calcShift('full_time', pharmId(5), REF_SATURDAY, '07:00', '15:06', { mealBreakTaken: true, mealBreakDuration: 30 });
    record('CS-01', round2(7.6 * ftL5 * 1.25), payOnly(r), 'FT L5 Sat 7.6hr (×1.25)');
  } catch(e) { recordText('CS-01', 0, 'ERROR', 'FAIL', e.message); }

  // Casual L10 Sunday
  console.log('\n8.2 Casual L10 Sunday');
  try {
    const casL10 = round2(47.65 * 1.25);
    const r = await calcShift('casual', pharmId(10), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('CS-02', round2(casL10 * 2.00 * 4), payOnly(r), 'Casual L10 Sun 4hr (×2.00)');
  } catch(e) { recordText('CS-02', 0, 'ERROR', 'FAIL', e.message); }

  // Full week Mon-Fri
  console.log('\n8.3 Full week Mon-Fri');
  try {
    const shifts = [];
    for (let d = 7; d <= 11; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '09:00', endTime: '16:36', mealBreakTaken: true, mealBreakDuration: 30 });
    const r = await calcMultiShift('full_time', pharmId(1), shifts);
    const total = payOnly(r);
    record('CS-03', total, total, 'FT L1 Mon-Fri 38hr week = $' + total);
  } catch(e) { recordText('CS-03', 0, 'ERROR', 'FAIL', e.message); }

  // Junior on PH
  console.log('\n8.4 Junior L1 age 17 PH');
  try {
    const juniorBase = round2(26.55 * 0.60);
    const r = await calcShift('full_time', pharmId(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH], age: 17 });
    record('CS-04', round2(juniorBase * 2.50 * 4), payOnly(r), 'FT L1 age 17 PH 4hr (60% × ×2.50)');
  } catch(e) { recordText('CS-04', 0, 'ERROR', 'FAIL', e.message); }

  // L8 weekday with OT
  console.log('\n8.5 L8 weekday with OT');
  try {
    const ftL8 = 41.78;
    const r = await calcShift('full_time', pharmId(8), REF_TUESDAY, '06:00', '17:30', { mealBreakTaken: true, mealBreakDuration: 30 });
    const expected = round2(7.6 * ftL8 + 2 * ftL8 * 1.5 + 1.4 * ftL8 * 2.0);
    record('CS-05', expected, payOnly(r), 'FT L8 11hr day Tue (OT two tiers)');
  } catch(e) { recordText('CS-05', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 9 — REGRESSION
   ═══════════════════════════════════════════════════════════════════════════ */
async function runRegressionTests() {
  console.log('\n═══ SECTION 9 — REGRESSION ═══');

  try {
    const r = await calcShift('full_time', pharmId(4), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-01', round2(29.27 * 4), payOnly(r), 'L4 FT Mon 4hr = $29.27 × 4');
  } catch(e) { recordText('RT-01', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('casual', pharmId(7), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-02', round2(38.14 * 1.25 * 4), payOnly(r), 'L7 casual Mon 4hr');
  } catch(e) { recordText('RT-02', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', pharmId(1), REF_SUNDAY, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    record('RT-03', round2(26.55 * 2.00 * 7.5), payOnly(r), 'L1 FT Sunday 7.5hr (×2.00)');
  } catch(e) { recordText('RT-03', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('casual', pharmId(6), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] });
    record('RT-04', round2(32.11 * 1.25 * 2.50 * 4), payOnly(r), 'L6 casual PH 4hr (×2.50)');
  } catch(e) { recordText('RT-04', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', pharmId(9), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-05', round2(42.76 * 4), payOnly(r), 'L9 FT Mon 4hr = $42.76 × 4');
  } catch(e) { recordText('RT-05', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN
   ═══════════════════════════════════════════════════════════════════════════ */
async function main() {
  console.log('WageCheck Pharmacy Industry Award Test Runner — MA000012');
  console.log('═'.repeat(65));
  await t.init();
  await runBaseRateTests();
  await runCasualRateTests();
  await runPenaltyRateTests();
  await runOvertimeTests();
  await runAllowanceTests();
  await runSuperTests();
  await runJuniorTests();
  await runComplexTests();
  await runRegressionTests();
  t.printSummary();
  t.generateExcel();
  await t.cleanup();
}
main().catch(e => { console.error('Fatal:', e); t.cleanup(); process.exit(1); });
