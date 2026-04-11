/**
 * Seed script — Pharmaceutical Industry Award 2020 [MA000069]
 * Pay rates effective 1 July 2025 (following 2025 Annual Wage Review)
 * Rates sourced from FWC MAPD API.
 *
 * Run after migrate.js: node scripts/seed_ma000069.js
 */
require('dotenv').config();
const pool = require('../src/db/pool');

const AWARD_CODE = 'MA000069';
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
      'Pharmaceutical Industry Award 2020',
      EFFECTIVE_DATE,
      'https://www.fairwork.gov.au/employment-conditions/awards/awards-summary/ma000069-summary',
    ]);

    // ── Classifications ───────────────────────────────────────────────────────
    const classifications = [
      {
        level: 1, stream: 'general',
        title: 'Grade 1—on commencement',
        description: 'Entry-level pharmaceutical industry employee on commencement, performing basic production or warehouse duties under direct supervision.',
        duties: ['Performing basic cleaning and preparation of production areas', 'Assisting with packing and labelling pharmaceutical products', 'Following GMP procedures and hygiene requirements', 'Handling raw materials under supervision'],
        indicative_tasks: [],
        sort_order: 10,
      },
      {
        level: 2, stream: 'general',
        title: 'Grade 1—after 3 months',
        description: 'Pharmaceutical industry employee after 3 months service, performing routine production or warehouse tasks with developing competency.',
        duties: ['Operating basic production and packaging equipment', 'Performing routine quality checks on products', 'Maintaining production records and batch documentation', 'Following standard operating procedures independently'],
        indicative_tasks: [],
        sort_order: 30,
      },
      {
        level: 3, stream: 'general',
        title: 'Grade 1—after 12 months',
        description: 'Pharmaceutical industry employee after 12 months service, performing a range of production tasks with competence and minimal supervision.',
        duties: ['Operating a range of production and processing equipment', 'Performing in-process quality control checks', 'Assisting with equipment changeovers and setup', 'Training new employees on basic procedures'],
        indicative_tasks: [],
        sort_order: 50,
      },
      {
        level: 4, stream: 'general',
        title: 'Grade 2',
        description: 'Experienced pharmaceutical industry employee performing skilled production, quality control, or warehouse duties requiring trade or equivalent qualifications.',
        duties: ['Operating complex pharmaceutical manufacturing equipment', 'Performing detailed quality assurance testing and inspections', 'Maintaining and calibrating production instruments', 'Coordinating production workflows and team activities'],
        indicative_tasks: [],
        sort_order: 70,
      },
      {
        level: 5, stream: 'general',
        title: 'Grade 3',
        description: 'Senior pharmaceutical industry employee performing advanced production, technical, or supervisory roles with significant responsibility.',
        duties: ['Supervising production teams and managing shift operations', 'Performing advanced technical and diagnostic work', 'Ensuring compliance with GMP, TGA, and quality standards', 'Developing and reviewing standard operating procedures'],
        indicative_tasks: [],
        sort_order: 90,
      },
      {
        level: 6, stream: 'general',
        title: 'Grade 4',
        description: 'Highly skilled pharmaceutical industry employee performing specialist technical, quality, or management duties with autonomy.',
        duties: ['Managing production departments or specialist functions', 'Leading quality assurance programs and regulatory compliance', 'Performing advanced troubleshooting and process optimisation', 'Training and developing production and technical staff'],
        indicative_tasks: [],
        sort_order: 110,
      },
      {
        level: 13, stream: 'general',
        title: 'Manufacturing/production worker',
        description: 'General manufacturing and production worker in the pharmaceutical industry performing a range of production-related tasks.',
        duties: ['Operating pharmaceutical manufacturing and production equipment', 'Performing batch processing and production runs', 'Maintaining production area cleanliness and GMP compliance', 'Recording production data and batch information'],
        indicative_tasks: [],
        sort_order: 130,
      },
      {
        level: 14, stream: 'general',
        title: 'Warehouse/distribution worker',
        description: 'Warehouse and distribution worker in the pharmaceutical industry handling storage, dispatch, and logistics of pharmaceutical products.',
        duties: ['Receiving, checking, and storing pharmaceutical stock', 'Picking and packing orders for distribution', 'Operating forklifts and warehouse equipment', 'Maintaining inventory records and cold chain compliance'],
        indicative_tasks: [],
        sort_order: 140,
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
    const baseRates = {
      '1_general': 25.85,
      '1_general': 25.85,
      '2_general': 26.17,
      '2_general': 26.17,
      '3_general': 26.47,
      '3_general': 26.47,
      '4_general': 26.7,
      '4_general': 26.7,
      '5_general': 27.46,
      '5_general': 27.46,
      '6_general': 28.27,
      '6_general': 28.27,
    };

    const classResult = await client.query(
      'SELECT id, level, stream FROM classifications WHERE award_code = $1',
      [AWARD_CODE]
    );

    for (const cls of classResult.rows) {
      const baseRate = baseRates[`${cls.level}_${cls.stream}`];
      if (!baseRate) continue;

      const casualRate = Math.round(baseRate * 1.25 * 100) / 100;

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
    const penaltyRates = [
      {
        employment_type: 'full_time', day_type: 'weekday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1, addition_per_hour: null,
        description: 'Day — Full-time ×1',
      },
      {
        employment_type: 'full_time', day_type: 'saturday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2, addition_per_hour: null,
        description: 'Saturday - after 2 hours — Full-time ×2',
      },
      {
        employment_type: 'full_time', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2, addition_per_hour: null,
        description: 'Sunday - all day — Full-time ×2',
      },
      {
        employment_type: 'full_time', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.5, addition_per_hour: null,
        description: 'Public holiday — Full-time ×2.5',
      },
      {
        employment_type: 'part_time', day_type: 'weekday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1, addition_per_hour: null,
        description: 'Day — Part-time ×1',
      },
      {
        employment_type: 'part_time', day_type: 'saturday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2, addition_per_hour: null,
        description: 'Saturday - after 2 hours — Part-time ×2',
      },
      {
        employment_type: 'part_time', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2, addition_per_hour: null,
        description: 'Sunday - all day — Part-time ×2',
      },
      {
        employment_type: 'part_time', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.5, addition_per_hour: null,
        description: 'Public holiday — Part-time ×2.5',
      },
      {
        employment_type: 'casual', day_type: 'weekday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1, addition_per_hour: null,
        description: 'Day — Casual ×1',
      },
      {
        employment_type: 'casual', day_type: 'saturday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.2, addition_per_hour: null,
        description: 'Saturday — Casual ×1.2',
      },
      {
        employment_type: 'casual', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.6, addition_per_hour: null,
        description: 'Sunday — Casual ×1.6',
      },
      {
        employment_type: 'casual', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.2, addition_per_hour: null,
        description: 'Public holiday — Casual ×2.2',
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
    const overtimeRates = [
      { employment_type: 'full_time', threshold_hours: 7.6, period: 'daily', multiplier: 1.5, description: 'Full-time daily overtime — first 2 hours over 7.6 (×1.5)' },
      { employment_type: 'full_time', threshold_hours: 9.6, period: 'daily', multiplier: 2.0, description: 'Full-time daily overtime — after 9.6 hours (×2.0)' },
      { employment_type: 'full_time', threshold_hours: 38, period: 'weekly', multiplier: 1.5, description: 'Full-time weekly overtime — first 2 hours over 38 (×1.5)' },
      { employment_type: 'full_time', threshold_hours: 40, period: 'weekly', multiplier: 2.0, description: 'Full-time weekly overtime — after 40 hours (×2.0)' },
      { employment_type: 'part_time', threshold_hours: 7.6, period: 'daily', multiplier: 1.5, description: 'Part-time daily overtime — first 2 hours over 7.6 (×1.5)' },
      { employment_type: 'part_time', threshold_hours: 9.6, period: 'daily', multiplier: 2.0, description: 'Part-time daily overtime — after 9.6 hours (×2.0)' },
      { employment_type: 'part_time', threshold_hours: 38, period: 'weekly', multiplier: 1.5, description: 'Part-time weekly overtime — first 2 hours over 38 (×1.5)' },
      { employment_type: 'part_time', threshold_hours: 40, period: 'weekly', multiplier: 2.0, description: 'Part-time weekly overtime — after 40 hours (×2.0)' },
      { employment_type: 'casual', threshold_hours: 7.6, period: 'daily', multiplier: 1.5, description: 'Casual daily overtime — first 2 hours over 7.6 (×1.5)' },
      { employment_type: 'casual', threshold_hours: 9.6, period: 'daily', multiplier: 2.0, description: 'Casual daily overtime — after 9.6 hours (×2.0)' },
      { employment_type: 'casual', threshold_hours: 38, period: 'weekly', multiplier: 1.5, description: 'Casual weekly overtime — first 2 hours over 38 (×1.5)' },
      { employment_type: 'casual', threshold_hours: 40, period: 'weekly', multiplier: 2.0, description: 'Casual weekly overtime — after 40 hours (×2.0)' },
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
    const allowances = [
      {
        allowance_type: 'meal',
        name: 'Meal',
        description: 'Meal',
        trigger_condition: 'As per award conditions',
        amount: 18.38, amount_type: 'fixed', per_unit: 'per_shift',
      },
      {
        allowance_type: 'chlorpromazine_hydrochloride',
        name: 'Chlorpromazine hydrochloride',
        description: 'Chlorpromazine hydrochloride',
        trigger_condition: 'As per award conditions',
        amount: 0.59, amount_type: 'fixed', per_unit: 'per_hour',
      },
      {
        allowance_type: 'dust_mask',
        name: 'Dust mask',
        description: 'Dust mask',
        trigger_condition: 'As per award conditions',
        amount: 3.02, amount_type: 'fixed', per_unit: 'per_shift',
      },
      {
        allowance_type: 'first_aid',
        name: 'First aid',
        description: 'First aid',
        trigger_condition: 'As per award conditions',
        amount: 21.26, amount_type: 'weekly', per_unit: 'per_week',
      },
      {
        allowance_type: 'gentian_violet_and_similar_substances_mi',
        name: 'Gentian violet and similar substances—minimum payment',
        description: 'Gentian violet and similar substances—minimum payment',
        trigger_condition: 'As per award conditions',
        amount: 2.15, amount_type: 'fixed', per_unit: 'per_shift',
      },
      {
        allowance_type: 'gentian_violet_and_similar_substances_pe',
        name: 'Gentian violet and similar substances—per hour',
        description: 'Gentian violet and similar substances—per hour',
        trigger_condition: 'As per award conditions',
        amount: 0.71, amount_type: 'fixed', per_unit: 'per_hour',
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
    const questions = [
      {
        award_code: AWARD_CODE,
        question_key: 'a69_level',
        question_text: 'What is your classification level?',
        help_text: 'Select the level that best matches your role and experience.',
        question_type: 'single',
        stream: null,
        parent_question_key: null,
        parent_answer_key: null,
        sort_order: 1,
        answers: [
          { answer_key: 'level_1', answer_text: 'Grade 1 — on commencement', sort_order: 1 },
          { answer_key: 'level_2', answer_text: 'Grade 1 — after 3 months', sort_order: 2 },
          { answer_key: 'level_3', answer_text: 'Grade 1 — after 12 months', sort_order: 3 },
          { answer_key: 'level_4', answer_text: 'Grade 2', sort_order: 4 },
          { answer_key: 'level_5', answer_text: 'Grade 3', sort_order: 5 },
          { answer_key: 'level_6', answer_text: 'Grade 4', sort_order: 6 },
          { answer_key: 'level_13', answer_text: 'Manufacturing/production worker', sort_order: 7 },
          { answer_key: 'level_14', answer_text: 'Warehouse/distribution worker', sort_order: 8 },
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
    console.log('\n✅ MA000069 seed complete');
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
