/**
 * Seed script — Miscellaneous Award 2020 [MA000104]
 * Pay rates effective first full pay period on or after 10 October 2025
 * Source: Fair Work Ombudsman pay guide MA000104 (G01042996)
 *
 * KEY FACTS:
 *   - Award of last resort: covers employees not covered by any other modern award.
 *     Does NOT cover managerial employees or specialist professionals
 *     (accountants, lawyers, HR, IT specialists, marketing, finance, PR).
 *   - 4 levels, no streams. Levels 1–2 are tenure-based; 3–4 are qualification-based.
 *   - Overtime threshold: 38 hrs/week OR 10 hrs/day (whichever triggers first).
 *     First 3 hrs overtime: ×1.50 FT/PT. After 3 hrs: ×2.00.
 *   - Weekday penalty: 7pm–7am at 120% FT/PT, 145% of FT base for casual.
 *   - Saturday: same rate as evening (120% FT/PT, 145% FT base casual).
 *   - Sunday: 150% FT/PT, 175% FT base casual.
 *   - Public holiday: 250% for all (no casual loading on PH or OT).
 *   - Casual loading: 25% on ordinary hours only. NOT applied to OT or PH.
 *   - Two-tier meal allowance: $23.59 first meal, $21.39 subsequent.
 *
 * Adult rates (FT/PT):  L1=$24.28  L2=$25.85  L3=$28.12  L4=$30.68
 * Casual rates (×1.25): L1=$30.35  L2=$32.31  L3=$35.15  L4=$38.35
 *
 * Penalty rates (FT/PT, multiplier of FT base):
 *   Weekday ordinary:               ×1.00
 *   Weekday evening/night 7pm–7am:  ×1.20
 *   Saturday (all day):             ×1.20
 *   Sunday (all day):               ×1.50
 *   Public holiday (all day):       ×2.50
 *
 * Penalty rates (casual, multiplier of casual base = FT×1.25):
 *   Weekday ordinary:               ×1.00 (casual base already incl. 25% loading)
 *   Weekday evening/night 7pm–7am:  ×1.16 (=145%÷125% of FT base)
 *   Saturday (all day):             ×1.16
 *   Sunday (all day):               ×1.40 (=175%÷125%)
 *   Public holiday:                 ×2.00 (=250%÷125%; no casual loading on PH)
 *
 * Junior rate percentages (Miscellaneous Award Schedule A):
 *   Under 16=36.8%  16=47.3%  17=57.8%  18=68.3%  19=82.5%  20=97.7%  21+=100%
 *
 * Run after migrate.js: node scripts/seed_ma000104.js
 */
require('dotenv').config();
const pool = require('../src/db/pool');

const AWARD_CODE = 'MA000104';
const EFFECTIVE_DATE = '2025-10-10';

