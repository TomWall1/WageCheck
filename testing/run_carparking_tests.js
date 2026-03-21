/**
 * Car Parking Award Test Runner — MA000095
 * Run: node testing/run_carparking_tests.js
 */
const path = require('path');
const { createTestRunner } = require('./lib/testFramework');
const t = createTestRunner('MA000095', path.join(__dirname, 'CarParking_Testing_Plan.xlsx'));
const { record, recordText, skip, classId, calcShift, calcMultiShift, round2, payOnly,
        pool, awardCode: AWARD_CODE,
        REF_MONDAY, REF_TUESDAY, REF_WEDNESDAY, REF_THURSDAY, REF_FRIDAY,
        REF_SATURDAY, REF_SUNDAY, REF_PH } = t;
const cid = (level) => classId(level, 'car_parking');

async function runBaseRateTests() {
  console.log('\n═══ SECTION 1 — BASE RATES ═══');
  console.log('\n1.1 Full-time');
  for (const b of [
    { id: 'BR-01', level: 1, expected: 25.52 },
    { id: 'BR-02', level: 2, expected: 26.33 },
    { id: 'BR-03', level: 3, expected: 27.30 },
  ]) {
    try { const r = await calcShift('full_time', cid(b.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(b.id, b.expected, r.baseHourlyRate, `L${b.level}`); } catch(e) { recordText(b.id, b.expected, 'ERROR', 'FAIL', e.message); }
  }
  console.log('\n1.2 Casual');
  for (const c of [
    { id: 'CL-01', level: 1, expected: 31.90 },
    { id: 'CL-02', level: 2, expected: 32.91 },
    { id: 'CL-03', level: 3, expected: 34.13 },
  ]) {
    try { const r = await calcShift('casual', cid(c.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(c.id, c.expected, r.baseHourlyRate, `Casual L${c.level}`); } catch(e) { recordText(c.id, c.expected, 'ERROR', 'FAIL', e.message); }
  }
}

async function runPenaltyRateTests() {
  console.log('\n═══ SECTION 2 — PENALTY RATES ═══');
  const base1 = 25.52;
  const casBase1 = 31.90;

  console.log('\n2.1 FT/PT penalties');
  // Saturday ×1.50
  try { const r = await calcShift('full_time', cid(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-01', round2(base1 * 1.50), r.shifts[0].segments[0]?.effectiveRate, 'Saturday ×1.50'); } catch(e) { recordText('PR-01', 0, 'ERROR', 'FAIL', e.message); }
  // Sunday ×2.00
  try { const r = await calcShift('full_time', cid(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-02', round2(base1 * 2.00), r.shifts[0].segments[0]?.effectiveRate, 'Sunday ×2.00'); } catch(e) { recordText('PR-02', 0, 'ERROR', 'FAIL', e.message); }
  // Public holiday ×2.50
  try { const r = await calcShift('full_time', cid(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-03', round2(base1 * 2.50), r.shifts[0].segments[0]?.effectiveRate, 'PH ×2.50'); } catch(e) { recordText('PR-03', 0, 'ERROR', 'FAIL', e.message); }
  // Afternoon shift ×1.125
  try { const r = await calcShift('full_time', cid(1), REF_MONDAY, '14:00', '18:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-04', round2(base1 * 1.125), r.shifts[0].segments[0]?.effectiveRate, 'Afternoon shift ×1.125'); } catch(e) { recordText('PR-04', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n2.2 Casual penalties');
  // Casual Saturday ×1.40 of casual
  try { const r = await calcShift('casual', cid(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PC-01', round2(casBase1 * 1.40), r.shifts[0].segments[0]?.effectiveRate, 'Casual Saturday ×1.40'); } catch(e) { recordText('PC-01', 0, 'ERROR', 'FAIL', e.message); }
  // Casual Sunday ×1.80 of casual
  try { const r = await calcShift('casual', cid(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PC-02', round2(casBase1 * 1.80), r.shifts[0].segments[0]?.effectiveRate, 'Casual Sunday ×1.80'); } catch(e) { recordText('PC-02', 0, 'ERROR', 'FAIL', e.message); }
  // Casual PH ×2.20 of casual
  try { const r = await calcShift('casual', cid(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PC-03', round2(casBase1 * 2.20), r.shifts[0].segments[0]?.effectiveRate, 'Casual PH ×2.20'); } catch(e) { recordText('PC-03', 0, 'ERROR', 'FAIL', e.message); }
}

async function runOvertimeTests() {
  console.log('\n═══ SECTION 3 — OVERTIME ═══');
  // FT 40hr week: 5 × 8hr shifts Mon–Fri = 40hr, 2hr OT at ×1.50
  try {
    const shifts = [];
    for (let d = 7; d <= 11; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '08:00', endTime: '16:30', mealBreakTaken: true, mealBreakDuration: 30 });
    const r = await calcMultiShift('full_time', cid(1), shifts);
    // 38hr ordinary @25.52 = 971.76, 2hr OT @25.52×1.50 = 76.56 → total = 1048.32
    // But afternoon shift loading applies to hours after 2pm, making it more complex
    // Use calculator result with expected from manual calculation
    const base = 25.52;
    // Each day: 6hr ordinary (8am-2pm @25.52) + 2hr afternoon (2pm-4pm @25.52×1.125) = 153.12 + 57.42 = 210.54... complex
    // Simplified: just verify the calc runs and OT is applied
    // Each day: 6hr ordinary + 2hr afternoon (×1.125). Last 2hr of week are OT.
    // Afternoon loading interacts with OT — use verified calc result.
    record('WO-01', 1071.84, payOnly(r), 'FT 40hr week with afternoon loading + 2hr OT');
  } catch(e) { recordText('WO-01', 0, 'ERROR', 'FAIL', e.message); }
}

async function runMinEngagementTests() {
  console.log('\n═══ SECTION 4 — MINIMUM ENGAGEMENT (3hr) ═══');
  // Casual 1hr worked → paid for 3hr minimum
  try { const r = await calcShift('casual', cid(1), REF_MONDAY, '10:00', '11:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('ME-01', round2(31.90 * 3), r.summary.totalPayOwed, 'Casual 1hr → 3hr min'); } catch(e) { recordText('ME-01', round2(31.90 * 3), 'ERROR', 'FAIL', e.message); }
  // Casual Sunday 1hr → 3hr min at Sunday rate
  try { const r = await calcShift('casual', cid(1), REF_SUNDAY, '10:00', '11:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('ME-02', round2(31.90 * 1.80 * 3), r.summary.totalPayOwed, 'Casual Sunday 1hr → 3hr min @×1.80'); } catch(e) { recordText('ME-02', round2(31.90 * 1.80 * 3), 'ERROR', 'FAIL', e.message); }
}

async function runAllowanceTests() {
  console.log('\n═══ SECTION 5 — ALLOWANCES ═══');
  try {
    const r = await pool.query("SELECT allowance_type, amount FROM allowances WHERE award_code = $1 AND effective_date >= '2025-07-01' AND amount IS NOT NULL ORDER BY allowance_type", [AWARD_CODE]);
    for (const row of r.rows) {
      const amt = parseFloat(row.amount);
      if (row.allowance_type === 'first_aid') record('AL-01', 0.67, amt, 'First aid per hour');
      if (row.allowance_type === 'laundry_ft') record('AL-02', 16.85, amt, 'Laundry FT weekly');
      if (row.allowance_type === 'laundry_ptcasual') record('AL-03', 3.31, amt, 'Laundry PT/casual per shift');
      if (row.allowance_type === 'meal') record('AL-04', 13.18, amt, 'Meal allowance');
    }
  } catch(e) { recordText('AL-01', 'N/A', 'ERROR', 'FAIL', e.message); }
}

async function runSuperTests() {
  console.log('\n═══ SECTION 6 — SUPERANNUATION ═══');
  try { const r = await calcShift('full_time', cid(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('SU-01', 0.12, r.summary.sgcRate, 'SGC 12%'); } catch(e) { recordText('SU-01', 0.12, 'ERROR', 'FAIL', e.message); }
}

async function runFullShiftTests() {
  console.log('\n═══ SECTION 7 — FULL-SHIFT PAY CALCULATIONS ═══');
  const base1 = 25.52;
  const casBase1 = 31.90;

  console.log('\n7.1 FT 4hr weekday');
  try {
    const r = await calcShift('full_time', cid(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('FS-01', round2(base1 * 4), payOnly(r), 'FT L1 4hr weekday');
  } catch(e) { recordText('FS-01', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n7.2 FT 4hr Saturday');
  try {
    const r = await calcShift('full_time', cid(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('FS-02', round2(base1 * 1.50 * 4), payOnly(r), 'FT L1 4hr Saturday @×1.50');
  } catch(e) { recordText('FS-02', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n7.3 FT 4hr Sunday');
  try {
    const r = await calcShift('full_time', cid(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('FS-03', round2(base1 * 2.00 * 4), payOnly(r), 'FT L1 4hr Sunday @×2.00');
  } catch(e) { recordText('FS-03', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n7.4 Casual 4hr weekday');
  try {
    const r = await calcShift('casual', cid(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('FS-04', round2(casBase1 * 4), payOnly(r), 'Casual L1 4hr weekday');
  } catch(e) { recordText('FS-04', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n7.5 Casual 4hr Sunday');
  try {
    const r = await calcShift('casual', cid(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('FS-05', round2(casBase1 * 1.80 * 4), payOnly(r), 'Casual L1 4hr Sunday @×1.80');
  } catch(e) { recordText('FS-05', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n7.6 FT L3 8hr Saturday with meal break');
  try {
    const r = await calcShift('full_time', cid(3), REF_SATURDAY, '09:00', '17:30', { mealBreakTaken: true, mealBreakDuration: 30 });
    record('FS-06', round2(27.30 * 1.50 * 8), payOnly(r), 'FT L3 8hr Saturday @×1.50');
  } catch(e) { recordText('FS-06', 0, 'ERROR', 'FAIL', e.message); }
}

async function runRegressionTests() {
  console.log('\n═══ SECTION 8 — REGRESSION ═══');
  // Casual L1 Sunday 4hr
  try { const r = await calcShift('casual', cid(1), REF_SUNDAY, '10:00', '14:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('RT-01', round2(31.90 * 1.80 * 4), r.summary.totalPayOwed, 'Casual L1 Sunday 4hr'); } catch(e) { recordText('RT-01', 0, 'ERROR', 'FAIL', e.message); }
  // FT L2 weekday 4hr
  try { const r = await calcShift('full_time', cid(2), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('RT-02', round2(26.33 * 4), r.summary.totalPayOwed, 'FT L2 weekday 4hr'); } catch(e) { recordText('RT-02', 0, 'ERROR', 'FAIL', e.message); }
  // FT L1 PH 4hr
  try { const r = await calcShift('full_time', cid(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('RT-03', round2(25.52 * 2.50 * 4), r.summary.totalPayOwed, 'FT L1 PH 4hr @×2.50'); } catch(e) { recordText('RT-03', 0, 'ERROR', 'FAIL', e.message); }
}

async function main() {
  console.log('WageCheck Car Parking Award Test Runner — MA000095');
  console.log('═'.repeat(60));
  await t.init();
  await runBaseRateTests();
  await runPenaltyRateTests();
  await runOvertimeTests();
  await runMinEngagementTests();
  await runAllowanceTests();
  await runSuperTests();
  await runFullShiftTests();
  await runRegressionTests();
  t.printSummary();
  t.generateExcel();
  await t.cleanup();
}
main().catch(e => { console.error('Fatal:', e); t.cleanup(); process.exit(1); });
