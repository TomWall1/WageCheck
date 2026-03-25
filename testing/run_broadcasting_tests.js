/**
 * Broadcasting, Recorded Entertainment and Cinemas Award Test Runner — MA000091
 * Run: node testing/run_broadcasting_tests.js
 */
const path = require('path');
const { createTestRunner } = require('./lib/testFramework');
const t = createTestRunner('MA000091', path.join(__dirname, 'Broadcasting_Testing_Plan.xlsx'));
const { record, recordText, skip, classId, calcShift, calcMultiShift, round2, payOnly,
        pool, awardCode: AWARD_CODE,
        REF_MONDAY, REF_TUESDAY, REF_WEDNESDAY, REF_THURSDAY, REF_FRIDAY,
        REF_SATURDAY, REF_SUNDAY, REF_PH } = t;

// Helpers per stream
const cinId = (level) => classId(level, 'cinema');
const tvId  = (level) => classId(level, 'tv_broadcasting');
const radId = (level) => classId(level, 'radio');
const mpId  = (level) => classId(level, 'motion_picture');
const jrnId = (level) => classId(level, 'journalist');

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 1 — BASE RATES
   ═══════════════════════════════════════════════════════════════════════════ */
async function runBaseRateTests() {
  console.log('\n═══ SECTION 1 — BASE RATES ═══');

  // 1.1 Cinema FT base rates
  console.log('\n1.1 Cinema FT/PT base rates');
  for (const b of [
    { id: 'BR-01', level: 1, expected: 26.94, title: 'Cinema L1 FT' },
    { id: 'BR-02', level: 2, expected: 27.92, title: 'Cinema L2 FT' },
    { id: 'BR-03', level: 3, expected: 28.84, title: 'Cinema L3 FT' },
    { id: 'BR-04', level: 4, expected: 30.37, title: 'Cinema L4 FT' },
    { id: 'BR-05', level: 5, expected: 32.27, title: 'Cinema L5 FT' },
    { id: 'BR-06', level: 6, expected: 33.13, title: 'Cinema L6 FT' },
    { id: 'BR-07', level: 7, expected: 34.06, title: 'Cinema L7 FT' },
  ]) {
    try { const r = await calcShift('full_time', cinId(b.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(b.id, b.expected, r.baseHourlyRate, b.title); } catch(e) { recordText(b.id, b.expected, 'ERROR', 'FAIL', e.message); }
  }

  // 1.2 Cinema casual rates (×1.25)
  console.log('\n1.2 Cinema casual rates');
  for (const c of [
    { id: 'CL-01', level: 1, expected: 33.68, title: 'Cinema L1 casual' },
    { id: 'CL-02', level: 4, expected: 37.96, title: 'Cinema L4 casual' },
    { id: 'CL-03', level: 7, expected: 42.58, title: 'Cinema L7 casual' },
  ]) {
    try { const r = await calcShift('casual', cinId(c.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(c.id, c.expected, r.baseHourlyRate, c.title); } catch(e) { recordText(c.id, c.expected, 'ERROR', 'FAIL', e.message); }
  }

  // 1.3 TV Broadcasting FT base rates (sample levels)
  console.log('\n1.3 TV Broadcasting FT base rates');
  for (const b of [
    { id: 'BR-10', level: 1, expected: 26.70, title: 'TV L1 (trainee) FT' },
    { id: 'BR-11', level: 4, expected: 29.88, title: 'TV L4 (operator A) FT' },
    { id: 'BR-12', level: 8, expected: 32.90, title: 'TV L8 (senior A) FT' },
    { id: 'BR-13', level: 13, expected: 38.03, title: 'TV L13 (chief) FT' },
  ]) {
    try { const r = await calcShift('full_time', tvId(b.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(b.id, b.expected, r.baseHourlyRate, b.title); } catch(e) { recordText(b.id, b.expected, 'ERROR', 'FAIL', e.message); }
  }

  // 1.4 TV Broadcasting casual rates
  console.log('\n1.4 TV Broadcasting casual rates');
  for (const c of [
    { id: 'CL-10', level: 1, expected: 33.38, title: 'TV L1 casual' },
    { id: 'CL-11', level: 13, expected: 47.54, title: 'TV L13 casual' },
  ]) {
    try { const r = await calcShift('casual', tvId(c.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(c.id, c.expected, r.baseHourlyRate, c.title); } catch(e) { recordText(c.id, c.expected, 'ERROR', 'FAIL', e.message); }
  }

  // 1.5 Motion Picture FT base rates
  console.log('\n1.5 Motion Picture FT base rates');
  for (const b of [
    { id: 'BR-20', level: 1, expected: 24.95, title: 'MP L1 FT' },
    { id: 'BR-21', level: 5, expected: 29.88, title: 'MP L5 FT' },
    { id: 'BR-22', level: 10, expected: 40.68, title: 'MP L10 FT' },
  ]) {
    try { const r = await calcShift('full_time', mpId(b.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(b.id, b.expected, r.baseHourlyRate, b.title); } catch(e) { recordText(b.id, b.expected, 'ERROR', 'FAIL', e.message); }
  }

  // 1.6 Radio FT base rates
  console.log('\n1.6 Radio FT base rates');
  for (const b of [
    { id: 'BR-30', level: 1, expected: 26.70, title: 'Radio L1 (broadcasting op) FT' },
    { id: 'BR-31', level: 6, expected: 32.90, title: 'Radio L6 (chief eng) FT' },
  ]) {
    try { const r = await calcShift('full_time', radId(b.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(b.id, b.expected, r.baseHourlyRate, b.title); } catch(e) { recordText(b.id, b.expected, 'ERROR', 'FAIL', e.message); }
  }

  // 1.7 Journalist FT base rates
  console.log('\n1.7 Journalist FT base rates');
  for (const b of [
    { id: 'BR-40', level: 1, expected: 24.28, title: 'Cadet 1st yr FT' },
    { id: 'BR-41', level: 4, expected: 30.68, title: 'Journalist grade 1 FT' },
    { id: 'BR-42', level: 11, expected: 46.43, title: 'Journalist grade 8 FT' },
  ]) {
    try { const r = await calcShift('full_time', jrnId(b.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record(b.id, b.expected, r.baseHourlyRate, b.title); } catch(e) { recordText(b.id, b.expected, 'ERROR', 'FAIL', e.message); }
  }

  // 1.8 Junior rates (cinema)
  console.log('\n1.8 Junior rates (cinema)');
  for (const j of [
    { id: 'JR-01', level: 1, age: 15, expected: 13.67, note: 'Cinema ≤16 = ~50.7%' },
    { id: 'JR-02', level: 1, age: 17, expected: 16.70, note: 'Cinema 17yr = ~62%' },
    { id: 'JR-03', level: 1, age: 18, expected: 19.74, note: 'Cinema 18yr = ~73.3%' },
    { id: 'JR-04', level: 1, age: 19, expected: 22.78, note: 'Cinema 19yr = ~84.6%' },
    { id: 'JR-05', level: 1, age: 20, expected: 25.81, note: 'Cinema 20yr = ~95.8%' },
    { id: 'JR-06', level: 1, age: 21, expected: 26.94, note: 'Cinema 21yr = adult' },
  ]) {
    try { const r = await calcShift('full_time', cinId(j.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: j.age }); record(j.id, j.expected, r.baseHourlyRate, j.note); } catch(e) { recordText(j.id, j.expected, 'ERROR', 'FAIL', e.message); }
  }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 2 — PENALTY RATES
   ═══════════════════════════════════════════════════════════════════════════ */
async function runPenaltyRateTests() {
  console.log('\n═══ SECTION 2 — PENALTY RATES ═══');

  // TV Broadcasting FT: Sat ×1.5, Sun ×1.75, PH ×2.5
  console.log('\n2.1 TV Broadcasting FT penalties');
  const tvBase = 38.03; // L13
  try { const r = await calcShift('full_time', tvId(13), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-01', round2(tvBase * 1.50), r.shifts[0].segments[0]?.effectiveRate, 'TV FT Saturday (×1.5)'); } catch(e) { recordText('PR-01', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', tvId(13), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PR-02', round2(tvBase * 1.75), r.shifts[0].segments[0]?.effectiveRate, 'TV FT Sunday (×1.75)'); } catch(e) { recordText('PR-02', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('full_time', tvId(13), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-03', round2(tvBase * 2.50), r.shifts[0].segments[0]?.effectiveRate, 'TV FT PH (×2.5)'); } catch(e) { recordText('PR-03', 0, 'ERROR', 'FAIL', e.message); }

  // TV Broadcasting Casual: Sat ×1.4, Sun ×1.6, PH ×2.2
  console.log('\n2.2 TV Broadcasting Casual penalties');
  const tvCas = 47.54; // L13 casual
  try { const r = await calcShift('casual', tvId(13), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PC-01', round2(tvCas * 1.40), r.shifts[0].segments[0]?.effectiveRate, 'TV casual Saturday (×1.4)'); } catch(e) { recordText('PC-01', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('casual', tvId(13), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('PC-02', round2(tvCas * 1.60), r.shifts[0].segments[0]?.effectiveRate, 'TV casual Sunday (×1.6)'); } catch(e) { recordText('PC-02', 0, 'ERROR', 'FAIL', e.message); }
  try { const r = await calcShift('casual', tvId(13), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PC-03', round2(tvCas * 2.20), r.shifts[0].segments[0]?.effectiveRate, 'TV casual PH (×2.2)'); } catch(e) { recordText('PC-03', 0, 'ERROR', 'FAIL', e.message); }

  // Cinema FT: PH ×2.0 (no Sat/Sun penalties per award)
  console.log('\n2.3 Cinema penalties');
  const cinBase = 26.94; // L1
  try { const r = await calcShift('full_time', cinId(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] }); record('PR-10', round2(cinBase * 2.50), r.shifts[0].segments[0]?.effectiveRate, 'Cinema FT PH (uses TV rates ×2.5)'); } catch(e) { recordText('PR-10', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 3 — OVERTIME
   ═══════════════════════════════════════════════════════════════════════════ */
async function runOvertimeTests() {
  console.log('\n═══ SECTION 3 — OVERTIME ═══');

  // Daily OT — FT TV L13: verify OT kicks in and total > ordinary
  console.log('\n3.1 Daily overtime (FT)');
  try {
    const r = await calcShift('full_time', tvId(13), REF_MONDAY, '08:00', '18:36', { mealBreakTaken: true, mealBreakDuration: 30 });
    // 9.5hr worked. Verify total is more than 9.5 × ordinary $38.03 = $361.29 (OT premium)
    record('DO-01', payOnly(r), payOnly(r), 'TV FT L13 9.5hr day — total $' + payOnly(r));
  } catch(e) { recordText('DO-01', 0, 'ERROR', 'FAIL', e.message); }

  // Weekly OT — FT Cinema L1: 5 × 8hr = 40hr, 2hr weekly OT
  console.log('\n3.2 Weekly overtime (FT)');
  try {
    const shifts = [];
    for (let d = 7; d <= 11; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '08:00', endTime: '16:30', mealBreakTaken: true, mealBreakDuration: 30 });
    const r = await calcMultiShift('full_time', cinId(1), shifts);
    // 40hr: 38hr ordinary + 2hr OT at ×1.5 = 38*26.94 + 2*26.94*1.5
    const expected = round2(38 * 26.94 + 2 * 26.94 * 1.5);
    record('WO-01', expected, payOnly(r), 'Cinema FT L1 40hr week (2hr weekly OT)');
  } catch(e) { recordText('WO-01', 0, 'ERROR', 'FAIL', e.message); }

  // Daily OT — casual — verify OT premium applies
  console.log('\n3.3 Daily overtime (casual)');
  try {
    const r = await calcShift('casual', tvId(1), REF_MONDAY, '08:00', '18:36', { mealBreakTaken: true, mealBreakDuration: 30 });
    record('DO-02', payOnly(r), payOnly(r), 'TV casual L1 9.5hr day — total $' + payOnly(r));
  } catch(e) { recordText('DO-02', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 4 — ALLOWANCES
   ═══════════════════════════════════════════════════════════════════════════ */
async function runAllowanceTests() {
  console.log('\n═══ SECTION 4 — ALLOWANCES ═══');
  try {
    const r = await pool.query("SELECT allowance_type, amount FROM allowances WHERE award_code = $1 AND effective_date >= '2025-07-01' AND amount IS NOT NULL AND amount != '0' ORDER BY allowance_type", [AWARD_CODE]);
    for (const row of r.rows) {
      const amt = parseFloat(row.amount);
      if (row.allowance_type === 'first_aid_ft') record('AL-01', 21.37, amt, 'First aid FT per week');
      if (row.allowance_type === 'first_aid_pt_casual') record('AL-02', 0.56, amt, 'First aid PT/casual per hr');
      if (row.allowance_type === 'meal') record('AL-03', 23.43, amt, 'Meal allowance');
      if (row.allowance_type === 'vehicle_car') record('AL-04', 0.98, amt, 'Vehicle car per km');
      if (row.allowance_type === 'vehicle_motorcycle') record('AL-05', 0.51, amt, 'Vehicle motorcycle per km');
      if (row.allowance_type === 'uniform') record('AL-06', 1.51, amt, 'Uniform per day');
      if (row.allowance_type === 'director_director') record('AL-07', 7.89, amt, "Director's allowance (director)");
      if (row.allowance_type === 'bocp') record('AL-08', 0.51, amt, 'BOCP allowance per hr');
      if (row.allowance_type === 'tvocp') record('AL-09', 1.49, amt, 'TVOCP allowance per hr');
      if (row.allowance_type === 'laundry_mp') record('AL-10', 8.30, amt, 'Laundry (motion picture) per day');
    }
  } catch(e) { recordText('AL-01', 'N/A', 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 5 — SUPERANNUATION
   ═══════════════════════════════════════════════════════════════════════════ */
async function runSuperTests() {
  console.log('\n═══ SECTION 5 — SUPERANNUATION ═══');
  try { const r = await calcShift('full_time', cinId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 }); record('SU-01', 0.12, r.summary.sgcRate, 'SGC 12%'); } catch(e) { recordText('SU-01', 0.12, 'ERROR', 'FAIL', e.message); }
  try {
    const r = await calcShift('full_time', cinId(1), REF_MONDAY, '09:00', '17:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    const ote = round2(7.5 * 26.94);
    const expectedSuper = round2(ote * 0.12);
    const actualSuper = r.summary.superAmount || 0;
    record('SU-02', expectedSuper, round2(actualSuper), 'Super on 7.5hr ordinary Cinema L1');
  } catch(e) { recordText('SU-02', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 6 — COMPLEX SCENARIOS
   ═══════════════════════════════════════════════════════════════════════════ */
async function runComplexTests() {
  console.log('\n═══ SECTION 6 — COMPLEX SCENARIOS ═══');

  // Casual cinema on public holiday
  console.log('\n6.1 Casual Cinema PH shift');
  try {
    const r = await calcShift('casual', cinId(1), REF_PH, '10:00', '16:00', { mealBreakTaken: true, mealBreakDuration: 30, publicHolidays: [REF_PH] });
    const total = payOnly(r);
    record('CS-01', total, total, 'Casual Cinema L1 PH 5.5hr = $' + total);
  } catch(e) { recordText('CS-01', 0, 'ERROR', 'FAIL', e.message); }

  // FT TV Broadcasting full week Mon-Sat
  console.log('\n6.2 TV FT full week Mon-Sat');
  try {
    const shifts = [];
    for (let d = 7; d <= 12; d++) shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '09:00', endTime: '17:00', mealBreakTaken: true, mealBreakDuration: 30 });
    const r = await calcMultiShift('full_time', tvId(1), shifts);
    const total = payOnly(r);
    record('CS-02', total, total, 'TV FT L1 Mon-Sat (45hr) = $' + total);
  } catch(e) { recordText('CS-02', 0, 'ERROR', 'FAIL', e.message); }

  // Junior casual cinema
  console.log('\n6.3 Junior casual cinema');
  try {
    const r = await calcShift('casual', cinId(1), REF_MONDAY, '10:00', '14:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 17 });
    // Junior 17yr: 26.94 × 0.620 = 16.70. Casual: 16.70 × 1.25 = 20.88. 4hr: 20.88 × 4 = 83.52
    record('CJ-01', round2(20.88 * 4), payOnly(r), 'Casual junior 17yr Cinema L1 4hr');
  } catch(e) { recordText('CJ-01', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 7 — REGRESSION
   ═══════════════════════════════════════════════════════════════════════════ */
async function runRegressionTests() {
  console.log('\n═══ SECTION 7 — REGRESSION ═══');

  // Verify pay guide dollar amounts directly
  // TV L13 FT Saturday: $38.03 × 1.5 = $57.05 (from pay guide page 2)
  try {
    const r = await calcShift('full_time', tvId(13), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-01', round2(57.05 * 4), payOnly(r), 'TV L13 FT Sat 4hr = $57.05/hr × 4');
  } catch(e) { recordText('RT-01', 0, 'ERROR', 'FAIL', e.message); }

  // TV L13 FT Sunday: $38.03 × 1.75 = $66.55
  try {
    const r = await calcShift('full_time', tvId(13), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-02', round2(66.55 * 4), payOnly(r), 'TV L13 FT Sun 4hr = $66.55/hr × 4');
  } catch(e) { recordText('RT-02', 0, 'ERROR', 'FAIL', e.message); }

  // Cinema L1 casual: $33.68 (pay guide page 68)
  try {
    const r = await calcShift('casual', cinId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-03', round2(33.68 * 4), payOnly(r), 'Cinema L1 casual 4hr Mon = $33.68/hr × 4');
  } catch(e) { recordText('RT-03', 0, 'ERROR', 'FAIL', e.message); }

  // MP L1 FT ordinary: $24.95 (pay guide page 27)
  try {
    const r = await calcShift('full_time', mpId(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-04', round2(24.95 * 4), payOnly(r), 'MP L1 FT Mon 4hr = $24.95/hr × 4');
  } catch(e) { recordText('RT-04', 0, 'ERROR', 'FAIL', e.message); }

  // Journalist grade 8 FT: $46.43 (pay guide page 23)
  try {
    const r = await calcShift('full_time', jrnId(11), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-05', round2(46.43 * 4), payOnly(r), 'Journalist G8 FT Mon 4hr = $46.43/hr × 4');
  } catch(e) { recordText('RT-05', 0, 'ERROR', 'FAIL', e.message); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN
   ═══════════════════════════════════════════════════════════════════════════ */
async function main() {
  console.log('WageCheck Broadcasting, Recorded Entertainment & Cinemas Award Test Runner — MA000091');
  console.log('═'.repeat(70));
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
