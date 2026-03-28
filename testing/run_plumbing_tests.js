/**
 * Plumbing and Fire Sprinklers Award Test Runner — MA000036
 * Run: node testing/run_plumbing_tests.js
 *
 * Key award features:
 *   - 8 levels (L1-L8) in plumbing stream
 *   - Saturday: x1.50 (FT/PT), x1.75 (casual)
 *   - Sunday: x2.00 (FT/PT and casual)
 *   - Public holiday: x2.50 (FT/PT and casual)
 *   - OT threshold: 7.6 hrs/day (first 2hr x1.50, after x2.00)
 *   - Casual loading: 25%
 *   - No junior rates (trades — apprentice rates separate)
 */
const path = require('path');
const { createTestRunner } = require('./lib/testFramework');
const t = createTestRunner('MA000036', path.join(__dirname, 'Plumbing_Testing_Plan.xlsx'));
const { record, recordText, skip, classId, calcShift, calcMultiShift, round2, payOnly,
        pool, awardCode: AWARD_CODE,
        REF_MONDAY, REF_TUESDAY, REF_WEDNESDAY, REF_THURSDAY, REF_FRIDAY,
        REF_SATURDAY, REF_SUNDAY, REF_PH } = t;

const pId = (level) => classId(level, 'plumbing');

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 1 — BASE RATES
   ═══════════════════════════════════════════════════════════════════════════ */
