/**
 * State Government Agencies Award Test Runner — MA000121
 * Run: node testing/run_stategovt_tests.js
 *
 * Key award features:
 *   - Five streams: admin (8 levels), technical (4), professional (2), it (2), legal (2)
 *   - Penalties: FT Sat x1.50, Sun x2.00, PH x2.50. Casual same.
 *   - OT threshold: 7.6 hrs/day (first 2hr x1.50, after x2.00)
 *   - No junior rates
 *   - Casual loading: 25%
 */
const path = require('path');
const { createTestRunner } = require('./lib/testFramework');
const t = createTestRunner('MA000121', path.join(__dirname, 'StateGovt_Testing_Plan.xlsx'));
const { record, recordText, skip, classId, calcShift, calcMultiShift, round2, payOnly,
        pool, awardCode: AWARD_CODE,
        REF_MONDAY, REF_TUESDAY, REF_WEDNESDAY, REF_THURSDAY, REF_FRIDAY,
        REF_SATURDAY, REF_SUNDAY, REF_PH } = t;

const admId = (level) => classId(level, 'admin');
const techId = (level) => classId(level, 'technical');
const profId = (level) => classId(level, 'professional');
const itId = (level) => classId(level, 'it');
const legId = (level) => classId(level, 'legal');

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 1 — BASE RATES
   ═══════════════════════════════════════════════════════════════════════════ */
