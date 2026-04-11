/**
 * Seed script — Funeral Industry Award 2020 [MA000105]
 * Pay rates effective 7 November 2025
 * Source: Fair Work Ombudsman pay guide MA000105
 *
 * Classification structure (single stream 'funeral', 6 grades):
 *   Grade 1: $24.28/hr — Entry-level. General duties.
 *   Grade 2: $24.95/hr — Basic trade or experience.
 *   Grade 3: $25.85/hr — Competent funeral worker.
 *   Grade 4: $26.70/hr — Experienced.
 *   Grade 5: $28.12/hr — Senior.
 *   Grade 6: $29.00/hr — Most senior.
 *
 * Casual rate = FT rate × 1.25 (25% loading).
 *   G1=$30.35  G2=$31.19  G3=$32.31  G4=$33.38  G5=$35.15  G6=$36.25
 *
 * Penalty rates (FT/PT):
 *   Weekday ordinary:             ×1.00
 *   Afternoon shift Mon–Fri:      ×1.20
 *   Saturday (first 3 hours):     ×1.50
 *   Saturday (after 3 hours):     ×2.00
 *   Sunday:                       ×2.00
 *   Public holiday:               ×2.00
 *
 * Penalty rates (Casual, applied to casual base):
 *   Weekday ordinary:             ×1.00
 *   Afternoon shift Mon–Fri:      ×1.16
 *   Saturday:                     ×1.40
 *   Sunday:                       ×1.80
 *   Public holiday:               ×1.80
 *
 * Overtime (FT/PT — not shiftworkers):
 *   First 3 hours:  ×1.50
 *   After 3 hours:  ×2.00
 *
 * Overtime (Casual, applied to casual base):
 *   First 3 hours:  ×1.40
 *   After 3 hours:  ×1.80
 *
 * No junior rates.
 *
 * Minimum engagement: 2 hours (casual)
 *
 * Run after migrate.js: node scripts/seed_ma000105.js
 */
require('dotenv').config();
const pool = require('../src/db/pool');

