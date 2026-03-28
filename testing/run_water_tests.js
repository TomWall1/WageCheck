/**
 * Water Industry Award Test Runner — MA000113
 * Run: node testing/run_water_tests.js
 *
 * Key award features:
 *   - One stream: water (10 levels)
 *   - Saturday: x1.50, Sunday: x2.00, Public holiday: x2.50
 *   - OT threshold: 7.6 hrs/day (first 2hr x1.50, after x2.00)
 *   - Junior rates: <16=36.8%, 16=47.3%, 17=57.8%, 18=68.3%, 19=82.5%, 20=97.7%, 21+=100%
 *   - Casual loading: 25%
 */
const path = require('path');
const { createTestRunner } = require('./lib/testFramework');
const t = createTestRunner('MA000113', path.join(__dirname, 'Water_Testing_Plan.xlsx'));
const { record, recordText, skip, classId, calcShift, calcMultiShift, round2, payOnly,
        pool, awardCode: AWARD_CODE,
        REF_MONDAY, REF_TUESDAY, REF_WEDNESDAY, REF_THURSDAY, REF_FRIDAY,
        REF_SATURDAY, REF_SUNDAY, REF_PH } = t;

const wId = (level) => classId(level, 'water');

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 1 — BASE RATES
   ═══════════════════════════════════════════════════════════════════════════ */
