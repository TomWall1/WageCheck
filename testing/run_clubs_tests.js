/**
 * Registered and Licensed Clubs Award Test Runner — MA000058
 * Run: node testing/run_clubs_tests.js
 */
const path = require('path');
const { createTestRunner } = require('./lib/testFramework');
const t = createTestRunner('MA000058', path.join(__dirname, 'Clubs_Testing_Plan.xlsx'));
const { record, recordText, skip, classId, calcShift, calcMultiShift, round2, payOnly,
        pool, awardCode: AWARD_CODE,
        REF_MONDAY, REF_TUESDAY, REF_WEDNESDAY, REF_THURSDAY, REF_FRIDAY,
        REF_SATURDAY, REF_SUNDAY, REF_PH } = t;
const fbId   = (level) => classId(level, 'food_beverage');
const kitId  = (level) => classId(level, 'kitchen');
const admId  = (level) => classId(level, 'admin');
const mntId  = (level) => classId(level, 'maintenance');

async function runAllTests() {
  console.log('\n═══ SECTION 1 — BASE RATES ═══');
  console.log('\n1.1 Food & Beverage stream (FT)');
  for (const b of [
    { id: 'BR-01', level: 0, expected: 24.28, fn: fbId }, { id: 'BR-02', level: 1, expected: 24.95, fn: fbId },
    { id: 'BR-03', level: 2, expected: 25.85, fn: fbId }, { id: 'BR-04', level: 3, expected: 26.70, fn: fbId },
    { id: 'BR-05', level: 4, expected: 28.12, fn: fbId }, { id: 'BR-06', level: 5, expected: 29.88, fn: fbId },
  ]) {
    try { const r = await calcShift('full_time', b.fn(b.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(b.id, b.expected, r.baseHourlyRate, `F&B L${b.level}`); } catch(e) { recordText(b.id, b.expected, 'ERROR', 'FAIL', e.message); }
  }
  console.log('\n1.2 Kitchen stream (FT — sample)');
  for (const b of [
    { id: 'BR-07', level: 1, expected: 24.95, fn: kitId },
    { id: 'BR-08', level: 4, expected: 28.12, fn: kitId },
    { id: 'BR-09', level: 6, expected: 30.68, fn: kitId },
  ]) {
    try { const r = await calcShift('full_time', b.fn(b.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(b.id, b.expected, r.baseHourlyRate, `Kitchen L${b.level}`); } catch(e) { recordText(b.id, b.expected, 'ERROR', 'FAIL', e.message); }
  }
  console.log('\n1.3 Admin stream (FT — sample)');
  for (const b of [
    { id: 'BR-10', level: 0, expected: 24.28, fn: admId },
    { id: 'BR-11', level: 3, expected: 26.70, fn: admId },
    { id: 'BR-12', level: 5, expected: 29.88, fn: admId },
  ]) {
    try { const r = await calcShift('full_time', b.fn(b.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(b.id, b.expected, r.baseHourlyRate, `Admin L${b.level}`); } catch(e) { recordText(b.id, b.expected, 'ERROR', 'FAIL', e.message); }
  }
  console.log('\n1.4 Maintenance stream (FT — sample)');
  for (const b of [
    { id: 'BR-13', level: 2, expected: 25.85, fn: mntId },
    { id: 'BR-14', level: 4, expected: 28.12, fn: mntId },
  ]) {
    try { const r = await calcShift('full_time', b.fn(b.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(b.id, b.expected, r.baseHourlyRate, `Maint L${b.level}`); } catch(e) { recordText(b.id, b.expected, 'ERROR', 'FAIL', e.message); }
  }

  console.log('\n1.5 Casual loading');
  for (const c of [
    { id: 'CL-01', level: 0, expected: 30.35, fn: fbId, label: 'F&B Intro' },
    { id: 'CL-02', level: 3, expected: 33.38, fn: fbId, label: 'F&B L3' },
    { id: 'CL-03', level: 6, expected: 38.35, fn: kitId, label: 'Kitchen L6' },
    { id: 'CL-04', level: 5, expected: 37.35, fn: admId, label: 'Admin L5' },
  ]) {
    try { const r = await calcShift('casual', c.fn(c.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(c.id, c.expected, r.baseHourlyRate, `Casual ${c.label}`); } catch(e) { recordText(c.id, c.expected, 'ERROR', 'FAIL', e.message); }
  }

  console.log('\n═══ SECTION 2 — PENALTY RATES ═══');
  const base1 = 24.95; // F&B L1 FT
  const casBase1 = 31.19; // F&B L1 casual
  console.log('\n2.1 Evening +$2.81/hr (7pm-midnight)');
  try { const r = await calcShift('full_time', fbId(1), REF_MONDAY, '19:00', '23:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-01', round2(base1 + 2.81), r.shifts[0].segments[0]?.effectiveRate, 'FT evening +$2.81'); } catch(e) { recordText('PR-01', 0, 'ERROR', 'FAIL', e.message); }
  console.log('\n2.2 Night +$4.22/hr (midnight-7am)');
  try { const r = await calcShift('full_time', fbId(1), REF_MONDAY, '03:00', '07:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-02', round2(base1 + 4.22), r.shifts[0].segments[0]?.effectiveRate, 'FT night +$4.22'); } catch(e) { recordText('PR-02', 0, 'ERROR', 'FAIL', e.message); }
  console.log('\n2.3 Saturday 1.50×');
  try { const r = await calcShift('full_time', fbId(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-03', round2(base1 * 1.50), r.shifts[0].segments[0]?.effectiveRate, 'FT Sat 1.50×'); } catch(e) { recordText('PR-03', 0, 'ERROR', 'FAIL', e.message); }
  console.log('\n2.4 Sunday 1.75×');
  try { const r = await calcShift('full_time', fbId(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-04', round2(base1 * 1.75), r.shifts[0].segments[0]?.effectiveRate, 'FT Sun 1.75×'); } catch(e) { recordText('PR-04', 0, 'ERROR', 'FAIL', e.message); }
  console.log('\n2.5 Public Holiday 2.50×');
  try { const r = await calcShift('full_time', fbId(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-05', round2(base1 * 2.50), r.shifts[0].segments[0]?.effectiveRate, 'FT PH 2.50×'); } catch(e) { recordText('PR-05', 0, 'ERROR', 'FAIL', e.message); }
  console.log('\n2.6 Casual penalties');
  try { const r = await calcShift('casual', fbId(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PC-01', round2(casBase1 * 1.20), r.shifts[0].segments[0]?.effectiveRate, 'Casual Sat 1.20×'); } catch(e) { recordText('PC-01', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('casual', fbId(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PC-02', round2(casBase1 * 1.40), r.shifts[0].segments[0]?.effectiveRate, 'Casual Sun 1.40×'); } catch(e) { recordText('PC-02', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('casual', fbId(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PC-03', round2(casBase1 * 2.00), r.shifts[0].segments[0]?.effectiveRate, 'Casual PH 2.00×'); } catch(e) { recordText('PC-03', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('casual', fbId(1), REF_MONDAY, '19:00', '23:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PC-04', round2(casBase1 + 2.81), r.shifts[0].segments[0]?.effectiveRate, 'Casual evening +$2.81'); } catch(e) { recordText('PC-04', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n═══ SECTION 3 — OVERTIME (weekly 38hr/40hr) ═══');
  try {
    const shifts = [];
    for (let d = 7; d <= 11; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '08:00', endTime: '16:30', mealBreakTaken: true, mealBreakDuration: 30 });
    const r = await calcMultiShift('full_time', fbId(1), shifts);
    // 5 × 8hr = 40hr. 38hr ordinary + 2hr OT @1.5×
    // 38 × 24.95 + 2 × 24.95 × 1.5 = 948.10 + 74.85 = 1022.95
    record('WO-01', round2(38 * base1 + 2 * base1 * 1.5), payOnly(r), 'FT 40hr week, 2hr OT @1.5×');
  } catch(e) { recordText('WO-01', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n═══ SECTION 4 — MIN ENGAGEMENT (2hr) ═══');
  try { const r = await calcShift('casual', fbId(1), REF_MONDAY, '10:00', '11:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('ME-01', round2(casBase1 * 2), r.summary.totalPayOwed, 'Casual F&B 1hr → 2hr min'); } catch(e) { recordText('ME-01', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n═══ SECTION 5 — ALLOWANCES ═══');
  try {
    const r = await pool.query("SELECT allowance_type, amount FROM allowances WHERE award_code = $1 AND amount IS NOT NULL ORDER BY allowance_type", [AWARD_CODE]);
    for (const row of r.rows) { const a = parseFloat(row.amount);
      if (row.allowance_type === 'first_aid') record('AL-01', 12.82, a, 'First aid weekly');
      if (row.allowance_type === 'first_aid_daily') record('AL-02', 2.56, a, 'First aid daily');
      if (row.allowance_type === 'laundry') record('AL-03', 6.00, a, 'Laundry weekly');
      if (row.allowance_type === 'laundry_daily') record('AL-04', 2.05, a, 'Laundry daily');
      if (row.allowance_type === 'meal') record('AL-05', 16.73, a, 'Meal allowance');
      if (row.allowance_type === 'split_shift') record('AL-06', 5.34, a, 'Split shift');
      if (row.allowance_type === 'tool') record('AL-07', 2.03, a, 'Tool allowance');
      if (row.allowance_type === 'vehicle') record('AL-08', 0.99, a, 'Vehicle per km');
    }
  } catch(e) { recordText('AL-01', 'N/A', 'ERROR', 'FAIL', e.message); }

  console.log('\n═══ SECTION 6 — SUPER ═══');
  try { const r = await calcShift('full_time', fbId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('SU-01', 0.12, r.summary.sgcRate, 'SGC 12%'); } catch(e) { recordText('SU-01', 0.12, 'ERROR', 'FAIL', e.message); }

  console.log('\n═══ SECTION 7 — REGRESSION ═══');
  try { const r = await calcShift('casual', fbId(1), REF_SUNDAY, '10:00', '14:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('RT-01', round2(casBase1 * 1.40 * 4), r.summary.totalPayOwed, 'Casual F&B Sunday 4hr'); } catch(e) { recordText('RT-01', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', kitId(4), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('RT-02', round2(28.12 * 2.50 * 4), r.summary.totalPayOwed, 'FT Kitchen L4 PH 4hr'); } catch(e) { recordText('RT-02', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', fbId(1), REF_MONDAY, '20:00', '00:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('RT-03', round2((base1 + 2.81) * 4), r.summary.totalPayOwed, 'FT F&B L1 evening 4hr'); } catch(e) { recordText('RT-03', 0, 'ERROR', 'FAIL', e.message); }
}

async function main() {
  console.log('WageCheck Registered Clubs Award Test Runner — MA000058');
  console.log('═'.repeat(60));
  await t.init(); await runAllTests(); t.printSummary(); t.generateExcel(); await t.cleanup();
}
main().catch(e => { console.error('Fatal:', e); t.cleanup(); process.exit(1); });
