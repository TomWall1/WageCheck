/**
 * Seed script — Aged Care Award 2010 [MA000018]
 * Pay rates effective 1 July 2025
 * Source: FWC MAPD API + FWO pay guide MA000018
 *
 * Two streams:
 *   aged_care_general — General Level 1 through 7 (7 classifications)
 *   aged_care_direct  — Direct Care Level 1 through 6 (6 classifications)
 *
 * Adult FT/PT hourly rates (from API, base_rate_type = Hourly):
 *   General: L1: $26.51  L2: $27.56  L3: $28.62  L4: $28.96  L5: $29.94
 *            L6: ~$35.23  L7: ~$35.86  (L6/L7 approximate — API rate-limited)
 *   Direct Care: L1: $31.13  L2: $32.86  L3: $33.27  L4: $34.15  L5: $37.35  L6: $37.14
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
 * Junior rates (General stream only):
 *   <16: 36.8%, 16: 47.3%, 17: 57.8%, 18: 68.3%, 19: 82.5%, 20: 97.7%
 *
 * Allowances:
 *   Meal (OT): $16.62, Meal further: $14.98, Vehicle: $0.99/km,
 *   Tool (chefs): $13.41/wk, Laundry shift: $0.32, Laundry week: $1.49
 *
 * Run after migrate.js: node scripts/seed_ma000018.js
 */
require('dotenv').config();
const pool = require('../src/db/pool');

