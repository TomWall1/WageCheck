/**
 * Health Professionals and Support Services Award Test Runner — MA000027
 * Run: node testing/run_healthprofessional_tests.js
 *
 * Key award features:
 *   - Two streams: health_professional (4 levels), support_services (9 levels)
 *   - Penalties: FT Sat x1.50, Sun x2.00, PH x2.50. Casual same.
 *   - OT threshold: 7.6 hrs/day (first 2hr x1.50, after x2.00)
 *   - Junior rates (Support Services only): <16=36.8%, 16=47.3%, 17=57.8%, 18=68.3%, 19=82.5%, 20=97.7%
 *   - Casual loading: 25%
 */
const path = require('path');
const { createTestRunner } = require('./lib/testFramework');
const t = createTestRunner('MA000027', path.join(__dirname, 'HealthProfessional_Testing_Plan.xlsx'));
const { record, recordText, skip, classId, calcShift, calcMultiShift, round2, payOnly,
        pool, awardCode: AWARD_CODE,
        REF_MONDAY, REF_TUESDAY, REF_WEDNESDAY, REF_THURSDAY, REF_FRIDAY,
        REF_SATURDAY, REF_SUNDAY, REF_PH } = t;

const hpId = (level) => classId(level, 'health_professional');
const ssId = (level) => classId(level, 'support_services');

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 1 — BASE RATES
   ═══════════════════════════════════════════════════════════════════════════ */
