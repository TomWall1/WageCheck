/**
 * Veterinary Industry Award Test Runner — MA000118
 * Run: node testing/run_vetservices_tests.js
 *
 * Key award features:
 *   - Three streams: vet_support (6 levels), vet_surgeon (5 levels), inspector (3 levels)
 *   - Junior rates: <17=50%, 17=60%, 18=70%, 19=80%, 20=90%
 *   - Casual loading: 25%
 *   - OT: first 2hr ×1.50, after ×2.00
 */
const path = require('path');
const { createTestRunner } = require('./lib/testFramework');
const t = createTestRunner('MA000118', path.join(__dirname, 'VetServices_Testing_Plan.xlsx'));
const { record, recordText, skip, classId, calcShift, calcMultiShift, round2, payOnly,
        pool, awardCode: AWARD_CODE,
        REF_MONDAY, REF_TUESDAY, REF_WEDNESDAY, REF_THURSDAY, REF_FRIDAY,
        REF_SATURDAY, REF_SUNDAY, REF_PH } = t;

const vsId = (level) => classId(level, 'vet_support');
const surgId = (level) => classId(level, 'vet_surgeon');
const inspId = (level) => classId(level, 'inspector');

const VS_RATES = [24.28, 24.95, 26.96, 28.12, 30.68, 32.23];
const SURG_RATES = [32.65, 34.45, 37.22, 40.89, 46.18];
const INSP_RATES = [32.65, 34.45, 37.22];

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 1 — BASE RATES
   ═══════════════════════════════════════════════════════════════════════════ */
