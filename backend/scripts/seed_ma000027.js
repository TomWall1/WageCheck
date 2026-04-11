/**
 * Seed script — Health Professionals and Support Services Award 2020 [MA000027]
 * Pay rates effective 1 July 2025
 * Source: FWC MAPD API + FWO pay guide MA000027
 *
 * Two streams:
 *   health_professional — Levels 1-4 (Pay Point 1 for each)
 *   support_services    — Levels 1-9
 *
 * Adult FT/PT hourly rates (from API, base_rate_type = Hourly):
 *   HP1: $29.49   HP2: $37.53   HP3: $43.81   HP4: $53.05
 *   SS1: $25.74   SS2: $26.76   SS3: $27.79   SS4: $28.12
 *   SS5: $29.07   SS6: $30.64   SS7: $31.19   SS8: $32.24   SS9: $36.05
 *
 * Casual rates = FT rate x 1.25
 *
 * Penalty rates:
 *   FT/PT: Sat x1.50, Sun x2.00, PH x2.50
 *   Casual: Sat x1.50, Sun x2.00, PH x2.50
 *   Evening (6pm-midnight): +$4.26/hr flat addition
 *   Night (midnight-7am): +$5.24/hr flat addition
 *   Permanent afternoon shift: +15% loading
 *   Permanent night shift: +15% loading
 *
 * Overtime (daily threshold 7.6 hrs):
 *   First 2 OT hours: x1.50, after 2 OT hours: x2.00
 *
 * Junior rates (Support Services only):
 *   Under 16=36.8%, 16=47.3%, 17=57.8%, 18=68.3%, 19=82.5%, 20=97.7%
 *
 * Run after migrate.js: node scripts/seed_ma000027.js
 */
require('dotenv').config();
const pool = require('../src/db/pool');

