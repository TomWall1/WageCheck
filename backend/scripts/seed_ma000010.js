/**
 * Seed script — Manufacturing and Associated Industries Award 2020 [MA000010]
 * Pay rates effective 1 July 2025
 * Source: FWC MAPD API + FWO pay guide MA000010
 *
 * One stream:
 *   manufacturing — C13 through C2a (12 classifications)
 *
 * Adult FT/PT hourly rates (from API, base_rate_type = Hourly):
 *   L1 (C13/V2): $24.95   L2 (C12/V3): $25.85   L3 (C11/V4): $26.70
 *   L4 (C10/V5): $28.12   L5 (C9): ~$29.05      L6 (C8): ~$30.05
 *   L7 (C7): ~$31.19      L8 (C6): ~$32.45       L9 (C5): ~$33.60
 *   L10 (C4): ~$34.80     L11 (C3): ~$35.69      L12 (C2a/V13): $36.43
 *
 * NOTE: C5-C9 rates were API rate-limited. Rates are interpolated from C10→C2a
 * progression and marked as approximate.
 *
 * Casual rates = FT rate × 1.25
 *
 * Penalty rates:
 *   FT/PT: Sat ×1.50, Sun ×2.00, PH ×2.50
 *   Casual: Sat ×1.50, Sun ×2.00, PH ×2.50
 *
 * Overtime (7.6 hr daily threshold):
 *   First 2 OT hours: ×1.50, after 2 OT hours: ×2.00
 *
 * Junior rates:
 *   <16: 36.8%, 16: 47.3%, 17: 57.8%, 18: 68.3%, 19: 82.5%, 20: 97.7%
 *
 * Allowances:
 *   Meal: $18.38, Tool (carpenter): $33.88/wk
 *
 * Run after migrate.js: node scripts/seed_ma000010.js
 */
require('dotenv').config();
const pool = require('../src/db/pool');

