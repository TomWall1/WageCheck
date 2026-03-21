/**
 * Racing Clubs Events Award Test Runner — MA000013
 * Run: node testing/run_racing_tests.js
 *
 * This is the most complex award: liquor vs non-liquor streams,
 * all-in rates, flat dollar Sunday/PH additions, junior rate overrides,
 * 4hr minimum engagement for ALL employment types.
 */
const path = require('path');
const { createTestRunner } = require('./lib/testFramework');
const t = createTestRunner('MA000013', path.join(__dirname, 'Racing_Testing_Plan.xlsx'));

const { record, recordText, skip, classId, calcShift, calcMultiShift, round2, payOnly,
        pool, awardCode: AWARD_CODE,
        REF_MONDAY, REF_TUESDAY, REF_WEDNESDAY, REF_THURSDAY, REF_FRIDAY,
        REF_SATURDAY, REF_SUNDAY, REF_PH } = t;

// ══════════════════════════════════════════════════════════════════════════
async function runBaseRateTests() {
  console.log('\n═══ SECTION 1 — BASE RATES ═══');

  console.log('\n1.1 Non-liquor FT/PT rates (racecourse + official streams)');
  const baseTests = [
    { id: 'BR-01', level: 0, stream: 'racecourse', expected: 24.28, title: 'Introductory' },
    { id: 'BR-02', level: 1, stream: 'racecourse', expected: 24.95, title: 'Grade 1 Racecourse' },
    { id: 'BR-03', level: 2, stream: 'racecourse', expected: 25.85, title: 'Grade 2 Racecourse' },
    { id: 'BR-04', level: 3, stream: 'racecourse', expected: 26.70, title: 'Grade 3 Racecourse' },
    { id: 'BR-05', level: 4, stream: 'racecourse', expected: 28.12, title: 'Grade 4 Racecourse' },
    { id: 'BR-06', level: 1, stream: 'official', expected: 28.12, title: 'Grade 1 Raceday Official' },
    { id: 'BR-07', level: 2, stream: 'official', expected: 29.00, title: 'Grade 2 Raceday Official' },
    { id: 'BR-08', level: 3, stream: 'official', expected: 29.88, title: 'Grade 3 Raceday Official' },
    { id: 'BR-09', level: 4, stream: 'official', expected: 30.68, title: 'Grade 4 Raceday Official' },
  ];
  for (const b of baseTests) {
    try {
      const r = await calcShift('full_time', classId(b.level, b.stream), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
      record(b.id, b.expected, r.baseHourlyRate, b.title);
    } catch (e) { recordText(b.id, b.expected, 'ERROR', 'FAIL', e.message); }
  }

  console.log('\n1.2 Non-liquor casual rates');
  const casualTests = [
    { id: 'CL-01', level: 0, stream: 'racecourse', expected: 30.35, title: 'Intro casual' },
    { id: 'CL-02', level: 1, stream: 'racecourse', expected: 31.19, title: 'Grade 1 RC casual' },
    { id: 'CL-03', level: 3, stream: 'racecourse', expected: 33.38, title: 'Grade 3 RC casual' },
    { id: 'CL-04', level: 4, stream: 'official', expected: 38.35, title: 'Grade 4 Official casual' },
  ];
  for (const c of casualTests) {
    try {
      const r = await calcShift('casual', classId(c.level, c.stream), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
      record(c.id, c.expected, r.baseHourlyRate, c.title);
    } catch (e) { recordText(c.id, c.expected, 'ERROR', 'FAIL', e.message); }
  }

  // Liquor casual — all-in Mon-Sat rate (not base × 1.25)
  console.log('\n1.3 Liquor casual all-in rates');
  try {
    const r = await calcShift('casual', classId(1, 'liquor'), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('CL-05', 34.84, r.baseHourlyRate, 'Adult liquor casual (all-in Mon-Sat)');
  } catch (e) { recordText('CL-05', 34.84, 'ERROR', 'FAIL', e.message); }
  try {
    const r = await calcShift('casual', classId(2, 'liquor'), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    // Junior glass collector under 19: DB has $27.86, pay guide $27.87
    record('CL-06', 27.87, r.baseHourlyRate, 'Junior glass collector (under 19) liquor');
  } catch (e) { recordText('CL-06', 27.87, 'ERROR', 'FAIL', e.message); }

  // Junior rates — non-liquor under-19 = 75% of introductory FT rate
  console.log('\n1.4 Junior rates (non-liquor under-19 = 75% of intro FT)');
  try {
    // Under-19 FT: 75% of $24.28 = $18.21
    const r = await calcShift('full_time', classId(1, 'racecourse'), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 18 });
    record('JR-01', 18.21, r.baseHourlyRate, 'Non-liquor under-19 FT = 75% of intro ($18.21)');
  } catch (e) { recordText('JR-01', 18.21, 'ERROR', 'FAIL', e.message); }
  try {
    // Under-19 casual: $18.21 × 1.25 = $22.76
    const r = await calcShift('casual', classId(1, 'racecourse'), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 18 });
    record('JR-02', 22.76, r.baseHourlyRate, 'Non-liquor under-19 casual = $18.21 × 1.25');
  } catch (e) { recordText('JR-02', 22.76, 'ERROR', 'FAIL', e.message); }
  try {
    // 19+ = adult rate regardless
    const r = await calcShift('full_time', classId(1, 'racecourse'), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 19 });
    record('JR-03', 24.95, r.baseHourlyRate, '19yr = full adult rate');
  } catch (e) { recordText('JR-03', 24.95, 'ERROR', 'FAIL', e.message); }
  try {
    // Under-19 on a HIGHER grade still gets 75% of intro, not 75% of their grade
    const r = await calcShift('full_time', classId(3, 'racecourse'), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 17 });
    record('JR-04', 18.21, r.baseHourlyRate, 'Grade 3 under-19 FT = still 75% of intro (not grade 3)');
  } catch (e) { recordText('JR-04', 18.21, 'ERROR', 'FAIL', e.message); }
}

