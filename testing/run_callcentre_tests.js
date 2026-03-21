/**
 * Contract Call Centres Award Test Runner — MA000023
 * Run: node testing/run_callcentre_tests.js
 */
const path = require('path');
const { createTestRunner } = require('./lib/testFramework');
const t = createTestRunner('MA000023', path.join(__dirname, 'CallCentre_Testing_Plan.xlsx'));
const { record, recordText, skip, classId, calcShift, calcMultiShift, round2, payOnly,
        pool, awardCode: AWARD_CODE,
        REF_MONDAY, REF_TUESDAY, REF_WEDNESDAY, REF_THURSDAY, REF_FRIDAY,
        REF_SATURDAY, REF_SUNDAY, REF_PH } = t;
const cidCl = (level) => classId(level, 'clerical');
const cidCC = (level) => classId(level, 'customer_contact');
const cidTech = () => classId(1, 'technical');

async function runAllTests() {
  console.log('\n═══ SECTION 1 — BASE RATES ═══');
  console.log('\n1.1 Clerical stream');
  for (const b of [
    { id: 'BR-01', level: 1, expected: 25.85 }, { id: 'BR-02', level: 2, expected: 26.70 },
    { id: 'BR-03', level: 3, expected: 28.12 }, { id: 'BR-04', level: 4, expected: 30.68 },
    { id: 'BR-05', level: 5, expected: 32.90 },
  ]) {
    try { const r = await calcShift('full_time', cidCl(b.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(b.id, b.expected, r.baseHourlyRate, `Clerical L${b.level}`); } catch(e) { recordText(b.id, b.expected, 'ERROR', 'FAIL', e.message); }
  }
  console.log('\n1.2 Customer Contact stream');
  for (const b of [
    { id: 'BR-06', level: 1, expected: 25.85 }, { id: 'BR-07', level: 2, expected: 26.70 },
    { id: 'BR-08', level: 3, expected: 28.12 }, { id: 'BR-09', level: 4, expected: 29.91 },
    { id: 'BR-10', level: 5, expected: 30.68 }, { id: 'BR-11', level: 6, expected: 32.90 },
  ]) {
    try { const r = await calcShift('full_time', cidCC(b.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(b.id, b.expected, r.baseHourlyRate, `CC L${b.level}`); } catch(e) { recordText(b.id, b.expected, 'ERROR', 'FAIL', e.message); }
  }
  console.log('\n1.3 Technical stream');
  try { const r = await calcShift('full_time', cidTech(), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('BR-12', 35.55, r.baseHourlyRate, 'Technical L1'); } catch(e) { recordText('BR-12', 35.55, 'ERROR', 'FAIL', e.message); }

  console.log('\n1.4 Casual (25% loading)');
  for (const c of [
    { id: 'CL-01', level: 1, stream: 'clerical', expected: 32.31 },
    { id: 'CL-02', level: 3, stream: 'customer_contact', expected: 35.15 },
    { id: 'CL-03', level: 1, stream: 'technical', expected: 44.44 },
  ]) {
    try { const cFn = c.stream === 'clerical' ? cidCl : c.stream === 'customer_contact' ? cidCC : cidTech; const clsId = c.stream === 'technical' ? cidTech() : cFn(c.level); const r = await calcShift('casual', clsId, REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(c.id, c.expected, r.baseHourlyRate); } catch(e) { recordText(c.id, c.expected, 'ERROR', 'FAIL', e.message); }
  }

  console.log('\n1.5 Junior (15yr=50%, 16yr=60%, 17yr=70%, 18+=adult)');
  for (const j of [
    { id: 'JR-01', level: 1, age: 15, expected: 12.93, note: '15yr = 50%' },
    { id: 'JR-02', level: 1, age: 16, expected: 15.51, note: '16yr = 60%' },
    { id: 'JR-03', level: 1, age: 17, expected: 18.10, note: '17yr = 70%' },
    { id: 'JR-04', level: 1, age: 18, expected: 25.85, note: '18yr = adult' },
  ]) {
    try { const r = await calcShift('full_time', cidCl(j.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: j.age }); record(j.id, j.expected, r.baseHourlyRate, j.note); } catch(e) { recordText(j.id, j.expected, 'ERROR', 'FAIL', e.message); }
  }

  console.log('\n═══ SECTION 2 — PENALTY RATES ═══');
  const base1 = 25.85;
  const casBase1 = 32.31;
  // FT weekday outside 7am-7pm = 1.25×
  try { const r = await calcShift('full_time', cidCl(1), REF_MONDAY, '05:00', '09:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-01', round2(base1 * 1.25), r.shifts[0].segments[0]?.effectiveRate, 'FT weekday before 7am (1.25×)'); } catch(e) { recordText('PR-01', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', cidCl(1), REF_MONDAY, '19:00', '23:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-02', round2(base1 * 1.25), r.shifts[0].segments[0]?.effectiveRate, 'FT weekday 7pm-11pm (1.25×)'); } catch(e) { recordText('PR-02', 0, 'ERROR', 'FAIL', e.message); }
  // FT Saturday 1.25×
  try { const r = await calcShift('full_time', cidCl(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-03', round2(base1 * 1.25), r.shifts[0].segments[0]?.effectiveRate, 'FT Saturday (1.25×)'); } catch(e) { recordText('PR-03', 0, 'ERROR', 'FAIL', e.message); }
  // FT Sunday 7am-7pm = 1.50×
  try { const r = await calcShift('full_time', cidCl(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-04', round2(base1 * 1.50), r.shifts[0].segments[0]?.effectiveRate, 'FT Sunday 7am-7pm (1.50×)'); } catch(e) { recordText('PR-04', 0, 'ERROR', 'FAIL', e.message); }
  // FT Sunday outside 7am-7pm = 1.75×
  try { const r = await calcShift('full_time', cidCl(1), REF_SUNDAY, '05:00', '09:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-05', round2(base1 * 1.75), r.shifts[0].segments[0]?.effectiveRate, 'FT Sunday outside 7am-7pm (1.75×)'); } catch(e) { recordText('PR-05', 0, 'ERROR', 'FAIL', e.message); }
  // FT PH 2.50×
  try { const r = await calcShift('full_time', cidCl(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-06', round2(base1 * 2.50), r.shifts[0].segments[0]?.effectiveRate, 'FT PH (2.50×)'); } catch(e) { recordText('PR-06', 0, 'ERROR', 'FAIL', e.message); }
  // Casual Saturday 1.20×
  try { const r = await calcShift('casual', cidCl(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PC-01', round2(casBase1 * 1.20), r.shifts[0].segments[0]?.effectiveRate, 'Casual Sat (1.20×)'); } catch(e) { recordText('PC-01', 0, 'ERROR', 'FAIL', e.message); }
  // Casual Sunday 7am-7pm 1.40×
  try { const r = await calcShift('casual', cidCl(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PC-02', round2(casBase1 * 1.40), r.shifts[0].segments[0]?.effectiveRate, 'Casual Sun 7am-7pm (1.40×)'); } catch(e) { recordText('PC-02', 0, 'ERROR', 'FAIL', e.message); }
  // Casual Sunday outside 7am-7pm 1.60×
  try { const r = await calcShift('casual', cidCl(1), REF_SUNDAY, '05:00', '09:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PC-03', round2(casBase1 * 1.60), r.shifts[0].segments[0]?.effectiveRate, 'Casual Sun outside (1.60×)'); } catch(e) { recordText('PC-03', 0, 'ERROR', 'FAIL', e.message); }
  // Casual PH 2.20×
  try { const r = await calcShift('casual', cidCl(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PC-04', round2(casBase1 * 2.20), r.shifts[0].segments[0]?.effectiveRate, 'Casual PH (2.20×)'); } catch(e) { recordText('PC-04', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n═══ SECTION 3 — OVERTIME (38hr ordinary / 41hr threshold — 3hr band) ═══');
  try {
    const shifts = [];
    for (let d = 7; d <= 11; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '08:00', endTime: '16:36', mealBreakTaken: true, mealBreakDuration: 30 });
    const r = await calcMultiShift('full_time', cidCl(1), shifts);
    record('WO-01', round2(base1 * 38 + base1 * 2.5 * 1.5), payOnly(r), 'FT 40.5hr week — 38hr ord + 2.5hr @1.5× (within 3hr band)');
  } catch(e) { recordText('WO-01', 0, 'ERROR', 'FAIL', e.message); }
  try {
    const shifts = [];
    for (let d = 7; d <= 11; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '07:00', endTime: '16:30', mealBreakTaken: true, mealBreakDuration: 30 });
    const r = await calcMultiShift('full_time', cidCl(1), shifts);
    record('WO-02', round2(base1 * 38 + base1 * 3 * 1.5 + base1 * 4 * 2.0), payOnly(r), 'FT 45hr week — 38 ord + 3hr @1.5× + 4hr @2.0×');
  } catch(e) { recordText('WO-02', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n═══ SECTION 4 — MIN ENGAGEMENT (3hr) ═══');
  try { const r = await calcShift('casual', cidCl(1), REF_MONDAY, '10:00', '11:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('ME-01', round2(casBase1 * 3), r.summary.totalPayOwed, 'Casual 1hr → 3hr min'); } catch(e) { recordText('ME-01', round2(casBase1 * 3), 'ERROR', 'FAIL', e.message); }

  console.log('\n═══ SECTION 5 — ALLOWANCES ═══');
  try {
    const r = await pool.query("SELECT allowance_type, amount FROM allowances WHERE award_code = $1 AND effective_date >= '2025-07-01' AND amount IS NOT NULL ORDER BY allowance_type", [AWARD_CODE]);
    for (const row of r.rows) { const a = parseFloat(row.amount);
      if (row.allowance_type === 'first_aid') record('AL-01', 16.03, a, 'First aid per week');
      if (row.allowance_type === 'meal') record('AL-02', 16.03, a, 'Meal allowance');
    }
  } catch(e) { recordText('AL-01', 'N/A', 'ERROR', 'FAIL', e.message); }

  console.log('\n═══ SECTION 6 — SUPER ═══');
  try { const r = await calcShift('full_time', cidCl(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('SU-01', 0.12, r.summary.sgcRate, 'SGC 12%'); } catch(e) { recordText('SU-01', 0.12, 'ERROR', 'FAIL', e.message); }

  console.log('\n═══ SECTION 7 — REGRESSION ═══');
  try { const r = await calcShift('casual', cidCl(1), REF_MONDAY, '10:00', '14:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('RT-01', round2(casBase1 * 4), r.summary.totalPayOwed, 'Casual weekday 4hr'); } catch(e) { recordText('RT-01', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', cidCC(3), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('RT-02', round2(28.12 * 1.50 * 4), r.summary.totalPayOwed, 'FT CC L3 Sunday 4hr'); } catch(e) { recordText('RT-02', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', cidTech(), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('RT-03', round2(35.55 * 2.50 * 4), r.summary.totalPayOwed, 'FT Tech PH 4hr'); } catch(e) { recordText('RT-03', 0, 'ERROR', 'FAIL', e.message); }
}

async function main() {
  console.log('WageCheck Contract Call Centres Award Test Runner — MA000023');
  console.log('═'.repeat(60));
  await t.init(); await runAllTests(); t.printSummary(); t.generateExcel(); await t.cleanup();
}
main().catch(e => { console.error('Fatal:', e); t.cleanup(); process.exit(1); });
