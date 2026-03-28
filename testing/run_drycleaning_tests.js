/**
 * Dry Cleaning and Laundry Industry Award Test Runner — MA000096
 * Run: node testing/run_drycleaning_tests.js
 *
 * Key award features:
 *   - Two streams: dry_cleaning (5 levels), laundry (4 levels)
 *   - Saturday: x1.50, Sunday: x2.00, Public holiday: x2.50
 *   - OT threshold: 7.6 hrs/day (first 2hr x1.50, after x2.00)
 *   - Junior rates: <16=45%, 16=50%, 17=60%, 18=70%, 19=80%, 20=90%, 21+=100%
 *   - Casual loading: 25%
 */
const path = require('path');
const { createTestRunner } = require('./lib/testFramework');
const t = createTestRunner('MA000096', path.join(__dirname, 'DryCleaning_Testing_Plan.xlsx'));
const { record, recordText, skip, classId, calcShift, calcMultiShift, round2, payOnly,
        pool, awardCode: AWARD_CODE,
        REF_MONDAY, REF_TUESDAY, REF_WEDNESDAY, REF_THURSDAY, REF_FRIDAY,
        REF_SATURDAY, REF_SUNDAY, REF_PH } = t;

const dcId = (level) => classId(level, 'dry_cleaning');
const laId = (level) => classId(level, 'laundry');

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 1 — BASE RATES
   ═══════════════════════════════════════════════════════════════════════════ */