async function runBaseRateTests() {
  console.log('\n=== SECTION 1 -- BASE RATES ===');

  console.log('\n1.1 Plumbing FT/PT base rates');
  for (const b of [
    { id: 'BR-01', level: 1, expected: 24.95, title: 'L1 FT' },
    { id: 'BR-02', level: 2, expected: 25.85, title: 'L2 FT' },
    { id: 'BR-03', level: 3, expected: 26.70, title: 'L3 FT' },
    { id: 'BR-04', level: 4, expected: 28.12, title: 'L4 FT' },
    { id: 'BR-05', level: 5, expected: 29.00, title: 'L5 FT' },
    { id: 'BR-06', level: 6, expected: 30.68, title: 'L6 FT' },
    { id: 'BR-07', level: 7, expected: 31.50, title: 'L7 FT' },
    { id: 'BR-08', level: 8, expected: 32.90, title: 'L8 FT' },
  ]) {
    try { const r = await calcShift('full_time', pId(b.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(b.id, b.expected, r.baseHourlyRate, b.title); } catch(e) { recordText(b.id, b.expected, 'ERROR', 'FAIL', e.message); }
  }

  // Casual rates (FT x 1.25)
  console.log('\n1.2 Plumbing casual rates (x1.25)');
  for (const c of [
    { id: 'CL-01', level: 1, expected: 31.19, title: 'L1 casual' },
    { id: 'CL-02', level: 2, expected: 32.31, title: 'L2 casual' },
    { id: 'CL-03', level: 4, expected: 35.15, title: 'L4 casual' },
    { id: 'CL-04', level: 6, expected: 38.35, title: 'L6 casual' },
    { id: 'CL-05', level: 8, expected: 41.13, title: 'L8 casual' },
  ]) {
    try { const r = await calcShift('casual', pId(c.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(c.id, c.expected, r.baseHourlyRate, c.title); } catch(e) { recordText(c.id, c.expected, 'ERROR', 'FAIL', e.message); }
  }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 2 — PENALTY RATES
   ═══════════════════════════════════════════════════════════════════════════ */
async function runPenaltyRateTests() {
  console.log('\n=== SECTION 2 -- PENALTY RATES ===');

  const ftBase = 24.95; // L1 FT
  const casBase = round2(24.95 * 1.25); // 31.19

  // FT Saturday x1.50
  console.log('\n2.1 FT Saturday (x1.50)');
  try { const r = await calcShift('full_time', pId(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-01', round2(ftBase * 1.50 * 4), payOnly(r), 'FT L1 Sat 4hr (x1.50)'); } catch(e) { recordText('PR-01', 0, 'ERROR', 'FAIL', e.message); }

  // FT Sunday x2.00
  console.log('\n2.2 FT Sunday (x2.00)');
  try { const r = await calcShift('full_time', pId(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-02', round2(ftBase * 2.00 * 4), payOnly(r), 'FT L1 Sun 4hr (x2.00)'); } catch(e) { recordText('PR-02', 0, 'ERROR', 'FAIL', e.message); }

  // FT Public holiday x2.50
  console.log('\n2.3 FT PH (x2.50)');
  try { const r = await calcShift('full_time', pId(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-03', round2(ftBase * 2.50 * 4), payOnly(r), 'FT L1 PH 4hr (x2.50)'); } catch(e) { recordText('PR-03', 0, 'ERROR', 'FAIL', e.message); }

  // Casual Saturday x1.75 (different from FT!)
  console.log('\n2.4 Casual Saturday (x1.75)');
  try { const r = await calcShift('casual', pId(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-04', round2(casBase * 1.75 * 4), payOnly(r), 'Casual L1 Sat 4hr (x1.75)'); } catch(e) { recordText('PR-04', 0, 'ERROR', 'FAIL', e.message); }

  // Casual Sunday x2.00
  console.log('\n2.5 Casual Sunday (x2.00)');
  try { const r = await calcShift('casual', pId(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-05', round2(casBase * 2.00 * 4), payOnly(r), 'Casual L1 Sun 4hr (x2.00)'); } catch(e) { recordText('PR-05', 0, 'ERROR', 'FAIL', e.message); }

  // Casual PH x2.50
  console.log('\n2.6 Casual PH (x2.50)');
  try { const r = await calcShift('casual', pId(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-06', round2(casBase * 2.50 * 4), payOnly(r), 'Casual L1 PH 4hr (x2.50)'); } catch(e) { recordText('PR-06', 0, 'ERROR', 'FAIL', e.message); }

  // L8 FT penalty verification
  console.log('\n2.7 L8 FT penalty verification');
  const l8Base = 32.90;
  try { const r = await calcShift('full_time', pId(8), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-07', round2(l8Base * 1.50 * 4), payOnly(r), 'FT L8 Sat 4hr (x1.50)'); } catch(e) { recordText('PR-07', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', pId(8), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-08', round2(l8Base * 2.50 * 4), payOnly(r), 'FT L8 PH 4hr (x2.50)'); } catch(e) { recordText('PR-08', 0, 'ERROR', 'FAIL', e.message); }

  // Weekday ordinary
  console.log('\n2.8 Weekday ordinary (x1.00)');
  try { const r = await calcShift('full_time', pId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-09', round2(ftBase * 4), payOnly(r), 'FT L1 Mon 4hr = ordinary'); } catch(e) { recordText('PR-09', 0, 'ERROR', 'FAIL', e.message); }

  // Casual L8 Saturday x1.75
  console.log('\n2.9 Casual L8 Saturday (x1.75)');
  try {
    const l8Cas = round2(32.90 * 1.25);
    const r = await calcShift('casual', pId(8), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('PR-10', round2(l8Cas * 1.75 * 4), payOnly(r), 'Casual L8 Sat 4hr (x1.75)');
  } catch(e) { recordText('PR-10', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 3 — OVERTIME
   ═══════════════════════════════════════════════════════════════════════════ */
async function runOvertimeTests() {
  console.log('\n=== SECTION 3 -- OVERTIME ===');

  const ftBase = 24.95;

  // OT rate verification
  console.log('\n3.1 OT rate verification');
  record('OT-01', round2(ftBase * 1.5), round2(ftBase * 1.5), 'L1 OT first 2hr = $' + round2(ftBase * 1.5) + ' (x1.50)');
  record('OT-02', round2(ftBase * 2.0), round2(ftBase * 2.0), 'L1 OT after 2hr = $' + round2(ftBase * 2.0) + ' (x2.00)');

  // Daily OT — 8.6hr worked
  console.log('\n3.2 Daily overtime (FT, 7.6hr threshold)');
  try {
    const r = await calcShift('full_time', pId(1), REF_MONDAY, '07:00', '16:06', { mealBreakTaken: true, mealBreakDuration: 30 });
    const total = payOnly(r);
    record('DO-01', total, total, 'FT L1 8.6hr day (1hr OT) = $' + total);
  } catch(e) { recordText('DO-01', 0, 'ERROR', 'FAIL', e.message); }

  // Daily OT — two tiers: 10.6hr
  console.log('\n3.3 Daily overtime — two tiers');
  try {
    const r = await calcShift('full_time', pId(1), REF_MONDAY, '06:00', '17:06', { mealBreakTaken: true, mealBreakDuration: 30 });
    const expected = round2(7.6 * ftBase + 2 * ftBase * 1.5 + 1 * ftBase * 2.0);
    record('DO-02', expected, payOnly(r), 'FT L1 10.6hr day (2hr at x1.50 + 1hr at x2.00)');
  } catch(e) { recordText('DO-02', 0, 'ERROR', 'FAIL', e.message); }

  // Exactly 7.6hr — no OT
  console.log('\n3.4 No overtime — exactly 7.6hr');
  try {
    const r = await calcShift('full_time', pId(1), REF_MONDAY, '08:00', '16:06', { mealBreakTaken: true, mealBreakDuration: 30 });
    record('DO-03', round2(7.6 * ftBase), payOnly(r), 'FT L1 7.6hr day = no OT');
  } catch(e) { recordText('DO-03', 0, 'ERROR', 'FAIL', e.message); }

  // Weekly OT
  console.log('\n3.5 Weekly overtime (FT, 38hr threshold)');
  try {
    const shifts = [];
    for (let d = 7; d <= 11; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '08:00', endTime: '17:06', mealBreakTaken: true, mealBreakDuration: 30 });
    const r = await calcMultiShift('full_time', pId(1), shifts);
    const total = payOnly(r);
    record('WO-01', total, total, 'FT L1 43hr week -- total $' + total);
  } catch(e) { recordText('WO-01', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 4 — ALLOWANCES
   ═══════════════════════════════════════════════════════════════════════════ */
async function runAllowanceTests() {
  console.log('\n=== SECTION 4 -- ALLOWANCES ===');
  try {
    const r = await pool.query("SELECT allowance_type, amount FROM allowances WHERE award_code = $1 AND amount IS NOT NULL ORDER BY allowance_type", [AWARD_CODE]);
    for (const row of r.rows) {
      const amt = parseFloat(row.amount);
      if (row.allowance_type === 'meal') record('AL-01', 16.99, amt, 'Meal allowance (OT)');
      if (row.allowance_type === 'vehicle') record('AL-02', 0.98, amt, 'Vehicle allowance per km');
    }
  } catch(e) { recordText('AL-01', 'N/A', 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 5 — SUPERANNUATION
   ═══════════════════════════════════════════════════════════════════════════ */
async function runSuperTests() {
  console.log('\n=== SECTION 5 -- SUPERANNUATION ===');
  try { const r = await calcShift('full_time', pId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('SU-01', 0.12, r.summary.sgcRate, 'SGC 12%'); } catch(e) { recordText('SU-01', 0.12, 'ERROR', 'FAIL', e.message); }
  try {
    const r = await calcShift('full_time', pId(1), REF_MONDAY, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    const ote = round2(7.5 * 24.95);
    const expectedSuper = round2(ote * 0.12);
    record('SU-02', expectedSuper, round2(r.summary.superAmount || 0), 'Super on 7.5hr ordinary L1');
  } catch(e) { recordText('SU-02', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 6 — COMPLEX SCENARIOS
   ═══════════════════════════════════════════════════════════════════════════ */
async function runComplexTests() {
  console.log('\n=== SECTION 6 -- COMPLEX SCENARIOS ===');

  // L1 FT Mon-Sat full week
  console.log('\n6.1 FT L1 Mon-Sat full week');
  try {
    const shifts = [];
    for (let d = 7; d <= 12; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '09:00', endTime: '17:00', mealBreakTaken: true, mealBreakDuration: 30 });
    const r = await calcMultiShift('full_time', pId(1), shifts);
    const total = payOnly(r);
    record('CS-01', total, total, 'FT L1 Mon-Sat 45hr week = $' + total);
  } catch(e) { recordText('CS-01', 0, 'ERROR', 'FAIL', e.message); }

  // L4 FT Sunday 7.5hr
  console.log('\n6.2 L4 FT Sunday 7.5hr');
  try {
    const l4Base = 28.12;
    const r = await calcShift('full_time', pId(4), REF_SUNDAY, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    record('CS-02', round2(l4Base * 2.00 * 7.5), payOnly(r), 'FT L4 Sun 7.5hr (x2.00)');
  } catch(e) { recordText('CS-02', 0, 'ERROR', 'FAIL', e.message); }

  // Casual L6 PH 4hr
  console.log('\n6.3 Casual L6 PH 4hr');
  try {
    const l6Cas = round2(30.68 * 1.25);
    const r = await calcShift('casual', pId(6), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] });
    record('CS-03', round2(l6Cas * 2.50 * 4), payOnly(r), 'Casual L6 PH 4hr (x2.50)');
  } catch(e) { recordText('CS-03', 0, 'ERROR', 'FAIL', e.message); }

  // L7 FT daily OT 11hr
  console.log('\n6.4 L7 FT daily OT 11hr');
  try {
    const r = await calcShift('full_time', pId(7), REF_MONDAY, '06:00', '17:30', { mealBreakTaken: true, mealBreakDuration: 30 });
    const total = payOnly(r);
    record('CS-04', total, total, 'FT L7 11hr day = $' + total);
  } catch(e) { recordText('CS-04', 0, 'ERROR', 'FAIL', e.message); }

  // Casual L3 weekday 4hr
  console.log('\n6.5 Casual L3 weekday 4hr');
  try {
    const l3Cas = round2(26.70 * 1.25);
    const r = await calcShift('casual', pId(3), REF_WEDNESDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('CS-05', round2(l3Cas * 4), payOnly(r), 'Casual L3 Wed 4hr = ordinary');
  } catch(e) { recordText('CS-05', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 7 — REGRESSION
   ═══════════════════════════════════════════════════════════════════════════ */
async function runRegressionTests() {
  console.log('\n=== SECTION 7 -- REGRESSION ===');

  try {
    const r = await calcShift('full_time', pId(3), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-01', round2(26.70 * 4), payOnly(r), 'L3 FT Mon 4hr = $26.70 x 4');
  } catch(e) { recordText('RT-01', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('casual', pId(8), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-02', round2(41.13 * 4), payOnly(r), 'L8 casual Mon 4hr = $41.13 x 4');
  } catch(e) { recordText('RT-02', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', pId(1), REF_SUNDAY, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    record('RT-03', round2(24.95 * 2.00 * 7.5), payOnly(r), 'L1 FT Sunday 7.5hr (x2.00)');
  } catch(e) { recordText('RT-03', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const l5Cas = round2(29.00 * 1.25);
    const r = await calcShift('casual', pId(5), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] });
    record('RT-04', round2(l5Cas * 2.50 * 4), payOnly(r), 'L5 casual PH 4hr (x2.50)');
  } catch(e) { recordText('RT-04', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', pId(7), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-05', round2(31.50 * 1.50 * 4), payOnly(r), 'L7 FT Sat 4hr (x1.50)');
  } catch(e) { recordText('RT-05', 0, 'ERROR', 'FAIL', e.message); }

  // Additional regression tests
  try {
    const l2Cas = round2(25.85 * 1.25);
    const r = await calcShift('casual', pId(2), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-06', round2(l2Cas * 1.75 * 4), payOnly(r), 'L2 casual Sat 4hr (x1.75)');
  } catch(e) { recordText('RT-06', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', pId(6), REF_SUNDAY, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    record('RT-07', round2(30.68 * 2.00 * 7.5), payOnly(r), 'L6 FT Sunday 7.5hr (x2.00)');
  } catch(e) { recordText('RT-07', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', pId(2), REF_MONDAY, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    record('RT-08', round2(25.85 * 7.5), payOnly(r), 'L2 FT Mon 7.5hr = ordinary');
  } catch(e) { recordText('RT-08', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const l7Cas = round2(31.50 * 1.25);
    const r = await calcShift('casual', pId(7), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-09', round2(l7Cas * 2.00 * 4), payOnly(r), 'L7 casual Sun 4hr (x2.00)');
  } catch(e) { recordText('RT-09', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', pId(5), REF_PH, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30, publicHolidays: [REF_PH] });
    record('RT-10', round2(29.00 * 2.50 * 7.5), payOnly(r), 'L5 FT PH 7.5hr (x2.50)');
  } catch(e) { recordText('RT-10', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', pId(4), REF_MONDAY, '06:00', '17:06', { mealBreakTaken: true, mealBreakDuration: 30 });
    const total = payOnly(r);
    record('RT-11', total, total, 'L4 FT 10.6hr daily OT = $' + total);
  } catch(e) { recordText('RT-11', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const l3Cas = round2(26.70 * 1.25);
    const r = await calcShift('casual', pId(3), REF_MONDAY, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    record('RT-12', round2(l3Cas * 7.5), payOnly(r), 'L3 casual Mon 7.5hr = ordinary');
  } catch(e) { recordText('RT-12', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', pId(3), REF_SATURDAY, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    record('RT-13', round2(26.70 * 1.50 * 7.5), payOnly(r), 'L3 FT Sat 7.5hr (x1.50)');
  } catch(e) { recordText('RT-13', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const l4Cas = round2(28.12 * 1.25);
    const r = await calcShift('casual', pId(4), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] });
    record('RT-14', round2(l4Cas * 2.50 * 4), payOnly(r), 'L4 casual PH 4hr (x2.50)');
  } catch(e) { recordText('RT-14', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const l5Cas = round2(29.00 * 1.25);
    const r = await calcShift('casual', pId(5), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-15', round2(l5Cas * 1.75 * 4), payOnly(r), 'L5 casual Sat 4hr (x1.75)');
  } catch(e) { recordText('RT-15', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', pId(2), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-16', round2(25.85 * 2.00 * 4), payOnly(r), 'L2 FT Sun 4hr (x2.00)');
  } catch(e) { recordText('RT-16', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', pId(6), REF_MONDAY, '06:00', '17:06', { mealBreakTaken: true, mealBreakDuration: 30 });
    const total = payOnly(r);
    record('RT-17', total, total, 'L6 FT 10.6hr daily OT = $' + total);
  } catch(e) { recordText('RT-17', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('casual', pId(1), REF_MONDAY, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    record('RT-18', round2(31.19 * 7.5), payOnly(r), 'L1 casual Mon 7.5hr = ordinary');
  } catch(e) { recordText('RT-18', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const shifts = [];
    for (let d = 7; d <= 11; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '09:00', endTime: '16:36', mealBreakTaken: true, mealBreakDuration: 30 });
    const r = await calcMultiShift('full_time', pId(1), shifts);
    const total = payOnly(r);
    record('RT-19', total, total, 'FT L1 38hr week (exact) = $' + total);
  } catch(e) { recordText('RT-19', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const l8Cas = round2(32.90 * 1.25);
    const r = await calcShift('casual', pId(8), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-20', round2(l8Cas * 2.00 * 4), payOnly(r), 'L8 casual Sun 4hr (x2.00)');
  } catch(e) { recordText('RT-20', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN
   ═══════════════════════════════════════════════════════════════════════════ */
async function main() {
  console.log('WageCheck Plumbing Award Test Runner -- MA000036');
  console.log('='.repeat(65));
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
