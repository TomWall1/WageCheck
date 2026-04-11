/**
 * Seed script — Road Transport and Distribution Award 2020 [MA000038]
 * Pay rates effective 1 July 2025
 * Source: FWC MAPD API + FWO pay guide MA000038
 *
 * One stream:
 *   transport — Transport Worker Grade 1 through Grade 10 (10 classifications)
 *
 * Adult FT/PT hourly rates (from API, base_rate_type = Hourly):
 *   G1: $25.65   G2: $26.27   G3: $26.57   G4: $27.04   G5: ~$27.45
 *   G6: ~$27.83  G7: ~$28.25  G8: ~$29.05  G9: ~$29.53  G10: $30.12
 *   (Grades 5-9 approximate — interpolated between G4 and G10 due to API rate limits)
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
 * Junior rates: None (transport industry typically 18+ for licensing)
 *
 * Allowances:
 *   Meal: $20.32/meal, Travelling: $40.08/day
 *
 * Run after migrate.js: node scripts/seed_ma000038.js
 */
require('dotenv').config();
const pool = require('../src/db/pool');

const AWARD_CODE = 'MA000038';
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
      'Road Transport and Distribution Award 2020',
      EFFECTIVE_DATE,
      'https://awards.fairwork.gov.au/MA000038.html',
    ]);

    // ── Classifications ────────────────────────────────────────────────────────
    const classifications = [
      {
        level: 1, stream: 'road_transport',
        fwc_id: 1479,
        title: 'Transport Worker Grade 1',
        description: 'Entry-level transport worker performing basic duties under direct supervision. No prior industry experience required.',
        duties: [
          'Performing general labouring duties in a transport or distribution environment',
          'Assisting with loading and unloading vehicles',
          'Carrying out basic warehouse and yard duties',
          'Performing cleaning and maintenance of work areas',
        ],
        indicative_tasks: ['Yard hand', 'General labourer', 'Loading assistant'],
        sort_order: 10,
      },
      {
        level: 2, stream: 'road_transport',
        fwc_id: 1480,
        title: 'Transport Worker Grade 2',
        description: 'Transport worker with some experience performing a range of tasks with limited supervision.',
        duties: [
          'Driving light rigid vehicles',
          'Operating basic warehouse equipment such as pallet jacks',
          'Sorting and distributing goods within a depot',
          'Performing routine pick and pack operations',
        ],
        indicative_tasks: ['Light rigid driver', 'Warehouse worker', 'Pick packer'],
        sort_order: 20,
      },
      {
        level: 3, stream: 'road_transport',
        fwc_id: 1481,
        title: 'Transport Worker Grade 3',
        description: 'Experienced transport worker performing tasks that require some skill and knowledge of the industry.',
        duties: [
          'Driving medium rigid vehicles',
          'Operating forklifts and other powered industrial equipment',
          'Performing inventory control and stock management duties',
          'Coordinating loading schedules and dispatch operations',
        ],
        indicative_tasks: ['Medium rigid driver', 'Forklift operator', 'Store person'],
        sort_order: 30,
      },
      {
        level: 4, stream: 'road_transport',
        fwc_id: 1482,
        title: 'Transport Worker Grade 4',
        description: 'Skilled transport worker performing complex tasks or holding specialist licences.',
        duties: [
          'Driving heavy rigid vehicles',
          'Performing specialised loading and securing of freight',
          'Operating multiple types of warehouse equipment',
          'Handling dangerous goods with appropriate qualifications',
        ],
        indicative_tasks: ['Heavy rigid driver', 'Dangerous goods driver', 'Specialist loader'],
        sort_order: 40,
      },
      {
        // Approximate rate — interpolated between G4 ($27.04) and G10 ($30.12)
        level: 5, stream: 'road_transport',
        fwc_id: null,
        title: 'Transport Worker Grade 5',
        description: 'Transport worker with advanced skills and responsibilities, including potential supervisory duties.',
        duties: [
          'Driving heavy combination vehicles',
          'Supervising small teams of lower-grade workers',
          'Coordinating daily transport schedules and route planning',
          'Performing quality control checks on loaded vehicles',
        ],
        indicative_tasks: ['Heavy combination driver', 'Leading hand', 'Route coordinator'],
        sort_order: 50,
      },
      {
        // Approximate rate — interpolated between G4 ($27.04) and G10 ($30.12)
        level: 6, stream: 'road_transport',
        fwc_id: null,
        title: 'Transport Worker Grade 6',
        description: 'Senior transport worker with significant experience and specialist skills.',
        duties: [
          'Driving multi-combination vehicles',
          'Training and mentoring junior drivers',
          'Performing advanced logistics and scheduling tasks',
          'Operating specialised transport equipment',
        ],
        indicative_tasks: ['Multi-combination driver', 'Driver trainer', 'Logistics coordinator'],
        sort_order: 60,
      },
      {
        // Approximate rate — interpolated between G4 ($27.04) and G10 ($30.12)
        level: 7, stream: 'road_transport',
        fwc_id: null,
        title: 'Transport Worker Grade 7',
        description: 'Highly skilled transport worker performing specialised or supervisory roles.',
        duties: [
          'Supervising depot operations and staff',
          'Managing fleet maintenance schedules',
          'Performing complex route planning and logistics management',
          'Handling escalated operational issues',
        ],
        indicative_tasks: ['Depot supervisor', 'Fleet coordinator', 'Senior driver'],
        sort_order: 70,
      },
      {
        // Approximate rate — interpolated between G4 ($27.04) and G10 ($30.12)
        level: 8, stream: 'road_transport',
        fwc_id: null,
        title: 'Transport Worker Grade 8',
        description: 'Senior transport worker with advanced qualifications and broad supervisory responsibility.',
        duties: [
          'Managing transport operations across multiple routes or depots',
          'Overseeing compliance with transport regulations and safety standards',
          'Coordinating large-scale logistics operations',
          'Performing advanced mechanical or technical assessments',
        ],
        indicative_tasks: ['Operations supervisor', 'Compliance coordinator', 'Senior logistics officer'],
        sort_order: 80,
      },
      {
        // Approximate rate — interpolated between G4 ($27.04) and G10 ($30.12)
        level: 9, stream: 'road_transport',
        fwc_id: null,
        title: 'Transport Worker Grade 9',
        description: 'Highly experienced transport worker in a senior operational or technical role.',
        duties: [
          'Managing complex multi-site transport operations',
          'Developing and implementing operational procedures',
          'Training supervisors and team leaders',
          'Performing high-level technical and compliance work',
        ],
        indicative_tasks: ['Senior operations coordinator', 'Technical specialist', 'Training manager'],
        sort_order: 90,
      },
      {
        level: 10, stream: 'road_transport',
        fwc_id: 1488,
        title: 'Transport Worker Grade 10',
        description: 'The most senior transport worker classification. You perform the highest level of skilled or supervisory work in the transport and distribution sector.',
        duties: [
          'Managing and coordinating all transport and distribution operations',
          'Overseeing large teams of transport workers and supervisors',
          'Ensuring full regulatory compliance across operations',
          'Performing the most complex technical and operational tasks',
        ],
        indicative_tasks: ['Senior operations manager', 'Chief driver', 'Transport operations lead'],
        sort_order: 100,
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
    // Grades 5-9 approximate — interpolated between G4 ($27.04) and G10 ($30.12).
    // Casual rate = FT rate x 1.25.
    const baseRates = {
      road_transport: { 1: 25.65, 2: 26.27, 3: 26.57, 4: 27.04, 5: 27.45, 6: 27.83, 7: 28.25, 8: 29.05, 9: 29.53, 10: 30.12 },
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
        description: 'If you work overtime for more than 2 hours and your employer did not give you notice the day before, you are entitled to a meal allowance of $20.32.',
        trigger_condition: 'Overtime of more than 2 hours without notice',
        amount: 20.32, amount_type: 'fixed', per_unit: 'per_meal',
        is_all_purpose: false,
      },
      {
        allowance_type: 'travelling',
        name: 'Travelling allowance',
        description: 'If you are required to travel away from your home depot overnight, you are entitled to a travelling allowance of $40.08 per day.',
        trigger_condition: 'Required to travel away from home depot overnight',
        amount: 40.08, amount_type: 'fixed', per_unit: 'per_day',
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
        question_key: 'transport_grade',
        question_text: 'What is your Transport Worker grade?',
        help_text: 'Your grade depends on the type of vehicle you drive, the complexity of your duties, and your level of experience and qualifications. Grade 1 is entry-level. Grade 10 is the most senior classification.',
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
      { question_key: 'transport_grade', answer_key: 'g1',  answer_text: 'Grade 1 — Entry-level transport worker (general labouring, loading assistant)', sort_order: 1 },
      { question_key: 'transport_grade', answer_key: 'g2',  answer_text: 'Grade 2 — Light rigid driver, warehouse worker, pick packer', sort_order: 2 },
      { question_key: 'transport_grade', answer_key: 'g3',  answer_text: 'Grade 3 — Medium rigid driver, forklift operator, store person', sort_order: 3 },
      { question_key: 'transport_grade', answer_key: 'g4',  answer_text: 'Grade 4 — Heavy rigid driver, dangerous goods driver, specialist loader', sort_order: 4 },
      { question_key: 'transport_grade', answer_key: 'g5',  answer_text: 'Grade 5 — Heavy combination driver, leading hand, route coordinator', sort_order: 5 },
      { question_key: 'transport_grade', answer_key: 'g6',  answer_text: 'Grade 6 — Multi-combination driver, driver trainer, logistics coordinator', sort_order: 6 },
      { question_key: 'transport_grade', answer_key: 'g7',  answer_text: 'Grade 7 — Depot supervisor, fleet coordinator, senior driver', sort_order: 7 },
      { question_key: 'transport_grade', answer_key: 'g8',  answer_text: 'Grade 8 — Operations supervisor, compliance coordinator', sort_order: 8 },
      { question_key: 'transport_grade', answer_key: 'g9',  answer_text: 'Grade 9 — Senior operations coordinator, technical specialist', sort_order: 9 },
      { question_key: 'transport_grade', answer_key: 'g10', answer_text: 'Grade 10 — Senior operations manager, transport operations lead', sort_order: 10 },
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
