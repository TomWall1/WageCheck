/**
 * Seed script — Architects Award 2020 [MA000079]
 * Pay rates effective 1 July 2025 (following 2025 Annual Wage Review — 3.5% increase)
 * Source: Fair Work Ombudsman pay guide MA000079, effective 1 July 2025
 *
 * Run after migrate.js: node scripts/seed_ma000079.js
 */
require('dotenv').config();
const pool = require('../src/db/pool');

const AWARD_CODE = 'MA000079';
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
      'Architects Award 2020',
      EFFECTIVE_DATE,
      'https://www.fairwork.gov.au/employment-conditions/awards/awards-summary/ma000079-summary',
    ]);

    // ── Classifications ───────────────────────────────────────────────────────
    // MA000079 has 4 streams: graduate (4 levels), registered (3 levels),
    // student (6 levels), bachelor_pathway (3 levels). 16 total.

    const classifications = [
      // ── Graduate stream (graduates of architecture) ─────────────────────────
      {
        level: 1, stream: 'graduate',
        title: 'Graduate of Architecture Level 1',
        description: 'Entry-level graduate of architecture. You have completed your architecture degree and are beginning professional practice.',
        duties: [
          'Performing architectural work under supervision',
          'Assisting with design documentation and drafting',
          'Preparing basic drawings and models',
          'Conducting site inspections under direction',
        ],
        indicative_tasks: ['Graduate architect (entry)'],
        sort_order: 10,
      },
      {
        level: 2, stream: 'graduate',
        title: 'Graduate of Architecture Level 2',
        description: 'Graduate of architecture at first pay point. You have progressed beyond entry level and are developing professional skills.',
        duties: [
          'Preparing design documentation with limited supervision',
          'Contributing to design development',
          'Coordinating with consultants under guidance',
          'Conducting site inspections',
        ],
        indicative_tasks: ['Graduate architect (1st pay point)'],
        sort_order: 20,
      },
      {
        level: 3, stream: 'graduate',
        title: 'Graduate of Architecture Level 3',
        description: 'Graduate of architecture at second pay point. You have developed competence in professional architectural practice.',
        duties: [
          'Preparing and reviewing design documentation',
          'Managing smaller project components',
          'Coordinating with consultants and contractors',
          'Conducting and reporting on site inspections',
        ],
        indicative_tasks: ['Graduate architect (2nd pay point)'],
        sort_order: 30,
      },
      {
        level: 4, stream: 'graduate',
        title: 'Graduate of Architecture Level 4 (Level 2a)',
        description: 'Experienced graduate of architecture (Level 2a). You are an experienced graduate approaching registration eligibility.',
        duties: [
          'Managing design documentation for projects',
          'Supervising junior graduates',
          'Leading coordination with consultants',
          'Taking responsibility for project delivery components',
        ],
        indicative_tasks: ['Experienced graduate architect (Level 2a)'],
        sort_order: 40,
      },
      // ── Registered stream (registered architects) ───────────────────────────
      {
        level: 1, stream: 'registered',
        title: 'Registered Architect Level 1 (Level 2b entry)',
        description: 'Entry-level registered architect (Level 2b entry). You hold registration as an architect.',
        duties: [
          'Managing architectural projects',
          'Preparing and certifying design documentation',
          'Leading design and project teams',
          'Managing client relationships',
          'Ensuring compliance with building codes and standards',
        ],
        indicative_tasks: ['Registered architect (entry)'],
        sort_order: 50,
      },
      {
        level: 2, stream: 'registered',
        title: 'Registered Architect Level 2',
        description: 'Registered architect at first pay point. You have experience managing architectural projects independently.',
        duties: [
          'Leading complex architectural projects',
          'Mentoring and supervising graduates',
          'Managing multi-disciplinary project teams',
          'Overseeing compliance and quality assurance',
        ],
        indicative_tasks: ['Registered architect (1st pay point)'],
        sort_order: 60,
      },
      {
        level: 3, stream: 'registered',
        title: 'Registered Architect Level 3',
        description: 'Registered architect at second pay point. You are an experienced registered architect with a strong track record.',
        duties: [
          'Leading major or complex projects',
          'Strategic design leadership',
          'Managing significant client relationships',
          'Contributing to practice development',
        ],
        indicative_tasks: ['Registered architect (2nd pay point)'],
        sort_order: 70,
      },
      // ── Student stream (students of architecture) ───────────────────────────
      {
        level: 1, stream: 'student',
        title: 'Student of Architecture Level 1',
        description: 'Student of architecture under 21, in the first 13 weeks of employment.',
        duties: [
          'Assisting with basic architectural tasks under close supervision',
          'Performing general office and studio duties',
          'Learning professional practice fundamentals',
        ],
        indicative_tasks: ['Architecture student (under 21, first 13 weeks)'],
        sort_order: 80,
      },
      {
        level: 2, stream: 'student',
        title: 'Student of Architecture Level 2',
        description: 'Student of architecture under 21, employed for 14 to 26 weeks.',
        duties: [
          'Assisting with drafting and documentation under supervision',
          'Contributing to design research and analysis',
          'Performing studio and office support tasks',
        ],
        indicative_tasks: ['Architecture student (under 21, 14–26 weeks)'],
        sort_order: 90,
      },
      {
        level: 3, stream: 'student',
        title: 'Student of Architecture Level 3',
        description: 'Student of architecture under 21, employed for 27 to 52 weeks.',
        duties: [
          'Preparing basic drawings under guidance',
          'Assisting with project documentation',
          'Participating in design development tasks',
        ],
        indicative_tasks: ['Architecture student (under 21, 27–52 weeks)'],
        sort_order: 100,
      },
      {
        level: 4, stream: 'student',
        title: 'Student of Architecture Level 4',
        description: 'Student of architecture under 21, in the second year of employment.',
        duties: [
          'Preparing drawings and documentation with limited supervision',
          'Assisting with design development',
          'Contributing to project coordination tasks',
        ],
        indicative_tasks: ['Architecture student (under 21, 2nd year)'],
        sort_order: 110,
      },
      {
        level: 5, stream: 'student',
        title: 'Student of Architecture Level 5',
        description: 'Student of architecture under 21, in the third year of employment.',
        duties: [
          'Preparing documentation with increasing independence',
          'Contributing to design and project work',
          'Assisting with consultant coordination',
        ],
        indicative_tasks: ['Architecture student (under 21, 3rd year)'],
        sort_order: 120,
      },
      {
        level: 6, stream: 'student',
        title: 'Student of Architecture Level 6',
        description: 'Student of architecture aged 21 years and over.',
        duties: [
          'Preparing documentation and drawings',
          'Contributing to design and project coordination',
          'Assisting registered architects with project delivery',
        ],
        indicative_tasks: ['Architecture student (21 years and over)'],
        sort_order: 130,
      },
      // ── Bachelor pathway stream ─────────────────────────────────────────────
      {
        level: 1, stream: 'bachelor_pathway',
        title: 'Bachelor Pathway Level 1',
        description: 'First year — holds a bachelor\'s degree in architecture and is on a pathway to a master\'s degree.',
        duties: [
          'Performing architectural work under supervision',
          'Assisting with design documentation and drafting',
          'Learning professional practice while pursuing further study',
        ],
        indicative_tasks: ['Bachelor pathway architect (1st year)'],
        sort_order: 140,
      },
      {
        level: 2, stream: 'bachelor_pathway',
        title: 'Bachelor Pathway Level 2',
        description: 'Second year — holds a bachelor\'s degree in architecture and is progressing through a master\'s pathway.',
        duties: [
          'Preparing design documentation with limited supervision',
          'Contributing to design development',
          'Coordinating with team members on project tasks',
        ],
        indicative_tasks: ['Bachelor pathway architect (2nd year)'],
        sort_order: 150,
      },
      {
        level: 3, stream: 'bachelor_pathway',
        title: 'Bachelor Pathway Level 3',
        description: 'Third year — holds a bachelor\'s degree in architecture and is in the final stage of the master\'s pathway.',
        duties: [
          'Preparing and reviewing documentation',
          'Managing smaller project components',
          'Coordinating with consultants under guidance',
        ],
        indicative_tasks: ['Bachelor pathway architect (3rd year)'],
        sort_order: 160,
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
    // Source: FWO pay guide MA000079, effective 1 July 2025.
    // Casual rate = adult FT/PT rate × 1.25 (25% casual loading).
    const baseRates = {
      graduate: { 1: 32.84, 2: 34.58, 3: 36.31, 4: 37.97 },
      registered: { 1: 37.97, 2: 39.14, 3: 40.32 },
      student: { 1: 11.49, 2: 16.42, 3: 21.35, 4: 22.99, 5: 24.63, 6: 24.95 },
      bachelor_pathway: { 1: 27.91, 2: 29.56, 3: 31.20 },
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

    // ── Penalty rates ─────────────────────────────────────────────────────────
    // Source: MA000079 — Architects Award 2020
    // FT/PT: No Saturday/Sunday penalties. Public holiday: ×1.5.
    // Casual: Public holiday: ×1.2 of casual rate (= ×1.5 of FT rate).
    const penaltyRates = [
      // ── Full-time ──────────────────────────────────────────────────────────
      {
        employment_type: 'full_time', day_type: 'weekday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.0, addition_per_hour: null,
        description: 'Ordinary weekday rate',
      },
      {
        employment_type: 'full_time', day_type: 'saturday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.0, addition_per_hour: null,
        description: 'Saturday — no penalty (×1.0)',
      },
      {
        employment_type: 'full_time', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.0, addition_per_hour: null,
        description: 'Sunday — no penalty (×1.0)',
      },
      {
        employment_type: 'full_time', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.50, addition_per_hour: null,
        description: 'Public holiday — time and a half (×1.5)',
      },
      // ── Part-time (same as full-time) ──────────────────────────────────────
      {
        employment_type: 'part_time', day_type: 'weekday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.0, addition_per_hour: null,
        description: 'Ordinary weekday rate',
      },
      {
        employment_type: 'part_time', day_type: 'saturday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.0, addition_per_hour: null,
        description: 'Saturday — no penalty (×1.0)',
      },
      {
        employment_type: 'part_time', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.0, addition_per_hour: null,
        description: 'Sunday — no penalty (×1.0)',
      },
      {
        employment_type: 'part_time', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.50, addition_per_hour: null,
        description: 'Public holiday — time and a half (×1.5)',
      },
      // ── Casual ─────────────────────────────────────────────────────────────
      // Casual base rate already includes 25% loading. Multipliers relative to casual base.
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
        description: 'Casual Saturday — no penalty (×1.0 of casual base)',
      },
      {
        employment_type: 'casual', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.0, addition_per_hour: null,
        description: 'Casual Sunday — no penalty (×1.0 of casual base)',
      },
      {
        employment_type: 'casual', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.20, addition_per_hour: null,
        description: 'Casual public holiday — ×1.20 of casual base (150% of FT rate)',
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
    // MA000079 — flat ×1.5 overtime rate with no ×2.0 tier.
    // Daily threshold: 7.6 hours. Weekly threshold: 38 hours.
    // Both tiers set to ×1.5 (no double-time tier).
    const overtimeRates = [
      // ── Full-time ──────────────────────────────────────────────────────────
      {
        employment_type: 'full_time',
        threshold_hours: 7.6, period: 'daily',
        multiplier: 1.5,
        description: 'Daily overtime — after 7.6 hours (×1.5)',
      },
      {
        employment_type: 'full_time',
        threshold_hours: 38, period: 'weekly',
        multiplier: 1.5,
        description: 'Weekly overtime — after 38 hours (×1.5)',
      },
      // ── Part-time ──────────────────────────────────────────────────────────
      {
        employment_type: 'part_time',
        threshold_hours: 7.6, period: 'daily',
        multiplier: 1.5,
        description: 'Part-time daily overtime — after 7.6 hours (×1.5)',
      },
      {
        employment_type: 'part_time',
        threshold_hours: 38, period: 'weekly',
        multiplier: 1.5,
        description: 'Part-time weekly overtime — after 38 hours (×1.5)',
      },
      // ── Casual ─────────────────────────────────────────────────────────────
      {
        employment_type: 'casual',
        threshold_hours: 7.6, period: 'daily',
        multiplier: 1.5,
        description: 'Casual daily overtime — after 7.6 hours (×1.5)',
      },
      {
        employment_type: 'casual',
        threshold_hours: 38, period: 'weekly',
        multiplier: 1.5,
        description: 'Casual weekly overtime — after 38 hours (×1.5)',
      },
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
    // Source: MA000079 — Architects Award 2020
    const allowances = [
      {
        allowance_type: 'vehicle_car',
        name: 'Vehicle allowance (car)',
        description: 'If you are required to use your own car for work purposes, you are entitled to a per-kilometre allowance.',
        trigger_condition: 'Using own car for work purposes',
        amount: 0.98, amount_type: 'per_km', per_unit: 'per_km',
      },
      {
        allowance_type: 'meal_travel',
        name: 'Meal allowance (air travel)',
        description: 'If you are required to travel by air for work, you are entitled to a meal allowance per meal.',
        trigger_condition: 'Travelling by air for work purposes',
        amount: 12.07, amount_type: 'fixed', per_unit: 'per_meal',
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
    // MA000079 — Rest: 10 min paid per 4 hours. Meal: 30 min unpaid after 5 hours.
    const breaks = [
      {
        employment_type: null,
        shift_hours_min: 4.0, shift_hours_max: null,
        break_type: 'rest', break_duration_min: 10, is_paid: true,
        timing_rule: 'One paid 10-minute rest break per 4 hours worked',
        description: 'For shifts of 4 hours or more, you are entitled to a paid 10-minute rest break.',
      },
      {
        employment_type: null,
        shift_hours_min: 5.0, shift_hours_max: null,
        break_type: 'meal', break_duration_min: 30, is_paid: false,
        timing_rule: 'No later than 5 hours after starting work',
        description: 'If you work more than 5 hours continuously, you must be given an unpaid meal break of at least 30 minutes.',
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
    // Parent-gated question flow for MA000079:
    //   Q1: arch_stream — which qualifications?
    //   Q2: student_age — are you 21+? (parent: arch_stream=student)
    //   Q3: student_experience — how long employed? (parent: student_age=no)
    //   Q4: graduate_level — which pay point? (parent: arch_stream=graduate)
    //   Q5: registered_level — which pay point? (parent: arch_stream=registered)
    //   Q6: bachelor_year — which year? (parent: arch_stream=bachelor_pathway)
    const questions = [
      {
        award_code: AWARD_CODE,
        question_key: 'arch_stream',
        question_text: 'Which best describes your qualifications?',
        help_text: 'Select the category that matches your current qualifications and registration status.',
        question_type: 'single',
        stream: null,
        parent_question_key: null,
        parent_answer_key: null,
        sort_order: 1,
        answers: [
          { answer_key: 'student', answer_text: 'Student of architecture — currently studying architecture', sort_order: 1 },
          { answer_key: 'bachelor_pathway', answer_text: 'Bachelor\'s degree holder on a pathway to Master\'s', sort_order: 2 },
          { answer_key: 'graduate', answer_text: 'Graduate of architecture — completed degree, not yet registered', sort_order: 3 },
          { answer_key: 'registered', answer_text: 'Registered architect', sort_order: 4 },
        ],
      },
      {
        award_code: AWARD_CODE,
        question_key: 'student_age',
        question_text: 'Are you 21 years or older?',
        help_text: 'Students aged 21 and over receive a higher rate than those under 21.',
        question_type: 'single',
        stream: null,
        parent_question_key: 'arch_stream',
        parent_answer_key: 'student',
        sort_order: 2,
        answers: [
          { answer_key: 'yes', answer_text: 'Yes — I am 21 years or older', sort_order: 1 },
          { answer_key: 'no', answer_text: 'No — I am under 21', sort_order: 2 },
        ],
      },
      {
        award_code: AWARD_CODE,
        question_key: 'student_experience',
        question_text: 'How long have you been employed?',
        help_text: 'Your pay rate depends on how long you have been employed as a student of architecture.',
        question_type: 'single',
        stream: null,
        parent_question_key: 'student_age',
        parent_answer_key: 'no',
        sort_order: 3,
        answers: [
          { answer_key: 'first_13weeks', answer_text: 'First 13 weeks', sort_order: 1 },
          { answer_key: 'weeks_14_26', answer_text: '14 to 26 weeks', sort_order: 2 },
          { answer_key: 'weeks_27_52', answer_text: '27 to 52 weeks', sort_order: 3 },
          { answer_key: 'year_2', answer_text: '2nd year of employment', sort_order: 4 },
          { answer_key: 'year_3', answer_text: '3rd year of employment', sort_order: 5 },
        ],
      },
      {
        award_code: AWARD_CODE,
        question_key: 'graduate_level',
        question_text: 'Which pay point applies?',
        help_text: 'Your pay point depends on your experience as a graduate of architecture.',
        question_type: 'single',
        stream: null,
        parent_question_key: 'arch_stream',
        parent_answer_key: 'graduate',
        sort_order: 4,
        answers: [
          { answer_key: 'entry', answer_text: 'Entry level — just started as a graduate', sort_order: 1 },
          { answer_key: 'pay_point_1', answer_text: '1st pay point', sort_order: 2 },
          { answer_key: 'pay_point_2', answer_text: '2nd pay point', sort_order: 3 },
          { answer_key: 'experienced', answer_text: 'Experienced graduate (Level 2a)', sort_order: 4 },
        ],
      },
      {
        award_code: AWARD_CODE,
        question_key: 'registered_level',
        question_text: 'Which pay point applies?',
        help_text: 'Your pay point depends on your experience as a registered architect.',
        question_type: 'single',
        stream: null,
        parent_question_key: 'arch_stream',
        parent_answer_key: 'registered',
        sort_order: 5,
        answers: [
          { answer_key: 'entry', answer_text: 'Entry level — newly registered', sort_order: 1 },
          { answer_key: 'pay_point_1', answer_text: '1st pay point', sort_order: 2 },
          { answer_key: 'pay_point_2', answer_text: '2nd pay point', sort_order: 3 },
        ],
      },
      {
        award_code: AWARD_CODE,
        question_key: 'bachelor_year',
        question_text: 'Which year of experience?',
        help_text: 'Your pay rate depends on which year you are in the bachelor pathway.',
        question_type: 'single',
        stream: null,
        parent_question_key: 'arch_stream',
        parent_answer_key: 'bachelor_pathway',
        sort_order: 6,
        answers: [
          { answer_key: 'year_1', answer_text: '1st year', sort_order: 1 },
          { answer_key: 'year_2', answer_text: '2nd year', sort_order: 2 },
          { answer_key: 'year_3', answer_text: '3rd year', sort_order: 3 },
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
    console.log('\n✅ MA000079 seed complete');
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
