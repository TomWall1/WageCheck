/**
 * Sporting Organisations Award Test Runner — MA000082
 * Run: node testing/run_sporting_tests.js
 */
const path = require('path');
const { createTestRunner } = require('./lib/testFramework');
const t = createTestRunner('MA000082', path.join(__dirname, 'Sporting_Testing_Plan.xlsx'));
const { record, recordText, skip, classId, calcShift, calcMultiShift, round2, payOnly,
        pool, awardCode: AWARD_CODE,
        REF_MONDAY, REF_TUESDAY, REF_WEDNESDAY, REF_THURSDAY, REF_FRIDAY,
        REF_SATURDAY, REF_SUNDAY, REF_PH } = t;
const coachId = (level) => classId(level, 'coach');
const clericalId = (level) => classId(level, 'clerical');

async function runAllTests() {
  console.log('\n═══ SECTION 1 — BASE RATES ═══');
  console.log('\n1.1 Coach stream (FT)');
  for (const b of [
    { id: 'BR-01', level: 1, expected: 31.92 }, { id: 'BR-02', level: 2, expected: 35.82 },
    { id: 'BR-03', level: 3, expected: 43.04 }, { id: 'BR-04', level: 4, expected: 48.81 },
  ]) {
    try { const r = await calcShift('full_time', coachId(b.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(b.id, b.expected, r.baseHourlyRate, `Coach L${b.level}`); } catch(e) { recordText(b.id, b.expected, 'ERROR', 'FAIL', e.message); }
  }
  console.log('\n1.2 Clerical stream (FT)');
  for (const b of [
    { id: 'BR-05', level: 1, expected: 26.24 }, { id: 'BR-06', level: 2, expected: 27.08 },
    { id: 'BR-07', level: 3, expected: 28.12 }, { id: 'BR-08', level: 4, expected: 29.29 },
    { id: 'BR-09', level: 5, expected: 30.68 }, { id: 'BR-10', level: 6, expected: 32.17 },
  ]) {
    try { const r = await calcShift('full_time', clericalId(b.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(b.id, b.expected, r.baseHourlyRate, `Clerical L${b.level}`); } catch(e) { recordText(b.id, b.expected, 'ERROR', 'FAIL', e.message); }
  }

  console.log('\n1.3 Casual loading');
  for (const c of [
    { id: 'CL-01', level: 1, stream: 'coach', expected: 39.90, fn: coachId },
    { id: 'CL-02', level: 3, stream: 'coach', expected: 53.80, fn: coachId },
    { id: 'CL-03', level: 1, stream: 'clerical', expected: 32.80, fn: clericalId },
    { id: 'CL-04', level: 4, stream: 'clerical', expected: 36.61, fn: clericalId },
  ]) {
    try { const r = await calcShift('casual', c.fn(c.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(c.id, c.expected, r.baseHourlyRate, `Casual ${c.stream} L${c.level}`); } catch(e) { recordText(c.id, c.expected, 'ERROR', 'FAIL', e.message); }
  }

  console.log('\n1.4 Junior (under 18=70%, 18=80%, 19=90%)');
  for (const j of [
    { id: 'JR-01', level: 1, age: 17, expected: round2(26.24 * 0.70), note: '17yr clerical = 70%' },
    { id: 'JR-02', level: 1, age: 18, expected: round2(26.24 * 0.80), note: '18yr clerical = 80%' },
    { id: 'JR-03', level: 1, age: 19, expected: round2(26.24 * 0.90), note: '19yr clerical = 90%' },
    { id: 'JR-04', level: 1, age: 20, expected: 26.24, note: '20yr clerical = adult' },
  ]) {
    try { const r = await calcShift('full_time', clericalId(j.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: j.age }); record(j.id, j.expected, r.baseHourlyRate, j.note); } catch(e) { recordText(j.id, j.expected, 'ERROR', 'FAIL', e.message); }
  }

  console.log('\n═══ SECTION 2 — PENALTY RATES ═══');
  console.log('\n2.1 Coach — PH only (no Sat/Sun penalty)');
  const coachBase1 = 31.92;
  try { const r = await calcShift('full_time', coachId(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-01', coachBase1, r.shifts[0].segments[0]?.effectiveRate, 'Coach Sat = ordinary (1.0×)'); } catch(e) { recordText('PR-01', coachBase1, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', coachId(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-02', coachBase1, r.shifts[0].segments[0]?.effectiveRate, 'Coach Sun = ordinary (1.0×)'); } catch(e) { recordText('PR-02', coachBase1, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', coachId(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-03', round2(coachBase1 * 2.50), r.shifts[0].segments[0]?.effectiveRate, 'Coach PH FT 2.5×'); } catch(e) { recordText('PR-03', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('casual', coachId(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-04', round2(39.90 * 2.20), r.shifts[0].segments[0]?.effectiveRate, 'Coach PH casual 2.2×'); } catch(e) { recordText('PR-04', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n2.2 Clerical — PH');
  const clerBase1 = 26.24;
  try { const r = await calcShift('full_time', clericalId(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-05', clerBase1, r.shifts[0].segments[0]?.effectiveRate, 'Clerical Sat = ordinary (1.0×)'); } catch(e) { recordText('PR-05', clerBase1, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', clericalId(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-06', clerBase1, r.shifts[0].segments[0]?.effectiveRate, 'Clerical Sun = ordinary (1.0×)'); } catch(e) { recordText('PR-06', clerBase1, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', clericalId(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-07', round2(clerBase1 * 2.50), r.shifts[0].segments[0]?.effectiveRate, 'Clerical PH FT 2.5×'); } catch(e) { recordText('PR-07', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('casual', clericalId(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-08', round2(32.80 * 2.20), r.shifts[0].segments[0]?.effectiveRate, 'Clerical PH casual 2.2×'); } catch(e) { recordText('PR-08', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n═══ SECTION 3 — OVERTIME (clerical only, 38hr/40hr) ═══');
  try {
    const shifts = [];
    for (let d = 7; d <= 11; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '08:00', endTime: '16:30', mealBreakTaken: true, mealBreakDuration: 30 });
    const r = await calcMultiShift('full_time', clericalId(1), shifts);
    // 5 × 8hr = 40hr. 38hr ordinary + 2hr OT @1.5×
    // 38 × 26.24 + 2 × 26.24 × 1.5 = 997.12 + 78.72 = 1075.84
    record('WO-01', round2(38 * clerBase1 + 2 * clerBase1 * 1.5), payOnly(r), 'Clerical FT 40hr week, 2hr OT @1.5×');
  } catch(e) { recordText('WO-01', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n═══ SECTION 4 — MIN ENGAGEMENT (2hr) ═══');
  try { const r = await calcShift('casual', clericalId(1), REF_MONDAY, '10:00', '11:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('ME-01', round2(32.80 * 2), r.summary.totalPayOwed, 'Casual clerical 1hr → 2hr min'); } catch(e) { recordText('ME-01', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('casual', coachId(1), REF_MONDAY, '10:00', '11:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('ME-02', round2(39.90 * 2), r.summary.totalPayOwed, 'Casual coach 1hr → 2hr min'); } catch(e) { recordText('ME-02', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n═══ SECTION 5 — ALLOWANCES ═══');
  try {
    const r = await pool.query("SELECT allowance_type, amount FROM allowances WHERE award_code = $1 AND amount IS NOT NULL ORDER BY allowance_type", [AWARD_CODE]);
    for (const row of r.rows) { const a = parseFloat(row.amount);
      if (row.allowance_type === 'meal') record('AL-01', 18.38, a, 'Meal allowance');
      if (row.allowance_type === 'vehicle') record('AL-02', 0.98, a, 'Vehicle per km');
    }
  } catch(e) { recordText('AL-01', 'N/A', 'ERROR', 'FAIL', e.message); }

  console.log('\n═══ SECTION 6 — SUPER ═══');
  try { const r = await calcShift('full_time', clericalId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('SU-01', 0.12, r.summary.sgcRate, 'SGC 12%'); } catch(e) { recordText('SU-01', 0.12, 'ERROR', 'FAIL', e.message); }

  console.log('\n═══ SECTION 7 — REGRESSION ═══');
  try { const r = await calcShift('casual', coachId(2), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('RT-01', round2(44.78 * 4), r.summary.totalPayOwed, 'Casual coach L2 weekday 4hr'); } catch(e) { recordText('RT-01', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', clericalId(3), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('RT-02', round2(28.12 * 2.50 * 4), r.summary.totalPayOwed, 'FT clerical L3 PH 4hr'); } catch(e) { recordText('RT-02', 0, 'ERROR', 'FAIL', e.message); }
}

async function main() {
  console.log('WageCheck Sporting Organisations Award Test Runner — MA000082');
  console.log('═'.repeat(60));
  await t.init(); await runAllTests(); t.printSummary(); t.generateExcel(); await t.cleanup();
}
main().catch(e => { console.error('Fatal:', e); t.cleanup(); process.exit(1); });