// ══════════════════════════════════════════════════════════════════════════
async function runPenaltyRateTests() {
  console.log('\n═══ SECTION 2 — PENALTY RATES ═══');

  // Non-liquor FT/PT: No Saturday penalty (1.0×), Sunday 2.0×, PH 2.50×
  console.log('\n2.1 Non-liquor FT/PT penalties');
  const penTests = [
    { id: 'PR-01', level: 0, stream: 'racecourse', base: 24.28, sat: 24.28, sun: 48.56, ph: 60.70 },
    { id: 'PR-02', level: 3, stream: 'racecourse', base: 26.70, sat: 26.70, sun: 53.40, ph: 66.75 },
    { id: 'PR-03', level: 4, stream: 'official', base: 30.68, sat: 30.68, sun: 61.36, ph: 76.70 },
  ];
  for (const p of penTests) {
    const c = classId(p.level, p.stream);
    try {
      const r = await calcShift('full_time', c, REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
      record(`${p.id}-sat`, p.sat, r.shifts[0].segments[0]?.effectiveRate, `Saturday (no penalty, 1.0×)`);
    } catch (e) { recordText(`${p.id}-sat`, p.sat, 'ERROR', 'FAIL', e.message); }
    try {
      const r = await calcShift('full_time', c, REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
      record(`${p.id}-sun`, p.sun, r.shifts[0].segments[0]?.effectiveRate, `Sunday 2.0×`);
    } catch (e) { recordText(`${p.id}-sun`, p.sun, 'ERROR', 'FAIL', e.message); }
    try {
      const r = await calcShift('full_time', c, REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] });
      record(`${p.id}-ph`, p.ph, r.shifts[0].segments[0]?.effectiveRate, `PH 2.50×`);
    } catch (e) { recordText(`${p.id}-ph`, p.ph, 'ERROR', 'FAIL', e.message); }
  }

  // Non-liquor casual: Sunday 1.60×, PH 2.0×
  console.log('\n2.2 Non-liquor casual penalties');
  try {
    const r = await calcShift('casual', classId(0, 'racecourse'), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    // Casual intro Sunday: 30.35 × 1.60 = $48.56
    record('PC-01', 48.56, r.shifts[0].segments[0]?.effectiveRate, 'Casual intro Sunday 1.60×');
  } catch (e) { recordText('PC-01', 48.56, 'ERROR', 'FAIL', e.message); }
  try {
    const r = await calcShift('casual', classId(0, 'racecourse'), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] });
    // Casual intro PH: 30.35 × 2.0 = $60.70
    record('PC-02', 60.70, r.shifts[0].segments[0]?.effectiveRate, 'Casual intro PH 2.0×');
  } catch (e) { recordText('PC-02', 60.70, 'ERROR', 'FAIL', e.message); }

  // Night cleaning: casual 23:00-07:00 = 1.24× of casual base
  try {
    const r = await calcShift('casual', classId(1, 'racecourse'), REF_MONDAY, '23:00', '03:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    // 31.1875 × 1.24 = $38.67
    const nightRate = r.shifts[0].segments[0]?.effectiveRate;
    record('PC-03', 38.67, nightRate, 'Night cleaning 11pm-3am = 1.24× casual');
  } catch (e) { recordText('PC-03', 38.67, 'ERROR', 'FAIL', e.message); }

  // CRITICAL: Liquor casual Sunday/PH — flat dollar ADDITIONS, not multipliers
  console.log('\n2.3 Liquor casual Sunday/PH (flat dollar additions)');
  try {
    const r = await calcShift('casual', classId(1, 'liquor'), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    // Adult liquor Sunday: $34.84 + $12.30 = $47.14
    const sunRate = r.shifts[0].segments[0]?.effectiveRate;
    record('PC-04', 47.14, sunRate, 'Adult liquor Sunday = $34.84 + $12.30 addition');
  } catch (e) { recordText('PC-04', 47.14, 'ERROR', 'FAIL', e.message); }
  try {
    const r = await calcShift('casual', classId(1, 'liquor'), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] });
    // Adult liquor PH: $34.84 + $24.13 = $58.97
    const phRate = r.shifts[0].segments[0]?.effectiveRate;
    record('PC-05', 58.97, phRate, 'Adult liquor PH = $34.84 + $24.13 addition');
  } catch (e) { recordText('PC-05', 58.97, 'ERROR', 'FAIL', e.message); }
  try {
    const r = await calcShift('casual', classId(2, 'liquor'), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    // Junior liquor Sunday: $27.86 + $9.86 = $37.72
    const sunRate = r.shifts[0].segments[0]?.effectiveRate;
    record('PC-06', 37.72, sunRate, 'Junior liquor Sunday = $27.86 + $9.86 addition');
  } catch (e) { recordText('PC-06', 37.72, 'ERROR', 'FAIL', e.message); }
  try {
    const r = await calcShift('casual', classId(2, 'liquor'), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] });
    // Junior liquor PH: $27.86 + $19.32 = $47.18
    const phRate = r.shifts[0].segments[0]?.effectiveRate;
    record('PC-07', 47.18, phRate, 'Junior liquor PH = $27.86 + $19.32 addition');
  } catch (e) { recordText('PC-07', 47.18, 'ERROR', 'FAIL', e.message); }

  // Liquor Saturday = ordinary (all-in rate already covers Mon-Sat)
  try {
    const r = await calcShift('casual', classId(1, 'liquor'), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('PC-08', 34.84, r.shifts[0].segments[0]?.effectiveRate, 'Liquor Saturday = ordinary (all-in covers Mon-Sat)');
  } catch (e) { recordText('PC-08', 34.84, 'ERROR', 'FAIL', e.message); }
}