async function runBaseRateTests() {
  console.log('\n═══ SECTION 1 — BASE RATES ═══');

  // Admin FT rates
  console.log('\n1.1 Admin FT/PT base rates');
  for (const b of [
    { id: 'BR-01', level: 1, expected: 25.54, title: 'Admin L1 FT' },
    { id: 'BR-02', level: 2, expected: 28.12, title: 'Admin L2 FT' },
    { id: 'BR-03', level: 3, expected: 31.19, title: 'Admin L3 FT' },
    { id: 'BR-04', level: 4, expected: 34.96, title: 'Admin L4 FT' },
    { id: 'BR-05', level: 5, expected: 38.45, title: 'Admin L5 FT' },
    { id: 'BR-06', level: 6, expected: 43.28, title: 'Admin L6 FT' },
    { id: 'BR-07', level: 7, expected: 52.46, title: 'Admin L7 FT' },
    { id: 'BR-08', level: 8, expected: 60.56, title: 'Admin L8 FT' },
  ]) {
    try { const r = await calcShift('full_time', admId(b.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(b.id, b.expected, r.baseHourlyRate, b.title); } catch(e) { recordText(b.id, b.expected, 'ERROR', 'FAIL', e.message); }
  }

  // Technical FT rates
  console.log('\n1.2 Technical FT/PT base rates');
  for (const b of [
    { id: 'BR-09', level: 1, expected: 25.54, title: 'Tech L1 FT' },
    { id: 'BR-10', level: 2, expected: 28.12, title: 'Tech L2 FT' },
    { id: 'BR-11', level: 3, expected: 31.19, title: 'Tech L3 FT' },
    { id: 'BR-12', level: 4, expected: 34.96, title: 'Tech L4 FT' },
  ]) {
    try { const r = await calcShift('full_time', techId(b.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(b.id, b.expected, r.baseHourlyRate, b.title); } catch(e) { recordText(b.id, b.expected, 'ERROR', 'FAIL', e.message); }
  }

  // Professional FT rates
  console.log('\n1.3 Professional FT/PT base rates');
  for (const b of [
    { id: 'BR-13', level: 1, expected: 28.98, title: 'Prof L1 FT' },
    { id: 'BR-14', level: 2, expected: 34.01, title: 'Prof L2 FT' },
  ]) {
    try { const r = await calcShift('full_time', profId(b.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(b.id, b.expected, r.baseHourlyRate, b.title); } catch(e) { recordText(b.id, b.expected, 'ERROR', 'FAIL', e.message); }
  }

  // IT FT rates
  console.log('\n1.4 IT FT/PT base rates');
  for (const b of [
    { id: 'BR-15', level: 1, expected: 28.12, title: 'IT L1 FT' },
    { id: 'BR-16', level: 2, expected: 34.96, title: 'IT L2 FT' },
  ]) {
    try { const r = await calcShift('full_time', itId(b.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(b.id, b.expected, r.baseHourlyRate, b.title); } catch(e) { recordText(b.id, b.expected, 'ERROR', 'FAIL', e.message); }
  }

  // Legal FT rates
  console.log('\n1.5 Legal FT/PT base rates');
  for (const b of [
    { id: 'BR-17', level: 1, expected: 38.45, title: 'Legal L1 FT' },
    { id: 'BR-18', level: 2, expected: 52.46, title: 'Legal L2 FT' },
  ]) {
    try { const r = await calcShift('full_time', legId(b.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(b.id, b.expected, r.baseHourlyRate, b.title); } catch(e) { recordText(b.id, b.expected, 'ERROR', 'FAIL', e.message); }
  }

  // Casual rates (FT x 1.25)
  console.log('\n1.6 Casual rates (x1.25)');
  for (const c of [
    { id: 'CL-01', fn: admId, level: 1, expected: round2(25.54 * 1.25), title: 'Admin L1 casual' },
    { id: 'CL-02', fn: admId, level: 5, expected: round2(38.45 * 1.25), title: 'Admin L5 casual' },
    { id: 'CL-03', fn: admId, level: 8, expected: round2(60.56 * 1.25), title: 'Admin L8 casual' },
    { id: 'CL-04', fn: techId, level: 4, expected: round2(34.96 * 1.25), title: 'Tech L4 casual' },
    { id: 'CL-05', fn: profId, level: 2, expected: round2(34.01 * 1.25), title: 'Prof L2 casual' },
    { id: 'CL-06', fn: itId, level: 2, expected: round2(34.96 * 1.25), title: 'IT L2 casual' },
    { id: 'CL-07', fn: legId, level: 1, expected: round2(38.45 * 1.25), title: 'Legal L1 casual' },
  ]) {
    try { const r = await calcShift('casual', c.fn(c.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(c.id, c.expected, r.baseHourlyRate, c.title); } catch(e) { recordText(c.id, c.expected, 'ERROR', 'FAIL', e.message); }
  }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 2 — PENALTY RATES
   ═══════════════════════════════════════════════════════════════════════════ */
async function runPenaltyRateTests() {
  console.log('\n═══ SECTION 2 — PENALTY RATES ═══');

  const admBase = 25.54; // Admin L1 FT
  const admCas = round2(25.54 * 1.25);
  const legBase = 38.45; // Legal L1 FT

  // Admin FT penalties
  console.log('\n2.1 Admin FT penalties');
  try { const r = await calcShift('full_time', admId(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-01', round2(admBase * 1.50 * 4), payOnly(r), 'Admin L1 FT Saturday 4hr (x1.50)'); } catch(e) { recordText('PR-01', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', admId(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-02', round2(admBase * 2.00 * 4), payOnly(r), 'Admin L1 FT Sunday 4hr (x2.00)'); } catch(e) { recordText('PR-02', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', admId(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-03', round2(admBase * 2.50 * 4), payOnly(r), 'Admin L1 FT PH 4hr (x2.50)'); } catch(e) { recordText('PR-03', 0, 'ERROR', 'FAIL', e.message); }

  // Admin Casual penalties
  console.log('\n2.2 Admin Casual penalties');
  try { const r = await calcShift('casual', admId(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-04', round2(admCas * 1.50 * 4), payOnly(r), 'Admin L1 Casual Saturday 4hr (x1.50)'); } catch(e) { recordText('PR-04', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('casual', admId(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-05', round2(admCas * 2.00 * 4), payOnly(r), 'Admin L1 Casual Sunday 4hr (x2.00)'); } catch(e) { recordText('PR-05', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('casual', admId(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-06', round2(admCas * 2.50 * 4), payOnly(r), 'Admin L1 Casual PH 4hr (x2.50)'); } catch(e) { recordText('PR-06', 0, 'ERROR', 'FAIL', e.message); }

  // Legal FT penalties
  console.log('\n2.3 Legal FT penalties');
  try { const r = await calcShift('full_time', legId(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-07', round2(legBase * 1.50 * 4), payOnly(r), 'Legal L1 FT Saturday 4hr (x1.50)'); } catch(e) { recordText('PR-07', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', legId(2), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-08', round2(52.46 * 2.50 * 4), payOnly(r), 'Legal L2 FT PH 4hr (x2.50)'); } catch(e) { recordText('PR-08', 0, 'ERROR', 'FAIL', e.message); }

  // Admin L8 verification
  console.log('\n2.4 Admin L8 FT PH verification');
  try { const r = await calcShift('full_time', admId(8), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-09', round2(60.56 * 2.50 * 4), payOnly(r), 'Admin L8 FT PH 4hr (x2.50)'); } catch(e) { recordText('PR-09', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 3 — OVERTIME
   ═══════════════════════════════════════════════════════════════════════════ */
async function runOvertimeTests() {
  console.log('\n═══ SECTION 3 — OVERTIME ═══');

  const admBase = 25.54;

  // OT rate verification
  console.log('\n3.1 OT rate verification');
  record('OT-01', round2(admBase * 1.5), round2(admBase * 1.5), 'Admin L1 OT first 2hr = $' + round2(admBase * 1.5) + ' (x1.50)');
  record('OT-02', round2(admBase * 2.0), round2(admBase * 2.0), 'Admin L1 OT after 2hr = $' + round2(admBase * 2.0) + ' (x2.00)');

  // Daily OT (threshold 7.6 hrs)
  console.log('\n3.2 Daily overtime (FT, 7.6hr threshold)');
  try {
    const r = await calcShift('full_time', admId(1), REF_MONDAY, '08:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    const expected = round2(7.6 * admBase + 0.9 * admBase * 1.5);
    record('DO-01', expected, payOnly(r), 'Admin L1 FT 8.5hr day (0.9hr OT at x1.50)');
  } catch(e) { recordText('DO-01', 0, 'ERROR', 'FAIL', e.message); }

  // Two-tier OT
  console.log('\n3.3 Daily overtime — two tiers');
  try {
    const r = await calcShift('full_time', admId(1), REF_MONDAY, '07:00', '18:30', { mealBreakTaken: true, mealBreakDuration: 30 });
    const expected = round2(7.6 * admBase + 2 * admBase * 1.5 + 1.4 * admBase * 2.0);
    record('DO-02', expected, payOnly(r), 'Admin L1 FT 11hr day (2hr at x1.50 + 1.4hr at x2.00)');
  } catch(e) { recordText('DO-02', 0, 'ERROR', 'FAIL', e.message); }

  // Weekly OT
  console.log('\n3.4 Weekly overtime (38hr threshold)');
  try {
    const shifts = [];
    for (let d = 7; d <= 11; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '08:00', endTime: '17:06', mealBreakTaken: true, mealBreakDuration: 30 });
    const r = await calcMultiShift('full_time', admId(1), shifts);
    const total = payOnly(r);
    record('WO-01', total, total, 'Admin L1 FT 43hr week — total $' + total);
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
      if (row.allowance_type === 'meal') record('AL-01', 22.67, amt, 'Meal allowance');
      if (row.allowance_type === 'first_aid') record('AL-02', 15.12, amt, 'First aid allowance (per week from $786.05/yr)');
      if (row.allowance_type === 'vehicle') record('AL-03', 0.99, amt, 'Vehicle allowance per km');
    }
  } catch(e) { recordText('AL-01', 'N/A', 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 5 — SUPERANNUATION
   ═══════════════════════════════════════════════════════════════════════════ */
async function runSuperTests() {
  console.log('\n═══ SECTION 5 — SUPERANNUATION ═══');
  try { const r = await calcShift('full_time', admId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('SU-01', 0.12, r.summary.sgcRate, 'SGC 12%'); } catch(e) { recordText('SU-01', 0.12, 'ERROR', 'FAIL', e.message); }
  try {
    const r = await calcShift('full_time', admId(1), REF_MONDAY, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    const ote = round2(7.5 * 25.54);
    const expectedSuper = round2(ote * 0.12);
    record('SU-02', expectedSuper, round2(r.summary.superAmount || 0), 'Super on 7.5hr ordinary Admin L1');
  } catch(e) { recordText('SU-02', 0, 'ERROR', 'FAIL', e.message); }
  try {
    const r = await calcShift('full_time', legId(2), REF_MONDAY, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    const ote = round2(7.5 * 52.46);
    const expectedSuper = round2(ote * 0.12);
    record('SU-03', expectedSuper, round2(r.summary.superAmount || 0), 'Super on 7.5hr ordinary Legal L2');
  } catch(e) { recordText('SU-03', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 6 — COMPLEX SCENARIOS
   ═══════════════════════════════════════════════════════════════════════════ */
async function runComplexTests() {
  console.log('\n═══ SECTION 6 — COMPLEX SCENARIOS ═══');

  // Admin L1 standard week
  console.log('\n6.1 Admin L1 standard week Mon-Fri');
  try {
    const shifts = [];
    for (let d = 7; d <= 11; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '09:00', endTime: '17:06', mealBreakTaken: true, mealBreakDuration: 30 });
    const r = await calcMultiShift('full_time', admId(1), shifts);
    const expected = round2(38 * 25.54);
    record('CS-01', expected, payOnly(r), 'Admin L1 FT standard 38hr week');
  } catch(e) { recordText('CS-01', 0, 'ERROR', 'FAIL', e.message); }

  // Admin L1 Mon-Sat week
  console.log('\n6.2 Admin L1 Mon-Sat week');
  try {
    const shifts = [];
    for (let d = 7; d <= 12; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '09:00', endTime: '17:00', mealBreakTaken: true, mealBreakDuration: 30 });
    const r = await calcMultiShift('full_time', admId(1), shifts);
    const total = payOnly(r);
    record('CS-02', total, total, 'Admin L1 FT Mon-Sat 45hr week = $' + total);
  } catch(e) { recordText('CS-02', 0, 'ERROR', 'FAIL', e.message); }

  // Casual IT L2 PH
  console.log('\n6.3 Casual IT L2 PH 4hr');
  try {
    const casIT2 = round2(34.96 * 1.25);
    const r = await calcShift('casual', itId(2), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] });
    record('CS-03', round2(casIT2 * 2.50 * 4), payOnly(r), 'IT L2 Casual PH 4hr (x2.50)');
  } catch(e) { recordText('CS-03', 0, 'ERROR', 'FAIL', e.message); }

  // Prof L1 FT Sunday full day
  console.log('\n6.4 Prof L1 FT Sunday full day');
  try {
    const r = await calcShift('full_time', profId(1), REF_SUNDAY, '09:00', '17:06', { mealBreakTaken: true, mealBreakDuration: 30 });
    record('CS-04', round2(28.98 * 2.00 * 7.6), payOnly(r), 'Prof L1 FT Sunday 7.6hr (x2.00)');
  } catch(e) { recordText('CS-04', 0, 'ERROR', 'FAIL', e.message); }

  // Admin L1 week with PH
  console.log('\n6.5 Admin L1 week with PH on Wednesday');
  try {
    const phDate = '2025-07-09';
    const shifts = [];
    for (let d = 7; d <= 11; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '09:00', endTime: '17:06', mealBreakTaken: true, mealBreakDuration: 30 });
    const r = await calcMultiShift('full_time', admId(1), shifts, { publicHolidays: [phDate] });
    const total = payOnly(r);
    record('CS-05', total, total, 'Admin L1 FT 38hr week with Wed PH = $' + total);
  } catch(e) { recordText('CS-05', 0, 'ERROR', 'FAIL', e.message); }

  // Legal L2 casual Saturday
  console.log('\n6.6 Legal L2 casual Saturday 4hr');
  try {
    const casLeg2 = round2(52.46 * 1.25);
    const r = await calcShift('casual', legId(2), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('CS-06', round2(casLeg2 * 1.50 * 4), payOnly(r), 'Legal L2 Casual Saturday 4hr (x1.50)');
  } catch(e) { recordText('CS-06', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 7 — REGRESSION
   ═══════════════════════════════════════════════════════════════════════════ */
async function runRegressionTests() {
  console.log('\n═══ SECTION 7 — REGRESSION ═══');

  try {
    const r = await calcShift('full_time', admId(3), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-01', round2(31.19 * 4), payOnly(r), 'Admin L3 FT Mon 4hr = $31.19 x 4');
  } catch(e) { recordText('RT-01', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('casual', techId(2), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-02', round2(round2(28.12 * 1.25) * 4), payOnly(r), 'Tech L2 casual Mon 4hr');
  } catch(e) { recordText('RT-02', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', admId(1), REF_SATURDAY, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    record('RT-03', round2(25.54 * 1.50 * 7.5), payOnly(r), 'Admin L1 FT Saturday 7.5hr (x1.50)');
  } catch(e) { recordText('RT-03', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('casual', profId(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] });
    record('RT-04', round2(round2(28.98 * 1.25) * 2.50 * 4), payOnly(r), 'Prof L1 casual PH 4hr (x2.50)');
  } catch(e) { recordText('RT-04', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', itId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-05', round2(28.12 * 4), payOnly(r), 'IT L1 FT Mon 4hr spot check');
  } catch(e) { recordText('RT-05', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', legId(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-06', round2(38.45 * 2.00 * 4), payOnly(r), 'Legal L1 FT Sunday 4hr (x2.00)');
  } catch(e) { recordText('RT-06', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN
   ═══════════════════════════════════════════════════════════════════════════ */
async function main() {
  console.log('WageCheck State Government Agencies Award Test Runner — MA000121');
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
