/**
 * Seed script — Fitness Industry Award 2020 [MA000094]
 * Pay rates effective 1 July 2025 (published 12 February 2026)
 * Source: Fair Work Ombudsman pay guide MA000094 (G00942958)
 *
 * NOTE: The award uses 9 classification levels: L1, L2, L3, L3A, L4, L4A, L5, L6, L7.
 * Because level must be a unique integer per stream, we use internal levels 1–9:
 *   Internal 1=L1, 2=L2, 3=L3, 4=L3A, 5=L4, 6=L4A, 7=L5, 8=L6, 9=L7
 * The award level designation is reflected in the title field.
 *
 * Run after migrate.js: node scripts/seed_ma000094.js
 */
require('dotenv').config();
const pool = require('../src/db/pool');

const AWARD_CODE = 'MA000094';
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
      'Fitness Industry Award 2020',
      EFFECTIVE_DATE,
      'https://awards.fairwork.gov.au/MA000094.html',
    ]);

    // ── Classifications ───────────────────────────────────────────────────────
    // MA000094 has a single 'fitness' stream with 9 levels.
    // Internal levels 1–9 map to Award Level designations L1, L2, L3, L3A, L4, L4A, L5, L6, L7.
    // The "A" sub-levels (3A, 4A) apply where an employee performs the duties of the
    // lower level (3 or 4) AND holds the relevant formal qualification (Cert III or IV).

    const classifications = [
      {
        level: 1, stream: 'fitness',
        title: 'Fitness Industry Employee Level 1',
        description: 'Entry-level role. You work under close supervision following specific instructions and established procedures. You are learning the role.',
        duties: [
          'Reception duties: taking bookings, responding to membership enquiries, selling products',
          'Assisting at general activities and events',
          'General cleaning, gardening, or labouring tasks',
          'Door, cloakroom, or car park duties (not involving cash handling)',
          'Following specific instructions under close supervision',
        ],
        indicative_tasks: ['New reception staff', 'General support staff', 'Door/cloakroom attendant'],
        sort_order: 10,
      },
      {
        level: 2, stream: 'fitness',
        title: 'Fitness Industry Employee Level 2',
        description: 'You have at least 456 hours of training or 6 months at Level 1. Or you hold a swim/water safety or gymnastics qualification. You work under general supervision.',
        duties: [
          'Delivering fitness instruction, swim teaching, or gymnastics coaching under general supervision',
          'Reception, member services, and basic administration',
          'Following established instructions and procedures with general oversight',
          'Swim and water safety instruction (if qualified)',
          'Gymnastics coaching (Gymnastics Australia accredited)',
        ],
        indicative_tasks: ['Beginner instructor', 'Swim teacher (entry-level)', 'Gymnastics coach (accredited)', 'Receptionist (experienced)'],
        sort_order: 20,
      },
      {
        level: 3, stream: 'fitness',
        title: 'Fitness Industry Employee Level 3',
        description: 'You are a qualified instructor, swim teacher, lifeguard, or gymnastics coach working under general supervision within defined areas of responsibility.',
        duties: [
          'Delivering group fitness classes or personal training sessions',
          'Supervising and ensuring safety around pool or gym facilities',
          'Instructing swimming or aquatics programs',
          'Gymnastics coaching at intermediate level',
          'Supervising junior staff within the area of responsibility',
          'Adhering to established guidelines and safety standards',
        ],
        indicative_tasks: ['Group fitness instructor', 'Pool lifeguard', 'Swim teacher', 'Gymnastics coach', 'Fitness floor supervisor'],
        sort_order: 30,
      },
      {
        level: 4, stream: 'fitness',
        title: 'Fitness Industry Employee Level 3A',
        description: 'You perform Level 3 duties AND hold a Certificate III in Fitness or a relevant sport/coaching qualification that you actively apply in your work.',
        duties: [
          'All duties of a Level 3 employee',
          'Applying Certificate III (Fitness) or equivalent qualification in daily work',
          'Designing and delivering fitness programs using formal training',
          'Providing qualified instruction with a higher level of professional knowledge',
        ],
        indicative_tasks: ['Certificate III Fitness Instructor', 'Qualified swim teacher (Cert III)', 'Group fitness instructor (Cert III)'],
        sort_order: 40,
      },
      {
        level: 5, stream: 'fitness',
        title: 'Fitness Industry Employee Level 4',
        description: 'You work under limited supervision, exercising initiative and judgment. You receive broad instructions and your work is checked intermittently rather than constantly.',
        duties: [
          'Advanced swim teaching or aquatics instruction',
          'Senior pool lifeguarding and supervision',
          'Advanced gymnastics coaching',
          'Exercise program design and delivery at an advanced level',
          'Working with reduced supervision and exercising professional judgment',
          'Mentoring and guiding junior instructors',
        ],
        indicative_tasks: ['Advanced swim teacher', 'Senior pool lifeguard', 'Advanced gymnastics coach', 'Senior fitness instructor (no Cert IV)'],
        sort_order: 50,
      },
      {
        level: 6, stream: 'fitness',
        title: 'Fitness Industry Employee Level 4A',
        description: 'You perform Level 4 duties AND hold a Certificate IV in Fitness or an equivalent qualification. Personal trainers with Cert IV are classified at this level.',
        duties: [
          'All duties of a Level 4 employee',
          'Applying Certificate IV (Fitness) or equivalent in daily work',
          'Delivering specialised one-on-one personal training programs',
          'Designing tailored programs for specific client needs and goals',
          'Higher level of technical skill and professional knowledge',
          'Tennis club professional or high-level specialist coach',
        ],
        indicative_tasks: ['Certificate IV Personal Trainer', 'Cert IV Fitness Instructor', 'Tennis club professional', 'Specialist health coach (Cert IV)'],
        sort_order: 60,
      },
      {
        level: 7, stream: 'fitness',
        title: 'Fitness Industry Employee Level 5',
        description: 'You exercise high levels of initiative and judgment under broad instruction. You typically hold a Diploma-level qualification and may supervise Level 4 employees.',
        duties: [
          'Designing and delivering specialised fitness or wellness programs',
          'Working with special populations (e.g. older adults, rehabilitation clients)',
          'Capable of supervising and coordinating Level 4 employees where required',
          'Applying Diploma-level knowledge to deliver advanced programs',
          'Operating with a high degree of autonomy and professional responsibility',
        ],
        indicative_tasks: ['Diploma of Fitness specialist', 'Senior personal trainer (Diploma)', 'Exercise physiologist assistant', 'Senior swimming coordinator'],
        sort_order: 70,
      },
      {
        level: 8, stream: 'fitness',
        title: 'Fitness Industry Employee Level 6',
        description: 'You hold a supervisory or coordinator role, responsible for coordinating a department, area, or team. You exercise sound judgment and leadership.',
        duties: [
          'Coordinating front desk, gym floor, or aquatics department operations',
          'Preparing rosters and managing team members',
          'Training and inducting staff within your area',
          'Handling day-to-day operational issues independently',
          'Maintaining service and program quality standards',
          'Reporting to centre management on team performance',
        ],
        indicative_tasks: ['Aquatics coordinator', 'Front desk coordinator', 'Fitness floor coordinator', 'Department supervisor'],
        sort_order: 80,
      },
      {
        level: 9, stream: 'fitness',
        title: 'Fitness Industry Employee Level 7',
        description: 'You are a centre or operations manager. You supervise, train, and coordinate employees, maintaining service standards and exercising substantial initiative and independent judgment.',
        duties: [
          'Supervising, training, and coordinating employees across the centre',
          'Responsibility for maintaining service and operational standards',
          'Exercising substantial independent initiative and professional judgment',
          'Managing operations with a thorough knowledge of the business',
          'Strategic oversight of staffing, programs, and facility operations',
          'Reporting to senior management or business owners on centre performance',
        ],
        indicative_tasks: ['Fitness centre manager', 'Operations manager', 'Centre general manager (award-level)'],
        sort_order: 90,
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
    // Source: FWO pay guide MA000094, effective 1 July 2025.
    // Internal level → FT/PT hourly rate (adult)
    // Casual rate = FT rate × 1.25 (25% casual loading)
    const baseRates = {
      1: 24.28,  // Award L1
      2: 24.95,  // Award L2
      3: 26.70,  // Award L3
      4: 28.12,  // Award L3A
      5: 29.27,  // Award L4
      6: 30.68,  // Award L4A
      7: 32.34,  // Award L5
      8: 32.06,  // Award L6
      9: 33.31,  // Award L7
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

    // ── Penalty rates ─────────────────────────────────────────────────────────
    // Source: MA000094 clause 29 — Penalty rates
    // No weekday evening loading — ordinary hours Mon–Fri are at base rate.
    // Work outside the ordinary hours span (before 5am or after 11pm Mon–Fri;
    // before 6am or after 9pm Sat–Sun) triggers overtime, not a separate penalty.
    //
    // FT/PT penalty multipliers (applied to FT/PT base rate):
    //   Monday–Friday:  ×1.00 (no penalty)
    //   Saturday:       ×1.25
    //   Sunday:         ×1.50
    //   Public holiday: ×2.50
    //
    // Casual penalty multipliers (applied to casual base rate = FT × 1.25):
    //   Monday–Friday:      ×1.00 of casual base (= 125% of FT)
    //   Saturday/Sunday/PH: ×1.04 of casual base (= 130% of FT)
    //   The casual loading increases from 25% to 30% for weekend/PH ordinary hours.

    const penaltyRates = [
      // ── Full-time ──────────────────────────────────────────────────────────
      {
        employment_type: 'full_time', day_type: 'weekday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.0, addition_per_hour: null,
        description: 'Ordinary weekday rate (Mon–Fri)',
      },
      {
        employment_type: 'full_time', day_type: 'saturday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.25, addition_per_hour: null,
        description: 'Saturday — ×1.25',
      },
      {
        employment_type: 'full_time', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.50, addition_per_hour: null,
        description: 'Sunday — ×1.50',
      },
      {
        employment_type: 'full_time', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.50, addition_per_hour: null,
        description: 'Public holiday — double time and a half (×2.50)',
      },
      // ── Part-time (same as full-time) ──────────────────────────────────────
      {
        employment_type: 'part_time', day_type: 'weekday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.0, addition_per_hour: null,
        description: 'Ordinary weekday rate (Mon–Fri)',
      },
      {
        employment_type: 'part_time', day_type: 'saturday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.25, addition_per_hour: null,
        description: 'Saturday — ×1.25',
      },
      {
        employment_type: 'part_time', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.50, addition_per_hour: null,
        description: 'Sunday — ×1.50',
      },
      {
        employment_type: 'part_time', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.50, addition_per_hour: null,
        description: 'Public holiday — double time and a half (×2.50)',
      },
      // ── Casual ─────────────────────────────────────────────────────────────
      // Casual base rate already includes 25% loading. For Sat/Sun/PH ordinary
      // hours, the casual loading increases to 30% of FT rate, i.e. ×1.04 of
      // the casual base rate (1.30 / 1.25 = 1.04).
      {
        employment_type: 'casual', day_type: 'weekday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.0, addition_per_hour: null,
        description: 'Ordinary casual weekday rate (includes 25% casual loading)',
      },
      {
        employment_type: 'casual', day_type: 'saturday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.04, addition_per_hour: null,
        description: 'Casual Saturday — ×1.04 of casual base (130% of FT rate)',
      },
      {
        employment_type: 'casual', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.04, addition_per_hour: null,
        description: 'Casual Sunday — ×1.04 of casual base (130% of FT rate)',
      },
      {
        employment_type: 'casual', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.04, addition_per_hour: null,
        description: 'Casual public holiday — ×1.04 of casual base (130% of FT rate)',
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
    // MA000094 clause 28 — Overtime
    // Triggered by: (a) >38 hrs/week average; (b) >10 hrs in a single day;
    // (c) work outside ordinary hours span (before 5am/after 11pm Mon–Fri;
    //     before 6am/after 9pm Sat–Sun). This seed implements (a) and (b).
    //
    // FT/PT overtime rates (applied to FT/PT base rate):
    //   Mon–Sat first 2 hrs:  ×1.50
    //   Mon–Sat after 2 hrs:  ×2.00
    //   Sunday all overtime:  ×2.00
    //
    // Casual overtime rates (applied to casual base rate = FT × 1.25):
    //   The dollar amounts in the award are the same as FT (no casual loading on OT).
    //   So relative to the casual base rate: 1.5 FT / 1.25 casual = 1.20× casual base.
    //   Mon–Sat first 2 hrs:  ×1.20 of casual base (= 150% of FT base)
    //   Mon–Sat after 2 hrs:  ×1.60 of casual base (= 200% of FT base)
    //   Sunday all overtime:  ×1.60 of casual base (= 200% of FT base)

    const overtimeRates = [
      // FT/PT weekly
      { employment_type: 'full_time',  threshold_hours: 38, period: 'weekly', multiplier: 1.50, description: 'Weekly overtime — first 2 hours over 38 (×1.50)' },
      { employment_type: 'full_time',  threshold_hours: 40, period: 'weekly', multiplier: 2.00, description: 'Weekly overtime — after 40 hours (×2.00)' },
      { employment_type: 'part_time',  threshold_hours: 38, period: 'weekly', multiplier: 1.50, description: 'Part-time weekly overtime — first 2 hours (×1.50)' },
      { employment_type: 'part_time',  threshold_hours: 40, period: 'weekly', multiplier: 2.00, description: 'Part-time weekly overtime — after 40 hours (×2.00)' },
      // FT/PT daily
      { employment_type: 'full_time',  threshold_hours: 10, period: 'daily',  multiplier: 1.50, description: 'Daily overtime — first 2 hours over 10 (×1.50)' },
      { employment_type: 'full_time',  threshold_hours: 12, period: 'daily',  multiplier: 2.00, description: 'Daily overtime — after 12 hours (×2.00)' },
      { employment_type: 'part_time',  threshold_hours: 10, period: 'daily',  multiplier: 1.50, description: 'Part-time daily overtime — first 2 hours over 10 (×1.50)' },
      { employment_type: 'part_time',  threshold_hours: 12, period: 'daily',  multiplier: 2.00, description: 'Part-time daily overtime — after 12 hours (×2.00)' },
      // Casual weekly (same $ as FT, lower multiplier relative to casual base)
      { employment_type: 'casual', threshold_hours: 38, period: 'weekly', multiplier: 1.20, description: 'Casual weekly overtime — first 2 hours (×1.20 of casual base = 150% of FT)' },
      { employment_type: 'casual', threshold_hours: 40, period: 'weekly', multiplier: 1.60, description: 'Casual weekly overtime — after 40 hours (×1.60 of casual base = 200% of FT)' },
      // Casual daily
      { employment_type: 'casual', threshold_hours: 10, period: 'daily',  multiplier: 1.20, description: 'Casual daily overtime — first 2 hours over 10 (×1.20 of casual base)' },
      { employment_type: 'casual', threshold_hours: 12, period: 'daily',  multiplier: 1.60, description: 'Casual daily overtime — after 12 hours (×1.60 of casual base)' },
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
    // Source: MA000094 clause 20 — Allowances; FWO pay guide effective 1 July 2025.
    const allowances = [
      {
        allowance_type: 'broken_shift',
        name: 'Broken shift allowance',
        description: 'If you work a broken shift (a shift with an unpaid break of more than 1 hour between periods of work), you are entitled to a broken shift allowance per day.',
        trigger_condition: 'Working a broken shift — periods of work separated by more than 1 hour of unpaid time',
        amount: 17.25, amount_type: 'fixed', per_unit: 'per_shift',
      },
      {
        allowance_type: 'first_aid',
        name: 'First aid allowance',
        description: 'If you are the designated first aid officer and hold a current first aid certificate, you receive a daily first aid allowance.',
        trigger_condition: 'Appointed as first aid officer with a current first aid certificate, for each day worked',
        amount: 3.25, amount_type: 'fixed', per_unit: 'per_shift',
      },
      {
        allowance_type: 'leading_hand_1to5',
        name: 'Leading hand / supervisor allowance (1–5 employees)',
        description: 'If you are a leading hand or supervisor responsible for 1 to 5 other employees, you receive this allowance. Full-time: $30.44/week. Part-time/casual: $0.80/hr (max $30.44/week).',
        trigger_condition: 'Acting as leading hand or supervisor responsible for 1 to 5 employees',
        amount: 30.44, amount_type: 'weekly', per_unit: 'per_week',
      },
      {
        allowance_type: 'leading_hand_6to10',
        name: 'Leading hand / supervisor allowance (6–10 employees)',
        description: 'If you are responsible for 6 to 10 employees. Full-time: $41.60/week. Part-time/casual: $1.09/hr (max $41.60/week).',
        trigger_condition: 'Acting as leading hand or supervisor responsible for 6 to 10 employees',
        amount: 41.60, amount_type: 'weekly', per_unit: 'per_week',
      },
      {
        allowance_type: 'leading_hand_11plus',
        name: 'Leading hand / supervisor allowance (11+ employees)',
        description: 'If you are responsible for more than 10 employees. Full-time: $55.81/week. Part-time/casual: $1.47/hr (max $55.81/week).',
        trigger_condition: 'Acting as leading hand or supervisor responsible for more than 10 employees',
        amount: 55.81, amount_type: 'weekly', per_unit: 'per_week',
      },
      {
        allowance_type: 'meal',
        name: 'Meal allowance (overtime)',
        description: 'If you are required to work overtime, you are entitled to a meal allowance for each meal period during overtime. Not payable to casual employees.',
        trigger_condition: 'Overtime worked by FT/PT employees — one meal allowance per meal period during overtime',
        amount: 14.97, amount_type: 'fixed', per_unit: 'per_meal',
      },
      {
        allowance_type: 'vehicle_car',
        name: 'Vehicle allowance (car)',
        description: 'If you are required to use your own car for work purposes, you receive a per-kilometre allowance.',
        trigger_condition: 'Using own car for work purposes at the direction of the employer',
        amount: 0.98, amount_type: 'per_km', per_unit: 'per_km',
      },
      {
        allowance_type: 'vehicle_motorcycle',
        name: 'Vehicle allowance (motorcycle)',
        description: 'If you are required to use your own motorcycle for work purposes, you receive a per-kilometre allowance.',
        trigger_condition: 'Using own motorcycle for work purposes at the direction of the employer',
        amount: 0.32, amount_type: 'per_km', per_unit: 'per_km',
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
    // MA000094 clause 24 — Breaks
    // Rest break: Paid 10-minute break; one before the meal break and one after.
    //   Casual employees working 3 hours or less are not entitled to a rest break.
    //   Using shift_hours_min=4 approximates: 1 break for 4–7.9hr shifts, 2 for 8+hr shifts.
    // Meal break: Unpaid 30–60 minutes, no later than 5 hours after commencing work.
    //   A second meal break applies if work continues 5+ hours after the first one.

    const breaks = [
      {
        employment_type: null,
        shift_hours_min: 4.0, shift_hours_max: null,
        break_type: 'rest', break_duration_min: 10, is_paid: true,
        timing_rule: 'One paid 10-minute rest break per 4-hour block; two breaks for shifts over 8 hours',
        description: 'You are entitled to a paid 10-minute rest break during your shift. Casual employees working 3 hours or less are not entitled to a rest break.',
      },
      {
        employment_type: null,
        shift_hours_min: 5.0, shift_hours_max: null,
        break_type: 'meal', break_duration_min: 30, is_paid: false,
        timing_rule: 'No later than 5 hours after commencing work',
        description: 'If you work more than 5 hours, you must receive an unpaid meal break of 30 to 60 minutes. If you are not given this break, you must be paid at double time until the break is provided.',
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
    // Two-level parent-based question flow for MA000094:
    //   1. fitness_experience — new or experienced?
    //   2. fitness_role — which role/qualification? (shown when fitness_experience = 'experienced')
    const questions = [
      {
        award_code: AWARD_CODE,
        question_key: 'fitness_experience',
        question_text: 'Are you new to the fitness industry?',
        help_text: 'Level 1 applies to employees in their first 6 months (or first 456 hours of training). This covers reception, general support, and operational duties under close supervision.',
        question_type: 'single',
        stream: null,
        parent_question_key: null,
        parent_answer_key: null,
        sort_order: 1,
        answers: [
          { answer_key: 'new', answer_text: 'Yes — I\'m new (less than 6 months or 456 hours of industry training)', sort_order: 1 },
          { answer_key: 'experienced', answer_text: 'No — I have at least 6 months\' experience or a relevant qualification', sort_order: 2 },
        ],
      },
      {
        award_code: AWARD_CODE,
        question_key: 'fitness_role',
        question_text: 'Which best describes your role and qualifications?',
        help_text: 'Choose the option that best matches what you actually do. If you hold a Certificate III, IV, or Diploma that you actively use in your work, select the qualified option.',
        question_type: 'single',
        stream: null,
        parent_question_key: 'fitness_experience',
        parent_answer_key: 'experienced',
        sort_order: 2,
        answers: [
          { answer_key: 'reception_support', answer_text: 'Reception, member services, or general support (experienced)', sort_order: 1 },
          { answer_key: 'instructor_unqualified', answer_text: 'Fitness instructor, swim teacher, lifeguard, or gymnastics coach — no formal certificate', sort_order: 2 },
          { answer_key: 'instructor_cert3', answer_text: 'Fitness instructor or swim teacher with a Certificate III in Fitness or Sport', sort_order: 3 },
          { answer_key: 'advanced_instructor', answer_text: 'Advanced instructor or senior swim teacher with limited supervision (no Cert IV)', sort_order: 4 },
          { answer_key: 'personal_trainer_cert4', answer_text: 'Personal trainer or fitness specialist with a Certificate IV in Fitness', sort_order: 5 },
          { answer_key: 'diploma_qualified', answer_text: 'Fitness specialist with a Diploma in Fitness or Sport Science — high level of autonomy', sort_order: 6 },
          { answer_key: 'coordinator', answer_text: 'Area coordinator, front desk coordinator, or department supervisor', sort_order: 7 },
          { answer_key: 'manager', answer_text: 'Fitness centre or operations manager', sort_order: 8 },
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
    console.log('\n✅ MA000094 seed complete');
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