async function runBaseRateTests() {
  console.log('\n═══ SECTION 1 — BASE RATES ═══');

  // Health Professional FT rates
  console.log('\n1.1 Health Professional FT/PT base rates');
  for (const b of [
    { id: 'BR-01', level: 1, expected: 29.49, title: 'HP L1 FT' },
    { id: 'BR-02', level: 2, expected: 37.53, title: 'HP L2 FT' },
    { id: 'BR-03', level: 3, expected: 43.81, title: 'HP L3 FT' },
    { id: 'BR-04', level: 4, expected: 53.05, title: 'HP L4 FT' },
  ]) {
    try { const r = await calcShift('full_time', hpId(b.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(b.id, b.expected, r.baseHourlyRate, b.title); } catch(e) { recordText(b.id, b.expected, 'ERROR', 'FAIL', e.message); }
  }

  // Support Services FT rates
  console.log('\n1.2 Support Services FT/PT base rates');
  for (const b of [
    { id: 'BR-05', level: 1, expected: 25.74, title: 'SS L1 FT' },
    { id: 'BR-06', level: 2, expected: 26.76, title: 'SS L2 FT' },
    { id: 'BR-07', level: 3, expected: 27.79, title: 'SS L3 FT' },
    { id: 'BR-08', level: 4, expected: 28.12, title: 'SS L4 FT' },
    { id: 'BR-09', level: 5, expected: 29.07, title: 'SS L5 FT' },
    { id: 'BR-10', level: 6, expected: 30.64, title: 'SS L6 FT' },
    { id: 'BR-11', level: 7, expected: 31.19, title: 'SS L7 FT' },
    { id: 'BR-12', level: 8, expected: 32.24, title: 'SS L8 FT' },
    { id: 'BR-13', level: 9, expected: 36.05, title: 'SS L9 FT' },
  ]) {
    try { const r = await calcShift('full_time', ssId(b.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(b.id, b.expected, r.baseHourlyRate, b.title); } catch(e) { recordText(b.id, b.expected, 'ERROR', 'FAIL', e.message); }
  }

  // Casual rates (FT x 1.25)
  console.log('\n1.3 Casual rates (x1.25)');
  for (const c of [
    { id: 'CL-01', level: 1, stream: 'hp', expected: round2(29.49 * 1.25), title: 'HP L1 casual' },
    { id: 'CL-02', level: 4, stream: 'hp', expected: round2(53.05 * 1.25), title: 'HP L4 casual' },
    { id: 'CL-03', level: 1, stream: 'ss', expected: round2(25.74 * 1.25), title: 'SS L1 casual' },
    { id: 'CL-04', level: 5, stream: 'ss', expected: round2(29.07 * 1.25), title: 'SS L5 casual' },
    { id: 'CL-05', level: 9, stream: 'ss', expected: round2(36.05 * 1.25), title: 'SS L9 casual' },
  ]) {
    const idFn = c.stream === 'hp' ? hpId : ssId;
    try { const r = await calcShift('casual', idFn(c.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(c.id, c.expected, r.baseHourlyRate, c.title); } catch(e) { recordText(c.id, c.expected, 'ERROR', 'FAIL', e.message); }
  }

  // Junior rates (Support Services only)
  console.log('\n1.4 Junior rates (Support Services): <16=36.8%, 16=47.3%, 17=57.8%, 18=68.3%, 19=82.5%, 20=97.7%');
  const ssL1 = 25.74;
  try { const r = await calcShift('full_time', ssId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 15 }); record('JR-01', round2(ssL1 * 0.368), r.baseHourlyRate, 'SS L1 FT age 15 (36.8%)'); } catch(e) { recordText('JR-01', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', ssId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 16 }); record('JR-02', round2(ssL1 * 0.473), r.baseHourlyRate, 'SS L1 FT age 16 (47.3%)'); } catch(e) { recordText('JR-02', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', ssId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 17 }); record('JR-03', round2(ssL1 * 0.578), r.baseHourlyRate, 'SS L1 FT age 17 (57.8%)'); } catch(e) { recordText('JR-03', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', ssId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 18 }); record('JR-04', round2(ssL1 * 0.683), r.baseHourlyRate, 'SS L1 FT age 18 (68.3%)'); } catch(e) { recordText('JR-04', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', ssId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 19 }); record('JR-05', round2(ssL1 * 0.825), r.baseHourlyRate, 'SS L1 FT age 19 (82.5%)'); } catch(e) { recordText('JR-05', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', ssId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 20 }); record('JR-06', round2(ssL1 * 0.977), r.baseHourlyRate, 'SS L1 FT age 20 (97.7%)'); } catch(e) { recordText('JR-06', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 2 — PENALTY RATES
   ═══════════════════════════════════════════════════════════════════════════ */
async function runPenaltyRateTests() {
  console.log('\n═══ SECTION 2 — PENALTY RATES ═══');

  const hpBase = 29.49; // HP L1 FT
  const hpCas = round2(29.49 * 1.25);
  const ssBase = 25.74; // SS L1 FT
  const ssCas = round2(25.74 * 1.25);

  // HP FT penalties
  console.log('\n2.1 HP FT penalties');
  try { const r = await calcShift('full_time', hpId(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-01', round2(hpBase * 1.50 * 4), payOnly(r), 'HP L1 FT Saturday 4hr (x1.50)'); } catch(e) { recordText('PR-01', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', hpId(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-02', round2(hpBase * 2.00 * 4), payOnly(r), 'HP L1 FT Sunday 4hr (x2.00)'); } catch(e) { recordText('PR-02', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', hpId(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-03', round2(hpBase * 2.50 * 4), payOnly(r), 'HP L1 FT PH 4hr (x2.50)'); } catch(e) { recordText('PR-03', 0, 'ERROR', 'FAIL', e.message); }

  // HP Casual penalties
  console.log('\n2.2 HP Casual penalties');
  try { const r = await calcShift('casual', hpId(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-04', round2(hpCas * 1.50 * 4), payOnly(r), 'HP L1 Casual Saturday 4hr (x1.50)'); } catch(e) { recordText('PR-04', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('casual', hpId(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-05', round2(hpCas * 2.50 * 4), payOnly(r), 'HP L1 Casual PH 4hr (x2.50)'); } catch(e) { recordText('PR-05', 0, 'ERROR', 'FAIL', e.message); }

  // SS FT penalties
  console.log('\n2.3 SS FT penalties');
  try { const r = await calcShift('full_time', ssId(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-06', round2(ssBase * 1.50 * 4), payOnly(r), 'SS L1 FT Saturday 4hr (x1.50)'); } catch(e) { recordText('PR-06', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', ssId(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-07', round2(ssBase * 2.00 * 4), payOnly(r), 'SS L1 FT Sunday 4hr (x2.00)'); } catch(e) { recordText('PR-07', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', ssId(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-08', round2(ssBase * 2.50 * 4), payOnly(r), 'SS L1 FT PH 4hr (x2.50)'); } catch(e) { recordText('PR-08', 0, 'ERROR', 'FAIL', e.message); }

  // SS Casual penalties
  console.log('\n2.4 SS Casual penalties');
  try { const r = await calcShift('casual', ssId(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-09', round2(ssCas * 2.00 * 4), payOnly(r), 'SS L1 Casual Sunday 4hr (x2.00)'); } catch(e) { recordText('PR-09', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 3 — OVERTIME
   ═══════════════════════════════════════════════════════════════════════════ */
async function runOvertimeTests() {
  console.log('\n═══ SECTION 3 — OVERTIME ═══');

  const hpBase = 29.49;
  const ssBase = 25.74;

  // OT rate verification
  console.log('\n3.1 OT rate verification');
  record('OT-01', round2(hpBase * 1.5), round2(hpBase * 1.5), 'HP L1 OT first 2hr = $' + round2(hpBase * 1.5) + ' (x1.50)');
  record('OT-02', round2(ssBase * 2.0), round2(ssBase * 2.0), 'SS L1 OT after 2hr = $' + round2(ssBase * 2.0) + ' (x2.00)');

  // Daily OT (threshold 7.6 hrs) - HP
  console.log('\n3.2 HP Daily overtime (7.6hr threshold)');
  try {
    const r = await calcShift('full_time', hpId(1), REF_MONDAY, '08:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    const expected = round2(7.6 * hpBase + 0.9 * hpBase * 1.5);
    record('DO-01', expected, payOnly(r), 'HP L1 FT 8.5hr day (0.9hr OT at x1.50)');
  } catch(e) { recordText('DO-01', 0, 'ERROR', 'FAIL', e.message); }

  // Daily OT - SS two-tier
  console.log('\n3.3 SS Daily overtime — two tiers');
  try {
    const r = await calcShift('full_time', ssId(1), REF_MONDAY, '07:00', '18:30', { mealBreakTaken: true, mealBreakDuration: 30 });
    const expected = round2(7.6 * ssBase + 2 * ssBase * 1.5 + 1.4 * ssBase * 2.0);
    record('DO-02', expected, payOnly(r), 'SS L1 FT 11hr day (2hr at x1.50 + 1.4hr at x2.00)');
  } catch(e) { recordText('DO-02', 0, 'ERROR', 'FAIL', e.message); }

  // Weekly OT
  console.log('\n3.4 Weekly overtime (38hr threshold)');
  try {
    const shifts = [];
    for (let d = 7; d <= 11; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '08:00', endTime: '17:06', mealBreakTaken: true, mealBreakDuration: 30 });
    const r = await calcMultiShift('full_time', hpId(1), shifts);
    const total = payOnly(r);
    record('WO-01', total, total, 'HP L1 FT 43hr week — total $' + total);
  } catch(e) { recordText('WO-01', 0, 'ERROR', 'FAIL', e.message); }
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
      if (row.allowance_type === 'meal') record('AL-01', 16.62, amt, 'Meal allowance');
      if (row.allowance_type === 'vehicle') record('AL-02', 0.99, amt, 'Vehicle allowance per km');
      if (row.allowance_type === 'uniform') record('AL-03', 6.24, amt, 'Uniform allowance');
    }
  } catch(e) { recordText('AL-01', 'N/A', 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 5 — SUPERANNUATION
   ═══════════════════════════════════════════════════════════════════════════ */
async function runSuperTests() {
  console.log('\n═══ SECTION 5 — SUPERANNUATION ═══');
  try { const r = await calcShift('full_time', hpId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('SU-01', 0.12, r.summary.sgcRate, 'SGC 12%'); } catch(e) { recordText('SU-01', 0.12, 'ERROR', 'FAIL', e.message); }
  try {
    const r = await calcShift('full_time', hpId(1), REF_MONDAY, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    const ote = round2(7.5 * 29.49);
    const expectedSuper = round2(ote * 0.12);
    record('SU-02', expectedSuper, round2(r.summary.superAmount || 0), 'Super on 7.5hr ordinary HP L1');
  } catch(e) { recordText('SU-02', 0, 'ERROR', 'FAIL', e.message); }
  try {
    const r = await calcShift('full_time', ssId(5), REF_MONDAY, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    const ote = round2(7.5 * 29.07);
    const expectedSuper = round2(ote * 0.12);
    record('SU-03', expectedSuper, round2(r.summary.superAmount || 0), 'Super on 7.5hr ordinary SS L5');
  } catch(e) { recordText('SU-03', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 6 — COMPLEX SCENARIOS
   ═══════════════════════════════════════════════════════════════════════════ */
async function runComplexTests() {
  console.log('\n═══ SECTION 6 — COMPLEX SCENARIOS ═══');

  // HP L1 standard week
  console.log('\n6.1 HP L1 standard week Mon-Fri');
  try {
    const shifts = [];
    for (let d = 7; d <= 11; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '09:00', endTime: '17:06', mealBreakTaken: true, mealBreakDuration: 30 });
    const r = await calcMultiShift('full_time', hpId(1), shifts);
    const expected = round2(38 * 29.49);
    record('CS-01', expected, payOnly(r), 'HP L1 FT standard 38hr week');
  } catch(e) { recordText('CS-01', 0, 'ERROR', 'FAIL', e.message); }

  // SS L1 Mon-Sat week
  console.log('\n6.2 SS L1 Mon-Sat week');
  try {
    const shifts = [];
    for (let d = 7; d <= 12; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '09:00', endTime: '17:00', mealBreakTaken: true, mealBreakDuration: 30 });
    const r = await calcMultiShift('full_time', ssId(1), shifts);
    const total = payOnly(r);
    record('CS-02', total, total, 'SS L1 FT Mon-Sat 45hr week = $' + total);
  } catch(e) { recordText('CS-02', 0, 'ERROR', 'FAIL', e.message); }

  // HP Casual L2 PH
  console.log('\n6.3 HP Casual L2 PH 4hr');
  try {
    const casHP2 = round2(37.53 * 1.25);
    const r = await calcShift('casual', hpId(2), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] });
    record('CS-03', round2(casHP2 * 2.50 * 4), payOnly(r), 'HP L2 Casual PH 4hr (x2.50)');
  } catch(e) { recordText('CS-03', 0, 'ERROR', 'FAIL', e.message); }

  // SS L3 FT PH full day
  console.log('\n6.4 SS L3 FT PH full day');
  try {
    const r = await calcShift('full_time', ssId(3), REF_PH, '09:00', '17:06', { mealBreakTaken: true, mealBreakDuration: 30, publicHolidays: [REF_PH] });
    record('CS-04', round2(27.79 * 2.50 * 7.6), payOnly(r), 'SS L3 FT PH 7.6hr (x2.50)');
  } catch(e) { recordText('CS-04', 0, 'ERROR', 'FAIL', e.message); }

  // Week with PH
  console.log('\n6.5 HP L1 week with PH on Wednesday');
  try {
    const phDate = '2025-07-09';
    const shifts = [];
    for (let d = 7; d <= 11; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '09:00', endTime: '17:06', mealBreakTaken: true, mealBreakDuration: 30 });
    const r = await calcMultiShift('full_time', hpId(1), shifts, { publicHolidays: [phDate] });
    const total = payOnly(r);
    record('CS-05', total, total, 'HP L1 FT 38hr week with Wed PH = $' + total);
  } catch(e) { recordText('CS-05', 0, 'ERROR', 'FAIL', e.message); }

  // Junior SS casual
  console.log('\n6.6 Junior SS casual L1 age 17 weekday');
  try {
    const juniorBase = round2(25.74 * 0.578);
    const juniorCas = round2(juniorBase * 1.25);
    const r = await calcShift('casual', ssId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 17 });
    record('CS-06', round2(juniorCas * 4), payOnly(r), 'Junior SS casual L1 age 17 Mon 4hr');
  } catch(e) { recordText('CS-06', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 7 — REGRESSION
   ═══════════════════════════════════════════════════════════════════════════ */
async function runRegressionTests() {
  console.log('\n═══ SECTION 7 — REGRESSION ═══');

  try {
    const r = await calcShift('full_time', hpId(3), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-01', round2(43.81 * 4), payOnly(r), 'HP L3 FT Mon 4hr = $43.81 x 4');
  } catch(e) { recordText('RT-01', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('casual', ssId(6), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-02', round2(round2(30.64 * 1.25) * 4), payOnly(r), 'SS L6 casual Mon 4hr');
  } catch(e) { recordText('RT-02', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', ssId(1), REF_SATURDAY, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    record('RT-03', round2(25.74 * 1.50 * 7.5), payOnly(r), 'SS L1 FT Saturday 7.5hr (x1.50)');
  } catch(e) { recordText('RT-03', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', hpId(4), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-04', round2(53.05 * 2.00 * 4), payOnly(r), 'HP L4 FT Sunday 4hr (x2.00)');
  } catch(e) { recordText('RT-04', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', ssId(9), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-05', round2(36.05 * 4), payOnly(r), 'SS L9 FT Mon 4hr spot check');
  } catch(e) { recordText('RT-05', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN
   ═══════════════════════════════════════════════════════════════════════════ */
async function main() {
  console.log('WageCheck Health Professionals and Support Services Award Test Runner — MA000027');
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
