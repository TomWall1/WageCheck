/**
 * Hair and Beauty Industry Award Test Runner — MA000005
 * Run: node testing/run_hairbeauty_tests.js
 */
const path = require('path');
const { createTestRunner } = require('./lib/testFramework');
const t = createTestRunner('MA000005', path.join(__dirname, 'HairBeauty_Testing_Plan.xlsx'));
const { record, recordText, skip, classId, calcShift, calcMultiShift, round2, payOnly,
        pool, awardCode: AWARD_CODE,
        REF_MONDAY, REF_TUESDAY, REF_WEDNESDAY, REF_THURSDAY, REF_FRIDAY,
        REF_SATURDAY, REF_SUNDAY, REF_PH } = t;
const cid = (level) => classId(level, 'hair_beauty');

async function runAllTests() {
  console.log('\n═══ SECTION 1 — BASE RATES ═══');
  for (const b of [
    { id: 'BR-01', level: 1, expected: 26.55 }, { id: 'BR-02', level: 2, expected: 27.16 },
    { id: 'BR-03', level: 3, expected: 28.12 }, { id: 'BR-04', level: 4, expected: 28.64 },
    { id: 'BR-05', level: 5, expected: 29.49 }, { id: 'BR-06', level: 6, expected: 30.55 },
  ]) {
    try { const r = await calcShift('full_time', cid(b.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(b.id, b.expected, r.baseHourlyRate, `L${b.level}`); } catch(e) { recordText(b.id, b.expected, 'ERROR', 'FAIL', e.message); }
  }
  console.log('\n1.2 Casual (25% loading)');
  for (const c of [
    { id: 'CL-01', level: 1, expected: 33.19 }, { id: 'CL-02', level: 3, expected: 35.15 },
    { id: 'CL-03', level: 6, expected: 38.19 },
  ]) {
    try { const r = await calcShift('casual', cid(c.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(c.id, c.expected, r.baseHourlyRate); } catch(e) { recordText(c.id, c.expected, 'ERROR', 'FAIL', e.message); }
  }
  console.log('\n1.3 Junior (under 17=50%, 17=75%, 18+=adult)');
  for (const j of [
    { id: 'JR-01', level: 1, age: 15, expected: 13.28, note: '<17 = 50%' },
    { id: 'JR-02', level: 1, age: 16, expected: 13.28, note: '16yr = 50%' },
    { id: 'JR-03', level: 1, age: 17, expected: 19.91, note: '17yr = 75%' },
    { id: 'JR-04', level: 1, age: 18, expected: 26.55, note: '18yr = adult' },
  ]) {
    try { const r = await calcShift('full_time', cid(j.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: j.age }); record(j.id, j.expected, r.baseHourlyRate, j.note); } catch(e) { recordText(j.id, j.expected, 'ERROR', 'FAIL', e.message); }
  }

  console.log('\n═══ SECTION 2 — PENALTY RATES ═══');
  const base1 = 26.55;
  const casBase1 = 33.19;
  // FT Saturday 7am-6pm = 1.33×
  try { const r = await calcShift('full_time', cid(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-01', round2(base1 * 1.33), r.shifts[0].segments[0]?.effectiveRate, 'FT Sat 7am-6pm (1.33×)'); } catch(e) { recordText('PR-01', 0, 'ERROR', 'FAIL', e.message); }
  // FT Sunday 2.0×
  try { const r = await calcShift('full_time', cid(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-02', round2(base1 * 2.0), r.shifts[0].segments[0]?.effectiveRate, 'FT Sunday (2.0×)'); } catch(e) { recordText('PR-02', 0, 'ERROR', 'FAIL', e.message); }
  // FT PH 2.50×
  try { const r = await calcShift('full_time', cid(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-03', round2(base1 * 2.50), r.shifts[0].segments[0]?.effectiveRate, 'FT PH (2.50×)'); } catch(e) { recordText('PR-03', 0, 'ERROR', 'FAIL', e.message); }
  // Casual before 7am / after 9pm = 1.20×
  try { const r = await calcShift('casual', cid(1), REF_MONDAY, '05:00', '09:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PC-01', round2(casBase1 * 1.20), r.shifts[0].segments[0]?.effectiveRate, 'Casual before 7am (1.20×)'); } catch(e) { recordText('PC-01', 0, 'ERROR', 'FAIL', e.message); }
  // Casual Saturday 7am-6pm = 1.264×
  try { const r = await calcShift('casual', cid(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PC-02', round2(casBase1 * 1.264), r.shifts[0].segments[0]?.effectiveRate, 'Casual Sat 7am-6pm (1.264×)'); } catch(e) { recordText('PC-02', 0, 'ERROR', 'FAIL', e.message); }
  // Casual Saturday outside 7am-6pm = 1.20×
  try { const r = await calcShift('casual', cid(1), REF_SATURDAY, '05:00', '09:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PC-03', round2(casBase1 * 1.20), r.shifts[0].segments[0]?.effectiveRate, 'Casual Sat outside 7am-6pm (1.20×)'); } catch(e) { recordText('PC-03', 0, 'ERROR', 'FAIL', e.message); }
  // Casual Sunday 1.80×
  try { const r = await calcShift('casual', cid(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PC-04', round2(casBase1 * 1.80), r.shifts[0].segments[0]?.effectiveRate, 'Casual Sunday (1.80×)'); } catch(e) { recordText('PC-04', 0, 'ERROR', 'FAIL', e.message); }
  // Casual PH 2.0×
  try { const r = await calcShift('casual', cid(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PC-05', round2(casBase1 * 2.0), r.shifts[0].segments[0]?.effectiveRate, 'Casual PH (2.0×)'); } catch(e) { recordText('PC-05', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n═══ SECTION 3 — OVERTIME (38hr ordinary / 41hr threshold — 3hr band) ═══');
  try {
    const shifts = [];
    for (let d = 7; d <= 11; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '08:00', endTime: '16:36', mealBreakTaken: true, mealBreakDuration: 30 });
    const r = await calcMultiShift('full_time', cid(1), shifts);
    record('WO-01', round2(base1 * 38 + base1 * 2.5 * 1.5), payOnly(r), 'FT 40.5hr week — 38hr ord + 2.5hr @1.5× (within 3hr band)');
  } catch(e) { recordText('WO-01', 0, 'ERROR', 'FAIL', e.message); }
  try {
    const shifts = [];
    for (let d = 7; d <= 11; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '07:00', endTime: '16:30', mealBreakTaken: true, mealBreakDuration: 30 });
    const r = await calcMultiShift('full_time', cid(1), shifts);
    record('WO-02', round2(base1 * 38 + base1 * 3 * 1.5 + base1 * 4 * 2.0), payOnly(r), 'FT 45hr week — 38 ord + 3hr @1.5× + 4hr @2.0×');
  } catch(e) { recordText('WO-02', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n═══ SECTION 4 — MIN ENGAGEMENT (3hr) ═══');
  try { const r = await calcShift('casual', cid(1), REF_MONDAY, '10:00', '11:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('ME-01', round2(casBase1 * 3), r.summary.totalPayOwed, 'Casual 1hr → 3hr min'); } catch(e) { recordText('ME-01', round2(casBase1 * 3), 'ERROR', 'FAIL', e.message); }

  console.log('\n═══ SECTION 5 — ALLOWANCES ═══');
  try {
    const r = await pool.query("SELECT allowance_type, amount FROM allowances WHERE award_code = $1 AND effective_date >= '2025-07-01' AND amount IS NOT NULL ORDER BY allowance_type", [AWARD_CODE]);
    for (const row of r.rows) { const a = parseFloat(row.amount);
      if (row.allowance_type === 'first_aid') record('AL-01', 13.89, a, 'First aid per week');
      if (row.allowance_type === 'meal') record('AL-02', 23.74, a, 'Meal allowance');
      if (row.allowance_type === 'laundry') record('AL-03', 7.20, a, 'Laundry allowance');
    }
  } catch(e) { recordText('AL-01', 'N/A', 'ERROR', 'FAIL', e.message); }

  console.log('\n═══ SECTION 6 — SUPER ═══');
  try { const r = await calcShift('full_time', cid(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('SU-01', 0.12, r.summary.sgcRate, 'SGC 12%'); } catch(e) { recordText('SU-01', 0.12, 'ERROR', 'FAIL', e.message); }

  console.log('\n═══ SECTION 7 — REGRESSION ═══');
  try { const r = await calcShift('casual', cid(1), REF_MONDAY, '10:00', '14:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('RT-01', round2(casBase1 * 4), r.summary.totalPayOwed, 'Casual weekday 4hr'); } catch(e) { recordText('RT-01', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', cid(3), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('RT-02', round2(28.12 * 2.0 * 4), r.summary.totalPayOwed, 'FT L3 Sunday 4hr'); } catch(e) { recordText('RT-02', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('casual', cid(1), REF_SATURDAY, '10:00', '14:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('RT-03', round2(casBase1 * 1.264 * 4), r.summary.totalPayOwed, 'Casual L1 Sat 4hr'); } catch(e) { recordText('RT-03', 0, 'ERROR', 'FAIL', e.message); }
}

async function main() {
  console.log('WageCheck Hair and Beauty Industry Award Test Runner — MA000005');
  console.log('═'.repeat(60));
  await t.init(); await runAllTests(); t.printSummary(); t.generateExcel(); await t.cleanup();
}
main().catch(e => { console.error('Fatal:', e); t.cleanup(); process.exit(1); });
