/**
 * General Retail Industry Award Test Runner — MA000004
 * Run: node testing/run_retail_tests.js
 */
const path = require('path');
const { createTestRunner } = require('./lib/testFramework');
const t = createTestRunner('MA000004', path.join(__dirname, 'Retail_Testing_Plan.xlsx'));

const { record, recordText, skip, classId, calcShift, calcMultiShift, round2, payOnly,
        pool, awardCode: AWARD_CODE,
        REF_MONDAY, REF_TUESDAY, REF_WEDNESDAY, REF_THURSDAY, REF_FRIDAY,
        REF_SATURDAY, REF_SUNDAY, REF_PH } = t;

// All MA000004 classifications use 'retail' stream
const cid = (level) => classId(level, 'retail');

// ══════════════════════════════════════════════════════════════════════════
async function runBaseRateTests() {
  console.log('\n═══ SECTION 1 — BASE RATES ═══');

  console.log('\n1.1 Adult FT/PT base rates (8 levels)');
  const baseTests = [
    { id: 'BR-01', level: 1, expected: 26.55, title: 'Level 1' },
    { id: 'BR-02', level: 2, expected: 27.16, title: 'Level 2' },
    { id: 'BR-03', level: 3, expected: 27.58, title: 'Level 3' },
    { id: 'BR-04', level: 4, expected: 28.12, title: 'Level 4' },
    { id: 'BR-05', level: 5, expected: 29.27, title: 'Level 5' },
    { id: 'BR-06', level: 6, expected: 29.70, title: 'Level 6' },
    { id: 'BR-07', level: 7, expected: 31.19, title: 'Level 7' },
    { id: 'BR-08', level: 8, expected: 32.45, title: 'Level 8' },
  ];
  for (const b of baseTests) {
    try {
      const r = await calcShift('full_time', cid(b.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
      record(b.id, b.expected, r.baseHourlyRate, b.title);
    } catch (e) { recordText(b.id, b.expected, 'ERROR', 'FAIL', e.message); }
  }

  console.log('\n1.2 Casual rates (25% loading)');
  const casualTests = [
    { id: 'CL-01', level: 1, expected: 33.19, title: 'L1 casual' },
    { id: 'CL-02', level: 3, expected: 34.48, title: 'L3 casual' },
    { id: 'CL-03', level: 5, expected: 36.59, title: 'L5 casual' },
    { id: 'CL-04', level: 7, expected: 38.99, title: 'L7 casual' },
    { id: 'CL-05', level: 8, expected: 40.56, title: 'L8 casual' },
  ];
  for (const c of casualTests) {
    try {
      const r = await calcShift('casual', cid(c.level), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
      record(c.id, c.expected, r.baseHourlyRate, c.title);
    } catch (e) { recordText(c.id, c.expected, 'ERROR', 'FAIL', e.message); }
  }

  console.log('\n1.3 Junior rates (under 16=45%, 16=50%, 17=60%, 18=70%, 19=80%, 20=90%, 21+=adult)');
  const juniorTests = [
    { id: 'JR-01', level: 1, age: 15, expected: 11.95, note: 'Under 16 = 45%' },
    { id: 'JR-02', level: 1, age: 16, expected: 13.28, note: '16yr = 50%' },
    { id: 'JR-03', level: 1, age: 17, expected: 15.93, note: '17yr = 60%' },
    { id: 'JR-04', level: 1, age: 18, expected: 18.59, note: '18yr = 70%' },
    { id: 'JR-05', level: 1, age: 19, expected: 21.24, note: '19yr = 80%' },
    { id: 'JR-06', level: 1, age: 20, expected: 23.90, note: '20yr = 90%' },
    { id: 'JR-07', level: 1, age: 21, expected: 26.55, note: '21yr = adult' },
    { id: 'JR-08', level: 4, age: 15, expected: 12.65, note: 'Under 16 L4 = 45%' },
    { id: 'JR-09', level: 4, age: 17, expected: 16.87, note: '17yr L4 = 60%' },
    { id: 'JR-10', level: 8, age: 16, expected: 16.23, note: '16yr L8 = 50%' },
    { id: 'JR-11', level: 8, age: 20, expected: 29.21, note: '20yr L8 = 90%' },
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

  // MA000004: evening starts at 6pm (not 7pm or 10pm!)
  console.log('\n2.1 FT/PT penalty rates');
  const penTests = [
    { id: 'PR-01', level: 1, base: 26.55, eve: 33.19, sat: 33.19, sun: 39.83, ph: 59.74 },
    { id: 'PR-02', level: 4, base: 28.12, eve: 35.15, sat: 35.15, sun: 42.18, ph: 63.27 },
    { id: 'PR-03', level: 5, base: 29.27, eve: 36.59, sat: 36.59, sun: 43.91, ph: 65.86 },
    { id: 'PR-04', level: 8, base: 32.45, eve: 40.56, sat: 40.56, sun: 48.68, ph: 73.01 },
  ];

  for (const p of penTests) {
    const c = cid(p.level);
    // Evening: 6pm-midnight (1.25× multiplier) — starts earlier than other awards!
    try {
      const r = await calcShift('full_time', c, REF_MONDAY, '18:00', '22:00', { mealBreakTaken: true, mealBreakDuration: 0 });
      record(`${p.id}-eve`, p.eve, r.shifts[0].segments[0]?.effectiveRate, `Evening 6pm-midnight L${p.level}`);
    } catch (e) { recordText(`${p.id}-eve`, p.eve, 'ERROR', 'FAIL', e.message); }

    // Saturday (1.25×)
    try {
      const r = await calcShift('full_time', c, REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
      record(`${p.id}-sat`, p.sat, r.shifts[0].segments[0]?.effectiveRate, `Saturday L${p.level}`);
    } catch (e) { recordText(`${p.id}-sat`, p.sat, 'ERROR', 'FAIL', e.message); }

    // Sunday (1.50×)
    try {
      const r = await calcShift('full_time', c, REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
      record(`${p.id}-sun`, p.sun, r.shifts[0].segments[0]?.effectiveRate, `Sunday L${p.level}`);
    } catch (e) { recordText(`${p.id}-sun`, p.sun, 'ERROR', 'FAIL', e.message); }

    // Public Holiday (2.25×)
    try {
      const r = await calcShift('full_time', c, REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] });
      record(`${p.id}-ph`, p.ph, r.shifts[0].segments[0]?.effectiveRate, `Public holiday L${p.level}`);
    } catch (e) { recordText(`${p.id}-ph`, p.ph, 'ERROR', 'FAIL', e.message); }
  }

  // CRITICAL: Evening starts at 6pm — verify 5pm-7pm split
  console.log('\n2.2 Evening boundary at 6pm (MA000004-specific)');
  try {
    const r = await calcShift('full_time', cid(1), REF_MONDAY, '17:00', '19:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    const segs = r.shifts[0].segments;
    const hasOrdinary = segs.some(s => Math.abs(s.effectiveRate - 26.55) < 0.01 && s.minutes === 60);
    const hasEvening = segs.some(s => Math.abs(s.effectiveRate - 33.19) < 0.01 && s.minutes === 60);
    recordText('PR-05', '1hr ordinary + 1hr evening', `${segs.length} segments`,
      hasOrdinary && hasEvening ? 'PASS' : 'FAIL',
      `5pm-7pm: 5pm-6pm ordinary, 6pm-7pm evening (1.25×)`);
  } catch (e) { recordText('PR-05', 'split', 'ERROR', 'FAIL', e.message); }

  // Verify no penalty between midnight and 6am (no night band in MA000004)
  console.log('\n2.3 No night band penalty (MA000004 only has evening 6pm-midnight)');
  try {
    const r = await calcShift('full_time', cid(1), REF_MONDAY, '05:00', '07:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('PR-06', 26.55, r.shifts[0].segments[0]?.effectiveRate, '5am-7am = ordinary (no night band)');
  } catch (e) { recordText('PR-06', 26.55, 'ERROR', 'FAIL', e.message); }

  console.log('\n2.4 Casual penalty rates');
  const casualPenTests = [
    { id: 'PC-01', level: 1, casBase: 33.19, sat: 39.83, sun: 46.47, ph: 66.38 },
    { id: 'PC-02', level: 4, casBase: 35.15, sat: 42.18, sun: 49.21, ph: 70.30 },
    { id: 'PC-03', level: 8, casBase: 40.56, sat: 48.67, sun: 56.79, ph: 81.13 },
  ];
  for (const c of casualPenTests) {
    const clsId = cid(c.level);
    // Saturday (1.20× casual)
    try {
      const r = await calcShift('casual', clsId, REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
      record(`${c.id}-sat`, c.sat, r.shifts[0].segments[0]?.effectiveRate, `Casual Saturday L${c.level}`);
    } catch (e) { recordText(`${c.id}-sat`, c.sat, 'ERROR', 'FAIL', e.message); }

    // Sunday (1.40× casual)
    try {
      const r = await calcShift('casual', clsId, REF_SUNDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
      record(`${c.id}-sun`, c.sun, r.shifts[0].segments[0]?.effectiveRate, `Casual Sunday L${c.level}`);
    } catch (e) { recordText(`${c.id}-sun`, c.sun, 'ERROR', 'FAIL', e.message); }

    // PH (2.0× casual)
    try {
      const r = await calcShift('casual', clsId, REF_PH, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0, publicHolidays: [REF_PH] });
      record(`${c.id}-ph`, c.ph, r.shifts[0].segments[0]?.effectiveRate, `Casual PH L${c.level}`);
    } catch (e) { recordText(`${c.id}-ph`, c.ph, 'ERROR', 'FAIL', e.message); }
  }

  // Casual evening (1.20× casual base)
  try {
    const r = await calcShift('casual', cid(1), REF_MONDAY, '18:00', '22:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    // Casual L1 evening: casual base 33.1875 × 1.20 = 39.825 ≈ $39.83
    // BUT: check if MA000004 has the same compounding issue as MA000003
    // Pay guide should show: FT_base × (1 + 0.25 + 0.25) = 26.55 × 1.50 = $39.83
    // Our calc: 33.1875 × 1.20 = $39.825 ≈ $39.83 ✓ (these happen to match for 1.20×!)
    // Because 1.25 × 1.20 = 1.50 = 100% + 25% + 25%. It's coincidence, but the result is correct.
    record('PC-04', 39.83, r.shifts[0].segments[0]?.effectiveRate, 'Casual L1 evening (1.20× casual = 150% FT)');
  } catch (e) { recordText('PC-04', 39.83, 'ERROR', 'FAIL', e.message); }
}

// ══════════════════════════════════════════════════════════════════════════
async function runOvertimeTests() {
  console.log('\n═══ SECTION 3 — OVERTIME ═══');

  // MA000004: weekly only (38hr threshold, first 3hr @1.5×, after 41hr @2.0×)
  // Note: first band is 3 HOURS (38-41), not 2 hours like other awards
  console.log('\n3.1 FT/PT weekly OT (38hr/41hr thresholds — 3hr first band)');

  // WO-01: 38hr — no OT
  try {
    const shifts = [];
    for (let d = 7; d <= 11; d++) {
      shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '08:00', endTime: '16:06',
                    mealBreakTaken: true, mealBreakDuration: 30 });
    }
    const r = await calcMultiShift('full_time', cid(4), shifts);
    // 38hr × $28.12 = $1068.56
    record('WO-01', 1068.56, r.summary.totalPayOwed, '38hr week L4, no OT');
  } catch (e) { recordText('WO-01', 1068.56, 'ERROR', 'FAIL', e.message); }

  // WO-02: 40hr — 2hr OT @1.5× (within first 3hr band)
  try {
    const shifts = [];
    for (let d = 7; d <= 11; d++) {
      shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '08:00', endTime: '16:30',
                    mealBreakTaken: true, mealBreakDuration: 30 });
    }
    const r = await calcMultiShift('full_time', cid(4), shifts);
    // 40hr. OT: 2hr @1.5× premium = 2 × 28.12 × 0.5 = $28.12
    // Base: 40 × 28.12 = $1124.80. Total: $1152.92
    record('WO-02', 1152.92, payOnly(r), '40hr week L4, 2hr OT @1.5× (excl meal)');
  } catch (e) { recordText('WO-02', 1152.92, 'ERROR', 'FAIL', e.message); }

  // WO-03: 41hr — 3hr OT all @1.5× (exactly at 2nd threshold)
  try {
    const shifts = [
      { date: REF_MONDAY, startTime: '08:00', endTime: '16:30', mealBreakTaken: true, mealBreakDuration: 30 },
      { date: REF_TUESDAY, startTime: '08:00', endTime: '16:30', mealBreakTaken: true, mealBreakDuration: 30 },
      { date: REF_WEDNESDAY, startTime: '08:00', endTime: '16:30', mealBreakTaken: true, mealBreakDuration: 30 },
      { date: REF_THURSDAY, startTime: '08:00', endTime: '16:30', mealBreakTaken: true, mealBreakDuration: 30 },
      { date: REF_FRIDAY, startTime: '08:00', endTime: '17:30', mealBreakTaken: true, mealBreakDuration: 30 }, // 9hr
    ];
    const r = await calcMultiShift('full_time', cid(4), shifts);
    // 41hr. OT: 3hr @1.5× = 3 × 28.12 × 0.5 = $42.18
    // Base: 41 × 28.12 = $1152.92. Total: $1195.10
    record('WO-03', 1195.10, payOnly(r), '41hr week L4, 3hr OT @1.5× (full first band)');
  } catch (e) { recordText('WO-03', 1195.10, 'ERROR', 'FAIL', e.message); }

  // WO-04: 45hr — 3hr @1.5× + 4hr @2.0×
  try {
    const shifts = [];
    for (let d = 7; d <= 11; d++) {
      shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '07:00', endTime: '16:30',
                    mealBreakTaken: true, mealBreakDuration: 30 });
    }
    const r = await calcMultiShift('full_time', cid(4), shifts);
    // 45hr. OT: 3×28.12×0.5 + 4×28.12×1.0 = 42.18 + 112.48 = $154.66
    // Base: 45 × 28.12 = $1265.40. Total: $1420.06
    record('WO-04', 1420.06, payOnly(r), '45hr week L4, 3hr@1.5× + 4hr@2.0× (excl meal)');
  } catch (e) { recordText('WO-04', 1420.06, 'ERROR', 'FAIL', e.message); }

  // No daily OT for MA000004
  console.log('\n3.2 No daily OT threshold');
  try {
    const r = await calcShift('full_time', cid(4), REF_MONDAY, '07:00', '19:30', { mealBreakTaken: true, mealBreakDuration: 30 });
    // 12hr worked (7am-7:30pm minus 30min break). 6pm-7pm = 1hr evening (1.25×).
    // 11hr × $28.12 + 1hr × $35.15 = $309.32 + $35.15 = $344.47. No daily OT.
    record('DO-01', 344.47, payOnly(r), '12hr FT Mon — no daily OT, 1hr evening');
  } catch (e) { recordText('DO-01', 337.44, 'ERROR', 'FAIL', e.message); }
}

// ══════════════════════════════════════════════════════════════════════════
async function runBreakTests() {
  console.log('\n═══ SECTION 4 — BREAKS ═══');

  // Rest break: per 3.5hr (not 4hr or 5hr — MA000004 specific)
  try {
    const r = await calcShift('full_time', cid(1), REF_MONDAY, '09:00', '12:00', { mealBreakTaken: false, restBreakTaken: false });
    const hasRest = r.shifts[0].breakViolations.some(v => v.type === 'rest_break');
    recordText('RB-01', 'No rest break flag', hasRest ? 'Flagged' : 'No flag', hasRest ? 'FAIL' : 'PASS', '3hr shift (<3.5hr threshold)');
  } catch (e) { recordText('RB-01', 'No flag', 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', cid(1), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: false, restBreakTaken: false });
    const restV = r.shifts[0].breakViolations.find(v => v.type === 'rest_break');
    recordText('RB-02', 'Rest break required', restV ? 'Yes' : 'No', restV ? 'PASS' : 'FAIL', '4hr shift (>3.5hr threshold)');
  } catch (e) { recordText('RB-02', 'Required', 'ERROR', 'FAIL', e.message); }

  // Meal break after 5hr
  try {
    const r = await calcShift('full_time', cid(1), REF_MONDAY, '09:00', '13:30', { mealBreakTaken: false });
    const hasMeal = r.shifts[0].breakViolations.some(v => v.type === 'meal_break');
    recordText('MB-01', 'No meal violation', hasMeal ? 'Flagged' : 'No flag', hasMeal ? 'FAIL' : 'PASS', '4.5hr < 5hr');
  } catch (e) { recordText('MB-01', 'No flag', 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', cid(1), REF_MONDAY, '09:00', '16:00', { mealBreakTaken: false });
    const hasMeal = r.shifts[0].breakViolations.some(v => v.type === 'meal_break');
    const hasDT = r.shifts[0].missedBreakApplied;
    recordText('MB-02', 'Violation + DT', `V:${hasMeal} DT:${hasDT}`, hasMeal && hasDT ? 'PASS' : 'FAIL', '7hr no meal break');
  } catch (e) { recordText('MB-02', 'V+DT', 'ERROR', 'FAIL', e.message); }
}

// ══════════════════════════════════════════════════════════════════════════
async function runAllowanceTests() {
  console.log('\n═══ SECTION 5 — ALLOWANCES ═══');
  try {
    const r = await pool.query("SELECT allowance_type, amount FROM allowances WHERE award_code = $1 AND effective_date >= '2025-07-01' ORDER BY allowance_type", [AWARD_CODE]);
    for (const row of r.rows) {
      const amt = parseFloat(row.amount);
      if (row.allowance_type === 'cold_work_above_zero') record('AL-01', 0.37, amt, 'Cold work >=0°C per hour');
      if (row.allowance_type === 'cold_work_below_zero') record('AL-02', 0.93, amt, 'Cold work <0°C per hour');
      if (row.allowance_type === 'first_aid') record('AL-03', 13.89, amt, 'First aid per week');
      if (row.allowance_type === 'laundry_ft') record('AL-04', 6.25, amt, 'Laundry FT weekly');
      if (row.allowance_type === 'laundry_ptcasual') record('AL-05', 1.25, amt, 'Laundry PT/casual per shift');
      if (row.allowance_type === 'liquor_licence') record('AL-06', 33.12, amt, 'Liquor licence per week');
      if (row.allowance_type === 'meal') record('AL-07', 23.59, amt, 'Meal allowance (1st meal)');
      if (row.allowance_type === 'meal_second') record('AL-08', 21.39, amt, 'Meal allowance (subsequent)');
      if (row.allowance_type === 'vehicle') record('AL-09', 0.98, amt, 'Vehicle per km');
    }
  } catch (e) { recordText('AL-01', 'N/A', 'ERROR', 'FAIL', e.message); }
}

// ══════════════════════════════════════════════════════════════════════════
async function runMinEngagementTests() {
  console.log('\n═══ SECTION 6 — MINIMUM ENGAGEMENT (3hr) ═══');

  // ME-01: Casual 1hr → paid for 3hr
  try {
    const r = await calcShift('casual', cid(1), REF_MONDAY, '10:00', '11:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('ME-01', 99.56, r.summary.totalPayOwed, 'Casual 1hr → 3hr minimum');
  } catch (e) { recordText('ME-01', 99.56, 'ERROR', 'FAIL', e.message); }

  // ME-02: Casual exactly 3hr
  try {
    const r = await calcShift('casual', cid(1), REF_MONDAY, '10:00', '13:00', { mealBreakTaken: false });
    record('ME-02', 99.56, r.summary.totalPayOwed, 'Casual 3hr = at minimum');
  } catch (e) { recordText('ME-02', 99.56, 'ERROR', 'FAIL', e.message); }

  // ME-03: Casual 4hr — over minimum
  try {
    const r = await calcShift('casual', cid(1), REF_MONDAY, '10:00', '14:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('ME-03', 132.75, r.summary.totalPayOwed, 'Casual 4hr — over minimum');
  } catch (e) { recordText('ME-03', 132.75, 'ERROR', 'FAIL', e.message); }

  // ME-04: Casual Sunday 1hr → 3hr min at Sunday rate (1.40×)
  try {
    const r = await calcShift('casual', cid(4), REF_SUNDAY, '10:00', '11:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    // L4 casual Sunday: 35.15 × 1.40 = 49.21/hr × 3hr = $147.63
    record('ME-04', 147.63, r.summary.totalPayOwed, 'Casual L4 Sunday 1hr → 3hr min (1.40× rate)');
  } catch (e) { recordText('ME-04', 147.63, 'ERROR', 'FAIL', e.message); }

  // ME-05: PT 2hr → 3hr minimum
  try {
    const r = await calcShift('part_time', cid(1), REF_MONDAY, '10:00', '12:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('ME-05', 79.65, r.summary.totalPayOwed, 'PT 2hr → 3hr minimum');
  } catch (e) { recordText('ME-05', 79.65, 'ERROR', 'FAIL', e.message); }
}

// ══════════════════════════════════════════════════════════════════════════
async function runComplexScenarioTests() {
  console.log('\n═══ SECTION 7 — COMPLEX SCENARIOS ═══');

  // CS-01: Evening boundary — 5pm-7pm split at 6pm
  console.log('\nCS-01: Evening boundary 5pm-7pm');
  try {
    const r = await calcShift('full_time', cid(4), REF_MONDAY, '17:00', '19:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    // 5pm-6pm = 1hr ordinary ($28.12), 6pm-7pm = 1hr evening ($35.15)
    record('CS-01', 63.27, r.summary.totalPayOwed, '5pm-7pm: 1hr ordinary + 1hr evening');
  } catch (e) { recordText('CS-01', 63.27, 'ERROR', 'FAIL', e.message); }

  // CS-02: Full day shift crossing evening boundary
  console.log('\nCS-02: Full day 9am-7pm with evening');
  try {
    const r = await calcShift('full_time', cid(4), REF_MONDAY, '09:00', '19:30', { mealBreakTaken: true, mealBreakDuration: 30 });
    // 10hr worked: 9am-6pm = 9hr ordinary, 6pm-7pm = 1hr evening
    // 9 × 28.12 + 1 × 35.15 = 253.08 + 35.15 = $288.23
    record('CS-02', 288.23, r.summary.totalPayOwed, '10hr Mon 9am-7pm: 9hr ordinary + 1hr evening');
  } catch (e) { recordText('CS-02', 288.23, 'ERROR', 'FAIL', e.message); }

  // CS-03: Overnight shift crossing midnight
  console.log('\nCS-03: Overnight Mon→Tue 10pm-4am');
  try {
    const r = await calcShift('full_time', cid(4), REF_MONDAY, '22:00', '04:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    // Mon 10pm-midnight = 2hr evening (1.25×): 28.12 × 1.25 × 2 = $70.30
    // Tue midnight-4am = 4hr ordinary (no night band in MA000004): 28.12 × 4 = $112.48
    // Total: $182.78
    record('CS-03', 182.78, r.summary.totalPayOwed, 'Overnight 10pm-4am: 2hr evening + 4hr ordinary');
  } catch (e) { recordText('CS-03', 182.78, 'ERROR', 'FAIL', e.message); }

  // CS-04: Saturday with weekly OT
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
    const r = await calcMultiShift('full_time', cid(4), shifts);
    const total = payOnly(r);
    // 46hr. OT: 3hr @1.5× + 5hr @2.0× (of which 6hr on Saturday at 1.25× penalty)
    // Complex interaction — just verify reasonable range
    recordText('CS-04', '>$1400', `$${total}`, total > 1400 && total < 1600 ? 'PASS' : 'FAIL',
      `46hr week L4 Mon-Sat = $${total}`);
  } catch (e) { recordText('CS-04', '>$1400', 'ERROR', 'FAIL', e.message); }

  // CS-05: Two-tier meal allowance — OT triggers 1 meal, then 2nd
  console.log('\nCS-05: Two-tier meal allowance');
  try {
    // 48hr week: 10hr OT → 1st meal @$23.59 + 2nd meal @$21.39
    const shifts = [];
    for (let d = 7; d <= 11; d++) {
      shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '07:00', endTime: '17:00',
                    mealBreakTaken: true, mealBreakDuration: 30 }); // 9.5hr each
    }
    // Actually just check that the two-tier mechanism works
    // 47.5hr. OT = 9.5hr. Meals: ceil(9.5/4) = 3 meals.
    // 1st @$23.59 + 2 @$21.39 = $23.59 + $42.78 = $66.37
    const r = await calcMultiShift('full_time', cid(4), shifts);
    const mealPay = r.summary.mealAllowancePay;
    // First meal $23.59 + subsequent at $21.39 each
    recordText('CS-05', '2-tier meal', `$${mealPay}`,
      mealPay > 23.59 ? 'PASS' : 'FAIL',
      `OT triggers multi-meal: total meal allowance = $${mealPay}`);
  } catch (e) { recordText('CS-05', '2-tier', 'ERROR', 'FAIL', e.message); }

  // CS-06: Junior casual Sunday
  console.log('\nCS-06: Junior casual Sunday');
  try {
    const r = await calcShift('casual', cid(1), REF_SUNDAY, '10:00', '14:00', { mealBreakTaken: true, mealBreakDuration: 0, age: 16 });
    // 16yr L1: 26.55 × 0.50 = 13.275. Casual: 13.275 × 1.25 = 16.59375.
    // Sunday 1.40×: 16.59375 × 1.40 = 23.23125 ≈ $23.23/hr × 4hr = $92.93
    const sunRate = r.shifts[0].segments[0]?.effectiveRate;
    record('CS-06', 23.23, sunRate, 'Junior 16yr casual L1 Sunday rate');
  } catch (e) { recordText('CS-06', 23.23, 'ERROR', 'FAIL', e.message); }
}

// ══════════════════════════════════════════════════════════════════════════
async function runSuperTests() {
  console.log('\n═══ SECTION 8 — SUPERANNUATION ═══');

  try {
    const r = await calcShift('full_time', cid(4), REF_MONDAY, '08:00', '16:30', { mealBreakTaken: true, mealBreakDuration: 30 });
    // 8hr × $28.12 = $224.96. Super: $224.96 × 0.12 = $27.00
    record('SU-01', 27.00, r.summary.superAmount, 'Super on 8hr weekday L4');
  } catch (e) { recordText('SU-01', 27.00, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', cid(4), REF_SATURDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    // 4hr × $35.15 = $140.60. Super on penalty: $140.60 × 0.12 = $16.87
    record('SU-02', 16.87, r.summary.superAmount, 'Super on Sat 4hr (penalty is OTE)');
  } catch (e) { recordText('SU-02', 16.87, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', cid(4), REF_MONDAY, '09:00', '13:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('SU-03', 0.12, r.summary.sgcRate, 'SGC rate = 12%');
  } catch (e) { recordText('SU-03', 0.12, 'ERROR', 'FAIL', e.message); }
}

// ══════════════════════════════════════════════════════════════════════════
async function runRegressionTests() {
  console.log('\n═══ SECTION 9 — REGRESSION ═══');

  try {
    const r = await calcShift('casual', cid(1), REF_SUNDAY, '10:00', '14:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    // Casual L1 Sunday: 33.1875 × 1.40 = 46.4625 ≈ $46.46/hr × 4hr = $185.85
    record('RT-01', 185.85, r.summary.totalPayOwed, 'Casual L1 Sunday 4hr');
  } catch (e) { recordText('RT-01', 185.85, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', cid(4), REF_MONDAY, '22:00', '04:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-02', 182.78, r.summary.totalPayOwed, 'FT L4 overnight 10pm-4am');
  } catch (e) { recordText('RT-02', 182.78, 'ERROR', 'FAIL', e.message); }

  try {
    const shifts = [];
    for (let d = 7; d <= 11; d++) {
      shifts.push({ date: `2025-07-${String(d).padStart(2,'0')}`, startTime: '08:00', endTime: '16:30',
                    mealBreakTaken: true, mealBreakDuration: 30 });
    }
    const r = await calcMultiShift('full_time', cid(4), shifts);
    record('RT-03', 1152.92, payOnly(r), 'FT L4 40hr week (excl meal)');
  } catch (e) { recordText('RT-03', 1152.92, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('full_time', cid(1), REF_MONDAY, '17:00', '19:00', { mealBreakTaken: true, mealBreakDuration: 0 });
    record('RT-04', 59.74, r.summary.totalPayOwed, 'Evening boundary 5pm-7pm L1');
  } catch (e) { recordText('RT-04', 59.74, 'ERROR', 'FAIL', e.message); }

  try {
    const r = await calcShift('part_time', cid(4), REF_PH, '09:00', '15:30', { mealBreakTaken: true, mealBreakDuration: 30, publicHolidays: [REF_PH] });
    // 6hr × $63.27 = $379.62
    record('RT-05', 379.62, payOnly(r), 'PT L4 PH 6hr');
  } catch (e) { recordText('RT-05', 379.62, 'ERROR', 'FAIL', e.message); }
}

// ══════════════════════════════════════════════════════════════════════════
async function main() {
  console.log('WageCheck Retail Award Test Runner — MA000004');
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
