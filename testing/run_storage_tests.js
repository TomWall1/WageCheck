/**
 * Storage Services and Wholesale Award Test Runner — MA000084
 * Run: node testing/run_storage_tests.js
 */
const path = require('path');
const { createTestRunner } = require('./lib/testFramework');
const t = createTestRunner('MA000084', path.join(__dirname, 'Storage_Testing_Plan.xlsx'));
const { record, recordText, skip, classId, calcShift, calcMultiShift, round2, payOnly,
        pool, awardCode: AWARD_CODE,
        REF_MONDAY, REF_TUESDAY, REF_WEDNESDAY, REF_THURSDAY, REF_FRIDAY,
        REF_SATURDAY, REF_SUNDAY, REF_PH } = t;
const cid = (level) => classId(level, 'storeworker');

async function runAllTests() {
  console.log('\n═══ SECTION 1 — BASE RATES ═══');
  for (const b of [
    { id: 'BR-01', level: 1, expected: 25.85, title: 'Grade 1 (commencement)' },
    { id: 'BR-02', level: 2, expected: 26.17, title: 'Grade 1 (after 3 months)' },
    { id: 'BR-03', level: 3, expected: 26.47, title: 'Grade 1 (after 12 months)' },
    { id: 'BR-04', level: 4, expected: 26.70, title: 'Grade 2' },
    { id: 'BR-05', level: 5, expected: 27.46, title: 'Grade 3' },
    { id: 'BR-06', level: 6, expected: 28.27, title: 'Grade 4' },
  ]) {
    try { const r = await calcShift('full_time', cid(b.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(b.id, b.expected, r.baseHourlyRate, b.title); } catch(e) { recordText(b.id, b.expected, 'ERROR', 'FAIL', e.message); }
  }
  console.log('\n1.2 Casual');
  for (const c of [
    { id: 'CL-01', level: 1, expected: 32.31 }, { id: 'CL-02', level: 4, expected: 33.38 },
    { id: 'CL-03', level: 6, expected: 35.34 },
  ]) {
    try { const r = await calcShift('casual', cid(c.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(c.id, c.expected, r.baseHourlyRate); } catch(e) { recordText(c.id, c.expected, 'ERROR', 'FAIL', e.message); }
  }
  // Junior: <16=40%, 16=50%, 17=60%, 18=70%, 19+=adult
  console.log('\n1.3 Junior (MA000084: <16=40%, 16=50%, 17=60%, 18=70%, 19+=adult)');
  for (const j of [
    { id: 'JR-01', level: 1, age: 15, expected: 10.34, note: '<16 = 40%' },
    { id: 'JR-02', level: 1, age: 16, expected: 12.93, note: '16yr = 50%' },
    { id: 'JR-03', level: 1, age: 17, expected: 15.51, note: '17yr = 60%' },
    { id: 'JR-04', level: 1, age: 18, expected: 18.10, note: '18yr = 70%' },
    { id: 'JR-05', level: 1, age: 19, expected: 25.85, note: '19yr = adult' },
  ]) {
    try { const r = await calcShift('full_time', cid(j.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: j.age }); record(j.id, j.expected, r.baseHourlyRate, j.note); } catch(e) { recordText(j.id, j.expected, 'ERROR', 'FAIL', e.message); }
  }

  console.log('\n═══ SECTION 2 — PENALTY RATES ═══');
  // Evening 6pm-10pm: FT 1.15× / casual 1.12×, Night 10pm-6am: FT 1.30× / casual 1.24×
  // Sat 1.50× FT / 1.40× casual, Sun 2.0× FT / 1.80× casual, PH 2.50× FT / 2.20× casual
  const base1 = 25.85;
  try { const r = await calcShift('full_time', cid(1), REF_MONDAY, '18:00', '22:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-01', round2(base1 * 1.15), r.shifts[0].segments[0]?.effectiveRate, 'Evening 6pm-10pm FT (1.15×)'); } catch(e) { recordText('PR-01', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', cid(1), REF_MONDAY, '22:00', '02:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-02', round2(base1 * 1.30), r.shifts[0].segments[0]?.effectiveRate, 'Night 10pm-6am FT (1.30×)'); } catch(e) { recordText('PR-02', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', cid(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-03', round2(base1 * 1.50), r.shifts[0].segments[0]?.effectiveRate, 'Saturday FT (1.50×)'); } catch(e) { recordText('PR-03', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', cid(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-04', round2(base1 * 2.0), r.shifts[0].segments[0]?.effectiveRate, 'Sunday FT (2.0×)'); } catch(e) { recordText('PR-04', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', cid(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-05', round2(base1 * 2.50), r.shifts[0].segments[0]?.effectiveRate, 'PH FT (2.50×)'); } catch(e) { recordText('PR-05', 0, 'ERROR', 'FAIL', e.message); }
  // Evening boundary: shift 5pm-7pm should split at 6pm
  try {
    const r = await calcShift('full_time', cid(1), REF_MONDAY, '17:00', '19:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    const segs = r.shifts[0].segments;
    const hasOrd = segs.some(s => Math.abs(s.effectiveRate - base1) < 0.02 && s.minutes === 60);
    const hasEve = segs.some(s => Math.abs(s.effectiveRate - round2(base1 * 1.15)) < 0.02 && s.minutes === 60);
    recordText('PR-06', 'split at 6pm', `${segs.length} segs`, hasOrd && hasEve ? 'PASS' : 'FAIL', '5pm-7pm: 1hr ordinary + 1hr evening');
  } catch(e) { recordText('PR-06', 'split', 'ERROR', 'FAIL', e.message); }
  // Casual
  const casBase = 32.31;
  try { const r = await calcShift('casual', cid(1), REF_MONDAY, '18:00', '22:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PC-01', round2(casBase * 1.12), r.shifts[0].segments[0]?.effectiveRate, 'Casual evening (1.12×)'); } catch(e) { recordText('PC-01', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('casual', cid(1), REF_MONDAY, '23:00', '03:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PC-02', round2(casBase * 1.24), r.shifts[0].segments[0]?.effectiveRate, 'Casual night (1.24×)'); } catch(e) { recordText('PC-02', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('casual', cid(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PC-03', round2(casBase * 1.40), r.shifts[0].segments[0]?.effectiveRate, 'Casual Saturday (1.40×)'); } catch(e) { recordText('PC-03', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('casual', cid(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PC-04', round2(casBase * 1.80), r.shifts[0].segments[0]?.effectiveRate, 'Casual Sunday (1.80×)'); } catch(e) { recordText('PC-04', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('casual', cid(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PC-05', round2(casBase * 2.20), r.shifts[0].segments[0]?.effectiveRate, 'Casual PH (2.20×)'); } catch(e) { recordText('PC-05', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n═══ SECTION 3 — OVERTIME (weekly 38hr/40hr) ═══');
  try {
    const shifts = [];
    for (let d = 7; d <= 11; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '08:00', endTime: '16:30', mealBreakTaken: true, mealBreakDuration: 30 });
    const r = await calcMultiShift('full_time', cid(1), shifts);
    record('WO-01', round2(40 * base1 + 2 * base1 * 0.5), payOnly(r), '40hr week, 2hr OT');
  } catch(e) { recordText('WO-01', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n═══ SECTION 4 — MIN ENGAGEMENT (2hr) ═══');
  try { const r = await calcShift('casual', cid(1), REF_MONDAY, '10:00', '11:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('ME-01', round2(casBase * 2), r.summary.totalPayOwed, 'Casual 1hr → 2hr min'); } catch(e) { recordText('ME-01', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n═══ SECTION 5 — ALLOWANCES ═══');
  try {
    const r = await pool.query("SELECT allowance_type, amount FROM allowances WHERE award_code = $1 AND effective_date >= '2025-07-01' AND amount IS NOT NULL ORDER BY allowance_type", [AWARD_CODE]);
    for (const row of r.rows) { const a = parseFloat(row.amount);
      if (row.allowance_type === 'cold_work') record('AL-01', 1.07, a, 'Cold work per hour');
      if (row.allowance_type === 'cold_work_freezer') record('AL-02', 2.15, a, 'Cold work freezer per hour');
      if (row.allowance_type === 'cold_work_mid') record('AL-03', 1.61, a, 'Cold work mid per hour');
      if (row.allowance_type === 'first_aid') record('AL-04', 16.11, a, 'First aid per week');
      if (row.allowance_type === 'meal') record('AL-05', 21.44, a, 'Meal allowance');
    }
  } catch(e) { recordText('AL-01', 'N/A', 'ERROR', 'FAIL', e.message); }

  console.log('\n═══ SECTION 6 — SUPER + REGRESSION ═══');
  try { const r = await calcShift('full_time', cid(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('SU-01', 0.12, r.summary.sgcRate, 'SGC 12%'); } catch(e) { recordText('SU-01', 0.12, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('casual', cid(1), REF_SUNDAY, '10:00', '14:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('RT-01', round2(casBase * 1.80 * 4), r.summary.totalPayOwed, 'Casual Sunday 4hr'); } catch(e) { recordText('RT-01', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', cid(1), REF_MONDAY, '17:00', '19:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('RT-02', round2(base1 + base1 * 1.15), r.summary.totalPayOwed, 'FT 5pm-7pm split'); } catch(e) { recordText('RT-02', 0, 'ERROR', 'FAIL', e.message); }
}

async function main() {
  console.log('WageCheck Storage Services Award Test Runner — MA000084');
  console.log('═'.repeat(60));
  await t.init(); await runAllTests(); t.printSummary(); t.generateExcel(); await t.cleanup();
}
main().catch(e => { console.error('Fatal:', e); t.cleanup(); process.exit(1); });
