/**
 * Seed script — Gardening and Landscaping Services Award 2020 [MA000101]
 * Pay rates effective 1 July 2025
 * Source: Fair Work Ombudsman pay guide MA000101
 *
 * KEY — All-purpose allowances (marked * in pay guide):
 *   Leading hand 1–2 employees:   $0.56/hr
 *   Leading hand 3–6 employees:   $1.12/hr
 *   Leading hand 7–9 employees:   $1.41/hr
 *   Leading hand 10+ employees:   $1.97/hr
 *   Tool allowance (L4 & L5):     $0.42/hr
 *
 * These MUST be added to the base rate BEFORE casual loading, penalties,
 * and overtime are calculated. The calculator handles this automatically
 * when allPurposeAllowancesPerHour is passed to the calculate endpoint.
 *
 * Adult rates (FT/PT):
 *   Intro: $24.28  L1: $24.95  L2: $25.85  L3: $27.00  L4: $28.12  L5: $29.00
 * Casual rates (FT rate × 1.25):
 *   Intro: $30.35  L1: $31.19  L2: $32.31  L3: $33.75  L4: $35.15  L5: $36.25
 *
 * Penalty rates (FT/PT):
 *   Weekday ordinary:    ×1.00
 *   Saturday:            ×1.50 (all Saturday work is overtime — first 2hr rate)
 *   Sunday:              ×2.00 (all Sunday work is overtime — after 2hr rate)
 *   Public holiday:      ×2.50
 *
 * Penalty rates (casual, applied to casual base rate):
 *   Weekday ordinary:    ×1.00 of casual base
 *   Saturday:            ×1.40 of casual base
 *   Sunday:              ×1.80 of casual base
 *   Public holiday:      ×2.20 of casual base
 *
 * Overtime (FT/PT):
 *   First 2 hours: ×1.50
 *   After 2 hours: ×2.00
 *
 * Overtime (Casual, applied to casual base):
 *   First 2 hours: ×1.40 of casual base
 *   After 2 hours: ×1.80 of casual base
 *
 * Junior rates (adult multiplier):
 *   <18: 70%  18: 80%  19: 90%  20+: 100%
 *   Note: Trade qualified juniors must be paid adult rate
 *
 * Run after migrate.js: node scripts/seed_ma000101.js
 */
require('dotenv').config();
const pool = require('../src/db/pool');

