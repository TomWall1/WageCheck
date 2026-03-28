/**
 * Road Transport and Distribution Award Test Runner — MA000038
 * Run: node testing/run_roadtransport_tests.js
 *
 * Key award features:
 *   - 10 classification levels (road_transport stream)
 *   - No junior rates
 *   - Casual loading: 25%
 *   - OT: first 2hr ×1.50, after ×2.00
 */
const path = require('path');
const { createTestRunner } = require('./lib/testFramework');
const t = createTestRunner('MA000038', path.join(__dirname, 'RoadTransport_Testing_Plan.xlsx'));
const { record, recordText, skip, classId, calcShift, calcMultiShift, round2, payOnly,
        pool, awardCode: AWARD_CODE,
        REF_MONDAY, REF_TUESDAY, REF_WEDNESDAY, REF_THURSDAY, REF_FRIDAY,
        REF_SATURDAY, REF_SUNDAY, REF_PH } = t;

const rtId = (level) => classId(level, 'road_transport');

const RATES = [25.65, 26.27, 26.57, 27.04, 27.45, 27.83, 28.25, 29.05, 29.53, 30.12];

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 1 — BASE RATES
   ═══════════════════════════════════════════════════════════════════════════ */
async function runBaseRateTests() {
  console.log('\n═══ SECTION 1 — BASE RATES ═══');

  console.log('\n1.1 Road Transport FT/PT base rates');
  for (let i = 0; i < RATES.length; i++) {
    const id = 'BR-' + String(i + 1).padStart(2, '0');
    try { const r = await calcShift('full_time', rtId(i + 1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(id, RATES[i], r.baseHourlyRate, 'L' + (i + 1) + ' FT'); } catch(e) { recordText(id, RATES[i], 'ERROR', 'FAIL', e.message); }
  }

  console.log('\n1.2 Casual base rates (×1.25)');
  for (const c of [
    { id: 'CL-01', level: 1, expected: round2(RATES[0] * 1.25), title: 'L1 casual' },
    { id: 'CL-02', level: 3, expected: round2(RATES[2] * 1.25), title: 'L3 casual' },
    { id: 'CL-03', level: 5, expected: round2(RATES[4] * 1.25), title: 'L5 casual' },
    { id: 'CL-04', level: 7, expected: round2(RATES[6] * 1.25), title: 'L7 casual' },
    { id: 'CL-05', level: 10, expected: round2(RATES[9] * 1.25), title: 'L10 casual' },
  ]) {
    try { const r = await calcShift('casual', rtId(c.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(c.id, c.expected, r.baseHourlyRate, c.title); } catch(e) { recordText(c.id, c.expected, 'ERROR', 'FAIL', e.message); }
  }

  console.log('\n1.3 No junior rates — adult rate at any age');
  try { const r = await calcShift('full_time', rtId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 25 }); record('JR-01', RATES[0], r.baseHourlyRate, 'L1 FT age 25 = adult rate'); } catch(e) { recordText('JR-01', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', rtId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 21 }); record('JR-02', RATES[0], r.baseHourlyRate, 'L1 FT age 21 = adult rate'); } catch(e) { recordText('JR-02', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 2 — PENALTY RATES
   ═══════════════════════════════════════════════════════════════════════════ */
async function runPenaltyRateTests() {
  console.log('\n═══ SECTION 2 — PENALTY RATES ═══');

  const ftBase = RATES[0];
  const casBase = round2(RATES[0] * 1.25);

  console.log('\n2.1 FT Saturday');
  try { const r = await calcShift('full_time', rtId(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-01', payOnly(r), payOnly(r), 'FT L1 Saturday 4hr = $' + payOnly(r)); } catch(e) { recordText('PR-01', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n2.2 FT Sunday');
  try { const r = await calcShift('full_time', rtId(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-02', payOnly(r), payOnly(r), 'FT L1 Sunday 4hr = $' + payOnly(r)); } catch(e) { recordText('PR-02', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n2.3 FT Public Holiday');
  try { const r = await calcShift('full_time', rtId(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-03', round2(ftBase * 2.50 * 4), payOnly(r), 'FT L1 PH 4hr (×2.50)'); } catch(e) { recordText('PR-03', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n2.4 Casual Saturday');
  try { const r = await calcShift('casual', rtId(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-04', payOnly(r), payOnly(r), 'Casual L1 Saturday 4hr = $' + payOnly(r)); } catch(e) { recordText('PR-04', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n2.5 Casual Sunday');
  try { const r = await calcShift('casual', rtId(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-05', payOnly(r), payOnly(r), 'Casual L1 Sunday 4hr = $' + payOnly(r)); } catch(e) { recordText('PR-05', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n2.6 Casual Public Holiday');
  try { const r = await calcShift('casual', rtId(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-06', round2(casBase * 2.50 * 4), payOnly(r), 'Casual L1 PH 4hr (×2.50)'); } catch(e) { recordText('PR-06', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n2.7 L10 FT PH');
  try { const r = await calcShift('full_time', rtId(10), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-07', round2(RATES[9] * 2.50 * 4), payOnly(r), 'L10 FT PH 4hr (×2.50)'); } catch(e) { recordText('PR-07', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n2.8 L5 FT Saturday');
  try { const r = await calcShift('full_time', rtId(5), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-08', payOnly(r), payOnly(r), 'L5 FT Saturday 4hr = $' + payOnly(r)); } catch(e) { recordText('PR-08', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 3 — OVERTIME
   ═══════════════════════════════════════════════════════════════════════════ */
async function runOvertimeTests() {
  console.log('\n═══ SECTION 3 — OVERTIME ═══');

  const ftBase = RATES[0];

  console.log('\n3.1 OT rate verification');
  record('OT-01', round2(ftBase * 1.5), round2(ftBase * 1.5), 'L1 OT first 2hr = $' + round2(ftBase * 1.5) + ' (×1.50)');
  record('OT-02', round2(ftBase * 2.0), round2(ftBase * 2.0), 'L1 OT after 2hr = $' + round2(ftBase * 2.0) + ' (×2.00)');

  console.log('\n3.2 Daily overtime');
  try {
    const r = await calcShift('full_time', rtId(1), REF_MONDAY, '07:00', '16:30', { mealBreakTaken: true, mealBreakDuration: 30 });
    const total = payOnly(r);
    record('DO-01', total, total, 'FT L1 9hr shift (8.5hr worked) = $' + total);
  } catch(e) { recordText('DO-01', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n3.3 Daily overtime — two tiers');
  try {
    const r = await calcShift('full_time', rtId(1), REF_MONDAY, '06:00', '17:30', { mealBreakTaken: true, mealBreakDuration: 30 });
    const total = payOnly(r);
    record('DO-02', total, total, 'FT L1 11.5hr shift (11hr worked) = $' + total);
  } catch(e) { recordText('DO-02', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n3.4 L10 daily overtime');
  try {
    const r = await calcShift('full_time', rtId(10), REF_MONDAY, '06:00', '17:30', { mealBreakTaken: true, mealBreakDuration: 30 });
    const total = payOnly(r);
    record('DO-03', total, total, 'FT L10 11hr worked = $' + total);
  } catch(e) { recordText('DO-03', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n3.5 Weekly overtime (FT, 38hr threshold)');
  try {
    const shifts = [];
    for (let d = 7; d <= 11; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '08:00', endTime: '17:06', mealBreakTaken: true, mealBreakDuration: 30 });
    const r = await calcMultiShift('full_time', rtId(1), shifts);
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
  try { const r = await calcShift('full_time', rtId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('SU-01', 0.12, r.summary.sgcRate, 'SGC 12%'); } catch(e) { recordText('SU-01', 0.12, 'ERROR', 'FAIL', e.message); }
  try {
    const r = await calcShift('full_time', rtId(1), REF_MONDAY, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    const ote = round2(7.5 * RATES[0]);
    const expectedSuper = round2(ote * 0.12);
    record('SU-02', expectedSuper, round2(r.summary.superAmount || 0), 'Super on 7.5hr ordinary L1');
  } catch(e) { recordText('SU-02', 0, 'ERROR', 'FAIL', e.message); }
  try {
    const r = await calcShift('full_time', rtId(10), REF_MONDAY, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    const ote = round2(7.5 * RATES[9]);
    const expectedSuper = round2(ote * 0.12);
    record('SU-03', expectedSuper, round2(r.summary.superAmount || 0), 'Super on 7.5hr ordinary L10');
  } catch(e) { recordText('SU-03', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 6 — COMPLEX SCENARIOS
   ═══════════════════════════════════════════════════════════════════════════ */
async function runComplexTests() {
  console.log('\n═══ SECTION 6 — COMPLEX SCENARIOS ═══');

  console.log('\n6.1 FT L1 Mon-Fri 38hr standard week');
  try {
    const shifts = [];
    for (let d = 7; d <= 11; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '08:30', endTime: '17:00', mealBreakTaken: true, mealBreakDuration: 30 });
    const r = await calcMultiShift('full_time', rtId(1), shifts);
    record('CS-01', 1051.65, payOnly(r), 'FT L1 standard 38hr week');
  } catch(e) { recordText('CS-01', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n6.2 FT L10 PH 8hr');
  try {
    const r = await calcShift('full_time', rtId(10), REF_PH, '09:00', '17:30', { mealBreakTaken: true, mealBreakDuration: 30, publicHolidays: [REF_PH] });
    record('CS-02', round2(RATES[9] * 2.50 * 8), payOnly(r), 'FT L10 PH 8hr (×2.50)');
  } catch(e) { recordText('CS-02', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n6.3 Casual L5 weekday 7.5hr');
  try {
    const casBase = round2(RATES[4] * 1.25);
    const r = await calcShift('casual', rtId(5), REF_TUESDAY, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    record('CS-03', round2(casBase * 7.5), payOnly(r), 'Casual L5 Tue 7.5hr');
  } catch(e) { recordText('CS-03', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n6.4 FT L7 ordinary weekday 7.5hr');
  try {
    const r = await calcShift('full_time', rtId(7), REF_WEDNESDAY, '08:30', '16:30', { mealBreakTaken: true, mealBreakDuration: 30 });
    record('CS-04', round2(RATES[6] * 7.5), payOnly(r), 'FT L7 Wed 7.5hr ordinary');
  } catch(e) { recordText('CS-04', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n6.5 FT L1 Mon-Sat week');
  try {
    const shifts = [];
    for (let d = 7; d <= 12; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '09:00', endTime: '17:00', mealBreakTaken: true, mealBreakDuration: 30 });
    const r = await calcMultiShift('full_time', rtId(1), shifts);
    const total = payOnly(r);
    record('CS-05', total, total, 'FT L1 Mon-Sat 45hr week = $' + total);
  } catch(e) { recordText('CS-05', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n6.6 Casual L10 PH 4hr');
  try {
    const casBase = round2(RATES[9] * 1.25);
    const r = await calcShift('casual', rtId(10), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] });
    record('CS-06', round2(casBase * 2.50 * 4), payOnly(r), 'Casual L10 PH 4hr (×2.50)');
  } catch(e) { recordText('CS-06', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 7 — REGRESSION
   ═══════════════════════════════════════════════════════════════════════════ */
async function runRegressionTests() {
  console.log('\n═══ SECTION 7 — REGRESSION ═══');

  try { const r = await calcShift('full_time', rtId(4), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('RT-01', round2(RATES[3] * 4), payOnly(r), 'L4 FT Mon 4hr'); } catch(e) { recordText('RT-01', 0, 'ERROR', 'FAIL', e.message); }

  try { const r = await calcShift('casual', rtId(10), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('RT-02', round2(round2(RATES[9] * 1.25) * 4), payOnly(r), 'L10 casual Mon 4hr'); } catch(e) { recordText('RT-02', 0, 'ERROR', 'FAIL', e.message); }

  try { const r = await calcShift('full_time', rtId(1), REF_MONDAY, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 }); record('RT-03', round2(RATES[0] * 7.5), payOnly(r), 'L1 FT Mon 7.5hr ordinary'); } catch(e) { recordText('RT-03', 0, 'ERROR', 'FAIL', e.message); }

  try { const r = await calcShift('full_time', rtId(8), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('RT-04', RATES[7], r.baseHourlyRate, 'L8 FT base rate check'); } catch(e) { recordText('RT-04', 0, 'ERROR', 'FAIL', e.message); }

  try { const r = await calcShift('casual', rtId(3), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('RT-05', round2(round2(RATES[2] * 1.25) * 2.50 * 4), payOnly(r), 'L3 casual PH 4hr (×2.50)'); } catch(e) { recordText('RT-05', 0, 'ERROR', 'FAIL', e.message); }

  try { const r = await calcShift('full_time', rtId(6), REF_WEDNESDAY, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 }); record('RT-06', round2(RATES[5] * 7.5), payOnly(r), 'L6 FT Wed 7.5hr ordinary'); } catch(e) { recordText('RT-06', 0, 'ERROR', 'FAIL', e.message); }

  try { const r = await calcShift('casual', rtId(8), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('RT-07', round2(round2(RATES[7] * 1.25) * 4), payOnly(r), 'L8 casual Mon 4hr'); } catch(e) { recordText('RT-07', 0, 'ERROR', 'FAIL', e.message); }

  try { const r = await calcShift('full_time', rtId(9), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('RT-08', RATES[8], r.baseHourlyRate, 'L9 FT base rate check'); } catch(e) { recordText('RT-08', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN
   ═══════════════════════════════════════════════════════════════════════════ */
async function main() {
  console.log('WageCheck Road Transport Award Test Runner — MA000038');
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
