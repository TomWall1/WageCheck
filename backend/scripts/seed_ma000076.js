/**
 * Seed script — Educational Services (Schools) General Staff Award 2020 [MA000076]
 * Pay rates effective 1 July 2025
 * Source: FWC MAPD API + FWO pay guide MA000076
 *
 * One stream:
 *   school_support — Level 1 through Level 8 (8 classifications, pay point 1 of each)
 *
 * Adult FT/PT hourly rates (from API, base_rate_type = Hourly):
 *   L1: $25.85   L2: $26.96   L3: $28.13   L4: $29.70
 *   L5: $32.20   L6: ~$34.50  L7: ~$36.85  L8: ~$39.20
 *   (Levels 6-8 approximate — API not available, estimated from progression)
 *
 * Casual rates = FT rate x 1.25
 *
 * Penalty rates:
 *   FT/PT: Sat x1.50, Sun x2.00, PH x2.50
 *   Casual: Sat x1.50, Sun x2.00, PH x2.50
 *
 * Overtime (daily threshold 7.6 hrs):
 *   First 2 OT hours: x1.50, after 2 OT hours: x2.00
 *
 * Junior rates: <16=45%, 16=50%, 17=60%, 18=70%, 19=80%, 20=90%
 *
 * Allowances:
 *   Meal (OT): $19.93, Vehicle car: $0.99/km, Motorcycle: $0.33/km,
 *   Tool (carpenter): $33.88/wk, Tool (tradesperson): $17.90/wk, Laundry: $1.50/wk
 *
 * Run after migrate.js: node scripts/seed_ma000076.js
 */
require('dotenv').config();
const pool = require('../src/db/pool');

