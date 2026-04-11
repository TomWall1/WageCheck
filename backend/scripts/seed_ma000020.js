/**
 * Seed script — Building and Construction General On-site Award 2020 [MA000020]
 * Pay rates effective 1 July 2025
 * Source: FWC MAPD API + FWO pay guide MA000020
 *
 * One stream:
 *   construction — CW/ECW 1(a) through CW/ECW 6 (9 classifications)
 *
 * Adult FT/PT hourly rates (from API, base_rate_type = Hourly):
 *   CW/ECW 1(a): $25.46   CW/ECW 1(b): $25.96   CW/ECW 1(c): $26.31
 *   CW/ECW 1(d): $26.78   CW/ECW 2: $27.32      CW/ECW 3: $28.12
 *   CW/ECW 4: $29.00      CW/ECW 5: $29.89      CW/ECW 6: $30.68
 *
 * Casual rates = FT rate x 1.25
 *
 * Penalty rates:
 *   FT/PT: Sat x1.50, Sun x2.00, PH x2.50
 *   Casual: Sat x1.75, Sun x2.00, PH x2.50
 *
 * Overtime (daily threshold 7.6 hrs):
 *   First 2 OT hours: x1.50, after 2 OT hours: x2.00
 *   Saturday after 2 hrs: x2.00
 *
 * Junior rates: None (construction typically 16+ with specific rules)
 *
 * Allowances:
 *   Meal (OT): $19.00/meal, Tool (carpenter): $39.60/wk,
 *   Tool (plasterer): $32.76/wk, Camping: $254.97/wk
 *
 * Run after migrate.js: node scripts/seed_ma000020.js
 */
require('dotenv').config();
const pool = require('../src/db/pool');

