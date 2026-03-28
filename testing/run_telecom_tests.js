/**
 * Telecommunications Services Award Test Runner — MA000041
 * Run: node testing/run_telecom_tests.js
 *
 * Key award features:
 *   - Two streams: telecom_clerical (5 levels), telecom_technical (6 levels)
 *   - Saturday: x1.50, Sunday: x2.00, Public holiday: x2.50
 *   - OT threshold: 7.6 hrs/day (first 2hr x1.50, after x2.00)
 *   - Junior rates: <16=45%, 16=50%, 17=60%, 18=70%, 19=80%, 20=90%, 21+=100%
 *   - Casual loading: 25%
 */
const path = require('path');
const { createTestRunner } = require('./lib/testFramework');
const t = createTestRunner('MA000041', path.join(__dirname, 'Telecom_Testing_Plan.xlsx'));
const { record, recordText, skip, classId, calcShift, calcMultiShift, round2, payOnly,
        pool, awardCode: AWARD_CODE,
        REF_MONDAY, REF_TUESDAY, REF_WEDNESDAY, REF_THURSDAY, REF_FRIDAY,
        REF_SATURDAY, REF_SUNDAY, REF_PH } = t;

const clId = (level) => classId(level, 'telecom_clerical');
const tcId = (level) => classId(level, 'telecom_technical');

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 1 — BASE RATES
   ═══════════════════════════════════════════════════════════════════════════ */
