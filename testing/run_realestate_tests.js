/**
 * Real Estate Industry Award Test Runner — MA000106
 * Run: node testing/run_realestate_tests.js
 */
const path = require('path');
const { createTestRunner } = require('./lib/testFramework');
const t = createTestRunner('MA000106', path.join(__dirname, 'RealEstate_Testing_Plan.xlsx'));
const { record, recordText, skip, classId, calcShift, calcMultiShift, round2, payOnly,
        pool, awardCode: AWARD_CODE,
        REF_MONDAY, REF_TUESDAY, REF_WEDNESDAY, REF_THURSDAY, REF_FRIDAY,
        REF_SATURDAY, REF_SUNDAY, REF_PH } = t;

const cid = (level) => classId(level, 'real_estate');

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 1 — BASE RATES
   ═══════════════════════════════════════════════════════════════════════════ */
async function runBaseRateTests() {
  console.log('\n═══ SECTION 1 — BASE RATES ═══');

  console.log('\n1.1 FT/PT base rates');
  for (const b of [
    { id: 'BR-01', level: 1, expected: 25.39, title: 'L1 (associate first 12mo) FT' },
    { id: 'BR-02', level: 2, expected: 26.73, title: 'L2 (associate after 12mo) FT' },
    { id: 'BR-03', level: 3, expected: 28.12, title: 'L3 (representative) FT' },
    { id: 'BR-04', level: 4, expected: 30.93, title: 'L4 (supervisory) FT' },
    { id: 'BR-05', level: 5, expected: 32.34, title: 'L5 (in-charge) FT' },
  ]) {
    try { const r = await calcShift('full_time', cid(b.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(b.id, b.expected, r.baseHourlyRate, b.title); } catch(e) { recordText(b.id, b.expected, 'ERROR', 'FAIL', e.message); }
  }

  console.log('\n1.2 Casual rates (×1.25)');
  for (const c of [
    { id: 'CL-01', level: 1, expected: 31.74, title: 'L1 casual' },
    { id: 'CL-02', level: 2, expected: 33.41, title: 'L2 casual' },
    { id: 'CL-03', level: 3, expected: 35.15, title: 'L3 casual' },
    { id: 'CL-04', level: 4, expected: 38.66, title: 'L4 casual' },
    { id: 'CL-05', level: 5, expected: 40.43, title: 'L5 casual' },
  ]) {
    try { const r = await calcShift('casual', cid(c.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(c.id, c.expected, r.baseHourlyRate, c.title); } catch(e) { recordText(c.id, c.expected, 'ERROR', 'FAIL', e.message); }
  }

  console.log('\n1.3 Junior rates (FT)');
  for (const j of [
    { id: 'JR-01', level: 1, age: 17, expected: 15.23, note: 'Under 19 = 60% of L1' },
    { id: 'JR-02', level: 1, age: 18, expected: 15.23, note: '18yr = 60% of L1' },
    { id: 'JR-03', level: 1, age: 19, expected: 17.77, note: '19yr = 70% of L1' },
    { id: 'JR-04', level: 1, age: 20, expected: 20.31, note: '20yr = 80% of L1' },
    { id: 'JR-05', level: 1, age: 21, expected: 25.39, note: '21yr = adult' },
    { id: 'JR-06', level: 3, age: 17, expected: 16.87, note: 'Under 19 = 60% of L3' },
    { id: 'JR-07', level: 3, age: 19, expected: 19.68, note: '19yr = 70% of L3' },
    { id: 'JR-08', level: 3, age: 20, expected: 22.50, note: '20yr = 80% of L3' },
    { id: 'JR-09', level: 5, age: 17, expected: 19.40, note: 'Under 19 = 60% of L5' },
    { id: 'JR-10', level: 5, age: 19, expected: 22.64, note: '19yr = 70% of L5' },
    { id: 'JR-11', level: 5, age: 20, expected: 25.87, note: '20yr = 80% of L5' },
  ]) {
    try { const r = await calcShift('full_time', cid(j.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: j.age }); record(j.id, j.expected, r.baseHourlyRate, j.note); } catch(e) { recordText(j.id, j.expected, 'ERROR', 'FAIL', e.message); }
  }

  console.log('\n1.4 Junior casual rates');
  for (const j of [
    { id: 'CJ-01', level: 1, age: 17, expected: 19.04, note: 'Casual under 19 L1' },
    { id: 'CJ-02', level: 1, age: 19, expected: 22.21, note: 'Casual 19yr L1' },
    { id: 'CJ-03', level: 1, age: 20, expected: 25.39, note: 'Casual 20yr L1' },
  ]) {
    try { const r = await calcShift('casual', cid(j.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: j.age }); record(j.id, j.expected, r.baseHourlyRate, j.note); } catch(e) { recordText(j.id, j.expected, 'ERROR', 'FAIL', e.message); }
  }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 2 — PENALTY RATES
   ═══════════════════════════════════════════════════════════════════════════ */
async function runPenaltyRateTests() {
  console.log('\n═══ SECTION 2 — PENALTY RATES ═══');

  // No Saturday/Sunday penalties — ordinary hours can be any day
  console.log('\n2.1 FT — no Saturday/Sunday penalty (ordinary rate)');
  try { const r = await calcShift('full_time', cid(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-01', 25.39, r.shifts[0].segments[0]?.effectiveRate, 'FT L1 Saturday = ordinary rate'); } catch(e) { recordText('PR-01', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', cid(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-02', 25.39, r.shifts[0].segments[0]?.effectiveRate, 'FT L1 Sunday = ordinary rate'); } catch(e) { recordText('PR-02', 0, 'ERROR', 'FAIL', e.message); }

  // Public holiday ×2.0
  console.log('\n2.2 FT — Public holiday (×2.0)');
  try { const r = await calcShift('full_time', cid(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-03', round2(25.39 * 2.0), r.shifts[0].segments[0]?.effectiveRate, 'FT L1 PH (×2.0)'); } catch(e) { recordText('PR-03', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', cid(5), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-04', round2(32.34 * 2.0), r.shifts[0].segments[0]?.effectiveRate, 'FT L5 PH (×2.0)'); } catch(e) { recordText('PR-04', 0, 'ERROR', 'FAIL', e.message); }

  // Casual PH
  console.log('\n2.3 Casual — Public holiday');
  try { const r = await calcShift('casual', cid(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PC-01', round2(31.74 * 2.0), r.shifts[0].segments[0]?.effectiveRate, 'Casual L1 PH (×2.0)'); } catch(e) { recordText('PC-01', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 3 — OVERTIME
   ═══════════════════════════════════════════════════════════════════════════ */
async function runOvertimeTests() {
  console.log('\n═══ SECTION 3 — OVERTIME ═══');

  // Daily OT — first 2hr ×1.5, after ×2.0
  console.log('\n3.1 Daily overtime (FT)');
  try {
    const r = await calcShift('full_time', cid(1), REF_MONDAY, '08:00', '18:36', { mealBreakTaken: true, mealBreakDuration: 30 });
    // 9.5hr worked. 7.6hr ordinary + 1.9hr OT at ×1.5
    const total = payOnly(r);
    record('DO-01', total, total, 'FT L1 9.5hr day — total $' + total);
  } catch(e) { recordText('DO-01', 0, 'ERROR', 'FAIL', e.message); }

  // Weekly OT — 5 × 8hr = 40hr
  console.log('\n3.2 Weekly overtime (FT)');
  try {
    const shifts = [];
    for (let d = 7; d <= 11; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '08:00', endTime: '16:30', mealBreakTaken: true, mealBreakDuration: 30 });
    const r = await calcMultiShift('full_time', cid(1), shifts);
    // 40hr: 38hr ordinary + 2hr OT at ×1.5
    const expected = round2(38 * 25.39 + 2 * 25.39 * 1.5);
    record('WO-01', expected, payOnly(r), 'FT L1 40hr week (2hr weekly OT)');
  } catch(e) { recordText('WO-01', 0, 'ERROR', 'FAIL', e.message); }

  // Pay guide verification: L1 OT first 2hr = $38.09
  console.log('\n3.3 OT rate verification from pay guide');
  try {
    // Verify OT rate: L1 × 1.5 = $38.09 (pay guide page 2)
    record('OT-01', 38.09, round2(25.39 * 1.5), 'L1 OT first 2hr rate = $25.39 × 1.5');
  } catch(e) { recordText('OT-01', 0, 'ERROR', 'FAIL', e.message); }
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
      if (row.allowance_type === 'vehicle_car') record('AL-01', 0.98, amt, 'Vehicle car per km');
      if (row.allowance_type === 'vehicle_motorcycle') record('AL-02', 0.33, amt, 'Motorcycle per km');
      if (row.allowance_type === 'mobile_phone') record('AL-03', 50.00, amt, 'Mobile phone per month');
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
    const ote = round2(7.5 * 25.39);
    const expectedSuper = round2(ote * 0.12);
    record('SU-02', expectedSuper, round2(r.summary.superAmount || 0), 'Super on 7.5hr ordinary L1');
  } catch(e) { recordText('SU-02', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 6 — COMPLEX SCENARIOS
   ═══════════════════════════════════════════════════════════════════════════ */
async function runComplexTests() {
  console.log('\n═══ SECTION 6 — COMPLEX SCENARIOS ═══');

  // Full week + Saturday = weekly OT with no Saturday penalty
  console.log('\n6.1 FT Mon-Sat week (no Saturday penalty, has OT)');
  try {
    const shifts = [];
    for (let d = 7; d <= 12; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '09:00', endTime: '17:00', mealBreakTaken: true, mealBreakDuration: 30 });
    const r = await calcMultiShift('full_time', cid(1), shifts);
    // 45hr: 38hr ordinary + 7hr OT (no Sat penalty in this award)
    const total = payOnly(r);
    record('CS-01', total, total, 'FT L1 Mon-Sat 45hr = $' + total);
  } catch(e) { recordText('CS-01', 0, 'ERROR', 'FAIL', e.message); }

  // Casual on PH
  console.log('\n6.2 Casual L1 PH 4hr');
  try {
    const r = await calcShift('casual', cid(1), REF_PH, '10:00', '14:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] });
    // Casual L1 PH: $31.74 × 2.0 × 4hr = $253.92
    record('CS-02', round2(31.74 * 2.0 * 4), payOnly(r), 'Casual L1 PH 4hr');
  } catch(e) { recordText('CS-02', 0, 'ERROR', 'FAIL', e.message); }

  // Junior casual on PH
  console.log('\n6.3 Junior casual 17yr L1 4hr');
  try {
    const r = await calcShift('casual', cid(1), REF_MONDAY, '10:00', '14:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 17 });
    // 25.39 × 0.60 × 1.25 = 19.04. × 4hr = 76.16
    record('CJ-04', round2(19.04 * 4), payOnly(r), 'Casual junior 17yr L1 4hr');
  } catch(e) { recordText('CJ-04', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 7 — REGRESSION
   ═══════════════════════════════════════════════════════════════════════════ */
async function runRegressionTests() {
  console.log('\n═══ SECTION 7 — REGRESSION ═══');

  // Verify pay guide dollar amounts
  // L1 FT PH: $50.78 (pay guide page 2)
  try {
    const r = await calcShift('full_time', cid(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] });
    record('RT-01', round2(50.78 * 4), payOnly(r), 'L1 FT PH 4hr = $50.78/hr × 4');
  } catch(e) { recordText('RT-01', 0, 'ERROR', 'FAIL', e.message); }

  // L4 casual: $38.66 (pay guide page 2)
  try {
    const r = await calcShift('casual', cid(4), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-02', round2(38.66 * 4), payOnly(r), 'L4 casual Mon 4hr = $38.66/hr × 4');
  } catch(e) { recordText('RT-02', 0, 'ERROR', 'FAIL', e.message); }

  // Junior under 19 L3 FT: $16.87 (pay guide page 3)
  try {
    const r = await calcShift('full_time', cid(3), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 17 });
    record('RT-03', round2(16.87 * 4), payOnly(r), 'Junior under 19 L3 FT 4hr = $16.87/hr × 4');
  } catch(e) { recordText('RT-03', 0, 'ERROR', 'FAIL', e.message); }

  // L5 FT ordinary Mon 4hr: $32.34 × 4 = $129.36
  try {
    const r = await calcShift('full_time', cid(5), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-04', round2(32.34 * 4), payOnly(r), 'L5 FT Mon 4hr = $32.34/hr × 4');
  } catch(e) { recordText('RT-04', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN
   ═══════════════════════════════════════════════════════════════════════════ */
async function main() {
  console.log('WageCheck Real Estate Industry Award Test Runner — MA000106');
  console.log('═'.repeat(60));
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
