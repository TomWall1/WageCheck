/**
 * Seed script — Timber Industry Award 2020 [MA000044]
 * Pay rates effective 1 July 2025
 * Source: FWC MAPD API + FWO pay guide MA000044
 *
 * One stream:
 *   timber — Levels 1–6 (6 classifications)
 *
 * Adult FT/PT hourly rates:
 *   L1: $25.44   L2: $26.27   L3: $27.04   L4: $28.26
 *   L5: $29.62   L6: $31.18
 *
 * Casual rates = FT rate × 1.25
 *
 * Penalty rates:
 *   Saturday: ×1.50 (FT/PT), ×1.50 (casual)
 *   Sunday: ×2.00 (FT/PT), ×2.00 (casual)
 *   Public holiday: ×2.50 (FT/PT), ×2.50 (casual)
 *
 * Overtime (daily threshold 7.6 hrs):
 *   First 2 OT hours: ×1.50, after 2 OT hours: ×2.00
 *
 * Junior rates:
 *   Under 16: 45%, 16: 50%, 17: 60%, 18: 70%, 19: 80%, 20: 90%, 21+: 100%
 *
 * Allowances:
 *   Meal: $20.96 (OT >2hrs), First aid: $16.78/week
 *
 * Run after migrate.js: node scripts/seed_ma000044.js
 */
require('dotenv').config();
const pool = require('../src/db/pool');

