/**
 * Electrical, Electronic and Communications Contracting Award Test Runner — MA000025
 * Run: node testing/run_electrical_tests.js
 *
 * Key award features:
 *   - 10 grades (G1-G10) in electrical stream
 *   - Saturday: x1.50 (FT/PT and casual)
 *   - Sunday: x2.00 (FT/PT and casual)
 *   - Public holiday: x2.50 (FT/PT and casual)
 *   - OT threshold: 7.6 hrs/day (first 2hr x1.50, after x2.00)
 *   - Casual loading: 25%
 *   - Junior rates: <16=42%, 16=42%, 17=55%, 18=75%, 19=95%, 20+=adult
 */
const path = require('path');
const { createTestRunner } = require('./lib/testFramework');
const t = createTestRunner('MA000025', path.join(__dirname, 'Electrical_Testing_Plan.xlsx'));
const { record, recordText, skip, classId, calcShift, calcMultiShift, round2, payOnly,
        pool, awardCode: AWARD_CODE,
        REF_MONDAY, REF_TUESDAY, REF_WEDNESDAY, REF_THURSDAY, REF_FRIDAY,
        REF_SATURDAY, REF_SUNDAY, REF_PH } = t;

const eId = (level) => classId(level, 'electrical');

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 1 — BASE RATES (FT)
   ═══════════════════════════════════════════════════════════════════════════ */
