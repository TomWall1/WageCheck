/**
 * Seed script — Children's Services Award 2010 [MA000120]
 * Pay rates effective 1 March 2026
 * Source: Fair Work Ombudsman pay guide, effective 1 March 2026
 *
 * Award covers: employees in children's services, including long day care,
 * family day care, outside school hours care (OSHC), and other child care services.
 *
 * Two classification streams:
 *
 *   Support Worker stream (4 levels):
 *     SW 1.1 = $24.95/hr
 *     SW 2.1 = $25.71/hr
 *     SW 2.2 = $26.56/hr (after 1 year at SW 2.1)
 *     SW 3.1 = $28.12/hr
 *
 *   Children's Services Employee stream (8 levels):
 *     L1 = Introductory educator      — $26.19/hr
 *     L2 = Educator                   — $27.00/hr
 *     L3 = Qualified educator         — $29.52/hr
 *     L4 = Experienced educator       — $31.50/hr
 *     L5 = Advanced educator          — $33.24/hr
 *     L6 = Room leader                — $34.78/hr
 *     L7 = Assistant director         — $36.37/hr
 *     L8 = Director                   — $41.93/hr
 *
 * Junior rates: L1 and L2 educator stream only.
 *   Under 17: 70%, 17yr: 80%, 18yr: 90%, 19+: adult.
 *   Both L1 and L2 juniors earn the same flat dollar amounts ($18.90, $21.60, $24.30).
 *   Percentages are based on L2 rate ($27.00). For L1, multipliers will be slightly off.
 *
 * Run after migrate.js: node scripts/seed_ma000120.js
 */
require('dotenv').config();
const pool = require('../src/db/pool');

