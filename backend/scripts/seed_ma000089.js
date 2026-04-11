/**
 * Seed script — Vehicle Repair, Services and Retail Award 2020 [MA000089]
 * Pay rates effective 1 July 2025
 * Source: FWC MAPD API + FWO pay guide MA000089
 *
 * One stream:
 *   vehicle_repair — Level 1 (RSR1) through Level 7 (RSR7) (7 classifications)
 *
 * Adult FT/PT hourly rates (from API, base_rate_type = Hourly):
 *   L1: ~$25.40   L2: ~$26.07   L3: ~$26.70   L4: ~$27.06
 *   L5: ~$28.12   L6: ~$29.35   L7: ~$30.68
 *
 * Casual rates = FT rate x 1.25
 *
 * Penalty rates:
 *   FT/PT: Sat x1.50, Sun x2.00, PH x2.50
 *   Casual: Sat x1.50, Sun x2.00, PH x2.50
 *
 * Overtime (daily threshold 7.6 hrs):
 *   First 2 OT hours: x1.50, after 2 OT hours: x2.00
 *
 * Junior rates: <16=42%, 16=47%, 17=55%, 18=75%, 19=95%, 20=100%
 *
 * Allowances:
 *   Meal: $17.93/meal, Tool (apprentice L1): $5.88/wk, Tool (apprentice L4): $12.14/wk
 *
 * Run after migrate.js: node scripts/seed_ma000089.js
 */
require('dotenv').config();
const pool = require('../src/db/pool');

