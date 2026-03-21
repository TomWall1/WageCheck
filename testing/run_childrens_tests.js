/**
 * Children's Services Award Test Runner — MA000120
 * Run: node testing/run_childrens_tests.js
 */
const path = require('path');
const { createTestRunner } = require('./lib/testFramework');
const t = createTestRunner('MA000120', path.join(__dirname, 'Childrens_Testing_Plan.xlsx'));
const { record, recordText, skip, classId, calcShift, calcMultiShift, round2, payOnly,
        pool, awardCode: AWARD_CODE,
        REF_MONDAY, REF_TUESDAY, REF_WEDNESDAY, REF_THURSDAY, REF_FRIDAY,
        REF_SATURDAY, REF_SUNDAY, REF_PH } = t;
const cidSW = (level) => classId(level, 'support_worker');
const cidED = (level) => classId(level, 'educator');

async function runAllTests() {
  console.log('\n═══ SECTION 1 — BASE RATES ═══');
  console.log('\n1.1 Support Worker stream');
  for (const b of [
    { id: 'BR-01', level: 1, expected: 24.95 }, { id: 'BR-02', level: 2, expected: 25.71 },
    { id: 'BR-03', level: 3, expected: 26.56 }, { id: 'BR-04', level: 4, expected: 28.12 },
  ]) {
    try { const r = await calcShift('full_time', cidSW(b.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(b.id, b.expected, r.baseHourlyRate, `SW L${b.level}`); } catch(e) { recordText(b.id, b.expected, 'ERROR', 'FAIL', e.message); }
  }
  console.log('\n1.2 Educator stream');
  for (const b of [
    { id: 'BR-05', level: 1, expected: 26.19 }, { id: 'BR-06', level: 2, expected: 27.00 },
    { id: 'BR-07', level: 3, expected: 29.52 }, { id: 'BR-08', level: 4, expected: 31.50 },
    { id: 'BR-09', level: 5, expected: 33.24 }, { id: 'BR-10', level: 6, expected: 34.78 },
    { id: 'BR-11', level: 7, expected: 36.37 }, { id: 'BR-12', level: 8, expected: 41.93 },
  ]) {
    try { const r = await calcShift('full_time', cidED(b.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(b.id, b.expected, r.baseHourlyRate, `ED L${b.level}`); } catch(e) { recordText(b.id, b.expected, 'ERROR', 'FAIL', e.message); }
  }
  console.log('\n1.3 Casual (25% loading)');
  for (const c of [
    { id: 'CL-01', level: 1, stream: 'support_worker', expected: 31.19 },
    { id: 'CL-02', level: 1, stream: 'educator', expected: 32.74 },
    { id: 'CL-03', level: 4, stream: 'educator', expected: 39.38 },
    { id: 'CL-04', level: 8, stream: 'educator', expected: 52.41 },
  ]) {
    try { const clsId = c.stream === 'support_worker' ? cidSW(c.level) : cidED(c.level); const r = await calcShift('casual', clsId, REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(c.id, c.expected, r.baseHourlyRate, `${c.stream} L${c.level}`); } catch(e) { recordText(c.id, c.expected, 'ERROR', 'FAIL', e.message); }
  }
  console.log('\n1.4 Junior (under 17=70%, 17=80%, 18=90%, 19+=adult — educator L1-L2 only)');
  for (const j of [
    { id: 'JR-01', level: 1, stream: 'educator', age: 16, expected: 18.33, note: '<17 = 70%' },
    { id: 'JR-02', level: 1, stream: 'educator', age: 17, expected: 20.95, note: '17yr = 80%' },
    { id: 'JR-03', level: 1, stream: 'educator', age: 18, expected: 23.57, note: '18yr = 90%' },
    { id: 'JR-04', level: 1, stream: 'educator', age: 19, expected: 26.19, note: '19yr = adult' },
    { id: 'JR-05', level: 2, stream: 'educator', age: 17, expected: 21.60, note: 'ED L2 17yr = 80%' },
  ]) {
    try { const clsId = j.stream === 'support_worker' ? cidSW(j.level) : cidED(j.level); const r = await calcShift('full_time', clsId, REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: j.age }); record(j.id, j.expected, r.baseHourlyRate, j.note); } catch(e) { recordText(j.id, j.expected, 'ERROR', 'FAIL', e.message); }
  }

  console.log('\n═══ SECTION 2 — PENALTY RATES ═══');
  const baseSW1 = 24.95;
  const casBaseSW1 = 31.19;
  const baseED1 = 26.19;
  // FT Saturday 1.50×
  try { const r = await calcShift('full_time', cidSW(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-01', round2(baseSW1 * 1.50), r.shifts[0].segments[0]?.effectiveRate, 'FT SW1 Saturday (1.50×)'); } catch(e) { recordText('PR-01', 0, 'ERROR', 'FAIL', e.message); }
  // FT Sunday 2.0×
  try { const r = await calcShift('full_time', cidSW(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-02', round2(baseSW1 * 2.0), r.shifts[0].segments[0]?.effectiveRate, 'FT SW1 Sunday (2.0×)'); } catch(e) { recordText('PR-02', 0, 'ERROR', 'FAIL', e.message); }
  // FT PH 2.50×
  try { const r = await calcShift('full_time', cidSW(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-03', round2(baseSW1 * 2.50), r.shifts[0].segments[0]?.effectiveRate, 'FT SW1 PH (2.50×)'); } catch(e) { recordText('PR-03', 0, 'ERROR', 'FAIL', e.message); }
  // Early AM midnight-6am 1.10×
  try { const r = await calcShift('full_time', cidSW(1), REF_MONDAY, '04:00', '08:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-04', round2(baseSW1 * 1.10), r.shifts[0].segments[0]?.effectiveRate, 'FT early AM midnight-6am (1.10×)'); } catch(e) { recordText('PR-04', 0, 'ERROR', 'FAIL', e.message); }
  // Afternoon 6pm-midnight 1.15×
  try { const r = await calcShift('full_time', cidSW(1), REF_MONDAY, '18:00', '22:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-05', round2(baseSW1 * 1.15), r.shifts[0].segments[0]?.effectiveRate, 'FT afternoon 6pm-midnight (1.15×)'); } catch(e) { recordText('PR-05', 0, 'ERROR', 'FAIL', e.message); }
  // Educator stream penalties
  try { const r = await calcShift('full_time', cidED(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-06', round2(baseED1 * 2.0), r.shifts[0].segments[0]?.effectiveRate, 'FT ED1 Sunday (2.0×)'); } catch(e) { recordText('PR-06', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n═══ SECTION 3 — OVERTIME (38hr ordinary / 40hr threshold) ═══');
  try {
    const shifts = [];
    for (let d = 7; d <= 11; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '08:00', endTime: '16:30', mealBreakTaken: true, mealBreakDuration: 30 });
    const r = await calcMultiShift('full_time', cidSW(1), shifts);
    record('WO-01', round2(baseSW1 * 38 + baseSW1 * 2 * 1.5), payOnly(r), 'FT SW1 40hr week — 38hr ord + 2hr OT @1.5×');
  } catch(e) { recordText('WO-01', 0, 'ERROR', 'FAIL', e.message); }
  try {
    const shifts = [];
    for (let d = 7; d <= 11; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '07:00', endTime: '16:30', mealBreakTaken: true, mealBreakDuration: 30 });
    const r = await calcMultiShift('full_time', cidSW(1), shifts);
    record('WO-02', round2(baseSW1 * 38 + baseSW1 * 2 * 1.5 + baseSW1 * 5 * 2.0), payOnly(r), 'FT SW1 45hr week — 38 ord + 2hr @1.5× + 5hr @2.0×');
  } catch(e) { recordText('WO-02', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n═══ SECTION 4 — MIN ENGAGEMENT (2hr) ═══');
  try { const r = await calcShift('casual', cidSW(1), REF_MONDAY, '10:00', '11:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('ME-01', round2(casBaseSW1 * 2), r.summary.totalPayOwed, 'Casual SW1 1hr → 2hr min'); } catch(e) { recordText('ME-01', round2(casBaseSW1 * 2), 'ERROR', 'FAIL', e.message); }

  console.log('\n═══ SECTION 5 — ALLOWANCES ═══');
  try {
    const r = await pool.query("SELECT allowance_type, amount FROM allowances WHERE award_code = $1 AND effective_date >= '2025-07-01' AND amount IS NOT NULL ORDER BY allowance_type", [AWARD_CODE]);
    for (const row of r.rows) { const a = parseFloat(row.amount);
      if (row.allowance_type === 'first_aid') record('AL-01', 12.12, a, 'First aid per day');
      if (row.allowance_type === 'meal') record('AL-02', 15.48, a, 'Meal allowance');
      if (row.allowance_type === 'laundry') record('AL-03', 7.20, a, 'Laundry allowance');
    }
  } catch(e) { recordText('AL-01', 'N/A', 'ERROR', 'FAIL', e.message); }

  console.log('\n═══ SECTION 6 — SUPER ═══');
  try { const r = await calcShift('full_time', cidSW(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('SU-01', 0.12, r.summary.sgcRate, 'SGC 12%'); } catch(e) { recordText('SU-01', 0.12, 'ERROR', 'FAIL', e.message); }

  console.log('\n═══ SECTION 7 — REGRESSION ═══');
  try { const r = await calcShift('casual', cidSW(1), REF_MONDAY, '10:00', '14:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('RT-01', round2(casBaseSW1 * 4), r.summary.totalPayOwed, 'Casual SW1 weekday 4hr'); } catch(e) { recordText('RT-01', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', cidED(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('RT-02', round2(baseED1 * 2.0 * 4), r.summary.totalPayOwed, 'FT ED1 Sunday 4hr'); } catch(e) { recordText('RT-02', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', cidSW(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('RT-03', round2(baseSW1 * 2.50 * 4), r.summary.totalPayOwed, 'FT SW1 PH 4hr'); } catch(e) { recordText('RT-03', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', cidED(8), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('RT-04', round2(41.93 * 4), r.summary.totalPayOwed, 'FT ED8 weekday 4hr'); } catch(e) { recordText('RT-04', 0, 'ERROR', 'FAIL', e.message); }
}

async function main() {
  console.log('WageCheck Children\'s Services Award Test Runner — MA000120');
  console.log('═'.repeat(60));
  await t.init(); await runAllTests(); t.printSummary(); t.generateExcel(); await t.cleanup();
}
main().catch(e => { console.error('Fatal:', e); t.cleanup(); process.exit(1); });
