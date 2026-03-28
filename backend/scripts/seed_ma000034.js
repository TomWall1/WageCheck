/**
 * Seed script — Nurses Award 2020 [MA000034]
 * Pay rates effective 1 July 2025
 * Source: FWC MAPD API + FWO pay guide MA000034
 *
 * One stream:
 *   nursing — 8 key levels from Nursing Assistant to Nurse Practitioner
 *
 * Adult FT/PT hourly rates (from API, base_rate_type = Hourly):
 *   L1 (Nursing Assistant): $26.51   L2 (EN): $35.45
 *   L3 (RN L1 4yr entry): $31.99    L4 (RN L2): $45.76
 *   L5 (RN L3): $49.81              L6 (RN L4): $58.34
 *   L7 (RN L5): $66.91              L8 (Nurse Practitioner): $47.16
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
 * Junior rates: None (nurses require qualifications)
 *
 * Allowances:
 *   Meal (OT): $16.62, Meal further: $14.98, Vehicle: $0.99/km,
 *   Uniform shift: $1.23, Uniform wk: $6.24, Laundry shift: $0.32, Laundry wk: $1.49
 *
 * Run after migrate.js: node scripts/seed_ma000034.js
 */
require('dotenv').config();
const pool = require('../src/db/pool');

const AWARD_CODE = 'MA000034';
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
      'Nurses Award 2020',
      EFFECTIVE_DATE,
      'https://awards.fairwork.gov.au/MA000034.html',
    ]);

    // ── Classifications ────────────────────────────────────────────────────────
    const classifications = [
      {
        level: 1, stream: 'nursing',
        fwc_id: null,
        title: 'Nursing Assistant',
        description: 'Entry-level nursing support role. You assist registered and enrolled nurses with basic patient care duties under direct supervision.',
        duties: [
          'Assisting patients with activities of daily living such as bathing, dressing, and feeding',
          'Monitoring and recording basic patient observations under supervision',
          'Maintaining a clean and safe patient environment',
          'Transporting patients and delivering supplies within the facility',
        ],
        indicative_tasks: ['Nursing assistant', 'Patient care assistant', 'Ward assistant'],
        sort_order: 10,
      },
      {
        level: 2, stream: 'nursing',
        fwc_id: 192332,
        title: 'Enrolled Nurse',
        description: 'Qualified enrolled nurse who has completed a Diploma of Nursing. You provide nursing care under the direction of a registered nurse, including medication administration where authorised.',
        duties: [
          'Administering medications as authorised and recording outcomes',
          'Performing clinical assessments and observations of patients',
          'Implementing care plans under the direction of a registered nurse',
          'Supervising nursing assistants and student enrolled nurses',
        ],
        indicative_tasks: ['Enrolled nurse', 'Enrolled nurse (supervising)'],
        sort_order: 20,
      },
      {
        level: 3, stream: 'nursing',
        fwc_id: 1246,
        title: 'Registered Nurse Level 1 (Graduate Entry)',
        description: 'Graduate registered nurse with a 4-year degree. You are in your first year of practice and provide direct patient care under mentorship.',
        duties: [
          'Providing direct patient care including assessments, planning, and evaluation',
          'Administering medications and treatments as prescribed',
          'Participating in clinical handovers and multidisciplinary team meetings',
          'Completing graduate nurse development programs and competency requirements',
        ],
        indicative_tasks: ['Graduate registered nurse', 'RN Level 1 (Year 1)'],
        sort_order: 30,
      },
      {
        level: 4, stream: 'nursing',
        fwc_id: null,
        title: 'Registered Nurse Level 2',
        description: 'Clinical nurse or senior registered nurse. You have significant clinical experience and are responsible for coordinating nursing care within a ward or unit.',
        duties: [
          'Coordinating nursing care delivery within a ward or clinical unit',
          'Mentoring and supporting junior registered nurses and students',
          'Leading clinical handovers and shift coordination',
          'Contributing to policy development and quality improvement activities',
        ],
        indicative_tasks: ['Clinical nurse', 'Senior RN', 'RN Level 2'],
        sort_order: 40,
      },
      {
        level: 5, stream: 'nursing',
        fwc_id: 192342,
        title: 'Registered Nurse Level 3',
        description: 'Clinical nurse specialist or nurse educator. You have advanced clinical expertise and are responsible for specialist clinical practice, education, or research.',
        duties: [
          'Providing specialist clinical nursing care in a defined area of practice',
          'Developing and delivering education and training programs for nursing staff',
          'Leading clinical research and evidence-based practice initiatives',
          'Acting as a clinical resource and consultant within the organisation',
        ],
        indicative_tasks: ['Clinical nurse specialist', 'Nurse educator', 'RN Level 3'],
        sort_order: 50,
      },
      {
        level: 6, stream: 'nursing',
        fwc_id: 192343,
        title: 'Registered Nurse Level 4',
        description: 'Nurse unit manager or assistant director of nursing. You manage a nursing unit or department and are responsible for staffing, budgets, and quality of care.',
        duties: [
          'Managing nursing staff within a unit including rostering and performance management',
          'Overseeing unit budgets and resource allocation',
          'Ensuring compliance with clinical standards and accreditation requirements',
          'Participating in organisational planning and strategic decision-making',
        ],
        indicative_tasks: ['Nurse unit manager', 'Assistant director of nursing', 'RN Level 4'],
        sort_order: 60,
      },
      {
        level: 7, stream: 'nursing',
        fwc_id: 192344,
        title: 'Registered Nurse Level 5',
        description: 'Director of nursing or senior nursing executive. You are responsible for the overall management and strategic direction of nursing services within the organisation.',
        duties: [
          'Providing strategic leadership for nursing services across the organisation',
          'Developing and implementing nursing policies, standards, and procedures',
          'Managing senior nursing staff and overseeing professional development',
          'Representing nursing services at executive and board level',
        ],
        indicative_tasks: ['Director of nursing', 'Deputy director of nursing', 'RN Level 5'],
        sort_order: 70,
      },
      {
        level: 8, stream: 'nursing',
        fwc_id: 1283,
        title: 'Nurse Practitioner',
        description: 'Nurse practitioner with endorsement from the Nursing and Midwifery Board of Australia. You practise autonomously and may prescribe medications, order diagnostic tests, and refer patients.',
        duties: [
          'Providing advanced autonomous clinical care within your scope of practice',
          'Prescribing medications and ordering diagnostic investigations',
          'Referring patients to specialist medical practitioners',
          'Leading clinical research and contributing to evidence-based health policy',
        ],
        indicative_tasks: ['Nurse practitioner', 'NP (1st year)'],
        sort_order: 80,
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
      nursing: { 1: 26.51, 2: 35.45, 3: 31.99, 4: 45.76, 5: 49.81, 6: 58.34, 7: 66.91, 8: 47.16 },
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
    // Note: Afternoon/night shift loadings excluded (not standard Sat/Sun/PH penalty rows).
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
        description: 'If you work overtime for more than 2 hours and your employer did not give you notice the day before, you are entitled to a meal allowance of $16.62.',
        trigger_condition: 'Overtime of more than 2 hours without notice',
        amount: 16.62, amount_type: 'fixed', per_unit: 'per_meal',
        is_all_purpose: false,
      },
      {
        allowance_type: 'meal_further',
        name: 'Meal allowance (further meals)',
        description: 'If overtime continues beyond a further 4 hours, you are entitled to an additional meal allowance of $14.98.',
        trigger_condition: 'Overtime continues beyond a further 4 hours',
        amount: 14.98, amount_type: 'fixed', per_unit: 'per_meal',
        is_all_purpose: false,
      },
      {
        allowance_type: 'vehicle',
        name: 'Vehicle allowance',
        description: 'If you are required to use your own vehicle for work purposes, you are entitled to $0.99 per kilometre.',
        trigger_condition: 'Required to use own vehicle for work',
        amount: 0.99, amount_type: 'per_km', per_unit: 'per_km',
        is_all_purpose: false,
      },
      {
        allowance_type: 'uniform_shift',
        name: 'Uniform allowance (per shift)',
        description: 'If you are required to wear a uniform and your employer does not supply or launder it, you are entitled to $1.23 per shift.',
        trigger_condition: 'Required to wear uniform not supplied by employer',
        amount: 1.23, amount_type: 'fixed', per_unit: 'per_shift',
        is_all_purpose: false,
      },
      {
        allowance_type: 'uniform_week',
        name: 'Uniform allowance (per week)',
        description: 'If you are required to wear a uniform and your employer does not supply or launder it, you are entitled to $6.24 per week.',
        trigger_condition: 'Required to wear uniform not supplied by employer',
        amount: 6.24, amount_type: 'fixed', per_unit: 'per_week',
        is_all_purpose: false,
      },
      {
        allowance_type: 'laundry_shift',
        name: 'Laundry allowance (per shift)',
        description: 'If you are required to launder your own uniform, you are entitled to $0.32 per shift.',
        trigger_condition: 'Required to launder own uniform',
        amount: 0.32, amount_type: 'fixed', per_unit: 'per_shift',
        is_all_purpose: false,
      },
      {
        allowance_type: 'laundry_week',
        name: 'Laundry allowance (per week)',
        description: 'If you are required to launder your own uniform, you are entitled to $1.49 per week.',
        trigger_condition: 'Required to launder own uniform',
        amount: 1.49, amount_type: 'fixed', per_unit: 'per_week',
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
    // Single question flow — one stream with 8 levels.
    const questions = [
      {
        question_key: 'nursing_level',
        question_text: 'What is your nursing classification level?',
        help_text: 'Your level depends on your qualifications and role. Nursing assistants provide basic support. Enrolled nurses hold a Diploma of Nursing. Registered nurses hold a Bachelor degree or higher. Nurse practitioners have additional endorsement from the Nursing and Midwifery Board.',
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
      { question_key: 'nursing_level', answer_key: 'nursing_assistant',    answer_text: 'Nursing Assistant — basic patient care support under supervision', sort_order: 1 },
      { question_key: 'nursing_level', answer_key: 'enrolled_nurse',       answer_text: 'Enrolled Nurse — Diploma of Nursing, medication administration', sort_order: 2 },
      { question_key: 'nursing_level', answer_key: 'rn_level_1',           answer_text: 'Registered Nurse Level 1 — graduate entry (4-year degree)', sort_order: 3 },
      { question_key: 'nursing_level', answer_key: 'rn_level_2',           answer_text: 'Registered Nurse Level 2 — clinical nurse, ward coordinator', sort_order: 4 },
      { question_key: 'nursing_level', answer_key: 'rn_level_3',           answer_text: 'Registered Nurse Level 3 — clinical nurse specialist, educator', sort_order: 5 },
      { question_key: 'nursing_level', answer_key: 'rn_level_4',           answer_text: 'Registered Nurse Level 4 — nurse unit manager, assistant DON', sort_order: 6 },
      { question_key: 'nursing_level', answer_key: 'rn_level_5',           answer_text: 'Registered Nurse Level 5 — director of nursing', sort_order: 7 },
      { question_key: 'nursing_level', answer_key: 'nurse_practitioner',   answer_text: 'Nurse Practitioner — autonomous practice, prescribing authority', sort_order: 8 },
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