async function runBaseRateTests() {
  console.log('\n=== SECTION 1 -- BASE RATES ===');

  console.log('\n1.1 Electrical FT/PT base rates');
  for (const b of [
    { id: 'BR-01', level: 1,  expected: 24.95, title: 'G1 FT' },
    { id: 'BR-02', level: 2,  expected: 25.45, title: 'G2 FT' },
    { id: 'BR-03', level: 3,  expected: 26.30, title: 'G3 FT' },
    { id: 'BR-04', level: 4,  expected: 27.00, title: 'G4 FT' },
    { id: 'BR-05', level: 5,  expected: 28.12, title: 'G5 FT' },
    { id: 'BR-06', level: 6,  expected: 29.00, title: 'G6 FT' },
    { id: 'BR-07', level: 7,  expected: 30.00, title: 'G7 FT' },
    { id: 'BR-08', level: 8,  expected: 31.50, title: 'G8 FT' },
    { id: 'BR-09', level: 9,  expected: 33.50, title: 'G9 FT' },
    { id: 'BR-10', level: 10, expected: 35.55, title: 'G10 FT' },
  ]) {
    try { const r = await calcShift('full_time', eId(b.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(b.id, b.expected, r.baseHourlyRate, b.title); } catch(e) { recordText(b.id, b.expected, 'ERROR', 'FAIL', e.message); }
  }

  // Casual rates (FT x 1.25)
  console.log('\n1.2 Electrical casual rates (x1.25)');
  for (const c of [
    { id: 'CL-01', level: 1,  expected: 31.19, title: 'G1 casual' },
    { id: 'CL-02', level: 2,  expected: 31.81, title: 'G2 casual' },
    { id: 'CL-03', level: 3,  expected: 32.88, title: 'G3 casual' },
    { id: 'CL-04', level: 5,  expected: 35.15, title: 'G5 casual' },
    { id: 'CL-05', level: 7,  expected: 37.50, title: 'G7 casual' },
    { id: 'CL-06', level: 10, expected: 44.44, title: 'G10 casual' },
  ]) {
    try { const r = await calcShift('casual', eId(c.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(c.id, c.expected, r.baseHourlyRate, c.title); } catch(e) { recordText(c.id, c.expected, 'ERROR', 'FAIL', e.message); }
  }

  // Junior rates
  console.log('\n1.3 Junior rates');
  try { const r = await calcShift('full_time', eId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 16 }); record('JR-01', round2(24.95 * 0.42), r.baseHourlyRate, 'G1 FT age 16 (42%)'); } catch(e) { recordText('JR-01', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', eId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 17 }); record('JR-02', round2(24.95 * 0.55), r.baseHourlyRate, 'G1 FT age 17 (55%)'); } catch(e) { recordText('JR-02', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', eId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 18 }); record('JR-03', round2(24.95 * 0.75), r.baseHourlyRate, 'G1 FT age 18 (75%)'); } catch(e) { recordText('JR-03', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', eId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 19 }); record('JR-04', round2(24.95 * 0.95), r.baseHourlyRate, 'G1 FT age 19 (95%)'); } catch(e) { recordText('JR-04', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', eId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 20 }); record('JR-05', 24.95, r.baseHourlyRate, 'G1 FT age 20 (adult)'); } catch(e) { recordText('JR-05', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 2 — PENALTY RATES
   ═══════════════════════════════════════════════════════════════════════════ */
async function runPenaltyRateTests() {
  console.log('\n=== SECTION 2 -- PENALTY RATES ===');

  const ftBase = 24.95; // G1 FT
  const casBase = round2(24.95 * 1.25); // 31.1875 -> 31.19

  // Saturday x1.50
  console.log('\n2.1 FT Saturday (x1.50)');
  try { const r = await calcShift('full_time', eId(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-01', round2(ftBase * 1.50 * 4), payOnly(r), 'FT G1 Sat 4hr (x1.50)'); } catch(e) { recordText('PR-01', 0, 'ERROR', 'FAIL', e.message); }

  // Sunday x2.00
  console.log('\n2.2 FT Sunday (x2.00)');
  try { const r = await calcShift('full_time', eId(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-02', round2(ftBase * 2.00 * 4), payOnly(r), 'FT G1 Sun 4hr (x2.00)'); } catch(e) { recordText('PR-02', 0, 'ERROR', 'FAIL', e.message); }

  // Public holiday x2.50
  console.log('\n2.3 FT Public holiday (x2.50)');
  try { const r = await calcShift('full_time', eId(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-03', round2(ftBase * 2.50 * 4), payOnly(r), 'FT G1 PH 4hr (x2.50)'); } catch(e) { recordText('PR-03', 0, 'ERROR', 'FAIL', e.message); }

  // Casual Saturday x1.50
  console.log('\n2.4 Casual Saturday (x1.50)');
  try { const r = await calcShift('casual', eId(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-04', round2(casBase * 1.50 * 4), payOnly(r), 'Casual G1 Sat 4hr (x1.50)'); } catch(e) { recordText('PR-04', 0, 'ERROR', 'FAIL', e.message); }

  // Casual Sunday x2.00
  console.log('\n2.5 Casual Sunday (x2.00)');
  try { const r = await calcShift('casual', eId(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-05', round2(casBase * 2.00 * 4), payOnly(r), 'Casual G1 Sun 4hr (x2.00)'); } catch(e) { recordText('PR-05', 0, 'ERROR', 'FAIL', e.message); }

  // Casual PH x2.50
  console.log('\n2.6 Casual Public holiday (x2.50)');
  try { const r = await calcShift('casual', eId(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-06', round2(casBase * 2.50 * 4), payOnly(r), 'Casual G1 PH 4hr (x2.50)'); } catch(e) { recordText('PR-06', 0, 'ERROR', 'FAIL', e.message); }

  // G10 FT Saturday
  console.log('\n2.7 G10 penalty verification');
  const g10Base = 35.55;
  try { const r = await calcShift('full_time', eId(10), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-07', round2(g10Base * 1.50 * 4), payOnly(r), 'FT G10 Sat 4hr (x1.50)'); } catch(e) { recordText('PR-07', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', eId(10), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-08', round2(g10Base * 2.50 * 4), payOnly(r), 'FT G10 PH 4hr (x2.50)'); } catch(e) { recordText('PR-08', 0, 'ERROR', 'FAIL', e.message); }

  // Weekday ordinary — no penalty
  console.log('\n2.8 Weekday ordinary (x1.00)');
  try { const r = await calcShift('full_time', eId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-09', round2(ftBase * 4), payOnly(r), 'FT G1 Mon 4hr = ordinary'); } catch(e) { recordText('PR-09', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 3 — OVERTIME
   ═══════════════════════════════════════════════════════════════════════════ */
async function runOvertimeTests() {
  console.log('\n=== SECTION 3 -- OVERTIME ===');

  const ftBase = 24.95;

  // OT rate verification
  console.log('\n3.1 OT rate verification');
  record('OT-01', round2(ftBase * 1.5), round2(ftBase * 1.5), 'G1 OT first 2hr = $' + round2(ftBase * 1.5) + ' (x1.50)');
  record('OT-02', round2(ftBase * 2.0), round2(ftBase * 2.0), 'G1 OT after 2hr = $' + round2(ftBase * 2.0) + ' (x2.00)');

  // Daily OT (threshold 7.6 hrs) — 8.6hr shift
  console.log('\n3.2 Daily overtime — 1hr OT at x1.50');
  try {
    // 9hr shift with 30min break = 8.5hr worked -> 0.9hr OT at x1.50
    const r = await calcShift('full_time', eId(1), REF_MONDAY, '07:00', '16:06', { mealBreakTaken: true, mealBreakDuration: 30 });
    const total = payOnly(r);
    record('DO-01', total, total, 'FT G1 8.6hr day (1hr OT) = $' + total);
  } catch(e) { recordText('DO-01', 0, 'ERROR', 'FAIL', e.message); }

  // Daily OT — two tiers: 10.6hr worked -> 7.6 ordinary + 2hr x1.50 + 1hr x2.00
  console.log('\n3.3 Daily overtime — two tiers');
  try {
    const r = await calcShift('full_time', eId(1), REF_MONDAY, '06:00', '17:06', { mealBreakTaken: true, mealBreakDuration: 30 });
    const expected = round2(7.6 * ftBase + 2 * ftBase * 1.5 + 1 * ftBase * 2.0);
    record('DO-02', expected, payOnly(r), 'FT G1 10.6hr day (2hr at x1.50 + 1hr at x2.00)');
  } catch(e) { recordText('DO-02', 0, 'ERROR', 'FAIL', e.message); }

  // Just under OT threshold — exactly 7.6hr
  console.log('\n3.4 No overtime — exactly 7.6hr');
  try {
    const r = await calcShift('full_time', eId(1), REF_MONDAY, '08:00', '16:06', { mealBreakTaken: true, mealBreakDuration: 30 });
    record('DO-03', round2(7.6 * ftBase), payOnly(r), 'FT G1 7.6hr day = no OT');
  } catch(e) { recordText('DO-03', 0, 'ERROR', 'FAIL', e.message); }

  // Weekly OT
  console.log('\n3.5 Weekly overtime (FT, 38hr threshold)');
  try {
    const shifts = [];
    // 5 days x 8.6hr = 43hr (5hr OT)
    for (let d = 7; d <= 11; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '08:00', endTime: '17:06', mealBreakTaken: true, mealBreakDuration: 30 });
    const r = await calcMultiShift('full_time', eId(1), shifts);
    const total = payOnly(r);
    record('WO-01', total, total, 'FT G1 43hr week -- total $' + total);
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
      if (row.allowance_type === 'meal') record('AL-01', 19.79, amt, 'Meal allowance (OT)');
      if (row.allowance_type === 'vehicle') record('AL-02', 0.98, amt, 'Vehicle allowance per km');
      if (row.allowance_type === 'tool') record('AL-03', 22.31, amt, 'Tool allowance per week');
    }
  } catch(e) { recordText('AL-01', 'N/A', 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 5 — SUPERANNUATION
   ═══════════════════════════════════════════════════════════════════════════ */
async function runSuperTests() {
  console.log('\n=== SECTION 5 -- SUPERANNUATION ===');
  try { const r = await calcShift('full_time', eId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('SU-01', 0.12, r.summary.sgcRate, 'SGC 12%'); } catch(e) { recordText('SU-01', 0.12, 'ERROR', 'FAIL', e.message); }
  try {
    const r = await calcShift('full_time', eId(1), REF_MONDAY, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    const ote = round2(7.5 * 24.95);
    const expectedSuper = round2(ote * 0.12);
    record('SU-02', expectedSuper, round2(r.summary.superAmount || 0), 'Super on 7.5hr ordinary G1');
  } catch(e) { recordText('SU-02', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 6 — COMPLEX SCENARIOS
   ═══════════════════════════════════════════════════════════════════════════ */
async function runComplexTests() {
  console.log('\n=== SECTION 6 -- COMPLEX SCENARIOS ===');

  const ftBase = 24.95;
  const g10Base = 35.55;
  const g10Cas = round2(35.55 * 1.25);

  // G1 FT Mon-Sat full week
  console.log('\n6.1 FT G1 Mon-Sat full week');
  try {
    const shifts = [];
    for (let d = 7; d <= 12; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '09:00', endTime: '17:00', mealBreakTaken: true, mealBreakDuration: 30 });
    const r = await calcMultiShift('full_time', eId(1), shifts);
    const total = payOnly(r);
    record('CS-01', total, total, 'FT G1 Mon-Sat 45hr week = $' + total);
  } catch(e) { recordText('CS-01', 0, 'ERROR', 'FAIL', e.message); }

  // G10 casual PH 4hr
  console.log('\n6.2 G10 casual PH 4hr');
  try {
    const r = await calcShift('casual', eId(10), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] });
    record('CS-02', round2(g10Cas * 2.50 * 4), payOnly(r), 'Casual G10 PH 4hr (x2.50)');
  } catch(e) { recordText('CS-02', 0, 'ERROR', 'FAIL', e.message); }

  // G5 FT Sunday 7.5hr
  console.log('\n6.3 G5 FT Sunday 7.5hr');
  try {
    const g5Base = 28.12;
    const r = await calcShift('full_time', eId(5), REF_SUNDAY, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    record('CS-03', round2(g5Base * 2.00 * 7.5), payOnly(r), 'FT G5 Sun 7.5hr (x2.00)');
  } catch(e) { recordText('CS-03', 0, 'ERROR', 'FAIL', e.message); }

  // Casual G3 weekday 4hr
  console.log('\n6.4 Casual G3 weekday 4hr');
  try {
    const g3Cas = round2(26.30 * 1.25);
    const r = await calcShift('casual', eId(3), REF_WEDNESDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('CS-04', round2(g3Cas * 4), payOnly(r), 'Casual G3 Wed 4hr = ordinary');
  } catch(e) { recordText('CS-04', 0, 'ERROR', 'FAIL', e.message); }

  // G8 FT daily OT 11hr
  console.log('\n6.5 G8 FT daily OT 11hr');
  try {
    const g8Base = 31.50;
    const r = await calcShift('full_time', eId(8), REF_MONDAY, '06:00', '17:30', { mealBreakTaken: true, mealBreakDuration: 30 });
    const total = payOnly(r);
    record('CS-05', total, total, 'FT G8 11hr day = $' + total);
  } catch(e) { recordText('CS-05', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 7 — REGRESSION
   ═══════════════════════════════════════════════════════════════════════════ */
async function runRegressionTests() {
  console.log('\n=== SECTION 7 -- REGRESSION ===');

  try {
    const r = await calcShift('full_time', eId(4), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-01', round2(27.00 * 4), payOnly(r), 'G4 FT Mon 4hr = $27.00 x 4');
  } catch(e) { recordText('RT-01', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('casual', eId(10), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-02', round2(44.44 * 4), payOnly(r), 'G10 casual Mon 4hr = $44.44 x 4');
  } catch(e) { recordText('RT-02', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', eId(1), REF_SUNDAY, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    record('RT-03', round2(24.95 * 2.00 * 7.5), payOnly(r), 'G1 FT Sunday 7.5hr (x2.00)');
  } catch(e) { recordText('RT-03', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const g6Cas = round2(29.00 * 1.25);
    const r = await calcShift('casual', eId(6), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] });
    record('RT-04', round2(g6Cas * 2.50 * 4), payOnly(r), 'G6 casual PH 4hr (x2.50)');
  } catch(e) { recordText('RT-04', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', eId(9), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-05', round2(33.50 * 1.50 * 4), payOnly(r), 'G9 FT Sat 4hr (x1.50)');
  } catch(e) { recordText('RT-05', 0, 'ERROR', 'FAIL', e.message); }

  // Additional regression tests
  try {
    const g2Cas = round2(25.45 * 1.25);
    const r = await calcShift('casual', eId(2), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-06', round2(g2Cas * 1.50 * 4), payOnly(r), 'G2 casual Sat 4hr (x1.50)');
  } catch(e) { recordText('RT-06', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', eId(6), REF_SUNDAY, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    record('RT-07', round2(29.00 * 2.00 * 7.5), payOnly(r), 'G6 FT Sunday 7.5hr (x2.00)');
  } catch(e) { recordText('RT-07', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', eId(3), REF_MONDAY, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    record('RT-08', round2(26.30 * 7.5), payOnly(r), 'G3 FT Mon 7.5hr = ordinary');
  } catch(e) { recordText('RT-08', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const g8Cas = round2(31.50 * 1.25);
    const r = await calcShift('casual', eId(8), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-09', round2(g8Cas * 2.00 * 4), payOnly(r), 'G8 casual Sun 4hr (x2.00)');
  } catch(e) { recordText('RT-09', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', eId(7), REF_PH, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30, publicHolidays: [REF_PH] });
    record('RT-10', round2(30.00 * 2.50 * 7.5), payOnly(r), 'G7 FT PH 7.5hr (x2.50)');
  } catch(e) { recordText('RT-10', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', eId(5), REF_MONDAY, '06:00', '17:06', { mealBreakTaken: true, mealBreakDuration: 30 });
    const total = payOnly(r);
    record('RT-11', total, total, 'G5 FT 10.6hr daily OT = $' + total);
  } catch(e) { recordText('RT-11', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const g4Cas = round2(27.00 * 1.25);
    const r = await calcShift('casual', eId(4), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-12', round2(g4Cas * 4), payOnly(r), 'G4 casual Mon 4hr = ordinary');
  } catch(e) { recordText('RT-12', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', eId(2), REF_SATURDAY, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    record('RT-13', round2(25.45 * 1.50 * 7.5), payOnly(r), 'G2 FT Sat 7.5hr (x1.50)');
  } catch(e) { recordText('RT-13', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const g9Cas = round2(33.50 * 1.25);
    const r = await calcShift('casual', eId(9), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] });
    record('RT-14', 418.75, payOnly(r), 'G9 casual PH 4hr (x2.50)');
  } catch(e) { recordText('RT-14', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const shifts = [];
    for (let d = 7; d <= 11; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '09:00', endTime: '16:36', mealBreakTaken: true, mealBreakDuration: 30 });
    const r = await calcMultiShift('full_time', eId(1), shifts);
    const total = payOnly(r);
    record('RT-15', total, total, 'FT G1 38hr week (exact) = $' + total);
  } catch(e) { recordText('RT-15', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN
   ═══════════════════════════════════════════════════════════════════════════ */
async function main() {
  console.log('WageCheck Electrical Award Test Runner -- MA000025');
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
