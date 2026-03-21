/**
 * Miscellaneous Award Test Runner — MA000104
 * Run: node testing/run_miscellaneous_tests.js
 */
const path = require('path');
const { createTestRunner } = require('./lib/testFramework');
const t = createTestRunner('MA000104', path.join(__dirname, 'Miscellaneous_Testing_Plan.xlsx'));
const { record, recordText, skip, classId, calcShift, calcMultiShift, round2, payOnly,
        pool, awardCode: AWARD_CODE,
        REF_MONDAY, REF_TUESDAY, REF_WEDNESDAY, REF_THURSDAY, REF_FRIDAY,
        REF_SATURDAY, REF_SUNDAY, REF_PH } = t;
const cid = (level) => classId(level, 'general');

async function runAllTests() {
  console.log('\n═══ SECTION 1 — BASE RATES ═══');
  for (const b of [
    { id: 'BR-01', level: 1, expected: 24.28 }, { id: 'BR-02', level: 2, expected: 25.85 },
    { id: 'BR-03', level: 3, expected: 28.12 }, { id: 'BR-04', level: 4, expected: 30.68 },
  ]) {
    try { const r = await calcShift('full_time', cid(b.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(b.id, b.expected, r.baseHourlyRate, `L${b.level}`); } catch(e) { recordText(b.id, b.expected, 'ERROR', 'FAIL', e.message); }
  }
  console.log('\n1.2 Casual');
  for (const c of [
    { id: 'CL-01', level: 1, expected: 30.35 }, { id: 'CL-02', level: 2, expected: 32.31 },
    { id: 'CL-03', level: 3, expected: 35.15 }, { id: 'CL-04', level: 4, expected: 38.35 },
  ]) {
    try { const r = await calcShift('casual', cid(c.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(c.id, c.expected, r.baseHourlyRate); } catch(e) { recordText(c.id, c.expected, 'ERROR', 'FAIL', e.message); }
  }
  // Unique junior rates: <16=36.8%, 16=47.3%, 17=57.8%, 18=68.3%, 19=82.5%, 20=97.7%, 21+=adult
  console.log('\n1.3 Junior (MA000104 unique scale)');
  for (const j of [
    { id: 'JR-01', level: 1, age: 15, expected: 8.93, note: '<16 = 36.8%' },
    { id: 'JR-02', level: 1, age: 16, expected: 11.49, note: '16yr = 47.3%' },
    { id: 'JR-03', level: 1, age: 17, expected: 14.04, note: '17yr = 57.8%' },
    { id: 'JR-04', level: 1, age: 18, expected: 16.58, note: '18yr = 68.3%' },
    { id: 'JR-05', level: 1, age: 19, expected: 20.03, note: '19yr = 82.5%' },
    { id: 'JR-06', level: 1, age: 20, expected: 23.73, note: '20yr = 97.7%' },
    { id: 'JR-07', level: 1, age: 21, expected: 24.28, note: '21yr = adult' },
  ]) {
    try { const r = await calcShift('full_time', cid(j.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: j.age }); record(j.id, j.expected, r.baseHourlyRate, j.note); } catch(e) { recordText(j.id, j.expected, 'ERROR', 'FAIL', e.message); }
  }

  console.log('\n═══ SECTION 2 — PENALTY RATES ═══');
  // Night 7pm-7am 1.20× FT / 1.16× casual, Sat 1.20× FT / 1.16× casual, Sun 1.50× FT / 1.40× casual, PH 2.50× FT / 2.0× casual
  const base1 = 24.28;
  try { const r = await calcShift('full_time', cid(1), REF_MONDAY, '19:00', '23:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-01', round2(base1 * 1.20), r.shifts[0].segments[0]?.effectiveRate, 'Night 7pm-7am FT (1.20×)'); } catch(e) { recordText('PR-01', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', cid(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-02', round2(base1 * 1.20), r.shifts[0].segments[0]?.effectiveRate, 'Saturday FT (1.20×)'); } catch(e) { recordText('PR-02', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', cid(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-03', round2(base1 * 1.50), r.shifts[0].segments[0]?.effectiveRate, 'Sunday FT (1.50×)'); } catch(e) { recordText('PR-03', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', cid(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-04', round2(base1 * 2.50), r.shifts[0].segments[0]?.effectiveRate, 'PH FT (2.50×)'); } catch(e) { recordText('PR-04', 0, 'ERROR', 'FAIL', e.message); }
  // Casual night 1.16×, Sat 1.16×, Sun 1.40×, PH 2.0×
  const casBase = 30.35;
  try { const r = await calcShift('casual', cid(1), REF_MONDAY, '19:00', '23:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PC-01', round2(casBase * 1.16), r.shifts[0].segments[0]?.effectiveRate, 'Casual night (1.16×)'); } catch(e) { recordText('PC-01', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('casual', cid(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PC-02', round2(casBase * 1.16), r.shifts[0].segments[0]?.effectiveRate, 'Casual Saturday (1.16×)'); } catch(e) { recordText('PC-02', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('casual', cid(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PC-03', round2(casBase * 1.40), r.shifts[0].segments[0]?.effectiveRate, 'Casual Sunday (1.40×)'); } catch(e) { recordText('PC-03', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('casual', cid(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PC-04', round2(casBase * 2.0), r.shifts[0].segments[0]?.effectiveRate, 'Casual PH (2.0×)'); } catch(e) { recordText('PC-04', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n═══ SECTION 3 — OVERTIME (daily 10hr/13hr, weekly 38hr/41hr) ═══');
  try { const r = await calcShift('full_time', cid(1), REF_MONDAY, '07:00', '17:30', { mealBreakTaken: true, mealBreakDuration: 30 }); record('DO-01', round2(10 * base1), payOnly(r), '10hr, no OT'); } catch(e) { recordText('DO-01', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', cid(1), REF_MONDAY, '07:00', '18:30', { mealBreakTaken: true, mealBreakDuration: 30 }); record('DO-02', round2(11 * base1 + 1 * base1 * 0.5), payOnly(r), '11hr, 1hr daily OT @1.5×'); } catch(e) { recordText('DO-02', 0, 'ERROR', 'FAIL', e.message); }
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
      if (row.allowance_type === 'first_aid') record('AL-01', 21.37, a, 'First aid per week');
      if (row.allowance_type === 'meal') record('AL-02', 23.59, a, 'Meal (1st — two-tier)');
      if (row.allowance_type === 'meal_second') record('AL-03', 21.39, a, 'Meal (subsequent)');
      if (row.allowance_type === 'vehicle_car') record('AL-04', 0.98, a, 'Vehicle per km');
    }
  } catch(e) { recordText('AL-01', 'N/A', 'ERROR', 'FAIL', e.message); }

  console.log('\n═══ SECTION 6 — SUPER ═══');
  try { const r = await calcShift('full_time', cid(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('SU-01', 0.12, r.summary.sgcRate, 'SGC 12%'); } catch(e) { recordText('SU-01', 0.12, 'ERROR', 'FAIL', e.message); }

  console.log('\n═══ SECTION 7 — REGRESSION ═══');
  try { const r = await calcShift('casual', cid(1), REF_SUNDAY, '10:00', '14:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('RT-01', round2(casBase * 1.40 * 4), r.summary.totalPayOwed, 'Casual Sunday 4hr'); } catch(e) { recordText('RT-01', 0, 'ERROR', 'FAIL', e.message); }
}

async function main() {
  console.log('WageCheck Miscellaneous Award Test Runner — MA000104');
  console.log('═'.repeat(60));
  await t.init(); await runAllTests(); t.printSummary(); t.generateExcel(); await t.cleanup();
}
main().catch(e => { console.error('Fatal:', e); t.cleanup(); process.exit(1); });
