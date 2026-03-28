/**
 * Seed script — Water Industry Award 2020 [MA000113]
 * Pay rates effective 1 July 2025
 * Source: FWC MAPD API + FWO pay guide MA000113
 *
 * One stream:
 *   water — Levels 1–10 (10 classifications)
 *
 * Adult FT/PT hourly rates (from API, base_rate_type = Hourly):
 *   L1: $25.88   L2: $26.70   L3: $27.71   L4: $28.12   L5: $29.88
 *   L6: $32.34   L7: $32.90   L8: ~$35.55   L9: ~$38.03   L10: $41.56
 *
 * Casual rates = FT rate × 1.25
 *
 * Penalty rates:
 *   Saturday: ×1.50 (FT/PT), ×1.50 (casual)
 *   Sunday: ×2.00 (FT/PT), ×2.00 (casual)
 *   Public holiday: ×2.50 (FT/PT), ×2.50 (casual)
 *
 * Overtime (daily threshold 7.6 hrs):
 *   First 2 OT hours: ×1.50, after 2 OT hours: ×2.00
 *
 * Junior rates: <16=36.8%, 16=47.3%, 17=57.8%, 18=68.3%, 19=82.5%, 20=97.7%, 21+=100%
 *
 * Allowances:
 *   Meal (OT >2hr): $23.60, Meal (further 4hr): $14.98,
 *   Tool: $22.25/wk, Vehicle car: $0.99/km, Motorcycle: $0.33/km
 *
 * Run after migrate.js: node scripts/seed_ma000113.js
 */
require('dotenv').config();
const pool = require('../src/db/pool');

