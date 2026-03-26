/**
 * Seed script — Poultry Processing Award 2020 [MA000074]
 * Pay rates effective 1 July 2025
 * Source: FWC MAPD API + FWO pay guide MA000074
 *
 * One stream:
 *   poultry — Level 1 through Level 6 (6 classifications)
 *
 * Adult FT/PT hourly rates (from API):
 *   L1: $25.06   L2: $25.73   L3: $26.07   L4: $26.41   L5: $26.74   L6: $27.43
 *
 * Casual rates = FT rate x 1.25
 *
 * Penalty rates:
 *   FT/PT: Sat x1.50, Sun x2.00, PH x2.50
 *   Casual: Sat x1.25, Sun x1.75, PH x2.25
 *
 * Overtime (daily threshold 7.6 hrs):
 *   First 2 OT hours: x1.50, after 2 OT hours: x2.00
 *
 * Junior rates: Under 16=45%, 16=50%, 17=60%, 18=70%, 19=80%, 20=90%
 *
 * Allowances:
 *   Meal (OT): $18.38, Vehicle: $0.98/km, First aid: $21.41/week,
 *   Cold work -15.6 to -18: $0.95/hr, Cold work -18 to -23.3: $1.67/hr,
 *   Cold work below -23.3: $2.62/hr,
 *   Leading hand 1-19: $39.11/week (ALL PURPOSE),
 *   Leading hand 20+: $65.35/week (ALL PURPOSE)
 *
 * Run after migrate.js: node scripts/seed_ma000074.js
 */
require('dotenv').config();
const pool = require('../src/db/pool');

const AWARD_CODE = 'MA000074';
const EFFECTIVE_DATE = '2025-07-01';

