/**
 * Seed script — SCHADS Award 2010 [MA000100]
 * Pay rates effective 1 July 2025
 * Source: FWC MAPD API + FWO pay guide MA000100
 *
 * Two streams:
 *   home_care          — Home Care Level 1 through 6 (6 classifications)
 *   social_community   — SACS Level 1 through 8 (8 classifications)
 *
 * Adult FT/PT hourly rates (from API, base_rate_type = Hourly):
 *   Home Care: L1: $30.85  L2: $32.86  L3: $34.59  L4: $35.97  L5: $36.70  L6: $38.74
 *   SACS:      L1: $26.30  L2: $28.12  L3: $30.68  L4: $33.78  L5: $37.23
 *              L6: $39.80  L7: $42.44  L8: $45.09
 *
 * Casual rates = FT rate × 1.25
 *
 * Penalty rates:
 *   FT/PT: Sat ×1.50, Sun ×2.00, PH ×2.50
 *   Casual: Sat ×1.50, Sun ×2.00, PH ×2.50
 *
 * Overtime (7.6 hr daily / 38 hr weekly threshold):
 *   First 2 OT hours: ×1.50, after 2 OT hours: ×2.00
 *
 * Junior rates (SACS stream only):
 *   <17: 54%, 17: 64.3%, 18: 76.7%, 19: 87.7%, 20: 97.7%
 *
 * Allowances:
 *   Meal: $16.62, Vehicle: $0.99/km, Board: $31.35/wk,
 *   Laundry shift: $0.32, Laundry wk: $1.49
 *
 * Run after migrate.js: node scripts/seed_ma000100.js
 */
require('dotenv').config();
const pool = require('../src/db/pool');

