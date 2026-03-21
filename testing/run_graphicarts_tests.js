/**
 * Graphic Arts Award Test Runner — MA000026
 * Run: node testing/run_graphicarts_tests.js
 */
const path = require('path');
const { createTestRunner } = require('./lib/testFramework');
const t = createTestRunner('MA000026', path.join(__dirname, 'GraphicArts_Testing_Plan.xlsx'));
const { record, recordText, skip, classId, calcShift, calcMultiShift, round2, payOnly,
        pool, awardCode: AWARD_CODE,
        REF_MONDAY, REF_TUESDAY, REF_WEDNESDAY, REF_THURSDAY, REF_FRIDAY,
        REF_SATURDAY, REF_SUNDAY, REF_PH } = t;
const cid = (level) => classId(level, 'general');

async function runAllTests() {
  console.log('\n═══ SECTION 1 — BASE RATES ═══');
  console.log('\n1.1 Full-time (all 8 levels)');
  for (const b of [
    { id: 'BR-01', level: 1, expected: 24.28 }, { id: 'BR-02', level: 2, expected: 24.95 },
    { id: 'BR-03', level: 3, expected: 25.85 }, { id: 'BR-04', level: 4, expected: 26.70 },
    { id: 'BR-05', level: 5, expected: 28.12 }, { id: 'BR-06', level: 6, expected: 29.00 },
    { id: 'BR-07', level: 7, expected: 29.88 }, { id: 'BR-08', level: 8, expected: 30.68 },
  ]) {
    try { const r = await calcShift('full_time', cid(b.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(b.id, b.expected, r.baseHourlyRate, `L${b.level}`); } catch(e) { recordText(b.id, b.expected, 'ERROR', 'FAIL', e.message); }
  }

  console.log('\n1.2 Casual loading');
  for (const c of [
    { id: 'CL-01', level: 1, expected: 30.35 }, { id: 'CL-02', level: 4, expected: 33.38 },
    { id: 'CL-03', level: 8, expected: 38.35 },
  ]) {
    try { const r = await calcShift('casual', cid(c.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(c.id, c.expected, r.baseHourlyRate, `Casual L${c.level}`); } catch(e) { recordText(c.id, c.expected, 'ERROR', 'FAIL', e.message); }
  }

  console.log('\n═══ SECTION 2 — PENALTY RATES ═══');
  const base1 = 24.28; // L1 FT
  const casBase1 = 30.35; // L1 casual
  console.log('\n2.1 Saturday 2.00×');
  try { const r = await calcShift('full_time', cid(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-01', round2(base1 * 2.00), r.shifts[0].segments[0]?.effectiveRate, 'FT Sat 2.00×'); } catch(e) { recordText('PR-01', 0, 'ERROR', 'FAIL', e.message); }
  console.log('\n2.2 Sunday 2.00×');
  try { const r = await calcShift('full_time', cid(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-02', round2(base1 * 2.00), r.shifts[0].segments[0]?.effectiveRate, 'FT Sun 2.00×'); } catch(e) { recordText('PR-02', 0, 'ERROR', 'FAIL', e.message); }
  console.log('\n2.3 Public Holiday 2.50×');
  try { const r = await calcShift('full_time', cid(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-03', round2(base1 * 2.50), r.shifts[0].segments[0]?.effectiveRate, 'FT PH 2.50×'); } catch(e) { recordText('PR-03', 0, 'ERROR', 'FAIL', e.message); }
  skip('PR-04', 'Shift loading 1.20× is whole-shift-based (not time-band) — cannot test via calculator');
  skip('PR-05', 'Non-rotating night 1.30× is whole-shift-based — cannot test via calculator');
  console.log('\n2.6 Casual penalties');
  try { const r = await calcShift('casual', cid(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PC-01', round2(casBase1 * 2.00), r.shifts[0].segments[0]?.effectiveRate, 'Casual Sat 2.00×'); } catch(e) { recordText('PC-01', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('casual', cid(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PC-02', round2(casBase1 * 2.00), r.shifts[0].segments[0]?.effectiveRate, 'Casual Sun 2.00×'); } catch(e) { recordText('PC-02', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('casual', cid(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PC-03', round2(casBase1 * 2.50), r.shifts[0].segments[0]?.effectiveRate, 'Casual PH 2.50×'); } catch(e) { recordText('PC-03', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n═══ SECTION 3 — OVERTIME (weekly 38hr/41hr, 3hr band) ═══');
  try {
    const shifts = [];
    // Mon-Thu 8hr + Fri 9hr = 41hr (3hr OT)
    for (let d = 7; d <= 10; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '08:00', endTime: '16:30', mealBreakTaken: true, mealBreakDuration: 30 });
    shifts.push({ date: '2025-07-11', startTime: '08:00', endTime: '17:30', mealBreakTaken: true, mealBreakDuration: 30 });
    const r = await calcMultiShift('full_time', cid(1), shifts);
    // 38hr ordinary + 3hr OT @1.5×
    // 38 × 24.28 + 3 × 24.28 × 1.5 = 922.64 + 109.26 = 1031.90
    record('WO-01', round2(38 * base1 + 3 * base1 * 1.5), payOnly(r), 'FT 41hr week, 3hr OT @1.5×');
  } catch(e) { recordText('WO-01', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n═══ SECTION 4 — MIN ENGAGEMENT (2hr) ═══');
  try { const r = await calcShift('casual', cid(1), REF_MONDAY, '10:00', '11:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('ME-01', round2(casBase1 * 2), r.summary.totalPayOwed, 'Casual 1hr → 2hr min'); } catch(e) { recordText('ME-01', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n═══ SECTION 5 — ALLOWANCES ═══');
  try {
    const r = await pool.query("SELECT allowance_type, amount FROM allowances WHERE award_code = $1 AND amount IS NOT NULL ORDER BY allowance_type", [AWARD_CODE]);
    for (const row of r.rows) { const a = parseFloat(row.amount);
      if (row.allowance_type === 'meal') record('AL-01', 14.62, a, 'Meal allowance');
      if (row.allowance_type === 'vehicle') record('AL-02', 0.98, a, 'Vehicle per km');
    }
  } catch(e) { recordText('AL-01', 'N/A', 'ERROR', 'FAIL', e.message); }

  console.log('\n═══ SECTION 6 — SUPER ═══');
  try { const r = await calcShift('full_time', cid(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('SU-01', 0.12, r.summary.sgcRate, 'SGC 12%'); } catch(e) { recordText('SU-01', 0.12, 'ERROR', 'FAIL', e.message); }

  console.log('\n═══ SECTION 7 — REGRESSION ═══');
  try { const r = await calcShift('casual', cid(1), REF_SATURDAY, '10:00', '14:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('RT-01', round2(casBase1 * 2.00 * 4), r.summary.totalPayOwed, 'Casual L1 Sat 4hr'); } catch(e) { recordText('RT-01', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', cid(5), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('RT-02', round2(28.12 * 2.50 * 4), r.summary.totalPayOwed, 'FT L5 PH 4hr'); } catch(e) { recordText('RT-02', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', cid(8), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('RT-03', round2(30.68 * 2.00 * 4), r.summary.totalPayOwed, 'FT L8 Sun 4hr'); } catch(e) { recordText('RT-03', 0, 'ERROR', 'FAIL', e.message); }
}

async function main() {
  console.log('WageCheck Graphic Arts Award Test Runner — MA000026');
  console.log('═'.repeat(60));
  await t.init(); await runAllTests(); t.printSummary(); t.generateExcel(); await t.cleanup();
}
main().catch(e => { console.error('Fatal:', e); t.cleanup(); process.exit(1); });
