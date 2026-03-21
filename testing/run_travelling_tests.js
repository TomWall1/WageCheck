/**
 * Travelling Shows Award Test Runner — MA000102
 * Run: node testing/run_travelling_tests.js
 */
const path = require('path');
const { createTestRunner } = require('./lib/testFramework');
const t = createTestRunner('MA000102', path.join(__dirname, 'Travelling_Testing_Plan.xlsx'));
const { record, recordText, skip, classId, calcShift, calcMultiShift, round2, payOnly,
        pool, awardCode: AWARD_CODE,
        REF_MONDAY, REF_TUESDAY, REF_WEDNESDAY, REF_THURSDAY, REF_FRIDAY,
        REF_SATURDAY, REF_SUNDAY, REF_PH } = t;
const cid = (level) => classId(level, 'general');

async function runAllTests() {
  console.log('\n═══ SECTION 1 — BASE RATES ═══');
  for (const b of [
    { id: 'BR-01', level: 1, expected: 24.28 }, { id: 'BR-02', level: 2, expected: 25.85 },
    { id: 'BR-03', level: 3, expected: 26.70 }, { id: 'BR-04', level: 4, expected: 29.00 },
  ]) {
    try { const r = await calcShift('full_time', cid(b.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(b.id, b.expected, r.baseHourlyRate, `L${b.level}`); } catch(e) { recordText(b.id, b.expected, 'ERROR', 'FAIL', e.message); }
  }
  console.log('\n1.2 Casual (25% loading)');
  for (const c of [
    { id: 'CL-01', level: 1, expected: 30.35 }, { id: 'CL-02', level: 2, expected: 32.31 },
    { id: 'CL-03', level: 4, expected: 36.25 },
  ]) {
    try { const r = await calcShift('casual', cid(c.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(c.id, c.expected, r.baseHourlyRate); } catch(e) { recordText(c.id, c.expected, 'ERROR', 'FAIL', e.message); }
  }
  console.log('\n1.3 Junior (under 19=80%, 19=90%, 20+=adult)');
  for (const j of [
    { id: 'JR-01', level: 1, age: 17, expected: 19.42, note: '<19 = 80%' },
    { id: 'JR-02', level: 1, age: 18, expected: 19.42, note: '18yr = 80%' },
    { id: 'JR-03', level: 1, age: 19, expected: 21.85, note: '19yr = 90%' },
    { id: 'JR-04', level: 1, age: 20, expected: 24.28, note: '20yr = adult' },
  ]) {
    try { const r = await calcShift('full_time', cid(j.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: j.age }); record(j.id, j.expected, r.baseHourlyRate, j.note); } catch(e) { recordText(j.id, j.expected, 'ERROR', 'FAIL', e.message); }
  }

  console.log('\n═══ SECTION 2 — PENALTY RATES ═══');
  const base1 = 24.28;
  const casBase1 = 30.35;
  // No Saturday penalty (1.0×)
  try { const r = await calcShift('full_time', cid(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-01', base1, r.shifts[0].segments[0]?.effectiveRate, 'Saturday = ordinary (1.0×)'); } catch(e) { recordText('PR-01', base1, 'ERROR', 'FAIL', e.message); }
  // No Sunday penalty (1.0×)
  try { const r = await calcShift('full_time', cid(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-02', base1, r.shifts[0].segments[0]?.effectiveRate, 'Sunday = ordinary (1.0×)'); } catch(e) { recordText('PR-02', base1, 'ERROR', 'FAIL', e.message); }
  // PH 1.50× FT
  try { const r = await calcShift('full_time', cid(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-03', round2(base1 * 1.50), r.shifts[0].segments[0]?.effectiveRate, 'PH 1.50× FT'); } catch(e) { recordText('PR-03', 0, 'ERROR', 'FAIL', e.message); }
  // PH 1.80× casual (of base, not casual rate)
  try { const r = await calcShift('casual', cid(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PC-01', round2(casBase1 * 1.80), r.shifts[0].segments[0]?.effectiveRate, 'Casual PH (1.80×)'); } catch(e) { recordText('PC-01', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n═══ SECTION 3 — OVERTIME (38hr ordinary / 40hr threshold) ═══');
  try {
    const shifts = [];
    for (let d = 7; d <= 11; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '08:00', endTime: '16:30', mealBreakTaken: true, mealBreakDuration: 30 });
    const r = await calcMultiShift('full_time', cid(1), shifts);
    record('WO-01', round2(base1 * 38 + base1 * 2 * 1.5), payOnly(r), 'FT 40hr week — 38hr ordinary + 2hr OT @1.5×');
  } catch(e) { recordText('WO-01', 0, 'ERROR', 'FAIL', e.message); }
  // Over 40hr → double time
  try {
    const shifts = [];
    for (let d = 7; d <= 11; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '07:00', endTime: '16:30', mealBreakTaken: true, mealBreakDuration: 30 });
    const r = await calcMultiShift('full_time', cid(1), shifts);
    record('WO-02', round2(base1 * 38 + base1 * 2 * 1.5 + base1 * 5 * 2.0), payOnly(r), 'FT 45hr week — 38 ord + 2hr @1.5× + 5hr @2.0×');
  } catch(e) { recordText('WO-02', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n═══ SECTION 4 — MIN ENGAGEMENT (2hr) ═══');
  try { const r = await calcShift('casual', cid(1), REF_MONDAY, '10:00', '11:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('ME-01', round2(casBase1 * 2), r.summary.totalPayOwed, 'Casual 1hr → 2hr min'); } catch(e) { recordText('ME-01', round2(casBase1 * 2), 'ERROR', 'FAIL', e.message); }

  console.log('\n═══ SECTION 5 — ALLOWANCES ═══');
  try {
    const r = await pool.query("SELECT allowance_type, amount FROM allowances WHERE award_code = $1 AND effective_date >= '2025-07-01' AND amount IS NOT NULL ORDER BY allowance_type", [AWARD_CODE]);
    for (const row of r.rows) { const a = parseFloat(row.amount);
      if (row.allowance_type === 'first_aid') record('AL-01', 0.52, a, 'First aid per hour');
      if (row.allowance_type === 'meal') record('AL-02', 16.03, a, 'Meal allowance');
      if (row.allowance_type === 'vehicle') record('AL-03', 0.98, a, 'Vehicle allowance per km');
      if (row.allowance_type === 'laundry') record('AL-04', 7.20, a, 'Laundry allowance');
      if (row.allowance_type === 'heavy_vehicle') record('AL-05', 14.74, a, 'Heavy vehicle allowance');
    }
  } catch(e) { recordText('AL-01', 'N/A', 'ERROR', 'FAIL', e.message); }

  console.log('\n═══ SECTION 6 — SUPER ═══');
  try { const r = await calcShift('full_time', cid(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('SU-01', 0.12, r.summary.sgcRate, 'SGC 12%'); } catch(e) { recordText('SU-01', 0.12, 'ERROR', 'FAIL', e.message); }

  console.log('\n═══ SECTION 7 — REGRESSION ═══');
  try { const r = await calcShift('casual', cid(1), REF_MONDAY, '10:00', '14:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('RT-01', round2(casBase1 * 4), r.summary.totalPayOwed, 'Casual weekday 4hr'); } catch(e) { recordText('RT-01', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', cid(2), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('RT-02', round2(25.85 * 1.50 * 4), r.summary.totalPayOwed, 'FT L2 PH 4hr'); } catch(e) { recordText('RT-02', 0, 'ERROR', 'FAIL', e.message); }
}

async function main() {
  console.log('WageCheck Travelling Shows Award Test Runner — MA000102');
  console.log('═'.repeat(60));
  await t.init(); await runAllTests(); t.printSummary(); t.generateExcel(); await t.cleanup();
}
main().catch(e => { console.error('Fatal:', e); t.cleanup(); process.exit(1); });
