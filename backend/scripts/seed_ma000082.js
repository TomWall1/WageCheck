/**
 * Seed script — Sporting Organisations Award 2020 [MA000082]
 * Pay rates effective 1 July 2025
 * Source: Fair Work Ombudsman pay guide, effective 1 July 2025
 *
 * Award covers: employees of sporting organisations, including coaches
 * and clerical/administrative staff.
 *
 * Classification structure — two streams:
 *
 *   Coach stream (4 grades):
 *   L1 = Coach grade 1 — $31.92/hr
 *   L2 = Coach grade 2 — $35.82/hr
 *   L3 = Coach grade 3 — $43.04/hr
 *   L4 = Coach grade 4 — $48.81/hr
 *
 *   Clerical stream (6 grades):
 *   L1 = Grade 1 — $26.24/hr
 *   L2 = Grade 2 — $27.08/hr
 *   L3 = Grade 3 — $28.12/hr
 *   L4 = Grade 4 — $29.29/hr
 *   L5 = Grade 5 — $30.68/hr
 *   L6 = Grade 6 — $32.17/hr
 *
 * NOTE: Coaches have NO overtime entitlements.
 *       Overtime applies to clerical stream only.
 *
 * Run after migrate.js: node scripts/seed_ma000082.js
 */
require('dotenv').config();
const pool = require('../src/db/pool');

const AWARD_CODE = 'MA000082';
const EFFECTIVE_DATE = '2025-07-01';

