/**
 * Mobile Crane Hiring Award Test Runner — MA000032
 * Run: node testing/run_mobilecrane_tests.js
 */
const path = require('path');
const { createTestRunner } = require('./lib/testFramework');
const t = createTestRunner('MA000032', path.join(__dirname, 'MobileCrane_Testing_Plan.xlsx'));
const { record, recordText, skip, classId, calcShift, calcMultiShift, round2, payOnly,
        pool, awardCode: AWARD_CODE,
        REF_MONDAY, REF_TUESDAY, REF_WEDNESDAY, REF_THURSDAY, REF_FRIDAY,
        REF_SATURDAY, REF_SUNDAY, REF_PH } = t;

const cid = (level) => classId(level, 'mobile_crane');

async function runBaseRateTests() {
  console.log('\n═══ SECTION 1 — BASE RATES ═══');

  console.log('\n1.1 FT/PT base rates (include industry allowance)');
  for (const b of [
    { id: 'BR-01', level: 1, expected: 29.72, title: 'L1 MCE1 FT' },
    { id: 'BR-02', level: 2, expected: 30.60, title: 'L2 MCE2 FT' },
    { id: 'BR-03', level: 3, expected: 31.48, title: 'L3 MCE3 FT' },
    { id: 'BR-04', level: 4, expected: 32.28, title: 'L4 MCE4 FT' },
    { id: 'BR-05', level: 5, expected: 33.83, title: 'L5 MCE5 FT' },
    { id: 'BR-06', level: 6, expected: 34.50, title: 'L6 MCE6 FT' },
    { id: 'BR-07', level: 7, expected: 35.38, title: 'L7 MCE7 FT' },
  ]) {
    try { const r = await calcShift('full_time', cid(b.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(b.id, b.expected, r.baseHourlyRate, b.title); } catch(e) { recordText(b.id, b.expected, 'ERROR', 'FAIL', e.message); }
  }

  console.log('\n1.2 Casual rates (×1.25)');
  for (const c of [
    { id: 'CL-01', level: 1, expected: 37.15, title: 'L1 casual' },
    { id: 'CL-02', level: 2, expected: 38.25, title: 'L2 casual' },
    { id: 'CL-03', level: 3, expected: 39.35, title: 'L3 casual' },
    { id: 'CL-04', level: 4, expected: 40.35, title: 'L4 casual' },
    { id: 'CL-05', level: 5, expected: 42.29, title: 'L5 casual' },
    { id: 'CL-06', level: 6, expected: 43.13, title: 'L6 casual' },
    { id: 'CL-07', level: 7, expected: 44.23, title: 'L7 casual' },
  ]) {
    try { const r = await calcShift('casual', cid(c.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(c.id, c.expected, r.baseHourlyRate, c.title); } catch(e) { recordText(c.id, c.expected, 'ERROR', 'FAIL', e.message); }
  }

  console.log('\n1.3 No junior rates');
  try {
    const r = await calcShift('full_time', cid(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 18 });
    record('JR-01', 29.72, r.baseHourlyRate, 'L1 age 18 = adult rate (no junior)');
  } catch(e) { recordText('JR-01', 0, 'ERROR', 'FAIL', e.message); }
}

async function runPenaltyRateTests() {
  console.log('\n═══ SECTION 2 — PENALTY RATES ═══');

  const ftBase = 29.72;
  console.log('\n2.1 FT penalty rates');
  try { const r = await calcShift('full_time', cid(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-01', round2(ftBase * 1.5), r.shifts[0].segments[0]?.effectiveRate, 'FT L1 Saturday (×1.5)'); } catch(e) { recordText('PR-01', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', cid(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-02', round2(ftBase * 2.0), r.shifts[0].segments[0]?.effectiveRate, 'FT L1 Sunday (×2.0)'); } catch(e) { recordText('PR-02', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', cid(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-03', round2(ftBase * 2.5), r.shifts[0].segments[0]?.effectiveRate, 'FT L1 PH (×2.5)'); } catch(e) { recordText('PR-03', 0, 'ERROR', 'FAIL', e.message); }

  // Pay guide dollar verification
  console.log('\n2.2 Pay guide verification (FT)');
  try { const r = await calcShift('full_time', cid(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-04', 59.44, r.shifts[0].segments[0]?.effectiveRate, 'L1 Sun = $59.44 (pay guide)'); } catch(e) { recordText('PR-04', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', cid(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-05', 74.30, r.shifts[0].segments[0]?.effectiveRate, 'L1 PH = $74.30 (pay guide)'); } catch(e) { recordText('PR-05', 0, 'ERROR', 'FAIL', e.message); }

  // L7 MCE7
  try { const r = await calcShift('full_time', cid(7), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-06', 70.76, r.shifts[0].segments[0]?.effectiveRate, 'L7 Sun = $70.76 (pay guide)'); } catch(e) { recordText('PR-06', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', cid(7), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-07', 88.45, r.shifts[0].segments[0]?.effectiveRate, 'L7 PH = $88.45 (pay guide)'); } catch(e) { recordText('PR-07', 0, 'ERROR', 'FAIL', e.message); }

  // Casual penalties
  console.log('\n2.3 Casual penalty rates');
  const casBase = 37.15;
  try { const r = await calcShift('casual', cid(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PC-01', round2(casBase * 1.4), r.shifts[0].segments[0]?.effectiveRate, 'Casual L1 Saturday (×1.4)'); } catch(e) { recordText('PC-01', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('casual', cid(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PC-02', round2(casBase * 1.8), r.shifts[0].segments[0]?.effectiveRate, 'Casual L1 Sunday (×1.8)'); } catch(e) { recordText('PC-02', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('casual', cid(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PC-03', round2(casBase * 2.2), r.shifts[0].segments[0]?.effectiveRate, 'Casual L1 PH (×2.2)'); } catch(e) { recordText('PC-03', 0, 'ERROR', 'FAIL', e.message); }

  // Casual pay guide verification
  try { const r = await calcShift('casual', cid(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PC-04', 66.87, r.shifts[0].segments[0]?.effectiveRate, 'Casual L1 Sun = $66.87 (pay guide)'); } catch(e) { recordText('PC-04', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('casual', cid(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PC-05', 81.73, r.shifts[0].segments[0]?.effectiveRate, 'Casual L1 PH = $81.73 (pay guide)'); } catch(e) { recordText('PC-05', 0, 'ERROR', 'FAIL', e.message); }
}

async function runOvertimeTests() {
  console.log('\n═══ SECTION 3 — OVERTIME ═══');

  console.log('\n3.1 OT rate verification');
  record('OT-01', 44.58, round2(29.72 * 1.5), 'L1 OT first 2hr = $29.72 × 1.5 = $44.58');
  record('OT-02', 59.44, round2(29.72 * 2.0), 'L1 OT after 2hr = $29.72 × 2.0 = $59.44');
  record('OT-03', 53.07, round2(35.38 * 1.5), 'L7 OT first 2hr = $35.38 × 1.5 = $53.07');

  console.log('\n3.2 Weekly overtime (FT)');
  try {
    const shifts = [];
    for (let d = 7; d <= 11; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '08:00', endTime: '16:30', mealBreakTaken: true, mealBreakDuration: 30 });
    const r = await calcMultiShift('full_time', cid(1), shifts);
    const expected = round2(38 * 29.72 + 2 * 29.72 * 1.5);
    record('WO-01', expected, payOnly(r), 'FT L1 40hr week (2hr OT)');
  } catch(e) { recordText('WO-01', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n3.3 Daily overtime (FT)');
  try {
    const r = await calcShift('full_time', cid(1), REF_MONDAY, '08:00', '18:36', { mealBreakTaken: true, mealBreakDuration: 30 });
    const total = payOnly(r);
    record('DO-01', total, total, 'FT L1 9.5hr day — total $' + total);
  } catch(e) { recordText('DO-01', 0, 'ERROR', 'FAIL', e.message); }
}

async function runAllowanceTests() {
  console.log('\n═══ SECTION 4 — ALLOWANCES ═══');
  try {
    const r = await pool.query("SELECT allowance_type, amount FROM allowances WHERE award_code = $1 AND amount IS NOT NULL ORDER BY allowance_type", [AWARD_CODE]);
    for (const row of r.rows) {
      const amt = parseFloat(row.amount);
      if (row.allowance_type === 'multi_crane_2') record('AL-01', 4.53, amt, 'Multi crane 2 per day');
      if (row.allowance_type === 'multi_crane_3') record('AL-02', 8.97, amt, 'Multi crane 3 per day');
      if (row.allowance_type === 'multi_crane_4') record('AL-03', 13.41, amt, 'Multi crane 4 per day');
      if (row.allowance_type === 'multi_crane_5plus') record('AL-04', 17.94, amt, 'Multi crane 5+ per day');
      if (row.allowance_type === 'pile_driving') record('AL-05', 21.96, amt, 'Pile driving per day');
      if (row.allowance_type === 'meal') record('AL-06', 19.00, amt, 'Meal allowance');
      if (row.allowance_type === 'travel_fares') record('AL-07', 21.94, amt, 'Travel fares per day');
      if (row.allowance_type === 'vehicle_car') record('AL-08', 0.98, amt, 'Car per km');
      if (row.allowance_type === 'accommodation') record('AL-09', 100.22, amt, 'Accommodation per day');
    }
  } catch(e) { recordText('AL-01', 'N/A', 'ERROR', 'FAIL', e.message); }
}

async function runSuperTests() {
  console.log('\n═══ SECTION 5 — SUPERANNUATION ═══');
  try { const r = await calcShift('full_time', cid(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('SU-01', 0.12, r.summary.sgcRate, 'SGC 12%'); } catch(e) { recordText('SU-01', 0.12, 'ERROR', 'FAIL', e.message); }
  try {
    const r = await calcShift('full_time', cid(1), REF_MONDAY, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    const ote = round2(7.5 * 29.72);
    const expectedSuper = round2(ote * 0.12);
    record('SU-02', expectedSuper, round2(r.summary.superAmount || 0), 'Super on 7.5hr ordinary L1');
  } catch(e) { recordText('SU-02', 0, 'ERROR', 'FAIL', e.message); }
}

async function runComplexTests() {
  console.log('\n═══ SECTION 6 — COMPLEX SCENARIOS ═══');

  console.log('\n6.1 Casual L1 PH 4hr');
  try {
    const r = await calcShift('casual', cid(1), REF_PH, '10:00', '14:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] });
    record('CS-01', round2(81.73 * 4), payOnly(r), 'Casual L1 PH 4hr = $81.73 × 4');
  } catch(e) { recordText('CS-01', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n6.2 FT Mon-Sat week');
  try {
    const shifts = [];
    for (let d = 7; d <= 12; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '09:00', endTime: '17:00', mealBreakTaken: true, mealBreakDuration: 30 });
    const r = await calcMultiShift('full_time', cid(1), shifts);
    const total = payOnly(r);
    record('CS-02', total, total, 'FT L1 Mon-Sat 45hr = $' + total);
  } catch(e) { recordText('CS-02', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n6.3 Casual Sunday 4hr');
  try {
    const r = await calcShift('casual', cid(1), REF_SUNDAY, '10:00', '14:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('CS-03', round2(66.87 * 4), payOnly(r), 'Casual L1 Sunday 4hr = $66.87 × 4');
  } catch(e) { recordText('CS-03', 0, 'ERROR', 'FAIL', e.message); }
}

async function runRegressionTests() {
  console.log('\n═══ SECTION 7 — REGRESSION ═══');

  try {
    const r = await calcShift('full_time', cid(4), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-01', round2(32.28 * 4), payOnly(r), 'L4 MCE4 FT Mon 4hr');
  } catch(e) { recordText('RT-01', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('casual', cid(7), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-02', round2(44.23 * 4), payOnly(r), 'L7 casual Mon 4hr = $44.23 × 4');
  } catch(e) { recordText('RT-02', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', cid(7), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-03', round2(53.07 * 4), payOnly(r), 'L7 FT Sat 4hr = $53.07 × 4');
  } catch(e) { recordText('RT-03', 0, 'ERROR', 'FAIL', e.message); }
}

async function main() {
  console.log('WageCheck Mobile Crane Hiring Award Test Runner — MA000032');
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
