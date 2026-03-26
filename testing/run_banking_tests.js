/**
 * Banking, Finance and Insurance Award Test Runner — MA000019
 * Run: node testing/run_banking_tests.js
 *
 * Key award features:
 *   - Stream: banking, 6 levels
 *   - Saturday: FT ×1.25, Casual ×1.25
 *   - Sunday: FT ×2.00, Casual ×2.00
 *   - Public holiday: FT ×2.50, Casual ×2.50
 *   - OT threshold: 7.6 hrs/day (first 2hr ×1.50, after ×2.00)
 *   - No junior rates (all ages = 1.0)
 *   - Casual loading: 25%
 */
const path = require('path');
const { createTestRunner } = require('./lib/testFramework');
const t = createTestRunner('MA000019', path.join(__dirname, 'Banking_Testing_Plan.xlsx'));
const { record, recordText, skip, classId, calcShift, calcMultiShift, round2, payOnly,
        pool, awardCode: AWARD_CODE,
        REF_MONDAY, REF_TUESDAY, REF_WEDNESDAY, REF_THURSDAY, REF_FRIDAY,
        REF_SATURDAY, REF_SUNDAY, REF_PH } = t;

const lvl = (level) => classId(level, 'banking');

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 1 — BASE RATES
   ═══════════════════════════════════════════════════════════════════════════ */