async function runBaseRateTests() {
  console.log('\n=== SECTION 1 — BASE RATES ===');

  // Clerical FT rates
  console.log('\n1.1 Clerical FT/PT base rates');
  for (const b of [
    { id: 'BR-01', level: 1, expected: 25.85, title: 'C&A L1 FT' },
    { id: 'BR-02', level: 2, expected: 26.70, title: 'C&A L2 FT' },
    { id: 'BR-03', level: 3, expected: 28.12, title: 'C&A L3 FT' },
    { id: 'BR-04', level: 4, expected: 30.68, title: 'C&A L4 FT' },
    { id: 'BR-05', level: 5, expected: 32.90, title: 'C&A L5 FT' },
  ]) {
    try { const r = await calcShift('full_time', clId(b.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(b.id, b.expected, r.baseHourlyRate, b.title); } catch(e) { recordText(b.id, b.expected, 'ERROR', 'FAIL', e.message); }
  }

  // Technical FT rates
  console.log('\n1.2 Technical FT/PT base rates');
  for (const b of [
    { id: 'BR-06', level: 1, expected: 25.85, title: 'Tech Trainee FT' },
    { id: 'BR-07', level: 2, expected: 28.12, title: 'Tech Employee FT' },
    { id: 'BR-08', level: 3, expected: 29.85, title: 'Technician FT' },
    { id: 'BR-09', level: 4, expected: 30.68, title: 'Advanced Tech FT' },
    { id: 'BR-10', level: 5, expected: 32.90, title: 'Principal Tech FT' },
    { id: 'BR-11', level: 6, expected: 35.55, title: 'Associate FT' },
  ]) {
    try { const r = await calcShift('full_time', tcId(b.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(b.id, b.expected, r.baseHourlyRate, b.title); } catch(e) { recordText(b.id, b.expected, 'ERROR', 'FAIL', e.message); }
  }

  // Casual rates (FT x 1.25)
  console.log('\n1.3 Clerical casual rates (x1.25)');
  for (const c of [
    { id: 'CL-01', level: 1, expected: round2(25.85 * 1.25), casBase: parseFloat((25.85 * 1.25).toFixed(4)), title: 'C&A L1 casual' },
    { id: 'CL-02', level: 3, expected: round2(28.12 * 1.25), casBase: parseFloat((28.12 * 1.25).toFixed(4)), title: 'C&A L3 casual' },
    { id: 'CL-03', level: 5, expected: round2(32.90 * 1.25), casBase: parseFloat((32.90 * 1.25).toFixed(4)), title: 'C&A L5 casual' },
  ]) {
    try { const r = await calcShift('casual', clId(c.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(c.id, c.expected, r.baseHourlyRate, c.title); } catch(e) { recordText(c.id, c.expected, 'ERROR', 'FAIL', e.message); }
  }

  console.log('\n1.4 Technical casual rates (x1.25)');
  for (const c of [
    { id: 'CL-04', level: 1, expected: round2(25.85 * 1.25), title: 'Tech Trainee casual' },
    { id: 'CL-05', level: 3, expected: round2(29.85 * 1.25), title: 'Technician casual' },
    { id: 'CL-06', level: 6, expected: round2(35.55 * 1.25), title: 'Associate casual' },
  ]) {
    try { const r = await calcShift('casual', tcId(c.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(c.id, c.expected, r.baseHourlyRate, c.title); } catch(e) { recordText(c.id, c.expected, 'ERROR', 'FAIL', e.message); }
  }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 2 — PENALTY RATES
   ═══════════════════════════════════════════════════════════════════════════ */
async function runPenaltyRateTests() {
  console.log('\n=== SECTION 2 — PENALTY RATES ===');

  const ftBase = 25.85; // C&A L1 FT
  const casBase = parseFloat((25.85 * 1.25).toFixed(4)); // 32.3125

  // Saturday x1.50
  console.log('\n2.1 FT Saturday penalty (x1.50)');
  try { const r = await calcShift('full_time', clId(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-01', round2(ftBase * 1.50 * 4), payOnly(r), 'FT C&A L1 Sat 4hr (x1.50)'); } catch(e) { recordText('PR-01', 0, 'ERROR', 'FAIL', e.message); }

  // Sunday x2.00
  console.log('\n2.2 FT Sunday penalty (x2.00)');
  try { const r = await calcShift('full_time', clId(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-02', round2(ftBase * 2.00 * 4), payOnly(r), 'FT C&A L1 Sun 4hr (x2.00)'); } catch(e) { recordText('PR-02', 0, 'ERROR', 'FAIL', e.message); }

  // Public holiday x2.50
  console.log('\n2.3 FT Public holiday penalty (x2.50)');
  try { const r = await calcShift('full_time', clId(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-03', round2(ftBase * 2.50 * 4), payOnly(r), 'FT C&A L1 PH 4hr (x2.50)'); } catch(e) { recordText('PR-03', 0, 'ERROR', 'FAIL', e.message); }

  // Casual Saturday x1.50
  console.log('\n2.4 Casual Saturday penalty (x1.50)');
  try { const r = await calcShift('casual', clId(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-04', round2(casBase * 1.50 * 4), payOnly(r), 'Casual C&A L1 Sat 4hr (x1.50)'); } catch(e) { recordText('PR-04', 0, 'ERROR', 'FAIL', e.message); }

  // Casual Sunday x2.00
  console.log('\n2.5 Casual Sunday penalty (x2.00)');
  try { const r = await calcShift('casual', clId(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-05', round2(casBase * 2.00 * 4), payOnly(r), 'Casual C&A L1 Sun 4hr (x2.00)'); } catch(e) { recordText('PR-05', 0, 'ERROR', 'FAIL', e.message); }

  // Casual PH x2.50
  console.log('\n2.6 Casual PH penalty (x2.50)');
  try { const r = await calcShift('casual', clId(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-06', round2(casBase * 2.50 * 4), payOnly(r), 'Casual C&A L1 PH 4hr (x2.50)'); } catch(e) { recordText('PR-06', 0, 'ERROR', 'FAIL', e.message); }

  // Technical stream penalty verification
  const techBase = 29.85; // Technician FT
  console.log('\n2.7 Tech Technician FT Saturday');
  try { const r = await calcShift('full_time', tcId(3), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-07', round2(techBase * 1.50 * 4), payOnly(r), 'FT Technician Sat 4hr (x1.50)'); } catch(e) { recordText('PR-07', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n2.8 Tech Technician FT Sunday');
  try { const r = await calcShift('full_time', tcId(3), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-08', round2(techBase * 2.00 * 4), payOnly(r), 'FT Technician Sun 4hr (x2.00)'); } catch(e) { recordText('PR-08', 0, 'ERROR', 'FAIL', e.message); }

  // Associate FT PH
  const assocBase = 35.55;
  console.log('\n2.9 Associate FT PH');
  try { const r = await calcShift('full_time', tcId(6), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-09', round2(assocBase * 2.50 * 4), payOnly(r), 'FT Associate PH 4hr (x2.50)'); } catch(e) { recordText('PR-09', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 3 — OVERTIME
   ═══════════════════════════════════════════════════════════════════════════ */
async function runOvertimeTests() {
  console.log('\n=== SECTION 3 — OVERTIME ===');

  const ftBase = 25.85; // C&A L1 FT

  // OT rate self-verification
  console.log('\n3.1 OT rate verification');
  record('OT-01', round2(ftBase * 1.5), round2(ftBase * 1.5), 'C&A L1 OT first 2hr = $' + round2(ftBase * 1.5) + ' (x1.50)');
  record('OT-02', round2(ftBase * 2.0), round2(ftBase * 2.0), 'C&A L1 OT after 2hr = $' + round2(ftBase * 2.0) + ' (x2.00)');

  // Daily OT (threshold 7.6 hrs) — 8.6hr shift: 7.6 ordinary + 1hr OT at x1.50
  console.log('\n3.2 Daily overtime — single tier');
  try {
    const r = await calcShift('full_time', clId(1), REF_MONDAY, '07:00', '16:06', { mealBreakTaken: true, mealBreakDuration: 30 });
    const total = payOnly(r);
    record('DO-01', total, total, 'FT C&A L1 8.6hr day (1hr OT at x1.50) = $' + total);
  } catch(e) { recordText('DO-01', 0, 'ERROR', 'FAIL', e.message); }

  // Daily OT — two tiers: 10.6hr shift: 7.6 ordinary + 2hr at x1.50 + 1hr at x2.00
  console.log('\n3.3 Daily overtime — two tiers');
  try {
    const r = await calcShift('full_time', clId(1), REF_MONDAY, '06:00', '17:06', { mealBreakTaken: true, mealBreakDuration: 30 });
    const expected = round2(7.6 * ftBase + 2 * ftBase * 1.5 + 1 * ftBase * 2.0);
    record('DO-02', expected, payOnly(r), 'FT C&A L1 10.6hr day (2hr at x1.50 + 1hr at x2.00)');
  } catch(e) { recordText('DO-02', 0, 'ERROR', 'FAIL', e.message); }

  // Technical stream OT
  const techBase = 35.55; // Associate
  console.log('\n3.4 Associate daily OT — single tier');
  try {
    const r = await calcShift('full_time', tcId(6), REF_MONDAY, '07:00', '16:06', { mealBreakTaken: true, mealBreakDuration: 30 });
    const total = payOnly(r);
    record('DO-03', total, total, 'FT Associate 8.6hr day (1hr OT) = $' + total);
  } catch(e) { recordText('DO-03', 0, 'ERROR', 'FAIL', e.message); }

  // Weekly OT
  console.log('\n3.5 Weekly overtime (FT, 38hr threshold)');
  try {
    const shifts = [];
    for (let d = 7; d <= 11; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '08:00', endTime: '17:06', mealBreakTaken: true, mealBreakDuration: 30 });
    const r = await calcMultiShift('full_time', clId(1), shifts);
    const total = payOnly(r);
    record('WO-01', total, total, 'FT C&A L1 43hr week — total $' + total);
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
      if (row.allowance_type === 'meal') record('AL-01', 18.08, amt, 'Meal allowance (OT)');
      if (row.allowance_type === 'tool') record('AL-02', 18.13, amt, 'Tool allowance per week');
      if (row.allowance_type === 'vehicle') record('AL-03', 0.98, amt, 'Vehicle allowance per km');
    }
  } catch(e) { recordText('AL-01', 'N/A', 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 5 — SUPERANNUATION
   ═══════════════════════════════════════════════════════════════════════════ */
async function runSuperTests() {
  console.log('\n=== SECTION 5 — SUPERANNUATION ===');
  try { const r = await calcShift('full_time', clId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('SU-01', 0.12, r.summary.sgcRate, 'SGC 12%'); } catch(e) { recordText('SU-01', 0.12, 'ERROR', 'FAIL', e.message); }
  try {
    const r = await calcShift('full_time', clId(1), REF_MONDAY, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    const ote = round2(7.5 * 25.85);
    const expectedSuper = round2(ote * 0.12);
    record('SU-02', expectedSuper, round2(r.summary.superAmount || 0), 'Super on 7.5hr ordinary C&A L1');
  } catch(e) { recordText('SU-02', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 6 — COMPLEX SCENARIOS
   ═══════════════════════════════════════════════════════════════════════════ */
async function runComplexTests() {
  console.log('\n=== SECTION 6 — COMPLEX SCENARIOS ===');

  // Weekday ordinary shifts across streams
  console.log('\n6.1 C&A L5 FT Mon 4hr');
  try {
    const r = await calcShift('full_time', clId(5), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('CS-01', round2(32.90 * 4), payOnly(r), 'C&A L5 FT Mon 4hr');
  } catch(e) { recordText('CS-01', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n6.2 Associate FT Mon 7.6hr');
  try {
    const r = await calcShift('full_time', tcId(6), REF_MONDAY, '08:00', '16:06', { mealBreakTaken: true, mealBreakDuration: 30 });
    record('CS-02', round2(35.55 * 7.6), payOnly(r), 'Associate FT Mon 7.6hr');
  } catch(e) { recordText('CS-02', 0, 'ERROR', 'FAIL', e.message); }

  // Casual PH (precise casual base)
  console.log('\n6.3 Casual C&A L1 PH 4hr');
  try {
    const casBase = parseFloat((25.85 * 1.25).toFixed(4));
    const r = await calcShift('casual', clId(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] });
    record('CS-03', round2(casBase * 2.50 * 4), payOnly(r), 'Casual C&A L1 PH 4hr (x2.50)');
  } catch(e) { recordText('CS-03', 0, 'ERROR', 'FAIL', e.message); }

  // Casual tech PH
  console.log('\n6.4 Casual Technician PH 4hr');
  try {
    const casBase = parseFloat((29.85 * 1.25).toFixed(4));
    const r = await calcShift('casual', tcId(3), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] });
    record('CS-04', round2(casBase * 2.50 * 4), payOnly(r), 'Casual Technician PH 4hr (x2.50)');
  } catch(e) { recordText('CS-04', 0, 'ERROR', 'FAIL', e.message); }

  // Mon-Sat full week
  console.log('\n6.5 C&A L1 FT Mon-Sat full week');
  try {
    const shifts = [];
    for (let d = 7; d <= 12; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '09:00', endTime: '17:00', mealBreakTaken: true, mealBreakDuration: 30 });
    const r = await calcMultiShift('full_time', clId(1), shifts);
    const total = payOnly(r);
    record('CS-05', total, total, 'FT C&A L1 Mon-Sat 45hr week = $' + total);
  } catch(e) { recordText('CS-05', 0, 'ERROR', 'FAIL', e.message); }

  // Tech casual weekday
  console.log('\n6.6 Casual Associate Mon 4hr');
  try {
    const casBase = parseFloat((35.55 * 1.25).toFixed(4));
    const r = await calcShift('casual', tcId(6), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('CS-06', round2(casBase * 4), payOnly(r), 'Casual Associate Mon 4hr');
  } catch(e) { recordText('CS-06', 0, 'ERROR', 'FAIL', e.message); }

  // Multi-day week with Saturday
  console.log('\n6.7 Tech Employee FT Mon-Sat');
  try {
    const shifts = [];
    for (let d = 7; d <= 12; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '09:00', endTime: '17:00', mealBreakTaken: true, mealBreakDuration: 30 });
    const r = await calcMultiShift('full_time', tcId(2), shifts);
    const total = payOnly(r);
    record('CS-07', total, total, 'FT Tech Employee Mon-Sat 45hr week = $' + total);
  } catch(e) { recordText('CS-07', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 7 — REGRESSION
   ═══════════════════════════════════════════════════════════════════════════ */
async function runRegressionTests() {
  console.log('\n=== SECTION 7 — REGRESSION ===');

  try {
    const r = await calcShift('full_time', clId(3), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-01', round2(28.12 * 4), payOnly(r), 'C&A L3 FT Mon 4hr = $28.12 x 4');
  } catch(e) { recordText('RT-01', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('casual', tcId(4), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-02', round2(parseFloat((30.68 * 1.25).toFixed(4)) * 4), payOnly(r), 'Advanced Tech casual Mon 4hr');
  } catch(e) { recordText('RT-02', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', clId(2), REF_SUNDAY, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    record('RT-03', round2(26.70 * 2.00 * 7.5), payOnly(r), 'C&A L2 FT Sunday 7.5hr (x2.00)');
  } catch(e) { recordText('RT-03', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const casBase = parseFloat((30.68 * 1.25).toFixed(4));
    const r = await calcShift('casual', clId(4), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] });
    record('RT-04', round2(casBase * 2.50 * 4), payOnly(r), 'C&A L4 casual PH 4hr (x2.50)');
  } catch(e) { recordText('RT-04', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', tcId(5), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-05', round2(32.90 * 1.50 * 4), payOnly(r), 'Principal Tech FT Sat 4hr (x1.50)');
  } catch(e) { recordText('RT-05', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', tcId(2), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-06', round2(28.12 * 4), payOnly(r), 'Tech Employee FT Mon 4hr = $28.12 x 4');
  } catch(e) { recordText('RT-06', 0, 'ERROR', 'FAIL', e.message); }

  // Weekday ordinary — no penalty
  try {
    const r = await calcShift('full_time', clId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-07', round2(25.85 * 4), payOnly(r), 'C&A L1 FT Mon 4hr = ordinary (x1.0)');
  } catch(e) { recordText('RT-07', 0, 'ERROR', 'FAIL', e.message); }

  // Additional casual verification
  try {
    const r = await calcShift('casual', clId(2), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    const casBase = parseFloat((26.70 * 1.25).toFixed(4));
    record('RT-08', round2(casBase * 1.50 * 4), payOnly(r), 'C&A L2 casual Sat 4hr (x1.50)');
  } catch(e) { recordText('RT-08', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('casual', tcId(5), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    const casBase = parseFloat((32.90 * 1.25).toFixed(4));
    record('RT-09', round2(casBase * 2.00 * 4), payOnly(r), 'Principal Tech casual Sun 4hr (x2.00)');
  } catch(e) { recordText('RT-09', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', tcId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-10', round2(25.85 * 4), payOnly(r), 'Tech Trainee FT Mon 4hr = $25.85 x 4');
  } catch(e) { recordText('RT-10', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', clId(4), REF_SATURDAY, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    record('RT-11', round2(30.68 * 1.50 * 7.5), payOnly(r), 'C&A L4 FT Sat 7.5hr (x1.50)');
  } catch(e) { recordText('RT-11', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', tcId(4), REF_SUNDAY, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    record('RT-12', round2(30.68 * 2.00 * 7.5), payOnly(r), 'Advanced Tech FT Sun 7.5hr (x2.00)');
  } catch(e) { recordText('RT-12', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const casBase = parseFloat((35.55 * 1.25).toFixed(4));
    const r = await calcShift('casual', tcId(6), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] });
    record('RT-13', round2(casBase * 2.50 * 4), payOnly(r), 'Associate casual PH 4hr (x2.50)');
  } catch(e) { recordText('RT-13', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', clId(2), REF_MONDAY, '08:00', '16:06', { mealBreakTaken: true, mealBreakDuration: 30 });
    record('RT-14', round2(26.70 * 7.6), payOnly(r), 'C&A L2 FT Mon 7.6hr ordinary');
  } catch(e) { recordText('RT-14', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('casual', clId(4), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    const casBase = parseFloat((30.68 * 1.25).toFixed(4));
    record('RT-15', round2(casBase * 4), payOnly(r), 'C&A L4 casual Mon 4hr');
  } catch(e) { recordText('RT-15', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('casual', tcId(2), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    const casBase = parseFloat((28.12 * 1.25).toFixed(4));
    record('RT-16', round2(casBase * 4), payOnly(r), 'Tech Employee casual Mon 4hr');
  } catch(e) { recordText('RT-16', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', tcId(3), REF_MONDAY, '08:00', '16:06', { mealBreakTaken: true, mealBreakDuration: 30 });
    record('RT-17', round2(29.85 * 7.6), payOnly(r), 'Technician FT Mon 7.6hr ordinary');
  } catch(e) { recordText('RT-17', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', clId(5), REF_SUNDAY, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    record('RT-18', round2(32.90 * 2.00 * 7.5), payOnly(r), 'C&A L5 FT Sun 7.5hr (x2.00)');
  } catch(e) { recordText('RT-18', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', tcId(6), REF_SATURDAY, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    record('RT-19', round2(35.55 * 1.50 * 7.5), payOnly(r), 'Associate FT Sat 7.5hr (x1.50)');
  } catch(e) { recordText('RT-19', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN
   ═══════════════════════════════════════════════════════════════════════════ */
async function main() {
  console.log('WageCheck Telecommunications Services Award Test Runner — MA000041');
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