const AWARD_CODE = 'MA000027';
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
      'Health Professionals and Support Services Award 2020',
      EFFECTIVE_DATE,
      'https://awards.fairwork.gov.au/MA000027.html',
    ]);

    // ── Classifications ────────────────────────────────────────────────────────
    const classifications = [
      // ── Health Professional stream ──────────────────────────────────────────
      {
        level: 1, stream: 'health_professional',
        fwc_id: 884,
        title: 'Health Professional Level 1 (Pay Point 1)',
        description: 'You are a graduate-entry health professional — for example a physiotherapist, social worker, dietitian, occupational therapist, or speech pathologist. You hold a relevant undergraduate degree (or equivalent) and are working under supervision as you build your clinical skills. This is the starting level for most people who have just finished their university qualification.',
        duties: [
          'Providing direct clinical care to patients or clients under supervision',
          'Carrying out assessments, treatments, and interventions within your scope of practice',
          'Maintaining accurate clinical records and progress notes',
          'Participating in team meetings and case conferences',
          'Completing required continuing professional development activities',
        ],
        indicative_tasks: ['Graduate physiotherapist', 'Graduate social worker', 'Graduate dietitian', 'Graduate occupational therapist', 'Graduate speech pathologist'],
        sort_order: 10,
      },
      {
        level: 2, stream: 'health_professional',
        fwc_id: 890,
        title: 'Health Professional Level 2 (Pay Point 1)',
        description: 'You are an experienced health professional with at least 4 years of relevant experience since graduation. You work with greater independence and may have a specialised clinical focus area. You are expected to exercise professional judgement and may provide guidance to more junior staff.',
        duties: [
          'Independently managing a clinical caseload within your area of expertise',
          'Providing clinical guidance and mentoring to Level 1 health professionals',
          'Contributing to program development, quality improvement, and evidence-based practice',
          'Participating in clinical education of students on placement',
          'Taking on more complex cases requiring deeper professional knowledge',
        ],
        indicative_tasks: ['Experienced physiotherapist', 'Senior social worker', 'Clinical dietitian', 'Specialist occupational therapist'],
        sort_order: 20,
      },
      {
        level: 3, stream: 'health_professional',
        fwc_id: 894,
        title: 'Health Professional Level 3 (Pay Point 1)',
        description: 'You are a senior health professional who may supervise other health professionals or run a specialist clinical program. You have significant experience and may hold postgraduate qualifications. You are responsible for clinical leadership, program planning, and ensuring quality standards in your area.',
        duties: [
          'Supervising and coordinating a team of health professionals',
          'Providing clinical leadership and expert advice across your service area',
          'Developing and evaluating clinical programs and service delivery models',
          'Managing budgets, resources, and staffing within your program area',
          'Leading research, quality improvement, or policy development projects',
        ],
        indicative_tasks: ['Senior physiotherapist', 'Team leader (allied health)', 'Clinical specialist', 'Program coordinator'],
        sort_order: 30,
      },
      {
        level: 4, stream: 'health_professional',
        fwc_id: 899,
        title: 'Health Professional Level 4 (Pay Point 1)',
        description: 'You are a principal or director-level health professional who manages a whole team, department, or service. You have extensive experience, likely hold postgraduate qualifications, and are responsible for the strategic direction and overall performance of your area. This is the most senior clinical classification in this stream.',
        duties: [
          'Managing and directing a department, service, or multi-disciplinary team',
          'Setting the strategic direction and objectives for your service area',
          'Providing expert-level clinical leadership and decision-making',
          'Overseeing recruitment, performance management, and professional development of staff',
          'Representing the organisation on professional bodies, advisory committees, or inter-agency forums',
        ],
        indicative_tasks: ['Director of allied health', 'Principal social worker', 'Head of department (health)', 'Service manager (clinical)'],
        sort_order: 40,
      },
      // ── Support Services stream ─────────────────────────────────────────────
      {
        level: 1, stream: 'support_services',
        fwc_id: 868,
        title: 'Support Services Level 1',
        description: 'You are an entry-level support worker in a health or aged care facility. No previous experience or qualifications are needed. You do basic tasks like cleaning, helping in the kitchen, sorting laundry, or other simple duties. You work under close supervision and follow clear instructions.',
        duties: [
          'Performing general cleaning duties such as mopping, vacuuming, and dusting',
          'Assisting in food preparation areas with basic tasks like washing dishes and setting up trays',
          'Sorting and folding laundry, and distributing linen to wards or departments',
          'Carrying out general labouring work as directed',
          'Following workplace health and safety procedures at all times',
        ],
        indicative_tasks: ['Cleaner', 'Kitchen hand', 'Laundry worker', 'Food services assistant (entry)'],
        sort_order: 50,
      },
      {
        level: 2, stream: 'support_services',
        fwc_id: 869,
        title: 'Support Services Level 2',
        description: 'You have some experience or basic training. You do similar work to Level 1 but with a bit more skill — for example, you might operate basic equipment or work with less supervision. You may be asked to show new starters how things work.',
        duties: [
          'Operating basic equipment such as floor polishers, steam cleaners, or kitchen appliances',
          'Performing food services duties including simple food preparation and serving meals',
          'Carrying out laundry operations using commercial washing and drying machines',
          'Providing on-the-job guidance to new Level 1 workers',
          'Following established procedures with limited supervision',
        ],
        indicative_tasks: ['Experienced cleaner', 'Food services worker', 'Laundry operator', 'Ward assistant'],
        sort_order: 60,
      },
      {
        level: 3, stream: 'support_services',
        fwc_id: 870,
        title: 'Support Services Level 3',
        description: 'You are experienced in your role and can work with minimal supervision. You may guide other support workers in day-to-day tasks. You have good working knowledge of your area and can handle non-routine situations.',
        duties: [
          'Working independently across a range of tasks in your area',
          'Guiding and directing the work of lower-level support staff',
          'Handling non-routine situations and solving problems within your role',
          'Operating specialised equipment relevant to your area of work',
          'Maintaining records and reporting on supplies, maintenance needs, or incidents',
        ],
        indicative_tasks: ['Senior cleaner', 'Cook (unqualified but experienced)', 'Maintenance worker', 'Senior food services worker'],
        sort_order: 70,
      },
      {
        level: 4, stream: 'support_services',
        fwc_id: 871,
        title: 'Support Services Level 4',
        description: 'You hold a trade qualification (like a Certificate III) or have equivalent advanced skills. You do skilled work in your trade or speciality area and may coordinate the work of others in your team.',
        duties: [
          'Performing trade-qualified or advanced-level tasks in your speciality area',
          'Coordinating and allocating work among a small team of support workers',
          'Using trade-level skills in areas such as cooking, maintenance, or technical support',
          'Ensuring quality and safety standards are met in your work area',
          'Training and assessing the competency of less experienced workers',
        ],
        indicative_tasks: ['Qualified cook', 'Tradesperson (maintenance)', 'Senior laundry worker', 'Technical support worker'],
        sort_order: 80,
      },
      {
        level: 5, stream: 'support_services',
        fwc_id: 872,
        title: 'Support Services Level 5',
        description: 'You are an experienced tradesperson or specialist. You work at a higher level within your trade and may supervise a small team. You have broad knowledge and can handle complex tasks without supervision.',
        duties: [
          'Performing advanced trade or specialist work independently',
          'Supervising a small team of support or trades workers',
          'Troubleshooting complex problems in your area of expertise',
          'Planning and scheduling work for your team',
          'Maintaining and calibrating specialised equipment',
        ],
        indicative_tasks: ['Experienced tradesperson', 'Senior cook', 'Maintenance specialist', 'Senior technical worker'],
        sort_order: 90,
      },
      {
        level: 6, stream: 'support_services',
        fwc_id: 873,
        title: 'Support Services Level 6',
        description: 'You are a supervisor or advanced specialist who oversees a team or a specific support services area. You are responsible for the day-to-day running of your section and for making sure work is completed to standard.',
        duties: [
          'Supervising a team of support services workers across your section',
          'Planning rosters, workloads, and daily operations for your area',
          'Ensuring compliance with health, safety, and quality standards',
          'Managing supplies, ordering stock, and controlling budgets for your section',
          'Handling staff issues, performance discussions, and reporting to management',
        ],
        indicative_tasks: ['Cleaning supervisor', 'Kitchen supervisor', 'Laundry supervisor', 'Maintenance supervisor'],
        sort_order: 100,
      },
      {
        level: 7, stream: 'support_services',
        fwc_id: 874,
        title: 'Support Services Level 7',
        description: 'You are a senior supervisor responsible for multiple support services areas or a large team. You have significant experience and are trusted to manage complex operations with limited oversight from management.',
        duties: [
          'Overseeing multiple support services sections or a large team',
          'Developing and implementing operational procedures and standards',
          'Managing significant budgets and resource allocation across sections',
          'Liaising with management, clinical staff, and external contractors',
          'Leading staff training, development, and performance review processes',
        ],
        indicative_tasks: ['Senior supervisor (support services)', 'Facilities coordinator', 'Catering manager (operational)'],
        sort_order: 110,
      },
      {
        level: 8, stream: 'support_services',
        fwc_id: 876,
        title: 'Support Services Level 8 (Pay Point 1)',
        description: 'You are a technical specialist or senior operational manager with high-level skills and qualifications. You work at a level that requires expert knowledge and significant responsibility for outcomes in your area.',
        duties: [
          'Providing high-level technical expertise in your specialist area',
          'Managing complex projects, contracts, or service delivery programs',
          'Advising management on technical matters, compliance, and best practice',
          'Developing policies and procedures for your operational area',
          'Leading and mentoring supervisors and senior staff',
        ],
        indicative_tasks: ['Technical specialist', 'Senior facilities manager', 'Chef manager', 'Engineering specialist'],
        sort_order: 120,
      },
      {
        level: 9, stream: 'support_services',
        fwc_id: 880,
        title: 'Support Services Level 9 (Pay Point 1)',
        description: 'You are at the most senior support services classification. You hold a senior management or highly specialised technical role, with broad responsibility for planning, budgets, and staff across support services operations.',
        duties: [
          'Directing and managing a major support services function or department',
          'Setting strategic direction and operational priorities for your area',
          'Managing large budgets, major contracts, and procurement',
          'Overseeing compliance, audit, and quality assurance processes',
          'Representing the organisation in external forums and negotiations',
        ],
        indicative_tasks: ['Director of support services', 'Senior operations manager', 'Head of facilities', 'Senior technical manager'],
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
    const baseRates = {
      health_professional: { 1: 29.49, 2: 37.53, 3: 43.81, 4: 53.05 },
      support_services:    { 1: 25.74, 2: 26.76, 3: 27.79, 4: 28.12, 5: 29.07, 6: 30.64, 7: 31.19, 8: 32.24, 9: 36.05 },
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
    const penaltyRates = [
      // ── Full-time ───────────────────────────────────────────────────────────
      { employment_type: 'full_time',  day_type: 'weekday',        time_start: null,    time_end: null,    time_label: null,                      multiplier: 1.00, addition: null, description: 'Weekday ordinary rate (×1.0)' },
      { employment_type: 'full_time',  day_type: 'saturday',       time_start: null,    time_end: null,    time_label: null,                      multiplier: 1.50, addition: null, description: 'Saturday — time and a half (×1.50)' },
      { employment_type: 'full_time',  day_type: 'sunday',         time_start: null,    time_end: null,    time_label: null,                      multiplier: 2.00, addition: null, description: 'Sunday — double time (×2.00)' },
      { employment_type: 'full_time',  day_type: 'public_holiday', time_start: null,    time_end: null,    time_label: null,                      multiplier: 2.50, addition: null, description: 'Public holiday — double time and a half (×2.50)' },
      { employment_type: 'full_time',  day_type: 'weekday',        time_start: '18:00', time_end: '00:00', time_label: 'Evening (6pm–midnight)',  multiplier: 1.00,  addition: 4.26, description: 'Evening shift — flat addition of $4.26/hr (6pm to midnight)' },
      { employment_type: 'full_time',  day_type: 'weekday',        time_start: '00:00', time_end: '07:00', time_label: 'Night (midnight–7am)',    multiplier: 1.00,  addition: 5.24, description: 'Night shift — flat addition of $5.24/hr (midnight to 7am)' },
      // Note: Permanent afternoon/night shift loadings (×1.15) apply to designated permanent shiftworkers only.
      // Not included here as the calculator cannot distinguish permanent shiftworkers from day workers.
      // ── Part-time ───────────────────────────────────────────────────────────
      { employment_type: 'part_time',  day_type: 'weekday',        time_start: null,    time_end: null,    time_label: null,                      multiplier: 1.00, addition: null, description: 'Weekday ordinary rate (×1.0)' },
      { employment_type: 'part_time',  day_type: 'saturday',       time_start: null,    time_end: null,    time_label: null,                      multiplier: 1.50, addition: null, description: 'Saturday — time and a half (×1.50)' },
      { employment_type: 'part_time',  day_type: 'sunday',         time_start: null,    time_end: null,    time_label: null,                      multiplier: 2.00, addition: null, description: 'Sunday — double time (×2.00)' },
      { employment_type: 'part_time',  day_type: 'public_holiday', time_start: null,    time_end: null,    time_label: null,                      multiplier: 2.50, addition: null, description: 'Public holiday — double time and a half (×2.50)' },
      { employment_type: 'part_time',  day_type: 'weekday',        time_start: '18:00', time_end: '00:00', time_label: 'Evening (6pm–midnight)',  multiplier: 1.00,  addition: 4.26, description: 'Evening shift — flat addition of $4.26/hr (6pm to midnight)' },
      { employment_type: 'part_time',  day_type: 'weekday',        time_start: '00:00', time_end: '07:00', time_label: 'Night (midnight–7am)',    multiplier: 1.00,  addition: 5.24, description: 'Night shift — flat addition of $5.24/hr (midnight to 7am)' },
      // Permanent shift loadings excluded (see note above)
      // ── Casual ──────────────────────────────────────────────────────────────
      { employment_type: 'casual',     day_type: 'weekday',        time_start: null,    time_end: null,    time_label: null,                      multiplier: 1.00, addition: null, description: 'Weekday ordinary casual rate (incl. 25% casual loading)' },
      { employment_type: 'casual',     day_type: 'saturday',       time_start: null,    time_end: null,    time_label: null,                      multiplier: 1.50, addition: null, description: 'Casual Saturday — time and a half (×1.50 of casual base)' },
      { employment_type: 'casual',     day_type: 'sunday',         time_start: null,    time_end: null,    time_label: null,                      multiplier: 2.00, addition: null, description: 'Casual Sunday — double time (×2.00 of casual base)' },
      { employment_type: 'casual',     day_type: 'public_holiday', time_start: null,    time_end: null,    time_label: null,                      multiplier: 2.50, addition: null, description: 'Casual public holiday — double time and a half (×2.50 of casual base)' },
      { employment_type: 'casual',     day_type: 'weekday',        time_start: '18:00', time_end: '00:00', time_label: 'Evening (6pm–midnight)',  multiplier: 1.00,  addition: 4.26, description: 'Casual evening shift — flat addition of $4.26/hr (6pm to midnight)' },
      { employment_type: 'casual',     day_type: 'weekday',        time_start: '00:00', time_end: '07:00', time_label: 'Night (midnight–7am)',    multiplier: 1.00,  addition: 5.24, description: 'Casual night shift — flat addition of $5.24/hr (midnight to 7am)' },
    ];

    await client.query(`DELETE FROM penalty_rates WHERE award_code = $1`, [AWARD_CODE]);

    for (const r of penaltyRates) {
      await client.query(`
        INSERT INTO penalty_rates
          (award_code, employment_type, day_type, time_band_start, time_band_end, time_band_label, multiplier, addition_per_hour, description, effective_date)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      `, [
        AWARD_CODE, r.employment_type, r.day_type,
        r.time_start, r.time_end, r.time_label,
        r.multiplier, r.addition, r.description, EFFECTIVE_DATE,
      ]);
    }
    console.log(`✓ Inserted ${penaltyRates.length} penalty rate rules`);

    // ── Overtime rates ─────────────────────────────────────────────────────────
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
        allowance_type: 'meal_ot',
        name: 'Meal allowance (overtime > 1 hour)',
        description: 'If you work overtime for more than 1 hour and your employer did not give you notice the day before, you are entitled to a meal allowance of $16.62.',
        trigger_condition: 'Overtime of more than 1 hour without notice',
        amount: 16.62, amount_type: 'fixed', per_unit: 'per_meal',
        is_all_purpose: false,
      },
      {
        allowance_type: 'meal_further',
        name: 'Meal allowance (further 4 hours overtime)',
        description: 'If you continue working overtime for a further 4 hours after your first meal break, you are entitled to an additional meal allowance of $14.98.',
        trigger_condition: 'Further 4 hours of overtime after first meal allowance',
        amount: 14.98, amount_type: 'fixed', per_unit: 'per_meal',
        is_all_purpose: false,
      },
      {
        allowance_type: 'vehicle',
        name: 'Vehicle allowance',
        description: 'If you are required to use your own vehicle for work purposes, you are entitled to $0.99 per kilometre driven.',
        trigger_condition: 'Required to use own vehicle for work',
        amount: 0.99, amount_type: 'per_km', per_unit: 'per_km',
        is_all_purpose: false,
      },
      {
        allowance_type: 'tool_chef',
        name: 'Tool allowance (chefs and cooks)',
        description: 'If you are a chef or cook required to provide and maintain your own tools and equipment, you are entitled to $13.41 per week.',
        trigger_condition: 'Chef or cook required to supply own tools',
        amount: 13.41, amount_type: 'fixed', per_unit: 'per_week',
        is_all_purpose: false,
      },
      {
        allowance_type: 'uniform_shift',
        name: 'Uniform allowance (per shift)',
        description: 'If your employer requires you to wear a uniform and does not provide or launder it, you are entitled to $1.23 per shift.',
        trigger_condition: 'Required to wear uniform not supplied or laundered by employer',
        amount: 1.23, amount_type: 'fixed', per_unit: 'per_shift',
        is_all_purpose: false,
      },
      {
        allowance_type: 'uniform_week',
        name: 'Uniform allowance (per week)',
        description: 'If your employer requires you to wear a uniform and does not provide or launder it, you are entitled to $6.24 per week.',
        trigger_condition: 'Required to wear uniform not supplied or laundered by employer (weekly)',
        amount: 6.24, amount_type: 'fixed', per_unit: 'per_week',
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
        trigger_condition: 'Required to launder own uniform (weekly)',
        amount: 1.49, amount_type: 'fixed', per_unit: 'per_week',
        is_all_purpose: false,
      },
      {
        allowance_type: 'on_call_weekday',
        name: 'On-call allowance (Monday to Saturday)',
        description: 'If you are required to be on call from Monday to Saturday, you are entitled to $25.15 per 24-hour period.',
        trigger_condition: 'On call Monday to Saturday',
        amount: 25.15, amount_type: 'fixed', per_unit: 'per_day',
        is_all_purpose: false,
      },
      {
        allowance_type: 'on_call_sunday',
        name: 'On-call allowance (Sunday/Public Holiday)',
        description: 'If you are required to be on call on a Sunday or public holiday, you are entitled to $50.18 per 24-hour period.',
        trigger_condition: 'On call Sunday or public holiday',
        amount: 50.18, amount_type: 'fixed', per_unit: 'per_day',
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
        timing_rule: 'After 5 hours of continuous work',
        description: 'If you work more than 5 hours, you are entitled to an unpaid meal break of at least 30 minutes.',
      },
      {
        employment_type: null,
        shift_hours_min: 4.0, shift_hours_max: null,
        break_type: 'rest', break_duration_min: 10, is_paid: true,
        timing_rule: 'One 10-minute paid rest break per 4 hours worked',
        description: 'You are entitled to a paid 10-minute rest break for every 4 hours of work.',
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
    const questions = [
      {
        question_key: 'health_stream',
        question_text: 'What type of work do you do?',
        help_text: 'Health professionals are qualified workers like physiotherapists, social workers, dietitians, occupational therapists, or speech pathologists who hold a university degree. Support services workers do cleaning, food services, laundry, maintenance, and other non-clinical support work in hospitals, aged care, or health facilities.',
        question_type: 'single',
        stream: null,
        parent_question_key: null,
        parent_answer_key: null,
        sort_order: 1,
      },
      {
        question_key: 'health_pro_level',
        question_text: 'What is your health professional level?',
        help_text: 'Level 1 is for graduate-entry professionals. Level 2 is for experienced professionals with 4+ years. Level 3 is for senior professionals who may supervise others. Level 4 is for principal professionals who manage a team or service.',
        question_type: 'single',
        stream: null,
        parent_question_key: 'health_stream',
        parent_answer_key: 'health_professional',
        sort_order: 2,
      },
      {
        question_key: 'support_level',
        question_text: 'What is your support services level?',
        help_text: 'Level 1 is entry-level with no experience needed. Levels go up based on your experience, qualifications, and responsibilities. Levels 4-5 typically require trade qualifications. Levels 6-7 are supervisory. Levels 8-9 are senior management or technical specialist roles.',
        question_type: 'single',
        stream: null,
        parent_question_key: 'health_stream',
        parent_answer_key: 'support_services',
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
      // Q1: health_stream
      { question_key: 'health_stream', answer_key: 'health_professional', answer_text: 'Health professional (physiotherapist, social worker, dietitian, OT, speech pathologist, etc.)', sort_order: 1 },
      { question_key: 'health_stream', answer_key: 'support_services',    answer_text: 'Support services (cleaning, food services, laundry, maintenance, etc.)', sort_order: 2 },
      // Q2: health_pro_level
      { question_key: 'health_pro_level', answer_key: 'hp1', answer_text: 'Level 1 — Graduate entry, working under supervision with a relevant degree', sort_order: 1 },
      { question_key: 'health_pro_level', answer_key: 'hp2', answer_text: 'Level 2 — Experienced professional with 4+ years, working more independently', sort_order: 2 },
      { question_key: 'health_pro_level', answer_key: 'hp3', answer_text: 'Level 3 — Senior professional, may supervise others or run a specialist program', sort_order: 3 },
      { question_key: 'health_pro_level', answer_key: 'hp4', answer_text: 'Level 4 — Principal professional, manages a whole team or service', sort_order: 4 },
      // Q3: support_level
      { question_key: 'support_level', answer_key: 'l1', answer_text: 'Level 1 — Entry-level, no experience needed (cleaner, kitchen hand, laundry worker)', sort_order: 1 },
      { question_key: 'support_level', answer_key: 'l2', answer_text: 'Level 2 — Some experience, basic equipment operation (food services, ward assistant)', sort_order: 2 },
      { question_key: 'support_level', answer_key: 'l3', answer_text: 'Level 3 — Experienced, can work with minimal supervision and guide others', sort_order: 3 },
      { question_key: 'support_level', answer_key: 'l4', answer_text: 'Level 4 — Trade qualified or advanced skills (qualified cook, tradesperson)', sort_order: 4 },
      { question_key: 'support_level', answer_key: 'l5', answer_text: 'Level 5 — Experienced tradesperson, may supervise a small team', sort_order: 5 },
      { question_key: 'support_level', answer_key: 'l6', answer_text: 'Level 6 — Supervisor or advanced specialist overseeing a section', sort_order: 6 },
      { question_key: 'support_level', answer_key: 'l7', answer_text: 'Level 7 — Senior supervisor responsible for multiple areas or large teams', sort_order: 7 },
      { question_key: 'support_level', answer_key: 'l8', answer_text: 'Level 8 — Technical specialist or senior operational manager', sort_order: 8 },
      { question_key: 'support_level', answer_key: 'l9', answer_text: 'Level 9 — Senior management, directs a major support services function', sort_order: 9 },
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
