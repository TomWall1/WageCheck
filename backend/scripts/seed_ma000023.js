/**
 * Seed script — Contract Call Centres Award 2020 [MA000023]
 * Pay rates effective 7 October 2025
 * Source: Fair Work Ombudsman pay guide, effective 7 October 2025
 *
 * Award covers: employees in contract call centres.
 *
 * Classification structure — 3 streams:
 *   Clerical stream (5 levels):
 *     L1 = Level 1           — $25.85/hr
 *     L2 = Level 2           — $26.70/hr
 *     L3 = Level 3           — $28.12/hr
 *     L4 = Level 4           — $30.68/hr
 *     L5 = Level 5           — $32.90/hr
 *
 *   Customer contact stream (6 levels):
 *     L1 = Trainee                 — $25.85/hr
 *     L2 = Level 2                 — $26.70/hr
 *     L3 = Level 3                 — $28.12/hr
 *     L4 = Principal specialist    — $29.91/hr
 *     L5 = Team leader             — $30.68/hr
 *     L6 = Principal leader        — $32.90/hr
 *
 *   Technical stream (1 level):
 *     L1 = Technical associate     — $35.55/hr
 *
 * Run after migrate.js: node scripts/seed_ma000023.js
 */
require('dotenv').config();
const pool = require('../src/db/pool');

