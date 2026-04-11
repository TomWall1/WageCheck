/**
 * Seed script — Banking, Finance and Insurance Award 2020 [MA000019]
 * Pay rates effective 1 July 2025
 * Source: FWC MAPD API + FWO pay guide MA000019
 *
 * One stream:
 *   banking — Level 1 through Level 6 (6 classifications)
 *
 * Adult FT/PT hourly rates (from API, weekly_rate / 38):
 *   L1: $25.74   L2: $28.12   L3: $29.70   L4: $31.19   L5: $32.45   L6: $36.35
 *
 * Casual rates = FT rate x 1.25
 *
 * Penalty rates:
 *   FT/PT: Sat x1.25, Sun x2.00, PH x2.50
 *   Casual: Sat x1.25, Sun x2.00, PH x2.50
 *   No evening/night loadings
 *
 * Overtime (daily threshold 7.6 hrs):
 *   First 2 OT hours: x1.50, after 2 OT hours: x2.00
 *
 * Junior rates: None (18+ industry)
 *
 * Allowances:
 *   Meal (OT >1.5hr past 6pm): $21.27, Meal (further >5.5hr OT): $17.48,
 *   First aid: $19.66/week, Vehicle: $0.99/km,
 *   Stand-by M-F: $22.65/day, Stand-by Sat/Sun/PH: $46.26/day
 *
 * Run after migrate.js: node scripts/seed_ma000019.js
 */
require('dotenv').config();
const pool = require('../src/db/pool');

