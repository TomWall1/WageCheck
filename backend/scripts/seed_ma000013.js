/**
 * Seed script — Racing Clubs Events Award 2020 [MA000013]
 * Pay rates effective first full pay period on or after 14 October 2025
 * Source: Fair Work Ombudsman pay guide MA000013 (G00132995), published 14 Oct 2025
 *
 * KEY FACTS:
 *   - Covers horse and greyhound racing venue employers Australia-wide.
 *   - Three employee groups:
 *       1. Racecourse Attendants (Introductory + Grades 1–4) — FT, PT, or casual
 *       2. Raceday Officials (Grades 1–4) — FT, PT, or casual
 *       3. Liquor employees (bar attendant, cashier, glass collector) — CASUAL ONLY,
 *          all-inclusive rates (loading, penalties, leave all built-in per clause 12.9).
 *   - Overtime: >38 hrs/week OR >8 hrs/day. First 2 hrs ×1.50, after ×2.00 (FT/PT).
 *     Casual non-liquor: ×1.40/×1.80 of casual base (= 175%/225% of FT base ÷ 1.25).
 *     Casual liquor: ×1.75/×2.25 of their Mon–Sat all-in rate — overridden in calculator.
 *   - No Saturday penalty (FT/PT or casual) — Saturday is ordinary time.
 *   - Sunday: FT/PT ×2.00, casual non-liquor ×1.60 of casual base (= 200% FT ÷ 1.25).
 *   - Public holiday: FT/PT ×2.50, casual non-liquor ×2.00 of casual base (= 250% FT ÷ 1.25).
 *   - Night cleaning (11pm–7am, Mon–Sat, casual non-liquor only): ×1.24 of casual base
 *     (= 155% FT base ÷ 1.25).
 *   - Junior rates (non-liquor, clause 17.2): under-19 = 75% of introductory rate ($18.21 FT).
 *     NOTE: unlike most awards, the 75% is applied to the INTRODUCTORY rate, not the
 *     employee's own classification rate. The calculator overrides the base rate for
 *     MA000013 juniors rather than using a simple multiplier.
 *   - Casual loading: 25% for non-liquor employees.
 *   - Minimum engagement: 4 hours for all employees (casual and permanent).
 *   - Meal allowance (overtime): $14.62 per meal when OT extends past ordinary hours.
 *
 * Adult FT rates:
 *   Introductory: $24.28 | Grade 1 RA: $24.95 | Grade 2 RA: $25.85 | Grade 3 RA: $26.70
 *   Grade 4 RA: $28.12 | Grade 1 RO: $28.12 | Grade 2 RO: $29.00 | Grade 3 RO: $29.88
 *   Grade 4 RO: $30.68
 *   Liquor adult (casual, all-in): $34.84 Mon–Sat | $47.14 Sunday | $58.97 PH
 *   Liquor junior under-19 (casual, all-in): $27.86 Mon–Sat | $37.72 Sunday | $47.18 PH
 *
 * Run after migrate.js: node scripts/seed_ma000013.js
 */
require('dotenv').config();
const pool = require('../src/db/pool');

