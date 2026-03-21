/**
 * Seed script — Registered and Licensed Clubs Award 2020 [MA000058]
 * Pay rates effective 1 July 2025
 * Source: Fair Work Ombudsman pay guide, effective 1 July 2025
 *
 * Award covers: employees in registered and licensed clubs, including food &
 * beverage, kitchen, administration, gaming, and maintenance staff.
 *
 * Classification structure (simplified — the award has many sub-streams but
 * rates are shared across common groupings):
 *
 *   Stream 'food_beverage' (6 levels):
 *     L0 = Introductory               — $24.28/hr
 *     L1 = F&B Grade 1                — $24.95/hr
 *     L2 = F&B Grade 2                — $25.85/hr
 *     L3 = F&B/Gaming Grade 3         — $26.70/hr
 *     L4 = F&B Tradesperson Grade 4   — $28.12/hr
 *     L5 = F&B/Gaming Grade 5         — $29.88/hr
 *
 *   Stream 'kitchen' (7 levels):
 *     L0 = Introductory               — $24.28/hr
 *     L1 = Kitchen Attendant Grade 1  — $24.95/hr
 *     L2 = Kitchen Att. G2 / Cook G1  — $25.85/hr
 *     L3 = Kitchen Att. G3 / Cook G2  — $26.70/hr
 *     L4 = Cook Tradesperson Grade 3  — $28.12/hr
 *     L5 = Cook Tradesperson Grade 4  — $29.88/hr
 *     L6 = Cook Tradesperson Grade 5  — $30.68/hr
 *
 *   Stream 'admin' (5 levels):
 *     L0 = Introductory               — $24.28/hr
 *     L2 = Clerical Grade 1           — $25.85/hr
 *     L3 = Clerical Grade 2           — $26.70/hr
 *     L4 = Clerical Grade 3           — $28.12/hr
 *     L5 = Clerical Supervisor        — $29.88/hr
 *
 *   Stream 'maintenance' (5 levels):
 *     L0 = Introductory               — $24.28/hr
 *     L2 = Maintenance/Hort Level 1   — $25.85/hr
 *     L3 = Maintenance/Hort Level 2   — $26.70/hr
 *     L4 = Maint/Hort Tradesperson L3 — $28.12/hr
 *     L5 = Maint/Hort Tradesperson L4 — $29.88/hr
 *
 * Penalty structure mirrors MA000009 (Hospitality).
 * Junior rates: same as MA000009 — under 17=50%, 17=60%, 18=70%, 19=85%, 20+=adult.
 *
 * Run after migrate.js: node scripts/seed_ma000058.js
 */
require('dotenv').config();
const pool = require('../src/db/pool');

