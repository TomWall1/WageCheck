/**
 * Seed script — Supported Employment Services Award [MA000103]
 * Pay rates effective 10 October 2025
 * Rates from FWO pay guide published 10 October 2025.
 *
 * Note: This award has transitional Grade A and Grade B classifications
 * with rates that change on 30 June 2026. We seed the "from 1 July 2025 to 29 June 2026" rates.
 *
 * Run after migrate.js: node scripts/seed_ma000103.js
 */
require('dotenv').config();
const pool = require('../src/db/pool');

const AWARD_CODE = 'MA000103';
const EFFECTIVE_DATE = '2025-10-10';

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
      'Supported Employment Services Award 2020',
      EFFECTIVE_DATE,
      'https://www.fairwork.gov.au/employment-conditions/awards/awards-summary/ma000103-summary',
    ]);

    // ── Classifications ───────────────────────────────────────────────────────
    // MA000103 uses a single stream ('supported_employment') with Grades 1-7 plus A and B.
    // Grade A and B are transitional supported wage classifications.
    // We map Grade A → level 8, Grade B → level 9 for database storage.

    const classifications = [
      {
        level: 1, stream: 'supported_employment',
        title: 'Grade 1',
        description: 'Entry-level supported employment services employee.',
        duties: [
          'Performing basic tasks under direct supervision',
          'Assisting with routine work activities',
          'Following established procedures and instructions',
        ],
        indicative_tasks: ['Basic tasks', 'Routine duties under supervision'],
        sort_order: 10,
      },
      {
        level: 2, stream: 'supported_employment',
        title: 'Grade 2',
        description: 'Supported employment services employee with developing skills.',
        duties: [
          'Performing tasks with general supervision',
          'Developing skills in specific work areas',
          'Contributing to team work activities',
        ],
        indicative_tasks: ['Developing skills', 'General supervision tasks'],
        sort_order: 20,
      },
      {
        level: 3, stream: 'supported_employment',
        title: 'Grade 3',
        description: 'Competent supported employment services employee.',
        duties: [
          'Working with limited supervision in known tasks',
          'Applying established skills consistently',
          'Assisting less experienced employees',
        ],
        indicative_tasks: ['Competent tasks', 'Limited supervision work'],
        sort_order: 30,
      },
      {
        level: 4, stream: 'supported_employment',
        title: 'Grade 4',
        description: 'Experienced supported employment services employee with broader responsibilities.',
        duties: [
          'Performing a range of tasks independently',
          'Applying skills across multiple work areas',
          'May supervise small groups with guidance',
        ],
        indicative_tasks: ['Independent tasks', 'Multi-area work'],
        sort_order: 40,
      },
      {
        level: 5, stream: 'supported_employment',
        title: 'Grade 5',
        description: 'Senior supported employment services employee.',
        duties: [
          'Working independently across a range of activities',
          'Providing guidance to less experienced workers',
          'Contributing to process improvements',
        ],
        indicative_tasks: ['Senior duties', 'Guidance to others'],
        sort_order: 50,
      },
      {
        level: 6, stream: 'supported_employment',
        title: 'Grade 6',
        description: 'Advanced supported employment services employee with specialist skills.',
        duties: [
          'Performing specialist or complex tasks',
          'Supervising and coordinating work teams',
          'Contributing to planning and decision making',
        ],
        indicative_tasks: ['Specialist tasks', 'Team coordination'],
        sort_order: 60,
      },
      {
        level: 7, stream: 'supported_employment',
        title: 'Grade 7',
        description: 'Highest-level supported employment services employee.',
        duties: [
          'Leading and managing work teams',
          'Exercising significant judgement and expertise',
          'Contributing to strategic planning and operations',
        ],
        indicative_tasks: ['Team leadership', 'Strategic contribution'],
        sort_order: 70,
      },
      {
        level: 8, stream: 'supported_employment',
        title: 'Grade A (transitional — 1 July 2025 to 29 June 2026)',
        description: 'Transitional supported wage classification Grade A. Rates apply from 1 July 2025 to 29 June 2026.',
        duties: [
          'Performing supported work tasks',
          'Working under direct supervision with support',
        ],
        indicative_tasks: ['Supported work tasks'],
        sort_order: 80,
      },
      {
        level: 9, stream: 'supported_employment',
        title: 'Grade B (transitional — 1 July 2025 to 29 June 2026)',
        description: 'Transitional supported wage classification Grade B. Rates apply from 1 July 2025 to 29 June 2026.',
        duties: [
          'Performing supported work tasks with developing independence',
          'Working under supervision with support',
        ],
        indicative_tasks: ['Supported work tasks with developing independence'],
        sort_order: 90,
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
    // Source: FWO pay guide MA000103, effective 10 October 2025.
    // Casual rate = adult FT/PT rate × 1.25 (25% casual loading).
    // Grade A and B use transitional rates (1 July 2025 to 29 June 2026).
    const baseRates = {
      1: 24.28,
      2: 24.95,
      3: 25.85,
      4: 26.70,
      5: 28.12,
      6: 30.68,
      7: 31.92,
      8: 7.10,   // Grade A transitional
      9: 14.19,  // Grade B transitional
    };

    const casualRates = {
      1: 30.35,
      2: 31.19,
      3: 32.31,
      4: 33.38,
      5: 35.15,
      6: 38.35,
      7: 39.90,
      8: 8.88,   // Grade A casual transitional
      9: 17.74,  // Grade B casual transitional
    };

    const classResult = await client.query(
      'SELECT id, level, stream FROM classifications WHERE award_code = $1',
      [AWARD_CODE]
    );

    for (const cls of classResult.rows) {
      const baseRate = baseRates[cls.level];
      if (baseRate === undefined) continue;

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
    // Source: MA000103 — Penalty rates
    //
    // FT/PT penalty multipliers:
    //   Weekday ordinary:   ×1.0
    //   Saturday (6am-6pm): ×1.5
    //   Sunday (6am-6pm, non-catering): ×2.0
    //   Public holiday:     ×2.5
    //
    // Casual penalty multipliers (applied to casual base rate which already includes 25% loading):
    //   Saturday (6am-6pm): ×1.5
    //   Sunday (6am-6pm, non-catering): ×2.0
    //   Public holiday:     ×1.8 (casual OT rates imply this)
    //
    // Note: Catering employees get Sunday ×1.75 instead of ×2.0.
    // We use the non-catering (higher) rate as the standard penalty.

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
        description: 'Saturday (6am–6pm) — ×1.5',
      },
      {
        employment_type: 'full_time', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.0, addition_per_hour: null,
        description: 'Sunday (6am–6pm, non-catering) — ×2.0',
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
        description: 'Saturday (6am–6pm) — ×1.5',
      },
      {
        employment_type: 'part_time', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.0, addition_per_hour: null,
        description: 'Sunday (6am–6pm, non-catering) — ×2.0',
      },
      {
        employment_type: 'part_time', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.5, addition_per_hour: null,
        description: 'Public holiday — ×2.5',
      },
      // ── Casual ─────────────────────────────────────────────────────────────
      {
        employment_type: 'casual', day_type: 'weekday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.0, addition_per_hour: null,
        description: 'Ordinary casual weekday rate (includes 25% casual loading)',
      },
      {
        employment_type: 'casual', day_type: 'saturday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.5, addition_per_hour: null,
        description: 'Casual Saturday (6am–6pm) — ×1.5 of casual base',
      },
      {
        employment_type: 'casual', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.0, addition_per_hour: null,
        description: 'Casual Sunday (6am–6pm, non-catering) — ×2.0 of casual base',
      },
      {
        employment_type: 'casual', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.8, addition_per_hour: null,
        description: 'Casual public holiday — ×1.8 of casual base',
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
    // MA000103 — Overtime
    // Daily threshold 7.6hr: first 2hr ×1.5, after ×2.0
    // Weekly threshold 38hr: first 2hr ×1.5, after ×2.0
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
    // Source: MA000103; FWO pay guide effective 10 October 2025.
    const allowances = [
      {
        allowance_type: 'first_aid',
        name: 'First aid allowance',
        description: 'If you are designated as the first aid officer and hold a current first aid qualification, you are entitled to a weekly first aid allowance.',
        trigger_condition: 'Appointed as first aid officer with a current first aid certificate',
        amount: 21.69, amount_type: 'weekly', per_unit: 'per_week',
      },
      {
        allowance_type: 'laundry',
        name: 'Laundry allowance',
        description: 'If you are required to launder your own uniform or special clothing.',
        trigger_condition: 'Required to launder own uniform or special clothing',
        amount: 0.70, amount_type: 'fixed', per_unit: 'per_shift',
      },
      {
        allowance_type: 'leading_hand_small',
        name: 'Leading hand allowance (3–10 employees)',
        description: 'All-purpose allowance for Grade 4 and below employees in charge of 3–10 employees.',
        trigger_condition: 'Grade 4 or below, in charge of 3–10 employees',
        amount: 1.27, amount_type: 'hourly', per_unit: 'per_hour',
      },
      {
        allowance_type: 'leading_hand_medium',
        name: 'Leading hand allowance (11–20 employees)',
        description: 'All-purpose allowance for Grade 4 and below employees in charge of 11–20 employees.',
        trigger_condition: 'Grade 4 or below, in charge of 11–20 employees',
        amount: 1.90, amount_type: 'hourly', per_unit: 'per_hour',
      },
      {
        allowance_type: 'leading_hand_large',
        name: 'Leading hand allowance (more than 20 employees)',
        description: 'All-purpose allowance for Grade 4 and below employees in charge of more than 20 employees.',
        trigger_condition: 'Grade 4 or below, in charge of more than 20 employees',
        amount: 2.41, amount_type: 'hourly', per_unit: 'per_hour',
      },
      {
        allowance_type: 'meal',
        name: 'Meal allowance — overtime',
        description: 'If you are required to work overtime and a meal break is not provided, you are entitled to a meal allowance.',
        trigger_condition: 'Overtime worked and meal break not provided',
        amount: 14.06, amount_type: 'fixed', per_unit: 'per_shift',
      },
      {
        allowance_type: 'toilet_cleaning',
        name: 'Toilet cleaning allowance',
        description: 'Payable when required to clean toilets.',
        trigger_condition: 'Required to clean toilets',
        amount: 3.52, amount_type: 'fixed', per_unit: 'per_shift',
      },
      {
        allowance_type: 'vehicle_car',
        name: 'Vehicle allowance',
        description: 'If you are required to use your own vehicle for work purposes, you are entitled to a per-kilometre allowance.',
        trigger_condition: 'Using own vehicle for work purposes',
        amount: 0.98, amount_type: 'per_km', per_unit: 'per_km',
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
        question_key: 'ses_grade',
        question_text: 'What is your classification grade?',
        help_text: 'Select the grade that matches your employment classification. Grade A and Grade B are transitional supported wage classifications.',
        question_type: 'single',
        stream: null,
        parent_question_key: null,
        parent_answer_key: null,
        sort_order: 1,
        answers: [
          { answer_key: 'grade_1', answer_text: 'Grade 1', sort_order: 1 },
          { answer_key: 'grade_2', answer_text: 'Grade 2', sort_order: 2 },
          { answer_key: 'grade_3', answer_text: 'Grade 3', sort_order: 3 },
          { answer_key: 'grade_4', answer_text: 'Grade 4', sort_order: 4 },
          { answer_key: 'grade_5', answer_text: 'Grade 5', sort_order: 5 },
          { answer_key: 'grade_6', answer_text: 'Grade 6', sort_order: 6 },
          { answer_key: 'grade_7', answer_text: 'Grade 7', sort_order: 7 },
          { answer_key: 'grade_a', answer_text: 'Grade A (transitional supported wage)', sort_order: 8 },
          { answer_key: 'grade_b', answer_text: 'Grade B (transitional supported wage)', sort_order: 9 },
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
    console.log('\n✅ MA000103 seed complete');
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
