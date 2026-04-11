/**
 * Seed script — Horticulture Award 2020 [MA000028]
 * Pay rates effective 1 July 2025 (published 25 June 2025)
 * Source: Fair Work Ombudsman pay guide MA000028 (G00282859)
 *
 * KEY — All-purpose allowances (marked * in pay guide):
 *   First aid:               $0.33/hr
 *   Leading hand 2–6 employees: $0.76/hr
 *   Leading hand 7–10 employees: $0.88/hr
 *   Leading hand 11–20 employees: $1.25/hr
 *   Leading hand 21+ employees: $1.58/hr
 *   Wet work:                $2.50/hr
 *
 * These MUST be added to the base rate BEFORE casual loading, penalties,
 * and overtime are calculated. The calculator handles this automatically
 * when allPurposeAllowancesPerHour is passed to the calculate endpoint.
 *
 * Adult rates (FT/PT):
 *   L1: $24.28  L2: $24.95  L3: $25.63  L4: $26.55  L5: $28.12
 * Casual rates (FT rate × 1.25):
 *   L1: $30.35  L2: $31.19  L3: $32.04  L4: $33.19  L5: $35.15
 *
 * Penalty rates (FT/PT):
 *   Afternoon shift Mon–Fri: ×1.15
 *   Night shift Mon–Fri:     ×1.15
 *   Saturday (ordinary):     ×1.00 (no penalty — ordinary rate)
 *   Sunday:                  ×2.00 (double time from first hour)
 *   Public holiday:          ×2.00
 *
 * Penalty rates (casual, applied to casual base rate):
 *   Mon–Fri ordinary:        ×1.00 of casual base
 *   Saturday ordinary:       ×1.00 of casual base
 *   Outside span of hours / Sunday: ×1.12 of casual base (= ×1.40 of FT)
 *   Public holiday:          ×1.80 of casual base (= ×2.25 of FT)
 *
 * Overtime (FT/PT, Mon–Sat):
 *   >38 hrs/week first 2 hrs: ×1.50
 *   >40 hrs/week after 2 hrs:  ×2.00
 *   Sunday: always ×2.00 (modelled as penalty rate, not separate overtime)
 *
 * Junior rates (adult multiplier):
 *   <16: 50%  16: 60%  17: 70%  18: 80%  19: 90%  20+: 100%
 *
 * Run after migrate.js: node scripts/seed_ma000028.js
 */
require('dotenv').config();
const pool = require('../src/db/pool');