const AWARD_CODE = 'MA000058';
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
      'Registered and Licensed Clubs Award 2020',
      EFFECTIVE_DATE,
      'https://www.fairwork.gov.au/employment-conditions/awards/awards-summary/ma000058-summary',
    ]);

    // ── Classifications ───────────────────────────────────────────────────────

    const classifications = [
      // ── food_beverage stream ──────────────────────────────────────────────
      {
        level: 0, stream: 'food_beverage',
        title: 'Introductory',
        description: 'New employee in a club undergoing structured training. You perform basic duties under close supervision during an introductory period.',
        duties: [
          'Performing basic tasks under close supervision',
          'Learning club procedures and safety requirements',
          'Assisting experienced staff with service duties',
          'Maintaining cleanliness of service areas',
        ],
        indicative_tasks: ['New club employee', 'Trainee food & beverage attendant'],
        sort_order: 10,
      },
      {
        level: 1, stream: 'food_beverage',
        title: 'F&B Grade 1',
        description: 'Entry-level food and beverage attendant. You perform routine service tasks such as clearing tables, restocking, and assisting members and guests.',
        duties: [
          'Clearing and setting tables',
          'Restocking bar and service areas',
          'Greeting and directing members and guests',
          'Basic food and drink service under supervision',
          'Cleaning and maintaining service areas',
        ],
        indicative_tasks: ['Bar useful', 'Dining room attendant', 'Glassware attendant', 'Functions assistant'],
        sort_order: 20,
      },
      {
        level: 2, stream: 'food_beverage',
        title: 'F&B Grade 2',
        description: 'Experienced food and beverage attendant. You perform a range of service duties with minimal supervision, including drink preparation, food service, and cash handling.',
        duties: [
          'Preparing and serving drinks including basic cocktails',
          'Providing table service for food and beverages',
          'Operating point-of-sale systems and handling cash',
          'Advising members on menu items and drink selections',
          'Monitoring responsible service of alcohol compliance',
        ],
        indicative_tasks: ['Bar attendant', 'Waiter/waitress', 'Cellar attendant', 'Functions attendant'],
        sort_order: 30,
      },
      {
        level: 3, stream: 'food_beverage',
        title: 'F&B/Gaming Grade 3',
        description: 'Skilled food and beverage or gaming attendant. You work independently, may supervise junior staff, and have specialised knowledge in your area.',
        duties: [
          'Supervising junior food and beverage staff',
          'Advanced drink preparation and bar management',
          'Gaming floor operations and machine monitoring',
          'Handling member complaints and complex enquiries',
          'Training new staff in service procedures',
          'Stock control and ordering within area of responsibility',
        ],
        indicative_tasks: ['Senior bar attendant', 'Head waiter/waitress', 'Gaming attendant', 'Functions coordinator'],
        sort_order: 40,
      },
      {
        level: 4, stream: 'food_beverage',
        title: 'F&B Tradesperson Grade 4',
        description: 'Trade-qualified or highly experienced food and beverage professional. You hold relevant qualifications or equivalent experience and work with a high degree of autonomy.',
        duties: [
          'Performing trade-level food and beverage duties',
          'Managing bar operations including stocktake and budgets',
          'Advanced wine and beverage knowledge and service',
          'Training and mentoring staff across the department',
          'Ensuring compliance with all licensing and food safety requirements',
        ],
        indicative_tasks: ['Bar supervisor', 'Sommelier', 'Senior gaming attendant', 'Qualified functions manager'],
        sort_order: 50,
      },
      {
        level: 5, stream: 'food_beverage',
        title: 'F&B/Gaming Grade 5',
        description: 'Senior specialist in food and beverage or gaming operations. You oversee significant areas of club operations, manage teams, and have advanced specialist skills.',
        duties: [
          'Overall responsibility for food and beverage or gaming operations',
          'Managing and coordinating teams of staff',
          'Budget preparation and financial management for department',
          'Developing menus, promotions, and service standards',
          'Liaising with management on strategic planning',
          'Ensuring regulatory compliance across operations',
        ],
        indicative_tasks: ['Food & beverage manager', 'Gaming manager', 'Senior functions manager', 'Club operations supervisor'],
        sort_order: 60,
      },
      // ── kitchen stream ────────────────────────────────────────────────────
      {
        level: 0, stream: 'kitchen',
        title: 'Introductory',
        description: 'New kitchen employee undergoing structured training. You perform basic kitchen duties under close supervision.',
        duties: [
          'Performing basic kitchen tasks under supervision',
          'Learning food safety and hygiene procedures',
          'Assisting with dishwashing and kitchen cleaning',
          'Preparing simple ingredients as directed',
        ],
        indicative_tasks: ['New kitchen hand', 'Trainee kitchen attendant'],
        sort_order: 110,
      },
      {
        level: 1, stream: 'kitchen',
        title: 'Kitchen Attendant Grade 1',
        description: 'Entry-level kitchen attendant. You perform routine kitchen duties such as dishwashing, cleaning, and basic food preparation under supervision.',
        duties: [
          'Dishwashing and maintaining kitchen cleanliness',
          'Basic food preparation tasks (peeling, chopping, portioning)',
          'Operating kitchen equipment under supervision',
          'Receiving and storing deliveries',
          'Maintaining hygiene and food safety standards',
        ],
        indicative_tasks: ['Kitchen hand', 'Dishwasher', 'Kitchen porter', 'Food prep assistant'],
        sort_order: 120,
      },
      {
        level: 2, stream: 'kitchen',
        title: 'Kitchen Attendant Grade 2 / Cook Grade 1',
        description: 'Experienced kitchen attendant or entry-level cook. You prepare and cook basic menu items with limited supervision.',
        duties: [
          'Cooking basic menu items from recipes',
          'Operating a range of kitchen equipment',
          'Assisting qualified cooks with meal preparation',
          'Monitoring food quality and presentation',
          'Following food safety procedures independently',
        ],
        indicative_tasks: ['Senior kitchen hand', 'Breakfast cook', 'Short-order cook', 'Sandwich hand'],
        sort_order: 130,
      },
      {
        level: 3, stream: 'kitchen',
        title: 'Kitchen Attendant Grade 3 / Cook Grade 2',
        description: 'Skilled kitchen attendant or experienced cook. You prepare a variety of dishes independently and may supervise junior kitchen staff.',
        duties: [
          'Preparing and cooking a range of menu items independently',
          'Supervising kitchen attendants and junior cooks',
          'Menu planning input and recipe development',
          'Stock control and requisitioning within kitchen area',
          'Maintaining food safety documentation',
        ],
        indicative_tasks: ['Experienced cook', 'Section cook', 'Senior kitchen attendant', 'Pastry cook (non-trade)'],
        sort_order: 140,
      },
      {
        level: 4, stream: 'kitchen',
        title: 'Cook Tradesperson Grade 3',
        description: 'Trade-qualified cook. You hold a relevant trade qualification (Certificate III Commercial Cookery or equivalent) and work at trade level.',
        duties: [
          'Preparing and cooking complex dishes at trade level',
          'Developing menus and creating new recipes',
          'Training and supervising junior kitchen staff',
          'Managing food cost control and stock ordering',
          'Ensuring compliance with food safety regulations',
          'Operating and maintaining all kitchen equipment',
        ],
        indicative_tasks: ['Qualified cook', 'Trade chef', 'Pastry cook (trade)', 'Chef de partie'],
        sort_order: 150,
      },
      {
        level: 5, stream: 'kitchen',
        title: 'Cook Tradesperson Grade 4',
        description: 'Senior trade-qualified cook with additional responsibilities. You supervise kitchen operations and have advanced culinary skills.',
        duties: [
          'Overseeing kitchen operations across multiple sections',
          'Full responsibility for menu planning and development',
          'Managing kitchen staff rosters and training programs',
          'Budget management and cost control for kitchen operations',
          'Advanced culinary techniques and specialist cuisine',
          'Liaising with management on food and beverage strategy',
        ],
        indicative_tasks: ['Sous chef', 'Senior chef', 'Kitchen supervisor', 'Pastry chef'],
        sort_order: 160,
      },
      {
        level: 6, stream: 'kitchen',
        title: 'Cook Tradesperson Grade 5',
        description: 'Head chef or executive kitchen role. You have overall responsibility for kitchen operations, staff management, and culinary standards.',
        duties: [
          'Overall management of kitchen operations',
          'Full budget and P&L responsibility for kitchen',
          'Strategic menu planning and food concept development',
          'Recruitment, training, and performance management of all kitchen staff',
          'Ensuring regulatory compliance across all food operations',
          'Representing the club at industry events and competitions',
        ],
        indicative_tasks: ['Head chef', 'Executive chef', 'Kitchen manager', 'Catering manager'],
        sort_order: 170,
      },
      // ── admin stream ──────────────────────────────────────────────────────
      {
        level: 0, stream: 'admin',
        title: 'Introductory',
        description: 'New administration employee undergoing structured training in club office procedures.',
        duties: [
          'Learning office and administrative procedures',
          'Performing basic filing and data entry',
          'Answering phones and directing enquiries',
          'Assisting experienced admin staff',
        ],
        indicative_tasks: ['New office worker', 'Trainee receptionist'],
        sort_order: 210,
      },
      {
        level: 2, stream: 'admin',
        title: 'Clerical Grade 1',
        description: 'Entry-level clerical worker performing routine administrative duties under supervision.',
        duties: [
          'Filing, photocopying, and general office duties',
          'Data entry and basic record-keeping',
          'Handling incoming and outgoing mail',
          'Reception duties and directing phone calls',
          'Processing membership applications',
        ],
        indicative_tasks: ['Office assistant', 'Receptionist', 'Data entry clerk', 'Membership clerk'],
        sort_order: 220,
      },
      {
        level: 3, stream: 'admin',
        title: 'Clerical Grade 2',
        description: 'Experienced clerical worker performing a range of administrative tasks with minimal supervision.',
        duties: [
          'Processing accounts payable and receivable',
          'Maintaining membership databases and records',
          'Preparing correspondence and reports',
          'Coordinating bookings and scheduling',
          'Operating office software and systems independently',
        ],
        indicative_tasks: ['Accounts clerk', 'Senior receptionist', 'Membership coordinator', 'Secretary'],
        sort_order: 230,
      },
      {
        level: 4, stream: 'admin',
        title: 'Clerical Grade 3',
        description: 'Skilled administrative worker with specialised knowledge. You may supervise junior clerical staff.',
        duties: [
          'Preparing financial reports and BAS returns',
          'Payroll processing and employee records management',
          'Supervising junior administrative staff',
          'Managing purchasing and supplier relationships',
          'Implementing and maintaining office systems and procedures',
        ],
        indicative_tasks: ['Bookkeeper', 'Payroll officer', 'Office manager', 'Senior accounts clerk'],
        sort_order: 240,
      },
      {
        level: 5, stream: 'admin',
        title: 'Clerical Supervisor',
        description: 'Senior administrative supervisor responsible for managing the club\'s administrative functions.',
        duties: [
          'Overall management of administrative operations',
          'Supervising and coordinating all clerical staff',
          'Financial administration and reporting to management',
          'Policy development and implementation',
          'Liaising with external parties (auditors, suppliers, regulators)',
          'Managing club compliance and governance documentation',
        ],
        indicative_tasks: ['Administration manager', 'Finance supervisor', 'Senior office manager', 'Compliance officer'],
        sort_order: 250,
      },
      // ── maintenance stream ────────────────────────────────────────────────
      {
        level: 0, stream: 'maintenance',
        title: 'Introductory',
        description: 'New maintenance or grounds employee undergoing structured training.',
        duties: [
          'Learning maintenance and grounds procedures',
          'Performing basic cleaning and tidying tasks',
          'Assisting experienced maintenance staff',
          'Learning equipment operation under supervision',
        ],
        indicative_tasks: ['New grounds worker', 'Trainee maintenance assistant'],
        sort_order: 310,
      },
      {
        level: 2, stream: 'maintenance',
        title: 'Maintenance/Hort Level 1',
        description: 'Entry-level maintenance or horticulture worker performing routine tasks under supervision.',
        duties: [
          'General cleaning and maintenance of club premises',
          'Basic grounds maintenance (mowing, watering, weeding)',
          'Setting up and packing down function rooms',
          'Minor repairs and maintenance tasks',
          'Waste management and recycling',
        ],
        indicative_tasks: ['Cleaner', 'Grounds assistant', 'Maintenance assistant', 'Handyperson'],
        sort_order: 320,
      },
      {
        level: 3, stream: 'maintenance',
        title: 'Maintenance/Hort Level 2',
        description: 'Experienced maintenance or horticulture worker performing a range of tasks with minimal supervision.',
        duties: [
          'Performing building maintenance and minor repairs independently',
          'Operating and maintaining grounds equipment',
          'Garden and landscape maintenance to established standards',
          'Pool and facility maintenance',
          'Coordinating with contractors and suppliers',
        ],
        indicative_tasks: ['Senior cleaner', 'Grounds worker', 'Maintenance worker', 'Pool attendant'],
        sort_order: 330,
      },
      {
        level: 4, stream: 'maintenance',
        title: 'Maintenance/Hort Tradesperson Level 3',
        description: 'Trade-qualified maintenance or horticulture worker. You hold relevant trade qualifications and work at trade level.',
        duties: [
          'Trade-level maintenance work (electrical, plumbing, carpentry)',
          'Diagnosing and repairing complex facility issues',
          'Managing preventive maintenance programs',
          'Supervising non-trade maintenance staff',
          'Ensuring compliance with building codes and safety standards',
        ],
        indicative_tasks: ['Trade-qualified maintenance worker', 'Qualified horticulturist', 'Electrician', 'Plumber'],
        sort_order: 340,
      },
      {
        level: 5, stream: 'maintenance',
        title: 'Maintenance/Hort Tradesperson Level 4',
        description: 'Senior trade-qualified maintenance or horticulture worker with supervisory responsibilities.',
        duties: [
          'Overall management of maintenance and grounds operations',
          'Budget preparation and expenditure management',
          'Managing maintenance teams and external contractors',
          'Strategic facility planning and capital works coordination',
          'Ensuring all regulatory compliance for buildings and grounds',
          'Training and mentoring trade and non-trade staff',
        ],
        indicative_tasks: ['Maintenance manager', 'Grounds supervisor', 'Facilities manager', 'Head groundsman'],
        sort_order: 350,
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
    // Source: FWO pay guide, effective 1 July 2025.
    // Casual rate = FT/PT rate × 1.25 (25% casual loading), pre-calculated in pay guide.
    const baseRates = {
      food_beverage: { 0: 24.28, 1: 24.95, 2: 25.85, 3: 26.70, 4: 28.12, 5: 29.88 },
      kitchen:       { 0: 24.28, 1: 24.95, 2: 25.85, 3: 26.70, 4: 28.12, 5: 29.88, 6: 30.68 },
      admin:         { 0: 24.28, 2: 25.85, 3: 26.70, 4: 28.12, 5: 29.88 },
      maintenance:   { 0: 24.28, 2: 25.85, 3: 26.70, 4: 28.12, 5: 29.88 },
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
    // Same penalty structure as MA000009 (Hospitality Award).
    // FT/PT: Weekday 7pm–midnight +$2.81/hr, midnight–7am +$4.22/hr,
    //        Saturday ×1.50, Sunday ×1.75, PH ×2.50.
    // Casual: Weekday evening/night same flat additions,
    //         Saturday ×1.20, Sunday ×1.40, PH ×2.00 (of casual base).

    const penaltyRates = [
      // ── Full-time ──────────────────────────────────────────────────────────
      {
        employment_type: 'full_time', day_type: 'weekday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.0, addition_per_hour: null,
        description: 'Ordinary weekday rate — no penalty',
      },
      {
        employment_type: 'full_time', day_type: 'weekday',
        time_band_start: '19:00', time_band_end: '00:00',
        time_band_label: 'evening_7pm_to_midnight',
        multiplier: 1.0, addition_per_hour: 2.81,
        description: 'Weekday evening (7pm–midnight) — +$2.81/hr flat addition',
      },
      {
        employment_type: 'full_time', day_type: 'weekday',
        time_band_start: '00:00', time_band_end: '07:00',
        time_band_label: 'night_midnight_to_7am',
        multiplier: 1.0, addition_per_hour: 4.22,
        description: 'Weekday night (midnight–7am) — +$4.22/hr flat addition',
      },
      {
        employment_type: 'full_time', day_type: 'saturday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.50, addition_per_hour: null,
        description: 'Saturday — ×1.50 penalty rate',
      },
      {
        employment_type: 'full_time', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.75, addition_per_hour: null,
        description: 'Sunday — ×1.75 penalty rate',
      },
      {
        employment_type: 'full_time', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.50, addition_per_hour: null,
        description: 'Public holiday — ×2.50 penalty rate',
      },
      // ── Part-time (same as full-time) ──────────────────────────────────────
      {
        employment_type: 'part_time', day_type: 'weekday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.0, addition_per_hour: null,
        description: 'Ordinary weekday rate — no penalty',
      },
      {
        employment_type: 'part_time', day_type: 'weekday',
        time_band_start: '19:00', time_band_end: '00:00',
        time_band_label: 'evening_7pm_to_midnight',
        multiplier: 1.0, addition_per_hour: 2.81,
        description: 'Weekday evening (7pm–midnight) — +$2.81/hr flat addition',
      },
      {
        employment_type: 'part_time', day_type: 'weekday',
        time_band_start: '00:00', time_band_end: '07:00',
        time_band_label: 'night_midnight_to_7am',
        multiplier: 1.0, addition_per_hour: 4.22,
        description: 'Weekday night (midnight–7am) — +$4.22/hr flat addition',
      },
      {
        employment_type: 'part_time', day_type: 'saturday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.50, addition_per_hour: null,
        description: 'Saturday — ×1.50 penalty rate',
      },
      {
        employment_type: 'part_time', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.75, addition_per_hour: null,
        description: 'Sunday — ×1.75 penalty rate',
      },
      {
        employment_type: 'part_time', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.50, addition_per_hour: null,
        description: 'Public holiday — ×2.50 penalty rate',
      },
      // ── Casual ─────────────────────────────────────────────────────────────
      // Casual base rate includes 25% casual loading.
      {
        employment_type: 'casual', day_type: 'weekday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.0, addition_per_hour: null,
        description: 'Ordinary casual weekday rate (includes 25% loading)',
      },
      {
        employment_type: 'casual', day_type: 'weekday',
        time_band_start: '19:00', time_band_end: '00:00',
        time_band_label: 'evening_7pm_to_midnight',
        multiplier: 1.0, addition_per_hour: 2.81,
        description: 'Casual weekday evening (7pm–midnight) — +$2.81/hr flat addition',
      },
      {
        employment_type: 'casual', day_type: 'weekday',
        time_band_start: '00:00', time_band_end: '07:00',
        time_band_label: 'night_midnight_to_7am',
        multiplier: 1.0, addition_per_hour: 4.22,
        description: 'Casual weekday night (midnight–7am) — +$4.22/hr flat addition',
      },
      {
        employment_type: 'casual', day_type: 'saturday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.20, addition_per_hour: null,
        description: 'Casual Saturday — ×1.20 of casual base rate',
      },
      {
        employment_type: 'casual', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.40, addition_per_hour: null,
        description: 'Casual Sunday — ×1.40 of casual base rate',
      },
      {
        employment_type: 'casual', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.00, addition_per_hour: null,
        description: 'Casual public holiday — ×2.00 of casual base rate',
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
    // Weekly 38hr/40hr, FT/PT 1.50×/2.00×. No casual overtime.

    const overtimeRates = [
      { employment_type: 'full_time',  threshold_hours: 38, period: 'weekly', multiplier: 1.50, description: 'Weekly overtime — first 2 hours over 38 (×1.50)' },
      { employment_type: 'full_time',  threshold_hours: 40, period: 'weekly', multiplier: 2.00, description: 'Weekly overtime — after 40 hours (×2.00)' },
      { employment_type: 'part_time',  threshold_hours: 38, period: 'weekly', multiplier: 1.50, description: 'Part-time weekly overtime — first 2 hours over 38 (×1.50)' },
      { employment_type: 'part_time',  threshold_hours: 40, period: 'weekly', multiplier: 2.00, description: 'Part-time weekly overtime — after 40 hours (×2.00)' },
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
    // Source: MA000058 & FWO pay guide, effective 1 July 2025.
    const allowances = [
      {
        allowance_type: 'meal',
        name: 'Meal allowance',
        description: 'If you are required to work overtime and a meal break falls during that overtime, you are entitled to a meal allowance.',
        trigger_condition: 'Overtime worked requiring a meal break',
        amount: 16.73, amount_type: 'fixed', per_unit: 'per_meal',
      },
      {
        allowance_type: 'split_shift',
        name: 'Split shift allowance (long)',
        description: 'If you work a split shift with a break of more than the minimum, you receive a split shift allowance.',
        trigger_condition: 'Working a split shift with extended break',
        amount: 5.34, amount_type: 'fixed', per_unit: 'per_shift',
      },
      {
        allowance_type: 'first_aid',
        name: 'First aid allowance (full-time)',
        description: 'If you hold a current first aid certificate and are appointed as first aid officer, you receive a weekly allowance (full-time employees).',
        trigger_condition: 'Appointed as first aid officer with current certificate (full-time)',
        amount: 12.82, amount_type: 'weekly', per_unit: 'per_week',
      },
      {
        allowance_type: 'first_aid_daily',
        name: 'First aid allowance (part-time/casual)',
        description: 'If you hold a current first aid certificate and are appointed as first aid officer, you receive a daily allowance (part-time and casual employees).',
        trigger_condition: 'Appointed as first aid officer with current certificate (part-time/casual)',
        amount: 2.56, amount_type: 'daily', per_unit: 'per_day',
      },
      {
        allowance_type: 'laundry',
        name: 'Laundry allowance (full-time)',
        description: 'If you are required to launder your own uniform or special clothing, you receive a weekly laundry allowance (full-time employees).',
        trigger_condition: 'Required to launder own uniform or special clothing (full-time)',
        amount: 6.00, amount_type: 'weekly', per_unit: 'per_week',
      },
      {
        allowance_type: 'laundry_daily',
        name: 'Laundry allowance (part-time/casual)',
        description: 'If you are required to launder your own uniform or special clothing, you receive a per-uniform allowance (part-time and casual employees).',
        trigger_condition: 'Required to launder own uniform (part-time/casual)',
        amount: 2.05, amount_type: 'fixed', per_unit: 'per_uniform',
      },
      {
        allowance_type: 'tool',
        name: 'Tool allowance',
        description: 'If you are required to provide and use your own tools, you receive a daily tool allowance.',
        trigger_condition: 'Required to provide and use own tools',
        amount: 2.03, amount_type: 'daily', per_unit: 'per_day',
      },
      {
        allowance_type: 'vehicle',
        name: 'Vehicle allowance',
        description: 'If you are required to use your own vehicle for work purposes, you receive a per-kilometre allowance.',
        trigger_condition: 'Required to use own vehicle for work purposes',
        amount: 0.99, amount_type: 'per_km', per_unit: 'per_km',
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
    // Two-question flow:
    //   1. clubs_stream — What stream do you work in?
    //   2. clubs_level_* — What level within that stream?

    const questions = [
      {
        award_code: AWARD_CODE,
        question_key: 'clubs_stream',
        question_text: 'What stream do you work in?',
        help_text: 'Select the area of the club where you primarily work. If you work across multiple areas, choose the one where you spend most of your time.',
        question_type: 'single',
        stream: null,
        parent_question_key: null,
        parent_answer_key: null,
        sort_order: 1,
        answers: [
          { answer_key: 'food_beverage', answer_text: 'Food & Beverage — bar, dining, functions, gaming floor', sort_order: 1 },
          { answer_key: 'kitchen', answer_text: 'Kitchen — cooking, food preparation, dishwashing', sort_order: 2 },
          { answer_key: 'admin', answer_text: 'Administration — office, reception, accounts, membership', sort_order: 3 },
          { answer_key: 'maintenance', answer_text: 'Maintenance — cleaning, grounds, building maintenance, horticulture', sort_order: 4 },
        ],
      },
      // ── Food & Beverage levels ────────────────────────────────────────────
      {
        award_code: AWARD_CODE,
        question_key: 'clubs_level_food_beverage',
        question_text: 'What level are you in the Food & Beverage stream?',
        help_text: 'Select the level that best matches your duties, qualifications, and experience. Check your employment contract or payslip if unsure.',
        question_type: 'single',
        stream: 'food_beverage',
        parent_question_key: 'clubs_stream',
        parent_answer_key: 'food_beverage',
        sort_order: 2,
        answers: [
          { answer_key: '0', answer_text: 'Introductory — new employee undergoing structured training', sort_order: 1 },
          { answer_key: '1', answer_text: 'Grade 1 — routine service tasks (clearing tables, restocking)', sort_order: 2 },
          { answer_key: '2', answer_text: 'Grade 2 — experienced attendant (drink preparation, cash handling)', sort_order: 3 },
          { answer_key: '3', answer_text: 'Grade 3 — skilled/gaming (supervising, advanced bar, gaming)', sort_order: 4 },
          { answer_key: '4', answer_text: 'Grade 4 — tradesperson (trade-qualified or highly experienced)', sort_order: 5 },
          { answer_key: '5', answer_text: 'Grade 5 — senior specialist (managing operations, teams)', sort_order: 6 },
        ],
      },
      // ── Kitchen levels ────────────────────────────────────────────────────
      {
        award_code: AWARD_CODE,
        question_key: 'clubs_level_kitchen',
        question_text: 'What level are you in the Kitchen stream?',
        help_text: 'Select the level that best matches your duties and qualifications. Trade-qualified cooks should select Grade 3 or above.',
        question_type: 'single',
        stream: 'kitchen',
        parent_question_key: 'clubs_stream',
        parent_answer_key: 'kitchen',
        sort_order: 2,
        answers: [
          { answer_key: '0', answer_text: 'Introductory — new kitchen employee undergoing training', sort_order: 1 },
          { answer_key: '1', answer_text: 'Grade 1 — kitchen attendant (dishwashing, basic prep)', sort_order: 2 },
          { answer_key: '2', answer_text: 'Grade 2 / Cook Grade 1 — experienced attendant or entry-level cook', sort_order: 3 },
          { answer_key: '3', answer_text: 'Grade 3 / Cook Grade 2 — skilled cook, may supervise juniors', sort_order: 4 },
          { answer_key: '4', answer_text: 'Cook Tradesperson Grade 3 — trade-qualified cook (Cert III or equiv.)', sort_order: 5 },
          { answer_key: '5', answer_text: 'Cook Tradesperson Grade 4 — senior trade cook, kitchen supervisor', sort_order: 6 },
          { answer_key: '6', answer_text: 'Cook Tradesperson Grade 5 — head chef, executive kitchen role', sort_order: 7 },
        ],
      },
      // ── Admin levels ──────────────────────────────────────────────────────
      {
        award_code: AWARD_CODE,
        question_key: 'clubs_level_admin',
        question_text: 'What level are you in the Administration stream?',
        help_text: 'Select the level that best matches your duties and responsibilities.',
        question_type: 'single',
        stream: 'admin',
        parent_question_key: 'clubs_stream',
        parent_answer_key: 'admin',
        sort_order: 2,
        answers: [
          { answer_key: '0', answer_text: 'Introductory — new admin employee undergoing training', sort_order: 1 },
          { answer_key: '2', answer_text: 'Clerical Grade 1 — routine admin (filing, data entry, reception)', sort_order: 2 },
          { answer_key: '3', answer_text: 'Clerical Grade 2 — experienced (accounts, memberships, reports)', sort_order: 3 },
          { answer_key: '4', answer_text: 'Clerical Grade 3 — skilled (payroll, bookkeeping, supervising)', sort_order: 4 },
          { answer_key: '5', answer_text: 'Clerical Supervisor — managing all admin operations', sort_order: 5 },
        ],
      },
      // ── Maintenance levels ────────────────────────────────────────────────
      {
        award_code: AWARD_CODE,
        question_key: 'clubs_level_maintenance',
        question_text: 'What level are you in the Maintenance stream?',
        help_text: 'Select the level that best matches your duties and qualifications. Trade-qualified workers should select Level 3 or above.',
        question_type: 'single',
        stream: 'maintenance',
        parent_question_key: 'clubs_stream',
        parent_answer_key: 'maintenance',
        sort_order: 2,
        answers: [
          { answer_key: '0', answer_text: 'Introductory — new maintenance/grounds employee', sort_order: 1 },
          { answer_key: '2', answer_text: 'Level 1 — routine maintenance (cleaning, basic grounds)', sort_order: 2 },
          { answer_key: '3', answer_text: 'Level 2 — experienced (independent repairs, grounds work)', sort_order: 3 },
          { answer_key: '4', answer_text: 'Tradesperson Level 3 — trade-qualified (electrical, plumbing, etc.)', sort_order: 4 },
          { answer_key: '5', answer_text: 'Tradesperson Level 4 — senior trade, supervising teams', sort_order: 5 },
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
    console.log('\n✅ MA000058 seed complete');
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
