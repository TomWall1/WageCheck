/**
 * Seed script — Marine Tourism and Charter Vessels Award 2020 [MA000093]
 * Pay rates effective 1 July 2025 (following 2025 Annual Wage Review)
 * Rates sourced from FWC MAPD API.
 *
 * Run after migrate.js: node scripts/seed_ma000093.js
 */
require('dotenv').config();
const pool = require('../src/db/pool');

const AWARD_CODE = 'MA000093';
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
      'Marine Tourism and Charter Vessels Award 2020',
      EFFECTIVE_DATE,
      'https://www.fairwork.gov.au/employment-conditions/awards/awards-summary/ma000093-summary',
    ]);

    // ── Classifications ───────────────────────────────────────────────────────
    const classifications = [
      {
        level: 1, stream: 'non_overnight_charter_employees',
        title: 'Crew Level 1',
        description: 'Crew Level 1',
        duties: [],
        indicative_tasks: [],
        sort_order: 10,
      },
      {
        level: 1, stream: 'overnight_charter_employees',
        title: 'Crew Level 1',
        description: 'Crew Level 1',
        duties: [],
        indicative_tasks: [],
        sort_order: 20,
      },
      {
        level: 2, stream: 'non_overnight_charter_employees',
        title: 'Crew Level 2',
        description: 'Crew Level 2',
        duties: [],
        indicative_tasks: [],
        sort_order: 30,
      },
      {
        level: 2, stream: 'overnight_charter_employees',
        title: 'Crew Level 2',
        description: 'Crew Level 2',
        duties: [],
        indicative_tasks: [],
        sort_order: 40,
      },
      {
        level: 3, stream: 'non_overnight_charter_employees',
        title: 'Coxswain',
        description: 'Coxswain',
        duties: [],
        indicative_tasks: [],
        sort_order: 50,
      },
      {
        level: 3, stream: 'overnight_charter_employees',
        title: 'Crew Level 3',
        description: 'Crew Level 3',
        duties: [],
        indicative_tasks: [],
        sort_order: 60,
      },
      {
        level: 3, stream: 'overnight_charter_employees',
        title: 'Divemaster/Dive instructor',
        description: 'Divemaster/Dive instructor',
        duties: [],
        indicative_tasks: [],
        sort_order: 70,
      },
      {
        level: 4, stream: 'overnight_charter_employees',
        title: 'Coxswain',
        description: 'Coxswain',
        duties: [],
        indicative_tasks: [],
        sort_order: 80,
      },
      {
        level: 4, stream: 'non_overnight_charter_employees',
        title: 'Engineer MED III',
        description: 'Engineer MED III',
        duties: [],
        indicative_tasks: [],
        sort_order: 90,
      },
      {
        level: 4, stream: 'non_overnight_charter_employees',
        title: 'Master V',
        description: 'Master V',
        duties: [],
        indicative_tasks: [],
        sort_order: 100,
      },
      {
        level: 5, stream: 'non_overnight_charter_employees',
        title: 'Engineer MED II',
        description: 'Engineer MED II',
        duties: [],
        indicative_tasks: [],
        sort_order: 110,
      },
      {
        level: 5, stream: 'non_overnight_charter_employees',
        title: 'Master IV',
        description: 'Master IV',
        duties: [],
        indicative_tasks: [],
        sort_order: 120,
      },
      {
        level: 5, stream: 'overnight_charter_employees',
        title: 'Master V',
        description: 'Master V',
        duties: [],
        indicative_tasks: [],
        sort_order: 130,
      },
      {
        level: 6, stream: 'non_overnight_charter_employees',
        title: 'Engineer MED I',
        description: 'Engineer MED I',
        duties: [],
        indicative_tasks: [],
        sort_order: 140,
      },
      {
        level: 6, stream: 'overnight_charter_employees',
        title: 'Master IV',
        description: 'Master IV',
        duties: [],
        indicative_tasks: [],
        sort_order: 150,
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
      '1_non_overnight_charter_employees': 24.33,
      '1_overnight_charter_employees': 26.04,
      '2_non_overnight_charter_employees': 26.64,
      '2_overnight_charter_employees': 27.58,
      '3_non_overnight_charter_employees': 28.98,
      '3_overnight_charter_employees': 28.81,
      '3_overnight_charter_employees': 28.81,
      '4_overnight_charter_employees': 31.12,
      '4_non_overnight_charter_employees': 29.11,
      '4_non_overnight_charter_employees': 29.11,
      '5_non_overnight_charter_employees': 29.64,
      '5_non_overnight_charter_employees': 29.64,
      '5_overnight_charter_employees': 39.56,
      '6_non_overnight_charter_employees': 32.59,
      '6_overnight_charter_employees': 44.37,
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
        description: 'Ordinary weekday — ×1',
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
        multiplier: 2, addition_per_hour: null,
        description: 'Sunday — ×2',
      },
      {
        employment_type: 'full_time', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 3, addition_per_hour: null,
        description: 'Public holiday - Christmas Day — Full-time ×3',
      },
      {
        employment_type: 'part_time', day_type: 'weekday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1, addition_per_hour: null,
        description: 'Ordinary weekday — ×1',
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
        multiplier: 2, addition_per_hour: null,
        description: 'Sunday — ×2',
      },
      {
        employment_type: 'part_time', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 3, addition_per_hour: null,
        description: 'Public holiday - Christmas Day — Part-time ×3',
      },
      {
        employment_type: 'casual', day_type: 'weekday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1, addition_per_hour: null,
        description: 'Ordinary weekday — ×1',
      },
      {
        employment_type: 'casual', day_type: 'saturday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.5, addition_per_hour: null,
        description: 'Saturday — ×1.5',
      },
      {
        employment_type: 'casual', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2, addition_per_hour: null,
        description: 'Sunday — ×2',
      },
      {
        employment_type: 'casual', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.5, addition_per_hour: null,
        description: 'Public holiday — ×2.5',
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
        allowance_type: 'compensation_for_loss_of_or_damage_to_pe',
        name: 'Compensation for loss of or damage to personal effects—maximum—an amount of up to',
        description: 'Compensation for loss of or damage to personal effects—maximum—an amount of up to',
        trigger_condition: 'As per award conditions',
        amount: 1484, amount_type: 'fixed', per_unit: 'per_shift',
      },
      {
        allowance_type: 'meal',
        name: 'Meal allowance—overtime',
        description: 'Meal allowance—overtime',
        trigger_condition: 'As per award conditions',
        amount: 15.98, amount_type: 'fixed', per_unit: 'per_shift',
      },
      {
        allowance_type: 'uniform',
        name: 'Uniform allowance',
        description: 'Uniform allowance',
        trigger_condition: 'As per award conditions',
        amount: 12.37, amount_type: 'weekly', per_unit: 'per_week',
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
        question_key: 'a93_stream',
        question_text: 'What area do you work in?',
        help_text: 'Select the stream that best matches your role.',
        question_type: 'single',
        stream: null,
        parent_question_key: null,
        parent_answer_key: null,
        sort_order: 1,
        answers: [
          { answer_key: 'non_overnight_charter_employees', answer_text: 'Non Overnight Charter Employees', sort_order: 1 },
          { answer_key: 'overnight_charter_employees', answer_text: 'Overnight Charter Employees', sort_order: 2 },
        ],
      },
      {
        award_code: AWARD_CODE,
        question_key: 'a93_level',
        question_text: 'What is your classification level?',
        help_text: 'Select the level that best matches your role and experience.',
        question_type: 'single',
        stream: null,
        parent_question_key: null,
        parent_answer_key: null,
        sort_order: 2,
        answers: [
          { answer_key: 'level_1', answer_text: 'Crew Level 1', sort_order: 1 },
          { answer_key: 'level_2', answer_text: 'Crew Level 2', sort_order: 2 },
          { answer_key: 'level_3', answer_text: 'Coxswain', sort_order: 3 },
          { answer_key: 'level_4', answer_text: 'Coxswain', sort_order: 4 },
          { answer_key: 'level_5', answer_text: 'Engineer MED II', sort_order: 5 },
          { answer_key: 'level_6', answer_text: 'Engineer MED I', sort_order: 6 },
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
    console.log('\n✅ MA000093 seed complete');
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
