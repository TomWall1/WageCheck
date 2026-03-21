/**
 * Cleaning Services Award Test Runner — MA000022
 * Run: node testing/run_cleaning_tests.js
 */
const path = require('path');
const { createTestRunner } = require('./lib/testFramework');
const t = createTestRunner('MA000022', path.join(__dirname, 'Cleaning_Testing_Plan.xlsx'));
const { record, recordText, skip, classId, calcShift, calcMultiShift, round2, payOnly,
        pool, awardCode: AWARD_CODE,
        REF_MONDAY, REF_TUESDAY, REF_WEDNESDAY, REF_THURSDAY, REF_FRIDAY,
        REF_SATURDAY, REF_SUNDAY, REF_PH } = t;

const cid = (level) => classId(level, 'cleaning');

async function runBaseRateTests() {
  console.log('\n═══ SECTION 1 — BASE RATES ═══');
  // Note: PT has DIFFERENT base rates (includes loading) — PT rates are higher than FT
  for (const b of [
    { id: 'BR-01', level: 1, expected: 25.85, title: 'L1 FT' },
    { id: 'BR-02', level: 2, expected: 26.70, title: 'L2 FT' },
    { id: 'BR-03', level: 3, expected: 28.12, title: 'L3 FT' },
  ]) {
    try { const r = await calcShift('full_time', cid(b.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(b.id, b.expected, r.baseHourlyRate, b.title); } catch(e) { recordText(b.id, b.expected, 'ERROR', 'FAIL', e.message); }
  }
  console.log('\n1.2 PT rates (includes loading — higher than FT)');
  for (const b of [
    { id: 'BR-04', level: 1, expected: 29.73, title: 'L1 PT (includes loading)' },
    { id: 'BR-05', level: 2, expected: 30.71, title: 'L2 PT' },
    { id: 'BR-06', level: 3, expected: 32.34, title: 'L3 PT' },
  ]) {
    try { const r = await calcShift('part_time', cid(b.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(b.id, b.expected, r.baseHourlyRate, b.title); } catch(e) { recordText(b.id, b.expected, 'ERROR', 'FAIL', e.message); }
  }
  console.log('\n1.3 Casual rates');
  for (const c of [
    { id: 'CL-01', level: 1, expected: 32.31, title: 'L1 casual' },
    { id: 'CL-02', level: 2, expected: 33.38, title: 'L2 casual' },
    { id: 'CL-03', level: 3, expected: 35.15, title: 'L3 casual' },
  ]) {
    try { const r = await calcShift('casual', cid(c.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(c.id, c.expected, r.baseHourlyRate, c.title); } catch(e) { recordText(c.id, c.expected, 'ERROR', 'FAIL', e.message); }
  }
  // Junior rates — shopping trolley only (under 16=45%, 16=50%, 17=60%, 18=70%, 19=80%, 20=90%)
  console.log('\n1.4 Junior rates');
  for (const j of [
    { id: 'JR-01', level: 1, age: 15, expected: 11.63, note: 'Under 16 = 45%' },
    { id: 'JR-02', level: 1, age: 17, expected: 15.51, note: '17yr = 60%' },
    { id: 'JR-03', level: 1, age: 20, expected: 23.27, note: '20yr = 90%' },
    { id: 'JR-04', level: 1, age: 21, expected: 25.85, note: '21yr = adult' },
  ]) {
    try { const r = await calcShift('full_time', cid(j.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: j.age }); record(j.id, j.expected, r.baseHourlyRate, j.note); } catch(e) { recordText(j.id, j.expected, 'ERROR', 'FAIL', e.message); }
  }
}

async function runPenaltyRateTests() {
  console.log('\n═══ SECTION 2 — PENALTY RATES ═══');
  // FT: evening 6pm-midnight 1.15×, night midnight-6am 1.30×, Sat 1.50×, Sun 2.0×, PH 2.50×
  // Casual: evening 1.12×, night 1.24×, Sat 1.40×, Sun 1.80×, PH 2.20×
  // PT: has own multipliers
  for (const p of [
    { id: 'PR-01', level: 1, base: 25.85 },
    { id: 'PR-02', level: 3, base: 28.12 },
  ]) {
    const c = cid(p.level);
    try { const r = await calcShift('full_time', c, REF_MONDAY, '18:00', '22:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(`${p.id}-eve`, round2(p.base * 1.15), r.shifts[0].segments[0]?.effectiveRate, 'FT evening 6pm-midnight (1.15×)'); } catch(e) { recordText(`${p.id}-eve`, 0, 'ERROR', 'FAIL', e.message); }
    try { const r = await calcShift('full_time', c, REF_MONDAY, '01:00', '05:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(`${p.id}-night`, round2(p.base * 1.30), r.shifts[0].segments[0]?.effectiveRate, 'FT night midnight-6am (1.30×)'); } catch(e) { recordText(`${p.id}-night`, 0, 'ERROR', 'FAIL', e.message); }
    try { const r = await calcShift('full_time', c, REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(`${p.id}-sat`, round2(p.base * 1.50), r.shifts[0].segments[0]?.effectiveRate, 'FT Saturday (1.50×)'); } catch(e) { recordText(`${p.id}-sat`, 0, 'ERROR', 'FAIL', e.message); }
    try { const r = await calcShift('full_time', c, REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(`${p.id}-sun`, round2(p.base * 2.00), r.shifts[0].segments[0]?.effectiveRate, 'FT Sunday (2.0×)'); } catch(e) { recordText(`${p.id}-sun`, 0, 'ERROR', 'FAIL', e.message); }
    try { const r = await calcShift('full_time', c, REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record(`${p.id}-ph`, round2(p.base * 2.50), r.shifts[0].segments[0]?.effectiveRate, 'FT PH (2.50×)'); } catch(e) { recordText(`${p.id}-ph`, 0, 'ERROR', 'FAIL', e.message); }
  }
  console.log('\n2.2 Casual penalties');
  // Casual L1: evening 1.12× of casual, night 1.24×, Sat 1.40×, Sun 1.80×, PH 2.20×
  const casBase = 32.31;
  try { const r = await calcShift('casual', cid(1), REF_MONDAY, '18:00', '22:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PC-01', round2(casBase * 1.12), r.shifts[0].segments[0]?.effectiveRate, 'Casual evening (1.12×)'); } catch(e) { recordText('PC-01', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('casual', cid(1), REF_MONDAY, '01:00', '05:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PC-02', round2(casBase * 1.24), r.shifts[0].segments[0]?.effectiveRate, 'Casual night (1.24×)'); } catch(e) { recordText('PC-02', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('casual', cid(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PC-03', round2(casBase * 1.40), r.shifts[0].segments[0]?.effectiveRate, 'Casual Saturday (1.40×)'); } catch(e) { recordText('PC-03', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('casual', cid(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PC-04', round2(casBase * 1.80), r.shifts[0].segments[0]?.effectiveRate, 'Casual Sunday (1.80×)'); } catch(e) { recordText('PC-04', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('casual', cid(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PC-05', round2(casBase * 2.20), r.shifts[0].segments[0]?.effectiveRate, 'Casual PH (2.20×)'); } catch(e) { recordText('PC-05', 0, 'ERROR', 'FAIL', e.message); }
}

async function runOvertimeTests() {
  console.log('\n═══ SECTION 3 — OVERTIME ═══');
  // Weekly only: FT 38hr/40hr, casual ×1.40/×1.80, PT ×1.305/×1.739
  try {
    const shifts = [];
    for (let d = 7; d <= 11; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '08:00', endTime: '16:30', mealBreakTaken: true, mealBreakDuration: 30 });
    const r = await calcMultiShift('full_time', cid(1), shifts);
    // 40×25.85 = $1034 + 2×25.85×0.5 = $25.85 OT premium = $1059.85
    record('WO-01', 1059.85, payOnly(r), 'FT L1 40hr week, 2hr OT (excl meal)');
  } catch(e) { recordText('WO-01', 1061.90, 'ERROR', 'FAIL', e.message); }
}

async function runMinEngagementTests() {
  console.log('\n═══ SECTION 4 — MINIMUM ENGAGEMENT (2hr) ═══');
  try { const r = await calcShift('casual', cid(1), REF_MONDAY, '10:00', '11:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('ME-01', 64.62, r.summary.totalPayOwed, 'Casual 1hr → 2hr min'); } catch(e) { recordText('ME-01', 64.62, 'ERROR', 'FAIL', e.message); }
}

async function runAllowanceTests() {
  console.log('\n═══ SECTION 5 — ALLOWANCES ═══');
  try {
    const r = await pool.query("SELECT allowance_type, amount FROM allowances WHERE award_code = $1 AND effective_date >= '2025-07-01' AND amount IS NOT NULL AND amount != '0' ORDER BY allowance_type", [AWARD_CODE]);
    for (const row of r.rows) {
      const amt = parseFloat(row.amount);
      if (row.allowance_type === 'broken_shift') record('AL-01', 4.50, amt, 'Broken shift per day');
      if (row.allowance_type === 'first_aid') record('AL-02', 16.11, amt, 'First aid per week');
      if (row.allowance_type === 'meal') record('AL-03', 16.84, amt, 'Meal allowance');
      if (row.allowance_type === 'toilet_cleaning') record('AL-04', 3.53, amt, 'Toilet cleaning per shift');
      if (row.allowance_type === 'refuse_collection') record('AL-05', 4.48, amt, 'Refuse collection per shift');
      if (row.allowance_type === 'vehicle_car') record('AL-06', 0.99, amt, 'Vehicle car per km');
    }
  } catch(e) { recordText('AL-01', 'N/A', 'ERROR', 'FAIL', e.message); }
}

async function runSuperTests() {
  console.log('\n═══ SECTION 6 — SUPERANNUATION ═══');
  try { const r = await calcShift('full_time', cid(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('SU-01', 0.12, r.summary.sgcRate, 'SGC 12%'); } catch(e) { recordText('SU-01', 0.12, 'ERROR', 'FAIL', e.message); }
}

async function runRegressionTests() {
  console.log('\n═══ SECTION 7 — REGRESSION ═══');
  try { const r = await calcShift('casual', cid(1), REF_SUNDAY, '10:00', '14:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('RT-01', round2(32.31 * 1.80 * 4), r.summary.totalPayOwed, 'Casual L1 Sunday 4hr'); } catch(e) { recordText('RT-01', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', cid(1), REF_MONDAY, '01:00', '05:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('RT-02', round2(25.85 * 1.30 * 4), r.summary.totalPayOwed, 'FT L1 night 1am-5am (1.30×)'); } catch(e) { recordText('RT-02', 0, 'ERROR', 'FAIL', e.message); }
}

async function main() {
  console.log('WageCheck Cleaning Services Award Test Runner — MA000022');
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
