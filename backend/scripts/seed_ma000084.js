/**
 * Seed script — Storage Services and Wholesale Award 2020 [MA000084]
 * Pay rates effective 1 July 2025 (published 22 July 2025)
 * Source: Fair Work Ombudsman pay guide G00842860, effective 1 July 2025
 *
 * Award covers: storeworkers, wholesale employees, transport employees, and
 * clerical employees in storage, warehousing, and wholesale trading industries.
 *
 * Classification structure:
 *   Internal levels 1–6 map to award grades:
 *   L1 = Storeworker Grade 1 (commencement)  — $25.85/hr
 *   L2 = Storeworker Grade 1 (after 3 months) — $26.17/hr
 *   L3 = Storeworker Grade 1 (after 12 months)— $26.47/hr
 *   L4 = Storeworker Grade 2                  — $26.70/hr
 *   L5 = Storeworker Grade 3                  — $27.46/hr
 *   L6 = Storeworker Grade 4                  — $28.27/hr
 *   Wholesale employees (Level 1–4) have identical rates; both streams share this table.
 *
 * Run after migrate.js: node scripts/seed_ma000084.js
 */
require('dotenv').config();
const pool = require('../src/db/pool');

const AWARD_CODE = 'MA000084';
const EFFECTIVE_DATE = '2025-07-01';