// ══════════════════════════════════════════════════════════════════════════
async function runOvertimeTests() {
  console.log('\n═══ SECTION 3 — OVERTIME ═══');

  // FT/PT: daily 8hr/10hr, weekly 38hr/40hr
  console.log('\n3.1 FT/PT daily OT (8hr threshold)');
  try {
    const r = await calcShift('full_time', classId(3, 'racecourse'), REF_MONDAY, '08:00', '16:30', { mealBreakTaken: true, mealBreakDuration: 30 });
    record('DO-01', 213.60, payOnly(r), '8hr Mon, no daily OT');
  } catch (e) { recordText('DO-01', 213.60, 'ERROR', 'FAIL', e.message); }
  try {
    const r = await calcShift('full_time', classId(3, 'racecourse'), REF_MONDAY, '07:00', '16:30', { mealBreakTaken: true, mealBreakDuration: 30 });
    // 9hr. OT: 1hr @1.5×. Premium: 26.70 × 0.5 = $13.35
    record('DO-02', 253.65, payOnly(r), '9hr Mon, 1hr daily OT @1.5×');
  } catch (e) { recordText('DO-02', 253.65, 'ERROR', 'FAIL', e.message); }

  console.log('\n3.2 Weekly OT (38hr/40hr)');
  try {
    const shifts = [];
    for (let d = 7; d <= 11; d++) {
      shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '08:00', endTime: '16:30',
                    mealBreakTaken: true, mealBreakDuration: 30 });
    }
    const r = await calcMultiShift('full_time', classId(3, 'racecourse'), shifts);
    record('WO-01', 1094.70, payOnly(r), '40hr week, 2hr OT (excl meal)');
  } catch (e) { recordText('WO-01', 1094.70, 'ERROR', 'FAIL', e.message); }

  // Casual non-liquor OT: ×1.40/×1.80
  console.log('\n3.3 Casual non-liquor OT (×1.40/×1.80)');
  try {
    const r = await calcShift('casual', classId(1, 'racecourse'), REF_MONDAY, '07:00', '16:30', { mealBreakTaken: true, mealBreakDuration: 30 });
    // 9hr casual. OT: 1hr @1.40×. Premium: 31.1875 × 0.40 = $12.48
    // Base: 9 × 31.1875 = $280.69. Total: $293.17
    record('CO-01', 293.17, payOnly(r), 'Casual RC Grade 1, 9hr, 1hr OT @1.40×');
  } catch (e) { recordText('CO-01', 293.17, 'ERROR', 'FAIL', e.message); }

  // Liquor casual OT: ×1.75/×2.25 (remapped from ×1.40/×1.80)
  console.log('\n3.4 Liquor casual OT (×1.75/×2.25)');
  try {
    const r = await calcShift('casual', classId(1, 'liquor'), REF_MONDAY, '07:00', '16:30', { mealBreakTaken: true, mealBreakDuration: 30 });
    // 9hr liquor casual. OT: 1hr @1.75×. Premium: 34.84 × 0.75 = $26.13
    // Base: 9 × 34.84 = $313.56. Total: $339.69
    record('CO-02', 339.69, payOnly(r), 'Liquor casual 9hr, 1hr OT @1.75×');
  } catch (e) { recordText('CO-02', 339.69, 'ERROR', 'FAIL', e.message); }
}