async function seed() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // -- Award metadata -------------------------------------------------------
    await client.query(`
      INSERT INTO award_metadata (award_code, award_name, effective_date, source_url)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (award_code) DO UPDATE SET
        award_name = EXCLUDED.award_name,
        effective_date = EXCLUDED.effective_date,
        updated_at = NOW()
    `, [
      AWARD_CODE,
      'Poultry Processing Award 2020',
      EFFECTIVE_DATE,
      'https://awards.fairwork.gov.au/MA000074.html',
    ]);

    // -- Classifications ------------------------------------------------------
    const classifications = [
      {
        level: 1, stream: 'poultry',
        fwc_id: 2830,
        title: 'Level 1',
        description: 'You are new to poultry processing and perform basic tasks that can be learned quickly. You work under close supervision and follow set procedures. No prior experience or qualifications are needed — everything is taught on the job during your first few weeks.',
        duties: [
          'Hanging live birds on the processing line',
          'Packing finished poultry products into boxes or trays',
          'Cleaning work areas, equipment and floors during and after shifts',
          'Sorting and grading poultry products by size or weight',
          'Loading and unloading delivery trucks under direction',
        ],
        indicative_tasks: ['Process worker (entry-level)', 'Packer', 'Cleaner', 'Labourer', 'Line worker'],
        sort_order: 10,
      },
      {
        level: 2, stream: 'poultry',
        fwc_id: 2831,
        title: 'Level 2',
        description: 'You have some experience in the poultry processing industry and can handle tasks that need a bit more skill or attention. You can operate basic equipment and work with less supervision than a Level 1 worker. You may help new workers learn the basics.',
        duties: [
          'Operating basic processing equipment such as scales, sealers and labelling machines',
          'Performing quality checks on products coming off the line',
          'Monitoring production line speed and reporting problems to your supervisor',
          'Assisting with stock rotation and cold storage management',
          'Helping train new Level 1 employees on basic tasks',
          'Recording production data on tally sheets or computer systems',
        ],
        indicative_tasks: ['Machine operator (basic)', 'Quality checker', 'Production worker (experienced)', 'Stock handler', 'Line attendant'],
        sort_order: 20,
      },
      {
        level: 3, stream: 'poultry',
        fwc_id: 2832,
        title: 'Level 3',
        description: 'You work as a trades assistant or operate specialised equipment in the processing plant. You have developed solid skills through experience and possibly some formal training. You can work independently on most tasks and may be responsible for a particular section of the production line.',
        duties: [
          'Operating specialised processing equipment such as deboning machines or portioning equipment',
          'Assisting qualified tradespeople with maintenance and repairs',
          'Performing detailed quality control inspections and recording results',
          'Setting up and calibrating equipment at the start of each shift',
          'Troubleshooting minor equipment faults and making basic adjustments',
          'Maintaining hygiene and food safety standards in your work area',
        ],
        indicative_tasks: ['Trades assistant', 'Specialised machine operator', 'Deboner', 'Quality control worker', 'Equipment operator'],
        sort_order: 30,
      },
      {
        level: 4, stream: 'poultry',
        fwc_id: 2833,
        title: 'Level 4',
        description: 'You are a trade-qualified worker or an advanced operator with significant skills and experience. You can handle complex equipment and make decisions about quality and production without needing constant guidance. You may hold a relevant trade certificate or equivalent experience.',
        duties: [
          'Performing trade-qualified work such as fitting, electrical or refrigeration maintenance',
          'Operating and maintaining complex processing machinery',
          'Conducting detailed fault diagnosis and performing repairs on equipment',
          'Ensuring all work meets food safety, hygiene and regulatory standards',
          'Training and mentoring less experienced workers in technical skills',
          'Managing spare parts inventory and ordering supplies as needed',
        ],
        indicative_tasks: ['Tradesperson (fitter, electrician, refrigeration mechanic)', 'Senior machine operator', 'Maintenance worker (qualified)', 'Advanced process worker'],
        sort_order: 40,
      },
      {
        level: 5, stream: 'poultry',
        fwc_id: 2834,
        title: 'Level 5',
        description: 'You are a supervisor or advanced tradesperson who oversees other workers or handles the most complex technical tasks in the plant. You are responsible for making sure your team meets production targets, quality standards and safety requirements.',
        duties: [
          'Supervising a team of production or maintenance workers on a shift',
          'Allocating tasks and managing workflow to meet production targets',
          'Monitoring team performance and providing feedback and coaching',
          'Handling workplace issues such as safety incidents and staff conflicts',
          'Coordinating with management on production schedules and staffing needs',
          'Ensuring compliance with food safety, OH&S and environmental regulations',
        ],
        indicative_tasks: ['Shift supervisor', 'Production supervisor', 'Senior tradesperson', 'Leading hand (large team)', 'Maintenance supervisor'],
        sort_order: 50,
      },
      {
        level: 6, stream: 'poultry',
        fwc_id: 2835,
        title: 'Level 6',
        description: 'You are a senior supervisor or plant manager with broad responsibility for a major section of the processing operation or the entire plant. You make decisions about production planning, staffing and resource allocation and report directly to senior management.',
        duties: [
          'Managing overall plant operations or a major production department',
          'Planning and scheduling production runs to meet customer orders',
          'Managing budgets, controlling costs and reporting on financial performance',
          'Hiring, training and performance-managing supervisors and staff',
          'Liaising with external bodies such as food safety auditors and regulators',
          'Driving continuous improvement in productivity, quality and safety',
        ],
        indicative_tasks: ['Plant manager', 'Production manager', 'Senior supervisor', 'Operations manager', 'Maintenance manager'],
        sort_order: 60,
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

    // -- Pay rates ------------------------------------------------------------
    const baseRates = {
      poultry: { 1: 25.06, 2: 25.73, 3: 26.07, 4: 26.41, 5: 26.74, 6: 27.43 },
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

    // -- Penalty rates --------------------------------------------------------
    const penaltyRates = [
      // Full-time
      { employment_type: 'full_time',  day_type: 'weekday',        multiplier: 1.00, description: 'Weekday ordinary rate (x1.0)' },
      { employment_type: 'full_time',  day_type: 'saturday',       multiplier: 1.50, description: 'Saturday — time and a half (x1.50)' },
      { employment_type: 'full_time',  day_type: 'sunday',         multiplier: 2.00, description: 'Sunday — double time (x2.0)' },
      { employment_type: 'full_time',  day_type: 'public_holiday', multiplier: 2.50, description: 'Public holiday — double time and a half (x2.5)' },
      // Part-time
      { employment_type: 'part_time',  day_type: 'weekday',        multiplier: 1.00, description: 'Weekday ordinary rate (x1.0)' },
      { employment_type: 'part_time',  day_type: 'saturday',       multiplier: 1.50, description: 'Saturday — time and a half (x1.50)' },
      { employment_type: 'part_time',  day_type: 'sunday',         multiplier: 2.00, description: 'Sunday — double time (x2.0)' },
      { employment_type: 'part_time',  day_type: 'public_holiday', multiplier: 2.50, description: 'Public holiday — double time and a half (x2.5)' },
      // Casual
      { employment_type: 'casual',     day_type: 'weekday',        multiplier: 1.00, description: 'Weekday ordinary casual rate (incl. 25% casual loading)' },
      { employment_type: 'casual',     day_type: 'saturday',       multiplier: 1.25, description: 'Saturday — x1.25 of casual base (incl. loading)' },
      { employment_type: 'casual',     day_type: 'sunday',         multiplier: 1.75, description: 'Sunday — x1.75 of casual base (incl. loading)' },
      { employment_type: 'casual',     day_type: 'public_holiday', multiplier: 2.25, description: 'Casual public holiday — x2.25 of casual base (incl. loading)' },
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

    // -- Overtime rates -------------------------------------------------------
    const overtimeRates = [
      { employment_type: 'full_time',  threshold_hours: 7.6,  period: 'daily', multiplier: 1.50, description: 'Daily OT — first 2 hours over 7.6 hrs/day (x1.50)' },
      { employment_type: 'full_time',  threshold_hours: 9.6,  period: 'daily', multiplier: 2.00, description: 'Daily OT — after 9.6 hrs/day (x2.00)' },
      { employment_type: 'part_time',  threshold_hours: 7.6,  period: 'daily', multiplier: 1.50, description: 'Part-time daily OT — first 2 hours over 7.6 hrs/day (x1.50)' },
      { employment_type: 'part_time',  threshold_hours: 9.6,  period: 'daily', multiplier: 2.00, description: 'Part-time daily OT — after 9.6 hrs/day (x2.00)' },
      { employment_type: 'casual',     threshold_hours: 7.6,  period: 'daily', multiplier: 1.50, description: 'Casual daily OT — first 2 hours over 7.6 hrs/day (x1.50)' },
      { employment_type: 'casual',     threshold_hours: 9.6,  period: 'daily', multiplier: 2.00, description: 'Casual daily OT — after 9.6 hrs/day (x2.00)' },
    ];

    await client.query(`DELETE FROM overtime_rates WHERE award_code = $1`, [AWARD_CODE]);

    for (const r of overtimeRates) {
      await client.query(`
        INSERT INTO overtime_rates (award_code, employment_type, threshold_hours, period, multiplier, description, effective_date)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
      `, [AWARD_CODE, r.employment_type, r.threshold_hours, r.period, r.multiplier, r.description, EFFECTIVE_DATE]);
    }
    console.log(`✓ Inserted ${overtimeRates.length} overtime rules`);

    // -- Allowances -----------------------------------------------------------
    const allowances = [
      {
        allowance_type: 'meal',
        name: 'Meal allowance (overtime)',
        description: 'If you work overtime and a meal break is due, you are entitled to a meal allowance of $18.38 if your employer does not provide a meal.',
        trigger_condition: 'Overtime requiring a meal break without employer-provided meal',
        amount: 18.38, amount_type: 'fixed', per_unit: 'per_meal',
        is_all_purpose: false,
      },
      {
        allowance_type: 'vehicle',
        name: 'Vehicle allowance',
        description: 'If you are required to use your own vehicle for work purposes, you are entitled to $0.98 per kilometre driven.',
        trigger_condition: 'Required to use own vehicle for work',
        amount: 0.98, amount_type: 'per_km', per_unit: 'per_km',
        is_all_purpose: false,
      },
      {
        allowance_type: 'first_aid',
        name: 'First aid allowance',
        description: 'If you are appointed as a first aid officer and hold a current first aid certificate, you are entitled to $21.41 per week.',
        trigger_condition: 'Appointed as first aid officer with current certificate',
        amount: 21.41, amount_type: 'fixed', per_unit: 'per_week',
        is_all_purpose: false,
      },
      {
        allowance_type: 'cold_work_1',
        name: 'Cold work allowance (-15.6 to -18 degrees C)',
        description: 'If you are required to work in a cold environment between -15.6 and -18 degrees Celsius, you are entitled to an extra $0.95 per hour.',
        trigger_condition: 'Working in temperatures between -15.6 and -18 degrees C',
        amount: 0.95, amount_type: 'per_hour', per_unit: 'per_hour',
        is_all_purpose: false,
      },
      {
        allowance_type: 'cold_work_2',
        name: 'Cold work allowance (-18 to -23.3 degrees C)',
        description: 'If you are required to work in a cold environment between -18 and -23.3 degrees Celsius, you are entitled to an extra $1.67 per hour.',
        trigger_condition: 'Working in temperatures between -18 and -23.3 degrees C',
        amount: 1.67, amount_type: 'per_hour', per_unit: 'per_hour',
        is_all_purpose: false,
      },
      {
        allowance_type: 'cold_work_3',
        name: 'Cold work allowance (below -23.3 degrees C)',
        description: 'If you are required to work in a cold environment below -23.3 degrees Celsius, you are entitled to an extra $2.62 per hour.',
        trigger_condition: 'Working in temperatures below -23.3 degrees C',
        amount: 2.62, amount_type: 'per_hour', per_unit: 'per_hour',
        is_all_purpose: false,
      },
      {
        allowance_type: 'leading_hand_small',
        name: 'Leading hand allowance (1-19 employees)',
        description: 'If you are appointed as a leading hand supervising 1 to 19 employees, you are entitled to an extra $39.11 per week. This is an all-purpose allowance, which means it is included when calculating overtime, penalty rates and leave.',
        trigger_condition: 'Appointed as leading hand supervising 1-19 employees',
        amount: 39.11, amount_type: 'fixed', per_unit: 'per_week',
        is_all_purpose: true,
      },
      {
        allowance_type: 'leading_hand_large',
        name: 'Leading hand allowance (20+ employees)',
        description: 'If you are appointed as a leading hand supervising 20 or more employees, you are entitled to an extra $65.35 per week. This is an all-purpose allowance, which means it is included when calculating overtime, penalty rates and leave.',
        trigger_condition: 'Appointed as leading hand supervising 20 or more employees',
        amount: 65.35, amount_type: 'fixed', per_unit: 'per_week',
        is_all_purpose: true,
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

    // -- Break entitlements ---------------------------------------------------
    const breaks = [
      {
        employment_type: null,
        shift_hours_min: 5.0, shift_hours_max: null,
        break_type: 'meal', break_duration_min: 30, is_paid: false,
        timing_rule: 'After 5 hours of continuous work',
        description: 'If you work more than 5 hours, you are entitled to an unpaid meal break of at least 30 minutes.',
      },
      {
        employment_type: null,
        shift_hours_min: 4.0, shift_hours_max: null,
        break_type: 'rest', break_duration_min: 10, is_paid: true,
        timing_rule: 'One 10-minute paid rest break per 4 hours worked',
        description: 'You are entitled to a paid 10-minute rest break for every 4 hours of work.',
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

    // -- Classification questions ---------------------------------------------
    const questions = [
      {
        question_key: 'poultry_level',
        question_text: 'What level best describes your role in poultry processing?',
        help_text: 'Your level depends on your experience, skills and qualifications. Level 1 is for new workers doing basic tasks. Level 6 is for senior supervisors or plant managers. If you hold a trade qualification (e.g. fitter, electrician), you are likely Level 4 or above.',
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

    // -- Classification answers -----------------------------------------------
    const questionIds = {};
    const qResult = await client.query(
      'SELECT id, question_key FROM classification_questions WHERE award_code = $1',
      [AWARD_CODE]
    );
    qResult.rows.forEach(r => { questionIds[r.question_key] = r.id; });

    const answers = [
      { question_key: 'poultry_level', answer_key: 'l1', answer_text: 'Level 1 — New employee, basic tasks like packing, cleaning and sorting', sort_order: 1 },
      { question_key: 'poultry_level', answer_key: 'l2', answer_text: 'Level 2 — Some experience, operates basic equipment (scales, sealers, labellers)', sort_order: 2 },
      { question_key: 'poultry_level', answer_key: 'l3', answer_text: 'Level 3 — Trades assistant or specialised equipment operator (deboning machines, portioning)', sort_order: 3 },
      { question_key: 'poultry_level', answer_key: 'l4', answer_text: 'Level 4 — Trade qualified or advanced operator (fitter, electrician, refrigeration mechanic)', sort_order: 4 },
      { question_key: 'poultry_level', answer_key: 'l5', answer_text: 'Level 5 — Supervisor or advanced tradesperson overseeing a team', sort_order: 5 },
      { question_key: 'poultry_level', answer_key: 'l6', answer_text: 'Level 6 — Senior supervisor or plant manager responsible for major operations', sort_order: 6 },
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

seed();