const AWARD_CODE = 'MA000089';
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
      'Vehicle Repair, Services and Retail Award 2020',
      EFFECTIVE_DATE,
      'https://awards.fairwork.gov.au/MA000089.html',
    ]);

    // ── Classifications ────────────────────────────────────────────────────────
    const classifications = [
      {
        level: 1, stream: 'vehicle_repair',
        fwc_id: null,
        title: 'Level 1 (RSR1) — Vehicle Industry Employee',
        description: 'Entry-level employee performing basic duties under direct supervision. No trade qualification required.',
        duties: [
          'Performing general cleaning and tidying of workshop and yard areas',
          'Assisting qualified mechanics with basic tasks such as fetching parts and tools',
          'Carrying out basic vehicle washing and detailing duties',
          'Performing routine manual handling and parts sorting',
        ],
        indicative_tasks: ['Workshop assistant', 'Car detailer', 'Parts runner', 'Yard hand'],
        sort_order: 10,
      },
      {
        level: 2, stream: 'vehicle_repair',
        fwc_id: null,
        title: 'Level 2 (RSR2) — Vehicle Industry Employee',
        description: 'Employee with some experience performing a range of tasks with limited supervision.',
        duties: [
          'Performing basic servicing tasks such as oil changes and tyre rotations',
          'Operating parts counter and assisting customers with basic enquiries',
          'Performing inventory management and stock control duties',
          'Carrying out basic administrative tasks in a vehicle repair environment',
        ],
        indicative_tasks: ['Service assistant', 'Parts interpreter (junior)', 'Retail sales assistant', 'Service writer (basic)'],
        sort_order: 20,
      },
      {
        level: 3, stream: 'vehicle_repair',
        fwc_id: null,
        title: 'Level 3 (RSR3) — Vehicle Industry Employee',
        description: 'Employee with relevant qualifications or significant experience performing skilled tasks.',
        duties: [
          'Performing mechanical repairs and servicing under supervision',
          'Diagnosing basic vehicle faults using standard equipment',
          'Providing customer service including quoting and booking vehicles',
          'Operating specialised workshop equipment',
        ],
        indicative_tasks: ['Mechanic (under supervision)', 'Service advisor', 'Parts interpreter', 'Panel beater (junior)'],
        sort_order: 30,
      },
      {
        level: 4, stream: 'vehicle_repair',
        fwc_id: null,
        title: 'Level 4 (RSR4) — Vehicle Industry Employee',
        description: 'Qualified tradesperson performing skilled work with a trade certificate or equivalent.',
        duties: [
          'Performing full mechanical repairs and servicing independently',
          'Diagnosing complex vehicle faults and recommending repairs',
          'Operating advanced diagnostic equipment and tools',
          'Training and mentoring junior staff and apprentices',
        ],
        indicative_tasks: ['Qualified mechanic', 'Panel beater', 'Spray painter', 'Auto electrician'],
        sort_order: 40,
      },
      {
        level: 5, stream: 'vehicle_repair',
        fwc_id: null,
        title: 'Level 5 (RSR5) — Vehicle Industry Employee',
        description: 'Advanced tradesperson with additional qualifications or specialist skills beyond a basic trade certificate.',
        duties: [
          'Performing advanced diagnostic and repair work on complex vehicle systems',
          'Specialising in particular vehicle types or systems (e.g., fuel injection, air conditioning)',
          'Providing technical guidance to other tradespeople',
          'Overseeing quality control of repair work',
        ],
        indicative_tasks: ['Senior mechanic', 'Diagnostic specialist', 'Fuel injection specialist', 'Air conditioning technician'],
        sort_order: 50,
      },
      {
        level: 6, stream: 'vehicle_repair',
        fwc_id: null,
        title: 'Level 6 (RSR6) — Vehicle Industry Employee',
        description: 'Highly skilled specialist or supervisor with advanced qualifications and significant industry experience.',
        duties: [
          'Supervising workshop operations and staff',
          'Performing the most complex diagnostic and repair work',
          'Managing workflow, scheduling, and quality assurance',
          'Training staff and ensuring compliance with industry standards',
        ],
        indicative_tasks: ['Workshop foreman', 'Senior specialist', 'Technical supervisor', 'Master technician'],
        sort_order: 60,
      },
      {
        level: 7, stream: 'vehicle_repair',
        fwc_id: null,
        title: 'Level 7 (RSR7) — Vehicle Industry Employee',
        description: 'The most senior classification. You manage workshop operations or provide the highest level of technical expertise.',
        duties: [
          'Managing all workshop operations and overseeing all staff',
          'Providing expert-level technical advice and problem resolution',
          'Developing and implementing workshop procedures and standards',
          'Managing customer relations, budgets, and business planning',
        ],
        indicative_tasks: ['Workshop manager', 'Service manager', 'Chief technician', 'Operations manager'],
        sort_order: 70,
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
    // Casual rate = FT rate x 1.25.
    const baseRates = {
      vehicle_repair: { 1: 25.40, 2: 26.07, 3: 26.70, 4: 27.06, 5: 28.12, 6: 29.35, 7: 30.68 },
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
      { employment_type: 'casual',     day_type: 'saturday',       multiplier: 1.50, description: 'Saturday — time and a half (×1.5 of casual base)' },
      { employment_type: 'casual',     day_type: 'sunday',         multiplier: 2.00, description: 'Sunday — double time (×2.0 of casual base)' },
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
    // First 2 OT hours: x1.50, after 2 OT hours: x2.00.
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
        description: 'If you work overtime for more than 2 hours and your employer did not give you notice the day before, you are entitled to a meal allowance of $17.93.',
        trigger_condition: 'Overtime of more than 2 hours without notice',
        amount: 17.93, amount_type: 'fixed', per_unit: 'per_meal',
        is_all_purpose: false,
      },
      {
        allowance_type: 'tool_apprentice_l1',
        name: 'Tool allowance (apprentice — 1st & 2nd year)',
        description: 'If you are an apprentice in your 1st or 2nd year and are required to supply your own tools, you are entitled to $5.88 per week.',
        trigger_condition: 'Apprentice (1st/2nd year) required to supply own tools',
        amount: 5.88, amount_type: 'fixed', per_unit: 'per_week',
        is_all_purpose: false,
      },
      {
        allowance_type: 'tool_apprentice_l4',
        name: 'Tool allowance (apprentice — 3rd & 4th year)',
        description: 'If you are an apprentice in your 3rd or 4th year and are required to supply your own tools, you are entitled to $12.14 per week.',
        trigger_condition: 'Apprentice (3rd/4th year) required to supply own tools',
        amount: 12.14, amount_type: 'fixed', per_unit: 'per_week',
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
        timing_rule: 'No later than 5 hours after starting work',
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
        question_key: 'vehicle_repair_level',
        question_text: 'What is your vehicle industry employee level?',
        help_text: 'Your level depends on your qualifications, trade certification, and the complexity of your work. Level 1 is entry-level. Level 4 is a qualified tradesperson. Level 7 is a workshop manager or senior specialist.',
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
      { question_key: 'vehicle_repair_level', answer_key: 'l1', answer_text: 'Level 1 (RSR1) — Entry-level (workshop assistant, car detailer, yard hand)', sort_order: 1 },
      { question_key: 'vehicle_repair_level', answer_key: 'l2', answer_text: 'Level 2 (RSR2) — Some experience (service assistant, parts interpreter junior, retail sales)', sort_order: 2 },
      { question_key: 'vehicle_repair_level', answer_key: 'l3', answer_text: 'Level 3 (RSR3) — Skilled (mechanic under supervision, service advisor, parts interpreter)', sort_order: 3 },
      { question_key: 'vehicle_repair_level', answer_key: 'l4', answer_text: 'Level 4 (RSR4) — Qualified tradesperson (mechanic, panel beater, spray painter, auto electrician)', sort_order: 4 },
      { question_key: 'vehicle_repair_level', answer_key: 'l5', answer_text: 'Level 5 (RSR5) — Advanced tradesperson (senior mechanic, diagnostic specialist)', sort_order: 5 },
      { question_key: 'vehicle_repair_level', answer_key: 'l6', answer_text: 'Level 6 (RSR6) — Specialist/supervisor (workshop foreman, master technician)', sort_order: 6 },
      { question_key: 'vehicle_repair_level', answer_key: 'l7', answer_text: 'Level 7 (RSR7) — Most senior (workshop manager, service manager, operations manager)', sort_order: 7 },
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
