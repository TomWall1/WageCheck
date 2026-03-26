/**
 * Seed script — Alpine Resorts Award 2020 [MA000092]
 * Pay rates effective 1 July 2025
 * Source: FWC MAPD API + FWO pay guide MA000092
 *
 * Two streams:
 *   resort_worker — Training through Level 7 (8 classifications)
 *   snowsports    — Instructor Category A through E (5 classifications)
 *
 * Adult FT/PT hourly rates (from API, base_rate_type = Hourly):
 *   Training: $24.29   L1: $24.94   L2: $25.85   L3: $26.72
 *   L4: $28.10         L5: $29.01   L6: $29.87   L7: $30.68
 *   Instructor A: $38.45   B: $34.58   C: $30.73   D: $26.88   E: $25.67
 *
 * Casual rates = FT rate × 1.25
 *
 * Penalty rates:
 *   NO Saturday or Sunday penalties — ordinary rate on any 5 days
 *   NO evening or night loadings
 *   Public holiday: ×2.50 (FT/PT and casual)
 *   Snowsports Instructors: EXCLUDED from public holiday penalties
 *
 * Overtime (non-Instructors only, daily threshold 10 hrs):
 *   First 2 OT hours: ×1.50, after 2 OT hours: ×2.00
 *   Snowsports Instructors: EXCLUDED from overtime rates
 *
 * Junior rates: ≤17 = 70%, 18 = 80%, ≥19 = 100%
 *
 * Allowances:
 *   Meal (OT): $16.73, Boot: $0.16/hr, Equipment: $0.33/hr,
 *   Sewerage: $11.63/shift, Airfare (instructors A/B/C): up to $1,231
 *
 * Run after migrate.js: node scripts/seed_ma000092.js
 */
require('dotenv').config();
const pool = require('../src/db/pool');