const AWARD_CODE = 'MA000018';
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
      'Aged Care Award 2010',
      EFFECTIVE_DATE,
      'https://awards.fairwork.gov.au/MA000018.html',
    ]);

    // ── Classifications ────────────────────────────────────────────────────────
    const classifications = [
      // ── Aged Care General stream ────────────────────────────────────────────
      {
        level: 1, stream: 'aged_care_general',
        fwc_id: 656,
        title: 'Aged Care General Level 1',
        description: 'Entry-level general aged care worker. You perform basic duties under direct supervision with limited or no prior experience required.',
        duties: [
          'Performing general cleaning and laundry duties in the facility',
          'Assisting with basic food preparation and serving meals',
          'Carrying out basic maintenance and gardening tasks',
          'Performing general administrative support duties under supervision',
        ],
        indicative_tasks: ['Cleaner', 'Laundry hand', 'Kitchen assistant', 'General hand'],
        sort_order: 10,
      },
      {
        level: 2, stream: 'aged_care_general',
        fwc_id: 657,
        title: 'Aged Care General Level 2',
        description: 'General aged care worker with some experience or training. You perform a wider range of duties with less direct supervision.',
        duties: [
          'Performing food services duties including basic cooking and meal preparation',
          'Carrying out maintenance tasks requiring some skill',
          'Performing clerical and reception duties',
          'Assisting with recreational activities for residents',
        ],
        indicative_tasks: ['Food services worker', 'Maintenance worker', 'Receptionist', 'Activities assistant'],
        sort_order: 20,
      },
      {
        level: 3, stream: 'aged_care_general',
        fwc_id: 658,
        title: 'Aged Care General Level 3',
        description: 'Experienced general aged care worker or holder of a relevant Certificate III qualification. You perform duties with a high degree of autonomy.',
        duties: [
          'Performing advanced food preparation and cooking duties',
          'Coordinating maintenance activities across the facility',
          'Performing senior administrative and clerical duties',
          'Leading recreational programs for residents',
        ],
        indicative_tasks: ['Qualified cook', 'Senior maintenance worker', 'Senior receptionist', 'Activities coordinator'],
        sort_order: 30,
      },
      {
        level: 4, stream: 'aged_care_general',
        fwc_id: 659,
        title: 'Aged Care General Level 4',
        description: 'Senior general aged care worker with advanced qualifications or significant experience. You may supervise other staff in your area.',
        duties: [
          'Supervising food services or maintenance teams',
          'Performing specialist administrative or accounting duties',
          'Coordinating facility operations in your area of expertise',
          'Training and mentoring junior staff members',
        ],
        indicative_tasks: ['Senior cook', 'Maintenance supervisor', 'Senior administrator', 'Team leader (general)'],
        sort_order: 40,
      },
      {
        level: 5, stream: 'aged_care_general',
        fwc_id: 660,
        title: 'Aged Care General Level 5',
        description: 'Highly experienced general aged care worker with specialist qualifications. You are responsible for a department or functional area.',
        duties: [
          'Managing a department such as food services, maintenance, or administration',
          'Developing and implementing operational procedures',
          'Managing budgets and resources for your area',
          'Overseeing compliance with health and safety standards',
        ],
        indicative_tasks: ['Head chef', 'Facilities manager', 'Office manager', 'Department supervisor'],
        sort_order: 50,
      },
      {
        level: 6, stream: 'aged_care_general',
        fwc_id: null,
        title: 'Aged Care General Level 6',
        description: 'Senior departmental manager or specialist in the general stream. You oversee multiple operational areas and report to senior management.',
        duties: [
          'Managing multiple departments or operational areas',
          'Developing organisational policies and procedures',
          'Coordinating with external stakeholders and service providers',
          'Providing high-level specialist advice to management',
        ],
        indicative_tasks: ['Senior food services manager', 'Senior facilities coordinator'],
        sort_order: 60,
      },
      {
        level: 7, stream: 'aged_care_general',
        fwc_id: null,
        title: 'Aged Care General Level 7',
        description: 'The most senior general stream classification. You hold executive-level responsibilities for general operational services.',
        duties: [
          'Executive oversight of general services across the organisation',
          'Strategic planning and resource allocation for general operations',
          'Representing the organisation in external forums',
          'Leading major projects and organisational change initiatives',
        ],
        indicative_tasks: ['Director of general services', 'Senior operations manager'],
        sort_order: 70,
      },
      // ── Aged Care Direct Care stream ────────────────────────────────────────
      {
        level: 1, stream: 'aged_care_direct',
        fwc_id: 142692,
        title: 'Direct Care Level 1 — Introductory',
        description: 'Entry-level direct care worker in aged care. You provide basic personal care and support to residents under supervision.',
        duties: [
          'Assisting residents with activities of daily living such as bathing, dressing, and eating',
          'Providing companionship and emotional support to residents',
          'Observing and reporting changes in resident wellbeing to senior staff',
          'Maintaining a clean and safe environment for residents',
        ],
        indicative_tasks: ['Personal care assistant (introductory)', 'Aged care support worker'],
        sort_order: 80,
      },
      {
        level: 2, stream: 'aged_care_direct',
        fwc_id: 142693,
        title: 'Direct Care Level 2 — Direct Carer',
        description: 'Qualified direct care worker with a Certificate III or equivalent. You provide a full range of personal care services.',
        duties: [
          'Delivering personal care services in accordance with individual care plans',
          'Assisting with mobility, transfers, and the use of aids and equipment',
          'Monitoring and documenting resident health indicators',
          'Supporting residents with medication management under supervision',
        ],
        indicative_tasks: ['Personal care worker', 'Aged care worker (Certificate III)'],
        sort_order: 90,
      },
      {
        level: 3, stream: 'aged_care_direct',
        fwc_id: 142695,
        title: 'Direct Care Level 3 — Qualified',
        description: 'Experienced direct care worker with a Certificate IV or equivalent qualification. You perform advanced care duties and may mentor others.',
        duties: [
          'Providing advanced personal care including complex wound care and palliative support',
          'Contributing to the development and review of individual care plans',
          'Mentoring and guiding less experienced care workers',
          'Implementing specialised care programs for residents with dementia or complex needs',
        ],
        indicative_tasks: ['Senior personal care worker', 'Dementia care specialist'],
        sort_order: 100,
      },
      {
        level: 4, stream: 'aged_care_direct',
        fwc_id: 142696,
        title: 'Direct Care Level 4 — Senior',
        description: 'Senior direct care worker who supervises a team and coordinates care delivery for a group of residents.',
        duties: [
          'Supervising a team of direct care workers on shift',
          'Coordinating care delivery and shift handovers',
          'Conducting resident assessments and updating care plans',
          'Liaising with nursing staff and allied health professionals',
        ],
        indicative_tasks: ['Senior care worker', 'Care coordinator', 'Shift supervisor (direct care)'],
        sort_order: 110,
      },
      {
        level: 5, stream: 'aged_care_direct',
        fwc_id: 142697,
        title: 'Direct Care Level 5 — Specialist',
        description: 'Specialist direct care worker with advanced qualifications. You are responsible for specialist care programs or clinical support.',
        duties: [
          'Leading specialist care programs such as palliative care, dementia care, or rehabilitation',
          'Providing clinical support and guidance to care teams',
          'Developing training materials and delivering in-service training',
          'Contributing to quality improvement and accreditation processes',
        ],
        indicative_tasks: ['Clinical care specialist', 'Quality care coordinator', 'Training coordinator (direct care)'],
        sort_order: 120,
      },
      {
        level: 6, stream: 'aged_care_direct',
        fwc_id: 142698,
        title: 'Direct Care Level 6 — Team Leader',
        description: 'Team leader in direct care. You manage a team of care workers and are responsible for the overall care quality in your area.',
        duties: [
          'Managing a team of direct care staff including rostering and performance',
          'Ensuring compliance with care standards and regulatory requirements',
          'Coordinating with management on care planning and resource allocation',
          'Leading quality improvement initiatives in direct care delivery',
        ],
        indicative_tasks: ['Care team leader', 'Direct care manager', 'Unit manager (direct care)'],
        sort_order: 130,
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
    // L6/L7 in general stream are approximate (API rate-limited).
    const baseRates = {
      aged_care_general: { 1: 26.51, 2: 27.56, 3: 28.62, 4: 28.96, 5: 29.94, 6: 35.23, 7: 35.86 },
      aged_care_direct:  { 1: 31.13, 2: 32.86, 3: 33.27, 4: 34.15, 5: 37.35, 6: 37.14 },
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
    // Note: Evening/night shift loadings excluded (not standard Sat/Sun/PH penalty rows).
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
        allowance_type: 'tool',
        name: 'Tool allowance (chefs)',
        description: 'If you are a chef required to provide and maintain your own tools, you are entitled to $13.41 per week.',
        trigger_condition: 'Chef required to provide own tools',
        amount: 13.41, amount_type: 'fixed', per_unit: 'per_week',
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
    // Two-branch question flow:
    //   Q1: aged_care_stream — general OR direct care
    //   Q2: aged_care_general_level — level for general stream (conditional on Q1=aged_care_general)
    //   Q3: aged_care_direct_level — level for direct care stream (conditional on Q1=aged_care_direct)
    const questions = [
      {
        question_key: 'aged_care_stream',
        question_text: 'Which stream best describes your role in aged care?',
        help_text: 'General stream covers food services, cleaning, maintenance, administration, and other non-direct-care roles. Direct care stream covers workers who provide personal care, support, and clinical assistance to residents.',
        question_type: 'single',
        stream: null,
        parent_question_key: null,
        parent_answer_key: null,
        sort_order: 1,
      },
      {
        question_key: 'aged_care_general_level',
        question_text: 'What level best describes your general aged care role?',
        help_text: 'Your level depends on your experience, qualifications, and the type of work you do. Level 1 is entry-level. Higher levels require more experience, qualifications, or supervisory responsibilities.',
        question_type: 'single',
        stream: null,
        parent_question_key: 'aged_care_stream',
        parent_answer_key: 'aged_care_general',
        sort_order: 2,
      },
      {
        question_key: 'aged_care_direct_level',
        question_text: 'What level best describes your direct care role?',
        help_text: 'Your level depends on your qualifications and responsibilities. Level 1 is introductory. Higher levels require Certificate III/IV qualifications, supervisory duties, or specialist expertise.',
        question_type: 'single',
        stream: null,
        parent_question_key: 'aged_care_stream',
        parent_answer_key: 'aged_care_direct',
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
      // Q1: aged_care_stream
      { question_key: 'aged_care_stream', answer_key: 'aged_care_general', answer_text: 'General (food services, cleaning, maintenance, administration)', sort_order: 1 },
      { question_key: 'aged_care_stream', answer_key: 'aged_care_direct',  answer_text: 'Direct care (personal care, clinical support, resident assistance)', sort_order: 2 },
      // Q2: aged_care_general_level
      { question_key: 'aged_care_general_level', answer_key: 'l1', answer_text: 'Level 1 — Entry-level (cleaner, laundry hand, kitchen assistant)', sort_order: 1 },
      { question_key: 'aged_care_general_level', answer_key: 'l2', answer_text: 'Level 2 — Some experience (food services worker, maintenance, receptionist)', sort_order: 2 },
      { question_key: 'aged_care_general_level', answer_key: 'l3', answer_text: 'Level 3 — Experienced or Cert III (qualified cook, senior maintenance)', sort_order: 3 },
      { question_key: 'aged_care_general_level', answer_key: 'l4', answer_text: 'Level 4 — Senior or supervisory (senior cook, maintenance supervisor)', sort_order: 4 },
      { question_key: 'aged_care_general_level', answer_key: 'l5', answer_text: 'Level 5 — Department manager (head chef, facilities manager)', sort_order: 5 },
      { question_key: 'aged_care_general_level', answer_key: 'l6', answer_text: 'Level 6 — Senior departmental manager', sort_order: 6 },
      { question_key: 'aged_care_general_level', answer_key: 'l7', answer_text: 'Level 7 — Executive general services', sort_order: 7 },
      // Q3: aged_care_direct_level
      { question_key: 'aged_care_direct_level', answer_key: 'l1', answer_text: 'Level 1 — Introductory (personal care assistant, entry-level)', sort_order: 1 },
      { question_key: 'aged_care_direct_level', answer_key: 'l2', answer_text: 'Level 2 — Direct Carer (Certificate III, personal care worker)', sort_order: 2 },
      { question_key: 'aged_care_direct_level', answer_key: 'l3', answer_text: 'Level 3 — Qualified (Certificate IV, senior care worker)', sort_order: 3 },
      { question_key: 'aged_care_direct_level', answer_key: 'l4', answer_text: 'Level 4 — Senior (shift supervisor, care coordinator)', sort_order: 4 },
      { question_key: 'aged_care_direct_level', answer_key: 'l5', answer_text: 'Level 5 — Specialist (clinical care specialist, training coordinator)', sort_order: 5 },
      { question_key: 'aged_care_direct_level', answer_key: 'l6', answer_text: 'Level 6 — Team Leader (care team leader, unit manager)', sort_order: 6 },
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
