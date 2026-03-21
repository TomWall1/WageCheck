/**
 * Passenger Vehicle Transportation Award Test Runner — MA000063
 * Run: node testing/run_transport_tests.js
 */
const path = require('path');
const { createTestRunner } = require('./lib/testFramework');
const t = createTestRunner('MA000063', path.join(__dirname, 'Transport_Testing_Plan.xlsx'));
const { record, recordText, skip, classId, calcShift, calcMultiShift, round2, payOnly,
        pool, awardCode: AWARD_CODE,
        REF_MONDAY, REF_TUESDAY, REF_WEDNESDAY, REF_THURSDAY, REF_FRIDAY,
        REF_SATURDAY, REF_SUNDAY, REF_PH } = t;
const cid = (level) => classId(level, 'transport');

async function runAllTests() {
  console.log('\n═══ SECTION 1 — BASE RATES ═══');
  console.log('\n1.1 Full-time');
  for (const b of [
    { id: 'BR-01', level: 1, expected: 26.10 }, { id: 'BR-02', level: 2, expected: 26.70 },
    { id: 'BR-03', level: 3, expected: 28.21 }, { id: 'BR-04', level: 4, expected: 29.20 },
    { id: 'BR-05', level: 5, expected: 30.81 }, { id: 'BR-06', level: 6, expected: 32.17 },
  ]) {
    try { const r = await calcShift('full_time', cid(b.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(b.id, b.expected, r.baseHourlyRate, `G${b.level}`); } catch(e) { recordText(b.id, b.expected, 'ERROR', 'FAIL', e.message); }
  }
  console.log('\n1.2 Casual');
  for (const c of [
    { id: 'CL-01', level: 1, expected: 32.63 }, { id: 'CL-02', level: 3, expected: 35.26 },
    { id: 'CL-03', level: 6, expected: 40.21 },
  ]) {
    try { const r = await calcShift('casual', cid(c.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(c.id, c.expected, r.baseHourlyRate); } catch(e) { recordText(c.id, c.expected, 'ERROR', 'FAIL', e.message); }
  }

  console.log('\n═══ SECTION 2 — PENALTY RATES ═══');
  const base1 = 26.10;
  const cas1 = 32.63;
  // FT Saturday ×1.50
  try { const r = await calcShift('full_time', cid(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-01', round2(base1 * 1.50), r.shifts[0].segments[0]?.effectiveRate, 'FT Saturday ×1.50'); } catch(e) { recordText('PR-01', 0, 'ERROR', 'FAIL', e.message); }
  // FT Sunday ×2.00
  try { const r = await calcShift('full_time', cid(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-02', round2(base1 * 2.00), r.shifts[0].segments[0]?.effectiveRate, 'FT Sunday ×2.00'); } catch(e) { recordText('PR-02', 0, 'ERROR', 'FAIL', e.message); }
  // FT Public holiday ×2.50
  try { const r = await calcShift('full_time', cid(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-03', round2(base1 * 2.50), r.shifts[0].segments[0]?.effectiveRate, 'FT PH ×2.50'); } catch(e) { recordText('PR-03', 0, 'ERROR', 'FAIL', e.message); }
  // FT Early/late ×1.15 (test with shift before 6am)
  try { const r = await calcShift('full_time', cid(1), REF_MONDAY, '04:00', '06:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-04', round2(base1 * 1.15), r.shifts[0].segments[0]?.effectiveRate, 'FT Early morning (before 6am) ×1.15'); } catch(e) { recordText('PR-04', 0, 'ERROR', 'FAIL', e.message); }
  // Casual Saturday ×1.40 of casual base
  try { const r = await calcShift('casual', cid(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PC-01', round2(cas1 * 1.40), r.shifts[0].segments[0]?.effectiveRate, 'Casual Saturday ×1.40'); } catch(e) { recordText('PC-01', 0, 'ERROR', 'FAIL', e.message); }
  // Casual Sunday ×1.80 of casual base
  try { const r = await calcShift('casual', cid(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PC-02', round2(cas1 * 1.80), r.shifts[0].segments[0]?.effectiveRate, 'Casual Sunday ×1.80'); } catch(e) { recordText('PC-02', 0, 'ERROR', 'FAIL', e.message); }
  // Casual PH ×2.20 of casual base
  try { const r = await calcShift('casual', cid(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PC-03', round2(cas1 * 2.20), r.shifts[0].segments[0]?.effectiveRate, 'Casual PH ×2.20'); } catch(e) { recordText('PC-03', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n═══ SECTION 3 — OVERTIME ═══');
  // FT 40hr week: 5 × 8hr shifts = 40 total → 2hr OT at ×1.50
  try {
    const shifts = [];
    for (let d = 6; d <= 10; d++) shifts.push({ date: `2025-10-${String(d).padStart(2,'0')}`, startTime: '08:00', endTime: '16:30', mealBreakTaken: true, mealBreakDuration: 30 });
    const r = await calcMultiShift('full_time', cid(1), shifts);
    // 38hr ordinary @ $26.10 = $991.80  +  2hr OT @ $26.10×1.50 = $78.30  = $1070.10
    record('WO-01', 1070.10, payOnly(r), 'FT 40hr week (38 ordinary + 2hr OT at ×1.50)');
  } catch(e) { recordText('WO-01', 1070.10, 'ERROR', 'FAIL', e.message); }

  console.log('\n═══ SECTION 4 — MIN ENGAGEMENT (2hr) ═══');
  // Casual 1hr shift → should be paid for 2hr minimum
  try { const r = await calcShift('casual', cid(1), REF_MONDAY, '10:00', '11:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('ME-01', round2(cas1 * 2), r.summary.totalPayOwed, 'Casual 1hr → 2hr min'); } catch(e) { recordText('ME-01', round2(cas1 * 2), 'ERROR', 'FAIL', e.message); }

  console.log('\n═══ SECTION 5 — ALLOWANCES ═══');
  try {
    const r = await pool.query("SELECT allowance_type, amount FROM allowances WHERE award_code = $1 AND effective_date >= '2025-10-03' AND amount IS NOT NULL ORDER BY allowance_type", [AWARD_CODE]);
    for (const row of r.rows) { const a = parseFloat(row.amount);
      if (row.allowance_type === 'first_aid') record('AL-01', 20.37, a, 'First aid per week');
      if (row.allowance_type === 'meal') record('AL-02', 16.72, a, 'Meal allowance');
      if (row.allowance_type === 'vehicle') record('AL-03', 0.98, a, 'Vehicle per km');
    }
  } catch(e) { recordText('AL-01', 'N/A', 'ERROR', 'FAIL', e.message); }

  console.log('\n═══ SECTION 6 — SUPER ═══');
  try { const r = await calcShift('full_time', cid(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('SU-01', 0.12, r.summary.sgcRate, 'SGC 12%'); } catch(e) { recordText('SU-01', 0.12, 'ERROR', 'FAIL', e.message); }

  console.log('\n═══ SECTION 7 — FULL-SHIFT CALCS ═══');
  // FT 4hr weekday: 4 × $26.10 = $104.40
  try { const r = await calcShift('full_time', cid(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('FS-01', round2(base1 * 4), r.summary.totalPayOwed, 'FT 4hr weekday'); } catch(e) { recordText('FS-01', round2(base1 * 4), 'ERROR', 'FAIL', e.message); }
  // FT 4hr Saturday: 4 × $26.10 × 1.50 = $156.60
  try { const r = await calcShift('full_time', cid(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('FS-02', round2(base1 * 1.50 * 4), r.summary.totalPayOwed, 'FT 4hr Saturday'); } catch(e) { recordText('FS-02', round2(base1 * 1.50 * 4), 'ERROR', 'FAIL', e.message); }
  // Casual 4hr Sunday: 4 × $32.63 × 1.80 = $234.94
  try { const r = await calcShift('casual', cid(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('FS-03', round2(cas1 * 1.80 * 4), r.summary.totalPayOwed, 'Casual 4hr Sunday'); } catch(e) { recordText('FS-03', round2(cas1 * 1.80 * 4), 'ERROR', 'FAIL', e.message); }

  console.log('\n═══ SECTION 8 — REGRESSION ═══');
  // Casual Saturday 4hr: 4 × $32.63 × 1.40 = $182.73
  try { const r = await calcShift('casual', cid(1), REF_SATURDAY, '10:00', '14:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('RT-01', round2(cas1 * 1.40 * 4), r.summary.totalPayOwed, 'Casual Saturday 4hr'); } catch(e) { recordText('RT-01', 0, 'ERROR', 'FAIL', e.message); }
  // FT Sunday 4hr: 4 × $26.10 × 2.00 = $208.80
  try { const r = await calcShift('full_time', cid(1), REF_SUNDAY, '10:00', '14:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('RT-02', round2(base1 * 2.00 * 4), r.summary.totalPayOwed, 'FT Sunday 4hr'); } catch(e) { recordText('RT-02', 0, 'ERROR', 'FAIL', e.message); }
}

async function main() {
  console.log('WageCheck Passenger Vehicle Transportation Award Test Runner — MA000063');
  console.log('═'.repeat(60));
  await t.init(); await runAllTests(); t.printSummary(); t.generateExcel(); await t.cleanup();
}
main().catch(e => { console.error('Fatal:', e); t.cleanup(); process.exit(1); });
