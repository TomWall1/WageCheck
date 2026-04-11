/**
 * Seed script — Legal Services Award 2020 [MA000116]
 * Pay rates effective 1 July 2025
 * Source: FWC MAPD API + FWO pay guide MA000116
 *
 * One stream:
 *   legal — Legal Clerical & Admin L1 through Law Clerk L6 (7 classifications)
 *
 * Adult FT/PT hourly rates (from API, base_rate_type = Hourly):
 *   L1: $26.96   L2: $28.12   L3: $29.70   L4: $31.19
 *   L5: $32.45   L6 (Law Graduate): $32.45   L7 (Law Clerk): $34.40
 *
 * Casual rates = FT rate × 1.25
 *
 * Penalty rates:
 *   FT/PT: Sat ×1.50, Sun ×2.00, PH ×2.50
 *   Casual: Sat ×1.50, Sun ×2.00, PH ×2.50
 *
 * Overtime (7.6hr daily threshold):
 *   First 2 OT hours: ×1.50, after 2 OT hours: ×2.00
 *
 * Junior rates: <16=45%, 16=50%, 17=60%, 18=70%, 19=80%, 20=90%
 *
 * Allowances:
 *   Meal (OT M-F): $19.93, Meal further: $15.89,
 *   Vehicle car: $0.98/km, Motorcycle: $0.33/km, Uniform: $3.65/wk
 *
 * Run after migrate.js: node scripts/seed_ma000116.js
 */
require('dotenv').config();
const pool = require('../src/db/pool');