const AWARD_CODE = 'MA000044';
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
      'Timber Industry Award 2020',
      EFFECTIVE_DATE,
      'https://awards.fairwork.gov.au/MA000044.html',
    ]);

    // ── Classifications ────────────────────────────────────────────────────────
    const classifications = [
      {
        level: 1, stream: 'timber',
        fwc_id: null,
        title: 'Timber Industry Level 1',
        description: 'Entry-level timber worker. You perform basic yard and mill tasks under direct supervision.',
        duties: [
          'Performing basic yard duties including stacking, sorting, and moving timber',
          'Assisting with loading and unloading timber products',
          'Carrying out general cleaning and housekeeping in mill and yard areas',
          'Following established procedures and safety instructions under supervision',
        ],
        indicative_tasks: ['Yard hand', 'Mill labourer', 'Timber stacker'],
        sort_order: 10,
      },
      {
        level: 2, stream: 'timber',
        fwc_id: null,
        title: 'Timber Industry Level 2',
        description: 'Experienced timber worker. You operate basic machinery and perform a range of tasks with limited supervision.',
        duties: [
          'Operating basic machinery such as docking saws and nail guns',
          'Grading and tallying timber products to established standards',
          'Operating forklifts and other materials handling equipment',
          'Performing routine maintenance checks on equipment',
        ],
        indicative_tasks: ['Forklift operator', 'Timber grader (basic)', 'Machine operator (entry)'],
        sort_order: 20,
      },
      {
        level: 3, stream: 'timber',
        fwc_id: null,
        title: 'Timber Industry Level 3',
        description: 'Skilled operator. You operate sawmill and processing equipment and work with minimal supervision on routine tasks.',
        duties: [
          'Operating sawmill equipment including log carriages and edgers',
          'Setting up and adjusting processing equipment for different products',
          'Performing quality checks and grading to Australian Standards',
          'Troubleshooting basic equipment faults and performing adjustments',
        ],
        indicative_tasks: ['Sawmill operator', 'Processing equipment operator', 'Timber grader (qualified)'],
        sort_order: 30,
      },
      {
        level: 4, stream: 'timber',
        fwc_id: null,
        title: 'Timber Industry Level 4',
        description: 'Tradesperson or advanced machinery operator. You have trade qualifications or equivalent experience and operate complex equipment.',
        duties: [
          'Operating and maintaining complex timber processing machinery',
          'Performing trade-level maintenance and repair work on equipment',
          'Setting up production runs and optimising equipment settings for yield',
          'Training and mentoring lower-level operators on equipment use',
        ],
        indicative_tasks: ['Tradesperson (timber)', 'Advanced machinery operator', 'Kiln operator'],
        sort_order: 40,
      },
      {
        level: 5, stream: 'timber',
        fwc_id: null,
        title: 'Timber Industry Level 5',
        description: 'Leading hand or supervisor. You supervise a team and coordinate daily operations within the timber facility.',
        duties: [
          'Supervising and coordinating the work of a team of timber workers',
          'Planning daily production schedules and allocating resources',
          'Ensuring compliance with safety procedures and environmental regulations',
          'Liaising with management on production targets and operational issues',
        ],
        indicative_tasks: ['Leading hand', 'Shift supervisor', 'Production coordinator'],
        sort_order: 50,
      },
      {
        level: 6, stream: 'timber',
        fwc_id: null,
        title: 'Timber Industry Level 6',
        description: 'Foreperson or specialist. You have significant expertise and manage complex operations or specialised functions within the facility.',
        duties: [
          'Managing overall production operations across the facility or site',
          'Overseeing quality assurance, grading, and compliance programs',
          'Developing and implementing operational procedures and safety systems',
          'Coordinating with external stakeholders including suppliers and customers',
        ],
        indicative_tasks: ['Foreperson', 'Site manager', 'Quality assurance specialist'],
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
    // Casual rate = FT rate × 1.25.
    const baseRates = {
      timber: { 1: 25.44, 2: 26.27, 3: 27.04, 4: 28.26, 5: 29.62, 6: 31.18 },
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
      { employment_type: 'casual',     day_type: 'saturday',       multiplier: 1.50, description: 'Saturday — casual ×1.50 (incl. loading)' },
      { employment_type: 'casual',     day_type: 'sunday',         multiplier: 2.00, description: 'Sunday — casual ×2.00 (incl. loading)' },
      { employment_type: 'casual',     day_type: 'public_holiday', multiplier: 2.50, description: 'Casual public holiday — ×2.50 (incl. loading)' },
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
        description: 'If you work overtime for more than 2 hours and your employer did not give you notice the day before, you are entitled to a meal allowance of $20.96.',
        trigger_condition: 'Overtime of more than 2 hours without notice',
        amount: 20.96, amount_type: 'fixed', per_unit: 'per_meal',
        is_all_purpose: false,
      },
      {
        allowance_type: 'first_aid',
        name: 'First aid allowance',
        description: 'If you are appointed as a first aid officer and hold current first aid qualifications, you are entitled to $16.78 per week.',
        trigger_condition: 'Appointed as first aid officer with current qualifications',
        amount: 16.78, amount_type: 'fixed', per_unit: 'per_week',
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
    // Single-branch question flow:
    //   Q1: timber_level — level 1 through 6
    const questions = [
      {
        question_key: 'timber_level',
        question_text: 'What is your timber industry classification level?',
        help_text: 'Your level depends on your experience, qualifications, and the complexity of your duties. Level 1 is entry-level yard and mill work. Higher levels involve operating machinery, trade qualifications, supervising teams, and managing operations.',
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
      { question_key: 'timber_level', answer_key: 'l1', answer_text: 'Level 1 — Entry-level (yard hand, mill labourer, timber stacker)', sort_order: 1 },
      { question_key: 'timber_level', answer_key: 'l2', answer_text: 'Level 2 — Experienced (forklift operator, basic machine operator, timber grader)', sort_order: 2 },
      { question_key: 'timber_level', answer_key: 'l3', answer_text: 'Level 3 — Skilled operator (sawmill operator, processing equipment operator)', sort_order: 3 },
      { question_key: 'timber_level', answer_key: 'l4', answer_text: 'Level 4 — Tradesperson / advanced machinery operator (kiln operator)', sort_order: 4 },
      { question_key: 'timber_level', answer_key: 'l5', answer_text: 'Level 5 — Leading hand / supervisor (shift supervisor, production coordinator)', sort_order: 5 },
      { question_key: 'timber_level', answer_key: 'l6', answer_text: 'Level 6 — Foreperson / specialist (site manager, quality assurance specialist)', sort_order: 6 },
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
