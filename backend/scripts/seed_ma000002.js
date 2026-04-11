/**
 * Seed script — Clerks—Private Sector Award 2020 [MA000002]
 * Pay rates effective 1 July 2025
 * Source: Fair Work Ombudsman pay guide MA000002 (G00022868)
 *
 * Adult FT/PT rates:
 *   L1Y1: $25.74   L1Y2: $26.96   L1Y3: $27.79
 *   L2Y1: $28.12   L2Y2: $28.64   L3: $29.70
 *   L4: $31.19     L5: $32.45
 *   Call Centre Principal: $29.91
 *   Call Centre Technical: $35.55
 *
 * Casual rates (FT rate × 1.25):
 *   L1Y1: $32.18   L1Y2: $33.70   L1Y3: $34.74
 *   L2Y1: $35.15   L2Y2: $35.80   L3: $37.13
 *   L4: $38.99     L5: $40.56
 *   Call Centre Principal: $37.39
 *   Call Centre Technical: $44.44
 *
 * Penalty rates (FT/PT):
 *   Saturday 7am–12:30pm: ×1.25 (time and a quarter)
 *   Saturday 12:30pm+:    ×1.50 (time and a half) — max logic handles split
 *   Sunday:               ×2.00 (double time)
 *   Public holiday:       ×2.50 (double time and a half)
 *
 * Penalty rates (casual, applied to casual base rate):
 *   Saturday morning:     ×1.20 of casual base
 *   Saturday afternoon:   ×1.50 of casual base (max logic handles split)
 *   Sunday:               ×1.80 of casual base
 *   Public holiday:       ×2.20 of casual base
 *
 * Overtime (daily, threshold 7.6 hrs/day):
 *   FT/PT: first 2 OT hrs ×1.50, after 2 OT hrs ×2.00
 *   Casual: first 2 OT hrs ×1.40, after 2 OT hrs ×1.80
 *
 * Junior rates: <16=45%, 16=50%, 17=60%, 18=70%, 19=80%, 20=90%, 21+=100%
 *
 * Allowances: meal ($19.93 first, $15.96 subsequent), first aid ($16.03/week),
 *   laundry FT ($3.55/week), laundry PT/casual ($0.71/shift),
 *   vehicle car ($0.98/km), vehicle motorcycle ($0.33/km),
 *   protective footwear (reimbursement)
 *
 * Run after migrate.js: node scripts/seed_ma000002.js
 */
require('dotenv').config();
const pool = require('../src/db/pool');