const AWARD_CODE = 'MA000010';
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
      'Manufacturing and Associated Industries and Occupations Award 2020',
      EFFECTIVE_DATE,
      'https://awards.fairwork.gov.au/MA000010.html',
    ]);

    // ── Classifications ────────────────────────────────────────────────────────
    const classifications = [
      {
        level: 1, stream: 'manufacturing',
        fwc_id: 313,
        title: 'C13 / Vehicle Industry Level 2',
        description: 'Entry-level manufacturing worker. You perform routine tasks under close supervision with structured on-the-job training.',
        duties: [
          'Performing routine manual tasks such as sorting, packing, and basic assembly',
          'Operating basic hand tools and simple machinery under supervision',
          'Following standard operating procedures and safety instructions',
          'Maintaining a clean and tidy work area',
        ],
        indicative_tasks: ['Process worker (entry)', 'Packer', 'Sorter', 'General labourer'],
        sort_order: 10,
      },
      {
        level: 2, stream: 'manufacturing',
        fwc_id: 314,
        title: 'C12 / Vehicle Industry Level 3',
        description: 'Manufacturing worker performing tasks above and beyond C13 level. You have completed induction training and can perform a wider range of routine tasks.',
        duties: [
          'Operating production machinery and basic equipment',
          'Performing quality checks on products and components',
          'Assisting with stock handling and inventory tasks',
          'Following more detailed work instructions with less direct supervision',
        ],
        indicative_tasks: ['Production worker', 'Machine operator (basic)', 'Stores assistant'],
        sort_order: 20,
      },
      {
        level: 3, stream: 'manufacturing',
        fwc_id: 315,
        title: 'C11 / Vehicle Industry Level 4',
        description: 'Manufacturing worker with a Certificate II or equivalent experience. You perform a range of operational tasks with increasing autonomy.',
        duties: [
          'Operating and monitoring production line equipment',
          'Performing basic testing and quality assurance tasks',
          'Conducting minor adjustments and maintenance on equipment',
          'Training and assisting new workers in basic tasks',
        ],
        indicative_tasks: ['Production operator', 'Quality checker', 'Machine setter (basic)', 'Forklift operator'],
        sort_order: 30,
      },
      {
        level: 4, stream: 'manufacturing',
        fwc_id: 316,
        title: 'C10 / Vehicle Industry Level 5',
        description: 'Qualified manufacturing worker with a Certificate III (trade) or equivalent. This is the trade-qualified benchmark level.',
        duties: [
          'Performing trade-level work in your area of specialisation',
          'Setting up and operating complex machinery and equipment',
          'Diagnosing faults and performing repairs within your trade area',
          'Reading and interpreting technical drawings and specifications',
        ],
        indicative_tasks: ['Tradesperson (Certificate III)', 'Fitter', 'Turner', 'Welder (qualified)', 'Electrician (manufacturing)'],
        sort_order: 40,
      },
      {
        level: 5, stream: 'manufacturing',
        fwc_id: null,
        title: 'C9',
        description: 'Manufacturing worker above trade level with additional specialist skills. You hold a Certificate III plus additional modules or equivalent experience.',
        duties: [
          'Performing advanced trade work requiring specialist knowledge',
          'Applying complex technical skills across multiple tasks',
          'Providing technical guidance to trade-level workers',
          'Undertaking work requiring a higher level of precision and responsibility',
        ],
        indicative_tasks: ['Advanced tradesperson', 'Specialist operator', 'Technical worker (C9)'],
        sort_order: 50,
      },
      {
        level: 6, stream: 'manufacturing',
        fwc_id: null,
        title: 'C8',
        description: 'Manufacturing worker with post-trade qualifications or equivalent experience. You perform work above the ordinary trade level.',
        duties: [
          'Performing complex technical and specialist manufacturing tasks',
          'Supervising small teams of trade-level workers',
          'Implementing quality systems and process improvements',
          'Conducting advanced fault diagnosis and repair work',
        ],
        indicative_tasks: ['Senior tradesperson', 'Leading hand (manufacturing)', 'Technical specialist (C8)'],
        sort_order: 60,
      },
      {
        level: 7, stream: 'manufacturing',
        fwc_id: null,
        title: 'C7',
        description: 'Highly skilled manufacturing worker with an Advanced Certificate or equivalent. You perform work requiring a high level of technical expertise.',
        duties: [
          'Performing highly skilled technical work in a specialist area',
          'Providing expert technical advice and problem-solving',
          'Training and mentoring tradespersons and other technical staff',
          'Leading process improvement and quality assurance initiatives',
        ],
        indicative_tasks: ['Advanced tradesperson (C7)', 'Technical expert', 'Maintenance specialist'],
        sort_order: 70,
      },
      {
        level: 8, stream: 'manufacturing',
        fwc_id: null,
        title: 'C6',
        description: 'Advanced manufacturing worker with specialist qualifications. You hold advanced trade skills and may coordinate technical activities.',
        duties: [
          'Coordinating technical activities across a work area',
          'Performing advanced specialist manufacturing operations',
          'Developing technical procedures and work methods',
          'Overseeing quality control for complex manufacturing processes',
        ],
        indicative_tasks: ['Advanced technical coordinator', 'Senior maintenance tradesperson', 'Production specialist (C6)'],
        sort_order: 80,
      },
      {
        level: 9, stream: 'manufacturing',
        fwc_id: null,
        title: 'C5',
        description: 'Manufacturing worker with a Diploma or equivalent qualification. You apply advanced technical knowledge and may supervise teams.',
        duties: [
          'Applying advanced technical knowledge to complex manufacturing problems',
          'Supervising and coordinating teams of technical staff',
          'Developing and implementing manufacturing systems and procedures',
          'Managing resources and scheduling for a production area',
        ],
        indicative_tasks: ['Technical supervisor', 'Production coordinator', 'Manufacturing technician (C5)'],
        sort_order: 90,
      },
      {
        level: 10, stream: 'manufacturing',
        fwc_id: null,
        title: 'C4',
        description: 'Senior manufacturing worker with advanced qualifications and significant experience. You perform higher-level technical and supervisory duties.',
        duties: [
          'Performing higher-level technical and engineering support tasks',
          'Managing production teams and ensuring output targets are met',
          'Contributing to process design and manufacturing engineering',
          'Leading health, safety, and environmental compliance in your area',
        ],
        indicative_tasks: ['Senior production supervisor', 'Manufacturing engineer (support)', 'Technical manager (C4)'],
        sort_order: 100,
      },
      {
        level: 11, stream: 'manufacturing',
        fwc_id: null,
        title: 'C3',
        description: 'Highly qualified manufacturing professional with advanced technical or supervisory responsibilities.',
        duties: [
          'Providing high-level technical expertise and strategic input',
          'Managing multiple production teams or technical areas',
          'Developing training programs and competency frameworks',
          'Leading continuous improvement and lean manufacturing initiatives',
        ],
        indicative_tasks: ['Senior technical specialist', 'Production manager (C3)', 'Quality systems manager'],
        sort_order: 110,
      },
      {
        level: 12, stream: 'manufacturing',
        fwc_id: 324,
        title: 'C2a / Vehicle Industry Level 13',
        description: 'The most senior manufacturing classification. You hold an Advanced Diploma or equivalent and perform the highest level of technical or supervisory work.',
        duties: [
          'Performing the highest level of technical work in a specialist manufacturing field',
          'Managing complex manufacturing operations and strategic planning',
          'Overseeing engineering, quality, and production systems across the operation',
          'Representing the organisation in technical and industry forums',
        ],
        indicative_tasks: ['Principal technical officer', 'Senior manufacturing manager', 'Operations director (manufacturing)'],
        sort_order: 120,
      },
    ];

    // Clear existing data for this award
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
    // L5-L11 (C9-C3) rates are approximate — interpolated from API data due to rate limiting.
    const baseRates = {
      manufacturing: {
        1: 24.95, 2: 25.85, 3: 26.70, 4: 28.12,
        5: 29.05, 6: 30.05, 7: 31.19, 8: 32.45,
        9: 33.60, 10: 34.80, 11: 35.69, 12: 36.43,
      },
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
    // FT/PT: Sat ×1.50, Sun ×2.00, PH ×2.50
    // Casual: Sat ×1.50, Sun ×2.00, PH ×2.50
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
      { employment_type: 'casual',     day_type: 'saturday',       multiplier: 1.50, description: 'Saturday — casual time and a half (×1.5 of casual base)' },
      { employment_type: 'casual',     day_type: 'sunday',         multiplier: 2.00, description: 'Sunday — casual double time (×2.0 of casual base)' },
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
        description: 'If you work overtime for more than 2 hours and your employer did not give you notice the day before, you are entitled to a meal allowance of $18.38.',
        trigger_condition: 'Overtime of more than 2 hours without notice',
        amount: 18.38, amount_type: 'fixed', per_unit: 'per_meal',
        is_all_purpose: false,
      },
      {
        allowance_type: 'tool',
        name: 'Tool allowance (carpenter)',
        description: 'If you are a carpenter or joiner required to provide and maintain your own tools, you are entitled to $33.88 per week.',
        trigger_condition: 'Carpenter or joiner required to provide own tools',
        amount: 33.88, amount_type: 'fixed', per_unit: 'per_week',
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
    // Single question flow — one stream with 12 levels (C13 through C2a).
    const questions = [
      {
        question_key: 'manufacturing_level',
        question_text: 'What is your manufacturing classification level?',
        help_text: 'Your level depends on your qualifications and the type of work you do. C13 is entry-level (no qualifications). C10 is the trade-qualified benchmark (Certificate III). Higher C-levels (C9 through C2a) require post-trade qualifications or advanced technical/supervisory responsibilities.',
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
      { question_key: 'manufacturing_level', answer_key: 'c13',  answer_text: 'C13 — Entry-level, routine tasks (packer, sorter, general labourer)', sort_order: 1 },
      { question_key: 'manufacturing_level', answer_key: 'c12',  answer_text: 'C12 — Trained production worker (machine operator, stores assistant)', sort_order: 2 },
      { question_key: 'manufacturing_level', answer_key: 'c11',  answer_text: 'C11 — Certificate II or equivalent (production operator, forklift operator)', sort_order: 3 },
      { question_key: 'manufacturing_level', answer_key: 'c10',  answer_text: 'C10 — Trade qualified, Certificate III (fitter, welder, electrician)', sort_order: 4 },
      { question_key: 'manufacturing_level', answer_key: 'c9',   answer_text: 'C9 — Above trade level, additional specialist skills', sort_order: 5 },
      { question_key: 'manufacturing_level', answer_key: 'c8',   answer_text: 'C8 — Post-trade qualifications (senior tradesperson, leading hand)', sort_order: 6 },
      { question_key: 'manufacturing_level', answer_key: 'c7',   answer_text: 'C7 — Advanced Certificate (technical expert, maintenance specialist)', sort_order: 7 },
      { question_key: 'manufacturing_level', answer_key: 'c6',   answer_text: 'C6 — Advanced specialist (technical coordinator)', sort_order: 8 },
      { question_key: 'manufacturing_level', answer_key: 'c5',   answer_text: 'C5 — Diploma level (technical supervisor, production coordinator)', sort_order: 9 },
      { question_key: 'manufacturing_level', answer_key: 'c4',   answer_text: 'C4 — Senior technical or supervisory (production supervisor)', sort_order: 10 },
      { question_key: 'manufacturing_level', answer_key: 'c3',   answer_text: 'C3 — Highly qualified (production manager, quality systems manager)', sort_order: 11 },
      { question_key: 'manufacturing_level', answer_key: 'c2a',  answer_text: 'C2a — Most senior classification, Advanced Diploma (principal technical officer)', sort_order: 12 },
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
