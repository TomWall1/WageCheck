/**
 * Live Performance Award Test Runner — MA000081
 * Run: node testing/run_liveperformance_tests.js
 */
const path = require('path');
const { createTestRunner } = require('./lib/testFramework');
const t = createTestRunner('MA000081', path.join(__dirname, 'LivePerformance_Testing_Plan.xlsx'));

const { record, recordText, skip, classId, calcShift, calcMultiShift, round2, payOnly,
        pool, awardCode: AWARD_CODE,
        REF_MONDAY, REF_TUESDAY, REF_WEDNESDAY, REF_THURSDAY, REF_FRIDAY,
        REF_SATURDAY, REF_SUNDAY, REF_PH } = t;

// ══════════════════════════════════════════════════════════════════════════
async function runBaseRateTests() {
  console.log('\n═══ SECTION 1 — BASE RATES ═══');

  // 3 streams: general (production), touring_sl, dancer
  console.log('\n1.1 Production & Support Staff (general stream)');
  const prodTests = [
    { id: 'BR-01', level: 1, stream: 'general', expected: 24.28, title: 'Production L1' },
    { id: 'BR-02', level: 2, stream: 'general', expected: 26.30, title: 'Production L2' },
    { id: 'BR-03', level: 3, stream: 'general', expected: 27.58, title: 'Production L3' },
    { id: 'BR-04', level: 4, stream: 'general', expected: 28.12, title: 'Production L4' },
    { id: 'BR-05', level: 5, stream: 'general', expected: 29.00, title: 'Production L5' },
    { id: 'BR-06', level: 6, stream: 'general', expected: 29.88, title: 'Production L6' },
    { id: 'BR-07', level: 7, stream: 'general', expected: 31.80, title: 'Production L7' },
    { id: 'BR-08', level: 8, stream: 'general', expected: 32.89, title: 'Production L8' },
    { id: 'BR-09', level: 9, stream: 'general', expected: 36.34, title: 'Technical Manager' },
  ];

  console.log('\n1.2 Touring Sound & Lighting (includes embedded S&L allowance)');
  const tourTests = [
    { id: 'BR-10', level: 1, stream: 'touring_sl', expected: 28.53, title: 'Touring S&L L1' },
    { id: 'BR-11', level: 5, stream: 'touring_sl', expected: 34.07, title: 'Touring S&L L5' },
    { id: 'BR-12', level: 9, stream: 'touring_sl', expected: 42.70, title: 'Touring S&L Tech Mgr' },
  ];

  console.log('\n1.3 Company Dancers');
  const dancerTests = [
    { id: 'BR-13', level: 1, stream: 'dancer', expected: 30.68, title: 'Dancer L1' },
    { id: 'BR-14', level: 4, stream: 'dancer', expected: 33.93, title: 'Dancer L4' },
    { id: 'BR-15', level: 7, stream: 'dancer', expected: 37.85, title: 'Dancer L7' },
  ];

  for (const b of [...prodTests, ...tourTests, ...dancerTests]) {
    try {
      const r = await calcShift('full_time', classId(b.level, b.stream), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
      record(b.id, b.expected, r.baseHourlyRate, b.title);
    } catch (e) { recordText(b.id, b.expected, 'ERROR', 'FAIL', e.message); }
  }

  console.log('\n1.4 Casual rates (25% loading)');
  const casualTests = [
    { id: 'CL-01', level: 1, stream: 'general', expected: 30.35, title: 'Production L1 casual' },
    { id: 'CL-02', level: 6, stream: 'general', expected: 37.35, title: 'Production L6 casual' },
    { id: 'CL-03', level: 1, stream: 'touring_sl', expected: 35.66, title: 'Touring S&L L1 casual' },
    { id: 'CL-04', level: 1, stream: 'dancer', expected: 38.35, title: 'Dancer L1 casual' },
    { id: 'CL-05', level: 7, stream: 'dancer', expected: 47.31, title: 'Dancer L7 casual' },
  ];
  for (const c of casualTests) {
    try {
      const r = await calcShift('casual', classId(c.level, c.stream), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
      record(c.id, c.expected, r.baseHourlyRate, c.title);
    } catch (e) { recordText(c.id, c.expected, 'ERROR', 'FAIL', e.message); }
  }

  // No junior rates — adult rate applies to all ages
  console.log('\n1.5 No junior rates (adult rate for all ages)');
  try {
    const r = await calcShift('full_time', classId(1, 'general'), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 16 });
    record('JR-01', 24.28, r.baseHourlyRate, '16yr gets adult rate (no junior rates)');
  } catch (e) { recordText('JR-01', 24.28, 'ERROR', 'FAIL', e.message); }
  try {
    const r = await calcShift('full_time', classId(1, 'general'), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 15 });
    record('JR-02', 24.28, r.baseHourlyRate, '15yr gets adult rate');
  } catch (e) { recordText('JR-02', 24.28, 'ERROR', 'FAIL', e.message); }
}