const AWARD_CODE = 'MA000002';
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
      'Clerks—Private Sector Award 2020',
      EFFECTIVE_DATE,
      'https://awards.fairwork.gov.au/MA000002.html',
    ]);

    // ── Classifications ────────────────────────────────────────────────────────
    // Clerical stream: 8 levels, mapping to Award Levels 1–5 (with Year 1/2/3 sub-levels).
    // Call centre stream: 2 levels — Principal Specialist and Technical Specialist.
    const classifications = [
      // ── Clerical / Administrative stream ────────────────────────────────────
      {
        level: 1, stream: 'clerical',
        title: 'Clerical/Administrative Employee Level 1, Year 1',
        description: 'Entry-level clerical employee in the first year of clerical work. You perform routine tasks under direct supervision, with work checked by more senior staff. No prior clerical experience is required.',
        duties: [
          'Performing data entry, filing, copying, and basic reception tasks under supervision',
          'Answering and directing incoming telephone calls',
          'Preparing standard correspondence and documents from templates',
          'Sorting and distributing incoming mail and correspondence',
          'Operating standard office equipment such as computers, printers, and scanners',
          'Following specific instructions for all tasks with work checked regularly',
        ],
        indicative_tasks: ['Entry-level data entry operator', 'Junior receptionist', 'Office junior', 'Administrative assistant (first year)'],
        sort_order: 10,
      },
      {
        level: 2, stream: 'clerical',
        title: 'Clerical/Administrative Employee Level 1, Year 2',
        description: 'Clerical employee who has completed their first year. You perform the same range of Level 1 tasks with increased efficiency and confidence, working under general supervision.',
        duties: [
          'Processing routine clerical tasks with growing independence',
          'Handling incoming and outgoing correspondence with limited supervision',
          'Maintaining filing systems and basic record-keeping',
          'Assisting with general office administration and reception duties',
          'Drafting routine correspondence and simple documents',
          'Supporting more senior staff with ad-hoc tasks',
        ],
        indicative_tasks: ['Receptionist (2nd year)', 'Data entry operator (experienced)', 'Administrative assistant (2nd year)', 'Office clerk'],
        sort_order: 20,
      },
      {
        level: 3, stream: 'clerical',
        title: 'Clerical/Administrative Employee Level 1, Year 3',
        description: 'Clerical employee completing at least three years at Level 1, or performing duties in excess of Level 1 Year 2. You work with a broad range of clerical skills under general supervision and may take on higher responsibilities.',
        duties: [
          'Handling a wide range of routine and semi-complex clerical tasks with minimal supervision',
          'Preparing correspondence, reports, and other documents with limited checking',
          'Assisting with training or guidance for new Level 1 employees',
          'Processing payments, invoices, or accounts payable/receivable entries',
          'Coordinating travel, appointments, and diary management for managers',
          'Operating specialised office applications and maintaining databases',
        ],
        indicative_tasks: ['Administrative officer (3rd year)', 'Office administrator', 'Accounts clerk (junior)', 'Administrative coordinator (junior)'],
        sort_order: 30,
      },
      {
        level: 4, stream: 'clerical',
        title: 'Clerical/Administrative Employee Level 2, Year 1',
        description: 'Experienced clerical employee working at Level 2 in the first year. You work with a wider range of more complex clerical duties, exercising judgment within clearly defined limits, under general supervision.',
        duties: [
          'Carrying out a broad range of clerical duties with a higher degree of independence',
          'Processing complex or multi-step administrative tasks with limited supervision',
          'Maintaining detailed records, ledgers, or spreadsheets',
          'Preparing and editing complex correspondence, reports, and submissions',
          'Providing administrative support to senior managers or small teams',
          'Applying knowledge of relevant laws, regulations, or policies to tasks',
        ],
        indicative_tasks: ['Administrative officer (Level 2)', 'Office manager (junior)', 'Accounts payable officer (Level 2)', 'Executive assistant (Level 2)'],
        sort_order: 40,
      },
      {
        level: 5, stream: 'clerical',
        title: 'Clerical/Administrative Employee Level 2, Year 2',
        description: 'Experienced clerical employee who has completed at least one year at Level 2. You perform the same range of Level 2 duties with greater proficiency and may take on additional responsibilities.',
        duties: [
          'Performing all Level 2 clerical duties with a high degree of proficiency',
          'Independently managing complex administrative projects or workflows',
          'Coaching or training less experienced clerical employees',
          'Identifying improvements to administrative processes and recommending changes',
          'Preparing specialised or sensitive documents with limited checking',
          'Acting as the first point of contact for complex queries or escalations',
        ],
        indicative_tasks: ['Senior administrative officer', 'Accounts officer', 'Office manager (experienced)', 'PA/Executive assistant (experienced)'],
        sort_order: 50,
      },
      {
        level: 6, stream: 'clerical',
        title: 'Clerical/Administrative Employee Level 3',
        description: 'Senior clerical employee responsible for complex or specialised clerical work. You exercise considerable independent judgment and may supervise or lead other clerical employees in a work group.',
        duties: [
          'Independently managing complex administrative projects, reports, and correspondence',
          'Providing specialist advice or guidance in a particular administrative area',
          'Coordinating the work of lower-level clerical employees or a small team',
          'Analysing financial, operational, or regulatory data and preparing summaries',
          'Dealing with complex enquiries from clients, customers, or the public',
          'Developing or improving administrative systems and procedures',
        ],
        indicative_tasks: ['Senior administrative officer (Level 3)', 'Office supervisor', 'Payroll officer', 'Accounts supervisor', 'Senior executive assistant'],
        sort_order: 60,
      },
      {
        level: 7, stream: 'clerical',
        title: 'Clerical/Administrative Employee Level 4',
        description: 'Highly experienced clerical employee who performs advanced specialised work or leads a team. You exercise a high degree of independence and are responsible for the work outcomes of others.',
        duties: [
          'Leading or managing a clerical section or team with responsibility for outcomes',
          'Providing expert advice and guidance in a complex specialist area',
          'Overseeing complex administrative workflows, processes, or projects',
          'Preparing or reviewing management-level reports, budgets, or correspondence',
          'Mentoring and developing less senior clerical staff',
          'Representing the employer at meetings or liaising with external bodies',
        ],
        indicative_tasks: ['Office manager (Level 4)', 'Senior payroll officer', 'Senior accounts manager', 'Administrative manager', 'Clerical team leader'],
        sort_order: 70,
      },
      {
        level: 8, stream: 'clerical',
        title: 'Clerical/Administrative Employee Level 5',
        description: 'The most senior clerical classification. You have responsibility for the overall management of an administrative section or office, with extensive specialist knowledge and a high degree of autonomy.',
        duties: [
          'Managing the full operations of an administrative section, department, or office',
          'Setting objectives, priorities, and resource allocation for the clerical team',
          'Developing and implementing high-level administrative policies and procedures',
          'Exercising broad discretion and professional judgment across complex tasks',
          'Reporting directly to senior or executive management on administrative matters',
          'Overseeing performance management and development of clerical staff',
        ],
        indicative_tasks: ['Senior administrative manager', 'Office manager (most senior)', 'Executive officer', 'Head of administration'],
        sort_order: 80,
      },
      // ── Call Centre stream ───────────────────────────────────────────────────
      {
        level: 1, stream: 'call_centre',
        title: 'Call Centre Principal Specialist',
        description: 'A principal specialist within a call centre, with substantial experience and a high level of independent judgment. You handle complex, escalated, or specialist cases and may coach less experienced operators.',
        duties: [
          'Managing escalated or complex customer enquiries that require specialist knowledge',
          'Providing expert guidance and coaching to other call centre staff',
          'Analysing call centre performance data and contributing to improvement initiatives',
          'Liaising with other departments or external bodies on complex customer matters',
          'Applying advanced product, regulatory, or procedural knowledge to resolve issues',
          'Taking responsibility for achieving quality outcomes with a high degree of autonomy',
        ],
        indicative_tasks: ['Call centre principal specialist', 'Senior customer service specialist', 'Escalations specialist', 'Contact centre senior operator'],
        sort_order: 90,
      },
      {
        level: 2, stream: 'call_centre',
        title: 'Call Centre Technical Specialist',
        description: 'The most senior call centre classification. You provide the highest level of technical expertise, handling the most complex technical cases, and may lead a specialist team or project.',
        duties: [
          'Resolving the most complex and technical customer enquiries, issues, or faults',
          'Acting as the technical subject matter expert for the call centre operation',
          'Designing, testing, or implementing call centre systems, scripts, or workflows',
          'Leading or participating in quality assurance, training, and process improvement',
          'Preparing technical reports and documentation for management',
          'Mentoring specialists and contributing to product or system enhancements',
        ],
        indicative_tasks: ['Call centre technical specialist', 'Senior technical support specialist', 'Contact centre technical lead', 'Technical customer service lead'],
        sort_order: 100,
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

    // ── Pay rates ──────────────────────────────────────────────────────────────
    // Source: FWO pay guide MA000002 (G00022868), effective 1 July 2025.
    // Casual rate = FT rate × 1.25.
    // Clerical stream base rates (FT):
    //   L1Y1=$25.74, L1Y2=$26.96, L1Y3=$27.79, L2Y1=$28.12, L2Y2=$28.64
    //   L3=$29.70, L4=$31.19, L5=$32.45
    // Call centre stream (FT):
    //   Principal=$29.91, Technical=$35.55

    // Rates keyed by stream+level
    const baseRates = {
      clerical: { 1: 25.74, 2: 26.96, 3: 27.79, 4: 28.12, 5: 28.64, 6: 29.70, 7: 31.19, 8: 32.45 },
      call_centre: { 1: 29.91, 2: 35.55 },
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
    // Source: FWO pay guide MA000002 (G00022868), effective 1 July 2025.
    //
    // Saturday has a time-based split at 12:30pm:
    //   7am–12:30pm: ×1.25 (FT) / ×1.20 (casual)
    //   12:30pm+:    ×1.50 (FT) / ×1.50 (casual) — calculator uses max() so the
    //                afternoon rule overrides the morning rule after 12:30pm.
    //
    // The DB stores two Saturday rules per employment type:
    //   1) No time band: base multiplier (applies all day initially)
    //   2) time_band_start='12:30', time_band_end='00:00': higher multiplier
    //      The max() logic in calculateShiftSegments takes the higher rate after 12:30.
    //
    // FT derivation from pay guide (L1Y1 $25.74 base):
    //   Sat morning: $32.18 / $25.74 = ×1.25 ✓
    //   Sat afternoon: $38.61 / $25.74 = ×1.50 ✓
    //   Sunday: $51.48 / $25.74 = ×2.00 ✓
    //   PH: $64.35 / $25.74 = ×2.50 ✓
    //
    // Casual derivation (L1Y1 casual $32.18 base):
    //   Sat morning: $38.62 / $32.18 = ×1.20 ✓
    //   Sat afternoon: $48.27 / $32.18 = ×1.50 ✓ (=$25.74×1.50×1.25)
    //   Sunday: $57.92 / $32.18 = ×1.80 ✓
    //   PH: $70.80 / $32.18 = ×2.20 ✓

    const penaltyRates = [
      // ── Full-time / Part-time ────────────────────────────────────────────────
      { employment_type: 'full_time',  day_type: 'weekday',        time_band_start: null,   time_band_end: null,   multiplier: 1.00, description: 'Weekday ordinary rate (×1.0)' },
      { employment_type: 'full_time',  day_type: 'saturday',       time_band_start: null,   time_band_end: null,   multiplier: 1.25, description: 'Saturday — time and a quarter (×1.25, 7am–12:30pm base rule)' },
      { employment_type: 'full_time',  day_type: 'saturday',       time_band_start: '12:30', time_band_end: '00:00', multiplier: 1.50, description: 'Saturday afternoon — time and a half (×1.50, after 12:30pm)' },
      { employment_type: 'full_time',  day_type: 'sunday',         time_band_start: null,   time_band_end: null,   multiplier: 2.00, description: 'Sunday — double time (×2.0)' },
      { employment_type: 'full_time',  day_type: 'public_holiday', time_band_start: null,   time_band_end: null,   multiplier: 2.50, description: 'Public holiday — double time and a half (×2.5)' },
      // Part-time: same as full-time
      { employment_type: 'part_time',  day_type: 'weekday',        time_band_start: null,   time_band_end: null,   multiplier: 1.00, description: 'Weekday ordinary rate (×1.0)' },
      { employment_type: 'part_time',  day_type: 'saturday',       time_band_start: null,   time_band_end: null,   multiplier: 1.25, description: 'Saturday — time and a quarter (×1.25, morning base rule)' },
      { employment_type: 'part_time',  day_type: 'saturday',       time_band_start: '12:30', time_band_end: '00:00', multiplier: 1.50, description: 'Saturday afternoon — time and a half (×1.50, after 12:30pm)' },
      { employment_type: 'part_time',  day_type: 'sunday',         time_band_start: null,   time_band_end: null,   multiplier: 2.00, description: 'Sunday — double time (×2.0)' },
      { employment_type: 'part_time',  day_type: 'public_holiday', time_band_start: null,   time_band_end: null,   multiplier: 2.50, description: 'Public holiday — double time and a half (×2.5)' },
      // ── Casual ───────────────────────────────────────────────────────────────
      { employment_type: 'casual',     day_type: 'weekday',        time_band_start: null,   time_band_end: null,   multiplier: 1.00, description: 'Weekday ordinary casual rate (incl. 25% casual loading)' },
      { employment_type: 'casual',     day_type: 'saturday',       time_band_start: null,   time_band_end: null,   multiplier: 1.20, description: 'Casual Saturday morning — ×1.20 of casual base (= ×1.50 of FT rate)' },
      { employment_type: 'casual',     day_type: 'saturday',       time_band_start: '12:30', time_band_end: '00:00', multiplier: 1.50, description: 'Casual Saturday afternoon — ×1.50 of casual base (after 12:30pm)' },
      { employment_type: 'casual',     day_type: 'sunday',         time_band_start: null,   time_band_end: null,   multiplier: 1.80, description: 'Casual Sunday — ×1.80 of casual base' },
      { employment_type: 'casual',     day_type: 'public_holiday', time_band_start: null,   time_band_end: null,   multiplier: 2.20, description: 'Casual public holiday — ×2.20 of casual base' },
    ];

    await client.query(`DELETE FROM penalty_rates WHERE award_code = $1`, [AWARD_CODE]);

    for (const r of penaltyRates) {
      await client.query(`
        INSERT INTO penalty_rates
          (award_code, employment_type, day_type, time_band_start, time_band_end, time_band_label, multiplier, addition_per_hour, description, effective_date)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      `, [
        AWARD_CODE, r.employment_type, r.day_type,
        r.time_band_start, r.time_band_end, null,
        r.multiplier, null, r.description, EFFECTIVE_DATE,
      ]);
    }
    console.log(`✓ Inserted ${penaltyRates.length} penalty rate rules`);

    // ── Overtime rates ─────────────────────────────────────────────────────────
    // Source: MA000002 pay guide — "Overtime" section.
    // Clerks Award uses a DAILY overtime model: threshold at 7.6 hours/day (7h 36min).
    // FT/PT: first 2 OT hours ×1.50, after 2 OT hours ×2.00.
    // Casual: first 2 OT hours ×1.40 (of casual base), after 2 OT hours ×1.80.
    //
    // Stored as daily period with two threshold records per employment type:
    //   threshold_hours=7.6 → ×1.50 (FT) or ×1.40 (casual) — first-band rate
    //   threshold_hours=9.6 → ×2.00 (FT) or ×1.80 (casual) — second-band rate
    //   (9.6 = 7.6 + 2.0; after 2 OT hours, second band kicks in)

    const overtimeRates = [
      { employment_type: 'full_time',  threshold_hours: 7.6, period: 'daily', multiplier: 1.50, description: 'Daily OT — first 2 hours over 7.6 hrs/day (×1.50)' },
      { employment_type: 'full_time',  threshold_hours: 9.6, period: 'daily', multiplier: 2.00, description: 'Daily OT — after 9.6 hrs/day (×2.00)' },
      { employment_type: 'part_time',  threshold_hours: 7.6, period: 'daily', multiplier: 1.50, description: 'Part-time daily OT — first 2 hours over 7.6 hrs/day (×1.50)' },
      { employment_type: 'part_time',  threshold_hours: 9.6, period: 'daily', multiplier: 2.00, description: 'Part-time daily OT — after 9.6 hrs/day (×2.00)' },
      { employment_type: 'casual',     threshold_hours: 7.6, period: 'daily', multiplier: 1.40, description: 'Casual daily OT — first 2 hours over 7.6 hrs/day (×1.40 of casual base)' },
      { employment_type: 'casual',     threshold_hours: 9.6, period: 'daily', multiplier: 1.80, description: 'Casual daily OT — after 9.6 hrs/day (×1.80 of casual base)' },
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
    // Source: MA000002 pay guide (G00022868), effective 1 July 2025, page 44.
    // None of the Clerks Award allowances are "all-purpose" — they do not affect
    // the base rate before casual loading/penalties. The meal allowance is calculated
    // by the overtime engine using the two-tier MA000004-style logic.
    const allowances = [
      // Overtime meal allowances (two-tier)
      {
        allowance_type: 'meal',
        name: 'Meal allowance (overtime)',
        description: 'If you are required to work overtime, you are entitled to a meal allowance of $19.93 when overtime commences. A further $15.96 applies for each additional 4 hours of overtime worked.',
        trigger_condition: 'Overtime worked — first meal on commencement of overtime',
        amount: 19.93, amount_type: 'fixed', per_unit: 'per_meal',
        is_all_purpose: false,
      },
      {
        allowance_type: 'meal_second',
        name: 'Meal allowance (subsequent overtime meals)',
        description: 'If you continue working overtime, a further meal allowance of $15.96 applies for each additional 4 hours of overtime.',
        trigger_condition: 'Continued overtime — each additional 4-hour period of overtime after the first meal',
        amount: 15.96, amount_type: 'fixed', per_unit: 'per_meal',
        is_all_purpose: false,
      },
      // First aid allowance
      {
        allowance_type: 'first_aid',
        name: 'First aid allowance',
        description: 'If your employer has appointed you as the person responsible for first aid and you hold a current first aid certificate, you are entitled to $16.03 per week.',
        trigger_condition: 'Appointed by employer as first aider, holding a current first aid certificate',
        amount: 16.03, amount_type: 'fixed', per_unit: 'per_week',
        is_all_purpose: false,
      },
      // Laundry allowances
      {
        allowance_type: 'laundry_ft',
        name: 'Uniform laundering allowance (full-time)',
        description: 'If your employer requires you to wear a uniform and you launder it yourself, you are entitled to $3.55 per week (full-time employees).',
        trigger_condition: 'Full-time employee required to wear and self-launder a uniform',
        amount: 3.55, amount_type: 'fixed', per_unit: 'per_week',
        is_all_purpose: false,
      },
      {
        allowance_type: 'laundry_ptcasual',
        name: 'Uniform laundering allowance (part-time/casual)',
        description: 'If your employer requires you to wear a uniform and you launder it yourself, you are entitled to $0.71 per shift worked (part-time and casual employees).',
        trigger_condition: 'Part-time or casual employee required to wear and self-launder a uniform',
        amount: 0.71, amount_type: 'fixed', per_unit: 'per_shift',
        is_all_purpose: false,
      },
      // Vehicle allowances
      {
        allowance_type: 'vehicle_car',
        name: 'Vehicle allowance (car)',
        description: 'If your employer requires you to use your own car for work purposes, you are entitled to $0.98 per kilometre travelled.',
        trigger_condition: 'Employee required by employer to use own car for work travel',
        amount: 0.98, amount_type: 'per_km', per_unit: 'per_km',
        is_all_purpose: false,
      },
      {
        allowance_type: 'vehicle_motorcycle',
        name: 'Vehicle allowance (motorcycle)',
        description: 'If your employer requires you to use your own motorcycle for work purposes, you are entitled to $0.33 per kilometre travelled.',
        trigger_condition: 'Employee required by employer to use own motorcycle for work travel',
        amount: 0.33, amount_type: 'per_km', per_unit: 'per_km',
        is_all_purpose: false,
      },
      // Protective footwear
      {
        allowance_type: 'protective_footwear',
        name: 'Protective footwear reimbursement',
        description: 'If your employer requires you to wear protective footwear and does not supply it, you are entitled to reimbursement of the reasonable cost of the footwear.',
        trigger_condition: 'Employer requires protective footwear but does not supply it',
        amount: null, amount_type: 'reimbursement', per_unit: null,
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
        shift_hours_min: 4.0, shift_hours_max: null,
        break_type: 'rest', break_duration_min: 10, is_paid: true,
        timing_rule: 'One paid 10-minute rest break per 4 hours of work',
        description: 'You are entitled to a paid 10-minute rest break for each 4-hour period worked.',
      },
      {
        employment_type: null,
        shift_hours_min: 5.0, shift_hours_max: null,
        break_type: 'meal', break_duration_min: 30, is_paid: false,
        timing_rule: 'No later than 5 hours after commencing work',
        description: 'If you work more than 5 hours, you are entitled to an unpaid meal break of at least 30 minutes. If not given this break, you must be paid at overtime rates until the break is provided.',
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
    //   Q1: clerks_type — regular clerical/administrative OR call centre
    //   Q2: clerks_level — level for regular stream (conditional on Q1=regular)
    //   Q3: clerks_cc_role — call centre specialisation (conditional on Q1=call_centre)
    //
    // Level mapping:
    //   regular + l1y1 → {level:1, stream:'clerical'}
    //   regular + l1y2 → {level:2, stream:'clerical'}
    //   regular + l1y3 → {level:3, stream:'clerical'}
    //   regular + l2y1 → {level:4, stream:'clerical'}
    //   regular + l2y2 → {level:5, stream:'clerical'}
    //   regular + l3   → {level:6, stream:'clerical'}
    //   regular + l4   → {level:7, stream:'clerical'}
    //   regular + l5   → {level:8, stream:'clerical'}
    //   call_centre + principal → {level:1, stream:'call_centre'}
    //   call_centre + technical → {level:2, stream:'call_centre'}
    const questions = [
      {
        question_key: 'clerks_type',
        question_text: 'What type of clerical role do you work in?',
        help_text: 'Regular clerical/administrative workers cover the vast majority of office roles. Call centre specialists are employees whose primary function is handling inbound or outbound calls in a specialised call centre environment.',
        question_type: 'single',
        stream: null,
        parent_question_key: null,
        parent_answer_key: null,
        sort_order: 1,
        answers: [
          { answer_key: 'regular',     answer_text: 'Regular clerical/administrative role — office, admin, reception, accounts, data entry, PA, etc.', sort_order: 1 },
          { answer_key: 'call_centre', answer_text: 'Call centre specialist — my primary role is handling calls in a specialised call centre', sort_order: 2 },
        ],
      },
      {
        question_key: 'clerks_level',
        question_text: 'Which best describes your clerical level and experience?',
        help_text: 'Levels are based on experience and complexity of duties. Year 1 = first year at that level. Your payslip or contract may say something like "Level 2" or "Clerical Employee Grade 1".',
        question_type: 'single',
        stream: null,
        parent_question_key: 'clerks_type',
        parent_answer_key: 'regular',
        sort_order: 2,
        answers: [
          { answer_key: 'l1y1', answer_text: 'Level 1 Year 1 — new to clerical work, performing routine tasks under supervision (first year)',       sort_order: 1 },
          { answer_key: 'l1y2', answer_text: 'Level 1 Year 2 — same tasks as Year 1 with greater confidence and speed (second year)',                sort_order: 2 },
          { answer_key: 'l1y3', answer_text: 'Level 1 Year 3 — broadening duties, 3+ years at Level 1 or higher duties (third year or more)',       sort_order: 3 },
          { answer_key: 'l2y1', answer_text: 'Level 2 Year 1 — broader, more complex duties with greater independence (first year at Level 2)',      sort_order: 4 },
          { answer_key: 'l2y2', answer_text: 'Level 2 Year 2 — same as Level 2 Year 1 but with higher proficiency (second year at Level 2)',         sort_order: 5 },
          { answer_key: 'l3',   answer_text: 'Level 3 — senior clerical duties, substantial experience, may supervise others',                       sort_order: 6 },
          { answer_key: 'l4',   answer_text: 'Level 4 — advanced specialist or team leader, high degree of independence',                            sort_order: 7 },
          { answer_key: 'l5',   answer_text: 'Level 5 — most senior clerical level, manages a section or office, reports to senior management',      sort_order: 8 },
        ],
      },
      {
        question_key: 'clerks_cc_role',
        question_text: 'Which call centre specialist role best describes you?',
        help_text: 'Principal Specialists handle escalated or complex cases and coach others. Technical Specialists are the most senior technical experts, with the highest level of call centre technical knowledge.',
        question_type: 'single',
        stream: null,
        parent_question_key: 'clerks_type',
        parent_answer_key: 'call_centre',
        sort_order: 3,
        answers: [
          { answer_key: 'principal',  answer_text: 'Principal Specialist — handles escalated/complex cases, coaches other operators, significant experience', sort_order: 1 },
          { answer_key: 'technical',  answer_text: 'Technical Specialist — highest technical expertise in the call centre, leads technical matters',          sort_order: 2 },
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
        AWARD_CODE, q.question_key, q.question_text, q.help_text,
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
    console.log('\n✅ MA000002 seed complete');
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
