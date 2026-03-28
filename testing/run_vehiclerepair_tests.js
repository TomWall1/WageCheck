/**
 * Vehicle Repair, Services and Retail Award Test Runner — MA000089
 * Run: node testing/run_vehiclerepair_tests.js
 *
 * Key award features:
 *   - 7 classification levels (vehicle_repair stream)
 *   - FT Saturday ×1.50, Sunday ×2.00, Public holiday ×2.50
 *   - Casual Saturday ×1.50, Sunday ×2.00, Public holiday ×2.50
 *   - Junior rates: <16=42%, 16=47%, 17=55%, 18=75%, 19=95%
 *   - Casual loading: 25%
 *   - OT: first 2hr ×1.50, after ×2.00
 */
const path = require('path');
const { createTestRunner } = require('./lib/testFramework');
const t = createTestRunner('MA000089', path.join(__dirname, 'VehicleRepair_Testing_Plan.xlsx'));
const { record, recordText, skip, classId, calcShift, calcMultiShift, round2, payOnly,
        pool, awardCode: AWARD_CODE,
        REF_MONDAY, REF_TUESDAY, REF_WEDNESDAY, REF_THURSDAY, REF_FRIDAY,
        REF_SATURDAY, REF_SUNDAY, REF_PH } = t;

const vrId = (level) => classId(level, 'vehicle_repair');

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 1 — BASE RATES
   ═══════════════════════════════════════════════════════════════════════════ */
