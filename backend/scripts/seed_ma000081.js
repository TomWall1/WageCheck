/**
 * Seed script — Live Performance Award 2020 [MA000081]
 * Pay rates effective 24 October 2025 (published 24 October 2025)
 * Source: Fair Work Ombudsman pay guide MA000081 (G00813010)
 *
 * Scope: Production & Support Staff (general + touring_sl streams) and Company Dancers.
 * Performers and musicians use per-call/per-performance payment structures that are
 * incompatible with the hourly shift calculator — they are explicitly out of scope.
 *
 * Key features:
 *   - Saturday: ordinary rate (no Saturday penalty — same approach as MA000080)
 *   - Sunday: ×2.00 FT/PT, ×1.80 of casual base (= ×2.25 of FT base)
 *   - Public holiday: ×2.00 FT/PT, ×1.80 of casual base
 *   - Overtime: daily >8h = ×1.50, >12h = ×2.00; weekly >38h = ×1.50, >41h = ×2.00
 *   - Touring S&L rates include embedded sound & lighting overtime/penalty allowance
 *   - No junior rates in this award (adult rate applies to all)
 *   - Effective date: 24 October 2025 (unusual — not July 2025)
 *
 * Streams:
 *   general    — Production & Support Staff (Other, Crewing, Factory S&L) Levels 1–8 + Techn. Mgr
 *   touring_sl — Production & Support Staff (Touring Sound & Lighting) Levels 1–8 + Techn. Mgr
 *   dancer     — Company Dancers Levels 1–7
 *
 * Run after migrate.js: node scripts/seed_ma000081.js
 */
require('dotenv').config();
const pool = require('../src/db/pool');