// ══════════════════════════════════════════════════════════════════════════
async function runBreakTests() {
  console.log('\n═══ SECTION 4 — BREAKS ═══');

  try {
    const r = await calcShift('full_time', classId(1, 'racecourse'), REF_MONDAY, '09:00', '16:00', { mealBreakTaken: false });
    const hasMeal = r.shifts[0].breakViolations.some(v => v.type === 'meal_break');
    const hasDT = r.shifts[0].missedBreakApplied;
    recordText('MB-01', 'Violation + DT', `V:${hasMeal} DT:${hasDT}`, hasMeal && hasDT ? 'PASS' : 'FAIL', '7hr no meal');
  } catch (e) { recordText('MB-01', 'V+DT', 'ERROR', 'FAIL', e.message); }
}

// ══════════════════════════════════════════════════════════════════════════
async function runAllowanceTests() {
  console.log('\n═══ SECTION 5 — ALLOWANCES ═══');
  try {
    const r = await pool.query("SELECT allowance_type, amount FROM allowances WHERE award_code = $1 AND effective_date >= '2025-07-01' ORDER BY allowance_type", [AWARD_CODE]);
    for (const row of r.rows) {
      const amt = parseFloat(row.amount);
      if (row.allowance_type === 'first_aid') record('AL-01', 0.56, amt, 'First aid per hour');
      if (row.allowance_type === 'late_finish_liquor') record('AL-02', 5.62, amt, 'Late finish liquor per engagement');
      if (row.allowance_type === 'meal') record('AL-03', 14.62, amt, 'Meal allowance');
      if (row.allowance_type === 'supervisor_liquor') record('AL-04', 25.64, amt, 'Supervisor liquor per week');
      if (row.allowance_type === 'wet_work_footwear') record('AL-05', 6.00, amt, 'Wet work footwear per meeting');
    }
  } catch (e) { recordText('AL-01', 'N/A', 'ERROR', 'FAIL', e.message); }
}

