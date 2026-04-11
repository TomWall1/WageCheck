/**
 * Seed script — Commercial Sales Award 2020 [MA000083]
 * Pay rates effective 1 July 2025
 * Source: FWC MAPD API + FWO pay guide MA000083
 *
 * One stream:
 *   commercial_sales — Probationary Traveller, Merchandiser, Commercial Traveller (3 classifications)
 *
 * Adult FT/PT hourly rates (from API, weekly_rate / 38):
 *   Probationary Traveller: $25.39   Merchandiser: $26.23   Commercial Traveller: $28.21
 *
 * Casual rates = FT rate x 1.25
 *
 * Penalty rates:
 *   FT/PT: Sat x1.50, Sun x2.00, PH x2.50
 *   Casual: Sat x1.40, Sun x1.80, PH x2.20 (base × [FT_mult + 0.25])
 *
 * Overtime (daily threshold 7.6 hrs):
 *   First 2 OT hours: x1.50, after 2 OT hours: x2.00
 *
 * Junior rates (% of adult L1, from FWO pay guide):
 *   ≤18 yrs: 75%, 19 yrs: 88.9%, 20 yrs: adult
 *
 * Allowances:
 *   Vehicle car: $0.98/km, Vehicle motorcycle: $0.33/km,
 *   Living away from home: $81.59/week, Weekend away: $64.80/weekend
 *
 * Run after migrate.js: node scripts/seed_ma000083.js
 */
require('dotenv').config();
const pool = require('../src/db/pool');

