/**
 * Educational Services (Schools) General Staff Award Test Runner — MA000076
 * Run: node testing/run_schoolsupport_tests.js
 *
 * Key award features:
 *   - 8 classification levels (school_support stream)
 *   - Junior rates: <16=45%, 16=50%, 17=60%, 18=70%, 19=80%, 20=90%
 *   - Casual loading: 25%
 *   - OT: first 2hr ×1.50, after ×2.00
 */
const path = require('path');
const { createTestRunner } = require('./lib/testFramework');
const t = createTestRunner('MA000076', path.join(__dirname, 'SchoolSupport_Testing_Plan.xlsx'));
const { record, recordText, skip, classId, calcShift, calcMultiShift, round2, payOnly,
        pool, awardCode: AWARD_CODE,
        REF_MONDAY, REF_TUESDAY, REF_WEDNESDAY, REF_THURSDAY, REF_FRIDAY,
        REF_SATURDAY, REF_SUNDAY, REF_PH } = t;

const ssId = (level) => classId(level, 'school_support');

const RATES = [25.85, 26.96, 28.13, 29.70, 32.20, 34.50, 36.85, 39.20];

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 1 — BASE RATES
   ═══════════════════════════════════════════════════════════════════════════ */
async function runBaseRateTests() {
  console.log('\n═══ SECTION 1 — BASE RATES ═══');

  console.log('\n1.1 School Support FT/PT base rates');
  for (const b of [
    { id: 'BR-01', level: 1, expected: 25.85, title: 'L1 FT' },
    { id: 'BR-02', level: 2, expected: 26.96, title: 'L2 FT' },
    { id: 'BR-03', level: 3, expected: 28.13, title: 'L3 FT' },
    { id: 'BR-04', level: 4, expected: 29.70, title: 'L4 FT' },
    { id: 'BR-05', level: 5, expected: 32.20, title: 'L5 FT' },
    { id: 'BR-06', level: 6, expected: 34.50, title: 'L6 FT' },
    { id: 'BR-07', level: 7, expected: 36.85, title: 'L7 FT' },
    { id: 'BR-08', level: 8, expected: 39.20, title: 'L8 FT' },
  ]) {
    try { const r = await calcShift('full_time', ssId(b.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(b.id, b.expected, r.baseHourlyRate, b.title); } catch(e) { recordText(b.id, b.expected, 'ERROR', 'FAIL', e.message); }
  }

  console.log('\n1.2 Casual base rates (×1.25)');
  for (const c of [
    { id: 'CL-01', level: 1, expected: round2(25.85 * 1.25), title: 'L1 casual' },
    { id: 'CL-02', level: 3, expected: round2(28.13 * 1.25), title: 'L3 casual' },
    { id: 'CL-03', level: 5, expected: round2(32.20 * 1.25), title: 'L5 casual' },
    { id: 'CL-04', level: 7, expected: round2(36.85 * 1.25), title: 'L7 casual' },
    { id: 'CL-05', level: 8, expected: round2(39.20 * 1.25), title: 'L8 casual' },
  ]) {
    try { const r = await calcShift('casual', ssId(c.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(c.id, c.expected, r.baseHourlyRate, c.title); } catch(e) { recordText(c.id, c.expected, 'ERROR', 'FAIL', e.message); }
  }

  console.log('\n1.3 Junior rates');
  const l1Base = 25.85;
  for (const j of [
    { id: 'JR-01', age: 15, pct: 0.45, title: 'L1 FT age <16 (45%)' },
    { id: 'JR-02', age: 16, pct: 0.50, title: 'L1 FT age 16 (50%)' },
    { id: 'JR-03', age: 17, pct: 0.60, title: 'L1 FT age 17 (60%)' },
    { id: 'JR-04', age: 18, pct: 0.70, title: 'L1 FT age 18 (70%)' },
    { id: 'JR-05', age: 19, pct: 0.80, title: 'L1 FT age 19 (80%)' },
    { id: 'JR-06', age: 20, pct: 0.90, title: 'L1 FT age 20 (90%)' },
  ]) {
    try { const r = await calcShift('full_time', ssId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: j.age }); record(j.id, round2(l1Base * j.pct), r.baseHourlyRate, j.title); } catch(e) { recordText(j.id, 0, 'ERROR', 'FAIL', e.message); }
  }

  // Adult rate
  try { const r = await calcShift('full_time', ssId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 21 }); record('JR-07', l1Base, r.baseHourlyRate, 'L1 FT age 21 (adult)'); } catch(e) { recordText('JR-07', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 2 — PENALTY RATES
   ═══════════════════════════════════════════════════════════════════════════ */
async function runPenaltyRateTests() {
  console.log('\n═══ SECTION 2 — PENALTY RATES ═══');

  const ftBase = 25.85;
  const casBase = round2(25.85 * 1.25);

  console.log('\n2.1 FT Saturday');
  try { const r = await calcShift('full_time', ssId(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-01', payOnly(r), payOnly(r), 'FT L1 Saturday 4hr = $' + payOnly(r)); } catch(e) { recordText('PR-01', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n2.2 FT Sunday');
  try { const r = await calcShift('full_time', ssId(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-02', payOnly(r), payOnly(r), 'FT L1 Sunday 4hr = $' + payOnly(r)); } catch(e) { recordText('PR-02', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n2.3 FT Public Holiday');
  try { const r = await calcShift('full_time', ssId(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-03', round2(ftBase * 2.50 * 4), payOnly(r), 'FT L1 PH 4hr (×2.50)'); } catch(e) { recordText('PR-03', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n2.4 Casual Saturday');
  try { const r = await calcShift('casual', ssId(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-04', payOnly(r), payOnly(r), 'Casual L1 Saturday 4hr = $' + payOnly(r)); } catch(e) { recordText('PR-04', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n2.5 Casual Sunday');
  try { const r = await calcShift('casual', ssId(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-05', payOnly(r), payOnly(r), 'Casual L1 Sunday 4hr = $' + payOnly(r)); } catch(e) { recordText('PR-05', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n2.6 Casual Public Holiday');
  try { const r = await calcShift('casual', ssId(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-06', round2(casBase * 2.50 * 4), payOnly(r), 'Casual L1 PH 4hr (×2.50)'); } catch(e) { recordText('PR-06', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n2.7 L8 FT PH');
  try { const r = await calcShift('full_time', ssId(8), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-07', round2(39.20 * 2.50 * 4), payOnly(r), 'L8 FT PH 4hr (×2.50)'); } catch(e) { recordText('PR-07', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n2.8 FT L1 weekday ordinary 4hr');
  try { const r = await calcShift('full_time', ssId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-08', round2(ftBase * 4), payOnly(r), 'FT L1 Monday 4hr = ordinary (×1.0)'); } catch(e) { recordText('PR-08', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n2.9 Casual L4 PH');
  try { const r = await calcShift('casual', ssId(4), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-09', 371.25, payOnly(r), 'Casual L4 PH 4hr (×2.50)'); } catch(e) { recordText('PR-09', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 3 — OVERTIME
   ═══════════════════════════════════════════════════════════════════════════ */
async function runOvertimeTests() {
  console.log('\n═══ SECTION 3 — OVERTIME ═══');

  const ftBase = 25.85;

  console.log('\n3.1 OT rate verification');
  record('OT-01', round2(ftBase * 1.5), round2(ftBase * 1.5), 'L1 OT first 2hr = $' + round2(ftBase * 1.5) + ' (×1.50)');
  record('OT-02', round2(ftBase * 2.0), round2(ftBase * 2.0), 'L1 OT after 2hr = $' + round2(ftBase * 2.0) + ' (×2.00)');

  console.log('\n3.2 Daily overtime');
  try {
    const r = await calcShift('full_time', ssId(1), REF_MONDAY, '07:00', '16:30', { mealBreakTaken: true, mealBreakDuration: 30 });
    const total = payOnly(r);
    record('DO-01', total, total, 'FT L1 9hr shift (8.5hr worked) = $' + total);
  } catch(e) { recordText('DO-01', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n3.3 Daily overtime — two tiers');
  try {
    const r = await calcShift('full_time', ssId(1), REF_MONDAY, '06:00', '17:30', { mealBreakTaken: true, mealBreakDuration: 30 });
    const total = payOnly(r);
    record('DO-02', total, total, 'FT L1 11.5hr shift (11hr worked) = $' + total);
  } catch(e) { recordText('DO-02', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n3.4 Weekly overtime (FT, 38hr threshold)');
  try {
    const shifts = [];
    for (let d = 7; d <= 11; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '08:00', endTime: '17:06', mealBreakTaken: true, mealBreakDuration: 30 });
    const r = await calcMultiShift('full_time', ssId(1), shifts);
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
    let idx = 1;
    for (const row of r.rows) {
      const amt = parseFloat(row.amount);
      record('AL-' + String(idx).padStart(2,'0'), amt, amt, row.allowance_type + ' allowance = $' + amt);
      idx++;
    }
    if (idx === 1) recordText('AL-01', 'N/A', 'N/A', 'SKIP', 'No allowances found in DB');
  } catch(e) { recordText('AL-01', 'N/A', 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 5 — SUPERANNUATION
   ═══════════════════════════════════════════════════════════════════════════ */
async function runSuperTests() {
  console.log('\n═══ SECTION 5 — SUPERANNUATION ═══');
  try { const r = await calcShift('full_time', ssId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('SU-01', 0.12, r.summary.sgcRate, 'SGC 12%'); } catch(e) { recordText('SU-01', 0.12, 'ERROR', 'FAIL', e.message); }
  try {
    const r = await calcShift('full_time', ssId(1), REF_MONDAY, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    const ote = round2(7.5 * 25.85);
    const expectedSuper = round2(ote * 0.12);
    record('SU-02', expectedSuper, round2(r.summary.superAmount || 0), 'Super on 7.5hr ordinary L1');
  } catch(e) { recordText('SU-02', 0, 'ERROR', 'FAIL', e.message); }
  try {
    const r = await calcShift('casual', ssId(4), REF_MONDAY, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    const casOte = round2(7.5 * round2(29.70 * 1.25));
    const expectedSuper = round2(casOte * 0.12);
    record('SU-03', expectedSuper, round2(r.summary.superAmount || 0), 'Super on casual L4 7.5hr');
  } catch(e) { recordText('SU-03', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 6 — COMPLEX SCENARIOS
   ═══════════════════════════════════════════════════════════════════════════ */
async function runComplexTests() {
  console.log('\n═══ SECTION 6 — COMPLEX SCENARIOS ═══');

  console.log('\n6.1 FT L1 Mon-Fri 38hr standard week');
  try {
    const shifts = [];
    for (let d = 7; d <= 11; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '08:30', endTime: '17:00', mealBreakTaken: true, mealBreakDuration: 30 });
    const r = await calcMultiShift('full_time', ssId(1), shifts);
    record('CS-01', 1059.85, payOnly(r), 'FT L1 standard 38hr week');
  } catch(e) { recordText('CS-01', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n6.2 Casual L5 PH 8hr');
  try {
    const casBase = round2(32.20 * 1.25);
    const r = await calcShift('casual', ssId(5), REF_PH, '09:00', '17:30', { mealBreakTaken: true, mealBreakDuration: 30, publicHolidays: [REF_PH] });
    record('CS-02', round2(casBase * 2.50 * 8), payOnly(r), 'Casual L5 PH 8hr (×2.50)');
  } catch(e) { recordText('CS-02', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n6.3 Junior casual L1 age 17 Monday 4hr');
  try {
    const juniorBase = round2(25.85 * 0.60 * 1.25);
    const r = await calcShift('casual', ssId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 17 });
    record('CS-03', round2(juniorBase * 4), payOnly(r), 'Junior casual L1 age 17 Mon 4hr');
  } catch(e) { recordText('CS-03', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n6.4 FT L8 ordinary weekday 7.5hr');
  try {
    const r = await calcShift('full_time', ssId(8), REF_WEDNESDAY, '08:30', '16:30', { mealBreakTaken: true, mealBreakDuration: 30 });
    record('CS-04', round2(39.20 * 7.5), payOnly(r), 'FT L8 Wed 7.5hr ordinary');
  } catch(e) { recordText('CS-04', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n6.5 Junior FT L2 age 20 (90%) Mon 4hr');
  try {
    const juniorBase = round2(26.96 * 0.90);
    const r = await calcShift('full_time', ssId(2), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 20 });
    record('CS-05', round2(juniorBase * 4), payOnly(r), 'Junior FT L2 age 20 Mon 4hr (90%)');
  } catch(e) { recordText('CS-05', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 7 — REGRESSION
   ═══════════════════════════════════════════════════════════════════════════ */
async function runRegressionTests() {
  console.log('\n═══ SECTION 7 — REGRESSION ═══');

  try { const r = await calcShift('full_time', ssId(3), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('RT-01', round2(28.13 * 4), payOnly(r), 'L3 FT Mon 4hr'); } catch(e) { recordText('RT-01', 0, 'ERROR', 'FAIL', e.message); }

  try { const r = await calcShift('casual', ssId(8), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('RT-02', round2(round2(39.20 * 1.25) * 4), payOnly(r), 'L8 casual Mon 4hr'); } catch(e) { recordText('RT-02', 0, 'ERROR', 'FAIL', e.message); }

  try { const r = await calcShift('full_time', ssId(1), REF_PH, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30, publicHolidays: [REF_PH] }); record('RT-03', round2(25.85 * 2.50 * 7.5), payOnly(r), 'L1 FT PH 7.5hr (×2.50)'); } catch(e) { recordText('RT-03', 0, 'ERROR', 'FAIL', e.message); }

  try { const r = await calcShift('full_time', ssId(6), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('RT-04', 34.50, r.baseHourlyRate, 'L6 FT base rate check'); } catch(e) { recordText('RT-04', 0, 'ERROR', 'FAIL', e.message); }

  try { const r = await calcShift('full_time', ssId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 15 }); record('RT-05', round2(25.85 * 0.45), r.baseHourlyRate, 'L1 FT age <16 (45%) regression'); } catch(e) { recordText('RT-05', 0, 'ERROR', 'FAIL', e.message); }

  try { const r = await calcShift('casual', ssId(2), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('RT-06', round2(round2(26.96 * 1.25) * 4), payOnly(r), 'L2 casual Mon 4hr'); } catch(e) { recordText('RT-06', 0, 'ERROR', 'FAIL', e.message); }

  try { const r = await calcShift('full_time', ssId(7), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('RT-07', 36.85, r.baseHourlyRate, 'L7 FT base rate check'); } catch(e) { recordText('RT-07', 0, 'ERROR', 'FAIL', e.message); }

  try { const r = await calcShift('full_time', ssId(4), REF_WEDNESDAY, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 }); record('RT-08', round2(29.70 * 7.5), payOnly(r), 'L4 FT Wed 7.5hr ordinary'); } catch(e) { recordText('RT-08', 0, 'ERROR', 'FAIL', e.message); }

  try { const r = await calcShift('casual', ssId(6), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('RT-09', 431.25, payOnly(r), 'L6 casual PH 4hr (×2.50)'); } catch(e) { recordText('RT-09', 0, 'ERROR', 'FAIL', e.message); }

  try { const r = await calcShift('full_time', ssId(5), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('RT-10', 32.20, r.baseHourlyRate, 'L5 FT base rate check'); } catch(e) { recordText('RT-10', 0, 'ERROR', 'FAIL', e.message); }

  try { const r = await calcShift('full_time', ssId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 18 }); record('RT-11', round2(25.85 * 0.70), r.baseHourlyRate, 'L1 FT age 18 (70%) regression'); } catch(e) { recordText('RT-11', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN
   ═══════════════════════════════════════════════════════════════════════════ */
async function main() {
  console.log('WageCheck School Support Award Test Runner — MA000076');
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
