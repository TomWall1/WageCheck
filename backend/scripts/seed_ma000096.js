/**
 * Seed script — Dry Cleaning and Laundry Industry Award 2020 [MA000096]
 * Pay rates effective 1 July 2025
 * Source: FWC MAPD API + FWO pay guide MA000096
 *
 * Two streams:
 *   dry_cleaning — Levels 1–5 (5 classifications)
 *   laundry      — Levels 1–4 (4 classifications)
 *
 * Adult FT/PT hourly rates (from API, base_rate_type = Hourly):
 *   DC L1: $24.28   L2: $24.95   L3: $25.29   L4: $26.70   L5: $28.12
 *   Laundry L1: $24.61   L2: $25.45   L3: $26.46   L4: $27.14
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
 * Junior rates: <16=45%, 16=50%, 17=60%, 18=70%, 19=80%, 20=90%, 21+=100%
 *
 * Allowances:
 *   Meal: $13.13
 *
 * Run after migrate.js: node scripts/seed_ma000096.js
 */
require('dotenv').config();
const pool = require('../src/db/pool');

const AWARD_CODE = 'MA000096';
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
      'Dry Cleaning and Laundry Industry Award 2020',
      EFFECTIVE_DATE,
      'https://awards.fairwork.gov.au/MA000096.html',
    ]);

    // ── Classifications ────────────────────────────────────────────────────────
    const classifications = [
      // ── Dry Cleaning stream ─────────────────────────────────────────────────
      {
        level: 1, stream: 'dry_cleaning',
        fwc_id: 3951,
        title: 'Dry Cleaning Level 1',
        description: 'Entry-level dry cleaning employee. You perform routine tasks under direct supervision, including receiving garments and basic sorting.',
        duties: [
          'Receiving garments and items from customers at the counter',
          'Sorting garments by fabric type and cleaning method',
          'Tagging and recording items for processing',
          'Performing basic cleaning and tidying of the work area',
        ],
        indicative_tasks: ['Counter hand (entry)', 'Garment sorter', 'Tagging clerk'],
        sort_order: 10,
      },
      {
        level: 2, stream: 'dry_cleaning',
        fwc_id: 3952,
        title: 'Dry Cleaning Level 2',
        description: 'Dry cleaning employee with some experience. You perform a range of cleaning and finishing tasks with limited supervision.',
        duties: [
          'Operating dry cleaning machines and monitoring cleaning cycles',
          'Performing basic spotting and stain removal',
          'Pressing and finishing garments using standard equipment',
          'Assisting with customer service and garment identification queries',
        ],
        indicative_tasks: ['Machine operator', 'Presser', 'Spotter (basic)'],
        sort_order: 20,
      },
      {
        level: 3, stream: 'dry_cleaning',
        fwc_id: 3953,
        title: 'Dry Cleaning Level 3',
        description: 'Experienced dry cleaning employee. You handle specialist garments and perform advanced cleaning techniques with minimal supervision.',
        duties: [
          'Performing advanced spotting and stain treatment on delicate fabrics',
          'Operating and adjusting specialised cleaning equipment',
          'Inspecting finished garments for quality and identifying rework needs',
          'Training new employees on standard procedures',
        ],
        indicative_tasks: ['Senior spotter', 'Quality inspector', 'Machine operator (advanced)'],
        sort_order: 30,
      },
      {
        level: 4, stream: 'dry_cleaning',
        fwc_id: 3954,
        title: 'Dry Cleaning Level 4',
        description: 'Senior dry cleaning employee with specialist skills. You supervise production areas and coordinate workflow.',
        duties: [
          'Supervising production staff and coordinating daily workflow',
          'Managing inventory of chemicals and cleaning supplies',
          'Performing complex repairs and alterations',
          'Ensuring compliance with safety and environmental regulations',
        ],
        indicative_tasks: ['Production supervisor', 'Senior presser', 'Workshop coordinator'],
        sort_order: 40,
      },
      {
        level: 5, stream: 'dry_cleaning',
        fwc_id: 3955,
        title: 'Dry Cleaning Level 5',
        description: 'The most senior dry cleaning classification. You manage the overall dry cleaning operation and are responsible for quality, staff, and customer service.',
        duties: [
          'Managing all aspects of the dry cleaning operation',
          'Overseeing staff training, rosters, and performance',
          'Handling complex customer complaints and specialist garment care',
          'Managing budgets, ordering, and supplier relationships',
        ],
        indicative_tasks: ['Dry cleaning manager', 'Senior production manager'],
        sort_order: 50,
      },
      // ── Laundry stream ──────────────────────────────────────────────────────
      {
        level: 1, stream: 'laundry',
        fwc_id: 3956,
        title: 'Laundry Level 1',
        description: 'Entry-level laundry employee. You perform routine tasks under direct supervision, including sorting, loading, and folding.',
        duties: [
          'Sorting laundry items by type, colour, and washing instructions',
          'Loading and unloading washing machines and dryers',
          'Folding and packaging clean laundry items',
          'Performing basic cleaning and maintenance of the work area',
        ],
        indicative_tasks: ['Laundry hand (entry)', 'Folder', 'Machine loader'],
        sort_order: 60,
      },
      {
        level: 2, stream: 'laundry',
        fwc_id: 3957,
        title: 'Laundry Level 2',
        description: 'Laundry employee with some experience. You operate laundry equipment and perform a range of processing tasks with limited supervision.',
        duties: [
          'Operating commercial washing machines, dryers, and ironers',
          'Performing basic stain treatment and pre-wash processes',
          'Monitoring wash cycles and adjusting settings as needed',
          'Assisting with dispatch and delivery of finished laundry',
        ],
        indicative_tasks: ['Machine operator', 'Ironer', 'Dispatch assistant'],
        sort_order: 70,
      },
      {
        level: 3, stream: 'laundry',
        fwc_id: 3958,
        title: 'Laundry Level 3',
        description: 'Experienced laundry employee. You handle specialised processing and may coordinate the work of junior staff.',
        duties: [
          'Operating and maintaining specialised laundry equipment',
          'Performing quality checks on finished items',
          'Coordinating workflow and allocating tasks to junior staff',
          'Managing stock control of chemicals and supplies',
        ],
        indicative_tasks: ['Senior machine operator', 'Quality checker', 'Leading hand'],
        sort_order: 80,
      },
      {
        level: 4, stream: 'laundry',
        fwc_id: 3959,
        title: 'Laundry Level 4',
        description: 'The most senior laundry classification. You supervise the laundry operation and are responsible for production, quality, and staff management.',
        duties: [
          'Supervising all laundry production staff and operations',
          'Managing equipment maintenance schedules and repairs',
          'Ensuring compliance with health, safety, and environmental standards',
          'Managing client relationships and service delivery requirements',
        ],
        indicative_tasks: ['Laundry supervisor', 'Production manager', 'Plant operator (senior)'],
        sort_order: 90,
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
      dry_cleaning: { 1: 24.28, 2: 24.95, 3: 25.29, 4: 26.70, 5: 28.12 },
      laundry:      { 1: 24.61, 2: 25.45, 3: 26.46, 4: 27.14 },
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
        description: 'If you work overtime for more than 2 hours and your employer did not give you notice the day before, you are entitled to a meal allowance of $13.13.',
        trigger_condition: 'Overtime of more than 2 hours without notice',
        amount: 13.13, amount_type: 'fixed', per_unit: 'per_meal',
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
    // Two-branch question flow:
    //   Q1: dc_laundry_stream — dry cleaning OR laundry
    //   Q2: dc_level — level for dry cleaning (conditional on Q1=dry_cleaning)
    //   Q3: laundry_level — level for laundry (conditional on Q1=laundry)
    const questions = [
      {
        question_key: 'dc_laundry_stream',
        question_text: 'What type of work do you do?',
        help_text: 'Dry cleaning covers garment cleaning using chemical solvents, pressing, spotting, and related counter service. Laundry covers washing, drying, ironing, and processing of linen and other washable items.',
        question_type: 'single',
        stream: null,
        parent_question_key: null,
        parent_answer_key: null,
        sort_order: 1,
      },
      {
        question_key: 'dc_level',
        question_text: 'What is your dry cleaning classification level?',
        help_text: 'Your level depends on your experience, qualifications, and the complexity of your duties. Level 1 is entry-level counter and sorting work. Higher levels involve operating machines, specialist cleaning, supervision, and management.',
        question_type: 'single',
        stream: null,
        parent_question_key: 'dc_laundry_stream',
        parent_answer_key: 'dry_cleaning',
        sort_order: 2,
      },
      {
        question_key: 'laundry_level',
        question_text: 'What is your laundry classification level?',
        help_text: 'Your level depends on your experience, qualifications, and the complexity of your duties. Level 1 is entry-level sorting and folding. Higher levels involve operating commercial machines, quality control, and supervising staff.',
        question_type: 'single',
        stream: null,
        parent_question_key: 'dc_laundry_stream',
        parent_answer_key: 'laundry',
        sort_order: 3,
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
      // Q1: dc_laundry_stream
      { question_key: 'dc_laundry_stream', answer_key: 'dry_cleaning', answer_text: 'Dry cleaning (garment cleaning, pressing, spotting, counter service)', sort_order: 1 },
      { question_key: 'dc_laundry_stream', answer_key: 'laundry',      answer_text: 'Laundry (washing, drying, ironing, linen processing)', sort_order: 2 },
      // Q2: dc_level
      { question_key: 'dc_level', answer_key: 'l1', answer_text: 'Level 1 — Entry-level (counter hand, garment sorter)', sort_order: 1 },
      { question_key: 'dc_level', answer_key: 'l2', answer_text: 'Level 2 — Some experience (machine operator, presser, basic spotter)', sort_order: 2 },
      { question_key: 'dc_level', answer_key: 'l3', answer_text: 'Level 3 — Experienced (senior spotter, quality inspector)', sort_order: 3 },
      { question_key: 'dc_level', answer_key: 'l4', answer_text: 'Level 4 — Senior/specialist (production supervisor, workshop coordinator)', sort_order: 4 },
      { question_key: 'dc_level', answer_key: 'l5', answer_text: 'Level 5 — Manager (dry cleaning manager, senior production manager)', sort_order: 5 },
      // Q3: laundry_level
      { question_key: 'laundry_level', answer_key: 'l1', answer_text: 'Level 1 — Entry-level (laundry hand, folder, machine loader)', sort_order: 1 },
      { question_key: 'laundry_level', answer_key: 'l2', answer_text: 'Level 2 — Some experience (machine operator, ironer, dispatch assistant)', sort_order: 2 },
      { question_key: 'laundry_level', answer_key: 'l3', answer_text: 'Level 3 — Experienced (senior machine operator, quality checker, leading hand)', sort_order: 3 },
      { question_key: 'laundry_level', answer_key: 'l4', answer_text: 'Level 4 — Supervisor (laundry supervisor, production manager)', sort_order: 4 },
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