const AWARD_CODE = 'MA000023';
const EFFECTIVE_DATE = '2025-10-07';

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
      'Contract Call Centres Award 2020',
      EFFECTIVE_DATE,
      'https://www.fairwork.gov.au/employment-conditions/awards/awards-summary/ma000023-summary',
    ]);

    // ── Classifications ───────────────────────────────────────────────────────
    // MA000023 has 3 streams: clerical, customer_contact, technical.

    const classifications = [
      // ── Clerical stream ───────────────────────────────────────────────────
      {
        level: 1, stream: 'clerical',
        title: 'Clerical Level 1',
        description: 'Entry-level clerical employee in a contract call centre. You perform routine clerical and administrative tasks under direct supervision.',
        duties: [
          'Filing, photocopying, and general office tasks',
          'Basic data entry and record keeping',
          'Sorting and distributing mail and documents',
          'Answering routine phone enquiries and transferring calls',
          'Operating standard office equipment',
          'Performing tasks under close supervision',
        ],
        indicative_tasks: ['Office junior', 'Filing clerk', 'Data entry operator (entry)', 'Mail clerk'],
        sort_order: 10,
      },
      {
        level: 2, stream: 'clerical',
        title: 'Clerical Level 2',
        description: 'Clerical employee with some experience performing a range of administrative tasks with limited supervision.',
        duties: [
          'Data entry and processing with accuracy checks',
          'Maintaining filing systems and databases',
          'Preparing routine correspondence and reports',
          'Handling incoming and outgoing communications',
          'Coordinating schedules and appointments',
          'Using standard office software applications',
        ],
        indicative_tasks: ['Administrative assistant', 'Data entry operator', 'Records clerk', 'Receptionist'],
        sort_order: 20,
      },
      {
        level: 3, stream: 'clerical',
        title: 'Clerical Level 3',
        description: 'Experienced clerical employee performing more complex administrative duties and exercising some independent judgement.',
        duties: [
          'Processing complex forms and applications',
          'Producing reports and correspondence with minimal direction',
          'Coordinating office workflow and procedures',
          'Training and assisting lower-level clerical staff',
          'Maintaining and reconciling records and accounts',
          'Providing administrative support to management',
        ],
        indicative_tasks: ['Senior administrative assistant', 'Accounts clerk', 'Executive assistant', 'Office coordinator'],
        sort_order: 30,
      },
      {
        level: 4, stream: 'clerical',
        title: 'Clerical Level 4',
        description: 'Senior clerical employee with significant responsibility for administrative operations. You may supervise other clerical staff.',
        duties: [
          'Supervising and coordinating clerical teams',
          'Managing complex records, databases, and filing systems',
          'Preparing detailed reports and analysis for management',
          'Handling confidential and sensitive information',
          'Developing and improving administrative procedures',
          'Liaising with external parties and stakeholders',
        ],
        indicative_tasks: ['Office supervisor', 'Senior accounts officer', 'Administrative team leader', 'Executive secretary'],
        sort_order: 40,
      },
      {
        level: 5, stream: 'clerical',
        title: 'Clerical Level 5',
        description: 'Highest-level clerical employee with advanced responsibility for administrative functions. You manage complex projects and oversee significant operational areas.',
        duties: [
          'Managing major administrative projects and initiatives',
          'Overseeing multiple clerical teams or departments',
          'Providing expert advice on administrative and procedural matters',
          'Developing policies and procedures for administrative operations',
          'Reporting directly to senior management',
          'Managing budgets and resource allocation for administrative areas',
        ],
        indicative_tasks: ['Office manager', 'Senior administrative manager', 'Executive officer', 'Administration coordinator'],
        sort_order: 50,
      },
      // ── Customer contact stream ───────────────────────────────────────────
      {
        level: 1, stream: 'customer_contact',
        title: 'Customer Contact Level 1 (Trainee)',
        description: 'Trainee customer contact employee. You are learning call centre systems and procedures under close supervision.',
        duties: [
          'Learning and using call centre systems and software',
          'Handling simple customer enquiries under supervision',
          'Following scripts and standard procedures for calls',
          'Recording customer information accurately',
          'Transferring calls to appropriate team members',
          'Completing training modules and assessments',
        ],
        indicative_tasks: ['Trainee call centre operator', 'Customer service trainee', 'Contact centre trainee'],
        sort_order: 110,
      },
      {
        level: 2, stream: 'customer_contact',
        title: 'Customer Contact Level 2',
        description: 'Customer contact employee handling a range of inbound and outbound calls with competency in call centre systems.',
        duties: [
          'Handling inbound and outbound customer calls independently',
          'Resolving standard customer enquiries and complaints',
          'Using call centre systems and databases effectively',
          'Meeting call handling targets and quality standards',
          'Documenting customer interactions and outcomes',
          'Cross-selling or upselling products and services as required',
        ],
        indicative_tasks: ['Call centre operator', 'Customer service representative', 'Inbound/outbound agent'],
        sort_order: 120,
      },
      {
        level: 3, stream: 'customer_contact',
        title: 'Customer Contact Level 3',
        description: 'Experienced customer contact employee handling complex enquiries and escalations. You may assist with training new staff.',
        duties: [
          'Handling complex and escalated customer enquiries',
          'Resolving complaints and disputes with authority',
          'Assisting with on-the-job training of new employees',
          'Providing product and service expertise to customers',
          'Analysing customer issues and recommending solutions',
          'Contributing to process improvement initiatives',
        ],
        indicative_tasks: ['Senior customer service representative', 'Escalation handler', 'Quality assurance agent'],
        sort_order: 130,
      },
      {
        level: 4, stream: 'customer_contact',
        title: 'Customer Contact Level 4 (Principal Specialist)',
        description: 'Principal specialist with deep expertise in customer contact operations. You handle the most complex interactions and provide specialist support.',
        duties: [
          'Providing specialist product, service, or technical expertise',
          'Handling the most complex and sensitive customer interactions',
          'Mentoring and coaching team members on specialist knowledge',
          'Contributing to the development of scripts, FAQs, and procedures',
          'Analysing trends and reporting on complex customer issues',
          'Acting as a subject-matter expert for the team',
        ],
        indicative_tasks: ['Principal specialist', 'Subject-matter expert', 'Senior escalation specialist'],
        sort_order: 140,
      },
      {
        level: 5, stream: 'customer_contact',
        title: 'Customer Contact Level 5 (Team Leader)',
        description: 'Team leader responsible for supervising a team of customer contact employees. You manage daily operations and team performance.',
        duties: [
          'Supervising a team of customer contact employees',
          'Monitoring team performance against KPIs and targets',
          'Conducting performance reviews and coaching sessions',
          'Handling escalated calls and complex customer issues',
          'Coordinating rostering and workforce planning',
          'Reporting on team performance to management',
        ],
        indicative_tasks: ['Team leader', 'Shift supervisor', 'Call centre team leader'],
        sort_order: 150,
      },
      {
        level: 6, stream: 'customer_contact',
        title: 'Customer Contact Level 6 (Principal Leader)',
        description: 'Principal leader with responsibility for multiple teams or a major area of call centre operations. You drive strategy and performance improvement.',
        duties: [
          'Overseeing multiple teams or a major operational area',
          'Developing and implementing operational strategies',
          'Driving continuous improvement and quality programs',
          'Managing budgets and resource allocation',
          'Liaising with clients and senior management',
          'Leading change management and large-scale projects',
        ],
        indicative_tasks: ['Principal leader', 'Operations manager', 'Senior team leader', 'Contact centre manager'],
        sort_order: 160,
      },
      // ── Technical stream ──────────────────────────────────────────────────
      {
        level: 1, stream: 'technical',
        title: 'Technical Associate',
        description: 'Technical associate providing IT, systems, or technical support in a contract call centre environment. You maintain and troubleshoot call centre technology.',
        duties: [
          'Installing, configuring, and maintaining call centre hardware and software',
          'Troubleshooting technical issues with telephony and IT systems',
          'Providing technical support to call centre staff',
          'Monitoring system performance and uptime',
          'Implementing system updates, patches, and upgrades',
          'Documenting technical procedures and system configurations',
        ],
        indicative_tasks: ['Technical associate', 'IT support officer', 'Systems administrator', 'Telephony technician'],
        sort_order: 210,
      },
    ];

    for (const c of classifications) {
      await client.query(`
        INSERT INTO classifications (award_code, level, stream, pay_point, title, description, duties, indicative_tasks, sort_order)
        VALUES ($1, $2, $3, 1, $4, $5, $6, $7, $8)
        ON CONFLICT (award_code, level, stream, pay_point) DO UPDATE SET
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
    // Source: FWO pay guide, effective 7 October 2025.
    // Casual rate = FT/PT rate × 1.25 (25% casual loading), pre-calculated.
    const baseRates = {
      clerical: {
        1: 25.85,
        2: 26.70,
        3: 28.12,
        4: 30.68,
        5: 32.90,
      },
      customer_contact: {
        1: 25.85,
        2: 26.70,
        3: 28.12,
        4: 29.91,
        5: 30.68,
        6: 32.90,
      },
      technical: {
        1: 35.55,
      },
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
      const casualRate = parseFloat((baseRate * 1.25).toFixed(2));

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
    // Source: MA000023 & FWO pay guide, effective 7 October 2025.
    //
    // FT/PT penalties are multipliers of the base hourly rate.
    // Casual penalties are multipliers of the casual base rate (which includes 25% loading).

    const penaltyRates = [
      // ── Full-time ──────────────────────────────────────────────────────────
      {
        employment_type: 'full_time', day_type: 'weekday',
        time_band_start: '07:00', time_band_end: '19:00', time_band_label: 'ordinary_span',
        multiplier: 1.0, addition_per_hour: null,
        description: 'Ordinary weekday rate (Mon–Fri 7am–7pm)',
      },
      {
        employment_type: 'full_time', day_type: 'weekday',
        time_band_start: '00:00', time_band_end: '07:00', time_band_label: 'outside_span_early',
        multiplier: 1.25, addition_per_hour: null,
        description: 'Weekday outside span of hours (before 7am, ×1.25)',
      },
      {
        employment_type: 'full_time', day_type: 'weekday',
        time_band_start: '19:00', time_band_end: '23:59', time_band_label: 'outside_span_late',
        multiplier: 1.25, addition_per_hour: null,
        description: 'Weekday outside span of hours (after 7pm, ×1.25)',
      },
      {
        employment_type: 'full_time', day_type: 'weekday',
        time_band_start: null, time_band_end: null, time_band_label: 'afternoon_shift',
        multiplier: 1.15, addition_per_hour: null,
        description: 'Afternoon shift (×1.15)',
      },
      {
        employment_type: 'full_time', day_type: 'weekday',
        time_band_start: null, time_band_end: null, time_band_label: 'night_shift',
        multiplier: 1.15, addition_per_hour: null,
        description: 'Night shift (×1.15)',
      },
      {
        employment_type: 'full_time', day_type: 'weekday',
        time_band_start: null, time_band_end: null, time_band_label: 'permanent_night_shift',
        multiplier: 1.30, addition_per_hour: null,
        description: 'Permanent night shift (×1.30)',
      },
      {
        employment_type: 'full_time', day_type: 'saturday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.25, addition_per_hour: null,
        description: 'Saturday (×1.25)',
      },
      {
        employment_type: 'full_time', day_type: 'sunday',
        time_band_start: '07:00', time_band_end: '19:00', time_band_label: 'ordinary_span',
        multiplier: 1.50, addition_per_hour: null,
        description: 'Sunday 7am–7pm (×1.50)',
      },
      {
        employment_type: 'full_time', day_type: 'sunday',
        time_band_start: '00:00', time_band_end: '07:00', time_band_label: 'outside_span_early',
        multiplier: 1.75, addition_per_hour: null,
        description: 'Sunday outside span of hours (before 7am, ×1.75)',
      },
      {
        employment_type: 'full_time', day_type: 'sunday',
        time_band_start: '19:00', time_band_end: '23:59', time_band_label: 'outside_span_late',
        multiplier: 1.75, addition_per_hour: null,
        description: 'Sunday outside span of hours (after 7pm, ×1.75)',
      },
      {
        employment_type: 'full_time', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.50, addition_per_hour: null,
        description: 'Public holiday (×2.50)',
      },
      // ── Part-time (same as full-time) ──────────────────────────────────────
      {
        employment_type: 'part_time', day_type: 'weekday',
        time_band_start: '07:00', time_band_end: '19:00', time_band_label: 'ordinary_span',
        multiplier: 1.0, addition_per_hour: null,
        description: 'Ordinary weekday rate (Mon–Fri 7am–7pm)',
      },
      {
        employment_type: 'part_time', day_type: 'weekday',
        time_band_start: '00:00', time_band_end: '07:00', time_band_label: 'outside_span_early',
        multiplier: 1.25, addition_per_hour: null,
        description: 'Weekday outside span of hours (before 7am, ×1.25)',
      },
      {
        employment_type: 'part_time', day_type: 'weekday',
        time_band_start: '19:00', time_band_end: '23:59', time_band_label: 'outside_span_late',
        multiplier: 1.25, addition_per_hour: null,
        description: 'Weekday outside span of hours (after 7pm, ×1.25)',
      },
      {
        employment_type: 'part_time', day_type: 'weekday',
        time_band_start: null, time_band_end: null, time_band_label: 'afternoon_shift',
        multiplier: 1.15, addition_per_hour: null,
        description: 'Afternoon shift (×1.15)',
      },
      {
        employment_type: 'part_time', day_type: 'weekday',
        time_band_start: null, time_band_end: null, time_band_label: 'night_shift',
        multiplier: 1.15, addition_per_hour: null,
        description: 'Night shift (×1.15)',
      },
      {
        employment_type: 'part_time', day_type: 'weekday',
        time_band_start: null, time_band_end: null, time_band_label: 'permanent_night_shift',
        multiplier: 1.30, addition_per_hour: null,
        description: 'Permanent night shift (×1.30)',
      },
      {
        employment_type: 'part_time', day_type: 'saturday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.25, addition_per_hour: null,
        description: 'Saturday (×1.25)',
      },
      {
        employment_type: 'part_time', day_type: 'sunday',
        time_band_start: '07:00', time_band_end: '19:00', time_band_label: 'ordinary_span',
        multiplier: 1.50, addition_per_hour: null,
        description: 'Sunday 7am–7pm (×1.50)',
      },
      {
        employment_type: 'part_time', day_type: 'sunday',
        time_band_start: '00:00', time_band_end: '07:00', time_band_label: 'outside_span_early',
        multiplier: 1.75, addition_per_hour: null,
        description: 'Sunday outside span of hours (before 7am, ×1.75)',
      },
      {
        employment_type: 'part_time', day_type: 'sunday',
        time_band_start: '19:00', time_band_end: '23:59', time_band_label: 'outside_span_late',
        multiplier: 1.75, addition_per_hour: null,
        description: 'Sunday outside span of hours (after 7pm, ×1.75)',
      },
      {
        employment_type: 'part_time', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.50, addition_per_hour: null,
        description: 'Public holiday (×2.50)',
      },
      // ── Casual ─────────────────────────────────────────────────────────────
      // Casual penalties are multipliers of the casual base rate (includes 25% loading).
      {
        employment_type: 'casual', day_type: 'weekday',
        time_band_start: '07:00', time_band_end: '19:00', time_band_label: 'ordinary_span',
        multiplier: 1.0, addition_per_hour: null,
        description: 'Ordinary casual weekday rate 7am–7pm (includes 25% casual loading)',
      },
      {
        employment_type: 'casual', day_type: 'weekday',
        time_band_start: '00:00', time_band_end: '07:00', time_band_label: 'outside_span_early',
        multiplier: 1.20, addition_per_hour: null,
        description: 'Casual weekday outside span (before 7am, ×1.20 of casual base)',
      },
      {
        employment_type: 'casual', day_type: 'weekday',
        time_band_start: '19:00', time_band_end: '23:59', time_band_label: 'outside_span_late',
        multiplier: 1.20, addition_per_hour: null,
        description: 'Casual weekday outside span (after 7pm, ×1.20 of casual base)',
      },
      {
        employment_type: 'casual', day_type: 'weekday',
        time_band_start: null, time_band_end: null, time_band_label: 'afternoon_shift',
        multiplier: 1.12, addition_per_hour: null,
        description: 'Casual afternoon shift (×1.12 of casual base)',
      },
      {
        employment_type: 'casual', day_type: 'weekday',
        time_band_start: null, time_band_end: null, time_band_label: 'night_shift',
        multiplier: 1.12, addition_per_hour: null,
        description: 'Casual night shift (×1.12 of casual base)',
      },
      {
        employment_type: 'casual', day_type: 'weekday',
        time_band_start: null, time_band_end: null, time_band_label: 'permanent_night_shift',
        multiplier: 1.24, addition_per_hour: null,
        description: 'Casual permanent night shift (×1.24 of casual base)',
      },
      {
        employment_type: 'casual', day_type: 'saturday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.20, addition_per_hour: null,
        description: 'Casual Saturday (×1.20 of casual base)',
      },
      {
        employment_type: 'casual', day_type: 'sunday',
        time_band_start: '07:00', time_band_end: '19:00', time_band_label: 'ordinary_span',
        multiplier: 1.40, addition_per_hour: null,
        description: 'Casual Sunday 7am–7pm (×1.40 of casual base)',
      },
      {
        employment_type: 'casual', day_type: 'sunday',
        time_band_start: '00:00', time_band_end: '07:00', time_band_label: 'outside_span_early',
        multiplier: 1.60, addition_per_hour: null,
        description: 'Casual Sunday outside span (before 7am, ×1.60 of casual base)',
      },
      {
        employment_type: 'casual', day_type: 'sunday',
        time_band_start: '19:00', time_band_end: '23:59', time_band_label: 'outside_span_late',
        multiplier: 1.60, addition_per_hour: null,
        description: 'Casual Sunday outside span (after 7pm, ×1.60 of casual base)',
      },
      {
        employment_type: 'casual', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.20, addition_per_hour: null,
        description: 'Casual public holiday (×2.20 of casual base)',
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
    // MA000023 — Overtime
    // Mon–Sat first 3 hours: ×1.50, after 3 hours: ×2.00.
    // Sunday: ×2.00 for all overtime hours.
    // Weekly threshold: 38 hours, second band: 41 hours (3hr band).
    // Casual overtime is calculated on FT base rate (not casual rate).
    // Casual OT multipliers relative to casual base:
    //   First 3 hrs: 1.50/1.25 = 1.20 of casual base
    //   After 3 hrs: 2.00/1.25 = 1.60 of casual base

    const overtimeRates = [
      { employment_type: 'full_time',  threshold_hours: 38, period: 'weekly', multiplier: 1.50, description: 'Weekly overtime — first 3 hours over 38 (×1.50)' },
      { employment_type: 'full_time',  threshold_hours: 41, period: 'weekly', multiplier: 2.00, description: 'Weekly overtime — after 41 hours (×2.00)' },
      { employment_type: 'part_time',  threshold_hours: 38, period: 'weekly', multiplier: 1.50, description: 'Part-time weekly overtime — first 3 hours (×1.50)' },
      { employment_type: 'part_time',  threshold_hours: 41, period: 'weekly', multiplier: 2.00, description: 'Part-time weekly overtime — after 41 hours (×2.00)' },
      // Casual: OT is on FT base rate, so relative to casual base (which includes 25% loading):
      { employment_type: 'casual', threshold_hours: 38, period: 'weekly', multiplier: 1.20, description: 'Casual weekly overtime — first 3 hours (×1.20 of casual base = 150% of FT)' },
      { employment_type: 'casual', threshold_hours: 41, period: 'weekly', multiplier: 1.60, description: 'Casual weekly overtime — after 41 hours (×1.60 of casual base = 200% of FT)' },
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
    // Source: MA000023 & FWO pay guide, effective 7 October 2025.
    const allowances = [
      {
        allowance_type: 'first_aid',
        name: 'First aid allowance',
        description: 'If you hold a current first aid certificate and are appointed as first aid officer, you receive a weekly allowance.',
        trigger_condition: 'Appointed as first aid officer with a current first aid certificate',
        amount: 16.03, amount_type: 'weekly', per_unit: 'per_week',
      },
      {
        allowance_type: 'meal',
        name: 'Meal allowance',
        description: 'If you are required to work overtime and a meal break falls during that overtime, you are entitled to a meal allowance.',
        trigger_condition: 'Overtime worked requiring a meal break',
        amount: 16.03, amount_type: 'fixed', per_unit: 'per_meal',
      },
      {
        allowance_type: 'headset',
        name: 'Headset reimbursement',
        description: 'If you are required to use a headset and your employer does not provide one, you are entitled to reimbursement for the cost.',
        trigger_condition: 'Required to use a headset not provided by employer',
        amount: 0, amount_type: 'reimbursement', per_unit: 'per_item',
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
    //   1. cc_stream — which stream do you work in? (clerical, customer_contact, technical)
    //   2. cc_clerical_level — what is your clerical level? (1–5) [if clerical]
    //      cc_contact_level — what is your customer contact level? (1–6) [if customer_contact]
    //      (technical has only 1 level, so no follow-up needed)

    const questions = [
      {
        award_code: AWARD_CODE,
        question_key: 'cc_stream',
        question_text: 'Which stream do you work in?',
        help_text: 'Your stream is usually stated in your contract or position description. Clerical staff do administrative/office work, customer contact staff handle calls and customer interactions, and technical staff provide IT and systems support.',
        question_type: 'single',
        stream: null,
        parent_question_key: null,
        parent_answer_key: null,
        sort_order: 1,
        answers: [
          { answer_key: 'clerical', answer_text: 'Clerical — administrative and office support work', sort_order: 1 },
          { answer_key: 'customer_contact', answer_text: 'Customer contact — handling calls, customer enquiries, and contact centre operations', sort_order: 2 },
          { answer_key: 'technical', answer_text: 'Technical — IT, systems, and technical support', sort_order: 3 },
        ],
      },
      {
        award_code: AWARD_CODE,
        question_key: 'cc_clerical_level',
        question_text: 'What is your clerical classification level?',
        help_text: 'Check your employment contract or payslip for your level. Level 1 is entry-level, Level 5 is the most senior.',
        question_type: 'single',
        stream: 'clerical',
        parent_question_key: 'cc_stream',
        parent_answer_key: 'clerical',
        sort_order: 2,
        answers: [
          { answer_key: 'level_1', answer_text: 'Level 1 — entry-level clerical duties under direct supervision', sort_order: 1 },
          { answer_key: 'level_2', answer_text: 'Level 2 — routine clerical tasks with limited supervision', sort_order: 2 },
          { answer_key: 'level_3', answer_text: 'Level 3 — experienced clerical work with independent judgement', sort_order: 3 },
          { answer_key: 'level_4', answer_text: 'Level 4 — senior clerical duties, may supervise other staff', sort_order: 4 },
          { answer_key: 'level_5', answer_text: 'Level 5 — highest-level clerical with advanced responsibilities', sort_order: 5 },
        ],
      },
      {
        award_code: AWARD_CODE,
        question_key: 'cc_contact_level',
        question_text: 'What is your customer contact classification level?',
        help_text: 'Check your employment contract or payslip for your level. Level 1 is a trainee, Level 6 (Principal Leader) is the most senior.',
        question_type: 'single',
        stream: 'customer_contact',
        parent_question_key: 'cc_stream',
        parent_answer_key: 'customer_contact',
        sort_order: 3,
        answers: [
          { answer_key: 'level_1', answer_text: 'Level 1 (Trainee) — learning call centre systems under supervision', sort_order: 1 },
          { answer_key: 'level_2', answer_text: 'Level 2 — handling calls independently with competency in systems', sort_order: 2 },
          { answer_key: 'level_3', answer_text: 'Level 3 — handling complex enquiries and escalations', sort_order: 3 },
          { answer_key: 'level_4', answer_text: 'Level 4 (Principal Specialist) — deep expertise, most complex interactions', sort_order: 4 },
          { answer_key: 'level_5', answer_text: 'Level 5 (Team Leader) — supervising a team of contact employees', sort_order: 5 },
          { answer_key: 'level_6', answer_text: 'Level 6 (Principal Leader) — overseeing multiple teams or major operations', sort_order: 6 },
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
    console.log('\n✅ MA000023 seed complete');
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