const AWARD_CODE = 'MA000116';
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
      'Legal Services Award 2020',
      EFFECTIVE_DATE,
      'https://awards.fairwork.gov.au/MA000116.html',
    ]);

    // ── Classifications ────────────────────────────────────────────────────────
    const classifications = [
      {
        level: 1, stream: 'legal',
        fwc_id: 4498,
        title: 'Legal Clerical & Administrative Level 1',
        description: 'Entry-level clerical and administrative employee in a legal practice. You perform routine tasks under direct supervision.',
        duties: [
          'Performing general office duties including filing, photocopying, and scanning',
          'Answering and directing telephone calls',
          'Receiving and distributing mail and correspondence',
          'Maintaining office supplies and equipment',
          'Performing basic data entry and record-keeping tasks',
        ],
        indicative_tasks: ['Office junior', 'Receptionist (entry)', 'Filing clerk'],
        sort_order: 10,
      },
      {
        level: 2, stream: 'legal',
        fwc_id: 4499,
        title: 'Legal Clerical & Administrative Level 2',
        description: 'Clerical and administrative employee with some experience in a legal environment. You perform a broader range of tasks with less direct supervision.',
        duties: [
          'Preparing standard legal correspondence and documents from templates',
          'Managing diary and appointment scheduling for solicitors',
          'Processing accounts payable and receivable',
          'Maintaining client files and legal databases',
          'Providing administrative support to legal practitioners',
        ],
        indicative_tasks: ['Legal secretary (junior)', 'Accounts clerk', 'Administrative assistant'],
        sort_order: 20,
      },
      {
        level: 3, stream: 'legal',
        fwc_id: 4500,
        title: 'Legal Clerical & Administrative Level 3',
        description: 'Experienced clerical and administrative employee. You work with limited supervision and may have responsibility for specific administrative functions.',
        duties: [
          'Preparing complex legal documents including court forms and pleadings',
          'Managing trust accounts and financial records',
          'Coordinating court filing and service of documents',
          'Supervising junior administrative staff',
          'Managing office systems and procedures',
        ],
        indicative_tasks: ['Legal secretary (experienced)', 'Trust account administrator', 'Office coordinator'],
        sort_order: 30,
      },
      {
        level: 4, stream: 'legal',
        fwc_id: 4501,
        title: 'Legal Clerical & Administrative Level 4',
        description: 'Senior clerical and administrative employee with specialist knowledge. You exercise significant autonomy and may manage an administrative team.',
        duties: [
          'Managing complex administrative functions across the practice',
          'Overseeing trust account compliance and audit preparation',
          'Coordinating staff rosters, recruitment, and training',
          'Managing client relationships and practice management systems',
          'Preparing and reviewing financial reports and budgets',
        ],
        indicative_tasks: ['Practice manager (small firm)', 'Senior legal secretary', 'Office manager'],
        sort_order: 40,
      },
      {
        level: 5, stream: 'legal',
        fwc_id: 4502,
        title: 'Legal Clerical & Administrative Level 5',
        description: 'The most senior clerical and administrative classification. You manage major administrative or operational functions with a high degree of autonomy.',
        duties: [
          'Managing overall practice operations and administration',
          'Developing and implementing office policies and procedures',
          'Managing financial operations including budgets and reporting',
          'Leading and developing administrative teams',
          'Liaising with external stakeholders including courts and regulatory bodies',
        ],
        indicative_tasks: ['Practice manager (large firm)', 'Operations manager', 'Senior office manager'],
        sort_order: 50,
      },
      {
        level: 6, stream: 'legal',
        fwc_id: 4503,
        title: 'Law Graduate Level 5',
        description: 'A law graduate who has completed a law degree but has not yet been admitted to practice. You perform legal work under the supervision of an admitted practitioner.',
        duties: [
          'Conducting legal research and preparing research memoranda',
          'Drafting correspondence, documents, and simple pleadings',
          'Assisting with client interviews and file management',
          'Attending court and tribunal proceedings with supervising practitioners',
          'Completing practical legal training requirements',
        ],
        indicative_tasks: ['Law graduate', 'Paralegal (graduate)', 'Trainee solicitor'],
        sort_order: 60,
      },
      {
        level: 7, stream: 'legal',
        fwc_id: 4504,
        title: 'Law Clerk Level 6',
        description: 'A law clerk performing legal work that requires legal qualifications or significant legal knowledge. You work under the general direction of an admitted practitioner.',
        duties: [
          'Conducting complex legal research and analysis',
          'Drafting legal documents, submissions, and advice',
          'Managing client files and matters with limited supervision',
          'Attending to conveyancing, probate, or litigation tasks',
          'Liaising with courts, opposing parties, and other stakeholders',
        ],
        indicative_tasks: ['Law clerk', 'Paralegal (senior)', 'Conveyancing clerk'],
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
    // Casual rate = FT rate × 1.25.
    const baseRates = {
      legal: { 1: 26.96, 2: 28.12, 3: 29.70, 4: 31.19, 5: 32.45, 6: 32.45, 7: 34.40 },
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
      { employment_type: 'casual',     day_type: 'saturday',       multiplier: 1.50, description: 'Saturday — casual rate × 1.50' },
      { employment_type: 'casual',     day_type: 'sunday',         multiplier: 2.00, description: 'Sunday — casual rate × 2.00' },
      { employment_type: 'casual',     day_type: 'public_holiday', multiplier: 2.50, description: 'Public holiday — casual rate × 2.50' },
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
    // Source: FWC MAPD API expense/wage allowances for MA000116.
    const allowances = [
      {
        allowance_type: 'meal',
        name: 'Meal allowance (overtime M-F)',
        description: 'If you work overtime on a Monday to Friday and your employer did not give you notice the day before, you are entitled to a meal allowance of $19.93.',
        trigger_condition: 'Overtime on Monday to Friday without notice',
        amount: 19.93, amount_type: 'fixed', per_unit: 'per_meal',
        is_all_purpose: false,
      },
      {
        allowance_type: 'meal_further',
        name: 'Meal allowance (further)',
        description: 'For each further period of overtime of 4 hours or more after the initial meal allowance, you are entitled to a further meal allowance of $15.89.',
        trigger_condition: 'Each further 4 hours of overtime after initial meal allowance',
        amount: 15.89, amount_type: 'fixed', per_unit: 'per_meal',
        is_all_purpose: false,
      },
      {
        allowance_type: 'vehicle',
        name: 'Vehicle allowance (car)',
        description: 'If you are required to use your own car for work purposes, you are entitled to $0.98 per kilometre.',
        trigger_condition: 'Required to use own car for work',
        amount: 0.98, amount_type: 'per_km', per_unit: 'per_km',
        is_all_purpose: false,
      },
      {
        allowance_type: 'motorcycle',
        name: 'Vehicle allowance (motorcycle)',
        description: 'If you are required to use your own motorcycle for work purposes, you are entitled to $0.33 per kilometre.',
        trigger_condition: 'Required to use own motorcycle for work',
        amount: 0.33, amount_type: 'per_km', per_unit: 'per_km',
        is_all_purpose: false,
      },
      {
        allowance_type: 'uniform',
        name: 'Uniform allowance',
        description: 'If your employer requires you to wear a uniform and does not supply or launder it, you are entitled to $3.65 per week.',
        trigger_condition: 'Employer requires uniform not supplied or laundered',
        amount: 3.65, amount_type: 'fixed', per_unit: 'per_week',
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
    // Single question flow: legal_level
    const questions = [
      {
        question_key: 'legal_level',
        question_text: 'What is your role or classification level in the legal practice?',
        help_text: 'Your level depends on your qualifications and role. Levels 1-5 are clerical and administrative employees with increasing experience and responsibility. Level 6 is for law graduates not yet admitted. Level 7 is for law clerks performing legal work.',
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
      { question_key: 'legal_level', answer_key: 'l1', answer_text: 'Legal Clerical & Admin Level 1 — entry-level office duties, filing, reception', sort_order: 1 },
      { question_key: 'legal_level', answer_key: 'l2', answer_text: 'Legal Clerical & Admin Level 2 — legal secretary (junior), accounts, admin support', sort_order: 2 },
      { question_key: 'legal_level', answer_key: 'l3', answer_text: 'Legal Clerical & Admin Level 3 — experienced legal secretary, trust accounts, court filing', sort_order: 3 },
      { question_key: 'legal_level', answer_key: 'l4', answer_text: 'Legal Clerical & Admin Level 4 — senior admin, practice management, compliance', sort_order: 4 },
      { question_key: 'legal_level', answer_key: 'l5', answer_text: 'Legal Clerical & Admin Level 5 — practice/operations manager, high autonomy', sort_order: 5 },
      { question_key: 'legal_level', answer_key: 'l6', answer_text: 'Law Graduate Level 5 — law degree completed, not yet admitted to practice', sort_order: 6 },
      { question_key: 'legal_level', answer_key: 'l7', answer_text: 'Law Clerk Level 6 — performing legal work, research, drafting, conveyancing', sort_order: 7 },
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