// ══════════════════════════════════════════════════════════════════════════
async function runPenaltyRateTests() {
  console.log('\n═══ SECTION 2 — PENALTY RATES ═══');

  // MA000081: No Saturday penalty (1.0×), Sunday/PH = 2.0× FT, 1.80× casual
  // No evening/night time bands in the general penalty structure
  console.log('\n2.1 FT/PT penalty rates');
  const penTests = [
    { id: 'PR-01', level: 1, stream: 'general', base: 24.28, sat: 24.28, sun: 48.56, ph: 48.56 },
    { id: 'PR-02', level: 6, stream: 'general', base: 29.88, sat: 29.88, sun: 59.76, ph: 59.76 },
    { id: 'PR-03', level: 9, stream: 'general', base: 36.34, sat: 36.34, sun: 72.68, ph: 72.68 },
    { id: 'PR-04', level: 1, stream: 'dancer', base: 30.68, sat: 30.68, sun: 61.36, ph: 61.36 },
  ];
  for (const p of penTests) {
    const c = classId(p.level, p.stream);
    // Saturday = no penalty (1.0×)
    try {
      const r = await calcShift('full_time', c, REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
      record(`${p.id}-sat`, p.sat, r.shifts[0].segments[0]?.effectiveRate, `Saturday L${p.level} ${p.stream} = ordinary (no Sat penalty)`);
    } catch (e) { recordText(`${p.id}-sat`, p.sat, 'ERROR', 'FAIL', e.message); }
    // Sunday = 2.0×
    try {
      const r = await calcShift('full_time', c, REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
      record(`${p.id}-sun`, p.sun, r.shifts[0].segments[0]?.effectiveRate, `Sunday L${p.level} ${p.stream} = 2.0×`);
    } catch (e) { recordText(`${p.id}-sun`, p.sun, 'ERROR', 'FAIL', e.message); }
    // PH = 2.0×
    try {
      const r = await calcShift('full_time', c, REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] });
      record(`${p.id}-ph`, p.ph, r.shifts[0].segments[0]?.effectiveRate, `PH L${p.level} ${p.stream} = 2.0×`);
    } catch (e) { recordText(`${p.id}-ph`, p.ph, 'ERROR', 'FAIL', e.message); }
  }

  console.log('\n2.2 Casual penalty rates (Sunday/PH = 1.80×)');
  const casualPenTests = [
    { id: 'PC-01', level: 1, stream: 'general', sat: 30.35, sun: 54.63, ph: 54.63 },
    { id: 'PC-02', level: 6, stream: 'general', sat: 37.35, sun: 67.23, ph: 67.23 },
    { id: 'PC-03', level: 1, stream: 'dancer', sat: 38.35, sun: 69.03, ph: 69.03 },
  ];
  for (const c of casualPenTests) {
    const clsId = classId(c.level, c.stream);
    try {
      const r = await calcShift('casual', clsId, REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
      record(`${c.id}-sat`, c.sat, r.shifts[0].segments[0]?.effectiveRate, `Casual Saturday (no penalty)`);
    } catch (e) { recordText(`${c.id}-sat`, c.sat, 'ERROR', 'FAIL', e.message); }
    try {
      const r = await calcShift('casual', clsId, REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
      record(`${c.id}-sun`, c.sun, r.shifts[0].segments[0]?.effectiveRate, `Casual Sunday = 1.80×`);
    } catch (e) { recordText(`${c.id}-sun`, c.sun, 'ERROR', 'FAIL', e.message); }
    try {
      const r = await calcShift('casual', clsId, REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] });
      record(`${c.id}-ph`, c.ph, r.shifts[0].segments[0]?.effectiveRate, `Casual PH = 1.80×`);
    } catch (e) { recordText(`${c.id}-ph`, c.ph, 'ERROR', 'FAIL', e.message); }
  }
}

