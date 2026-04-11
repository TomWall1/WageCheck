/**
 * Seed script — Mobile Crane Hiring Award [MA000032]
 * Pay rates effective 1 July 2025 (following 2025 Annual Wage Review)
 * Rates from FWO pay guide effective 25 September 2025. Rates include industry allowance ($1.60/hr all-purpose).
 *
 * Run after migrate.js: node scripts/seed_ma000032.js
 */
require('dotenv').config();
const pool = require('../src/db/pool');

const AWARD_CODE = 'MA000032';
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
      'Mobile Crane Hiring Award 2010',
      EFFECTIVE_DATE,
      'https://www.fairwork.gov.au/employment-conditions/awards/awards-summary/ma000032-summary',
    ]);

    // ── Classifications ───────────────────────────────────────────────────────
    // MA000032 uses a single stream ('mobile_crane') with 7 levels.

    const classifications = [
      {
        level: 1, stream: 'mobile_crane',
        title: 'Mobile crane employee level 1 (MCE1)',
        description: 'Entry-level mobile crane employee performing basic crane operations.',
        duties: [
          'Operating basic mobile cranes under supervision',
          'Assisting with rigging and lifting operations',
          'Performing pre-operational inspections and basic maintenance',
        ],
        indicative_tasks: ['Basic crane operation', 'Rigging assistant'],
        sort_order: 10,
      },
      {
        level: 2, stream: 'mobile_crane',
        title: 'Mobile crane employee level 2 (MCE2)',
        description: 'Operates small to medium mobile cranes with competence.',
        duties: [
          'Operating small to medium mobile cranes independently',
          'Performing rigging and lifting tasks',
          'Conducting pre-start and safety checks',
        ],
        indicative_tasks: ['Small/medium crane operator', 'Rigging operations'],
        sort_order: 20,
      },
      {
        level: 3, stream: 'mobile_crane',
        title: 'Mobile crane employee level 3 (MCE3)',
        description: 'Experienced crane operator capable of operating a range of mobile cranes.',
        duties: [
          'Operating a variety of mobile cranes including medium tonnage',
          'Planning and executing lifting operations',
          'Coordinating with dogmen and riggers on site',
        ],
        indicative_tasks: ['Medium crane operator', 'Lift planning'],
        sort_order: 30,
      },
      {
        level: 4, stream: 'mobile_crane',
        title: 'Mobile crane employee level 4 (MCE4)',
        description: 'Skilled operator of larger mobile cranes with advanced capabilities.',
        duties: [
          'Operating larger mobile cranes requiring advanced skills',
          'Performing complex lifting operations',
          'Supervising rigging and lifting crews on site',
        ],
        indicative_tasks: ['Large crane operator', 'Complex lift operations'],
        sort_order: 40,
      },
      {
        level: 5, stream: 'mobile_crane',
        title: 'Mobile crane employee level 5 (MCE5)',
        description: 'Highly skilled operator of heavy mobile cranes.',
        duties: [
          'Operating heavy mobile cranes',
          'Planning and executing heavy and critical lifts',
          'Training and mentoring junior operators',
        ],
        indicative_tasks: ['Heavy crane operator', 'Critical lift specialist'],
        sort_order: 50,
      },
      {
        level: 6, stream: 'mobile_crane',
        title: 'Mobile crane employee level 6 (MCE6)',
        description: 'Senior operator of very heavy mobile cranes with specialist skills.',
        duties: [
          'Operating very heavy mobile cranes',
          'Leading complex and high-risk lifting operations',
          'Providing technical guidance and oversight on site',
        ],
        indicative_tasks: ['Very heavy crane operator', 'Specialist lift leader'],
        sort_order: 60,
      },
      {
        level: 7, stream: 'mobile_crane',
        title: 'Mobile crane employee level 7 (MCE7)',
        description: 'Highest-level crane operator with specialist qualifications and extensive experience.',
        duties: [
          'Operating the largest and most complex mobile cranes',
          'Managing multi-crane lift operations',
          'Acting as lead operator and technical authority on site',
        ],
        indicative_tasks: ['Top-tier crane operator', 'Multi-crane lift coordinator'],
        sort_order: 70,
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
    // Source: FWO pay guide MA000032, effective 1 July 2025.
    // Rates include industry allowance ($1.60/hr all-purpose).
    // Casual rate = adult FT/PT rate × 1.25 (25% casual loading).
    const baseRates = {
      1: 29.72,
      2: 30.60,
      3: 31.48,
      4: 32.28,
      5: 33.83,
      6: 34.50,
      7: 35.38,
    };

    // Casual rates from FWO pay guide (base × 1.25)
    const casualRates = {
      1: 37.15,
      2: 38.25,
      3: 39.35,
      4: 40.35,
      5: 42.29,
      6: 43.13,
      7: 44.23,
    };

    const classResult = await client.query(
      'SELECT id, level, stream FROM classifications WHERE award_code = $1',
      [AWARD_CODE]
    );

    for (const cls of classResult.rows) {
      const baseRate = baseRates[cls.level];
      if (!baseRate) continue;

      const casualRate = casualRates[cls.level];

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
    // Source: MA000032 — Penalty rates
    //
    // FT/PT penalty multipliers:
    //   Weekday ordinary:   ×1.0
    //   Saturday:           ×1.5 (before noon first 2hr), ×2.0 (before noon after 2hr / after noon)
    //   Sunday:             ×2.0
    //   Public holiday:     ×2.5
    //
    // Casual penalty multipliers (applied to casual base rate which already includes 25% loading):
    //   Saturday:           ×1.4 (before noon first 2hr), ×1.8 (before noon after 2hr / after noon)
    //   Sunday:             ×1.8
    //   Public holiday:     ×2.2

    const penaltyRates = [
      // ── Full-time ──────────────────────────────────────────────────────────
      {
        employment_type: 'full_time', day_type: 'weekday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.0, addition_per_hour: null,
        description: 'Ordinary weekday rate',
      },
      {
        employment_type: 'full_time', day_type: 'saturday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.5, addition_per_hour: null,
        description: 'Saturday — ×1.5',
      },
      {
        employment_type: 'full_time', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.0, addition_per_hour: null,
        description: 'Sunday — ×2.0',
      },
      {
        employment_type: 'full_time', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.5, addition_per_hour: null,
        description: 'Public holiday — ×2.5',
      },
      // ── Part-time (same as full-time) ──────────────────────────────────────
      {
        employment_type: 'part_time', day_type: 'weekday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.0, addition_per_hour: null,
        description: 'Ordinary weekday rate',
      },
      {
        employment_type: 'part_time', day_type: 'saturday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.5, addition_per_hour: null,
        description: 'Saturday — ×1.5',
      },
      {
        employment_type: 'part_time', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.0, addition_per_hour: null,
        description: 'Sunday — ×2.0',
      },
      {
        employment_type: 'part_time', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.5, addition_per_hour: null,
        description: 'Public holiday — ×2.5',
      },
      // ── Casual ─────────────────────────────────────────────────────────────
      // Casual base rate already includes 25% loading. Multipliers relative to casual base.
      {
        employment_type: 'casual', day_type: 'weekday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.0, addition_per_hour: null,
        description: 'Ordinary casual weekday rate (includes 25% casual loading)',
      },
      {
        employment_type: 'casual', day_type: 'saturday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.4, addition_per_hour: null,
        description: 'Casual Saturday — ×1.4 of casual base',
      },
      {
        employment_type: 'casual', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.8, addition_per_hour: null,
        description: 'Casual Sunday — ×1.8 of casual base',
      },
      {
        employment_type: 'casual', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.2, addition_per_hour: null,
        description: 'Casual public holiday — ×2.2 of casual base',
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
    // MA000032 — Overtime
    // Daily threshold 7.6hr: first 2hr ×1.5, after ×2.0
    // Weekly threshold 38hr: first 2hr ×1.5, after ×2.0
    // Same for all employment types.
    const overtimeRates = [
      // ── Full-time ──────────────────────────────────────────────────────────
      {
        employment_type: 'full_time',
        threshold_hours: 7.6, period: 'daily',
        multiplier: 1.5,
        description: 'Daily overtime — first 2 hours over 7.6 (×1.5)',
      },
      {
        employment_type: 'full_time',
        threshold_hours: 9.6, period: 'daily',
        multiplier: 2.0,
        description: 'Daily overtime — after 9.6 hours (×2.0)',
      },
      {
        employment_type: 'full_time',
        threshold_hours: 38, period: 'weekly',
        multiplier: 1.5,
        description: 'Weekly overtime — first 2 hours over 38 (×1.5)',
      },
      {
        employment_type: 'full_time',
        threshold_hours: 40, period: 'weekly',
        multiplier: 2.0,
        description: 'Weekly overtime — after 40 hours (×2.0)',
      },
      // ── Part-time ──────────────────────────────────────────────────────────
      {
        employment_type: 'part_time',
        threshold_hours: 7.6, period: 'daily',
        multiplier: 1.5,
        description: 'Part-time daily overtime — first 2 hours over 7.6 (×1.5)',
      },
      {
        employment_type: 'part_time',
        threshold_hours: 9.6, period: 'daily',
        multiplier: 2.0,
        description: 'Part-time daily overtime — after 9.6 hours (×2.0)',
      },
      {
        employment_type: 'part_time',
        threshold_hours: 38, period: 'weekly',
        multiplier: 1.5,
        description: 'Part-time weekly overtime — first 2 hours over 38 (×1.5)',
      },
      {
        employment_type: 'part_time',
        threshold_hours: 40, period: 'weekly',
        multiplier: 2.0,
        description: 'Part-time weekly overtime — after 40 hours (×2.0)',
      },
      // ── Casual ─────────────────────────────────────────────────────────────
      {
        employment_type: 'casual',
        threshold_hours: 7.6, period: 'daily',
        multiplier: 1.5,
        description: 'Casual daily overtime — first 2 hours over 7.6 (×1.5)',
      },
      {
        employment_type: 'casual',
        threshold_hours: 9.6, period: 'daily',
        multiplier: 2.0,
        description: 'Casual daily overtime — after 9.6 hours (×2.0)',
      },
      {
        employment_type: 'casual',
        threshold_hours: 38, period: 'weekly',
        multiplier: 1.5,
        description: 'Casual weekly overtime — first 2 hours over 38 (×1.5)',
      },
      {
        employment_type: 'casual',
        threshold_hours: 40, period: 'weekly',
        multiplier: 2.0,
        description: 'Casual weekly overtime — after 40 hours (×2.0)',
      },
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
    // Source: MA000032; FWO pay guide effective 1 July 2025.
    const allowances = [
      {
        allowance_type: 'multi_crane_2',
        name: 'Multi crane lift allowance — 2 cranes',
        description: 'Payable when involved in a multi-crane lift operation using 2 cranes.',
        trigger_condition: 'Performing multi-crane lift with 2 cranes',
        amount: 4.53, amount_type: 'fixed', per_unit: 'per_shift',
      },
      {
        allowance_type: 'multi_crane_3',
        name: 'Multi crane lift allowance — 3 cranes',
        description: 'Payable when involved in a multi-crane lift operation using 3 cranes.',
        trigger_condition: 'Performing multi-crane lift with 3 cranes',
        amount: 8.97, amount_type: 'fixed', per_unit: 'per_shift',
      },
      {
        allowance_type: 'multi_crane_4',
        name: 'Multi crane lift allowance — 4 cranes',
        description: 'Payable when involved in a multi-crane lift operation using 4 cranes.',
        trigger_condition: 'Performing multi-crane lift with 4 cranes',
        amount: 13.41, amount_type: 'fixed', per_unit: 'per_shift',
      },
      {
        allowance_type: 'multi_crane_5plus',
        name: 'Multi crane lift allowance — more than 4 cranes',
        description: 'Payable when involved in a multi-crane lift operation using more than 4 cranes.',
        trigger_condition: 'Performing multi-crane lift with more than 4 cranes',
        amount: 17.94, amount_type: 'fixed', per_unit: 'per_shift',
      },
      {
        allowance_type: 'pile_driving',
        name: 'Pile driving allowance',
        description: 'Payable when performing pile driving operations.',
        trigger_condition: 'Performing pile driving work',
        amount: 21.96, amount_type: 'fixed', per_unit: 'per_shift',
      },
      {
        allowance_type: 'meal',
        name: 'Meal allowance',
        description: 'If you are required to work overtime and a meal break is not provided, you are entitled to a meal allowance.',
        trigger_condition: 'Overtime worked and meal break not provided',
        amount: 19.00, amount_type: 'fixed', per_unit: 'per_shift',
      },
      {
        allowance_type: 'travel_fares',
        name: 'Travel fares allowance',
        description: 'Daily travel fares allowance for travel to and from work sites.',
        trigger_condition: 'Travelling to and from work sites',
        amount: 21.94, amount_type: 'fixed', per_unit: 'per_shift',
      },
      {
        allowance_type: 'vehicle_car',
        name: 'Car allowance',
        description: 'If you are required to use your own vehicle for work purposes, you are entitled to a per-kilometre allowance.',
        trigger_condition: 'Using own vehicle for work purposes',
        amount: 0.98, amount_type: 'per_km', per_unit: 'per_km',
      },
      {
        allowance_type: 'accommodation',
        name: 'Accommodation and overnight allowance',
        description: 'Payable when required to stay overnight away from home for work purposes.',
        trigger_condition: 'Required to stay overnight away from home',
        amount: 100.22, amount_type: 'fixed', per_unit: 'per_shift',
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
    // MA000032 — Breaks
    // Rest break: 10 min paid per 4 hours worked
    // Meal break: 30 min unpaid after 5 hours
    const breaks = [
      {
        employment_type: null,
        shift_hours_min: 4.0, shift_hours_max: null,
        break_type: 'rest', break_duration_min: 10, is_paid: true,
        timing_rule: 'One paid 10-minute rest break per 4 hours worked',
        description: 'For shifts of 4 hours or more, you are entitled to a paid 10-minute rest break.',
      },
      {
        employment_type: null,
        shift_hours_min: 5.0, shift_hours_max: null,
        break_type: 'meal', break_duration_min: 30, is_paid: false,
        timing_rule: 'No later than 5 hours after starting work',
        description: 'If you work more than 5 hours continuously, you must be given an unpaid meal break of at least 30 minutes.',
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
    // Single question flow for MA000032:
    //   crane_level — What is your classification level?
    const questions = [
      {
        award_code: AWARD_CODE,
        question_key: 'crane_level',
        question_text: 'What is your classification level?',
        help_text: 'Select the level that best matches your role and crane operating capability.',
        question_type: 'single',
        stream: null,
        parent_question_key: null,
        parent_answer_key: null,
        sort_order: 1,
        answers: [
          { answer_key: 'mce1', answer_text: 'MCE1 — Mobile crane employee level 1', sort_order: 1 },
          { answer_key: 'mce2', answer_text: 'MCE2 — Mobile crane employee level 2', sort_order: 2 },
          { answer_key: 'mce3', answer_text: 'MCE3 — Mobile crane employee level 3', sort_order: 3 },
          { answer_key: 'mce4', answer_text: 'MCE4 — Mobile crane employee level 4', sort_order: 4 },
          { answer_key: 'mce5', answer_text: 'MCE5 — Mobile crane employee level 5', sort_order: 5 },
          { answer_key: 'mce6', answer_text: 'MCE6 — Mobile crane employee level 6', sort_order: 6 },
          { answer_key: 'mce7', answer_text: 'MCE7 — Mobile crane employee level 7', sort_order: 7 },
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
    console.log('\n✅ MA000032 seed complete');
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
