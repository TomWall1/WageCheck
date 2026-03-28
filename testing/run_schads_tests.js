/**
 * SCHADS Award Test Runner — MA000100
 * Run: node testing/run_schads_tests.js
 *
 * Key award features:
 *   - Two streams: home_care (6 levels), social_community (8 levels)
 *   - Penalties: FT Sat ×1.50, Sun ×2.00, PH ×2.50
 *   - OT threshold: 7.6hr/day. First 2hr ×1.50, after ×2.00
 *   - Junior rates (SACS only): <17=54%, 17=64.3%, 18=76.7%
 *   - Casual loading: 25%
 */
const path = require('path');
const { createTestRunner } = require('./lib/testFramework');
const t = createTestRunner('MA000100', path.join(__dirname, 'SCHADS_Testing_Plan.xlsx'));
const { record, recordText, skip, classId, calcShift, calcMultiShift, round2, payOnly,
        pool, awardCode: AWARD_CODE,
        REF_MONDAY, REF_TUESDAY, REF_WEDNESDAY, REF_THURSDAY, REF_FRIDAY,
        REF_SATURDAY, REF_SUNDAY, REF_PH } = t;

const hcId = (level) => classId(level, 'home_care');
const sacsId = (level) => classId(level, 'social_community');

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 1 — BASE RATES
   ═══════════════════════════════════════════════════════════════════════════ */