const AWARD_CODE = 'MA000105';
const EFFECTIVE_DATE = '2025-11-07';

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
      'Funeral Industry Award 2020',
      EFFECTIVE_DATE,
      'https://awards.fairwork.gov.au/MA000105.html',
    ]);

    // ── Classifications ────────────────────────────────────────────────────────
    // MA000105 has one stream ('funeral') with 6 grades.
    const classifications = [
      {
        level: 1, stream: 'funeral',
        title: 'Funeral Industry Employee Grade 1',
        description: 'Entry-level. General duties — cleaning, vehicle washing, grounds maintenance. Assisting with funerals.',
        duties: [
          'Cleaning funeral premises, chapels, and vehicles',
          'Washing and maintaining funeral vehicles',
          'Grounds maintenance around funeral home',
          'Assisting with setting up for funerals and viewings',
          'General labouring duties as directed',
          'Performing basic tasks under close supervision',
        ],
        indicative_tasks: ['General hand', 'Cleaner', 'Grounds person', 'Funeral assistant (entry)'],
        sort_order: 10,
      },
      {
        level: 2, stream: 'funeral',
        title: 'Funeral Industry Employee Grade 2',
        description: 'Basic trade or experience. Assists with embalming, coffin handling, mortuary duties, flower arranging.',
        duties: [
          'Assisting with embalming procedures under supervision',
          'Handling and preparing coffins and caskets',
          'Performing basic mortuary duties',
          'Arranging flowers and floral tributes',
          'Assisting with transfers and removals',
          'Operating under general supervision with developing skills',
        ],
        indicative_tasks: ['Mortuary assistant', 'Coffin handler', 'Floral arranger', 'Transfer assistant'],
        sort_order: 20,
      },
      {
        level: 3, stream: 'funeral',
        title: 'Funeral Industry Employee Grade 3',
        description: 'Competent funeral worker. Conducts viewings, drives hearse/funeral vehicle, arranges floral tributes.',
        duties: [
          'Conducting viewings and visitations',
          'Driving hearse and other funeral vehicles',
          'Arranging and presenting floral tributes',
          'Assisting with funeral service coordination',
          'Performing competent mortuary duties',
          'Working with limited supervision on established tasks',
        ],
        indicative_tasks: ['Hearse driver', 'Viewing attendant', 'Competent funeral worker', 'Floral tribute specialist'],
        sort_order: 30,
      },
      {
        level: 4, stream: 'funeral',
        title: 'Funeral Industry Employee Grade 4',
        description: 'Experienced. Conducts funerals, oversees arrangements, embalming assistant, experienced driver.',
        duties: [
          'Conducting funeral services and ceremonies',
          'Overseeing funeral arrangements and coordination',
          'Assisting with embalming at an advanced level',
          'Experienced driving of all funeral vehicles',
          'Liaising with families on arrangements',
          'Exercising significant skill and judgment in funeral operations',
        ],
        indicative_tasks: ['Funeral conductor', 'Senior hearse driver', 'Arrangements coordinator', 'Embalming assistant (advanced)'],
        sort_order: 40,
      },
      {
        level: 5, stream: 'funeral',
        title: 'Funeral Industry Employee Grade 5',
        description: 'Senior. Funeral director duties, embalmer, senior arranger. Substantial experience and qualifications.',
        duties: [
          'Performing funeral director duties',
          'Conducting embalming independently',
          'Senior funeral arrangement and planning',
          'Managing complex funeral services',
          'Supervising and training lower-level employees',
          'Applying substantial industry experience and formal qualifications',
        ],
        indicative_tasks: ['Funeral director', 'Embalmer', 'Senior arranger', 'Senior funeral coordinator'],
        sort_order: 50,
      },
      {
        level: 6, stream: 'funeral',
        title: 'Funeral Industry Employee Grade 6',
        description: 'Most senior. Manages funeral home, senior funeral director, supervises multiple staff.',
        duties: [
          'Managing funeral home operations',
          'Acting as senior funeral director',
          'Supervising multiple staff across operations',
          'Overseeing all funeral services and client relations',
          'Ensuring regulatory compliance and quality standards',
          'High-level responsibility for business operations and staff management',
        ],
        indicative_tasks: ['Funeral home manager', 'Senior funeral director', 'Operations manager', 'Branch supervisor'],
        sort_order: 60,
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
    // Source: FWO pay guide MA000105, effective 7 November 2025.
    // Casual rate = FT rate × 1.25.
    const baseRates = {
      1: 24.28,
      2: 24.95,
      3: 25.85,
      4: 26.70,
      5: 28.12,
      6: 29.00,
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
    // Source: MA000105 pay guide.
    //
    // FT/PT multipliers:
    //   Weekday ordinary:             ×1.00
    //   Afternoon shift Mon–Fri:      ×1.20
    //   Saturday (first 3 hours):     ×1.50
    //   Saturday (after 3 hours):     ×2.00 (modelled via Saturday OT threshold)
    //   Sunday:                       ×2.00
    //   Public holiday:               ×2.00
    //
    // Casual multipliers (applied to casual base = FT × 1.25):
    //   Weekday ordinary:             ×1.00
    //   Afternoon shift Mon–Fri:      ×1.16 of casual base
    //   Saturday:                     ×1.40 of casual base
    //   Sunday:                       ×1.80 of casual base
    //   Public holiday:               ×1.80 of casual base

    const penaltyRates = [
      // ── Full-time ────────────────────────────────────────────────────────────
      {
        employment_type: 'full_time', day_type: 'weekday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.0, addition_per_hour: null,
        description: 'Ordinary weekday rate (×1.0)',
      },
      {
        employment_type: 'full_time', day_type: 'weekday',
        time_band_start: '14:00', time_band_end: '00:00', time_band_label: 'Afternoon shift',
        multiplier: 1.20, addition_per_hour: null,
        description: 'Afternoon shift Mon–Fri — ×1.20',
      },
      {
        employment_type: 'full_time', day_type: 'saturday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.50, addition_per_hour: null,
        description: 'Saturday — first 3 hours at ×1.50 (after 3 hours, ×2.00 via OT threshold)',
      },
      {
        employment_type: 'full_time', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.0, addition_per_hour: null,
        description: 'Sunday — double time (×2.0)',
      },
      {
        employment_type: 'full_time', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.0, addition_per_hour: null,
        description: 'Public holiday — double time (×2.0)',
      },
      // ── Part-time (same as full-time) ────────────────────────────────────────
      {
        employment_type: 'part_time', day_type: 'weekday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.0, addition_per_hour: null,
        description: 'Ordinary weekday rate (×1.0)',
      },
      {
        employment_type: 'part_time', day_type: 'weekday',
        time_band_start: '14:00', time_band_end: '00:00', time_band_label: 'Afternoon shift',
        multiplier: 1.20, addition_per_hour: null,
        description: 'Afternoon shift Mon–Fri — ×1.20',
      },
      {
        employment_type: 'part_time', day_type: 'saturday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.50, addition_per_hour: null,
        description: 'Saturday — first 3 hours at ×1.50 (after 3 hours, ×2.00 via OT threshold)',
      },
      {
        employment_type: 'part_time', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.0, addition_per_hour: null,
        description: 'Sunday — double time (×2.0)',
      },
      {
        employment_type: 'part_time', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.0, addition_per_hour: null,
        description: 'Public holiday — double time (×2.0)',
      },
      // ── Casual ───────────────────────────────────────────────────────────────
      // Casual base rate already includes 25% loading.
      {
        employment_type: 'casual', day_type: 'weekday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.0, addition_per_hour: null,
        description: 'Ordinary casual weekday rate (includes 25% casual loading)',
      },
      {
        employment_type: 'casual', day_type: 'weekday',
        time_band_start: '14:00', time_band_end: '00:00', time_band_label: 'Afternoon shift',
        multiplier: 1.16, addition_per_hour: null,
        description: 'Casual afternoon shift Mon–Fri — ×1.16 of casual base',
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
        multiplier: 1.80, addition_per_hour: null,
        description: 'Casual public holiday — ×1.80 of casual base',
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
    // Source: MA000105 pay guide — overtime (not shiftworkers).
    //
    // FT/PT overtime:
    //   First 3 hours over 38/week: ×1.50
    //   After 41 hours/week:        ×2.00
    //
    // Saturday daily threshold: after 3 hours on Saturday, rate increases to ×2.00
    //   Modelled as daily threshold at 3h on Saturday triggering ×2.00
    //
    // Casual overtime (applied to casual base = FT × 1.25):
    //   First 3 hours:  ×1.40 of casual base ($42.49/$30.35 = 1.40)
    //   After 3 hours:  ×1.80 of casual base ($54.63/$30.35 = 1.80)

    const overtimeRates = [
      // FT/PT weekly
      { employment_type: 'full_time',  threshold_hours: 38, period: 'weekly', multiplier: 1.50, description: 'Weekly overtime — first 3 hours over 38 (×1.50)' },
      { employment_type: 'full_time',  threshold_hours: 41, period: 'weekly', multiplier: 2.00, description: 'Weekly overtime — after 41 hours (×2.00)' },
      { employment_type: 'part_time',  threshold_hours: 38, period: 'weekly', multiplier: 1.50, description: 'Part-time weekly overtime — first 3 hours over 38 (×1.50)' },
      { employment_type: 'part_time',  threshold_hours: 41, period: 'weekly', multiplier: 2.00, description: 'Part-time weekly overtime — after 41 hours (×2.00)' },
      // Casual weekly (×1.40 / ×1.80 of casual base)
      { employment_type: 'casual', threshold_hours: 38, period: 'weekly', multiplier: 1.40, description: 'Casual weekly overtime — first 3 hrs over 38 (×1.40 of casual base)' },
      { employment_type: 'casual', threshold_hours: 41, period: 'weekly', multiplier: 1.80, description: 'Casual weekly overtime — after 41 hrs (×1.80 of casual base)' },
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
    // Source: MA000105 pay guide, effective 7 November 2025.
    // None of these are all-purpose allowances.
    const allowances = [
      {
        allowance_type: 'exhumation',
        name: 'Exhumation allowance',
        description: 'If you are required to perform an exhumation, you receive $114.32 per body exhumed.',
        trigger_condition: 'Required to perform an exhumation',
        amount: 114.32, amount_type: 'fixed', per_unit: 'per_body',
        is_all_purpose: false,
      },
      {
        allowance_type: 'leading_hand_3to10',
        name: 'Leading hand allowance — in charge of 3 to 10 employees',
        description: 'If you are directed to be in charge of 3 to 10 employees, you receive $42.74 per week.',
        trigger_condition: 'Directed by employer to be in charge of 3 to 10 employees',
        amount: 42.74, amount_type: 'fixed', per_unit: 'per_week',
        is_all_purpose: false,
      },
      {
        allowance_type: 'leading_hand_11to19',
        name: 'Leading hand allowance — in charge of 11 to 19 employees',
        description: 'If you are directed to be in charge of 11 to 19 employees, you receive $64.10 per week.',
        trigger_condition: 'Directed by employer to be in charge of 11 to 19 employees',
        amount: 64.10, amount_type: 'fixed', per_unit: 'per_week',
        is_all_purpose: false,
      },
      {
        allowance_type: 'meal',
        name: 'Meal allowance',
        description: 'If you are required to work overtime and a meal break is taken during overtime, you are entitled to a meal allowance of $16.62 per meal.',
        trigger_condition: 'Overtime worked — one meal allowance per meal period during overtime',
        amount: 16.62, amount_type: 'fixed', per_unit: 'per_meal',
        is_all_purpose: false,
      },
      {
        allowance_type: 'standby_weekday',
        name: 'Stand-by allowance — Monday to Friday',
        description: 'If you are required to be on stand-by during Monday to Friday, you receive $16.03 per stand-by period.',
        trigger_condition: 'Required to be on stand-by Monday to Friday',
        amount: 16.03, amount_type: 'fixed', per_unit: 'per_period',
        is_all_purpose: false,
      },
      {
        allowance_type: 'standby_weekend_ph',
        name: 'Stand-by allowance — Saturday, Sunday or public holiday',
        description: 'If you are required to be on stand-by during Saturday, Sunday, or a public holiday, you receive $34.19 per stand-by period.',
        trigger_condition: 'Required to be on stand-by Saturday, Sunday, or public holiday',
        amount: 34.19, amount_type: 'fixed', per_unit: 'per_period',
        is_all_purpose: false,
      },
      {
        allowance_type: 'tool',
        name: 'Tool allowance',
        description: 'If you are required to provide and use your own tools, you receive $6.06 per week.',
        trigger_condition: 'Required to provide and use own tools',
        amount: 6.06, amount_type: 'fixed', per_unit: 'per_week',
        is_all_purpose: false,
      },
      {
        allowance_type: 'vehicle',
        name: 'Vehicle allowance',
        description: 'If you are required to use your own motor vehicle for work purposes, you receive $0.99 per kilometre.',
        trigger_condition: 'Required to use own motor vehicle for work',
        amount: 0.99, amount_type: 'fixed', per_unit: 'per_km',
        is_all_purpose: false,
      },
      {
        allowance_type: 'uniform',
        name: 'Uniform reimbursement',
        description: 'If your employer requires you to wear a uniform and does not provide it, you are entitled to reimbursement of the cost.',
        trigger_condition: 'Employer requires uniform but does not provide it',
        amount: null, amount_type: 'reimbursement', per_unit: null,
        is_all_purpose: false,
      },
      {
        allowance_type: 'laundry',
        name: 'Laundry reimbursement',
        description: 'If your employer requires you to launder your own uniform, you are entitled to reimbursement of reasonable laundering costs.',
        trigger_condition: 'Employer requires employee to launder own uniform',
        amount: null, amount_type: 'reimbursement', per_unit: null,
        is_all_purpose: false,
      },
      {
        allowance_type: 'vaccination',
        name: 'Vaccination reimbursement',
        description: 'If your employer requires you to be vaccinated for workplace health and safety purposes, you are entitled to reimbursement of the cost.',
        trigger_condition: 'Employer requires vaccination for work',
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
    // Meal break: Unpaid 30 minutes after 5 hours of work.
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
    //   1. funeral_experience — how much experience do you have?
    //   2. funeral_grade — what grade best describes your role? (conditional on experienced)
    const questions = [
      {
        award_code: AWARD_CODE,
        question_key: 'funeral_experience',
        question_text: 'How much funeral industry experience do you have?',
        help_text: 'Grade 1 applies to workers new to the industry performing basic duties such as cleaning, vehicle washing, and assisting with funerals. If you have experience or perform skilled funeral duties, you are likely Grade 2 or above.',
        question_type: 'single',
        stream: null,
        parent_question_key: null,
        parent_answer_key: null,
        sort_order: 1,
        answers: [
          { answer_key: 'entry', answer_text: 'New to the industry — basic duties, cleaning, assisting', sort_order: 1 },
          { answer_key: 'experienced', answer_text: 'Experienced — I perform skilled funeral duties', sort_order: 2 },
        ],
      },
      {
        award_code: AWARD_CODE,
        question_key: 'funeral_grade',
        question_text: 'Which grade best describes your role?',
        help_text: 'Choose the option that best matches your current duties and level of responsibility in the funeral industry.',
        question_type: 'single',
        stream: null,
        parent_question_key: 'funeral_experience',
        parent_answer_key: 'experienced',
        sort_order: 2,
        answers: [
          { answer_key: 'grade2', answer_text: 'Grade 2 — Assists with embalming, coffin handling, mortuary duties', sort_order: 1 },
          { answer_key: 'grade3', answer_text: 'Grade 3 — Conducts viewings, drives hearse, arranges tributes', sort_order: 2 },
          { answer_key: 'grade4', answer_text: 'Grade 4 — Conducts funerals, oversees arrangements', sort_order: 3 },
          { answer_key: 'grade5', answer_text: 'Grade 5 — Funeral director, embalmer, senior arranger', sort_order: 4 },
          { answer_key: 'grade6', answer_text: 'Grade 6 — Funeral home manager, senior funeral director', sort_order: 5 },
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
    console.log('\n✅ MA000105 seed complete');
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