const AWARD_CODE = 'MA000101';
const EFFECTIVE_DATE = '2025-07-01';

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
      'Gardening and Landscaping Services Award 2020',
      EFFECTIVE_DATE,
      'https://awards.fairwork.gov.au/MA000101.html',
    ]);

    // ── Classifications ────────────────────────────────────────────────────────
    // MA000101 has one stream ('landscaping') with 6 levels: Introductory (0) + Levels 1–5.
    // Levels reflect skills, experience, and qualifications in gardening and landscaping.
    const classifications = [
      {
        level: 0, stream: 'landscaping',
        title: 'Introductory Level',
        description: 'New to gardening/landscaping. Basic tasks under close supervision. First 3 months.',
        duties: [
          'Receiving on-the-job training and instruction from a supervisor',
          'Performing simple gardening tasks under close supervision',
          'Assisting with basic site preparation and clean-up',
          'Learning to use basic hand tools safely',
          'Following specific instructions at all times',
        ],
        indicative_tasks: ['New employee in training', 'Trainee gardener', 'General assistant'],
        sort_order: 0,
      },
      {
        level: 1, stream: 'landscaping',
        title: 'Gardening and Landscaping Employee Level 1',
        description: 'Entry-level. Basic gardening tasks — mowing, weeding, planting. Under general supervision.',
        duties: [
          'Mowing lawns and edging',
          'Weeding garden beds and planting under supervision',
          'Basic watering and irrigation tasks',
          'Loading and unloading materials and equipment',
          'Cleaning and tidying work areas and equipment',
          'Assisting higher-level workers with general tasks',
        ],
        indicative_tasks: ['Garden labourer', 'Mowing operator (entry)', 'General gardening hand'],
        sort_order: 10,
      },
      {
        level: 2, stream: 'landscaping',
        title: 'Gardening and Landscaping Employee Level 2',
        description: 'Experienced. Operates equipment, applies chemicals, reads plans. 12+ months experience or Cert II.',
        duties: [
          'Operating powered equipment (mowers, blowers, brush cutters)',
          'Applying chemicals (herbicides, pesticides) under supervision',
          'Reading and interpreting basic landscape plans',
          'Performing more complex planting and garden maintenance tasks',
          'Maintaining tools and basic equipment',
          'Assisting with landscape construction tasks',
        ],
        indicative_tasks: ['Experienced gardener', 'Equipment operator (general)', 'Chemical applicator (supervised)', 'Garden maintenance worker'],
        sort_order: 20,
      },
      {
        level: 3, stream: 'landscaping',
        title: 'Gardening and Landscaping Employee Level 3',
        description: 'Skilled. Independent work, equipment operation, landscape construction. Cert III or equivalent.',
        duties: [
          'Working independently on gardening and landscaping tasks',
          'Operating specialised equipment (excavators, skid steers)',
          'Performing landscape construction (retaining walls, paving, decking)',
          'Identifying and diagnosing plant diseases and pest problems',
          'Planning and implementing planting and maintenance programs',
          'Supervising and training Level 1 and Level 2 employees',
        ],
        indicative_tasks: ['Skilled landscaper', 'Landscape constructor', 'Senior gardener', 'Equipment specialist'],
        sort_order: 30,
      },
      {
        level: 4, stream: 'landscaping',
        title: 'Gardening and Landscaping Employee Level 4',
        description: 'Advanced/tradesperson. Manages projects, complex landscape work, may supervise. Trade qualified.',
        duties: [
          'Managing landscaping projects from start to finish',
          'Performing complex landscape construction and design work',
          'Supervising teams of workers on project sites',
          'Preparing quotes and project plans',
          'Operating and maintaining all equipment and machinery',
          'Training and mentoring lower-level employees',
        ],
        indicative_tasks: ['Tradesperson landscaper', 'Project leader', 'Senior landscape constructor', 'Leading hand'],
        sort_order: 40,
      },
      {
        level: 5, stream: 'landscaping',
        title: 'Gardening and Landscaping Employee Level 5',
        description: 'Senior/supervisor. Manages teams, complex planning, specialist knowledge. Cert IV or equivalent.',
        duties: [
          'Coordinating all operations across multiple projects or sites',
          'Managing and supervising teams of employees at various levels',
          'Planning and overseeing complex landscaping and construction programs',
          'Ensuring compliance with workplace safety and environmental regulations',
          'High-level technical expertise in horticulture, arboriculture, or landscape design',
          'Acting as site supervisor or foreperson with significant responsibility',
        ],
        indicative_tasks: ['Site supervisor', 'Foreperson', 'Senior landscaping specialist (Cert IV)', 'Operations coordinator'],
        sort_order: 50,
      },
    ];

    for (const c of classifications) {
      await client.query(`
        INSERT INTO classifications (award_code, level, stream, title, description, duties, indicative_tasks, sort_order)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        ON CONFLICT (award_code, level, stream) DO UPDATE SET
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
    // Source: FWO pay guide MA000101, effective 1 July 2025.
    // Casual rate = FT rate × 1.25.
    const baseRates = {
      0: 24.28,
      1: 24.95,
      2: 25.85,
      3: 27.00,
      4: 28.12,
      5: 29.00,
    };

    const classResult = await client.query(
      'SELECT id, level, stream FROM classifications WHERE award_code = $1',
      [AWARD_CODE]
    );

    for (const cls of classResult.rows) {
      const baseRate = baseRates[cls.level];
      if (baseRate === undefined) continue;

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
    // Source: MA000101 — Ordinary hours are Mon–Fri only.
    // No separate Saturday or Sunday penalty columns in pay guide.
    // Saturday/Sunday work is treated as overtime.
    //
    // FT/PT multipliers:
    //   Weekday ordinary:    ×1.00
    //   Saturday:            ×1.50 (all Saturday work is OT — first 2hr rate)
    //   Sunday:              ×2.00 (all Sunday work is OT — after 2hr rate / double time)
    //   Public holiday:      ×2.50
    //
    // Casual multipliers (applied to casual base rate = FT × 1.25):
    //   Weekday ordinary:    ×1.00 of casual base
    //   Saturday:            ×1.40 of casual base ($42.49/$30.35 for Intro)
    //   Sunday:              ×1.80 of casual base ($54.63/$30.35 for Intro)
    //   Public holiday:      ×2.20 of casual base ($66.77/$30.35 for Intro)

    const penaltyRates = [
      // ── Full-time ────────────────────────────────────────────────────────────
      {
        employment_type: 'full_time', day_type: 'weekday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.0, addition_per_hour: null,
        description: 'Ordinary weekday rate (×1.0)',
      },
      {
        employment_type: 'full_time', day_type: 'saturday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.50, addition_per_hour: null,
        description: 'Saturday — time and a half (×1.50); all Saturday work is overtime',
      },
      {
        employment_type: 'full_time', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.0, addition_per_hour: null,
        description: 'Sunday — double time (×2.00); all Sunday work is overtime',
      },
      {
        employment_type: 'full_time', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.50, addition_per_hour: null,
        description: 'Public holiday — double time and a half (×2.50)',
      },
      // ── Part-time (same as full-time) ────────────────────────────────────────
      {
        employment_type: 'part_time', day_type: 'weekday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.0, addition_per_hour: null,
        description: 'Ordinary weekday rate (×1.0)',
      },
      {
        employment_type: 'part_time', day_type: 'saturday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.50, addition_per_hour: null,
        description: 'Saturday — time and a half (×1.50); all Saturday work is overtime',
      },
      {
        employment_type: 'part_time', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.0, addition_per_hour: null,
        description: 'Sunday — double time (×2.00)',
      },
      {
        employment_type: 'part_time', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.50, addition_per_hour: null,
        description: 'Public holiday — double time and a half (×2.50)',
      },
      // ── Casual ───────────────────────────────────────────────────────────────
      // Casual base rate already includes 25% loading.
      // Saturday: ×1.40 of casual base ($42.49/$30.35 for Intro)
      // Sunday: ×1.80 of casual base ($54.63/$30.35 for Intro)
      // Public holiday: ×2.20 of casual base ($66.77/$30.35 for Intro)
      {
        employment_type: 'casual', day_type: 'weekday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.0, addition_per_hour: null,
        description: 'Ordinary casual weekday rate (includes 25% casual loading)',
      },
      {
        employment_type: 'casual', day_type: 'saturday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.40, addition_per_hour: null,
        description: 'Casual Saturday — ×1.40 of casual base',
      },
      {
        employment_type: 'casual', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.80, addition_per_hour: null,
        description: 'Casual Sunday — ×1.80 of casual base',
      },
      {
        employment_type: 'casual', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.20, addition_per_hour: null,
        description: 'Casual public holiday — ×2.20 of casual base',
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

    // ── Overtime rates ─────────────────────────────────────────────────────────
    // Source: MA000101 — Overtime.
    // Ordinary hours are Mon–Fri. Saturday and Sunday work is all overtime,
    // but modelled as penalty rates above.
    //
    // FT/PT overtime (weekly threshold):
    //   First 2 hours over 38/week: ×1.50
    //   After 40 hours/week:        ×2.00
    //
    // Casual overtime (applied to casual base = FT × 1.25):
    //   First 2 hours: ×1.40 of casual base
    //   After 2 hours: ×1.80 of casual base

    const overtimeRates = [
      // FT/PT weekly
      { employment_type: 'full_time',  threshold_hours: 38, period: 'weekly', multiplier: 1.50, description: 'Weekly overtime — first 2 hours over 38 (×1.50)' },
      { employment_type: 'full_time',  threshold_hours: 40, period: 'weekly', multiplier: 2.00, description: 'Weekly overtime — after 40 hours (×2.00)' },
      { employment_type: 'part_time',  threshold_hours: 38, period: 'weekly', multiplier: 1.50, description: 'Part-time weekly overtime — first 2 hours over 38 (×1.50)' },
      { employment_type: 'part_time',  threshold_hours: 40, period: 'weekly', multiplier: 2.00, description: 'Part-time weekly overtime — after 40 hours (×2.00)' },
      // Casual weekly
      { employment_type: 'casual', threshold_hours: 38, period: 'weekly', multiplier: 1.40, description: 'Casual weekly overtime — first 2 hours ×1.40 of casual base' },
      { employment_type: 'casual', threshold_hours: 40, period: 'weekly', multiplier: 1.80, description: 'Casual weekly overtime — after 2 hours ×1.80 of casual base' },
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
    // Source: MA000101 pay guide, effective 1 July 2025.
    // Allowances marked * are "all-purpose" — they must be added to the base rate
    // BEFORE casual loading, penalty rates, and overtime are calculated.
    const allowances = [
      // All-purpose allowances (is_all_purpose = true)
      {
        allowance_type: 'leading_hand_1to2',
        name: 'Leading hand allowance — in charge of 1 to 2 employees (all-purpose)',
        description: 'If you are directed by management to be in charge of 1 to 2 employees, you receive $0.56 per hour as an all-purpose allowance. Added to base rate before casual loading, penalty rates, and overtime.',
        trigger_condition: 'Directed by employer to be in charge of 1 to 2 employees',
        amount: 0.56, amount_type: 'per_hour', per_unit: 'per_hour',
        is_all_purpose: true,
      },
      {
        allowance_type: 'leading_hand_3to6',
        name: 'Leading hand allowance — in charge of 3 to 6 employees (all-purpose)',
        description: 'If you are directed by management to be in charge of 3 to 6 employees, you receive $1.12 per hour as an all-purpose allowance. Added to base rate before casual loading, penalty rates, and overtime.',
        trigger_condition: 'Directed by employer to be in charge of 3 to 6 employees',
        amount: 1.12, amount_type: 'per_hour', per_unit: 'per_hour',
        is_all_purpose: true,
      },
      {
        allowance_type: 'leading_hand_7to9',
        name: 'Leading hand allowance — in charge of 7 to 9 employees (all-purpose)',
        description: 'If you are directed by management to be in charge of 7 to 9 employees, you receive $1.41 per hour as an all-purpose allowance. Added to base rate before casual loading, penalty rates, and overtime.',
        trigger_condition: 'Directed by employer to be in charge of 7 to 9 employees',
        amount: 1.41, amount_type: 'per_hour', per_unit: 'per_hour',
        is_all_purpose: true,
      },
      {
        allowance_type: 'leading_hand_10plus',
        name: 'Leading hand allowance — in charge of 10+ employees (all-purpose)',
        description: 'If you are directed by management to be in charge of 10 or more employees, you receive $1.97 per hour as an all-purpose allowance. Added to base rate before casual loading, penalty rates, and overtime.',
        trigger_condition: 'Directed by employer to be in charge of 10 or more employees',
        amount: 1.97, amount_type: 'per_hour', per_unit: 'per_hour',
        is_all_purpose: true,
      },
      {
        allowance_type: 'tool_allowance',
        name: 'Tool allowance — Level 4 & Level 5 tradespersons (all-purpose)',
        description: 'If you are a Level 4 or Level 5 tradesperson required to supply and maintain your own tools, you receive $0.42 per hour as an all-purpose allowance. Added to base rate before casual loading, penalty rates, and overtime.',
        trigger_condition: 'Level 4 or Level 5 tradesperson supplying and maintaining own tools',
        amount: 0.42, amount_type: 'per_hour', per_unit: 'per_hour',
        is_all_purpose: true,
      },
      // Non-all-purpose allowances
      {
        allowance_type: 'first_aid',
        name: 'First aid allowance',
        description: 'If you hold a current first aid certificate and your employer has appointed you as the person responsible for first aid, you receive $21.37 per week.',
        trigger_condition: 'Appointed by employer as the responsible first aider, and holding a current first aid certificate',
        amount: 21.37, amount_type: 'fixed', per_unit: 'per_week',
        is_all_purpose: false,
      },
      {
        allowance_type: 'meal',
        name: 'Meal allowance',
        description: 'If you are required to work overtime and a meal break falls during overtime, you are entitled to a meal allowance of $18.84 per meal.',
        trigger_condition: 'Overtime worked — one meal allowance per meal period during overtime',
        amount: 18.84, amount_type: 'fixed', per_unit: 'per_meal',
        is_all_purpose: false,
      },
      {
        allowance_type: 'vehicle',
        name: 'Vehicle allowance',
        description: 'If you are required to use your own vehicle for work purposes, you receive $0.98 per kilometre.',
        trigger_condition: 'Required by employer to use own vehicle for work purposes',
        amount: 0.98, amount_type: 'fixed', per_unit: 'per_km',
        is_all_purpose: false,
      },
      {
        allowance_type: 'operating_vehicle_plant',
        name: 'Operating vehicle/plant allowance',
        description: 'If you are required to operate a vehicle or plant as part of your duties, you receive $6.41 per day.',
        trigger_condition: 'Required to operate a vehicle or plant as part of duties',
        amount: 6.41, amount_type: 'fixed', per_unit: 'per_day',
        is_all_purpose: false,
      },
      {
        allowance_type: 'clothing_equipment',
        name: 'Clothing and equipment reimbursement',
        description: 'If your employer requires you to wear or use specific clothing or equipment, you are entitled to reimbursement of the cost.',
        trigger_condition: 'Employer requires specific clothing or equipment',
        amount: null, amount_type: 'reimbursement', per_unit: null,
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
    console.log(`✓ Inserted ${allowances.length} allowances (${allowances.filter(a => a.is_all_purpose).length} all-purpose)`);

    // ── Break entitlements ─────────────────────────────────────────────────────
    // Rest break: Paid 10-minute rest break per 4 hours worked.
    // Meal break: Unpaid 30 minutes after no more than 5 hours of work.
    const breaks = [
      {
        employment_type: null,
        shift_hours_min: 4.0, shift_hours_max: null,
        break_type: 'rest', break_duration_min: 10, is_paid: true,
        timing_rule: 'One paid 10-minute rest break per 4 hours worked',
        description: 'You are entitled to a paid 10-minute rest break for each 4-hour block of work.',
      },
      {
        employment_type: null,
        shift_hours_min: 5.0, shift_hours_max: null,
        break_type: 'meal', break_duration_min: 30, is_paid: false,
        timing_rule: 'No later than 5 hours after commencing work',
        description: 'If you work more than 5 hours, you must receive an unpaid meal break of 30 minutes.',
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
    //   1. land_experience — how much gardening or landscaping experience do you have?
    //   2. land_role — what best describes your role? (conditional on skilled experience)
    //
    // Mapping:
    //   entry → level 0 (Introductory)
    //   basic → level 1
    //   skilled + level2 → level 2
    //   skilled + level3 → level 3
    //   skilled + level4 → level 4
    //   skilled + level5 → level 5
    const questions = [
      {
        award_code: AWARD_CODE,
        question_key: 'land_experience',
        question_text: 'How much gardening or landscaping experience do you have?',
        help_text: 'Introductory level applies to workers in their first 3 months. Level 1 covers basic gardening tasks under general supervision. If you have 12+ months experience or hold qualifications, you are likely Level 2 or above.',
        question_type: 'single',
        stream: null,
        parent_question_key: null,
        parent_answer_key: null,
        sort_order: 1,
        answers: [
          { answer_key: 'entry', answer_text: 'Less than 3 months — I\'m new to the industry', sort_order: 1 },
          { answer_key: 'basic', answer_text: '3+ months — basic skills, general tasks', sort_order: 2 },
          { answer_key: 'skilled', answer_text: '12+ months — skilled work, operate equipment, or hold qualifications', sort_order: 3 },
        ],
      },
      {
        award_code: AWARD_CODE,
        question_key: 'land_role',
        question_text: 'Which best describes your role and experience level?',
        help_text: 'Choose the option that best matches what you do. If you act as a leading hand or supervisor, select that option — a leading hand allowance will be asked about separately.',
        question_type: 'single',
        stream: null,
        parent_question_key: 'land_experience',
        parent_answer_key: 'skilled',
        sort_order: 2,
        answers: [
          { answer_key: 'level2', answer_text: 'Level 2 — Experienced, operates equipment, applies chemicals, Cert II', sort_order: 1 },
          { answer_key: 'level3', answer_text: 'Level 3 — Skilled, independent work, landscape construction, Cert III', sort_order: 2 },
          { answer_key: 'level4', answer_text: 'Level 4 — Tradesperson, manages projects, may supervise', sort_order: 3 },
          { answer_key: 'level5', answer_text: 'Level 5 — Senior supervisor, specialist, Cert IV or equivalent', sort_order: 4 },
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
    console.log('\n✅ MA000101 seed complete');
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
