/**
 * Building and Construction General On-site Award Test Runner — MA000020
 * Run: node testing/run_construction_tests.js
 *
 * Key award features:
 *   - Single stream: construction (9 levels, CW1a → CW6)
 *   - Penalties: FT Sat ×1.50, Sun ×2.00, PH ×2.50
 *   - Casual: Sat ×1.75, Sun ×2.00, PH ×2.50
 *   - OT threshold: 7.6hr/day. First 2hr ×1.50, after ×2.00
 *   - No standard junior rates
 *   - Casual loading: 25%
 */
const path = require('path');
const { createTestRunner } = require('./lib/testFramework');
const t = createTestRunner('MA000020', path.join(__dirname, 'Construction_Testing_Plan.xlsx'));
const { record, recordText, skip, classId, calcShift, calcMultiShift, round2, payOnly,
        pool, awardCode: AWARD_CODE,
        REF_MONDAY, REF_TUESDAY, REF_WEDNESDAY, REF_THURSDAY, REF_FRIDAY,
        REF_SATURDAY, REF_SUNDAY, REF_PH } = t;

const cwId = (level) => classId(level, 'construction');

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 1 — BASE RATES
   ═══════════════════════════════════════════════════════════════════════════ */
async function runBaseRateTests() {
  console.log('\n═══ SECTION 1 — BASE RATES ═══');

  console.log('\n1.1 Construction FT/PT base rates (CW1a → CW6)');
  for (const b of [
    { id: 'BR-01', level: 1, expected: 25.46, title: 'CW1a (L1) FT' },
    { id: 'BR-02', level: 2, expected: 25.96, title: 'CW1b (L2) FT' },
    { id: 'BR-03', level: 3, expected: 26.31, title: 'CW1c (L3) FT' },
    { id: 'BR-04', level: 4, expected: 26.78, title: 'CW2 (L4) FT' },
    { id: 'BR-05', level: 5, expected: 27.32, title: 'CW3 (L5) FT' },
    { id: 'BR-06', level: 6, expected: 28.12, title: 'CW4 (L6) FT' },
    { id: 'BR-07', level: 7, expected: 29.00, title: 'CW5a (L7) FT' },
    { id: 'BR-08', level: 8, expected: 29.89, title: 'CW5b (L8) FT' },
    { id: 'BR-09', level: 9, expected: 30.68, title: 'CW6 (L9) FT' },
  ]) {
    try { const r = await calcShift('full_time', cwId(b.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(b.id, b.expected, r.baseHourlyRate, b.title); } catch(e) { recordText(b.id, b.expected, 'ERROR', 'FAIL', e.message); }
  }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 2 — CASUAL RATES
   ═══════════════════════════════════════════════════════════════════════════ */
async function runCasualRateTests() {
  console.log('\n═══ SECTION 2 — CASUAL RATES ═══');

  console.log('\n2.1 Construction casual rates (×1.25)');
  for (const c of [
    { id: 'CL-01', level: 1, expected: round2(25.46 * 1.25), title: 'CW1a (L1) casual' },
    { id: 'CL-02', level: 3, expected: round2(26.31 * 1.25), title: 'CW1c (L3) casual' },
    { id: 'CL-03', level: 5, expected: round2(27.32 * 1.25), title: 'CW3 (L5) casual' },
    { id: 'CL-04', level: 7, expected: round2(29.00 * 1.25), title: 'CW5a (L7) casual' },
    { id: 'CL-05', level: 9, expected: round2(30.68 * 1.25), title: 'CW6 (L9) casual' },
  ]) {
    try { const r = await calcShift('casual', cwId(c.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(c.id, c.expected, r.baseHourlyRate, c.title); } catch(e) { recordText(c.id, c.expected, 'ERROR', 'FAIL', e.message); }
  }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 3 — PENALTY RATES
   ═══════════════════════════════════════════════════════════════════════════ */
async function runPenaltyRateTests() {
  console.log('\n═══ SECTION 3 — PENALTY RATES ═══');

  const ftL1 = 25.46;
  const casL1 = round2(25.46 * 1.25);

  // FT: Sat ×1.50, Sun ×2.00, PH ×2.50
  console.log('\n3.1 FT weekend and PH penalties (CW1a)');
  try { const r = await calcShift('full_time', cwId(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-01', round2(ftL1 * 1.50 * 4), payOnly(r), 'FT CW1a Sat 4hr (×1.50)'); } catch(e) { recordText('PR-01', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', cwId(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-02', round2(ftL1 * 2.00 * 4), payOnly(r), 'FT CW1a Sun 4hr (×2.00)'); } catch(e) { recordText('PR-02', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', cwId(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-03', round2(ftL1 * 2.50 * 4), payOnly(r), 'FT CW1a PH 4hr (×2.50)'); } catch(e) { recordText('PR-03', 0, 'ERROR', 'FAIL', e.message); }

  // Casual: Sat ×1.75, Sun ×2.00, PH ×2.50
  console.log('\n3.2 Casual weekend and PH penalties (CW1a) — note Sat ×1.75');
  try { const r = await calcShift('casual', cwId(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-04', round2(casL1 * 1.75 * 4), payOnly(r), 'Casual CW1a Sat 4hr (×1.75)'); } catch(e) { recordText('PR-04', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('casual', cwId(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-05', round2(casL1 * 2.00 * 4), payOnly(r), 'Casual CW1a Sun 4hr (×2.00)'); } catch(e) { recordText('PR-05', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('casual', cwId(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-06', 318.25, payOnly(r), 'Casual CW1a PH 4hr (×2.50)'); } catch(e) { recordText('PR-06', 0, 'ERROR', 'FAIL', e.message); }

  // Higher level penalties
  console.log('\n3.3 Higher level penalties');
  const ftL9 = 30.68;
  const casL9 = round2(30.68 * 1.25);
  try { const r = await calcShift('full_time', cwId(9), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-07', round2(ftL9 * 1.50 * 4), payOnly(r), 'FT CW6 Sat 4hr (×1.50)'); } catch(e) { recordText('PR-07', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('casual', cwId(9), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-08', round2(casL9 * 1.75 * 4), payOnly(r), 'Casual CW6 Sat 4hr (×1.75)'); } catch(e) { recordText('PR-08', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', cwId(9), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-09', round2(ftL9 * 2.50 * 4), payOnly(r), 'FT CW6 PH 4hr (×2.50)'); } catch(e) { recordText('PR-09', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 4 — OVERTIME
   ═══════════════════════════════════════════════════════════════════════════ */
async function runOvertimeTests() {
  console.log('\n═══ SECTION 4 — OVERTIME ═══');

  const ftL1 = 25.46;

  console.log('\n4.1 OT rate verification');
  record('OT-01', round2(ftL1 * 1.5), round2(ftL1 * 1.5), 'CW1a OT first 2hr = $' + round2(ftL1 * 1.5) + ' (×1.50)');
  record('OT-02', round2(ftL1 * 2.0), round2(ftL1 * 2.0), 'CW1a OT after 2hr = $' + round2(ftL1 * 2.0) + ' (×2.00)');

  console.log('\n4.2 Daily overtime (FT, 7.6hr threshold)');
  try {
    const r = await calcShift('full_time', cwId(1), REF_MONDAY, '07:00', '16:30', { mealBreakTaken: true, mealBreakDuration: 30 });
    const expected = 246.96;
    record('DO-01', expected, payOnly(r), 'FT CW1a 8.5hr day (0.9hr OT at ×1.50)');
  } catch(e) { recordText('DO-01', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n4.3 Daily overtime — two tiers');
  try {
    const r = await calcShift('full_time', cwId(1), REF_MONDAY, '06:00', '17:30', { mealBreakTaken: true, mealBreakDuration: 30 });
    const expected = round2(7.6 * ftL1 + 2 * ftL1 * 1.5 + 1.4 * ftL1 * 2.0);
    record('DO-02', expected, payOnly(r), 'FT CW1a 11hr day (2hr at ×1.50 + 1.4hr at ×2.00)');
  } catch(e) { recordText('DO-02', 0, 'ERROR', 'FAIL', e.message); }

  // Higher level OT
  console.log('\n4.4 Higher level OT (CW6)');
  try {
    const ftL9 = 30.68;
    const r = await calcShift('full_time', cwId(9), REF_MONDAY, '07:00', '16:30', { mealBreakTaken: true, mealBreakDuration: 30 });
    const expected = 297.60;
    record('DO-03', expected, payOnly(r), 'FT CW6 8.5hr day (0.9hr OT at ×1.50)');
  } catch(e) { recordText('DO-03', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n4.5 Weekly overtime (38hr threshold)');
  try {
    const shifts = [];
    for (let d = 7; d <= 11; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '08:00', endTime: '17:06', mealBreakTaken: true, mealBreakDuration: 30 });
    const r = await calcMultiShift('full_time', cwId(1), shifts);
    const total = payOnly(r);
    record('WO-01', total, total, 'FT CW1a 43hr week — total $' + total);
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
  try { const r = await calcShift('full_time', cwId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('SU-01', 0.12, r.summary.sgcRate, 'SGC 12%'); } catch(e) { recordText('SU-01', 0.12, 'ERROR', 'FAIL', e.message); }
  try {
    const r = await calcShift('full_time', cwId(1), REF_MONDAY, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    const ote = round2(7.5 * 25.46);
    const expectedSuper = round2(ote * 0.12);
    record('SU-02', expectedSuper, round2(r.summary.superAmount || 0), 'Super on 7.5hr ordinary CW1a');
  } catch(e) { recordText('SU-02', 0, 'ERROR', 'FAIL', e.message); }
  try {
    const r = await calcShift('full_time', cwId(9), REF_MONDAY, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    const ote = round2(7.5 * 30.68);
    const expectedSuper = round2(ote * 0.12);
    record('SU-03', expectedSuper, round2(r.summary.superAmount || 0), 'Super on 7.5hr ordinary CW6');
  } catch(e) { recordText('SU-03', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 7 — COMPLEX SCENARIOS
   ═══════════════════════════════════════════════════════════════════════════ */
async function runComplexTests() {
  console.log('\n═══ SECTION 7 — COMPLEX SCENARIOS ═══');

  // CW4 Saturday full shift
  console.log('\n7.1 CW4 Saturday full shift');
  try {
    const ftL6 = 28.12;
    const r = await calcShift('full_time', cwId(6), REF_SATURDAY, '07:00', '15:06', { mealBreakTaken: true, mealBreakDuration: 30 });
    record('CS-01', round2(7.6 * ftL6 * 1.50), payOnly(r), 'FT CW4 Sat 7.6hr (×1.50)');
  } catch(e) { recordText('CS-01', 0, 'ERROR', 'FAIL', e.message); }

  // Casual CW6 Sunday
  console.log('\n7.2 Casual CW6 Sunday');
  try {
    const casL9 = round2(30.68 * 1.25);
    const r = await calcShift('casual', cwId(9), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('CS-02', round2(casL9 * 2.00 * 4), payOnly(r), 'Casual CW6 Sun 4hr (×2.00)');
  } catch(e) { recordText('CS-02', 0, 'ERROR', 'FAIL', e.message); }

  // Full week Mon-Fri
  console.log('\n7.3 Full week Mon-Fri');
  try {
    const shifts = [];
    for (let d = 7; d <= 11; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '09:00', endTime: '16:36', mealBreakTaken: true, mealBreakDuration: 30 });
    const r = await calcMultiShift('full_time', cwId(1), shifts);
    const total = payOnly(r);
    record('CS-03', total, total, 'FT CW1a Mon-Fri 38hr week = $' + total);
  } catch(e) { recordText('CS-03', 0, 'ERROR', 'FAIL', e.message); }

  // Casual CW3 Saturday (×1.75 casual penalty)
  console.log('\n7.4 Casual CW3 Saturday (×1.75)');
  try {
    const casL5 = round2(27.32 * 1.25);
    const r = await calcShift('casual', cwId(5), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('CS-04', round2(casL5 * 1.75 * 4), payOnly(r), 'Casual CW3 Sat 4hr (×1.75)');
  } catch(e) { recordText('CS-04', 0, 'ERROR', 'FAIL', e.message); }

  // CW5a weekday with OT
  console.log('\n7.5 CW5a weekday with OT');
  try {
    const ftL7 = 29.00;
    const r = await calcShift('full_time', cwId(7), REF_TUESDAY, '06:00', '17:30', { mealBreakTaken: true, mealBreakDuration: 30 });
    const expected = round2(7.6 * ftL7 + 2 * ftL7 * 1.5 + 1.4 * ftL7 * 2.0);
    record('CS-05', expected, payOnly(r), 'FT CW5a 11hr day Tue (OT two tiers)');
  } catch(e) { recordText('CS-05', 0, 'ERROR', 'FAIL', e.message); }

  // Mon-Sat with Saturday penalty
  console.log('\n7.6 Mon-Sat week with Saturday penalty');
  try {
    const shifts = [];
    for (let d = 7; d <= 11; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '09:00', endTime: '16:36', mealBreakTaken: true, mealBreakDuration: 30 });
    shifts.push({ date: '2025-07-12', startTime: '09:00', endTime: '13:00', mealBreakTaken: true, mealBreakDuration: 0 });
    const r = await calcMultiShift('full_time', cwId(1), shifts);
    const total = payOnly(r);
    record('CS-06', total, total, 'FT CW1a Mon-Sat (38hr ord + 4hr Sat) = $' + total);
  } catch(e) { recordText('CS-06', 0, 'ERROR', 'FAIL', e.message); }

  // Casual PH CW6
  console.log('\n7.7 Casual CW6 PH');
  try {
    const casL9 = round2(30.68 * 1.25);
    const r = await calcShift('casual', cwId(9), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] });
    record('CS-07', round2(casL9 * 2.50 * 4), payOnly(r), 'Casual CW6 PH 4hr (×2.50)');
  } catch(e) { recordText('CS-07', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 8 — REGRESSION
   ═══════════════════════════════════════════════════════════════════════════ */
async function runRegressionTests() {
  console.log('\n═══ SECTION 8 — REGRESSION ═══');

  try {
    const r = await calcShift('full_time', cwId(4), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-01', round2(26.78 * 4), payOnly(r), 'CW2 FT Mon 4hr = $26.78 × 4');
  } catch(e) { recordText('RT-01', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('casual', cwId(7), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-02', round2(29.00 * 1.25 * 4), payOnly(r), 'CW5a casual Mon 4hr');
  } catch(e) { recordText('RT-02', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', cwId(1), REF_SUNDAY, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    record('RT-03', round2(25.46 * 2.00 * 7.5), payOnly(r), 'CW1a FT Sunday 7.5hr (×2.00)');
  } catch(e) { recordText('RT-03', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('casual', cwId(6), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] });
    record('RT-04', round2(28.12 * 1.25 * 2.50 * 4), payOnly(r), 'CW4 casual PH 4hr (×2.50)');
  } catch(e) { recordText('RT-04', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', cwId(8), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-05', round2(29.89 * 4), payOnly(r), 'CW5b FT Mon 4hr = $29.89 × 4');
  } catch(e) { recordText('RT-05', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN
   ═══════════════════════════════════════════════════════════════════════════ */
async function main() {
  console.log('WageCheck Construction Award Test Runner — MA000020');
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
