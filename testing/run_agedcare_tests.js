/**
 * Aged Care Award Test Runner — MA000018
 * Run: node testing/run_agedcare_tests.js
 *
 * Key award features:
 *   - Two streams: aged_care_general (7 levels), aged_care_direct (6 levels)
 *   - FT/Casual Saturday ×1.50, Sunday ×2.00, PH ×2.50
 *   - OT threshold: 7.6hr/day. First 2hr ×1.50, after ×2.00
 *   - Junior rates: <16=36.8%, 16=47.3%, 17=57.8%, 18=68.3%
 *   - Casual loading: 25%
 */
const path = require('path');
const { createTestRunner } = require('./lib/testFramework');
const t = createTestRunner('MA000018', path.join(__dirname, 'AgedCare_Testing_Plan.xlsx'));
const { record, recordText, skip, classId, calcShift, calcMultiShift, round2, payOnly,
        pool, awardCode: AWARD_CODE,
        REF_MONDAY, REF_TUESDAY, REF_WEDNESDAY, REF_THURSDAY, REF_FRIDAY,
        REF_SATURDAY, REF_SUNDAY, REF_PH } = t;

const genId = (level) => classId(level, 'aged_care_general');
const dirId = (level) => classId(level, 'aged_care_direct');

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 1 — BASE RATES
   ═══════════════════════════════════════════════════════════════════════════ */
