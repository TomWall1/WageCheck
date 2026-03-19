/**
 * Seed script — Cleaning Services Award 2020 [MA000022]
 * Pay rates effective 1 July 2025 (following 2025 Annual Wage Review — 3.5% increase)
 * Source: Fair Work Ombudsman pay guide G00222865, effective 1 July 2025, published 22 January 2026
 *
 * Award covers: employees in contract cleaning, building cleaning, and related services.
 * Businesses that employ their own cleaners as part of a non-cleaning business may also
 * be covered.
 *
 * Classification structure:
 *   Level 1 — General cleaning duties (sweeping, mopping, vacuuming, rubbish removal, sanitary)
 *   Level 2 — Specialized cleaning machinery/techniques, industrial laundry, or leading hand for Level 1 workers
 *   Level 3 — Specialist cleaning: chemical washing of building exteriors, abrasive blasting,
 *              specialist window cleaning from heights, complex specialized cleaning equipment
 *
 * Part-time base rate note:
 *   The Cleaning Award includes a 15% shift loading built into the part-time ordinary rate.
 *   PT ordinary hourly = FT ordinary × 1.15. Penalty multipliers below for PT are stored
 *   relative to the PT base rate ($29.73/$30.71/$32.34).
 *
 * Junior rates apply only to employees of shopping trolley collection contractors:
 *   Under 16: 45%  |  16 years: 50%  |  17 years: 60%  |  18 years: 70%  |
 *   19 years: 80%  |  20 years: 90%  |  21+: adult rate
 *
 * Run after migrate.js: node scripts/seed_ma000022.js
 */
require('dotenv').config();
const pool = require('../src/db/pool');

