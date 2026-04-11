/**
 * Seed script — Animal Care and Veterinary Services Award 2020 [MA000118]
 * Pay rates effective 1 July 2025
 * Source: FWC MAPD API + FWO pay guide MA000118
 *
 * Three streams:
 *   vet_support — Introductory through Level 5 Practice Manager (6 classifications)
 *   vet_surgeon — Level 1A through Level 4 (5 classifications)
 *   inspector   — Inspector Level 1 through Senior Inspector (3 classifications)
 *
 * Adult FT/PT hourly rates (from API, base_rate_type = Hourly):
 *   vet_support: Intro: $24.28  L1: $24.95  L2: $26.96  L3: $28.12  L4: $30.68  L5: $32.23
 *   vet_surgeon: L1A: $32.65  L1B: $34.45  L2: $37.22  L3: $40.89  L4: $46.18
 *   inspector:   L1: $32.65  L2: $34.45  Senior: $37.22
 *
 * Casual rates = FT rate × 1.25
 *
 * Penalty rates:
 *   FT/PT: Sat ×1.50, Sun ×2.00, PH ×2.50
 *   Casual: Sat ×1.50, Sun ×2.00, PH ×2.50
 *
 * Overtime (7.6hr daily threshold):
 *   First 3 OT hours: ×1.50, after 3 OT hours: ×2.00
 *
 * Junior rates: <17=50%, 17=60%, 18=70%, 19=80%, 20=90%
 *
 * Allowances:
 *   Meal: $14.99, Meal further: $12.88,
 *   Vehicle car: $0.98/km, Motorcycle: $0.33/km, Clothing/laundry: $6.51/wk
 *
 * Run after migrate.js: node scripts/seed_ma000118.js
 */
require('dotenv').config();
const pool = require('../src/db/pool');

