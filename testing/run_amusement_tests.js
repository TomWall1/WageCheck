/**
 * Amusement, Events and Recreation Award Test Runner — MA000080
 * Run: node testing/run_amusement_tests.js
 */
const path = require('path');
const { createTestRunner } = require('./lib/testFramework');
const t = createTestRunner('MA000080', path.join(__dirname, 'Amusement_Testing_Plan.xlsx'));
const { record, recordText, skip, classId, calcShift, calcMultiShift, round2, payOnly,
        pool, awardCode: AWARD_CODE,
        REF_MONDAY, REF_TUESDAY, REF_WEDNESDAY, REF_THURSDAY, REF_FRIDAY,
        REF_SATURDAY, REF_SUNDAY, REF_PH } = t;

async function runBaseRateTests() {
  console.log('\n═══ SECTION 1 — BASE RATES ═══');
  const baseTests = [
    { id: 'BR-01', level: 0, stream: 'general', expected: 24.28, title: 'Introductory' },
    { id: 'BR-02', level: 1, stream: 'general', expected: 24.95, title: 'Grade 1' },
    { id: 'BR-03', level: 2, stream: 'general', expected: 25.85, title: 'Grade 2' },
    { id: 'BR-04', level: 3, stream: 'general', expected: 26.70, title: 'Grade 3' },
    { id: 'BR-05', level: 4, stream: 'general', expected: 28.12, title: 'Grade 4' },
    { id: 'BR-06', level: 5, stream: 'general', expected: 29.00, title: 'Grade 5' },
    { id: 'BR-07', level: 6, stream: 'general', expected: 29.88, title: 'Grade 6' },
    { id: 'BR-08', level: 7, stream: 'general', expected: 30.68, title: 'Grade 7' },
    { id: 'BR-09', level: 8, stream: 'general', expected: 32.23, title: 'Grade 8' },
    { id: 'BR-10', level: 9, stream: 'general', expected: 35.70, title: 'Grade 9' },
    { id: 'BR-11', level: 10, stream: 'general', expected: 37.96, title: 'Grade 10' },
    { id: 'BR-12', level: 2, stream: 'exhibition', expected: 27.71, title: 'Exhibition Grade 2' },
    { id: 'BR-13', level: 4, stream: 'exhibition', expected: 31.02, title: 'Exhibition Tech Grade 4' },
    { id: 'BR-14', level: 5, stream: 'exhibition', expected: 32.91, title: 'Supervisory Exhibition Grade 5' },
  ];
  for (const b of baseTests) {
    try {
      const r = await calcShift('full_time', classId(b.level, b.stream), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
      record(b.id, b.expected, r.baseHourlyRate, b.title);
    } catch (e) { recordText(b.id, b.expected, 'ERROR', 'FAIL', e.message); }
  }
  console.log('\n1.2 Casual rates');
  for (const c of [
    { id: 'CL-01', level: 1, stream: 'general', expected: 31.19 },
    { id: 'CL-02', level: 4, stream: 'general', expected: 35.15 },
    { id: 'CL-03', level: 10, stream: 'general', expected: 47.45 },
  ]) {
    try {
      const r = await calcShift('casual', classId(c.level, c.stream), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
      record(c.id, c.expected, r.baseHourlyRate);
    } catch (e) { recordText(c.id, c.expected, 'ERROR', 'FAIL', e.message); }
  }
  console.log('\n1.3 Junior rates (under 17=55%, 17=65%, 18=75%, 19=85%, 20+=adult)');
  for (const j of [
    { id: 'JR-01', level: 1, age: 16, expected: 13.72, note: 'Under 17 = 55%' },
    { id: 'JR-02', level: 1, age: 17, expected: 16.22, note: '17yr = 65%' },
    { id: 'JR-03', level: 1, age: 18, expected: 18.71, note: '18yr = 75%' },
    { id: 'JR-04', level: 1, age: 19, expected: 21.21, note: '19yr = 85%' },
    { id: 'JR-05', level: 1, age: 20, expected: 24.95, note: '20yr = adult' },
  ]) {
    try {
      const r = await calcShift('full_time', classId(j.level, 'general'), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: j.age });
      record(j.id, j.expected, r.baseHourlyRate, j.note);
    } catch (e) { recordText(j.id, j.expected, 'ERROR', 'FAIL', e.message); }
  }
}

async function runPenaltyRateTests() {
  console.log('\n═══ SECTION 2 — PENALTY RATES ═══');
  // No Saturday penalty, Sunday 1.50× FT / 1.40× casual, PH 2.50× FT / 2.20× casual
  for (const p of [
    { id: 'PR-01', level: 1, stream: 'general', sat: 24.95, sun: 37.43, ph: 62.38 },
    { id: 'PR-02', level: 4, stream: 'general', sat: 28.12, sun: 42.18, ph: 70.30 },
    { id: 'PR-03', level: 10, stream: 'general', sat: 37.96, sun: 56.94, ph: 94.90 },
  ]) {
    const c = classId(p.level, p.stream);
    try { const r = await calcShift('full_time', c, REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(`${p.id}-sat`, p.sat, r.shifts[0].segments[0]?.effectiveRate, 'Saturday = ordinary (no penalty)'); } catch(e) { recordText(`${p.id}-sat`, p.sat, 'ERROR', 'FAIL', e.message); }
    try { const r = await calcShift('full_time', c, REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(`${p.id}-sun`, p.sun, r.shifts[0].segments[0]?.effectiveRate, 'Sunday 1.50×'); } catch(e) { recordText(`${p.id}-sun`, p.sun, 'ERROR', 'FAIL', e.message); }
    try { const r = await calcShift('full_time', c, REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record(`${p.id}-ph`, p.ph, r.shifts[0].segments[0]?.effectiveRate, 'PH 2.50×'); } catch(e) { recordText(`${p.id}-ph`, p.ph, 'ERROR', 'FAIL', e.message); }
  }
  console.log('\n2.2 Casual penalties');
  try { const r = await calcShift('casual', classId(1, 'general'), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PC-01', 43.67, r.shifts[0].segments[0]?.effectiveRate, 'Casual Sunday 1.40×'); } catch(e) { recordText('PC-01', 43.67, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('casual', classId(1, 'general'), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PC-02', 68.62, r.shifts[0].segments[0]?.effectiveRate, 'Casual PH 2.20×'); } catch(e) { recordText('PC-02', 68.62, 'ERROR', 'FAIL', e.message); }
}

async function runOvertimeTests() {
  console.log('\n═══ SECTION 3 — OVERTIME ═══');
  console.log('\n3.1 FT daily OT (7.6hr/10.6hr thresholds)');
  try { const r = await calcShift('full_time', classId(3, 'general'), REF_MONDAY, '08:00', '16:06', { mealBreakTaken: true, mealBreakDuration: 30 }); record('DO-01', 202.92, payOnly(r), '7.6hr Mon, no OT'); } catch(e) { recordText('DO-01', 202.92, 'ERROR', 'FAIL', e.message); }
  try {
    const r = await calcShift('full_time', classId(3, 'general'), REF_MONDAY, '08:00', '17:06', { mealBreakTaken: true, mealBreakDuration: 30 });
    record('DO-02', 242.97, payOnly(r), '8.6hr Mon, 1hr daily OT @1.5× (excl meal)');
  } catch(e) { recordText('DO-02', 242.97, 'ERROR', 'FAIL', e.message); }

  console.log('\n3.2 Casual daily OT (10hr threshold, per clause 11.3)');
  // Casual G1 base=$31.19. 13.5hr shift = 10hr ordinary + 3hr OT @×1.20 + 0.5hr OT @×1.60
  // Ordinary: 13.5hr × $31.19 = $421.07 (all hours paid at base)
  // OT premium: 3hr × $31.19 × (1.20-1.0) = $18.71 + 0.5hr × $31.19 × (1.60-1.0) = $9.36 = $28.07
  // Total ≈ $449.14
  try {
    const r = await calcShift('casual', classId(1, 'general'), REF_MONDAY, '06:00', '20:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    const otPay = r.summary.overtimePay;
    recordText('CDO-01', 'yes', otPay > 0 ? 'yes' : 'no', otPay > 0 ? 'PASS' : 'FAIL', `Casual 13.5hr triggers daily OT (OT=$${round2(otPay)})`);
  } catch(e) { recordText('CDO-01', 'yes', 'ERROR', 'FAIL', e.message); }
  // Casual 9hr shift — under 10hr threshold, no daily OT
  try {
    const r = await calcShift('casual', classId(1, 'general'), REF_MONDAY, '08:00', '17:30', { mealBreakTaken: true, mealBreakDuration: 30 });
    recordText('CDO-02', '0', String(r.summary.overtimeMinutes), r.summary.overtimeMinutes === 0 ? 'PASS' : 'FAIL', 'Casual 9hr = no daily OT (under 10hr threshold)');
  } catch(e) { recordText('CDO-02', '0', 'ERROR', 'FAIL', e.message); }

  console.log('\n3.3 FT weekly OT');
  try {
    const shifts = [];
    for (let d = 7; d <= 11; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '08:00', endTime: '16:30', mealBreakTaken: true, mealBreakDuration: 30 });
    const r = await calcMultiShift('full_time', classId(3, 'general'), shifts);
    record('WO-01', 1094.70, payOnly(r), '40hr week, 2hr OT (excl meal)');
  } catch(e) { recordText('WO-01', 1094.70, 'ERROR', 'FAIL', e.message); }

  console.log('\n3.4 Casual weekly OT (38hr threshold)');
  try {
    const shifts = [];
    for (let d = 7; d <= 11; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '08:00', endTime: '16:30', mealBreakTaken: true, mealBreakDuration: 30 });
    const r = await calcMultiShift('casual', classId(1, 'general'), shifts);
    const otPay = r.summary.overtimePay;
    recordText('CWO-01', 'yes', otPay > 0 ? 'yes' : 'no', otPay > 0 ? 'PASS' : 'FAIL', `Casual 40hr week triggers weekly OT (OT=$${round2(otPay)})`);
  } catch(e) { recordText('CWO-01', 'yes', 'ERROR', 'FAIL', e.message); }
}

async function runMinEngagementTests() {
  console.log('\n═══ SECTION 4 — MINIMUM ENGAGEMENT (2hr) ═══');
  try { const r = await calcShift('casual', classId(1, 'general'), REF_MONDAY, '10:00', '11:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('ME-01', 62.38, r.summary.totalPayOwed, 'Casual 1hr → 2hr min'); } catch(e) { recordText('ME-01', 62.38, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('casual', classId(1, 'general'), REF_SUNDAY, '10:00', '11:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('ME-02', 87.33, r.summary.totalPayOwed, 'Casual Sunday 1hr → 2hr min @1.40×'); } catch(e) { recordText('ME-02', 87.33, 'ERROR', 'FAIL', e.message); }
}

async function runAllowanceTests() {
  console.log('\n═══ SECTION 5 — ALLOWANCES ═══');
  try {
    const r = await pool.query("SELECT allowance_type, amount FROM allowances WHERE award_code = $1 AND effective_date >= '2025-07-01' AND amount > 0 ORDER BY allowance_type", [AWARD_CODE]);
    for (const row of r.rows) {
      const amt = parseFloat(row.amount);
      if (row.allowance_type === 'first_aid') record('AL-01', 0.56, amt, 'First aid per hour');
      if (row.allowance_type === 'meal') record('AL-02', 14.62, amt, 'Meal allowance');
      if (row.allowance_type === 'vehicle') record('AL-03', 0.98, amt, 'Vehicle per km');
      if (row.allowance_type === 'tool_tradesperson') record('AL-04', 15.83, amt, 'Tool tradesperson weekly');
      if (row.allowance_type === 'tractor_plant') record('AL-05', 0.84, amt, 'Tractor plant per hour');
    }
  } catch(e) { recordText('AL-01', 'N/A', 'ERROR', 'FAIL', e.message); }
}

async function runSuperTests() {
  console.log('\n═══ SECTION 6 — SUPERANNUATION ═══');
  try {
    // 7.6hr shift (under daily OT threshold) — all OTE
    const r = await calcShift('full_time', classId(3, 'general'), REF_MONDAY, '08:00', '16:06', { mealBreakTaken: true, mealBreakDuration: 30 });
    // 7.6hr × $26.70 = $202.92 × 0.12 = $24.35
    record('SU-01', 24.35, r.summary.superAmount, 'Super on 7.6hr weekday (daily threshold)');
  } catch(e) { recordText('SU-01', 24.35, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', classId(1, 'general'), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('SU-02', 0.12, r.summary.sgcRate, 'SGC 12%'); } catch(e) { recordText('SU-02', 0.12, 'ERROR', 'FAIL', e.message); }
}

async function runRegressionTests() {
  console.log('\n═══ SECTION 7 — REGRESSION ═══');
  try { const r = await calcShift('casual', classId(1, 'general'), REF_SUNDAY, '10:00', '14:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('RT-01', 174.66, r.summary.totalPayOwed, 'Casual Grade 1 Sunday 4hr (1.40×)'); } catch(e) { recordText('RT-01', 174.66, 'ERROR', 'FAIL', e.message); }
  try {
    const shifts = [];
    for (let d = 7; d <= 11; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '08:00', endTime: '16:30', mealBreakTaken: true, mealBreakDuration: 30 });
    const r = await calcMultiShift('full_time', classId(3, 'general'), shifts);
    record('RT-02', 1094.70, payOnly(r), 'FT Grade 3 40hr week');
  } catch(e) { recordText('RT-02', 1094.70, 'ERROR', 'FAIL', e.message); }
}

async function main() {
  console.log('WageCheck Amusement Award Test Runner — MA000080');
  console.log('═'.repeat(60));
  await t.init();
  await runBaseRateTests();
  await runPenaltyRateTests();
  await runOvertimeTests();
  await runMinEngagementTests();
  await runAllowanceTests();
  await runSuperTests();
  await runRegressionTests();
  t.printSummary();
  t.generateExcel();
  await t.cleanup();
}
main().catch(e => { console.error('Fatal:', e); t.cleanup(); process.exit(1); });
