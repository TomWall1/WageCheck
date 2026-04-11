/**
 * Seed script — Educational Services (Teachers) Award 2020 [MA000077]
 * Pay rates effective 1 July 2025
 * Source: FWC MAPD API + FWO pay guide MA000077
 *
 * One stream:
 *   teacher — Graduate Teacher through Level 5 (5 classifications, non-aged-care rates)
 *
 * Adult FT/PT hourly rates (from API, base_rate_type = Hourly):
 *   L1 (Graduate): $36.69   L2 (Proficient): $40.10   L3 (3yr at L2): $43.66
 *   L4 (3yr at L3): $47.21   L5 (Highly Accomplished/Lead): $50.76
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
 * Junior rates: None (teachers are degree-qualified adults)
 *
 * Allowances:
 *   Vehicle car: $0.99/km, Motorcycle: $0.33/km
 *
 * Run after migrate.js: node scripts/seed_ma000077.js
 */
require('dotenv').config();
const pool = require('../src/db/pool');

const AWARD_CODE = 'MA000077';
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
      'Educational Services (Teachers) Award 2020',
      EFFECTIVE_DATE,
      'https://awards.fairwork.gov.au/MA000077.html',
    ]);

    // ── Classifications ────────────────────────────────────────────────────────
    const classifications = [
      {
        level: 1, stream: 'teacher',
        fwc_id: 108957,
        title: 'Graduate Teacher (Level 1)',
        description: 'A teacher who has completed a teaching qualification and is in their first years of teaching. You hold provisional or conditional registration and are working towards proficient teacher standards.',
        duties: [
          'Planning and delivering lessons according to the curriculum',
          'Assessing and reporting on student progress',
          'Participating in professional development and mentoring programs',
          'Managing classroom behaviour and creating a positive learning environment',
          'Communicating with parents, guardians, and colleagues about student welfare',
        ],
        indicative_tasks: ['Graduate teacher', 'Beginning teacher', 'Provisional teacher'],
        sort_order: 10,
      },
      {
        level: 2, stream: 'teacher',
        fwc_id: 108958,
        title: 'Teacher Level 2 (Proficient)',
        description: 'A teacher who has achieved proficient teacher status. You demonstrate consistent, effective teaching practice and have met the requirements for full registration.',
        duties: [
          'Developing and implementing effective teaching and learning programs',
          'Using a range of assessment strategies to monitor student learning',
          'Contributing to collegial activities and school planning',
          'Mentoring graduate teachers and providing professional guidance',
          'Engaging in ongoing professional learning and development',
        ],
        indicative_tasks: ['Proficient teacher', 'Registered teacher (full)'],
        sort_order: 20,
      },
      {
        level: 3, stream: 'teacher',
        fwc_id: 108959,
        title: 'Teacher Level 3 (3 years at Level 2)',
        description: 'A teacher who has completed at least 3 years of service at Level 2. You demonstrate a high level of professional knowledge and contribute to broader school programs.',
        duties: [
          'Leading curriculum development and implementation in subject areas',
          'Coordinating student welfare and support programs',
          'Providing educational leadership within the school community',
          'Developing assessment and reporting frameworks',
          'Supporting school-wide improvement initiatives',
        ],
        indicative_tasks: ['Experienced teacher', 'Subject coordinator', 'Year level coordinator'],
        sort_order: 30,
      },
      {
        level: 4, stream: 'teacher',
        fwc_id: 108960,
        title: 'Teacher Level 4 (3 years at Level 3)',
        description: 'A teacher who has completed at least 3 years of service at Level 3. You demonstrate highly effective teaching practice and make significant contributions to the school.',
        duties: [
          'Leading whole-school curriculum and pedagogy initiatives',
          'Mentoring and coaching teachers across the school',
          'Contributing to school governance and strategic planning',
          'Managing specialist programs or learning areas',
          'Engaging in external professional activities and community partnerships',
        ],
        indicative_tasks: ['Senior teacher', 'Head of department', 'Curriculum leader'],
        sort_order: 40,
      },
      {
        level: 5, stream: 'teacher',
        fwc_id: 108961,
        title: 'Teacher Level 5 (Highly Accomplished/Lead)',
        description: 'The most senior teacher classification. You are recognised as a highly accomplished or lead teacher, demonstrating exemplary teaching practice and educational leadership.',
        duties: [
          'Providing expert teaching and educational leadership across the school',
          'Leading professional learning communities and teacher development programs',
          'Driving school-wide improvement in teaching and learning outcomes',
          'Contributing to educational policy and practice beyond the school',
          'Modelling exemplary teaching practice for colleagues',
        ],
        indicative_tasks: ['Highly accomplished teacher', 'Lead teacher', 'Master teacher'],
        sort_order: 50,
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
      teacher: { 1: 36.69, 2: 40.10, 3: 43.66, 4: 47.21, 5: 50.76 },
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
    // Source: FWC MAPD API expense/wage allowances for MA000077.
    const allowances = [
      {
        allowance_type: 'vehicle',
        name: 'Vehicle allowance (car)',
        description: 'If you are required to use your own car for work purposes, you are entitled to $0.99 per kilometre.',
        trigger_condition: 'Required to use own car for work',
        amount: 0.99, amount_type: 'per_km', per_unit: 'per_km',
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
    // Single question flow: teacher_level
    const questions = [
      {
        question_key: 'teacher_level',
        question_text: 'What is your teacher classification level?',
        help_text: 'Your level depends on your registration status and years of experience. Level 1 is for graduate teachers. Level 2 is for proficient (fully registered) teachers. Levels 3 and 4 require 3 years at the previous level. Level 5 is for highly accomplished or lead teachers.',
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
      { question_key: 'teacher_level', answer_key: 'l1', answer_text: 'Level 1 — Graduate teacher, provisional registration', sort_order: 1 },
      { question_key: 'teacher_level', answer_key: 'l2', answer_text: 'Level 2 — Proficient teacher, full registration', sort_order: 2 },
      { question_key: 'teacher_level', answer_key: 'l3', answer_text: 'Level 3 — 3+ years at Level 2, curriculum leadership', sort_order: 3 },
      { question_key: 'teacher_level', answer_key: 'l4', answer_text: 'Level 4 — 3+ years at Level 3, senior teaching role', sort_order: 4 },
      { question_key: 'teacher_level', answer_key: 'l5', answer_text: 'Level 5 — Highly accomplished or lead teacher', sort_order: 5 },
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