const AWARD_CODE = 'MA000118';
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
      'Animal Care and Veterinary Services Award 2020',
      EFFECTIVE_DATE,
      'https://awards.fairwork.gov.au/MA000118.html',
    ]);

    // ── Classifications ────────────────────────────────────────────────────────
    const classifications = [
      // ── Veterinary Support stream ───────────────────────────────────────────
      {
        level: 1, stream: 'vet_support',
        fwc_id: 4538,
        title: 'Veterinary Support — Introductory',
        description: 'Entry-level support employee with no prior experience in the animal care or veterinary industry. You perform basic tasks under direct supervision.',
        duties: [
          'Cleaning and maintaining animal housing, cages, and kennels',
          'Feeding and watering animals under direction',
          'Performing basic cleaning of veterinary practice areas',
          'Assisting with reception duties under supervision',
          'Learning workplace health and safety procedures',
        ],
        indicative_tasks: ['Kennel hand (entry)', 'Animal attendant (trainee)', 'Practice cleaner'],
        sort_order: 10,
      },
      {
        level: 2, stream: 'vet_support',
        fwc_id: 4539,
        title: 'Veterinary Support — Level 1',
        description: 'Support employee with some experience or basic qualifications. You perform routine tasks with general supervision.',
        duties: [
          'Handling and restraining animals for routine procedures',
          'Maintaining hygiene and sterilisation of equipment',
          'Answering phones and scheduling appointments',
          'Assisting veterinarians with basic procedures',
          'Maintaining stock levels and ordering supplies',
        ],
        indicative_tasks: ['Veterinary nurse (entry)', 'Kennel hand (experienced)', 'Receptionist'],
        sort_order: 20,
      },
      {
        level: 3, stream: 'vet_support',
        fwc_id: 4540,
        title: 'Veterinary Support — Level 2',
        description: 'Support employee with relevant qualifications (Certificate III or equivalent). You perform a wider range of clinical and administrative tasks.',
        duties: [
          'Assisting with surgical preparation and monitoring anaesthesia',
          'Performing diagnostic specimen collection (blood, urine)',
          'Administering medications and treatments as directed',
          'Providing client advice on basic animal care and nutrition',
          'Managing patient records and practice software',
        ],
        indicative_tasks: ['Veterinary nurse (qualified)', 'Animal care worker (Cert III)'],
        sort_order: 30,
      },
      {
        level: 4, stream: 'vet_support',
        fwc_id: 4541,
        title: 'Veterinary Support — Level 3',
        description: 'Experienced support employee with Certificate IV or equivalent qualifications. You perform advanced clinical tasks and may supervise junior staff.',
        duties: [
          'Performing advanced nursing procedures including dental prophylaxis',
          'Managing anaesthesia monitoring and emergency responses',
          'Supervising and training junior veterinary support staff',
          'Coordinating day-to-day clinical operations',
          'Managing inventory, procurement, and supplier relationships',
        ],
        indicative_tasks: ['Senior veterinary nurse', 'Head nurse', 'Animal care supervisor'],
        sort_order: 40,
      },
      {
        level: 5, stream: 'vet_support',
        fwc_id: 4542,
        title: 'Veterinary Support — Level 4',
        description: 'Highly experienced support employee with advanced qualifications. You exercise significant clinical autonomy and may manage a team.',
        duties: [
          'Performing specialist nursing procedures with minimal supervision',
          'Developing and implementing clinical protocols and procedures',
          'Managing staff rosters, training, and performance',
          'Overseeing compliance with veterinary regulations and standards',
          'Providing advanced client education and consultation',
        ],
        indicative_tasks: ['Practice nurse manager', 'Clinical coordinator', 'Senior animal care officer'],
        sort_order: 50,
      },
      {
        level: 6, stream: 'vet_support',
        fwc_id: 4543,
        title: 'Veterinary Support — Level 5 Practice Manager',
        description: 'The most senior support classification. You manage the overall operations of the veterinary practice or animal care facility.',
        duties: [
          'Managing overall practice or facility operations',
          'Setting and monitoring budgets and financial performance',
          'Leading recruitment, staff development, and HR management',
          'Ensuring regulatory compliance and accreditation',
          'Developing business strategies and marketing initiatives',
        ],
        indicative_tasks: ['Practice manager', 'Facility manager', 'Operations manager'],
        sort_order: 60,
      },
      // ── Veterinary Surgeon stream ───────────────────────────────────────────
      {
        level: 1, stream: 'vet_surgeon',
        fwc_id: 4533,
        title: 'Veterinary Surgeon — Level 1A',
        description: 'A registered veterinary surgeon in the first year of practice after graduation. You perform clinical duties under the general direction of more experienced veterinarians.',
        duties: [
          'Conducting consultations and physical examinations',
          'Performing routine surgical procedures',
          'Prescribing and administering medications',
          'Interpreting diagnostic test results',
          'Maintaining accurate clinical records',
        ],
        indicative_tasks: ['Graduate veterinarian', 'Veterinary surgeon (1st year)'],
        sort_order: 70,
      },
      {
        level: 2, stream: 'vet_surgeon',
        fwc_id: 4534,
        title: 'Veterinary Surgeon — Level 1B',
        description: 'A registered veterinary surgeon with more than one year but less than three years of post-graduation experience.',
        duties: [
          'Performing a wider range of surgical and medical procedures',
          'Managing complex cases with reduced supervision',
          'Providing after-hours and emergency veterinary care',
          'Mentoring graduate veterinarians',
          'Contributing to practice clinical protocols',
        ],
        indicative_tasks: ['Veterinary surgeon (2nd-3rd year)'],
        sort_order: 80,
      },
      {
        level: 3, stream: 'vet_surgeon',
        fwc_id: 4535,
        title: 'Veterinary Surgeon — Level 2',
        description: 'An experienced veterinary surgeon with three or more years of post-graduation experience. You manage complex cases independently.',
        duties: [
          'Managing complex medical and surgical cases independently',
          'Performing advanced diagnostic procedures',
          'Supervising and training junior veterinarians and support staff',
          'Developing and reviewing clinical treatment protocols',
          'Providing specialist referral and consultation services',
        ],
        indicative_tasks: ['Senior veterinarian', 'Veterinary surgeon (3+ years)'],
        sort_order: 90,
      },
      {
        level: 4, stream: 'vet_surgeon',
        fwc_id: 4536,
        title: 'Veterinary Surgeon — Level 3',
        description: 'A highly experienced veterinary surgeon with significant post-graduation experience and possibly additional qualifications or specialisation.',
        duties: [
          'Performing specialist or advanced surgical and medical procedures',
          'Leading clinical teams and mentoring veterinary staff',
          'Managing complex and critical cases',
          'Contributing to practice governance and clinical standards',
          'Providing expert consultation and referral services',
        ],
        indicative_tasks: ['Principal veterinarian', 'Specialist veterinary surgeon'],
        sort_order: 100,
      },
      {
        level: 5, stream: 'vet_surgeon',
        fwc_id: 4537,
        title: 'Veterinary Surgeon — Level 4',
        description: 'The most senior veterinary surgeon classification. You hold specialist registration or have extensive experience and manage major clinical or practice functions.',
        duties: [
          'Leading specialist veterinary services and clinical programs',
          'Managing overall clinical governance and quality assurance',
          'Overseeing practice-wide clinical operations and standards',
          'Providing expert-level diagnosis and treatment',
          'Representing the practice in professional and regulatory forums',
        ],
        indicative_tasks: ['Veterinary specialist', 'Chief veterinarian', 'Clinical director'],
        sort_order: 110,
      },
      // ── Inspector stream ────────────────────────────────────────────────────
      {
        level: 1, stream: 'inspector',
        fwc_id: 4544,
        title: 'Inspector Level 1',
        description: 'An animal welfare inspector at entry level. You conduct inspections and investigations under the direction of more senior inspectors.',
        duties: [
          'Conducting routine animal welfare inspections',
          'Responding to reports and complaints about animal welfare',
          'Preparing inspection reports and maintaining records',
          'Providing advice and education to animal owners on welfare standards',
          'Assisting with seizure and care of animals in welfare cases',
        ],
        indicative_tasks: ['Animal welfare inspector (entry)', 'RSPCA inspector (junior)'],
        sort_order: 120,
      },
      {
        level: 2, stream: 'inspector',
        fwc_id: 4545,
        title: 'Inspector Level 2',
        description: 'An experienced animal welfare inspector who conducts complex investigations and may supervise junior inspectors.',
        duties: [
          'Conducting complex welfare investigations and prosecutions',
          'Supervising and mentoring junior inspectors',
          'Preparing evidence and attending court proceedings',
          'Liaising with veterinarians, police, and other agencies',
          'Developing inspection protocols and training materials',
        ],
        indicative_tasks: ['Senior inspector', 'Animal welfare investigator'],
        sort_order: 130,
      },
      {
        level: 3, stream: 'inspector',
        fwc_id: 4546,
        title: 'Senior Inspector',
        description: 'The most senior inspector classification. You manage inspection teams and oversee regional or organisational welfare programs.',
        duties: [
          'Managing teams of inspectors across a region or organisation',
          'Overseeing complex and high-profile welfare investigations',
          'Developing policy, procedure, and strategic welfare initiatives',
          'Representing the organisation in external forums and media',
          'Managing budgets and resources for inspection programs',
        ],
        indicative_tasks: ['Chief inspector', 'Regional manager (inspections)', 'Head of welfare operations'],
        sort_order: 140,
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
      vet_support: { 1: 24.28, 2: 24.95, 3: 26.96, 4: 28.12, 5: 30.68, 6: 32.23 },
      vet_surgeon: { 1: 32.65, 2: 34.45, 3: 37.22, 4: 40.89, 5: 46.18 },
      inspector:   { 1: 32.65, 2: 34.45, 3: 37.22 },
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
    // First 3 OT hours: ×1.50, after 3 OT hours: ×2.00.
    const overtimeRates = [
      { employment_type: 'full_time',  threshold_hours: 7.6,   period: 'daily', multiplier: 1.50, description: 'Daily OT — first 3 hours over 7.6 hrs/day (×1.50)' },
      { employment_type: 'full_time',  threshold_hours: 10.6,  period: 'daily', multiplier: 2.00, description: 'Daily OT — after 10.6 hrs/day (×2.00)' },
      { employment_type: 'part_time',  threshold_hours: 7.6,   period: 'daily', multiplier: 1.50, description: 'Part-time daily OT — first 3 hours over 7.6 hrs/day (×1.50)' },
      { employment_type: 'part_time',  threshold_hours: 10.6,  period: 'daily', multiplier: 2.00, description: 'Part-time daily OT — after 10.6 hrs/day (×2.00)' },
      { employment_type: 'casual',     threshold_hours: 7.6,   period: 'daily', multiplier: 1.50, description: 'Casual daily OT — first 3 hours over 7.6 hrs/day (×1.50)' },
      { employment_type: 'casual',     threshold_hours: 10.6,  period: 'daily', multiplier: 2.00, description: 'Casual daily OT — after 10.6 hrs/day (×2.00)' },
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
    // Source: FWC MAPD API expense/wage allowances for MA000118.
    const allowances = [
      {
        allowance_type: 'meal',
        name: 'Meal allowance',
        description: 'If you work overtime and your employer did not give you notice the day before, you are entitled to a meal allowance of $14.99.',
        trigger_condition: 'Overtime without notice',
        amount: 14.99, amount_type: 'fixed', per_unit: 'per_meal',
        is_all_purpose: false,
      },
      {
        allowance_type: 'meal_further',
        name: 'Meal allowance (further)',
        description: 'For each further period of overtime of 4 hours or more after the initial meal allowance, you are entitled to a further meal allowance of $12.88.',
        trigger_condition: 'Each further 4 hours of overtime after initial meal allowance',
        amount: 12.88, amount_type: 'fixed', per_unit: 'per_meal',
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
        allowance_type: 'clothing',
        name: 'Clothing and laundry allowance',
        description: 'If your employer requires you to wear a uniform and does not supply or launder it, you are entitled to $6.51 per week.',
        trigger_condition: 'Employer requires uniform not supplied or laundered',
        amount: 6.51, amount_type: 'fixed', per_unit: 'per_week',
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
    // Two-branch question flow:
    //   Q1: vet_stream — vet_support, vet_surgeon, or inspector
    //   Q2: vet_support_level — level for support staff (conditional on Q1=vet_support)
    //   Q3: vet_surgeon_level — level for vets (conditional on Q1=vet_surgeon)
    //   Q4: inspector_level — level for inspectors (conditional on Q1=inspector)
    const questions = [
      {
        question_key: 'vet_stream',
        question_text: 'What type of role do you work in?',
        help_text: 'Veterinary support staff include nurses, kennel hands, receptionists, and practice managers. Veterinary surgeons are registered veterinarians. Inspectors are animal welfare inspectors.',
        question_type: 'single',
        stream: null,
        parent_question_key: null,
        parent_answer_key: null,
        sort_order: 1,
      },
      {
        question_key: 'vet_support_level',
        question_text: 'What is your veterinary support classification level?',
        help_text: 'Your level depends on your qualifications and experience. Introductory is for new entrants. Higher levels require relevant certificates and greater responsibility. Level 5 is practice manager.',
        question_type: 'single',
        stream: null,
        parent_question_key: 'vet_stream',
        parent_answer_key: 'vet_support',
        sort_order: 2,
      },
      {
        question_key: 'vet_surgeon_level',
        question_text: 'What is your veterinary surgeon classification level?',
        help_text: 'Your level depends on your years of post-graduation experience. Level 1A is first year. Level 1B is second to third year. Level 2 is three or more years. Levels 3 and 4 are for highly experienced or specialist veterinarians.',
        question_type: 'single',
        stream: null,
        parent_question_key: 'vet_stream',
        parent_answer_key: 'vet_surgeon',
        sort_order: 3,
      },
      {
        question_key: 'inspector_level',
        question_text: 'What is your inspector classification level?',
        help_text: 'Level 1 is entry-level. Level 2 is experienced with supervisory duties. Senior Inspector manages inspection teams.',
        question_type: 'single',
        stream: null,
        parent_question_key: 'vet_stream',
        parent_answer_key: 'inspector',
        sort_order: 4,
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
      // Q1: vet_stream
      { question_key: 'vet_stream', answer_key: 'vet_support', answer_text: 'Veterinary support staff (nurse, kennel hand, receptionist, practice manager)', sort_order: 1 },
      { question_key: 'vet_stream', answer_key: 'vet_surgeon', answer_text: 'Veterinary surgeon (registered veterinarian)', sort_order: 2 },
      { question_key: 'vet_stream', answer_key: 'inspector',   answer_text: 'Animal welfare inspector', sort_order: 3 },
      // Q2: vet_support_level
      { question_key: 'vet_support_level', answer_key: 'l1', answer_text: 'Introductory — no prior experience, basic tasks under direct supervision', sort_order: 1 },
      { question_key: 'vet_support_level', answer_key: 'l2', answer_text: 'Level 1 — some experience, routine animal handling and reception', sort_order: 2 },
      { question_key: 'vet_support_level', answer_key: 'l3', answer_text: 'Level 2 — Certificate III, clinical and diagnostic tasks', sort_order: 3 },
      { question_key: 'vet_support_level', answer_key: 'l4', answer_text: 'Level 3 — Certificate IV, advanced nursing, supervising juniors', sort_order: 4 },
      { question_key: 'vet_support_level', answer_key: 'l5', answer_text: 'Level 4 — highly experienced, significant clinical autonomy', sort_order: 5 },
      { question_key: 'vet_support_level', answer_key: 'l6', answer_text: 'Level 5 Practice Manager — managing overall practice operations', sort_order: 6 },
      // Q3: vet_surgeon_level
      { question_key: 'vet_surgeon_level', answer_key: 'l1', answer_text: 'Level 1A — first year after graduation', sort_order: 1 },
      { question_key: 'vet_surgeon_level', answer_key: 'l2', answer_text: 'Level 1B — second to third year after graduation', sort_order: 2 },
      { question_key: 'vet_surgeon_level', answer_key: 'l3', answer_text: 'Level 2 — three or more years post-graduation', sort_order: 3 },
      { question_key: 'vet_surgeon_level', answer_key: 'l4', answer_text: 'Level 3 — highly experienced, possible specialisation', sort_order: 4 },
      { question_key: 'vet_surgeon_level', answer_key: 'l5', answer_text: 'Level 4 — specialist registration or extensive experience', sort_order: 5 },
      // Q4: inspector_level
      { question_key: 'inspector_level', answer_key: 'l1', answer_text: 'Inspector Level 1 — entry-level, routine inspections', sort_order: 1 },
      { question_key: 'inspector_level', answer_key: 'l2', answer_text: 'Inspector Level 2 — experienced, complex investigations, supervising juniors', sort_order: 2 },
      { question_key: 'inspector_level', answer_key: 'l3', answer_text: 'Senior Inspector — managing inspection teams and programs', sort_order: 3 },
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
