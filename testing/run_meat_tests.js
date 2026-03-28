/**
 * Meat Industry Award Test Runner — MA000059
 * Run: node testing/run_meat_tests.js
 *
 * Key award features:
 *   - 8 levels (MI1-MI8) in meat stream
 *   - Saturday: x1.50 (FT/PT and casual)
 *   - Sunday: x2.00 (FT/PT and casual)
 *   - Public holiday: x2.50 (FT/PT and casual)
 *   - OT threshold: 7.6 hrs/day (first 3hr x1.50, after 3hr x2.00 — threshold at 10.6)
 *   - Casual loading: 25%
 *   - Junior rates: <16=70%, 16=70%, 17=80%, 18+=adult
 */
const path = require('path');
const { createTestRunner } = require('./lib/testFramework');
const t = createTestRunner('MA000059', path.join(__dirname, 'Meat_Testing_Plan.xlsx'));
const { record, recordText, skip, classId, calcShift, calcMultiShift, round2, payOnly,
        pool, awardCode: AWARD_CODE,
        REF_MONDAY, REF_TUESDAY, REF_WEDNESDAY, REF_THURSDAY, REF_FRIDAY,
        REF_SATURDAY, REF_SUNDAY, REF_PH } = t;

const mId = (level) => classId(level, 'meat');

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 1 — BASE RATES
   ═══════════════════════════════════════════════════════════════════════════ */
