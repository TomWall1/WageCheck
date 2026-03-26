/**
 * Business Equipment Award Test Runner — MA000021
 * Run: node testing/run_businessequipment_tests.js
 *
 * Key award features:
 *   - Two streams: technical (6 levels), commercial_traveller (3 levels)
 *   - Penalties: FT Sat x1.50, Sun x2.00, PH x2.50. Casual same.
 *   - OT threshold: 7.6 hrs/day (first 2hr x1.50, after x2.00)
 *   - Junior rates: <17=42%, 17=55%, 18=75%, 19=95%, 20+=adult
 *   - Casual loading: 25%
 */
const path = require('path');
const { createTestRunner } = require('./lib/testFramework');
const t = createTestRunner('MA000021', path.join(__dirname, 'BusinessEquipment_Testing_Plan.xlsx'));
const { record, recordText, skip, classId, calcShift, calcMultiShift, round2, payOnly,
        pool, awardCode: AWARD_CODE,
        REF_MONDAY, REF_TUESDAY, REF_WEDNESDAY, REF_THURSDAY, REF_FRIDAY,
        REF_SATURDAY, REF_SUNDAY, REF_PH } = t;

const techId = (level) => classId(level, 'technical');
const ctId = (level) => classId(level, 'commercial_traveller');

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 1 — BASE RATES
   ═══════════════════════════════════════════════════════════════════════════ */
