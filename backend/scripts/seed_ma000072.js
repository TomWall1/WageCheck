/**
 * Seed script — Oil Refining and Manufacturing Award 2020 [MA000072]
 * Pay rates effective 6 February 2026 (mid-cycle update)
 * Rates sourced from FWO Pay Guide published 6 February 2026.
 *
 * Run after migrate.js: node scripts/seed_ma000072.js
 */
require('dotenv').config();
const pool = require('../src/db/pool');

const AWARD_CODE = 'MA000072';
const EFFECTIVE_DATE = '2026-02-06';

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
      'Oil Refining and Manufacturing Award 2020',
      EFFECTIVE_DATE,
      'https://www.fairwork.gov.au/employment-conditions/awards/awards-summary/ma000072-summary',
    ]);

    // ── Classifications ───────────────────────────────────────────────────────
    // The PDF groups by operational area. We model each unique role as a classification.
    // Streams: refinery_operations, lubricants_bitumen, maintenance, clerical
    const classifications = [
      {
        level: 1, stream: 'refinery_operations',
        title: 'Refinery operations — Trainee operator level 1',
        description: 'Trainee operator level 1 in refinery operations',
        duties: [], indicative_tasks: [], sort_order: 10,
      },
      {
        level: 2, stream: 'refinery_operations',
        title: 'Refinery operations — Outside operator level 2',
        description: 'Outside operator level 2 in refinery operations',
        duties: [], indicative_tasks: [], sort_order: 20,
      },
      {
        level: 3, stream: 'refinery_operations',
        title: 'Refinery operations — Advanced outside operator level 3',
        description: 'Advanced outside operator level 3 in refinery operations',
        duties: [], indicative_tasks: [], sort_order: 30,
      },
      {
        level: 4, stream: 'refinery_operations',
        title: 'Refinery operations — Console operator level 4',
        description: 'Console operator level 4 in refinery operations',
        duties: [], indicative_tasks: [], sort_order: 40,
      },
      {
        level: 5, stream: 'refinery_operations',
        title: 'Refinery operations — Head operator level 5',
        description: 'Head operator level 5 in refinery operations',
        duties: [], indicative_tasks: [], sort_order: 50,
      },
      {
        level: 1, stream: 'lubricants_bitumen',
        title: 'Lubricants/bitumen — Trainee level 1',
        description: 'Trainee level 1 in lubricants/bitumen plants and terminals',
        duties: [], indicative_tasks: [], sort_order: 60,
      },
      {
        level: 2, stream: 'lubricants_bitumen',
        title: 'Lubricants/bitumen — Operator (competent) level 2',
        description: 'Operator (competent) level 2 in lubricants/bitumen plants and terminals',
        duties: [], indicative_tasks: [], sort_order: 70,
      },
      {
        level: 3, stream: 'lubricants_bitumen',
        title: 'Lubricants/bitumen — Operator (advanced) level 3',
        description: 'Operator (advanced) level 3 in lubricants/bitumen plants and terminals',
        duties: [], indicative_tasks: [], sort_order: 80,
      },
      {
        level: 4, stream: 'lubricants_bitumen',
        title: 'Lubricants/bitumen — Specialist blender level 4',
        description: 'Specialist blender level 4 in lubricants/bitumen plants and terminals',
        duties: [], indicative_tasks: [], sort_order: 90,
      },
      {
        level: 5, stream: 'lubricants_bitumen',
        title: 'Lubricants/bitumen — Head operator level 5',
        description: 'Head operator level 5 in lubricants/bitumen plants and terminals',
        duties: [], indicative_tasks: [], sort_order: 100,
      },
      {
        level: 1, stream: 'maintenance',
        title: 'Maintenance — Tradesperson',
        description: 'Tradesperson in maintenance',
        duties: [], indicative_tasks: [], sort_order: 110,
      },
      {
        level: 2, stream: 'maintenance',
        title: 'Maintenance — Advanced tradesperson',
        description: 'Advanced tradesperson in maintenance',
        duties: [], indicative_tasks: [], sort_order: 120,
      },
      {
        level: 3, stream: 'maintenance',
        title: 'Maintenance — Dual trade tradesperson',
        description: 'Dual trade tradesperson in maintenance',
        duties: [], indicative_tasks: [], sort_order: 130,
      },
      {
        level: 4, stream: 'maintenance',
        title: 'Maintenance — Maintenance co-ordinator',
        description: 'Maintenance co-ordinator',
        duties: [], indicative_tasks: [], sort_order: 140,
      },
      {
        level: 1, stream: 'clerical',
        title: 'Clerical level 1 — Year 1',
        description: 'Clerical level 1, year 1',
        duties: [], indicative_tasks: [], sort_order: 150,
      },
      {
        level: 2, stream: 'clerical',
        title: 'Clerical level 1 — Year 2',
        description: 'Clerical level 1, year 2',
        duties: [], indicative_tasks: [], sort_order: 160,
      },
      {
        level: 3, stream: 'clerical',
        title: 'Clerical level 1 — Year 3',
        description: 'Clerical level 1, year 3',
        duties: [], indicative_tasks: [], sort_order: 170,
      },
      {
        level: 4, stream: 'clerical',
        title: 'Clerical level 2 — Year 1',
        description: 'Clerical level 2, year 1',
        duties: [], indicative_tasks: [], sort_order: 180,
      },
      {
        level: 5, stream: 'clerical',
        title: 'Clerical level 2 — Year 2',
        description: 'Clerical level 2, year 2',
        duties: [], indicative_tasks: [], sort_order: 190,
      },
      {
        level: 6, stream: 'clerical',
        title: 'Clerical level 3',
        description: 'Clerical level 3',
        duties: [], indicative_tasks: [], sort_order: 200,
      },
      {
        level: 7, stream: 'clerical',
        title: 'Clerical level 4',
        description: 'Clerical level 4',
        duties: [], indicative_tasks: [], sort_order: 210,
      },
      {
        level: 8, stream: 'clerical',
        title: 'Clerical level 5',
        description: 'Clerical level 5',
        duties: [], indicative_tasks: [], sort_order: 220,
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
    // FT/PT hourly rates from FWO pay guide (non-clerical include industry disability allowance)
    // Casual rates from FWO pay guide casual table
    const baseRates = {
      '1_refinery_operations':  { ft: 28.15, casual: 35.19 },
      '2_refinery_operations':  { ft: 30.38, casual: 37.98 },
      '3_refinery_operations':  { ft: 32.87, casual: 41.09 },
      '4_refinery_operations':  { ft: 36.43, casual: 45.54 },
      '5_refinery_operations':  { ft: 39.23, casual: 49.04 },
      '1_lubricants_bitumen':   { ft: 27.58, casual: 34.48 },
      '2_lubricants_bitumen':   { ft: 29.09, casual: 36.36 },
      '3_lubricants_bitumen':   { ft: 30.32, casual: 37.90 },
      '4_lubricants_bitumen':   { ft: 31.57, casual: 39.46 },
      '5_lubricants_bitumen':   { ft: 32.84, casual: 41.05 },
      '1_maintenance':          { ft: 31.75, casual: 39.69 },
      '2_maintenance':          { ft: 33.79, casual: 42.24 },
      '3_maintenance':          { ft: 36.15, casual: 45.19 },
      '4_maintenance':          { ft: 37.61, casual: 47.01 },
      '1_clerical':             { ft: 27.95, casual: 34.94 },
      '2_clerical':             { ft: 29.27, casual: 36.59 },
      '3_clerical':             { ft: 30.17, casual: 37.71 },
      '4_clerical':             { ft: 30.53, casual: 38.16 },
      '5_clerical':             { ft: 31.09, casual: 38.86 },
      '6_clerical':             { ft: 32.24, casual: 40.30 },
      '7_clerical':             { ft: 33.86, casual: 42.33 },
      '8_clerical':             { ft: 35.23, casual: 44.04 },
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
        description: 'Saturday first 2 hours — full-time x1.5',
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
        description: 'Saturday first 2 hours — part-time x1.5',
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
        multiplier: 1.5, addition_per_hour: null,
        description: 'Saturday — casual x1.5',
      },
      {
        employment_type: 'casual', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2, addition_per_hour: null,
        description: 'Sunday — casual x2',
      },
      {
        employment_type: 'casual', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.5, addition_per_hour: null,
        description: 'Public holiday — casual x2.5',
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
        allowance_type: 'industry_allowance',
        name: 'Industry allowance — other than clerical employees',
        description: 'Industry allowance — other than clerical employees (already included in rate tables)',
        trigger_condition: 'As per award conditions',
        amount: 42.74, amount_type: 'weekly', per_unit: 'per_week',
      },
      {
        allowance_type: 'leading_hand_3_to_10',
        name: 'Leading hand in charge of 3 to 10 employees',
        description: 'Leading hand in charge of 3 to 10 employees',
        trigger_condition: 'As per award conditions',
        amount: 47.01, amount_type: 'weekly', per_unit: 'per_week',
      },
      {
        allowance_type: 'leading_hand_11_to_20',
        name: 'Leading hand in charge of 11 to 20 employees',
        description: 'Leading hand in charge of 11 to 20 employees',
        trigger_condition: 'As per award conditions',
        amount: 59.83, amount_type: 'weekly', per_unit: 'per_week',
      },
      {
        allowance_type: 'leading_hand_over_20',
        name: 'Leading hand in charge of more than 20 employees',
        description: 'Leading hand in charge of more than 20 employees',
        trigger_condition: 'As per award conditions',
        amount: 80.45, amount_type: 'weekly', per_unit: 'per_week',
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
        question_key: 'a72_stream',
        question_text: 'What area do you work in?',
        help_text: 'Select the stream that best matches your role.',
        question_type: 'single',
        stream: null,
        parent_question_key: null,
        parent_answer_key: null,
        sort_order: 1,
        answers: [
          { answer_key: 'refinery_operations', answer_text: 'Refinery Operations', sort_order: 1 },
          { answer_key: 'lubricants_bitumen', answer_text: 'Lubricants/Bitumen Plants and Terminals', sort_order: 2 },
          { answer_key: 'maintenance', answer_text: 'Maintenance', sort_order: 3 },
          { answer_key: 'clerical', answer_text: 'Clerical', sort_order: 4 },
        ],
      },
      {
        award_code: AWARD_CODE,
        question_key: 'a72_level',
        question_text: 'What is your classification level?',
        help_text: 'Select the level that best matches your role and experience.',
        question_type: 'single',
        stream: null,
        parent_question_key: null,
        parent_answer_key: null,
        sort_order: 2,
        answers: [
          { answer_key: 'level_1', answer_text: 'Level 1 / Trainee / Tradesperson / Year 1', sort_order: 1 },
          { answer_key: 'level_2', answer_text: 'Level 2 / Operator (competent) / Advanced tradesperson / Year 2', sort_order: 2 },
          { answer_key: 'level_3', answer_text: 'Level 3 / Operator (advanced) / Dual trade / Year 3', sort_order: 3 },
          { answer_key: 'level_4', answer_text: 'Level 4 / Console operator / Specialist blender / Co-ordinator', sort_order: 4 },
          { answer_key: 'level_5', answer_text: 'Level 5 / Head operator', sort_order: 5 },
          { answer_key: 'level_6', answer_text: 'Clerical level 3', sort_order: 6 },
          { answer_key: 'level_7', answer_text: 'Clerical level 4', sort_order: 7 },
          { answer_key: 'level_8', answer_text: 'Clerical level 5', sort_order: 8 },
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
    console.log('\n✅ MA000072 seed complete');
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
