/**
 * Gardening and Landscaping Services Award Test Runner — MA000101
 * Run: node testing/run_landscaping_tests.js
 */
const path = require('path');
const { createTestRunner } = require('./lib/testFramework');
const t = createTestRunner('MA000101', path.join(__dirname, 'Landscaping_Testing_Plan.xlsx'));
const { record, recordText, skip, classId, calcShift, calcMultiShift, round2, payOnly,
        pool, awardCode: AWARD_CODE,
        REF_MONDAY, REF_TUESDAY, REF_WEDNESDAY, REF_THURSDAY, REF_FRIDAY,
        REF_SATURDAY, REF_SUNDAY, REF_PH } = t;
const cid = (level) => classId(level, 'landscaping');

async function runAllTests() {
  console.log('\n═══ SECTION 1 — BASE RATES ═══');
  for (const b of [
    { id: 'BR-01', level: 0, expected: 24.28, title: 'Introductory' },
    { id: 'BR-02', level: 1, expected: 24.95, title: 'Level 1' },
    { id: 'BR-03', level: 2, expected: 25.85, title: 'Level 2' },
    { id: 'BR-04', level: 3, expected: 27.00, title: 'Level 3' },
    { id: 'BR-05', level: 4, expected: 28.12, title: 'Level 4' },
    { id: 'BR-06', level: 5, expected: 29.00, title: 'Level 5' },
  ]) {
    try { const r = await calcShift('full_time', cid(b.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(b.id, b.expected, r.baseHourlyRate, b.title); } catch(e) { recordText(b.id, b.expected, 'ERROR', 'FAIL', e.message); }
  }
  console.log('\n1.2 Casual');
  for (const c of [
    { id: 'CL-01', level: 0, expected: 30.35, title: 'Introductory casual' },
    { id: 'CL-02', level: 1, expected: 31.19, title: 'L1 casual' },
    { id: 'CL-03', level: 5, expected: 36.25, title: 'L5 casual' },
  ]) {
    try { const r = await calcShift('casual', cid(c.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(c.id, c.expected, r.baseHourlyRate, c.title); } catch(e) { recordText(c.id, c.expected, 'ERROR', 'FAIL', e.message); }
  }
  console.log('\n1.3 Junior rates (under 18=70%, 18=80%, 19=90%, 20+=adult)');
  // Junior rates based on Introductory level ($24.28)
  for (const j of [
    { id: 'JR-01', level: 0, age: 17, expected: 17.00, note: 'Under 18 = 70%' },
    { id: 'JR-02', level: 0, age: 18, expected: 19.42, note: '18yr = 80%' },
    { id: 'JR-03', level: 0, age: 19, expected: 21.85, note: '19yr = 90%' },
    { id: 'JR-04', level: 0, age: 20, expected: 24.28, note: '20yr = adult' },
  ]) {
    try { const r = await calcShift('full_time', cid(j.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: j.age }); record(j.id, j.expected, r.baseHourlyRate, j.note); } catch(e) { recordText(j.id, j.expected, 'ERROR', 'FAIL', e.message); }
  }

  console.log('\n═══ SECTION 2 — PENALTY RATES ═══');
  const base0 = 24.28; // Introductory FT base
  const cas0 = 30.35;  // Introductory casual base

  // FT/PT penalties
  try { const r = await calcShift('full_time', cid(0), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-01', round2(base0 * 1.50), r.shifts[0].segments[0]?.effectiveRate, 'Saturday FT ×1.50'); } catch(e) { recordText('PR-01', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', cid(0), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-02', round2(base0 * 2.0), r.shifts[0].segments[0]?.effectiveRate, 'Sunday FT ×2.00'); } catch(e) { recordText('PR-02', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', cid(0), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-03', round2(base0 * 2.50), r.shifts[0].segments[0]?.effectiveRate, 'PH FT ×2.50'); } catch(e) { recordText('PR-03', 0, 'ERROR', 'FAIL', e.message); }

  // Casual penalties
  try { const r = await calcShift('casual', cid(0), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PC-01', round2(cas0 * 1.40), r.shifts[0].segments[0]?.effectiveRate, 'Casual Saturday ×1.40'); } catch(e) { recordText('PC-01', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('casual', cid(0), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PC-02', round2(cas0 * 1.80), r.shifts[0].segments[0]?.effectiveRate, 'Casual Sunday ×1.80'); } catch(e) { recordText('PC-02', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('casual', cid(0), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PC-03', round2(cas0 * 2.20), r.shifts[0].segments[0]?.effectiveRate, 'Casual PH ×2.20'); } catch(e) { recordText('PC-03', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n═══ SECTION 3 — OVERTIME ═══');
  // FT 40hr week (Mon–Fri 8hr/day) — 38hr ordinary + 2hr OT at ×1.50
  try {
    const shifts = [];
    for (let d = 7; d <= 11; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '08:00', endTime: '16:30', mealBreakTaken: true, mealBreakDuration: 30 });
    const r = await calcMultiShift('full_time', cid(0), shifts);
    // 40hrs worked. 38hrs ordinary at $24.28 = $922.64
    // 2hrs OT at ×1.50 = 2 × $24.28 × 1.50 = $72.84
    // Total = $922.64 + $72.84 = $995.48
    record('WO-01', 995.48, payOnly(r), 'FT Intro 40hr week: 38hr ordinary + 2hr OT ×1.50');
  } catch(e) { recordText('WO-01', 995.48, 'ERROR', 'FAIL', e.message); }

  console.log('\n═══ SECTION 4 — MIN ENGAGEMENT (2hr casual) ═══');
  // Casual 1hr → paid for 2hr minimum
  try { const r = await calcShift('casual', cid(0), REF_MONDAY, '10:00', '11:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('ME-01', round2(cas0 * 2), r.summary.totalPayOwed, 'Casual 1hr → 2hr min = $60.70'); } catch(e) { recordText('ME-01', 60.70, 'ERROR', 'FAIL', e.message); }

  console.log('\n═══ SECTION 5 — ALLOWANCES ═══');
  try {
    const r = await pool.query("SELECT allowance_type, amount FROM allowances WHERE award_code = $1 AND effective_date >= '2025-07-01' AND amount IS NOT NULL ORDER BY allowance_type", [AWARD_CODE]);
    for (const row of r.rows) { const a = parseFloat(row.amount);
      if (row.allowance_type === 'leading_hand_1to2') record('AL-01', 0.56, a, 'Leading hand 1-2 employees per hour');
      if (row.allowance_type === 'leading_hand_3to6') record('AL-02', 1.12, a, 'Leading hand 3-6 employees per hour');
      if (row.allowance_type === 'leading_hand_7to9') record('AL-03', 1.41, a, 'Leading hand 7-9 employees per hour');
      if (row.allowance_type === 'leading_hand_10plus') record('AL-04', 1.97, a, 'Leading hand 10+ employees per hour');
      if (row.allowance_type === 'tool_allowance') record('AL-05', 0.42, a, 'Tool allowance (L4 & L5) per hour');
      if (row.allowance_type === 'first_aid') record('AL-06', 21.37, a, 'First aid per week');
      if (row.allowance_type === 'meal') record('AL-07', 18.84, a, 'Meal allowance');
      if (row.allowance_type === 'vehicle') record('AL-08', 0.98, a, 'Vehicle per km');
      if (row.allowance_type === 'operating_vehicle_plant') record('AL-09', 6.41, a, 'Operating vehicle/plant per day');
    }
  } catch(e) { recordText('AL-01', 'N/A', 'ERROR', 'FAIL', e.message); }

  console.log('\n═══ SECTION 6 — SUPER ═══');
  try { const r = await calcShift('full_time', cid(0), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('SU-01', 0.12, r.summary.sgcRate, 'SGC 12%'); } catch(e) { recordText('SU-01', 0.12, 'ERROR', 'FAIL', e.message); }

  console.log('\n═══ SECTION 7 — FULL-SHIFT CALCS ═══');
  // FS-01: FT Intro weekday 4hr shift
  try { const r = await calcShift('full_time', cid(0), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('FS-01', round2(24.28 * 4), r.summary.totalPayOwed, 'FT Intro Mon 4hr = $97.12'); } catch(e) { recordText('FS-01', 97.12, 'ERROR', 'FAIL', e.message); }
  // FS-02: Casual L1 Saturday 4hr (×1.40 of casual base)
  try { const r = await calcShift('casual', cid(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('FS-02', round2(31.19 * 1.40 * 4), r.summary.totalPayOwed, 'Casual L1 Sat 4hr = $174.66'); } catch(e) { recordText('FS-02', 174.66, 'ERROR', 'FAIL', e.message); }
  // FS-03: FT L3 Public holiday 8hr with 30min meal break (7.5hr worked)
  // Actually 8hr shift with 30min meal = 7.5hr paid at PH rate ×2.50
  try { const r = await calcShift('full_time', cid(3), REF_PH, '08:00', '16:30', { mealBreakTaken: true, mealBreakDuration: 30, publicHolidays: [REF_PH] }); record('FS-03', round2(27.00 * 2.50 * 8), r.summary.totalPayOwed, 'FT L3 PH 8hr = $540.00'); } catch(e) { recordText('FS-03', 540.00, 'ERROR', 'FAIL', e.message); }
  // FS-04: Casual L2 Sunday 6hr (×1.80 of casual base)
  try { const r = await calcShift('casual', cid(2), REF_SUNDAY, '10:00', '16:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('FS-04', round2(32.31 * 1.80 * 6), r.summary.totalPayOwed, 'Casual L2 Sun 6hr = $348.95'); } catch(e) { recordText('FS-04', 348.95, 'ERROR', 'FAIL', e.message); }

  console.log('\n═══ SECTION 8 — REGRESSION ═══');
  // RT-01: Casual Intro Sunday 4hr
  try { const r = await calcShift('casual', cid(0), REF_SUNDAY, '10:00', '14:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('RT-01', round2(30.35 * 1.80 * 4), r.summary.totalPayOwed, 'Casual Intro Sunday 4hr'); } catch(e) { recordText('RT-01', 0, 'ERROR', 'FAIL', e.message); }
  // RT-02: FT L5 weekday 8hr with 30min meal (7.5hr worked, but 8hr shift)
  try { const r = await calcShift('full_time', cid(5), REF_WEDNESDAY, '07:00', '15:30', { mealBreakTaken: true, mealBreakDuration: 30 }); record('RT-02', round2(29.00 * 8), r.summary.totalPayOwed, 'FT L5 Wed 8hr = $232.00'); } catch(e) { recordText('RT-02', 232.00, 'ERROR', 'FAIL', e.message); }
  // RT-03: Casual L3 PH 3hr (×2.20 of casual base)
  try { const r = await calcShift('casual', cid(3), REF_PH, '09:00', '12:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('RT-03', round2(33.75 * 2.20 * 3), r.summary.totalPayOwed, 'Casual L3 PH 3hr = $222.75'); } catch(e) { recordText('RT-03', 222.75, 'ERROR', 'FAIL', e.message); }
  // RT-04: FT Intro Saturday 4hr (×1.50)
  try { const r = await calcShift('full_time', cid(0), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('RT-04', round2(24.28 * 1.50 * 4), r.summary.totalPayOwed, 'FT Intro Sat 4hr = $145.68'); } catch(e) { recordText('RT-04', 145.68, 'ERROR', 'FAIL', e.message); }
}

async function main() {
  console.log('WageCheck Gardening & Landscaping Award Test Runner — MA000101');
  console.log('═'.repeat(60));
  await t.init(); await runAllTests(); t.printSummary(); t.generateExcel(); await t.cleanup();
}
main().catch(e => { console.error('Fatal:', e); t.cleanup(); process.exit(1); });
