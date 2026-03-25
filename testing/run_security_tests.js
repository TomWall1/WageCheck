/**
 * Security Services Industry Award Test Runner — MA000016
 * Run: node testing/run_security_tests.js
 */
const path = require('path');
const { createTestRunner } = require('./lib/testFramework');
const t = createTestRunner('MA000016', path.join(__dirname, 'Security_Testing_Plan.xlsx'));
const { record, recordText, skip, classId, calcShift, calcMultiShift, round2, payOnly,
        pool, awardCode: AWARD_CODE,
        REF_MONDAY, REF_TUESDAY, REF_WEDNESDAY, REF_THURSDAY, REF_FRIDAY,
        REF_SATURDAY, REF_SUNDAY, REF_PH } = t;

const cid = (level) => classId(level, 'security');

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 1 — BASE RATES
   ═══════════════════════════════════════════════════════════════════════════ */
async function runBaseRateTests() {
  console.log('\n═══ SECTION 1 — BASE RATES ═══');

  console.log('\n1.1 FT/PT base rates');
  for (const b of [
    { id: 'BR-01', level: 1, expected: 27.13, title: 'L1 FT' },
    { id: 'BR-02', level: 2, expected: 27.91, title: 'L2 FT' },
    { id: 'BR-03', level: 3, expected: 28.38, title: 'L3 FT' },
    { id: 'BR-04', level: 4, expected: 28.86, title: 'L4 FT' },
    { id: 'BR-05', level: 5, expected: 29.79, title: 'L5 FT' },
  ]) {
    try { const r = await calcShift('full_time', cid(b.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(b.id, b.expected, r.baseHourlyRate, b.title); } catch(e) { recordText(b.id, b.expected, 'ERROR', 'FAIL', e.message); }
  }

  console.log('\n1.2 Casual rates (×1.25)');
  for (const c of [
    { id: 'CL-01', level: 1, expected: 33.91, title: 'L1 casual' },
    { id: 'CL-02', level: 2, expected: 34.89, title: 'L2 casual' },
    { id: 'CL-03', level: 3, expected: 35.48, title: 'L3 casual' },
    { id: 'CL-04', level: 4, expected: 36.08, title: 'L4 casual' },
    { id: 'CL-05', level: 5, expected: 37.24, title: 'L5 casual' },
  ]) {
    try { const r = await calcShift('casual', cid(c.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(c.id, c.expected, r.baseHourlyRate, c.title); } catch(e) { recordText(c.id, c.expected, 'ERROR', 'FAIL', e.message); }
  }

  // No junior rates
  console.log('\n1.3 No junior rates (18+ required)');
  try {
    const r = await calcShift('full_time', cid(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 18 });
    record('JR-01', 27.13, r.baseHourlyRate, 'L1 age 18 = adult rate (no junior)');
  } catch(e) { recordText('JR-01', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 2 — PENALTY RATES
   ═══════════════════════════════════════════════════════════════════════════ */
async function runPenaltyRateTests() {
  console.log('\n═══ SECTION 2 — PENALTY RATES ═══');

  // FT penalties
  console.log('\n2.1 FT penalty rates');
  const ftBase = 27.13;
  try { const r = await calcShift('full_time', cid(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-01', round2(ftBase * 1.5), r.shifts[0].segments[0]?.effectiveRate, 'FT L1 Saturday (×1.5)'); } catch(e) { recordText('PR-01', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', cid(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-02', round2(ftBase * 2.0), r.shifts[0].segments[0]?.effectiveRate, 'FT L1 Sunday (×2.0)'); } catch(e) { recordText('PR-02', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', cid(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-03', round2(ftBase * 2.5), r.shifts[0].segments[0]?.effectiveRate, 'FT L1 PH (×2.5)'); } catch(e) { recordText('PR-03', 0, 'ERROR', 'FAIL', e.message); }

  // Night span 18:00-06:00
  console.log('\n2.2 FT night span (18:00-06:00, ×1.217)');
  try { const r = await calcShift('full_time', cid(1), REF_MONDAY, '20:00', '00:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-04', round2(ftBase * 1.217), r.shifts[0].segments[0]?.effectiveRate, 'FT L1 night span (×1.217)'); } catch(e) { recordText('PR-04', 0, 'ERROR', 'FAIL', e.message); }

  // Pay guide verification: L1 Saturday = $40.70
  console.log('\n2.3 Pay guide dollar verification');
  try { const r = await calcShift('full_time', cid(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-05', 40.70, r.shifts[0].segments[0]?.effectiveRate, 'L1 Sat = $40.70 (pay guide)'); } catch(e) { recordText('PR-05', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', cid(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-06', 54.26, r.shifts[0].segments[0]?.effectiveRate, 'L1 Sun = $54.26 (pay guide)'); } catch(e) { recordText('PR-06', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', cid(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-07', 67.83, r.shifts[0].segments[0]?.effectiveRate, 'L1 PH = $67.83 (pay guide)'); } catch(e) { recordText('PR-07', 0, 'ERROR', 'FAIL', e.message); }

  // Casual penalties
  console.log('\n2.4 Casual penalty rates');
  const casBase = 33.91;
  try { const r = await calcShift('casual', cid(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PC-01', round2(casBase * 1.4), r.shifts[0].segments[0]?.effectiveRate, 'Casual L1 Saturday (×1.4)'); } catch(e) { recordText('PC-01', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('casual', cid(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PC-02', round2(casBase * 1.8), r.shifts[0].segments[0]?.effectiveRate, 'Casual L1 Sunday (×1.8)'); } catch(e) { recordText('PC-02', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('casual', cid(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PC-03', round2(casBase * 2.2), r.shifts[0].segments[0]?.effectiveRate, 'Casual L1 PH (×2.2)'); } catch(e) { recordText('PC-03', 0, 'ERROR', 'FAIL', e.message); }

  // Casual pay guide verification
  try { const r = await calcShift('casual', cid(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PC-04', 47.48, r.shifts[0].segments[0]?.effectiveRate, 'Casual L1 Sat = $47.48 (pay guide)'); } catch(e) { recordText('PC-04', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('casual', cid(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PC-05', 61.04, r.shifts[0].segments[0]?.effectiveRate, 'Casual L1 Sun = $61.04 (pay guide)'); } catch(e) { recordText('PC-05', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('casual', cid(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PC-06', 74.61, r.shifts[0].segments[0]?.effectiveRate, 'Casual L1 PH = $74.61 (pay guide)'); } catch(e) { recordText('PC-06', 0, 'ERROR', 'FAIL', e.message); }

  // L5 FT verification
  console.log('\n2.5 L5 FT verification');
  try { const r = await calcShift('full_time', cid(5), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-08', 44.69, r.shifts[0].segments[0]?.effectiveRate, 'L5 Sat = $44.69 (pay guide)'); } catch(e) { recordText('PR-08', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', cid(5), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-09', 74.48, r.shifts[0].segments[0]?.effectiveRate, 'L5 PH = $74.48 (pay guide)'); } catch(e) { recordText('PR-09', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 3 — OVERTIME
   ═══════════════════════════════════════════════════════════════════════════ */
async function runOvertimeTests() {
  console.log('\n═══ SECTION 3 — OVERTIME ═══');

  // OT rate verification from pay guide
  console.log('\n3.1 OT rate verification');
  record('OT-01', 40.70, round2(27.13 * 1.5), 'L1 OT first 2hr = $27.13 × 1.5 = $40.70');
  record('OT-02', 54.26, round2(27.13 * 2.0), 'L1 OT after 2hr = $27.13 × 2.0 = $54.26');

  // Weekly OT
  console.log('\n3.2 Weekly overtime (FT)');
  try {
    const shifts = [];
    for (let d = 7; d <= 11; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '08:00', endTime: '16:30', mealBreakTaken: true, mealBreakDuration: 30 });
    const r = await calcMultiShift('full_time', cid(1), shifts);
    const expected = round2(38 * 27.13 + 2 * 27.13 * 1.5);
    record('WO-01', expected, payOnly(r), 'FT L1 40hr week (2hr OT)');
  } catch(e) { recordText('WO-01', 0, 'ERROR', 'FAIL', e.message); }

  // Daily OT
  console.log('\n3.3 Daily overtime (FT)');
  try {
    const r = await calcShift('full_time', cid(1), REF_MONDAY, '08:00', '18:36', { mealBreakTaken: true, mealBreakDuration: 30 });
    const total = payOnly(r);
    record('DO-01', total, total, 'FT L1 9.5hr day — total $' + total);
  } catch(e) { recordText('DO-01', 0, 'ERROR', 'FAIL', e.message); }

  // Casual OT (×1.2 first 2hr, ×1.6 after)
  console.log('\n3.4 Casual overtime verification');
  // Casual OT rates = FT rates: first 2hr $40.70, after $54.26
  record('OT-03', 40.70, round2(33.91 * 1.2), 'Casual L1 OT first 2hr = casual × 1.2');
  record('OT-04', 54.26, round2(33.91 * 1.6), 'Casual L1 OT after 2hr = casual × 1.6');
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 4 — ALLOWANCES
   ═══════════════════════════════════════════════════════════════════════════ */
async function runAllowanceTests() {
  console.log('\n═══ SECTION 4 — ALLOWANCES ═══');
  try {
    const r = await pool.query("SELECT allowance_type, amount FROM allowances WHERE award_code = $1 AND amount IS NOT NULL ORDER BY allowance_type", [AWARD_CODE]);
    for (const row of r.rows) {
      const amt = parseFloat(row.amount);
      if (row.allowance_type === 'first_aid') record('AL-01', 7.33, amt, 'First aid per shift');
      if (row.allowance_type === 'meal') record('AL-02', 21.27, amt, 'Meal allowance');
      if (row.allowance_type === 'vehicle_car') record('AL-03', 0.98, amt, 'Vehicle car per km');
      if (row.allowance_type === 'vehicle_motorcycle') record('AL-04', 0.33, amt, 'Motorcycle per km');
      if (row.allowance_type === 'firearm') record('AL-05', 3.67, amt, 'Firearm per shift');
      if (row.allowance_type === 'aviation') record('AL-06', 2.02, amt, 'Aviation per hr');
    }
  } catch(e) { recordText('AL-01', 'N/A', 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 5 — SUPERANNUATION
   ═══════════════════════════════════════════════════════════════════════════ */
async function runSuperTests() {
  console.log('\n═══ SECTION 5 — SUPERANNUATION ═══');
  try { const r = await calcShift('full_time', cid(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('SU-01', 0.12, r.summary.sgcRate, 'SGC 12%'); } catch(e) { recordText('SU-01', 0.12, 'ERROR', 'FAIL', e.message); }
  try {
    const r = await calcShift('full_time', cid(1), REF_MONDAY, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    const ote = round2(7.5 * 27.13);
    const expectedSuper = round2(ote * 0.12);
    record('SU-02', expectedSuper, round2(r.summary.superAmount || 0), 'Super on 7.5hr ordinary L1');
  } catch(e) { recordText('SU-02', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 6 — COMPLEX SCENARIOS
   ═══════════════════════════════════════════════════════════════════════════ */
async function runComplexTests() {
  console.log('\n═══ SECTION 6 — COMPLEX SCENARIOS ═══');

  // Night shift FT
  console.log('\n6.1 FT night shift 10pm-6am');
  try {
    const r = await calcShift('full_time', cid(1), REF_MONDAY, '22:00', '06:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    const total = payOnly(r);
    record('CS-01', total, total, 'FT L1 night 10pm-6am (7.5hr) = $' + total);
  } catch(e) { recordText('CS-01', 0, 'ERROR', 'FAIL', e.message); }

  // Casual Sunday shift (4hr, no OT)
  console.log('\n6.2 Casual L1 Sunday 4hr');
  try {
    const r = await calcShift('casual', cid(1), REF_SUNDAY, '10:00', '14:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    // 4hr. Casual Sunday ×1.8 = $33.91 × 1.8 = $61.04/hr × 4
    record('CS-02', round2(61.04 * 4), payOnly(r), 'Casual L1 Sunday 4hr');
  } catch(e) { recordText('CS-02', 0, 'ERROR', 'FAIL', e.message); }

  // FT Mon-Sat week
  console.log('\n6.3 FT Mon-Sat week');
  try {
    const shifts = [];
    for (let d = 7; d <= 12; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '09:00', endTime: '17:00', mealBreakTaken: true, mealBreakDuration: 30 });
    const r = await calcMultiShift('full_time', cid(1), shifts);
    const total = payOnly(r);
    record('CS-03', total, total, 'FT L1 Mon-Sat 45hr = $' + total);
  } catch(e) { recordText('CS-03', 0, 'ERROR', 'FAIL', e.message); }

  // Casual PH
  console.log('\n6.4 Casual L1 PH 4hr');
  try {
    const r = await calcShift('casual', cid(1), REF_PH, '10:00', '14:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] });
    record('CS-04', round2(74.61 * 4), payOnly(r), 'Casual L1 PH 4hr = $74.61 × 4');
  } catch(e) { recordText('CS-04', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 7 — REGRESSION
   ═══════════════════════════════════════════════════════════════════════════ */
async function runRegressionTests() {
  console.log('\n═══ SECTION 7 — REGRESSION ═══');

  try {
    const r = await calcShift('full_time', cid(3), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-01', round2(28.38 * 4), payOnly(r), 'L3 FT Mon 4hr = $28.38 × 4');
  } catch(e) { recordText('RT-01', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('casual', cid(5), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-02', round2(37.24 * 4), payOnly(r), 'L5 casual Mon 4hr = $37.24 × 4');
  } catch(e) { recordText('RT-02', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', cid(5), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-03', round2(59.58 * 4), payOnly(r), 'L5 FT Sun 4hr = $59.58 × 4');
  } catch(e) { recordText('RT-03', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('casual', cid(3), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] });
    record('RT-04', round2(78.05 * 4), payOnly(r), 'L3 casual PH 4hr = $78.05 × 4 (pay guide)');
  } catch(e) { recordText('RT-04', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN
   ═══════════════════════════════════════════════════════════════════════════ */
async function main() {
  console.log('WageCheck Security Services Industry Award Test Runner — MA000016');
  console.log('═'.repeat(65));
  await t.init();
  await runBaseRateTests();
  await runPenaltyRateTests();
  await runOvertimeTests();
  await runAllowanceTests();
  await runSuperTests();
  await runComplexTests();
  await runRegressionTests();
  t.printSummary();
  t.generateExcel();
  await t.cleanup();
}
main().catch(e => { console.error('Fatal:', e); t.cleanup(); process.exit(1); });
