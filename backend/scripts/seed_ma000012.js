/**
 * Seed script — Pharmacy Industry Award 2020 [MA000012]
 * Pay rates effective 1 July 2025
 * Source: FWC MAPD API + FWO pay guide MA000012
 *
 * One stream:
 *   pharmacy — Pharmacy Assistant L1 through Pharmacist Manager (10 classifications)
 *
 * Adult FT/PT hourly rates (from API, base_rate_type = Hourly):
 *   L1: $26.55   L2: $27.16   L3: $28.12   L4: $29.27
 *   L5 (Intern 1st half): $31.05   L6 (Intern 2nd half): $32.11
 *   L7 (Pharmacist): $38.14   L8 (Experienced): $41.78
 *   L9 (In Charge): $42.76   L10 (Manager): $47.65
 *
 * Casual rates = FT rate × 1.25
 *
 * Penalty rates:
 *   FT/PT: Sat ×1.25, Sun ×2.00, PH ×2.50
 *   Casual: Sat ×1.25, Sun ×2.00, PH ×2.50
 *
 * Overtime (7.6hr daily threshold):
 *   First 2 OT hours: ×1.50, after 2 OT hours: ×2.00
 *
 * Junior rates: 16=50%, 17=60%, 18=70%, 19=80%, 20=100%
 *
 * Allowances:
 *   Meal (OT >1.5hr): $23.74, Meal (further): $21.28,
 *   Vehicle: $0.99/km, Clothing FT: $6.25/wk, Clothing PT/casual: $1.25/shift
 *
 * Run after migrate.js: node scripts/seed_ma000012.js
 */
require('dotenv').config();
const pool = require('../src/db/pool');