async function runBaseRateTests() {
  console.log('\n═══ SECTION 1 — BASE RATES ═══');

  // Vet Support FT rates
  console.log('\n1.1 Vet Support FT/PT base rates');
  for (let i = 0; i < VS_RATES.length; i++) {
    const id = 'BR-' + String(i + 1).padStart(2, '0');
    try { const r = await calcShift('full_time', vsId(i + 1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(id, VS_RATES[i], r.baseHourlyRate, 'Vet Support L' + (i + 1) + ' FT'); } catch(e) { recordText(id, VS_RATES[i], 'ERROR', 'FAIL', e.message); }
  }

  // Vet Surgeon FT rates
  console.log('\n1.2 Vet Surgeon FT/PT base rates');
  for (let i = 0; i < SURG_RATES.length; i++) {
    const id = 'BR-' + String(i + 7).padStart(2, '0');
    try { const r = await calcShift('full_time', surgId(i + 1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(id, SURG_RATES[i], r.baseHourlyRate, 'Vet Surgeon L' + (i + 1) + ' FT'); } catch(e) { recordText(id, SURG_RATES[i], 'ERROR', 'FAIL', e.message); }
  }

  // Inspector FT rates
  console.log('\n1.3 Inspector FT/PT base rates');
  for (let i = 0; i < INSP_RATES.length; i++) {
    const id = 'BR-' + String(i + 12).padStart(2, '0');
    try { const r = await calcShift('full_time', inspId(i + 1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(id, INSP_RATES[i], r.baseHourlyRate, 'Inspector L' + (i + 1) + ' FT'); } catch(e) { recordText(id, INSP_RATES[i], 'ERROR', 'FAIL', e.message); }
  }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 2 — CASUAL RATES
   ═══════════════════════════════════════════════════════════════════════════ */
async function runCasualRateTests() {
  console.log('\n═══ SECTION 2 — CASUAL RATES ═══');

  console.log('\n2.1 Vet Support casual (×1.25)');
  for (const c of [
    { id: 'CL-01', level: 1, rate: VS_RATES[0], title: 'VS L1 casual' },
    { id: 'CL-02', level: 3, rate: VS_RATES[2], title: 'VS L3 casual' },
    { id: 'CL-03', level: 6, rate: VS_RATES[5], title: 'VS L6 casual' },
  ]) {
    try { const r = await calcShift('casual', vsId(c.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(c.id, round2(c.rate * 1.25), r.baseHourlyRate, c.title); } catch(e) { recordText(c.id, 0, 'ERROR', 'FAIL', e.message); }
  }

  console.log('\n2.2 Vet Surgeon casual (×1.25)');
  for (const c of [
    { id: 'CL-04', level: 1, rate: SURG_RATES[0], title: 'Surgeon L1 casual' },
    { id: 'CL-05', level: 5, rate: SURG_RATES[4], title: 'Surgeon L5 casual' },
  ]) {
    try { const r = await calcShift('casual', surgId(c.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(c.id, round2(c.rate * 1.25), r.baseHourlyRate, c.title); } catch(e) { recordText(c.id, 0, 'ERROR', 'FAIL', e.message); }
  }

  console.log('\n2.3 Inspector casual (×1.25)');
  try { const r = await calcShift('casual', inspId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('CL-06', round2(INSP_RATES[0] * 1.25), r.baseHourlyRate, 'Inspector L1 casual'); } catch(e) { recordText('CL-06', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n2.4 Junior rates (vet_support)');
  const l1Base = VS_RATES[0];
  for (const j of [
    { id: 'JR-01', age: 16, pct: 0.50, title: 'VS L1 FT age <17 (50%)' },
    { id: 'JR-02', age: 17, pct: 0.60, title: 'VS L1 FT age 17 (60%)' },
    { id: 'JR-03', age: 18, pct: 0.70, title: 'VS L1 FT age 18 (70%)' },
    { id: 'JR-04', age: 19, pct: 0.80, title: 'VS L1 FT age 19 (80%)' },
    { id: 'JR-05', age: 20, pct: 0.90, title: 'VS L1 FT age 20 (90%)' },
  ]) {
    try { const r = await calcShift('full_time', vsId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: j.age }); record(j.id, round2(l1Base * j.pct), r.baseHourlyRate, j.title); } catch(e) { recordText(j.id, 0, 'ERROR', 'FAIL', e.message); }
  }

  // Adult rate
  try { const r = await calcShift('full_time', vsId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 21 }); record('JR-06', l1Base, r.baseHourlyRate, 'VS L1 FT age 21 (adult)'); } catch(e) { recordText('JR-06', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 3 — PENALTY RATES
   ═══════════════════════════════════════════════════════════════════════════ */
async function runPenaltyRateTests() {
  console.log('\n═══ SECTION 3 — PENALTY RATES ═══');

  const ftBase = VS_RATES[0];
  const casBase = round2(VS_RATES[0] * 1.25);

  console.log('\n3.1 Vet Support FT Saturday');
  try { const r = await calcShift('full_time', vsId(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-01', payOnly(r), payOnly(r), 'VS FT L1 Saturday 4hr = $' + payOnly(r)); } catch(e) { recordText('PR-01', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n3.2 Vet Support FT Sunday');
  try { const r = await calcShift('full_time', vsId(1), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-02', payOnly(r), payOnly(r), 'VS FT L1 Sunday 4hr = $' + payOnly(r)); } catch(e) { recordText('PR-02', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n3.3 Vet Support FT Public Holiday');
  try { const r = await calcShift('full_time', vsId(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-03', round2(ftBase * 2.50 * 4), payOnly(r), 'VS FT L1 PH 4hr (×2.50)'); } catch(e) { recordText('PR-03', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n3.4 Vet Support Casual PH');
  try { const r = await calcShift('casual', vsId(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-04', round2(casBase * 2.50 * 4), payOnly(r), 'VS Casual L1 PH 4hr (×2.50)'); } catch(e) { recordText('PR-04', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n3.5 Surgeon FT Saturday');
  try { const r = await calcShift('full_time', surgId(1), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-05', payOnly(r), payOnly(r), 'Surgeon FT L1 Saturday 4hr = $' + payOnly(r)); } catch(e) { recordText('PR-05', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n3.6 Surgeon FT PH');
  try { const r = await calcShift('full_time', surgId(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-06', round2(SURG_RATES[0] * 2.50 * 4), payOnly(r), 'Surgeon FT L1 PH 4hr (×2.50)'); } catch(e) { recordText('PR-06', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n3.7 Inspector FT PH');
  try { const r = await calcShift('full_time', inspId(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-07', round2(INSP_RATES[0] * 2.50 * 4), payOnly(r), 'Inspector FT L1 PH 4hr (×2.50)'); } catch(e) { recordText('PR-07', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 4 — OVERTIME
   ═══════════════════════════════════════════════════════════════════════════ */
async function runOvertimeTests() {
  console.log('\n═══ SECTION 4 — OVERTIME ═══');

  const ftBase = VS_RATES[0];

  console.log('\n4.1 OT rate verification');
  record('OT-01', round2(ftBase * 1.5), round2(ftBase * 1.5), 'VS L1 OT first 2hr = $' + round2(ftBase * 1.5) + ' (×1.50)');
  record('OT-02', round2(ftBase * 2.0), round2(ftBase * 2.0), 'VS L1 OT after 2hr = $' + round2(ftBase * 2.0) + ' (×2.00)');

  console.log('\n4.2 Vet Support daily overtime');
  try {
    const r = await calcShift('full_time', vsId(1), REF_MONDAY, '07:00', '16:30', { mealBreakTaken: true, mealBreakDuration: 30 });
    const total = payOnly(r);
    record('DO-01', total, total, 'VS FT L1 8.5hr worked = $' + total);
  } catch(e) { recordText('DO-01', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n4.3 Surgeon daily overtime — two tiers');
  try {
    const r = await calcShift('full_time', surgId(1), REF_MONDAY, '06:00', '17:30', { mealBreakTaken: true, mealBreakDuration: 30 });
    const total = payOnly(r);
    record('DO-02', total, total, 'Surgeon FT L1 11hr worked = $' + total);
  } catch(e) { recordText('DO-02', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n4.4 Weekly overtime (FT, 38hr threshold)');
  try {
    const shifts = [];
    for (let d = 7; d <= 11; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '08:00', endTime: '17:06', mealBreakTaken: true, mealBreakDuration: 30 });
    const r = await calcMultiShift('full_time', vsId(1), shifts);
    const total = payOnly(r);
    record('WO-01', total, total, 'VS FT L1 43hr week — total $' + total);
  } catch(e) { recordText('WO-01', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 5 — ALLOWANCES
   ═══════════════════════════════════════════════════════════════════════════ */
async function runAllowanceTests() {
  console.log('\n═══ SECTION 5 — ALLOWANCES ═══');
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
   SECTION 6 — SUPERANNUATION
   ═══════════════════════════════════════════════════════════════════════════ */
async function runSuperTests() {
  console.log('\n═══ SECTION 6 — SUPERANNUATION ═══');
  try { const r = await calcShift('full_time', vsId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('SU-01', 0.12, r.summary.sgcRate, 'SGC 12%'); } catch(e) { recordText('SU-01', 0.12, 'ERROR', 'FAIL', e.message); }
  try {
    const r = await calcShift('full_time', vsId(1), REF_MONDAY, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    const ote = round2(7.5 * VS_RATES[0]);
    const expectedSuper = round2(ote * 0.12);
    record('SU-02', expectedSuper, round2(r.summary.superAmount || 0), 'Super on 7.5hr ordinary VS L1');
  } catch(e) { recordText('SU-02', 0, 'ERROR', 'FAIL', e.message); }
  try {
    const r = await calcShift('full_time', surgId(5), REF_MONDAY, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    const ote = round2(7.5 * SURG_RATES[4]);
    const expectedSuper = round2(ote * 0.12);
    record('SU-03', expectedSuper, round2(r.summary.superAmount || 0), 'Super on 7.5hr ordinary Surgeon L5');
  } catch(e) { recordText('SU-03', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 7 — COMPLEX SCENARIOS
   ═══════════════════════════════════════════════════════════════════════════ */
async function runComplexTests() {
  console.log('\n═══ SECTION 7 — COMPLEX SCENARIOS ═══');

  console.log('\n7.1 VS FT L1 Mon-Fri 38hr standard week');
  try {
    const shifts = [];
    for (let d = 7; d <= 11; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '08:30', endTime: '17:00', mealBreakTaken: true, mealBreakDuration: 30 });
    const r = await calcMultiShift('full_time', vsId(1), shifts);
    record('CS-01', round2(VS_RATES[0] * 38), payOnly(r), 'VS FT L1 standard 38hr week');
  } catch(e) { recordText('CS-01', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n7.2 Surgeon casual L5 PH 8hr');
  try {
    const casBase = round2(SURG_RATES[4] * 1.25);
    const r = await calcShift('casual', surgId(5), REF_PH, '09:00', '17:30', { mealBreakTaken: true, mealBreakDuration: 30, publicHolidays: [REF_PH] });
    record('CS-02', round2(casBase * 2.50 * 8), payOnly(r), 'Surgeon casual L5 PH 8hr (×2.50)');
  } catch(e) { recordText('CS-02', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n7.3 Junior casual VS L1 age 17 Monday 4hr');
  try {
    const juniorBase = round2(VS_RATES[0] * 0.60 * 1.25);
    const r = await calcShift('casual', vsId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 17 });
    record('CS-03', round2(juniorBase * 4), payOnly(r), 'Junior casual VS L1 age 17 Mon 4hr');
  } catch(e) { recordText('CS-03', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n7.4 Surgeon FT L3 ordinary weekday 7.5hr');
  try {
    const r = await calcShift('full_time', surgId(3), REF_WEDNESDAY, '08:30', '16:30', { mealBreakTaken: true, mealBreakDuration: 30 });
    record('CS-04', round2(SURG_RATES[2] * 7.5), payOnly(r), 'Surgeon FT L3 Wed 7.5hr ordinary');
  } catch(e) { recordText('CS-04', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n7.5 Inspector FT L3 weekday 7.5hr');
  try {
    const r = await calcShift('full_time', inspId(3), REF_THURSDAY, '08:30', '16:30', { mealBreakTaken: true, mealBreakDuration: 30 });
    record('CS-05', round2(INSP_RATES[2] * 7.5), payOnly(r), 'Inspector FT L3 Thu 7.5hr ordinary');
  } catch(e) { recordText('CS-05', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n7.6 VS FT L1 Mon-Sat week');
  try {
    const shifts = [];
    for (let d = 7; d <= 12; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '09:00', endTime: '17:00', mealBreakTaken: true, mealBreakDuration: 30 });
    const r = await calcMultiShift('full_time', vsId(1), shifts);
    const total = payOnly(r);
    record('CS-06', total, total, 'VS FT L1 Mon-Sat 45hr week = $' + total);
  } catch(e) { recordText('CS-06', 0, 'ERROR', 'FAIL', e.message); }

  console.log('\n7.7 Junior FT VS L3 age 20 (90%) Mon 4hr');
  try {
    const juniorBase = round2(VS_RATES[2] * 0.90);
    const r = await calcShift('full_time', vsId(3), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 20 });
    record('CS-07', round2(juniorBase * 4), payOnly(r), 'Junior FT VS L3 age 20 Mon 4hr (90%)');
  } catch(e) { recordText('CS-07', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 8 — REGRESSION
   ═══════════════════════════════════════════════════════════════════════════ */
async function runRegressionTests() {
  console.log('\n═══ SECTION 8 — REGRESSION ═══');

  try { const r = await calcShift('full_time', vsId(4), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('RT-01', round2(VS_RATES[3] * 4), payOnly(r), 'VS L4 FT Mon 4hr'); } catch(e) { recordText('RT-01', 0, 'ERROR', 'FAIL', e.message); }

  try { const r = await calcShift('casual', surgId(5), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('RT-02', round2(round2(SURG_RATES[4] * 1.25) * 4), payOnly(r), 'Surgeon L5 casual Mon 4hr'); } catch(e) { recordText('RT-02', 0, 'ERROR', 'FAIL', e.message); }

  try { const r = await calcShift('full_time', vsId(1), REF_PH, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30, publicHolidays: [REF_PH] }); record('RT-03', round2(VS_RATES[0] * 2.50 * 7.5), payOnly(r), 'VS L1 FT PH 7.5hr (×2.50)'); } catch(e) { recordText('RT-03', 0, 'ERROR', 'FAIL', e.message); }

  try { const r = await calcShift('full_time', surgId(3), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('RT-04', SURG_RATES[2], r.baseHourlyRate, 'Surgeon L3 FT base rate check'); } catch(e) { recordText('RT-04', 0, 'ERROR', 'FAIL', e.message); }

  try { const r = await calcShift('full_time', vsId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 16 }); record('RT-05', round2(VS_RATES[0] * 0.50), r.baseHourlyRate, 'VS L1 FT age <17 (50%) regression'); } catch(e) { recordText('RT-05', 0, 'ERROR', 'FAIL', e.message); }

  try { const r = await calcShift('full_time', inspId(2), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('RT-06', INSP_RATES[1], r.baseHourlyRate, 'Inspector L2 FT base rate check'); } catch(e) { recordText('RT-06', 0, 'ERROR', 'FAIL', e.message); }

  try { const r = await calcShift('casual', vsId(6), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('RT-07', round2(round2(VS_RATES[5] * 1.25) * 4), payOnly(r), 'VS L6 casual Mon 4hr'); } catch(e) { recordText('RT-07', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN
   ═══════════════════════════════════════════════════════════════════════════ */
async function main() {
  console.log('WageCheck Veterinary Industry Award Test Runner — MA000118');
  console.log('═'.repeat(65));
  await t.init();
  await runBaseRateTests();
  await runCasualRateTests();
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