const AWARD_CODE = 'MA000022';
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
      'Cleaning Services Award 2020',
      EFFECTIVE_DATE,
      'https://www.fairwork.gov.au/employment-conditions/awards/awards-summary/ma000022-summary',
    ]);

    // ── Classifications ───────────────────────────────────────────────────────
    // MA000022 Schedule A — Three levels, all stream='cleaning'.

    const classifications = [
      {
        level: 1, stream: 'cleaning',
        title: 'Cleaning Service Employee Level 1',
        description: 'You perform general cleaning duties. This is the entry-level classification for most cleaners and covers the majority of cleaning work.',
        duties: [
          'Sweeping, mopping, scrubbing, and polishing floors',
          'Vacuuming carpets and mats',
          'Dusting and wiping surfaces, furniture, and fittings',
          'Cleaning toilets, bathrooms, showers, and other sanitary areas',
          'Emptying bins and removing rubbish',
          'Cleaning windows and mirrors at ground level',
          'Washing and cleaning walls and fittings',
          'Collecting and returning trolleys (shopping trolley collection)',
          'General tidying and maintenance of cleanliness',
        ],
        indicative_tasks: ['Cleaner', 'Commercial cleaner', 'Office cleaner', 'Domestic cleaner (commercial)', 'Shopping trolley collector', 'Building cleaner'],
        sort_order: 10,
      },
      {
        level: 2, stream: 'cleaning',
        title: 'Cleaning Service Employee Level 2',
        description: 'You perform more complex or specialized cleaning duties beyond general cleaning, or you supervise other cleaners as a leading hand.',
        duties: [
          'All Level 1 duties',
          'Operating specialized powered cleaning equipment (e.g. ride-on scrubbers, carpet cleaning machinery)',
          'Using specialized cleaning agents and techniques',
          'Carrying out industrial laundry work using industrial machines',
          'Cleaning hospital or commercial kitchens using specialized techniques',
          'Leading or supervising a team of Level 1 cleaning employees',
          'Applying specialized chemicals or stripping and sealing floor surfaces',
          'Operating pressure cleaning or steam cleaning equipment',
        ],
        indicative_tasks: ['Specialized cleaner', 'Industrial cleaner', 'Leading hand cleaner', 'Carpet cleaner (commercial)', 'Hospital cleaner (specialized)', 'Industrial laundry worker'],
        sort_order: 20,
      },
      {
        level: 3, stream: 'cleaning',
        title: 'Cleaning Service Employee Level 3',
        description: 'You perform highly specialized technical cleaning work requiring specific skills, equipment, or working conditions such as cleaning from heights or hazardous chemical processes.',
        duties: [
          'Cleaning multi-storied building exteriors from outside (at heights)',
          'Abrasive blasting of surfaces',
          'Chemical washing of building exteriors',
          'Industrial window cleaning using abseiling, swing stages, or bosuns chairs',
          'Specialist high-access cleaning using elevated work platforms',
          'Specialized industrial or hazardous environment cleaning requiring specific licences or training',
          'Complex chimney or industrial plant cleaning',
        ],
        indicative_tasks: ['Abseiling/high-access window cleaner', 'Abrasive blasting operator', 'Chemical wash contractor', 'Industrial chimney cleaner', 'High-rise exterior cleaner'],
        sort_order: 30,
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
    // Source: FWO pay guide G00222865, effective 1 July 2025.
    //
    // Part-time ordinary rate includes 15% shift loading built into the base rate.
    // PT base = FT base × 1.15 (per Cleaning Award clause 10.5 / Schedule B).
    // Casual rate = FT base × 1.25 (25% casual loading).
    //
    // FT:   L1=$25.85  L2=$26.70  L3=$28.12
    // PT:   L1=$29.73  L2=$30.71  L3=$32.34
    // Cas:  L1=$32.31  L2=$33.38  L3=$35.15

    const ftRates   = { 1: 25.85, 2: 26.70, 3: 28.12 };
    const ptRates   = { 1: 29.73, 2: 30.71, 3: 32.34 };
    const casualRates = { 1: 32.31, 2: 33.38, 3: 35.15 };

    const classResult = await client.query(
      'SELECT id, level, stream FROM classifications WHERE award_code = $1',
      [AWARD_CODE]
    );

    for (const cls of classResult.rows) {
      const ftRate     = ftRates[cls.level];
      const ptRate     = ptRates[cls.level];
      const casualRate = casualRates[cls.level];
      if (!ftRate) continue;

      await client.query(`
        INSERT INTO pay_rates (award_code, classification_id, employment_type, rate_type, rate_amount, effective_date)
        VALUES ($1, $2, 'full_time', 'base_hourly', $3, $4)
        ON CONFLICT (award_code, classification_id, employment_type, rate_type, effective_date)
        DO UPDATE SET rate_amount = EXCLUDED.rate_amount
      `, [AWARD_CODE, cls.id, ftRate, EFFECTIVE_DATE]);

      await client.query(`
        INSERT INTO pay_rates (award_code, classification_id, employment_type, rate_type, rate_amount, effective_date)
        VALUES ($1, $2, 'part_time', 'base_hourly', $3, $4)
        ON CONFLICT (award_code, classification_id, employment_type, rate_type, effective_date)
        DO UPDATE SET rate_amount = EXCLUDED.rate_amount
      `, [AWARD_CODE, cls.id, ptRate, EFFECTIVE_DATE]);

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
    // Source: MA000022 clause 28 & FWO pay guide, effective 1 July 2025.
    //
    // Full-time shift penalties (relative to FT base, verified from pay guide):
    //   Mon–Fri shift starting before 6am OR finishing after 6pm: ×1.15
    //   Non-rotating shift finishing after midnight and at or before 8am: ×1.30
    //   Saturday: ×1.50
    //   Sunday: ×2.00
    //   Public holiday: ×2.50
    //
    // Part-time penalty rates (relative to PT base = FT × 1.15):
    //   Mon–Fri evening/early band: $33.61/$29.73 = ×1.130
    //   Non-rotating night: $33.61/$29.73 = ×1.130 (same rate as evening for PT)
    //   Saturday: $42.65/$29.73 = ×1.435
    //   Sunday: $55.58/$29.73 = ×1.870
    //   Public holiday: $68.50/$29.73 = ×2.304
    //
    // Casual penalty rates (relative to casual base = FT × 1.25):
    //   Evening/early band: $36.19/$32.31 = ×1.120
    //   Non-rotating night: $40.07/$32.31 = ×1.240
    //   Saturday: $45.24/$32.31 = ×1.400 (175% FT)
    //   Sunday: $58.16/$32.31 = ×1.800 (225% FT)
    //   Public holiday: $71.09/$32.31 = ×2.200 (275% FT)
    //
    // Time-band approximation (system uses per-minute multipliers):
    //   The award's shift penalties apply to the whole shift. We approximate with time bands:
    //   00:00–06:00 → higher band (non-rotating night rate applies to those hours)
    //   06:00–18:00 → ordinary
    //   18:00–24:00 → evening band (×1.15 FT)
    //
    // For most cleaning workers (e.g. early-morning or evening office cleaners) this
    // approximation closely matches the actual award obligation.

    const penaltyRates = [
      // ── Full-time ──────────────────────────────────────────────────────────
      {
        employment_type: 'full_time', day_type: 'weekday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.0, addition_per_hour: null,
        description: 'Ordinary weekday rate (Mon–Fri, 6am–6pm)',
      },
      {
        employment_type: 'full_time', day_type: 'weekday',
        time_band_start: '18:00', time_band_end: '24:00', time_band_label: 'evening',
        multiplier: 1.15, addition_per_hour: null,
        description: 'Weekday evening (6pm–midnight) — shift finishing after 6pm: ×1.15',
      },
      {
        employment_type: 'full_time', day_type: 'weekday',
        time_band_start: '00:00', time_band_end: '06:00', time_band_label: 'early_morning',
        multiplier: 1.30, addition_per_hour: null,
        description: 'Early morning (midnight–6am) — non-rotating night shift rate: ×1.30',
      },
      {
        employment_type: 'full_time', day_type: 'saturday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.50, addition_per_hour: null,
        description: 'Saturday — ×1.50',
      },
      {
        employment_type: 'full_time', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.00, addition_per_hour: null,
        description: 'Sunday — ×2.00',
      },
      {
        employment_type: 'full_time', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.50, addition_per_hour: null,
        description: 'Public holiday — ×2.50',
      },

      // ── Part-time ──────────────────────────────────────────────────────────
      // PT base already includes 15% loading. Multipliers below relative to PT base.
      {
        employment_type: 'part_time', day_type: 'weekday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.0, addition_per_hour: null,
        description: 'Ordinary weekday (PT base includes 15% shift loading)',
      },
      {
        employment_type: 'part_time', day_type: 'weekday',
        time_band_start: '18:00', time_band_end: '24:00', time_band_label: 'evening',
        multiplier: 1.130, addition_per_hour: null,
        description: 'PT evening (6pm–midnight) — $33.61/$29.73 = ×1.130 of PT base (×1.30 FT)',
      },
      {
        employment_type: 'part_time', day_type: 'weekday',
        time_band_start: '00:00', time_band_end: '06:00', time_band_label: 'early_morning',
        multiplier: 1.130, addition_per_hour: null,
        description: 'PT early morning (midnight–6am) — $33.61/$29.73 = ×1.130 of PT base',
      },
      {
        employment_type: 'part_time', day_type: 'saturday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.435, addition_per_hour: null,
        description: 'PT Saturday — $42.65/$29.73 = ×1.435 of PT base (×1.65 FT)',
      },
      {
        employment_type: 'part_time', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.870, addition_per_hour: null,
        description: 'PT Sunday — $55.58/$29.73 = ×1.870 of PT base (×2.15 FT)',
      },
      {
        employment_type: 'part_time', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.304, addition_per_hour: null,
        description: 'PT public holiday — $68.50/$29.73 = ×2.304 of PT base (×2.65 FT)',
      },

      // ── Casual ─────────────────────────────────────────────────────────────
      // Casual base includes 25% casual loading. Multipliers relative to casual base.
      {
        employment_type: 'casual', day_type: 'weekday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.0, addition_per_hour: null,
        description: 'Ordinary casual weekday (includes 25% casual loading)',
      },
      {
        employment_type: 'casual', day_type: 'weekday',
        time_band_start: '18:00', time_band_end: '24:00', time_band_label: 'evening',
        multiplier: 1.120, addition_per_hour: null,
        description: 'Casual evening (6pm–midnight) — $36.19/$32.31 = ×1.12 (×1.40 FT)',
      },
      {
        employment_type: 'casual', day_type: 'weekday',
        time_band_start: '00:00', time_band_end: '06:00', time_band_label: 'early_morning',
        multiplier: 1.240, addition_per_hour: null,
        description: 'Casual early morning (midnight–6am) — $40.07/$32.31 = ×1.24 (×1.55 FT)',
      },
      {
        employment_type: 'casual', day_type: 'saturday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.400, addition_per_hour: null,
        description: 'Casual Saturday — $45.24/$32.31 = ×1.40 (×1.75 FT)',
      },
      {
        employment_type: 'casual', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.800, addition_per_hour: null,
        description: 'Casual Sunday — $58.16/$32.31 = ×1.80 (×2.25 FT)',
      },
      {
        employment_type: 'casual', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.200, addition_per_hour: null,
        description: 'Casual public holiday — $71.09/$32.31 = ×2.20 (×2.75 FT)',
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
    // MA000022 — Overtime
    // Mon–Sat: first 2 hours ×1.50, after 2 hours ×2.00.
    // Sunday: ×2.00. Public holiday: ×2.50.
    // Ordinary hours: 38/week FT (averaged over up to 4 weeks).
    //
    // PT overtime: same dollar amounts as FT. Relative to PT base ($29.73):
    //   First 2 hrs: $38.78/$29.73 = ×1.305
    //   After 2 hrs: $51.70/$29.73 = ×1.739
    //   Sunday OT:   $51.70/$29.73 = ×1.739
    //   PH OT:       $64.63/$29.73 = ×2.174
    //
    // Casual OT relative to casual base ($32.31):
    //   First 2 hrs: $45.24/$32.31 = ×1.400 (175% FT)
    //   After 2 hrs: $58.16/$32.31 = ×1.800 (225% FT)
    //   Sunday OT:   $58.16/$32.31 = ×1.800
    //   PH OT:       $71.09/$32.31 = ×2.200

    const overtimeRates = [
      { employment_type: 'full_time',  threshold_hours: 38, period: 'weekly', multiplier: 1.50, description: 'Weekly overtime — first 2 hours (×1.50)' },
      { employment_type: 'full_time',  threshold_hours: 40, period: 'weekly', multiplier: 2.00, description: 'Weekly overtime — after 40 hours (×2.00)' },
      { employment_type: 'part_time',  threshold_hours: 38, period: 'weekly', multiplier: 1.305, description: 'PT weekly overtime — first 2 hours (×1.305 of PT base = 150% FT)' },
      { employment_type: 'part_time',  threshold_hours: 40, period: 'weekly', multiplier: 1.739, description: 'PT weekly overtime — after 40 hours (×1.739 of PT base = 200% FT)' },
      { employment_type: 'casual',     threshold_hours: 38, period: 'weekly', multiplier: 1.400, description: 'Casual weekly overtime — first 2 hours (×1.40 of casual base = 175% FT)' },
      { employment_type: 'casual',     threshold_hours: 40, period: 'weekly', multiplier: 1.800, description: 'Casual weekly overtime — after 40 hours (×1.80 of casual base = 225% FT)' },
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
    // Source: MA000022 clause 20 & FWO pay guide G00222865, effective 1 July 2025.

    const allowances = [
      {
        allowance_type: 'broken_shift',
        name: 'Broken shift allowance',
        description: 'If you work a broken shift (two separate periods on the same day with a substantial break in between), you receive an allowance per day worked on a broken shift.',
        trigger_condition: 'Working a broken shift (two separate working periods in a day)',
        amount: 4.50, amount_type: 'per_occurrence', per_unit: 'per_day',
      },
      {
        allowance_type: 'cold_places',
        name: 'Cold places allowance',
        description: 'If you are required to work in a cold room or refrigerated area, you receive an additional allowance for each hour or part hour spent in cold conditions.',
        trigger_condition: 'Working in refrigerated or cold storage areas',
        amount: 0.66, amount_type: 'per_hour', per_unit: 'per_hour',
      },
      {
        allowance_type: 'first_aid',
        name: 'First aid allowance',
        description: 'If you hold a current first aid certificate and your employer has appointed you as the first aid officer at your workplace, you receive a weekly first aid allowance.',
        trigger_condition: 'Appointed first aid officer with current first aid certificate',
        amount: 16.11, amount_type: 'weekly', per_unit: 'per_week',
      },
      {
        allowance_type: 'height_low',
        name: 'Height allowance (up to 22nd floor)',
        description: 'If you clean the exterior of a multi-storied building from outside, working up to and including the 22nd floor above ground, you receive a height allowance per hour.',
        trigger_condition: 'Cleaning exterior of multi-storied building from outside, up to and including 22nd floor',
        amount: 1.06, amount_type: 'per_hour', per_unit: 'per_hour',
      },
      {
        allowance_type: 'height_high',
        name: 'Height allowance (above 22nd floor)',
        description: 'If you clean the exterior of a multi-storied building from outside, working above the 22nd floor above ground, you receive a higher height allowance per hour.',
        trigger_condition: 'Cleaning exterior of multi-storied building from outside, above 22nd floor',
        amount: 2.17, amount_type: 'per_hour', per_unit: 'per_hour',
      },
      {
        allowance_type: 'hot_places_low',
        name: 'Hot places allowance (46–54°C)',
        description: 'If you are required to work in conditions where the temperature is between 46°C and 54°C, you receive a hot places allowance per hour.',
        trigger_condition: 'Working in conditions between 46°C and 54°C',
        amount: 0.66, amount_type: 'per_hour', per_unit: 'per_hour',
      },
      {
        allowance_type: 'hot_places_high',
        name: 'Hot places allowance (exceeding 54°C)',
        description: 'If you are required to work in conditions exceeding 54°C, you receive a higher hot places allowance per hour.',
        trigger_condition: 'Working in conditions exceeding 54°C',
        amount: 0.80, amount_type: 'per_hour', per_unit: 'per_hour',
      },
      {
        allowance_type: 'leading_hand_1to10',
        name: 'Leading hand allowance (1–10 employees)',
        description: 'Level 2 employees who are required to supervise 1 to 10 other employees receive a weekly leading hand allowance.',
        trigger_condition: 'Level 2 employee directing 1 to 10 other employees',
        amount: 58.93, amount_type: 'weekly', per_unit: 'per_week',
      },
      {
        allowance_type: 'leading_hand_11to20',
        name: 'Leading hand allowance (11–20 employees)',
        description: 'Level 2 employees who are required to supervise 11 to 20 other employees receive a higher weekly leading hand allowance.',
        trigger_condition: 'Level 2 employee directing 11 to 20 other employees',
        amount: 75.83, amount_type: 'weekly', per_unit: 'per_week',
      },
      {
        allowance_type: 'leading_hand_21plus',
        name: 'Leading hand allowance (over 20 employees)',
        description: 'Level 2 employees who are required to supervise more than 20 other employees receive the highest weekly leading hand allowance.',
        trigger_condition: 'Level 2 employee directing over 20 other employees',
        amount: 92.72, amount_type: 'weekly', per_unit: 'per_week',
      },
      {
        allowance_type: 'meal',
        name: 'Meal allowance',
        description: 'If you are required to work overtime, you are entitled to a meal allowance for each meal time that falls during the overtime period.',
        trigger_condition: 'Working overtime past a meal break time',
        amount: 16.84, amount_type: 'fixed', per_unit: 'per_meal',
      },
      {
        allowance_type: 'refuse_collection',
        name: 'Refuse collection allowance',
        description: 'If your duties include collecting and removing refuse (rubbish) as part of your regular work, you receive a shift allowance.',
        trigger_condition: 'Duties include collecting and removing refuse',
        amount: 4.48, amount_type: 'per_occurrence', per_unit: 'per_shift',
      },
      {
        allowance_type: 'toilet_cleaning',
        name: 'Toilet cleaning allowance',
        description: 'If your duties include cleaning toilet areas as a regular part of your work, you receive an allowance per shift (up to a weekly maximum of $17.35).',
        trigger_condition: 'Duties include cleaning toilet areas',
        amount: 3.53, amount_type: 'per_occurrence', per_unit: 'per_shift',
      },
      {
        allowance_type: 'uniform',
        name: 'Uniform reimbursement',
        description: 'If your employer requires you to wear a specific uniform and you must purchase it yourself, your employer must reimburse the cost.',
        trigger_condition: 'Required to purchase own uniform',
        amount: null, amount_type: 'reimbursement', per_unit: null,
      },
      {
        allowance_type: 'vehicle_car',
        name: 'Vehicle allowance (car)',
        description: 'If you are required to use your own car for work purposes, you receive a per-kilometre vehicle allowance.',
        trigger_condition: 'Required to use own car for work',
        amount: 0.99, amount_type: 'per_km', per_unit: 'per_km',
      },
      {
        allowance_type: 'vehicle_motorcycle',
        name: 'Vehicle allowance (motorcycle)',
        description: 'If you are required to use your own motorcycle for work purposes, you receive a per-kilometre vehicle allowance.',
        trigger_condition: 'Required to use own motorcycle for work',
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
    // MA000022 clause 19 — Breaks
    // 10-minute paid rest break per 4 hours of work.
    // Unpaid meal break (minimum 30 minutes) no later than 5 hours after commencing.

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
        description: 'If you work more than 5 hours, you must be given an unpaid meal break of at least 30 minutes.',
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
    // Two-step question flow:
    //   1. cleaning_experience — are you new or experienced?
    //   2. cleaning_role — what type of cleaning do you do? (shown if experienced)

    const questions = [
      {
        award_code: AWARD_CODE,
        question_key: 'cleaning_experience',
        question_text: 'Are you new to cleaning work?',
        help_text: 'If you have just started in a cleaning role and are still learning the work, you would typically be classified at Level 1.',
        question_type: 'single',
        stream: null,
        parent_question_key: null,
        parent_answer_key: null,
        sort_order: 1,
        answers: [
          { answer_key: 'new', answer_text: 'Yes — I\'m new to cleaning work and still learning the role', sort_order: 1 },
          { answer_key: 'experienced', answer_text: 'No — I have cleaning experience', sort_order: 2 },
        ],
      },
      {
        award_code: AWARD_CODE,
        question_key: 'cleaning_role',
        question_text: 'Which best describes your main cleaning duties?',
        help_text: 'Your level depends on what type of cleaning you do, not just your experience. Most cleaners are Level 1. Level 2 applies to specialized techniques or machinery, or leading hand roles. Level 3 is for highly technical or high-access work.',
        question_type: 'single',
        stream: null,
        parent_question_key: 'cleaning_experience',
        parent_answer_key: 'experienced',
        sort_order: 2,
        answers: [
          { answer_key: 'general', answer_text: 'General cleaning — sweeping, mopping, vacuuming, dusting, rubbish removal, toilet and bathroom cleaning, window cleaning at ground level', sort_order: 1 },
          { answer_key: 'specialized', answer_text: 'Specialized or technical cleaning — operating industrial cleaning machinery (ride-on scrubbers, carpet cleaners, pressure cleaners), industrial laundry with heavy machines, floor stripping and sealing, or supervising other cleaners as a leading hand', sort_order: 2 },
          { answer_key: 'specialist', answer_text: 'Highly specialized or high-access cleaning — abseiling or rope-access window cleaning, abrasive blasting, chemical washing of building exteriors, industrial chimney or high-risk environment cleaning', sort_order: 3 },
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
    console.log('\n✅ MA000022 seed complete');
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