const AWARD_CODE = 'MA000081';
const EFFECTIVE_DATE = '2025-10-24';

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
      'Live Performance Award 2020',
      EFFECTIVE_DATE,
      'https://awards.fairwork.gov.au/MA000081.html',
    ]);

    // ── Classifications ───────────────────────────────────────────────────────
    // Base rates verified from FWO pay guide G00813010, effective 24/10/2025.
    //
    // General stream (Other / Crewing / Factory S&L — same base rates):
    //   FT:     L1=$24.28, L2=$26.30, L3=$27.58, L4=$28.12, L5=$29.00,
    //           L6=$29.88, L7=$31.80, L8=$32.89, TM=$36.34
    //   Casual: L1=$30.35, L2=$32.88, L3=$34.48, L4=$35.15, L5=$36.25,
    //           L6=$37.35, L7=$39.75, L8=$41.11, TM=$45.43
    //
    // Touring S&L stream (includes embedded S&L overtime & penalty allowance):
    //   FT:     L1=$28.53, L2=$30.90, L3=$32.41, L4=$33.04, L5=$34.07,
    //           L6=$35.11, L7=$37.36, L8=$38.65, TM=$42.70
    //   Casual: L1=$35.66, L2=$38.63, L3=$40.51, L4=$41.30, L5=$42.59,
    //           L6=$43.89, L7=$46.70, L8=$48.31, TM=$53.38
    //
    // Dancer stream (weekly ÷ 38 = hourly for calculator purposes):
    //   FT:     L1=$30.68 ($1,165.70/wk), L2=$31.80, L3=$32.89, L4=$33.93,
    //           L5=$35.07, L6=$36.34, L7=$37.85 ($1,438.40/wk)
    //   Casual: L1=$38.35, L2=$39.75, L3=$41.11, L4=$42.41,
    //           L5=$43.84, L6=$45.43, L7=$47.31

    const classifications = [
      // ── GENERAL STREAM — Production & Support Staff (Other / Crewing / Factory S&L) ──
      {
        level: 1, stream: 'general',
        title: 'Level 1 — Production & Support Staff (Induction/Training)',
        description: 'You are in an induction or training period at your new workplace. Level 1 is temporary and applies while you are learning the basic skills needed for your role under supervision.',
        duties: [
          'Undergoing on-the-job induction and basic training',
          'Performing simple, clearly defined tasks under close supervision',
          'Learning venue layout, safety procedures and equipment basics',
          'Assisting more experienced crew members',
        ],
        indicative_tasks: ['New crew member in training', 'Induction-period stagehand', 'Trainee production assistant'],
        sort_order: 10,
      },
      {
        level: 2, stream: 'general',
        title: 'Level 2 — Production & Support Staff',
        description: 'You perform general production support duties. You can work independently on routine tasks and follow directions without close supervision.',
        duties: [
          'General stagehand and bump-in/bump-out duties',
          'Moving and positioning equipment, props, and furniture',
          'Operating basic equipment under direction',
          'Maintaining cleanliness and order in work areas',
          'Assisting technical crew with setup and packdown',
        ],
        indicative_tasks: ['Stagehand', 'General crew member', 'Bump-in/out worker', 'Production runner'],
        sort_order: 20,
      },
      {
        level: 3, stream: 'general',
        title: 'Level 3 — Production & Support Staff',
        description: 'You perform production support work at a higher level than Level 2. You may operate or maintain specific equipment, or take responsibility for a defined area of the bump-in/out.',
        duties: [
          'Operating or maintaining production equipment at a basic technical level',
          'Taking responsibility for a specific area during bump-in/out',
          'Carpentry, upholstery, or other skilled support work at a basic level',
          'Vehicle driving duties in support of production',
        ],
        indicative_tasks: ['Senior stagehand', 'Production driver', 'Basic equipment operator', 'Carpenter\'s assistant'],
        sort_order: 30,
      },
      {
        level: 4, stream: 'general',
        title: 'Level 4 — Production & Support Staff',
        description: 'You perform skilled production support work. You operate or maintain specific technical equipment, or perform skilled trades support at a higher level.',
        duties: [
          'Skilled operation or maintenance of production equipment',
          'First-level rigging, basic lighting or sound connections',
          'Wardrobe, props, or set construction at a skilled level',
          'Driving vehicles or operating machinery for production',
          'Working without direct supervision on defined tasks',
        ],
        indicative_tasks: ['Production technician (entry)', 'Rigger (entry)', 'Wardrobe assistant', 'Properties assistant'],
        sort_order: 40,
      },
      {
        level: 5, stream: 'general',
        title: 'Level 5 — Production & Support Staff',
        description: 'You are an experienced production worker with a higher level of technical skill. You may supervise junior crew or take responsibility for a technical department with less senior oversight.',
        duties: [
          'Skilled technical production work (lighting, sound, staging, rigging)',
          'Operating production equipment requiring formal training or experience',
          'Coordinating with directors, designers, or other departments',
          'Supervising or directing Level 1–3 employees in your area',
        ],
        indicative_tasks: ['Experienced production technician', 'Stage manager (deputy)', 'Senior wardrobe hand', 'Rigger (experienced)'],
        sort_order: 50,
      },
      {
        level: 6, stream: 'general',
        title: 'Level 6 — Production & Support Staff',
        description: 'You are a senior production worker with broad experience and/or supervisory responsibility. You work independently and may lead a team or department.',
        duties: [
          'Leading a production crew or department in your area',
          'Advanced technical work in lighting, sound, staging or rigging',
          'Interpreting and executing design documentation independently',
          'Managing equipment, schedules and resources within your department',
        ],
        indicative_tasks: ['Senior production technician', 'Head of department (junior)', 'Stage manager', 'Head rigger (standard)'],
        sort_order: 60,
      },
      {
        level: 7, stream: 'general',
        title: 'Level 7 — Production & Support Staff',
        description: 'You are a head of department or senior crew member responsible for managing a significant technical department across the life of a production.',
        duties: [
          'Managing all aspects of a technical department (lighting, sound, staging, rigging, wardrobe, etc.)',
          'Hiring, coordinating and directing crew within your department',
          'Liaising with production management, directors and designers',
          'Budget responsibility for your department',
          'Ensuring safety and technical standards throughout the production',
        ],
        indicative_tasks: ['Head of department (established)', 'Production manager (junior)', 'Chief LX', 'Head sound technician'],
        sort_order: 70,
      },
      {
        level: 8, stream: 'general',
        title: 'Level 8 — Production & Support Staff',
        description: 'You are a very senior technical manager or department head with substantial experience and responsibility across large-scale or complex productions.',
        duties: [
          'Senior departmental leadership on large or complex productions',
          'Managing multiple departments or supervising other heads of department',
          'Strategic production planning and technical design oversight',
          'External stakeholder management and contract coordination',
        ],
        indicative_tasks: ['Production manager (experienced)', 'Technical director (junior)', 'Senior HOD'],
        sort_order: 80,
      },
      {
        level: 9, stream: 'general',
        title: 'Technical Manager',
        description: 'You hold the Technical Manager classification. This is a specifically designated role for the most senior production and technical manager in a venue or production, with overall responsibility for all technical departments.',
        duties: [
          'Overall responsibility for all technical departments in a venue or production',
          'Managing and coordinating all heads of department',
          'Technical planning and budget accountability across all departments',
          'Senior liaison with producers, directors and venue management',
        ],
        indicative_tasks: ['Technical manager', 'Technical director (venue)', 'Senior production technical manager'],
        sort_order: 90,
      },

      // ── TOURING S&L STREAM — Production & Support Staff (Touring Sound & Lighting) ──
      // Rates include the embedded sound & lighting overtime and penalty allowance.
      // This allowance is paid for all hours worked (not just overtime), and reflects
      // the unsociable-hours nature of touring sound and lighting work.
      {
        level: 1, stream: 'touring_sl',
        title: 'Level 1 — Touring Sound & Lighting (Induction/Training)',
        description: 'You are in an induction or training period working in touring sound or lighting. Your rate already includes the sound & lighting overtime and penalty allowance, which compensates for the irregular hours typical in touring roles.',
        duties: [
          'Undergoing induction and training in touring sound or lighting operations',
          'Assisting experienced touring S&L crew under close supervision',
          'Learning touring production workflows and equipment',
        ],
        indicative_tasks: ['Trainee touring S&L crew member'],
        sort_order: 11,
      },
      {
        level: 2, stream: 'touring_sl',
        title: 'Level 2 — Touring Sound & Lighting',
        description: 'You perform general sound or lighting support duties on tour. Your rate includes the embedded S&L overtime and penalty allowance.',
        duties: [
          'General sound and lighting bump-in/bump-out duties',
          'Cable management, basic connections and equipment placement',
          'Assisting senior S&L crew during setup and show operation',
        ],
        indicative_tasks: ['Touring S&L crew (general)', 'Cable runner', 'S&L loader'],
        sort_order: 21,
      },
      {
        level: 3, stream: 'touring_sl',
        title: 'Level 3 — Touring Sound & Lighting',
        description: 'You perform skilled sound or lighting duties on tour. Your rate includes the embedded S&L overtime and penalty allowance.',
        duties: [
          'Operating or patching sound or lighting equipment at a skilled level',
          'Basic operation of consoles or signal processors under supervision',
          'Maintaining and troubleshooting touring S&L equipment',
        ],
        indicative_tasks: ['S&L operator (entry)', 'Monitor assistant', 'Follow spot operator'],
        sort_order: 31,
      },
      {
        level: 4, stream: 'touring_sl',
        title: 'Level 4 — Touring Sound & Lighting',
        description: 'You perform independent sound or lighting operation on tour. Your rate includes the embedded S&L overtime and penalty allowance.',
        duties: [
          'Independent operation of sound or lighting consoles',
          'Sound system design and deployment at a standard level',
          'Lighting rig installation and programming',
          'Monitoring and adjusting audio or lighting during performances',
        ],
        indicative_tasks: ['Monitor engineer', 'Lighting operator', 'Production audio technician'],
        sort_order: 41,
      },
      {
        level: 5, stream: 'touring_sl',
        title: 'Level 5 — Touring Sound & Lighting',
        description: 'You are an experienced touring S&L operator with a higher level of technical skill and often responsibility for a specific role throughout a tour. Your rate includes the embedded S&L overtime and penalty allowance.',
        duties: [
          'Front of house or monitor mixing at a professional level',
          'Advanced lighting design operation and programming',
          'Leading S&L crew in your area of specialisation',
          'Liaising with band/artist technical riders',
        ],
        indicative_tasks: ['FOH engineer (entry)', 'Production LD (entry)', 'Head monitor engineer'],
        sort_order: 51,
      },
      {
        level: 6, stream: 'touring_sl',
        title: 'Level 6 — Touring Sound & Lighting',
        description: 'You are a senior touring S&L operator with substantial experience and/or crew coordination responsibility. Your rate includes the embedded S&L overtime and penalty allowance.',
        duties: [
          'Senior FOH or monitor mixing',
          'Senior lighting design operation across complex productions',
          'Supervising S&L crew across the full production',
          'System design and specification for touring productions',
        ],
        indicative_tasks: ['Senior FOH engineer', 'Production LD (established)', 'Senior S&L coordinator'],
        sort_order: 61,
      },
      {
        level: 7, stream: 'touring_sl',
        title: 'Level 7 — Touring Sound & Lighting',
        description: 'You are a head of department in sound or lighting, with full responsibility for that department across the tour. Your rate includes the embedded S&L overtime and penalty allowance.',
        duties: [
          'Department head responsibility for all touring S&L operations',
          'Crew management, scheduling and budget for your department',
          'Artist and management liaison on technical requirements',
        ],
        indicative_tasks: ['Head of sound (touring)', 'Head of lighting (touring)', 'Production audio director'],
        sort_order: 71,
      },
      {
        level: 8, stream: 'touring_sl',
        title: 'Level 8 — Touring Sound & Lighting',
        description: 'You are a very senior touring S&L specialist, managing the full technical sound or lighting operation at the highest level. Your rate includes the embedded S&L overtime and penalty allowance.',
        duties: [
          'Senior technical leadership across large touring productions',
          'Multiple department coordination in S&L',
          'Advanced system design, specification and management',
        ],
        indicative_tasks: ['Production sound designer (touring)', 'Production lighting designer (touring)'],
        sort_order: 81,
      },
      {
        level: 9, stream: 'touring_sl',
        title: 'Technical Manager (Touring Sound & Lighting)',
        description: 'You are the Technical Manager for touring sound and lighting operations. This is the highest designated role in touring S&L, with rates including the embedded sound & lighting overtime and penalty allowance.',
        duties: [
          'Overall technical management of touring S&L departments',
          'Senior liaison with producers and artists on all technical matters',
          'Budget and crew accountability across touring S&L operations',
        ],
        indicative_tasks: ['Touring technical manager (S&L)'],
        sort_order: 91,
      },

      // ── DANCER STREAM — Company Dancers ────────────────────────────────────
      // Weekly FT rates divided by 38 for the hourly calculator.
      // Note: the award provides complex per-performance Sunday and PH payments
      // for weekly-engaged dancers. The hourly calculator uses the base hourly
      // rate with the standard penalty multipliers as an approximation — for
      // exact Sunday/PH calculations, a specialist adviser should be consulted.
      {
        level: 1, stream: 'dancer',
        title: 'Company Dancer — Level 1',
        description: 'You are a professional company dancer at Level 1. You perform in productions as directed. The hourly rate shown is derived from the weekly minimum ($1,165.70 ÷ 38). Actual Sunday and public holiday entitlements under the award are complex and may be higher than the calculator shows.',
        duties: [
          'Performing in productions as directed by the choreographer and director',
          'Attending rehearsals and maintaining rehearsal schedules',
          'Learning and retaining choreography to a professional standard',
          'Maintaining physical fitness and professional presentation',
        ],
        indicative_tasks: ['Company dancer (corps)', 'Professional dancer (Level 1 classification)'],
        sort_order: 110,
      },
      {
        level: 2, stream: 'dancer',
        title: 'Company Dancer — Level 2',
        description: 'You are a professional company dancer at Level 2 ($1,208.30/week minimum). Hourly rate: $31.80. Sunday and PH entitlements are complex — seek specialist advice for exact calculations.',
        duties: [
          'Performing in productions at a higher skill level than Level 1',
          'Potentially performing featured or named roles',
          'Attending all rehearsals and production meetings',
        ],
        indicative_tasks: ['Company dancer (Level 2)', 'Featured dancer'],
        sort_order: 120,
      },
      {
        level: 3, stream: 'dancer',
        title: 'Company Dancer — Level 3',
        description: 'You are a professional company dancer at Level 3 ($1,250.00/week minimum). Hourly rate: $32.89.',
        duties: [
          'Performing in productions at Level 3 skill and responsibility',
          'May include featured roles or soloist duties at this level',
        ],
        indicative_tasks: ['Company dancer (Level 3)', 'Soloist (entry)'],
        sort_order: 130,
      },
      {
        level: 4, stream: 'dancer',
        title: 'Company Dancer — Level 4',
        description: 'You are a professional company dancer at Level 4 ($1,289.40/week minimum). Hourly rate: $33.93.',
        duties: [
          'Performing in productions at Level 4 skill and responsibility',
          'Featured or principal-level roles',
        ],
        indicative_tasks: ['Company dancer (Level 4)', 'Featured dancer (senior)'],
        sort_order: 140,
      },
      {
        level: 5, stream: 'dancer',
        title: 'Company Dancer — Level 5',
        description: 'You are a professional company dancer at Level 5 ($1,332.70/week minimum). Hourly rate: $35.07.',
        duties: [
          'Performing in productions at Level 5 skill and responsibility',
          'Senior or principal roles in the company',
        ],
        indicative_tasks: ['Company dancer (Level 5)', 'Principal dancer (entry)'],
        sort_order: 150,
      },
      {
        level: 6, stream: 'dancer',
        title: 'Company Dancer — Level 6',
        description: 'You are a professional company dancer at Level 6 ($1,381.10/week minimum). Hourly rate: $36.34.',
        duties: [
          'Performing in productions at Level 6 skill and responsibility',
          'Principal or senior roles in a professional dance company',
        ],
        indicative_tasks: ['Company dancer (Level 6)', 'Principal dancer'],
        sort_order: 160,
      },
      {
        level: 7, stream: 'dancer',
        title: 'Company Dancer — Level 7',
        description: 'You are a professional company dancer at Level 7 ($1,438.40/week minimum). Hourly rate: $37.85. This is the highest classification for company dancers under the award.',
        duties: [
          'Performing in productions at the highest classification level',
          'Senior principal or guest artist roles',
        ],
        indicative_tasks: ['Company dancer (Level 7)', 'Senior principal dancer'],
        sort_order: 170,
      },
    ];

    // ── Base rate lookup: (stream, level) → { ft, casual }
    const BASE_RATES = {
      // General stream
      'general:1':  { ft: 24.28, casual: 30.35 },
      'general:2':  { ft: 26.30, casual: 32.88 },
      'general:3':  { ft: 27.58, casual: 34.48 },
      'general:4':  { ft: 28.12, casual: 35.15 },
      'general:5':  { ft: 29.00, casual: 36.25 },
      'general:6':  { ft: 29.88, casual: 37.35 },
      'general:7':  { ft: 31.80, casual: 39.75 },
      'general:8':  { ft: 32.89, casual: 41.11 },
      'general:9':  { ft: 36.34, casual: 45.43 }, // Technical Manager
      // Touring S&L stream (includes embedded S&L OT & penalty allowance)
      'touring_sl:1': { ft: 28.53, casual: 35.66 },
      'touring_sl:2': { ft: 30.90, casual: 38.63 },
      'touring_sl:3': { ft: 32.41, casual: 40.51 },
      'touring_sl:4': { ft: 33.04, casual: 41.30 },
      'touring_sl:5': { ft: 34.07, casual: 42.59 },
      'touring_sl:6': { ft: 35.11, casual: 43.89 },
      'touring_sl:7': { ft: 37.36, casual: 46.70 },
      'touring_sl:8': { ft: 38.65, casual: 48.31 },
      'touring_sl:9': { ft: 42.70, casual: 53.38 }, // Technical Manager (touring)
      // Dancer stream (hourly = weekly ÷ 38)
      'dancer:1': { ft: 30.68, casual: 38.35 },
      'dancer:2': { ft: 31.80, casual: 39.75 },
      'dancer:3': { ft: 32.89, casual: 41.11 },
      'dancer:4': { ft: 33.93, casual: 42.41 },
      'dancer:5': { ft: 35.07, casual: 43.84 },
      'dancer:6': { ft: 36.34, casual: 45.43 },
      'dancer:7': { ft: 37.85, casual: 47.31 },
    };

    await client.query('DELETE FROM classifications WHERE award_code = $1', [AWARD_CODE]);
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
    // Fetch inserted classification IDs then store hourly rates per employment type.
    const classResult = await client.query(
      'SELECT id, level, stream FROM classifications WHERE award_code = $1',
      [AWARD_CODE]
    );

    await client.query('DELETE FROM pay_rates WHERE award_code = $1', [AWARD_CODE]);
    for (const cls of classResult.rows) {
      const key = `${cls.stream}:${cls.level}`;
      const rates = BASE_RATES[key];
      if (!rates) continue;

      for (const empType of ['full_time', 'part_time']) {
        await client.query(`
          INSERT INTO pay_rates (award_code, classification_id, employment_type, rate_type, rate_amount, effective_date)
          VALUES ($1, $2, $3, 'base_hourly', $4, $5)
          ON CONFLICT (award_code, classification_id, employment_type, rate_type, effective_date)
          DO UPDATE SET rate_amount = EXCLUDED.rate_amount
        `, [AWARD_CODE, cls.id, empType, rates.ft, EFFECTIVE_DATE]);
      }

      await client.query(`
        INSERT INTO pay_rates (award_code, classification_id, employment_type, rate_type, rate_amount, effective_date)
        VALUES ($1, $2, 'casual', 'base_hourly', $3, $4)
        ON CONFLICT (award_code, classification_id, employment_type, rate_type, effective_date)
        DO UPDATE SET rate_amount = EXCLUDED.rate_amount
      `, [AWARD_CODE, cls.id, rates.casual, EFFECTIVE_DATE]);

      await client.query(`
        INSERT INTO pay_rates (award_code, classification_id, employment_type, rate_type, rate_amount, effective_date)
        VALUES ($1, $2, 'casual', 'casual_loading', 0.25, $3)
        ON CONFLICT (award_code, classification_id, employment_type, rate_type, effective_date)
        DO UPDATE SET rate_amount = EXCLUDED.rate_amount
      `, [AWARD_CODE, cls.id, EFFECTIVE_DATE]);
    }
    console.log('✓ Inserted pay rates');

    // ── Penalty rates ─────────────────────────────────────────────────────────
    // Source: MA000081 FWO pay guide — Production & Support Staff penalty tables.
    //
    // Saturday: No penalty — absent from penalty tables (same as MA000080).
    //   "Monday to Saturday" appears only in delayed meal break columns, confirming
    //   Saturday is treated as an ordinary-rate day under this award.
    //
    // Sunday FT/PT: ×2.00 (double time)
    //   Verified: FT L1 Sunday rate = $48.56 = $24.28 × 2.00
    //
    // Public holiday FT/PT: ×2.00 (double time)
    //   Verified: FT L1 PH rate = $48.56 = $24.28 × 2.00
    //   Note: Performers and company dancers have more complex PH rates per the
    //   award schedule — but for production staff, PH = double time.
    //
    // Casual Sunday: ×1.80 of casual base = ×2.25 of FT base (additive approach)
    //   Verified: casual L1 Sunday = $54.63 = $30.35 × 1.80 = $24.28 × 2.25
    //
    // Casual PH: ×1.80 of casual base (same as casual Sunday)
    //   Verified: casual L1 PH = $54.63 = $30.35 × 1.80 = $24.28 × 2.25
    //
    // Same multipliers apply to all three streams (general, touring_sl, dancer)
    // since the stream difference is captured in the base rate, not the multiplier.

    const penaltyRates = [
      // ── Full-time ───────────────────────────────────────────────────────────
      { employment_type: 'full_time', day_type: 'weekday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.0, addition_per_hour: null,
        description: 'Ordinary weekday rate (Mon–Fri) — no penalty' },
      { employment_type: 'full_time', day_type: 'saturday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.0, addition_per_hour: null,
        description: 'Saturday — ordinary rate (no Saturday penalty under this award)' },
      { employment_type: 'full_time', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.00, addition_per_hour: null,
        description: 'Sunday — double time (×2.00)' },
      { employment_type: 'full_time', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.00, addition_per_hour: null,
        description: 'Public holiday — double time (×2.00)' },
      // ── Part-time (same as full-time) ───────────────────────────────────────
      { employment_type: 'part_time', day_type: 'weekday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.0, addition_per_hour: null,
        description: 'Ordinary weekday rate (Mon–Fri) — no penalty' },
      { employment_type: 'part_time', day_type: 'saturday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.0, addition_per_hour: null,
        description: 'Saturday — ordinary rate (no Saturday penalty under this award)' },
      { employment_type: 'part_time', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.00, addition_per_hour: null,
        description: 'Sunday — double time (×2.00)' },
      { employment_type: 'part_time', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.00, addition_per_hour: null,
        description: 'Public holiday — double time (×2.00)' },
      // ── Casual ─────────────────────────────────────────────────────────────
      // Casual base = FT rate × 1.25. Additive approach:
      //   Sunday: casual_base × 1.80 = FT_base × 2.25 (100 + 25 + 100 = 225%)
      //   PH:     casual_base × 1.80 = FT_base × 2.25 (same rate for casual)
      { employment_type: 'casual', day_type: 'weekday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.0, addition_per_hour: null,
        description: 'Casual weekday — ordinary casual rate (includes 25% loading)' },
      { employment_type: 'casual', day_type: 'saturday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.0, addition_per_hour: null,
        description: 'Casual Saturday — ordinary casual rate (no Saturday penalty under this award)' },
      { employment_type: 'casual', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.80, addition_per_hour: null,
        description: 'Casual Sunday — ×1.80 of casual base (225% of FT base)' },
      { employment_type: 'casual', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.80, addition_per_hour: null,
        description: 'Casual public holiday — ×1.80 of casual base (225% of FT base)' },
    ];

    await client.query('DELETE FROM penalty_rates WHERE award_code = $1', [AWARD_CODE]);
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
    // Source: MA000081 FWO pay guide — Production & Support Staff overtime columns.
    //
    // Daily OT structure (production & support staff — crewing and other):
    //   After 8 hours/day → ×1.50
    //   After 12 hours/day → ×2.00
    //   (Touring S&L employees work on the same threshold but their embedded
    //    allowance already compensates for some extended hours — standard OT
    //    multipliers still apply to their full rate including the allowance.)
    //
    // Weekly OT structure:
    //   After 38 hours/week → ×1.50 (first 3 hours)
    //   After 41 hours/week → ×2.00
    //
    // Verified from pay guide:
    //   FT L1 OT rate: $36.42 = $24.28 × 1.50 ✓
    //   FT L1 double OT: $48.56 = $24.28 × 2.00 ✓
    //   Casual L1 OT: $42.49 = $30.35 × 1.40 = $24.28 × 1.75 ✓ (casual = FT OT × 1.25)

    const overtimeRates = [
      // FT/PT — daily
      { employment_type: 'full_time',  threshold_hours: 8.0,  period: 'daily', multiplier: 1.50, description: 'Daily overtime — after 8 hours (×1.50)' },
      { employment_type: 'full_time',  threshold_hours: 12.0, period: 'daily', multiplier: 2.00, description: 'Daily overtime — after 12 hours (×2.00)' },
      { employment_type: 'part_time',  threshold_hours: 8.0,  period: 'daily', multiplier: 1.50, description: 'Part-time daily overtime — after 8 hours (×1.50)' },
      { employment_type: 'part_time',  threshold_hours: 12.0, period: 'daily', multiplier: 2.00, description: 'Part-time daily overtime — after 12 hours (×2.00)' },
      // FT/PT — weekly
      { employment_type: 'full_time',  threshold_hours: 38,   period: 'weekly', multiplier: 1.50, description: 'Weekly overtime — first 3 hours over 38 (×1.50)' },
      { employment_type: 'full_time',  threshold_hours: 41,   period: 'weekly', multiplier: 2.00, description: 'Weekly overtime — after 41 hours (×2.00)' },
      { employment_type: 'part_time',  threshold_hours: 38,   period: 'weekly', multiplier: 1.50, description: 'Part-time weekly overtime — first 3 hours over 38 (×1.50)' },
      { employment_type: 'part_time',  threshold_hours: 41,   period: 'weekly', multiplier: 2.00, description: 'Part-time weekly overtime — after 41 hours (×2.00)' },
    ];

    await client.query('DELETE FROM overtime_rates WHERE award_code = $1', [AWARD_CODE]);
    for (const r of overtimeRates) {
      await client.query(`
        INSERT INTO overtime_rates (award_code, employment_type, threshold_hours, period, multiplier, description, effective_date)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
      `, [AWARD_CODE, r.employment_type, r.threshold_hours, r.period, r.multiplier, r.description, EFFECTIVE_DATE]);
    }
    console.log(`✓ Inserted ${overtimeRates.length} overtime rules`);

    // ── Allowances ────────────────────────────────────────────────────────────
    // Source: MA000081 FWO pay guide — Allowances section, effective 24/10/2025.
    // Scope: allowances applicable to production & support staff (general employees).
    // Performer/dancer/musician-specific allowances (understudy, nude, dance captain,
    // transmission/recording, etc.) are excluded from this seed as those employee
    // types are out of scope for the hourly calculator.

    const allowances = [
      {
        allowance_type: 'vehicle',
        name: 'Vehicle allowance (use of own vehicle)',
        description: 'If your employer requires you to use your own motor vehicle for work, you are entitled to a per-kilometre allowance.',
        trigger_condition: 'Required to use own vehicle for work at employer\'s direction',
        amount: 0.98, amount_type: 'per_km', per_unit: 'per_km',
      },
      {
        allowance_type: 'tools_hod',
        name: 'Tools & equipment allowance (Head of Department)',
        description: 'If you are a head of department required to supply your own tools and equipment, you are entitled to a weekly tools allowance.',
        trigger_condition: 'Head of Department required to supply own tools/equipment',
        amount: 11.03, amount_type: 'weekly', per_unit: 'per_week',
      },
      {
        allowance_type: 'tools_other',
        name: 'Tools & equipment allowance (other employees)',
        description: 'If you are required to supply your own tools and equipment (other than as a head of department), you are entitled to a daily tools allowance.',
        trigger_condition: 'Employee (not HOD) required to supply own tools/equipment',
        amount: 1.14, amount_type: 'fixed', per_unit: 'per_shift',
      },
      {
        allowance_type: 'meal_working',
        name: 'Meal allowance (working late)',
        description: 'If you work after 8pm (or in back-to-back performances), you are entitled to a meal allowance for each meal interval that occurs during that work.',
        trigger_condition: 'Working after 8pm (FT/PT) — per meal interval during extended work',
        amount: 23.18, amount_type: 'fixed', per_unit: 'per_meal',
      },
      {
        allowance_type: 'meal_travelling',
        name: 'Meal allowance (touring/travelling — short trips)',
        description: 'If you are required to travel away from home for a period of less than 5 working days and meals are not provided by the employer, you are entitled to a meal allowance per meal period.',
        trigger_condition: 'Travelling for work (less than 5 working days) — meals not provided by employer',
        amount: 36.04, amount_type: 'fixed', per_unit: 'per_meal',
      },
      {
        allowance_type: 'meal_travelling_weekly',
        name: 'Meal allowance (touring/travelling — 5+ working days)',
        description: 'If you are required to travel for 5 or more working days and meals are not provided by the employer, the meal allowance is up to $73.11 per day (max $365.53 per week).',
        trigger_condition: 'Travelling for work (5+ working days) — meals not provided by employer',
        amount: 73.11, amount_type: 'fixed', per_unit: 'per_day',
      },
      {
        allowance_type: 'laundry_ft',
        name: 'Laundry allowance (full-time)',
        description: 'Full-time employees required to launder uniforms or costume pieces at their own expense are entitled to a weekly laundry allowance: $4.50/week for blouses/shirts, $11.69/week for other items.',
        trigger_condition: 'Full-time employee required to launder own uniform/costume',
        amount: 4.50, amount_type: 'weekly', per_unit: 'per_week',
      },
      {
        allowance_type: 'laundry_pt_casual',
        name: 'Laundry allowance (part-time & casual)',
        description: 'Part-time and casual employees required to launder uniforms or costume pieces are entitled to $3.60 per day, up to a maximum of $16.29 per week.',
        trigger_condition: 'Part-time or casual employee required to launder own uniform/costume',
        amount: 3.60, amount_type: 'fixed', per_unit: 'per_shift',
      },
      {
        allowance_type: 'incidentals_touring',
        name: 'Incidentals allowance (touring)',
        description: 'When you are required to travel away from home for work, you are entitled to a daily incidentals allowance of $22.19 (up to $110.93 per week).',
        trigger_condition: 'Travelling away from home for work — per day away',
        amount: 22.19, amount_type: 'fixed', per_unit: 'per_day',
      },
      {
        allowance_type: 'sound_lighting',
        name: 'Sound & lighting overtime and penalty allowance',
        description: 'Touring sound & lighting employees receive an embedded allowance in their hourly rate that compensates for the overtime and unsociable hours typical of touring work. This is already factored into the Touring S&L rates shown in the calculator — it does not need to be added separately.',
        trigger_condition: 'Automatically embedded in Touring S&L classification rates — no additional payment required',
        amount: null, amount_type: 'embedded', per_unit: null,
      },
    ];

    await client.query('DELETE FROM allowances WHERE award_code = $1', [AWARD_CODE]);
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
    // MA000081 break entitlements for production & support staff.
    // Rest break: 10 minutes paid per 4-hour period.
    // Meal break: minimum 30 minutes unpaid — no later than 5 hours after start.
    // Delayed meal break: if the meal break is delayed more than 1 hour past the
    //   5-hour trigger, a penalty meal break rate applies (stored as an informational note).

    const breaks = [
      {
        employment_type: null,
        shift_hours_min: 4.0, shift_hours_max: null,
        break_type: 'rest', break_duration_min: 10, is_paid: true,
        timing_rule: 'One paid 10-minute rest break per 4-hour work period',
        description: 'You are entitled to a paid 10-minute rest break during each 4-hour period of work.',
      },
      {
        employment_type: null,
        shift_hours_min: 5.0, shift_hours_max: null,
        break_type: 'meal', break_duration_min: 30, is_paid: false,
        timing_rule: 'No later than 5 hours after commencing work',
        description: 'If you work more than 5 hours, you must receive an unpaid meal break of at least 30 minutes. It must start no later than 5 hours after your shift begins. If the break is delayed beyond 6 hours, you are entitled to a higher penalty rate for those delayed hours.',
      },
    ];

    await client.query('DELETE FROM break_entitlements WHERE award_code = $1', [AWARD_CODE]);
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
    // Three-branch flow for MA000081:
    //   Q1 — lp_worker_type: What type of worker are you?
    //     → production_support:  Production & support staff (general/crewing/factory S&L) → Q2a
    //     → sound_lighting_tour: Touring sound & lighting worker → Q2b
    //     → company_dancer:      Company dancer → Q2c
    //     → other:               Performer/musician/other artist → low confidence
    //
    //   Q2a — lp_ps_level (parent: production_support): Which level?
    //   Q2b — lp_sl_level (parent: sound_lighting_tour): Which level?
    //   Q2c — lp_dancer_level (parent: company_dancer):  Which dancer level?

    const questions = [
      {
        award_code: AWARD_CODE,
        question_key: 'lp_worker_type',
        question_text: 'Which best describes your work in live performance?',
        help_text: 'The Live Performance Award covers several different types of workers with different pay rates. Production & support staff do the technical and operational work (staging, rigging, lighting, sound, wardrobe, props). Touring sound & lighting workers have a higher embedded rate. Company dancers are professional dancers engaged by a dance company. Performers, musicians, and stage managers are separately classified under the award but require specialist pay calculation.',
        question_type: 'single',
        stream: null,
        parent_question_key: null,
        parent_answer_key: null,
        sort_order: 1,
        answers: [
          { answer_key: 'production_support', answer_text: 'Production & support staff — stagehand, crew, rigger, carpenter, wardrobe, props, factory or studio S&L', sort_order: 1 },
          { answer_key: 'sound_lighting_tour', answer_text: 'Touring sound & lighting — on tour with a travelling production (higher embedded rate applies)', sort_order: 2 },
          { answer_key: 'company_dancer', answer_text: 'Company dancer — professional dancer engaged by a dance company', sort_order: 3 },
          { answer_key: 'other', answer_text: 'Performer, musician, stage manager, or other artist — my pay is per-call or per-performance', sort_order: 4 },
        ],
      },
      {
        award_code: AWARD_CODE,
        question_key: 'lp_ps_level',
        question_text: 'What level are you classified as under the award?',
        help_text: 'Level 1 (induction/training) is a temporary level for new employees. Level 2 is general stagehand/crew work. Levels 3–6 reflect increasing skill and responsibility. Level 7–8 are senior heads of department. Technical Manager is the highest designated production management role.',
        question_type: 'single',
        stream: null,
        parent_question_key: 'lp_worker_type',
        parent_answer_key: 'production_support',
        sort_order: 2,
        answers: [
          { answer_key: 'level1', answer_text: 'Level 1 — Induction / training period', sort_order: 1 },
          { answer_key: 'level2', answer_text: 'Level 2 — General production support (stagehand, crew, bump-in/out)', sort_order: 2 },
          { answer_key: 'level3', answer_text: 'Level 3 — Higher-level production support (specific equipment, vehicle driving, skilled assistance)', sort_order: 3 },
          { answer_key: 'level4', answer_text: 'Level 4 — Skilled technician (rigging, wardrobe, props, equipment operation)', sort_order: 4 },
          { answer_key: 'level5', answer_text: 'Level 5 — Experienced technician or junior HOD / deputy stage manager', sort_order: 5 },
          { answer_key: 'level6', answer_text: 'Level 6 — Senior technician or department head (stage manager, head rigger)', sort_order: 6 },
          { answer_key: 'level7', answer_text: 'Level 7 — Head of department (lighting, sound, staging, wardrobe, etc.)', sort_order: 7 },
          { answer_key: 'level8', answer_text: 'Level 8 — Senior HOD or production manager (experienced)', sort_order: 8 },
          { answer_key: 'tech_mgr', answer_text: 'Technical Manager — the designated overall technical manager for the venue or production', sort_order: 9 },
        ],
      },
      {
        award_code: AWARD_CODE,
        question_key: 'lp_sl_level',
        question_text: 'What level are you in touring sound & lighting?',
        help_text: 'Your touring sound & lighting rate already includes an embedded allowance for overtime and unsociable hours — this is reflected in the higher base rate. Level 1 is induction/training. Levels 2–6 reflect increasing skill. Level 7–8 are senior HOD. Technical Manager is the highest production role.',
        question_type: 'single',
        stream: null,
        parent_question_key: 'lp_worker_type',
        parent_answer_key: 'sound_lighting_tour',
        sort_order: 3,
        answers: [
          { answer_key: 'level1', answer_text: 'Level 1 — Induction / training (touring S&L)', sort_order: 1 },
          { answer_key: 'level2', answer_text: 'Level 2 — General touring S&L crew (cable, load, basic assistance)', sort_order: 2 },
          { answer_key: 'level3', answer_text: 'Level 3 — Skilled touring S&L operator (follow spot, basic console operation)', sort_order: 3 },
          { answer_key: 'level4', answer_text: 'Level 4 — Independent touring operator (monitor engineer, lighting operator)', sort_order: 4 },
          { answer_key: 'level5', answer_text: 'Level 5 — Experienced touring S&L operator (FOH engineer entry, LD entry)', sort_order: 5 },
          { answer_key: 'level6', answer_text: 'Level 6 — Senior touring S&L operator (senior FOH, senior LD)', sort_order: 6 },
          { answer_key: 'level7', answer_text: 'Level 7 — Touring S&L department head (head of sound, head of lighting)', sort_order: 7 },
          { answer_key: 'level8', answer_text: 'Level 8 — Very senior touring S&L specialist (production designer)', sort_order: 8 },
          { answer_key: 'tech_mgr', answer_text: 'Technical Manager (Touring S&L) — designated overall technical manager', sort_order: 9 },
        ],
      },
      {
        award_code: AWARD_CODE,
        question_key: 'lp_dancer_level',
        question_text: 'Which company dancer level are you classified at?',
        help_text: 'Company dancers are classified across 7 levels based on their experience, roles and responsibilities. The rate shown is your minimum hourly rate (derived from the weekly minimum). Note: your actual Sunday and public holiday entitlements under the award are more complex and may be higher — the hourly calculator uses a simplified approximation for these.',
        question_type: 'single',
        stream: null,
        parent_question_key: 'lp_worker_type',
        parent_answer_key: 'company_dancer',
        sort_order: 4,
        answers: [
          { answer_key: 'dancer1', answer_text: 'Dancer Level 1 — $1,165.70/week minimum ($30.68/hr)', sort_order: 1 },
          { answer_key: 'dancer2', answer_text: 'Dancer Level 2 — $1,208.30/week minimum ($31.80/hr)', sort_order: 2 },
          { answer_key: 'dancer3', answer_text: 'Dancer Level 3 — $1,250.00/week minimum ($32.89/hr)', sort_order: 3 },
          { answer_key: 'dancer4', answer_text: 'Dancer Level 4 — $1,289.40/week minimum ($33.93/hr)', sort_order: 4 },
          { answer_key: 'dancer5', answer_text: 'Dancer Level 5 — $1,332.70/week minimum ($35.07/hr)', sort_order: 5 },
          { answer_key: 'dancer6', answer_text: 'Dancer Level 6 — $1,381.10/week minimum ($36.34/hr)', sort_order: 6 },
          { answer_key: 'dancer7', answer_text: 'Dancer Level 7 — $1,438.40/week minimum ($37.85/hr)', sort_order: 7 },
        ],
      },
    ];

    await client.query('DELETE FROM classification_questions WHERE award_code = $1', [AWARD_CODE]);
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
    console.log('\n✅ MA000081 seed complete');
    console.log('   25 classifications (9 general + 9 touring_sl + 7 dancer)');
    console.log('   12 penalty rules, 8 overtime rules');
    console.log(`   ${allowances.length} allowances, 2 break rules, 4 classification questions`);
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
