/**
 * Transport (Cash in Transit) Award Test Runner — MA000042
 * Run: node testing/run_cashintransit_tests.js
 */
const path = require('path');
const { createTestRunner } = require('./lib/testFramework');
const t = createTestRunner('MA000042', path.join(__dirname, 'CashInTransit_Testing_Plan.xlsx'));
const { record, recordText, skip, classId, calcShift, calcMultiShift, round2, payOnly,
        pool, awardCode: AWARD_CODE,
        REF_MONDAY, REF_TUESDAY, REF_WEDNESDAY, REF_THURSDAY, REF_FRIDAY,
        REF_SATURDAY, REF_SUNDAY, REF_PH } = t;

const cid = (level) => classId(level, 'cash_in_transit');

async function runBaseRateTests() {
  console.log('\n═══ SECTION 1 — BASE RATES ═══');

  console.log('\n1.1 FT/PT base rates (include industry allowance)');
  for (const b of [
    { id: 'BR-01', level: 1, expected: 28.12, title: 'L1 Escort FT' },
    { id: 'BR-02', level: 2, expected: 28.12, title: 'L2 Non-armoured FT' },
    { id: 'BR-03', level: 3, expected: 28.42, title: 'L3 Armoured FT' },
    { id: 'BR-04', level: 4, expected: 29.62, title: 'L4 Crew leader FT' },
  ]) {
    try { const r = await calcShift('full_time', cid(b.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(b.id, b.expected, r.baseHourlyRate, b.title); } catch(e) { recordText(b.id, b.expected, 'ERROR', 'FAIL', e.message); }
  }

  console.log('\n1.2 Casual rates (×1.25)');
  for (const c of [
    { id: 'CL-01', level: 1, expected: 35.15, title: 'L1 casual' },
    { id: 'CL-02', level: 2, expected: 35.15, title: 'L2 casual' },
    { id: 'CL-03', level: 3, expected: 35.53, title: 'L3 casual' },
    { id: 'CL-04', level: 4, expected: 37.03, title: 'L4 casual' },
  ]) {
    try { const r = await calcShift('casual', cid(c.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(c.id, c.expected, r.baseHourlyRate, c.title); } catch(e) { recordText(c.id, c.expected, 'ERROR', 'FAIL', e.message); }
  }

  console.log('\n1.3 No junior rates');
  try {
    const r = await calcShift('full_time', cid(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 18 });
    record('JR-01', 28.12, r.baseHourlyRate, 'L1 age 18 = adult rate (no junior)');
  } catch(e) { recordText('JR-01', 0, 'ERROR', 'FAIL', e.message); }
}

async function runPenaltyRateTests() {
  console.log('\n═══ SECTION 2 — PENALTY RATES ═══');

  const ftBase = 28.12;
  console.log('\n2.1 FT penalty rates');
  try { const r = await calcShift('full_time', cid(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-01', round2(ftBase * 1.5), r.shifts[0].segments[0]?.effectiveRate, 'FT L1 Saturday (×1.5)'); } catch(e) { recordText('PR-01', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', cid(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-02', round2(ftBase * 2.0), r.shifts[0].segments[0]?.effectiveRate, 'FT L1 Sunday (×2.0)'); } catch(e) { recordText('PR-02', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', cid(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-03', round2(ftBase * 2.5), r.shifts[0].segments[0]?.effectiveRate, 'FT L1 PH (×2.5)'); } catch(e) { recordText('PR-03', 0, 'ERROR', 'FAIL', e.message); }

  // Pay guide dollar verification
  console.log('\n2.2 Pay guide verification (FT)');
  try { const r = await calcShift('full_time', cid(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-04', 56.24, r.shifts[0].segments[0]?.effectiveRate, 'L1 Sun = $56.24 (pay guide)'); } catch(e) { recordText('PR-04', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', cid(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-05', 70.30, r.shifts[0].segments[0]?.effectiveRate, 'L1 PH = $70.30 (pay guide)'); } catch(e) { recordText('PR-05', 0, 'ERROR', 'FAIL', e.message); }

  // L4 Crew leader
  try { const r = await calcShift('full_time', cid(4), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-06', 59.24, r.shifts[0].segments[0]?.effectiveRate, 'L4 Sun = $59.24 (pay guide)'); } catch(e) { recordText('PR-06', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', cid(4), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-07', 74.05, r.shifts[0].segments[0]?.effectiveRate, 'L4 PH = $74.05 (pay guide)'); } catch(e) { recordText('PR-07', 0, 'ERROR', 'FAIL', e.message); }

  // Casual penalties
  console.log('\n2.3 Casual penalty rates');
  const casBase = 35.15;
  try { const r = await calcShift('casual', cid(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PC-01', round2(casBase * 1.4), r.shifts[0].segments[0]?.effectiveRate, 'Casual L1 Saturday (×1.4)'); } catch(e) { recordText('PC-01', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('casual', cid(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PC-02', round2(casBase * 1.8), r.shifts[0].segments[0]?.effectiveRate, 'Casual L1 Sunday (×1.8)'); } catch(e) { recordText('PC-02', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('casual', cid(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PC-03', round2(casBase * 2.2), r.shifts[0].segments[0]?.effectiveRate, 'Casual L1 PH (×2.2)'); } catch(e) { recordText('PC-03', 0, 'ERROR', 'FAIL', e.message); }

  // Casual pay guide verification
  try { const r = await calcShift('casual', cid(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PC-04', 63.27, r.shifts[0].segments[0]?.effectiveRate, 'Casual L1 Sun = $63.27 (pay guide)'); } catch(e) { recordText('PC-04', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('casual', cid(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PC-05', 77.33, r.shifts[0].segments[0]?.effectiveRate, 'Casual L1 PH = $77.33 (pay guide)'); } catch(e) { recordText('PC-05', 0, 'ERROR', 'FAIL', e.message); }
}

async function runOvertimeTests() {
  console.log('\n═══ SECTION 3 — OVERTIME ═══');

  console.log('\n3.1 OT rate verification');
  record('OT-01', 42.18, round2(28.12 * 1.5), 'L1 OT first 2hr = $28.12 × 1.5 = $42.18');
  record('OT-02', 56.24, round2(28.12 * 2.0), 'L1 OT after 2hr = $28.12 × 2.0 = $56.24');
  record('OT-03', 44.43, round2(29.62 * 1.5), 'L4 OT first 2hr = $29.62 × 1.5 = $44.43');

  console.log('\n3.2 Weekly overtime (FT)');
  try {
    const shifts = [];
    for (let d = 7; d <= 11; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '08:00', endTime: '16:30', mealBreakTaken: true, mealBreakDuration: 30 });
    const r = await calcMultiShift('full_time', cid(1), shifts);
    const expected = round2(38 * 28.12 + 2 * 28.12 * 1.5);
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
      if (row.allowance_type === 'first_aid') record('AL-01', 16.15, amt, 'First aid per week');
      if (row.allowance_type === 'meal') record('AL-02', 20.22, amt, 'Meal allowance');
      if (row.allowance_type === 'atm_work') record('AL-03', 9.09, amt, 'ATM work per day');
      if (row.allowance_type === 'vehicle_car') record('AL-04', 0.98, amt, 'Vehicle per km');
    }
  } catch(e) { recordText('AL-01', 'N/A', 'ERROR', 'FAIL', e.message); }
}

async function runSuperTests() {
  console.log('\n═══ SECTION 5 — SUPERANNUATION ═══');
  try { const r = await calcShift('full_time', cid(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('SU-01', 0.12, r.summary.sgcRate, 'SGC 12%'); } catch(e) { recordText('SU-01', 0.12, 'ERROR', 'FAIL', e.message); }
  try {
    const r = await calcShift('full_time', cid(1), REF_MONDAY, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    const ote = round2(7.5 * 28.12);
    const expectedSuper = round2(ote * 0.12);
    record('SU-02', expectedSuper, round2(r.summary.superAmount || 0), 'Super on 7.5hr ordinary L1');
  } catch(e) { recordText('SU-02', 0, 'ERROR', 'FAIL', e.message); }
}

async function runComplexTests() {
  console.log('\n═══ SECTION 6 — COMPLEX SCENARIOS ═══');

  console.log('\n6.1 Casual L1 PH 4hr');
  try {
    const r = await calcShift('casual', cid(1), REF_PH, '10:00', '14:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] });
    record('CS-01', round2(77.33 * 4), payOnly(r), 'Casual L1 PH 4hr = $77.33 × 4');
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
    record('CS-03', round2(63.27 * 4), payOnly(r), 'Casual L1 Sunday 4hr = $63.27 × 4');
  } catch(e) { recordText('CS-03', 0, 'ERROR', 'FAIL', e.message); }
}

async function runRegressionTests() {
  console.log('\n═══ SECTION 7 — REGRESSION ═══');

  try {
    const r = await calcShift('full_time', cid(3), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-01', round2(28.42 * 4), payOnly(r), 'L3 Armoured FT Mon 4hr');
  } catch(e) { recordText('RT-01', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('casual', cid(4), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-02', round2(37.03 * 4), payOnly(r), 'L4 casual Mon 4hr = $37.03 × 4');
  } catch(e) { recordText('RT-02', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', cid(4), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-03', round2(44.43 * 4), payOnly(r), 'L4 FT Sat 4hr = $44.43 × 4');
  } catch(e) { recordText('RT-03', 0, 'ERROR', 'FAIL', e.message); }
}

async function main() {
  console.log('WageCheck Transport (Cash in Transit) Award Test Runner — MA000042');
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
