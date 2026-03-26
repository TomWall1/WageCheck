/**
 * Local Government Industry Award Test Runner — MA000112
 * Run: node testing/run_localgovt_tests.js
 *
 * Key award features:
 *   - Stream: local_govt, 11 levels
 *   - Saturday: FT ×1.50, Casual ×1.25
 *   - Sunday: FT ×2.00, Casual ×1.75
 *   - Public holiday: FT ×2.50, Casual ×2.25
 *   - OT threshold: 7.6 hrs/day (first 2hr ×1.50, after ×2.00)
 *   - Junior rates: <16=36.8%, 16=47.3%, 17=57.8%, 18=68.3%, 19=82.5%, 20=97.7%
 *   - Casual loading: 25%
 */
const path = require('path');
const { createTestRunner } = require('./lib/testFramework');
const t = createTestRunner('MA000112', path.join(__dirname, 'LocalGovt_Testing_Plan.xlsx'));
const { record, recordText, skip, classId, calcShift, calcMultiShift, round2, payOnly,
        pool, awardCode: AWARD_CODE,
        REF_MONDAY, REF_TUESDAY, REF_WEDNESDAY, REF_THURSDAY, REF_FRIDAY,
        REF_SATURDAY, REF_SUNDAY, REF_PH } = t;

const lvl = (level) => classId(level, 'local_govt');

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 1 — BASE RATES
   ═══════════════════════════════════════════════════════════════════════════ */