const AWARD_CODE = 'MA000083';
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
      'Commercial Sales Award 2020',
      EFFECTIVE_DATE,
      'https://awards.fairwork.gov.au/MA000083.html',
    ]);

    // -- Classifications ------------------------------------------------------
    const classifications = [
      {
        level: 1, stream: 'commercial_sales',
        fwc_id: 3043,
        title: 'Probationary Traveller',
        description: 'You are a new commercial traveller who is still in your probation period, which lasts up to 3 months. During this time you are learning the ropes of travelling to customers and selling products on behalf of your employer. You work under closer supervision while you build up your product knowledge and sales skills.',
        duties: [
          'Visiting customers and potential customers to introduce yourself and the company',
          'Learning about the range of products or services you will be selling',
          'Accompanying experienced travellers on sales calls to learn the process',
          'Maintaining basic records of customer visits and orders',
          'Reporting back to your supervisor on your progress and any issues',
        ],
        indicative_tasks: ['Trainee commercial traveller', 'Probationary sales representative', 'Junior sales rep', 'Sales trainee'],
        sort_order: 10,
      },
      {
        level: 2, stream: 'commercial_sales',
        fwc_id: 3044,
        title: 'Merchandiser',
        description: 'You are employed mainly to set up and maintain product displays in shops, supermarkets or other retail outlets. You travel between stores to make sure products are properly displayed, stocked and looking their best. You do not typically sell products directly — your job is to make sure the products are presented well so they sell themselves.',
        duties: [
          'Setting up product displays and promotional stands in retail outlets',
          'Checking stock levels on shelves and rotating products to keep them fresh',
          'Building and maintaining relationships with store managers and staff',
          'Reporting on product placement, competitor activity and stock issues',
          'Travelling between multiple store locations during a shift',
          'Following planograms and merchandising guidelines from your employer',
        ],
        indicative_tasks: ['Merchandiser', 'Product display worker', 'Retail merchandising representative', 'Field merchandiser'],
        sort_order: 20,
      },
      {
        level: 3, stream: 'commercial_sales',
        fwc_id: 3045,
        title: 'Commercial Traveller / Advertising Sales Representative',
        description: 'You are an experienced salesperson who travels to customers to sell products, goods or advertising space. You have completed any probation period and work independently, managing your own territory or client list. You are responsible for meeting sales targets and building long-term customer relationships.',
        duties: [
          'Travelling to customer premises to sell products, goods or advertising space',
          'Managing a territory or customer list and planning your own schedule',
          'Negotiating prices, delivery terms and contracts with customers',
          'Processing orders and following up on deliveries and payments',
          'Meeting or exceeding sales targets set by your employer',
          'Providing after-sales service and handling customer complaints',
        ],
        indicative_tasks: ['Commercial traveller', 'Advertising sales representative', 'Sales representative', 'Territory manager', 'Field sales officer'],
        sort_order: 30,
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
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        ON CONFLICT (award_code, level, stream, pay_point) DO UPDATE SET
          title = EXCLUDED.title,
          description = EXCLUDED.description,
          duties = EXCLUDED.duties,
          indicative_tasks = EXCLUDED.indicative_tasks,
          sort_order = EXCLUDED.sort_order,
          fwc_classification_fixed_id = EXCLUDED.fwc_classification_fixed_id
      `, [
        AWARD_CODE, c.level, c.stream, c.pay_point || 1, c.title, c.description,
        JSON.stringify(c.duties), JSON.stringify(c.indicative_tasks), c.sort_order, c.fwc_id,
      ]);
    }
    console.log(`✓ Inserted ${classifications.length} classifications`);

    // -- Pay rates ------------------------------------------------------------
    const baseRates = {
      commercial_sales: { 1: 25.39, 2: 26.23, 3: 28.21 },
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
      // Casual (multipliers applied to casual base; equivalent to base × [FT_mult + 0.25])
      { employment_type: 'casual',     day_type: 'weekday',        multiplier: 1.00, description: 'Weekday ordinary casual rate (incl. 25% casual loading)' },
      { employment_type: 'casual',     day_type: 'saturday',       multiplier: 1.40, description: 'Saturday — x1.40 of casual base (base × 1.75)' },
      { employment_type: 'casual',     day_type: 'sunday',         multiplier: 1.80, description: 'Sunday — x1.80 of casual base (base × 2.25)' },
      { employment_type: 'casual',     day_type: 'public_holiday', multiplier: 2.20, description: 'Casual public holiday — x2.20 of casual base (base × 2.75)' },
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
        allowance_type: 'vehicle_car',
        name: 'Vehicle allowance (car)',
        description: 'If you are required to use your own car for work purposes, you are entitled to $0.98 per kilometre driven.',
        trigger_condition: 'Required to use own car for work',
        amount: 0.98, amount_type: 'per_km', per_unit: 'per_km',
        is_all_purpose: false,
      },
      {
        allowance_type: 'vehicle_motorcycle',
        name: 'Vehicle allowance (motorcycle)',
        description: 'If you are required to use your own motorcycle for work purposes, you are entitled to $0.33 per kilometre driven.',
        trigger_condition: 'Required to use own motorcycle for work',
        amount: 0.33, amount_type: 'per_km', per_unit: 'per_km',
        is_all_purpose: false,
      },
      {
        allowance_type: 'living_away',
        name: 'Living away from home allowance',
        description: 'If you are required to live away from your usual home because of work, you are entitled to $81.59 per week to cover your additional living expenses.',
        trigger_condition: 'Required to live away from home for work',
        amount: 81.59, amount_type: 'fixed', per_unit: 'per_week',
        is_all_purpose: false,
      },
      {
        allowance_type: 'weekend_away',
        name: 'Weekend away from home allowance',
        description: 'If you are required to be away from home over a weekend because of work, you are entitled to $64.80 per weekend.',
        trigger_condition: 'Required to be away from home over a weekend for work',
        amount: 64.80, amount_type: 'fixed', per_unit: 'per_weekend',
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
        question_key: 'sales_role',
        question_text: 'What best describes your role in commercial sales?',
        help_text: 'Probationary travellers are new sales reps in their first 3 months. Merchandisers set up product displays in stores. Commercial travellers and advertising sales reps travel to customers to sell products or advertising space.',
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
      { question_key: 'sales_role', answer_key: 'probationary', answer_text: 'Probationary traveller — I\'m a new commercial traveller in my first 3 months', sort_order: 1 },
      { question_key: 'sales_role', answer_key: 'merchandiser', answer_text: 'Merchandiser — I set up and maintain product displays in retail stores', sort_order: 2 },
      { question_key: 'sales_role', answer_key: 'commercial_traveller', answer_text: 'Commercial traveller or advertising sales rep — I travel to sell products or advertising', sort_order: 3 },
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