// ══════════════════════════════════════════════════════════════════════════
async function runOvertimeTests() {
  console.log('\n═══ SECTION 3 — OVERTIME ═══');
  const L4 = classId(4, 'general');

  // FT daily OT: 8hr threshold (different from other awards' 10hr!)
  // First 2hr (8-12hr band): ×1.5, after 12hr: ×2.0 — but wait, the DB thresholds
  // are at 8hr and 12hr. Actually: daily threshold_hours: 8 @1.5×, 12 @2.0×
  // So: first 4hr of daily OT (8-12) @1.5×, after 12hr @2.0×

  console.log('\n3.1 FT daily OT (8hr threshold)');
  // DO-01: 8hr — no OT
  try {
    const r = await calcShift('full_time', L4, REF_MONDAY, '08:00', '16:30', { mealBreakTaken: true, mealBreakDuration: 30 });
    record('DO-01', 224.96, payOnly(r), '8hr Mon, no daily OT');
  } catch (e) { recordText('DO-01', 224.96, 'ERROR', 'FAIL', e.message); }

  // DO-02: 10hr — 2hr OT @1.5×
  try {
    const r = await calcShift('full_time', L4, REF_MONDAY, '07:00', '17:30', { mealBreakTaken: true, mealBreakDuration: 30 });
    // 10hr. OT: 2hr @1.5×. Premium: 2×28.12×0.5 = $28.12. Base: 10×28.12 = $281.20. Total: $309.32
    record('DO-02', 309.32, payOnly(r), '10hr Mon, 2hr daily OT @1.5×');
  } catch (e) { recordText('DO-02', 309.32, 'ERROR', 'FAIL', e.message); }

  // Casual daily OT: 8hr threshold, ×1.40/×1.80
  console.log('\n3.2 Casual daily OT (8hr threshold, ×1.40/×1.80)');
  try {
    const r = await calcShift('casual', L4, REF_MONDAY, '07:00', '17:30', { mealBreakTaken: true, mealBreakDuration: 30 });
    // 10hr casual. OT: 2hr. Casual OT @1.40 applied to casual base.
    // Premium: 2× 35.15 × (1.40-1.0) = 2 × 35.15 × 0.40 = $28.12
    // Base: 10 × 35.15 = $351.50. Total: $379.62
    record('CO-01', 379.62, payOnly(r), 'Casual 10hr, 2hr daily OT @1.40×');
  } catch (e) { recordText('CO-01', 379.62, 'ERROR', 'FAIL', e.message); }

  // Weekly OT: 38hr/41hr thresholds (3hr first band)
  console.log('\n3.3 Weekly OT (38hr/41hr)');
  try {
    const shifts = [];
    for (let d = 7; d <= 11; d++) {
      shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '08:00', endTime: '16:30',
                    mealBreakTaken: true, mealBreakDuration: 30 });
    }
    const r = await calcMultiShift('full_time', L4, shifts);
    // 40hr. Weekly OT: 2hr @1.5×. Premium: 2×28.12×0.5 = $28.12
    record('WO-01', 1152.92, payOnly(r), '40hr week L4, 2hr weekly OT');
  } catch (e) { recordText('WO-01', 1152.92, 'ERROR', 'FAIL', e.message); }

  // Daily + weekly interaction
  console.log('\n3.4 Daily + weekly OT interaction');
  try {
    const shifts = [
      { date: REF_MONDAY, startTime: '07:00', endTime: '17:30', mealBreakTaken: true, mealBreakDuration: 30 }, // 10hr
      { date: REF_TUESDAY, startTime: '08:00', endTime: '16:30', mealBreakTaken: true, mealBreakDuration: 30 },
      { date: REF_WEDNESDAY, startTime: '08:00', endTime: '16:30', mealBreakTaken: true, mealBreakDuration: 30 },
      { date: REF_THURSDAY, startTime: '08:00', endTime: '16:30', mealBreakTaken: true, mealBreakDuration: 30 },
      { date: REF_FRIDAY, startTime: '08:00', endTime: '16:30', mealBreakTaken: true, mealBreakDuration: 30 },
    ];
    const r = await calcMultiShift('full_time', L4, shifts);
    // 42hr. Daily: 2hr Mon. Weekly: 4hr (42-38), minus 2hr daily = 2hr net.
    // Total OT: 4hr. No double-counting.
    recordText('DW-01', '240min OT', `${r.summary.overtimeMinutes}min`,
      r.summary.overtimeMinutes === 240 ? 'PASS' : 'FAIL',
      '42hr week with 10hr Mon — daily+weekly no double-count');
  } catch (e) { recordText('DW-01', '240min', 'ERROR', 'FAIL', e.message); }
}