async function seed() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // ── Award metadata ─────────────────────────────────────────────────────────
    await client.query(`
      INSERT INTO award_metadata (award_code, award_name, effective_date, source_url)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (award_code) DO UPDATE SET
        award_name = EXCLUDED.award_name,
        effective_date = EXCLUDED.effective_date,
        updated_at = NOW()
    `, [
      AWARD_CODE,
      'Miscellaneous Award 2020',
      EFFECTIVE_DATE,
      'https://awards.fairwork.gov.au/MA000104.html',
    ]);

    // ── Classifications ────────────────────────────────────────────────────────
    // 4 levels, single 'general' stream (no industry-specific streams).
    // Level 1–2: tenure-based (< 3 months / ≥ 3 months, no trade qualifications).
    // Level 3–4: qualification-based (trade qualified / advanced trade or sub-professional).
    const classifications = [
      {
        level: 1, stream: 'general',
        title: 'Level 1',
        description: 'You have been employed in your current role for less than 3 months, and you are not carrying out duties that require a trade qualification or equivalent.',
        duties: [
          'Performing routine tasks under direct supervision',
          'Learning the requirements of the role in the first months of employment',
          'Carrying out tasks as instructed by more experienced staff',
          'Assisting with general duties not requiring trade qualifications',
        ],
        indicative_tasks: ['Entry-level worker (any non-trade industry)', 'New employee in non-award-covered role', 'General assistant (first 3 months)'],
        sort_order: 10,
      },
      {
        level: 2, stream: 'general',
        title: 'Level 2',
        description: 'You have been employed in your current role for 3 months or more, and you are not carrying out duties that require a trade qualification or equivalent.',
        duties: [
          'Performing a range of tasks with growing independence',
          'Applying knowledge and skills built up during at least 3 months of employment',
          'Working with limited supervision on established tasks and routines',
          'Carrying out duties not requiring a formal trade qualification',
        ],
        indicative_tasks: ['Experienced worker (any non-trade industry)', 'General employee (3+ months)', 'Non-trade assistant or support worker'],
        sort_order: 20,
      },
      {
        level: 3, stream: 'general',
        title: 'Level 3',
        description: 'You hold a trade qualification or equivalent, and you are carrying out duties that require those qualifications.',
        duties: [
          'Applying trade-level knowledge and skills in day-to-day work',
          'Carrying out duties that require formal qualifications or equivalent experience',
          'Working with a significant degree of skill and autonomy',
          'Using technical expertise relevant to the trade or vocation',
        ],
        indicative_tasks: ['Trade-qualified worker (any industry not covered by a specific award)', 'Certificate III equivalent skilled worker', 'Qualified technician or tradesperson'],
        sort_order: 30,
      },
      {
        level: 4, stream: 'general',
        title: 'Level 4',
        description: 'You hold advanced trade qualifications and carry out duties requiring those qualifications, or you are employed in a sub-professional capacity.',
        duties: [
          'Applying advanced trade or sub-professional expertise to complex tasks',
          'Exercising high-level judgment and independent decision-making',
          'Providing technical leadership or specialist knowledge within the role',
          'Performing duties typically requiring advanced qualifications or equivalent experience',
        ],
        indicative_tasks: ['Advanced trade worker', 'Sub-professional employee', 'Technical specialist (advanced trade level)', 'Senior qualified tradesperson'],
        sort_order: 40,
      },
    ];

    for (const c of classifications) {
      await client.query(`
        INSERT INTO classifications (award_code, level, stream, pay_point, title, description, duties, indicative_tasks, sort_order)
        VALUES ($1, $2, $3, 1, $4, $5, $6, $7, $8)
        ON CONFLICT (award_code, level, stream, pay_point) DO UPDATE SET
          title = EXCLUDED.title,
          description = EXCLUDED.description,
          duties = EXCLUDED.duties,
          indicative_tasks = EXCLUDED.indicative_tasks,
          sort_order = EXCLUDED.sort_order
      `, [
        AWARD_CODE, c.level, c.stream, c.title, c.description,
        JSON.stringify(c.duties), JSON.stringify(c.indicative_tasks), c.sort_order,
      ]);
    }
    console.log(`✓ Inserted ${classifications.length} classifications`);

    // ── Pay rates ──────────────────────────────────────────────────────────────
    // Source: FWO pay guide MA000104, effective 10 October 2025.
    // Casual rate = FT rate × 1.25 (25% casual loading).
    const baseRates = {
      1: 24.28,  // Level 1
      2: 25.85,  // Level 2
      3: 28.12,  // Level 3
      4: 30.68,  // Level 4
    };

    const classResult = await client.query(
      'SELECT id, level, stream FROM classifications WHERE award_code = $1',
      [AWARD_CODE]
    );

    for (const cls of classResult.rows) {
      const baseRate = baseRates[cls.level];
      if (!baseRate) continue;

      const casualRate = parseFloat((baseRate * 1.25).toFixed(4));

      for (const empType of ['full_time', 'part_time']) {
        await client.query(`
          INSERT INTO pay_rates (award_code, classification_id, employment_type, rate_type, rate_amount, effective_date)
          VALUES ($1, $2, $3, 'base_hourly', $4, $5)
          ON CONFLICT (award_code, classification_id, employment_type, rate_type, effective_date)
          DO UPDATE SET rate_amount = EXCLUDED.rate_amount
        `, [AWARD_CODE, cls.id, empType, baseRate, EFFECTIVE_DATE]);
      }

      await client.query(`
        INSERT INTO pay_rates (award_code, classification_id, employment_type, rate_type, rate_amount, effective_date)
        VALUES ($1, $2, 'casual', 'base_hourly', $3, $4)
        ON CONFLICT (award_code, classification_id, employment_type, rate_type, effective_date)
        DO UPDATE SET rate_amount = EXCLUDED.rate_amount
      `, [AWARD_CODE, cls.id, casualRate, EFFECTIVE_DATE]);

      await client.query(`
        INSERT INTO pay_rates (award_code, classification_id, employment_type, rate_type, rate_amount, effective_date)
        VALUES ($1, $2, 'casual', 'casual_loading', 0.25, $3)
        ON CONFLICT (award_code, classification_id, employment_type, rate_type, effective_date)
        DO UPDATE SET rate_amount = EXCLUDED.rate_amount
      `, [AWARD_CODE, cls.id, EFFECTIVE_DATE]);
    }
    console.log('✓ Inserted pay rates');

    // ── Penalty rates ──────────────────────────────────────────────────────────
    // Source: MA000104 pay guide, Clause 20 (penalty rates) and Schedule A.
    //
    // FT/PT multipliers (verified from pay guide, L1 adult base $24.28):
    //   Weekday ordinary (7am–7pm):   ×1.00
    //   Weekday evening/night (7pm–7am): ×1.20  ($24.28→$29.14 ✓)
    //   Saturday:                      ×1.20  ($24.28→$29.14 ✓)
    //   Sunday:                        ×1.50  ($24.28→$36.42 ✓)
    //   Public holiday:                ×2.50  ($24.28→$60.70 ✓)
    //
    // Casual multipliers (applied to casual base = FT × 1.25 = $30.35 for L1):
    //   Weekday ordinary:              ×1.00 (casual loading already in base rate)
    //   Weekday evening/night (7pm–7am): ×1.16 ($30.35→$35.21; = 145% of FT base ÷ 125%)
    //   Saturday:                      ×1.16 ($30.35→$35.21 ✓)
    //   Sunday:                        ×1.40 ($30.35→$42.49; = 175% ÷ 125% ✓)
    //   Public holiday:                ×2.00 ($30.35→$60.70; = 250% ÷ 125% — no casual loading on PH ✓)
    //
    // The weekday evening/night penalty uses a time band: 19:00–07:00.
    // The calculator picks Math.max across all applicable rates per minute:
    //   At 10am: only no-band row applies → ×1.00 ✓
    //   At 8pm:  both no-band (×1.00) and time-band (×1.20) apply → max = ×1.20 ✓

    const penaltyRates = [
      // ── Full-time ────────────────────────────────────────────────────────────
      { employment_type: 'full_time',  day_type: 'weekday',        time_band_start: null,    time_band_end: null,    multiplier: 1.00, description: 'Ordinary weekday rate (×1.0, 7am–7pm)' },
      { employment_type: 'full_time',  day_type: 'weekday',        time_band_start: '19:00', time_band_end: '07:00', multiplier: 1.20, description: 'Weekday evening/night penalty 7pm–7am (×1.20)' },
      { employment_type: 'full_time',  day_type: 'saturday',       time_band_start: null,    time_band_end: null,    multiplier: 1.20, description: 'Saturday all day (×1.20)' },
      { employment_type: 'full_time',  day_type: 'sunday',         time_band_start: null,    time_band_end: null,    multiplier: 1.50, description: 'Sunday — time and a half (×1.50)' },
      { employment_type: 'full_time',  day_type: 'public_holiday', time_band_start: null,    time_band_end: null,    multiplier: 2.50, description: 'Public holiday — double time and a half (×2.50)' },
      // ── Part-time (same as full-time) ─────────────────────────────────────
      { employment_type: 'part_time',  day_type: 'weekday',        time_band_start: null,    time_band_end: null,    multiplier: 1.00, description: 'Ordinary weekday rate (×1.0, 7am–7pm)' },
      { employment_type: 'part_time',  day_type: 'weekday',        time_band_start: '19:00', time_band_end: '07:00', multiplier: 1.20, description: 'Weekday evening/night penalty 7pm–7am (×1.20)' },
      { employment_type: 'part_time',  day_type: 'saturday',       time_band_start: null,    time_band_end: null,    multiplier: 1.20, description: 'Saturday all day (×1.20)' },
      { employment_type: 'part_time',  day_type: 'sunday',         time_band_start: null,    time_band_end: null,    multiplier: 1.50, description: 'Sunday — time and a half (×1.50)' },
      { employment_type: 'part_time',  day_type: 'public_holiday', time_band_start: null,    time_band_end: null,    multiplier: 2.50, description: 'Public holiday — double time and a half (×2.50)' },
      // ── Casual ───────────────────────────────────────────────────────────────
      // Casual ordinary = ×1.00 of casual base (which already = FT ×1.25).
      // Casual loading NOT applied to public holiday or overtime hours (clause 11.1(b)).
      { employment_type: 'casual',     day_type: 'weekday',        time_band_start: null,    time_band_end: null,    multiplier: 1.00, description: 'Ordinary casual weekday (incl. 25% casual loading)' },
      { employment_type: 'casual',     day_type: 'weekday',        time_band_start: '19:00', time_band_end: '07:00', multiplier: 1.16, description: 'Casual weekday evening/night 7pm–7am (×1.16 of casual base = ×1.45 of FT base)' },
      { employment_type: 'casual',     day_type: 'saturday',       time_band_start: null,    time_band_end: null,    multiplier: 1.16, description: 'Casual Saturday (×1.16 of casual base = ×1.45 of FT base)' },
      { employment_type: 'casual',     day_type: 'sunday',         time_band_start: null,    time_band_end: null,    multiplier: 1.40, description: 'Casual Sunday (×1.40 of casual base = ×1.75 of FT base)' },
      { employment_type: 'casual',     day_type: 'public_holiday', time_band_start: null,    time_band_end: null,    multiplier: 2.00, description: 'Casual public holiday (×2.00 of casual base = ×2.50 of FT base — no casual loading on PH)' },
    ];

    await client.query(`DELETE FROM penalty_rates WHERE award_code = $1`, [AWARD_CODE]);

    for (const r of penaltyRates) {
      await client.query(`
        INSERT INTO penalty_rates
          (award_code, employment_type, day_type, time_band_start, time_band_end, time_band_label, multiplier, addition_per_hour, description, effective_date)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      `, [
        AWARD_CODE, r.employment_type, r.day_type,
        r.time_band_start, r.time_band_end, null,
        r.multiplier, null, r.description, EFFECTIVE_DATE,
      ]);
    }
    console.log(`✓ Inserted ${penaltyRates.length} penalty rate rules`);

    // ── Overtime rates ─────────────────────────────────────────────────────────
    // Source: MA000104 Clause 19 — overtime payable when ordinary hours are exceeded.
    // Triggers: (a) more than 38 hours per week (weekly threshold), OR
    //           (b) more than 10 hours on any single day (daily threshold).
    // Rates: first 3 hours at ×1.50, after 3 hours at ×2.00 (both FT/PT).
    //
    // Weekly model: 38h→41h @ ×1.50, 41h+ @ ×2.00
    // Daily model:  10h→13h @ ×1.50, 13h+ @ ×2.00
    //
    // Casual overtime: casual loading NOT applied to overtime hours (clause 11.1(b)).
    // Effective OT rates are the same dollar amounts as FT/PT OT rates.
    // Expressed relative to the casual base ($30.35 for L1):
    //   First 3h OT: $24.28×1.50=$36.42 = $30.35×1.20 → multiplier 1.20
    //   After 3h OT: $24.28×2.00=$48.56 = $30.35×1.60 → multiplier 1.60
    //
    // NOTE: the overtime premium is calculated as (multiplier - 1.0) × base rate,
    // so setting casual multiplier to 1.20 yields a premium of 0.20 × $30.35 = $6.07/hr,
    // giving a total OT rate of $30.35 + $6.07 = $36.42/hr ✓

    const overtimeRates = [
      // FT/PT — weekly threshold (38h/41h)
      { employment_type: 'full_time',  threshold_hours: 38, period: 'weekly', multiplier: 1.50, description: 'Weekly OT — first 3 hrs over 38h (×1.50)' },
      { employment_type: 'full_time',  threshold_hours: 41, period: 'weekly', multiplier: 2.00, description: 'Weekly OT — after 41h (×2.00)' },
      { employment_type: 'part_time',  threshold_hours: 38, period: 'weekly', multiplier: 1.50, description: 'Part-time weekly OT — first 3 hrs over 38h (×1.50)' },
      { employment_type: 'part_time',  threshold_hours: 41, period: 'weekly', multiplier: 2.00, description: 'Part-time weekly OT — after 41h (×2.00)' },
      // FT/PT — daily threshold (10h/13h)
      { employment_type: 'full_time',  threshold_hours: 10, period: 'daily', multiplier: 1.50, description: 'Daily OT — first 3 hrs over 10h ordinary hours (×1.50)' },
      { employment_type: 'full_time',  threshold_hours: 13, period: 'daily', multiplier: 2.00, description: 'Daily OT — after 13h total (×2.00)' },
      { employment_type: 'part_time',  threshold_hours: 10, period: 'daily', multiplier: 1.50, description: 'Part-time daily OT — first 3 hrs over 10h (×1.50)' },
      { employment_type: 'part_time',  threshold_hours: 13, period: 'daily', multiplier: 2.00, description: 'Part-time daily OT — after 13h total (×2.00)' },
      // Casual — weekly (no casual loading on OT; multipliers relative to casual base)
      { employment_type: 'casual',     threshold_hours: 38, period: 'weekly', multiplier: 1.20, description: 'Casual weekly OT — first 3 hrs over 38h (×1.20 of casual base = ×1.50 of FT base)' },
      { employment_type: 'casual',     threshold_hours: 41, period: 'weekly', multiplier: 1.60, description: 'Casual weekly OT — after 41h (×1.60 of casual base = ×2.00 of FT base)' },
      // Casual — daily
      { employment_type: 'casual',     threshold_hours: 10, period: 'daily', multiplier: 1.20, description: 'Casual daily OT — first 3 hrs over 10h (×1.20 of casual base)' },
      { employment_type: 'casual',     threshold_hours: 13, period: 'daily', multiplier: 1.60, description: 'Casual daily OT — after 13h (×1.60 of casual base)' },
    ];

    await client.query(`DELETE FROM overtime_rates WHERE award_code = $1`, [AWARD_CODE]);

    for (const r of overtimeRates) {
      await client.query(`
        INSERT INTO overtime_rates (award_code, employment_type, threshold_hours, period, multiplier, description, effective_date)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
      `, [AWARD_CODE, r.employment_type, r.threshold_hours, r.period, r.multiplier, r.description, EFFECTIVE_DATE]);
    }
    console.log(`✓ Inserted ${overtimeRates.length} overtime rules`);

    // ── Allowances ─────────────────────────────────────────────────────────────
    // Source: MA000104 Clause 17 and Schedule B.
    //
    // None of the MA000104 allowances are all-purpose — they are additional
    // payments on top of the base rate and do not affect overtime/penalty calculations.
    //
    // Two-tier meal allowance: same pattern as MA000004/MA000002 (retail/clerks).
    //   First meal ($23.59): triggered after 1h unnotified overtime.
    //   Second meal ($21.39): triggered after 4h total overtime.
    //   (The calculator models this using the MA000004-style two-tier logic.)
    //
    // Leading hand allowance: 3 tiers based on number of employees supervised.
    //   Only applies when in charge of 3 or more employees (clause 17.2(b)).
    const allowances = [
      {
        allowance_type: 'first_aid',
        name: 'First aid allowance',
        description: 'If you hold a current first aid certificate (e.g. St John Ambulance or equivalent) and your employer has specifically appointed you to perform first aid duties, you are entitled to an additional $21.37 per week.',
        trigger_condition: 'Appointed by employer to perform first aid duties, holding a current first aid certificate',
        amount: 21.37, amount_type: 'per_week', per_unit: 'per_week',
        is_all_purpose: false,
      },
      {
        allowance_type: 'leading_hand_3to10',
        name: 'Leading hand — 3 to 10 employees',
        description: 'If you are a team leader or leading hand directed by management to be in charge of 3 to 10 employees, you are entitled to an additional $47.01 per week.',
        trigger_condition: 'Directed by management to be in charge of 3–10 employees',
        amount: 47.01, amount_type: 'per_week', per_unit: 'per_week',
        is_all_purpose: false,
      },
      {
        allowance_type: 'leading_hand_11to20',
        name: 'Leading hand — 11 to 20 employees',
        description: 'If you are a team leader or leading hand directed by management to be in charge of 11 to 20 employees, you are entitled to an additional $69.45 per week.',
        trigger_condition: 'Directed by management to be in charge of 11–20 employees',
        amount: 69.45, amount_type: 'per_week', per_unit: 'per_week',
        is_all_purpose: false,
      },
      {
        allowance_type: 'leading_hand_over20',
        name: 'Leading hand — more than 20 employees',
        description: 'If you are a team leader or leading hand directed by management to be in charge of more than 20 employees, you are entitled to an additional $88.68 per week.',
        trigger_condition: 'Directed by management to be in charge of more than 20 employees',
        amount: 88.68, amount_type: 'per_week', per_unit: 'per_week',
        is_all_purpose: false,
      },
      {
        allowance_type: 'meal',
        name: 'Meal allowance — overtime (first meal)',
        description: 'If you are required to work more than 1 hour of overtime after your ordinary finishing time without 24 hours notice, and a meal is not provided, you are entitled to a meal allowance of $23.59.',
        trigger_condition: 'More than 1 hour of unnotified overtime worked after ordinary hours end, without a meal being provided',
        amount: 23.59, amount_type: 'fixed', per_unit: 'per_meal',
        is_all_purpose: false,
      },
      {
        allowance_type: 'meal_second',
        name: 'Meal allowance — overtime (subsequent meal)',
        description: 'If your total overtime exceeds 4 hours, a further meal allowance of $21.39 applies for each additional meal period worked.',
        trigger_condition: 'Total overtime exceeds 4 hours, for each subsequent meal period',
        amount: 21.39, amount_type: 'fixed', per_unit: 'per_meal',
        is_all_purpose: false,
      },
      {
        allowance_type: 'vehicle_car',
        name: 'Vehicle allowance',
        description: 'If you agree with your employer to use your own motor vehicle on the employer\'s business, you are entitled to $0.98 per kilometre travelled.',
        trigger_condition: 'Employee agrees with employer to use own vehicle on employer\'s business',
        amount: 0.98, amount_type: 'per_km', per_unit: 'per_km',
        is_all_purpose: false,
      },
    ];

    await client.query(`DELETE FROM allowances WHERE award_code = $1`, [AWARD_CODE]);

    for (const a of allowances) {
      await client.query(`
        INSERT INTO allowances (award_code, allowance_type, name, description, trigger_condition, amount, amount_type, per_unit, is_all_purpose, effective_date)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        ON CONFLICT (award_code, allowance_type, effective_date) DO UPDATE SET
          name = EXCLUDED.name,
          description = EXCLUDED.description,
          amount = EXCLUDED.amount,
          is_all_purpose = EXCLUDED.is_all_purpose
      `, [
        AWARD_CODE, a.allowance_type, a.name, a.description,
        a.trigger_condition, a.amount, a.amount_type, a.per_unit,
        a.is_all_purpose, EFFECTIVE_DATE,
      ]);
    }
    console.log(`✓ Inserted ${allowances.length} allowances`);

    // ── Break entitlements ─────────────────────────────────────────────────────
    // Source: MA000104 Clause 14.
    // Only meal break is mandated (unpaid, 30 min minimum, after 5 hours worked).
    // No separate paid rest break entitlement exists under this award.
    const breaks = [
      {
        employment_type: null,
        shift_hours_min: 5.0, shift_hours_max: null,
        break_type: 'meal', break_duration_min: 30, is_paid: false,
        timing_rule: 'Not required to work more than 5 hours without an unpaid meal break',
        description: 'If you work more than 5 hours, you must receive an unpaid meal break of at least 30 minutes. If not given this break, hours after the 5-hour mark must be paid at double time until the break is provided.',
      },
    ];

    await client.query(`DELETE FROM break_entitlements WHERE award_code = $1`, [AWARD_CODE]);

    for (const b of breaks) {
      await client.query(`
        INSERT INTO break_entitlements
          (award_code, employment_type, shift_hours_min, shift_hours_max, break_type, break_duration_min, is_paid, timing_rule, description)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      `, [
        AWARD_CODE, b.employment_type, b.shift_hours_min, b.shift_hours_max,
        b.break_type, b.break_duration_min, b.is_paid, b.timing_rule, b.description,
      ]);
    }
    console.log(`✓ Inserted ${breaks.length} break entitlement rule`);

    // ── Classification questions ───────────────────────────────────────────────
    // One question — levels map directly to the four award definitions.
    // Level 1 and 2 are distinguished by tenure (< 3 months / ≥ 3 months).
    // Levels 3 and 4 are distinguished by qualification level.
    const questions = [
      {
        question_key: 'misc_level',
        question_text: 'Which best describes your employment situation?',
        help_text: 'The Miscellaneous Award has four levels. Levels 1–2 depend on how long you\'ve been in your role. Levels 3–4 apply if your work requires a trade qualification. Your payslip or contract may also state your level.',
        question_type: 'single',
        stream: null,
        parent_question_key: null,
        parent_answer_key: null,
        sort_order: 1,
        answers: [
          {
            answer_key: 'l1',
            answer_text: 'I started in my current role less than 3 months ago (no trade qualifications required for this role)',
            sort_order: 1,
          },
          {
            answer_key: 'l2',
            answer_text: 'I have been in my current role for 3 months or more (no trade qualifications required for this role)',
            sort_order: 2,
          },
          {
            answer_key: 'l3',
            answer_text: 'My role requires a trade qualification or equivalent (e.g. Certificate III) and I hold that qualification',
            sort_order: 3,
          },
          {
            answer_key: 'l4',
            answer_text: 'My role requires advanced trade qualifications, or I am employed in a sub-professional capacity',
            sort_order: 4,
          },
        ],
      },
    ];

    for (const q of questions) {
      const qResult = await client.query(`
        INSERT INTO classification_questions
          (award_code, question_key, question_text, help_text, question_type, stream, parent_question_key, parent_answer_key, sort_order)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        ON CONFLICT (question_key) DO UPDATE SET
          award_code = EXCLUDED.award_code,
          question_text = EXCLUDED.question_text,
          help_text = EXCLUDED.help_text,
          parent_question_key = EXCLUDED.parent_question_key,
          parent_answer_key = EXCLUDED.parent_answer_key,
          sort_order = EXCLUDED.sort_order
        RETURNING id
      `, [
        AWARD_CODE, q.question_key, q.question_text, q.help_text,
        q.question_type, q.stream, q.parent_question_key, q.parent_answer_key, q.sort_order,
      ]);

      const questionId = qResult.rows[0].id;
      await client.query('DELETE FROM classification_answers WHERE question_id = $1', [questionId]);
      for (const a of q.answers) {
        await client.query(`
          INSERT INTO classification_answers (question_id, answer_key, answer_text, sort_order)
          VALUES ($1, $2, $3, $4)
        `, [questionId, a.answer_key, a.answer_text, a.sort_order]);
      }
    }
    console.log(`✓ Inserted ${questions.length} classification question`);

    await client.query('COMMIT');
    console.log('\n✅ MA000104 seed complete');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Seed failed:', err);
    throw err;
  } finally {
    client.release();
    await pool.end();
  }
}

seed();