const AWARD_CODE = 'MA000013';
const EFFECTIVE_DATE = '2025-10-14';

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
      'Racing Clubs Events Award 2020',
      EFFECTIVE_DATE,
      'https://awards.fairwork.gov.au/MA000013.html',
    ]);

    // ── Classifications ────────────────────────────────────────────────────────
    // Stream 'racecourse': Introductory (level 0) + Grade 1–4 Racecourse Attendant (levels 1–4)
    // Stream 'official':   Grade 1–4 Raceday Official (levels 1–4)
    // Stream 'liquor':     Adult bar attendant/cashier/glass collector (level 1)
    //                      Under-19 glass collector (level 2)
    const classifications = [
      // ── Racecourse Attendants ─────────────────────────────────────────────
      {
        level: 0, stream: 'racecourse',
        title: 'Introductory Level Employee',
        description: 'You are new to racecourse work and have not yet demonstrated Grade 1 competencies. You receive on-the-job training for up to 3 months before progressing to Grade 1.',
        duties: [
          'Receiving on-the-job training in racecourse duties',
          'Learning basic racecourse attendant tasks under direct supervision',
          'Assisting with entry-level tasks as directed',
          'Building competencies needed to progress to Grade 1',
        ],
        indicative_tasks: ['New racecourse worker (first 3 months)'],
        sort_order: 5,
      },
      {
        level: 1, stream: 'racecourse',
        title: 'Grade 1 Racecourse Attendant',
        description: 'You perform basic racecourse duties that do not involve handling cash. You work under supervision.',
        duties: [
          'Door or gate attendant duties',
          'General attendance and cleaning duties',
          'Parking attendant (not handling cash)',
          'Ticket examination or taking',
          'Turnstile duties (not handling cash)',
          'Ushering patrons to seating areas',
          'Numbers room, parade ring, or catching pen attendance',
          'Kennel attendant duties (greyhound meetings)',
        ],
        indicative_tasks: ['Gate attendant', 'Door attendant', 'Usher', 'Parking attendant (no cash)', 'Kennel attendant', 'Turnstile attendant (no cash)'],
        sort_order: 10,
      },
      {
        level: 2, stream: 'racecourse',
        title: 'Grade 2 Racecourse Attendant',
        description: 'You perform racecourse duties that include handling cash, selling tickets or programmes, or providing race-day information services.',
        duties: [
          'Parking attendant duties handling cash',
          'Cloakroom duties handling cash',
          'Programme selling',
          'Raceday office assistance (general)',
          'Scratching board attendance',
          'Teleprint or semaphore board operation',
          'Ticket or token selling',
          'EFTPOS operator',
          'General administration or sales',
          'Tour guide duties',
          'Bookmakers\' price clerk',
        ],
        indicative_tasks: ['Ticket seller', 'Programme seller', 'EFTPOS operator', 'Cash parking attendant', 'Raceday office assistant'],
        sort_order: 20,
      },
      {
        level: 3, stream: 'racecourse',
        title: 'Grade 3 Racecourse Attendant',
        description: 'You perform specialist racecourse duties, handle complex transactions, or supervise between 1 and 9 employees.',
        duties: [
          'Assistant starter duties',
          'Barrier attendant duties',
          'Crowd control duties',
          'Lure driver (greyhound meetings)',
          'Kennel supervision (greyhound meetings)',
          'Raceday office duties including processing acceptances or wages',
          'Ticket selling with computer terminal and advance bookings',
          'Swab attendant',
          'Raceday veterinary assistant',
          'Early gates operation',
          'Supervision of 1 to 9 employees',
        ],
        indicative_tasks: ['Barrier attendant', 'Crowd controller', 'Lure driver', 'Swab attendant', 'Kennel supervisor', 'Supervisor (up to 9 staff)'],
        sort_order: 30,
      },
      {
        level: 4, stream: 'racecourse',
        title: 'Grade 4 Racecourse Attendant',
        description: 'You perform specialist or trade-level racecourse duties, or supervise 10 or more employees.',
        duties: [
          'Farrier duties',
          'Starter duties (horse racing)',
          'Mobile barrier driving',
          'Stewards patrol video camera operation',
          'Supervision of 10 or more employees',
        ],
        indicative_tasks: ['Farrier', 'Starter (horse racing)', 'Mobile barrier driver', 'Patrol camera operator', 'Supervisor (10+ staff)'],
        sort_order: 40,
      },
      // ── Raceday Officials ─────────────────────────────────────────────────
      {
        level: 1, stream: 'official',
        title: 'Grade 1 Raceday Official',
        description: 'You perform entry-level official duties on racedays.',
        duties: [
          'Ground announcer duties',
          'Bird cage attendance',
        ],
        indicative_tasks: ['Ground announcer', 'Bird cage attendant'],
        sort_order: 50,
      },
      {
        level: 2, stream: 'official',
        title: 'Grade 2 Raceday Official',
        description: 'You perform official duties requiring specialist knowledge of racing procedures.',
        duties: [
          'Racecourse inspector duties',
          'Betting supervisor duties (assistant)',
          'Assistant clerk of scales',
          'Identification official',
          'Assistant clerk of the course',
          'Timekeeper (race meetings)',
        ],
        indicative_tasks: ['Racecourse inspector', 'Assistant clerk of scales', 'Timekeeper', 'Identification official'],
        sort_order: 60,
      },
      {
        level: 3, stream: 'official',
        title: 'Grade 3 Raceday Official',
        description: 'You hold senior official responsibilities on racedays.',
        duties: [
          'Chief course inspector duties',
          'Clerk of scales',
          'Chief betting supervisor',
          'Clerk of the course',
          'Assistant judge duties',
        ],
        indicative_tasks: ['Clerk of scales', 'Chief inspector', 'Clerk of the course', 'Chief betting supervisor'],
        sort_order: 70,
      },
      {
        level: 4, stream: 'official',
        title: 'Grade 4 Raceday Official',
        description: 'You perform the most senior official roles on racedays.',
        duties: [
          'Raceday judge duties',
          'Racecaller duties',
        ],
        indicative_tasks: ['Raceday judge', 'Racecaller'],
        sort_order: 80,
      },
      // ── Liquor Employees (always casual, all-in rates per clause 12) ───────
      {
        level: 1, stream: 'liquor',
        title: 'Bar Attendant / Cashier / Adult Glass Collector',
        description: 'You work in the bar or liquor service area at race meetings. Liquor employees are always engaged as casuals. Your rate is all-inclusive — it already incorporates the casual loading, weekend penalties, and leave entitlements. No additional casual loading is added on top.',
        duties: [
          'Serving alcoholic and non-alcoholic beverages at the bar',
          'Operating cash registers and EFTPOS for bar transactions',
          'Collecting and returning empty glasses to the bar',
          'Maintaining cleanliness of bar and service areas',
          'Responsible service of alcohol (RSA required)',
        ],
        indicative_tasks: ['Bar attendant', 'Bar cashier', 'Adult glass collector', 'Bar service person'],
        sort_order: 90,
      },
      {
        level: 2, stream: 'liquor',
        title: 'Junior Glass Collector (Under 19 Years)',
        description: 'You are under 19 years old and collect glasses at race meetings. Like all liquor employees, you are engaged as a casual. Your rate is all-inclusive — it already incorporates casual loading and leave entitlements.',
        duties: [
          'Collecting and returning empty glasses to the bar',
          'Maintaining cleanliness of bar and service areas',
        ],
        indicative_tasks: ['Junior glass collector (under 19)'],
        sort_order: 95,
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

    // ── Pay rates ──────────────────────────────────────────────────────────────
    // Non-liquor FT rates (verified from pay guide, effective 14 Oct 2025):
    //   Introductory: $24.28 | G1 RA: $24.95 | G2 RA: $25.85 | G3 RA: $26.70
    //   G4 RA: $28.12  | G1 RO: $28.12 | G2 RO: $29.00 | G3 RO: $29.88 | G4 RO: $30.68
    // Casual = FT × 1.25 (non-liquor only).
    // Liquor casual rates (all-in, Mon–Sat): Adult $34.84, Junior (under 19) $27.86.
    //   These are stored as the 'base_hourly' for casual. Sunday/PH additions are in
    //   penalty_rates (as addition_per_hour overrides for the liquor stream in calculator).
    const nonLiquorRates = {
      '0_racecourse': 24.28,  // Introductory
      '1_racecourse': 24.95,  // Grade 1 RA
      '2_racecourse': 25.85,  // Grade 2 RA
      '3_racecourse': 26.70,  // Grade 3 RA
      '4_racecourse': 28.12,  // Grade 4 RA
      '1_official':   28.12,  // Grade 1 RO (same rate as Grade 4 RA)
      '2_official':   29.00,  // Grade 2 RO
      '3_official':   29.88,  // Grade 3 RO
      '4_official':   30.68,  // Grade 4 RO
    };

    const classResult = await client.query(
      'SELECT id, level, stream FROM classifications WHERE award_code = $1',
      [AWARD_CODE]
    );

    for (const cls of classResult.rows) {
      if (cls.stream === 'liquor') {
        // Liquor employees: casual-only, all-in Mon–Sat rate as base_hourly.
        // Adult (level 1): $34.84/hr, Junior under-19 (level 2): $27.86/hr
        const liquorCasualRate = cls.level === 1 ? 34.84 : 27.86;
        await client.query(`
          INSERT INTO pay_rates (award_code, classification_id, employment_type, rate_type, rate_amount, effective_date)
          VALUES ($1, $2, 'casual', 'base_hourly', $3, $4)
          ON CONFLICT (award_code, classification_id, employment_type, rate_type, effective_date)
          DO UPDATE SET rate_amount = EXCLUDED.rate_amount
        `, [AWARD_CODE, cls.id, liquorCasualRate, EFFECTIVE_DATE]);
        continue;
      }

      const key = `${cls.level}_${cls.stream}`;
      const baseRate = nonLiquorRates[key];
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
    // IMPORTANT: Liquor employees use all-in rates — their Sunday/PH additions are NOT
    // stored here. The calculator overrides penalty rates for the liquor stream using a
    // special case (similar to MA000003 Grade 1 Sunday override). Sunday and PH additions
    // for liquor are: adult Sun +$12.30, adult PH +$24.13; junior Sun +$9.86, junior PH +$19.32.
    //
    // What IS stored here (for non-liquor employees):
    //
    // FT/PT multipliers (verified from pay guide, L1 adult base $24.28):
    //   Weekday ordinary (any time):  ×1.00
    //   Saturday (all day):           ×1.00  (no Saturday penalty — same as weekday)
    //   Sunday (all day):             ×2.00  ($24.28 × 2.0 = $48.56 ✓)
    //   Public holiday (all day):     ×2.50  ($24.28 × 2.5 = $60.70 ✓)
    //
    // Casual multipliers (applied to casual base = FT × 1.25 = $30.35 for Introductory):
    //   Weekday ordinary:             ×1.00 (casual loading already in base)
    //   Saturday:                     ×1.00 (same as weekday for casual)
    //   Sunday:                       ×1.60 ($30.35 × 1.60 = $48.56 = 200% of FT base ÷ 1.25 ✓)
    //   Public holiday:               ×2.00 ($30.35 × 2.00 = $60.70 = 250% of FT base ÷ 1.25 ✓)
    //   Night cleaning (11pm–7am):    ×1.24 ($30.35 × 1.24 = $37.63 = 155% of FT base ÷ 1.25 ✓)
    //     Applied to day_type='weekday' AND 'saturday' with time band 23:00–07:00.
    //     Calculator takes max per minute, so night cleaning (1.24) beats ordinary (1.0) on weekdays.
    //     On Sunday, Sunday rate (1.60) beats night cleaning (1.24).

    const penaltyRates = [
      // ── Full-time / Part-time ────────────────────────────────────────────────
      { employment_type: 'full_time',  day_type: 'weekday',        time_band_start: null,    time_band_end: null,    multiplier: 1.00, description: 'Ordinary weekday rate (×1.00)' },
      { employment_type: 'full_time',  day_type: 'saturday',       time_band_start: null,    time_band_end: null,    multiplier: 1.00, description: 'Saturday — no penalty (same as weekday, ×1.00)' },
      { employment_type: 'full_time',  day_type: 'sunday',         time_band_start: null,    time_band_end: null,    multiplier: 2.00, description: 'Sunday — double time (×2.00)' },
      { employment_type: 'full_time',  day_type: 'public_holiday', time_band_start: null,    time_band_end: null,    multiplier: 2.50, description: 'Public holiday — double time and a half (×2.50)' },
      { employment_type: 'part_time',  day_type: 'weekday',        time_band_start: null,    time_band_end: null,    multiplier: 1.00, description: 'Ordinary weekday rate (×1.00)' },
      { employment_type: 'part_time',  day_type: 'saturday',       time_band_start: null,    time_band_end: null,    multiplier: 1.00, description: 'Saturday — no penalty (same as weekday, ×1.00)' },
      { employment_type: 'part_time',  day_type: 'sunday',         time_band_start: null,    time_band_end: null,    multiplier: 2.00, description: 'Sunday — double time (×2.00)' },
      { employment_type: 'part_time',  day_type: 'public_holiday', time_band_start: null,    time_band_end: null,    multiplier: 2.50, description: 'Public holiday — double time and a half (×2.50)' },
      // ── Casual non-liquor ────────────────────────────────────────────────────
      { employment_type: 'casual',     day_type: 'weekday',        time_band_start: null,    time_band_end: null,    multiplier: 1.00, description: 'Ordinary casual weekday (incl. 25% casual loading)' },
      { employment_type: 'casual',     day_type: 'saturday',       time_band_start: null,    time_band_end: null,    multiplier: 1.00, description: 'Casual Saturday (same as weekday — no Saturday penalty)' },
      { employment_type: 'casual',     day_type: 'sunday',         time_band_start: null,    time_band_end: null,    multiplier: 1.60, description: 'Casual Sunday (×1.60 of casual base = ×2.00 of FT base)' },
      { employment_type: 'casual',     day_type: 'public_holiday', time_band_start: null,    time_band_end: null,    multiplier: 2.00, description: 'Casual public holiday (×2.00 of casual base = ×2.50 of FT base)' },
      // Night cleaning: 11pm–7am Mon–Sat casual only (×1.24 = 155% FT base ÷ 1.25)
      { employment_type: 'casual',     day_type: 'weekday',        time_band_start: '23:00', time_band_end: '07:00', multiplier: 1.24, description: 'Night cleaning (11pm–7am weekday, casual) — ×1.24 of casual base' },
      { employment_type: 'casual',     day_type: 'saturday',       time_band_start: '23:00', time_band_end: '07:00', multiplier: 1.24, description: 'Night cleaning (11pm–7am Saturday, casual) — ×1.24 of casual base' },
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
    // Source: MA000013 Clause 21.
    // Threshold: >38 hours per week OR >8 hours on any day.
    // FT/PT rates: first 2 hrs ×1.50, after 2 hrs ×2.00.
    //   Weekly: 38h→40h @ ×1.50, 40h+ @ ×2.00
    //   Daily:  8h→10h @ ×1.50, 10h+ @ ×2.00
    //
    // Casual non-liquor OT (clause 21.3):
    //   = 175%/225% of FT minimum rate, expressed as multiplier of casual base:
    //   ×1.40 (175÷125) / ×1.80 (225÷125) for first 2 hrs / after.
    //
    // Casual liquor OT: ×1.75/×2.25 of Mon–Sat all-in rate.
    //   Stored for non-liquor casual here (×1.40/×1.80); calculator overrides to ×1.75/×2.25
    //   for the liquor stream (same override block that handles Sunday/PH additions).
    const overtimeRates = [
      { employment_type: 'full_time',  threshold_hours: 38, period: 'weekly', multiplier: 1.50, description: 'Weekly OT — first 2 hrs over 38h (×1.50)' },
      { employment_type: 'full_time',  threshold_hours: 40, period: 'weekly', multiplier: 2.00, description: 'Weekly OT — after 40h (×2.00)' },
      { employment_type: 'full_time',  threshold_hours:  8, period: 'daily',  multiplier: 1.50, description: 'Daily OT — first 2 hrs over 8h (×1.50)' },
      { employment_type: 'full_time',  threshold_hours: 10, period: 'daily',  multiplier: 2.00, description: 'Daily OT — after 10h (×2.00)' },
      { employment_type: 'part_time',  threshold_hours: 38, period: 'weekly', multiplier: 1.50, description: 'Part-time weekly OT — first 2 hrs over 38h (×1.50)' },
      { employment_type: 'part_time',  threshold_hours: 40, period: 'weekly', multiplier: 2.00, description: 'Part-time weekly OT — after 40h (×2.00)' },
      { employment_type: 'part_time',  threshold_hours:  8, period: 'daily',  multiplier: 1.50, description: 'Part-time daily OT — first 2 hrs over 8h (×1.50)' },
      { employment_type: 'part_time',  threshold_hours: 10, period: 'daily',  multiplier: 2.00, description: 'Part-time daily OT — after 10h (×2.00)' },
      // Casual non-liquor (liquor rates overridden per-calculation to ×1.75/×2.25)
      { employment_type: 'casual',     threshold_hours: 38, period: 'weekly', multiplier: 1.40, description: 'Casual weekly OT — first 2 hrs over 38h (×1.40 of casual base = ×1.75 of FT base)' },
      { employment_type: 'casual',     threshold_hours: 40, period: 'weekly', multiplier: 1.80, description: 'Casual weekly OT — after 40h (×1.80 of casual base = ×2.25 of FT base)' },
      { employment_type: 'casual',     threshold_hours:  8, period: 'daily',  multiplier: 1.40, description: 'Casual daily OT — first 2 hrs over 8h (×1.40 of casual base)' },
      { employment_type: 'casual',     threshold_hours: 10, period: 'daily',  multiplier: 1.80, description: 'Casual daily OT — after 10h (×1.80 of casual base)' },
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
    // Source: MA000013 Clause 19 and Schedule B.
    // None of these are all-purpose — they are additions on top of the base rate.
    const allowances = [
      {
        allowance_type: 'first_aid',
        name: 'First aid allowance',
        description: 'If you hold a current first aid qualification (St John Ambulance or equivalent) AND your employer has specifically appointed you to perform first aid duties, you are entitled to $0.56 per hour (maximum $21.37 per week).',
        trigger_condition: 'Holds current first aid qualification AND appointed by employer to perform first aid duties',
        amount: 0.56, amount_type: 'per_hour', per_unit: 'per_hour',
        is_all_purpose: false,
      },
      {
        allowance_type: 'wet_work_footwear',
        name: 'Wet work footwear allowance',
        description: 'If you are required to work in rain or wet conditions underfoot at a race meeting, and your employer does not supply waterproof footwear, you are entitled to $6.00 per meeting (maximum $12.00 per week).',
        trigger_condition: 'Required to work in rain or wet conditions at a race meeting; employer does not supply waterproof footwear',
        amount: 6.00, amount_type: 'fixed', per_unit: 'per_meeting',
        is_all_purpose: false,
      },
      {
        allowance_type: 'meal',
        name: 'Meal allowance — overtime',
        description: 'If you are required to work overtime for 1.5 hours or more immediately after your ordinary finishing time (or after 8 hours on a Saturday, Sunday, or public holiday), and your employer does not provide a meal, you are entitled to $14.62.',
        trigger_condition: 'Worked overtime for 1.5+ hours after ordinary finishing time without a meal being provided (FT/PT only)',
        amount: 14.62, amount_type: 'fixed', per_unit: 'per_meal',
        is_all_purpose: false,
      },
      {
        allowance_type: 'supervisor_liquor',
        name: 'Liquor supervisor allowance',
        description: 'If you are a casual liquor employee who is directed to supervise or be responsible for bar attendants or cashiers, you are entitled to an additional $25.64 per week.',
        trigger_condition: 'Casual liquor employee directed to supervise bar attendants or cashiers',
        amount: 25.64, amount_type: 'per_week', per_unit: 'per_week',
        is_all_purpose: false,
      },
      {
        allowance_type: 'late_finish_liquor',
        name: 'Late finish allowance — liquor',
        description: 'If you are a casual liquor employee and you finish work after 10:00 pm, you are entitled to an additional $5.62 per engagement.',
        trigger_condition: 'Casual liquor employee who finishes after 10:00 pm',
        amount: 5.62, amount_type: 'fixed', per_unit: 'per_engagement',
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
    // Source: MA000013 Clause 16.
    // Casual employees: 20-min paid rest break after 5 hrs; another after further 5 hrs.
    // Non-casual employees: unpaid 30-min meal break no later than 5 hrs after commencing.
    // Paid rest breaks (casual) use break_type='rest', is_paid=true.
    // Unpaid meal break (non-casual) uses break_type='meal', is_paid=false.
    // The employment_type filter ensures correct breaks show for each type.
    const breaks = [
      {
        employment_type: 'casual',
        shift_hours_min: 5.0, shift_hours_max: null,
        break_type: 'rest', break_duration_min: 20, is_paid: true,
        timing_rule: 'At a time convenient to the employer, not at beginning or end of duty',
        description: 'Casual employees engaged for 5 hours or more are entitled to a 20-minute paid rest break. A second 20-minute paid rest break applies if required to work a further 5 hours.',
      },
      {
        employment_type: null,  // applies to FT and PT (non-casual)
        shift_hours_min: 5.0, shift_hours_max: null,
        break_type: 'meal', break_duration_min: 30, is_paid: false,
        timing_rule: 'No later than 5 hours after commencing work',
        description: 'If you work more than 5 hours, you are entitled to an unpaid meal break of at least 30 minutes. If required to work through a meal break, hours after the 5-hour mark are paid at 150% (time and a half) until the break is provided.',
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
    // Uses parent_question_key/parent_answer_key gating (isParentGated in frontend).
    //
    // Q1: race_worker_type — liquor or non-liquor?
    // Q2: race_liquor_age — adult or under-19 junior? (shown when Q1='liquor')
    // Q3: race_dept — racecourse attendant or raceday official? (shown when Q1='non_liquor')
    // Q4: race_ra_grade — which grade? (shown when Q3='racecourse')
    // Q5: race_ro_grade — which grade? (shown when Q3='official')
    const questions = [
      {
        question_key: 'race_worker_type',
        question_text: 'Which best describes your role at the racing venue?',
        help_text: 'Liquor employees work in the bar service area. Racecourse attendants and raceday officials work in all other areas.',
        question_type: 'single',
        stream: null,
        parent_question_key: null,
        parent_answer_key: null,
        sort_order: 1,
        answers: [
          { answer_key: 'non_liquor', answer_text: 'Racecourse work — I work on the course, at gates, in the office, or as a raceday official', sort_order: 1 },
          { answer_key: 'liquor', answer_text: 'Bar / liquor service — I serve drinks, work at the bar, or collect glasses', sort_order: 2 },
        ],
      },
      {
        question_key: 'race_liquor_age',
        question_text: 'How old are you?',
        help_text: 'Under-19 glass collectors have a different rate. Bar attendants and cashiers of all ages use the adult rate.',
        question_type: 'single',
        stream: null,
        parent_question_key: 'race_worker_type',
        parent_answer_key: 'liquor',
        sort_order: 2,
        answers: [
          { answer_key: 'adult', answer_text: 'I am 19 or older (or I am under 19 but work as a bar attendant or cashier, not just collecting glasses)', sort_order: 1 },
          { answer_key: 'junior', answer_text: 'I am under 19 and I only collect glasses (I do not serve drinks or operate a cash register)', sort_order: 2 },
        ],
      },
      {
        question_key: 'race_dept',
        question_text: 'What type of racecourse role do you have?',
        help_text: 'Racecourse Attendants do operational duties (gates, parking, ticketing, starting, etc.). Raceday Officials have formal judging, calling, or inspecting roles.',
        question_type: 'single',
        stream: null,
        parent_question_key: 'race_worker_type',
        parent_answer_key: 'non_liquor',
        sort_order: 3,
        answers: [
          { answer_key: 'racecourse', answer_text: 'Racecourse Attendant — general racecourse duties (gates, parking, ticketing, starting, crowd control, etc.)', sort_order: 1 },
          { answer_key: 'official', answer_text: 'Raceday Official — formal role such as announcer, inspector, timekeeper, judge, or racecaller', sort_order: 2 },
        ],
      },
      {
        question_key: 'race_ra_grade',
        question_text: 'Which Grade Racecourse Attendant best describes your role?',
        help_text: 'Your grade is usually shown on your payslip or letter of engagement. Choose the one that matches what you actually do.',
        question_type: 'single',
        stream: null,
        parent_question_key: 'race_dept',
        parent_answer_key: 'racecourse',
        sort_order: 4,
        answers: [
          { answer_key: 'introductory', answer_text: 'Introductory — I am new and still being trained (less than 3 months in the role)', sort_order: 1 },
          { answer_key: 'grade1', answer_text: 'Grade 1 — Basic duties not involving cash (gate attendant, usher, parking attendant without cash, kennel attendant)', sort_order: 2 },
          { answer_key: 'grade2', answer_text: 'Grade 2 — Handling cash, selling tickets or programmes, operating EFTPOS, raceday office assistant', sort_order: 3 },
          { answer_key: 'grade3', answer_text: 'Grade 3 — Specialist duties or supervising 1–9 employees (barrier attendant, crowd controller, lure driver, swab attendant)', sort_order: 4 },
          { answer_key: 'grade4', answer_text: 'Grade 4 — Trade-level duties or supervising 10+ employees (farrier, starter, patrol camera operator)', sort_order: 5 },
        ],
      },
      {
        question_key: 'race_ro_grade',
        question_text: 'Which Grade Raceday Official best describes your role?',
        help_text: 'Choose the grade that matches your formal official duties on raceday.',
        question_type: 'single',
        stream: null,
        parent_question_key: 'race_dept',
        parent_answer_key: 'official',
        sort_order: 5,
        answers: [
          { answer_key: 'grade1', answer_text: 'Grade 1 — Ground announcer or birdcage attendant', sort_order: 1 },
          { answer_key: 'grade2', answer_text: 'Grade 2 — Racecourse inspector, assistant clerk of scales, timekeeper, identification official, assistant clerk of the course', sort_order: 2 },
          { answer_key: 'grade3', answer_text: 'Grade 3 — Chief inspector, clerk of scales, chief betting supervisor, clerk of the course, assistant judge', sort_order: 3 },
          { answer_key: 'grade4', answer_text: 'Grade 4 — Raceday judge or racecaller', sort_order: 4 },
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
    console.log('\n✅ MA000013 seed complete');
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
