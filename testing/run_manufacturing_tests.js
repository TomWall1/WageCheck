/**
 * Manufacturing and Associated Industries Award Test Runner — MA000010
 * Run: node testing/run_manufacturing_tests.js
 *
 * Key award features:
 *   - Single stream: manufacturing (12 levels, C13 to C2a)
 *   - Penalties: FT Sat ×1.50, Sun ×2.00, PH ×2.50
 *   - OT threshold: 7.6hr/day. First 2hr ×1.50, after ×2.00
 *   - Junior rates: <16=36.8%, 16=47.3%, 17=57.8%, 18=68.3%
 *   - Casual loading: 25%
 */
const path = require('path');
const { createTestRunner } = require('./lib/testFramework');
const t = createTestRunner('MA000010', path.join(__dirname, 'Manufacturing_Testing_Plan.xlsx'));
const { record, recordText, skip, classId, calcShift, calcMultiShift, round2, payOnly,
        pool, awardCode: AWARD_CODE,
        REF_MONDAY, REF_TUESDAY, REF_WEDNESDAY, REF_THURSDAY, REF_FRIDAY,
        REF_SATURDAY, REF_SUNDAY, REF_PH } = t;

const mfgId = (level) => classId(level, 'manufacturing');

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 1 — BASE RATES
   ═══════════════════════════════════════════════════════════════════════════ */