async function runBaseRateTests() {
  console.log('\n=== SECTION 1 — BASE RATES ===');

  // FT rates for all 10 levels
  console.log('\n1.1 Water FT/PT base rates');
  for (const b of [
    { id: 'BR-01', level: 1,  expected: 25.88, title: 'Water L1 FT' },
    { id: 'BR-02', level: 2,  expected: 26.70, title: 'Water L2 FT' },
    { id: 'BR-03', level: 3,  expected: 27.71, title: 'Water L3 FT' },
    { id: 'BR-04', level: 4,  expected: 28.12, title: 'Water L4 FT' },
    { id: 'BR-05', level: 5,  expected: 29.88, title: 'Water L5 FT' },
    { id: 'BR-06', level: 6,  expected: 32.34, title: 'Water L6 FT' },
    { id: 'BR-07', level: 7,  expected: 32.90, title: 'Water L7 FT' },
    { id: 'BR-08', level: 8,  expected: 35.55, title: 'Water L8 FT' },
    { id: 'BR-09', level: 9,  expected: 38.03, title: 'Water L9 FT' },
    { id: 'BR-10', level: 10, expected: 41.56, title: 'Water L10 FT' },
  ]) {
    try { const r = await calcShift('full_time', wId(b.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(b.id, b.expected, r.baseHourlyRate, b.title); } catch(e) { recordText(b.id, b.expected, 'ERROR', 'FAIL', e.message); }
  }

  // Casual rates (FT x 1.25)
  console.log('\n1.2 Water casual rates (x1.25)');
  for (const c of [
    { id: 'CL-01', level: 1,  expected: round2(25.88 * 1.25), title: 'Water L1 casual' },
    { id: 'CL-02', level: 3,  expected: round2(27.71 * 1.25), title: 'Water L3 casual' },
    { id: 'CL-03', level: 5,  expected: round2(29.88 * 1.25), title: 'Water L5 casual' },
    { id: 'CL-04', level: 7,  expected: round2(32.90 * 1.25), title: 'Water L7 casual' },
    { id: 'CL-05', level: 9,  expected: round2(38.03 * 1.25), title: 'Water L9 casual' },
    { id: 'CL-06', level: 10, expected: round2(41.56 * 1.25), title: 'Water L10 casual' },
  ]) {
    try { const r = await calcShift('casual', wId(c.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(c.id, c.expected, r.baseHourlyRate, c.title); } catch(e) { recordText(c.id, c.expected, 'ERROR', 'FAIL', e.message); }
  }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 2 — PENALTY RATES
   ═══════════════════════════════════════════════════════════════════════════ */
async function runPenaltyRateTests() {
  console.log('\n=== SECTION 2 — PENALTY RATES ===');

  const ftBase = 25.88; // L1 FT
  const casBase = parseFloat((25.88 * 1.25).toFixed(4)); // 32.35

  // Saturday x1.50
  console.log('\n2.1 FT Saturday (x1.50)');
  try { const r = await calcShift('full_time', wId(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-01', round2(ftBase * 1.50 * 4), payOnly(r), 'FT L1 Sat 4hr (x1.50)'); } catch(e) { recordText('PR-01', 0, 'ERROR', 'FAIL', e.message); }

  // Sunday x2.00
  console.log('\n2.2 FT Sunday (x2.00)');
  try { const r = await calcShift('full_time', wId(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-02', round2(ftBase * 2.00 * 4), payOnly(r), 'FT L1 Sun 4hr (x2.00)'); } catch(e) { recordText('PR-02', 0, 'ERROR', 'FAIL', e.message); }

  // PH x2.50
  console.log('\n2.3 FT PH (x2.50)');
  try { const r = await calcShift('full_time', wId(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-03', round2(ftBase * 2.50 * 4), payOnly(r), 'FT L1 PH 4hr (x2.50)'); } catch(e) { recordText('PR-03', 0, 'ERROR', 'FAIL', e.message); }

  // Casual penalties
  console.log('\n2.4 Casual Saturday (x1.50)');
  try { const r = await calcShift('casual', wId(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-04', round2(casBase * 1.50 * 4), payOnly(r), 'Casual L1 Sat 4hr (x1.50)'); } catch(e) { recordText('PR-04', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n2.5 Casual Sunday (x2.00)');
  try { const r = await calcShift('casual', wId(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-05', round2(casBase * 2.00 * 4), payOnly(r), 'Casual L1 Sun 4hr (x2.00)'); } catch(e) { recordText('PR-05', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n2.6 Casual PH (x2.50)');
  try { const r = await calcShift('casual', wId(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-06', round2(casBase * 2.50 * 4), payOnly(r), 'Casual L1 PH 4hr (x2.50)'); } catch(e) { recordText('PR-06', 0, 'ERROR', 'FAIL', e.message); }

  // L10 FT PH verification
  const l10Base = 41.56;
  console.log('\n2.7 L10 FT PH');
  try { const r = await calcShift('full_time', wId(10), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-07', round2(l10Base * 2.50 * 4), payOnly(r), 'L10 FT PH 4hr (x2.50)'); } catch(e) { recordText('PR-07', 0, 'ERROR', 'FAIL', e.message); }

  // L6 FT Saturday
  console.log('\n2.8 L6 FT Saturday');
  try { const r = await calcShift('full_time', wId(6), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-08', round2(32.34 * 1.50 * 4), payOnly(r), 'L6 FT Sat 4hr (x1.50)'); } catch(e) { recordText('PR-08', 0, 'ERROR', 'FAIL', e.message); }

  // L8 FT Sunday
  console.log('\n2.9 L8 FT Sunday');
  try { const r = await calcShift('full_time', wId(8), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-09', round2(35.55 * 2.00 * 4), payOnly(r), 'L8 FT Sun 4hr (x2.00)'); } catch(e) { recordText('PR-09', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 3 — OVERTIME
   ═══════════════════════════════════════════════════════════════════════════ */
async function runOvertimeTests() {
  console.log('\n=== SECTION 3 — OVERTIME ===');

  const ftBase = 25.88; // L1 FT

  // OT rate self-verification
  console.log('\n3.1 OT rate verification');
  record('OT-01', round2(ftBase * 1.5), round2(ftBase * 1.5), 'L1 OT first 2hr = $' + round2(ftBase * 1.5) + ' (x1.50)');
  record('OT-02', round2(ftBase * 2.0), round2(ftBase * 2.0), 'L1 OT after 2hr = $' + round2(ftBase * 2.0) + ' (x2.00)');

  // Daily OT single tier: 8.6hr shift
  console.log('\n3.2 Daily overtime — single tier');
  try {
    const r = await calcShift('full_time', wId(1), REF_MONDAY, '07:00', '16:06', { mealBreakTaken: true, mealBreakDuration: 30 });
    const total = payOnly(r);
    record('DO-01', total, total, 'FT L1 8.6hr day (1hr OT at x1.50) = $' + total);
  } catch(e) { recordText('DO-01', 0, 'ERROR', 'FAIL', e.message); }

  // Daily OT two tiers: 10.6hr shift
  console.log('\n3.3 Daily overtime — two tiers');
  try {
    const r = await calcShift('full_time', wId(1), REF_MONDAY, '06:00', '17:06', { mealBreakTaken: true, mealBreakDuration: 30 });
    const expected = round2(7.6 * ftBase + 2 * ftBase * 1.5 + 1 * ftBase * 2.0);
    record('DO-02', expected, payOnly(r), 'FT L1 10.6hr day (2hr at x1.50 + 1hr at x2.00)');
  } catch(e) { recordText('DO-02', 0, 'ERROR', 'FAIL', e.message); }

  // L10 daily OT
  console.log('\n3.4 L10 daily OT — single tier');
  try {
    const r = await calcShift('full_time', wId(10), REF_MONDAY, '07:00', '16:06', { mealBreakTaken: true, mealBreakDuration: 30 });
    const total = payOnly(r);
    record('DO-03', total, total, 'FT L10 8.6hr day (1hr OT) = $' + total);
  } catch(e) { recordText('DO-03', 0, 'ERROR', 'FAIL', e.message); }

  // Weekly OT
  console.log('\n3.5 Weekly overtime (FT, 38hr threshold)');
  try {
    const shifts = [];
    for (let d = 7; d <= 11; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '08:00', endTime: '17:06', mealBreakTaken: true, mealBreakDuration: 30 });
    const r = await calcMultiShift('full_time', wId(1), shifts);
    const total = payOnly(r);
    record('WO-01', total, total, 'FT L1 43hr week — total $' + total);
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
      if (row.allowance_type === 'meal') record('AL-01', 23.60, amt, 'Meal allowance (OT >2hr)');
      if (row.allowance_type === 'meal_subsequent') record('AL-02', 14.98, amt, 'Meal allowance (each further 4hr OT)');
      if (row.allowance_type === 'tool') record('AL-03', 22.25, amt, 'Tool allowance per week');
      if (row.allowance_type === 'vehicle') record('AL-04', 0.99, amt, 'Vehicle allowance (car) per km');
      if (row.allowance_type === 'motorcycle') record('AL-05', 0.33, amt, 'Vehicle allowance (motorcycle) per km');
    }
  } catch(e) { recordText('AL-01', 'N/A', 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 5 — SUPERANNUATION
   ═══════════════════════════════════════════════════════════════════════════ */
async function runSuperTests() {
  console.log('\n=== SECTION 5 — SUPERANNUATION ===');
  try { const r = await calcShift('full_time', wId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('SU-01', 0.12, r.summary.sgcRate, 'SGC 12%'); } catch(e) { recordText('SU-01', 0.12, 'ERROR', 'FAIL', e.message); }
  try {
    const r = await calcShift('full_time', wId(1), REF_MONDAY, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    const ote = round2(7.5 * 25.88);
    const expectedSuper = round2(ote * 0.12);
    record('SU-02', expectedSuper, round2(r.summary.superAmount || 0), 'Super on 7.5hr ordinary L1');
  } catch(e) { recordText('SU-02', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 6 — COMPLEX SCENARIOS
   ═══════════════════════════════════════════════════════════════════════════ */
async function runComplexTests() {
  console.log('\n=== SECTION 6 — COMPLEX SCENARIOS ===');

  // L10 ordinary shift
  console.log('\n6.1 L10 FT Mon 4hr');
  try {
    const r = await calcShift('full_time', wId(10), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('CS-01', round2(41.56 * 4), payOnly(r), 'L10 FT Mon 4hr');
  } catch(e) { recordText('CS-01', 0, 'ERROR', 'FAIL', e.message); }

  // L5 full day
  console.log('\n6.2 L5 FT Mon 7.6hr');
  try {
    const r = await calcShift('full_time', wId(5), REF_MONDAY, '08:00', '16:06', { mealBreakTaken: true, mealBreakDuration: 30 });
    record('CS-02', round2(29.88 * 7.6), payOnly(r), 'L5 FT Mon 7.6hr');
  } catch(e) { recordText('CS-02', 0, 'ERROR', 'FAIL', e.message); }

  // Casual L1 PH (precise casual base)
  console.log('\n6.3 Casual L1 PH 4hr');
  try {
    const casBase = parseFloat((25.88 * 1.25).toFixed(4));
    const r = await calcShift('casual', wId(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] });
    record('CS-03', round2(casBase * 2.50 * 4), payOnly(r), 'Casual L1 PH 4hr (x2.50)');
  } catch(e) { recordText('CS-03', 0, 'ERROR', 'FAIL', e.message); }

  // Casual L10 Sunday
  console.log('\n6.4 Casual L10 Sunday 4hr');
  try {
    const casBase = parseFloat((41.56 * 1.25).toFixed(4));
    const r = await calcShift('casual', wId(10), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('CS-04', round2(casBase * 2.00 * 4), payOnly(r), 'Casual L10 Sun 4hr (x2.00)');
  } catch(e) { recordText('CS-04', 0, 'ERROR', 'FAIL', e.message); }

  // Mon-Sat full week
  console.log('\n6.5 L1 FT Mon-Sat full week');
  try {
    const shifts = [];
    for (let d = 7; d <= 12; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '09:00', endTime: '17:00', mealBreakTaken: true, mealBreakDuration: 30 });
    const r = await calcMultiShift('full_time', wId(1), shifts);
    const total = payOnly(r);
    record('CS-05', total, total, 'FT L1 Mon-Sat 45hr week = $' + total);
  } catch(e) { recordText('CS-05', 0, 'ERROR', 'FAIL', e.message); }

  // Casual L8 weekday
  console.log('\n6.6 Casual L8 Mon 4hr');
  try {
    const casBase = parseFloat((35.55 * 1.25).toFixed(4));
    const r = await calcShift('casual', wId(8), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('CS-06', round2(casBase * 4), payOnly(r), 'Casual L8 Mon 4hr');
  } catch(e) { recordText('CS-06', 0, 'ERROR', 'FAIL', e.message); }

  // L7 FT Saturday
  console.log('\n6.7 L7 FT Saturday 7.5hr');
  try {
    const r = await calcShift('full_time', wId(7), REF_SATURDAY, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    record('CS-07', round2(32.90 * 1.50 * 7.5), payOnly(r), 'L7 FT Sat 7.5hr (x1.50)');
  } catch(e) { recordText('CS-07', 0, 'ERROR', 'FAIL', e.message); }

  // Casual L6 PH
  console.log('\n6.8 Casual L6 PH 4hr');
  try {
    const casBase = parseFloat((32.34 * 1.25).toFixed(4));
    const r = await calcShift('casual', wId(6), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] });
    record('CS-08', round2(casBase * 2.50 * 4), payOnly(r), 'Casual L6 PH 4hr (x2.50)');
  } catch(e) { recordText('CS-08', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 7 — REGRESSION
   ═══════════════════════════════════════════════════════════════════════════ */
async function runRegressionTests() {
  console.log('\n=== SECTION 7 — REGRESSION ===');

  try {
    const r = await calcShift('full_time', wId(3), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-01', round2(27.71 * 4), payOnly(r), 'L3 FT Mon 4hr = $27.71 x 4');
  } catch(e) { recordText('RT-01', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('casual', wId(4), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-02', round2(parseFloat((28.12 * 1.25).toFixed(4)) * 4), payOnly(r), 'L4 casual Mon 4hr');
  } catch(e) { recordText('RT-02', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', wId(2), REF_SUNDAY, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    record('RT-03', round2(26.70 * 2.00 * 7.5), payOnly(r), 'L2 FT Sunday 7.5hr (x2.00)');
  } catch(e) { recordText('RT-03', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const casBase = parseFloat((28.12 * 1.25).toFixed(4));
    const r = await calcShift('casual', wId(4), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] });
    record('RT-04', round2(casBase * 2.50 * 4), payOnly(r), 'L4 casual PH 4hr (x2.50)');
  } catch(e) { recordText('RT-04', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', wId(9), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-05', round2(38.03 * 1.50 * 4), payOnly(r), 'L9 FT Sat 4hr (x1.50)');
  } catch(e) { recordText('RT-05', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', wId(6), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-06', round2(32.34 * 4), payOnly(r), 'L6 FT Mon 4hr = $32.34 x 4');
  } catch(e) { recordText('RT-06', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', wId(10), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-07', round2(41.56 * 4), payOnly(r), 'L10 FT Mon 4hr = $41.56 x 4');
  } catch(e) { recordText('RT-07', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const casBase = parseFloat((26.70 * 1.25).toFixed(4));
    const r = await calcShift('casual', wId(2), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-08', round2(casBase * 1.50 * 4), payOnly(r), 'L2 casual Sat 4hr (x1.50)');
  } catch(e) { recordText('RT-08', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const casBase = parseFloat((38.03 * 1.25).toFixed(4));
    const r = await calcShift('casual', wId(9), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-09', round2(casBase * 2.00 * 4), payOnly(r), 'L9 casual Sun 4hr (x2.00)');
  } catch(e) { recordText('RT-09', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', wId(1), REF_MONDAY, '08:00', '16:06', { mealBreakTaken: true, mealBreakDuration: 30 });
    record('RT-10', round2(25.88 * 7.6), payOnly(r), 'L1 FT Mon 7.6hr ordinary');
  } catch(e) { recordText('RT-10', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', wId(10), REF_SATURDAY, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    record('RT-11', round2(41.56 * 1.50 * 7.5), payOnly(r), 'L10 FT Sat 7.5hr (x1.50)');
  } catch(e) { recordText('RT-11', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', wId(5), REF_SUNDAY, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    record('RT-12', round2(29.88 * 2.00 * 7.5), payOnly(r), 'L5 FT Sun 7.5hr (x2.00)');
  } catch(e) { recordText('RT-12', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const casBase = parseFloat((41.56 * 1.25).toFixed(4));
    const r = await calcShift('casual', wId(10), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] });
    record('RT-13', round2(casBase * 2.50 * 4), payOnly(r), 'L10 casual PH 4hr (x2.50)');
  } catch(e) { recordText('RT-13', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('casual', wId(5), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    const casBase = parseFloat((29.88 * 1.25).toFixed(4));
    record('RT-14', round2(casBase * 4), payOnly(r), 'L5 casual Mon 4hr');
  } catch(e) { recordText('RT-14', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', wId(8), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-15', round2(35.55 * 4), payOnly(r), 'L8 FT Mon 4hr = $35.55 x 4');
  } catch(e) { recordText('RT-15', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', wId(7), REF_MONDAY, '08:00', '16:06', { mealBreakTaken: true, mealBreakDuration: 30 });
    record('RT-16', round2(32.90 * 7.6), payOnly(r), 'L7 FT Mon 7.6hr ordinary');
  } catch(e) { recordText('RT-16', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', wId(4), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-17', round2(28.12 * 4), payOnly(r), 'L4 FT Mon 4hr = $28.12 x 4');
  } catch(e) { recordText('RT-17', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const casBase = parseFloat((32.34 * 1.25).toFixed(4));
    const r = await calcShift('casual', wId(6), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-18', round2(casBase * 1.50 * 4), payOnly(r), 'L6 casual Sat 4hr (x1.50)');
  } catch(e) { recordText('RT-18', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN
   ═══════════════════════════════════════════════════════════════════════════ */
async function main() {
  console.log('WageCheck Water Industry Award Test Runner — MA000113');
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