const AWARD_CODE = 'MA000100';
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
      'Social, Community, Home Care and Disability Services Industry Award 2010',
      EFFECTIVE_DATE,
      'https://awards.fairwork.gov.au/MA000100.html',
    ]);

    // ── Classifications ────────────────────────────────────────────────────────
    const classifications = [
      // ── Home Care stream ────────────────────────────────────────────────────
      {
        level: 1, stream: 'home_care',
        fwc_id: 192318,
        title: 'Home Care Level 1',
        description: 'Entry-level home care worker. You provide basic home care support under supervision, including domestic assistance and companionship.',
        duties: [
          'Providing basic domestic assistance such as cleaning, laundry, and meal preparation',
          'Accompanying clients on outings and providing social support',
          'Assisting with basic personal care tasks under direction',
          'Reporting observations about client wellbeing to supervisors',
        ],
        indicative_tasks: ['Home care assistant', 'Domestic support worker', 'Companion carer'],
        sort_order: 10,
      },
      {
        level: 2, stream: 'home_care',
        fwc_id: 192319,
        title: 'Home Care Level 2',
        description: 'Home care worker with a Certificate III or equivalent experience. You provide personal care and support services in clients\' homes.',
        duties: [
          'Delivering personal care services including bathing, dressing, and grooming',
          'Implementing individual care plans in the home environment',
          'Assisting clients with medication management under direction',
          'Supporting clients with mobility and the use of aids and equipment',
        ],
        indicative_tasks: ['Home care worker', 'Personal care worker (home care)', 'Community care worker'],
        sort_order: 20,
      },
      {
        level: 3, stream: 'home_care',
        fwc_id: 192320,
        title: 'Home Care Level 3',
        description: 'Experienced home care worker with a Certificate IV or significant experience. You perform advanced care duties and may coordinate services.',
        duties: [
          'Providing advanced personal care including complex care tasks',
          'Coordinating service delivery for a group of clients',
          'Contributing to care plan development and review',
          'Mentoring and supporting less experienced home care workers',
        ],
        indicative_tasks: ['Senior home care worker', 'Care coordinator (home care)', 'Advanced personal carer'],
        sort_order: 30,
      },
      {
        level: 4, stream: 'home_care',
        fwc_id: 192321,
        title: 'Home Care Level 4',
        description: 'Senior home care worker who supervises a team and is responsible for service quality in a defined area.',
        duties: [
          'Supervising a team of home care workers',
          'Conducting client assessments and developing care plans',
          'Ensuring compliance with service standards and regulations',
          'Liaising with allied health professionals and external service providers',
        ],
        indicative_tasks: ['Home care team leader', 'Service coordinator', 'Client assessor'],
        sort_order: 40,
      },
      {
        level: 5, stream: 'home_care',
        fwc_id: 192322,
        title: 'Home Care Level 5',
        description: 'Specialist or senior supervisor in home care. You manage programs or lead specialist service delivery.',
        duties: [
          'Managing home care programs or service areas',
          'Developing policies and procedures for home care delivery',
          'Leading quality improvement and training initiatives',
          'Managing budgets and resources for home care services',
        ],
        indicative_tasks: ['Home care program manager', 'Senior service coordinator', 'Quality coordinator (home care)'],
        sort_order: 50,
      },
      {
        level: 6, stream: 'home_care',
        fwc_id: 192323,
        title: 'Home Care Level 6',
        description: 'The most senior home care classification. You are responsible for the overall management and strategic direction of home care services.',
        duties: [
          'Providing strategic leadership for home care services',
          'Overseeing all aspects of service delivery, compliance, and quality',
          'Managing senior staff and organisational resources',
          'Representing the organisation in external stakeholder forums',
        ],
        indicative_tasks: ['Home care services manager', 'Director of home care', 'Regional manager (home care)'],
        sort_order: 60,
      },
      // ── Social and Community Services (SACS) stream ─────────────────────────
      {
        level: 1, stream: 'social_community',
        fwc_id: 4063,
        title: 'SACS Level 1',
        description: 'Entry-level social and community services worker. You perform basic support duties under close supervision with no prior experience required.',
        duties: [
          'Performing general administrative and reception duties',
          'Assisting with the preparation and distribution of materials',
          'Providing basic information to clients and visitors',
          'Maintaining records and filing systems under direction',
        ],
        indicative_tasks: ['Administrative assistant', 'Reception worker', 'General support worker'],
        sort_order: 70,
      },
      {
        level: 2, stream: 'social_community',
        fwc_id: 4067,
        title: 'SACS Level 2',
        description: 'Social and community services worker with some experience or a Certificate III. You perform a range of support duties with limited supervision.',
        duties: [
          'Providing direct client support and assistance under guidance',
          'Performing clerical and data entry duties',
          'Assisting with program delivery and group activities',
          'Maintaining client records and documentation',
        ],
        indicative_tasks: ['Community support worker', 'Client services officer', 'Program assistant'],
        sort_order: 80,
      },
      {
        level: 3, stream: 'social_community',
        fwc_id: 4073,
        title: 'SACS Level 3',
        description: 'Experienced social and community services worker with a Certificate IV or equivalent. You work with greater autonomy and may specialise in a service area.',
        duties: [
          'Delivering direct client services including case support and advocacy',
          'Coordinating group programs and community activities',
          'Conducting initial client assessments and intake processes',
          'Providing information, referral, and support services',
        ],
        indicative_tasks: ['Case support worker', 'Community development worker', 'Intake officer'],
        sort_order: 90,
      },
      {
        level: 4, stream: 'social_community',
        fwc_id: 4079,
        title: 'SACS Level 4',
        description: 'Senior social and community services worker with a Diploma or equivalent. You manage a caseload and may supervise junior staff.',
        duties: [
          'Managing a caseload of clients with complex needs',
          'Developing and implementing individual support plans',
          'Supervising and mentoring junior workers and volunteers',
          'Contributing to program planning and evaluation',
        ],
        indicative_tasks: ['Case manager', 'Senior community worker', 'Team leader (SACS)'],
        sort_order: 100,
      },
      {
        level: 5, stream: 'social_community',
        fwc_id: 4085,
        title: 'SACS Level 5',
        description: 'Specialist or senior practitioner with an Advanced Diploma or degree. You provide specialist services and lead program areas.',
        duties: [
          'Providing specialist casework and clinical services',
          'Leading and coordinating program delivery across a service area',
          'Developing training materials and delivering staff development programs',
          'Representing the organisation in interagency forums and networks',
        ],
        indicative_tasks: ['Senior case manager', 'Program coordinator', 'Specialist practitioner'],
        sort_order: 110,
      },
      {
        level: 6, stream: 'social_community',
        fwc_id: 4090,
        title: 'SACS Level 6',
        description: 'Manager or senior specialist with a degree and significant experience. You manage a team or service area and contribute to organisational strategy.',
        duties: [
          'Managing a team of social and community services workers',
          'Developing and implementing service delivery models and policies',
          'Managing budgets, funding acquittals, and reporting requirements',
          'Leading quality improvement and accreditation processes',
        ],
        indicative_tasks: ['Service manager', 'Program manager', 'Senior practitioner (degree)'],
        sort_order: 120,
      },
      {
        level: 7, stream: 'social_community',
        fwc_id: 4094,
        title: 'SACS Level 7',
        description: 'Senior manager or director with a postgraduate qualification or extensive experience. You lead multiple programs or a major service division.',
        duties: [
          'Leading multiple programs or a major service division',
          'Developing organisational strategy and business plans',
          'Managing senior staff and organisational performance',
          'Securing funding and managing stakeholder relationships at a senior level',
        ],
        indicative_tasks: ['Director of services', 'Senior manager', 'Division manager'],
        sort_order: 130,
      },
      {
        level: 8, stream: 'social_community',
        fwc_id: 4098,
        title: 'SACS Level 8',
        description: 'The most senior SACS classification. You hold executive-level responsibility for the strategic direction and management of the organisation or a major arm of it.',
        duties: [
          'Providing executive leadership and strategic direction for the organisation',
          'Managing the overall budget, staffing, and service delivery framework',
          'Representing the organisation at government and peak body level',
          'Leading organisational change and innovation initiatives',
        ],
        indicative_tasks: ['Executive director', 'CEO (small organisation)', 'General manager'],
        sort_order: 140,
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
      home_care:         { 1: 30.85, 2: 32.86, 3: 34.59, 4: 35.97, 5: 36.70, 6: 38.74 },
      social_community:  { 1: 26.30, 2: 28.12, 3: 30.68, 4: 33.78, 5: 37.23, 6: 39.80, 7: 42.44, 8: 45.09 },
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
    // Daily threshold: 7.6 hours/day, weekly threshold: 38 hours/week.
    // First 2 OT hours: ×1.50, after 2 OT hours: ×2.00.
    const overtimeRates = [
      { employment_type: 'full_time',  threshold_hours: 7.6,  period: 'daily',  multiplier: 1.50, description: 'Daily OT — first 2 hours over 7.6 hrs/day (×1.50)' },
      { employment_type: 'full_time',  threshold_hours: 9.6,  period: 'daily',  multiplier: 2.00, description: 'Daily OT — after 9.6 hrs/day (×2.00)' },
      { employment_type: 'full_time',  threshold_hours: 38.0, period: 'weekly', multiplier: 1.50, description: 'Weekly OT — first 2 hours over 38 hrs/week (×1.50)' },
      { employment_type: 'full_time',  threshold_hours: 40.0, period: 'weekly', multiplier: 2.00, description: 'Weekly OT — after 40 hrs/week (×2.00)' },
      { employment_type: 'part_time',  threshold_hours: 7.6,  period: 'daily',  multiplier: 1.50, description: 'Part-time daily OT — first 2 hours over 7.6 hrs/day (×1.50)' },
      { employment_type: 'part_time',  threshold_hours: 9.6,  period: 'daily',  multiplier: 2.00, description: 'Part-time daily OT — after 9.6 hrs/day (×2.00)' },
      { employment_type: 'casual',     threshold_hours: 7.6,  period: 'daily',  multiplier: 1.50, description: 'Casual daily OT — first 2 hours over 7.6 hrs/day (×1.50)' },
      { employment_type: 'casual',     threshold_hours: 9.6,  period: 'daily',  multiplier: 2.00, description: 'Casual daily OT — after 9.6 hrs/day (×2.00)' },
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
        allowance_type: 'vehicle',
        name: 'Vehicle allowance',
        description: 'If you are required to use your own vehicle for work purposes, you are entitled to $0.99 per kilometre.',
        trigger_condition: 'Required to use own vehicle for work',
        amount: 0.99, amount_type: 'per_km', per_unit: 'per_km',
        is_all_purpose: false,
      },
      {
        allowance_type: 'board',
        name: 'Board allowance',
        description: 'If you are required to live in employer-provided accommodation and board is deducted, the maximum deduction is $31.35 per week.',
        trigger_condition: 'Living in employer-provided accommodation with board deducted',
        amount: 31.35, amount_type: 'fixed', per_unit: 'per_week',
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
    //   Q1: schads_stream — home care OR social & community services
    //   Q2: schads_home_care_level — level for home care (conditional on Q1=home_care)
    //   Q3: schads_sacs_level — level for SACS (conditional on Q1=social_community)
    const questions = [
      {
        question_key: 'schads_stream',
        question_text: 'Which stream best describes your role?',
        help_text: 'Home care covers workers providing personal care, domestic assistance, and support services in clients\' homes. Social and community services (SACS) covers workers in community organisations providing case management, advocacy, support, and administration.',
        question_type: 'single',
        stream: null,
        parent_question_key: null,
        parent_answer_key: null,
        sort_order: 1,
      },
      {
        question_key: 'schads_home_care_level',
        question_text: 'What level best describes your home care role?',
        help_text: 'Your level depends on your experience, qualifications, and the type of work you do. Level 1 is entry-level. Higher levels require more experience, qualifications, or supervisory responsibilities.',
        question_type: 'single',
        stream: null,
        parent_question_key: 'schads_stream',
        parent_answer_key: 'home_care',
        sort_order: 2,
      },
      {
        question_key: 'schads_sacs_level',
        question_text: 'What level best describes your social and community services role?',
        help_text: 'Your level depends on your qualifications, experience, and responsibilities. Level 1 is entry-level support. Higher levels require formal qualifications (Certificate III/IV, Diploma, Degree) and increasing responsibility for caseloads, staff, and programs.',
        question_type: 'single',
        stream: null,
        parent_question_key: 'schads_stream',
        parent_answer_key: 'social_community',
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
      // Q1: schads_stream
      { question_key: 'schads_stream', answer_key: 'home_care',         answer_text: 'Home care (personal care, domestic assistance, support in clients\' homes)', sort_order: 1 },
      { question_key: 'schads_stream', answer_key: 'social_community',  answer_text: 'Social and community services (case management, advocacy, community support, admin)', sort_order: 2 },
      // Q2: schads_home_care_level
      { question_key: 'schads_home_care_level', answer_key: 'l1', answer_text: 'Level 1 — Entry-level (domestic assistance, companionship, basic personal care)', sort_order: 1 },
      { question_key: 'schads_home_care_level', answer_key: 'l2', answer_text: 'Level 2 — Certificate III (personal care worker, community care worker)', sort_order: 2 },
      { question_key: 'schads_home_care_level', answer_key: 'l3', answer_text: 'Level 3 — Certificate IV or experienced (senior care worker, care coordinator)', sort_order: 3 },
      { question_key: 'schads_home_care_level', answer_key: 'l4', answer_text: 'Level 4 — Senior supervisor (team leader, client assessor)', sort_order: 4 },
      { question_key: 'schads_home_care_level', answer_key: 'l5', answer_text: 'Level 5 — Program manager or specialist (quality coordinator)', sort_order: 5 },
      { question_key: 'schads_home_care_level', answer_key: 'l6', answer_text: 'Level 6 — Director of home care services', sort_order: 6 },
      // Q3: schads_sacs_level
      { question_key: 'schads_sacs_level', answer_key: 'l1', answer_text: 'Level 1 — Entry-level (admin assistant, reception, general support)', sort_order: 1 },
      { question_key: 'schads_sacs_level', answer_key: 'l2', answer_text: 'Level 2 — Some experience or Cert III (community support worker, client services)', sort_order: 2 },
      { question_key: 'schads_sacs_level', answer_key: 'l3', answer_text: 'Level 3 — Cert IV or equivalent (case support worker, intake officer)', sort_order: 3 },
      { question_key: 'schads_sacs_level', answer_key: 'l4', answer_text: 'Level 4 — Diploma (case manager, senior community worker, team leader)', sort_order: 4 },
      { question_key: 'schads_sacs_level', answer_key: 'l5', answer_text: 'Level 5 — Advanced Diploma or degree (senior case manager, program coordinator)', sort_order: 5 },
      { question_key: 'schads_sacs_level', answer_key: 'l6', answer_text: 'Level 6 — Degree + experience (service manager, program manager)', sort_order: 6 },
      { question_key: 'schads_sacs_level', answer_key: 'l7', answer_text: 'Level 7 — Senior manager (director of services, division manager)', sort_order: 7 },
      { question_key: 'schads_sacs_level', answer_key: 'l8', answer_text: 'Level 8 — Executive (executive director, CEO of small organisation)', sort_order: 8 },
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