const AWARD_CODE = 'MA000092';
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
      'Alpine Resorts Award 2020',
      EFFECTIVE_DATE,
      'https://awards.fairwork.gov.au/MA000092.html',
    ]);

    // ── Classifications ────────────────────────────────────────────────────────
    const classifications = [
      // ── Resort Worker stream ─────────────────────────────────────────────────
      {
        level: 1, stream: 'resort_worker',
        fwc_id: 3911,
        title: 'Resort Worker — Training Level',
        description: 'Staff undergoing training before being assessed as competent for their Resort Worker Level role. Includes orientation and induction programs. Maximum time at this level is 7 weeks.',
        duties: [
          'Attending orientation and induction programs',
          'Undertaking supervised on-the-job training',
          'Learning resort-specific safety procedures and equipment',
          'Completing training requirements before moving to substantive level',
        ],
        indicative_tasks: ['Trainee resort worker', 'Induction worker'],
        sort_order: 10,
      },
      {
        level: 2, stream: 'resort_worker',
        fwc_id: 3912,
        title: 'Resort Worker Level 1',
        description: 'Entry-level worker with no previous experience required. You perform routine tasks under direct supervision, with some on-the-job training provided.',
        duties: [
          'Performing carparking duties and directing vehicles',
          'Assisting with outdoor activities such as race events and snowsports',
          'Carrying out general unskilled labour including painting and labouring tasks',
          'Operating as a bar assistant performing non-service duties',
          'Clearing plates, setting and wiping tables, and cleaning in food service areas',
          'Working as a kitchenhand preparing and cleaning kitchen areas',
          'Performing housekeeping duties including servicing and cleaning rooms under supervision',
          'Assisting with laundry duties',
        ],
        indicative_tasks: ['Lift attendant (labouring)', 'Kitchenhand', 'Housekeeping attendant', 'Car park attendant', 'Bar assistant', 'Food service assistant', 'Outdoor assistant'],
        sort_order: 20,
      },
      {
        level: 3, stream: 'resort_worker',
        fwc_id: 3913,
        title: 'Resort Worker Level 2',
        description: 'Worker with some previous relevant experience or qualifications. You perform a range of tasks under supervision with detailed on-the-job training.',
        duties: [
          'Performing general clerical and office duties',
          'Selling tickets, passes, hire equipment, or retail products',
          'Operating as a trainee plant operator or train driver (not yet assessed as competent)',
          'Coordinating carparking staff',
          'Working as a tour guide or concourse attendant',
          'Serving drinks, food, or working as a cashier in food and beverage areas',
          'Operating as a receptionist, reservations officer, night auditor, or telephonist',
          'Performing housekeeping, laundry machine operation, or portering duties',
          'Working as an unqualified cook performing food preparation, butchering, and cooking',
        ],
        indicative_tasks: ['Guest services officer', 'Retail sales assistant', 'Receptionist', 'Waiter/waitress', 'Unqualified cook', 'Ticket seller', 'Reservations officer', 'Night auditor'],
        sort_order: 30,
      },
      {
        level: 4, stream: 'resort_worker',
        fwc_id: 3914,
        title: 'Resort Worker Level 3',
        description: 'Worker with significant previous experience or specialist training. You handle more complex tasks and may supervise lower-level staff in some areas.',
        duties: [
          'Operating aerial and surface lifts and being responsible for safe loading and unloading of guests',
          'Working as an assistant ski patroller or trail crew member',
          'Performing trades assistant work in electrical, mechanical, fitting, or building areas',
          'Working as a beauty therapist or spa attendant',
          'Operating as a storeperson or cellar person with forklift qualifications',
          'Supervising lower-grade food service, bar, kitchen, housekeeping, or laundry staff',
          'Performing night auditing or hotel reception with three or more years of experience',
        ],
        indicative_tasks: ['Lift operator', 'Trades assistant', 'Beauty therapist', 'Bar supervisor (L3)', 'Kitchen attendant supervisor', 'Experienced receptionist'],
        sort_order: 40,
      },
      {
        level: 5, stream: 'resort_worker',
        fwc_id: 3915,
        title: 'Resort Worker Level 4',
        description: 'Worker with specialist skills gained through both experience and qualifications. You provide direction for lower-level staff or perform specialised work.',
        duties: [
          'Supervising reception and reservations staff',
          'Supervising guest service roles including ticket and hire operations',
          'Performing cashroom, treasury, and back-office cash reconciliation',
          'Working as a qualified chef having completed an apprenticeship',
          'Supervising a restaurant, bar, or food service section',
          'Coordinating inventory control or uniform room operations',
          'Working as a qualified fitness instructor with lifeguard qualifications',
        ],
        indicative_tasks: ['Qualified chef', 'Restaurant supervisor', 'Cashroom officer', 'Guest services supervisor', 'Inventory controller'],
        sort_order: 50,
      },
      {
        level: 6, stream: 'resort_worker',
        fwc_id: 3916,
        title: 'Resort Worker Level 5',
        description: 'Worker employed to supervise and train employees of a lower grade. You have appropriate training and are responsible for the performance of your team.',
        duties: [
          'Supervising lift operators and overseeing lift operations',
          'Supervising treasury and cashroom staff',
          'Training and mentoring lower-level resort workers',
          'Coordinating team rosters and daily operations',
        ],
        indicative_tasks: ['Lift operations supervisor', 'Treasury supervisor'],
        sort_order: 60,
      },
      {
        level: 7, stream: 'resort_worker',
        fwc_id: 3917,
        title: 'Resort Worker Level 6',
        description: 'Worker who holds a recognised qualification and has been assessed as competent. You perform skilled or trade-qualified work, or supervise specialist teams.',
        duties: [
          'Operating heavy plant equipment such as groomers, excavators, cranes, or snowmaking equipment',
          'Performing trade-qualified work in electrical, fitting, mechanical, painting, carpentry, or building',
          'Working as a qualified ski patroller',
          'Working as a qualified child care worker with AQF Certificate III or IV in Children\'s Services',
          'Supervising trail crew or snowsports reservations',
          'Operating as a hospitality supervisor across food and beverage, housekeeping, or front office',
          'Working as media staff including reporters, editors, or camera operators',
        ],
        indicative_tasks: ['Plant operator (groomer)', 'Electrician', 'Ski patroller', 'Child care worker', 'Hospitality supervisor', 'Snowmaking operator'],
        sort_order: 70,
      },
      {
        level: 8, stream: 'resort_worker',
        fwc_id: 3918,
        title: 'Resort Worker Level 7',
        description: 'The most senior resort worker classification. You supervise specialist teams or are solely responsible for a major operational area.',
        duties: [
          'Supervising child care staff and holding an AQF Diploma in Children\'s Services',
          'Supervising plant operations across groomers, snowmaking, and heavy equipment',
          'Working as a qualified chef who supervises and trains kitchen staff, manages ordering and stock control, and is solely responsible for other cooks in a single kitchen establishment',
        ],
        indicative_tasks: ['Senior chef', 'Plant operations supervisor', 'Child care supervisor (Diploma)'],
        sort_order: 80,
      },
      // ── Snowsports Instructor stream ─────────────────────────────────────────
      {
        level: 1, stream: 'snowsports',
        fwc_id: 3919,
        title: 'Snowsports Instructor — Category A',
        description: 'The most experienced and fully certified snowsports instructor. You hold an APSI Level 4 qualification (or international equivalent) and have completed a minimum of 10 full-time seasons of practical teaching experience. A full-time season means at least 12 successive weeks at a recognised snowsports school.',
        duties: [
          'Teaching advanced and expert-level skiing or snowboarding techniques',
          'Mentoring and training lower-category instructors',
          'Leading specialist clinics, examiner roles, or performance coaching',
          'Providing the highest level of guest instruction and safety oversight',
        ],
        indicative_tasks: ['Senior snowsports instructor', 'Examiner', 'Head instructor'],
        sort_order: 90,
      },
      {
        level: 2, stream: 'snowsports',
        fwc_id: 3920,
        title: 'Snowsports Instructor — Category B',
        description: 'An intermediate-level certified instructor. You hold an APSI Level 3 qualification (or international equivalent) and have full-time practical teaching experience.',
        duties: [
          'Teaching intermediate to advanced skiing or snowboarding techniques',
          'Working with a range of guest abilities including group and private lessons',
          'Assisting with instructor training and development programs',
        ],
        indicative_tasks: ['Snowsports instructor (Level 3 qualified)'],
        sort_order: 100,
      },
      {
        level: 3, stream: 'snowsports',
        fwc_id: 3921,
        title: 'Snowsports Instructor — Category C',
        description: 'A fundamentally certified instructor. You hold an APSI Level 2 qualification (or international equivalent) and have full-time practical teaching experience.',
        duties: [
          'Teaching beginner to intermediate skiing or snowboarding techniques',
          'Conducting group lessons and introductory programs',
          'Ensuring guest safety on the slopes during lessons',
        ],
        indicative_tasks: ['Snowsports instructor (Level 2 qualified)'],
        sort_order: 110,
      },
      {
        level: 4, stream: 'snowsports',
        fwc_id: 3922,
        title: 'Snowsports Instructor — Category D',
        description: 'An entry-level qualified instructor. You hold an APSI Level 1 qualification (or international equivalent) and have some teaching experience.',
        duties: [
          'Teaching beginner-level skiing or snowboarding techniques',
          'Assisting more senior instructors with group lessons',
          'Performing basic slope safety and guest supervision duties',
        ],
        indicative_tasks: ['Junior snowsports instructor (Level 1 qualified)'],
        sort_order: 120,
      },
      {
        level: 5, stream: 'snowsports',
        fwc_id: 3923,
        title: 'Snowsports Instructor — Category E',
        description: 'The most junior instructor classification. You have no experience or hold only a low-level qualification such as an APSI Instructor Training Course or Recruitment Clinic.',
        duties: [
          'Assisting with beginner group lessons under supervision',
          'Performing guest assistance and orientation on the slopes',
          'Completing on-the-job training and working towards higher qualifications',
        ],
        indicative_tasks: ['Trainee snowsports instructor', 'Assistant instructor'],
        sort_order: 130,
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
      resort_worker: { 1: 24.29, 2: 24.94, 3: 25.85, 4: 26.72, 5: 28.10, 6: 29.01, 7: 29.87, 8: 30.68 },
      snowsports:    { 1: 38.45, 2: 34.58, 3: 30.73, 4: 26.88, 5: 25.67 },
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
    // Alpine Resorts Award: NO Saturday or Sunday penalties. NO evening/night loadings.
    // Ordinary hours can be worked on any 5 days of the week.
    // Only public holiday penalties apply (and NOT to Snowsports Instructors).
    //
    // Public holiday: ×2.50 for both FT/PT and casual.
    // Weekday/Saturday/Sunday: ×1.00 (ordinary rate for all).
    const penaltyRates = [
      // ── Full-time ───────────────────────────────────────────────────────────
      { employment_type: 'full_time',  day_type: 'weekday',        multiplier: 1.00, description: 'Weekday ordinary rate (×1.0)' },
      { employment_type: 'full_time',  day_type: 'saturday',       multiplier: 1.00, description: 'Saturday — ordinary rate, no penalty (×1.0)' },
      { employment_type: 'full_time',  day_type: 'sunday',         multiplier: 1.00, description: 'Sunday — ordinary rate, no penalty (×1.0)' },
      { employment_type: 'full_time',  day_type: 'public_holiday', multiplier: 2.50, description: 'Public holiday — double time and a half (×2.5)' },
      // ── Part-time ───────────────────────────────────────────────────────────
      { employment_type: 'part_time',  day_type: 'weekday',        multiplier: 1.00, description: 'Weekday ordinary rate (×1.0)' },
      { employment_type: 'part_time',  day_type: 'saturday',       multiplier: 1.00, description: 'Saturday — ordinary rate, no penalty (×1.0)' },
      { employment_type: 'part_time',  day_type: 'sunday',         multiplier: 1.00, description: 'Sunday — ordinary rate, no penalty (×1.0)' },
      { employment_type: 'part_time',  day_type: 'public_holiday', multiplier: 2.50, description: 'Public holiday — double time and a half (×2.5)' },
      // ── Casual ──────────────────────────────────────────────────────────────
      { employment_type: 'casual',     day_type: 'weekday',        multiplier: 1.00, description: 'Weekday ordinary casual rate (incl. 25% casual loading)' },
      { employment_type: 'casual',     day_type: 'saturday',       multiplier: 1.00, description: 'Saturday — ordinary casual rate, no penalty (×1.0)' },
      { employment_type: 'casual',     day_type: 'sunday',         multiplier: 1.00, description: 'Sunday — ordinary casual rate, no penalty (×1.0)' },
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
    // Daily threshold: 10 hours/day.
    // First 2 OT hours: ×1.50, after 2 OT hours: ×2.00.
    // Applies to all employment types EXCEPT Snowsports Instructors (handled in calculator).
    const overtimeRates = [
      { employment_type: 'full_time',  threshold_hours: 10.0, period: 'daily', multiplier: 1.50, description: 'Daily OT — first 2 hours over 10 hrs/day (×1.50)' },
      { employment_type: 'full_time',  threshold_hours: 12.0, period: 'daily', multiplier: 2.00, description: 'Daily OT — after 12 hrs/day (×2.00)' },
      { employment_type: 'part_time',  threshold_hours: 10.0, period: 'daily', multiplier: 1.50, description: 'Part-time daily OT — first 2 hours over 10 hrs/day (×1.50)' },
      { employment_type: 'part_time',  threshold_hours: 12.0, period: 'daily', multiplier: 2.00, description: 'Part-time daily OT — after 12 hrs/day (×2.00)' },
      { employment_type: 'casual',     threshold_hours: 10.0, period: 'daily', multiplier: 1.50, description: 'Casual daily OT — first 2 hours over 10 hrs/day (×1.50)' },
      { employment_type: 'casual',     threshold_hours: 12.0, period: 'daily', multiplier: 2.00, description: 'Casual daily OT — after 12 hrs/day (×2.00)' },
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
    // Source: FWC MAPD API expense/wage allowances for MA000092.
    const allowances = [
      {
        allowance_type: 'meal',
        name: 'Meal allowance (overtime)',
        description: 'If you work overtime for more than 2 hours and your employer did not give you notice the day before, you are entitled to a meal allowance of $16.73.',
        trigger_condition: 'Overtime of more than 2 hours without notice',
        amount: 16.73, amount_type: 'fixed', per_unit: 'per_meal',
        is_all_purpose: false,
      },
      {
        allowance_type: 'boot',
        name: 'Boot allowance',
        description: 'If your employer requires specific footwear and does not supply it, you are entitled to $0.16 per hour worked.',
        trigger_condition: 'Employer requires specific footwear not supplied',
        amount: 0.16, amount_type: 'per_hour', per_unit: 'per_hour',
        is_all_purpose: false,
      },
      {
        allowance_type: 'equipment',
        name: 'Equipment allowance',
        description: 'If your employer requires you to supply your own equipment (other than footwear), you are entitled to $0.33 per hour worked.',
        trigger_condition: 'Employee required to supply own equipment',
        amount: 0.33, amount_type: 'per_hour', per_unit: 'per_hour',
        is_all_purpose: false,
      },
      {
        allowance_type: 'sewerage',
        name: 'Sewerage treatment plant allowance',
        description: 'If you are required to work at a sewerage treatment plant, you are entitled to $11.63 per shift.',
        trigger_condition: 'Required to work at a sewerage treatment plant',
        amount: 11.63, amount_type: 'fixed', per_unit: 'per_shift',
        is_all_purpose: false,
      },
      {
        allowance_type: 'airfare',
        name: 'Airfare reimbursement (Snowsports Instructors)',
        description: 'If you are a Snowsports Instructor in Category A, B, or C, your employer will reimburse your airfare up to $1,231 for travel to the resort.',
        trigger_condition: 'Snowsports Instructor Category A, B, or C travelling to the resort',
        amount: 1231.00, amount_type: 'fixed', per_unit: 'per_season',
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
        description: 'If you work more than 5 hours, you are entitled to an unpaid meal break of at least 30 minutes. If operational requirements prevent an unpaid break, you must be given a paid 20-minute meal break instead.',
      },
      {
        employment_type: null,
        shift_hours_min: 5.0, shift_hours_max: null,
        break_type: 'meal', break_duration_min: 20, is_paid: true,
        timing_rule: 'Between 2 hours and 5 hours after starting, if unpaid break is rostered after 5 hours',
        description: 'If your unpaid meal break is rostered to be taken after 5 hours of starting work, you must be given an additional paid 20-minute meal break between 2 hours and 5 hours after starting.',
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
    //   Q1: alpine_role — resort worker OR snowsports instructor
    //   Q2: alpine_worker_level — level for resort workers (conditional on Q1=resort_worker)
    //   Q3: alpine_instructor_cat — category for instructors (conditional on Q1=snowsports)
    const questions = [
      {
        question_key: 'alpine_role',
        question_text: 'What type of role do you work in at the resort?',
        help_text: 'Resort workers cover all non-instructing roles — lifts, hospitality, maintenance, guest services, trades, child care, and more. Snowsports instructors are employed to teach skiing or snowboarding at a recognised snowsports school.',
        question_type: 'single',
        stream: null,
        parent_question_key: null,
        parent_answer_key: null,
        sort_order: 1,
      },
      {
        question_key: 'alpine_worker_level',
        question_text: 'What level best describes your resort worker role?',
        help_text: 'Your level depends on your experience, qualifications, and the type of work you do. Training level is for staff undergoing induction (max 7 weeks). Level 1 is entry-level. Higher levels require more experience, qualifications, or supervisory responsibilities.',
        question_type: 'single',
        stream: null,
        parent_question_key: 'alpine_role',
        parent_answer_key: 'resort_worker',
        sort_order: 2,
      },
      {
        question_key: 'alpine_instructor_cat',
        question_text: 'What is your snowsports instructor category?',
        help_text: 'Your category depends on your APSI qualification level and years of experience. Category A is the highest (APSI Level 4 + 10 seasons). Category E is the lowest (trainee or recruitment clinic only).',
        question_type: 'single',
        stream: null,
        parent_question_key: 'alpine_role',
        parent_answer_key: 'snowsports',
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
      // Q1: alpine_role
      { question_key: 'alpine_role', answer_key: 'resort_worker', answer_text: 'Resort worker (lifts, hospitality, trades, guest services, maintenance, child care, etc.)', sort_order: 1 },
      { question_key: 'alpine_role', answer_key: 'snowsports',    answer_text: 'Snowsports instructor (teaching skiing or snowboarding)', sort_order: 2 },
      // Q2: alpine_worker_level
      { question_key: 'alpine_worker_level', answer_key: 'training', answer_text: 'Training level — I\'m doing induction or training (max 7 weeks)', sort_order: 1 },
      { question_key: 'alpine_worker_level', answer_key: 'l1',       answer_text: 'Level 1 — Entry-level, no experience needed (kitchenhand, car park, housekeeping, bar assistant)', sort_order: 2 },
      { question_key: 'alpine_worker_level', answer_key: 'l2',       answer_text: 'Level 2 — Some experience (ticket sales, receptionist, waiter, unqualified cook, retail)', sort_order: 3 },
      { question_key: 'alpine_worker_level', answer_key: 'l3',       answer_text: 'Level 3 — Significant experience (lift operator, trades assistant, beauty therapist, supervisor of L1/L2)', sort_order: 4 },
      { question_key: 'alpine_worker_level', answer_key: 'l4',       answer_text: 'Level 4 — Specialist or qualified (qualified chef, restaurant supervisor, cashroom officer)', sort_order: 5 },
      { question_key: 'alpine_worker_level', answer_key: 'l5',       answer_text: 'Level 5 — Supervisor/trainer of lower-level staff (lift operations supervisor, treasury supervisor)', sort_order: 6 },
      { question_key: 'alpine_worker_level', answer_key: 'l6',       answer_text: 'Level 6 — Qualified trade or specialist (plant operator, electrician, ski patroller, child care worker)', sort_order: 7 },
      { question_key: 'alpine_worker_level', answer_key: 'l7',       answer_text: 'Level 7 — Senior supervisor (senior chef, plant operations supervisor, child care supervisor with Diploma)', sort_order: 8 },
      // Q3: alpine_instructor_cat
      { question_key: 'alpine_instructor_cat', answer_key: 'cat_a', answer_text: 'Category A — APSI Level 4, 10+ full-time seasons', sort_order: 1 },
      { question_key: 'alpine_instructor_cat', answer_key: 'cat_b', answer_text: 'Category B — APSI Level 3', sort_order: 2 },
      { question_key: 'alpine_instructor_cat', answer_key: 'cat_c', answer_text: 'Category C — APSI Level 2', sort_order: 3 },
      { question_key: 'alpine_instructor_cat', answer_key: 'cat_d', answer_text: 'Category D — APSI Level 1', sort_order: 4 },
      { question_key: 'alpine_instructor_cat', answer_key: 'cat_e', answer_text: 'Category E — Trainee, no qualification or recruitment clinic only', sort_order: 5 },
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