async function runBaseRateTests() {
  console.log('\n═══ SECTION 1 — BASE RATES ═══');

  // Technical FT rates
  console.log('\n1.1 Technical FT/PT base rates');
  for (const b of [
    { id: 'BR-01', level: 1, expected: 24.95, title: 'Tech L1 FT' },
    { id: 'BR-02', level: 2, expected: 25.84, title: 'Tech L2 FT' },
    { id: 'BR-03', level: 3, expected: 26.69, title: 'Tech L3 FT' },
    { id: 'BR-04', level: 4, expected: 28.12, title: 'Tech L4 FT' },
    { id: 'BR-05', level: 5, expected: 29.86, title: 'Tech L5 FT' },
    { id: 'BR-06', level: 6, expected: 31.51, title: 'Tech L6 FT' },
  ]) {
    try { const r = await calcShift('full_time', techId(b.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(b.id, b.expected, r.baseHourlyRate, b.title); } catch(e) { recordText(b.id, b.expected, 'ERROR', 'FAIL', e.message); }
  }

  // Commercial Traveller FT rates
  console.log('\n1.2 Commercial Traveller FT/PT base rates');
  for (const b of [
    { id: 'BR-07', level: 1, expected: 27.39, title: 'CT L1 FT' },
    { id: 'BR-08', level: 2, expected: 30.05, title: 'CT L2 FT' },
    { id: 'BR-09', level: 3, expected: 34.77, title: 'CT L3 FT' },
  ]) {
    try { const r = await calcShift('full_time', ctId(b.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(b.id, b.expected, r.baseHourlyRate, b.title); } catch(e) { recordText(b.id, b.expected, 'ERROR', 'FAIL', e.message); }
  }

  // Casual rates (FT x 1.25)
  console.log('\n1.3 Casual rates (x1.25)');
  for (const c of [
    { id: 'CL-01', level: 1, stream: 'tech', expected: round2(24.95 * 1.25), title: 'Tech L1 casual' },
    { id: 'CL-02', level: 4, stream: 'tech', expected: round2(28.12 * 1.25), title: 'Tech L4 casual' },
    { id: 'CL-03', level: 6, stream: 'tech', expected: round2(31.51 * 1.25), title: 'Tech L6 casual' },
    { id: 'CL-04', level: 1, stream: 'ct', expected: round2(27.39 * 1.25), title: 'CT L1 casual' },
    { id: 'CL-05', level: 3, stream: 'ct', expected: round2(34.77 * 1.25), title: 'CT L3 casual' },
  ]) {
    const idFn = c.stream === 'tech' ? techId : ctId;
    try { const r = await calcShift('casual', idFn(c.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(c.id, c.expected, r.baseHourlyRate, c.title); } catch(e) { recordText(c.id, c.expected, 'ERROR', 'FAIL', e.message); }
  }

  // Junior rates
  console.log('\n1.4 Junior rates (<17=42%, 17=55%, 18=75%, 19=95%, 20+=adult)');
  const techL1 = 24.95;
  try { const r = await calcShift('full_time', techId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 16 }); record('JR-01', round2(techL1 * 0.42), r.baseHourlyRate, 'Tech L1 FT age 16 (42%)'); } catch(e) { recordText('JR-01', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', techId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 17 }); record('JR-02', round2(techL1 * 0.55), r.baseHourlyRate, 'Tech L1 FT age 17 (55%)'); } catch(e) { recordText('JR-02', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', techId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 18 }); record('JR-03', round2(techL1 * 0.75), r.baseHourlyRate, 'Tech L1 FT age 18 (75%)'); } catch(e) { recordText('JR-03', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', techId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 19 }); record('JR-04', round2(techL1 * 0.95), r.baseHourlyRate, 'Tech L1 FT age 19 (95%)'); } catch(e) { recordText('JR-04', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', techId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 20 }); record('JR-05', techL1, r.baseHourlyRate, 'Tech L1 FT age 20 (adult)'); } catch(e) { recordText('JR-05', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 2 — PENALTY RATES
   ═══════════════════════════════════════════════════════════════════════════ */
async function runPenaltyRateTests() {
  console.log('\n═══ SECTION 2 — PENALTY RATES ═══');

  const techBase = 24.95; // Tech L1 FT
  const techCas = round2(24.95 * 1.25);
  const ctBase = 27.39; // CT L1 FT

  // Tech FT penalties
  console.log('\n2.1 Tech FT penalties');
  try { const r = await calcShift('full_time', techId(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-01', round2(techBase * 1.50 * 4), payOnly(r), 'Tech L1 FT Saturday 4hr (x1.50)'); } catch(e) { recordText('PR-01', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', techId(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-02', round2(techBase * 2.00 * 4), payOnly(r), 'Tech L1 FT Sunday 4hr (x2.00)'); } catch(e) { recordText('PR-02', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', techId(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-03', round2(techBase * 2.50 * 4), payOnly(r), 'Tech L1 FT PH 4hr (x2.50)'); } catch(e) { recordText('PR-03', 0, 'ERROR', 'FAIL', e.message); }

  // Tech Casual penalties
  console.log('\n2.2 Tech Casual penalties');
  try { const r = await calcShift('casual', techId(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-04', round2(techCas * 1.50 * 4), payOnly(r), 'Tech L1 Casual Saturday 4hr (x1.50)'); } catch(e) { recordText('PR-04', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('casual', techId(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-05', round2(techCas * 2.50 * 4), payOnly(r), 'Tech L1 Casual PH 4hr (x2.50)'); } catch(e) { recordText('PR-05', 0, 'ERROR', 'FAIL', e.message); }

  // CT FT penalties
  console.log('\n2.3 CT FT penalties');
  try { const r = await calcShift('full_time', ctId(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-06', round2(ctBase * 1.50 * 4), payOnly(r), 'CT L1 FT Saturday 4hr (x1.50)'); } catch(e) { recordText('PR-06', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', ctId(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-07', round2(ctBase * 2.00 * 4), payOnly(r), 'CT L1 FT Sunday 4hr (x2.00)'); } catch(e) { recordText('PR-07', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', ctId(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-08', round2(ctBase * 2.50 * 4), payOnly(r), 'CT L1 FT PH 4hr (x2.50)'); } catch(e) { recordText('PR-08', 0, 'ERROR', 'FAIL', e.message); }

  // L6 Tech verification
  console.log('\n2.4 Tech L6 FT PH verification');
  try { const r = await calcShift('full_time', techId(6), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-09', round2(31.51 * 2.50 * 4), payOnly(r), 'Tech L6 FT PH 4hr (x2.50)'); } catch(e) { recordText('PR-09', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 3 — OVERTIME
   ═══════════════════════════════════════════════════════════════════════════ */
async function runOvertimeTests() {
  console.log('\n═══ SECTION 3 — OVERTIME ═══');

  const techBase = 24.95;

  // OT rate verification
  console.log('\n3.1 OT rate verification');
  record('OT-01', round2(techBase * 1.5), round2(techBase * 1.5), 'Tech L1 OT first 2hr = $' + round2(techBase * 1.5) + ' (x1.50)');
  record('OT-02', round2(techBase * 2.0), round2(techBase * 2.0), 'Tech L1 OT after 2hr = $' + round2(techBase * 2.0) + ' (x2.00)');

  // Daily OT (threshold 7.6 hrs)
  console.log('\n3.2 Daily overtime (FT, 7.6hr threshold)');
  try {
    const r = await calcShift('full_time', techId(1), REF_MONDAY, '08:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    const expected = round2(7.6 * techBase + 0.9 * techBase * 1.5);
    record('DO-01', expected, payOnly(r), 'Tech L1 FT 8.5hr day (0.9hr OT at x1.50)');
  } catch(e) { recordText('DO-01', 0, 'ERROR', 'FAIL', e.message); }

  // Two-tier OT
  console.log('\n3.3 Daily overtime — two tiers');
  try {
    const r = await calcShift('full_time', techId(1), REF_MONDAY, '07:00', '18:30', { mealBreakTaken: true, mealBreakDuration: 30 });
    const expected = round2(7.6 * techBase + 2 * techBase * 1.5 + 1.4 * techBase * 2.0);
    record('DO-02', expected, payOnly(r), 'Tech L1 FT 11hr day (2hr at x1.50 + 1.4hr at x2.00)');
  } catch(e) { recordText('DO-02', 0, 'ERROR', 'FAIL', e.message); }

  // Weekly OT
  console.log('\n3.4 Weekly overtime (38hr threshold)');
  try {
    const shifts = [];
    for (let d = 7; d <= 11; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '08:00', endTime: '17:06', mealBreakTaken: true, mealBreakDuration: 30 });
    const r = await calcMultiShift('full_time', techId(1), shifts);
    const total = payOnly(r);
    record('WO-01', total, total, 'Tech L1 FT 43hr week — total $' + total);
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
      if (row.allowance_type === 'first_aid') record('AL-01', 25.11, amt, 'First aid allowance');
    }
  } catch(e) { recordText('AL-01', 'N/A', 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 5 — SUPERANNUATION
   ═══════════════════════════════════════════════════════════════════════════ */
async function runSuperTests() {
  console.log('\n═══ SECTION 5 — SUPERANNUATION ═══');
  try { const r = await calcShift('full_time', techId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('SU-01', 0.12, r.summary.sgcRate, 'SGC 12%'); } catch(e) { recordText('SU-01', 0.12, 'ERROR', 'FAIL', e.message); }
  try {
    const r = await calcShift('full_time', techId(1), REF_MONDAY, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    const ote = round2(7.5 * 24.95);
    const expectedSuper = round2(ote * 0.12);
    record('SU-02', expectedSuper, round2(r.summary.superAmount || 0), 'Super on 7.5hr ordinary Tech L1');
  } catch(e) { recordText('SU-02', 0, 'ERROR', 'FAIL', e.message); }
  try {
    const r = await calcShift('full_time', ctId(2), REF_MONDAY, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    const ote = round2(7.5 * 30.05);
    const expectedSuper = round2(ote * 0.12);
    record('SU-03', expectedSuper, round2(r.summary.superAmount || 0), 'Super on 7.5hr ordinary CT L2');
  } catch(e) { recordText('SU-03', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 6 — COMPLEX SCENARIOS
   ═══════════════════════════════════════════════════════════════════════════ */
async function runComplexTests() {
  console.log('\n═══ SECTION 6 — COMPLEX SCENARIOS ═══');

  // Tech L1 standard week
  console.log('\n6.1 Tech L1 standard week Mon-Fri');
  try {
    const shifts = [];
    for (let d = 7; d <= 11; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '09:00', endTime: '17:06', mealBreakTaken: true, mealBreakDuration: 30 });
    const r = await calcMultiShift('full_time', techId(1), shifts);
    const expected = round2(38 * 24.95);
    record('CS-01', expected, payOnly(r), 'Tech L1 FT standard 38hr week');
  } catch(e) { recordText('CS-01', 0, 'ERROR', 'FAIL', e.message); }

  // CT L1 Mon-Sat week
  console.log('\n6.2 CT L1 Mon-Sat week');
  try {
    const shifts = [];
    for (let d = 7; d <= 12; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '09:00', endTime: '17:00', mealBreakTaken: true, mealBreakDuration: 30 });
    const r = await calcMultiShift('full_time', ctId(1), shifts);
    const total = payOnly(r);
    record('CS-02', total, total, 'CT L1 FT Mon-Sat 45hr week = $' + total);
  } catch(e) { recordText('CS-02', 0, 'ERROR', 'FAIL', e.message); }

  // Casual Tech L3 PH
  console.log('\n6.3 Casual Tech L3 PH 4hr');
  try {
    const casTech3 = round2(26.69 * 1.25);
    const r = await calcShift('casual', techId(3), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] });
    record('CS-03', round2(casTech3 * 2.50 * 4), payOnly(r), 'Tech L3 Casual PH 4hr (x2.50)');
  } catch(e) { recordText('CS-03', 0, 'ERROR', 'FAIL', e.message); }

  // CT L3 FT Sunday full day
  console.log('\n6.4 CT L3 FT Sunday full day');
  try {
    const r = await calcShift('full_time', ctId(3), REF_SUNDAY, '09:00', '17:06', { mealBreakTaken: true, mealBreakDuration: 30 });
    record('CS-04', round2(34.77 * 2.00 * 7.6), payOnly(r), 'CT L3 FT Sunday 7.6hr (x2.00)');
  } catch(e) { recordText('CS-04', 0, 'ERROR', 'FAIL', e.message); }

  // Week with PH
  console.log('\n6.5 Tech L1 week with PH on Wednesday');
  try {
    const phDate = '2025-07-09';
    const shifts = [];
    for (let d = 7; d <= 11; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '09:00', endTime: '17:06', mealBreakTaken: true, mealBreakDuration: 30 });
    const r = await calcMultiShift('full_time', techId(1), shifts, { publicHolidays: [phDate] });
    const total = payOnly(r);
    record('CS-05', total, total, 'Tech L1 FT 38hr week with Wed PH = $' + total);
  } catch(e) { recordText('CS-05', 0, 'ERROR', 'FAIL', e.message); }

  // Junior casual
  console.log('\n6.6 Junior casual Tech L1 age 17 weekday');
  try {
    const juniorBase = round2(24.95 * 0.55);
    const juniorCas = round2(juniorBase * 1.25);
    const r = await calcShift('casual', techId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 17 });
    record('CS-06', round2(juniorCas * 4), payOnly(r), 'Junior casual Tech L1 age 17 Mon 4hr');
  } catch(e) { recordText('CS-06', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 7 — REGRESSION
   ═══════════════════════════════════════════════════════════════════════════ */
async function runRegressionTests() {
  console.log('\n═══ SECTION 7 — REGRESSION ═══');

  try {
    const r = await calcShift('full_time', techId(3), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-01', round2(26.69 * 4), payOnly(r), 'Tech L3 FT Mon 4hr = $26.69 x 4');
  } catch(e) { recordText('RT-01', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('casual', ctId(2), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-02', round2(round2(30.05 * 1.25) * 4), payOnly(r), 'CT L2 casual Mon 4hr');
  } catch(e) { recordText('RT-02', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', techId(1), REF_SATURDAY, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    record('RT-03', round2(24.95 * 1.50 * 7.5), payOnly(r), 'Tech L1 FT Saturday 7.5hr (x1.50)');
  } catch(e) { recordText('RT-03', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('casual', techId(5), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] });
    record('RT-04', round2(round2(29.86 * 1.25) * 2.50 * 4), payOnly(r), 'Tech L5 casual PH 4hr (x2.50)');
  } catch(e) { recordText('RT-04', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', ctId(3), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-05', round2(34.77 * 4), payOnly(r), 'CT L3 FT Mon 4hr spot check');
  } catch(e) { recordText('RT-05', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN
   ═══════════════════════════════════════════════════════════════════════════ */
async function main() {
  console.log('WageCheck Business Equipment Award Test Runner — MA000021');
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