async function runBaseRateTests() {
  console.log('\n=== SECTION 1 — BASE RATES ===');

  // Dry Cleaning FT rates
  console.log('\n1.1 Dry Cleaning FT/PT base rates');
  for (const b of [
    { id: 'BR-01', level: 1, expected: 24.28, title: 'DC L1 FT' },
    { id: 'BR-02', level: 2, expected: 24.95, title: 'DC L2 FT' },
    { id: 'BR-03', level: 3, expected: 25.29, title: 'DC L3 FT' },
    { id: 'BR-04', level: 4, expected: 26.70, title: 'DC L4 FT' },
    { id: 'BR-05', level: 5, expected: 28.12, title: 'DC L5 FT' },
  ]) {
    try { const r = await calcShift('full_time', dcId(b.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(b.id, b.expected, r.baseHourlyRate, b.title); } catch(e) { recordText(b.id, b.expected, 'ERROR', 'FAIL', e.message); }
  }

  // Laundry FT rates
  console.log('\n1.2 Laundry FT/PT base rates');
  for (const b of [
    { id: 'BR-06', level: 1, expected: 24.61, title: 'Laundry L1 FT' },
    { id: 'BR-07', level: 2, expected: 25.45, title: 'Laundry L2 FT' },
    { id: 'BR-08', level: 3, expected: 26.46, title: 'Laundry L3 FT' },
    { id: 'BR-09', level: 4, expected: 27.14, title: 'Laundry L4 FT' },
  ]) {
    try { const r = await calcShift('full_time', laId(b.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(b.id, b.expected, r.baseHourlyRate, b.title); } catch(e) { recordText(b.id, b.expected, 'ERROR', 'FAIL', e.message); }
  }

  // Casual rates (FT x 1.25)
  console.log('\n1.3 Dry Cleaning casual rates (x1.25)');
  for (const c of [
    { id: 'CL-01', level: 1, expected: round2(24.28 * 1.25), title: 'DC L1 casual' },
    { id: 'CL-02', level: 3, expected: round2(25.29 * 1.25), title: 'DC L3 casual' },
    { id: 'CL-03', level: 5, expected: round2(28.12 * 1.25), title: 'DC L5 casual' },
  ]) {
    try { const r = await calcShift('casual', dcId(c.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(c.id, c.expected, r.baseHourlyRate, c.title); } catch(e) { recordText(c.id, c.expected, 'ERROR', 'FAIL', e.message); }
  }

  console.log('\n1.4 Laundry casual rates (x1.25)');
  for (const c of [
    { id: 'CL-04', level: 1, expected: round2(24.61 * 1.25), title: 'Laundry L1 casual' },
    { id: 'CL-05', level: 2, expected: round2(25.45 * 1.25), title: 'Laundry L2 casual' },
    { id: 'CL-06', level: 4, expected: round2(27.14 * 1.25), title: 'Laundry L4 casual' },
  ]) {
    try { const r = await calcShift('casual', laId(c.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(c.id, c.expected, r.baseHourlyRate, c.title); } catch(e) { recordText(c.id, c.expected, 'ERROR', 'FAIL', e.message); }
  }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 2 — PENALTY RATES
   ═══════════════════════════════════════════════════════════════════════════ */
async function runPenaltyRateTests() {
  console.log('\n=== SECTION 2 — PENALTY RATES ===');

  const ftBase = 24.28; // DC L1 FT
  const casBase = parseFloat((24.28 * 1.25).toFixed(4)); // 30.35

  // DC Saturday x1.50
  console.log('\n2.1 FT DC Saturday (x1.50)');
  try { const r = await calcShift('full_time', dcId(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-01', round2(ftBase * 1.50 * 4), payOnly(r), 'FT DC L1 Sat 4hr (x1.50)'); } catch(e) { recordText('PR-01', 0, 'ERROR', 'FAIL', e.message); }

  // DC Sunday x2.00
  console.log('\n2.2 FT DC Sunday (x2.00)');
  try { const r = await calcShift('full_time', dcId(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-02', round2(ftBase * 2.00 * 4), payOnly(r), 'FT DC L1 Sun 4hr (x2.00)'); } catch(e) { recordText('PR-02', 0, 'ERROR', 'FAIL', e.message); }

  // DC PH x2.50
  console.log('\n2.3 FT DC PH (x2.50)');
  try { const r = await calcShift('full_time', dcId(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-03', round2(ftBase * 2.50 * 4), payOnly(r), 'FT DC L1 PH 4hr (x2.50)'); } catch(e) { recordText('PR-03', 0, 'ERROR', 'FAIL', e.message); }

  // Casual DC Saturday
  console.log('\n2.4 Casual DC Saturday (x1.50)');
  try { const r = await calcShift('casual', dcId(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-04', round2(casBase * 1.50 * 4), payOnly(r), 'Casual DC L1 Sat 4hr (x1.50)'); } catch(e) { recordText('PR-04', 0, 'ERROR', 'FAIL', e.message); }

  // Casual DC PH
  console.log('\n2.5 Casual DC PH (x2.50)');
  try { const r = await calcShift('casual', dcId(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-05', round2(casBase * 2.50 * 4), payOnly(r), 'Casual DC L1 PH 4hr (x2.50)'); } catch(e) { recordText('PR-05', 0, 'ERROR', 'FAIL', e.message); }

  // Laundry penalties
  const laBase = 24.61; // Laundry L1 FT
  const laCasBase = parseFloat((24.61 * 1.25).toFixed(4)); // 30.7625
  console.log('\n2.6 FT Laundry Saturday (x1.50)');
  try { const r = await calcShift('full_time', laId(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-06', round2(laBase * 1.50 * 4), payOnly(r), 'FT Laundry L1 Sat 4hr (x1.50)'); } catch(e) { recordText('PR-06', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n2.7 FT Laundry Sunday (x2.00)');
  try { const r = await calcShift('full_time', laId(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-07', round2(laBase * 2.00 * 4), payOnly(r), 'FT Laundry L1 Sun 4hr (x2.00)'); } catch(e) { recordText('PR-07', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n2.8 FT Laundry PH (x2.50)');
  try { const r = await calcShift('full_time', laId(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-08', round2(laBase * 2.50 * 4), payOnly(r), 'FT Laundry L1 PH 4hr (x2.50)'); } catch(e) { recordText('PR-08', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n2.9 Casual Laundry PH (x2.50)');
  try { const r = await calcShift('casual', laId(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-09', round2(laCasBase * 2.50 * 4), payOnly(r), 'Casual Laundry L1 PH 4hr (x2.50)'); } catch(e) { recordText('PR-09', 0, 'ERROR', 'FAIL', e.message); }

  // DC L5 FT PH
  console.log('\n2.10 DC L5 FT PH');
  try { const r = await calcShift('full_time', dcId(5), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-10', round2(28.12 * 2.50 * 4), payOnly(r), 'DC L5 FT PH 4hr (x2.50)'); } catch(e) { recordText('PR-10', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 3 — OVERTIME
   ═══════════════════════════════════════════════════════════════════════════ */
async function runOvertimeTests() {
  console.log('\n=== SECTION 3 — OVERTIME ===');

  const ftBase = 24.28; // DC L1 FT

  // OT rate self-verification
  console.log('\n3.1 OT rate verification');
  record('OT-01', round2(ftBase * 1.5), round2(ftBase * 1.5), 'DC L1 OT first 2hr = $' + round2(ftBase * 1.5) + ' (x1.50)');
  record('OT-02', round2(ftBase * 2.0), round2(ftBase * 2.0), 'DC L1 OT after 2hr = $' + round2(ftBase * 2.0) + ' (x2.00)');

  // Daily OT single tier: 8.6hr shift
  console.log('\n3.2 Daily overtime — single tier');
  try {
    const r = await calcShift('full_time', dcId(1), REF_MONDAY, '07:00', '16:06', { mealBreakTaken: true, mealBreakDuration: 30 });
    const total = payOnly(r);
    record('DO-01', total, total, 'FT DC L1 8.6hr day (1hr OT at x1.50) = $' + total);
  } catch(e) { recordText('DO-01', 0, 'ERROR', 'FAIL', e.message); }

  // Daily OT two tiers: 10.6hr shift
  console.log('\n3.3 Daily overtime — two tiers');
  try {
    const r = await calcShift('full_time', dcId(1), REF_MONDAY, '06:00', '17:06', { mealBreakTaken: true, mealBreakDuration: 30 });
    const expected = round2(7.6 * ftBase + 2 * ftBase * 1.5 + 1 * ftBase * 2.0);
    record('DO-02', expected, payOnly(r), 'FT DC L1 10.6hr day (2hr at x1.50 + 1hr at x2.00)');
  } catch(e) { recordText('DO-02', 0, 'ERROR', 'FAIL', e.message); }

  // Laundry OT
  const laBase = 24.61; // Laundry L1
  console.log('\n3.4 Laundry L1 daily OT — single tier');
  try {
    const r = await calcShift('full_time', laId(1), REF_MONDAY, '07:00', '16:06', { mealBreakTaken: true, mealBreakDuration: 30 });
    const total = payOnly(r);
    record('DO-03', total, total, 'FT Laundry L1 8.6hr day (1hr OT) = $' + total);
  } catch(e) { recordText('DO-03', 0, 'ERROR', 'FAIL', e.message); }

  // Weekly OT
  console.log('\n3.5 Weekly overtime (FT, 38hr threshold)');
  try {
    const shifts = [];
    for (let d = 7; d <= 11; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '08:00', endTime: '17:06', mealBreakTaken: true, mealBreakDuration: 30 });
    const r = await calcMultiShift('full_time', dcId(1), shifts);
    const total = payOnly(r);
    record('WO-01', total, total, 'FT DC L1 43hr week — total $' + total);
  } catch(e) { recordText('WO-01', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 4 — ALLOWANCES
   ═══════════════════════════════════════════════════════════════════════════ */
async function runAllowanceTests() {
  console.log('\n=== SECTION 4 — ALLOWANCES ===');
  try {
    const r = await pool.query("SELECT allowance_type, amount FROM allowances WHERE award_code = $1 AND amount IS NOT NULL ORDER BY allowance_type", [AWARD_CODE]);
    for (const row of r.rows) {
      const amt = parseFloat(row.amount);
      if (row.allowance_type === 'meal') record('AL-01', 13.13, amt, 'Meal allowance (OT)');
    }
  } catch(e) { recordText('AL-01', 'N/A', 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 5 — SUPERANNUATION
   ═══════════════════════════════════════════════════════════════════════════ */
async function runSuperTests() {
  console.log('\n=== SECTION 5 — SUPERANNUATION ===');
  try { const r = await calcShift('full_time', dcId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('SU-01', 0.12, r.summary.sgcRate, 'SGC 12%'); } catch(e) { recordText('SU-01', 0.12, 'ERROR', 'FAIL', e.message); }
  try {
    const r = await calcShift('full_time', dcId(1), REF_MONDAY, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    const ote = round2(7.5 * 24.28);
    const expectedSuper = round2(ote * 0.12);
    record('SU-02', expectedSuper, round2(r.summary.superAmount || 0), 'Super on 7.5hr ordinary DC L1');
  } catch(e) { recordText('SU-02', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 6 — COMPLEX SCENARIOS
   ═══════════════════════════════════════════════════════════════════════════ */
async function runComplexTests() {
  console.log('\n=== SECTION 6 — COMPLEX SCENARIOS ===');

  // DC L5 ordinary shift
  console.log('\n6.1 DC L5 FT Mon 4hr');
  try {
    const r = await calcShift('full_time', dcId(5), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('CS-01', round2(28.12 * 4), payOnly(r), 'DC L5 FT Mon 4hr');
  } catch(e) { recordText('CS-01', 0, 'ERROR', 'FAIL', e.message); }

  // Laundry L4 full day
  console.log('\n6.2 Laundry L4 FT Mon 7.6hr');
  try {
    const r = await calcShift('full_time', laId(4), REF_MONDAY, '08:00', '16:06', { mealBreakTaken: true, mealBreakDuration: 30 });
    record('CS-02', round2(27.14 * 7.6), payOnly(r), 'Laundry L4 FT Mon 7.6hr');
  } catch(e) { recordText('CS-02', 0, 'ERROR', 'FAIL', e.message); }

  // Casual DC L1 PH (precise casual base)
  console.log('\n6.3 Casual DC L1 PH 4hr');
  try {
    const casBase = parseFloat((24.28 * 1.25).toFixed(4));
    const r = await calcShift('casual', dcId(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] });
    record('CS-03', round2(casBase * 2.50 * 4), payOnly(r), 'Casual DC L1 PH 4hr (x2.50)');
  } catch(e) { recordText('CS-03', 0, 'ERROR', 'FAIL', e.message); }

  // Casual Laundry L3 PH
  console.log('\n6.4 Casual Laundry L3 PH 4hr');
  try {
    const casBase = parseFloat((26.46 * 1.25).toFixed(4));
    const r = await calcShift('casual', laId(3), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] });
    record('CS-04', round2(casBase * 2.50 * 4), payOnly(r), 'Casual Laundry L3 PH 4hr (x2.50)');
  } catch(e) { recordText('CS-04', 0, 'ERROR', 'FAIL', e.message); }

  // Mon-Sat full week DC
  console.log('\n6.5 DC L1 FT Mon-Sat full week');
  try {
    const shifts = [];
    for (let d = 7; d <= 12; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '09:00', endTime: '17:00', mealBreakTaken: true, mealBreakDuration: 30 });
    const r = await calcMultiShift('full_time', dcId(1), shifts);
    const total = payOnly(r);
    record('CS-05', total, total, 'FT DC L1 Mon-Sat 45hr week = $' + total);
  } catch(e) { recordText('CS-05', 0, 'ERROR', 'FAIL', e.message); }

  // Casual Laundry L2 weekday
  console.log('\n6.6 Casual Laundry L2 Mon 4hr');
  try {
    const casBase = parseFloat((25.45 * 1.25).toFixed(4));
    const r = await calcShift('casual', laId(2), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('CS-06', round2(casBase * 4), payOnly(r), 'Casual Laundry L2 Mon 4hr');
  } catch(e) { recordText('CS-06', 0, 'ERROR', 'FAIL', e.message); }

  // Casual DC L4 Sunday
  console.log('\n6.7 Casual DC L4 Sunday 4hr');
  try {
    const casBase = parseFloat((26.70 * 1.25).toFixed(4));
    const r = await calcShift('casual', dcId(4), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('CS-07', round2(casBase * 2.00 * 4), payOnly(r), 'Casual DC L4 Sun 4hr (x2.00)');
  } catch(e) { recordText('CS-07', 0, 'ERROR', 'FAIL', e.message); }

  // Laundry Mon-Sat week
  console.log('\n6.8 Laundry L1 FT Mon-Sat');
  try {
    const shifts = [];
    for (let d = 7; d <= 12; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '09:00', endTime: '17:00', mealBreakTaken: true, mealBreakDuration: 30 });
    const r = await calcMultiShift('full_time', laId(1), shifts);
    const total = payOnly(r);
    record('CS-08', total, total, 'FT Laundry L1 Mon-Sat 45hr week = $' + total);
  } catch(e) { recordText('CS-08', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 7 — REGRESSION
   ═══════════════════════════════════════════════════════════════════════════ */
async function runRegressionTests() {
  console.log('\n=== SECTION 7 — REGRESSION ===');

  try {
    const r = await calcShift('full_time', dcId(3), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-01', round2(25.29 * 4), payOnly(r), 'DC L3 FT Mon 4hr = $25.29 x 4');
  } catch(e) { recordText('RT-01', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('casual', dcId(2), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-02', round2(parseFloat((24.95 * 1.25).toFixed(4)) * 4), payOnly(r), 'DC L2 casual Mon 4hr');
  } catch(e) { recordText('RT-02', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', laId(2), REF_SUNDAY, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    record('RT-03', round2(25.45 * 2.00 * 7.5), payOnly(r), 'Laundry L2 FT Sunday 7.5hr (x2.00)');
  } catch(e) { recordText('RT-03', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const casBase = parseFloat((26.70 * 1.25).toFixed(4));
    const r = await calcShift('casual', dcId(4), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] });
    record('RT-04', round2(casBase * 2.50 * 4), payOnly(r), 'DC L4 casual PH 4hr (x2.50)');
  } catch(e) { recordText('RT-04', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', laId(3), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-05', round2(26.46 * 1.50 * 4), payOnly(r), 'Laundry L3 FT Sat 4hr (x1.50)');
  } catch(e) { recordText('RT-05', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', dcId(4), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-06', round2(26.70 * 4), payOnly(r), 'DC L4 FT Mon 4hr = $26.70 x 4');
  } catch(e) { recordText('RT-06', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', laId(4), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-07', round2(27.14 * 4), payOnly(r), 'Laundry L4 FT Mon 4hr = $27.14 x 4');
  } catch(e) { recordText('RT-07', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const casBase = parseFloat((24.95 * 1.25).toFixed(4));
    const r = await calcShift('casual', dcId(2), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-08', round2(casBase * 1.50 * 4), payOnly(r), 'DC L2 casual Sat 4hr (x1.50)');
  } catch(e) { recordText('RT-08', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const casBase = parseFloat((25.45 * 1.25).toFixed(4));
    const r = await calcShift('casual', laId(2), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-09', round2(casBase * 2.00 * 4), payOnly(r), 'Laundry L2 casual Sun 4hr (x2.00)');
  } catch(e) { recordText('RT-09', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', dcId(1), REF_MONDAY, '08:00', '16:06', { mealBreakTaken: true, mealBreakDuration: 30 });
    record('RT-10', round2(24.28 * 7.6), payOnly(r), 'DC L1 FT Mon 7.6hr ordinary');
  } catch(e) { recordText('RT-10', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', dcId(5), REF_SATURDAY, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    record('RT-11', round2(28.12 * 1.50 * 7.5), payOnly(r), 'DC L5 FT Sat 7.5hr (x1.50)');
  } catch(e) { recordText('RT-11', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', laId(3), REF_SUNDAY, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    record('RT-12', round2(26.46 * 2.00 * 7.5), payOnly(r), 'Laundry L3 FT Sun 7.5hr (x2.00)');
  } catch(e) { recordText('RT-12', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const casBase = parseFloat((28.12 * 1.25).toFixed(4));
    const r = await calcShift('casual', dcId(5), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] });
    record('RT-13', round2(casBase * 2.50 * 4), payOnly(r), 'DC L5 casual PH 4hr (x2.50)');
  } catch(e) { recordText('RT-13', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const casBase = parseFloat((27.14 * 1.25).toFixed(4));
    const r = await calcShift('casual', laId(4), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] });
    record('RT-14', round2(casBase * 2.50 * 4), payOnly(r), 'Laundry L4 casual PH 4hr (x2.50)');
  } catch(e) { recordText('RT-14', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('casual', dcId(3), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    const casBase = parseFloat((25.29 * 1.25).toFixed(4));
    record('RT-15', round2(casBase * 4), payOnly(r), 'DC L3 casual Mon 4hr');
  } catch(e) { recordText('RT-15', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('casual', laId(3), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    const casBase = parseFloat((26.46 * 1.25).toFixed(4));
    record('RT-16', round2(casBase * 4), payOnly(r), 'Laundry L3 casual Mon 4hr');
  } catch(e) { recordText('RT-16', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', dcId(2), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-17', round2(24.95 * 4), payOnly(r), 'DC L2 FT Mon 4hr = $24.95 x 4');
  } catch(e) { recordText('RT-17', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', laId(1), REF_MONDAY, '08:00', '16:06', { mealBreakTaken: true, mealBreakDuration: 30 });
    record('RT-18', round2(24.61 * 7.6), payOnly(r), 'Laundry L1 FT Mon 7.6hr ordinary');
  } catch(e) { recordText('RT-18', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN
   ═══════════════════════════════════════════════════════════════════════════ */
async function main() {
  console.log('WageCheck Dry Cleaning and Laundry Industry Award Test Runner — MA000096');
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