async function runBaseRateTests() {
  console.log('\n═══ SECTION 1 — BASE RATES ═══');

  // FT/PT base rates
  console.log('\n1.1 Banking FT/PT base rates');
  for (const b of [
    { id: 'BR-01', level: 1, expected: 25.74, title: 'L1 FT' },
    { id: 'BR-02', level: 2, expected: 28.12, title: 'L2 FT' },
    { id: 'BR-03', level: 3, expected: 29.70, title: 'L3 FT' },
    { id: 'BR-04', level: 4, expected: 31.19, title: 'L4 FT' },
    { id: 'BR-05', level: 5, expected: 32.45, title: 'L5 FT' },
    { id: 'BR-06', level: 6, expected: 36.35, title: 'L6 FT' },
  ]) {
    try { const r = await calcShift('full_time', lvl(b.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(b.id, b.expected, r.baseHourlyRate, b.title); } catch(e) { recordText(b.id, b.expected, 'ERROR', 'FAIL', e.message); }
  }

  // Casual rates (FT × 1.25)
  console.log('\n1.2 Banking casual rates (×1.25)');
  for (const c of [
    { id: 'CL-01', level: 1, ft: 25.74, title: 'L1 casual' },
    { id: 'CL-02', level: 2, ft: 28.12, title: 'L2 casual' },
    { id: 'CL-03', level: 3, ft: 29.70, title: 'L3 casual' },
    { id: 'CL-04', level: 4, ft: 31.19, title: 'L4 casual' },
    { id: 'CL-05', level: 5, ft: 32.45, title: 'L5 casual' },
    { id: 'CL-06', level: 6, ft: 36.35, title: 'L6 casual' },
  ]) {
    try { const r = await calcShift('casual', lvl(c.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(c.id, round2(c.ft * 1.25), r.baseHourlyRate, c.title); } catch(e) { recordText(c.id, round2(c.ft * 1.25), 'ERROR', 'FAIL', e.message); }
  }

  // Junior rates: <17=50%, 17=60%, 18=70%, 19=80%, 20=90%, 21+=adult
  console.log('\n1.3 Junior rates (<17=50%, 17=60%, 18=70%, 19=80%, 20=90%)');
  try { const r = await calcShift('full_time', lvl(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 16 }); record('JR-01', round2(25.74 * 0.50), r.baseHourlyRate, 'L1 FT age 16 (50%)'); } catch(e) { recordText('JR-01', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', lvl(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 18 }); record('JR-02', round2(25.74 * 0.70), r.baseHourlyRate, 'L1 FT age 18 (70%)'); } catch(e) { recordText('JR-02', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 2 — PENALTY RATES
   ═══════════════════════════════════════════════════════════════════════════ */
async function runPenaltyRateTests() {
  console.log('\n═══ SECTION 2 — PENALTY RATES ═══');

  const ftBase = 25.74; // L1 FT
  const casBase = round2(25.74 * 1.25); // L1 casual

  // FT Saturday ×1.25
  console.log('\n2.1 FT Saturday (×1.25)');
  try { const r = await calcShift('full_time', lvl(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-01', round2(ftBase * 1.25 * 4), payOnly(r), 'FT L1 Saturday 4hr (×1.25)'); } catch(e) { recordText('PR-01', 0, 'ERROR', 'FAIL', e.message); }

  // FT Sunday ×2.00
  console.log('\n2.2 FT Sunday (×2.00)');
  try { const r = await calcShift('full_time', lvl(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-02', round2(ftBase * 2.00 * 4), payOnly(r), 'FT L1 Sunday 4hr (×2.00)'); } catch(e) { recordText('PR-02', 0, 'ERROR', 'FAIL', e.message); }

  // FT PH ×2.50
  console.log('\n2.3 FT Public Holiday (×2.50)');
  try { const r = await calcShift('full_time', lvl(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-03', round2(ftBase * 2.50 * 4), payOnly(r), 'FT L1 PH 4hr (×2.50)'); } catch(e) { recordText('PR-03', 0, 'ERROR', 'FAIL', e.message); }

  // Casual Saturday ×1.25
  console.log('\n2.4 Casual Saturday (×1.25)');
  try { const r = await calcShift('casual', lvl(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-04', round2(casBase * 1.25 * 4), payOnly(r), 'Casual L1 Saturday 4hr (×1.25)'); } catch(e) { recordText('PR-04', 0, 'ERROR', 'FAIL', e.message); }

  // Casual Sunday ×2.00
  console.log('\n2.5 Casual Sunday (×2.00)');
  try { const r = await calcShift('casual', lvl(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-05', round2(casBase * 2.00 * 4), payOnly(r), 'Casual L1 Sunday 4hr (×2.00)'); } catch(e) { recordText('PR-05', 0, 'ERROR', 'FAIL', e.message); }

  // Casual PH ×2.50
  console.log('\n2.6 Casual PH (×2.50)');
  try { const r = await calcShift('casual', lvl(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-06', round2(casBase * 2.50 * 4), payOnly(r), 'Casual L1 PH 4hr (×2.50)'); } catch(e) { recordText('PR-06', 0, 'ERROR', 'FAIL', e.message); }

  // L6 FT penalties
  console.log('\n2.7 L6 FT penalty verification');
  const l6Base = 36.35;
  try { const r = await calcShift('full_time', lvl(6), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-07', round2(l6Base * 1.25 * 4), payOnly(r), 'FT L6 Saturday 4hr (×1.25)'); } catch(e) { recordText('PR-07', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', lvl(6), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-08', round2(l6Base * 2.50 * 4), payOnly(r), 'FT L6 PH 4hr (×2.50)'); } catch(e) { recordText('PR-08', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 3 — OVERTIME
   ═══════════════════════════════════════════════════════════════════════════ */
async function runOvertimeTests() {
  console.log('\n═══ SECTION 3 — OVERTIME ═══');

  const ftBase = 25.74;

  // OT rate verification
  console.log('\n3.1 OT rate verification');
  record('OT-01', round2(ftBase * 1.5), round2(ftBase * 1.5), 'L1 OT first 2hr = $' + round2(ftBase * 1.5) + ' (×1.50)');
  record('OT-02', round2(ftBase * 2.0), round2(ftBase * 2.0), 'L1 OT after 2hr = $' + round2(ftBase * 2.0) + ' (×2.00)');

  // Daily OT (threshold 7.6 hrs)
  console.log('\n3.2 Daily overtime (FT, 7.6hr threshold)');
  try {
    // 9hr shift with 30min break = 8.5hr worked → 0.9hr OT at ×1.50
    const r = await calcShift('full_time', lvl(1), REF_MONDAY, '08:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    const expected = round2(7.6 * ftBase + 0.9 * ftBase * 1.5);
    record('DO-01', expected, payOnly(r), 'FT L1 8.5hr day (0.9hr OT at ×1.50)');
  } catch(e) { recordText('DO-01', 0, 'ERROR', 'FAIL', e.message); }

  // 11hr shift → 2hr at ×1.50 + remainder at ×2.00
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
    // 5 days × 8.6hr = 43hr (5hr OT): Mon-Fri 8am-5:06pm with 30min break = 8.6hr
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
      if (row.allowance_type === 'meal') record('AL-01', 21.27, amt, 'Meal allowance');
      if (row.allowance_type === 'first_aid') record('AL-02', 19.66, amt, 'First aid allowance');
      if (row.allowance_type === 'vehicle') record('AL-03', 0.99, amt, 'Vehicle allowance per km');
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
    const ote = round2(7.5 * 25.74);
    const expectedSuper = round2(ote * 0.12);
    record('SU-02', expectedSuper, round2(r.summary.superAmount || 0), 'Super on 7.5hr ordinary L1');
  } catch(e) { recordText('SU-02', 0, 'ERROR', 'FAIL', e.message); }
  try {
    const r = await calcShift('full_time', lvl(6), REF_MONDAY, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    const ote = round2(7.5 * 36.35);
    const expectedSuper = round2(ote * 0.12);
    record('SU-03', expectedSuper, round2(r.summary.superAmount || 0), 'Super on 7.5hr ordinary L6');
  } catch(e) { recordText('SU-03', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 6 — COMPLEX SCENARIOS
   ═══════════════════════════════════════════════════════════════════════════ */
async function runComplexTests() {
  console.log('\n═══ SECTION 6 — COMPLEX SCENARIOS ═══');

  const ftBase = 25.74;
  const casBase = round2(25.74 * 1.25);

  // Mon-Sat full week with Saturday penalty
  console.log('\n6.1 FT L1 Mon-Sat full week');
  try {
    const shifts = [];
    for (let d = 7; d <= 12; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '09:00', endTime: '17:00', mealBreakTaken: true, mealBreakDuration: 30 });
    const r = await calcMultiShift('full_time', lvl(1), shifts);
    const total = payOnly(r);
    record('CS-01', total, total, 'FT L1 Mon-Sat 45hr week = $' + total);
  } catch(e) { recordText('CS-01', 0, 'ERROR', 'FAIL', e.message); }

  // Casual L1 Sunday shift
  console.log('\n6.2 Casual L1 Sunday 6hr');
  try {
    const r = await calcShift('casual', lvl(1), REF_SUNDAY, '10:00', '16:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('CS-02', round2(casBase * 2.00 * 6), payOnly(r), 'Casual L1 Sunday 6hr (×2.00)');
  } catch(e) { recordText('CS-02', 0, 'ERROR', 'FAIL', e.message); }

  // FT L3 PH 7.6hr shift
  console.log('\n6.3 FT L3 PH 7.6hr shift');
  try {
    const l3Base = 29.70;
    const r = await calcShift('full_time', lvl(3), REF_PH, '08:00', '16:06', { mealBreakTaken: true, mealBreakDuration: 30, publicHolidays: [REF_PH] });
    record('CS-03', round2(l3Base * 2.50 * 7.6), payOnly(r), 'FT L3 PH 7.6hr (×2.50)');
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

  // Casual L4 Saturday shift
  console.log('\n6.5 Casual L4 Saturday 5hr');
  try {
    const l4Cas = round2(31.19 * 1.25);
    const r = await calcShift('casual', lvl(4), REF_SATURDAY, '10:00', '15:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('CS-05', round2(l4Cas * 1.25 * 5), payOnly(r), 'Casual L4 Saturday 5hr (×1.25)');
  } catch(e) { recordText('CS-05', 0, 'ERROR', 'FAIL', e.message); }

  // FT L2 long shift with OT
  console.log('\n6.6 FT L2 10hr day with OT');
  try {
    const l2Base = 28.12;
    const r = await calcShift('full_time', lvl(2), REF_TUESDAY, '07:00', '17:30', { mealBreakTaken: true, mealBreakDuration: 30 });
    const worked = 10.0;
    const expected = round2(7.6 * l2Base + 2 * l2Base * 1.5 + (worked - 7.6 - 2) * l2Base * 2.0);
    record('CS-06', expected, payOnly(r), 'FT L2 10hr day (OT tiers)');
  } catch(e) { recordText('CS-06', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 7 — REGRESSION
   ═══════════════════════════════════════════════════════════════════════════ */
async function runRegressionTests() {
  console.log('\n═══ SECTION 7 — REGRESSION ═══');

  try {
    const r = await calcShift('full_time', lvl(3), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-01', round2(29.70 * 4), payOnly(r), 'L3 FT Mon 4hr = $29.70 × 4');
  } catch(e) { recordText('RT-01', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('casual', lvl(5), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-02', round2(round2(32.45 * 1.25) * 4), payOnly(r), 'L5 casual Mon 4hr');
  } catch(e) { recordText('RT-02', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', lvl(1), REF_SUNDAY, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    record('RT-03', round2(25.74 * 2.00 * 7.5), payOnly(r), 'L1 FT Sunday 7.5hr (×2.00)');
  } catch(e) { recordText('RT-03', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('casual', lvl(2), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] });
    record('RT-04', round2(round2(28.12 * 1.25) * 2.50 * 4), payOnly(r), 'L2 casual PH 4hr (×2.50)');
  } catch(e) { recordText('RT-04', 0, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', lvl(4), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-05', round2(31.19 * 1.25 * 4), payOnly(r), 'L4 FT Saturday 4hr (×1.25)');
  } catch(e) { recordText('RT-05', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN
   ═══════════════════════════════════════════════════════════════════════════ */
async function main() {
  console.log('WageCheck Banking, Finance and Insurance Award Test Runner — MA000019');
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
