/**
 * Seed script — Food, Beverage and Tobacco Manufacturing Award 2020 [MA000073]
 * Pay rates effective 1 July 2025
 * Source: FWC MAPD API + FWO pay guide MA000073
 *
 * One stream:
 *   food_manufacturing — Level 1 through Level 6 (6 classifications)
 *
 * Adult FT/PT hourly rates (from API, base_rate_type = Hourly):
 *   L1: $24.28  L2: $24.95  L3: $25.85  L4: $26.70  L5: $28.12  L6: $29.00
 *
 * Casual rates = FT rate × 1.25
 *
 * Penalty rates:
 *   Saturday: ×1.50 (FT/PT and casual)
 *   Sunday: ×2.00 (FT/PT and casual)
 *   Public holiday: ×2.50 (FT/PT and casual)
 *
 * Overtime (daily threshold 7.6 hrs):
 *   First 3 OT hours: ×1.50, after 3 OT hours: ×2.00
 *
 * Junior rates: <16=36.8%, 16=47.3%, 17=57.8%, 18=68.3%, 19=82.5%, 20=97.7%
 *
 * Allowances:
 *   Meal (OT): $18.38, Vehicle: $0.98/km
 *
 * Run after migrate.js: node scripts/seed_ma000073.js
 */
require('dotenv').config();
const pool = require('../src/db/pool');

const AWARD_CODE = 'MA000073';
const EFFECTIVE_DATE = '2025-07-01';

