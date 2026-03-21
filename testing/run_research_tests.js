/**
 * Market and Social Research Award Test Runner — MA000030
 * Run: node testing/run_research_tests.js
 *
 * Pay guide source: FWO MA000030, effective 1 July 2025.
 *
 * KEY — Penalty structure is ADDITION-BASED:
 *   Saturday & out-of-hours Mon–Fri 8pm–8am: base + $7.07/hr
 *   Sunday & public holiday:                  base + $14.15/hr
 *   Casual: flat rate for all days (no additional penalties)
 *   Overtime FT/PT: base × 1.25 (= casual rate)
 *   Casual OT: same as casual base (no premium)
 */
const path = require('path');
const { createTestRunner } = require('./lib/testFramework');
const t = createTestRunner('MA000030', path.join(__dirname, 'Research_Testing_Plan.xlsx'));
const { record, recordText, skip, classId, calcShift, calcMultiShift, round2, payOnly,
        pool, awardCode: AWARD_CODE,
        REF_MONDAY, REF_TUESDAY, REF_WEDNESDAY, REF_THURSDAY, REF_FRIDAY,
        REF_SATURDAY, REF_SUNDAY, REF_PH } = t;
const cid = (level) => classId(level, 'research');

async function runAllTests() {
  // ═══════════════════════════════════════════════════════════════════════════
  console.log('\n═══ SECTION 1 — BASE RATES ═══');

  console.log('\n1.1 Full-time base rates');
  for (const b of [
    { id: 'BR-01', level: 1,  expected: 25.38, title: 'Market research trainee' },
    { id: 'BR-02', level: 2,  expected: 27.52, title: 'Support employee first year' },
    { id: 'BR-03', level: 3,  expected: 28.29, title: 'Support employee thereafter' },
    { id: 'BR-04', level: 4,  expected: 28.29, title: 'Market research interviewer' },
    { id: 'BR-05', level: 5,  expected: 28.57, title: 'Executive/door-to-door interviewer' },
    { id: 'BR-06', level: 6,  expected: 28.78, title: 'Editor/Coder/Keyboard operator' },
    { id: 'BR-07', level: 7,  expected: 30.13, title: 'Team leader' },
    { id: 'BR-08', level: 8,  expected: 32.36, title: 'Field supervisor' },
    { id: 'BR-09', level: 9,  expected: 32.36, title: 'Research assistant' },
    { id: 'BR-10', level: 10, expected: 35.35, title: 'Field manager' },
    { id: 'BR-11', level: 11, expected: 35.35, title: 'Research officer' },
    { id: 'BR-12', level: 12, expected: 46.53, title: 'Research manager' },
  ]) {
    try {
      const r = await calcShift('full_time', cid(b.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
      record(b.id, b.expected, r.baseHourlyRate, b.title);
    } catch (e) { recordText(b.id, b.expected, 'ERROR', 'FAIL', e.message); }
  }

  console.log('\n1.2 Casual base rates (FT × 1.25)');
  for (const c of [
    { id: 'CL-01', level: 1,  expected: 31.73, title: 'Trainee casual' },
    { id: 'CL-02', level: 5,  expected: 35.71, title: 'Executive interviewer casual' },
    { id: 'CL-03', level: 7,  expected: 37.66, title: 'Team leader casual' },
    { id: 'CL-04', level: 12, expected: 58.16, title: 'Research manager casual' },
  ]) {
    try {
      const r = await calcShift('casual', cid(c.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
      record(c.id, c.expected, r.baseHourlyRate, c.title);
    } catch (e) { recordText(c.id, c.expected, 'ERROR', 'FAIL', e.message); }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  console.log('\n═══ SECTION 2 — PENALTY RATES ═══');

  console.log('\n2.1 FT Saturday (base + $7.07)');
  const base1 = 25.38;
  try {
    const r = await calcShift('full_time', cid(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('PR-01', round2(base1 + 7.07), r.shifts[0].segments[0]?.effectiveRate, 'Trainee Saturday');
  } catch (e) { recordText('PR-01', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n2.2 FT Sunday (base + $14.15)');
  try {
    const r = await calcShift('full_time', cid(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('PR-02', round2(base1 + 14.15), r.shifts[0].segments[0]?.effectiveRate, 'Trainee Sunday');
  } catch (e) { recordText('PR-02', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n2.3 FT Public holiday (base + $14.15)');
  try {
    const r = await calcShift('full_time', cid(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] });
    record('PR-03', round2(base1 + 14.15), r.shifts[0].segments[0]?.effectiveRate, 'Trainee PH');
  } catch (e) { recordText('PR-03', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n2.4 FT Out-of-hours Mon–Fri 8pm–8am (base + $7.07)');
  try {
    const r = await calcShift('full_time', cid(1), REF_MONDAY, '20:00', '23:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    // All 3 hours should be out-of-hours
    record('PR-04', round2(base1 + 7.07), r.shifts[0].segments[0]?.effectiveRate, 'Trainee out-of-hours evening');
  } catch (e) { recordText('PR-04', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n2.5 FT Saturday — higher classification');
  const base12 = 46.53;
  try {
    const r = await calcShift('full_time', cid(12), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('PR-05', round2(base12 + 7.07), r.shifts[0].segments[0]?.effectiveRate, 'Research manager Saturday');
  } catch (e) { recordText('PR-05', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n2.6 FT Sunday — higher classification');
  try {
    const r = await calcShift('full_time', cid(12), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('PR-06', round2(base12 + 14.15), r.shifts[0].segments[0]?.effectiveRate, 'Research manager Sunday');
  } catch (e) { recordText('PR-06', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n2.7 Casual — no weekend/PH penalty (flat rate)');
  const casualBase1 = 31.73;
  try {
    const r = await calcShift('casual', cid(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('PC-01', casualBase1, r.shifts[0].segments[0]?.effectiveRate, 'Casual Saturday = ordinary');
  } catch (e) { recordText('PC-01', 0, 'ERROR', 'FAIL', e.message); }
  try {
    const r = await calcShift('casual', cid(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('PC-02', casualBase1, r.shifts[0].segments[0]?.effectiveRate, 'Casual Sunday = ordinary');
  } catch (e) { recordText('PC-02', 0, 'ERROR', 'FAIL', e.message); }
  try {
    const r = await calcShift('casual', cid(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] });
    record('PC-03', casualBase1, r.shifts[0].segments[0]?.effectiveRate, 'Casual PH = ordinary');
  } catch (e) { recordText('PC-03', 0, 'ERROR', 'FAIL', e.message); }

  // ═══════════════════════════════════════════════════════════════════════════
  console.log('\n═══ SECTION 3 — OVERTIME ═══');

  console.log('\n3.1 FT weekly overtime (×1.25 after 38hr)');
  try {
    const shifts = [];
    // 5 × 8hr = 40hr → 2hr OT
    for (let d = 7; d <= 11; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '09:00', endTime: '17:30', mealBreakTaken: true, mealBreakDuration: 30 });
    const r = await calcMultiShift('full_time', cid(1), shifts);
    // 38hr ordinary @$25.38 = $964.44 + 2hr OT premium @$25.38 × 0.25 = $12.69
    // Total = $964.44 + $12.69 = $977.13
    // Actually: OT premium = 2hr × $25.38 × (1.25 - 1.0) = 2 × 25.38 × 0.25 = $12.69
    record('WO-01', round2(40 * 25.38 + 2 * 25.38 * 0.25), payOnly(r), 'FT 40hr week, 2hr OT @1.25×');
  } catch (e) { recordText('WO-01', 0, 'ERROR', 'FAIL', e.message); }

  // ═══════════════════════════════════════════════════════════════════════════
  console.log('\n═══ SECTION 4 — MIN ENGAGEMENT (3hr) ═══');

  try {
    const r = await calcShift('casual', cid(1), REF_MONDAY, '10:00', '11:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    // 1hr worked → 3hr min engagement @$31.73 = $95.19
    record('ME-01', round2(31.73 * 3), r.summary.totalPayOwed, 'Casual 1hr → 3hr min');
  } catch (e) { recordText('ME-01', round2(31.73 * 3), 'ERROR', 'FAIL', e.message); }

  // ═══════════════════════════════════════════════════════════════════════════
  console.log('\n═══ SECTION 5 — ALLOWANCES ═══');

  try {
    const r = await pool.query("SELECT allowance_type, amount FROM allowances WHERE award_code = $1 AND effective_date >= '2025-07-01' AND amount IS NOT NULL ORDER BY allowance_type", [AWARD_CODE]);
    for (const row of r.rows) {
      const a = parseFloat(row.amount);
      if (row.allowance_type === 'vehicle') record('AL-01', 0.98, a, 'Vehicle allowance per km');
      if (row.allowance_type === 'damage_theft') record('AL-02', 501.20, a, 'Damage/theft max per claim');
    }
  } catch (e) { recordText('AL-01', 'N/A', 'ERROR', 'FAIL', e.message); }

  // ═══════════════════════════════════════════════════════════════════════════
  console.log('\n═══ SECTION 6 — SUPER ═══');

  try {
    const r = await calcShift('full_time', cid(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('SU-01', 0.12, r.summary.sgcRate, 'SGC 12%');
  } catch (e) { recordText('SU-01', 0.12, 'ERROR', 'FAIL', e.message); }

  // ═══════════════════════════════════════════════════════════════════════════
  console.log('\n═══ SECTION 7 — FULL-SHIFT PAY CALCULATIONS ═══');

  console.log('\n7.1 FT 4hr weekday');
  try {
    const r = await calcShift('full_time', cid(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('FS-01', round2(25.38 * 4), payOnly(r), 'FT trainee 4hr weekday');
  } catch (e) { recordText('FS-01', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n7.2 FT 4hr Saturday');
  try {
    const r = await calcShift('full_time', cid(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('FS-02', round2((25.38 + 7.07) * 4), payOnly(r), 'FT trainee 4hr Saturday');
  } catch (e) { recordText('FS-02', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n7.3 FT 4hr Sunday');
  try {
    const r = await calcShift('full_time', cid(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('FS-03', round2((25.38 + 14.15) * 4), payOnly(r), 'FT trainee 4hr Sunday');
  } catch (e) { recordText('FS-03', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n7.4 Casual 4hr weekday');
  try {
    const r = await calcShift('casual', cid(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('FS-04', round2(31.73 * 4), payOnly(r), 'Casual trainee 4hr weekday');
  } catch (e) { recordText('FS-04', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n7.5 Casual 4hr Sunday (same as weekday for casual)');
  try {
    const r = await calcShift('casual', cid(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('FS-05', round2(31.73 * 4), payOnly(r), 'Casual trainee 4hr Sunday = weekday');
  } catch (e) { recordText('FS-05', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n7.6 FT Research manager 8hr Saturday with meal break');
  try {
    const r = await calcShift('full_time', cid(12), REF_SATURDAY, '09:00', '17:30', { mealBreakTaken: true, mealBreakDuration: 30 });
    record('FS-06', round2((46.53 + 7.07) * 8), payOnly(r), 'FT research manager 8hr Saturday');
  } catch (e) { recordText('FS-06', 0, 'ERROR', 'FAIL', e.message); }

  // ═══════════════════════════════════════════════════════════════════════════
  console.log('\n═══ SECTION 8 — REGRESSION ═══');

  try {
    const r = await calcShift('full_time', cid(6), REF_SUNDAY, '10:00', '14:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-01', round2((28.78 + 14.15) * 4), r.summary.totalPayOwed, 'FT Editor 4hr Sunday');
  } catch (e) { recordText('RT-01', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('casual', cid(8), REF_MONDAY, '09:00', '17:30', { mealBreakTaken: true, mealBreakDuration: 30 });
    record('RT-02', round2(40.45 * 8), r.summary.totalPayOwed, 'Casual field supervisor 8hr weekday');
  } catch (e) { recordText('RT-02', 0, 'ERROR', 'FAIL', e.message); }
}

async function main() {
  console.log('WageCheck Market and Social Research Award Test Runner — MA000030');
  console.log('═'.repeat(60));
  await t.init(); await runAllTests(); t.printSummary(); t.generateExcel(); await t.cleanup();
}
main().catch(e => { console.error('Fatal:', e); t.cleanup(); process.exit(1); });