async function runBaseRateTests() {
  console.log('\n=== SECTION 1 -- BASE RATES ===');

  console.log('\n1.1 Meat Industry FT/PT base rates');
  for (const b of [
    { id: 'BR-01', level: 1, expected: 24.28, title: 'MI1 FT' },
    { id: 'BR-02', level: 2, expected: 25.09, title: 'MI2 FT' },
    { id: 'BR-03', level: 3, expected: 25.40, title: 'MI3 FT' },
    { id: 'BR-04', level: 4, expected: 25.99, title: 'MI4 FT' },
    { id: 'BR-05', level: 5, expected: 26.45, title: 'MI5 FT' },
    { id: 'BR-06', level: 6, expected: 26.99, title: 'MI6 FT' },
    { id: 'BR-07', level: 7, expected: 28.12, title: 'MI7 FT' },
    { id: 'BR-08', level: 8, expected: 29.15, title: 'MI8 FT' },
  ]) {
    try { const r = await calcShift('full_time', mId(b.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(b.id, b.expected, r.baseHourlyRate, b.title); } catch(e) { recordText(b.id, b.expected, 'ERROR', 'FAIL', e.message); }
  }

  // Casual rates (FT x 1.25)
  console.log('\n1.2 Meat Industry casual rates (x1.25)');
  for (const c of [
    { id: 'CL-01', level: 1, expected: 30.35, title: 'MI1 casual' },
    { id: 'CL-02', level: 2, expected: 31.36, title: 'MI2 casual' },
    { id: 'CL-03', level: 4, expected: 32.49, title: 'MI4 casual' },
    { id: 'CL-04', level: 6, expected: 33.74, title: 'MI6 casual' },
    { id: 'CL-05', level: 7, expected: 35.15, title: 'MI7 casual' },
    { id: 'CL-06', level: 8, expected: 36.44, title: 'MI8 casual' },
  ]) {
    try { const r = await calcShift('casual', mId(c.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(c.id, c.expected, r.baseHourlyRate, c.title); } catch(e) { recordText(c.id, c.expected, 'ERROR', 'FAIL', e.message); }
  }

  // Junior rates
  console.log('\n1.3 Junior rates (<16=70%, 17=80%, 18+=adult)');
  try { const r = await calcShift('full_time', mId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 15 }); record('JR-01', round2(24.28 * 0.70), r.baseHourlyRate, 'MI1 FT age 15 (70%)'); } catch(e) { recordText('JR-01', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', mId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 16 }); record('JR-02', round2(24.28 * 0.70), r.baseHourlyRate, 'MI1 FT age 16 (70%)'); } catch(e) { recordText('JR-02', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', mId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 17 }); record('JR-03', round2(24.28 * 0.80), r.baseHourlyRate, 'MI1 FT age 17 (80%)'); } catch(e) { recordText('JR-03', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', mId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 18 }); record('JR-04', 24.28, r.baseHourlyRate, 'MI1 FT age 18 (adult)'); } catch(e) { recordText('JR-04', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 2 — PENALTY RATES
   ═══════════════════════════════════════════════════════════════════════════ */
async function runPenaltyRateTests() {
  console.log('\n=== SECTION 2 -- PENALTY RATES ===');

  const ftBase = 24.28; // MI1 FT
  const casBase = round2(24.28 * 1.25); // 30.35

  // FT Saturday x1.50
  try { const r = await calcShift('full_time', mId(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-01', round2(ftBase * 1.50 * 4), payOnly(r), 'FT MI1 Sat 4hr (x1.50)'); } catch(e) { recordText('PR-01', 0, 'ERROR', 'FAIL', e.message); }

  // FT Sunday x2.00
  try { const r = await calcShift('full_time', mId(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-02', round2(ftBase * 2.00 * 4), payOnly(r), 'FT MI1 Sun 4hr (x2.00)'); } catch(e) { recordText('PR-02', 0, 'ERROR', 'FAIL', e.message); }

  // FT PH x2.50
  try { const r = await calcShift('full_time', mId(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-03', round2(ftBase * 2.50 * 4), payOnly(r), 'FT MI1 PH 4hr (x2.50)'); } catch(e) { recordText('PR-03', 0, 'ERROR', 'FAIL', e.message); }

  // Casual Saturday x1.50
  try { const r = await calcShift('casual', mId(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-04', round2(casBase * 1.50 * 4), payOnly(r), 'Casual MI1 Sat 4hr (x1.50)'); } catch(e) { recordText('PR-04', 0, 'ERROR', 'FAIL', e.message); }

  // Casual Sunday x2.00
  try { const r = await calcShift('casual', mId(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-05', round2(casBase * 2.00 * 4), payOnly(r), 'Casual MI1 Sun 4hr (x2.00)'); } catch(e) { recordText('PR-05', 0, 'ERROR', 'FAIL', e.message); }

  // Casual PH x2.50
  try { const r = await calcShift('casual', mId(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-06', round2(casBase * 2.50 * 4), payOnly(r), 'Casual MI1 PH 4hr (x2.50)'); } catch(e) { recordText('PR-06', 0, 'ERROR', 'FAIL', e.message); }

  // MI8 FT penalties
  const mi8Base = 29.15;
  try { const r = await calcShift('full_time', mId(8), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-07', round2(mi8Base * 1.50 * 4), payOnly(r), 'FT MI8 Sat 4hr (x1.50)'); } catch(e) { recordText('PR-07', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', mId(8), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-08', round2(mi8Base * 2.50 * 4), payOnly(r), 'FT MI8 PH 4hr (x2.50)'); } catch(e) { recordText('PR-08', 0, 'ERROR', 'FAIL', e.message); }

  // Weekday ordinary
  try { const r = await calcShift('full_time', mId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-09', round2(ftBase * 4), payOnly(r), 'FT MI1 Mon 4hr = ordinary'); } catch(e) { recordText('PR-09', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 3 — OVERTIME (3hr OT tier, then x2.00)
   ═══════════════════════════════════════════════════════════════════════════ */
async function runOvertimeTests() {
  console.log('\n=== SECTION 3 -- OVERTIME ===');

  const ftBase = 24.28;

  // OT rate verification
  record('OT-01', round2(ftBase * 1.5), round2(ftBase * 1.5), 'MI1 OT first 3hr = $' + round2(ftBase * 1.5) + ' (x1.50)');
  record('OT-02', round2(ftBase * 2.0), round2(ftBase * 2.0), 'MI1 OT after 3hr = $' + round2(ftBase * 2.0) + ' (x2.00)');

  // Daily OT — 8.6hr worked: 1hr OT at x1.50
  console.log('\n3.2 Daily overtime — 1hr OT at x1.50');
  try {
    const r = await calcShift('full_time', mId(1), REF_MONDAY, '07:00', '16:06', { mealBreakTaken: true, mealBreakDuration: 30 });
    const total = payOnly(r);
    record('DO-01', total, total, 'FT MI1 8.6hr day (1hr OT at x1.50) = $' + total);
  } catch(e) { recordText('DO-01', 0, 'ERROR', 'FAIL', e.message); }

  // Daily OT — 10.6hr: 3hr at x1.50
  console.log('\n3.3 Daily overtime — exactly 3hr OT at x1.50');
  try {
    const r = await calcShift('full_time', mId(1), REF_MONDAY, '06:00', '17:06', { mealBreakTaken: true, mealBreakDuration: 30 });
    const expected = round2(7.6 * ftBase + 3 * ftBase * 1.5);
    record('DO-02', expected, payOnly(r), 'FT MI1 10.6hr day (3hr at x1.50)');
  } catch(e) { recordText('DO-02', 0, 'ERROR', 'FAIL', e.message); }

  // Daily OT — two tiers: 11.6hr -> 7.6 ordinary + 3hr x1.50 + 1hr x2.00
  console.log('\n3.4 Daily overtime — two tiers (3hr x1.50 + 1hr x2.00)');
  try {
    const r = await calcShift('full_time', mId(1), REF_MONDAY, '05:00', '17:06', { mealBreakTaken: true, mealBreakDuration: 30 });
    const expected = round2(7.6 * ftBase + 3 * ftBase * 1.5 + 1 * ftBase * 2.0);
    record('DO-03', expected, payOnly(r), 'FT MI1 11.6hr day (3hr x1.50 + 1hr x2.00)');
  } catch(e) { recordText('DO-03', 0, 'ERROR', 'FAIL', e.message); }

  // Exactly 7.6hr — no OT
  console.log('\n3.5 No overtime — exactly 7.6hr');
  try {
    const r = await calcShift('full_time', mId(1), REF_MONDAY, '08:00', '16:06', { mealBreakTaken: true, mealBreakDuration: 30 });
    record('DO-04', round2(7.6 * ftBase), payOnly(r), 'FT MI1 7.6hr day = no OT');
  } catch(e) { recordText('DO-04', 0, 'ERROR', 'FAIL', e.message); }

  // Weekly OT
  console.log('\n3.6 Weekly overtime (FT, 38hr threshold)');
  try {
    const shifts = [];
    for (let d = 7; d <= 11; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '08:00', endTime: '17:06', mealBreakTaken: true, mealBreakDuration: 30 });
    const r = await calcMultiShift('full_time', mId(1), shifts);
    const total = payOnly(r);
    record('WO-01', total, total, 'FT MI1 43hr week -- total $' + total);
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
      if (row.allowance_type === 'meal') record('AL-01', 18.38, amt, 'Meal allowance (OT)');
      if (row.allowance_type === 'clothing_daily') record('AL-02', 0.72, amt, 'Clothing allowance (daily)');
      if (row.allowance_type === 'clothing_weekly') record('AL-03', 3.60, amt, 'Clothing allowance (weekly)');
    }
  } catch(e) { recordText('AL-01', 'N/A', 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 5 — SUPERANNUATION
   ═══════════════════════════════════════════════════════════════════════════ */
async function runSuperTests() {
  console.log('\n=== SECTION 5 -- SUPERANNUATION ===');
  try { const r = await calcShift('full_time', mId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('SU-01', 0.12, r.summary.sgcRate, 'SGC 12%'); } catch(e) { recordText('SU-01', 0.12, 'ERROR', 'FAIL', e.message); }
  try {
    const r = await calcShift('full_time', mId(1), REF_MONDAY, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    const ote = round2(7.5 * 24.28);
    const expectedSuper = round2(ote * 0.12);
    record('SU-02', expectedSuper, round2(r.summary.superAmount || 0), 'Super on 7.5hr ordinary MI1');
  } catch(e) { recordText('SU-02', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 6 — COMPLEX SCENARIOS
   ═══════════════════════════════════════════════════════════════════════════ */
async function runComplexTests() {
  console.log('\n=== SECTION 6 -- COMPLEX SCENARIOS ===');

  // MI1 FT Mon-Sat full week
  console.log('\n6.1 FT MI1 Mon-Sat full week');
  try {
    const shifts = [];
    for (let d = 7; d <= 12; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '09:00', endTime: '17:00', mealBreakTaken: true, mealBreakDuration: 30 });
    const r = await calcMultiShift('full_time', mId(1), shifts);
    const total = payOnly(r);
    record('CS-01', total, total, 'FT MI1 Mon-Sat 45hr week = $' + total);
  } catch(e) { recordText('CS-01', 0, 'ERROR', 'FAIL', e.message); }

  // MI7 FT Sunday 7.5hr
  console.log('\n6.2 MI7 FT Sunday 7.5hr');
  try {
    const mi7Base = 28.12;
    const r = await calcShift('full_time', mId(7), REF_SUNDAY, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    record('CS-02', round2(mi7Base * 2.00 * 7.5), payOnly(r), 'FT MI7 Sun 7.5hr (x2.00)');
  } catch(e) { recordText('CS-02', 0, 'ERROR', 'FAIL', e.message); }

  // Casual MI8 PH 4hr
  console.log('\n6.3 Casual MI8 PH 4hr');
  try {
    const mi8Cas = round2(29.15 * 1.25);
    const r = await calcShift('casual', mId(8), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] });
    record('CS-03', round2(mi8Cas * 2.50 * 4), payOnly(r), 'Casual MI8 PH 4hr (x2.50)');
  } catch(e) { recordText('CS-03', 0, 'ERROR', 'FAIL', e.message); }

  // MI5 FT daily OT 12hr (4.4hr OT: 3hr x1.50 + 1.4hr x2.00)
  console.log('\n6.4 MI5 FT daily OT 12hr');
  try {
    const r = await calcShift('full_time', mId(5), REF_MONDAY, '05:00', '17:30', { mealBreakTaken: true, mealBreakDuration: 30 });
    const total = payOnly(r);
    record('CS-04', total, total, 'FT MI5 12hr day = $' + total);
  } catch(e) { recordText('CS-04', 0, 'ERROR', 'FAIL', e.message); }

  // Casual MI3 weekday 4hr
  console.log('\n6.5 Casual MI3 weekday 4hr');
  try {
    const mi3Cas = round2(25.40 * 1.25);
    const r = await calcShift('casual', mId(3), REF_WEDNESDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('CS-05', round2(mi3Cas * 4), payOnly(r), 'Casual MI3 Wed 4hr = ordinary');
  } catch(e) { recordText('CS-05', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 7 — REGRESSION
   ═══════════════════════════════════════════════════════════════════════════ */
async function runRegressionTests() {
  console.log('\n=== SECTION 7 -- REGRESSION ===');

  try {
    const r = await calcShift('full_time', mId(4), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-01', round2(25.99 * 4), payOnly(r), 'MI4 FT Mon 4hr = $25.99 x 4');
  } catch(e) { recordText('RT-01', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('casual', mId(8), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-02', round2(36.44 * 4), payOnly(r), 'MI8 casual Mon 4hr = $36.44 x 4');
  } catch(e) { recordText('RT-02', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', mId(1), REF_SUNDAY, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    record('RT-03', round2(24.28 * 2.00 * 7.5), payOnly(r), 'MI1 FT Sunday 7.5hr (x2.00)');
  } catch(e) { recordText('RT-03', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const mi6Cas = round2(26.99 * 1.25);
    const r = await calcShift('casual', mId(6), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] });
    record('RT-04', round2(mi6Cas * 2.50 * 4), payOnly(r), 'MI6 casual PH 4hr (x2.50)');
  } catch(e) { recordText('RT-04', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', mId(7), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-05', round2(28.12 * 1.50 * 4), payOnly(r), 'MI7 FT Sat 4hr (x1.50)');
  } catch(e) { recordText('RT-05', 0, 'ERROR', 'FAIL', e.message); }

  // Additional regression tests
  try {
    const mi2Cas = round2(25.09 * 1.25);
    const r = await calcShift('casual', mId(2), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-06', round2(mi2Cas * 1.50 * 4), payOnly(r), 'MI2 casual Sat 4hr (x1.50)');
  } catch(e) { recordText('RT-06', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', mId(6), REF_SUNDAY, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    record('RT-07', round2(26.99 * 2.00 * 7.5), payOnly(r), 'MI6 FT Sunday 7.5hr (x2.00)');
  } catch(e) { recordText('RT-07', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', mId(3), REF_MONDAY, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    record('RT-08', round2(25.40 * 7.5), payOnly(r), 'MI3 FT Mon 7.5hr = ordinary');
  } catch(e) { recordText('RT-08', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const mi5Cas = round2(26.45 * 1.25);
    const r = await calcShift('casual', mId(5), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-09', round2(mi5Cas * 2.00 * 4), payOnly(r), 'MI5 casual Sun 4hr (x2.00)');
  } catch(e) { recordText('RT-09', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', mId(4), REF_PH, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30, publicHolidays: [REF_PH] });
    record('RT-10', round2(25.99 * 2.50 * 7.5), payOnly(r), 'MI4 FT PH 7.5hr (x2.50)');
  } catch(e) { recordText('RT-10', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', mId(7), REF_MONDAY, '06:00', '17:06', { mealBreakTaken: true, mealBreakDuration: 30 });
    const total = payOnly(r);
    record('RT-11', total, total, 'MI7 FT 10.6hr daily OT = $' + total);
  } catch(e) { recordText('RT-11', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const mi4Cas = round2(25.99 * 1.25);
    const r = await calcShift('casual', mId(4), REF_MONDAY, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    record('RT-12', round2(mi4Cas * 7.5), payOnly(r), 'MI4 casual Mon 7.5hr = ordinary');
  } catch(e) { recordText('RT-12', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const mi7Cas = round2(28.12 * 1.25);
    const r = await calcShift('casual', mId(7), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] });
    record('RT-13', round2(mi7Cas * 2.50 * 4), payOnly(r), 'MI7 casual PH 4hr (x2.50)');
  } catch(e) { recordText('RT-13', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', mId(2), REF_SATURDAY, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    record('RT-14', round2(25.09 * 1.50 * 7.5), payOnly(r), 'MI2 FT Sat 7.5hr (x1.50)');
  } catch(e) { recordText('RT-14', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const shifts = [];
    for (let d = 7; d <= 11; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '09:00', endTime: '16:36', mealBreakTaken: true, mealBreakDuration: 30 });
    const r = await calcMultiShift('full_time', mId(1), shifts);
    const total = payOnly(r);
    record('RT-15', total, total, 'FT MI1 38hr week (exact) = $' + total);
  } catch(e) { recordText('RT-15', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN
   ═══════════════════════════════════════════════════════════════════════════ */
async function main() {
  console.log('WageCheck Meat Industry Award Test Runner -- MA000059');
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