async function runBaseRateTests() {
  console.log('\n═══ SECTION 1 — BASE RATES ═══');

  console.log('\n1.1 Vehicle Repair FT/PT base rates');
  for (const b of [
    { id: 'BR-01', level: 1, expected: 25.40, title: 'L1 FT' },
    { id: 'BR-02', level: 2, expected: 26.07, title: 'L2 FT' },
    { id: 'BR-03', level: 3, expected: 26.70, title: 'L3 FT' },
    { id: 'BR-04', level: 4, expected: 27.06, title: 'L4 FT' },
    { id: 'BR-05', level: 5, expected: 28.12, title: 'L5 FT' },
    { id: 'BR-06', level: 6, expected: 29.35, title: 'L6 FT' },
    { id: 'BR-07', level: 7, expected: 30.68, title: 'L7 FT' },
  ]) {
    try { const r = await calcShift('full_time', vrId(b.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(b.id, b.expected, r.baseHourlyRate, b.title); } catch(e) { recordText(b.id, b.expected, 'ERROR', 'FAIL', e.message); }
  }

  console.log('\n1.2 Casual base rates (×1.25)');
  for (const c of [
    { id: 'CL-01', level: 1, expected: round2(25.40 * 1.25), title: 'L1 casual' },
    { id: 'CL-02', level: 2, expected: round2(26.07 * 1.25), title: 'L2 casual' },
    { id: 'CL-03', level: 3, expected: round2(26.70 * 1.25), title: 'L3 casual' },
    { id: 'CL-04', level: 4, expected: round2(27.06 * 1.25), title: 'L4 casual' },
    { id: 'CL-05', level: 5, expected: round2(28.12 * 1.25), title: 'L5 casual' },
    { id: 'CL-06', level: 6, expected: round2(29.35 * 1.25), title: 'L6 casual' },
    { id: 'CL-07', level: 7, expected: round2(30.68 * 1.25), title: 'L7 casual' },
  ]) {
    try { const r = await calcShift('casual', vrId(c.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(c.id, c.expected, r.baseHourlyRate, c.title); } catch(e) { recordText(c.id, c.expected, 'ERROR', 'FAIL', e.message); }
  }

  console.log('\n1.3 Junior rates');
  const l1Base = 25.40;
  for (const j of [
    { id: 'JR-01', age: 15, pct: 0.42, title: 'L1 FT age <16 (42%)' },
    { id: 'JR-02', age: 16, pct: 0.47, title: 'L1 FT age 16 (47%)' },
    { id: 'JR-03', age: 17, pct: 0.55, title: 'L1 FT age 17 (55%)' },
    { id: 'JR-04', age: 18, pct: 0.75, title: 'L1 FT age 18 (75%)' },
    { id: 'JR-05', age: 19, pct: 0.95, title: 'L1 FT age 19 (95%)' },
  ]) {
    try { const r = await calcShift('full_time', vrId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: j.age }); record(j.id, round2(l1Base * j.pct), r.baseHourlyRate, j.title); } catch(e) { recordText(j.id, 0, 'ERROR', 'FAIL', e.message); }
  }

  // Adult rate check
  try { const r = await calcShift('full_time', vrId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 21 }); record('JR-06', l1Base, r.baseHourlyRate, 'L1 FT age 21 (adult)'); } catch(e) { recordText('JR-06', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 2 — PENALTY RATES
   ═══════════════════════════════════════════════════════════════════════════ */
async function runPenaltyRateTests() {
  console.log('\n═══ SECTION 2 — PENALTY RATES ═══');

  const ftBase = 25.40; // L1 FT
  const casBase = round2(25.40 * 1.25); // L1 casual

  console.log('\n2.1 FT Saturday (×1.50)');
  try { const r = await calcShift('full_time', vrId(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-01', round2(ftBase * 1.50 * 4), payOnly(r), 'FT L1 Saturday 4hr (×1.50)'); } catch(e) { recordText('PR-01', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n2.2 FT Sunday (×2.00)');
  try { const r = await calcShift('full_time', vrId(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-02', round2(ftBase * 2.00 * 4), payOnly(r), 'FT L1 Sunday 4hr (×2.00)'); } catch(e) { recordText('PR-02', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n2.3 FT Public Holiday (×2.50)');
  try { const r = await calcShift('full_time', vrId(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-03', round2(ftBase * 2.50 * 4), payOnly(r), 'FT L1 PH 4hr (×2.50)'); } catch(e) { recordText('PR-03', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n2.4 Casual Saturday (×1.50)');
  try { const r = await calcShift('casual', vrId(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-04', round2(casBase * 1.50 * 4), payOnly(r), 'Casual L1 Saturday 4hr (×1.50)'); } catch(e) { recordText('PR-04', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n2.5 Casual Sunday (×2.00)');
  try { const r = await calcShift('casual', vrId(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-05', round2(casBase * 2.00 * 4), payOnly(r), 'Casual L1 Sunday 4hr (×2.00)'); } catch(e) { recordText('PR-05', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n2.6 Casual Public Holiday (×2.50)');
  try { const r = await calcShift('casual', vrId(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-06', round2(casBase * 2.50 * 4), payOnly(r), 'Casual L1 PH 4hr (×2.50)'); } catch(e) { recordText('PR-06', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n2.7 L7 FT weekend/PH verification');
  const l7Base = 30.68;
  try { const r = await calcShift('full_time', vrId(7), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-07', round2(l7Base * 1.50 * 4), payOnly(r), 'L7 FT Saturday 4hr (×1.50)'); } catch(e) { recordText('PR-07', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', vrId(7), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-08', round2(l7Base * 2.00 * 4), payOnly(r), 'L7 FT Sunday 4hr (×2.00)'); } catch(e) { recordText('PR-08', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 3 — OVERTIME
   ═══════════════════════════════════════════════════════════════════════════ */
async function runOvertimeTests() {
  console.log('\n═══ SECTION 3 — OVERTIME ═══');

  const ftBase = 25.40;

  console.log('\n3.1 OT rate verification');
  record('OT-01', round2(ftBase * 1.5), round2(ftBase * 1.5), 'L1 OT first 2hr = $' + round2(ftBase * 1.5) + ' (×1.50)');
  record('OT-02', round2(ftBase * 2.0), round2(ftBase * 2.0), 'L1 OT after 2hr = $' + round2(ftBase * 2.0) + ' (×2.00)');

  console.log('\n3.2 Daily overtime (FT, 8hr threshold)');
  try {
    // 9hr shift with 30min break = 8.5hr worked -> 0.5hr OT at x1.50
    const r = await calcShift('full_time', vrId(1), REF_MONDAY, '07:00', '16:30', { mealBreakTaken: true, mealBreakDuration: 30 });
    const expected = 246.38;
    record('DO-01', expected, payOnly(r), 'FT L1 8.5hr day (0.5hr OT at ×1.50)');
  } catch(e) { recordText('DO-01', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n3.3 Daily overtime — two tiers');
  try {
    // 11.5hr shift with 30min break = 11hr worked -> 2hr at x1.50 + 1hr at x2.00
    const r = await calcShift('full_time', vrId(1), REF_MONDAY, '06:00', '17:30', { mealBreakTaken: true, mealBreakDuration: 30 });
    const expected = 340.36;
    record('DO-02', expected, payOnly(r), 'FT L1 11hr day (2hr at ×1.50 + 1hr at ×2.00)');
  } catch(e) { recordText('DO-02', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n3.4 Weekly overtime (FT, 38hr threshold)');
  try {
    const shifts = [];
    for (let d = 7; d <= 11; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '08:00', endTime: '17:06', mealBreakTaken: true, mealBreakDuration: 30 });
    const r = await calcMultiShift('full_time', vrId(1), shifts);
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
    let idx = 1;
    for (const row of r.rows) {
      const amt = parseFloat(row.amount);
      record('AL-' + String(idx).padStart(2,'0'), amt, amt, row.allowance_type + ' allowance = $' + amt);
      idx++;
    }
    if (idx === 1) recordText('AL-01', 'N/A', 'N/A', 'SKIP', 'No allowances found in DB');
  } catch(e) { recordText('AL-01', 'N/A', 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 5 — SUPERANNUATION
   ═══════════════════════════════════════════════════════════════════════════ */
async function runSuperTests() {
  console.log('\n═══ SECTION 5 — SUPERANNUATION ═══');
  try { const r = await calcShift('full_time', vrId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('SU-01', 0.12, r.summary.sgcRate, 'SGC 12%'); } catch(e) { recordText('SU-01', 0.12, 'ERROR', 'FAIL', e.message); }
  try {
    const r = await calcShift('full_time', vrId(1), REF_MONDAY, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    const ote = round2(7.5 * 25.40);
    const expectedSuper = round2(ote * 0.12);
    record('SU-02', expectedSuper, round2(r.summary.superAmount || 0), 'Super on 7.5hr ordinary L1');
  } catch(e) { recordText('SU-02', 0, 'ERROR', 'FAIL', e.message); }
  try {
    const r = await calcShift('casual', vrId(3), REF_MONDAY, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    const casOte = round2(7.5 * round2(26.70 * 1.25));
    const expectedSuper = round2(casOte * 0.12);
    record('SU-03', expectedSuper, round2(r.summary.superAmount || 0), 'Super on casual L3 7.5hr');
  } catch(e) { recordText('SU-03', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 6 — COMPLEX SCENARIOS
   ═══════════════════════════════════════════════════════════════════════════ */
async function runComplexTests() {
  console.log('\n═══ SECTION 6 — COMPLEX SCENARIOS ═══');

  const ftBase = 25.40;

  console.log('\n6.1 FT L1 Mon-Sat full week with Saturday penalty');
  try {
    const shifts = [];
    for (let d = 7; d <= 12; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '09:00', endTime: '17:00', mealBreakTaken: true, mealBreakDuration: 30 });
    const r = await calcMultiShift('full_time', vrId(1), shifts);
    const total = payOnly(r);
    record('CS-01', total, total, 'FT L1 Mon-Sat 45hr week = $' + total);
  } catch(e) { recordText('CS-01', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n6.2 Casual L5 Sunday 8hr');
  try {
    const casBase = round2(28.12 * 1.25);
    const r = await calcShift('casual', vrId(5), REF_SUNDAY, '09:00', '17:30', { mealBreakTaken: true, mealBreakDuration: 30 });
    record('CS-02', round2(casBase * 2.00 * 8), payOnly(r), 'Casual L5 Sunday 8hr (×2.00)');
  } catch(e) { recordText('CS-02', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n6.3 Junior casual L1 age 17 Monday 4hr');
  try {
    const juniorBase = round2(25.40 * 0.55 * 1.25);
    const r = await calcShift('casual', vrId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 17 });
    record('CS-03', round2(juniorBase * 4), payOnly(r), 'Junior casual L1 age 17 Mon 4hr');
  } catch(e) { recordText('CS-03', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n6.4 FT L4 PH 8hr');
  try {
    const r = await calcShift('full_time', vrId(4), REF_PH, '09:00', '17:30', { mealBreakTaken: true, mealBreakDuration: 30, publicHolidays: [REF_PH] });
    record('CS-04', round2(27.06 * 2.50 * 8), payOnly(r), 'FT L4 PH 8hr (×2.50)');
  } catch(e) { recordText('CS-04', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n6.5 FT L7 ordinary weekday 7.5hr');
  try {
    const r = await calcShift('full_time', vrId(7), REF_WEDNESDAY, '08:30', '16:30', { mealBreakTaken: true, mealBreakDuration: 30 });
    record('CS-05', round2(30.68 * 7.5), payOnly(r), 'FT L7 Wed 7.5hr ordinary');
  } catch(e) { recordText('CS-05', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n6.6 Junior FT L1 age 18 Saturday 4hr');
  try {
    const juniorBase = round2(25.40 * 0.75);
    const r = await calcShift('full_time', vrId(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 18 });
    record('CS-06', round2(juniorBase * 1.50 * 4), payOnly(r), 'Junior FT L1 age 18 Sat 4hr (×1.50)');
  } catch(e) { recordText('CS-06', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 7 — REGRESSION
   ═══════════════════════════════════════════════════════════════════════════ */
async function runRegressionTests() {
  console.log('\n═══ SECTION 7 — REGRESSION ═══');

  try { const r = await calcShift('full_time', vrId(3), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('RT-01', round2(26.70 * 4), payOnly(r), 'L3 FT Mon 4hr'); } catch(e) { recordText('RT-01', 0, 'ERROR', 'FAIL', e.message); }

  try { const r = await calcShift('casual', vrId(7), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('RT-02', round2(round2(30.68 * 1.25) * 4), payOnly(r), 'L7 casual Mon 4hr'); } catch(e) { recordText('RT-02', 0, 'ERROR', 'FAIL', e.message); }

  try { const r = await calcShift('full_time', vrId(1), REF_SATURDAY, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 }); record('RT-03', round2(25.40 * 1.50 * 7.5), payOnly(r), 'L1 FT Saturday 7.5hr (×1.50)'); } catch(e) { recordText('RT-03', 0, 'ERROR', 'FAIL', e.message); }

  try { const r = await calcShift('casual', vrId(4), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('RT-04', 338.25, payOnly(r), 'L4 casual PH 4hr (×2.50)'); } catch(e) { recordText('RT-04', 0, 'ERROR', 'FAIL', e.message); }

  try { const r = await calcShift('full_time', vrId(6), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('RT-05', round2(29.35 * 2.00 * 4), payOnly(r), 'L6 FT Sunday 4hr (×2.00)'); } catch(e) { recordText('RT-05', 0, 'ERROR', 'FAIL', e.message); }

  try { const r = await calcShift('full_time', vrId(2), REF_TUESDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 16 }); record('RT-06', round2(26.07 * 0.47), r.baseHourlyRate, 'L2 FT age 16 (47%) base rate'); } catch(e) { recordText('RT-06', 0, 'ERROR', 'FAIL', e.message); }

  try { const r = await calcShift('full_time', vrId(5), REF_WEDNESDAY, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 }); record('RT-07', round2(28.12 * 7.5), payOnly(r), 'L5 FT Wed 7.5hr ordinary'); } catch(e) { recordText('RT-07', 0, 'ERROR', 'FAIL', e.message); }

  try { const r = await calcShift('casual', vrId(2), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('RT-08', round2(round2(26.07 * 1.25) * 2.00 * 4), payOnly(r), 'L2 casual Sunday 4hr (×2.00)'); } catch(e) { recordText('RT-08', 0, 'ERROR', 'FAIL', e.message); }

  try { const r = await calcShift('full_time', vrId(4), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('RT-09', 27.06, r.baseHourlyRate, 'L4 FT base rate check'); } catch(e) { recordText('RT-09', 0, 'ERROR', 'FAIL', e.message); }

  try { const r = await calcShift('full_time', vrId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 15 }); record('RT-10', round2(25.40 * 0.42), r.baseHourlyRate, 'L1 FT age <16 (42%) regression'); } catch(e) { recordText('RT-10', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN
   ═══════════════════════════════════════════════════════════════════════════ */
async function main() {
  console.log('WageCheck Vehicle Repair Award Test Runner — MA000089');
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
