/**
 * Seed script — Restaurant Industry Award 2020 [MA000119]
 * Pay rates effective 1 July 2025 (following 2025 Annual Wage Review — 3.5% increase)
 * Source: Fair Work Ombudsman pay guide MA000119, effective 1 July 2025
 *
 * Run after migrate.js: node scripts/seed_ma000119.js
 */
require('dotenv').config();
const pool = require('../src/db/pool');

const AWARD_CODE = 'MA000119';
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
      'Restaurant Industry Award 2020',
      EFFECTIVE_DATE,
      'https://www.fairwork.gov.au/employment-conditions/awards/awards-summary/ma000119-summary',
    ]);

    // ── Classifications ───────────────────────────────────────────────────────
    // MA000119 Schedule A — Classifications
    //
    // Levels and streams:
    //   Introductory (level=0, stream='introductory') — new starters, first ~3 months
    //   Level 1: food_beverage, kitchen
    //   Level 2: food_beverage, kitchen, general
    //   Level 3: food_beverage, kitchen, general
    //   Level 4: food_beverage, kitchen, general
    //   Level 5: food_beverage, kitchen, general
    //   Level 6: kitchen only (Cook Grade 5 — specialist trades)
    //
    // All streams at the same level have the same base rate.

    const classifications = [
      // ── Introductory ────────────────────────────────────────────────────────
      {
        level: 0, stream: 'introductory',
        title: 'Introductory Employee',
        description: 'You are new to the restaurant industry and are still learning the basics. The Introductory level applies for approximately your first 3 months, while you are being trained in your primary duties.',
        duties: [
          'Learning basic food service, kitchen, or general duties under close supervision',
          'Assisting more experienced staff with routine tasks',
          'Cleaning, setting up, and clearing away under direction',
          'Receiving on-the-job training and induction',
          'Following food safety and hygiene procedures as directed',
        ],
        indicative_tasks: ['New starter (front of house)', 'New kitchen hand', 'New general assistant'],
        sort_order: 0,
      },
      // ── Food & Beverage ─────────────────────────────────────────────────────
      {
        level: 1, stream: 'food_beverage',
        title: 'Food and Beverage Attendant Grade 1',
        description: 'You perform basic food and beverage service tasks under supervision. You carry and deliver food and drinks but do not take orders from customers.',
        duties: [
          'Carrying and delivering food and beverages to tables or guests',
          'Clearing tables and cleaning dining areas',
          'Setting and resetting tables for service',
          'Assisting other staff with basic tasks under supervision',
          'Operating a dishwasher and clearing equipment',
          'Replenishing supplies and condiments',
        ],
        indicative_tasks: ['Food runner', 'Busser / table hand', 'Basic catering assistant'],
        sort_order: 10,
      },
      {
        level: 2, stream: 'food_beverage',
        title: 'Food and Beverage Attendant Grade 2',
        description: 'You provide general food and beverage service and can perform routine tasks independently. You may prepare simple food and drinks, and handle basic cashier duties.',
        duties: [
          'Taking food and drink orders from customers at the counter or table',
          'Preparing and serving simple food items (e.g. sandwiches, snacks, hot drinks)',
          'Operating a cash register or EFTPOS terminal',
          'Serving and clearing tables independently',
          'Basic wine, beer, or beverage service without specialist knowledge',
          'Following food safety procedures independently',
        ],
        indicative_tasks: ['Café attendant', 'Counter server', 'Bar attendant (basic)', 'Catering attendant'],
        sort_order: 20,
      },
      {
        level: 3, stream: 'food_beverage',
        title: 'Food and Beverage Attendant Grade 3 (Trained)',
        description: 'You are an experienced food and beverage attendant who has completed relevant training. You take orders, use point-of-sale systems, and provide full table service.',
        duties: [
          'Providing full table or counter service including taking orders, serving, and clearing',
          'Operating point-of-sale systems and handling transactions',
          'Serving a full range of food and beverages, including alcoholic drinks',
          'Preparing and serving basic cocktails and mixed drinks',
          'Assisting guests with menu knowledge and recommendations',
          'Handling customer inquiries and complaints independently',
        ],
        indicative_tasks: ['Experienced waiter/waitress', 'Bar attendant (trained)', 'Restaurant server', 'Banquet attendant'],
        sort_order: 30,
      },
      {
        level: 4, stream: 'food_beverage',
        title: 'Food and Beverage Attendant Grade 4',
        description: 'You have specialist skills or trade qualifications in food and beverage service. You may be a licensed club worker, specialist wine or cocktail server, or have formal qualifications.',
        duties: [
          'Providing specialist wine, cocktail, or spirits service with in-depth product knowledge',
          'Advising guests on wine selection and food matching',
          'Performing advanced cocktail preparation',
          'Cellar or bar management duties',
          'Formal training and induction of junior staff',
          'Managing the dining room or bar area during a shift',
        ],
        indicative_tasks: ['Sommelier', 'Senior bar attendant', 'Cocktail specialist', 'Wine waiter', 'Pastrycook (café/restaurant front-of-house)'],
        sort_order: 40,
      },
      {
        level: 5, stream: 'food_beverage',
        title: 'Food and Beverage Supervisor / Grade 5',
        description: 'You supervise food and beverage staff, manage a section of operations, or hold advanced specialist skills in service. You have significant responsibility for operational outcomes.',
        duties: [
          'Supervising and directing food and beverage attendants on shift',
          'Overseeing service quality and guest satisfaction',
          'Handling escalated guest complaints',
          'Training and mentoring junior staff',
          'Managing stock, ordering, and equipment maintenance',
          'Opening or closing the venue',
        ],
        indicative_tasks: ['Food and beverage supervisor', 'Senior sommelier', 'Restaurant captain', 'Bar manager (non-management level)'],
        sort_order: 50,
      },
      // ── Kitchen ─────────────────────────────────────────────────────────────
      {
        level: 1, stream: 'kitchen',
        title: 'Kitchen Attendant Grade 1',
        description: 'You perform basic kitchen duties including cleaning, dishwashing, and simple food preparation under close supervision.',
        duties: [
          'Dishwashing and operating commercial dishwashers',
          'Cleaning kitchen surfaces, floors, and equipment',
          'Basic food preparation under supervision (e.g. peeling, cutting)',
          'Receiving deliveries and putting away stock under direction',
          'Keeping work areas tidy during service',
        ],
        indicative_tasks: ['Dishwasher', 'Kitchen hand (basic)', 'Steward'],
        sort_order: 11,
      },
      {
        level: 2, stream: 'kitchen',
        title: 'Kitchen Attendant Grade 2 / Cook Grade 1',
        description: 'You perform a wider range of kitchen tasks, including preparing vegetables and simple cooking. You may assist a qualified cook or chef.',
        duties: [
          'Preparing vegetables, salads, and simple garnishes',
          'Cooking straightforward items (e.g. toast, scrambled eggs, simple dishes)',
          'Assisting a qualified cook with mise en place',
          'Cleaning and maintaining kitchen equipment',
          'Operating basic kitchen equipment under supervision',
        ],
        indicative_tasks: ['Kitchen hand (experienced)', 'Cook assistant', 'Breakfast cook (entry)', 'Canteen cook (basic)'],
        sort_order: 21,
      },
      {
        level: 3, stream: 'kitchen',
        title: 'Cook Grade 2 / Kitchen Attendant Grade 3',
        description: 'You cook menu items from standard recipes with limited supervision, or you are an experienced kitchen hand who manages a section. You have practical cooking experience.',
        duties: [
          'Cooking menu items from established recipes independently',
          'Working a section of the kitchen (e.g. grill, fryer, salads)',
          'Managing mise en place for a section',
          'Assisting in writing daily specials under direction',
          'Training and guiding basic kitchen hands',
          'Ensuring food safety standards in your section',
        ],
        indicative_tasks: ['Short order cook', 'Grill cook', 'Experienced kitchen hand (Grade 3)', 'Café cook'],
        sort_order: 31,
      },
      {
        level: 4, stream: 'kitchen',
        title: 'Cook Grade 3 — Trade Qualified',
        description: 'You hold a trade qualification (Certificate III in Commercial Cookery or equivalent). You work independently across sections and can contribute to menu development.',
        duties: [
          'Cooking a full range of menu items to trade standard independently',
          'Running and managing a section of the kitchen during service',
          'Contributing to menu planning and daily specials',
          'Supervising kitchen hands in your section',
          'Maintaining and ordering stock for your section',
          'Ensuring hygiene, safety, and food quality standards',
        ],
        indicative_tasks: ['Qualified cook / chef (trade)', 'Section chef', 'Pastrycook (trade qualified)'],
        sort_order: 41,
      },
      {
        level: 5, stream: 'kitchen',
        title: 'Cook Grade 4 — Advanced Tradesperson',
        description: 'You are a highly experienced trade qualified cook with advanced skills. You may be a section head, sous chef-level practitioner, or specialist in an area of cooking.',
        duties: [
          'Managing a major kitchen section independently',
          'Supervising and training other trade-qualified cooks',
          'Significant contribution to menu development',
          'Advanced techniques in specialist cooking areas',
          'Coordinating section output during busy service',
          'Ordering, costing, and stock management for section',
        ],
        indicative_tasks: ['Senior chef de partie', 'Advanced pastrycook', 'Canteen cook (senior)', 'Specialist cook'],
        sort_order: 51,
      },
      {
        level: 6, stream: 'kitchen',
        title: 'Cook Grade 5 — Specialist',
        description: 'You are a specialist cook with advanced trade qualifications and expertise in a specialist area (e.g. patisserie, artisan bread). This is the highest kitchen classification under the award.',
        duties: [
          'Specialist pastry, confectionery, or artisan cooking at a high level',
          'Developing and refining specialist menus or products',
          'Training and supervising other qualified cooks',
          'Managing quality control for specialist products',
          'Advanced techniques that require specialist training or certification',
        ],
        indicative_tasks: ['Pastrycook Grade 5', 'Specialist chef', 'Artisan baker (qualified)'],
        sort_order: 61,
      },
      // ── General ─────────────────────────────────────────────────────────────
      {
        level: 2, stream: 'general',
        title: 'General Service Attendant Grade 2',
        description: 'You perform general duties such as cleaning, storeperson duties, or laundry. You have some experience and work with limited supervision.',
        duties: [
          'Cleaning and maintaining public and back-of-house areas',
          'Storeperson duties — receiving, checking, and putting away stock',
          'Laundry and linen duties',
          'Basic maintenance and equipment checks under direction',
          'Disposing of waste and recycling',
        ],
        indicative_tasks: ['Cleaner', 'Storeperson', 'Linen/laundry attendant', 'Garden/maintenance assistant'],
        sort_order: 22,
      },
      {
        level: 3, stream: 'general',
        title: 'General Service Attendant Grade 3',
        description: 'You handle more complex general duties, including handling customer transactions or operating specialist equipment. You work independently in your area.',
        duties: [
          'Handling customer enquiries and cash transactions',
          'Operating specialist equipment (e.g. mechanical polisher, small machinery)',
          'Coordinating deliveries and stock management independently',
          'Supervising basic cleaning or maintenance tasks',
        ],
        indicative_tasks: ['Senior cleaner', 'Experienced storeperson', 'Service cashier'],
        sort_order: 32,
      },
      {
        level: 4, stream: 'general',
        title: 'General Service Attendant Grade 4',
        description: 'You have supervisory or specialist responsibilities in general services. You may oversee a small team or perform advanced technical functions.',
        duties: [
          'Supervising general service staff on a shift',
          'Specialist trade functions in maintenance or housekeeping',
          'Training and directing junior general service staff',
          'Managing supply orders and stock for general services area',
        ],
        indicative_tasks: ['Supervisor (cleaning/stores)', 'Senior storeperson', 'Tradesperson (maintenance)'],
        sort_order: 42,
      },
      {
        level: 5, stream: 'general',
        title: 'General Service Attendant Grade 5',
        description: 'You have significant supervisory or specialist responsibilities in general services. You manage a section or team and may have trade qualifications.',
        duties: [
          'Managing a general services section and its staff',
          'Advanced trade skills and specialist functions',
          'Significant responsibility for compliance, safety, and standards',
          'Reporting to venue management on general services outcomes',
        ],
        indicative_tasks: ['General services manager (award-level)', 'Senior tradesperson', 'Head of housekeeping (award-level)'],
        sort_order: 52,
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
    // Source: FWO pay guide MA000119, effective 1 July 2025.
    // Rates are per level — all streams at the same level have the same base rate.
    // Casual = FT/PT rate × 1.25 (25% casual loading).
    const rateByLevel = {
      0: 24.28,   // Introductory
      1: 24.95,   // Level 1
      2: 25.85,   // Level 2
      3: 26.70,   // Level 3
      4: 28.12,   // Level 4
      5: 29.88,   // Level 5
      6: 30.68,   // Level 6
    };

    const classResult = await client.query(
      'SELECT id, level, stream FROM classifications WHERE award_code = $1',
      [AWARD_CODE]
    );

    for (const cls of classResult.rows) {
      const baseRate = rateByLevel[cls.level];
      if (baseRate === undefined) continue;

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
    // Source: MA000119 clause 29 — Penalty rates
    //
    // Evening/night rates are flat dollar ADDITIONS (like MA000009, unlike MA000003).
    // Time bands differ from MA000009:
    //   MA000119: 10pm–midnight +$2.81/hr; midnight–6am +$4.22/hr
    //   MA000009: 7pm–midnight +$2.81/hr; midnight–7am +$4.22/hr
    //
    // Casual Sunday split:
    //   Level ≤2 (Intro, L1, L2): 150% of FT rate = ×1.20 of casual base
    //   Level 3–6:                175% of FT rate = ×1.40 of casual base
    //   DB stores ×1.40 (L3–6 default); ≤L2 override applied in awardCalculator.js.

    const penaltyRates = [
      // ── Full-time ──────────────────────────────────────────────────────────
      {
        employment_type: 'full_time', day_type: 'weekday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.0, addition_per_hour: null,
        description: 'Ordinary weekday rate',
      },
      {
        employment_type: 'full_time', day_type: 'weekday',
        time_band_start: '22:00', time_band_end: '00:00',
        time_band_label: 'evening_10pm_to_midnight',
        multiplier: 1.0, addition_per_hour: 2.81,
        description: 'Weekday evening (10pm–midnight) +$2.81/hr',
      },
      {
        employment_type: 'full_time', day_type: 'weekday',
        time_band_start: '00:00', time_band_end: '06:00',
        time_band_label: 'night_midnight_to_6am',
        multiplier: 1.0, addition_per_hour: 4.22,
        description: 'Weekday night (midnight–6am) +$4.22/hr',
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
        multiplier: 2.25, addition_per_hour: null,
        description: 'Public holiday — double time and a quarter (×2.25)',
      },
      // ── Part-time (same as full-time) ──────────────────────────────────────
      {
        employment_type: 'part_time', day_type: 'weekday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.0, addition_per_hour: null,
        description: 'Ordinary weekday rate',
      },
      {
        employment_type: 'part_time', day_type: 'weekday',
        time_band_start: '22:00', time_band_end: '00:00',
        time_band_label: 'evening_10pm_to_midnight',
        multiplier: 1.0, addition_per_hour: 2.81,
        description: 'Weekday evening (10pm–midnight) +$2.81/hr',
      },
      {
        employment_type: 'part_time', day_type: 'weekday',
        time_band_start: '00:00', time_band_end: '06:00',
        time_band_label: 'night_midnight_to_6am',
        multiplier: 1.0, addition_per_hour: 4.22,
        description: 'Weekday night (midnight–6am) +$4.22/hr',
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
        multiplier: 2.25, addition_per_hour: null,
        description: 'Public holiday — double time and a quarter (×2.25)',
      },
      // ── Casual ─────────────────────────────────────────────────────────────
      // Casual base rate includes 25% loading. Penalty multipliers are relative to casual base.
      {
        employment_type: 'casual', day_type: 'weekday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.0, addition_per_hour: null,
        description: 'Ordinary casual weekday rate (includes 25% loading)',
      },
      {
        employment_type: 'casual', day_type: 'weekday',
        time_band_start: '22:00', time_band_end: '00:00',
        time_band_label: 'evening_10pm_to_midnight',
        multiplier: 1.0, addition_per_hour: 2.81,
        description: 'Casual weekday evening (10pm–midnight) +$2.81/hr',
      },
      {
        employment_type: 'casual', day_type: 'weekday',
        time_band_start: '00:00', time_band_end: '06:00',
        time_band_label: 'night_midnight_to_6am',
        multiplier: 1.0, addition_per_hour: 4.22,
        description: 'Casual weekday night (midnight–6am) +$4.22/hr',
      },
      {
        employment_type: 'casual', day_type: 'saturday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.20, addition_per_hour: null,
        description: 'Casual Saturday — ×1.20 of casual base rate (150% of FT)',
      },
      {
        employment_type: 'casual', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.40, addition_per_hour: null,
        description: 'Casual Sunday — ×1.40 (L3–L6, 175% of FT); ≤L2 is ×1.20 — applied by calculator',
      },
      {
        employment_type: 'casual', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.00, addition_per_hour: null,
        description: 'Casual public holiday — ×2.0 of casual base rate',
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
    // MA000119 clause 28 — Overtime
    // Weekly overtime for FT/PT:
    //   M–F: first 2 hours over 38/week ×1.5, thereafter ×2.0
    //   Saturday: first 2 hours ×1.75, thereafter ×2.0 (complex daily rule — approximated as weekly here)
    //   Sunday and RDO overtime: ×2.0
    // For simplicity we implement the weekly threshold only (standard weekly overtime).
    //
    // Casual overtime — clause 20.4(b):
    //   Casual employees working in excess of 11 hours on any day are paid overtime.
    //   First 3 hours beyond 11: ×1.50 of casual rate. Thereafter: ×2.00 of casual rate.
    const overtimeRates = [
      {
        employment_type: 'full_time',
        threshold_hours: 38, period: 'weekly',
        multiplier: 1.5,
        description: 'Weekly overtime — first 2 hours over 38 (×1.5)',
      },
      {
        employment_type: 'full_time',
        threshold_hours: 40, period: 'weekly',
        multiplier: 2.0,
        description: 'Weekly overtime — after 40 hours (×2.0)',
      },
      {
        employment_type: 'part_time',
        threshold_hours: 38, period: 'weekly',
        multiplier: 1.5,
        description: 'Part-time weekly overtime — first 2 hours (×1.5)',
      },
      {
        employment_type: 'part_time',
        threshold_hours: 40, period: 'weekly',
        multiplier: 2.0,
        description: 'Part-time weekly overtime — after 40 hours (×2.0)',
      },
      // Casual daily overtime — clause 20.4(b)
      {
        employment_type: 'casual',
        threshold_hours: 11, period: 'daily',
        multiplier: 1.5,
        description: 'Casual daily overtime — first 3 hours over 11 (×1.5 of casual rate)',
      },
      {
        employment_type: 'casual',
        threshold_hours: 14, period: 'daily',
        multiplier: 2.0,
        description: 'Casual daily overtime — after 14 hours (×2.0 of casual rate)',
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
    // Source: MA000119 clause 20 — Allowances; FWO pay guide effective 1 July 2025.
    const allowances = [
      {
        allowance_type: 'split_shift',
        name: 'Split shift allowance',
        description: 'If you work a split shift (two or more separate periods of work in a day with an unpaid break in between), you are entitled to a split shift allowance for each split shift period worked.',
        trigger_condition: 'Working a split shift (two or more separate attendance periods in one day)',
        amount: 5.34, amount_type: 'fixed', per_unit: 'per_split_shift',
      },
      {
        allowance_type: 'meal',
        name: 'Meal allowance (overtime)',
        description: 'If you work overtime without being given at least 24 hours notice, you are entitled to a meal allowance. Not payable to casual employees.',
        trigger_condition: 'Overtime worked without 24 hours notice, FT/PT only',
        amount: 16.73, amount_type: 'fixed', per_unit: 'per_meal',
      },
      {
        allowance_type: 'tool',
        name: 'Tool allowance',
        description: 'If you are required to provide your own tools (e.g. knives, cooking equipment), you are entitled to a tool allowance.',
        trigger_condition: 'Required to supply own tools or equipment',
        amount: 2.03, amount_type: 'daily', per_unit: 'per_day',
      },
      {
        allowance_type: 'special_clothing',
        name: 'Special clothing reimbursement',
        description: 'If your employer requires you to wear special clothing (other than a standard uniform), and you are required to buy and maintain it yourself, you are entitled to reimbursement of reasonable costs.',
        trigger_condition: 'Required to purchase and maintain special clothing specified by employer',
        amount: null, amount_type: 'reimbursement', per_unit: null,
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
    // MA000119 clause 30 — Breaks
    const breaks = [
      {
        employment_type: null,
        shift_hours_min: 4.0, shift_hours_max: null,
        break_type: 'rest', break_duration_min: 10, is_paid: true,
        timing_rule: 'Roughly in the middle of each 4-hour work period',
        description: 'For every 4 hours you work (or part thereof), you are entitled to a 10-minute paid rest break.',
      },
      {
        employment_type: null,
        shift_hours_min: 5.0, shift_hours_max: null,
        break_type: 'meal', break_duration_min: 30, is_paid: false,
        timing_rule: 'No later than 5 hours after starting work',
        description: 'If you work more than 5 hours straight, you must get an unpaid meal break of at least 30 minutes.',
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
    // Three-level parent-based question flow for MA000119:
    //   1. rest_experience — are you new to restaurant work? (always shown)
    //   2. rest_stream — what area do you work in? (shown when rest_experience = 'experienced')
    //   3. rest_fb_level — F&B level (shown when rest_stream = 'food_beverage')
    //      rest_kitchen_level — kitchen level (shown when rest_stream = 'kitchen')
    //      rest_general_level — general level (shown when rest_stream = 'general')

    const questions = [
      {
        award_code: AWARD_CODE,
        question_key: 'rest_experience',
        question_text: 'Are you new to restaurant or hospitality work?',
        help_text: 'The Introductory level applies to employees who are still learning the job, typically in their first few months.',
        question_type: 'single',
        stream: null,
        parent_question_key: null,
        parent_answer_key: null,
        sort_order: 1,
        answers: [
          { answer_key: 'introductory', answer_text: 'Yes — I\'m new to this type of work (generally first 3 months)', sort_order: 1 },
          { answer_key: 'experienced', answer_text: 'No — I have restaurant or hospitality experience', sort_order: 2 },
        ],
      },
      {
        award_code: AWARD_CODE,
        question_key: 'rest_stream',
        question_text: 'Which area do you mainly work in?',
        help_text: 'Choose the area that best describes where you spend most of your time.',
        question_type: 'single',
        stream: null,
        parent_question_key: 'rest_experience',
        parent_answer_key: 'experienced',
        sort_order: 2,
        answers: [
          { answer_key: 'food_beverage', answer_text: 'Food & Beverage — front of house, waiting, bar service', sort_order: 1 },
          { answer_key: 'kitchen', answer_text: 'Kitchen — cooking, food preparation, kitchen work', sort_order: 2 },
          { answer_key: 'general', answer_text: 'General — cleaning, storeperson, laundry, maintenance', sort_order: 3 },
        ],
      },
      {
        award_code: AWARD_CODE,
        question_key: 'rest_fb_level',
        question_text: 'Which best describes your food & beverage role?',
        help_text: 'Pick the option that matches what you actually do most of the time.',
        question_type: 'single',
        stream: null,
        parent_question_key: 'rest_stream',
        parent_answer_key: 'food_beverage',
        sort_order: 3,
        answers: [
          { answer_key: 'grade1', answer_text: 'I carry and deliver food/drinks but don\'t take orders (food runner, busser)', sort_order: 1 },
          { answer_key: 'grade2', answer_text: 'I provide general service — take simple orders, operate the register, basic table service', sort_order: 2 },
          { answer_key: 'grade3', answer_text: 'I\'m an experienced server — take orders, full table service, handle transactions independently', sort_order: 3 },
          { answer_key: 'grade4', answer_text: 'I have specialist skills — wine knowledge, advanced cocktails, or formal trade qualifications', sort_order: 4 },
          { answer_key: 'grade5', answer_text: 'I supervise food & beverage staff or manage a service section', sort_order: 5 },
        ],
      },
      {
        award_code: AWARD_CODE,
        question_key: 'rest_kitchen_level',
        question_text: 'Which best describes your kitchen role?',
        help_text: 'Pick the option that matches your actual duties and qualifications.',
        question_type: 'single',
        stream: null,
        parent_question_key: 'rest_stream',
        parent_answer_key: 'kitchen',
        sort_order: 4,
        answers: [
          { answer_key: 'attendant1', answer_text: 'Dishwashing, basic cleaning, and simple food prep under supervision (kitchen hand / steward)', sort_order: 1 },
          { answer_key: 'attendant2_cook1', answer_text: 'Preparing vegetables, basic cooking, assisting a cook (kitchen hand / cook assistant)', sort_order: 2 },
          { answer_key: 'cook2', answer_text: 'Cooking menu items from recipes independently, working a section (short order cook, café cook)', sort_order: 3 },
          { answer_key: 'cook3', answer_text: 'Trade qualified cook / chef (Certificate III or equivalent) — work independently across sections', sort_order: 4 },
          { answer_key: 'cook4', answer_text: 'Advanced tradesperson — section head, senior chef de partie, or specialist role', sort_order: 5 },
          { answer_key: 'cook5', answer_text: 'Specialist cook — advanced pastry, artisan or confectionery specialist', sort_order: 6 },
        ],
      },
      {
        award_code: AWARD_CODE,
        question_key: 'rest_general_level',
        question_text: 'Which best describes your general service role?',
        help_text: 'General service covers cleaning, stores, laundry, and similar duties.',
        question_type: 'single',
        stream: null,
        parent_question_key: 'rest_stream',
        parent_answer_key: 'general',
        sort_order: 5,
        answers: [
          { answer_key: 'level2', answer_text: 'Cleaning, storeperson, or laundry with some experience (general duties, limited supervision)', sort_order: 1 },
          { answer_key: 'level3', answer_text: 'Experienced general worker — handles customer transactions or specialist equipment', sort_order: 2 },
          { answer_key: 'level4', answer_text: 'Supervises general service staff or performs advanced/trade functions', sort_order: 3 },
          { answer_key: 'level5', answer_text: 'Manages a general services section or is a senior tradesperson', sort_order: 4 },
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
    console.log('\n✅ MA000119 seed complete');
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
