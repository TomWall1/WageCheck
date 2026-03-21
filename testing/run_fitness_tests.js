/**
 * Fitness Industry Award Test Runner — MA000094
 * Run: node testing/run_fitness_tests.js
 */
const path = require('path');
const { createTestRunner } = require('./lib/testFramework');
const t = createTestRunner('MA000094', path.join(__dirname, 'Fitness_Testing_Plan.xlsx'));

const { record, recordText, skip, classId, calcShift, calcMultiShift, round2, payOnly,
        pool, awardCode: AWARD_CODE,
        REF_MONDAY, REF_TUESDAY, REF_WEDNESDAY, REF_THURSDAY, REF_FRIDAY,
        REF_SATURDAY, REF_SUNDAY, REF_PH } = t;

const cid = (level) => classId(level, 'fitness');

// ══════════════════════════════════════════════════════════════════════════
async function runBaseRateTests() {
  console.log('\n═══ SECTION 1 — BASE RATES ═══');

  console.log('\n1.1 Adult FT/PT base rates (9 levels)');
  const baseTests = [
    { id: 'BR-01', level: 1, expected: 24.28, title: 'Level 1' },
    { id: 'BR-02', level: 2, expected: 24.95, title: 'Level 2' },
    { id: 'BR-03', level: 3, expected: 26.70, title: 'Level 3' },
    { id: 'BR-04', level: 4, expected: 28.12, title: 'Level 3A' },
    { id: 'BR-05', level: 5, expected: 29.27, title: 'Level 4' },
    { id: 'BR-06', level: 6, expected: 30.68, title: 'Level 4A' },
    { id: 'BR-07', level: 7, expected: 32.34, title: 'Level 5' },
    { id: 'BR-08', level: 8, expected: 32.06, title: 'Level 6' },
    { id: 'BR-09', level: 9, expected: 33.31, title: 'Level 7' },
  ];
  for (const b of baseTests) {
    try {
      const r = await calcShift('full_time', cid(b.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
      record(b.id, b.expected, r.baseHourlyRate, b.title);
    } catch (e) { recordText(b.id, b.expected, 'ERROR', 'FAIL', e.message); }
  }

  console.log('\n1.2 Casual rates (25% loading)');
  const casualTests = [
    { id: 'CL-01', level: 1, expected: 30.35, title: 'L1 casual' },
    { id: 'CL-02', level: 2, expected: 31.19, title: 'L2 casual' },
    { id: 'CL-03', level: 3, expected: 33.38, title: 'L3 casual' },
    { id: 'CL-04', level: 4, expected: 35.15, title: 'L3A casual' },
    { id: 'CL-05', level: 5, expected: 36.59, title: 'L4 casual' },
    { id: 'CL-06', level: 6, expected: 38.35, title: 'L4A casual' },
    { id: 'CL-07', level: 7, expected: 40.43, title: 'L5 casual' },
    { id: 'CL-08', level: 8, expected: 40.08, title: 'L6 casual' },
    { id: 'CL-09', level: 9, expected: 41.64, title: 'L7 casual' },
  ];
  for (const c of casualTests) {
    try {
      const r = await calcShift('casual', cid(c.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
      record(c.id, c.expected, r.baseHourlyRate, c.title);
    } catch (e) { recordText(c.id, c.expected, 'ERROR', 'FAIL', e.message); }
  }

  console.log('\n1.3 Junior rates (under 17=55%, 17=65%, 18=75%, 19=85%, 20+=adult)');
  const juniorTests = [
    { id: 'JR-01', level: 1, age: 16, expected: 13.35, note: 'Under 17 = 55%' },
    { id: 'JR-02', level: 1, age: 17, expected: 15.78, note: '17yr = 65%' },
    { id: 'JR-03', level: 1, age: 18, expected: 18.21, note: '18yr = 75%' },
    { id: 'JR-04', level: 1, age: 19, expected: 20.64, note: '19yr = 85%' },
    { id: 'JR-05', level: 1, age: 20, expected: 24.28, note: '20yr = adult' },
    { id: 'JR-06', level: 3, age: 16, expected: 14.69, note: 'Under 17 L3 = 55%' },
    { id: 'JR-07', level: 3, age: 18, expected: 20.03, note: '18yr L3 = 75%' },
    { id: 'JR-08', level: 5, age: 17, expected: 19.03, note: '17yr L4 = 65%' },
  ];
  for (const j of juniorTests) {
    try {
      const r = await calcShift('full_time', cid(j.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, age: j.age });
      record(j.id, j.expected, r.baseHourlyRate, j.note);
    } catch (e) { recordText(j.id, j.expected, 'ERROR', 'FAIL', e.message); }
  }
}

// ══════════════════════════════════════════════════════════════════════════
async function runPenaltyRateTests() {
  console.log('\n═══ SECTION 2 — PENALTY RATES ═══');

  // MA000094: Saturday 1.25×, Sunday 1.50×, PH 2.50× (higher PH than most!)
  // Casual: Sat/Sun/PH = 1.04× of casual base (unusual flat loading)
  // No evening/night time bands at all
  console.log('\n2.1 FT/PT penalty rates');
  const penTests = [
    { id: 'PR-01', level: 1, base: 24.28, sat: 30.35, sun: 36.42, ph: 60.70 },
    { id: 'PR-02', level: 3, base: 26.70, sat: 33.38, sun: 40.05, ph: 66.75 },
    { id: 'PR-03', level: 5, base: 29.27, sat: 36.59, sun: 43.91, ph: 73.18 },
    { id: 'PR-04', level: 9, base: 33.31, sat: 41.64, sun: 49.97, ph: 83.28 },
  ];
  for (const p of penTests) {
    const c = cid(p.level);
    try {
      const r = await calcShift('full_time', c, REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
      record(`${p.id}-sat`, p.sat, r.shifts[0].segments[0]?.effectiveRate, `Saturday L${p.level} (1.25×)`);
    } catch (e) { recordText(`${p.id}-sat`, p.sat, 'ERROR', 'FAIL', e.message); }
    try {
      const r = await calcShift('full_time', c, REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
      record(`${p.id}-sun`, p.sun, r.shifts[0].segments[0]?.effectiveRate, `Sunday L${p.level} (1.50×)`);
    } catch (e) { recordText(`${p.id}-sun`, p.sun, 'ERROR', 'FAIL', e.message); }
    try {
      const r = await calcShift('full_time', c, REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] });
      record(`${p.id}-ph`, p.ph, r.shifts[0].segments[0]?.effectiveRate, `Public holiday L${p.level} (2.50×)`);
    } catch (e) { recordText(`${p.id}-ph`, p.ph, 'ERROR', 'FAIL', e.message); }
  }

  // No evening/night penalty — verify 11pm shift = ordinary rate
  console.log('\n2.2 No evening/night time bands');
  try {
    const r = await calcShift('full_time', cid(1), REF_MONDAY, '23:00', '03:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('PR-05', 24.28, r.shifts[0].segments[0]?.effectiveRate, '11pm-3am = ordinary (no evening/night bands)');
  } catch (e) { recordText('PR-05', 24.28, 'ERROR', 'FAIL', e.message); }

  // Casual penalty: unusual 1.04× flat loading for Sat/Sun/PH
  console.log('\n2.3 Casual penalty rates (1.04× flat for Sat/Sun/PH)');
  const casualPenTests = [
    // L1 casual: $30.35 × 1.04 = $31.564 ≈ $31.56
    { id: 'PC-01', level: 1, sat: 31.56, sun: 31.56, ph: 31.56 },
    // L3 casual: $33.375 × 1.04 = $34.71
    { id: 'PC-02', level: 3, sat: 34.71, sun: 34.71, ph: 34.71 },
    // L5 casual: $36.5875 × 1.04 = $38.051
    { id: 'PC-03', level: 5, sat: 38.05, sun: 38.05, ph: 38.05 },
  ];
  for (const c of casualPenTests) {
    const clsId = cid(c.level);
    try {
      const r = await calcShift('casual', clsId, REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
      record(`${c.id}-sat`, c.sat, r.shifts[0].segments[0]?.effectiveRate, `Casual Saturday L${c.level} (1.04×)`);
    } catch (e) { recordText(`${c.id}-sat`, c.sat, 'ERROR', 'FAIL', e.message); }
    try {
      const r = await calcShift('casual', clsId, REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
      record(`${c.id}-sun`, c.sun, r.shifts[0].segments[0]?.effectiveRate, `Casual Sunday L${c.level} (1.04× — same as Sat!)`);
    } catch (e) { recordText(`${c.id}-sun`, c.sun, 'ERROR', 'FAIL', e.message); }
    try {
      const r = await calcShift('casual', clsId, REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] });
      record(`${c.id}-ph`, c.ph, r.shifts[0].segments[0]?.effectiveRate, `Casual PH L${c.level} (1.04× — same as Sat/Sun!)`);
    } catch (e) { recordText(`${c.id}-ph`, c.ph, 'ERROR', 'FAIL', e.message); }
  }
}

// ══════════════════════════════════════════════════════════════════════════
async function runOvertimeTests() {
  console.log('\n═══ SECTION 3 — OVERTIME ═══');
  const L3 = cid(3);

  console.log('\n3.1 FT/PT daily OT (10hr threshold)');
  try {
    const r = await calcShift('full_time', L3, REF_MONDAY, '07:00', '17:30', { mealBreakTaken: true, mealBreakDuration: 30 });
    record('DO-01', 267.00, payOnly(r), '10hr Mon, no OT');
  } catch (e) { recordText('DO-01', 267.00, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', L3, REF_MONDAY, '07:00', '18:30', { mealBreakTaken: true, mealBreakDuration: 30 });
    // 11hr. OT: 1hr @1.5×. Premium: 26.70 × 0.5 = $13.35. Total: $293.70 + $13.35 = $307.05
    record('DO-02', 307.05, payOnly(r), '11hr Mon, 1hr daily OT @1.5×');
  } catch (e) { recordText('DO-02', 307.05, 'ERROR', 'FAIL', e.message); }

  console.log('\n3.2 FT/PT weekly OT (38hr/40hr)');
  try {
    const shifts = [];
    for (let d = 7; d <= 11; d++) {
      shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '08:00', endTime: '16:30',
                    mealBreakTaken: true, mealBreakDuration: 30 });
    }
    const r = await calcMultiShift('full_time', L3, shifts);
    // 40hr. OT: 2hr @1.5×. Premium: 2 × 26.70 × 0.5 = $26.70
    record('WO-01', 1094.70, payOnly(r), '40hr week L3, 2hr OT (excl meal)');
  } catch (e) { recordText('WO-01', 1094.70, 'ERROR', 'FAIL', e.message); }

  // Casual OT: daily 10hr threshold, ×1.20/×1.60 of casual base
  console.log('\n3.3 Casual daily OT (10hr, ×1.20/×1.60)');
  try {
    const r = await calcShift('casual', L3, REF_MONDAY, '07:00', '17:30', { mealBreakTaken: true, mealBreakDuration: 30 });
    // 10hr casual. No OT (at threshold).
    record('CO-01', 333.75, payOnly(r), 'Casual 10hr = at threshold, no OT');
  } catch (e) { recordText('CO-01', 333.75, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('casual', L3, REF_MONDAY, '07:00', '18:30', { mealBreakTaken: true, mealBreakDuration: 30 });
    // 11hr casual. OT: 1hr @1.20×. Premium: 33.375 × 0.20 = $6.675
    // Base: 11 × 33.375 = $367.13. Total: $367.13 + $6.68 = $373.81
    record('CO-02', 373.81, payOnly(r), 'Casual 11hr, 1hr OT @1.20×');
  } catch (e) { recordText('CO-02', 373.81, 'ERROR', 'FAIL', e.message); }

  // Casual weekly OT
  console.log('\n3.4 Casual weekly OT (38hr/40hr, ×1.20/×1.60)');
  try {
    const shifts = [];
    for (let d = 7; d <= 11; d++) {
      shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '08:00', endTime: '16:30',
                    mealBreakTaken: true, mealBreakDuration: 30 });
    }
    const r = await calcMultiShift('casual', L3, shifts);
    // 40hr casual. OT: 2hr @1.20×. Premium: 2 × 33.375 × 0.20 = $13.35
    // Base: 40 × 33.375 = $1335. Total: $1335 + $13.35 = $1348.35
    record('CWO-01', 1348.35, payOnly(r), 'Casual 40hr week, 2hr OT @1.20×');
  } catch (e) { recordText('CWO-01', 1348.35, 'ERROR', 'FAIL', e.message); }

  // Daily + weekly interaction
  console.log('\n3.5 Daily + weekly OT interaction');
  try {
    const shifts = [
      { date: REF_MONDAY, startTime: '07:00', endTime: '18:30', mealBreakTaken: true, mealBreakDuration: 30 }, // 11hr
      { date: REF_TUESDAY, startTime: '08:00', endTime: '16:30', mealBreakTaken: true, mealBreakDuration: 30 },
      { date: REF_WEDNESDAY, startTime: '08:00', endTime: '16:30', mealBreakTaken: true, mealBreakDuration: 30 },
      { date: REF_THURSDAY, startTime: '08:00', endTime: '16:30', mealBreakTaken: true, mealBreakDuration: 30 },
      { date: REF_FRIDAY, startTime: '08:00', endTime: '16:30', mealBreakTaken: true, mealBreakDuration: 30 },
    ];
    const r = await calcMultiShift('full_time', L3, shifts);
    // 43hr. Daily: 1hr Mon. Weekly: 5hr (43-38), minus 1hr daily = 4hr net.
    // Total OT = 5hr (no double-counting).
    recordText('DW-01', '300min OT', `${r.summary.overtimeMinutes}min`,
      r.summary.overtimeMinutes === 300 ? 'PASS' : 'FAIL',
      '43hr week with 11hr Mon — daily+weekly no double-count');
  } catch (e) { recordText('DW-01', '300min', 'ERROR', 'FAIL', e.message); }
}

// ══════════════════════════════════════════════════════════════════════════
async function runBreakTests() {
  console.log('\n═══ SECTION 4 — BREAKS ═══');
  const L1 = cid(1);

  try {
    const r = await calcShift('full_time', L1, REF_MONDAY, '09:00', '12:00', { mealBreakTaken: false, restBreakTaken: false });
    const hasRest = r.shifts[0].breakViolations.some(v => v.type === 'rest_break');
    recordText('RB-01', 'No rest flag', hasRest ? 'Flagged' : 'No flag', hasRest ? 'FAIL' : 'PASS', '3hr shift');
  } catch (e) { recordText('RB-01', 'No flag', 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', L1, REF_MONDAY, '09:00', '13:30', { mealBreakTaken: false });
    const hasMeal = r.shifts[0].breakViolations.some(v => v.type === 'meal_break');
    recordText('MB-01', 'No meal violation', hasMeal ? 'Flagged' : 'No flag', hasMeal ? 'FAIL' : 'PASS', '4.5hr < 5hr');
  } catch (e) { recordText('MB-01', 'No flag', 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', L1, REF_MONDAY, '09:00', '16:00', { mealBreakTaken: false });
    const hasMeal = r.shifts[0].breakViolations.some(v => v.type === 'meal_break');
    const hasDT = r.shifts[0].missedBreakApplied;
    recordText('MB-02', 'Violation + DT', `V:${hasMeal} DT:${hasDT}`, hasMeal && hasDT ? 'PASS' : 'FAIL', '7hr no meal');
  } catch (e) { recordText('MB-02', 'V+DT', 'ERROR', 'FAIL', e.message); }
}

// ══════════════════════════════════════════════════════════════════════════
async function runAllowanceTests() {
  console.log('\n═══ SECTION 5 — ALLOWANCES ═══');
  try {
    const r = await pool.query("SELECT allowance_type, amount FROM allowances WHERE award_code = $1 AND effective_date >= '2025-07-01' ORDER BY allowance_type", [AWARD_CODE]);
    for (const row of r.rows) {
      const amt = parseFloat(row.amount);
      if (row.allowance_type === 'broken_shift') record('AL-01', 17.25, amt, 'Broken shift per shift');
      if (row.allowance_type === 'first_aid') record('AL-02', 3.25, amt, 'First aid per shift');
      if (row.allowance_type === 'leading_hand_1to5') record('AL-03', 30.44, amt, 'Leading hand 1-5 per week');
      if (row.allowance_type === 'leading_hand_6to10') record('AL-04', 41.60, amt, 'Leading hand 6-10 per week');
      if (row.allowance_type === 'leading_hand_11plus') record('AL-05', 55.81, amt, 'Leading hand 11+ per week');
      if (row.allowance_type === 'meal') record('AL-06', 14.97, amt, 'Meal allowance');
      if (row.allowance_type === 'vehicle_car') record('AL-07', 0.98, amt, 'Vehicle car per km');
      if (row.allowance_type === 'vehicle_motorcycle') record('AL-08', 0.32, amt, 'Vehicle motorcycle per km');
    }
  } catch (e) { recordText('AL-01', 'N/A', 'ERROR', 'FAIL', e.message); }
}

// ══════════════════════════════════════════════════════════════════════════
async function runMinEngagementTests() {
  console.log('\n═══ SECTION 6 — MINIMUM ENGAGEMENT (2hr) ═══');

  try {
    const r = await calcShift('casual', cid(1), REF_MONDAY, '10:00', '11:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('ME-01', 60.70, r.summary.totalPayOwed, 'Casual 1hr → 2hr minimum');
  } catch (e) { recordText('ME-01', 60.70, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('casual', cid(1), REF_MONDAY, '10:00', '12:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('ME-02', 60.70, r.summary.totalPayOwed, 'Casual 2hr = at minimum');
  } catch (e) { recordText('ME-02', 60.70, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('casual', cid(1), REF_MONDAY, '10:00', '13:00', { mealBreakTaken: false });
    record('ME-03', 91.05, r.summary.totalPayOwed, 'Casual 3hr — over minimum');
  } catch (e) { recordText('ME-03', 91.05, 'ERROR', 'FAIL', e.message); }

  // Sunday minimum — casual Sunday 1.04× rate
  try {
    const r = await calcShift('casual', cid(1), REF_SUNDAY, '10:00', '11:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    // Casual Sunday 1.04×: 30.35 × 1.04 = $31.564 ≈ $31.56/hr × 2hr = $63.13
    record('ME-04', 63.13, r.summary.totalPayOwed, 'Casual Sunday 1hr → 2hr min at 1.04× rate');
  } catch (e) { recordText('ME-04', 63.13, 'ERROR', 'FAIL', e.message); }

  // PT minimum
  try {
    const r = await calcShift('part_time', cid(1), REF_MONDAY, '10:00', '11:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('ME-05', 48.56, r.summary.totalPayOwed, 'PT 1hr → 2hr minimum');
  } catch (e) { recordText('ME-05', 48.56, 'ERROR', 'FAIL', e.message); }
}

// ══════════════════════════════════════════════════════════════════════════
async function runComplexScenarioTests() {
  console.log('\n═══ SECTION 7 — COMPLEX SCENARIOS ═══');

  // CS-01: Casual Sat/Sun/PH all same rate (1.04×) — unusual
  console.log('\nCS-01: Casual Sat = Sun = PH (all 1.04×)');
  try {
    const rSat = await calcShift('casual', cid(3), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    const rSun = await calcShift('casual', cid(3), REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    const rPH = await calcShift('casual', cid(3), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] });
    const satTotal = round2(rSat.summary.totalPayOwed);
    const sunTotal = round2(rSun.summary.totalPayOwed);
    const phTotal = round2(rPH.summary.totalPayOwed);
    recordText('CS-01', 'All equal', `Sat=$${satTotal} Sun=$${sunTotal} PH=$${phTotal}`,
      satTotal === sunTotal && sunTotal === phTotal ? 'PASS' : 'FAIL',
      'Casual Sat/Sun/PH all at 1.04× — should be identical');
  } catch (e) { recordText('CS-01', 'All equal', 'ERROR', 'FAIL', e.message); }

  // CS-02: PH 2.50× (higher than most awards' 2.25×)
  console.log('\nCS-02: FT PH rate is 2.50× (not 2.25×)');
  try {
    const r = await calcShift('full_time', cid(1), REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] });
    // 4hr × $60.70 = $242.80
    record('CS-02', 242.80, r.summary.totalPayOwed, 'PH 4hr L1 at 2.50× = $60.70/hr');
  } catch (e) { recordText('CS-02', 242.80, 'ERROR', 'FAIL', e.message); }

  // CS-03: No evening penalty — late night shift at ordinary rate
  console.log('\nCS-03: Late night = ordinary');
  try {
    const r = await calcShift('full_time', cid(3), REF_MONDAY, '20:00', '23:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('CS-03', 80.10, r.summary.totalPayOwed, '8pm-11pm Mon = ordinary (3hr × $26.70)');
  } catch (e) { recordText('CS-03', 80.10, 'ERROR', 'FAIL', e.message); }

  // CS-04: Full week 46hr with Saturday
  console.log('\nCS-04: 46hr week Mon-Sat');
  try {
    const shifts = [
      { date: REF_MONDAY, startTime: '08:00', endTime: '16:30', mealBreakTaken: true, mealBreakDuration: 30 },
      { date: REF_TUESDAY, startTime: '08:00', endTime: '16:30', mealBreakTaken: true, mealBreakDuration: 30 },
      { date: REF_WEDNESDAY, startTime: '08:00', endTime: '16:30', mealBreakTaken: true, mealBreakDuration: 30 },
      { date: REF_THURSDAY, startTime: '08:00', endTime: '16:30', mealBreakTaken: true, mealBreakDuration: 30 },
      { date: REF_FRIDAY, startTime: '08:00', endTime: '16:30', mealBreakTaken: true, mealBreakDuration: 30 },
      { date: REF_SATURDAY, startTime: '08:00', endTime: '14:30', mealBreakTaken: true, mealBreakDuration: 30 },
    ];
    const r = await calcMultiShift('full_time', cid(3), shifts);
    const total = payOnly(r);
    recordText('CS-04', '>$1300', `$${total}`, total > 1300 ? 'PASS' : 'FAIL',
      `46hr week L3 Mon-Sat = $${total}`);
  } catch (e) { recordText('CS-04', '>$1300', 'ERROR', 'FAIL', e.message); }
}

// ══════════════════════════════════════════════════════════════════════════
async function runSuperTests() {
  console.log('\n═══ SECTION 8 — SUPERANNUATION ═══');

  try {
    const r = await calcShift('full_time', cid(3), REF_MONDAY, '08:00', '16:30', { mealBreakTaken: true, mealBreakDuration: 30 });
    // 8hr × $26.70 = $213.60. Super: $213.60 × 0.12 = $25.63
    record('SU-01', 25.63, r.summary.superAmount, 'Super on 8hr weekday L3');
  } catch (e) { recordText('SU-01', 25.63, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', cid(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('SU-02', 0.12, r.summary.sgcRate, 'SGC rate = 12%');
  } catch (e) { recordText('SU-02', 0.12, 'ERROR', 'FAIL', e.message); }
}

// ══════════════════════════════════════════════════════════════════════════
async function runRegressionTests() {
  console.log('\n═══ SECTION 9 — REGRESSION ═══');

  try {
    const r = await calcShift('casual', cid(1), REF_SUNDAY, '10:00', '14:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    // Casual L1 Sunday 1.04×: 30.35 × 1.04 = $31.564/hr × 4hr = $126.26
    record('RT-01', 126.26, r.summary.totalPayOwed, 'Casual L1 Sunday 4hr (1.04×)');
  } catch (e) { recordText('RT-01', 126.26, 'ERROR', 'FAIL', e.message); }

  try {
    const shifts = [];
    for (let d = 7; d <= 11; d++) {
      shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '08:00', endTime: '16:30',
                    mealBreakTaken: true, mealBreakDuration: 30 });
    }
    const r = await calcMultiShift('full_time', cid(3), shifts);
    record('RT-02', 1094.70, payOnly(r), 'FT L3 40hr week (excl meal)');
  } catch (e) { recordText('RT-02', 1094.70, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', cid(1), REF_PH, '09:00', '15:30', { mealBreakTaken: true, mealBreakDuration: 30, publicHolidays: [REF_PH] });
    // 6hr × $60.70 = $364.20
    record('RT-03', 364.20, payOnly(r), 'FT L1 PH 6hr (2.50×)');
  } catch (e) { recordText('RT-03', 364.20, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', cid(3), REF_MONDAY, '22:00', '02:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    // No night band: 4hr × $26.70 = $106.80
    record('RT-04', 106.80, r.summary.totalPayOwed, 'FT L3 overnight 10pm-2am (ordinary — no night band)');
  } catch (e) { recordText('RT-04', 106.80, 'ERROR', 'FAIL', e.message); }
}

// ══════════════════════════════════════════════════════════════════════════
async function main() {
  console.log('WageCheck Fitness Industry Award Test Runner — MA000094');
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