async function runBaseRateTests() {
  console.log('\n═══ SECTION 1 — BASE RATES ═══');

  console.log('\n1.1 Manufacturing FT/PT base rates (C13 → C2a)');
  for (const b of [
    { id: 'BR-01', level: 1,  expected: 24.95, title: 'C13 (L1) FT' },
    { id: 'BR-02', level: 2,  expected: 25.85, title: 'C12 (L2) FT' },
    { id: 'BR-03', level: 3,  expected: 26.70, title: 'C11 (L3) FT' },
    { id: 'BR-04', level: 4,  expected: 28.12, title: 'C10 (L4) FT' },
    { id: 'BR-05', level: 5,  expected: 29.05, title: 'C9 (L5) FT' },
    { id: 'BR-06', level: 6,  expected: 30.05, title: 'C8 (L6) FT' },
    { id: 'BR-07', level: 7,  expected: 31.19, title: 'C7 (L7) FT' },
    { id: 'BR-08', level: 8,  expected: 32.45, title: 'C6 (L8) FT' },
    { id: 'BR-09', level: 9,  expected: 33.60, title: 'C5 (L9) FT' },
    { id: 'BR-10', level: 10, expected: 34.80, title: 'C4 (L10) FT' },
    { id: 'BR-11', level: 11, expected: 35.69, title: 'C3 (L11) FT' },
    { id: 'BR-12', level: 12, expected: 36.43, title: 'C2a (L12) FT' },
  ]) {
    try { const r = await calcShift('full_time', mfgId(b.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(b.id, b.expected, r.baseHourlyRate, b.title); } catch(e) { recordText(b.id, b.expected, 'ERROR', 'FAIL', e.message); }
  }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 2 — CASUAL RATES
   ═══════════════════════════════════════════════════════════════════════════ */
async function runCasualRateTests() {
  console.log('\n═══ SECTION 2 — CASUAL RATES ═══');

  console.log('\n2.1 Manufacturing casual rates (×1.25)');
  for (const c of [
    { id: 'CL-01', level: 1,  expected: round2(24.95 * 1.25), title: 'C13 (L1) casual' },
    { id: 'CL-02', level: 3,  expected: round2(26.70 * 1.25), title: 'C11 (L3) casual' },
    { id: 'CL-03', level: 6,  expected: round2(30.05 * 1.25), title: 'C8 (L6) casual' },
    { id: 'CL-04', level: 9,  expected: round2(33.60 * 1.25), title: 'C5 (L9) casual' },
    { id: 'CL-05', level: 12, expected: round2(36.43 * 1.25), title: 'C2a (L12) casual' },
  ]) {
    try { const r = await calcShift('casual', mfgId(c.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(c.id, c.expected, r.baseHourlyRate, c.title); } catch(e) { recordText(c.id, c.expected, 'ERROR', 'FAIL', e.message); }
  }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 3 — PENALTY RATES
   ═══════════════════════════════════════════════════════════════════════════ */
async function runPenaltyRateTests() {
  console.log('\n═══ SECTION 3 — PENALTY RATES ═══');

  const ftL1 = 24.95;
  const casL1 = round2(24.95 * 1.25);

  console.log('\n3.1 FT weekend and PH penalties (C13)');
  try { const r = await calcShift('full_time', mfgId(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-01', round2(ftL1 * 1.50 * 4), payOnly(r), 'FT C13 Sat 4hr (×1.50)'); } catch(e) { recordText('PR-01', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', mfgId(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-02', round2(ftL1 * 2.00 * 4), payOnly(r), 'FT C13 Sun 4hr (×2.00)'); } catch(e) { recordText('PR-02', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', mfgId(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-03', round2(ftL1 * 2.50 * 4), payOnly(r), 'FT C13 PH 4hr (×2.50)'); } catch(e) { recordText('PR-03', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n3.2 Casual weekend and PH penalties (C13)');
  try { const r = await calcShift('casual', mfgId(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-04', round2(casL1 * 1.50 * 4), payOnly(r), 'Casual C13 Sat 4hr (×1.50)'); } catch(e) { recordText('PR-04', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('casual', mfgId(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-05', round2(casL1 * 2.00 * 4), payOnly(r), 'Casual C13 Sun 4hr (×2.00)'); } catch(e) { recordText('PR-05', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('casual', mfgId(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-06', round2(casL1 * 2.50 * 4), payOnly(r), 'Casual C13 PH 4hr (×2.50)'); } catch(e) { recordText('PR-06', 0, 'ERROR', 'FAIL', e.message); }

  // Higher level penalties
  console.log('\n3.3 Higher level penalties');
  const ftL12 = 36.43;
  try { const r = await calcShift('full_time', mfgId(12), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-07', round2(ftL12 * 1.50 * 4), payOnly(r), 'FT C2a Sat 4hr (×1.50)'); } catch(e) { recordText('PR-07', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', mfgId(12), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-08', round2(ftL12 * 2.50 * 4), payOnly(r), 'FT C2a PH 4hr (×2.50)'); } catch(e) { recordText('PR-08', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 4 — OVERTIME
   ═══════════════════════════════════════════════════════════════════════════ */
async function runOvertimeTests() {
  console.log('\n═══ SECTION 4 — OVERTIME ═══');

  const ftL1 = 24.95;

  console.log('\n4.1 OT rate verification');
  record('OT-01', round2(ftL1 * 1.5), round2(ftL1 * 1.5), 'C13 OT first 2hr = $' + round2(ftL1 * 1.5) + ' (×1.50)');
  record('OT-02', round2(ftL1 * 2.0), round2(ftL1 * 2.0), 'C13 OT after 2hr = $' + round2(ftL1 * 2.0) + ' (×2.00)');

  console.log('\n4.2 Daily overtime (FT, 7.6hr threshold)');
  try {
    const r = await calcShift('full_time', mfgId(1), REF_MONDAY, '07:00', '16:30', { mealBreakTaken: true, mealBreakDuration: 30 });
    const total = payOnly(r);
    record('DO-01', total, total, 'FT C13 9hr day (OT) = $' + total);
  } catch(e) { recordText('DO-01', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n4.3 Daily overtime — two tiers');
  try {
    const r = await calcShift('full_time', mfgId(1), REF_MONDAY, '06:00', '17:30', { mealBreakTaken: true, mealBreakDuration: 30 });
    const expected = round2(7.6 * ftL1 + 2 * ftL1 * 1.5 + 1.4 * ftL1 * 2.0);
    record('DO-02', expected, payOnly(r), 'FT C13 11hr day (2hr at ×1.50 + 1.4hr at ×2.00)');
  } catch(e) { recordText('DO-02', 0, 'ERROR', 'FAIL', e.message); }

  // Higher level OT
  console.log('\n4.4 Higher level OT');
  try {
    const ftL6 = 30.05;
    const r = await calcShift('full_time', mfgId(6), REF_MONDAY, '07:00', '16:30', { mealBreakTaken: true, mealBreakDuration: 30 });
    const total = payOnly(r);
    record('DO-03', total, total, 'FT C8 9hr day (OT) = $' + total);
  } catch(e) { recordText('DO-03', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n4.5 Weekly overtime (38hr threshold)');
  try {
    const shifts = [];
    for (let d = 7; d <= 11; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '08:00', endTime: '17:06', mealBreakTaken: true, mealBreakDuration: 30 });
    const r = await calcMultiShift('full_time', mfgId(1), shifts);
    const total = payOnly(r);
    record('WO-01', total, total, 'FT C13 43hr week — total $' + total);
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
  try { const r = await calcShift('full_time', mfgId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('SU-01', 0.12, r.summary.sgcRate, 'SGC 12%'); } catch(e) { recordText('SU-01', 0.12, 'ERROR', 'FAIL', e.message); }
  try {
    const r = await calcShift('full_time', mfgId(1), REF_MONDAY, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    const ote = round2(7.5 * 24.95);
    const expectedSuper = round2(ote * 0.12);
    record('SU-02', expectedSuper, round2(r.summary.superAmount || 0), 'Super on 7.5hr ordinary C13');
  } catch(e) { recordText('SU-02', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 7 — JUNIOR RATES
   ═══════════════════════════════════════════════════════════════════════════ */
async function runJuniorTests() {
  console.log('\n═══ SECTION 7 — JUNIOR RATES ═══');

  const mfgL1 = 24.95;

  console.log('\n7.1 C13 (L1) junior rates');
  try { const r = await calcShift('full_time', mfgId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 15 }); record('JR-01', round2(mfgL1 * 0.368), r.baseHourlyRate, 'C13 FT age 15 (<16 = 36.8%)'); } catch(e) { recordText('JR-01', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', mfgId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 16 }); record('JR-02', round2(mfgL1 * 0.473), r.baseHourlyRate, 'C13 FT age 16 (47.3%)'); } catch(e) { recordText('JR-02', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', mfgId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 17 }); record('JR-03', round2(mfgL1 * 0.578), r.baseHourlyRate, 'C13 FT age 17 (57.8%)'); } catch(e) { recordText('JR-03', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', mfgId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 18 }); record('JR-04', round2(mfgL1 * 0.683), r.baseHourlyRate, 'C13 FT age 18 (68.3%)'); } catch(e) { recordText('JR-04', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', mfgId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 21 }); record('JR-05', mfgL1, r.baseHourlyRate, 'C13 FT age 21 (adult)'); } catch(e) { recordText('JR-05', 0, 'ERROR', 'FAIL', e.message); }

  // Junior casual
  console.log('\n7.2 C13 junior casual rates');
  try { const r = await calcShift('casual', mfgId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 16 }); record('JR-06', round2(mfgL1 * 0.473 * 1.25), r.baseHourlyRate, 'C13 casual age 16 (47.3% + 25%)'); } catch(e) { recordText('JR-06', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('casual', mfgId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 18 }); record('JR-07', round2(mfgL1 * 0.683 * 1.25), r.baseHourlyRate, 'C13 casual age 18 (68.3% + 25%)'); } catch(e) { recordText('JR-07', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 8 — COMPLEX SCENARIOS
   ═══════════════════════════════════════════════════════════════════════════ */
async function runComplexTests() {
  console.log('\n═══ SECTION 8 — COMPLEX SCENARIOS ═══');

  // C5 Saturday full shift
  console.log('\n8.1 C5 Saturday full shift');
  try {
    const ftL9 = 33.60;
    const r = await calcShift('full_time', mfgId(9), REF_SATURDAY, '07:00', '15:06', { mealBreakTaken: true, mealBreakDuration: 30 });
    record('CS-01', round2(7.6 * ftL9 * 1.50), payOnly(r), 'FT C5 Sat 7.6hr (×1.50)');
  } catch(e) { recordText('CS-01', 0, 'ERROR', 'FAIL', e.message); }

  // C2a casual Sunday
  console.log('\n8.2 C2a casual Sunday');
  try {
    const casL12 = round2(36.43 * 1.25);
    const r = await calcShift('casual', mfgId(12), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('CS-02', round2(casL12 * 2.00 * 4), payOnly(r), 'Casual C2a Sun 4hr (×2.00)');
  } catch(e) { recordText('CS-02', 0, 'ERROR', 'FAIL', e.message); }

  // Full week Mon-Sat
  console.log('\n8.3 Full week with Saturday');
  try {
    const shifts = [];
    for (let d = 7; d <= 11; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '09:00', endTime: '16:36', mealBreakTaken: true, mealBreakDuration: 30 });
    shifts.push({ date: '2025-07-12', startTime: '09:00', endTime: '13:00', mealBreakTaken: true, mealBreakDuration: 0 });
    const r = await calcMultiShift('full_time', mfgId(1), shifts);
    const total = payOnly(r);
    record('CS-03', total, total, 'FT C13 Mon-Sat (38hr ord + 4hr Sat) = $' + total);
  } catch(e) { recordText('CS-03', 0, 'ERROR', 'FAIL', e.message); }

  // Junior on Saturday penalty
  console.log('\n8.4 Junior C13 on Saturday');
  try {
    const juniorBase = round2(24.95 * 0.578);
    const r = await calcShift('full_time', mfgId(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 17 });
    record('CS-04', round2(juniorBase * 1.50 * 4), payOnly(r), 'FT C13 age 17 Sat 4hr (57.8% × ×1.50)');
  } catch(e) { recordText('CS-04', 0, 'ERROR', 'FAIL', e.message); }

  // C10 weekday with OT
  console.log('\n8.5 C10 weekday with OT');
  try {
    const ftL4 = 28.12;
    const r = await calcShift('full_time', mfgId(4), REF_TUESDAY, '06:00', '17:30', { mealBreakTaken: true, mealBreakDuration: 30 });
    const expected = round2(7.6 * ftL4 + 2 * ftL4 * 1.5 + 1.4 * ftL4 * 2.0);
    record('CS-05', expected, payOnly(r), 'FT C10 11hr day Tue (OT two tiers)');
  } catch(e) { recordText('CS-05', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 9 — REGRESSION
   ═══════════════════════════════════════════════════════════════════════════ */
async function runRegressionTests() {
  console.log('\n═══ SECTION 9 — REGRESSION ═══');

  try {
    const r = await calcShift('full_time', mfgId(5), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-01', round2(29.05 * 4), payOnly(r), 'C9 FT Mon 4hr = $29.05 × 4');
  } catch(e) { recordText('RT-01', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('casual', mfgId(10), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-02', round2(34.80 * 1.25 * 4), payOnly(r), 'C4 casual Mon 4hr');
  } catch(e) { recordText('RT-02', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', mfgId(1), REF_SUNDAY, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    record('RT-03', round2(24.95 * 2.00 * 7.5), payOnly(r), 'C13 FT Sunday 7.5hr (×2.00)');
  } catch(e) { recordText('RT-03', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('casual', mfgId(8), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] });
    record('RT-04', round2(32.45 * 1.25 * 2.50 * 4), payOnly(r), 'C6 casual PH 4hr (×2.50)');
  } catch(e) { recordText('RT-04', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', mfgId(11), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-05', round2(35.69 * 4), payOnly(r), 'C3 FT Mon 4hr = $35.69 × 4');
  } catch(e) { recordText('RT-05', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN
   ═══════════════════════════════════════════════════════════════════════════ */
async function main() {
  console.log('WageCheck Manufacturing Award Test Runner — MA000010');
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
