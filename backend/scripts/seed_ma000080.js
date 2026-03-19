/**
 * Seed script — Amusement, Events and Recreation Award 2020 [MA000080]
 * Pay rates effective 17 October 2025 (published 17 October 2025)
 * Source: Fair Work Ombudsman pay guide MA000080 (G00803007)
 *
 * Key differences from other awards:
 *   - Saturday is NOT a penalty day — ordinary rate applies all week Mon–Sat
 *   - Sunday: ×1.50 FT/PT, ×1.40 of casual base
 *   - Public holiday: ×2.50 FT/PT, ×2.20 of casual base
 *   - Overtime: first 3 hours ×1.50, after 3 hours ×2.00
 *   - Short break (<10h between shifts): ×2.00 for affected hours
 *   - 11 levels: Introductory (internal 0) + Grade 1–10 (internal 1–10), stream 'general'
 *   - Exhibition employees (stream 'exhibition'): Grade 2, 4, 5 with embedded loadings
 *   - Junior rates: ≤16=55%, 17=65%, 18=75%, 19=85%, 20+=100%
 *
 * Run after migrate.js: node scripts/seed_ma000080.js
 */
require('dotenv').config();
const pool = require('../src/db/pool');

const AWARD_CODE = 'MA000080';
const EFFECTIVE_DATE = '2025-10-17';

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
      'Amusement, Events and Recreation Award 2020',
      EFFECTIVE_DATE,
      'https://awards.fairwork.gov.au/MA000080.html',
    ]);

    // ── Classifications ───────────────────────────────────────────────────────
    // Levels 0 (Introductory) through 10 (Grade 10), stream 'general'.
    // Exhibition employees use stream 'exhibition', levels 2, 4, 5.
    // Source: Schedule A of the Amusement, Events and Recreation Award 2020.

    const classifications = [
      // ── GENERAL STREAM ─────────────────────────────────────────────────────
      {
        level: 0, stream: 'general',
        title: 'Introductory Level',
        description: 'You are new to the amusement, events or recreation industry and currently undergoing on-the-job training. The introductory period cannot exceed one month (or the equivalent for seasonal or casual work). After the introductory period, you must be classified at Grade 1 or above.',
        duties: [
          'Receiving on-the-job training and instruction from a supervisor',
          'Performing simple, clearly defined tasks under direct supervision',
          'Learning the basics of your role (ticket collection, cleaning, general assistance)',
          'Following instructions at all times — you are not expected to work independently yet',
        ],
        indicative_tasks: ['New employee in training', 'Trainee attendant', 'Trainee assistant'],
        sort_order: 0,
      },
      {
        level: 1, stream: 'general',
        title: 'Grade 1',
        description: 'You perform general support and operational tasks with supervision. You are no longer in your first month of employment.',
        duties: [
          'Taking admission money, issuing or checking tickets',
          'Operating rides or amusements under supervision',
          'Handling cash and making change (basic cash handling)',
          'Performing general cleaning duties and maintaining grounds',
          'Serving refreshments or operating a food/beverage outlet under supervision',
          'Providing basic tourist or visitor information under supervision',
          'Car parking attendant duties',
          'Distributing promotional material',
        ],
        indicative_tasks: ['Ride attendant (supervised)', 'Ticket seller', 'Grounds keeper', 'Refreshment attendant', 'Car park attendant'],
        sort_order: 10,
      },
      {
        level: 2, stream: 'general',
        title: 'Grade 2',
        description: 'You perform work at a higher level than Grade 1. You can operate amusements or rides without close supervision, handle transactions, or perform other skilled support duties.',
        duties: [
          'Operating rides, amusements or attractions independently',
          'Cashiering and processing customer transactions without close supervision',
          'Selling admission, memberships or attraction passes',
          'Explaining displays, attractions or activities to visitors',
          'Trained first aid officer duties',
          'Operating machines or equipment at the Grade 2 level',
          'Assisting with the setup and packdown of equipment or attractions',
        ],
        indicative_tasks: ['Ride operator', 'Cashier', 'Attractions attendant', 'First aid officer', 'Machine operator'],
        sort_order: 20,
      },
      {
        level: 3, stream: 'general',
        title: 'Grade 3',
        description: 'You perform work at a higher level than Grade 2. You may operate specialised equipment, perform skilled trades assistant duties, or be in charge of Grade 1 and 2 employees.',
        duties: [
          'Operating specialised equipment or machinery requiring specific skill',
          'Performing skilled handyperson maintenance and repair tasks',
          'Acting as a group leader or in charge of Grade 1 and 2 employees',
          'Advanced cash handling including balancing and reconciling',
          'Coordinating an area of the operation under general direction',
          'Applying skills requiring a higher level of training than Grade 2',
        ],
        indicative_tasks: ['Group leader', 'Handyperson', 'Specialised equipment operator', 'Senior attendant'],
        sort_order: 30,
      },
      {
        level: 4, stream: 'general',
        title: 'Grade 4',
        description: 'You are an apprentice tradesperson (2nd or 3rd year equivalent), a semi-skilled tradesperson, or you perform work clearly above Grade 3 in complexity and skill.',
        duties: [
          '2nd or 3rd year apprentice tradesperson duties',
          'Semi-skilled mechanical, electrical or technical work',
          'Operating plant or equipment requiring formal training or qualifications',
          'Skilled maintenance work above the handyperson level',
          'Supervising Grade 1–3 employees in a work area',
        ],
        indicative_tasks: ['Apprentice (2nd–3rd year)', 'Semi-skilled tradesperson', 'Senior operator (qualified)', 'Plant operator'],
        sort_order: 40,
      },
      {
        level: 5, stream: 'general',
        title: 'Grade 5',
        description: 'You are a fully qualified tradesperson. You hold a trade certificate or have equivalent skills obtained through experience. You work independently in your trade.',
        duties: [
          'Performing all work within your trade to the standard of a fully qualified tradesperson',
          'Applying trade skills without direct supervision',
          'Maintaining, repairing and installing equipment within your trade',
          'Diagnosing faults and determining appropriate remedies',
          'Ensuring your work meets relevant codes and standards',
        ],
        indicative_tasks: ['Electrician', 'Plumber', 'Carpenter', 'Mechanic', 'Qualified tradesperson'],
        sort_order: 50,
      },
      {
        level: 6, stream: 'general',
        title: 'Grade 6',
        description: 'You are a senior tradesperson performing at a higher level than Grade 5, or a leading hand responsible for up to 3 other employees.',
        duties: [
          'All Grade 5 duties, performed at a higher skill level',
          'Leading a small team of up to 3 employees (leading hand role)',
          'Providing trade expertise across multiple areas',
          'Training and guiding lower-grade employees in technical tasks',
          'Taking responsibility for the quality of work in your area',
        ],
        indicative_tasks: ['Senior tradesperson', 'Leading hand (up to 3 staff)', 'Senior mechanic', 'Senior electrician'],
        sort_order: 60,
      },
      {
        level: 7, stream: 'general',
        title: 'Grade 7',
        description: 'You are a leading hand responsible for 4 or more employees, or you perform work that requires skills substantially above Grade 6.',
        duties: [
          'Leading a team of 4 or more employees',
          'Allocating and directing work across the team',
          'Ensuring safety and quality standards are met',
          'Coordinating technical tasks across multiple areas',
          'Acting as the main point of contact for technical or operational issues in your area',
        ],
        indicative_tasks: ['Leading hand (4+ staff)', 'Senior specialist', 'Technical team leader'],
        sort_order: 70,
      },
      {
        level: 8, stream: 'general',
        title: 'Grade 8',
        description: 'You are a supervisor or section manager. You are responsible for the day-to-day management of a section or work area, including the staff who work in it.',
        duties: [
          'Supervising all employees in a section or work area',
          'Planning, scheduling and allocating work',
          'Conducting performance discussions with your team',
          'Managing operational issues independently',
          'Reporting to management on the performance of your section',
          'Ensuring compliance with safety, legal and operational requirements in your area',
        ],
        indicative_tasks: ['Supervisor', 'Section manager', 'Operations supervisor', 'Maintenance supervisor'],
        sort_order: 80,
      },
      {
        level: 9, stream: 'general',
        title: 'Grade 9',
        description: 'You are a senior supervisor or junior manager with broad operational responsibility across multiple sections or a larger team.',
        duties: [
          'Managing multiple supervisors or sections',
          'Developing and implementing operational procedures',
          'Strategic planning within your area of responsibility',
          'Managing budgets and resources for your area',
          'Handling complex staff and operational issues',
          'Reporting directly to senior management',
        ],
        indicative_tasks: ['Senior supervisor', 'Operations manager (small venue)', 'Department manager', 'Park manager (small)'],
        sort_order: 90,
      },
      {
        level: 10, stream: 'general',
        title: 'Grade 10',
        description: 'You are a senior manager with enterprise-wide or major departmental responsibility. You hold the highest level of operational authority covered by the award.',
        duties: [
          'Full responsibility for the management of a venue, enterprise, or major department',
          'Setting the strategic direction for your area of responsibility',
          'Managing senior staff and overseeing all operations',
          'Financial accountability including P&L responsibility',
          'Stakeholder management and external relationships',
        ],
        indicative_tasks: ['General manager', 'Park director', 'Senior operations manager', 'Venue CEO (award-covered)'],
        sort_order: 100,
      },

      // ── EXHIBITION STREAM ───────────────────────────────────────────────────
      // Exhibition employees work at shows, exhibitions, conventions and events.
      // Their FT/PT rates include a flexible loading and supervisory loading.
      // Only three grades apply: General Hand (Grade 2), Technician (Grade 4),
      // Supervisory Technician (Grade 5).
      {
        level: 2, stream: 'exhibition',
        title: 'Exhibition General Hand (Grade 2)',
        description: 'You work as a general hand at exhibitions, trade shows or conventions. Your rate includes the flexible loading allowance. You set up, maintain and pack down displays and stands under supervision.',
        duties: [
          'Setting up and packing down exhibition stands and displays',
          'Moving and positioning display materials, furniture and equipment',
          'Assisting exhibitors with general requests',
          'Performing general maintenance and cleaning of exhibition areas',
          'Operating basic exhibition equipment under supervision',
        ],
        indicative_tasks: ['Exhibition general hand', 'Show assistant', 'Convention floor worker'],
        sort_order: 21,
      },
      {
        level: 4, stream: 'exhibition',
        title: 'Exhibition Technician (Grade 4)',
        description: 'You are a skilled exhibition technician. Your rate includes the flexible loading and supervisory loading allowances. You install, operate and maintain specialised exhibition equipment.',
        duties: [
          'Installing and operating audio/visual, electrical or other specialised exhibition equipment',
          'Rigging, lighting and sound setup at exhibitions and events',
          'Performing technical maintenance and fault-finding on exhibition equipment',
          'Ensuring technical standards and safety compliance in your area',
          'Guiding or supervising general hands on technical tasks',
        ],
        indicative_tasks: ['Exhibition technician', 'AV technician (exhibitions)', 'Rigger', 'Show electrician'],
        sort_order: 41,
      },
      {
        level: 5, stream: 'exhibition',
        title: 'Supervisory Exhibition Technician (Grade 5)',
        description: 'You are a senior exhibition technician who supervises other technicians and general hands. Your rate includes both the flexible loading and the full supervisory loading allowances.',
        duties: [
          'All duties of an Exhibition Technician',
          'Supervising exhibition technicians and general hands at events',
          'Planning and coordinating technical aspects of exhibitions and events',
          'Liaising with clients and venue management on technical requirements',
          'Taking responsibility for technical compliance and safety across the event floor',
        ],
        indicative_tasks: ['Supervisory exhibition technician', 'Head technician (exhibitions)', 'Senior rigger', 'Technical supervisor (shows)'],
        sort_order: 51,
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
    // Source: FWO pay guide MA000080, effective 17 October 2025.
    // Casual rate = FT rate × 1.25 (25% casual loading).
    // Exhibition FT/PT rates already include the flexible loading and supervisory loading allowances.
    // Exhibition casual rates = non-exhibition casual at the same grade (loadings are only embedded in FT/PT).
    const baseRates = {
      // level_stream: FT/PT hourly rate
      '0_general':  24.28,  // Introductory
      '1_general':  24.95,  // Grade 1
      '2_general':  25.85,  // Grade 2
      '3_general':  26.70,  // Grade 3
      '4_general':  28.12,  // Grade 4
      '5_general':  29.00,  // Grade 5
      '6_general':  29.88,  // Grade 6
      '7_general':  30.68,  // Grade 7
      '8_general':  32.23,  // Grade 8
      '9_general':  35.70,  // Grade 9
      '10_general': 37.96,  // Grade 10
      // Exhibition employees: FT/PT rates include flexible loading + supervisory loading
      '2_exhibition': 27.71,  // Exhibition General Hand (Grade 2)
      '4_exhibition': 31.02,  // Exhibition Technician (Grade 4)
      '5_exhibition': 32.91,  // Supervisory Exhibition Technician (Grade 5)
    };

    // Casual rates from pay guide (verified: casual = FT_general_equivalent × 1.25)
    // Exhibition casuals use the non-exhibition casual rate (loadings embedded in FT rate only)
    const casualRates = {
      '0_general':    30.35,
      '1_general':    31.19,
      '2_general':    32.31,
      '3_general':    33.38,
      '4_general':    35.15,
      '5_general':    36.25,
      '6_general':    37.35,
      '7_general':    38.35,
      '8_general':    40.29,
      '9_general':    44.63,
      '10_general':   47.45,
      '2_exhibition': 32.31,  // = non-exhibition casual Grade 2
      '4_exhibition': 35.15,  // = non-exhibition casual Grade 4
      '5_exhibition': 36.25,  // = non-exhibition casual Grade 5
    };

    const classResult = await client.query(
      'SELECT id, level, stream FROM classifications WHERE award_code = $1',
      [AWARD_CODE]
    );

    for (const cls of classResult.rows) {
      const key = `${cls.level}_${cls.stream}`;
      const baseRate = baseRates[key];
      const casualRate = casualRates[key];
      if (!baseRate || !casualRate) continue;

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
    // Source: MA000080 — Penalty rates
    //
    // IMPORTANT: Saturday is an ordinary-rate day for this award — no Saturday penalty.
    // The pay guide table does not include a Saturday column for non-exhibition employees.
    //
    // FT/PT multipliers (applied to FT/PT base rate):
    //   Monday–Saturday: ×1.00 (ordinary rate, no penalty)
    //   Sunday:          ×1.50
    //   Public holiday:  ×2.50
    //
    // Casual multipliers (applied to casual base rate = FT × 1.25):
    //   The award uses an additive loading approach for casuals:
    //   Casual weekday: ×1.00 of casual base (= 1.25 × FT)
    //   Casual Sunday:  FT base × 1.75 = casual base × 1.40
    //     Breakdown: 100% (base) + 25% (casual) + 50% (Sunday) = 175% of FT
    //   Casual PH:      FT base × 2.75 = casual base × 2.20
    //     Breakdown: 100% (base) + 25% (casual) + 150% (PH) = 275% of FT

    const penaltyRates = [
      // ── Full-time ──────────────────────────────────────────────────────────
      { employment_type: 'full_time', day_type: 'weekday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.0, addition_per_hour: null,
        description: 'Ordinary weekday rate (Mon–Fri) — no penalty' },
      { employment_type: 'full_time', day_type: 'saturday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.0, addition_per_hour: null,
        description: 'Saturday — ordinary rate (no penalty for this award)' },
      { employment_type: 'full_time', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.50, addition_per_hour: null,
        description: 'Sunday — time and a half (×1.50)' },
      { employment_type: 'full_time', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.50, addition_per_hour: null,
        description: 'Public holiday — double time and a half (×2.50)' },
      // ── Part-time (same as full-time) ──────────────────────────────────────
      { employment_type: 'part_time', day_type: 'weekday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.0, addition_per_hour: null,
        description: 'Ordinary weekday rate (Mon–Fri) — no penalty' },
      { employment_type: 'part_time', day_type: 'saturday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.0, addition_per_hour: null,
        description: 'Saturday — ordinary rate (no penalty for this award)' },
      { employment_type: 'part_time', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.50, addition_per_hour: null,
        description: 'Sunday — time and a half (×1.50)' },
      { employment_type: 'part_time', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.50, addition_per_hour: null,
        description: 'Public holiday — double time and a half (×2.50)' },
      // ── Casual ─────────────────────────────────────────────────────────────
      // Casual base already includes 25% loading. Additive approach:
      //   Sunday:  casual_base × 1.40 = FT_base × 1.75 (100+25+50=175%)
      //   PH:      casual_base × 2.20 = FT_base × 2.75 (100+25+150=275%)
      { employment_type: 'casual', day_type: 'weekday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.0, addition_per_hour: null,
        description: 'Casual weekday — ordinary casual rate (includes 25% loading)' },
      { employment_type: 'casual', day_type: 'saturday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.0, addition_per_hour: null,
        description: 'Casual Saturday — ordinary casual rate (no Saturday penalty for this award)' },
      { employment_type: 'casual', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.40, addition_per_hour: null,
        description: 'Casual Sunday — ×1.40 of casual base (175% of FT base)' },
      { employment_type: 'casual', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.20, addition_per_hour: null,
        description: 'Casual public holiday — ×2.20 of casual base (275% of FT base)' },
    ];

    await client.query('DELETE FROM penalty_rates WHERE award_code = $1', [AWARD_CODE]);
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
    // Source: MA000080 — Overtime
    //
    // Overtime is triggered when an employee works beyond their ordinary hours.
    // Ordinary hours: 38/week, max 7h 36min/day (non-exhibition employees).
    //
    // Overtime rate structure (first 3 hours then double):
    //   First 3 hours: ×1.50
    //   After 3 hours: ×2.00
    //
    // Modelled as weekly thresholds: 38h (first 3h OT at 1.5×) and 41h (remaining at 2.0×).
    // Also modelled as daily thresholds: 7.6h (daily ordinary hours trigger).
    //
    // Note: Exhibition employees have different OT thresholds (>12h/shift or >56h/week)
    // with flat double-time, and fortnightly thresholds for 2-week roster arrangements.
    // These complex exhibition OT rules are not fully modelled here — the calculator
    // applies the standard weekly/daily thresholds which are the most common scenario.

    const overtimeRates = [
      // FT/PT weekly
      { employment_type: 'full_time',  threshold_hours: 38, period: 'weekly', multiplier: 1.50, description: 'Weekly overtime — first 3 hours over 38 (×1.50)' },
      { employment_type: 'full_time',  threshold_hours: 41, period: 'weekly', multiplier: 2.00, description: 'Weekly overtime — after 41 hours (×2.00)' },
      { employment_type: 'part_time',  threshold_hours: 38, period: 'weekly', multiplier: 1.50, description: 'Part-time weekly overtime — first 3 hours over 38 (×1.50)' },
      { employment_type: 'part_time',  threshold_hours: 41, period: 'weekly', multiplier: 2.00, description: 'Part-time weekly overtime — after 41 hours (×2.00)' },
      // FT/PT daily (7.6h = 7h 36min ordinary hours per day)
      { employment_type: 'full_time',  threshold_hours: 7.6, period: 'daily', multiplier: 1.50, description: 'Daily overtime — first 3 hours over 7h 36min (×1.50)' },
      { employment_type: 'full_time',  threshold_hours: 10.6, period: 'daily', multiplier: 2.00, description: 'Daily overtime — after 10h 36min (×2.00)' },
      { employment_type: 'part_time',  threshold_hours: 7.6, period: 'daily', multiplier: 1.50, description: 'Part-time daily overtime — first 3 hours over 7h 36min (×1.50)' },
      { employment_type: 'part_time',  threshold_hours: 10.6, period: 'daily', multiplier: 2.00, description: 'Part-time daily overtime — after 10h 36min (×2.00)' },
    ];

    await client.query('DELETE FROM overtime_rates WHERE award_code = $1', [AWARD_CODE]);
    for (const r of overtimeRates) {
      await client.query(`
        INSERT INTO overtime_rates (award_code, employment_type, threshold_hours, period, multiplier, description, effective_date)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
      `, [AWARD_CODE, r.employment_type, r.threshold_hours, r.period, r.multiplier, r.description, EFFECTIVE_DATE]);
    }
    console.log(`✓ Inserted ${overtimeRates.length} overtime rules`);

    // ── Allowances ────────────────────────────────────────────────────────────
    // Source: MA000080 — Allowances; FWO pay guide effective 17 October 2025.
    const allowances = [
      {
        allowance_type: 'first_aid',
        name: 'First aid allowance',
        description: 'If you hold a current first aid certificate and are appointed by your employer as the first aid officer, you are entitled to a first aid allowance. It is paid per hour worked, up to a weekly maximum.',
        trigger_condition: 'Appointed as first aid officer with a current first aid certificate',
        amount: 0.56, amount_type: 'per_hour', per_unit: 'per_hour',
      },
      {
        allowance_type: 'first_aid_weekly_max',
        name: 'First aid allowance (weekly maximum)',
        description: 'The first aid allowance of $0.56/hr is capped at a maximum of $21.37 per week.',
        trigger_condition: 'Maximum first aid allowance per week',
        amount: 21.37, amount_type: 'weekly', per_unit: 'per_week',
      },
      {
        allowance_type: 'meal',
        name: 'Meal allowance',
        description: 'If your employer requires you to work overtime and a meal break falls within that overtime, you are entitled to a meal allowance per meal.',
        trigger_condition: 'Overtime worked — one meal allowance per meal break that falls during overtime',
        amount: 14.62, amount_type: 'fixed', per_unit: 'per_meal',
      },
      {
        allowance_type: 'vehicle',
        name: 'Vehicle allowance (use of own vehicle)',
        description: 'If your employer requires you to use your own vehicle for work purposes, you are entitled to a per-kilometre allowance.',
        trigger_condition: 'Required to use own vehicle for work at employer\'s direction',
        amount: 0.98, amount_type: 'per_km', per_unit: 'per_km',
      },
      {
        allowance_type: 'uniform_laundering',
        name: 'Uniform laundering allowance',
        description: 'If your employer requires you to launder a uniform at your own expense, you are entitled to a daily laundering allowance (up to a weekly cap).',
        trigger_condition: 'Required to launder own uniform — per day worked',
        amount: 1.32, amount_type: 'fixed', per_unit: 'per_shift',
      },
      {
        allowance_type: 'uniform_laundering_max',
        name: 'Uniform laundering allowance (weekly maximum)',
        description: 'The daily uniform laundering allowance of $1.32/day is capped at $6.62 per week.',
        trigger_condition: 'Weekly cap on uniform laundering allowance',
        amount: 6.62, amount_type: 'weekly', per_unit: 'per_week',
      },
      {
        allowance_type: 'cancelled_shift',
        name: 'Cancelled shift allowance (casual)',
        description: 'If you are a casual employee and your employer cancels your shift without proper notice, you are entitled to payment for 3 hours at the minimum hourly rate for your grade.',
        trigger_condition: 'Casual employee — shift cancelled without proper notice',
        amount: 0, amount_type: 'fixed', per_unit: 'per_shift',
        // Amount is 3 × hourly rate — variable, stored as 0 to flag for calculation
      },
      {
        allowance_type: 'in_charge_golf_bowling_tennis',
        name: 'In charge allowance (golf, bowling, tennis)',
        description: 'If you are in charge of a golf course with more than 18 holes, bowling greens, or lawn tennis courts, you are entitled to a weekly in-charge allowance.',
        trigger_condition: 'In charge of golf links (18+ holes), bowling greens, or lawn tennis courts',
        amount: 56.95, amount_type: 'weekly', per_unit: 'per_week',
      },
      {
        allowance_type: 'tool_carpenter',
        name: 'Tool allowance (carpenter)',
        description: 'If you are a carpenter required to supply and maintain your own tools, you are entitled to a weekly tool allowance.',
        trigger_condition: 'Carpenter required to provide own tools',
        amount: 30.88, amount_type: 'weekly', per_unit: 'per_week',
      },
      {
        allowance_type: 'tool_tradesperson',
        name: 'Tool allowance (other tradesperson)',
        description: 'If you are a tradesperson (not a carpenter) required to supply and maintain your own tools, you are entitled to a weekly tool allowance.',
        trigger_condition: 'Tradesperson (not carpenter) required to provide own tools',
        amount: 15.83, amount_type: 'weekly', per_unit: 'per_week',
      },
      {
        allowance_type: 'tractor_plant',
        name: 'Tractor/plant allowance',
        description: 'If you are required to operate a tractor or plant equipment, you are entitled to an hourly allowance (up to a weekly maximum).',
        trigger_condition: 'Operator of tractor or plant equipment — per hour operated',
        amount: 0.84, amount_type: 'per_hour', per_unit: 'per_hour',
      },
    ];

    await client.query('DELETE FROM allowances WHERE award_code = $1', [AWARD_CODE]);
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
    // MA000080 — Breaks
    // Rest break: 10-minute paid break per 4 hours (or part thereof).
    // Meal break: 30–60 minute unpaid break — must be taken no later than 5 hours after commencing.
    // Short break penalty: if less than 10 hours (or 8 hours by agreement) between consecutive
    //   shifts, all hours worked are paid at double time until the gap is at least 10 hours.
    //   This is a calculator-level concern — stored here as a break entitlement note.

    const breaks = [
      {
        employment_type: null,
        shift_hours_min: 4.0, shift_hours_max: null,
        break_type: 'rest', break_duration_min: 10, is_paid: true,
        timing_rule: 'One paid 10-minute rest break per 4-hour work period',
        description: 'You are entitled to a paid 10-minute rest break during each 4-hour period of work.',
      },
      {
        employment_type: null,
        shift_hours_min: 5.0, shift_hours_max: null,
        break_type: 'meal', break_duration_min: 30, is_paid: false,
        timing_rule: 'No later than 5 hours after commencing work',
        description: 'If you work more than 5 hours, you must be given an unpaid meal break of between 30 and 60 minutes. It must start no later than 5 hours after your shift begins.',
      },
    ];

    await client.query('DELETE FROM break_entitlements WHERE award_code = $1', [AWARD_CODE]);
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
    // Two-stage question flow for MA000080:
    //   Stage 1 — am_experience: New (introductory) or experienced?
    //   Stage 2 — am_worker_type: Type of work (shown when experienced)
    //   Stage 3 — am_exhibition_type: Exhibition role (shown when exhibition selected)

    const questions = [
      {
        award_code: AWARD_CODE,
        question_key: 'am_experience',
        question_text: 'Are you in your first month at this job (new to the amusement, events or recreation industry)?',
        help_text: 'The Introductory level applies only to your first month in the industry. After one month, you must be classified at Grade 1 or above. If you are seasonal or casual, the introductory period is the equivalent of one month of actual work.',
        question_type: 'single',
        stream: null,
        parent_question_key: null,
        parent_answer_key: null,
        sort_order: 1,
        answers: [
          { answer_key: 'new', answer_text: 'Yes — I am in my first month and still in training', sort_order: 1 },
          { answer_key: 'experienced', answer_text: 'No — I have been in this role or industry for more than a month', sort_order: 2 },
        ],
      },
      {
        award_code: AWARD_CODE,
        question_key: 'am_worker_type',
        question_text: 'Which best describes your work?',
        help_text: 'Choose the option that best matches what you actually do day-to-day. If you are an exhibition or trade show worker (setting up stands, operating AV equipment, rigging), choose the exhibition option.',
        question_type: 'single',
        stream: null,
        parent_question_key: 'am_experience',
        parent_answer_key: 'experienced',
        sort_order: 2,
        answers: [
          { answer_key: 'grade1',     answer_text: 'General support — tickets, rides under supervision, cleaning, cash handling, refreshments, car parking', sort_order: 1 },
          { answer_key: 'grade2',     answer_text: 'Operating rides or amusements independently, cashier, selling admissions, explaining attractions', sort_order: 2 },
          { answer_key: 'grade3',     answer_text: 'Specialised equipment operation, handyperson/maintenance, or in charge of lower-grade staff', sort_order: 3 },
          { answer_key: 'grade4',     answer_text: 'Apprentice tradesperson (2nd or 3rd year) or semi-skilled trades work', sort_order: 4 },
          { answer_key: 'grade5',     answer_text: 'Fully qualified tradesperson (electrician, plumber, carpenter, mechanic, etc.)', sort_order: 5 },
          { answer_key: 'grade6',     answer_text: 'Senior tradesperson or leading hand responsible for up to 3 employees', sort_order: 6 },
          { answer_key: 'grade7',     answer_text: 'Leading hand responsible for 4 or more employees', sort_order: 7 },
          { answer_key: 'grade8',     answer_text: 'Supervisor or section manager', sort_order: 8 },
          { answer_key: 'grade9',     answer_text: 'Senior supervisor or operations/department manager', sort_order: 9 },
          { answer_key: 'grade10',    answer_text: 'General manager, venue director, or senior manager', sort_order: 10 },
          { answer_key: 'exhibition', answer_text: 'Exhibition / trade show worker (stand setup, AV, rigging, conventions)', sort_order: 11 },
        ],
      },
      {
        award_code: AWARD_CODE,
        question_key: 'am_exhibition_type',
        question_text: 'Which exhibition role best describes your work?',
        help_text: 'Exhibition employees work at trade shows, exhibitions and conventions. Your rate includes loadings already built in. General hands do physical setup. Technicians install and operate technical equipment. Supervisory technicians manage other technicians.',
        question_type: 'single',
        stream: null,
        parent_question_key: 'am_worker_type',
        parent_answer_key: 'exhibition',
        sort_order: 3,
        answers: [
          { answer_key: 'general_hand',             answer_text: 'Exhibition general hand — setting up and packing down stands, moving equipment, general assistance', sort_order: 1 },
          { answer_key: 'technician',               answer_text: 'Exhibition technician — installing/operating AV, electrical, rigging or other specialist equipment', sort_order: 2 },
          { answer_key: 'supervisory_technician',   answer_text: 'Supervisory exhibition technician — supervising technicians and hands, coordinating technical aspects', sort_order: 3 },
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
    console.log('\n✅ MA000080 seed complete');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Seed failed:', err);
    throw err;
  } finally {
    client.release();
    await pool.end();
  }
}

seed();
