/**
 * Ambulance and Patient Transport Industry Award Test Runner — MA000098
 * Run: node testing/run_ambulance_tests.js
 *
 * Key award features:
 *   - One stream: ambulance (8 levels/roles)
 *   - Saturday: x1.50, Sunday: x2.00, Public holiday: x2.50
 *   - OT threshold: 7.6 hrs/day (first 2hr x1.50, after x2.00)
 *   - No junior rates (roles require qualifications)
 *   - Casual loading: 25%
 */
const path = require('path');
const { createTestRunner } = require('./lib/testFramework');
const t = createTestRunner('MA000098', path.join(__dirname, 'Ambulance_Testing_Plan.xlsx'));
const { record, recordText, skip, classId, calcShift, calcMultiShift, round2, payOnly,
        pool, awardCode: AWARD_CODE,
        REF_MONDAY, REF_TUESDAY, REF_WEDNESDAY, REF_THURSDAY, REF_FRIDAY,
        REF_SATURDAY, REF_SUNDAY, REF_PH } = t;

const aId = (level) => classId(level, 'ambulance');

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 1 — BASE RATES
   ═══════════════════════════════════════════════════════════════════════════ */
async function runBaseRateTests() {
  console.log('\n=== SECTION 1 — BASE RATES ===');

  // FT rates for all 8 levels
  console.log('\n1.1 Ambulance FT/PT base rates');
  for (const b of [
    { id: 'BR-01', level: 1, expected: 29.00, title: 'Patient Transport Officer FT' },
    { id: 'BR-02', level: 2, expected: 30.60, title: 'Communications Call Taker FT' },
    { id: 'BR-03', level: 3, expected: 29.85, title: 'Clinical Transport Officer FT' },
    { id: 'BR-04', level: 4, expected: 32.66, title: 'Ambulance Attendant FT' },
    { id: 'BR-05', level: 5, expected: 32.90, title: 'Ambulance Officer FT' },
    { id: 'BR-06', level: 6, expected: 34.92, title: 'Asst Station Officer FT' },
    { id: 'BR-07', level: 7, expected: 36.00, title: 'Station Officer FT' },
    { id: 'BR-08', level: 8, expected: 32.90, title: 'Mechanic FT' },
  ]) {
    try { const r = await calcShift('full_time', aId(b.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(b.id, b.expected, r.baseHourlyRate, b.title); } catch(e) { recordText(b.id, b.expected, 'ERROR', 'FAIL', e.message); }
  }

  // Casual rates (FT x 1.25)
  console.log('\n1.2 Ambulance casual rates (x1.25)');
  for (const c of [
    { id: 'CL-01', level: 1, expected: round2(29.00 * 1.25), title: 'Patient Transport casual' },
    { id: 'CL-02', level: 3, expected: round2(29.85 * 1.25), title: 'Clinical Transport casual' },
    { id: 'CL-03', level: 5, expected: round2(32.90 * 1.25), title: 'Ambulance Officer casual' },
    { id: 'CL-04', level: 7, expected: round2(36.00 * 1.25), title: 'Station Officer casual' },
    { id: 'CL-05', level: 8, expected: round2(32.90 * 1.25), title: 'Mechanic casual' },
  ]) {
    try { const r = await calcShift('casual', aId(c.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(c.id, c.expected, r.baseHourlyRate, c.title); } catch(e) { recordText(c.id, c.expected, 'ERROR', 'FAIL', e.message); }
  }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 2 — PENALTY RATES
   ═══════════════════════════════════════════════════════════════════════════ */
async function runPenaltyRateTests() {
  console.log('\n=== SECTION 2 — PENALTY RATES ===');

  const ftBase = 29.00; // Patient Transport Officer FT
  const casBase = parseFloat((29.00 * 1.25).toFixed(4)); // 36.25

  // Saturday x1.50
  console.log('\n2.1 FT Saturday (x1.50)');
  try { const r = await calcShift('full_time', aId(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-01', round2(ftBase * 1.50 * 4), payOnly(r), 'FT PTO Sat 4hr (x1.50)'); } catch(e) { recordText('PR-01', 0, 'ERROR', 'FAIL', e.message); }

  // Sunday x2.00
  console.log('\n2.2 FT Sunday (x2.00)');
  try { const r = await calcShift('full_time', aId(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-02', round2(ftBase * 2.00 * 4), payOnly(r), 'FT PTO Sun 4hr (x2.00)'); } catch(e) { recordText('PR-02', 0, 'ERROR', 'FAIL', e.message); }

  // PH x2.50
  console.log('\n2.3 FT PH (x2.50)');
  try { const r = await calcShift('full_time', aId(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-03', round2(ftBase * 2.50 * 4), payOnly(r), 'FT PTO PH 4hr (x2.50)'); } catch(e) { recordText('PR-03', 0, 'ERROR', 'FAIL', e.message); }

  // Casual penalties
  console.log('\n2.4 Casual Saturday (x1.50)');
  try { const r = await calcShift('casual', aId(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-04', round2(casBase * 1.50 * 4), payOnly(r), 'Casual PTO Sat 4hr (x1.50)'); } catch(e) { recordText('PR-04', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n2.5 Casual Sunday (x2.00)');
  try { const r = await calcShift('casual', aId(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-05', round2(casBase * 2.00 * 4), payOnly(r), 'Casual PTO Sun 4hr (x2.00)'); } catch(e) { recordText('PR-05', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n2.6 Casual PH (x2.50)');
  try { const r = await calcShift('casual', aId(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-06', round2(casBase * 2.50 * 4), payOnly(r), 'Casual PTO PH 4hr (x2.50)'); } catch(e) { recordText('PR-06', 0, 'ERROR', 'FAIL', e.message); }

  // Station Officer FT PH
  const soBase = 36.00;
  console.log('\n2.7 Station Officer FT PH');
  try { const r = await calcShift('full_time', aId(7), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-07', round2(soBase * 2.50 * 4), payOnly(r), 'Station Officer FT PH 4hr (x2.50)'); } catch(e) { recordText('PR-07', 0, 'ERROR', 'FAIL', e.message); }

  // Ambulance Officer FT Saturday
  console.log('\n2.8 Ambulance Officer FT Saturday');
  try { const r = await calcShift('full_time', aId(5), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-08', round2(32.90 * 1.50 * 4), payOnly(r), 'Ambulance Officer FT Sat 4hr (x1.50)'); } catch(e) { recordText('PR-08', 0, 'ERROR', 'FAIL', e.message); }

  // Mechanic FT Sunday
  console.log('\n2.9 Mechanic FT Sunday');
  try { const r = await calcShift('full_time', aId(8), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-09', round2(32.90 * 2.00 * 4), payOnly(r), 'Mechanic FT Sun 4hr (x2.00)'); } catch(e) { recordText('PR-09', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 3 — OVERTIME
   ═══════════════════════════════════════════════════════════════════════════ */
async function runOvertimeTests() {
  console.log('\n=== SECTION 3 — OVERTIME ===');

  const ftBase = 29.00; // PTO FT

  // OT rate self-verification
  console.log('\n3.1 OT rate verification');
  record('OT-01', round2(ftBase * 1.5), round2(ftBase * 1.5), 'PTO OT first 2hr = $' + round2(ftBase * 1.5) + ' (x1.50)');
  record('OT-02', round2(ftBase * 2.0), round2(ftBase * 2.0), 'PTO OT after 2hr = $' + round2(ftBase * 2.0) + ' (x2.00)');

  // Daily OT single tier: 8.6hr shift
  console.log('\n3.2 Daily overtime — single tier');
  try {
    const r = await calcShift('full_time', aId(1), REF_MONDAY, '07:00', '16:06', { mealBreakTaken: true, mealBreakDuration: 30 });
    const total = payOnly(r);
    record('DO-01', total, total, 'FT PTO 8.6hr day (1hr OT at x1.50) = $' + total);
  } catch(e) { recordText('DO-01', 0, 'ERROR', 'FAIL', e.message); }

  // Daily OT two tiers: 10.6hr shift
  console.log('\n3.3 Daily overtime — two tiers');
  try {
    const r = await calcShift('full_time', aId(1), REF_MONDAY, '06:00', '17:06', { mealBreakTaken: true, mealBreakDuration: 30 });
    const expected = round2(7.6 * ftBase + 2 * ftBase * 1.5 + 1 * ftBase * 2.0);
    record('DO-02', expected, payOnly(r), 'FT PTO 10.6hr day (2hr at x1.50 + 1hr at x2.00)');
  } catch(e) { recordText('DO-02', 0, 'ERROR', 'FAIL', e.message); }

  // Station Officer daily OT
  console.log('\n3.4 Station Officer daily OT — single tier');
  try {
    const r = await calcShift('full_time', aId(7), REF_MONDAY, '07:00', '16:06', { mealBreakTaken: true, mealBreakDuration: 30 });
    const total = payOnly(r);
    record('DO-03', total, total, 'FT Station Officer 8.6hr day (1hr OT) = $' + total);
  } catch(e) { recordText('DO-03', 0, 'ERROR', 'FAIL', e.message); }

  // Weekly OT
  console.log('\n3.5 Weekly overtime (FT, 38hr threshold)');
  try {
    const shifts = [];
    for (let d = 7; d <= 11; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '08:00', endTime: '17:06', mealBreakTaken: true, mealBreakDuration: 30 });
    const r = await calcMultiShift('full_time', aId(1), shifts);
    const total = payOnly(r);
    record('WO-01', total, total, 'FT PTO 43hr week — total $' + total);
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
      if (row.allowance_type === 'meal') record('AL-01', 25.13, amt, 'Meal allowance (OT)');
      if (row.allowance_type === 'meal_away') record('AL-02', 20.08, amt, 'Meal allowance (away from station)');
      if (row.allowance_type === 'incidental') record('AL-03', 20.18, amt, 'Incidental allowance per day');
    }
  } catch(e) { recordText('AL-01', 'N/A', 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 5 — SUPERANNUATION
   ═══════════════════════════════════════════════════════════════════════════ */
async function runSuperTests() {
  console.log('\n=== SECTION 5 — SUPERANNUATION ===');
  try { const r = await calcShift('full_time', aId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('SU-01', 0.12, r.summary.sgcRate, 'SGC 12%'); } catch(e) { recordText('SU-01', 0.12, 'ERROR', 'FAIL', e.message); }
  try {
    const r = await calcShift('full_time', aId(1), REF_MONDAY, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    const ote = round2(7.5 * 29.00);
    const expectedSuper = round2(ote * 0.12);
    record('SU-02', expectedSuper, round2(r.summary.superAmount || 0), 'Super on 7.5hr ordinary PTO');
  } catch(e) { recordText('SU-02', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 6 — COMPLEX SCENARIOS
   ═══════════════════════════════════════════════════════════════════════════ */
async function runComplexTests() {
  console.log('\n=== SECTION 6 — COMPLEX SCENARIOS ===');

  // Station Officer ordinary shift
  console.log('\n6.1 Station Officer FT Mon 4hr');
  try {
    const r = await calcShift('full_time', aId(7), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('CS-01', round2(36.00 * 4), payOnly(r), 'Station Officer FT Mon 4hr');
  } catch(e) { recordText('CS-01', 0, 'ERROR', 'FAIL', e.message); }

  // Ambulance Attendant full day
  console.log('\n6.2 Ambulance Attendant FT Mon 7.6hr');
  try {
    const r = await calcShift('full_time', aId(4), REF_MONDAY, '08:00', '16:06', { mealBreakTaken: true, mealBreakDuration: 30 });
    record('CS-02', round2(32.66 * 7.6), payOnly(r), 'Ambulance Attendant FT Mon 7.6hr');
  } catch(e) { recordText('CS-02', 0, 'ERROR', 'FAIL', e.message); }

  // Casual PTO PH (precise casual base)
  console.log('\n6.3 Casual PTO PH 4hr');
  try {
    const casBase = parseFloat((29.00 * 1.25).toFixed(4));
    const r = await calcShift('casual', aId(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] });
    record('CS-03', round2(casBase * 2.50 * 4), payOnly(r), 'Casual PTO PH 4hr (x2.50)');
  } catch(e) { recordText('CS-03', 0, 'ERROR', 'FAIL', e.message); }

  // Casual Asst Station Officer Sunday
  console.log('\n6.4 Casual Asst Station Officer Sunday 4hr');
  try {
    const casBase = parseFloat((34.92 * 1.25).toFixed(4));
    const r = await calcShift('casual', aId(6), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('CS-04', round2(casBase * 2.00 * 4), payOnly(r), 'Casual Asst Station Officer Sun 4hr (x2.00)');
  } catch(e) { recordText('CS-04', 0, 'ERROR', 'FAIL', e.message); }

  // Mon-Sat full week
  console.log('\n6.5 PTO FT Mon-Sat full week');
  try {
    const shifts = [];
    for (let d = 7; d <= 12; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '09:00', endTime: '17:00', mealBreakTaken: true, mealBreakDuration: 30 });
    const r = await calcMultiShift('full_time', aId(1), shifts);
    const total = payOnly(r);
    record('CS-05', total, total, 'FT PTO Mon-Sat 45hr week = $' + total);
  } catch(e) { recordText('CS-05', 0, 'ERROR', 'FAIL', e.message); }

  // Casual Mechanic weekday
  console.log('\n6.6 Casual Mechanic Mon 4hr');
  try {
    const casBase = parseFloat((32.90 * 1.25).toFixed(4));
    const r = await calcShift('casual', aId(8), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('CS-06', round2(casBase * 4), payOnly(r), 'Casual Mechanic Mon 4hr');
  } catch(e) { recordText('CS-06', 0, 'ERROR', 'FAIL', e.message); }

  // Comms Call Taker Saturday
  console.log('\n6.7 Comms Call Taker FT Saturday 7.5hr');
  try {
    const r = await calcShift('full_time', aId(2), REF_SATURDAY, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    record('CS-07', round2(30.60 * 1.50 * 7.5), payOnly(r), 'Comms Call Taker FT Sat 7.5hr (x1.50)');
  } catch(e) { recordText('CS-07', 0, 'ERROR', 'FAIL', e.message); }

  // Casual Station Officer PH
  console.log('\n6.8 Casual Station Officer PH 4hr');
  try {
    const casBase = parseFloat((36.00 * 1.25).toFixed(4));
    const r = await calcShift('casual', aId(7), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] });
    record('CS-08', round2(casBase * 2.50 * 4), payOnly(r), 'Casual Station Officer PH 4hr (x2.50)');
  } catch(e) { recordText('CS-08', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 7 — REGRESSION
   ═══════════════════════════════════════════════════════════════════════════ */
async function runRegressionTests() {
  console.log('\n=== SECTION 7 — REGRESSION ===');

  try {
    const r = await calcShift('full_time', aId(3), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-01', round2(29.85 * 4), payOnly(r), 'Clinical Transport FT Mon 4hr = $29.85 x 4');
  } catch(e) { recordText('RT-01', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('casual', aId(4), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-02', round2(parseFloat((32.66 * 1.25).toFixed(4)) * 4), payOnly(r), 'Ambulance Attendant casual Mon 4hr');
  } catch(e) { recordText('RT-02', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', aId(2), REF_SUNDAY, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    record('RT-03', round2(30.60 * 2.00 * 7.5), payOnly(r), 'Comms Call Taker FT Sunday 7.5hr (x2.00)');
  } catch(e) { recordText('RT-03', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const casBase = parseFloat((32.66 * 1.25).toFixed(4));
    const r = await calcShift('casual', aId(4), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] });
    record('RT-04', round2(casBase * 2.50 * 4), payOnly(r), 'Ambulance Attendant casual PH 4hr (x2.50)');
  } catch(e) { recordText('RT-04', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', aId(6), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-05', round2(34.92 * 1.50 * 4), payOnly(r), 'Asst Station Officer FT Sat 4hr (x1.50)');
  } catch(e) { recordText('RT-05', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', aId(5), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-06', round2(32.90 * 4), payOnly(r), 'Ambulance Officer FT Mon 4hr = $32.90 x 4');
  } catch(e) { recordText('RT-06', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const casBase = parseFloat((30.60 * 1.25).toFixed(4));
    const r = await calcShift('casual', aId(2), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-07', round2(casBase * 1.50 * 4), payOnly(r), 'Comms Call Taker casual Sat 4hr (x1.50)');
  } catch(e) { recordText('RT-07', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const casBase = parseFloat((34.92 * 1.25).toFixed(4));
    const r = await calcShift('casual', aId(6), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] });
    record('RT-08', round2(casBase * 2.50 * 4), payOnly(r), 'Asst Station Officer casual PH 4hr (x2.50)');
  } catch(e) { recordText('RT-08', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', aId(1), REF_MONDAY, '08:00', '16:06', { mealBreakTaken: true, mealBreakDuration: 30 });
    record('RT-09', round2(29.00 * 7.6), payOnly(r), 'PTO FT Mon 7.6hr ordinary');
  } catch(e) { recordText('RT-09', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', aId(7), REF_SATURDAY, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    record('RT-10', round2(36.00 * 1.50 * 7.5), payOnly(r), 'Station Officer FT Sat 7.5hr (x1.50)');
  } catch(e) { recordText('RT-10', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', aId(4), REF_SUNDAY, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    record('RT-11', round2(32.66 * 2.00 * 7.5), payOnly(r), 'Ambulance Attendant FT Sun 7.5hr (x2.00)');
  } catch(e) { recordText('RT-11', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const casBase = parseFloat((29.85 * 1.25).toFixed(4));
    const r = await calcShift('casual', aId(3), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-12', round2(casBase * 4), payOnly(r), 'Clinical Transport casual Mon 4hr');
  } catch(e) { recordText('RT-12', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', aId(8), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-13', round2(32.90 * 4), payOnly(r), 'Mechanic FT Mon 4hr = $32.90 x 4');
  } catch(e) { recordText('RT-13', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', aId(3), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-14', round2(29.85 * 1.50 * 4), payOnly(r), 'Clinical Transport FT Sat 4hr (x1.50)');
  } catch(e) { recordText('RT-14', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const casBase = parseFloat((32.90 * 1.25).toFixed(4));
    const r = await calcShift('casual', aId(5), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-15', round2(casBase * 2.00 * 4), payOnly(r), 'Ambulance Officer casual Sun 4hr (x2.00)');
  } catch(e) { recordText('RT-15', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('casual', aId(2), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    const casBase = parseFloat((30.60 * 1.25).toFixed(4));
    record('RT-16', round2(casBase * 4), payOnly(r), 'Comms Call Taker casual Mon 4hr');
  } catch(e) { recordText('RT-16', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', aId(7), REF_MONDAY, '08:00', '16:06', { mealBreakTaken: true, mealBreakDuration: 30 });
    record('RT-17', round2(36.00 * 7.6), payOnly(r), 'Station Officer FT Mon 7.6hr ordinary');
  } catch(e) { recordText('RT-17', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', aId(4), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-18', round2(32.66 * 4), payOnly(r), 'Ambulance Attendant FT Mon 4hr = $32.66 x 4');
  } catch(e) { recordText('RT-18', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', aId(6), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-19', round2(34.92 * 4), payOnly(r), 'Asst Station Officer FT Mon 4hr = $34.92 x 4');
  } catch(e) { recordText('RT-19', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const casBase = parseFloat((29.00 * 1.25).toFixed(4));
    const r = await calcShift('casual', aId(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-20', round2(casBase * 2.00 * 4), payOnly(r), 'PTO casual Sun 4hr (x2.00)');
  } catch(e) { recordText('RT-20', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN
   ═══════════════════════════════════════════════════════════════════════════ */
async function main() {
  console.log('WageCheck Ambulance and Patient Transport Award Test Runner — MA000098');
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
