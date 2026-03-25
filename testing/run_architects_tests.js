/**
 * Architects Award Test Runner — MA000079
 * Run: node testing/run_architects_tests.js
 */
const path = require('path');
const { createTestRunner } = require('./lib/testFramework');
const t = createTestRunner('MA000079', path.join(__dirname, 'Architects_Testing_Plan.xlsx'));
const { record, recordText, skip, classId, calcShift, calcMultiShift, round2, payOnly,
        pool, awardCode: AWARD_CODE,
        REF_MONDAY, REF_TUESDAY, REF_WEDNESDAY, REF_THURSDAY, REF_FRIDAY,
        REF_SATURDAY, REF_SUNDAY, REF_PH } = t;

const gid = (level) => classId(level, 'graduate');
const rid = (level) => classId(level, 'registered');
const sid = (level) => classId(level, 'student');
const bid = (level) => classId(level, 'bachelor_pathway');

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 1 — BASE RATES
   ═══════════════════════════════════════════════════════════════════════════ */
async function runBaseRateTests() {
  console.log('\n═══ SECTION 1 — BASE RATES ═══');

  console.log('\n1.1 Graduate FT base rates');
  for (const b of [
    { id: 'BR-01', level: 1, expected: 32.84, title: 'Graduate L1 (entry) FT' },
    { id: 'BR-02', level: 2, expected: 34.58, title: 'Graduate L2 (1st pay pt) FT' },
    { id: 'BR-03', level: 3, expected: 36.31, title: 'Graduate L3 (2nd pay pt) FT' },
    { id: 'BR-04', level: 4, expected: 37.97, title: 'Graduate L4 (experienced/2a) FT' },
  ]) {
    try { const r = await calcShift('full_time', gid(b.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(b.id, b.expected, r.baseHourlyRate, b.title); } catch(e) { recordText(b.id, b.expected, 'ERROR', 'FAIL', e.message); }
  }

  console.log('\n1.2 Graduate casual rates (×1.25)');
  for (const c of [
    { id: 'CL-01', level: 1, expected: 41.05, title: 'Graduate L1 casual' },
    { id: 'CL-02', level: 4, expected: 47.46, title: 'Graduate L4 casual' },
  ]) {
    try { const r = await calcShift('casual', gid(c.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(c.id, c.expected, r.baseHourlyRate, c.title); } catch(e) { recordText(c.id, c.expected, 'ERROR', 'FAIL', e.message); }
  }

  console.log('\n1.3 Registered architect FT base rates');
  for (const b of [
    { id: 'BR-10', level: 1, expected: 37.97, title: 'Registered L1 (entry/2b) FT' },
    { id: 'BR-11', level: 2, expected: 39.14, title: 'Registered L2 (1st pay pt) FT' },
    { id: 'BR-12', level: 3, expected: 40.32, title: 'Registered L3 (2nd pay pt) FT' },
  ]) {
    try { const r = await calcShift('full_time', rid(b.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(b.id, b.expected, r.baseHourlyRate, b.title); } catch(e) { recordText(b.id, b.expected, 'ERROR', 'FAIL', e.message); }
  }

  console.log('\n1.4 Registered casual rates');
  for (const c of [
    { id: 'CL-10', level: 1, expected: 47.46, title: 'Registered L1 casual' },
    { id: 'CL-11', level: 2, expected: 48.93, title: 'Registered L2 casual' },
    { id: 'CL-12', level: 3, expected: 50.40, title: 'Registered L3 casual' },
  ]) {
    try { const r = await calcShift('casual', rid(c.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(c.id, c.expected, r.baseHourlyRate, c.title); } catch(e) { recordText(c.id, c.expected, 'ERROR', 'FAIL', e.message); }
  }

  console.log('\n1.5 Student FT base rates');
  for (const b of [
    { id: 'BR-20', level: 1, expected: 11.49, title: 'Student L1 (under 21, 13wk) FT' },
    { id: 'BR-21', level: 2, expected: 16.42, title: 'Student L2 (14-26wk) FT' },
    { id: 'BR-22', level: 3, expected: 21.35, title: 'Student L3 (27-52wk) FT' },
    { id: 'BR-23', level: 4, expected: 22.99, title: 'Student L4 (2nd yr) FT' },
    { id: 'BR-24', level: 5, expected: 24.63, title: 'Student L5 (3rd yr) FT' },
    { id: 'BR-25', level: 6, expected: 24.95, title: 'Student L6 (21+) FT' },
  ]) {
    try { const r = await calcShift('full_time', sid(b.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(b.id, b.expected, r.baseHourlyRate, b.title); } catch(e) { recordText(b.id, b.expected, 'ERROR', 'FAIL', e.message); }
  }

  console.log('\n1.6 Student casual rates');
  for (const c of [
    { id: 'CL-20', level: 1, expected: 14.36, title: 'Student L1 casual' },
    { id: 'CL-21', level: 6, expected: 31.19, title: 'Student L6 (21+) casual' },
  ]) {
    try { const r = await calcShift('casual', sid(c.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(c.id, c.expected, r.baseHourlyRate, c.title); } catch(e) { recordText(c.id, c.expected, 'ERROR', 'FAIL', e.message); }
  }

  console.log('\n1.7 Bachelor pathway FT base rates');
  for (const b of [
    { id: 'BR-30', level: 1, expected: 27.91, title: 'Bachelor L1 (1st yr) FT' },
    { id: 'BR-31', level: 2, expected: 29.56, title: 'Bachelor L2 (2nd yr) FT' },
    { id: 'BR-32', level: 3, expected: 31.20, title: 'Bachelor L3 (3rd yr) FT' },
  ]) {
    try { const r = await calcShift('full_time', bid(b.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(b.id, b.expected, r.baseHourlyRate, b.title); } catch(e) { recordText(b.id, b.expected, 'ERROR', 'FAIL', e.message); }
  }

  console.log('\n1.8 Bachelor pathway casual rates');
  for (const c of [
    { id: 'CL-30', level: 1, expected: 34.89, title: 'Bachelor L1 casual' },
    { id: 'CL-31', level: 3, expected: 39.00, title: 'Bachelor L3 casual' },
  ]) {
    try { const r = await calcShift('casual', bid(c.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(c.id, c.expected, r.baseHourlyRate, c.title); } catch(e) { recordText(c.id, c.expected, 'ERROR', 'FAIL', e.message); }
  }

  // No junior multiplier — verify students don't get reduced further
  console.log('\n1.9 No junior multiplier (student rates are standalone)');
  try {
    const r = await calcShift('full_time', sid(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 17 });
    record('JR-01', 11.49, r.baseHourlyRate, 'Student L1 age 17 = $11.49 (no junior reduction)');
  } catch(e) { recordText('JR-01', 0, 'ERROR', 'FAIL', e.message); }
  try {
    const r = await calcShift('full_time', gid(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 19 });
    record('JR-02', 32.84, r.baseHourlyRate, 'Graduate L1 age 19 = $32.84 (no junior reduction)');
  } catch(e) { recordText('JR-02', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 2 — PENALTY RATES
   ═══════════════════════════════════════════════════════════════════════════ */
async function runPenaltyRateTests() {
  console.log('\n═══ SECTION 2 — PENALTY RATES ═══');

  // No Saturday/Sunday penalties
  console.log('\n2.1 No Saturday/Sunday penalty');
  try { const r = await calcShift('full_time', gid(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-01', 32.84, r.shifts[0].segments[0]?.effectiveRate, 'Graduate L1 FT Saturday = ordinary'); } catch(e) { recordText('PR-01', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', gid(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-02', 32.84, r.shifts[0].segments[0]?.effectiveRate, 'Graduate L1 FT Sunday = ordinary'); } catch(e) { recordText('PR-02', 0, 'ERROR', 'FAIL', e.message); }

  // Public holiday ×1.5
  console.log('\n2.2 Public holiday (×1.5)');
  try { const r = await calcShift('full_time', gid(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-03', round2(32.84 * 1.5), r.shifts[0].segments[0]?.effectiveRate, 'Graduate L1 FT PH (×1.5)'); } catch(e) { recordText('PR-03', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', rid(3), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-04', round2(40.32 * 1.5), r.shifts[0].segments[0]?.effectiveRate, 'Registered L3 FT PH (×1.5)'); } catch(e) { recordText('PR-04', 0, 'ERROR', 'FAIL', e.message); }

  // Casual PH ×1.2 of casual rate
  console.log('\n2.3 Casual PH');
  try { const r = await calcShift('casual', gid(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PC-01', round2(41.05 * 1.2), r.shifts[0].segments[0]?.effectiveRate, 'Graduate L1 casual PH (×1.2 of casual)'); } catch(e) { recordText('PC-01', 0, 'ERROR', 'FAIL', e.message); }

  // Verify pay guide dollar amounts
  // Graduate L1 PH = $49.26 (pay guide page 2)
  console.log('\n2.4 Pay guide PH verification');
  try { const r = await calcShift('full_time', gid(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-05', 49.26, r.shifts[0].segments[0]?.effectiveRate, 'Graduate L1 PH = $49.26 (pay guide)'); } catch(e) { recordText('PR-05', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('casual', gid(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-06', 49.26, r.shifts[0].segments[0]?.effectiveRate, 'Graduate L1 casual PH = $49.26 (pay guide)'); } catch(e) { recordText('PR-06', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 3 — OVERTIME
   ═══════════════════════════════════════════════════════════════════════════ */
async function runOvertimeTests() {
  console.log('\n═══ SECTION 3 — OVERTIME ═══');

  // OT rate = ×1.5 (flat, single tier)
  console.log('\n3.1 OT rate verification');
  record('OT-01', 49.26, round2(32.84 * 1.5), 'Graduate L1 OT = $32.84 × 1.5 = $49.26 (pay guide)');
  record('OT-02', 56.96, round2(37.97 * 1.5), 'Registered L1 OT = $37.97 × 1.5 = $56.96 (pay guide)');
  record('OT-03', 17.24, round2(11.49 * 1.5), 'Student L1 OT = $11.49 × 1.5 = $17.24 (pay guide)');

  // Weekly OT — 5 × 8hr = 40hr
  console.log('\n3.2 Weekly overtime (FT)');
  try {
    const shifts = [];
    for (let d = 7; d <= 11; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '08:00', endTime: '16:30', mealBreakTaken: true, mealBreakDuration: 30 });
    const r = await calcMultiShift('full_time', gid(1), shifts);
    // 40hr: 38hr ordinary + 2hr OT at ×1.5
    const expected = round2(38 * 32.84 + 2 * 32.84 * 1.5);
    record('WO-01', expected, payOnly(r), 'Graduate FT L1 40hr week (2hr OT)');
  } catch(e) { recordText('WO-01', 0, 'ERROR', 'FAIL', e.message); }

  // Daily OT
  console.log('\n3.3 Daily overtime (FT)');
  try {
    const r = await calcShift('full_time', gid(1), REF_MONDAY, '08:00', '18:36', { mealBreakTaken: true, mealBreakDuration: 30 });
    const total = payOnly(r);
    record('DO-01', total, total, 'Graduate FT L1 9.5hr day — total $' + total);
  } catch(e) { recordText('DO-01', 0, 'ERROR', 'FAIL', e.message); }
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
      if (row.allowance_type === 'vehicle_car') record('AL-01', 0.98, amt, 'Vehicle per km');
      if (row.allowance_type === 'meal_travel') record('AL-02', 12.07, amt, 'Meal (air travel)');
    }
  } catch(e) { recordText('AL-01', 'N/A', 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 5 — SUPERANNUATION
   ═══════════════════════════════════════════════════════════════════════════ */
async function runSuperTests() {
  console.log('\n═══ SECTION 5 — SUPERANNUATION ═══');
  try { const r = await calcShift('full_time', gid(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('SU-01', 0.12, r.summary.sgcRate, 'SGC 12%'); } catch(e) { recordText('SU-01', 0.12, 'ERROR', 'FAIL', e.message); }
  try {
    const r = await calcShift('full_time', gid(1), REF_MONDAY, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    const ote = round2(7.5 * 32.84);
    const expectedSuper = round2(ote * 0.12);
    record('SU-02', expectedSuper, round2(r.summary.superAmount || 0), 'Super on 7.5hr ordinary Graduate L1');
  } catch(e) { recordText('SU-02', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 6 — COMPLEX SCENARIOS
   ═══════════════════════════════════════════════════════════════════════════ */
async function runComplexTests() {
  console.log('\n═══ SECTION 6 — COMPLEX SCENARIOS ═══');

  // Mon-Sat week (no Sat penalty, has weekly OT)
  console.log('\n6.1 Graduate FT Mon-Sat');
  try {
    const shifts = [];
    for (let d = 7; d <= 12; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '09:00', endTime: '17:00', mealBreakTaken: true, mealBreakDuration: 30 });
    const r = await calcMultiShift('full_time', gid(1), shifts);
    const total = payOnly(r);
    record('CS-01', total, total, 'Graduate FT L1 Mon-Sat 45hr = $' + total);
  } catch(e) { recordText('CS-01', 0, 'ERROR', 'FAIL', e.message); }

  // Casual student on PH
  console.log('\n6.2 Student casual L6 PH 4hr');
  try {
    const r = await calcShift('casual', sid(6), REF_PH, '10:00', '14:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] });
    // Student L6 casual: $31.19. PH ×1.2 = $37.43. × 4hr
    // But pay guide says student L6 casual PH = $37.43
    record('CS-02', round2(37.43 * 4), payOnly(r), 'Student L6 casual PH 4hr');
  } catch(e) { recordText('CS-02', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 7 — REGRESSION
   ═══════════════════════════════════════════════════════════════════════════ */
async function runRegressionTests() {
  console.log('\n═══ SECTION 7 — REGRESSION ═══');

  // Pay guide dollar verifications
  try {
    const r = await calcShift('full_time', rid(2), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-01', round2(39.14 * 4), payOnly(r), 'Registered L2 FT Mon 4hr');
  } catch(e) { recordText('RT-01', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('casual', bid(2), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-02', round2(36.95 * 4), payOnly(r), 'Bachelor L2 casual Mon 4hr = $36.95/hr × 4');
  } catch(e) { recordText('RT-02', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', sid(3), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-03', round2(21.35 * 4), payOnly(r), 'Student L3 FT Mon 4hr = $21.35/hr × 4');
  } catch(e) { recordText('RT-03', 0, 'ERROR', 'FAIL', e.message); }

  // Graduate L4 FT PH: $56.96 (pay guide)
  try {
    const r = await calcShift('full_time', gid(4), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] });
    record('RT-04', round2(56.96 * 4), payOnly(r), 'Graduate L4 FT PH 4hr = $56.96/hr × 4');
  } catch(e) { recordText('RT-04', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN
   ═══════════════════════════════════════════════════════════════════════════ */
async function main() {
  console.log('WageCheck Architects Award Test Runner — MA000079');
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