async function seed() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // ── Award metadata ────────────────────────────────────────────────────────
    await client.query(`
      INSERT INTO award_metadata (award_code, award_name, effective_date, source_url)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (award_code) DO UPDATE SET
        award_name = EXCLUDED.award_name,
        effective_date = EXCLUDED.effective_date,
        updated_at = NOW()
    `, [
      AWARD_CODE,
      'Sporting Organisations Award 2020',
      EFFECTIVE_DATE,
      'https://www.fairwork.gov.au/employment-conditions/awards/awards-summary/ma000082-summary',
    ]);

    // ── Classifications ───────────────────────────────────────────────────────
    // Two streams: 'coach' (4 grades) and 'clerical' (6 grades).

    const classifications = [
      // ── Coach stream ──────────────────────────────────────────────────────
      {
        level: 1, stream: 'coach',
        title: 'Coach Grade 1',
        description: 'Entry-level coach. You assist with coaching sessions, supervise participants during activities, and perform basic administrative tasks related to coaching programs.',
        duties: [
          'Assisting senior coaches with training sessions and programs',
          'Supervising participants during sporting activities',
          'Setting up and packing away sporting equipment',
          'Basic record-keeping related to coaching sessions',
          'Ensuring participant safety during activities',
          'Performing general duties as directed by senior coaches',
        ],
        indicative_tasks: ['Assistant coach', 'Junior coaching assistant', 'Activity supervisor', 'New coach (entry-level)'],
        sort_order: 10,
      },
      {
        level: 2, stream: 'coach',
        title: 'Coach Grade 2',
        description: 'Experienced coach who plans and delivers coaching sessions independently. You may hold relevant coaching accreditation and work with athletes at club or regional level.',
        duties: [
          'Planning and delivering coaching sessions independently',
          'Developing training programs for individuals or teams',
          'Assessing and monitoring athlete performance and development',
          'Liaising with parents, club officials, and other stakeholders',
          'Maintaining coaching records and athlete progress reports',
          'Supervising and mentoring less experienced coaches',
        ],
        indicative_tasks: ['Club-level coach', 'Accredited coach', 'Squad coach', 'Skills development coach'],
        sort_order: 20,
      },
      {
        level: 3, stream: 'coach',
        title: 'Coach Grade 3',
        description: 'Senior coach with advanced qualifications or extensive experience. You oversee coaching programs, develop athlete pathways, and may coach at representative or state level.',
        duties: [
          'Designing and overseeing comprehensive coaching programs',
          'Coaching athletes at representative, state, or elite development level',
          'Managing athlete pathways and talent identification',
          'Training and developing coaching staff',
          'Coordinating with sports science and medical support staff',
          'Contributing to organisational strategic planning for sport programs',
        ],
        indicative_tasks: ['Senior coach', 'Head coach (club level)', 'State-level development coach', 'Program coordinator'],
        sort_order: 30,
      },
      {
        level: 4, stream: 'coach',
        title: 'Coach Grade 4',
        description: 'Head or elite-level coach with the highest coaching qualifications and significant experience. You lead major programs, manage coaching teams, and work at state or national level.',
        duties: [
          'Leading high-performance coaching programs at state or national level',
          'Managing and directing teams of coaches and support staff',
          'Developing organisational coaching philosophy and strategy',
          'Representing the organisation at elite sporting events and competitions',
          'Providing expert coaching advice and mentorship',
          'Overseeing athlete welfare and high-performance support programs',
        ],
        indicative_tasks: ['Head coach (state/national)', 'Director of coaching', 'High-performance coach', 'Elite program manager'],
        sort_order: 40,
      },
      // ── Clerical stream ───────────────────────────────────────────────────
      {
        level: 1, stream: 'clerical',
        title: 'Clerical Grade 1',
        description: 'Entry-level clerical employee performing basic administrative tasks under supervision. You handle routine enquiries, filing, data entry, and general office duties.',
        duties: [
          'Answering phones and responding to routine enquiries',
          'Filing, photocopying, and basic data entry',
          'Sorting and distributing incoming mail',
          'Maintaining basic records and spreadsheets',
          'Providing general administrative support to staff',
          'Greeting visitors and directing them to appropriate staff',
        ],
        indicative_tasks: ['Office junior', 'Receptionist (basic)', 'Administrative assistant (entry-level)', 'Data entry clerk'],
        sort_order: 110,
      },
      {
        level: 2, stream: 'clerical',
        title: 'Clerical Grade 2',
        description: 'Clerical employee with some experience, performing a wider range of administrative duties with limited supervision. You may handle membership enquiries, process payments, and maintain organisational records.',
        duties: [
          'Processing membership registrations and renewals',
          'Handling financial transactions and receipting payments',
          'Maintaining membership databases and records',
          'Preparing basic correspondence and reports',
          'Coordinating meeting schedules and room bookings',
          'Assisting with event administration and logistics',
        ],
        indicative_tasks: ['Membership officer', 'Administrative officer', 'Accounts clerk (basic)', 'Events assistant'],
        sort_order: 120,
      },
      {
        level: 3, stream: 'clerical',
        title: 'Clerical Grade 3',
        description: 'Experienced clerical employee working independently on a range of tasks. You exercise judgement in daily work, handle more complex enquiries, and may supervise junior staff.',
        duties: [
          'Independently managing administrative processes and systems',
          'Preparing reports, minutes, and correspondence of moderate complexity',
          'Coordinating events, competitions, and venue bookings',
          'Processing accounts payable and receivable',
          'Supervising and training junior administrative staff',
          'Managing inventory and procurement of office supplies',
        ],
        indicative_tasks: ['Senior administrative officer', 'Competitions coordinator', 'Accounts officer', 'Office supervisor (junior staff)'],
        sort_order: 130,
      },
      {
        level: 4, stream: 'clerical',
        title: 'Clerical Grade 4',
        description: 'Skilled clerical employee performing complex administrative, financial, or operational tasks. You work with significant autonomy and may have responsibility for specific functional areas.',
        duties: [
          'Managing financial records, budgets, and reporting',
          'Coordinating major events, programs, or operational functions',
          'Developing and implementing administrative procedures',
          'Providing executive support to senior management',
          'Managing compliance with regulatory and governance requirements',
          'Overseeing HR, payroll, or IT administration tasks',
        ],
        indicative_tasks: ['Finance officer', 'Operations coordinator', 'Executive assistant', 'Compliance officer'],
        sort_order: 140,
      },
      {
        level: 5, stream: 'clerical',
        title: 'Clerical Grade 5',
        description: 'Senior clerical employee with specialist knowledge or supervisory responsibilities. You manage a functional area and contribute to organisational planning and decision-making.',
        duties: [
          'Managing a team of administrative or clerical staff',
          'Overseeing organisational budgets and financial management',
          'Developing policies and procedures for administrative functions',
          'Managing complex projects, sponsorships, or partnerships',
          'Providing advice to management on operational and administrative matters',
          'Coordinating cross-functional activities across the organisation',
        ],
        indicative_tasks: ['Office manager', 'Senior finance officer', 'Project manager (admin)', 'Sponsorship coordinator'],
        sort_order: 150,
      },
      {
        level: 6, stream: 'clerical',
        title: 'Clerical Grade 6',
        description: 'Highest-level clerical employee with significant expertise, managing complex operations or specialist functions. You exercise a high degree of independence and contribute to strategic direction.',
        duties: [
          'Directing administrative and operational functions across the organisation',
          'Managing complex financial operations including auditing and compliance',
          'Leading strategic projects and organisational change initiatives',
          'Providing expert advice on governance, risk, and compliance matters',
          'Managing significant external relationships and partnerships',
          'Contributing to executive-level planning and decision-making',
        ],
        indicative_tasks: ['Senior office/operations manager', 'Financial controller', 'General manager (admin)', 'Chief administration officer'],
        sort_order: 160,
      },
    ];

    for (const c of classifications) {
      await client.query(`
        INSERT INTO classifications (award_code, level, stream, title, description, duties, indicative_tasks, sort_order)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        ON CONFLICT (award_code, level, stream) DO UPDATE SET
          title = EXCLUDED.title,
          description = EXCLUDED.description,
          duties = EXCLUDED.duties,
          indicative_tasks = EXCLUDED.indicative_tasks,
          sort_order = EXCLUDED.sort_order
      `, [
        AWARD_CODE, c.level, c.stream, c.title, c.description,
        JSON.stringify(c.duties), JSON.stringify(c.indicative_tasks), c.sort_order,
      ]);
    }
    console.log(`✓ Inserted ${classifications.length} classifications`);

    // ── Pay rates ─────────────────────────────────────────────────────────────
    // Source: FWO pay guide, effective 1 July 2025.
    // Casual rate = FT/PT rate × 1.25 (25% casual loading).

    const coachBaseRates = {
      1: 31.92, // Coach grade 1
      2: 35.82, // Coach grade 2
      3: 43.04, // Coach grade 3
      4: 48.81, // Coach grade 4
    };
    const coachCasualRates = {
      1: 39.90, // 31.92 × 1.25
      2: 44.78, // 35.82 × 1.25 (rounded)
      3: 53.80, // 43.04 × 1.25
      4: 61.01, // 48.81 × 1.25 (rounded)
    };

    const clericalBaseRates = {
      1: 26.24, // Grade 1
      2: 27.08, // Grade 2
      3: 28.12, // Grade 3
      4: 29.29, // Grade 4
      5: 30.68, // Grade 5
      6: 32.17, // Grade 6
    };
    const clericalCasualRates = {
      1: 32.80, // 26.24 × 1.25
      2: 33.85, // 27.08 × 1.25
      3: 35.15, // 28.12 × 1.25
      4: 36.61, // 29.29 × 1.25 (rounded)
      5: 38.35, // 30.68 × 1.25
      6: 40.21, // 32.17 × 1.25 (rounded)
    };

    const classResult = await client.query(
      'SELECT id, level, stream FROM classifications WHERE award_code = $1',
      [AWARD_CODE]
    );

    for (const cls of classResult.rows) {
      const baseRate = cls.stream === 'coach' ? coachBaseRates[cls.level] : clericalBaseRates[cls.level];
      const casualRate = cls.stream === 'coach' ? coachCasualRates[cls.level] : clericalCasualRates[cls.level];
      if (!baseRate) continue;

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

    // ── Penalty rates ─────────────────────────────────────────────────────────
    // Source: MA000082 & FWO pay guide, effective 1 July 2025.
    //
    // Weekday: ×1.0 (ordinary) for all employment types.
    // Saturday: ×1.0 (no Saturday penalty).
    // Sunday: ×1.0 (no Sunday penalty).
    // Public holiday FT/PT: ×2.50.
    // Public holiday casual (coaches): ×2.20 of casual base (2.20 × casual base ≈ 2.50 × FT base).
    // Public holiday casual (clerical): ×2.20 of casual base.

    const penaltyRates = [
      // ── Full-time ──────────────────────────────────────────────────────────
      {
        employment_type: 'full_time', day_type: 'weekday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.0, addition_per_hour: null,
        description: 'Ordinary weekday rate (Mon-Fri)',
      },
      {
        employment_type: 'full_time', day_type: 'saturday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.0, addition_per_hour: null,
        description: 'Saturday — ordinary rate (×1.0, no Saturday penalty)',
      },
      {
        employment_type: 'full_time', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.0, addition_per_hour: null,
        description: 'Sunday — ordinary rate (×1.0, no Sunday penalty)',
      },
      {
        employment_type: 'full_time', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.50, addition_per_hour: null,
        description: 'Public holiday — ×2.50',
      },
      // ── Part-time (same as full-time) ──────────────────────────────────────
      {
        employment_type: 'part_time', day_type: 'weekday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.0, addition_per_hour: null,
        description: 'Ordinary weekday rate (Mon-Fri)',
      },
      {
        employment_type: 'part_time', day_type: 'saturday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.0, addition_per_hour: null,
        description: 'Saturday — ordinary rate (×1.0, no Saturday penalty)',
      },
      {
        employment_type: 'part_time', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.0, addition_per_hour: null,
        description: 'Sunday — ordinary rate (×1.0, no Sunday penalty)',
      },
      {
        employment_type: 'part_time', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.50, addition_per_hour: null,
        description: 'Public holiday — ×2.50',
      },
      // ── Casual ─────────────────────────────────────────────────────────────
      // Casual base rate includes 25% casual loading.
      // PH casual: ×2.20 of casual base for both coaches and clerical.
      {
        employment_type: 'casual', day_type: 'weekday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.0, addition_per_hour: null,
        description: 'Ordinary casual weekday rate (includes 25% casual loading)',
      },
      {
        employment_type: 'casual', day_type: 'saturday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.0, addition_per_hour: null,
        description: 'Casual Saturday — ordinary rate (×1.0, no Saturday penalty)',
      },
      {
        employment_type: 'casual', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.0, addition_per_hour: null,
        description: 'Casual Sunday — ordinary rate (×1.0, no Sunday penalty)',
      },
      {
        employment_type: 'casual', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.20, addition_per_hour: null,
        description: 'Casual public holiday — ×2.20 of casual base',
      },
    ];

    await client.query(`DELETE FROM penalty_rates WHERE award_code = $1`, [AWARD_CODE]);

    for (const r of penaltyRates) {
      await client.query(`
        INSERT INTO penalty_rates
          (award_code, employment_type, day_type, time_band_start, time_band_end, time_band_label, multiplier, addition_per_hour, description, effective_date)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      `, [
        AWARD_CODE, r.employment_type, r.day_type,
        r.time_band_start, r.time_band_end, r.time_band_label,
        r.multiplier, r.addition_per_hour || null, r.description, EFFECTIVE_DATE,
      ]);
    }
    console.log(`✓ Inserted ${penaltyRates.length} penalty rate rules`);

    // ── Overtime rates ────────────────────────────────────────────────────────
    // MA000082 — Overtime applies to CLERICAL stream ONLY, NOT coaches.
    // First 2 hours: ×1.50, after 2 hours: ×2.00.
    // Weekly threshold: 38 hours, second band: 40 hours.
    // Casual overtime is calculated on FT base rate (not casual rate).
    // Casual OT multipliers relative to casual base:
    //   First 2 hrs: 1.50/1.25 = 1.20 of casual base
    //   After 2 hrs: 2.00/1.25 = 1.60 of casual base
    //
    // NOTE: The award excludes coaches from overtime. The calculator handles
    // this via stream-based filtering — overtime_rates are seeded only for
    // clerical, and the calculator checks the classification stream.

    const overtimeRates = [
      { employment_type: 'full_time',  threshold_hours: 38, period: 'weekly', multiplier: 1.50, description: 'Clerical weekly overtime — first 2 hours over 38 (×1.50)' },
      { employment_type: 'full_time',  threshold_hours: 40, period: 'weekly', multiplier: 2.00, description: 'Clerical weekly overtime — after 40 hours (×2.00)' },
      { employment_type: 'part_time',  threshold_hours: 38, period: 'weekly', multiplier: 1.50, description: 'Clerical part-time weekly overtime — first 2 hours (×1.50)' },
      { employment_type: 'part_time',  threshold_hours: 40, period: 'weekly', multiplier: 2.00, description: 'Clerical part-time weekly overtime — after 40 hours (×2.00)' },
      // Casual: OT is on FT base rate, so relative to casual base (which includes 25% loading):
      { employment_type: 'casual', threshold_hours: 38, period: 'weekly', multiplier: 1.20, description: 'Clerical casual weekly overtime — first 2 hours (×1.20 of casual base = 150% of FT)' },
      { employment_type: 'casual', threshold_hours: 40, period: 'weekly', multiplier: 1.60, description: 'Clerical casual weekly overtime — after 40 hours (×1.60 of casual base = 200% of FT)' },
    ];

    await client.query(`DELETE FROM overtime_rates WHERE award_code = $1`, [AWARD_CODE]);

    for (const r of overtimeRates) {
      await client.query(`
        INSERT INTO overtime_rates (award_code, employment_type, threshold_hours, period, multiplier, description, effective_date)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
      `, [AWARD_CODE, r.employment_type, r.threshold_hours, r.period, r.multiplier, r.description, EFFECTIVE_DATE]);
    }
    console.log(`✓ Inserted ${overtimeRates.length} overtime rules`);

    // ── Allowances ────────────────────────────────────────────────────────────
    // Source: MA000082 & FWO pay guide, effective 1 July 2025.
    const allowances = [
      {
        allowance_type: 'meal',
        name: 'Meal allowance (clerical)',
        description: 'If you are a clerical employee required to work overtime and a meal break falls during that overtime, you are entitled to a meal allowance.',
        trigger_condition: 'Clerical employee — overtime worked requiring a meal break',
        amount: 18.38, amount_type: 'fixed', per_unit: 'per_meal',
      },
      {
        allowance_type: 'vehicle',
        name: 'Vehicle allowance',
        description: 'If you are required to use your own vehicle for work purposes, you receive a per-kilometre allowance.',
        trigger_condition: 'Required to use own vehicle for work purposes',
        amount: 0.98, amount_type: 'per_km', per_unit: 'per_km',
      },
    ];

    await client.query(`DELETE FROM allowances WHERE award_code = $1`, [AWARD_CODE]);

    for (const a of allowances) {
      await client.query(`
        INSERT INTO allowances (award_code, allowance_type, name, description, trigger_condition, amount, amount_type, per_unit, effective_date)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        ON CONFLICT (award_code, allowance_type, effective_date) DO UPDATE SET
          name = EXCLUDED.name, description = EXCLUDED.description, amount = EXCLUDED.amount
      `, [AWARD_CODE, a.allowance_type, a.name, a.description, a.trigger_condition, a.amount, a.amount_type, a.per_unit, EFFECTIVE_DATE]);
    }
    console.log(`✓ Inserted ${allowances.length} allowances`);

    // ── Break entitlements ────────────────────────────────────────────────────
    // Rest: 10 min paid per 4 hours worked.
    // Meal: 30 min unpaid after 5 hours.

    const breaks = [
      {
        employment_type: null,
        shift_hours_min: 4.0, shift_hours_max: null,
        break_type: 'rest', break_duration_min: 10, is_paid: true,
        timing_rule: 'Once in each 4-hour period of work',
        description: 'You are entitled to a paid 10-minute rest break in each 4-hour work period.',
      },
      {
        employment_type: null,
        shift_hours_min: 5.0, shift_hours_max: null,
        break_type: 'meal', break_duration_min: 30, is_paid: false,
        timing_rule: 'No later than 5 hours after commencing work',
        description: 'If you work more than 5 hours, you must get an unpaid meal break of at least 30 minutes.',
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
    // Two-question flow:
    //   Q1: so_role_type — "What type of role?" → coach or clerical
    //   Q2a: so_coach_grade — "Coach grade?" → grade 1–4 (shown if coach)
    //   Q2b: so_clerical_grade — "Clerical grade?" → grade 1–6 (shown if clerical)

    const questions = [
      {
        award_code: AWARD_CODE,
        question_key: 'so_role_type',
        question_text: 'What type of role do you perform?',
        help_text: 'Select the stream that best matches your role. Coaches include anyone involved in coaching, instructing, or training athletes. Clerical covers administrative, office, and support staff.',
        question_type: 'single',
        stream: null,
        parent_question_key: null,
        parent_answer_key: null,
        sort_order: 1,
        answers: [
          { answer_key: 'coach', answer_text: 'Coach — coaching, instructing, or training athletes', sort_order: 1 },
          { answer_key: 'clerical', answer_text: 'Clerical — administrative, office, or support work', sort_order: 2 },
        ],
      },
      {
        award_code: AWARD_CODE,
        question_key: 'so_coach_grade',
        question_text: 'What is your coach grade?',
        help_text: 'Select the grade that best matches your qualifications, experience, and responsibilities. Check your employment contract or payslip if unsure.',
        question_type: 'single',
        stream: 'coach',
        parent_question_key: 'so_role_type',
        parent_answer_key: 'coach',
        sort_order: 2,
        answers: [
          { answer_key: 'grade1', answer_text: 'Grade 1 — entry-level or assistant coach', sort_order: 1 },
          { answer_key: 'grade2', answer_text: 'Grade 2 — experienced coach, plans and delivers sessions independently', sort_order: 2 },
          { answer_key: 'grade3', answer_text: 'Grade 3 — senior coach with advanced qualifications or extensive experience', sort_order: 3 },
          { answer_key: 'grade4', answer_text: 'Grade 4 — head or elite-level coach, leads major programs', sort_order: 4 },
        ],
      },
      {
        award_code: AWARD_CODE,
        question_key: 'so_clerical_grade',
        question_text: 'What is your clerical grade?',
        help_text: 'Select the grade that best matches your duties, responsibilities, and experience level. Check your employment contract or payslip if unsure.',
        question_type: 'single',
        stream: 'clerical',
        parent_question_key: 'so_role_type',
        parent_answer_key: 'clerical',
        sort_order: 3,
        answers: [
          { answer_key: 'grade1', answer_text: 'Grade 1 — entry-level, basic admin tasks (filing, data entry, phones)', sort_order: 1 },
          { answer_key: 'grade2', answer_text: 'Grade 2 — some experience, membership processing, payments', sort_order: 2 },
          { answer_key: 'grade3', answer_text: 'Grade 3 — experienced, works independently, may supervise juniors', sort_order: 3 },
          { answer_key: 'grade4', answer_text: 'Grade 4 — skilled, complex admin/financial tasks, significant autonomy', sort_order: 4 },
          { answer_key: 'grade5', answer_text: 'Grade 5 — senior, specialist knowledge or supervisory responsibilities', sort_order: 5 },
          { answer_key: 'grade6', answer_text: 'Grade 6 — highest level, directs operations or specialist functions', sort_order: 6 },
        ],
      },
    ];

    for (const q of questions) {
      const qResult = await client.query(`
        INSERT INTO classification_questions
          (award_code, question_key, question_text, help_text, question_type, stream, parent_question_key, parent_answer_key, sort_order)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        ON CONFLICT (question_key) DO UPDATE SET
          award_code = EXCLUDED.award_code,
          question_text = EXCLUDED.question_text,
          help_text = EXCLUDED.help_text,
          parent_question_key = EXCLUDED.parent_question_key,
          parent_answer_key = EXCLUDED.parent_answer_key,
          sort_order = EXCLUDED.sort_order
        RETURNING id
      `, [
        q.award_code, q.question_key, q.question_text, q.help_text,
        q.question_type, q.stream, q.parent_question_key, q.parent_answer_key, q.sort_order,
      ]);

      const questionId = qResult.rows[0].id;
      await client.query('DELETE FROM classification_answers WHERE question_id = $1', [questionId]);
      for (const a of q.answers) {
        await client.query(`
          INSERT INTO classification_answers (question_id, answer_key, answer_text, sort_order)
          VALUES ($1, $2, $3, $4)
        `, [questionId, a.answer_key, a.answer_text, a.sort_order]);
      }
    }
    console.log(`✓ Inserted ${questions.length} classification questions`);

    await client.query('COMMIT');
    console.log('\n✅ MA000082 seed complete');
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