const AWARD_CODE = 'MA000028';
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
      'Horticulture Award 2020',
      EFFECTIVE_DATE,
      'https://awards.fairwork.gov.au/MA000028.html',
    ]);

    // ── Classifications ────────────────────────────────────────────────────────
    // MA000028 has one stream ('horticulture') with 5 levels.
    // Levels reflect skills, experience, and qualifications in field and nursery work.
    const classifications = [
      {
        level: 1, stream: 'horticulture',
        title: 'Horticulture Employee Level 1',
        description: 'Entry-level field or nursery worker. You perform basic tasks under close supervision, following specific instructions. No prior experience or formal qualification required.',
        duties: [
          'Planting, watering, weeding, and thinning crops',
          'Hand harvesting of fruit, vegetables, or flowers',
          'Basic packing, grading, and sorting under supervision',
          'Cleaning and tidying work areas and equipment',
          'Assisting higher-level workers with general tasks',
          'Following specific instructions under close supervision',
        ],
        indicative_tasks: ['Field hand (entry level)', 'Harvest picker', 'General labourer', 'Nursery assistant'],
        sort_order: 10,
      },
      {
        level: 2, stream: 'horticulture',
        title: 'Horticulture Employee Level 2',
        description: 'Skilled worker with at least 12 months experience or a Certificate I or II in a horticultural field. You work under general supervision, applying skills you have learned on the job or through formal training.',
        duties: [
          'Applying basic plant care and crop husbandry principles',
          'Operating and maintaining basic machinery and equipment under supervision',
          'Performing more complex packing, grading, or sorting tasks',
          'Preparing and applying chemical treatments under supervision',
          'Maintaining tools and basic equipment',
          'Supervising or assisting Level 1 employees with basic tasks',
        ],
        indicative_tasks: ['Experienced field hand', 'Nursery hand (skilled)', 'Packing shed operator', 'Irrigation assistant'],
        sort_order: 20,
      },
      {
        level: 3, stream: 'horticulture',
        title: 'Horticulture Employee Level 3',
        description: 'Higher-skilled worker with at least 24 months experience at Level 2, or a Certificate II or III in horticulture. You apply technical skills and operate specialist equipment with limited supervision.',
        duties: [
          'Operating specialised farm machinery (tractors, sprayers, irrigators)',
          'Identifying and diagnosing plant diseases, pests, and nutrient deficiencies',
          'Planning and implementing horticultural programs with minimal supervision',
          'Supervising and training Level 1 and Level 2 employees in specific tasks',
          'Applying chemicals using specialised equipment (pesticides, herbicides)',
          'Preparing growing media, propagating plants, and managing nursery stock',
        ],
        indicative_tasks: ['Tractor operator', 'Spray operator', 'Senior nursery hand', 'Propagation specialist', 'Skilled field supervisor'],
        sort_order: 30,
      },
      {
        level: 4, stream: 'horticulture',
        title: 'Horticulture Employee Level 4',
        description: 'Advanced worker with at least 24 months at Level 3, or a Certificate III or higher qualification. You exercise significant skill and judgment, can operate all machinery, and may act as a leading hand in charge of 2–6 employees.',
        duties: [
          'Independently managing crop or nursery programs with minimal supervision',
          'Operating and maintaining all horticultural machinery and equipment',
          'Designing and implementing irrigation or chemical application programs',
          'Acting as leading hand responsible for 2 to 6 employees (leading hand allowance applies)',
          'Diagnosing and solving complex plant health problems',
          'Training and supervising lower-level employees across multiple tasks',
        ],
        indicative_tasks: ['Senior machinery operator', 'Leading hand (small team)', 'Specialist horticultural worker', 'Senior propagation specialist'],
        sort_order: 40,
      },
      {
        level: 5, stream: 'horticulture',
        title: 'Horticulture Employee Level 5',
        description: 'Foreperson or highly skilled specialist. You hold a Certificate IV or equivalent, or you are responsible for coordinating a significant team or a specialist area of operations with a high degree of autonomy.',
        duties: [
          'Coordinating all operations across a section, crop, or facility',
          'Managing and supervising a team of employees at various levels',
          'Planning and overseeing complete growing or nursery programs',
          'Ensuring compliance with workplace safety and agricultural regulations',
          'Acting as foreperson for a work group with significant responsibility',
          'High-level technical expertise applied across all horticultural operations',
        ],
        indicative_tasks: ['Foreperson', 'Specialist horticulturalist (Cert IV)', 'Senior farm supervisor', 'Production coordinator'],
        sort_order: 50,
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
    // Source: FWO pay guide MA000028, effective 1 July 2025.
    // Casual rate = FT rate × 1.25.
    // NOTE: When all-purpose allowances apply (first aid, leading hand, wet work),
    //       the calculator adds the allowance to the FT base rate FIRST,
    //       then applies the 1.25 casual loading before penalties/overtime.
    const baseRates = {
      1: 24.28,
      2: 24.95,
      3: 25.63,
      4: 26.55,
      5: 28.12,
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
    // Source: MA000028 clause 26 (shift work) and clause 29 (penalty rates).
    //
    // FT/PT multipliers:
    //   Mon–Fri ordinary span:       ×1.00
    //   Afternoon shift Mon–Fri:     ×1.15 (2pm–midnight)
    //   Night shift Mon–Fri:         ×1.15 (midnight–6am)
    //   Saturday (ordinary):         ×1.00 (no weekend penalty — overtime applies above threshold)
    //   Sunday:                      ×2.00 (double time from first hour)
    //   Public holiday:              ×2.00
    //
    // Casual multipliers (applied to casual base rate = FT × 1.25):
    //   Mon–Fri ordinary:            ×1.00 of casual base
    //   Saturday ordinary:           ×1.00 of casual base
    //   Outside span / Sunday:       ×1.12 of casual base (= ×1.40 of FT = 140% FT)
    //   Public holiday:              ×1.80 of casual base (= ×2.25 of FT = 225% FT)

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
        time_band_start: '14:00', time_band_end: '00:00', time_band_label: 'Afternoon shift',
        multiplier: 1.15, addition_per_hour: null,
        description: 'Afternoon shift Mon–Fri (2pm–midnight) — ×1.15',
      },
      {
        employment_type: 'full_time', day_type: 'weekday',
        time_band_start: '00:00', time_band_end: '06:00', time_band_label: 'Night shift',
        multiplier: 1.15, addition_per_hour: null,
        description: 'Night shift Mon–Fri (midnight–6am) — ×1.15',
      },
      {
        employment_type: 'full_time', day_type: 'saturday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.0, addition_per_hour: null,
        description: 'Saturday — ordinary rate (×1.0); overtime applies after weekly threshold',
      },
      {
        employment_type: 'full_time', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.0, addition_per_hour: null,
        description: 'Sunday — double time (×2.0) from first hour',
      },
      {
        employment_type: 'full_time', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.0, addition_per_hour: null,
        description: 'Public holiday — double time (×2.0)',
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
        time_band_start: '14:00', time_band_end: '00:00', time_band_label: 'Afternoon shift',
        multiplier: 1.15, addition_per_hour: null,
        description: 'Afternoon shift Mon–Fri (2pm–midnight) — ×1.15',
      },
      {
        employment_type: 'part_time', day_type: 'weekday',
        time_band_start: '00:00', time_band_end: '06:00', time_band_label: 'Night shift',
        multiplier: 1.15, addition_per_hour: null,
        description: 'Night shift Mon–Fri (midnight–6am) — ×1.15',
      },
      {
        employment_type: 'part_time', day_type: 'saturday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.0, addition_per_hour: null,
        description: 'Saturday — ordinary rate (×1.0)',
      },
      {
        employment_type: 'part_time', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.0, addition_per_hour: null,
        description: 'Sunday — double time (×2.0) from first hour',
      },
      {
        employment_type: 'part_time', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.0, addition_per_hour: null,
        description: 'Public holiday — double time (×2.0)',
      },
      // ── Casual ───────────────────────────────────────────────────────────────
      // Casual base rate already includes 25% loading.
      // Outside span / Sunday: ×1.12 of casual base = $33.99/$30.35 for L1
      //   (equivalent to ×1.40 of FT = 140% of ordinary rate)
      // Public holiday: ×1.80 of casual base = $54.63/$30.35 for L1
      //   (equivalent to ×2.25 of FT = 225% of ordinary rate)
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
        description: 'Casual Saturday — ordinary casual rate (×1.0 of casual base)',
      },
      {
        employment_type: 'casual', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.12, addition_per_hour: null,
        description: 'Casual Sunday (outside span) — ×1.12 of casual base (= 140% of FT rate)',
      },
      {
        employment_type: 'casual', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.80, addition_per_hour: null,
        description: 'Casual public holiday — ×1.80 of casual base (= 225% of FT rate)',
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
    // Source: MA000028 clause 28 — Overtime.
    // Note: Sunday double time is modelled as a penalty rate above (×2.0 from first hour).
    // Only Mon–Sat overtime is calculated here (weekly threshold triggers OT at ×1.5 then ×2.0).
    //
    // FT/PT overtime (Mon–Sat only — Sunday handled via penalty rate):
    //   First 2 hours over 38/week: ×1.50
    //   After 40 hours/week:        ×2.00
    //
    // Casual overtime (applied to casual base = FT × 1.25):
    //   ×1.40 of casual base = ×1.75 of FT (as per pay guide: $42.49/$24.28 = 1.75)
    //   Casual OT premium over casual base: 1.40 - 1.0 = 0.40 → multiplier 1.40

    const overtimeRates = [
      // FT/PT weekly
      { employment_type: 'full_time',  threshold_hours: 38, period: 'weekly', multiplier: 1.50, description: 'Weekly overtime — first 2 hours over 38 (×1.50, Mon–Sat only)' },
      { employment_type: 'full_time',  threshold_hours: 40, period: 'weekly', multiplier: 2.00, description: 'Weekly overtime — after 40 hours (×2.00)' },
      { employment_type: 'part_time',  threshold_hours: 38, period: 'weekly', multiplier: 1.50, description: 'Part-time weekly overtime — first 2 hours over 38 (×1.50)' },
      { employment_type: 'part_time',  threshold_hours: 40, period: 'weekly', multiplier: 2.00, description: 'Part-time weekly overtime — after 40 hours (×2.00)' },
      // Casual weekly (×1.40 of casual base)
      { employment_type: 'casual', threshold_hours: 38, period: 'weekly', multiplier: 1.40, description: 'Casual weekly overtime — ×1.40 of casual base (= 175% of FT rate)' },
      { employment_type: 'casual', threshold_hours: 40, period: 'weekly', multiplier: 1.40, description: 'Casual weekly overtime (continued) — ×1.40 of casual base' },
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
    // Source: MA000028 pay guide, effective 1 July 2025.
    // Allowances marked * are "all-purpose" — they must be added to the base rate
    // BEFORE casual loading, penalty rates, and overtime are calculated.
    const allowances = [
      // All-purpose allowances (is_all_purpose = true)
      {
        allowance_type: 'first_aid',
        name: 'First aid allowance (all-purpose)',
        description: 'If you hold a current first aid certificate and your employer has appointed you as the person responsible for first aid, you receive $0.33 per hour as an all-purpose allowance. This is added to your base rate before casual loading and penalty rates are applied.',
        trigger_condition: 'Appointed by employer as the responsible first aider, and holding a current first aid certificate',
        amount: 0.33, amount_type: 'per_hour', per_unit: 'per_hour',
        is_all_purpose: true,
      },
      {
        allowance_type: 'leading_hand_2to6',
        name: 'Leading hand allowance — in charge of 2 to 6 employees (all-purpose)',
        description: 'If you are directed by management to be in charge of 2 to 6 employees, you receive $0.76 per hour as an all-purpose allowance. Added to base rate before casual loading, penalty rates, and overtime.',
        trigger_condition: 'Directed by employer to be in charge of 2 to 6 employees',
        amount: 0.76, amount_type: 'per_hour', per_unit: 'per_hour',
        is_all_purpose: true,
      },
      {
        allowance_type: 'leading_hand_7to10',
        name: 'Leading hand allowance — in charge of 7 to 10 employees (all-purpose)',
        description: 'If you are directed by management to be in charge of 7 to 10 employees, you receive $0.88 per hour as an all-purpose allowance. Added to base rate before casual loading, penalty rates, and overtime.',
        trigger_condition: 'Directed by employer to be in charge of 7 to 10 employees',
        amount: 0.88, amount_type: 'per_hour', per_unit: 'per_hour',
        is_all_purpose: true,
      },
      {
        allowance_type: 'leading_hand_11to20',
        name: 'Leading hand allowance — in charge of 11 to 20 employees (all-purpose)',
        description: 'If you are directed by management to be in charge of 11 to 20 employees, you receive $1.25 per hour as an all-purpose allowance. Added to base rate before casual loading, penalty rates, and overtime.',
        trigger_condition: 'Directed by employer to be in charge of 11 to 20 employees',
        amount: 1.25, amount_type: 'per_hour', per_unit: 'per_hour',
        is_all_purpose: true,
      },
      {
        allowance_type: 'leading_hand_21plus',
        name: 'Leading hand allowance — in charge of 21+ employees (all-purpose)',
        description: 'If you are directed by management to be in charge of more than 20 employees, you receive $1.58 per hour as an all-purpose allowance. Added to base rate before casual loading, penalty rates, and overtime.',
        trigger_condition: 'Directed by employer to be in charge of more than 20 employees',
        amount: 1.58, amount_type: 'per_hour', per_unit: 'per_hour',
        is_all_purpose: true,
      },
      {
        allowance_type: 'wet_work',
        name: 'Wet work allowance (all-purpose)',
        description: 'If you regularly work in wet conditions (e.g. harvesting in rain, washing and packing produce, or working with water-based chemicals), you receive $2.50 per hour as an all-purpose allowance. Added to base rate before casual loading, penalty rates, and overtime.',
        trigger_condition: 'Regularly working in wet conditions as part of ordinary duties',
        amount: 2.50, amount_type: 'per_hour', per_unit: 'per_hour',
        is_all_purpose: true,
      },
      // Non-all-purpose allowances
      {
        allowance_type: 'meal',
        name: 'Meal allowance',
        description: 'If you are required to work overtime, you are entitled to a meal allowance of $16.03 per meal period during overtime.',
        trigger_condition: 'Overtime worked — one meal allowance per meal period during overtime',
        amount: 16.03, amount_type: 'fixed', per_unit: 'per_meal',
        is_all_purpose: false,
      },
      {
        allowance_type: 'accommodation',
        name: 'Accommodation reimbursement',
        description: 'If your employer requires you to stay away from home overnight for work, you are entitled to reimbursement of the demonstrable cost of suitable accommodation.',
        trigger_condition: 'Employer-directed overnight stay away from usual residence',
        amount: null, amount_type: 'reimbursement', per_unit: 'per_night',
        is_all_purpose: false,
      },
      {
        allowance_type: 'tool_equipment',
        name: 'Tool and equipment reimbursement',
        description: 'If your employer requires you to use your own tools or equipment, you are entitled to reimbursement of the cost of those tools and equipment.',
        trigger_condition: 'Employer requires use of employee\'s own tools or equipment',
        amount: null, amount_type: 'reimbursement', per_unit: null,
        is_all_purpose: false,
      },
      {
        allowance_type: 'travelling_time',
        name: 'Travelling time allowance',
        description: 'If your employer requires you to travel to a different work location, you are entitled to payment at your appropriate rate for the time spent travelling.',
        trigger_condition: 'Employer-directed travel to a work location other than your usual place of work',
        amount: null, amount_type: 'at_ordinary_rate', per_unit: null,
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
    // MA000028 clause 24 — Breaks
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
    //   1. hort_experience — how much experience do you have?
    //   2. hort_role — what best describes your role? (conditional on experience)
    const questions = [
      {
        award_code: AWARD_CODE,
        question_key: 'hort_experience',
        question_text: 'How much horticulture experience do you have?',
        help_text: 'Level 1 applies to workers with no prior experience, or those learning basic tasks under close supervision. If you have completed 12 months in horticulture or hold a formal certificate, you are likely Level 2 or above.',
        question_type: 'single',
        stream: null,
        parent_question_key: null,
        parent_answer_key: null,
        sort_order: 1,
        answers: [
          { answer_key: 'entry', answer_text: 'Less than 12 months — I\'m new to horticulture', sort_order: 1 },
          { answer_key: 'skilled', answer_text: '12 months or more — I have experience or a formal qualification', sort_order: 2 },
        ],
      },
      {
        award_code: AWARD_CODE,
        question_key: 'hort_role',
        question_text: 'Which best describes your role and experience level?',
        help_text: 'Choose the option that best matches what you do. If you act as a leading hand or foreperson, select that option — a leading hand allowance will be asked about separately.',
        question_type: 'single',
        stream: null,
        parent_question_key: 'hort_experience',
        parent_answer_key: 'skilled',
        sort_order: 2,
        answers: [
          { answer_key: 'level2', answer_text: 'Skilled field or nursery hand — 12+ months experience or Certificate I/II', sort_order: 1 },
          { answer_key: 'level3', answer_text: 'Higher skilled — operates machinery, applies chemicals, or has 24+ months experience or Cert II/III', sort_order: 2 },
          { answer_key: 'level4', answer_text: 'Advanced worker — manages crop/nursery programs independently, may be a leading hand (2–6 employees)', sort_order: 3 },
          { answer_key: 'level5', answer_text: 'Foreperson or specialist — manages a team or section, holds Certificate IV or equivalent', sort_order: 4 },
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
    console.log('\n✅ MA000028 seed complete');
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
