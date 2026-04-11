/**
 * Seed script — Market and Social Research Award 2020 [MA000030]
 * Pay rates effective 1 July 2025 (published 25 June 2025)
 * Source: Fair Work Ombudsman pay guide MA000030
 *
 * KEY — Penalty structure is ADDITION-BASED, not multiplier-based:
 *   Saturday (all day):              base + $7.07/hr
 *   Out-of-hours Mon–Fri 8pm–8am:   base + $7.07/hr
 *   Sunday (all day):               base + $14.15/hr
 *   Public holiday (all day):       base + $14.15/hr
 *   Overtime (FT/PT):               base × 1.25 (= casual base)
 *
 * Casual rates:
 *   Base = FT rate × 1.25 (standard 25% loading)
 *   No additional Saturday/Sunday/PH penalties — flat rate for all days
 *   Overtime = same as casual base (no additional premium)
 *
 * No junior rates specified in pay guide.
 * No all-purpose allowances.
 *
 * Adult FT/PT hourly base rates:
 *   L1  Market research trainee:          $25.38
 *   L2  Support employee first year:      $27.52
 *   L3  Support employee thereafter:      $28.29
 *   L4  Market research interviewer:      $28.29
 *   L5  Executive/door-to-door interviewer: $28.57
 *   L6  Editor/Coder/Keyboard operator:   $28.78
 *   L7  Team leader:                      $30.13
 *   L8  Field supervisor:                 $32.36
 *   L9  Research assistant:               $32.36
 *   L10 Field manager:                    $35.35
 *   L11 Research officer:                 $35.35
 *   L12 Research manager:                 $46.53
 *
 * Run after migrate.js: node scripts/seed_ma000030.js
 */
require('dotenv').config();
const pool = require('../src/db/pool');