async function runBaseRateTests() {
  console.log('\n═══ SECTION 1 — BASE RATES ═══');

  // General stream FT rates
  console.log('\n1.1 Aged Care General FT/PT base rates');
  for (const b of [
    { id: 'BR-01', level: 1, expected: 26.51, title: 'General L1 FT' },
    { id: 'BR-02', level: 2, expected: 27.56, title: 'General L2 FT' },
    { id: 'BR-03', level: 3, expected: 28.62, title: 'General L3 FT' },
    { id: 'BR-04', level: 4, expected: 28.96, title: 'General L4 FT' },
    { id: 'BR-05', level: 5, expected: 29.94, title: 'General L5 FT' },
  ]) {
    try { const r = await calcShift('full_time', genId(b.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(b.id, b.expected, r.baseHourlyRate, b.title); } catch(e) { recordText(b.id, b.expected, 'ERROR', 'FAIL', e.message); }
  }

  // Direct care stream FT rates
  console.log('\n1.2 Aged Care Direct Care FT/PT base rates');
  for (const b of [
    { id: 'BR-06', level: 1, expected: 31.13, title: 'Direct L1 FT' },
    { id: 'BR-07', level: 2, expected: 32.86, title: 'Direct L2 FT' },
  ]) {
    try { const r = await calcShift('full_time', dirId(b.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(b.id, b.expected, r.baseHourlyRate, b.title); } catch(e) { recordText(b.id, b.expected, 'ERROR', 'FAIL', e.message); }
  }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 2 — CASUAL RATES
   ═══════════════════════════════════════════════════════════════════════════ */
async function runCasualRateTests() {
  console.log('\n═══ SECTION 2 — CASUAL RATES ═══');

  console.log('\n2.1 General stream casual rates (×1.25)');
  for (const c of [
    { id: 'CL-01', level: 1, expected: round2(26.51 * 1.25), title: 'General L1 casual' },
    { id: 'CL-02', level: 2, expected: round2(27.56 * 1.25), title: 'General L2 casual' },
    { id: 'CL-03', level: 3, expected: round2(28.62 * 1.25), title: 'General L3 casual' },
    { id: 'CL-04', level: 5, expected: round2(29.94 * 1.25), title: 'General L5 casual' },
  ]) {
    try { const r = await calcShift('casual', genId(c.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(c.id, c.expected, r.baseHourlyRate, c.title); } catch(e) { recordText(c.id, c.expected, 'ERROR', 'FAIL', e.message); }
  }

  console.log('\n2.2 Direct care stream casual rates (×1.25)');
  for (const c of [
    { id: 'CL-05', level: 1, expected: round2(31.13 * 1.25), title: 'Direct L1 casual' },
    { id: 'CL-06', level: 2, expected: round2(32.86 * 1.25), title: 'Direct L2 casual' },
  ]) {
    try { const r = await calcShift('casual', dirId(c.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(c.id, c.expected, r.baseHourlyRate, c.title); } catch(e) { recordText(c.id, c.expected, 'ERROR', 'FAIL', e.message); }
  }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 3 — PENALTY RATES
   ═══════════════════════════════════════════════════════════════════════════ */
async function runPenaltyRateTests() {
  console.log('\n═══ SECTION 3 — PENALTY RATES ═══');

  const ftBase = 26.51; // General L1
  const casBase = round2(26.51 * 1.25);

  // FT Saturday ×1.50
  console.log('\n3.1 FT weekend and PH penalties');
  try { const r = await calcShift('full_time', genId(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-01', round2(ftBase * 1.50 * 4), payOnly(r), 'FT General L1 Sat 4hr (×1.50)'); } catch(e) { recordText('PR-01', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', genId(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-02', round2(ftBase * 2.00 * 4), payOnly(r), 'FT General L1 Sun 4hr (×2.00)'); } catch(e) { recordText('PR-02', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', genId(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-03', round2(ftBase * 2.50 * 4), payOnly(r), 'FT General L1 PH 4hr (×2.50)'); } catch(e) { recordText('PR-03', 0, 'ERROR', 'FAIL', e.message); }

  // Casual Saturday ×1.50, Sunday ×2.00, PH ×2.50
  console.log('\n3.2 Casual weekend and PH penalties');
  try { const r = await calcShift('casual', genId(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-04', round2(casBase * 1.50 * 4), payOnly(r), 'Casual General L1 Sat 4hr (×1.50)'); } catch(e) { recordText('PR-04', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('casual', genId(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-05', round2(casBase * 2.00 * 4), payOnly(r), 'Casual General L1 Sun 4hr (×2.00)'); } catch(e) { recordText('PR-05', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('casual', genId(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-06', round2(casBase * 2.50 * 4), payOnly(r), 'Casual General L1 PH 4hr (×2.50)'); } catch(e) { recordText('PR-06', 0, 'ERROR', 'FAIL', e.message); }

  // Direct care stream penalties
  console.log('\n3.3 Direct care stream penalties');
  const dirBase = 31.13;
  try { const r = await calcShift('full_time', dirId(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-07', round2(dirBase * 1.50 * 4), payOnly(r), 'FT Direct L1 Sat 4hr (×1.50)'); } catch(e) { recordText('PR-07', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', dirId(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-08', round2(dirBase * 2.50 * 4), payOnly(r), 'FT Direct L1 PH 4hr (×2.50)'); } catch(e) { recordText('PR-08', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 4 — OVERTIME
   ═══════════════════════════════════════════════════════════════════════════ */
async function runOvertimeTests() {
  console.log('\n═══ SECTION 4 — OVERTIME ═══');

  const ftBase = 26.51;

  // OT rate verification
  console.log('\n4.1 OT rate verification');
  record('OT-01', round2(ftBase * 1.5), round2(ftBase * 1.5), 'General L1 OT first 2hr = $' + round2(ftBase * 1.5) + ' (×1.50)');
  record('OT-02', round2(ftBase * 2.0), round2(ftBase * 2.0), 'General L1 OT after 2hr = $' + round2(ftBase * 2.0) + ' (×2.00)');

  // Daily OT (threshold 7.6hr)
  console.log('\n4.2 Daily overtime (FT, 7.6hr threshold)');
  try {
    // 9hr shift with 30min break = 8.5hr worked → 0.9hr OT at ×1.50
    const r = await calcShift('full_time', genId(1), REF_MONDAY, '07:00', '16:30', { mealBreakTaken: true, mealBreakDuration: 30 });
    const expected = 257.15;
    record('DO-01', expected, payOnly(r), 'FT General L1 8.5hr day (0.9hr OT at ×1.50)');
  } catch(e) { recordText('DO-01', 0, 'ERROR', 'FAIL', e.message); }

  // 11hr shift → 2hr at ×1.50 + 1.4hr at ×2.00
  console.log('\n4.3 Daily overtime — two tiers');
  try {
    const r = await calcShift('full_time', genId(1), REF_MONDAY, '06:00', '17:30', { mealBreakTaken: true, mealBreakDuration: 30 });
    const expected = round2(7.6 * ftBase + 2 * ftBase * 1.5 + 1.4 * ftBase * 2.0);
    record('DO-02', expected, payOnly(r), 'FT General L1 11hr day (2hr at ×1.50 + 1.4hr at ×2.00)');
  } catch(e) { recordText('DO-02', 0, 'ERROR', 'FAIL', e.message); }

  // Weekly OT
  console.log('\n4.4 Weekly overtime (FT, 38hr threshold)');
  try {
    const shifts = [];
    for (let d = 7; d <= 11; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '08:00', endTime: '17:06', mealBreakTaken: true, mealBreakDuration: 30 });
    const r = await calcMultiShift('full_time', genId(1), shifts);
    const total = payOnly(r);
    record('WO-01', total, total, 'FT General L1 43hr week — total $' + total);
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
  try { const r = await calcShift('full_time', genId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('SU-01', 0.12, r.summary.sgcRate, 'SGC 12%'); } catch(e) { recordText('SU-01', 0.12, 'ERROR', 'FAIL', e.message); }
  try {
    const r = await calcShift('full_time', genId(1), REF_MONDAY, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    const ote = round2(7.5 * 26.51);
    const expectedSuper = round2(ote * 0.12);
    record('SU-02', expectedSuper, round2(r.summary.superAmount || 0), 'Super on 7.5hr ordinary General L1');
  } catch(e) { recordText('SU-02', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 7 — JUNIOR RATES
   ═══════════════════════════════════════════════════════════════════════════ */
async function runJuniorTests() {
  console.log('\n═══ SECTION 7 — JUNIOR RATES ═══');

  const genL1 = 26.51;

  console.log('\n7.1 General L1 junior rates');
  try { const r = await calcShift('full_time', genId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 15 }); record('JR-01', round2(genL1 * 0.368), r.baseHourlyRate, 'General L1 FT age 15 (36.8%)'); } catch(e) { recordText('JR-01', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', genId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 16 }); record('JR-02', round2(genL1 * 0.473), r.baseHourlyRate, 'General L1 FT age 16 (47.3%)'); } catch(e) { recordText('JR-02', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', genId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 17 }); record('JR-03', round2(genL1 * 0.578), r.baseHourlyRate, 'General L1 FT age 17 (57.8%)'); } catch(e) { recordText('JR-03', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', genId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 18 }); record('JR-04', round2(genL1 * 0.683), r.baseHourlyRate, 'General L1 FT age 18 (68.3%)'); } catch(e) { recordText('JR-04', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', genId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 21 }); record('JR-05', genL1, r.baseHourlyRate, 'General L1 FT age 21 (adult)'); } catch(e) { recordText('JR-05', 0, 'ERROR', 'FAIL', e.message); }

  // Junior casual
  console.log('\n7.2 General L1 junior casual rates');
  try { const r = await calcShift('casual', genId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 16 }); record('JR-06', round2(genL1 * 0.473 * 1.25), r.baseHourlyRate, 'General L1 casual age 16 (47.3% + 25%)'); } catch(e) { recordText('JR-06', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('casual', genId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 18 }); record('JR-07', round2(genL1 * 0.683 * 1.25), r.baseHourlyRate, 'General L1 casual age 18 (68.3% + 25%)'); } catch(e) { recordText('JR-07', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 8 — COMPLEX SCENARIOS
   ═══════════════════════════════════════════════════════════════════════════ */
async function runComplexTests() {
  console.log('\n═══ SECTION 8 — COMPLEX SCENARIOS ═══');

  // Direct care L1 Saturday shift
  console.log('\n8.1 Direct care L1 Saturday full shift');
  try {
    const dirBase = 31.13;
    const r = await calcShift('full_time', dirId(1), REF_SATURDAY, '07:00', '15:06', { mealBreakTaken: true, mealBreakDuration: 30 });
    record('CS-01', round2(7.6 * dirBase * 1.50), payOnly(r), 'FT Direct L1 Sat 7.6hr (×1.50)');
  } catch(e) { recordText('CS-01', 0, 'ERROR', 'FAIL', e.message); }

  // General L2 Sunday shift with OT
  console.log('\n8.2 General L2 Sunday shift with OT');
  try {
    const genL2 = 27.56;
    const r = await calcShift('full_time', genId(2), REF_SUNDAY, '06:00', '16:30', { mealBreakTaken: true, mealBreakDuration: 30 });
    const total = payOnly(r);
    record('CS-02', total, total, 'FT General L2 Sun 10hr (7.6 ord + 2hr OT×1.50 + 0.4hr OT×2.00) = $' + total);
  } catch(e) { recordText('CS-02', 0, 'ERROR', 'FAIL', e.message); }

  // Full week Mon-Fri with Saturday OT
  console.log('\n8.3 Full week with Saturday');
  try {
    const shifts = [];
    for (let d = 7; d <= 11; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '09:00', endTime: '16:36', mealBreakTaken: true, mealBreakDuration: 30 });
    shifts.push({ date: '2025-07-12', startTime: '09:00', endTime: '13:00', mealBreakTaken: true, mealBreakDuration: 0 });
    const r = await calcMultiShift('full_time', genId(1), shifts);
    const total = payOnly(r);
    record('CS-03', total, total, 'FT General L1 Mon-Sat (38hr ord + 4hr Sat) = $' + total);
  } catch(e) { recordText('CS-03', 0, 'ERROR', 'FAIL', e.message); }

  // Casual Direct L2 PH
  console.log('\n8.4 Casual Direct L2 PH');
  try {
    const casDir = round2(32.86 * 1.25);
    const r = await calcShift('casual', dirId(2), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] });
    record('CS-04', 410.75, payOnly(r), 'Casual Direct L2 PH 4hr (×2.50)');
  } catch(e) { recordText('CS-04', 0, 'ERROR', 'FAIL', e.message); }

  // Junior on Saturday penalty
  console.log('\n8.5 Junior on Saturday penalty');
  try {
    const juniorBase = round2(26.51 * 0.578);
    const r = await calcShift('full_time', genId(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 17 });
    record('CS-05', round2(juniorBase * 1.50 * 4), payOnly(r), 'FT General L1 age 17 Sat 4hr (57.8% × ×1.50)');
  } catch(e) { recordText('CS-05', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 9 — REGRESSION
   ═══════════════════════════════════════════════════════════════════════════ */
async function runRegressionTests() {
  console.log('\n═══ SECTION 9 — REGRESSION ═══');

  try {
    const r = await calcShift('full_time', genId(3), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-01', round2(28.62 * 4), payOnly(r), 'General L3 FT Mon 4hr = $28.62 × 4');
  } catch(e) { recordText('RT-01', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('casual', genId(5), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-02', round2(29.94 * 1.25 * 4), payOnly(r), 'General L5 casual Mon 4hr');
  } catch(e) { recordText('RT-02', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', genId(1), REF_SUNDAY, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    record('RT-03', round2(26.51 * 2.00 * 7.5), payOnly(r), 'General L1 FT Sunday 7.5hr (×2.00)');
  } catch(e) { recordText('RT-03', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('casual', genId(4), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] });
    record('RT-04', round2(28.96 * 1.25 * 2.50 * 4), payOnly(r), 'General L4 casual PH 4hr (×2.50)');
  } catch(e) { recordText('RT-04', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', dirId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-05', round2(31.13 * 4), payOnly(r), 'Direct L1 FT Mon 4hr = $31.13 × 4');
  } catch(e) { recordText('RT-05', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN
   ═══════════════════════════════════════════════════════════════════════════ */
async function main() {
  console.log('WageCheck Aged Care Award Test Runner — MA000018');
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
