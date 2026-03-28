/**
 * Seed script — Plumbing and Fire Sprinklers Award 2020 [MA000036]
 * Pay rates effective 1 July 2025
 * Source: FWC MAPD API + FWO pay guide MA000036
 *
 * One stream:
 *   plumbing — Level 1 through Advanced Tradesperson L2 (8 classifications)
 *
 * Adult FT/PT hourly rates (from API, base_rate_type = Hourly):
 *   L1: ~$24.95  L2: ~$25.85  L3: ~$26.70  L4: ~$28.12
 *   L5: ~$29.00  L6: ~$30.68  L7: ~$31.50  L8: ~$32.90
 *
 * Casual rates = FT rate × 1.25
 *
 * Penalty rates:
 *   Saturday: ×1.50 (FT/PT), ×1.75 (casual)
 *   Sunday: ×2.00 (FT/PT and casual)
 *   Public holiday: ×2.50 (FT/PT and casual)
 *
 * Overtime (daily threshold 7.6 hrs):
 *   First 2 OT hours: ×1.50, after 2 OT hours: ×2.00
 *
 * Junior rates: None (trades — apprentice rates separate)
 *
 * Allowances:
 *   Meal (OT): $16.99, Vehicle: $0.98/km
 *
 * Run after migrate.js: node scripts/seed_ma000036.js
 */
require('dotenv').config();
const pool = require('../src/db/pool');

