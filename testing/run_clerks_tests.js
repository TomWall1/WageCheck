/**
 * Clerks - Private Sector Award Test Runner — MA000002
 * Run: node testing/run_clerks_tests.js
 */
const path = require('path');
const { createTestRunner } = require('./lib/testFramework');
const t = createTestRunner('MA000002', path.join(__dirname, 'Clerks_Testing_Plan.xlsx'));
const { record, recordText, skip, classId, calcShift, calcMultiShift, round2, payOnly,
        pool, awardCode: AWARD_CODE,
        REF_MONDAY, REF_TUESDAY, REF_WEDNESDAY, REF_THURSDAY, REF_FRIDAY,
        REF_SATURDAY, REF_SUNDAY, REF_PH } = t;

async function runBaseRateTests() {
  console.log('\n═══ SECTION 1 — BASE RATES ═══');
  console.log('\n1.1 Clerical stream');
  for (const b of [
    { id: 'BR-01', level: 1, stream: 'clerical', expected: 25.74, title: 'Clerical L1 Yr1' },
    { id: 'BR-02', level: 2, stream: 'clerical', expected: 26.96, title: 'Clerical L1 Yr2' },
    { id: 'BR-03', level: 3, stream: 'clerical', expected: 27.79, title: 'Clerical L1 Yr3' },
    { id: 'BR-04', level: 4, stream: 'clerical', expected: 28.12, title: 'Clerical L2 Yr1' },
    { id: 'BR-05', level: 5, stream: 'clerical', expected: 28.64, title: 'Clerical L2 Yr2' },
    { id: 'BR-06', level: 6, stream: 'clerical', expected: 29.70, title: 'Clerical L3' },
    { id: 'BR-07', level: 7, stream: 'clerical', expected: 31.19, title: 'Clerical L4' },
    { id: 'BR-08', level: 8, stream: 'clerical', expected: 32.45, title: 'Clerical L5' },
  ]) {
    try { const r = await calcShift('full_time', classId(b.level, b.stream), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(b.id, b.expected, r.baseHourlyRate, b.title); } catch(e) { recordText(b.id, b.expected, 'ERROR', 'FAIL', e.message); }
  }
  console.log('\n1.2 Call centre stream');
  for (const b of [
    { id: 'BR-09', level: 1, stream: 'call_centre', expected: 29.91, title: 'Call Centre Principal' },
    { id: 'BR-10', level: 2, stream: 'call_centre', expected: 35.55, title: 'Call Centre Technical' },
  ]) {
    try { const r = await calcShift('full_time', classId(b.level, b.stream), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(b.id, b.expected, r.baseHourlyRate, b.title); } catch(e) { recordText(b.id, b.expected, 'ERROR', 'FAIL', e.message); }
  }
  console.log('\n1.3 Casual rates');
  for (const c of [
    { id: 'CL-01', level: 1, stream: 'clerical', expected: 32.18, title: 'Clerical L1Y1 casual' },
    { id: 'CL-02', level: 6, stream: 'clerical', expected: 37.13, title: 'Clerical L3 casual' },
    { id: 'CL-03', level: 8, stream: 'clerical', expected: 40.56, title: 'Clerical L5 casual' },
    { id: 'CL-04', level: 1, stream: 'call_centre', expected: 37.39, title: 'Call Centre Principal casual' },
  ]) {
    try { const r = await calcShift('casual', classId(c.level, c.stream), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(c.id, c.expected, r.baseHourlyRate, c.title); } catch(e) { recordText(c.id, c.expected, 'ERROR', 'FAIL', e.message); }
  }
  // Junior rates: same as MA000004 (under 16=45%, 16=50%, ... 21+=adult)
  console.log('\n1.4 Junior rates (under 16=45%, same as MA000004)');
  for (const j of [
    { id: 'JR-01', level: 1, age: 15, expected: 11.58, note: 'Under 16 = 45%' },
    { id: 'JR-02', level: 1, age: 16, expected: 12.87, note: '16yr = 50%' },
    { id: 'JR-03', level: 1, age: 17, expected: 15.44, note: '17yr = 60%' },
    { id: 'JR-04', level: 1, age: 18, expected: 18.02, note: '18yr = 70%' },
    { id: 'JR-05', level: 1, age: 19, expected: 20.59, note: '19yr = 80%' },
    { id: 'JR-06', level: 1, age: 20, expected: 23.17, note: '20yr = 90%' },
    { id: 'JR-07', level: 1, age: 21, expected: 25.74, note: '21yr = adult' },
  ]) {
    try { const r = await calcShift('full_time', classId(j.level, 'clerical'), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: j.age }); record(j.id, j.expected, r.baseHourlyRate, j.note); } catch(e) { recordText(j.id, j.expected, 'ERROR', 'FAIL', e.message); }
  }
}

async function runPenaltyRateTests() {
  console.log('\n═══ SECTION 2 — PENALTY RATES ═══');
  // FT: Saturday before 12:30pm = 1.25×, after 12:30pm = 1.50×
  //     Sunday 2.0×, PH 2.50×
  // Casual: Saturday before 12:30pm = 1.20×, after 12:30pm = 1.50×
  //         Sunday 1.80×, PH 2.20×
  const base1 = 25.74;
  const casBase1 = 32.175;

  console.log('\n2.1 FT/PT Saturday split at 12:30pm');
  try {
    const r = await calcShift('full_time', classId(1, 'clerical'), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    // 9am-12:30pm = 3.5hr @1.25×, 12:30pm-1pm = 0.5hr @1.50×
    const segs = r.shifts[0].segments;
    const hasBefore = segs.some(s => Math.abs(s.effectiveRate - round2(base1 * 1.25)) < 0.02);
    const hasAfter = segs.some(s => Math.abs(s.effectiveRate - round2(base1 * 1.50)) < 0.02);
    recordText('PR-01', 'split at 12:30', `${segs.length} segments`,
      hasBefore && hasAfter ? 'PASS' : 'FAIL',
      `Sat 9am-1pm: before 12:30 @1.25×, after 12:30 @1.50×`);
  } catch(e) { recordText('PR-01', 'split', 'ERROR', 'FAIL', e.message); }

  // Sat morning only (before 12:30) = 1.25×
  try {
    const r = await calcShift('full_time', classId(1, 'clerical'), REF_SATURDAY, '09:00', '12:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('PR-02', round2(base1 * 1.25), r.shifts[0].segments[0]?.effectiveRate, 'Sat AM (before 12:30) = 1.25×');
  } catch(e) { recordText('PR-02', round2(base1 * 1.25), 'ERROR', 'FAIL', e.message); }

  // Sat afternoon only (after 12:30) = 1.50×
  try {
    const r = await calcShift('full_time', classId(1, 'clerical'), REF_SATURDAY, '13:00', '16:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('PR-03', round2(base1 * 1.50), r.shifts[0].segments[0]?.effectiveRate, 'Sat PM (after 12:30) = 1.50×');
  } catch(e) { recordText('PR-03', round2(base1 * 1.50), 'ERROR', 'FAIL', e.message); }

  // Sunday & PH
  try { const r = await calcShift('full_time', classId(1, 'clerical'), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-04', round2(base1 * 2.00), r.shifts[0].segments[0]?.effectiveRate, 'Sunday 2.0×'); } catch(e) { recordText('PR-04', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', classId(1, 'clerical'), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-05', round2(base1 * 2.50), r.shifts[0].segments[0]?.effectiveRate, 'PH 2.50×'); } catch(e) { recordText('PR-05', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n2.2 Casual Saturday split + Sunday + PH');
  try { const r = await calcShift('casual', classId(1, 'clerical'), REF_SATURDAY, '09:00', '12:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PC-01', round2(casBase1 * 1.20), r.shifts[0].segments[0]?.effectiveRate, 'Casual Sat AM (1.20×)'); } catch(e) { recordText('PC-01', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('casual', classId(1, 'clerical'), REF_SATURDAY, '13:00', '16:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PC-02', round2(casBase1 * 1.50), r.shifts[0].segments[0]?.effectiveRate, 'Casual Sat PM (1.50×)'); } catch(e) { recordText('PC-02', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('casual', classId(1, 'clerical'), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PC-03', round2(casBase1 * 1.80), r.shifts[0].segments[0]?.effectiveRate, 'Casual Sunday (1.80×)'); } catch(e) { recordText('PC-03', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('casual', classId(1, 'clerical'), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PC-04', round2(casBase1 * 2.20), r.shifts[0].segments[0]?.effectiveRate, 'Casual PH (2.20×)'); } catch(e) { recordText('PC-04', 0, 'ERROR', 'FAIL', e.message); }
}

async function runOvertimeTests() {
  console.log('\n═══ SECTION 3 — OVERTIME ═══');
  // Daily OT at 7.6hr (7hr36min)! Weekly not seeded — only daily.
  const base = 25.74;
  try {
    // 7.6hr shift (at threshold, no OT)
    const r = await calcShift('full_time', classId(1, 'clerical'), REF_MONDAY, '08:00', '16:06', { mealBreakTaken: true, mealBreakDuration: 30 });
    record('DO-01', round2(7.6 * base), payOnly(r), '7.6hr Mon, no daily OT');
  } catch(e) { recordText('DO-01', 0, 'ERROR', 'FAIL', e.message); }
  try {
    // 8.6hr shift = 1hr daily OT @1.5×
    const r = await calcShift('full_time', classId(1, 'clerical'), REF_MONDAY, '08:00', '17:06', { mealBreakTaken: true, mealBreakDuration: 30 });
    const expected = round2(8.6 * base + 1 * base * 0.5);
    record('DO-02', expected, payOnly(r), '8.6hr Mon, 1hr daily OT @1.5×');
  } catch(e) { recordText('DO-02', 0, 'ERROR', 'FAIL', e.message); }
}

async function runMinEngagementTests() {
  console.log('\n═══ SECTION 4 — MINIMUM ENGAGEMENT (3hr) ═══');
  try { const r = await calcShift('casual', classId(1, 'clerical'), REF_MONDAY, '10:00', '11:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('ME-01', round2(32.175 * 3), r.summary.totalPayOwed, 'Casual 1hr → 3hr min'); } catch(e) { recordText('ME-01', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('part_time', classId(1, 'clerical'), REF_MONDAY, '10:00', '11:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('ME-02', round2(25.74 * 3), r.summary.totalPayOwed, 'PT 1hr → 3hr min'); } catch(e) { recordText('ME-02', 0, 'ERROR', 'FAIL', e.message); }
}

async function runAllowanceTests() {
  console.log('\n═══ SECTION 5 — ALLOWANCES ═══');
  try {
    const r = await pool.query("SELECT allowance_type, amount FROM allowances WHERE award_code = $1 AND effective_date >= '2025-07-01' AND amount IS NOT NULL ORDER BY allowance_type", [AWARD_CODE]);
    for (const row of r.rows) {
      const amt = parseFloat(row.amount);
      if (row.allowance_type === 'first_aid') record('AL-01', 16.03, amt, 'First aid per week');
      if (row.allowance_type === 'laundry_ft') record('AL-02', 3.55, amt, 'Laundry FT weekly');
      if (row.allowance_type === 'laundry_ptcasual') record('AL-03', 0.71, amt, 'Laundry PT/casual per shift');
      if (row.allowance_type === 'meal') record('AL-04', 19.93, amt, 'Meal (1st — two-tier)');
      if (row.allowance_type === 'meal_second') record('AL-05', 15.96, amt, 'Meal (subsequent)');
      if (row.allowance_type === 'vehicle_car') record('AL-06', 0.98, amt, 'Vehicle car per km');
      if (row.allowance_type === 'vehicle_motorcycle') record('AL-07', 0.33, amt, 'Vehicle motorcycle per km');
    }
  } catch(e) { recordText('AL-01', 'N/A', 'ERROR', 'FAIL', e.message); }
}

async function runSuperTests() {
  console.log('\n═══ SECTION 6 — SUPERANNUATION ═══');
  try { const r = await calcShift('full_time', classId(1, 'clerical'), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('SU-01', 0.12, r.summary.sgcRate, 'SGC 12%'); } catch(e) { recordText('SU-01', 0.12, 'ERROR', 'FAIL', e.message); }
}

async function runRegressionTests() {
  console.log('\n═══ SECTION 7 — REGRESSION ═══');
  try { const r = await calcShift('casual', classId(1, 'clerical'), REF_SUNDAY, '10:00', '14:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('RT-01', round2(32.175 * 1.80 * 4), r.summary.totalPayOwed, 'Casual Clerical L1Y1 Sunday 4hr'); } catch(e) { recordText('RT-01', 0, 'ERROR', 'FAIL', e.message); }
  try {
    const r = await calcShift('full_time', classId(1, 'clerical'), REF_SATURDAY, '10:00', '14:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    // 10am-12:30pm = 2.5hr @1.25×, 12:30pm-2pm = 1.5hr @1.50×
    const expected = round2(2.5 * 25.74 * 1.25 + 1.5 * 25.74 * 1.50);
    record('RT-02', expected, r.summary.totalPayOwed, 'FT Sat 10am-2pm (split at 12:30)');
  } catch(e) { recordText('RT-02', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', classId(2, 'call_centre'), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('RT-03', round2(35.55 * 4), r.summary.totalPayOwed, 'Call Centre Tech 4hr weekday'); } catch(e) { recordText('RT-03', 0, 'ERROR', 'FAIL', e.message); }
}

async function main() {
  console.log('WageCheck Clerks Award Test Runner — MA000002');
  console.log('═'.repeat(60));
  await t.init();
  await runBaseRateTests();
  await runPenaltyRateTests();
  await runOvertimeTests();
  await runMinEngagementTests();
  await runAllowanceTests();
  await runSuperTests();
  await runRegressionTests();
  t.printSummary();
  t.generateExcel();
  await t.cleanup();
}
main().catch(e => { console.error('Fatal:', e); t.cleanup(); process.exit(1); });