async function seed() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // ── Award metadata ─────────────────────────────────────────────────────────
    await client.query(`
      INSERT INTO award_metadata (award_code, award_name, effective_date, source_url)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (award_code) DO UPDATE SET
        award_name = EXCLUDED.award_name,
        effective_date = EXCLUDED.effective_date,
        updated_at = NOW()
    `, [
      AWARD_CODE,
      'Food, Beverage and Tobacco Manufacturing Award 2020',
      EFFECTIVE_DATE,
      'https://awards.fairwork.gov.au/MA000073.html',
    ]);

    // ── Classifications ────────────────────────────────────────────────────────
    const classifications = [
      {
        level: 1, stream: 'food_manufacturing',
        fwc_id: 2663,
        title: 'Food Manufacturing Worker — Level 1',
        description: 'Entry-level food manufacturing worker performing basic tasks under direct supervision. No prior experience or qualifications required.',
        duties: [
          'Performing basic labouring, cleaning, and sanitation duties in a food manufacturing environment',
          'Assisting with packing, sorting, and basic material handling',
          'Carrying out unskilled repetitive tasks under direct supervision',
        ],
        indicative_tasks: ['Factory hand', 'Packer', 'Production line worker (entry)'],
        sort_order: 10,
      },
      {
        level: 2, stream: 'food_manufacturing',
        fwc_id: 2664,
        title: 'Food Manufacturing Worker — Level 2',
        description: 'Worker with some experience performing routine food manufacturing tasks under supervision.',
        duties: [
          'Operating basic production line machinery under supervision',
          'Performing routine quality checks on products',
          'Assisting with ingredient preparation and batch processing',
        ],
        indicative_tasks: ['Machine operator (basic)', 'Quality checker', 'Production worker'],
        sort_order: 20,
      },
      {
        level: 3, stream: 'food_manufacturing',
        fwc_id: 2665,
        title: 'Food Manufacturing Worker — Level 3',
        description: 'Worker performing a range of food manufacturing tasks with limited supervision. May hold relevant qualifications or have equivalent experience.',
        duties: [
          'Operating a range of production machinery and equipment',
          'Performing routine maintenance and cleaning of machinery',
          'Monitoring production processes and making basic adjustments',
        ],
        indicative_tasks: ['Machine operator', 'Production process worker', 'Stores worker'],
        sort_order: 30,
      },
      {
        level: 4, stream: 'food_manufacturing',
        fwc_id: 2666,
        title: 'Food Manufacturing Worker — Level 4',
        description: 'Experienced worker performing skilled food manufacturing tasks. May hold a trade qualification or equivalent.',
        duties: [
          'Setting up, operating, and adjusting complex production machinery',
          'Performing detailed quality assurance and testing procedures',
          'Coordinating work of lower-level production staff',
        ],
        indicative_tasks: ['Senior machine operator', 'Quality assurance worker', 'Leading hand'],
        sort_order: 40,
      },
      {
        level: 5, stream: 'food_manufacturing',
        fwc_id: 2667,
        title: 'Food Manufacturing Worker — Level 5',
        description: 'Tradesperson or specialist performing complex food manufacturing work with minimal supervision.',
        duties: [
          'Performing complex production, maintenance, or laboratory tasks',
          'Diagnosing and rectifying production faults independently',
          'Supervising production teams and coordinating workflow',
        ],
        indicative_tasks: ['Trade-qualified worker', 'Laboratory technician', 'Production supervisor'],
        sort_order: 50,
      },
      {
        level: 6, stream: 'food_manufacturing',
        fwc_id: 2668,
        title: 'Food Manufacturing Worker — Level 6',
        description: 'The highest classification for food manufacturing workers. Senior specialist with the highest level of skill, qualifications, and responsibility.',
        duties: [
          'Leading and managing production teams across shifts or departments',
          'Providing the highest level of technical oversight and quality control',
          'Designing and implementing production process improvements',
          'Mentoring and training lower-level workers',
        ],
        indicative_tasks: ['Senior production supervisor', 'Advanced trade worker', 'Process specialist'],
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

    // ── Pay rates ──────────────────────────────────────────────────────────────
    // Source: FWC MAPD API, base_rate_type = Hourly, effective 1 July 2025.
    // Casual rate = FT rate × 1.25.
    const baseRates = {
      food_manufacturing: { 1: 24.28, 2: 24.95, 3: 25.85, 4: 26.70, 5: 28.12, 6: 29.00 },
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

    // ── Penalty rates ──────────────────────────────────────────────────────────
    const penaltyRates = [
      // ── Full-time ───────────────────────────────────────────────────────────
      { employment_type: 'full_time',  day_type: 'weekday',        multiplier: 1.00, description: 'Weekday ordinary rate (×1.0)' },
      { employment_type: 'full_time',  day_type: 'saturday',       multiplier: 1.50, description: 'Saturday — time and a half (×1.5)' },
      { employment_type: 'full_time',  day_type: 'sunday',         multiplier: 2.00, description: 'Sunday — double time (×2.0)' },
      { employment_type: 'full_time',  day_type: 'public_holiday', multiplier: 2.50, description: 'Public holiday — double time and a half (×2.5)' },
      // ── Part-time ───────────────────────────────────────────────────────────
      { employment_type: 'part_time',  day_type: 'weekday',        multiplier: 1.00, description: 'Weekday ordinary rate (×1.0)' },
      { employment_type: 'part_time',  day_type: 'saturday',       multiplier: 1.50, description: 'Saturday — time and a half (×1.5)' },
      { employment_type: 'part_time',  day_type: 'sunday',         multiplier: 2.00, description: 'Sunday — double time (×2.0)' },
      { employment_type: 'part_time',  day_type: 'public_holiday', multiplier: 2.50, description: 'Public holiday — double time and a half (×2.5)' },
      // ── Casual ──────────────────────────────────────────────────────────────
      { employment_type: 'casual',     day_type: 'weekday',        multiplier: 1.00, description: 'Weekday ordinary casual rate (incl. 25% casual loading)' },
      { employment_type: 'casual',     day_type: 'saturday',       multiplier: 1.50, description: 'Saturday — casual time and a half (×1.5)' },
      { employment_type: 'casual',     day_type: 'sunday',         multiplier: 2.00, description: 'Sunday — casual double time (×2.0)' },
      { employment_type: 'casual',     day_type: 'public_holiday', multiplier: 2.50, description: 'Casual public holiday — ×2.50 of casual base (incl. loading)' },
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

    // ── Overtime rates ─────────────────────────────────────────────────────────
    // Daily threshold: 7.6 hours/day.
    // First 3 OT hours: ×1.50, after 3 OT hours: ×2.00.
    const overtimeRates = [
      { employment_type: 'full_time',  threshold_hours: 7.6,   period: 'daily', multiplier: 1.50, description: 'Daily OT — first 3 hours over 7.6 hrs/day (×1.50)' },
      { employment_type: 'full_time',  threshold_hours: 10.6,  period: 'daily', multiplier: 2.00, description: 'Daily OT — after 10.6 hrs/day (×2.00)' },
      { employment_type: 'part_time',  threshold_hours: 7.6,   period: 'daily', multiplier: 1.50, description: 'Part-time daily OT — first 3 hours over 7.6 hrs/day (×1.50)' },
      { employment_type: 'part_time',  threshold_hours: 10.6,  period: 'daily', multiplier: 2.00, description: 'Part-time daily OT — after 10.6 hrs/day (×2.00)' },
      { employment_type: 'casual',     threshold_hours: 7.6,   period: 'daily', multiplier: 1.50, description: 'Casual daily OT — first 3 hours over 7.6 hrs/day (×1.50)' },
      { employment_type: 'casual',     threshold_hours: 10.6,  period: 'daily', multiplier: 2.00, description: 'Casual daily OT — after 10.6 hrs/day (×2.00)' },
    ];

    await client.query(`DELETE FROM overtime_rates WHERE award_code = $1`, [AWARD_CODE]);

    for (const r of overtimeRates) {
      await client.query(`
        INSERT INTO overtime_rates (award_code, employment_type, threshold_hours, period, multiplier, description, effective_date)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
      `, [AWARD_CODE, r.employment_type, r.threshold_hours, r.period, r.multiplier, r.description, EFFECTIVE_DATE]);
    }
    console.log(`✓ Inserted ${overtimeRates.length} overtime rules`);

    // ── Allowances ─────────────────────────────────────────────────────────────
    const allowances = [
      {
        allowance_type: 'meal',
        name: 'Meal allowance (overtime)',
        description: 'If you work overtime for more than 1.5 hours and your employer did not give you notice the day before, you are entitled to a meal allowance of $18.38.',
        trigger_condition: 'Overtime of more than 1.5 hours without notice',
        amount: 18.38, amount_type: 'fixed', per_unit: 'per_meal',
        is_all_purpose: false,
      },
      {
        allowance_type: 'vehicle',
        name: 'Vehicle allowance',
        description: 'If you are required to use your own vehicle for work purposes, you are entitled to $0.98 per kilometre.',
        trigger_condition: 'Required to use own vehicle for work',
        amount: 0.98, amount_type: 'per_km', per_unit: 'per_km',
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

    // ── Break entitlements ─────────────────────────────────────────────────────
    const breaks = [
      {
        employment_type: null,
        shift_hours_min: 5.0, shift_hours_max: null,
        break_type: 'meal', break_duration_min: 30, is_paid: false,
        timing_rule: 'No earlier than 1 hour and no later than 6 hours after starting work',
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

    // ── Classification questions ───────────────────────────────────────────────
    const questions = [
      {
        question_key: 'food_mfg_level',
        question_text: 'What level best describes your food manufacturing role?',
        help_text: 'Your level depends on your experience, qualifications, and the type of food manufacturing work you perform. Level 1 is entry-level. Level 6 is the highest classification for senior specialists and supervisors.',
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

    // ── Classification answers ─────────────────────────────────────────────────
    const questionIds = {};
    const qResult = await client.query(
      'SELECT id, question_key FROM classification_questions WHERE award_code = $1',
      [AWARD_CODE]
    );
    qResult.rows.forEach(r => { questionIds[r.question_key] = r.id; });

    const answers = [
      { question_key: 'food_mfg_level', answer_key: 'l1', answer_text: 'Level 1 — Entry-level, basic labouring and packing', sort_order: 1 },
      { question_key: 'food_mfg_level', answer_key: 'l2', answer_text: 'Level 2 — Routine tasks, basic machine operation', sort_order: 2 },
      { question_key: 'food_mfg_level', answer_key: 'l3', answer_text: 'Level 3 — Range of production tasks with limited supervision', sort_order: 3 },
      { question_key: 'food_mfg_level', answer_key: 'l4', answer_text: 'Level 4 — Skilled work, complex machinery, quality assurance', sort_order: 4 },
      { question_key: 'food_mfg_level', answer_key: 'l5', answer_text: 'Level 5 — Tradesperson or specialist, supervisory duties', sort_order: 5 },
      { question_key: 'food_mfg_level', answer_key: 'l6', answer_text: 'Level 6 — Senior specialist or production supervisor (highest)', sort_order: 6 },
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

seed().catch(() => process.exit(1));