const AWARD_CODE = 'MA000036';
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
      'Plumbing and Fire Sprinklers Award 2020',
      EFFECTIVE_DATE,
      'https://awards.fairwork.gov.au/MA000036.html',
    ]);

    // ── Classifications ────────────────────────────────────────────────────────
    const classifications = [
      {
        level: 1, stream: 'plumbing',
        fwc_id: null,
        title: 'Plumbing Worker — Level 1 (New Entrant)',
        description: 'Entry-level plumbing worker with no prior experience or qualifications. Performs basic tasks under direct supervision.',
        duties: [
          'Performing basic labouring and cleaning duties on plumbing worksites',
          'Assisting qualified plumbers with material handling and transport',
          'Carrying out unskilled tasks under direct supervision',
        ],
        indicative_tasks: ['Plumbing labourer', 'New entrant'],
        sort_order: 10,
      },
      {
        level: 2, stream: 'plumbing',
        fwc_id: null,
        title: 'Plumbing Worker — Level 2',
        description: 'Worker with some experience performing routine plumbing tasks under supervision.',
        duties: [
          'Performing routine plumbing assembly and fitting tasks under supervision',
          'Assisting with pipe installation, drainage work, and basic connections',
          'Maintaining tools and equipment in good working order',
        ],
        indicative_tasks: ['Plumbing assistant', 'Drainage worker (trainee)'],
        sort_order: 20,
      },
      {
        level: 3, stream: 'plumbing',
        fwc_id: null,
        title: 'Plumbing Worker — Level 3',
        description: 'Worker performing a range of plumbing tasks with limited supervision. May hold relevant qualifications or have equivalent experience.',
        duties: [
          'Performing a range of plumbing installation and maintenance tasks',
          'Reading basic plumbing plans and diagrams',
          'Operating standard plumbing tools and equipment',
        ],
        indicative_tasks: ['Plumbing worker', 'Mechanical services installer'],
        sort_order: 30,
      },
      {
        level: 4, stream: 'plumbing',
        fwc_id: null,
        title: 'Plumbing Worker — Level 4 (Tradesperson)',
        description: 'Qualified tradesperson performing skilled plumbing work. Holds a trade qualification in plumbing or equivalent.',
        duties: [
          'Performing skilled plumbing installation, maintenance, and repair work',
          'Interpreting plumbing plans and specifications',
          'Conducting fault finding and diagnostic procedures on plumbing systems',
        ],
        indicative_tasks: ['Qualified plumber', 'Licensed plumber'],
        sort_order: 40,
      },
      {
        level: 5, stream: 'plumbing',
        fwc_id: null,
        title: 'Plumbing Worker — Level 5',
        description: 'Experienced tradesperson performing complex plumbing work with minimal supervision.',
        duties: [
          'Performing complex plumbing installations and commissioning',
          'Diagnosing and rectifying plumbing faults independently',
          'Supervising lower-level workers on assigned tasks',
        ],
        indicative_tasks: ['Senior plumber', 'Fire sprinkler fitter'],
        sort_order: 50,
      },
      {
        level: 6, stream: 'plumbing',
        fwc_id: null,
        title: 'Plumbing Worker — Level 6',
        description: 'Specialist tradesperson with additional skills or qualifications beyond standard trade level.',
        duties: [
          'Performing advanced plumbing and mechanical services work',
          'Providing technical guidance to other tradespersons',
          'Working on specialised systems such as medical gas, fire sprinkler, or HVAC',
        ],
        indicative_tasks: ['Specialist plumber', 'Mechanical services technician'],
        sort_order: 60,
      },
      {
        level: 7, stream: 'plumbing',
        fwc_id: null,
        title: 'Plumbing Worker — Advanced Tradesperson Level 1',
        description: 'Advanced tradesperson with significant additional qualifications and experience. Performs highly skilled work and may supervise teams.',
        duties: [
          'Performing highly skilled plumbing and mechanical services installations',
          'Designing and planning plumbing solutions for complex projects',
          'Leading small teams of plumbing workers on technical matters',
        ],
        indicative_tasks: ['Advanced plumber L1', 'Lead fire sprinkler fitter'],
        sort_order: 70,
      },
      {
        level: 8, stream: 'plumbing',
        fwc_id: null,
        title: 'Plumbing Worker — Advanced Tradesperson Level 2',
        description: 'The highest classification for plumbing workers. Senior advanced tradesperson with the highest level of skill, qualifications, and responsibility.',
        duties: [
          'Leading and managing plumbing teams on major projects',
          'Providing the highest level of technical oversight and quality control',
          'Designing, commissioning, and certifying complex plumbing systems',
          'Acting as the primary technical authority on plumbing matters',
        ],
        indicative_tasks: ['Senior advanced plumber', 'Principal plumbing technician'],
        sort_order: 80,
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
        INSERT INTO classifications (award_code, level, stream, title, description, duties, indicative_tasks, sort_order, fwc_classification_fixed_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        ON CONFLICT (award_code, level, stream) DO UPDATE SET
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
      plumbing: { 1: 24.95, 2: 25.85, 3: 26.70, 4: 28.12, 5: 29.00, 6: 30.68, 7: 31.50, 8: 32.90 },
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
      { employment_type: 'casual',     day_type: 'saturday',       multiplier: 1.75, description: 'Saturday — casual ×1.75 (incl. loading)' },
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
    // First 2 OT hours: ×1.50, after 2 OT hours: ×2.00.
    const overtimeRates = [
      { employment_type: 'full_time',  threshold_hours: 7.6,  period: 'daily', multiplier: 1.50, description: 'Daily OT — first 2 hours over 7.6 hrs/day (×1.50)' },
      { employment_type: 'full_time',  threshold_hours: 9.6,  period: 'daily', multiplier: 2.00, description: 'Daily OT — after 9.6 hrs/day (×2.00)' },
      { employment_type: 'part_time',  threshold_hours: 7.6,  period: 'daily', multiplier: 1.50, description: 'Part-time daily OT — first 2 hours over 7.6 hrs/day (×1.50)' },
      { employment_type: 'part_time',  threshold_hours: 9.6,  period: 'daily', multiplier: 2.00, description: 'Part-time daily OT — after 9.6 hrs/day (×2.00)' },
      { employment_type: 'casual',     threshold_hours: 7.6,  period: 'daily', multiplier: 1.50, description: 'Casual daily OT — first 2 hours over 7.6 hrs/day (×1.50)' },
      { employment_type: 'casual',     threshold_hours: 9.6,  period: 'daily', multiplier: 2.00, description: 'Casual daily OT — after 9.6 hrs/day (×2.00)' },
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
        description: 'If you work overtime for more than 1.5 hours and your employer did not give you notice the day before, you are entitled to a meal allowance of $16.99.',
        trigger_condition: 'Overtime of more than 1.5 hours without notice',
        amount: 16.99, amount_type: 'fixed', per_unit: 'per_meal',
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
        question_key: 'plumbing_level',
        question_text: 'What level best describes your plumbing worker role?',
        help_text: 'Your level depends on your experience, qualifications, and the type of plumbing work you perform. Level 1 is for new entrants. Level 4 is tradesperson level. Levels 7-8 are advanced tradesperson classifications.',
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
      { question_key: 'plumbing_level', answer_key: 'l1', answer_text: 'Level 1 — New entrant, no prior experience', sort_order: 1 },
      { question_key: 'plumbing_level', answer_key: 'l2', answer_text: 'Level 2 — Some experience, routine tasks under supervision', sort_order: 2 },
      { question_key: 'plumbing_level', answer_key: 'l3', answer_text: 'Level 3 — Range of plumbing tasks with limited supervision', sort_order: 3 },
      { question_key: 'plumbing_level', answer_key: 'l4', answer_text: 'Level 4 — Qualified tradesperson (licensed plumber)', sort_order: 4 },
      { question_key: 'plumbing_level', answer_key: 'l5', answer_text: 'Level 5 — Experienced tradesperson, complex work', sort_order: 5 },
      { question_key: 'plumbing_level', answer_key: 'l6', answer_text: 'Level 6 — Specialist tradesperson with additional skills', sort_order: 6 },
      { question_key: 'plumbing_level', answer_key: 'l7', answer_text: 'Level 7 — Advanced tradesperson Level 1', sort_order: 7 },
      { question_key: 'plumbing_level', answer_key: 'l8', answer_text: 'Level 8 — Advanced tradesperson Level 2 (highest)', sort_order: 8 },
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
