/**
 * Funeral Industry Award Test Runner — MA000105
 * Run: node testing/run_funeral_tests.js
 */
const path = require('path');
const { createTestRunner } = require('./lib/testFramework');
const t = createTestRunner('MA000105', path.join(__dirname, 'Funeral_Testing_Plan.xlsx'));
const { record, recordText, skip, classId, calcShift, calcMultiShift, round2, payOnly,
        pool, awardCode: AWARD_CODE,
        REF_MONDAY, REF_TUESDAY, REF_WEDNESDAY, REF_THURSDAY, REF_FRIDAY,
        REF_SATURDAY, REF_SUNDAY, REF_PH } = t;
const cid = (level) => classId(level, 'funeral');

async function runBaseRateTests() {
  console.log('\n═══ SECTION 1 — BASE RATES ═══');
  console.log('\n1.1 Full-time');
  for (const b of [
    { id: 'BR-01', level: 1, expected: 24.28, title: 'G1 FT' },
    { id: 'BR-02', level: 2, expected: 24.95, title: 'G2 FT' },
    { id: 'BR-03', level: 3, expected: 25.85, title: 'G3 FT' },
    { id: 'BR-04', level: 4, expected: 26.70, title: 'G4 FT' },
    { id: 'BR-05', level: 5, expected: 28.12, title: 'G5 FT' },
    { id: 'BR-06', level: 6, expected: 29.00, title: 'G6 FT' },
  ]) {
    try { const r = await calcShift('full_time', cid(b.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(b.id, b.expected, r.baseHourlyRate, b.title); } catch(e) { recordText(b.id, b.expected, 'ERROR', 'FAIL', e.message); }
  }
  console.log('\n1.2 Casual (FT × 1.25)');
  for (const c of [
    { id: 'CL-01', level: 1, expected: 30.35, title: 'G1 casual' },
    { id: 'CL-02', level: 3, expected: 32.31, title: 'G3 casual' },
    { id: 'CL-03', level: 6, expected: 36.25, title: 'G6 casual' },
  ]) {
    try { const r = await calcShift('casual', cid(c.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(c.id, c.expected, r.baseHourlyRate, c.title); } catch(e) { recordText(c.id, c.expected, 'ERROR', 'FAIL', e.message); }
  }
}

async function runPenaltyRateTests() {
  console.log('\n═══ SECTION 2 — PENALTY RATES ═══');
  // FT: afternoon 1.20×, Sat 1.50×, Sun 2.0×, PH 2.0×
  // Casual: afternoon 1.16×, Sat 1.40×, Sun 1.80×, PH 1.80×
  const base1 = 24.28;
  const casBase1 = 30.35;

  console.log('\n2.1 FT penalties (G1)');
  try { const r = await calcShift('full_time', cid(1), REF_MONDAY, '14:00', '18:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-01', round2(base1 * 1.20), r.shifts[0].segments[0]?.effectiveRate, 'FT Afternoon Mon–Fri (1.20×)'); } catch(e) { recordText('PR-01', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', cid(1), REF_SATURDAY, '09:00', '12:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-02', round2(base1 * 1.50), r.shifts[0].segments[0]?.effectiveRate, 'FT Saturday first 3hr (1.50×)'); } catch(e) { recordText('PR-02', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', cid(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-03', round2(base1 * 2.00), r.shifts[0].segments[0]?.effectiveRate, 'FT Sunday (2.0×)'); } catch(e) { recordText('PR-03', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', cid(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-04', round2(base1 * 2.00), r.shifts[0].segments[0]?.effectiveRate, 'FT Public holiday (2.0×)'); } catch(e) { recordText('PR-04', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n2.2 FT penalties (G5)');
  const base5 = 28.12;
  try { const r = await calcShift('full_time', cid(5), REF_MONDAY, '14:00', '18:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-05', round2(base5 * 1.20), r.shifts[0].segments[0]?.effectiveRate, 'G5 FT Afternoon (1.20×)'); } catch(e) { recordText('PR-05', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', cid(5), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-06', round2(base5 * 2.00), r.shifts[0].segments[0]?.effectiveRate, 'G5 FT Sunday (2.0×)'); } catch(e) { recordText('PR-06', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n2.3 Casual penalties (G1)');
  try { const r = await calcShift('casual', cid(1), REF_MONDAY, '14:00', '18:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PC-01', round2(casBase1 * 1.16), r.shifts[0].segments[0]?.effectiveRate, 'Casual Afternoon (1.16×)'); } catch(e) { recordText('PC-01', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('casual', cid(1), REF_SATURDAY, '09:00', '12:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PC-02', round2(casBase1 * 1.40), r.shifts[0].segments[0]?.effectiveRate, 'Casual Saturday (1.40×)'); } catch(e) { recordText('PC-02', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('casual', cid(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PC-03', round2(casBase1 * 1.80), r.shifts[0].segments[0]?.effectiveRate, 'Casual Sunday (1.80×)'); } catch(e) { recordText('PC-03', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('casual', cid(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PC-04', round2(casBase1 * 1.80), r.shifts[0].segments[0]?.effectiveRate, 'Casual PH (1.80×)'); } catch(e) { recordText('PC-04', 0, 'ERROR', 'FAIL', e.message); }
}

async function runOvertimeTests() {
  console.log('\n═══ SECTION 3 — OVERTIME ═══');
  // FT G1 40hr week: 38hr ordinary + 2hr @ 1.50 OT + afternoon loading interactions
  try {
    const shifts = [];
    // Nov 3-7, 2025 = Mon-Fri (avoiding weekend dates)
    for (let d = 3; d <= 7; d++) shifts.push({ date: `2025-11-${String(d).padStart(2,'0')}`, startTime: '08:00', endTime: '16:30', mealBreakTaken: true, mealBreakDuration: 30 });
    const r = await calcMultiShift('full_time', cid(1), shifts);
    // Each day: 6hr ordinary + 2hr afternoon (×1.20). Last 2hr of week are OT.
    // Afternoon loading interacts with OT — use verified calc result.
    record('WO-01', 1034.33, payOnly(r), 'FT G1 40hr week with afternoon loading + 2hr OT');
  } catch(e) { recordText('WO-01', 0, 'ERROR', 'FAIL', e.message); }
}

async function runMinEngagementTests() {
  console.log('\n═══ SECTION 4 — MINIMUM ENGAGEMENT (2hr casual) ═══');
  // Casual G1 1hr shift → min 2hr engagement = 2 × $30.35 = $60.70
  try { const r = await calcShift('casual', cid(1), REF_MONDAY, '10:00', '11:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('ME-01', 60.70, r.summary.totalPayOwed, 'Casual G1 1hr → 2hr min'); } catch(e) { recordText('ME-01', 60.70, 'ERROR', 'FAIL', e.message); }
}

async function runAllowanceTests() {
  console.log('\n═══ SECTION 5 — ALLOWANCES ═══');
  try {
    const r = await pool.query("SELECT allowance_type, amount FROM allowances WHERE award_code = $1 AND effective_date >= '2025-11-07' AND amount IS NOT NULL ORDER BY allowance_type", [AWARD_CODE]);
    for (const row of r.rows) {
      const amt = parseFloat(row.amount);
      if (row.allowance_type === 'exhumation') record('AL-01', 114.32, amt, 'Exhumation per body');
      if (row.allowance_type === 'leading_hand_3to10') record('AL-02', 42.74, amt, 'Leading hand 3-10 per week');
      if (row.allowance_type === 'leading_hand_11to19') record('AL-03', 64.10, amt, 'Leading hand 11-19 per week');
      if (row.allowance_type === 'meal') record('AL-04', 16.62, amt, 'Meal allowance');
      if (row.allowance_type === 'standby_weekday') record('AL-05', 16.03, amt, 'Stand-by Mon-Fri per period');
      if (row.allowance_type === 'standby_weekend_ph') record('AL-06', 34.19, amt, 'Stand-by Sat/Sun/PH per period');
      if (row.allowance_type === 'tool') record('AL-07', 6.06, amt, 'Tool allowance per week');
      if (row.allowance_type === 'vehicle') record('AL-08', 0.99, amt, 'Vehicle per km');
    }
  } catch(e) { recordText('AL-01', 'N/A', 'ERROR', 'FAIL', e.message); }
}

async function runSuperTests() {
  console.log('\n═══ SECTION 6 — SUPERANNUATION ═══');
  try { const r = await calcShift('full_time', cid(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('SU-01', 0.12, r.summary.sgcRate, 'SGC 12%'); } catch(e) { recordText('SU-01', 0.12, 'ERROR', 'FAIL', e.message); }
}

async function runFullShiftTests() {
  console.log('\n═══ SECTION 7 — FULL-SHIFT CALCS ═══');
  // FT G1 8hr weekday (9am-5:30pm, 30min meal) = 8hr paid
  // 5hr ordinary (9am-2pm @ $24.28) + 3hr afternoon (2pm-5pm @ $29.14) = $121.40 + $87.42 = $208.82
  try { const r = await calcShift('full_time', cid(1), REF_MONDAY, '09:00', '17:30', { mealBreakTaken: true, mealBreakDuration: 30 }); record('FS-01', 208.82, r.summary.totalPayOwed, 'FT G1 8hr weekday (9am-5:30pm, 30min meal)'); } catch(e) { recordText('FS-01', 208.82, 'ERROR', 'FAIL', e.message); }

  // Casual G1 4hr Sunday = 4 × $30.35 × 1.80 = $218.52
  try { const r = await calcShift('casual', cid(1), REF_SUNDAY, '10:00', '14:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('FS-02', round2(30.35 * 1.80 * 4), r.summary.totalPayOwed, 'Casual G1 Sunday 4hr'); } catch(e) { recordText('FS-02', 0, 'ERROR', 'FAIL', e.message); }

  // FT G3 4hr Sunday = 4 × $25.85 × 2.0 = $206.80
  try { const r = await calcShift('full_time', cid(3), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('FS-03', round2(25.85 * 2.0 * 4), r.summary.totalPayOwed, 'FT G3 Sunday 4hr'); } catch(e) { recordText('FS-03', 0, 'ERROR', 'FAIL', e.message); }

  // FT G1 Saturday 3hr (first 3hr @ 1.50) = 3 × $24.28 × 1.50 = $109.26
  try { const r = await calcShift('full_time', cid(1), REF_SATURDAY, '09:00', '12:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('FS-04', round2(24.28 * 1.50 * 3), r.summary.totalPayOwed, 'FT G1 Saturday 3hr (1.50×)'); } catch(e) { recordText('FS-04', 0, 'ERROR', 'FAIL', e.message); }

  // FT G1 PH 4hr = 4 × $24.28 × 2.0 = $194.24
  try { const r = await calcShift('full_time', cid(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('FS-05', round2(24.28 * 2.0 * 4), r.summary.totalPayOwed, 'FT G1 PH 4hr (2.0×)'); } catch(e) { recordText('FS-05', 0, 'ERROR', 'FAIL', e.message); }
}

async function runRegressionTests() {
  console.log('\n═══ SECTION 8 — REGRESSION ═══');
  // Casual G1 PH 4hr = 4 × $30.35 × 1.80 = $218.52
  try { const r = await calcShift('casual', cid(1), REF_PH, '10:00', '14:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('RT-01', round2(30.35 * 1.80 * 4), r.summary.totalPayOwed, 'Casual G1 PH 4hr'); } catch(e) { recordText('RT-01', 0, 'ERROR', 'FAIL', e.message); }

  // FT G6 weekday 4hr (ordinary) = 4 × $29.00 = $116.00
  try { const r = await calcShift('full_time', cid(6), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('RT-02', round2(29.00 * 4), r.summary.totalPayOwed, 'FT G6 weekday 4hr'); } catch(e) { recordText('RT-02', 0, 'ERROR', 'FAIL', e.message); }

  // Casual G4 afternoon 4hr = 4 × $33.38 × 1.16 = $154.88 (rounded)
  try { const r = await calcShift('casual', cid(4), REF_MONDAY, '14:00', '18:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('RT-03', round2(33.38 * 1.16 * 4), r.summary.totalPayOwed, 'Casual G4 afternoon 4hr (1.16×)'); } catch(e) { recordText('RT-03', 0, 'ERROR', 'FAIL', e.message); }

  // FT G2 afternoon 4hr = 4 × $24.95 × 1.20 = $119.76
  try { const r = await calcShift('full_time', cid(2), REF_MONDAY, '14:00', '18:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('RT-04', round2(24.95 * 1.20 * 4), r.summary.totalPayOwed, 'FT G2 afternoon 4hr (1.20×)'); } catch(e) { recordText('RT-04', 0, 'ERROR', 'FAIL', e.message); }
}

async function main() {
  console.log('WageCheck Funeral Industry Award Test Runner — MA000105');
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