// ══════════════════════════════════════════════════════════════════════════
async function runMinEngagementTests() {
  console.log('\n═══ SECTION 6 — MINIMUM ENGAGEMENT (4hr for ALL — longest of any award) ═══');

  // Casual non-liquor
  try {
    const r = await calcShift('casual', classId(0, 'racecourse'), REF_MONDAY, '10:00', '12:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    // 4hr min × $30.35 = $121.40
    record('ME-01', 121.40, r.summary.totalPayOwed, 'Casual 2hr → 4hr minimum');
  } catch (e) { recordText('ME-01', 121.40, 'ERROR', 'FAIL', e.message); }

  // PT non-liquor
  try {
    const r = await calcShift('part_time', classId(0, 'racecourse'), REF_MONDAY, '10:00', '12:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    // 4hr min × $24.28 = $97.12
    record('ME-02', 97.12, r.summary.totalPayOwed, 'PT 2hr → 4hr minimum');
  } catch (e) { recordText('ME-02', 97.12, 'ERROR', 'FAIL', e.message); }

  // FT also has 4hr minimum (unique to MA000013)
  try {
    const r = await calcShift('full_time', classId(0, 'racecourse'), REF_MONDAY, '10:00', '12:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('ME-03', 97.12, r.summary.totalPayOwed, 'FT 2hr → 4hr minimum (FT has min in MA000013!)');
  } catch (e) { recordText('ME-03', 97.12, 'ERROR', 'FAIL', e.message); }

  // Liquor casual minimum payment Mon-Sat
  try {
    const r = await calcShift('casual', classId(1, 'liquor'), REF_MONDAY, '10:00', '12:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    // 4hr × $34.84 = $139.36
    record('ME-04', 139.36, r.summary.totalPayOwed, 'Liquor casual 2hr → 4hr min ($139.36)');
  } catch (e) { recordText('ME-04', 139.36, 'ERROR', 'FAIL', e.message); }

  // Liquor casual Sunday minimum payment
  try {
    const r = await calcShift('casual', classId(1, 'liquor'), REF_SUNDAY, '10:00', '12:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    // 4hr × ($34.84 + $12.30) = 4 × $47.14 = $188.56
    record('ME-05', 188.56, r.summary.totalPayOwed, 'Liquor casual Sunday 2hr → 4hr min');
  } catch (e) { recordText('ME-05', 188.56, 'ERROR', 'FAIL', e.message); }

  // Over minimum — no adjustment
  try {
    const r = await calcShift('casual', classId(0, 'racecourse'), REF_MONDAY, '09:00', '14:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    // 5hr × $30.35 = $151.75
    record('ME-06', 151.75, r.summary.totalPayOwed, 'Casual 5hr — over 4hr minimum');
  } catch (e) { recordText('ME-06', 151.75, 'ERROR', 'FAIL', e.message); }
}

// ══════════════════════════════════════════════════════════════════════════
async function runComplexScenarioTests() {
  console.log('\n═══ SECTION 7 — COMPLEX SCENARIOS ═══');

  // CS-01: Liquor Mon-Sat rate is all-in — verify same rate Mon through Sat
  console.log('\nCS-01: Liquor all-in Mon=Sat');
  try {
    const rMon = await calcShift('casual', classId(1, 'liquor'), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    const rSat = await calcShift('casual', classId(1, 'liquor'), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    recordText('CS-01', 'Mon=Sat', `Mon=$${round2(rMon.summary.totalPayOwed)} Sat=$${round2(rSat.summary.totalPayOwed)}`,
      Math.abs(rMon.summary.totalPayOwed - rSat.summary.totalPayOwed) < 0.01 ? 'PASS' : 'FAIL',
      'Liquor all-in Mon-Sat: Monday and Saturday should be identical');
  } catch (e) { recordText('CS-01', 'Mon=Sat', 'ERROR', 'FAIL', e.message); }

  // CS-02: Non-liquor FT Saturday = ordinary (no penalty)
  console.log('\nCS-02: Non-liquor FT Sat = ordinary');
  try {
    const rMon = await calcShift('full_time', classId(1, 'racecourse'), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    const rSat = await calcShift('full_time', classId(1, 'racecourse'), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    recordText('CS-02', 'Mon=Sat', `Mon=$${round2(rMon.summary.totalPayOwed)} Sat=$${round2(rSat.summary.totalPayOwed)}`,
      Math.abs(rMon.summary.totalPayOwed - rSat.summary.totalPayOwed) < 0.01 ? 'PASS' : 'FAIL',
      'Non-liquor FT: Saturday = ordinary (no penalty)');
  } catch (e) { recordText('CS-02', 'Mon=Sat', 'ERROR', 'FAIL', e.message); }

  // CS-03: Non-liquor under-19 on Sunday — junior rate with Sunday penalty
  console.log('\nCS-03: Junior non-liquor Sunday');
  try {
    const r = await calcShift('full_time', classId(3, 'racecourse'), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 17 });
    // Junior rate = $18.21 (75% of intro). Sunday 2.0× = $36.42
    const sunRate = r.shifts[0].segments[0]?.effectiveRate;
    record('CS-03', 36.42, sunRate, 'Junior non-liquor Sunday = $18.21 × 2.0');
  } catch (e) { recordText('CS-03', 36.42, 'ERROR', 'FAIL', e.message); }

  // CS-04: Liquor casual Sunday total pay for 4hr shift
  console.log('\nCS-04: Liquor Sunday 4hr total');
  try {
    const r = await calcShift('casual', classId(1, 'liquor'), REF_SUNDAY, '10:00', '14:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    // 4hr × ($34.84 + $12.30) = 4 × $47.14 = $188.56
    record('CS-04', 188.56, r.summary.totalPayOwed, 'Liquor casual Sunday 4hr = $47.14/hr     × 4');
  } catch (e) { recordText('CS-04', 188.56, 'ERROR', 'FAIL', e.message); }

  // CS-05: Liquor casual PH total for 4hr shift
  console.log('\nCS-05: Liquor PH 4hr total');
  try {
    const r = await calcShift('casual', classId(1, 'liquor'), REF_PH, '10:00', '14:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] });
    // 4hr × ($34.84 + $24.13) = 4 × $58.97 = $235.88
    record('CS-05', 235.88, r.summary.totalPayOwed, 'Liquor casual PH 4hr = $58.97/hr × 4');
  } catch (e) { recordText('CS-05', 235.88, 'ERROR', 'FAIL', e.message); }
}

// ══════════════════════════════════════════════════════════════════════════
async function runSuperTests() {
  console.log('\n═══ SECTION 8 — SUPERANNUATION ═══');

  try {
    const r = await calcShift('full_time', classId(3, 'racecourse'), REF_MONDAY, '08:00', '16:30', { mealBreakTaken: true, mealBreakDuration: 30 });
    record('SU-01', 25.63, r.summary.superAmount, 'Super on 8hr weekday Grade 3 RC');
  } catch (e) { recordText('SU-01', 25.63, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', classId(1, 'racecourse'), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('SU-02', 0.12, r.summary.sgcRate, 'SGC rate = 12%');
  } catch (e) { recordText('SU-02', 0.12, 'ERROR', 'FAIL', e.message); }
}

// ══════════════════════════════════════════════════════════════════════════
async function runRegressionTests() {
  console.log('\n═══ SECTION 9 — REGRESSION ═══');

  try {
    const r = await calcShift('casual', classId(1, 'liquor'), REF_SUNDAY, '10:00', '14:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-01', 188.56, r.summary.totalPayOwed, 'Liquor casual Sunday 4hr');
  } catch (e) { recordText('RT-01', 188.56, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', classId(3, 'racecourse'), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-02', 213.60, r.summary.totalPayOwed, 'FT Grade 3 RC Sunday 4hr (2.0×)');
  } catch (e) { recordText('RT-02', 213.60, 'ERROR', 'FAIL', e.message); }

  try {
    const shifts = [];
    for (let d = 7; d <= 11; d++) {
      shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '08:00', endTime: '16:30',
                    mealBreakTaken: true, mealBreakDuration: 30 });
    }
    const r = await calcMultiShift('full_time', classId(3, 'racecourse'), shifts);
    record('RT-03', 1094.70, payOnly(r), 'FT Grade 3 RC 40hr week (excl meal)');
  } catch (e) { recordText('RT-03', 1094.70, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('casual', classId(0, 'racecourse'), REF_MONDAY, '10:00', '12:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-04', 121.40, r.summary.totalPayOwed, 'Casual intro 2hr → 4hr min');
  } catch (e) { recordText('RT-04', 121.40, 'ERROR', 'FAIL', e.message); }
}

// ══════════════════════════════════════════════════════════════════════════
async function main() {
  console.log('WageCheck Racing Clubs Events Award Test Runner — MA000013');
  console.log('═'.repeat(60));

  await t.init();

  await runBaseRateTests();
  await runPenaltyRateTests();
  await runOvertimeTests();
  await runBreakTests();
  await runAllowanceTests();
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