const AWARD_CODE = 'MA000113';
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
      'Water Industry Award 2020',
      EFFECTIVE_DATE,
      'https://awards.fairwork.gov.au/MA000113.html',
    ]);

    // ── Classifications ────────────────────────────────────────────────────────
    const classifications = [
      {
        level: 1, stream: 'water',
        fwc_id: 4404,
        title: 'Water Industry Level 1',
        description: 'Entry-level water industry employee. You perform routine tasks under direct supervision, including basic maintenance and monitoring duties.',
        duties: [
          'Performing basic maintenance tasks on water infrastructure',
          'Monitoring meters, gauges, and equipment readings',
          'Assisting with water sampling and basic testing',
          'Performing general labouring duties at water treatment and pumping facilities',
        ],
        indicative_tasks: ['Water services assistant', 'Labourer', 'Meter reader'],
        sort_order: 10,
      },
      {
        level: 2, stream: 'water',
        fwc_id: 4405,
        title: 'Water Industry Level 2',
        description: 'Water industry employee with some experience. You perform a range of operational tasks with limited supervision.',
        duties: [
          'Operating water treatment and distribution equipment under direction',
          'Performing routine maintenance on pumps, valves, and pipework',
          'Collecting water samples and conducting basic quality tests',
          'Maintaining records and completing work order documentation',
        ],
        indicative_tasks: ['Water operator (entry)', 'Maintenance worker', 'Field services officer'],
        sort_order: 20,
      },
      {
        level: 3, stream: 'water',
        fwc_id: 4406,
        title: 'Water Industry Level 3',
        description: 'Experienced water industry employee. You work with a degree of autonomy on a range of operational and maintenance tasks.',
        duties: [
          'Operating and monitoring water and wastewater treatment processes',
          'Performing fault diagnosis on pumping and treatment equipment',
          'Conducting water quality testing and interpreting results',
          'Training and guiding less experienced employees',
        ],
        indicative_tasks: ['Water treatment operator', 'Maintenance technician', 'Network operator'],
        sort_order: 30,
      },
      {
        level: 4, stream: 'water',
        fwc_id: 4407,
        title: 'Water Industry Level 4',
        description: 'Skilled water industry employee with trade qualifications or equivalent experience. You perform complex operational or maintenance work.',
        duties: [
          'Performing complex repairs and maintenance on treatment and distribution systems',
          'Operating advanced monitoring and control systems (SCADA)',
          'Managing compliance sampling programs and quality reporting',
          'Coordinating work teams for maintenance and construction activities',
        ],
        indicative_tasks: ['Senior water operator', 'Tradesperson (water)', 'SCADA operator'],
        sort_order: 40,
      },
      {
        level: 5, stream: 'water',
        fwc_id: 4408,
        title: 'Water Industry Level 5',
        description: 'Senior water industry employee. You supervise teams and manage specific operational areas within the water utility.',
        duties: [
          'Supervising operational teams and allocating work',
          'Managing maintenance programs for a section of the water network',
          'Ensuring compliance with environmental and health regulations',
          'Preparing operational reports and contributing to planning',
        ],
        indicative_tasks: ['Team leader', 'Operations supervisor', 'Senior tradesperson'],
        sort_order: 50,
      },
      {
        level: 6, stream: 'water',
        fwc_id: 4409,
        title: 'Water Industry Level 6',
        description: 'Senior specialist or supervisor. You have advanced qualifications and manage complex operations or specialist technical functions.',
        duties: [
          'Managing water or wastewater treatment plant operations',
          'Overseeing capital works and major maintenance projects',
          'Developing and implementing operational procedures and standards',
          'Managing budgets and resources for operational areas',
        ],
        indicative_tasks: ['Plant manager', 'Network manager', 'Senior supervisor'],
        sort_order: 60,
      },
      {
        level: 7, stream: 'water',
        fwc_id: 4410,
        title: 'Water Industry Level 7',
        description: 'Advanced specialist with significant expertise and responsibility. You manage major operational functions and provide expert technical advice.',
        duties: [
          'Managing multiple operational sites or a large treatment facility',
          'Providing expert technical advice on water quality and treatment processes',
          'Leading strategic planning for infrastructure and service delivery',
          'Managing staff across multiple teams and functions',
        ],
        indicative_tasks: ['Operations manager', 'Senior plant manager', 'Technical specialist'],
        sort_order: 70,
      },
      {
        level: 8, stream: 'water',
        fwc_id: null,
        title: 'Water Industry Level 8',
        description: 'Senior management classification. You have extensive experience and qualifications and are responsible for major strategic and operational functions.',
        duties: [
          'Directing operations across a region or major functional area',
          'Setting strategic priorities for service delivery and infrastructure investment',
          'Managing large teams and significant budgets',
          'Representing the organisation to regulators and industry bodies',
        ],
        indicative_tasks: ['Regional operations manager', 'Senior technical manager'],
        sort_order: 80,
      },
      {
        level: 9, stream: 'water',
        fwc_id: null,
        title: 'Water Industry Level 9',
        description: 'Executive-level classification. You lead major divisions and contribute to organisational strategy and governance.',
        duties: [
          'Leading a major division such as operations, engineering, or customer services',
          'Contributing to executive decision-making and organisational strategy',
          'Managing complex stakeholder relationships with government and regulators',
          'Overseeing organisational compliance and risk management',
        ],
        indicative_tasks: ['Division manager', 'General manager (operations)', 'Chief engineer'],
        sort_order: 90,
      },
      {
        level: 10, stream: 'water',
        fwc_id: 4413,
        title: 'Water Industry Level 10',
        description: 'The most senior classification. You hold the highest level of responsibility for technical, operational, or strategic functions within the organisation.',
        duties: [
          'Setting organisational direction for all operational and technical functions',
          'Managing executive-level relationships with government, regulators, and industry',
          'Leading organisational transformation and major capital programs',
          'Ensuring organisational compliance with all legislative and regulatory requirements',
        ],
        indicative_tasks: ['Executive director', 'Chief operations officer', 'Senior general manager'],
        sort_order: 100,
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
        INSERT INTO classifications (award_code, level, stream, title, description, duties, indicative_tasks, sort_order, fwc_classification_fixed_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        ON CONFLICT (award_code, level, stream) DO UPDATE SET
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
    // Source: FWC MAPD API for L1–L7 and L10. L8 and L9 interpolated.
    // Casual rate = FT rate × 1.25.
    const baseRates = {
      water: { 1: 25.88, 2: 26.70, 3: 27.71, 4: 28.12, 5: 29.88, 6: 32.34, 7: 32.90, 8: 35.55, 9: 38.03, 10: 41.56 },
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
      { employment_type: 'casual',     day_type: 'saturday',       multiplier: 1.50, description: 'Saturday — casual ×1.50 (incl. loading)' },
      { employment_type: 'casual',     day_type: 'sunday',         multiplier: 2.00, description: 'Sunday — casual ×2.00 (incl. loading)' },
      { employment_type: 'casual',     day_type: 'public_holiday', multiplier: 2.50, description: 'Casual public holiday — ×2.50 (incl. loading)' },
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
        name: 'Meal allowance (overtime >2 hours)',
        description: 'If you work overtime for more than 2 hours and your employer did not give you notice the day before, you are entitled to a meal allowance of $23.60.',
        trigger_condition: 'Overtime of more than 2 hours without notice',
        amount: 23.60, amount_type: 'fixed', per_unit: 'per_meal',
        is_all_purpose: false,
      },
      {
        allowance_type: 'meal_subsequent',
        name: 'Meal allowance (each further 4 hours OT)',
        description: 'If you continue to work overtime for each further 4 hours after the initial 2 hours, you are entitled to an additional meal allowance of $14.98.',
        trigger_condition: 'Each further 4 hours of overtime beyond initial 2 hours',
        amount: 14.98, amount_type: 'fixed', per_unit: 'per_meal',
        is_all_purpose: false,
      },
      {
        allowance_type: 'tool',
        name: 'Tool allowance',
        description: 'If you are a tradesperson required to supply and maintain your own tools, you are entitled to a tool allowance of $22.25 per week.',
        trigger_condition: 'Tradesperson required to supply own tools',
        amount: 22.25, amount_type: 'fixed', per_unit: 'per_week',
        is_all_purpose: false,
      },
      {
        allowance_type: 'vehicle',
        name: 'Vehicle allowance (car)',
        description: 'If you are required to use your own car for work purposes, you are entitled to $0.99 per kilometre.',
        trigger_condition: 'Employee required to use own car for work',
        amount: 0.99, amount_type: 'per_km', per_unit: 'per_km',
        is_all_purpose: false,
      },
      {
        allowance_type: 'motorcycle',
        name: 'Vehicle allowance (motorcycle)',
        description: 'If you are required to use your own motorcycle for work purposes, you are entitled to $0.33 per kilometre.',
        trigger_condition: 'Employee required to use own motorcycle for work',
        amount: 0.33, amount_type: 'per_km', per_unit: 'per_km',
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
        timing_rule: 'No earlier than 1 hour and no later than 6 hours after starting work',
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
    // Single-branch question flow:
    //   Q1: water_level — level 1 through 10
    const questions = [
      {
        question_key: 'water_level',
        question_text: 'What is your water industry classification level?',
        help_text: 'Your level depends on your experience, qualifications, and the complexity of your duties. Level 1 is entry-level labouring and monitoring. Higher levels involve operating treatment plants, supervising teams, managing facilities, and strategic leadership.',
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
      { question_key: 'water_level', answer_key: 'l1',  answer_text: 'Level 1 — Entry-level (labourer, meter reader, water services assistant)', sort_order: 1 },
      { question_key: 'water_level', answer_key: 'l2',  answer_text: 'Level 2 — Some experience (water operator, maintenance worker, field services)', sort_order: 2 },
      { question_key: 'water_level', answer_key: 'l3',  answer_text: 'Level 3 — Experienced (treatment operator, maintenance technician, network operator)', sort_order: 3 },
      { question_key: 'water_level', answer_key: 'l4',  answer_text: 'Level 4 — Skilled/trade (senior operator, tradesperson, SCADA operator)', sort_order: 4 },
      { question_key: 'water_level', answer_key: 'l5',  answer_text: 'Level 5 — Team leader, operations supervisor', sort_order: 5 },
      { question_key: 'water_level', answer_key: 'l6',  answer_text: 'Level 6 — Plant manager, network manager, senior supervisor', sort_order: 6 },
      { question_key: 'water_level', answer_key: 'l7',  answer_text: 'Level 7 — Operations manager, senior plant manager, technical specialist', sort_order: 7 },
      { question_key: 'water_level', answer_key: 'l8',  answer_text: 'Level 8 — Regional operations manager, senior technical manager', sort_order: 8 },
      { question_key: 'water_level', answer_key: 'l9',  answer_text: 'Level 9 — Division manager, general manager, chief engineer', sort_order: 9 },
      { question_key: 'water_level', answer_key: 'l10', answer_text: 'Level 10 — Executive director, chief operations officer', sort_order: 10 },
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