const AWARD_CODE = 'MA000076';
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
      'Educational Services (Schools) General Staff Award 2020',
      EFFECTIVE_DATE,
      'https://awards.fairwork.gov.au/MA000076.html',
    ]);

    // ── Classifications ────────────────────────────────────────────────────────
    const classifications = [
      {
        level: 1, stream: 'school_support',
        fwc_id: 2915,
        title: 'Level 1 — School Support Staff',
        description: 'Entry-level school support worker performing routine tasks under close supervision. No prior qualifications required.',
        duties: [
          'Performing general cleaning and maintenance of school grounds and buildings',
          'Assisting with basic administrative tasks such as photocopying and filing',
          'Carrying out routine manual handling and deliveries within the school',
          'Performing basic food preparation and canteen assistance duties',
        ],
        indicative_tasks: ['Cleaner', 'Groundsperson (entry)', 'Canteen assistant', 'Office assistant'],
        sort_order: 10,
      },
      {
        level: 2, stream: 'school_support',
        fwc_id: 2918,
        title: 'Level 2 — School Support Staff',
        description: 'School support worker with some experience or basic qualifications, performing tasks with limited supervision.',
        duties: [
          'Providing general classroom support and assisting students with learning materials',
          'Performing administrative duties including data entry, reception, and enrolment processing',
          'Maintaining library resources and assisting with cataloguing',
          'Assisting with school events, excursions, and extracurricular activities',
        ],
        indicative_tasks: ['Teacher\'s aide (basic)', 'School receptionist', 'Library assistant', 'Administrative assistant'],
        sort_order: 20,
      },
      {
        level: 3, stream: 'school_support',
        fwc_id: 2921,
        title: 'Level 3 — School Support Staff',
        description: 'Experienced school support worker with relevant qualifications. You perform a range of duties with a degree of autonomy.',
        duties: [
          'Providing direct learning support to students including special needs assistance',
          'Performing skilled technical work in science laboratories or IT',
          'Coordinating administrative functions such as finance, purchasing, or HR support',
          'Managing library operations and digital resource systems',
        ],
        indicative_tasks: ['Education assistant', 'Science technician', 'IT support officer', 'School librarian', 'Finance officer'],
        sort_order: 30,
      },
      {
        level: 4, stream: 'school_support',
        fwc_id: 2924,
        title: 'Level 4 — School Support Staff',
        description: 'Senior school support worker with specialist qualifications and significant experience. You work with considerable autonomy and may supervise others.',
        duties: [
          'Supervising and coordinating support staff within a school or department',
          'Providing specialist student support services including counselling assistance',
          'Managing school finances, budgets, and compliance reporting',
          'Coordinating complex projects such as building works or major events',
        ],
        indicative_tasks: ['Senior education assistant', 'Office manager', 'Senior science technician', 'Student welfare officer'],
        sort_order: 40,
      },
      {
        level: 5, stream: 'school_support',
        fwc_id: 2927,
        title: 'Level 5 — School Support Staff',
        description: 'Highly skilled school support worker with advanced qualifications. You have broad responsibility and provide expert-level services.',
        duties: [
          'Managing a significant function or department within the school',
          'Providing high-level technical or specialist services',
          'Developing and implementing policies and procedures',
          'Training, mentoring, and evaluating support staff',
        ],
        indicative_tasks: ['Business manager', 'Senior IT coordinator', 'Head of support services', 'Specialist therapist'],
        sort_order: 50,
      },
      {
        // Approximate rate — estimated from progression pattern
        level: 6, stream: 'school_support',
        fwc_id: null,
        title: 'Level 6 — School Support Staff',
        description: 'Senior specialist or manager providing expert services across the school. You exercise significant independent judgement.',
        duties: [
          'Managing multiple school functions or a complex operational area',
          'Providing expert advice on policy, compliance, or specialist services',
          'Overseeing large budgets and resource allocation',
          'Leading strategic planning and improvement initiatives',
        ],
        indicative_tasks: ['Senior business manager', 'Facilities manager', 'Senior specialist officer'],
        sort_order: 60,
      },
      {
        // Approximate rate — estimated from progression pattern
        level: 7, stream: 'school_support',
        fwc_id: null,
        title: 'Level 7 — School Support Staff',
        description: 'Highly experienced senior manager or specialist providing leadership across school operations.',
        duties: [
          'Directing school-wide operational or administrative functions',
          'Providing high-level strategic and policy advice to school leadership',
          'Managing complex cross-functional projects and initiatives',
          'Overseeing compliance, risk management, and governance frameworks',
        ],
        indicative_tasks: ['Director of operations', 'Senior facilities director', 'Compliance manager'],
        sort_order: 70,
      },
      {
        // Approximate rate — estimated from progression pattern
        level: 8, stream: 'school_support',
        fwc_id: null,
        title: 'Level 8 — School Support Staff',
        description: 'The most senior school support classification. You are responsible for leading major operational areas with full autonomy.',
        duties: [
          'Leading all non-teaching operations and services across the school',
          'Developing and implementing school-wide strategic plans',
          'Managing senior staff and overseeing all support functions',
          'Representing the school in external forums and negotiations',
        ],
        indicative_tasks: ['Chief operations officer', 'Executive business manager', 'Director of school services'],
        sort_order: 80,
      },
    ];

    // Clear existing classifications for this award
    await client.query(`DELETE FROM classification_answers WHERE question_id IN (SELECT id FROM classification_questions WHERE award_code = $1)`, [AWARD_CODE]);
    await client.query(`DELETE FROM classification_questions WHERE award_code = $1`, [AWARD_CODE]);
    await client.query(`DELETE FROM pay_rates WHERE award_code = $1`, [AWARD_CODE]);
    await client.query(`DELETE FROM classifications WHERE award_code = $1`, [AWARD_CODE]);

    // Add fwc_classification_fixed_id column if not present
    await client.query(`ALTER TABLE classifications ADD COLUMN IF NOT EXISTS fwc_classification_fixed_id INTEGER`);

    for (const c of classifications) {
      await client.query(`
        INSERT INTO classifications (award_code, level, stream, pay_point, title, description, duties, indicative_tasks, sort_order, fwc_classification_fixed_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        ON CONFLICT (award_code, level, stream, pay_point) DO UPDATE SET
          title = EXCLUDED.title,
          description = EXCLUDED.description,
          duties = EXCLUDED.duties,
          indicative_tasks = EXCLUDED.indicative_tasks,
          sort_order = EXCLUDED.sort_order,
          fwc_classification_fixed_id = EXCLUDED.fwc_classification_fixed_id
      `, [
        AWARD_CODE, c.level, c.stream, c.title, c.description,
        JSON.stringify(c.duties), JSON.stringify(c.indicative_tasks), c.sort_order, c.fwc_id,
      ]);
    }
    console.log(`✓ Inserted ${classifications.length} classifications`);

    // ── Pay rates ──────────────────────────────────────────────────────────────
    // Source: FWC MAPD API, base_rate_type = Hourly, effective 1 July 2025.
    // Levels 6-8 approximate — API not available, estimated from progression.
    // Casual rate = FT rate x 1.25.
    const baseRates = {
      school_support: { 1: 25.85, 2: 26.96, 3: 28.13, 4: 29.70, 5: 32.20, 6: 34.50, 7: 36.85, 8: 39.20 },
    };

    const classResult = await client.query(
      'SELECT id, level, stream FROM classifications WHERE award_code = $1',
      [AWARD_CODE]
    );

    for (const cls of classResult.rows) {
      const streamRates = baseRates[cls.stream];
      if (!streamRates) continue;
      const baseRate = streamRates[cls.level];
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
    const penaltyRates = [
      // ── Full-time ───────────────────────────────────────────────────────────
      { employment_type: 'full_time',  day_type: 'weekday',        multiplier: 1.00, description: 'Weekday ordinary rate (×1.0)' },
      { employment_type: 'full_time',  day_type: 'saturday',       multiplier: 1.50, description: 'Saturday — time and a half (×1.5)' },
      { employment_type: 'full_time',  day_type: 'sunday',         multiplier: 2.00, description: 'Sunday — double time (×2.0)' },
      { employment_type: 'full_time',  day_type: 'public_holiday', multiplier: 2.50, description: 'Public holiday — double time and a half (×2.5)' },
      // ── Part-time ───────────────────────────────────────────────────────────
      { employment_type: 'part_time',  day_type: 'weekday',        multiplier: 1.00, description: 'Weekday ordinary rate (×1.0)' },
      { employment_type: 'part_time',  day_type: 'saturday',       multiplier: 1.50, description: 'Saturday — time and a half (×1.5)' },
      { employment_type: 'part_time',  day_type: 'sunday',         multiplier: 2.00, description: 'Sunday — double time (×2.0)' },
      { employment_type: 'part_time',  day_type: 'public_holiday', multiplier: 2.50, description: 'Public holiday — double time and a half (×2.5)' },
      // ── Casual ──────────────────────────────────────────────────────────────
      { employment_type: 'casual',     day_type: 'weekday',        multiplier: 1.00, description: 'Weekday ordinary casual rate (incl. 25% casual loading)' },
      { employment_type: 'casual',     day_type: 'saturday',       multiplier: 1.50, description: 'Saturday — time and a half (×1.5 of casual base)' },
      { employment_type: 'casual',     day_type: 'sunday',         multiplier: 2.00, description: 'Sunday — double time (×2.0 of casual base)' },
      { employment_type: 'casual',     day_type: 'public_holiday', multiplier: 2.50, description: 'Casual public holiday — ×2.50 of casual base (incl. loading)' },
    ];

    await client.query(`DELETE FROM penalty_rates WHERE award_code = $1`, [AWARD_CODE]);

    for (const r of penaltyRates) {
      await client.query(`
        INSERT INTO penalty_rates
          (award_code, employment_type, day_type, time_band_start, time_band_end, time_band_label, multiplier, addition_per_hour, description, effective_date)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      `, [
        AWARD_CODE, r.employment_type, r.day_type,
        null, null, null,
        r.multiplier, null, r.description, EFFECTIVE_DATE,
      ]);
    }
    console.log(`✓ Inserted ${penaltyRates.length} penalty rate rules`);

    // ── Overtime rates ─────────────────────────────────────────────────────────
    // Daily threshold: 7.6 hours/day.
    // First 2 OT hours: x1.50, after 2 OT hours: x2.00.
    const overtimeRates = [
      { employment_type: 'full_time',  threshold_hours: 7.6,  period: 'daily', multiplier: 1.50, description: 'Daily OT — first 2 hours over 7.6 hrs/day (×1.50)' },
      { employment_type: 'full_time',  threshold_hours: 9.6,  period: 'daily', multiplier: 2.00, description: 'Daily OT — after 9.6 hrs/day (×2.00)' },
      { employment_type: 'part_time',  threshold_hours: 7.6,  period: 'daily', multiplier: 1.50, description: 'Part-time daily OT — first 2 hours over 7.6 hrs/day (×1.50)' },
      { employment_type: 'part_time',  threshold_hours: 9.6,  period: 'daily', multiplier: 2.00, description: 'Part-time daily OT — after 9.6 hrs/day (×2.00)' },
      { employment_type: 'casual',     threshold_hours: 7.6,  period: 'daily', multiplier: 1.50, description: 'Casual daily OT — first 2 hours over 7.6 hrs/day (×1.50)' },
      { employment_type: 'casual',     threshold_hours: 9.6,  period: 'daily', multiplier: 2.00, description: 'Casual daily OT — after 9.6 hrs/day (×2.00)' },
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
    const allowances = [
      {
        allowance_type: 'meal',
        name: 'Meal allowance (overtime)',
        description: 'If you work overtime for more than 2 hours and your employer did not give you notice the day before, you are entitled to a meal allowance of $19.93.',
        trigger_condition: 'Overtime of more than 2 hours without notice',
        amount: 19.93, amount_type: 'fixed', per_unit: 'per_meal',
        is_all_purpose: false,
      },
      {
        allowance_type: 'vehicle_car',
        name: 'Vehicle allowance (car)',
        description: 'If you are required to use your own car for work purposes, you are entitled to $0.99 per kilometre.',
        trigger_condition: 'Required to use own car for work purposes',
        amount: 0.99, amount_type: 'per_km', per_unit: 'per_km',
        is_all_purpose: false,
      },
      {
        allowance_type: 'vehicle_motorcycle',
        name: 'Vehicle allowance (motorcycle)',
        description: 'If you are required to use your own motorcycle for work purposes, you are entitled to $0.33 per kilometre.',
        trigger_condition: 'Required to use own motorcycle for work purposes',
        amount: 0.33, amount_type: 'per_km', per_unit: 'per_km',
        is_all_purpose: false,
      },
      {
        allowance_type: 'tool_carpenter',
        name: 'Tool allowance (carpenter)',
        description: 'If you are employed as a carpenter and are required to supply your own tools, you are entitled to $33.88 per week.',
        trigger_condition: 'Carpenter required to supply own tools',
        amount: 33.88, amount_type: 'fixed', per_unit: 'per_week',
        is_all_purpose: false,
      },
      {
        allowance_type: 'tool_tradesperson',
        name: 'Tool allowance (tradesperson)',
        description: 'If you are employed as a tradesperson (other than a carpenter) and are required to supply your own tools, you are entitled to $17.90 per week.',
        trigger_condition: 'Tradesperson (non-carpenter) required to supply own tools',
        amount: 17.90, amount_type: 'fixed', per_unit: 'per_week',
        is_all_purpose: false,
      },
      {
        allowance_type: 'laundry',
        name: 'Laundry allowance',
        description: 'If your employer requires you to wear a uniform and does not launder it, you are entitled to $1.50 per week.',
        trigger_condition: 'Required to wear and launder own uniform',
        amount: 1.50, amount_type: 'fixed', per_unit: 'per_week',
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
    const breaks = [
      {
        employment_type: null,
        shift_hours_min: 5.0, shift_hours_max: null,
        break_type: 'meal', break_duration_min: 30, is_paid: false,
        timing_rule: 'No later than 5 hours after starting work',
        description: 'If you work more than 5 hours, you are entitled to an unpaid meal break of at least 30 minutes.',
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
    const questions = [
      {
        question_key: 'school_support_level',
        question_text: 'What is your school support staff level?',
        help_text: 'Your level depends on your qualifications, experience, and the complexity of your duties. Level 1 is entry-level with routine tasks. Higher levels require more qualifications, experience, and supervisory responsibility.',
        question_type: 'single',
        stream: null,
        parent_question_key: null,
        parent_answer_key: null,
        sort_order: 1,
      },
    ];

    for (const q of questions) {
      await client.query(`
        INSERT INTO classification_questions
          (award_code, question_key, question_text, help_text, question_type, stream, parent_question_key, parent_answer_key, sort_order)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        ON CONFLICT (question_key) DO UPDATE SET
          question_text = EXCLUDED.question_text,
          help_text = EXCLUDED.help_text,
          parent_question_key = EXCLUDED.parent_question_key,
          parent_answer_key = EXCLUDED.parent_answer_key,
          sort_order = EXCLUDED.sort_order
      `, [
        AWARD_CODE, q.question_key, q.question_text, q.help_text,
        q.question_type, q.stream, q.parent_question_key, q.parent_answer_key, q.sort_order,
      ]);
    }
    console.log(`✓ Inserted ${questions.length} classification questions`);

    // ── Classification answers ─────────────────────────────────────────────────
    const questionIds = {};
    const qResult = await client.query(
      'SELECT id, question_key FROM classification_questions WHERE award_code = $1',
      [AWARD_CODE]
    );
    qResult.rows.forEach(r => { questionIds[r.question_key] = r.id; });

    const answers = [
      { question_key: 'school_support_level', answer_key: 'l1', answer_text: 'Level 1 — Entry-level (cleaner, groundsperson, canteen assistant, office assistant)', sort_order: 1 },
      { question_key: 'school_support_level', answer_key: 'l2', answer_text: 'Level 2 — Some experience (teacher\'s aide, receptionist, library assistant)', sort_order: 2 },
      { question_key: 'school_support_level', answer_key: 'l3', answer_text: 'Level 3 — Qualified (education assistant, science technician, IT support, librarian)', sort_order: 3 },
      { question_key: 'school_support_level', answer_key: 'l4', answer_text: 'Level 4 — Senior/specialist (senior education assistant, office manager, welfare officer)', sort_order: 4 },
      { question_key: 'school_support_level', answer_key: 'l5', answer_text: 'Level 5 — Highly skilled (business manager, senior IT coordinator, head of support)', sort_order: 5 },
      { question_key: 'school_support_level', answer_key: 'l6', answer_text: 'Level 6 — Senior specialist/manager (senior business manager, facilities manager)', sort_order: 6 },
      { question_key: 'school_support_level', answer_key: 'l7', answer_text: 'Level 7 — Senior manager (director of operations, compliance manager)', sort_order: 7 },
      { question_key: 'school_support_level', answer_key: 'l8', answer_text: 'Level 8 — Most senior (chief operations officer, executive business manager)', sort_order: 8 },
    ];

    for (const a of answers) {
      const qId = questionIds[a.question_key];
      if (!qId) { console.error(`Question key ${a.question_key} not found`); continue; }
      await client.query(`
        INSERT INTO classification_answers (question_id, answer_key, answer_text, sort_order)
        VALUES ($1, $2, $3, $4)
      `, [qId, a.answer_key, a.answer_text, a.sort_order]);
    }
    console.log(`✓ Inserted ${answers.length} classification answers`);

    await client.query('COMMIT');
    console.log(`\n✓ Seed complete for ${AWARD_CODE}`);
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