const AWARD_CODE = 'MA000030';
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
      'Market and Social Research Award 2020',
      EFFECTIVE_DATE,
      'https://awards.fairwork.gov.au/MA000030.html',
    ]);

    // ── Classifications ────────────────────────────────────────────────────────
    // Single stream 'research' with 12 levels corresponding to distinct roles.
    const classifications = [
      {
        level: 1, stream: 'research',
        title: 'Market Research Trainee',
        description: 'You are a trainee learning basic market or social research tasks under supervision. This is your first role in the industry or you are completing initial training.',
        duties: [
          'Learning basic interviewing and data collection techniques',
          'Assisting experienced interviewers or researchers',
          'Performing simple clerical and administrative tasks',
          'Following specific instructions under close supervision',
        ],
        indicative_tasks: ['Trainee interviewer', 'Research trainee', 'Entry-level research assistant'],
        sort_order: 10,
      },
      {
        level: 2, stream: 'research',
        title: 'Support Employee — First Year',
        description: 'You perform support and administrative tasks in a market or social research organisation. You are in your first year in this classification.',
        duties: [
          'General administrative and clerical support',
          'Data entry and basic file management',
          'Assisting with research logistics and scheduling',
          'Handling routine correspondence and phone enquiries',
        ],
        indicative_tasks: ['Administrative assistant (first year)', 'Research support officer (first year)', 'Office assistant'],
        sort_order: 20,
      },
      {
        level: 3, stream: 'research',
        title: 'Support Employee — Thereafter',
        description: 'You perform support and administrative tasks and have completed at least one year in the Support Employee classification. You work with greater autonomy than a first-year support employee.',
        duties: [
          'Experienced administrative and clerical support',
          'Coordinating research logistics independently',
          'Maintaining databases and research records',
          'Supporting multiple projects or teams simultaneously',
        ],
        indicative_tasks: ['Administrative assistant (experienced)', 'Research support officer (experienced)', 'Office coordinator'],
        sort_order: 30,
      },
      {
        level: 4, stream: 'research',
        title: 'Market Research Interviewer',
        description: 'You conduct interviews by telephone or other remote methods to collect survey data. You follow structured questionnaires and record responses accurately.',
        duties: [
          'Conducting telephone or online interviews using structured questionnaires',
          'Recording respondent answers accurately and completely',
          'Meeting call targets and quality standards',
          'Handling respondent queries about the survey',
        ],
        indicative_tasks: ['Telephone interviewer', 'CATI interviewer', 'Online survey interviewer', 'Phone researcher'],
        sort_order: 40,
      },
      {
        level: 5, stream: 'research',
        title: 'Executive (Face-to-Face) Interviewer / Door-to-Door Interviewer',
        description: 'You conduct face-to-face interviews or door-to-door surveys in the field. This includes executive-level interviews with business professionals and community surveys.',
        duties: [
          'Conducting face-to-face interviews at respondent locations',
          'Door-to-door surveying in residential or business areas',
          'Managing own interview schedule and travel logistics',
          'Ensuring data quality and completeness in field conditions',
        ],
        indicative_tasks: ['Face-to-face interviewer', 'Door-to-door interviewer', 'Field interviewer', 'Executive interviewer'],
        sort_order: 50,
      },
      {
        level: 6, stream: 'research',
        title: 'Editor / Coder / Keyboard Operator',
        description: 'You edit, code, or process research data. You check completed questionnaires for accuracy, apply coding frameworks, or enter data using specialised software.',
        duties: [
          'Editing completed questionnaires for accuracy and completeness',
          'Applying coding frameworks to open-ended survey responses',
          'Data entry and processing using specialised research software',
          'Identifying and resolving data quality issues',
        ],
        indicative_tasks: ['Data editor', 'Survey coder', 'Keyboard operator', 'Data processor'],
        sort_order: 60,
      },
      {
        level: 7, stream: 'research',
        title: 'Team Leader',
        description: 'You lead a team of interviewers or support staff. You coordinate daily work activities, monitor quality, and assist team members with their tasks.',
        duties: [
          'Supervising and coordinating a team of interviewers or support staff',
          'Monitoring interview quality and providing feedback',
          'Briefing team members on new projects and questionnaires',
          'Resolving operational issues during shifts',
        ],
        indicative_tasks: ['Interview team leader', 'Shift supervisor', 'Call centre team leader'],
        sort_order: 70,
      },
      {
        level: 8, stream: 'research',
        title: 'Field Supervisor',
        description: 'You supervise field interviewing operations. You manage interviewer teams in the field, ensure quality standards, and handle logistical coordination of fieldwork.',
        duties: [
          'Managing and supervising field interviewer teams',
          'Coordinating fieldwork logistics (schedules, locations, materials)',
          'Conducting quality checks and back-checks on completed interviews',
          'Training and briefing field interviewers on project requirements',
        ],
        indicative_tasks: ['Field supervisor', 'Fieldwork coordinator', 'Senior field interviewer'],
        sort_order: 80,
      },
      {
        level: 9, stream: 'research',
        title: 'Research Assistant',
        description: 'You assist with the design, execution, and analysis of research projects. You may draft questionnaires, prepare reports, or conduct preliminary analysis under direction.',
        duties: [
          'Assisting with questionnaire design and testing',
          'Conducting preliminary data analysis and tabulation',
          'Preparing research reports and presentations',
          'Coordinating with clients and stakeholders on project logistics',
        ],
        indicative_tasks: ['Research assistant', 'Junior researcher', 'Project assistant', 'Analyst (junior)'],
        sort_order: 90,
      },
      {
        level: 10, stream: 'research',
        title: 'Field Manager',
        description: 'You manage all field operations for research projects. You oversee multiple field teams, manage budgets and timelines, and ensure project delivery standards.',
        duties: [
          'Managing all field operations across multiple projects',
          'Overseeing field supervisors and interviewer teams',
          'Managing fieldwork budgets, timelines, and resource allocation',
          'Ensuring compliance with research quality standards and codes of conduct',
        ],
        indicative_tasks: ['Field manager', 'Fieldwork manager', 'Operations manager (field)'],
        sort_order: 100,
      },
      {
        level: 11, stream: 'research',
        title: 'Research Officer',
        description: 'You design, manage, and report on research projects. You have significant expertise in research methodology and can work independently on complex projects.',
        duties: [
          'Designing research methodologies and sampling strategies',
          'Managing research projects from inception to reporting',
          'Conducting advanced data analysis and interpretation',
          'Writing research reports and presenting findings to clients',
        ],
        indicative_tasks: ['Research officer', 'Research executive', 'Senior analyst', 'Project manager (research)'],
        sort_order: 110,
      },
      {
        level: 12, stream: 'research',
        title: 'Research Manager',
        description: 'You manage a research team or department. You have high-level responsibility for research strategy, client relationships, and business development.',
        duties: [
          'Managing a research team or department',
          'Developing research strategy and methodology at an organisational level',
          'Managing major client relationships and business development',
          'Overseeing quality assurance across all research projects',
        ],
        indicative_tasks: ['Research manager', 'Research director', 'Senior research manager', 'Head of research'],
        sort_order: 120,
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
    // Source: FWO pay guide MA000030, effective 1 July 2025.
    // Casual rate = FT rate × 1.25.
    const baseRates = {
      1: 25.38,   // Market research trainee
      2: 27.52,   // Support employee first year
      3: 28.29,   // Support employee thereafter
      4: 28.29,   // Market research interviewer
      5: 28.57,   // Executive/door-to-door interviewer
      6: 28.78,   // Editor/Coder/Keyboard operator
      7: 30.13,   // Team leader
      8: 32.36,   // Field supervisor
      9: 32.36,   // Research assistant
      10: 35.35,  // Field manager
      11: 35.35,  // Research officer
      12: 46.53,  // Research manager
    };

    const classResult = await client.query(
      'SELECT id, level, stream FROM classifications WHERE award_code = $1',
      [AWARD_CODE]
    );

    for (const cls of classResult.rows) {
      const baseRate = baseRates[cls.level];
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
    // Source: MA000030 pay guide — addition-based penalties (NOT multiplier-based).
    //
    // FT/PT:
    //   Weekday ordinary:              ×1.0 (no addition)
    //   Out-of-hours Mon–Fri 8pm–8am:  +$7.07/hr
    //   Saturday (all day):            +$7.07/hr
    //   Sunday (all day):              +$14.15/hr
    //   Public holiday (all day):      +$14.15/hr
    //
    // Casual:
    //   All days ordinary rate — no additional penalties beyond 25% loading
    //   (casual table shows no Saturday/Sunday/PH columns)

    const penaltyRates = [
      // ── Full-time ────────────────────────────────────────────────────────────
      {
        employment_type: 'full_time', day_type: 'weekday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.0, addition_per_hour: null,
        description: 'Ordinary weekday rate (×1.0)',
      },
      {
        employment_type: 'full_time', day_type: 'weekday',
        time_band_start: '20:00', time_band_end: '08:00', time_band_label: 'Out-of-hours',
        multiplier: 1.0, addition_per_hour: 7.07,
        description: 'Out-of-hours Mon–Fri (8pm–8am) — +$7.07/hr',
      },
      {
        employment_type: 'full_time', day_type: 'saturday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.0, addition_per_hour: 7.07,
        description: 'Saturday — +$7.07/hr above base',
      },
      {
        employment_type: 'full_time', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.0, addition_per_hour: 14.15,
        description: 'Sunday — +$14.15/hr above base',
      },
      {
        employment_type: 'full_time', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.0, addition_per_hour: 14.15,
        description: 'Public holiday — +$14.15/hr above base',
      },
      // ── Part-time (same as full-time) ────────────────────────────────────────
      {
        employment_type: 'part_time', day_type: 'weekday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.0, addition_per_hour: null,
        description: 'Ordinary weekday rate (×1.0)',
      },
      {
        employment_type: 'part_time', day_type: 'weekday',
        time_band_start: '20:00', time_band_end: '08:00', time_band_label: 'Out-of-hours',
        multiplier: 1.0, addition_per_hour: 7.07,
        description: 'Out-of-hours Mon–Fri (8pm–8am) — +$7.07/hr',
      },
      {
        employment_type: 'part_time', day_type: 'saturday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.0, addition_per_hour: 7.07,
        description: 'Saturday — +$7.07/hr above base',
      },
      {
        employment_type: 'part_time', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.0, addition_per_hour: 14.15,
        description: 'Sunday — +$14.15/hr above base',
      },
      {
        employment_type: 'part_time', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.0, addition_per_hour: 14.15,
        description: 'Public holiday — +$14.15/hr above base',
      },
      // ── Casual ───────────────────────────────────────────────────────────────
      // Casual rate is flat for all days — no additional weekend/PH penalties.
      // The casual table in the pay guide has no Saturday/Sunday/PH columns.
      {
        employment_type: 'casual', day_type: 'weekday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.0, addition_per_hour: null,
        description: 'Ordinary casual rate (includes 25% casual loading)',
      },
      {
        employment_type: 'casual', day_type: 'saturday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.0, addition_per_hour: null,
        description: 'Casual Saturday — same as ordinary casual rate',
      },
      {
        employment_type: 'casual', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.0, addition_per_hour: null,
        description: 'Casual Sunday — same as ordinary casual rate',
      },
      {
        employment_type: 'casual', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.0, addition_per_hour: null,
        description: 'Casual public holiday — same as ordinary casual rate',
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

    // ── Overtime rates ─────────────────────────────────────────────────────────
    // Source: MA000030 pay guide — Overtime column = base × 1.25 (FT/PT).
    // Casual overtime = same as casual base (no additional premium).
    //
    // FT/PT overtime: all hours over 38/week at ×1.25
    // No double-time tier shown in pay guide.

    const overtimeRates = [
      { employment_type: 'full_time',  threshold_hours: 38, period: 'weekly', multiplier: 1.25, description: 'Weekly overtime — all hours over 38 (×1.25)' },
      { employment_type: 'part_time',  threshold_hours: 38, period: 'weekly', multiplier: 1.25, description: 'Part-time weekly overtime — all hours over 38 (×1.25)' },
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
    // Source: MA000030 pay guide, effective 1 July 2025.
    // No all-purpose allowances in this award.
    const allowances = [
      {
        allowance_type: 'vehicle',
        name: 'Vehicle allowance',
        description: 'If you are required to use your own vehicle for work purposes, you receive $0.98 per kilometre.',
        trigger_condition: 'Required to use own vehicle for work purposes',
        amount: 0.98, amount_type: 'per_km', per_unit: 'per_km',
        is_all_purpose: false,
      },
      {
        allowance_type: 'telephone',
        name: 'Telephone reimbursement',
        description: 'If you are required to use your own telephone for work, you are reimbursed for the cost of rental and all work-related calls.',
        trigger_condition: 'Required to use own telephone for work duties',
        amount: null, amount_type: 'reimbursement', per_unit: null,
        is_all_purpose: false,
      },
      {
        allowance_type: 'telephone_installation',
        name: 'Telephone reimbursement — installation required',
        description: 'If your employer requires you to install a telephone for work purposes, you are reimbursed for installation, rental, and all work-related calls.',
        trigger_condition: 'Required to install a telephone for work duties',
        amount: null, amount_type: 'reimbursement', per_unit: null,
        is_all_purpose: false,
      },
      {
        allowance_type: 'expenses',
        name: 'Expenses reimbursement',
        description: 'You are reimbursed for all expenses that have been actually and properly incurred for work purposes.',
        trigger_condition: 'Expenses actually and properly incurred for work purposes',
        amount: null, amount_type: 'reimbursement', per_unit: null,
        is_all_purpose: false,
      },
      {
        allowance_type: 'relocation',
        name: 'Relocation reimbursement',
        description: 'If your employer requires you to relocate, you are reimbursed for the reasonable costs of relocating personal and household effects and immediate dependent family.',
        trigger_condition: 'Employer-directed relocation',
        amount: null, amount_type: 'reimbursement', per_unit: null,
        is_all_purpose: false,
      },
      {
        allowance_type: 'damage_theft',
        name: 'Damage to or theft of clothing or belongings reimbursement',
        description: 'If your clothing or belongings are damaged or stolen at work, you are reimbursed up to a maximum of $501.20 per claim.',
        trigger_condition: 'Clothing or belongings damaged or stolen during course of employment',
        amount: 501.20, amount_type: 'fixed', per_unit: 'per_claim',
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
    console.log(`✓ Inserted ${allowances.length} allowances (${allowances.filter(a => a.is_all_purpose).length} all-purpose)`);

    // ── Break entitlements ─────────────────────────────────────────────────────
    // Standard breaks:
    // Rest break: Paid 10-minute rest break every 4 hours.
    // Meal break: Unpaid 30–60 minutes after no more than 5 hours of work.
    const breaks = [
      {
        employment_type: null,
        shift_hours_min: 4.0, shift_hours_max: null,
        break_type: 'rest', break_duration_min: 10, is_paid: true,
        timing_rule: 'One paid 10-minute rest break per 4 hours worked',
        description: 'You are entitled to a paid 10-minute rest break for each 4-hour block of work.',
      },
      {
        employment_type: null,
        shift_hours_min: 5.0, shift_hours_max: null,
        break_type: 'meal', break_duration_min: 30, is_paid: false,
        timing_rule: 'No later than 5 hours after commencing work',
        description: 'If you work more than 5 hours, you must receive an unpaid meal break of 30–60 minutes. If you are not given this break, you must be paid at double time until the break is provided.',
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
    // Two-level question flow:
    //   1. research_role_type — what type of work do you do?
    //   2. Conditional follow-ups for support, interviewing, leadership, research roles
    const questions = [
      {
        award_code: AWARD_CODE,
        question_key: 'research_role_type',
        question_text: 'What type of work do you do?',
        help_text: 'Select the option that best describes your primary role in the market or social research organisation.',
        question_type: 'single',
        stream: null,
        parent_question_key: null,
        parent_answer_key: null,
        sort_order: 1,
        answers: [
          { answer_key: 'trainee', answer_text: 'Trainee — I\'m new to market research and learning the basics', sort_order: 1 },
          { answer_key: 'support', answer_text: 'Support / administration — general admin and clerical support', sort_order: 2 },
          { answer_key: 'interviewer', answer_text: 'Interviewing — I conduct research interviews (phone or face-to-face)', sort_order: 3 },
          { answer_key: 'editor_coder', answer_text: 'Editor / Coder / Keyboard operator — I edit, code, or process research data', sort_order: 4 },
          { answer_key: 'leadership', answer_text: 'Team leader, supervisor, or field manager', sort_order: 5 },
          { answer_key: 'research_pro', answer_text: 'Research professional — assistant, officer, or manager', sort_order: 6 },
        ],
      },
      {
        award_code: AWARD_CODE,
        question_key: 'research_support_year',
        question_text: 'How long have you been in a support role?',
        help_text: 'The award distinguishes between your first year and subsequent years in a support employee classification.',
        question_type: 'single',
        stream: null,
        parent_question_key: 'research_role_type',
        parent_answer_key: 'support',
        sort_order: 2,
        answers: [
          { answer_key: 'first_year', answer_text: 'Less than 1 year in this role', sort_order: 1 },
          { answer_key: 'thereafter', answer_text: '1 year or more in this role', sort_order: 2 },
        ],
      },
      {
        award_code: AWARD_CODE,
        question_key: 'research_interview_type',
        question_text: 'What type of interviewing do you do?',
        help_text: 'Face-to-face and door-to-door interviewers receive a higher rate than telephone/remote interviewers.',
        question_type: 'single',
        stream: null,
        parent_question_key: 'research_role_type',
        parent_answer_key: 'interviewer',
        sort_order: 3,
        answers: [
          { answer_key: 'phone', answer_text: 'Telephone or online — I interview by phone, CATI, or online', sort_order: 1 },
          { answer_key: 'face_to_face', answer_text: 'Face-to-face or door-to-door — I interview people in person', sort_order: 2 },
        ],
      },
      {
        award_code: AWARD_CODE,
        question_key: 'research_leader_role',
        question_text: 'Which best describes your leadership role?',
        help_text: 'Select the level that matches your responsibilities.',
        question_type: 'single',
        stream: null,
        parent_question_key: 'research_role_type',
        parent_answer_key: 'leadership',
        sort_order: 4,
        answers: [
          { answer_key: 'team_leader', answer_text: 'Team leader — I lead a team of interviewers or support staff', sort_order: 1 },
          { answer_key: 'field_supervisor', answer_text: 'Field supervisor — I supervise field interviewing operations', sort_order: 2 },
          { answer_key: 'field_manager', answer_text: 'Field manager — I manage all field operations', sort_order: 3 },
        ],
      },
      {
        award_code: AWARD_CODE,
        question_key: 'research_pro_role',
        question_text: 'Which best describes your research role?',
        help_text: 'Select the level that matches your experience and responsibilities.',
        question_type: 'single',
        stream: null,
        parent_question_key: 'research_role_type',
        parent_answer_key: 'research_pro',
        sort_order: 5,
        answers: [
          { answer_key: 'assistant', answer_text: 'Research assistant — I help design and analyse research projects', sort_order: 1 },
          { answer_key: 'officer', answer_text: 'Research officer — I independently manage and report on research projects', sort_order: 2 },
          { answer_key: 'manager', answer_text: 'Research manager — I manage a research team or department', sort_order: 3 },
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
    console.log('\n✅ MA000030 seed complete');
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