async function seed() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // ── Award metadata ────────────────────────────────────────────────────────
    await client.query(`
      INSERT INTO award_metadata (award_code, award_name, effective_date, source_url)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (award_code) DO UPDATE SET
        award_name = EXCLUDED.award_name,
        effective_date = EXCLUDED.effective_date,
        updated_at = NOW()
    `, [
      AWARD_CODE,
      'Storage Services and Wholesale Award 2020',
      EFFECTIVE_DATE,
      'https://www.fairwork.gov.au/employment-conditions/awards/awards-summary/ma000084-summary',
    ]);

    // ── Classifications ───────────────────────────────────────────────────────
    // MA000084 has two streams (Storeworkers / Wholesale employees) with identical rates.
    // We implement using a single 'storeworker' stream for simplicity.
    // Grade 1 has 3 pay levels based on length of employment.
    // Internal levels: 1-3 = Grade 1 (commencement/3m/12m), 4=G2, 5=G3, 6=G4.

    const classifications = [
      {
        level: 1, stream: 'storeworker',
        title: 'Storeworker / Wholesale Employee Grade 1 (Commencement)',
        description: 'Entry-level — you have just started in this role. This rate applies when you first commence employment. You work under direct supervision and are learning the job.',
        duties: [
          'Receiving, checking, and putting away stock under supervision',
          'Picking and packing orders under direction',
          'Loading and unloading goods under supervision',
          'Cleaning and maintaining work areas',
          'Following established procedures and safety requirements',
          'Operating basic material handling equipment under training',
        ],
        indicative_tasks: ['New storeworker / warehouse assistant', 'New wholesale assistant', 'New distribution centre worker'],
        sort_order: 10,
      },
      {
        level: 2, stream: 'storeworker',
        title: 'Storeworker / Wholesale Employee Grade 1 (After 3 Months)',
        description: 'Grade 1 after at least 3 months of employment. You have become familiar with basic duties but are still at the entry classification level.',
        duties: [
          'All Grade 1 commencement duties, with growing familiarity',
          'Basic stock control and inventory tasks with limited supervision',
          'Routine equipment operation under general supervision',
          'Participating in stocktakes and cycle counts',
        ],
        indicative_tasks: ['Storeworker (3+ months)', 'Wholesale assistant (3+ months)'],
        sort_order: 11,
      },
      {
        level: 3, stream: 'storeworker',
        title: 'Storeworker / Wholesale Employee Grade 1 (After 12 Months)',
        description: 'Grade 1 after at least 12 months of employment. You have a solid grasp of all entry-level duties.',
        duties: [
          'All Grade 1 duties performed reliably and with confidence',
          'Assisting in training or guiding new Grade 1 (commencement) employees',
          'Contributing to stock control and procedural compliance',
        ],
        indicative_tasks: ['Storeworker (12+ months)', 'Wholesale assistant (12+ months)'],
        sort_order: 12,
      },
      {
        level: 4, stream: 'storeworker',
        title: 'Storeworker / Wholesale Employee Grade 2',
        description: 'Experienced storeworker or wholesale employee. You perform a broader range of tasks with more independence, including more complex material handling or customer-facing duties.',
        duties: [
          'Complex stock control, receiving, and dispatch operations',
          'Operating forklifts or other licensed material handling equipment independently',
          'Processing customer orders and organising deliveries independently',
          'Maintaining stock records and reporting discrepancies',
          'Basic supervisory duties for Grade 1 employees in your area',
        ],
        indicative_tasks: ['Senior storeworker', 'Forklift driver', 'Senior warehouse operative', 'Wholesale sales assistant'],
        sort_order: 20,
      },
      {
        level: 5, stream: 'storeworker',
        title: 'Storeworker / Wholesale Employee Grade 3',
        description: 'Senior storeworker or wholesale employee. You have significant experience and may supervise others, handle complex logistics, or apply trade skills to your work.',
        duties: [
          'Advanced logistics and warehouse operations',
          'Supervising and directing other storeworkers',
          'Managing sections of the warehouse or distribution operation',
          'Operating and maintaining complex plant and equipment',
          'Applying trade skills (e.g. vehicle maintenance, specialised machinery)',
          'Training and inducting junior employees',
        ],
        indicative_tasks: ['Leading storeworker', 'Warehouse team leader', 'Senior wholesale employee', 'Transport/logistics supervisor'],
        sort_order: 30,
      },
      {
        level: 6, stream: 'storeworker',
        title: 'Storeworker / Wholesale Employee Grade 4',
        description: 'Most senior storeworker or wholesale employee classification. You have the highest level of skill and/or supervisory responsibility under the award.',
        duties: [
          'Full responsibility for a section or function of the warehouse/distribution operation',
          'Supervising a team of employees across multiple grades',
          'Complex systems operation and management (e.g. WMS, specialist machinery)',
          'Responsible for compliance, safety, and quality in your section',
          'Reporting to management on operational performance',
        ],
        indicative_tasks: ['Warehouse supervisor', 'Distribution centre section manager (award-level)', 'Senior trade storeworker', 'Senior wholesale supervisor'],
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

    // ── Pay rates ─────────────────────────────────────────────────────────────
    // Source: FWO pay guide G00842860, effective 1 July 2025.
    // Casual rate = FT/PT rate × 1.25 (25% casual loading), pre-calculated in pay guide.
    const baseRates = {
      1: 25.85, // Grade 1 commencement
      2: 26.17, // Grade 1 after 3 months
      3: 26.47, // Grade 1 after 12 months
      4: 26.70, // Grade 2
      5: 27.46, // Grade 3
      6: 28.27, // Grade 4
    };

    // Casual rates from pay guide (FT × 1.25, as published):
    const casualRates = {
      1: 32.31,
      2: 32.71,
      3: 33.09,
      4: 33.38,
      5: 34.33,
      6: 35.34,
    };

    const classResult = await client.query(
      'SELECT id, level, stream FROM classifications WHERE award_code = $1',
      [AWARD_CODE]
    );

    for (const cls of classResult.rows) {
      const baseRate = baseRates[cls.level];
      const casualRate = casualRates[cls.level];
      if (!baseRate) continue;

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

    // ── Penalty rates ─────────────────────────────────────────────────────────
    // Source: MA000084 clause 30 & FWO pay guide, effective 1 July 2025.
    //
    // Shift loadings (applied as multipliers to ordinary rate):
    //   Early morning shift (starting before 6am): +12.5% = ×1.125
    //   Afternoon shift (commencing noon or later, finishing after 6pm): +15% = ×1.15
    //   Night shift (finishing at or after midnight): +30% = ×1.30
    //
    // NOTE: The shift loadings apply to the ENTIRE shift, not per-hour.
    // The calculator approximates these using time bands (the highest applicable
    // multiplier in any given hour is applied per-minute by the engine).
    // Implementation: night band 22:00–06:00 (×1.30), afternoon band 18:00–22:00 (×1.15).
    // This means:
    //   - Shifts running past 10pm and through midnight get ×1.30 for all those hours ✓
    //   - Afternoon shifts finishing before 10pm get ×1.15 for post-6pm hours ✓
    //   - Early morning shifts (starting before 6am) get ×1.30 for pre-6am hours (slight
    //     overestimate vs the ×1.125 full-shift loading for pure early morning shifts)
    //
    // Penalty multipliers are applied to the employee's base hourly rate.
    // Casual shift loadings use a slightly lower multiplier (12.5%/15%/30% of FT base,
    // divided by casual base = 10%/12%/24% of casual base, i.e. ×1.10/1.12/1.24).

    const penaltyRates = [
      // ── Full-time ──────────────────────────────────────────────────────────
      {
        employment_type: 'full_time', day_type: 'weekday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.0, addition_per_hour: null,
        description: 'Ordinary weekday rate (Mon–Fri)',
      },
      {
        employment_type: 'full_time', day_type: 'weekday',
        time_band_start: '18:00', time_band_end: '22:00', time_band_label: 'afternoon_shift',
        multiplier: 1.15, addition_per_hour: null,
        description: 'Afternoon shift (6pm–10pm) — +15% = ×1.15',
      },
      {
        employment_type: 'full_time', day_type: 'weekday',
        time_band_start: '22:00', time_band_end: '06:00', time_band_label: 'night_shift',
        multiplier: 1.30, addition_per_hour: null,
        description: 'Night shift / late hours (10pm–6am) — +30% = ×1.30',
      },
      {
        employment_type: 'full_time', day_type: 'saturday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.50, addition_per_hour: null,
        description: 'Saturday (ordinary hours by agreement) — ×1.50',
      },
      {
        employment_type: 'full_time', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.00, addition_per_hour: null,
        description: 'Sunday — ×2.00',
      },
      {
        employment_type: 'full_time', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.50, addition_per_hour: null,
        description: 'Public holiday — double time and a half (×2.50)',
      },
      // ── Part-time (same as full-time) ──────────────────────────────────────
      {
        employment_type: 'part_time', day_type: 'weekday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.0, addition_per_hour: null,
        description: 'Ordinary weekday rate (Mon–Fri)',
      },
      {
        employment_type: 'part_time', day_type: 'weekday',
        time_band_start: '18:00', time_band_end: '22:00', time_band_label: 'afternoon_shift',
        multiplier: 1.15, addition_per_hour: null,
        description: 'Afternoon shift (6pm–10pm) — +15% = ×1.15',
      },
      {
        employment_type: 'part_time', day_type: 'weekday',
        time_band_start: '22:00', time_band_end: '06:00', time_band_label: 'night_shift',
        multiplier: 1.30, addition_per_hour: null,
        description: 'Night shift / late hours (10pm–6am) — +30% = ×1.30',
      },
      {
        employment_type: 'part_time', day_type: 'saturday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.50, addition_per_hour: null,
        description: 'Saturday (ordinary hours by agreement) — ×1.50',
      },
      {
        employment_type: 'part_time', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.00, addition_per_hour: null,
        description: 'Sunday — ×2.00',
      },
      {
        employment_type: 'part_time', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.50, addition_per_hour: null,
        description: 'Public holiday — double time and a half (×2.50)',
      },
      // ── Casual ─────────────────────────────────────────────────────────────
      // Casual base rate includes 25% casual loading.
      // Shift loadings for casuals: the award adds 12.5%/15%/30% of FT base to casual rate.
      // Relative to casual base: 12.5/125 = 10%, 15/125 = 12%, 30/125 = 24%.
      // Penalty multipliers below are relative to the casual base rate.
      {
        employment_type: 'casual', day_type: 'weekday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.0, addition_per_hour: null,
        description: 'Ordinary casual weekday rate (includes 25% casual loading)',
      },
      {
        employment_type: 'casual', day_type: 'weekday',
        time_band_start: '18:00', time_band_end: '22:00', time_band_label: 'afternoon_shift',
        multiplier: 1.12, addition_per_hour: null,
        description: 'Casual afternoon shift (6pm–10pm) — +15% of FT base ≈ ×1.12 of casual base',
      },
      {
        employment_type: 'casual', day_type: 'weekday',
        time_band_start: '22:00', time_band_end: '06:00', time_band_label: 'night_shift',
        multiplier: 1.24, addition_per_hour: null,
        description: 'Casual night shift (10pm–6am) — +30% of FT base ≈ ×1.24 of casual base',
      },
      {
        employment_type: 'casual', day_type: 'saturday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.40, addition_per_hour: null,
        description: 'Casual Saturday — ×1.40 of casual base (175% of FT base)',
      },
      {
        employment_type: 'casual', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.80, addition_per_hour: null,
        description: 'Casual Sunday — ×1.80 of casual base (225% of FT base)',
      },
      {
        employment_type: 'casual', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.20, addition_per_hour: null,
        description: 'Casual public holiday — ×2.20 of casual base (275% of FT base)',
      },
    ];

    await client.query(`DELETE FROM penalty_rates WHERE award_code = $1`, [AWARD_CODE]);

    for (const r of penaltyRates) {
      await client.query(`
        INSERT INTO penalty_rates
          (award_code, employment_type, day_type, time_band_start, time_band_end, time_band_label, multiplier, addition_per_hour, description, effective_date)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      `, [
        AWARD_CODE, r.employment_type, r.day_type,
        r.time_band_start, r.time_band_end, r.time_band_label,
        r.multiplier, r.addition_per_hour || null, r.description, EFFECTIVE_DATE,
      ]);
    }
    console.log(`✓ Inserted ${penaltyRates.length} penalty rate rules`);

    // ── Overtime rates ────────────────────────────────────────────────────────
    // MA000084 clause 28 — Overtime
    // Overtime applies Monday to Saturday: first 2 hours ×1.50, after 2 hours ×2.00.
    // Sunday and public holiday overtime: ×2.00 and ×2.50 respectively (same as ordinary).
    // Ordinary hours are 38 hours per week for FT (or agreed hours for PT).
    // Casual employees are not entitled to overtime under this award.
    //
    // Casual OT multipliers relative to casual base (same $ as FT OT):
    //   First 2 hrs: $38.78/$32.31 ≈ 1.40 of casual base (= ×1.75 of FT base)
    //   After 2 hrs: $51.70/$32.31 ≈ 1.60 of casual base (= ×2.25 of FT base per MA000084 Sch A)

    const overtimeRates = [
      { employment_type: 'full_time',  threshold_hours: 38, period: 'weekly', multiplier: 1.50, description: 'Weekly overtime — first 2 hours over 38 (×1.50)' },
      { employment_type: 'full_time',  threshold_hours: 40, period: 'weekly', multiplier: 2.00, description: 'Weekly overtime — after 40 hours (×2.00)' },
      { employment_type: 'part_time',  threshold_hours: 38, period: 'weekly', multiplier: 1.50, description: 'Part-time weekly overtime — first 2 hours (×1.50)' },
      { employment_type: 'part_time',  threshold_hours: 40, period: 'weekly', multiplier: 2.00, description: 'Part-time weekly overtime — after 40 hours (×2.00)' },
      // Casual employees receive the same dollar overtime rate as FT, so relative to casual base:
      { employment_type: 'casual', threshold_hours: 38, period: 'weekly', multiplier: 1.40, description: 'Casual weekly overtime — first 2 hours (×1.40 of casual base = 175% of FT)' },
      { employment_type: 'casual', threshold_hours: 40, period: 'weekly', multiplier: 1.80, description: 'Casual weekly overtime — after 40 hours (×1.80 of casual base = 225% of FT)' },
    ];

    await client.query(`DELETE FROM overtime_rates WHERE award_code = $1`, [AWARD_CODE]);

    for (const r of overtimeRates) {
      await client.query(`
        INSERT INTO overtime_rates (award_code, employment_type, threshold_hours, period, multiplier, description, effective_date)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
      `, [AWARD_CODE, r.employment_type, r.threshold_hours, r.period, r.multiplier, r.description, EFFECTIVE_DATE]);
    }
    console.log(`✓ Inserted ${overtimeRates.length} overtime rules`);

    // ── Allowances ────────────────────────────────────────────────────────────
    // Source: MA000084 clause 20 & FWO pay guide G00842860, effective 1 July 2025.
    const allowances = [
      {
        allowance_type: 'cold_work',
        name: 'Cold work allowance (15.6°C to -18.9°C)',
        description: 'If you are required to work in refrigerated areas at temperatures from 15.6°C (4°F) down to -18.9°C (-2°F), you receive an additional allowance per hour.',
        trigger_condition: 'Working in refrigerated areas between 15.6°C and -18.9°C',
        amount: 1.07, amount_type: 'per_hour', per_unit: 'per_hour',
      },
      {
        allowance_type: 'cold_work_mid',
        name: 'Cold work allowance (-18.9°C to -23.3°C)',
        description: 'If you are required to work in temperatures below -18.9°C (-2°F) and down to -23.3°C (-10°F), you receive an increased allowance per hour.',
        trigger_condition: 'Working in temperatures between -18.9°C and -23.3°C',
        amount: 1.61, amount_type: 'per_hour', per_unit: 'per_hour',
      },
      {
        allowance_type: 'cold_work_freezer',
        name: 'Cold work allowance (below -23.3°C)',
        description: 'If you are required to work in temperatures below -23.3°C (-10°F), you receive the highest cold work allowance per hour.',
        trigger_condition: 'Working in temperatures below -23.3°C',
        amount: 2.15, amount_type: 'per_hour', per_unit: 'per_hour',
      },
      {
        allowance_type: 'first_aid',
        name: 'First aid allowance',
        description: 'If you hold a current first aid certificate and are appointed as first aid officer, you receive a weekly first aid allowance.',
        trigger_condition: 'Appointed as first aid officer with a current first aid certificate',
        amount: 16.11, amount_type: 'weekly', per_unit: 'per_week',
      },
      {
        allowance_type: 'meal',
        name: 'Meal allowance (overtime)',
        description: 'If you are required to work overtime without being given prior notice, you are entitled to a meal allowance. Not payable to casual employees.',
        trigger_condition: 'Overtime worked without prior notice, FT/PT only',
        amount: 21.44, amount_type: 'fixed', per_unit: 'per_meal',
      },
      {
        allowance_type: 'protective_clothing',
        name: 'Protective clothing/footwear reimbursement',
        description: 'If you are required to wear protective clothing or footwear for your work and must purchase it yourself, your employer must reimburse the reasonable cost.',
        trigger_condition: 'Required to purchase own protective clothing or footwear',
        amount: null, amount_type: 'reimbursement', per_unit: null,
      },
      {
        allowance_type: 'vehicle',
        name: 'Vehicle / travel allowance (different location)',
        description: 'If you are required to work at a different location than usual, you are entitled to reimbursement of additional fares and, on Monday to Saturday, additional travel time at your minimum hourly rate.',
        trigger_condition: 'Required to work at a different location from your usual place of work',
        amount: null, amount_type: 'reimbursement', per_unit: null,
      },
    ];

    await client.query(`DELETE FROM allowances WHERE award_code = $1`, [AWARD_CODE]);

    for (const a of allowances) {
      await client.query(`
        INSERT INTO allowances (award_code, allowance_type, name, description, trigger_condition, amount, amount_type, per_unit, effective_date)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        ON CONFLICT (award_code, allowance_type, effective_date) DO UPDATE SET
          name = EXCLUDED.name, description = EXCLUDED.description, amount = EXCLUDED.amount
      `, [AWARD_CODE, a.allowance_type, a.name, a.description, a.trigger_condition, a.amount, a.amount_type, a.per_unit, EFFECTIVE_DATE]);
    }
    console.log(`✓ Inserted ${allowances.length} allowances`);

    // ── Break entitlements ────────────────────────────────────────────────────
    // MA000084 clause 32 — Breaks
    // Employees must receive a 10-minute paid rest break in each 4-hour period.
    // An unpaid meal break of at least 30 minutes must be given no later than
    // 5 hours after commencing work.
    // Employees required to start work within 10 hours of finishing their previous
    // shift are entitled to double time until a 10-hour break is given. This
    // "consecutive shift" rule is not automatically calculated by this tool but
    // is shown as information.

    const breaks = [
      {
        employment_type: null,
        shift_hours_min: 4.0, shift_hours_max: null,
        break_type: 'rest', break_duration_min: 10, is_paid: true,
        timing_rule: 'Once in each 4-hour period of work',
        description: 'You are entitled to a paid 10-minute rest break in each 4-hour work period.',
      },
      {
        employment_type: null,
        shift_hours_min: 5.0, shift_hours_max: null,
        break_type: 'meal', break_duration_min: 30, is_paid: false,
        timing_rule: 'No later than 5 hours after commencing work',
        description: 'If you work more than 5 hours, you must get an unpaid meal break of at least 30 minutes. If you are not given a break, you are paid at double time until one is provided.',
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
    console.log(`✓ Inserted ${breaks.length} break entitlement rules`);

    // ── Classification questions ───────────────────────────────────────────────
    // Two-level question flow:
    //   1. sw_grade — what grade are you? (G1, G2, G3, G4)
    //   2. sw_grade1_duration — how long at Grade 1? (shown only if G1)

    const questions = [
      {
        award_code: AWARD_CODE,
        question_key: 'sw_grade',
        question_text: 'Which grade best describes your role?',
        help_text: 'Your grade is based on the complexity of your duties, your level of experience, and whether you hold any supervisory responsibilities. If you are unsure, check your employment contract or payslip.',
        question_type: 'single',
        stream: null,
        parent_question_key: null,
        parent_answer_key: null,
        sort_order: 1,
        answers: [
          { answer_key: 'grade1', answer_text: 'Grade 1 — entry-level storeworker or wholesale employee (receiving, picking, packing, loading under supervision)', sort_order: 1 },
          { answer_key: 'grade2', answer_text: 'Grade 2 — experienced operator, may drive forklift, process orders independently, basic supervision of others', sort_order: 2 },
          { answer_key: 'grade3', answer_text: 'Grade 3 — senior storeworker with significant experience, supervises others, or applies trade skills', sort_order: 3 },
          { answer_key: 'grade4', answer_text: 'Grade 4 — most senior classification, full section/team responsibility, complex systems or specialist functions', sort_order: 4 },
        ],
      },
      {
        award_code: AWARD_CODE,
        question_key: 'sw_grade1_duration',
        question_text: 'How long have you been employed in this role?',
        help_text: 'Grade 1 has three pay levels based on length of employment. The rate increases after 3 months and again after 12 months.',
        question_type: 'single',
        stream: null,
        parent_question_key: 'sw_grade',
        parent_answer_key: 'grade1',
        sort_order: 2,
        answers: [
          { answer_key: 'commencement', answer_text: 'Less than 3 months (just started)', sort_order: 1 },
          { answer_key: 'after_3_months', answer_text: 'At least 3 months but less than 12 months', sort_order: 2 },
          { answer_key: 'after_12_months', answer_text: '12 months or more', sort_order: 3 },
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
        q.award_code, q.question_key, q.question_text, q.help_text,
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
    console.log(`✓ Inserted ${questions.length} classification questions`);

    await client.query('COMMIT');
    console.log('\n✅ MA000084 seed complete');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Seed failed:', err);
    throw err;
  } finally {
    client.release();
    await pool.end();
  }
}

seed().catch(() => process.exit(1));
