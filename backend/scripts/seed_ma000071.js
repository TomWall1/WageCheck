/**
 * Seed script — Timber Industry Award 2020 [MA000071]
 * Pay rates effective 1 July 2025 (following 2025 Annual Wage Review)
 * Rates sourced from FWO Pay Guide published 25 June 2025.
 *
 * Run after migrate.js: node scripts/seed_ma000071.js
 */
require('dotenv').config();
const pool = require('../src/db/pool');

const AWARD_CODE = 'MA000071';
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
      'Timber Industry Award 2020',
      EFFECTIVE_DATE,
      'https://www.fairwork.gov.au/employment-conditions/awards/awards-summary/ma000071-summary',
    ]);

    // ── Classifications ───────────────────────────────────────────────────────
    // 3 streams: general_timber, wood_and_timber_furniture, pulp_and_paper
    // General timber: levels 1-7
    // Wood and timber furniture: levels 1-7 plus 4A
    // Pulp and paper: levels 1-9
    const classifications = [
      // General timber stream
      {
        level: 1, stream: 'general_timber',
        title: 'General timber stream level 1',
        description: 'General timber stream level 1',
        duties: [], indicative_tasks: [], sort_order: 10,
      },
      {
        level: 2, stream: 'general_timber',
        title: 'General timber stream level 2',
        description: 'General timber stream level 2',
        duties: [], indicative_tasks: [], sort_order: 20,
      },
      {
        level: 3, stream: 'general_timber',
        title: 'General timber stream level 3',
        description: 'General timber stream level 3',
        duties: [], indicative_tasks: [], sort_order: 30,
      },
      {
        level: 4, stream: 'general_timber',
        title: 'General timber stream level 4',
        description: 'General timber stream level 4',
        duties: [], indicative_tasks: [], sort_order: 40,
      },
      {
        level: 5, stream: 'general_timber',
        title: 'General timber stream level 5',
        description: 'General timber stream level 5',
        duties: [], indicative_tasks: [], sort_order: 50,
      },
      {
        level: 6, stream: 'general_timber',
        title: 'General timber stream level 6',
        description: 'General timber stream level 6',
        duties: [], indicative_tasks: [], sort_order: 60,
      },
      {
        level: 7, stream: 'general_timber',
        title: 'General timber stream level 7',
        description: 'General timber stream level 7',
        duties: [], indicative_tasks: [], sort_order: 70,
      },
      // Wood and timber furniture stream
      {
        level: 1, stream: 'wood_and_timber_furniture',
        title: 'Wood and timber furniture stream level 1',
        description: 'Wood and timber furniture stream level 1',
        duties: [], indicative_tasks: [], sort_order: 80,
      },
      {
        level: 2, stream: 'wood_and_timber_furniture',
        title: 'Wood and timber furniture stream level 2',
        description: 'Wood and timber furniture stream level 2',
        duties: [], indicative_tasks: [], sort_order: 90,
      },
      {
        level: 3, stream: 'wood_and_timber_furniture',
        title: 'Wood and timber furniture stream level 3',
        description: 'Wood and timber furniture stream level 3',
        duties: [], indicative_tasks: [], sort_order: 100,
      },
      {
        level: 4, stream: 'wood_and_timber_furniture',
        title: 'Wood and timber furniture stream level 4',
        description: 'Wood and timber furniture stream level 4',
        duties: [], indicative_tasks: [], sort_order: 110,
      },
      {
        level: 41, stream: 'wood_and_timber_furniture',
        title: 'Wood and timber furniture stream level 4A',
        description: 'Wood and timber furniture stream level 4A',
        duties: [], indicative_tasks: [], sort_order: 115,
      },
      {
        level: 5, stream: 'wood_and_timber_furniture',
        title: 'Wood and timber furniture stream level 5',
        description: 'Wood and timber furniture stream level 5',
        duties: [], indicative_tasks: [], sort_order: 120,
      },
      {
        level: 6, stream: 'wood_and_timber_furniture',
        title: 'Wood and timber furniture stream level 6',
        description: 'Wood and timber furniture stream level 6',
        duties: [], indicative_tasks: [], sort_order: 130,
      },
      {
        level: 7, stream: 'wood_and_timber_furniture',
        title: 'Wood and timber furniture stream level 7',
        description: 'Wood and timber furniture stream level 7',
        duties: [], indicative_tasks: [], sort_order: 140,
      },
      // Pulp and paper stream
      {
        level: 1, stream: 'pulp_and_paper',
        title: 'Pulp and paper stream level 1',
        description: 'Pulp and paper stream level 1',
        duties: [], indicative_tasks: [], sort_order: 150,
      },
      {
        level: 2, stream: 'pulp_and_paper',
        title: 'Pulp and paper stream level 2',
        description: 'Pulp and paper stream level 2',
        duties: [], indicative_tasks: [], sort_order: 160,
      },
      {
        level: 3, stream: 'pulp_and_paper',
        title: 'Pulp and paper stream level 3',
        description: 'Pulp and paper stream level 3',
        duties: [], indicative_tasks: [], sort_order: 170,
      },
      {
        level: 4, stream: 'pulp_and_paper',
        title: 'Pulp and paper stream level 4',
        description: 'Pulp and paper stream level 4',
        duties: [], indicative_tasks: [], sort_order: 180,
      },
      {
        level: 5, stream: 'pulp_and_paper',
        title: 'Pulp and paper stream level 5',
        description: 'Pulp and paper stream level 5',
        duties: [], indicative_tasks: [], sort_order: 190,
      },
      {
        level: 6, stream: 'pulp_and_paper',
        title: 'Pulp and paper stream level 6',
        description: 'Pulp and paper stream level 6',
        duties: [], indicative_tasks: [], sort_order: 200,
      },
      {
        level: 7, stream: 'pulp_and_paper',
        title: 'Pulp and paper stream level 7',
        description: 'Pulp and paper stream level 7',
        duties: [], indicative_tasks: [], sort_order: 210,
      },
      {
        level: 8, stream: 'pulp_and_paper',
        title: 'Pulp and paper stream level 8',
        description: 'Pulp and paper stream level 8',
        duties: [], indicative_tasks: [], sort_order: 220,
      },
      {
        level: 9, stream: 'pulp_and_paper',
        title: 'Pulp and paper stream level 9',
        description: 'Pulp and paper stream level 9',
        duties: [], indicative_tasks: [], sort_order: 230,
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
    // FT/PT hourly rates and casual hourly rates from FWO pay guide
    const baseRates = {
      // General timber stream
      '1_general_timber':  { ft: 24.28, casual: 30.35 },
      '2_general_timber':  { ft: 24.95, casual: 31.19 },
      '3_general_timber':  { ft: 25.85, casual: 32.31 },
      '4_general_timber':  { ft: 26.70, casual: 33.38 },
      '5_general_timber':  { ft: 28.12, casual: 35.15 },
      '6_general_timber':  { ft: 29.00, casual: 36.25 },
      '7_general_timber':  { ft: 30.68, casual: 38.35 },
      // Wood and timber furniture stream
      '1_wood_and_timber_furniture':  { ft: 24.28, casual: 30.35 },
      '2_wood_and_timber_furniture':  { ft: 24.95, casual: 31.19 },
      '3_wood_and_timber_furniture':  { ft: 25.85, casual: 32.31 },
      '4_wood_and_timber_furniture':  { ft: 26.70, casual: 33.38 },
      '41_wood_and_timber_furniture': { ft: 27.14, casual: 33.93 },
      '5_wood_and_timber_furniture':  { ft: 28.12, casual: 35.15 },
      '6_wood_and_timber_furniture':  { ft: 29.00, casual: 36.25 },
      '7_wood_and_timber_furniture':  { ft: 30.68, casual: 38.35 },
      // Pulp and paper stream
      '1_pulp_and_paper':  { ft: 25.46, casual: 31.83 },
      '2_pulp_and_paper':  { ft: 26.30, casual: 32.88 },
      '3_pulp_and_paper':  { ft: 26.81, casual: 33.51 },
      '4_pulp_and_paper':  { ft: 27.32, casual: 34.15 },
      '5_pulp_and_paper':  { ft: 28.12, casual: 35.15 },
      '6_pulp_and_paper':  { ft: 29.00, casual: 36.25 },
      '7_pulp_and_paper':  { ft: 29.88, casual: 37.35 },
      '8_pulp_and_paper':  { ft: 30.68, casual: 38.35 },
      '9_pulp_and_paper':  { ft: 31.56, casual: 39.45 },
    };

    const classResult = await client.query(
      'SELECT id, level, stream FROM classifications WHERE award_code = $1',
      [AWARD_CODE]
    );

    for (const cls of classResult.rows) {
      const rates = baseRates[`${cls.level}_${cls.stream}`];
      if (!rates) continue;

      for (const empType of ['full_time', 'part_time']) {
        await client.query(`
          INSERT INTO pay_rates (award_code, classification_id, employment_type, rate_type, rate_amount, effective_date)
          VALUES ($1, $2, $3, 'base_hourly', $4, $5)
          ON CONFLICT (award_code, classification_id, employment_type, rate_type, effective_date)
          DO UPDATE SET rate_amount = EXCLUDED.rate_amount
        `, [AWARD_CODE, cls.id, empType, rates.ft, EFFECTIVE_DATE]);
      }

      await client.query(`
        INSERT INTO pay_rates (award_code, classification_id, employment_type, rate_type, rate_amount, effective_date)
        VALUES ($1, $2, 'casual', 'base_hourly', $3, $4)
        ON CONFLICT (award_code, classification_id, employment_type, rate_type, effective_date)
        DO UPDATE SET rate_amount = EXCLUDED.rate_amount
      `, [AWARD_CODE, cls.id, rates.casual, EFFECTIVE_DATE]);

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
        description: 'Ordinary weekday — full-time x1',
      },
      {
        employment_type: 'full_time', day_type: 'saturday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.5, addition_per_hour: null,
        description: 'Saturday — full-time x1.5',
      },
      {
        employment_type: 'full_time', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2, addition_per_hour: null,
        description: 'Sunday — full-time x2',
      },
      {
        employment_type: 'full_time', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.5, addition_per_hour: null,
        description: 'Public holiday — full-time x2.5',
      },
      {
        employment_type: 'part_time', day_type: 'weekday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1, addition_per_hour: null,
        description: 'Ordinary weekday — part-time x1',
      },
      {
        employment_type: 'part_time', day_type: 'saturday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.5, addition_per_hour: null,
        description: 'Saturday — part-time x1.5',
      },
      {
        employment_type: 'part_time', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2, addition_per_hour: null,
        description: 'Sunday — part-time x2',
      },
      {
        employment_type: 'part_time', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.5, addition_per_hour: null,
        description: 'Public holiday — part-time x2.5',
      },
      {
        employment_type: 'casual', day_type: 'weekday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1, addition_per_hour: null,
        description: 'Ordinary weekday — casual x1',
      },
      {
        employment_type: 'casual', day_type: 'saturday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.4, addition_per_hour: null,
        description: 'Saturday shiftwork — casual x1.4',
      },
      {
        employment_type: 'casual', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.8, addition_per_hour: null,
        description: 'Sunday shiftwork — casual x1.8',
      },
      {
        employment_type: 'casual', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.2, addition_per_hour: null,
        description: 'Public holiday — casual x2.2',
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
      { employment_type: 'full_time', threshold_hours: 7.6, period: 'daily', multiplier: 1.5, description: 'Full-time daily overtime — first 2 hours over 7.6 (x1.5)' },
      { employment_type: 'full_time', threshold_hours: 9.6, period: 'daily', multiplier: 2.0, description: 'Full-time daily overtime — after 9.6 hours (x2.0)' },
      { employment_type: 'full_time', threshold_hours: 38, period: 'weekly', multiplier: 1.5, description: 'Full-time weekly overtime — first 2 hours over 38 (x1.5)' },
      { employment_type: 'full_time', threshold_hours: 40, period: 'weekly', multiplier: 2.0, description: 'Full-time weekly overtime — after 40 hours (x2.0)' },
      { employment_type: 'part_time', threshold_hours: 7.6, period: 'daily', multiplier: 1.5, description: 'Part-time daily overtime — first 2 hours over 7.6 (x1.5)' },
      { employment_type: 'part_time', threshold_hours: 9.6, period: 'daily', multiplier: 2.0, description: 'Part-time daily overtime — after 9.6 hours (x2.0)' },
      { employment_type: 'part_time', threshold_hours: 38, period: 'weekly', multiplier: 1.5, description: 'Part-time weekly overtime — first 2 hours over 38 (x1.5)' },
      { employment_type: 'part_time', threshold_hours: 40, period: 'weekly', multiplier: 2.0, description: 'Part-time weekly overtime — after 40 hours (x2.0)' },
      { employment_type: 'casual', threshold_hours: 7.6, period: 'daily', multiplier: 1.5, description: 'Casual daily overtime — first 2 hours over 7.6 (x1.5)' },
      { employment_type: 'casual', threshold_hours: 9.6, period: 'daily', multiplier: 2.0, description: 'Casual daily overtime — after 9.6 hours (x2.0)' },
      { employment_type: 'casual', threshold_hours: 38, period: 'weekly', multiplier: 1.5, description: 'Casual weekly overtime — first 2 hours over 38 (x1.5)' },
      { employment_type: 'casual', threshold_hours: 40, period: 'weekly', multiplier: 2.0, description: 'Casual weekly overtime — after 40 hours (x2.0)' },
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
        allowance_type: 'first_aid',
        name: 'First aid allowance',
        description: 'First aid allowance',
        trigger_condition: 'As per award conditions',
        amount: 21.37, amount_type: 'weekly', per_unit: 'per_week',
      },
      {
        allowance_type: 'meal',
        name: 'Meal allowance',
        description: 'Meal allowance when required to work overtime',
        trigger_condition: 'As per award conditions',
        amount: 18.27, amount_type: 'fixed', per_unit: 'per_shift',
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
        question_key: 'a71_stream',
        question_text: 'What stream do you work in?',
        help_text: 'Select the stream that best matches your role.',
        question_type: 'single',
        stream: null,
        parent_question_key: null,
        parent_answer_key: null,
        sort_order: 1,
        answers: [
          { answer_key: 'general_timber', answer_text: 'General Timber Stream', sort_order: 1 },
          { answer_key: 'wood_and_timber_furniture', answer_text: 'Wood and Timber Furniture Stream', sort_order: 2 },
          { answer_key: 'pulp_and_paper', answer_text: 'Pulp and Paper Stream', sort_order: 3 },
        ],
      },
      {
        award_code: AWARD_CODE,
        question_key: 'a71_level',
        question_text: 'What is your classification level?',
        help_text: 'Select the level that best matches your role and experience.',
        question_type: 'single',
        stream: null,
        parent_question_key: null,
        parent_answer_key: null,
        sort_order: 2,
        answers: [
          { answer_key: 'level_1', answer_text: 'Level 1', sort_order: 1 },
          { answer_key: 'level_2', answer_text: 'Level 2', sort_order: 2 },
          { answer_key: 'level_3', answer_text: 'Level 3', sort_order: 3 },
          { answer_key: 'level_4', answer_text: 'Level 4', sort_order: 4 },
          { answer_key: 'level_41', answer_text: 'Level 4A (Wood and Timber Furniture only)', sort_order: 5 },
          { answer_key: 'level_5', answer_text: 'Level 5', sort_order: 6 },
          { answer_key: 'level_6', answer_text: 'Level 6', sort_order: 7 },
          { answer_key: 'level_7', answer_text: 'Level 7', sort_order: 8 },
          { answer_key: 'level_8', answer_text: 'Level 8 (Pulp and Paper only)', sort_order: 9 },
          { answer_key: 'level_9', answer_text: 'Level 9 (Pulp and Paper only)', sort_order: 10 },
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
    console.log('\n✅ MA000071 seed complete');
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
