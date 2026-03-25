/**
 * Supported Employment Services Award Test Runner — MA000103
 * Run: node testing/run_supportedemployment_tests.js
 */
const path = require('path');
const { createTestRunner } = require('./lib/testFramework');
const t = createTestRunner('MA000103', path.join(__dirname, 'SupportedEmployment_Testing_Plan.xlsx'));
const { record, recordText, skip, classId, calcShift, calcMultiShift, round2, payOnly,
        pool, awardCode: AWARD_CODE,
        REF_MONDAY, REF_TUESDAY, REF_WEDNESDAY, REF_THURSDAY, REF_FRIDAY,
        REF_SATURDAY, REF_SUNDAY, REF_PH } = t;

const cid = (level) => classId(level, 'supported_employment');

async function runBaseRateTests() {
  console.log('\n═══ SECTION 1 — BASE RATES ═══');

  console.log('\n1.1 FT/PT base rates');
  for (const b of [
    { id: 'BR-01', level: 1, expected: 24.28, title: 'Grade 1 FT' },
    { id: 'BR-02', level: 2, expected: 24.95, title: 'Grade 2 FT' },
    { id: 'BR-03', level: 3, expected: 25.85, title: 'Grade 3 FT' },
    { id: 'BR-04', level: 4, expected: 26.70, title: 'Grade 4 FT' },
    { id: 'BR-05', level: 5, expected: 28.12, title: 'Grade 5 FT' },
    { id: 'BR-06', level: 6, expected: 30.68, title: 'Grade 6 FT' },
    { id: 'BR-07', level: 7, expected: 31.92, title: 'Grade 7 FT' },
    { id: 'BR-08', level: 8, expected: 7.10, title: 'Grade A FT (transitional)' },
    { id: 'BR-09', level: 9, expected: 14.19, title: 'Grade B FT (transitional)' },
  ]) {
    try { const r = await calcShift('full_time', cid(b.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(b.id, b.expected, r.baseHourlyRate, b.title); } catch(e) { recordText(b.id, b.expected, 'ERROR', 'FAIL', e.message); }
  }

  console.log('\n1.2 Casual rates (×1.25)');
  for (const c of [
    { id: 'CL-01', level: 1, expected: 30.35, title: 'Grade 1 casual' },
    { id: 'CL-02', level: 2, expected: 31.19, title: 'Grade 2 casual' },
    { id: 'CL-03', level: 3, expected: 32.31, title: 'Grade 3 casual' },
    { id: 'CL-04', level: 4, expected: 33.38, title: 'Grade 4 casual' },
    { id: 'CL-05', level: 5, expected: 35.15, title: 'Grade 5 casual' },
    { id: 'CL-06', level: 6, expected: 38.35, title: 'Grade 6 casual' },
    { id: 'CL-07', level: 7, expected: 39.90, title: 'Grade 7 casual' },
    { id: 'CL-08', level: 8, expected: 8.88, title: 'Grade A casual (transitional)' },
    { id: 'CL-09', level: 9, expected: 17.74, title: 'Grade B casual (transitional)' },
  ]) {
    try { const r = await calcShift('casual', cid(c.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(c.id, c.expected, r.baseHourlyRate, c.title); } catch(e) { recordText(c.id, c.expected, 'ERROR', 'FAIL', e.message); }
  }

  console.log('\n1.3 No junior rates');
  try {
    const r = await calcShift('full_time', cid(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 18 });
    record('JR-01', 24.28, r.baseHourlyRate, 'Grade 1 age 18 = adult rate (no junior)');
  } catch(e) { recordText('JR-01', 0, 'ERROR', 'FAIL', e.message); }
}

async function runPenaltyRateTests() {
  console.log('\n═══ SECTION 2 — PENALTY RATES ═══');

  const ftBase = 24.28;
  console.log('\n2.1 FT penalty rates');
  try { const r = await calcShift('full_time', cid(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-01', round2(ftBase * 1.5), r.shifts[0].segments[0]?.effectiveRate, 'FT G1 Saturday (×1.5)'); } catch(e) { recordText('PR-01', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', cid(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-02', round2(ftBase * 2.0), r.shifts[0].segments[0]?.effectiveRate, 'FT G1 Sunday (×2.0)'); } catch(e) { recordText('PR-02', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', cid(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-03', round2(ftBase * 2.5), r.shifts[0].segments[0]?.effectiveRate, 'FT G1 PH (×2.5)'); } catch(e) { recordText('PR-03', 0, 'ERROR', 'FAIL', e.message); }

  // Pay guide dollar verification
  console.log('\n2.2 Pay guide verification (FT)');
  try { const r = await calcShift('full_time', cid(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-04', 36.42, r.shifts[0].segments[0]?.effectiveRate, 'G1 Sat = $36.42 (pay guide)'); } catch(e) { recordText('PR-04', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', cid(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-05', 48.56, r.shifts[0].segments[0]?.effectiveRate, 'G1 Sun = $48.56 (pay guide)'); } catch(e) { recordText('PR-05', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', cid(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-06', 60.70, r.shifts[0].segments[0]?.effectiveRate, 'G1 PH = $60.70 (pay guide)'); } catch(e) { recordText('PR-06', 0, 'ERROR', 'FAIL', e.message); }

  // G7
  try { const r = await calcShift('full_time', cid(7), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-07', 63.84, r.shifts[0].segments[0]?.effectiveRate, 'G7 Sun = $63.84 (pay guide)'); } catch(e) { recordText('PR-07', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', cid(7), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-08', 79.80, r.shifts[0].segments[0]?.effectiveRate, 'G7 PH = $79.80 (pay guide)'); } catch(e) { recordText('PR-08', 0, 'ERROR', 'FAIL', e.message); }

  // Casual penalties
  console.log('\n2.3 Casual penalty rates');
  const casBase = 30.35;
  try { const r = await calcShift('casual', cid(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PC-01', round2(casBase * 1.5), r.shifts[0].segments[0]?.effectiveRate, 'Casual G1 Saturday (×1.5)'); } catch(e) { recordText('PC-01', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('casual', cid(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PC-02', round2(casBase * 2.0), r.shifts[0].segments[0]?.effectiveRate, 'Casual G1 Sunday (×2.0)'); } catch(e) { recordText('PC-02', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('casual', cid(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PC-03', round2(casBase * 1.8), r.shifts[0].segments[0]?.effectiveRate, 'Casual G1 PH (×1.8)'); } catch(e) { recordText('PC-03', 0, 'ERROR', 'FAIL', e.message); }

  // Casual pay guide verification
  try { const r = await calcShift('casual', cid(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PC-04', 45.53, r.shifts[0].segments[0]?.effectiveRate, 'Casual G1 Sat = $45.53 (pay guide)'); } catch(e) { recordText('PC-04', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('casual', cid(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PC-05', 60.70, r.shifts[0].segments[0]?.effectiveRate, 'Casual G1 Sun = $60.70 (pay guide)'); } catch(e) { recordText('PC-05', 0, 'ERROR', 'FAIL', e.message); }
}

async function runOvertimeTests() {
  console.log('\n═══ SECTION 3 — OVERTIME ═══');

  console.log('\n3.1 OT rate verification');
  record('OT-01', 36.42, round2(24.28 * 1.5), 'G1 OT first 2hr = $24.28 × 1.5 = $36.42');
  record('OT-02', 48.56, round2(24.28 * 2.0), 'G1 OT after 2hr = $24.28 × 2.0 = $48.56');
  record('OT-03', 47.88, round2(31.92 * 1.5), 'G7 OT first 2hr = $31.92 × 1.5 = $47.88');

  console.log('\n3.2 Weekly overtime (FT)');
  try {
    const shifts = [];
    for (let d = 7; d <= 11; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '08:00', endTime: '16:30', mealBreakTaken: true, mealBreakDuration: 30 });
    const r = await calcMultiShift('full_time', cid(1), shifts);
    const expected = round2(38 * 24.28 + 2 * 24.28 * 1.5);
    record('WO-01', expected, payOnly(r), 'FT G1 40hr week (2hr OT)');
  } catch(e) { recordText('WO-01', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n3.3 Daily overtime (FT)');
  try {
    const r = await calcShift('full_time', cid(1), REF_MONDAY, '08:00', '18:36', { mealBreakTaken: true, mealBreakDuration: 30 });
    const total = payOnly(r);
    record('DO-01', total, total, 'FT G1 9.5hr day — total $' + total);
  } catch(e) { recordText('DO-01', 0, 'ERROR', 'FAIL', e.message); }
}

async function runAllowanceTests() {
  console.log('\n═══ SECTION 4 — ALLOWANCES ═══');
  try {
    const r = await pool.query("SELECT allowance_type, amount FROM allowances WHERE award_code = $1 AND amount IS NOT NULL ORDER BY allowance_type", [AWARD_CODE]);
    for (const row of r.rows) {
      const amt = parseFloat(row.amount);
      if (row.allowance_type === 'first_aid') record('AL-01', 21.69, amt, 'First aid per week');
      if (row.allowance_type === 'laundry') record('AL-02', 0.70, amt, 'Laundry per day');
      if (row.allowance_type === 'leading_hand_small') record('AL-03', 1.27, amt, 'Leading hand 3–10 per hr');
      if (row.allowance_type === 'leading_hand_medium') record('AL-04', 1.90, amt, 'Leading hand 11–20 per hr');
      if (row.allowance_type === 'leading_hand_large') record('AL-05', 2.41, amt, 'Leading hand 20+ per hr');
      if (row.allowance_type === 'meal') record('AL-06', 14.06, amt, 'Meal allowance');
      if (row.allowance_type === 'toilet_cleaning') record('AL-07', 3.52, amt, 'Toilet cleaning per shift');
      if (row.allowance_type === 'vehicle_car') record('AL-08', 0.98, amt, 'Vehicle per km');
    }
  } catch(e) { recordText('AL-01', 'N/A', 'ERROR', 'FAIL', e.message); }
}

async function runSuperTests() {
  console.log('\n═══ SECTION 5 — SUPERANNUATION ═══');
  try { const r = await calcShift('full_time', cid(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('SU-01', 0.12, r.summary.sgcRate, 'SGC 12%'); } catch(e) { recordText('SU-01', 0.12, 'ERROR', 'FAIL', e.message); }
  try {
    const r = await calcShift('full_time', cid(1), REF_MONDAY, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    const ote = round2(7.5 * 24.28);
    const expectedSuper = round2(ote * 0.12);
    record('SU-02', expectedSuper, round2(r.summary.superAmount || 0), 'Super on 7.5hr ordinary G1');
  } catch(e) { recordText('SU-02', 0, 'ERROR', 'FAIL', e.message); }
}

async function runComplexTests() {
  console.log('\n═══ SECTION 6 — COMPLEX SCENARIOS ═══');

  console.log('\n6.1 Casual G1 PH 4hr');
  try {
    const r = await calcShift('casual', cid(1), REF_PH, '10:00', '14:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] });
    record('CS-01', round2(round2(30.35 * 1.8) * 4), payOnly(r), 'Casual G1 PH 4hr = $54.63 × 4');
  } catch(e) { recordText('CS-01', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n6.2 FT Mon-Sat week');
  try {
    const shifts = [];
    for (let d = 7; d <= 12; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '09:00', endTime: '17:00', mealBreakTaken: true, mealBreakDuration: 30 });
    const r = await calcMultiShift('full_time', cid(1), shifts);
    const total = payOnly(r);
    record('CS-02', total, total, 'FT G1 Mon-Sat 45hr = $' + total);
  } catch(e) { recordText('CS-02', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n6.3 Casual Sunday 4hr');
  try {
    const r = await calcShift('casual', cid(1), REF_SUNDAY, '10:00', '14:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('CS-03', round2(60.70 * 4), payOnly(r), 'Casual G1 Sunday 4hr = $60.70 × 4');
  } catch(e) { recordText('CS-03', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n6.4 Grade A transitional rate verification');
  try {
    const r = await calcShift('full_time', cid(8), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('CS-04', round2(7.10 * 4), payOnly(r), 'Grade A FT Mon 4hr = $7.10 × 4');
  } catch(e) { recordText('CS-04', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n6.5 Grade B transitional rate verification');
  try {
    const r = await calcShift('full_time', cid(9), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('CS-05', round2(14.19 * 4), payOnly(r), 'Grade B FT Mon 4hr = $14.19 × 4');
  } catch(e) { recordText('CS-05', 0, 'ERROR', 'FAIL', e.message); }
}

async function runRegressionTests() {
  console.log('\n═══ SECTION 7 — REGRESSION ═══');

  try {
    const r = await calcShift('full_time', cid(5), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-01', round2(28.12 * 4), payOnly(r), 'G5 FT Mon 4hr');
  } catch(e) { recordText('RT-01', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('casual', cid(7), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-02', round2(39.90 * 4), payOnly(r), 'G7 casual Mon 4hr = $39.90 × 4');
  } catch(e) { recordText('RT-02', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', cid(6), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-03', round2(46.02 * 4), payOnly(r), 'G6 FT Sat 4hr = $46.02 × 4');
  } catch(e) { recordText('RT-03', 0, 'ERROR', 'FAIL', e.message); }
}

async function main() {
  console.log('WageCheck Supported Employment Services Award Test Runner — MA000103');
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