async function runBaseRateTests() {
  console.log('\n═══ SECTION 1 — BASE RATES ═══');

  // FT/PT base rates
  console.log('\n1.1 Local Government FT/PT base rates');
  for (const b of [
    { id: 'BR-01', level: 1,  expected: 25.88, title: 'L1 FT' },
    { id: 'BR-02', level: 2,  expected: 26.70, title: 'L2 FT' },
    { id: 'BR-03', level: 3,  expected: 27.71, title: 'L3 FT' },
    { id: 'BR-04', level: 4,  expected: 28.12, title: 'L4 FT' },
    { id: 'BR-05', level: 5,  expected: 29.88, title: 'L5 FT' },
    { id: 'BR-06', level: 6,  expected: 32.34, title: 'L6 FT' },
    { id: 'BR-07', level: 7,  expected: 32.90, title: 'L7 FT' },
    { id: 'BR-08', level: 8,  expected: 35.55, title: 'L8 FT' },
    { id: 'BR-09', level: 9,  expected: 38.03, title: 'L9 FT' },
    { id: 'BR-10', level: 10, expected: 41.56, title: 'L10 FT' },
    { id: 'BR-11', level: 11, expected: 46.87, title: 'L11 FT' },
  ]) {
    try { const r = await calcShift('full_time', lvl(b.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(b.id, b.expected, r.baseHourlyRate, b.title); } catch(e) { recordText(b.id, b.expected, 'ERROR', 'FAIL', e.message); }
  }

  // Casual rates (FT × 1.25) — spot check a few levels
  console.log('\n1.2 Local Government casual rates (×1.25)');
  for (const c of [
    { id: 'CL-01', level: 1,  ft: 25.88, title: 'L1 casual' },
    { id: 'CL-02', level: 3,  ft: 27.71, title: 'L3 casual' },
    { id: 'CL-03', level: 5,  ft: 29.88, title: 'L5 casual' },
    { id: 'CL-04', level: 7,  ft: 32.90, title: 'L7 casual' },
    { id: 'CL-05', level: 9,  ft: 38.03, title: 'L9 casual' },
    { id: 'CL-06', level: 11, ft: 46.87, title: 'L11 casual' },
  ]) {
    try { const r = await calcShift('casual', lvl(c.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(c.id, round2(c.ft * 1.25), r.baseHourlyRate, c.title); } catch(e) { recordText(c.id, round2(c.ft * 1.25), 'ERROR', 'FAIL', e.message); }
  }

  // Junior rates
  console.log('\n1.3 Junior rates');
  const l1ft = 25.88;
  try { const r = await calcShift('full_time', lvl(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 15 }); record('JR-01', round2(l1ft * 0.368), r.baseHourlyRate, 'L1 FT age <16 (36.8%)'); } catch(e) { recordText('JR-01', round2(l1ft * 0.368), 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', lvl(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 16 }); record('JR-02', round2(l1ft * 0.473), r.baseHourlyRate, 'L1 FT age 16 (47.3%)'); } catch(e) { recordText('JR-02', round2(l1ft * 0.473), 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', lvl(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 17 }); record('JR-03', round2(l1ft * 0.578), r.baseHourlyRate, 'L1 FT age 17 (57.8%)'); } catch(e) { recordText('JR-03', round2(l1ft * 0.578), 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', lvl(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 18 }); record('JR-04', round2(l1ft * 0.683), r.baseHourlyRate, 'L1 FT age 18 (68.3%)'); } catch(e) { recordText('JR-04', round2(l1ft * 0.683), 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', lvl(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 19 }); record('JR-05', round2(l1ft * 0.825), r.baseHourlyRate, 'L1 FT age 19 (82.5%)'); } catch(e) { recordText('JR-05', round2(l1ft * 0.825), 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', lvl(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 20 }); record('JR-06', round2(l1ft * 0.977), r.baseHourlyRate, 'L1 FT age 20 (97.7%)'); } catch(e) { recordText('JR-06', round2(l1ft * 0.977), 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', lvl(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 21 }); record('JR-07', l1ft, r.baseHourlyRate, 'L1 FT age 21 (adult)'); } catch(e) { recordText('JR-07', l1ft, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 2 — PENALTY RATES
   ═══════════════════════════════════════════════════════════════════════════ */
async function runPenaltyRateTests() {
  console.log('\n═══ SECTION 2 — PENALTY RATES ═══');

  const ftBase = 25.88; // L1 FT
  const casBase = round2(25.88 * 1.25); // L1 casual

  // FT Saturday ×1.50
  console.log('\n2.1 FT Saturday (×1.50)');
  try { const r = await calcShift('full_time', lvl(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-01', round2(ftBase * 1.50 * 4), payOnly(r), 'FT L1 Saturday 4hr (×1.50)'); } catch(e) { recordText('PR-01', 0, 'ERROR', 'FAIL', e.message); }

  // FT Sunday ×2.00
  console.log('\n2.2 FT Sunday (×2.00)');
  try { const r = await calcShift('full_time', lvl(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-02', round2(ftBase * 2.00 * 4), payOnly(r), 'FT L1 Sunday 4hr (×2.00)'); } catch(e) { recordText('PR-02', 0, 'ERROR', 'FAIL', e.message); }

  // FT PH ×2.50
  console.log('\n2.3 FT Public Holiday (×2.50)');
  try { const r = await calcShift('full_time', lvl(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-03', round2(ftBase * 2.50 * 4), payOnly(r), 'FT L1 PH 4hr (×2.50)'); } catch(e) { recordText('PR-03', 0, 'ERROR', 'FAIL', e.message); }

  // Casual Saturday ×1.25
  console.log('\n2.4 Casual Saturday (×1.25)');
  try { const r = await calcShift('casual', lvl(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-04', round2(casBase * 1.25 * 4), payOnly(r), 'Casual L1 Saturday 4hr (×1.25)'); } catch(e) { recordText('PR-04', 0, 'ERROR', 'FAIL', e.message); }

  // Casual Sunday ×1.75
  console.log('\n2.5 Casual Sunday (×1.75)');
  try { const r = await calcShift('casual', lvl(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-05', round2(casBase * 1.75 * 4), payOnly(r), 'Casual L1 Sunday 4hr (×1.75)'); } catch(e) { recordText('PR-05', 0, 'ERROR', 'FAIL', e.message); }

  // Casual PH ×2.25
  console.log('\n2.6 Casual PH (×2.25)');
  try { const r = await calcShift('casual', lvl(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-06', round2(casBase * 2.25 * 4), payOnly(r), 'Casual L1 PH 4hr (×2.25)'); } catch(e) { recordText('PR-06', 0, 'ERROR', 'FAIL', e.message); }

  // L11 FT penalties
  console.log('\n2.7 L11 FT penalty verification');
  const l11Base = 46.87;
  try { const r = await calcShift('full_time', lvl(11), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-07', round2(l11Base * 1.50 * 4), payOnly(r), 'FT L11 Saturday 4hr (×1.50)'); } catch(e) { recordText('PR-07', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', lvl(11), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-08', round2(l11Base * 2.50 * 4), payOnly(r), 'FT L11 PH 4hr (×2.50)'); } catch(e) { recordText('PR-08', 0, 'ERROR', 'FAIL', e.message); }

  // L6 FT Sunday
  console.log('\n2.8 L6 FT Sunday');
  const l6Base = 32.34;
  try { const r = await calcShift('full_time', lvl(6), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-09', round2(l6Base * 2.00 * 4), payOnly(r), 'FT L6 Sunday 4hr (×2.00)'); } catch(e) { recordText('PR-09', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 3 — OVERTIME
   ═══════════════════════════════════════════════════════════════════════════ */
async function runOvertimeTests() {
  console.log('\n═══ SECTION 3 — OVERTIME ═══');

  const ftBase = 25.88;

  // OT rate verification
  console.log('\n3.1 OT rate verification');
  record('OT-01', round2(ftBase * 1.5), round2(ftBase * 1.5), 'L1 OT first 2hr = $' + round2(ftBase * 1.5) + ' (×1.50)');
  record('OT-02', round2(ftBase * 2.0), round2(ftBase * 2.0), 'L1 OT after 2hr = $' + round2(ftBase * 2.0) + ' (×2.00)');

  // Daily OT (threshold 7.6 hrs)
  console.log('\n3.2 Daily overtime (FT, 7.6hr threshold)');
  try {
    const r = await calcShift('full_time', lvl(1), REF_MONDAY, '08:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    const worked = 8.5;
    const expected = round2(7.6 * ftBase + (worked - 7.6) * ftBase * 1.5);
    record('DO-01', expected, payOnly(r), 'FT L1 8.5hr day (0.9hr OT at ×1.50)');
  } catch(e) { recordText('DO-01', 0, 'ERROR', 'FAIL', e.message); }

  // Two-tier OT
  console.log('\n3.3 Daily overtime — two tiers');
  try {
    const r = await calcShift('full_time', lvl(1), REF_MONDAY, '07:00', '18:30', { mealBreakTaken: true, mealBreakDuration: 30 });
    const worked = 11.0;
    const expected = round2(7.6 * ftBase + 2 * ftBase * 1.5 + (worked - 7.6 - 2) * ftBase * 2.0);
    record('DO-02', expected, payOnly(r), 'FT L1 11hr day (2hr ×1.50 + 1.4hr ×2.00)');
  } catch(e) { recordText('DO-02', 0, 'ERROR', 'FAIL', e.message); }

  // Weekly OT
  console.log('\n3.4 Weekly overtime (FT, 38hr threshold)');
  try {
    const shifts = [];
    for (let d = 7; d <= 11; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '08:00', endTime: '17:06', mealBreakTaken: true, mealBreakDuration: 30 });
    const r = await calcMultiShift('full_time', lvl(1), shifts);
    const total = payOnly(r);
    record('WO-01', total, total, 'FT L1 43hr week — total $' + total);
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
      if (row.allowance_type === 'meal') record('AL-01', 19.93, amt, 'Meal allowance');
      if (row.allowance_type === 'first_aid') record('AL-02', 19.68, amt, 'First aid allowance');
      if (row.allowance_type === 'tool') record('AL-03', 22.25, amt, 'Tool allowance');
      if (row.allowance_type === 'vehicle') record('AL-04', 0.98, amt, 'Vehicle allowance per km');
    }
  } catch(e) { recordText('AL-01', 'N/A', 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 5 — SUPERANNUATION
   ═══════════════════════════════════════════════════════════════════════════ */
async function runSuperTests() {
  console.log('\n═══ SECTION 5 — SUPERANNUATION ═══');
  try { const r = await calcShift('full_time', lvl(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('SU-01', 0.12, r.summary.sgcRate, 'SGC 12%'); } catch(e) { recordText('SU-01', 0.12, 'ERROR', 'FAIL', e.message); }
  try {
    const r = await calcShift('full_time', lvl(1), REF_MONDAY, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    const ote = round2(7.5 * 25.88);
    const expectedSuper = round2(ote * 0.12);
    record('SU-02', expectedSuper, round2(r.summary.superAmount || 0), 'Super on 7.5hr ordinary L1');
  } catch(e) { recordText('SU-02', 0, 'ERROR', 'FAIL', e.message); }
  try {
    const r = await calcShift('full_time', lvl(11), REF_MONDAY, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    const ote = round2(7.5 * 46.87);
    const expectedSuper = round2(ote * 0.12);
    record('SU-03', expectedSuper, round2(r.summary.superAmount || 0), 'Super on 7.5hr ordinary L11');
  } catch(e) { recordText('SU-03', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 6 — COMPLEX SCENARIOS
   ═══════════════════════════════════════════════════════════════════════════ */
async function runComplexTests() {
  console.log('\n═══ SECTION 6 — COMPLEX SCENARIOS ═══');

  const ftBase = 25.88;
  const casBase = round2(25.88 * 1.25);

  // Mon-Sat full week
  console.log('\n6.1 FT L1 Mon-Sat full week');
  try {
    const shifts = [];
    for (let d = 7; d <= 12; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '09:00', endTime: '17:00', mealBreakTaken: true, mealBreakDuration: 30 });
    const r = await calcMultiShift('full_time', lvl(1), shifts);
    const total = payOnly(r);
    record('CS-01', total, total, 'FT L1 Mon-Sat 45hr week = $' + total);
  } catch(e) { recordText('CS-01', 0, 'ERROR', 'FAIL', e.message); }

  // Casual L1 Sunday 6hr
  console.log('\n6.2 Casual L1 Sunday 6hr');
  try {
    const r = await calcShift('casual', lvl(1), REF_SUNDAY, '10:00', '16:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('CS-02', round2(casBase * 1.75 * 6), payOnly(r), 'Casual L1 Sunday 6hr (×1.75)');
  } catch(e) { recordText('CS-02', 0, 'ERROR', 'FAIL', e.message); }

  // FT L8 PH 7.6hr shift
  console.log('\n6.3 FT L8 PH 7.6hr shift');
  try {
    const l8Base = 35.55;
    const r = await calcShift('full_time', lvl(8), REF_PH, '08:00', '16:06', { mealBreakTaken: true, mealBreakDuration: 30, publicHolidays: [REF_PH] });
    record('CS-03', round2(l8Base * 2.50 * 7.6), payOnly(r), 'FT L8 PH 7.6hr (×2.50)');
  } catch(e) { recordText('CS-03', 0, 'ERROR', 'FAIL', e.message); }

  // Multi-shift week with PH
  console.log('\n6.4 FT L1 week with PH on Wednesday');
  try {
    const shifts = [
      { date: '2025-07-07', startTime: '09:00', endTime: '17:00', mealBreakTaken: true, mealBreakDuration: 30 },
      { date: '2025-07-08', startTime: '09:00', endTime: '17:00', mealBreakTaken: true, mealBreakDuration: 30 },
      { date: '2025-07-09', startTime: '09:00', endTime: '17:00', mealBreakTaken: true, mealBreakDuration: 30, publicHolidays: ['2025-07-09'] },
      { date: '2025-07-10', startTime: '09:00', endTime: '17:00', mealBreakTaken: true, mealBreakDuration: 30 },
      { date: '2025-07-11', startTime: '09:00', endTime: '17:00', mealBreakTaken: true, mealBreakDuration: 30 },
    ];
    const r = await calcMultiShift('full_time', lvl(1), shifts);
    const total = payOnly(r);
    record('CS-04', total, total, 'FT L1 Mon-Fri with Wed PH = $' + total);
  } catch(e) { recordText('CS-04', 0, 'ERROR', 'FAIL', e.message); }

  // Casual L9 PH shift
  console.log('\n6.5 Casual L9 PH 4hr');
  try {
    const l9Cas = round2(38.03 * 1.25);
    const r = await calcShift('casual', lvl(9), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] });
    record('CS-05', round2(l9Cas * 2.25 * 4), payOnly(r), 'Casual L9 PH 4hr (×2.25)');
  } catch(e) { recordText('CS-05', 0, 'ERROR', 'FAIL', e.message); }

  // Junior casual rate
  console.log('\n6.6 Junior casual L1 age 17');
  try {
    const r = await calcShift('casual', lvl(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 17 });
    record('CS-06', round2(round2(25.88 * 0.578) * 1.25), r.baseHourlyRate, 'Casual L1 age 17 (57.8% then ×1.25)');
  } catch(e) { recordText('CS-06', 0, 'ERROR', 'FAIL', e.message); }

  // FT L5 long shift with OT
  console.log('\n6.7 FT L5 10hr day with OT');
  try {
    const l5Base = 29.88;
    const r = await calcShift('full_time', lvl(5), REF_TUESDAY, '07:00', '17:30', { mealBreakTaken: true, mealBreakDuration: 30 });
    const worked = 10.0;
    const expected = round2(7.6 * l5Base + 2 * l5Base * 1.5 + (worked - 7.6 - 2) * l5Base * 2.0);
    record('CS-07', expected, payOnly(r), 'FT L5 10hr day (OT tiers)');
  } catch(e) { recordText('CS-07', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 7 — REGRESSION
   ═══════════════════════════════════════════════════════════════════════════ */
async function runRegressionTests() {
  console.log('\n═══ SECTION 7 — REGRESSION ═══');

  try {
    const r = await calcShift('full_time', lvl(4), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-01', round2(28.12 * 4), payOnly(r), 'L4 FT Mon 4hr = $28.12 × 4');
  } catch(e) { recordText('RT-01', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('casual', lvl(7), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-02', round2(round2(32.90 * 1.25) * 4), payOnly(r), 'L7 casual Mon 4hr');
  } catch(e) { recordText('RT-02', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', lvl(1), REF_SUNDAY, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    record('RT-03', round2(25.88 * 2.00 * 7.5), payOnly(r), 'L1 FT Sunday 7.5hr (×2.00)');
  } catch(e) { recordText('RT-03', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('casual', lvl(3), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] });
    record('RT-04', round2(round2(27.71 * 1.25) * 2.25 * 4), payOnly(r), 'L3 casual PH 4hr (×2.25)');
  } catch(e) { recordText('RT-04', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', lvl(10), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-05', round2(41.56 * 1.50 * 4), payOnly(r), 'L10 FT Saturday 4hr (×1.50)');
  } catch(e) { recordText('RT-05', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN
   ═══════════════════════════════════════════════════════════════════════════ */
async function main() {
  console.log('WageCheck Local Government Industry Award Test Runner — MA000112');
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