const AWARD_CODE = 'MA000012';
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
      'Pharmacy Industry Award 2020',
      EFFECTIVE_DATE,
      'https://awards.fairwork.gov.au/MA000012.html',
    ]);

    // ── Classifications ────────────────────────────────────────────────────────
    const classifications = [
      {
        level: 1, stream: 'pharmacy',
        fwc_id: 549,
        title: 'Pharmacy Assistant Level 1',
        description: 'Entry-level pharmacy assistant. You perform basic duties under direct supervision, including general retail tasks and simple customer service.',
        duties: [
          'Greeting customers and providing basic assistance',
          'Operating cash registers and processing sales',
          'Stocking shelves and maintaining product displays',
          'Maintaining cleanliness and tidiness of the pharmacy',
          'Performing general retail duties under direct supervision',
        ],
        indicative_tasks: ['Sales assistant', 'Retail assistant', 'Shop assistant'],
        sort_order: 10,
      },
      {
        level: 2, stream: 'pharmacy',
        fwc_id: 550,
        title: 'Pharmacy Assistant Level 2',
        description: 'Pharmacy assistant with some experience or qualifications. You perform a wider range of tasks with less direct supervision than Level 1.',
        duties: [
          'Assisting customers with non-prescription product enquiries',
          'Processing prescriptions for dispensing by a pharmacist',
          'Managing stock levels and ordering supplies',
          'Operating pharmacy-specific software systems',
          'Providing customer service including phone enquiries',
        ],
        indicative_tasks: ['Pharmacy assistant', 'Dispensary assistant (entry)'],
        sort_order: 20,
      },
      {
        level: 3, stream: 'pharmacy',
        fwc_id: 551,
        title: 'Pharmacy Assistant Level 3',
        description: 'Experienced pharmacy assistant with Certificate III or equivalent experience. You work with limited supervision and may assist with dispensary tasks.',
        duties: [
          'Assisting pharmacists in the dispensary under supervision',
          'Providing health product advice to customers',
          'Processing and managing prescription records',
          'Training and mentoring junior pharmacy assistants',
          'Managing inventory and conducting stocktakes',
        ],
        indicative_tasks: ['Senior pharmacy assistant', 'Dispensary assistant (experienced)'],
        sort_order: 30,
      },
      {
        level: 4, stream: 'pharmacy',
        fwc_id: 552,
        title: 'Pharmacy Assistant Level 4',
        description: 'Highly experienced pharmacy assistant, typically holding a Certificate IV or equivalent. You perform advanced dispensary support and may supervise other assistants.',
        duties: [
          'Performing advanced dispensary tasks under pharmacist direction',
          'Supervising pharmacy assistants at lower levels',
          'Managing pharmacy operations including rosters and stock control',
          'Providing specialised health advice on non-prescription products',
          'Coordinating workflow within the dispensary',
        ],
        indicative_tasks: ['Lead pharmacy assistant', 'Dispensary technician', 'Senior dispensary assistant'],
        sort_order: 40,
      },
      {
        level: 5, stream: 'pharmacy',
        fwc_id: 557,
        title: 'Pharmacy Intern (1st half)',
        description: 'A pharmacy graduate undertaking their first half of the internship period required for pharmacist registration.',
        duties: [
          'Dispensing prescriptions under pharmacist supervision',
          'Providing patient counselling on medication use',
          'Participating in clinical reviews and medication management',
          'Completing intern training program requirements',
          'Assisting with pharmacy administration and record-keeping',
        ],
        indicative_tasks: ['Pharmacy intern (first half of internship)'],
        sort_order: 50,
      },
      {
        level: 6, stream: 'pharmacy',
        fwc_id: 558,
        title: 'Pharmacy Intern (2nd half)',
        description: 'A pharmacy graduate undertaking the second half of their internship period, with greater responsibility and autonomy than the first half.',
        duties: [
          'Dispensing prescriptions with increasing autonomy',
          'Providing detailed patient counselling and medication reviews',
          'Managing clinical workflow and complex dispensing tasks',
          'Supervising pharmacy assistants in daily operations',
          'Completing final intern assessment requirements',
        ],
        indicative_tasks: ['Pharmacy intern (second half of internship)'],
        sort_order: 60,
      },
      {
        level: 7, stream: 'pharmacy',
        fwc_id: 559,
        title: 'Pharmacist',
        description: 'A registered pharmacist responsible for dispensing medications, providing clinical advice, and ensuring compliance with pharmacy regulations.',
        duties: [
          'Dispensing prescriptions and checking dispensed medications',
          'Providing clinical advice and counselling to patients',
          'Managing drug interactions and contraindications',
          'Supervising interns and pharmacy assistants',
          'Ensuring compliance with pharmacy legislation and standards',
        ],
        indicative_tasks: ['Pharmacist', 'Dispensing pharmacist'],
        sort_order: 70,
      },
      {
        level: 8, stream: 'pharmacy',
        fwc_id: 560,
        title: 'Experienced Pharmacist',
        description: 'A pharmacist with significant post-registration experience who performs advanced clinical duties and may mentor less experienced pharmacists.',
        duties: [
          'Performing advanced clinical services including medication reviews',
          'Mentoring and supervising pharmacists and interns',
          'Managing complex patient cases and clinical decisions',
          'Contributing to quality assurance and clinical governance',
          'Providing specialised services such as compounding or vaccinations',
        ],
        indicative_tasks: ['Senior pharmacist', 'Clinical pharmacist'],
        sort_order: 80,
      },
      {
        level: 9, stream: 'pharmacy',
        fwc_id: 561,
        title: 'Pharmacist in Charge',
        description: 'A pharmacist responsible for the day-to-day management and professional oversight of a pharmacy or pharmacy department.',
        duties: [
          'Overseeing all dispensing and clinical operations',
          'Ensuring regulatory compliance and maintaining pharmacy accreditation',
          'Managing staff rosters, training, and performance',
          'Liaising with health professionals and regulatory bodies',
          'Maintaining drug storage, security, and controlled substance records',
        ],
        indicative_tasks: ['Pharmacist in charge', 'Pharmacy supervisor'],
        sort_order: 90,
      },
      {
        level: 10, stream: 'pharmacy',
        fwc_id: 562,
        title: 'Pharmacist Manager',
        description: 'The most senior pharmacist classification. You manage the overall operations of the pharmacy including business, staffing, and clinical governance.',
        duties: [
          'Managing overall pharmacy operations and business performance',
          'Setting and monitoring clinical standards and policies',
          'Managing budgets, procurement, and financial performance',
          'Leading recruitment, training, and staff development',
          'Representing the pharmacy to external stakeholders and regulators',
        ],
        indicative_tasks: ['Pharmacy manager', 'Pharmacy business manager'],
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
      pharmacy: { 1: 26.55, 2: 27.16, 3: 28.12, 4: 29.27, 5: 31.05, 6: 32.11, 7: 38.14, 8: 41.78, 9: 42.76, 10: 47.65 },
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
    // FT/PT: Sat ×1.25, Sun ×2.00, PH ×2.50
    // Casual: Sat ×1.25, Sun ×2.00, PH ×2.50
    const penaltyRates = [
      // ── Full-time ───────────────────────────────────────────────────────────
      { employment_type: 'full_time',  day_type: 'weekday',        multiplier: 1.00, description: 'Weekday ordinary rate (×1.0)' },
      { employment_type: 'full_time',  day_type: 'saturday',       multiplier: 1.25, description: 'Saturday — time and a quarter (×1.25)' },
      { employment_type: 'full_time',  day_type: 'sunday',         multiplier: 2.00, description: 'Sunday — double time (×2.0)' },
      { employment_type: 'full_time',  day_type: 'public_holiday', multiplier: 2.50, description: 'Public holiday — double time and a half (×2.5)' },
      // ── Part-time ───────────────────────────────────────────────────────────
      { employment_type: 'part_time',  day_type: 'weekday',        multiplier: 1.00, description: 'Weekday ordinary rate (×1.0)' },
      { employment_type: 'part_time',  day_type: 'saturday',       multiplier: 1.25, description: 'Saturday — time and a quarter (×1.25)' },
      { employment_type: 'part_time',  day_type: 'sunday',         multiplier: 2.00, description: 'Sunday — double time (×2.0)' },
      { employment_type: 'part_time',  day_type: 'public_holiday', multiplier: 2.50, description: 'Public holiday — double time and a half (×2.5)' },
      // ── Casual ──────────────────────────────────────────────────────────────
      { employment_type: 'casual',     day_type: 'weekday',        multiplier: 1.00, description: 'Weekday ordinary casual rate (incl. 25% casual loading)' },
      { employment_type: 'casual',     day_type: 'saturday',       multiplier: 1.25, description: 'Saturday — casual rate × 1.25' },
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
    // Source: FWC MAPD API expense/wage allowances for MA000012.
    const allowances = [
      {
        allowance_type: 'meal',
        name: 'Meal allowance (overtime >1.5hr)',
        description: 'If you work overtime for more than 1.5 hours and your employer did not give you notice the day before, you are entitled to a meal allowance of $23.74.',
        trigger_condition: 'Overtime of more than 1.5 hours without notice',
        amount: 23.74, amount_type: 'fixed', per_unit: 'per_meal',
        is_all_purpose: false,
      },
      {
        allowance_type: 'meal_further',
        name: 'Meal allowance (further)',
        description: 'For each further period of overtime of 4 hours or more after the initial meal allowance, you are entitled to a further meal allowance of $21.28.',
        trigger_condition: 'Each further 4 hours of overtime after initial meal allowance',
        amount: 21.28, amount_type: 'fixed', per_unit: 'per_meal',
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
        allowance_type: 'clothing_ft',
        name: 'Clothing allowance (full-time)',
        description: 'If your employer requires you to wear a uniform and does not supply it, full-time employees are entitled to $6.25 per week.',
        trigger_condition: 'Employer requires uniform not supplied — full-time employee',
        amount: 6.25, amount_type: 'fixed', per_unit: 'per_week',
        is_all_purpose: false,
      },
      {
        allowance_type: 'clothing_pt_casual',
        name: 'Clothing allowance (part-time/casual)',
        description: 'If your employer requires you to wear a uniform and does not supply it, part-time and casual employees are entitled to $1.25 per shift.',
        trigger_condition: 'Employer requires uniform not supplied — part-time or casual employee',
        amount: 1.25, amount_type: 'fixed', per_unit: 'per_shift',
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
      {
        employment_type: null,
        shift_hours_min: 4.0, shift_hours_max: null,
        break_type: 'rest', break_duration_min: 10, is_paid: true,
        timing_rule: 'One 10-minute paid rest break per 4 hours worked',
        description: 'You are entitled to a paid 10-minute rest break for each 4 hours of work.',
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
    // Single question flow: pharmacy_level
    const questions = [
      {
        question_key: 'pharmacy_level',
        question_text: 'What is your role or classification level in the pharmacy?',
        help_text: 'Your level depends on your qualifications and role. Levels 1-4 are pharmacy assistants with increasing experience. Levels 5-6 are pharmacy interns. Levels 7-10 are registered pharmacists with increasing responsibility.',
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
      { question_key: 'pharmacy_level', answer_key: 'l1',  answer_text: 'Pharmacy Assistant Level 1 — entry-level retail and customer service', sort_order: 1 },
      { question_key: 'pharmacy_level', answer_key: 'l2',  answer_text: 'Pharmacy Assistant Level 2 — some experience, dispensary support', sort_order: 2 },
      { question_key: 'pharmacy_level', answer_key: 'l3',  answer_text: 'Pharmacy Assistant Level 3 — experienced, Certificate III or equivalent', sort_order: 3 },
      { question_key: 'pharmacy_level', answer_key: 'l4',  answer_text: 'Pharmacy Assistant Level 4 — advanced dispensary, Certificate IV or equivalent', sort_order: 4 },
      { question_key: 'pharmacy_level', answer_key: 'l5',  answer_text: 'Pharmacy Intern (1st half of internship)', sort_order: 5 },
      { question_key: 'pharmacy_level', answer_key: 'l6',  answer_text: 'Pharmacy Intern (2nd half of internship)', sort_order: 6 },
      { question_key: 'pharmacy_level', answer_key: 'l7',  answer_text: 'Pharmacist — registered, dispensing and clinical duties', sort_order: 7 },
      { question_key: 'pharmacy_level', answer_key: 'l8',  answer_text: 'Experienced Pharmacist — senior clinical and mentoring role', sort_order: 8 },
      { question_key: 'pharmacy_level', answer_key: 'l9',  answer_text: 'Pharmacist in Charge — day-to-day pharmacy management', sort_order: 9 },
      { question_key: 'pharmacy_level', answer_key: 'l10', answer_text: 'Pharmacist Manager — overall pharmacy operations and business management', sort_order: 10 },
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
