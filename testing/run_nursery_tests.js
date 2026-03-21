/**
 * Nursery Award Test Runner — MA000033
 * Run: node testing/run_nursery_tests.js
 */
const path = require('path');
const { createTestRunner } = require('./lib/testFramework');
const t = createTestRunner('MA000033', path.join(__dirname, 'Nursery_Testing_Plan.xlsx'));
const { record, recordText, skip, classId, calcShift, calcMultiShift, round2, payOnly,
        pool, awardCode: AWARD_CODE,
        REF_MONDAY, REF_TUESDAY, REF_WEDNESDAY, REF_THURSDAY, REF_FRIDAY,
        REF_SATURDAY, REF_SUNDAY, REF_PH } = t;
const cid = (level) => classId(level, 'nursery');

async function runAllTests() {
  console.log('\n═══ SECTION 1 — BASE RATES ═══');
  for (const b of [
    { id: 'BR-01', level: 1, expected: 24.28, title: 'Grade 1A' },
    { id: 'BR-02', level: 2, expected: 24.95, title: 'Grade 1B' },
    { id: 'BR-03', level: 3, expected: 25.38, title: 'Grade 2' },
    { id: 'BR-04', level: 4, expected: 26.55, title: 'Grade 3' },
    { id: 'BR-05', level: 5, expected: 28.12, title: 'Grade 4' },
    { id: 'BR-06', level: 6, expected: 31.06, title: 'Grade 5' },
    { id: 'BR-07', level: 7, expected: 33.82, title: 'Grade 6' },
  ]) {
    try { const r = await calcShift('full_time', cid(b.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(b.id, b.expected, r.baseHourlyRate, b.title); } catch(e) { recordText(b.id, b.expected, 'ERROR', 'FAIL', e.message); }
  }
  console.log('\n1.2 Casual');
  for (const c of [
    { id: 'CL-01', level: 1, expected: 30.35 }, { id: 'CL-02', level: 4, expected: 33.19 },
    { id: 'CL-03', level: 5, expected: 35.15 }, { id: 'CL-04', level: 7, expected: 42.28 },
  ]) {
    try { const r = await calcShift('casual', cid(c.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(c.id, c.expected, r.baseHourlyRate); } catch(e) { recordText(c.id, c.expected, 'ERROR', 'FAIL', e.message); }
  }
  // Junior: <16=50%, 16=60%, 17=70%, 18=80%, 19=90%, 20+=adult (same as MA000028)
  console.log('\n1.3 Junior');
  for (const j of [
    { id: 'JR-01', level: 1, age: 15, expected: 12.14, note: '<16 = 50%' },
    { id: 'JR-02', level: 1, age: 17, expected: 17.00, note: '17yr = 70%' },
    { id: 'JR-03', level: 1, age: 19, expected: 21.85, note: '19yr = 90%' },
    { id: 'JR-04', level: 1, age: 20, expected: 24.28, note: '20yr = adult' },
  ]) {
    try { const r = await calcShift('full_time', cid(j.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: j.age }); record(j.id, j.expected, r.baseHourlyRate, j.note); } catch(e) { recordText(j.id, j.expected, 'ERROR', 'FAIL', e.message); }
  }

  console.log('\n═══ SECTION 2 — PENALTY RATES ═══');
  // No time bands. Sat 1.25× FT / 1.20× casual, Sun 2.0× FT / 1.80× casual, PH 2.50× FT / 2.20× casual
  const base1 = 24.28;
  try { const r = await calcShift('full_time', cid(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-01', round2(base1 * 1.25), r.shifts[0].segments[0]?.effectiveRate, 'Saturday 1.25×'); } catch(e) { recordText('PR-01', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', cid(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-02', round2(base1 * 2.0), r.shifts[0].segments[0]?.effectiveRate, 'Sunday 2.0×'); } catch(e) { recordText('PR-02', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', cid(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-03', round2(base1 * 2.50), r.shifts[0].segments[0]?.effectiveRate, 'PH 2.50×'); } catch(e) { recordText('PR-03', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('casual', cid(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PC-01', round2(30.35 * 1.20), r.shifts[0].segments[0]?.effectiveRate, 'Casual Sat 1.20×'); } catch(e) { recordText('PC-01', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('casual', cid(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PC-02', round2(30.35 * 1.80), r.shifts[0].segments[0]?.effectiveRate, 'Casual Sunday 1.80×'); } catch(e) { recordText('PC-02', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('casual', cid(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PC-03', round2(30.35 * 2.20), r.shifts[0].segments[0]?.effectiveRate, 'Casual PH 2.20×'); } catch(e) { recordText('PC-03', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n═══ SECTION 3 — OVERTIME (weekly 38hr/41hr, 3hr band) ═══');
  try {
    const shifts = [];
    for (let d = 7; d <= 11; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '08:00', endTime: '16:30', mealBreakTaken: true, mealBreakDuration: 30 });
    const r = await calcMultiShift('full_time', cid(1), shifts);
    record('WO-01', round2(40 * base1 + 2 * base1 * 0.5), payOnly(r), '40hr week, 2hr OT');
  } catch(e) { recordText('WO-01', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n═══ SECTION 4 — MIN ENGAGEMENT (2hr) ═══');
  try { const r = await calcShift('casual', cid(1), REF_MONDAY, '10:00', '11:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('ME-01', 60.70, r.summary.totalPayOwed, 'Casual 1hr → 2hr min'); } catch(e) { recordText('ME-01', 60.70, 'ERROR', 'FAIL', e.message); }

  console.log('\n═══ SECTION 5 — ALLOWANCES ═══');
  try {
    const r = await pool.query("SELECT allowance_type, amount FROM allowances WHERE award_code = $1 AND effective_date >= '2025-07-01' AND amount IS NOT NULL ORDER BY allowance_type", [AWARD_CODE]);
    for (const row of r.rows) { const a = parseFloat(row.amount);
      if (row.allowance_type === 'first_aid') record('AL-01', 0.47, a, 'First aid per hour');
      if (row.allowance_type === 'meal') record('AL-02', 17.19, a, 'Meal allowance');
    }
  } catch(e) { recordText('AL-01', 'N/A', 'ERROR', 'FAIL', e.message); }

  console.log('\n═══ SECTION 6 — SUPER + REGRESSION ═══');
  try { const r = await calcShift('full_time', cid(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('SU-01', 0.12, r.summary.sgcRate, 'SGC 12%'); } catch(e) { recordText('SU-01', 0.12, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('casual', cid(1), REF_SUNDAY, '10:00', '14:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('RT-01', round2(30.35 * 1.80 * 4), r.summary.totalPayOwed, 'Casual Sunday 4hr'); } catch(e) { recordText('RT-01', 0, 'ERROR', 'FAIL', e.message); }
}

async function main() {
  console.log('WageCheck Nursery Award Test Runner — MA000033');
  console.log('═'.repeat(60));
  await t.init(); await runAllTests(); t.printSummary(); t.generateExcel(); await t.cleanup();
}
main().catch(e => { console.error('Fatal:', e); t.cleanup(); process.exit(1); });