const AWARD_CODE = 'MA000020';
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
      'Building and Construction General On-site Award 2020',
      EFFECTIVE_DATE,
      'https://awards.fairwork.gov.au/MA000020.html',
    ]);

    // ── Classifications ────────────────────────────────────────────────────────
    const classifications = [
      {
        level: 1, stream: 'construction',
        fwc_id: 680,
        title: 'CW/ECW 1(a) — Construction Worker Level 1(a)',
        description: 'Entry-level construction worker with no prior experience or qualifications. You perform basic labouring duties under direct supervision.',
        duties: [
          'Performing general labouring and manual handling tasks on construction sites',
          'Assisting tradespeople with basic tasks such as carrying materials and cleaning up',
          'Operating basic hand tools under supervision',
          'Maintaining a clean and safe work area',
        ],
        indicative_tasks: ['General labourer', 'Construction assistant', 'Site cleaner'],
        sort_order: 10,
      },
      {
        level: 2, stream: 'construction',
        fwc_id: 679,
        title: 'CW/ECW 1(b) — Construction Worker Level 1(b)',
        description: 'Construction worker who has completed basic industry induction and can perform a wider range of labouring duties.',
        duties: [
          'Performing a range of labouring tasks including concrete and steel fixing assistance',
          'Operating power tools and basic machinery under supervision',
          'Assisting with formwork and scaffolding erection',
          'Carrying out site preparation and earthwork duties',
        ],
        indicative_tasks: ['Skilled labourer', 'Concrete assistant', 'Steel fixing assistant'],
        sort_order: 20,
      },
      {
        level: 3, stream: 'construction',
        fwc_id: 678,
        title: 'CW/ECW 1(c) — Construction Worker Level 1(c)',
        description: 'Construction worker with additional training or competencies beyond basic labouring.',
        duties: [
          'Operating specific plant and equipment such as jackhammers and compactors',
          'Performing skilled labouring tasks including form stripping and basic concreting',
          'Assisting with waterproofing, tiling preparation, and insulation installation',
          'Carrying out traffic control duties with appropriate certification',
        ],
        indicative_tasks: ['Plant operator (basic)', 'Skilled concreter assistant', 'Traffic controller'],
        sort_order: 30,
      },
      {
        level: 4, stream: 'construction',
        fwc_id: 677,
        title: 'CW/ECW 1(d) — Construction Worker Level 1(d)',
        description: 'The most experienced Level 1 construction worker with multiple competencies.',
        duties: [
          'Operating a range of construction plant and equipment',
          'Performing specialised labouring tasks requiring multiple competencies',
          'Working independently on defined tasks with minimal supervision',
          'Coordinating small teams of lower-level labourers',
        ],
        indicative_tasks: ['Senior labourer', 'Multi-skilled operator', 'Leading hand (labouring)'],
        sort_order: 40,
      },
      {
        level: 5, stream: 'construction',
        fwc_id: 676,
        title: 'CW/ECW 2 — Construction Worker Level 2',
        description: 'Semi-skilled construction worker or tradesperson completing an apprenticeship. You perform work that requires greater skill than Level 1.',
        duties: [
          'Performing semi-skilled construction work such as basic bricklaying or plastering',
          'Operating specialised plant and equipment including forklifts and excavators',
          'Working as a tradesperson completing an apprenticeship under supervision',
          'Performing skilled concreting, steel fixing, or formwork tasks',
        ],
        indicative_tasks: ['Apprentice (1st/2nd year)', 'Semi-skilled tradesperson', 'Forklift operator', 'Dogman'],
        sort_order: 50,
      },
      {
        level: 6, stream: 'construction',
        fwc_id: 675,
        title: 'CW/ECW 3 — Construction Worker Level 3',
        description: 'Qualified tradesperson or experienced construction worker performing skilled work independently.',
        duties: [
          'Performing qualified trade work in your trade (carpentry, plumbing, electrical, etc.)',
          'Reading and interpreting construction plans and specifications',
          'Operating complex construction plant and equipment',
          'Supervising and training apprentices and lower-level workers',
        ],
        indicative_tasks: ['Qualified carpenter', 'Qualified plumber', 'Qualified electrician', 'Crane operator', 'Scaffolder'],
        sort_order: 60,
      },
      {
        level: 7, stream: 'construction',
        fwc_id: 674,
        title: 'CW/ECW 4 — Construction Worker Level 4',
        description: 'Advanced tradesperson with additional qualifications or specialist skills beyond a basic trade certificate.',
        duties: [
          'Performing advanced trade work requiring specialist qualifications',
          'Providing technical guidance and training to other tradespeople',
          'Operating the most complex construction plant and machinery',
          'Performing quality assurance and compliance checking duties',
        ],
        indicative_tasks: ['Advanced tradesperson', 'Specialist operator', 'Technical supervisor', 'Tower crane operator'],
        sort_order: 70,
      },
      {
        level: 8, stream: 'construction',
        fwc_id: 673,
        title: 'CW/ECW 5 — Construction Worker Level 5',
        description: 'Highly skilled construction worker with advanced qualifications. You work with significant autonomy and may manage major project components.',
        duties: [
          'Managing and coordinating trade teams on construction projects',
          'Performing the most complex and specialised construction work',
          'Overseeing quality control and safety compliance on site',
          'Developing work methods and providing expert technical advice',
        ],
        indicative_tasks: ['Site supervisor', 'Senior specialist', 'Project coordinator', 'Senior crane operator'],
        sort_order: 80,
      },
      {
        level: 9, stream: 'construction',
        fwc_id: 672,
        title: 'CW/ECW 6 — Construction Worker Level 6',
        description: 'The most senior construction worker classification. You are responsible for leading major operational areas with full technical authority.',
        duties: [
          'Leading all construction operations on a major project or site',
          'Providing the highest level of technical expertise and problem resolution',
          'Managing large teams of tradespeople and supervisors',
          'Overseeing all safety, compliance, and quality systems on site',
        ],
        indicative_tasks: ['Senior site supervisor', 'Construction manager (on-site)', 'Chief operator'],
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
      construction: { 1: 25.46, 2: 25.96, 3: 26.31, 4: 26.78, 5: 27.32, 6: 28.12, 7: 29.00, 8: 29.89, 9: 30.68 },
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
    // Note: Casual Saturday is x1.75 (not x1.50) for construction.
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
      { employment_type: 'casual',     day_type: 'saturday',       multiplier: 1.75, description: 'Casual Saturday — ×1.75 of casual base (incl. loading)' },
      { employment_type: 'casual',     day_type: 'sunday',         multiplier: 2.00, description: 'Casual Sunday — double time (×2.0 of casual base)' },
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
    // Saturday after 2 hrs: x2.00.
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
        description: 'If you work overtime for more than 2 hours and your employer did not give you notice the day before, you are entitled to a meal allowance of $19.00.',
        trigger_condition: 'Overtime of more than 2 hours without notice',
        amount: 19.00, amount_type: 'fixed', per_unit: 'per_meal',
        is_all_purpose: false,
      },
      {
        allowance_type: 'tool_carpenter',
        name: 'Tool allowance (carpenter)',
        description: 'If you are employed as a carpenter and are required to supply your own tools, you are entitled to $39.60 per week.',
        trigger_condition: 'Carpenter required to supply own tools',
        amount: 39.60, amount_type: 'fixed', per_unit: 'per_week',
        is_all_purpose: false,
      },
      {
        allowance_type: 'tool_plasterer',
        name: 'Tool allowance (plasterer)',
        description: 'If you are employed as a plasterer and are required to supply your own tools, you are entitled to $32.76 per week.',
        trigger_condition: 'Plasterer required to supply own tools',
        amount: 32.76, amount_type: 'fixed', per_unit: 'per_week',
        is_all_purpose: false,
      },
      {
        allowance_type: 'camping',
        name: 'Camping allowance',
        description: 'If you are required to camp at or near the construction site, you are entitled to a camping allowance of $254.97 per week.',
        trigger_condition: 'Required to camp at or near the construction site',
        amount: 254.97, amount_type: 'fixed', per_unit: 'per_week',
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
        question_key: 'construction_level',
        question_text: 'What is your construction worker level?',
        help_text: 'Your level depends on your qualifications, trade certification, and the type of work you perform. CW/ECW 1(a) is entry-level labouring. CW/ECW 3 is a qualified tradesperson. CW/ECW 6 is the most senior on-site classification.',
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
      { question_key: 'construction_level', answer_key: 'cw1a', answer_text: 'CW/ECW 1(a) — Entry-level labourer (general labouring, site cleaner)', sort_order: 1 },
      { question_key: 'construction_level', answer_key: 'cw1b', answer_text: 'CW/ECW 1(b) — Skilled labourer (concrete assistant, steel fixing assistant)', sort_order: 2 },
      { question_key: 'construction_level', answer_key: 'cw1c', answer_text: 'CW/ECW 1(c) — Plant operator (basic), traffic controller, skilled concreter assistant', sort_order: 3 },
      { question_key: 'construction_level', answer_key: 'cw1d', answer_text: 'CW/ECW 1(d) — Senior labourer, multi-skilled operator, leading hand', sort_order: 4 },
      { question_key: 'construction_level', answer_key: 'cw2',  answer_text: 'CW/ECW 2 — Semi-skilled tradesperson, apprentice (1st/2nd year), dogman, forklift operator', sort_order: 5 },
      { question_key: 'construction_level', answer_key: 'cw3',  answer_text: 'CW/ECW 3 — Qualified tradesperson (carpenter, plumber, electrician), crane operator, scaffolder', sort_order: 6 },
      { question_key: 'construction_level', answer_key: 'cw4',  answer_text: 'CW/ECW 4 — Advanced tradesperson, specialist operator, tower crane operator', sort_order: 7 },
      { question_key: 'construction_level', answer_key: 'cw5',  answer_text: 'CW/ECW 5 — Site supervisor, senior specialist, project coordinator', sort_order: 8 },
      { question_key: 'construction_level', answer_key: 'cw6',  answer_text: 'CW/ECW 6 — Senior site supervisor, construction manager (on-site), chief operator', sort_order: 9 },
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