const AWARD_CODE = 'MA000019';
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
      'Banking, Finance and Insurance Award 2020',
      EFFECTIVE_DATE,
      'https://awards.fairwork.gov.au/MA000019.html',
    ]);

    // -- Classifications ------------------------------------------------------
    const classifications = [
      {
        level: 1, stream: 'banking',
        fwc_id: 663,
        title: 'Level 1',
        description: 'This is the starting level for people new to banking, finance or insurance work. You do basic office and admin tasks that someone can learn quickly on the job. Your manager will tell you what to do and check your work regularly. You do not need any prior qualifications or experience to start at this level.',
        duties: [
          'Sorting, filing and retrieving paper and electronic documents',
          'Answering phones and directing calls to the right person',
          'Entering data into computer systems accurately',
          'Handling incoming and outgoing mail and deliveries',
          'Photocopying, scanning and basic office housekeeping',
        ],
        indicative_tasks: ['Office assistant', 'Filing clerk', 'Mailroom worker', 'Data entry operator', 'Receptionist (entry-level)'],
        sort_order: 10,
      },
      {
        level: 2, stream: 'banking',
        fwc_id: 664,
        title: 'Level 2',
        description: 'At this level you have picked up solid experience in the industry and can handle more detailed work without constant supervision. You understand basic financial products and services and can explain them to customers. You use your knowledge to complete tasks accurately and may help train new Level 1 staff.',
        duties: [
          'Processing customer transactions such as deposits, withdrawals and transfers',
          'Providing information to customers about standard banking or insurance products',
          'Preparing routine correspondence and reports',
          'Reconciling basic accounts and checking figures for accuracy',
          'Assisting with onboarding and training of Level 1 employees',
          'Maintaining customer records and updating account details',
        ],
        indicative_tasks: ['Bank teller', 'Customer service officer', 'Insurance claims processor', 'Accounts clerk', 'Administrative officer'],
        sort_order: 20,
      },
      {
        level: 3, stream: 'banking',
        fwc_id: 665,
        title: 'Level 3',
        description: 'You are a specialist or technical worker who uses your training and experience to make decisions about how to do your work. You handle tasks that need careful judgment, like assessing loan applications or investigating insurance claims. Your manager gives you goals but you decide how to get the job done day to day.',
        duties: [
          'Assessing and processing loan or credit applications against lending criteria',
          'Investigating and recommending outcomes on insurance claims',
          'Providing detailed technical advice on financial products to customers',
          'Preparing complex reports and analysis for management review',
          'Resolving escalated customer complaints and service issues',
          'Maintaining compliance with regulatory and policy requirements',
        ],
        indicative_tasks: ['Loans officer', 'Insurance assessor', 'Financial product specialist', 'Compliance officer (junior)', 'Senior customer service officer'],
        sort_order: 30,
      },
      {
        level: 4, stream: 'banking',
        fwc_id: 666,
        title: 'Level 4',
        description: 'You are a senior specialist who handles complex or high-value work. You may supervise a small team of lower-level employees and are responsible for checking their work. You need strong knowledge of your area and can solve problems without much guidance from your manager.',
        duties: [
          'Supervising and reviewing the work of Level 1 to Level 3 employees',
          'Managing a portfolio of high-value or complex customer accounts',
          'Approving transactions and decisions within your delegated authority',
          'Developing and updating procedures and training materials for the team',
          'Coordinating workflow and allocating tasks across the team',
          'Reporting on team performance and identifying areas for improvement',
        ],
        indicative_tasks: ['Team leader', 'Senior loans officer', 'Senior claims assessor', 'Branch operations supervisor', 'Portfolio manager (junior)'],
        sort_order: 40,
      },
      {
        level: 5, stream: 'banking',
        fwc_id: 667,
        title: 'Level 5',
        description: 'You hold a management or supervisory position and are responsible for a team, section or department. You set priorities, manage budgets and make decisions that affect how your area operates. You are accountable for the results your team delivers and report directly to senior management.',
        duties: [
          'Managing day-to-day operations of a branch, section or department',
          'Setting team targets and monitoring performance against goals',
          'Hiring, training, coaching and performance-managing staff',
          'Managing budgets and controlling costs for your area',
          'Implementing company policies and ensuring regulatory compliance',
        ],
        indicative_tasks: ['Branch manager (small branch)', 'Department supervisor', 'Operations manager', 'Claims team manager', 'Lending manager'],
        sort_order: 50,
      },
      {
        level: 6, stream: 'banking',
        fwc_id: 668,
        title: 'Level 6',
        description: 'This is the most senior classification under the award. You hold a senior management role with broad responsibility across multiple teams, functions or locations. You contribute to strategic planning, make high-level decisions and are accountable for significant business outcomes.',
        duties: [
          'Leading multiple teams, departments or branch locations',
          'Contributing to strategic planning and business development',
          'Making high-level decisions on policy, staffing and resource allocation',
          'Managing significant budgets and financial performance targets',
          'Representing the organisation in external dealings and negotiations',
          'Driving organisational change and continuous improvement initiatives',
        ],
        indicative_tasks: ['Senior branch manager', 'Regional manager', 'Senior operations manager', 'Head of department', 'Business development manager'],
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

    // -- Pay rates ------------------------------------------------------------
    const baseRates = {
      banking: { 1: 25.74, 2: 28.12, 3: 29.70, 4: 31.19, 5: 32.45, 6: 36.35 },
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
      { employment_type: 'full_time',  day_type: 'saturday',       multiplier: 1.25, description: 'Saturday — time and a quarter (x1.25)' },
      { employment_type: 'full_time',  day_type: 'sunday',         multiplier: 2.00, description: 'Sunday — double time (x2.0)' },
      { employment_type: 'full_time',  day_type: 'public_holiday', multiplier: 2.50, description: 'Public holiday — double time and a half (x2.5)' },
      // Part-time
      { employment_type: 'part_time',  day_type: 'weekday',        multiplier: 1.00, description: 'Weekday ordinary rate (x1.0)' },
      { employment_type: 'part_time',  day_type: 'saturday',       multiplier: 1.25, description: 'Saturday — time and a quarter (x1.25)' },
      { employment_type: 'part_time',  day_type: 'sunday',         multiplier: 2.00, description: 'Sunday — double time (x2.0)' },
      { employment_type: 'part_time',  day_type: 'public_holiday', multiplier: 2.50, description: 'Public holiday — double time and a half (x2.5)' },
      // Casual
      { employment_type: 'casual',     day_type: 'weekday',        multiplier: 1.00, description: 'Weekday ordinary casual rate (incl. 25% casual loading)' },
      { employment_type: 'casual',     day_type: 'saturday',       multiplier: 1.25, description: 'Saturday — x1.25 of casual base (incl. loading)' },
      { employment_type: 'casual',     day_type: 'sunday',         multiplier: 2.00, description: 'Sunday — x2.00 of casual base (incl. loading)' },
      { employment_type: 'casual',     day_type: 'public_holiday', multiplier: 2.50, description: 'Casual public holiday — x2.50 of casual base (incl. loading)' },
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
        name: 'Meal allowance (overtime >1.5hr past 6pm)',
        description: 'If you work overtime for more than 1.5 hours that extends past 6pm and your employer did not give you notice the day before, you are entitled to a meal allowance of $21.27.',
        trigger_condition: 'Overtime of more than 1.5 hours extending past 6pm without notice',
        amount: 21.27, amount_type: 'fixed', per_unit: 'per_meal',
        is_all_purpose: false,
      },
      {
        allowance_type: 'meal_further',
        name: 'Meal allowance (further, >5.5hr overtime)',
        description: 'If you continue working overtime for more than 5.5 hours, you are entitled to an additional meal allowance of $17.48.',
        trigger_condition: 'Overtime of more than 5.5 hours',
        amount: 17.48, amount_type: 'fixed', per_unit: 'per_meal',
        is_all_purpose: false,
      },
      {
        allowance_type: 'first_aid',
        name: 'First aid allowance',
        description: 'If you are appointed as a first aid officer and hold a current first aid certificate, you are entitled to $19.66 per week.',
        trigger_condition: 'Appointed as first aid officer with current certificate',
        amount: 19.66, amount_type: 'fixed', per_unit: 'per_week',
        is_all_purpose: false,
      },
      {
        allowance_type: 'vehicle',
        name: 'Vehicle allowance',
        description: 'If you are required to use your own vehicle for work purposes on a casual or incidental basis, you are entitled to $0.99 per kilometre.',
        trigger_condition: 'Required to use own vehicle for work (casual/incidental use)',
        amount: 0.99, amount_type: 'per_km', per_unit: 'per_km',
        is_all_purpose: false,
      },
      {
        allowance_type: 'standby_weekday',
        name: 'Stand-by allowance (Monday to Friday)',
        description: 'If you are required to be on stand-by during Monday to Friday, you are entitled to $22.65 per day.',
        trigger_condition: 'Required to be on stand-by Monday to Friday',
        amount: 22.65, amount_type: 'fixed', per_unit: 'per_day',
        is_all_purpose: false,
      },
      {
        allowance_type: 'standby_weekend',
        name: 'Stand-by allowance (Saturday, Sunday or public holiday)',
        description: 'If you are required to be on stand-by on a Saturday, Sunday or public holiday, you are entitled to $46.26 per day.',
        trigger_condition: 'Required to be on stand-by Saturday, Sunday or public holiday',
        amount: 46.26, amount_type: 'fixed', per_unit: 'per_day',
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
        question_key: 'banking_level',
        question_text: 'What level best describes your role in banking, finance or insurance?',
        help_text: 'Your level depends on the type of work you do, your experience and whether you supervise others. Level 1 is entry-level admin and clerical. Level 6 is senior management.',
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
      { question_key: 'banking_level', answer_key: 'l1', answer_text: 'Level 1 — Entry-level, routine clerical and admin duties (filing, data entry, answering phones)', sort_order: 1 },
      { question_key: 'banking_level', answer_key: 'l2', answer_text: 'Level 2 — Experienced clerical worker, uses knowledge of financial products (bank teller, customer service)', sort_order: 2 },
      { question_key: 'banking_level', answer_key: 'l3', answer_text: 'Level 3 — Specialist or technical role, exercises judgment (loans officer, insurance assessor)', sort_order: 3 },
      { question_key: 'banking_level', answer_key: 'l4', answer_text: 'Level 4 — Senior specialist, may supervise others (team leader, senior loans officer)', sort_order: 4 },
      { question_key: 'banking_level', answer_key: 'l5', answer_text: 'Level 5 — Management or supervisory role (branch manager, department supervisor)', sort_order: 5 },
      { question_key: 'banking_level', answer_key: 'l6', answer_text: 'Level 6 — Senior management (regional manager, head of department)', sort_order: 6 },
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