// ══════════════════════════════════════════════════════════════════════════
async function runBreakTests() {
  console.log('\n═══ SECTION 4 — BREAKS ═══');
  const L1 = classId(1, 'general');

  try {
    const r = await calcShift('full_time', L1, REF_MONDAY, '09:00', '12:00', { mealBreakTaken: false, restBreakTaken: false });
    const hasRest = r.shifts[0].breakViolations.some(v => v.type === 'rest_break');
    recordText('RB-01', 'No rest flag', hasRest ? 'Flagged' : 'No flag', hasRest ? 'FAIL' : 'PASS', '3hr shift');
  } catch (e) { recordText('RB-01', 'No flag', 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', L1, REF_MONDAY, '09:00', '16:00', { mealBreakTaken: false });
    const hasMeal = r.shifts[0].breakViolations.some(v => v.type === 'meal_break');
    const hasDT = r.shifts[0].missedBreakApplied;
    recordText('MB-01', 'Violation + DT', `V:${hasMeal} DT:${hasDT}`, hasMeal && hasDT ? 'PASS' : 'FAIL', '7hr no meal');
  } catch (e) { recordText('MB-01', 'V+DT', 'ERROR', 'FAIL', e.message); }
}

// ══════════════════════════════════════════════════════════════════════════
async function runAllowanceTests() {
  console.log('\n═══ SECTION 5 — ALLOWANCES ═══');
  try {
    const r = await pool.query("SELECT allowance_type, amount FROM allowances WHERE award_code = $1 AND effective_date >= '2025-07-01' AND amount IS NOT NULL ORDER BY allowance_type", [AWARD_CODE]);
    for (const row of r.rows) {
      const amt = parseFloat(row.amount);
      if (row.allowance_type === 'incidentals_touring') record('AL-01', 22.19, amt, 'Incidentals touring per day');
      if (row.allowance_type === 'laundry_ft') record('AL-02', 4.50, amt, 'Laundry FT per week');
      if (row.allowance_type === 'laundry_pt_casual') record('AL-03', 3.60, amt, 'Laundry PT/casual per shift');
      if (row.allowance_type === 'meal_travelling') record('AL-04', 36.04, amt, 'Meal touring/travelling');
      if (row.allowance_type === 'meal_travelling_weekly') record('AL-05', 73.11, amt, 'Meal touring weekly (5+ days)');
      if (row.allowance_type === 'meal_working') record('AL-06', 23.18, amt, 'Meal working late (past 8pm)');
      if (row.allowance_type === 'tools_hod') record('AL-07', 11.03, amt, 'Tools HOD per week');
      if (row.allowance_type === 'tools_other') record('AL-08', 1.14, amt, 'Tools other per shift');
      if (row.allowance_type === 'vehicle') record('AL-09', 0.98, amt, 'Vehicle per km');
    }
  } catch (e) { recordText('AL-01', 'N/A', 'ERROR', 'FAIL', e.message); }
}

// ══════════════════════════════════════════════════════════════════════════
async function runMealAllowanceTriggerTests() {
  console.log('\n═══ SECTION 6 — MEAL ALLOWANCE (past 8pm trigger) ═══');
  const L4 = classId(4, 'general');

  // MA-01: Shift ending before 8pm — no meal allowance
  try {
    const r = await calcShift('full_time', L4, REF_MONDAY, '09:00', '19:30', { mealBreakTaken: true, mealBreakDuration: 30 });
    record('MA-01', 0, r.summary.mealAllowancePay, 'Shift ends before 8pm — no meal allowance');
  } catch (e) { recordText('MA-01', 0, 'ERROR', 'FAIL', e.message); }

  // MA-02: Shift extending past 8pm — 1 meal allowance
  try {
    const r = await calcShift('full_time', L4, REF_MONDAY, '14:00', '21:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    // Shift ends 9pm, crosses 8pm. 1hr past 8pm → 1 meal.
    record('MA-02', 23.18, r.summary.mealAllowancePay, 'Shift extends past 8pm — 1 meal');
  } catch (e) { recordText('MA-02', 23.18, 'ERROR', 'FAIL', e.message); }

  // MA-03: Shift well past 8pm — multiple meals (1 per 4hr past 8pm)
  try {
    const r = await calcShift('full_time', L4, REF_MONDAY, '14:00', '01:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    // 8pm to 1am = 5hr past 8pm → ceil(5/4) = 2 meals
    const expectedMeals = 2 * 23.18;
    record('MA-03', expectedMeals, r.summary.mealAllowancePay, 'Shift to 1am — 2 meals (5hr past 8pm)');
  } catch (e) { recordText('MA-03', 46.36, 'ERROR', 'FAIL', e.message); }

  // MA-04: Casual gets NO meal allowance (FT/PT only for MA000081)
  try {
    const r = await calcShift('casual', L4, REF_MONDAY, '14:00', '21:00', { mealBreakTaken: true, mealBreakDuration: 30 });
    record('MA-04', 0, r.summary.mealAllowancePay, 'Casual gets no meal allowance');
  } catch (e) { recordText('MA-04', 0, 'ERROR', 'FAIL', e.message); }
}

// ══════════════════════════════════════════════════════════════════════════
async function runMinEngagementTests() {
  console.log('\n═══ SECTION 7 — MINIMUM ENGAGEMENT (2hr) ═══');

  try {
    const r = await calcShift('casual', classId(1, 'general'), REF_MONDAY, '10:00', '11:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('ME-01', 60.70, r.summary.totalPayOwed, 'Casual 1hr → 2hr minimum');
  } catch (e) { recordText('ME-01', 60.70, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('casual', classId(1, 'general'), REF_SUNDAY, '10:00', '11:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    // Sunday 1.80×: 30.35 × 1.80 = 54.63/hr × 2hr = $109.26
    record('ME-02', 109.26, r.summary.totalPayOwed, 'Casual Sunday 1hr → 2hr min at 1.80× rate');
  } catch (e) { recordText('ME-02', 109.26, 'ERROR', 'FAIL', e.message); }
}

// ══════════════════════════════════════════════════════════════════════════
async function runComplexScenarioTests() {
  console.log('\n═══ SECTION 8 — COMPLEX SCENARIOS ═══');

  // CS-01: Touring S&L has embedded allowance — verify rate includes it
  console.log('\nCS-01: Touring S&L embedded allowance');
  try {
    const r = await calcShift('full_time', classId(1, 'touring_sl'), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    // Touring S&L L1 = $28.53 (includes S&L allowance of $4.25/hr)
    // Base production L1 = $24.28 + $4.25 = $28.53 ✓
    record('CS-01', 28.53, r.baseHourlyRate, 'Touring S&L L1 includes $4.25/hr embedded allowance');
  } catch (e) { recordText('CS-01', 28.53, 'ERROR', 'FAIL', e.message); }

  // CS-02: No Saturday penalty — Saturday = ordinary
  console.log('\nCS-02: Saturday = ordinary (no penalty)');
  try {
    const rMon = await calcShift('full_time', classId(4, 'general'), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    const rSat = await calcShift('full_time', classId(4, 'general'), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    recordText('CS-02', 'Mon=Sat', `Mon=$${round2(rMon.summary.totalPayOwed)} Sat=$${round2(rSat.summary.totalPayOwed)}`,
      Math.abs(rMon.summary.totalPayOwed - rSat.summary.totalPayOwed) < 0.01 ? 'PASS' : 'FAIL',
      'Saturday pay should equal Monday (no penalty)');
  } catch (e) { recordText('CS-02', 'Mon=Sat', 'ERROR', 'FAIL', e.message); }

  // CS-03: Sunday 2.0× on all streams
  console.log('\nCS-03: Sunday across streams');
  try {
    const r = await calcShift('full_time', classId(4, 'general'), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    // L4 production: $28.12 × 2.0 = $56.24/hr × 4hr = $224.96
    record('CS-03', 224.96, r.summary.totalPayOwed, 'Production L4 Sunday 4hr (2.0× = $56.24/hr)');
  } catch (e) { recordText('CS-03', 224.96, 'ERROR', 'FAIL', e.message); }

  // CS-04: Full week 46hr with Sunday shift
  console.log('\nCS-04: Full week with Sunday');
  try {
    const shifts = [
      { date: REF_MONDAY, startTime: '09:00', endTime: '17:30', mealBreakTaken: true, mealBreakDuration: 30 },
      { date: REF_TUESDAY, startTime: '09:00', endTime: '17:30', mealBreakTaken: true, mealBreakDuration: 30 },
      { date: REF_WEDNESDAY, startTime: '09:00', endTime: '17:30', mealBreakTaken: true, mealBreakDuration: 30 },
      { date: REF_THURSDAY, startTime: '09:00', endTime: '17:30', mealBreakTaken: true, mealBreakDuration: 30 },
      { date: REF_SATURDAY, startTime: '09:00', endTime: '17:30', mealBreakTaken: true, mealBreakDuration: 30 },
      { date: REF_SUNDAY, startTime: '09:00', endTime: '15:30', mealBreakTaken: true, mealBreakDuration: 30 },
    ];
    const r = await calcMultiShift('full_time', classId(4, 'general'), shifts);
    const total = payOnly(r);
    // 46hr: 40hr weekday (Sat=ordinary) + 6hr Sunday (2.0×)
    // Daily OT: Mon-Sat each 8hr, no daily OT (at threshold)
    // Weekly OT on top
    recordText('CS-04', '>$1400', `$${total}`, total > 1400 ? 'PASS' : 'FAIL',
      `46hr week with Sunday = $${total}`);
  } catch (e) { recordText('CS-04', '>$1400', 'ERROR', 'FAIL', e.message); }
}

// ══════════════════════════════════════════════════════════════════════════
async function runSuperTests() {
  console.log('\n═══ SECTION 9 — SUPERANNUATION ═══');

  try {
    const r = await calcShift('full_time', classId(4, 'general'), REF_MONDAY, '08:00', '16:30', { mealBreakTaken: true, mealBreakDuration: 30 });
    record('SU-01', 27.00, r.summary.superAmount, 'Super on 8hr weekday L4');
  } catch (e) { recordText('SU-01', 27.00, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', classId(4, 'general'), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('SU-02', 0.12, r.summary.sgcRate, 'SGC rate = 12%');
  } catch (e) { recordText('SU-02', 0.12, 'ERROR', 'FAIL', e.message); }
}

// ══════════════════════════════════════════════════════════════════════════
async function runRegressionTests() {
  console.log('\n═══ SECTION 10 — REGRESSION ═══');

  try {
    const r = await calcShift('casual', classId(1, 'general'), REF_SUNDAY, '10:00', '14:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-01', 218.52, r.summary.totalPayOwed, 'Casual Production L1 Sunday 4hr (1.80×)');
  } catch (e) { recordText('RT-01', 218.52, 'ERROR', 'FAIL', e.message); }

  try {
    const shifts = [];
    for (let d = 7; d <= 11; d++) {
      shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '08:00', endTime: '16:30',
                    mealBreakTaken: true, mealBreakDuration: 30 });
    }
    const r = await calcMultiShift('full_time', classId(4, 'general'), shifts);
    record('RT-02', 1152.92, payOnly(r), 'FT L4 40hr week (excl meal)');
  } catch (e) { recordText('RT-02', 1152.92, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', classId(1, 'touring_sl'), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    // Touring S&L L1 Sunday: $28.53 × 2.0 × 4hr = $228.24
    record('RT-03', 228.24, r.summary.totalPayOwed, 'Touring S&L L1 Sunday 4hr');
  } catch (e) { recordText('RT-03', 228.24, 'ERROR', 'FAIL', e.message); }
}

// ══════════════════════════════════════════════════════════════════════════
async function main() {
  console.log('WageCheck Live Performance Award Test Runner — MA000081');
  console.log('═'.repeat(60));

  await t.init();

  await runBaseRateTests();
  await runPenaltyRateTests();
  await runOvertimeTests();
  await runBreakTests();
  await runAllowanceTests();
  await runMealAllowanceTriggerTests();
  await runMinEngagementTests();
  await runComplexScenarioTests();
  await runSuperTests();
  await runRegressionTests();

  t.printSummary();
  t.generateExcel();
  await t.cleanup();
}

main().catch(e => {
  console.error('Fatal error:', e);
  t.cleanup();
  process.exit(1);
});