const AWARD_CODE = 'MA000120';
const EFFECTIVE_DATE = '2026-03-01';

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
      "Children's Services Award 2010",
      EFFECTIVE_DATE,
      'https://www.fairwork.gov.au/employment-conditions/awards/awards-summary/ma000120-summary',
    ]);

    // ── Classifications ───────────────────────────────────────────────────────
    // Two streams: 'support_worker' (4 levels) and 'educator' (8 levels).

    const classifications = [
      // ── Support Worker stream ───────────────────────────────────────────────
      {
        level: 1, stream: 'support_worker',
        title: 'Support Worker Level 1.1',
        description: 'Entry-level support worker in a children\'s service. You perform basic support tasks such as cleaning, cooking, gardening, and laundry under direction.',
        duties: [
          'General cleaning of the service premises and equipment',
          'Basic food preparation and kitchen duties',
          'Laundry and linen management',
          'Gardening and grounds maintenance',
          'Assisting with setting up activity areas',
          'Following workplace health and safety procedures',
        ],
        indicative_tasks: ['Cleaner', 'Kitchen hand', 'Laundry worker', 'Maintenance assistant'],
        sort_order: 10,
      },
      {
        level: 2, stream: 'support_worker',
        title: 'Support Worker Level 2.1',
        description: 'Experienced support worker performing a broader range of duties with less supervision. You may cook meals, maintain equipment, or perform administrative support tasks.',
        duties: [
          'Cooking meals and managing kitchen operations',
          'Maintaining and repairing equipment and facilities',
          'Providing administrative support (filing, data entry, answering phones)',
          'Ordering and managing supplies',
          'Supervising Level 1 support workers',
          'Following and implementing safety and hygiene procedures',
        ],
        indicative_tasks: ['Cook', 'Maintenance worker', 'Administrative assistant', 'Supplies coordinator'],
        sort_order: 20,
      },
      {
        level: 3, stream: 'support_worker',
        title: 'Support Worker Level 2.2',
        description: 'Support worker who has completed at least 1 year at Level 2.1. You perform the same duties as Level 2.1 with additional experience and competency.',
        duties: [
          'All duties of Support Worker Level 2.1',
          'Working with greater autonomy and less supervision',
          'Taking on additional responsibilities within the support role',
          'Mentoring and training new support workers',
        ],
        indicative_tasks: ['Senior cook', 'Experienced maintenance worker', 'Senior admin support'],
        sort_order: 30,
      },
      {
        level: 4, stream: 'support_worker',
        title: 'Support Worker Level 3.1',
        description: 'Highest-level support worker with trade qualifications or significant expertise. You perform specialised support work and may coordinate support staff.',
        duties: [
          'Performing trade-level maintenance and repair work',
          'Coordinating and supervising a team of support workers',
          'Managing complex kitchen operations or facility maintenance',
          'Ensuring compliance with health, safety, and quality standards',
          'Liaising with management on operational matters',
        ],
        indicative_tasks: ['Trade-qualified maintenance worker', 'Head cook/chef', 'Support team coordinator'],
        sort_order: 40,
      },
      // ── Children's Services Employee (educator) stream ──────────────────────
      {
        level: 1, stream: 'educator',
        title: 'Level 1 — Introductory Educator',
        description: 'New educator entering children\'s services with no relevant qualifications. You work under close supervision and are expected to commence study towards a qualification.',
        duties: [
          'Assisting qualified educators with activities and routines',
          'Supervising children under direction of qualified staff',
          'Preparing and maintaining activity areas and materials',
          'Assisting with meal times, rest times, and transitions',
          'Following the service\'s policies and procedures',
          'Commencing study towards a relevant qualification',
        ],
        indicative_tasks: ['Trainee educator', 'Assistant (unqualified)', 'New entrant to children\'s services'],
        sort_order: 110,
      },
      {
        level: 2, stream: 'educator',
        title: 'Level 2 — Educator',
        description: 'Educator holding or working towards a Certificate III in Early Childhood Education and Care (or equivalent). You contribute to the educational program and work as part of a team.',
        duties: [
          'Implementing the educational program under guidance',
          'Supervising and engaging children in activities',
          'Supporting children\'s learning and development',
          'Maintaining records and observations of children',
          'Communicating with families about their child\'s day',
          'Contributing to a safe and inclusive environment',
        ],
        indicative_tasks: ['Certificate III educator', 'Child care worker', 'OSHC worker'],
        sort_order: 120,
      },
      {
        level: 3, stream: 'educator',
        title: 'Level 3 — Qualified Educator',
        description: 'Educator holding a Diploma of Early Childhood Education and Care (or equivalent). You plan and implement educational programs and may supervise other educators.',
        duties: [
          'Planning and delivering educational programs',
          'Assessing and documenting children\'s learning and development',
          'Supervising and mentoring Certificate III educators',
          'Ensuring compliance with the National Quality Framework',
          'Building positive relationships with children and families',
          'Contributing to continuous improvement of the service',
        ],
        indicative_tasks: ['Diploma-qualified educator', 'Program leader', 'Educational leader (small service)'],
        sort_order: 130,
      },
      {
        level: 4, stream: 'educator',
        title: 'Level 4 — Experienced Educator',
        description: 'Experienced educator with a Diploma (or higher) who has substantial experience and takes on additional responsibilities beyond Level 3.',
        duties: [
          'Leading educational programs across the service',
          'Mentoring and developing other educators',
          'Contributing to quality improvement plans',
          'Liaising with external agencies and support services',
          'Supporting inclusion of children with additional needs',
          'Participating in service management and planning',
        ],
        indicative_tasks: ['Senior educator', 'Educational leader', 'Inclusion support educator'],
        sort_order: 140,
      },
      {
        level: 5, stream: 'educator',
        title: 'Level 5 — Advanced Educator',
        description: 'Advanced educator with a degree (or equivalent) and significant experience. You provide specialist expertise and leadership in educational practice.',
        duties: [
          'Providing specialist educational leadership',
          'Developing and evaluating curriculum and pedagogy',
          'Leading professional development for staff',
          'Coordinating service-wide programs and initiatives',
          'Managing relationships with families and community partners',
          'Contributing to regulatory compliance and assessment',
        ],
        indicative_tasks: ['Degree-qualified educator', 'Early childhood teacher', 'Specialist educator'],
        sort_order: 150,
      },
      {
        level: 6, stream: 'educator',
        title: 'Level 6 — Room Leader',
        description: 'Educator responsible for leading a room or group of children within a service. You oversee the educational program and staff in your room.',
        duties: [
          'Managing the educational program for a specific room or group',
          'Supervising and rostering room staff',
          'Ensuring regulatory ratios and compliance in the room',
          'Communicating with families about their child\'s progress',
          'Maintaining documentation and records for the room',
          'Coordinating with other room leaders and management',
        ],
        indicative_tasks: ['Room leader', 'Group leader', 'Team leader'],
        sort_order: 160,
      },
      {
        level: 7, stream: 'educator',
        title: 'Level 7 — Assistant Director',
        description: 'Second-in-charge of a children\'s service. You assist the Director with management, administration, and regulatory compliance.',
        duties: [
          'Assisting with service management and administration',
          'Acting as Director in the Director\'s absence',
          'Managing staff rosters, leave, and performance',
          'Overseeing compliance with the National Quality Framework',
          'Coordinating enrolments and family communications',
          'Supporting educational program development and evaluation',
        ],
        indicative_tasks: ['Assistant director', '2IC', 'Deputy director', 'Assistant centre manager'],
        sort_order: 170,
      },
      {
        level: 8, stream: 'educator',
        title: 'Level 8 — Director',
        description: 'Person in charge of a children\'s service. You have overall responsibility for the management, operation, and quality of the service.',
        duties: [
          'Overall management and administration of the service',
          'Ensuring compliance with all regulatory requirements',
          'Managing budgets, enrolments, and financial operations',
          'Recruiting, supervising, and developing staff',
          'Leading quality improvement and accreditation processes',
          'Liaising with regulatory authorities, families, and community',
        ],
        indicative_tasks: ['Centre director', 'Service manager', 'Nominated supervisor'],
        sort_order: 180,
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
    // Source: FWO pay guide, effective 1 March 2026.
    // Casual rate = FT/PT rate × 1.25 (25% casual loading).
    const baseRates = {
      // Support Worker stream
      'support_worker_1': 24.95,  // SW 1.1
      'support_worker_2': 25.71,  // SW 2.1
      'support_worker_3': 26.56,  // SW 2.2 (after 1yr at 2.1)
      'support_worker_4': 28.12,  // SW 3.1
      // Educator stream
      'educator_1': 26.19,  // L1 Introductory educator
      'educator_2': 27.00,  // L2 Educator
      'educator_3': 29.52,  // L3 Qualified educator
      'educator_4': 31.50,  // L4 Experienced educator
      'educator_5': 33.24,  // L5 Advanced educator
      'educator_6': 34.78,  // L6 Room leader
      'educator_7': 36.37,  // L7 Assistant director
      'educator_8': 41.93,  // L8 Director
    };

    const classResult = await client.query(
      'SELECT id, level, stream FROM classifications WHERE award_code = $1',
      [AWARD_CODE]
    );

    for (const cls of classResult.rows) {
      const key = `${cls.stream}_${cls.level}`;
      const baseRate = baseRates[key];
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
    // Source: MA000120 & FWO pay guide, effective 1 March 2026.
    //
    // The award uses shift-based penalties (early morning, afternoon, night shifts).
    // We approximate these as time-band-based penalties for the calculator.
    //
    // FT/PT multipliers (of base rate):
    //   Weekday ordinary: 1.0×
    //   Early morning (midnight–6am): 1.10×
    //   Afternoon/evening (6pm–midnight): 1.15×
    //   Saturday (shiftworkers): 1.50×
    //   Sunday: 2.0×
    //   Public holiday: 2.50×
    //
    // Casual multipliers (of casual base, which includes 25% loading):
    //   Weekday ordinary: 1.0×
    //   Early morning: 1.08× (110% FT ÷ 125% casual = 0.88, but applied to casual = ~1.08×)
    //   Afternoon/evening: 1.12× (115% FT ÷ 125% casual ≈ 0.92, applied to casual = ~1.12×)
    //   Saturday: 1.20× (150% FT ÷ 125% casual = 1.20×)
    //   Sunday: 1.60× (200% FT ÷ 125% casual = 1.60×)
    //   Public holiday: 2.00× (250% FT ÷ 125% casual = 2.00×)

    const penaltyRates = [
      // ── Full-time ──────────────────────────────────────────────────────────
      {
        employment_type: 'full_time', day_type: 'weekday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.0, addition_per_hour: null,
        description: 'Ordinary weekday rate (Mon–Fri)',
      },
      {
        employment_type: 'full_time', day_type: 'weekday',
        time_band_start: '00:00', time_band_end: '06:00', time_band_label: 'early_morning',
        multiplier: 1.10, addition_per_hour: null,
        description: 'Early morning shift loading (midnight–6am, ×1.10)',
      },
      {
        employment_type: 'full_time', day_type: 'weekday',
        time_band_start: '18:00', time_band_end: '00:00', time_band_label: 'afternoon',
        multiplier: 1.15, addition_per_hour: null,
        description: 'Afternoon/evening shift loading (6pm–midnight, ×1.15)',
      },
      {
        employment_type: 'full_time', day_type: 'saturday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.50, addition_per_hour: null,
        description: 'Saturday — shiftworker rate (×1.50)',
      },
      {
        employment_type: 'full_time', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.0, addition_per_hour: null,
        description: 'Sunday — ×2.00',
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
        description: 'Ordinary weekday rate (Mon–Fri)',
      },
      {
        employment_type: 'part_time', day_type: 'weekday',
        time_band_start: '00:00', time_band_end: '06:00', time_band_label: 'early_morning',
        multiplier: 1.10, addition_per_hour: null,
        description: 'Early morning shift loading (midnight–6am, ×1.10)',
      },
      {
        employment_type: 'part_time', day_type: 'weekday',
        time_band_start: '18:00', time_band_end: '00:00', time_band_label: 'afternoon',
        multiplier: 1.15, addition_per_hour: null,
        description: 'Afternoon/evening shift loading (6pm–midnight, ×1.15)',
      },
      {
        employment_type: 'part_time', day_type: 'saturday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.50, addition_per_hour: null,
        description: 'Saturday — shiftworker rate (×1.50)',
      },
      {
        employment_type: 'part_time', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.0, addition_per_hour: null,
        description: 'Sunday — ×2.00',
      },
      {
        employment_type: 'part_time', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.50, addition_per_hour: null,
        description: 'Public holiday — ×2.50',
      },
      // ── Casual ─────────────────────────────────────────────────────────────
      // Casual base rate includes 25% casual loading.
      // Multipliers are relative to casual base rate.
      {
        employment_type: 'casual', day_type: 'weekday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.0, addition_per_hour: null,
        description: 'Ordinary casual weekday rate (includes 25% casual loading)',
      },
      {
        employment_type: 'casual', day_type: 'weekday',
        time_band_start: '00:00', time_band_end: '06:00', time_band_label: 'early_morning',
        multiplier: 1.08, addition_per_hour: null,
        description: 'Casual early morning loading (midnight–6am, ×1.08 of casual base)',
      },
      {
        employment_type: 'casual', day_type: 'weekday',
        time_band_start: '18:00', time_band_end: '00:00', time_band_label: 'afternoon',
        multiplier: 1.12, addition_per_hour: null,
        description: 'Casual afternoon/evening loading (6pm–midnight, ×1.12 of casual base)',
      },
      {
        employment_type: 'casual', day_type: 'saturday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.20, addition_per_hour: null,
        description: 'Casual Saturday — ×1.20 of casual base (= 150% of FT base)',
      },
      {
        employment_type: 'casual', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.60, addition_per_hour: null,
        description: 'Casual Sunday — ×1.60 of casual base (= 200% of FT base)',
      },
      {
        employment_type: 'casual', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.00, addition_per_hour: null,
        description: 'Casual public holiday — ×2.00 of casual base (= 250% of FT base)',
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
    // MA000120 — Overtime
    // Mon–Fri first 2 hours: ×1.50, after 2 hours: ×2.00.
    // Weekly threshold: 38 hours, second band: 40 hours.
    // Casual overtime multipliers relative to casual base:
    //   First 2 hrs: 1.40× of casual base (= 175% of FT base ÷ 125%)
    //   After 2 hrs: 1.80× of casual base (= 225% of FT base ÷ 125%)
    //   Verified: SW 1.1 casual OT first 2hr = $43.66, casual base = $31.19
    //     $43.66/$31.19 = 1.40 ✓
    //   SW 1.1 casual OT after 2hr = $56.14, $56.14/$31.19 = 1.80 ✓

    const overtimeRates = [
      { employment_type: 'full_time',  threshold_hours: 38, period: 'weekly', multiplier: 1.50, description: 'Weekly overtime — first 2 hours over 38 (×1.50)' },
      { employment_type: 'full_time',  threshold_hours: 40, period: 'weekly', multiplier: 2.00, description: 'Weekly overtime — after 40 hours (×2.00)' },
      { employment_type: 'part_time',  threshold_hours: 38, period: 'weekly', multiplier: 1.50, description: 'Part-time weekly overtime — first 2 hours (×1.50)' },
      { employment_type: 'part_time',  threshold_hours: 40, period: 'weekly', multiplier: 2.00, description: 'Part-time weekly overtime — after 40 hours (×2.00)' },
      // Casual: OT multipliers relative to casual base (which includes 25% loading):
      { employment_type: 'casual', threshold_hours: 38, period: 'weekly', multiplier: 1.40, description: 'Casual weekly overtime — first 2 hours (×1.40 of casual base = 175% of FT)' },
      { employment_type: 'casual', threshold_hours: 40, period: 'weekly', multiplier: 1.80, description: 'Casual weekly overtime — after 40 hours (×1.80 of casual base = 225% of FT)' },
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
    // Source: MA000120 & FWO pay guide, effective 1 March 2026.
    const allowances = [
      {
        allowance_type: 'broken_shift',
        name: 'Broken shift allowance',
        description: 'If you work a broken shift (a shift with an unpaid break of more than 1 hour), you receive a daily allowance.',
        trigger_condition: 'Working a broken shift (unpaid break > 1 hour)',
        amount: 20.42, amount_type: 'daily', per_unit: 'per_day',
      },
      {
        allowance_type: 'first_aid',
        name: 'First aid allowance (not OSHC)',
        description: 'If you hold a current first aid qualification and are appointed as the service\'s first aid officer (not in OSHC), you receive a daily allowance.',
        trigger_condition: 'Appointed as first aid officer with current first aid qualification (not OSHC)',
        amount: 12.12, amount_type: 'daily', per_unit: 'per_day',
      },
      {
        allowance_type: 'first_aid_oshc',
        name: 'First aid allowance (OSHC)',
        description: 'If you hold a current first aid qualification and are appointed as the first aid officer in an outside school hours care (OSHC) service, you receive an hourly allowance.',
        trigger_condition: 'Appointed as first aid officer in OSHC with current first aid qualification',
        amount: 1.57, amount_type: 'per_hour', per_unit: 'per_hour',
      },
      {
        allowance_type: 'meal',
        name: 'Meal allowance',
        description: 'If you are required to work overtime and a meal break falls during that overtime, you are entitled to a meal allowance.',
        trigger_condition: 'Overtime worked requiring a meal break',
        amount: 15.48, amount_type: 'fixed', per_unit: 'per_meal',
      },
      {
        allowance_type: 'laundry_ft',
        name: 'Laundry allowance (full-time)',
        description: 'If you are required to launder your own uniform, including ironing, you receive a weekly laundry allowance (full-time employees).',
        trigger_condition: 'Required to launder own uniform (full-time)',
        amount: 9.49, amount_type: 'weekly', per_unit: 'per_week',
      },
      {
        allowance_type: 'laundry_pt_casual',
        name: 'Laundry allowance (part-time/casual)',
        description: 'If you are required to launder your own uniform, including ironing, you receive a daily laundry allowance (part-time and casual employees).',
        trigger_condition: 'Required to launder own uniform (part-time or casual)',
        amount: 1.90, amount_type: 'daily', per_unit: 'per_day',
      },
      {
        allowance_type: 'vehicle',
        name: 'Vehicle allowance — car',
        description: 'If you are required to use your own car for work purposes, you receive a per-kilometre allowance.',
        trigger_condition: 'Required to use own car for work purposes',
        amount: 0.99, amount_type: 'per_km', per_unit: 'per_km',
      },
      {
        allowance_type: 'vehicle_motorcycle',
        name: 'Vehicle allowance — motorcycle',
        description: 'If you are required to use your own motorcycle for work purposes, you receive a per-kilometre allowance.',
        trigger_condition: 'Required to use own motorcycle for work purposes',
        amount: 0.33, amount_type: 'per_km', per_unit: 'per_km',
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
    // Two-question flow with branching:
    //   Q1: cs_role_type — "What type of role do you have?" (support_worker or educator)
    //   Q2a (support): cs_support_level — "Which support worker level?"
    //   Q2b (educator): cs_educator_level — "What is your qualification level?"

    const questions = [
      {
        award_code: AWARD_CODE,
        question_key: 'cs_role_type',
        question_text: 'What type of role do you have?',
        help_text: 'Children\'s services have two streams: support workers (cleaning, cooking, maintenance) and educators (working directly with children). Select the one that best matches your role.',
        question_type: 'single',
        stream: null,
        parent_question_key: null,
        parent_answer_key: null,
        sort_order: 1,
        answers: [
          { answer_key: 'support_worker', answer_text: 'Support worker — cleaning, cooking, maintenance, admin support', sort_order: 1 },
          { answer_key: 'educator', answer_text: 'Educator — working directly with children (child care worker, teacher, room leader, director)', sort_order: 2 },
        ],
      },
      {
        award_code: AWARD_CODE,
        question_key: 'cs_support_level',
        question_text: 'Which support worker level are you?',
        help_text: 'Check your employment contract or payslip for your classification level. If unsure, select the level that best matches your duties and experience.',
        question_type: 'single',
        stream: 'support_worker',
        parent_question_key: 'cs_role_type',
        parent_answer_key: 'support_worker',
        sort_order: 2,
        answers: [
          { answer_key: 'sw_1_1', answer_text: 'Support Worker Level 1.1 — entry-level support duties', sort_order: 1 },
          { answer_key: 'sw_2_1', answer_text: 'Support Worker Level 2.1 — experienced support worker (cooking, maintenance, admin)', sort_order: 2 },
          { answer_key: 'sw_2_2', answer_text: 'Support Worker Level 2.2 — after 1 year at Level 2.1', sort_order: 3 },
          { answer_key: 'sw_3_1', answer_text: 'Support Worker Level 3.1 — trade-qualified or coordinator', sort_order: 4 },
        ],
      },
      {
        award_code: AWARD_CODE,
        question_key: 'cs_educator_level',
        question_text: 'What is your qualification level?',
        help_text: 'Select the option that best matches your qualifications, experience, and current role. Your classification determines your minimum pay rate.',
        question_type: 'single',
        stream: 'educator',
        parent_question_key: 'cs_role_type',
        parent_answer_key: 'educator',
        sort_order: 3,
        answers: [
          { answer_key: 'introductory', answer_text: 'Level 1 — Introductory educator (no relevant qualification, new to the sector)', sort_order: 1 },
          { answer_key: 'cert_iii', answer_text: 'Level 2 — Educator (Certificate III or working towards it)', sort_order: 2 },
          { answer_key: 'diploma', answer_text: 'Level 3 — Qualified educator (Diploma or equivalent)', sort_order: 3 },
          { answer_key: 'experienced', answer_text: 'Level 4 — Experienced educator (Diploma + substantial experience)', sort_order: 4 },
          { answer_key: 'advanced', answer_text: 'Level 5 — Advanced educator (degree-qualified)', sort_order: 5 },
          { answer_key: 'room_leader', answer_text: 'Level 6 — Room leader', sort_order: 6 },
          { answer_key: 'assistant_director', answer_text: 'Level 7 — Assistant director / 2IC', sort_order: 7 },
          { answer_key: 'director', answer_text: 'Level 8 — Director / centre manager', sort_order: 8 },
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
    console.log('\n✅ MA000120 seed complete');
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