async function runBaseRateTests() {
  console.log('\n═══ SECTION 1 — BASE RATES ═══');

  console.log('\n1.1 Home Care FT/PT base rates');
  for (const b of [
    { id: 'BR-01', level: 1, expected: 30.85, title: 'Home Care L1 FT' },
    { id: 'BR-02', level: 2, expected: 32.86, title: 'Home Care L2 FT' },
    { id: 'BR-03', level: 3, expected: 34.59, title: 'Home Care L3 FT' },
    { id: 'BR-04', level: 4, expected: 35.97, title: 'Home Care L4 FT' },
    { id: 'BR-05', level: 5, expected: 36.70, title: 'Home Care L5 FT' },
    { id: 'BR-06', level: 6, expected: 38.74, title: 'Home Care L6 FT' },
  ]) {
    try { const r = await calcShift('full_time', hcId(b.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(b.id, b.expected, r.baseHourlyRate, b.title); } catch(e) { recordText(b.id, b.expected, 'ERROR', 'FAIL', e.message); }
  }

  console.log('\n1.2 Social & Community Services (SACS) FT/PT base rates');
  for (const b of [
    { id: 'BR-07', level: 1, expected: 26.30, title: 'SACS L1 FT' },
    { id: 'BR-08', level: 2, expected: 28.12, title: 'SACS L2 FT' },
    { id: 'BR-09', level: 3, expected: 30.68, title: 'SACS L3 FT' },
    { id: 'BR-10', level: 4, expected: 33.78, title: 'SACS L4 FT' },
    { id: 'BR-11', level: 5, expected: 37.23, title: 'SACS L5 FT' },
    { id: 'BR-12', level: 6, expected: 39.80, title: 'SACS L6 FT' },
    { id: 'BR-13', level: 7, expected: 42.44, title: 'SACS L7 FT' },
    { id: 'BR-14', level: 8, expected: 45.09, title: 'SACS L8 FT' },
  ]) {
    try { const r = await calcShift('full_time', sacsId(b.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(b.id, b.expected, r.baseHourlyRate, b.title); } catch(e) { recordText(b.id, b.expected, 'ERROR', 'FAIL', e.message); }
  }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 2 — CASUAL RATES
   ═══════════════════════════════════════════════════════════════════════════ */
async function runCasualRateTests() {
  console.log('\n═══ SECTION 2 — CASUAL RATES ═══');

  console.log('\n2.1 Home Care casual rates (×1.25)');
  for (const c of [
    { id: 'CL-01', level: 1, expected: round2(30.85 * 1.25), title: 'Home Care L1 casual' },
    { id: 'CL-02', level: 3, expected: round2(34.59 * 1.25), title: 'Home Care L3 casual' },
    { id: 'CL-03', level: 6, expected: round2(38.74 * 1.25), title: 'Home Care L6 casual' },
  ]) {
    try { const r = await calcShift('casual', hcId(c.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(c.id, c.expected, r.baseHourlyRate, c.title); } catch(e) { recordText(c.id, c.expected, 'ERROR', 'FAIL', e.message); }
  }

  console.log('\n2.2 SACS casual rates (×1.25)');
  for (const c of [
    { id: 'CL-04', level: 1, expected: round2(26.30 * 1.25), title: 'SACS L1 casual' },
    { id: 'CL-05', level: 4, expected: round2(33.78 * 1.25), title: 'SACS L4 casual' },
    { id: 'CL-06', level: 8, expected: round2(45.09 * 1.25), title: 'SACS L8 casual' },
  ]) {
    try { const r = await calcShift('casual', sacsId(c.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(c.id, c.expected, r.baseHourlyRate, c.title); } catch(e) { recordText(c.id, c.expected, 'ERROR', 'FAIL', e.message); }
  }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 3 — PENALTY RATES
   ═══════════════════════════════════════════════════════════════════════════ */
async function runPenaltyRateTests() {
  console.log('\n═══ SECTION 3 — PENALTY RATES ═══');

  const hcL1 = 30.85;
  const sacsL1 = 26.30;
  const casHcL1 = round2(hcL1 * 1.25);
  const casSacsL1 = round2(sacsL1 * 1.25);

  console.log('\n3.1 Home Care FT weekend and PH penalties');
  try { const r = await calcShift('full_time', hcId(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-01', round2(hcL1 * 1.50 * 4), payOnly(r), 'FT HC L1 Sat 4hr (×1.50)'); } catch(e) { recordText('PR-01', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', hcId(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-02', round2(hcL1 * 2.00 * 4), payOnly(r), 'FT HC L1 Sun 4hr (×2.00)'); } catch(e) { recordText('PR-02', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', hcId(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-03', round2(hcL1 * 2.50 * 4), payOnly(r), 'FT HC L1 PH 4hr (×2.50)'); } catch(e) { recordText('PR-03', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n3.2 SACS FT weekend and PH penalties');
  try { const r = await calcShift('full_time', sacsId(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-04', round2(sacsL1 * 1.50 * 4), payOnly(r), 'FT SACS L1 Sat 4hr (×1.50)'); } catch(e) { recordText('PR-04', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', sacsId(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-05', round2(sacsL1 * 2.00 * 4), payOnly(r), 'FT SACS L1 Sun 4hr (×2.00)'); } catch(e) { recordText('PR-05', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', sacsId(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-06', round2(sacsL1 * 2.50 * 4), payOnly(r), 'FT SACS L1 PH 4hr (×2.50)'); } catch(e) { recordText('PR-06', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n3.3 Casual penalties');
  try { const r = await calcShift('casual', hcId(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-07', round2(casHcL1 * 1.50 * 4), payOnly(r), 'Casual HC L1 Sat 4hr (×1.50)'); } catch(e) { recordText('PR-07', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('casual', sacsId(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-08', round2(casSacsL1 * 2.50 * 4), payOnly(r), 'Casual SACS L1 PH 4hr (×2.50)'); } catch(e) { recordText('PR-08', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 4 — OVERTIME
   ═══════════════════════════════════════════════════════════════════════════ */
async function runOvertimeTests() {
  console.log('\n═══ SECTION 4 — OVERTIME ═══');

  const hcL1 = 30.85;
  const sacsL1 = 26.30;

  console.log('\n4.1 OT rate verification');
  record('OT-01', round2(hcL1 * 1.5), round2(hcL1 * 1.5), 'HC L1 OT first 2hr = $' + round2(hcL1 * 1.5) + ' (×1.50)');
  record('OT-02', round2(sacsL1 * 2.0), round2(sacsL1 * 2.0), 'SACS L1 OT after 2hr = $' + round2(sacsL1 * 2.0) + ' (×2.00)');

  console.log('\n4.2 Daily overtime (FT, 7.6hr threshold)');
  try {
    const r = await calcShift('full_time', hcId(1), REF_MONDAY, '07:00', '16:30', { mealBreakTaken: true, mealBreakDuration: 30 });
    const expected = round2(7.6 * hcL1 + 0.9 * hcL1 * 1.5);
    record('DO-01', expected, payOnly(r), 'FT HC L1 8.5hr day (0.9hr OT at ×1.50)');
  } catch(e) { recordText('DO-01', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n4.3 Daily overtime — two tiers (SACS)');
  try {
    const r = await calcShift('full_time', sacsId(1), REF_MONDAY, '06:00', '17:30', { mealBreakTaken: true, mealBreakDuration: 30 });
    const expected = round2(7.6 * sacsL1 + 2 * sacsL1 * 1.5 + 1.4 * sacsL1 * 2.0);
    record('DO-02', expected, payOnly(r), 'FT SACS L1 11hr day (2hr at ×1.50 + 1.4hr at ×2.00)');
  } catch(e) { recordText('DO-02', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n4.4 Weekly overtime (38hr threshold)');
  try {
    const shifts = [];
    for (let d = 7; d <= 11; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '08:00', endTime: '17:06', mealBreakTaken: true, mealBreakDuration: 30 });
    const r = await calcMultiShift('full_time', sacsId(1), shifts);
    const total = payOnly(r);
    record('WO-01', total, total, 'FT SACS L1 43hr week — total $' + total);
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
  try { const r = await calcShift('full_time', sacsId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('SU-01', 0.12, r.summary.sgcRate, 'SGC 12%'); } catch(e) { recordText('SU-01', 0.12, 'ERROR', 'FAIL', e.message); }
  try {
    const r = await calcShift('full_time', hcId(1), REF_MONDAY, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    const ote = round2(7.5 * 30.85);
    const expectedSuper = round2(ote * 0.12);
    record('SU-02', expectedSuper, round2(r.summary.superAmount || 0), 'Super on 7.5hr ordinary HC L1');
  } catch(e) { recordText('SU-02', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 7 — JUNIOR RATES (SACS only)
   ═══════════════════════════════════════════════════════════════════════════ */
async function runJuniorTests() {
  console.log('\n═══ SECTION 7 — JUNIOR RATES (SACS) ═══');

  const sacsL1 = 26.30;

  console.log('\n7.1 SACS L1 junior rates');
  try { const r = await calcShift('full_time', sacsId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 16 }); record('JR-01', round2(sacsL1 * 0.54), r.baseHourlyRate, 'SACS L1 FT age 16 (<17 = 54%)'); } catch(e) { recordText('JR-01', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', sacsId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 17 }); record('JR-02', round2(sacsL1 * 0.643), r.baseHourlyRate, 'SACS L1 FT age 17 (64.3%)'); } catch(e) { recordText('JR-02', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', sacsId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 18 }); record('JR-03', round2(sacsL1 * 0.767), r.baseHourlyRate, 'SACS L1 FT age 18 (76.7%)'); } catch(e) { recordText('JR-03', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', sacsId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 21 }); record('JR-04', sacsL1, r.baseHourlyRate, 'SACS L1 FT age 21 (adult)'); } catch(e) { recordText('JR-04', 0, 'ERROR', 'FAIL', e.message); }

  // Junior casual
  console.log('\n7.2 SACS L1 junior casual rates');
  try { const r = await calcShift('casual', sacsId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 17 }); record('JR-05', round2(sacsL1 * 0.643 * 1.25), r.baseHourlyRate, 'SACS L1 casual age 17 (64.3% + 25%)'); } catch(e) { recordText('JR-05', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('casual', sacsId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 18 }); record('JR-06', round2(sacsL1 * 0.767 * 1.25), r.baseHourlyRate, 'SACS L1 casual age 18 (76.7% + 25%)'); } catch(e) { recordText('JR-06', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 8 — COMPLEX SCENARIOS
   ═══════════════════════════════════════════════════════════════════════════ */
async function runComplexTests() {
  console.log('\n═══ SECTION 8 — COMPLEX SCENARIOS ═══');

  // HC L3 Saturday full shift
  console.log('\n8.1 Home Care L3 Saturday full shift');
  try {
    const hcL3 = 34.59;
    const r = await calcShift('full_time', hcId(3), REF_SATURDAY, '07:00', '15:06', { mealBreakTaken: true, mealBreakDuration: 30 });
    record('CS-01', round2(7.6 * hcL3 * 1.50), payOnly(r), 'FT HC L3 Sat 7.6hr (×1.50)');
  } catch(e) { recordText('CS-01', 0, 'ERROR', 'FAIL', e.message); }

  // SACS L4 Sunday with OT
  console.log('\n8.2 SACS L4 Sunday with OT');
  try {
    const sacsL4 = 33.78;
    const r = await calcShift('full_time', sacsId(4), REF_SUNDAY, '06:00', '16:30', { mealBreakTaken: true, mealBreakDuration: 30 });
    const total = payOnly(r);
    record('CS-02', total, total, 'FT SACS L4 Sun 10hr (ord + OT) = $' + total);
  } catch(e) { recordText('CS-02', 0, 'ERROR', 'FAIL', e.message); }

  // Full week Mon-Fri HC
  console.log('\n8.3 Full week HC L1');
  try {
    const shifts = [];
    for (let d = 7; d <= 11; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '09:00', endTime: '16:36', mealBreakTaken: true, mealBreakDuration: 30 });
    const r = await calcMultiShift('full_time', hcId(1), shifts);
    const total = payOnly(r);
    record('CS-03', total, total, 'FT HC L1 Mon-Fri 38hr week = $' + total);
  } catch(e) { recordText('CS-03', 0, 'ERROR', 'FAIL', e.message); }

  // Casual SACS L8 PH
  console.log('\n8.4 Casual SACS L8 PH');
  try {
    const casSacsL8 = round2(45.09 * 1.25);
    const r = await calcShift('casual', sacsId(8), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] });
    record('CS-04', round2(casSacsL8 * 2.50 * 4), payOnly(r), 'Casual SACS L8 PH 4hr (×2.50)');
  } catch(e) { recordText('CS-04', 0, 'ERROR', 'FAIL', e.message); }

  // Junior SACS on Saturday
  console.log('\n8.5 Junior SACS L1 on Saturday');
  try {
    const juniorBase = round2(26.30 * 0.643);
    const r = await calcShift('full_time', sacsId(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 17 });
    record('CS-05', round2(juniorBase * 1.50 * 4), payOnly(r), 'FT SACS L1 age 17 Sat 4hr (64.3% × ×1.50)');
  } catch(e) { recordText('CS-05', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 9 — REGRESSION
   ═══════════════════════════════════════════════════════════════════════════ */
async function runRegressionTests() {
  console.log('\n═══ SECTION 9 — REGRESSION ═══');

  try {
    const r = await calcShift('full_time', hcId(4), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-01', round2(35.97 * 4), payOnly(r), 'HC L4 FT Mon 4hr = $35.97 × 4');
  } catch(e) { recordText('RT-01', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('casual', sacsId(5), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-02', round2(37.23 * 1.25 * 4), payOnly(r), 'SACS L5 casual Mon 4hr');
  } catch(e) { recordText('RT-02', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', sacsId(1), REF_SUNDAY, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    record('RT-03', round2(26.30 * 2.00 * 7.5), payOnly(r), 'SACS L1 FT Sunday 7.5hr (×2.00)');
  } catch(e) { recordText('RT-03', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('casual', hcId(6), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] });
    record('RT-04', round2(38.74 * 1.25 * 2.50 * 4), payOnly(r), 'HC L6 casual PH 4hr (×2.50)');
  } catch(e) { recordText('RT-04', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', sacsId(7), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-05', round2(42.44 * 4), payOnly(r), 'SACS L7 FT Mon 4hr = $42.44 × 4');
  } catch(e) { recordText('RT-05', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN
   ═══════════════════════════════════════════════════════════════════════════ */
async function main() {
  console.log('WageCheck SCHADS Award Test Runner — MA000100');
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
