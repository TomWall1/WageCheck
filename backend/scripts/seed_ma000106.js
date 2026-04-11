/**
 * Seed script — Real Estate Industry Award 2020 [MA000106]
 * Pay rates effective 1 July 2025 (following 2025 Annual Wage Review — 3.5% increase)
 * Source: Fair Work Ombudsman pay guide MA000106, effective 1 July 2025
 *
 * Run after migrate.js: node scripts/seed_ma000106.js
 */
require('dotenv').config();
const pool = require('../src/db/pool');

const AWARD_CODE = 'MA000106';
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
      'Real Estate Industry Award 2020',
      EFFECTIVE_DATE,
      'https://www.fairwork.gov.au/employment-conditions/awards/awards-summary/ma000106-summary',
    ]);

    // ── Classifications ───────────────────────────────────────────────────────
    // MA000106 uses a single stream ('real_estate') with 5 levels.

    const classifications = [
      {
        level: 1, stream: 'real_estate',
        title: 'Real Estate Employee Level 1',
        description: 'Associate level — first 12 months at this level. You perform basic real estate duties while learning the role.',
        duties: [
          'Assisting with property inspections and open homes under supervision',
          'Performing basic administrative and reception duties',
          'Answering phones and directing enquiries',
          'Preparing basic correspondence and documentation',
          'Maintaining property listings and databases under direction',
          'General office duties including filing and data entry',
        ],
        indicative_tasks: ['Real estate assistant (new)', 'Office junior', 'Receptionist (first 12 months)'],
        sort_order: 10,
      },
      {
        level: 2, stream: 'real_estate',
        title: 'Real Estate Employee Level 2',
        description: 'Associate level — after first 12 months. You have at least 12 months experience and perform duties competently with limited supervision.',
        duties: [
          'Conducting property inspections and open homes independently',
          'Preparing property listings and marketing materials',
          'Handling tenant and landlord enquiries independently',
          'Processing rental applications and lease documentation',
          'Maintaining trust account records under supervision',
          'Assisting with property management tasks',
        ],
        indicative_tasks: ['Real estate assistant (experienced)', 'Property management assistant', 'Receptionist (after 12 months)'],
        sort_order: 20,
      },
      {
        level: 3, stream: 'real_estate',
        title: 'Real Estate Employee Level 3',
        description: 'Representative level. You perform sales or property management duties requiring industry knowledge and client relationship skills.',
        duties: [
          'Listing and selling properties or managing a property portfolio',
          'Conducting property appraisals and market assessments',
          'Negotiating sales, leases, and rental agreements',
          'Managing landlord and tenant relationships',
          'Preparing contracts and coordinating settlements',
          'Marketing properties and conducting prospecting activities',
        ],
        indicative_tasks: ['Sales agent', 'Property manager', 'Leasing consultant', 'Business development manager'],
        sort_order: 30,
      },
      {
        level: 4, stream: 'real_estate',
        title: 'Real Estate Employee Level 4',
        description: 'Supervisory level. You supervise other employees and have responsibility for a team or operational area.',
        duties: [
          'Supervising and mentoring junior staff members',
          'Overseeing day-to-day office operations in a section',
          'Reviewing and approving contracts and documentation',
          'Managing key client relationships and escalated issues',
          'Training and inducting new employees',
          'Reporting on team performance to management',
        ],
        indicative_tasks: ['Senior agent', 'Team leader', 'Senior property manager', 'Department supervisor'],
        sort_order: 40,
      },
      {
        level: 5, stream: 'real_estate',
        title: 'Real Estate Employee Level 5',
        description: 'In-charge level. You are responsible for the overall management and operation of an office or significant business unit.',
        duties: [
          'Managing the overall operations of an office or branch',
          'Full responsibility for staffing, recruitment, and performance management',
          'Setting and monitoring business targets and budgets',
          'Ensuring compliance with real estate legislation and regulations',
          'Managing trust accounts and financial reporting',
          'Strategic planning and business development at the office level',
        ],
        indicative_tasks: ['Office manager', 'Principal', 'Branch manager', 'Operations manager'],
        sort_order: 50,
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
    // Source: FWO pay guide MA000106, effective 1 July 2025.
    // Casual rate = adult FT/PT rate × 1.25 (25% casual loading).
    const baseRates = {
      1: 25.39,
      2: 26.73,
      3: 28.12,
      4: 30.93,
      5: 32.34,
    };

    const casualRates = {
      1: 31.74,
      2: 33.41,
      3: 35.15,
      4: 38.66,
      5: 40.43,
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
    // Source: MA000106 — Real Estate Industry Award 2020
    //
    // FT/PT penalty multipliers:
    //   No Saturday penalties (ordinary hours can be worked any day Mon–Sun)
    //   No Sunday penalties
    //   Public holiday: ×2.0
    //
    // Casual penalty multipliers (applied to casual base rate which already includes 25% loading):
    //   Public holiday: ×2.0 of casual rate

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
        multiplier: 1.0, addition_per_hour: null,
        description: 'Saturday — ordinary rate (no penalty)',
      },
      {
        employment_type: 'full_time', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.0, addition_per_hour: null,
        description: 'Sunday — ordinary rate (no penalty)',
      },
      {
        employment_type: 'full_time', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.0, addition_per_hour: null,
        description: 'Public holiday — double time (×2.0)',
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
        multiplier: 1.0, addition_per_hour: null,
        description: 'Saturday — ordinary rate (no penalty)',
      },
      {
        employment_type: 'part_time', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.0, addition_per_hour: null,
        description: 'Sunday — ordinary rate (no penalty)',
      },
      {
        employment_type: 'part_time', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.0, addition_per_hour: null,
        description: 'Public holiday — double time (×2.0)',
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
        multiplier: 1.0, addition_per_hour: null,
        description: 'Casual Saturday — ordinary rate (no penalty)',
      },
      {
        employment_type: 'casual', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.0, addition_per_hour: null,
        description: 'Casual Sunday — ordinary rate (no penalty)',
      },
      {
        employment_type: 'casual', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.0, addition_per_hour: null,
        description: 'Casual public holiday — ×2.0 of casual rate',
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
    // MA000106 — Overtime
    // Daily threshold 7.6hr: first 2 hours ×1.5, thereafter ×2.0
    // Weekly threshold 38hr: first 2 hours ×1.5, thereafter ×2.0
    const overtimeRates = [
      // ── Full-time ─────────────────────────────────────────────────────────
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
      // ── Part-time ─────────────────────────────────────────────────────────
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
      // ── Casual ────────────────────────────────────────────────────────────
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
    // Source: MA000106 — Real Estate Industry Award 2020; FWO pay guide effective 1 July 2025.
    const allowances = [
      {
        allowance_type: 'vehicle_car',
        name: 'Vehicle allowance (car)',
        description: 'If you are required to use your own car for work purposes, you are entitled to a per-kilometre allowance.',
        trigger_condition: 'Using own car for work purposes',
        amount: 0.98, amount_type: 'per_km', per_unit: 'per_km',
      },
      {
        allowance_type: 'vehicle_motorcycle',
        name: 'Vehicle allowance (motorcycle)',
        description: 'If you are required to use your own motorcycle for work purposes, you are entitled to a per-kilometre allowance.',
        trigger_condition: 'Using own motorcycle for work purposes',
        amount: 0.33, amount_type: 'per_km', per_unit: 'per_km',
      },
      {
        allowance_type: 'mobile_phone',
        name: 'Mobile phone allowance',
        description: 'If you are required to use your own mobile phone for work purposes, you are entitled to a monthly allowance of 50% of the plan cost (up to a maximum of $100 per month).',
        trigger_condition: 'Required to use own mobile phone for work',
        amount: 50.00, amount_type: 'monthly', per_unit: 'per_month',
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
    // MA000106 — Breaks
    // Rest break: 10 min paid per 4 hours worked
    // Meal break: 30 min unpaid after 5 hours of continuous work
    const breaks = [
      {
        employment_type: null,
        shift_hours_min: 4.0, shift_hours_max: null,
        break_type: 'rest', break_duration_min: 10, is_paid: true,
        timing_rule: 'One paid 10-minute rest break per 4 hours worked',
        description: 'If you work 4 hours or more, you are entitled to a paid 10-minute rest break.',
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
    // Single parent-gated question for MA000106:
    //   Q1: re_level — "What is your classification level?"
    const questions = [
      {
        award_code: AWARD_CODE,
        question_key: 're_level',
        question_text: 'What is your classification level?',
        help_text: 'Choose the option that best matches your current role and experience in the real estate industry.',
        question_type: 'single',
        stream: null,
        parent_question_key: null,
        parent_answer_key: null,
        sort_order: 1,
        answers: [
          { answer_key: 'associate_first12', answer_text: 'Associate level — first 12 months at this level', sort_order: 1 },
          { answer_key: 'associate_after12', answer_text: 'Associate level — after first 12 months', sort_order: 2 },
          { answer_key: 'representative', answer_text: 'Representative level (e.g. sales agent, property manager)', sort_order: 3 },
          { answer_key: 'supervisory', answer_text: 'Supervisory level (e.g. senior agent, team leader)', sort_order: 4 },
          { answer_key: 'in_charge', answer_text: 'In-charge level (e.g. office manager, principal)', sort_order: 5 },
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
    console.log('\n✅ MA000106 seed complete');
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
