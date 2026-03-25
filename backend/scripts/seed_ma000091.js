/**
 * Seed script — Broadcasting, Recorded Entertainment and Cinemas Award 2020 [MA000091]
 * Pay rates effective 1 July 2025 (following 2025 Annual Wage Review)
 * Source: Fair Work Ombudsman pay guide MA000091, effective 1 July 2025
 *
 * Award covers: employees in TV broadcasting, radio broadcasting, cinema,
 * motion picture production, and journalism.
 *
 * Streams:
 *   cinema         — Cinema Workers Levels 1–7
 *   tv_broadcasting — TV Broadcasting Levels 1–13
 *   radio          — Radio Broadcasting Levels 1–6
 *   motion_picture — Motion Picture Production Levels 1–10
 *   journalist     — Journalists Levels 1–11
 *
 * Penalty rates vary by stream:
 *   TV Broadcasting FT/PT: Sat ×1.5, Sun ×1.75, PH ×2.5
 *   Cinema FT/PT: PH ×2.0 only (no Sat/Sun penalties)
 *   Motion Picture FT/PT: Sun ×2.0, PH ×2.5
 *   Radio FT/PT: Sat ×1.75, Sun ×2.0, PH ×2.5
 *   Journalist FT/PT: no Sat/Sun/PH penalty rates specified
 *
 *   Since the penalty_rates table has no stream column, the TV Broadcasting
 *   rates are stored as the primary set (most comprehensive). Stream-specific
 *   differences must be handled by calculator overrides (same approach as
 *   MA000013 liquor stream).
 *
 * Junior rates: Cinema & TV Broadcasting only (% of Level 1 rate)
 *   ≤16: ~50.7%, 17: ~62%, 18: ~73.3%, 19: ~84.6%, 20: ~95.8%
 *
 * Run after migrate.js: node scripts/seed_ma000091.js
 */
require('dotenv').config();
const pool = require('../src/db/pool');

const AWARD_CODE = 'MA000091';
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
      'Broadcasting, Recorded Entertainment and Cinemas Award 2020',
      EFFECTIVE_DATE,
      'https://www.fairwork.gov.au/employment-conditions/awards/awards-summary/ma000091-summary',
    ]);

    // ── Classifications ───────────────────────────────────────────────────────

    const classifications = [
      // ── Cinema stream (7 levels) ──────────────────────────────────────────
      {
        level: 1, stream: 'cinema',
        title: 'Cinema Worker Level 1',
        description: 'Entry level cinema worker. Duties: ticket sales, ushering, candy bar sales, cleaning.',
        duties: [
          'Selling tickets and processing transactions',
          'Ushering patrons to seats and managing entry/exit',
          'Serving food and beverages at the candy bar',
          'Cleaning cinema auditoriums, foyers, and bathrooms',
          'Basic customer service and information provision',
        ],
        indicative_tasks: ['Ticket seller', 'Usher', 'Candy bar attendant', 'Cinema cleaner'],
        sort_order: 10,
      },
      {
        level: 2, stream: 'cinema',
        title: 'Cinema Worker Level 2',
        description: 'Experienced cinema worker performing duties with limited supervision.',
        duties: [
          'Performing all Level 1 duties independently',
          'Operating point-of-sale and ticketing systems',
          'Handling customer complaints and queries',
          'Assisting with stock management and ordering',
          'Training and guiding new staff members',
        ],
        indicative_tasks: ['Experienced cinema attendant', 'Senior usher', 'Candy bar operator'],
        sort_order: 20,
      },
      {
        level: 3, stream: 'cinema',
        title: 'Cinema Worker Level 3',
        description: 'Skilled cinema worker with specialist knowledge.',
        duties: [
          'Operating projection and sound equipment',
          'Performing specialist technical tasks',
          'Managing specific areas of cinema operations',
          'Handling cash reconciliation and banking',
          'Coordinating staff activities during shifts',
        ],
        indicative_tasks: ['Projectionist', 'Technical operator', 'Specialist cinema worker'],
        sort_order: 30,
      },
      {
        level: 4, stream: 'cinema',
        title: 'Cinema Worker Level 4',
        description: 'Senior cinema worker with supervisory duties or specialist technical skills.',
        duties: [
          'Supervising shift operations and staff',
          'Managing technical systems and equipment maintenance',
          'Handling escalated customer issues',
          'Overseeing cash handling and security procedures',
          'Coordinating with management on operational matters',
        ],
        indicative_tasks: ['Shift supervisor', 'Senior projectionist', 'Technical specialist'],
        sort_order: 40,
      },
      {
        level: 5, stream: 'cinema',
        title: 'Cinema Worker Level 5',
        description: 'Supervisor or technical specialist with significant responsibility.',
        duties: [
          'Full supervisory responsibility for cinema operations on shift',
          'Staff rostering and performance management',
          'Managing stock ordering and inventory control',
          'Ensuring compliance with health, safety, and licensing requirements',
          'Reporting on operational performance to management',
        ],
        indicative_tasks: ['Cinema supervisor', 'Senior technical specialist', 'Operations coordinator'],
        sort_order: 50,
      },
      {
        level: 6, stream: 'cinema',
        title: 'Cinema Worker Level 6',
        description: 'Senior supervisor or manager.',
        duties: [
          'Managing all aspects of daily cinema operations',
          'Supervising and developing supervisory staff',
          'Budget management and financial reporting',
          'Strategic planning for cinema operations',
          'Liaison with head office and external stakeholders',
        ],
        indicative_tasks: ['Senior supervisor', 'Assistant cinema manager', 'Duty manager'],
        sort_order: 60,
      },
      {
        level: 7, stream: 'cinema',
        title: 'Cinema Worker Level 7',
        description: 'Cinema manager with full operational responsibility.',
        duties: [
          'Full responsibility for cinema site operations',
          'Managing all staff including hiring and performance reviews',
          'P&L accountability and budget management',
          'Strategic planning and business development',
          'Ensuring regulatory compliance across all areas',
        ],
        indicative_tasks: ['Cinema manager', 'Site manager', 'General manager'],
        sort_order: 70,
      },

      // ── TV Broadcasting stream (13 levels) ────────────────────────────────
      {
        level: 1, stream: 'tv_broadcasting',
        title: 'TV Broadcasting Level 1',
        description: 'Trainee or assistant in TV broadcasting. Includes trainee technician, trainee audio/lighting/camera operator, assistant hairdresser, carpenter\'s assistant, wardrobe assistant, set dresser, trainee captioner.',
        duties: [
          'Assisting senior operators and technicians',
          'Learning equipment operation under supervision',
          'Performing basic studio preparation tasks',
          'Assisting with wardrobe, set dressing, or hair/make-up',
          'Basic maintenance and care of equipment',
        ],
        indicative_tasks: ['Trainee technician', 'Trainee audio/lighting/camera operator', 'Assistant hairdresser', 'Carpenter\'s assistant', 'Wardrobe assistant', 'Set dresser', 'Trainee captioner'],
        sort_order: 110,
      },
      {
        level: 2, stream: 'tv_broadcasting',
        title: 'TV Broadcasting Level 2',
        description: 'Grade B operator in TV broadcasting. Includes Technician B, Audio/Lighting/Camera operator B, MC operator B, VT operator, hair/make-up artist, carpenter trade, studio hand A, set dresser A, wardrobe person, still photographer trade, producer/director\'s assistant, VCG operator, assistant floor manager, trainee subtitler.',
        duties: [
          'Operating broadcast equipment at Grade B level',
          'Performing technical or creative tasks with some supervision',
          'Setting up and striking equipment for productions',
          'Performing trade-level work in specialist areas',
          'Assisting with production coordination',
        ],
        indicative_tasks: ['Technician B', 'Audio/Lighting/Camera operator B', 'MC operator B', 'VT operator', 'Hair/make-up artist', 'Carpenter trade', 'Studio hand A', 'Producer/director\'s assistant'],
        sort_order: 120,
      },
      {
        level: 3, stream: 'tv_broadcasting',
        title: 'TV Broadcasting Level 3',
        description: 'Grade B+ operator. Includes Tech B+, Audio/Lighting operator B+, MC operator B+, vision switcher, music/video librarian, graphic artist, hair+make-up artist, carpenter TV, scenic artist, property person/senior studio hand, set designer, production VT B, assistant presentation coordinator.',
        duties: [
          'Operating broadcast equipment at Grade B+ level',
          'Performing advanced technical or creative tasks',
          'Vision switching and graphics operation',
          'Managing media libraries and archives',
          'Set design and scenic art production',
        ],
        indicative_tasks: ['Tech B+', 'Audio/Lighting operator B+', 'Vision switcher', 'Graphic artist', 'Scenic artist', 'Set designer', 'Music/video librarian'],
        sort_order: 130,
      },
      {
        level: 4, stream: 'tv_broadcasting',
        title: 'TV Broadcasting Level 4',
        description: 'Grade A operator. Includes Tech A, Audio/Lighting/Camera operator A, MC operator A, production VT A/editor B, senior make-up artist, floor manager.',
        duties: [
          'Operating broadcast equipment at Grade A level',
          'Editing and post-production work at B level',
          'Floor managing live and recorded productions',
          'Leading make-up and hair departments on productions',
          'Advanced master control operations',
        ],
        indicative_tasks: ['Tech A', 'Audio/Lighting/Camera operator A', 'MC operator A', 'Editor B', 'Senior make-up artist', 'Floor manager'],
        sort_order: 140,
      },
      {
        level: 5, stream: 'tv_broadcasting',
        title: 'TV Broadcasting Level 5',
        description: 'Grade A+ operator or director entry level. Includes Tech A+, Audio/Lighting operator A/director, MC operator A+, vision switcher major, editor A, captioner, make-up supervisor, senior carpenter, wardrobe supervisor, trainee director, trainee producer, VCG major, producer/DA major.',
        duties: [
          'Operating broadcast equipment at Grade A+ level',
          'Directing or producing broadcasts at entry level',
          'A-level editing and post-production',
          'Captioning live broadcasts',
          'Supervising specialist departments',
        ],
        indicative_tasks: ['Tech A+', 'Audio/Lighting operator A/director', 'Editor A', 'Captioner', 'Make-up supervisor', 'Trainee director', 'Trainee producer'],
        sort_order: 150,
      },
      {
        level: 6, stream: 'tv_broadcasting',
        title: 'TV Broadcasting Level 6',
        description: 'Senior B operator or director. Includes Senior tech B, Senior audio/lighting/camera B, Director, music/video library supervisor, senior set designer, floor manager major, senior production VT/post-prod editor B.',
        duties: [
          'Directing live and recorded television productions',
          'Senior-level technical operations',
          'Supervising specialist library and archive functions',
          'Senior set design and production design',
          'Floor managing major productions',
        ],
        indicative_tasks: ['Director', 'Senior tech B', 'Senior audio/lighting/camera B', 'Music/video library supervisor', 'Senior set designer', 'Floor manager major'],
        sort_order: 160,
      },
      {
        level: 7, stream: 'tv_broadcasting',
        title: 'TV Broadcasting Level 7',
        description: 'Coordinator level. Presentation coordinator.',
        duties: [
          'Coordinating presentation and playout operations',
          'Managing broadcast schedules and program transitions',
          'Supervising presentation staff',
          'Quality control of on-air output',
          'Troubleshooting broadcast issues in real time',
        ],
        indicative_tasks: ['Presentation coordinator'],
        sort_order: 170,
      },
      {
        level: 8, stream: 'tv_broadcasting',
        title: 'TV Broadcasting Level 8',
        description: 'Senior A operator. Includes Senior tech A, Senior audio/lighting/camera A, post-prod editor A, senior still photographer, multi-skilled captioner, ENG camera A, senior MC operator A.',
        duties: [
          'Senior-level technical operations across multiple disciplines',
          'A-level post-production editing',
          'Senior ENG camera operation',
          'Multi-skilled captioning across formats',
          'Senior master control operations',
        ],
        indicative_tasks: ['Senior tech A', 'Senior audio/lighting/camera A', 'Post-prod editor A', 'Multi-skilled captioner', 'ENG camera A', 'Senior MC operator A'],
        sort_order: 180,
      },
      {
        level: 9, stream: 'tv_broadcasting',
        title: 'TV Broadcasting Level 9',
        description: 'Senior director or senior camera operator. Includes Senior director, senior ENG camera.',
        duties: [
          'Directing major or complex productions',
          'Senior ENG camera work on significant stories',
          'Leading creative and technical teams on productions',
          'Mentoring and developing junior directors and camera operators',
          'Managing production budgets and schedules',
        ],
        indicative_tasks: ['Senior director', 'Senior ENG camera'],
        sort_order: 190,
      },
      {
        level: 10, stream: 'tv_broadcasting',
        title: 'TV Broadcasting Level 10',
        description: 'Department supervisor. Includes Supervisor audio/lighting/camera, supervising graphic artist, supervising presentation coordinator, set design supervisor.',
        duties: [
          'Supervising entire departments within broadcast operations',
          'Managing staff rostering, training, and performance',
          'Setting technical and creative standards for the department',
          'Budget management and resource allocation',
          'Strategic planning for departmental operations',
        ],
        indicative_tasks: ['Supervisor audio/lighting/camera', 'Supervising graphic artist', 'Supervising presentation coordinator', 'Set design supervisor'],
        sort_order: 200,
      },
      {
        level: 11, stream: 'tv_broadcasting',
        title: 'TV Broadcasting Level 11',
        description: 'Senior supervisor or specialist. Includes Supervising tech B, MC supervisor, VT supervisor, post-prod senior editor, director major production/specialist, advanced multi-skilled captioner.',
        duties: [
          'Senior supervisory role across technical operations',
          'Directing major productions or specialist content',
          'Senior editing and post-production supervision',
          'Advanced multi-skilled captioning across all formats',
          'Overseeing master control and VT operations',
        ],
        indicative_tasks: ['Supervising tech B', 'MC supervisor', 'VT supervisor', 'Post-prod senior editor', 'Director major production/specialist', 'Advanced multi-skilled captioner'],
        sort_order: 210,
      },
      {
        level: 12, stream: 'tv_broadcasting',
        title: 'TV Broadcasting Level 12',
        description: 'Specialist level. Includes Supervising tech A, specialist ENG camera, subtitler, subtitling editor, captioning supervisor.',
        duties: [
          'Specialist technical supervision at the highest level',
          'Specialist ENG camera work',
          'Subtitling and subtitling editorial work',
          'Supervising captioning operations',
          'Setting standards for specialist technical areas',
        ],
        indicative_tasks: ['Supervising tech A', 'Specialist ENG camera', 'Subtitler', 'Subtitling editor', 'Captioning supervisor'],
        sort_order: 220,
      },
      {
        level: 13, stream: 'tv_broadcasting',
        title: 'TV Broadcasting Level 13',
        description: 'Chief supervisor level. Includes Supervising tech A+, supervising ENG camera, supervising director.',
        duties: [
          'Chief supervisory responsibility for technical operations',
          'Supervising all ENG camera operations',
          'Supervising directors across productions',
          'Setting and maintaining broadcast standards organisation-wide',
          'Strategic leadership of technical departments',
        ],
        indicative_tasks: ['Supervising tech A+', 'Supervising ENG camera', 'Supervising director'],
        sort_order: 230,
      },

      // ── Radio stream (6 levels) ───────────────────────────────────────────
      {
        level: 1, stream: 'radio',
        title: 'Radio Level 1',
        description: 'Broadcasting operator in radio.',
        duties: [
          'Operating radio broadcast equipment',
          'Managing playout and automation systems',
          'Performing basic technical operations',
          'Assisting with studio setup and preparation',
          'Monitoring broadcast quality',
        ],
        indicative_tasks: ['Broadcasting operator'],
        sort_order: 310,
      },
      {
        level: 2, stream: 'radio',
        title: 'Radio Level 2',
        description: 'Technician in radio broadcasting.',
        duties: [
          'Maintaining and repairing broadcast equipment',
          'Installing and configuring broadcast systems',
          'Performing technical operations independently',
          'Troubleshooting equipment issues',
          'Supporting outside broadcasts and remote setups',
        ],
        indicative_tasks: ['Technician'],
        sort_order: 320,
      },
      {
        level: 3, stream: 'radio',
        title: 'Radio Level 3',
        description: 'Announcer class 2, Broadcaster/Journalist class 2, or Senior technician.',
        duties: [
          'Presenting and announcing on radio broadcasts',
          'Preparing and delivering news bulletins',
          'Senior-level technical maintenance and operations',
          'Producing segment content and interviews',
          'Mentoring junior technical staff',
        ],
        indicative_tasks: ['Announcer class 2', 'Broadcaster/Journalist class 2', 'Senior technician'],
        sort_order: 330,
      },
      {
        level: 4, stream: 'radio',
        title: 'Radio Level 4',
        description: 'Announcer class 1 or Broadcaster/Journalist class 1.',
        duties: [
          'Leading on-air presentation and programming',
          'Senior-level broadcasting and journalism',
          'Producing and presenting feature content',
          'Conducting major interviews and outside broadcasts',
          'Contributing to programming strategy',
        ],
        indicative_tasks: ['Announcer class 1', 'Broadcaster/Journalist class 1'],
        sort_order: 340,
      },
      {
        level: 5, stream: 'radio',
        title: 'Radio Level 5',
        description: 'Engineer in radio broadcasting.',
        duties: [
          'Engineering and maintaining broadcast infrastructure',
          'Designing and implementing broadcast systems',
          'Managing technical projects and installations',
          'Ensuring regulatory compliance of broadcast equipment',
          'Leading technical teams on projects',
        ],
        indicative_tasks: ['Engineer'],
        sort_order: 350,
      },
      {
        level: 6, stream: 'radio',
        title: 'Radio Level 6',
        description: 'Chief engineer in radio broadcasting.',
        duties: [
          'Overall responsibility for broadcast engineering and infrastructure',
          'Managing engineering staff and budgets',
          'Strategic planning for technical operations',
          'Regulatory compliance and licence management',
          'Setting technical standards and policies',
        ],
        indicative_tasks: ['Chief engineer'],
        sort_order: 360,
      },

      // ── Motion Picture stream (10 levels) ─────────────────────────────────
      {
        level: 1, stream: 'motion_picture',
        title: 'Motion Picture Level 1',
        description: 'Entry-level motion picture production worker — runner, assistant, or similar.',
        duties: [
          'Running errands and assisting production crew',
          'Setting up and striking equipment',
          'Performing basic production support tasks',
          'Assisting with location preparation',
          'General duties as directed by department heads',
        ],
        indicative_tasks: ['Runner', 'Production assistant', 'Entry-level crew'],
        sort_order: 410,
      },
      {
        level: 2, stream: 'motion_picture',
        title: 'Motion Picture Level 2',
        description: 'Junior crew member in motion picture production.',
        duties: [
          'Performing junior-level production tasks',
          'Operating basic production equipment',
          'Assisting senior crew with departmental tasks',
          'Maintaining and organizing equipment and supplies',
          'Following direction from department heads',
        ],
        indicative_tasks: ['Junior crew member', 'Junior assistant'],
        sort_order: 420,
      },
      {
        level: 3, stream: 'motion_picture',
        title: 'Motion Picture Level 3',
        description: 'Experienced crew member in motion picture production.',
        duties: [
          'Performing experienced-level production work',
          'Operating production equipment independently',
          'Contributing to departmental planning and execution',
          'Mentoring junior crew members',
          'Handling specialist equipment and materials',
        ],
        indicative_tasks: ['Experienced crew member', 'Skilled production worker'],
        sort_order: 430,
      },
      {
        level: 4, stream: 'motion_picture',
        title: 'Motion Picture Level 4',
        description: 'Skilled tradesperson or operator in motion picture production.',
        duties: [
          'Performing trade-level work in production departments',
          'Operating specialist equipment and systems',
          'Leading small teams on specific tasks',
          'Quality control of departmental output',
          'Advanced technical or creative production work',
        ],
        indicative_tasks: ['Skilled tradesperson', 'Operator', 'Specialist crew member'],
        sort_order: 440,
      },
      {
        level: 5, stream: 'motion_picture',
        title: 'Motion Picture Level 5',
        description: 'Senior crew member in motion picture production.',
        duties: [
          'Leading departmental teams on productions',
          'Senior-level technical or creative work',
          'Coordinating crew and equipment logistics',
          'Supervising junior and mid-level crew',
          'Contributing to production planning',
        ],
        indicative_tasks: ['Senior crew member', 'Lead operator'],
        sort_order: 450,
      },
      {
        level: 6, stream: 'motion_picture',
        title: 'Motion Picture Level 6',
        description: 'Department head in motion picture production.',
        duties: [
          'Heading a department on productions',
          'Managing departmental staff and budgets',
          'Ensuring departmental standards and quality',
          'Coordinating with other department heads',
          'Reporting to production management',
        ],
        indicative_tasks: ['Department head', 'Head of department'],
        sort_order: 460,
      },
      {
        level: 7, stream: 'motion_picture',
        title: 'Motion Picture Level 7',
        description: 'Senior department head in motion picture production.',
        duties: [
          'Senior departmental leadership on major productions',
          'Managing large crews and significant budgets',
          'Setting creative and technical direction for the department',
          'Mentoring department heads and senior crew',
          'Contributing to overall production strategy',
        ],
        indicative_tasks: ['Senior department head'],
        sort_order: 470,
      },
      {
        level: 8, stream: 'motion_picture',
        title: 'Motion Picture Level 8',
        description: 'Key creative or technical head in motion picture production.',
        duties: [
          'Key creative or technical leadership on productions',
          'Overall responsibility for a major creative/technical area',
          'Managing significant production budgets',
          'Collaborating with producers and directors at the highest level',
          'Setting standards for the production',
        ],
        indicative_tasks: ['Key creative/technical head'],
        sort_order: 480,
      },
      {
        level: 9, stream: 'motion_picture',
        title: 'Motion Picture Level 9',
        description: 'Senior production management in motion picture production.',
        duties: [
          'Senior management of production operations',
          'Managing all aspects of production logistics',
          'Budget accountability and financial management',
          'Coordinating across all departments',
          'Strategic production planning',
        ],
        indicative_tasks: ['Senior production management', 'Production manager'],
        sort_order: 490,
      },
      {
        level: 10, stream: 'motion_picture',
        title: 'Motion Picture Level 10',
        description: 'Production executive in motion picture production.',
        duties: [
          'Executive-level production management',
          'Overall accountability for production delivery',
          'Major budget and financial management',
          'Strategic decision-making and risk management',
          'Representing the production to external stakeholders',
        ],
        indicative_tasks: ['Production executive', 'Executive producer (award-level)'],
        sort_order: 500,
      },

      // ── Journalist stream (11 levels) ─────────────────────────────────────
      {
        level: 1, stream: 'journalist',
        title: 'Journalist Level 1',
        description: 'Cadet 1st year — entry-level journalist in training.',
        duties: [
          'Learning journalism fundamentals under supervision',
          'Conducting basic research and fact-checking',
          'Writing simple news stories and reports',
          'Assisting senior journalists with stories',
          'Attending press conferences and events',
        ],
        indicative_tasks: ['Cadet 1st year'],
        sort_order: 610,
      },
      {
        level: 2, stream: 'journalist',
        title: 'Journalist Level 2',
        description: 'Cadet 2nd year — developing journalist.',
        duties: [
          'Writing news stories with increasing independence',
          'Conducting interviews and research',
          'Contributing to news coverage and reporting',
          'Developing source networks and contacts',
          'Learning specialist reporting skills',
        ],
        indicative_tasks: ['Cadet 2nd year'],
        sort_order: 620,
      },
      {
        level: 3, stream: 'journalist',
        title: 'Journalist Level 3',
        description: 'Cadet 3rd year — advanced cadet journalist.',
        duties: [
          'Writing and reporting with minimal supervision',
          'Covering assigned rounds and beats',
          'Producing content across multiple platforms',
          'Conducting in-depth research and investigations',
          'Editing and sub-editing basic content',
        ],
        indicative_tasks: ['Cadet 3rd year'],
        sort_order: 630,
      },
      {
        level: 4, stream: 'journalist',
        title: 'Journalist Level 4',
        description: 'Journalist grade 1 — graduate journalist.',
        duties: [
          'Independent journalism across assigned areas',
          'Producing news stories, features, and reports',
          'Building and maintaining source networks',
          'Contributing to editorial planning and story selection',
          'Working across platforms (print, digital, broadcast)',
        ],
        indicative_tasks: ['Journalist grade 1', 'Graduate journalist'],
        sort_order: 640,
      },
      {
        level: 5, stream: 'journalist',
        title: 'Journalist Level 5',
        description: 'Journalist grade 2.',
        duties: [
          'Experienced journalism with established expertise',
          'Covering complex stories and investigations',
          'Mentoring cadet and junior journalists',
          'Contributing to editorial strategy',
          'Producing high-quality content across platforms',
        ],
        indicative_tasks: ['Journalist grade 2'],
        sort_order: 650,
      },
      {
        level: 6, stream: 'journalist',
        title: 'Journalist Level 6',
        description: 'Journalist grade 3 — senior journalist.',
        duties: [
          'Senior-level journalism and reporting',
          'Leading coverage of major stories and events',
          'Specialist reporting in assigned areas',
          'Mentoring and developing junior journalists',
          'Contributing to editorial leadership',
        ],
        indicative_tasks: ['Journalist grade 3', 'Senior journalist'],
        sort_order: 660,
      },
      {
        level: 7, stream: 'journalist',
        title: 'Journalist Level 7',
        description: 'Journalist grade 4.',
        duties: [
          'Advanced journalism with significant editorial influence',
          'Leading investigative and feature reporting',
          'Representing the publication/outlet at major events',
          'Setting editorial standards and practices',
          'Managing complex multi-platform projects',
        ],
        indicative_tasks: ['Journalist grade 4'],
        sort_order: 670,
      },
      {
        level: 8, stream: 'journalist',
        title: 'Journalist Level 8',
        description: 'Journalist grade 5.',
        duties: [
          'Senior editorial and journalistic leadership',
          'Overseeing major editorial projects and investigations',
          'Contributing to publication/outlet strategy',
          'Managing editorial staff and workflows',
          'Setting and maintaining editorial standards',
        ],
        indicative_tasks: ['Journalist grade 5'],
        sort_order: 680,
      },
      {
        level: 9, stream: 'journalist',
        title: 'Journalist Level 9',
        description: 'Journalist grade 6.',
        duties: [
          'Senior management of editorial operations',
          'Strategic editorial planning and execution',
          'Managing large editorial teams',
          'Budget and resource management for editorial operations',
          'Representing the organisation in industry forums',
        ],
        indicative_tasks: ['Journalist grade 6'],
        sort_order: 690,
      },
      {
        level: 10, stream: 'journalist',
        title: 'Journalist Level 10',
        description: 'Journalist grade 7 — chief journalist.',
        duties: [
          'Chief editorial leadership',
          'Overall responsibility for editorial direction and quality',
          'Managing all editorial staff and budgets',
          'Strategic planning for editorial operations',
          'Representing the organisation at the highest levels',
        ],
        indicative_tasks: ['Journalist grade 7', 'Chief journalist'],
        sort_order: 700,
      },
      {
        level: 11, stream: 'journalist',
        title: 'Journalist Level 11',
        description: 'Journalist grade 8 — editor.',
        duties: [
          'Editorship of publication or broadcast outlet',
          'Overall accountability for editorial content and standards',
          'Strategic editorial and business leadership',
          'Managing senior editorial staff',
          'Setting the editorial vision and direction',
        ],
        indicative_tasks: ['Journalist grade 8', 'Editor'],
        sort_order: 710,
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
    // Source: FWO pay guide MA000091, effective 1 July 2025.
    // Casual rate = FT/PT rate × 1.25 (25% casual loading).
    // Rates keyed by 'stream:level'.
    const BASE_RATES = {
      // Cinema stream
      'cinema:1': 26.94, 'cinema:2': 27.92, 'cinema:3': 28.84,
      'cinema:4': 30.37, 'cinema:5': 32.27, 'cinema:6': 33.13,
      'cinema:7': 34.06,
      // TV Broadcasting stream
      'tv_broadcasting:1':  26.70, 'tv_broadcasting:2':  28.12,
      'tv_broadcasting:3':  29.00, 'tv_broadcasting:4':  29.88,
      'tv_broadcasting:5':  30.68, 'tv_broadcasting:6':  31.54,
      'tv_broadcasting:7':  32.23, 'tv_broadcasting:8':  32.90,
      'tv_broadcasting:9':  33.78, 'tv_broadcasting:10': 34.66,
      'tv_broadcasting:11': 35.10, 'tv_broadcasting:12': 36.43,
      'tv_broadcasting:13': 38.03,
      // Radio stream
      'radio:1': 26.70, 'radio:2': 28.12, 'radio:3': 29.88,
      'radio:4': 30.68, 'radio:5': 32.23, 'radio:6': 32.90,
      // Motion Picture stream
      'motion_picture:1':  24.95, 'motion_picture:2':  25.85,
      'motion_picture:3':  26.70, 'motion_picture:4':  28.12,
      'motion_picture:5':  29.88, 'motion_picture:6':  31.54,
      'motion_picture:7':  32.90, 'motion_picture:8':  38.03,
      'motion_picture:9':  38.91, 'motion_picture:10': 40.68,
      // Journalist stream
      'journalist:1':  24.28, 'journalist:2':  24.28,
      'journalist:3':  27.61, 'journalist:4':  30.68,
      'journalist:5':  32.90, 'journalist:6':  36.43,
      'journalist:7':  38.03, 'journalist:8':  39.80,
      'journalist:9':  42.44, 'journalist:10': 45.09,
      'journalist:11': 46.43,
    };

    const classResult = await client.query(
      'SELECT id, level, stream FROM classifications WHERE award_code = $1',
      [AWARD_CODE]
    );

    for (const cls of classResult.rows) {
      const key = `${cls.stream}:${cls.level}`;
      const baseRate = BASE_RATES[key];
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
    // Source: MA000091 FWO pay guide, effective 1 July 2025.
    //
    // Penalty rates vary by stream. Since the penalty_rates table has no stream
    // column, we store the TV Broadcasting rates as the primary set (most
    // commonly applicable and most comprehensive). Stream-specific differences:
    //
    // TV Broadcasting FT/PT: Sat ×1.5, Sun ×1.75, PH ×2.5
    // TV Broadcasting Casual: Sat ×1.4, Sun ×1.6, PH ×2.2 (of casual base)
    //
    // Cinema FT/PT: PH ×2.0 only (no Sat/Sun penalties — ordinary hours any day)
    // Cinema Casual: PH ×1.6 (of casual base)
    //
    // Motion Picture FT/PT: Sun ×2.0, PH ×2.5 (no Sat penalty)
    // Motion Picture Casual: Sun ×1.6, PH ×2.0 (of casual base)
    //
    // Radio FT/PT: Sat ×1.75, Sun ×2.0, PH ×2.5
    // Radio Casual: Sat ×1.4, Sun ×1.6, PH ×2.0 (of casual base)
    //
    // Journalist FT/PT: no Sat/Sun/PH penalty rates (built into conditions)
    //
    // The calculator must override per-stream where the stored TV Broadcasting
    // multipliers do not match the stream's actual penalties.

    const penaltyRates = [
      // ── Full-time (TV Broadcasting as primary) ────────────────────────────
      {
        employment_type: 'full_time', day_type: 'weekday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.0, addition_per_hour: null,
        description: 'Ordinary weekday rate',
      },
      {
        employment_type: 'full_time', day_type: 'saturday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.50, addition_per_hour: null,
        description: 'Saturday — time and a half (×1.50) [TV Broadcasting/Radio; Cinema=no penalty; Motion Picture=no penalty; Journalist=no penalty]',
      },
      {
        employment_type: 'full_time', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.75, addition_per_hour: null,
        description: 'Sunday — ×1.75 [TV Broadcasting; Cinema=no penalty; Motion Picture=×2.0; Radio=×2.0; Journalist=no penalty]',
      },
      {
        employment_type: 'full_time', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.50, addition_per_hour: null,
        description: 'Public holiday — ×2.50 [TV Broadcasting/Radio/Motion Picture; Cinema=×2.0; Journalist=not specified]',
      },
      // ── Part-time (same as full-time) ─────────────────────────────────────
      {
        employment_type: 'part_time', day_type: 'weekday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.0, addition_per_hour: null,
        description: 'Ordinary weekday rate',
      },
      {
        employment_type: 'part_time', day_type: 'saturday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.50, addition_per_hour: null,
        description: 'Saturday — time and a half (×1.50) [TV Broadcasting/Radio; Cinema=no penalty; Motion Picture=no penalty; Journalist=no penalty]',
      },
      {
        employment_type: 'part_time', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.75, addition_per_hour: null,
        description: 'Sunday — ×1.75 [TV Broadcasting; Cinema=no penalty; Motion Picture=×2.0; Radio=×2.0; Journalist=no penalty]',
      },
      {
        employment_type: 'part_time', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.50, addition_per_hour: null,
        description: 'Public holiday — ×2.50 [TV Broadcasting/Radio/Motion Picture; Cinema=×2.0; Journalist=not specified]',
      },
      // ── Casual (TV Broadcasting as primary) ───────────────────────────────
      // Casual multipliers are applied to casual base rate (which includes 25% loading).
      {
        employment_type: 'casual', day_type: 'weekday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.0, addition_per_hour: null,
        description: 'Ordinary casual weekday rate (includes 25% casual loading)',
      },
      {
        employment_type: 'casual', day_type: 'saturday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.40, addition_per_hour: null,
        description: 'Casual Saturday — ×1.40 of casual base [TV Broadcasting/Radio; Cinema=no penalty; Motion Picture=no penalty; Journalist=no penalty]',
      },
      {
        employment_type: 'casual', day_type: 'sunday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 1.60, addition_per_hour: null,
        description: 'Casual Sunday — ×1.60 of casual base [TV Broadcasting/Radio/Motion Picture; Cinema=no penalty; Journalist=no penalty]',
      },
      {
        employment_type: 'casual', day_type: 'public_holiday',
        time_band_start: null, time_band_end: null, time_band_label: null,
        multiplier: 2.20, addition_per_hour: null,
        description: 'Casual public holiday — ×2.20 of casual base [TV Broadcasting; Cinema=×1.6; Motion Picture=×2.0; Radio=×2.0; Journalist=not specified]',
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
    // MA000091 — Overtime (all streams)
    // Daily: first 2 hours ×1.5, after 2 hours ×2.0 (threshold at 7.6 hours)
    // Weekly: over 38 hours — first 2 hours ×1.5, after ×2.0
    //
    // Casual overtime is calculated on FT base rate (not casual rate).
    // Casual OT multipliers relative to casual base:
    //   First 2 hrs: 1.50/1.25 = 1.20 of casual base
    //   After 2 hrs: 2.00/1.25 = 1.60 of casual base

    const overtimeRates = [
      // ── Full-time ─────────────────────────────────────────────────────────
      { employment_type: 'full_time',  threshold_hours: 7.6,  period: 'daily',  multiplier: 1.50, description: 'Daily overtime — first 2 hours over 7.6h (×1.50)' },
      { employment_type: 'full_time',  threshold_hours: 9.6,  period: 'daily',  multiplier: 2.00, description: 'Daily overtime — after 9.6h (×2.00)' },
      { employment_type: 'full_time',  threshold_hours: 38,   period: 'weekly', multiplier: 1.50, description: 'Weekly overtime — first 2 hours over 38h (×1.50)' },
      { employment_type: 'full_time',  threshold_hours: 40,   period: 'weekly', multiplier: 2.00, description: 'Weekly overtime — after 40h (×2.00)' },
      // ── Part-time ─────────────────────────────────────────────────────────
      { employment_type: 'part_time',  threshold_hours: 7.6,  period: 'daily',  multiplier: 1.50, description: 'Part-time daily overtime — first 2 hours over 7.6h (×1.50)' },
      { employment_type: 'part_time',  threshold_hours: 9.6,  period: 'daily',  multiplier: 2.00, description: 'Part-time daily overtime — after 9.6h (×2.00)' },
      { employment_type: 'part_time',  threshold_hours: 38,   period: 'weekly', multiplier: 1.50, description: 'Part-time weekly overtime — first 2 hours (×1.50)' },
      { employment_type: 'part_time',  threshold_hours: 40,   period: 'weekly', multiplier: 2.00, description: 'Part-time weekly overtime — after 40h (×2.00)' },
      // ── Casual (relative to casual base, which includes 25% loading) ──────
      { employment_type: 'casual',     threshold_hours: 7.6,  period: 'daily',  multiplier: 1.20, description: 'Casual daily overtime — first 2 hours over 7.6h (×1.20 of casual base = 150% of FT)' },
      { employment_type: 'casual',     threshold_hours: 9.6,  period: 'daily',  multiplier: 1.60, description: 'Casual daily overtime — after 9.6h (×1.60 of casual base = 200% of FT)' },
      { employment_type: 'casual',     threshold_hours: 38,   period: 'weekly', multiplier: 1.20, description: 'Casual weekly overtime — first 2 hours over 38h (×1.20 of casual base = 150% of FT)' },
      { employment_type: 'casual',     threshold_hours: 40,   period: 'weekly', multiplier: 1.60, description: 'Casual weekly overtime — after 40h (×1.60 of casual base = 200% of FT)' },
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
    // Source: MA000091 & FWO pay guide, effective 1 July 2025.
    const allowances = [
      {
        allowance_type: 'first_aid_ft',
        name: 'First aid allowance (full-time)',
        description: 'If you are appointed as the first aid officer and hold a current first aid qualification, you receive a weekly allowance.',
        trigger_condition: 'Full-time employee appointed as first aid officer with current first aid certificate',
        amount: 21.37, amount_type: 'weekly', per_unit: 'per_week',
        is_all_purpose: false,
      },
      {
        allowance_type: 'first_aid_pt_casual',
        name: 'First aid allowance (part-time/casual)',
        description: 'If you are appointed as the first aid officer and hold a current first aid qualification, you receive an hourly allowance.',
        trigger_condition: 'Part-time or casual employee appointed as first aid officer with current first aid certificate',
        amount: 0.56, amount_type: 'per_hour', per_unit: 'per_hour',
        is_all_purpose: false,
      },
      {
        allowance_type: 'meal',
        name: 'Meal allowance',
        description: 'If you are required to work overtime and a meal break falls during that overtime, you are entitled to a meal allowance.',
        trigger_condition: 'Overtime worked requiring a meal break',
        amount: 23.43, amount_type: 'fixed', per_unit: 'per_meal',
        is_all_purpose: false,
      },
      {
        allowance_type: 'vehicle_car',
        name: 'Vehicle allowance — car',
        description: 'If you are required to use your own car for work purposes, you receive a per-kilometre allowance.',
        trigger_condition: 'Using own car for work purposes',
        amount: 0.98, amount_type: 'per_km', per_unit: 'per_km',
        is_all_purpose: false,
      },
      {
        allowance_type: 'vehicle_motorcycle',
        name: 'Vehicle allowance — motorcycle',
        description: 'If you are required to use your own motorcycle for work purposes, you receive a per-kilometre allowance.',
        trigger_condition: 'Using own motorcycle for work purposes',
        amount: 0.51, amount_type: 'per_km', per_unit: 'per_km',
        is_all_purpose: false,
      },
      {
        allowance_type: 'uniform',
        name: 'Uniform allowance',
        description: 'If you are required to wear a uniform and the employer does not provide or launder it, you receive a daily allowance (up to $7.41/week).',
        trigger_condition: 'Required to wear a uniform not provided or laundered by the employer',
        amount: 1.51, amount_type: 'fixed', per_unit: 'per_day',
        is_all_purpose: false,
      },
      {
        allowance_type: 'director_trainee',
        name: "Director's allowance — trainee director",
        description: 'Trainee directors receive an hourly allowance in addition to their base rate.',
        trigger_condition: 'Employed as a trainee director in TV broadcasting',
        amount: 7.67, amount_type: 'per_hour', per_unit: 'per_hour',
        is_all_purpose: true,
      },
      {
        allowance_type: 'director_director',
        name: "Director's allowance — director",
        description: 'Directors receive an hourly allowance in addition to their base rate.',
        trigger_condition: 'Employed as a director in TV broadcasting',
        amount: 7.89, amount_type: 'per_hour', per_unit: 'per_hour',
        is_all_purpose: true,
      },
      {
        allowance_type: 'director_senior',
        name: "Director's allowance — senior director",
        description: 'Senior directors receive an hourly allowance in addition to their base rate.',
        trigger_condition: 'Employed as a senior director in TV broadcasting',
        amount: 8.44, amount_type: 'per_hour', per_unit: 'per_hour',
        is_all_purpose: true,
      },
      {
        allowance_type: 'director_major',
        name: "Director's allowance — director major production",
        description: 'Directors of major productions receive an hourly allowance in addition to their base rate.',
        trigger_condition: 'Employed as a director of major productions in TV broadcasting',
        amount: 8.78, amount_type: 'per_hour', per_unit: 'per_hour',
        is_all_purpose: true,
      },
      {
        allowance_type: 'director_supervising',
        name: "Director's allowance — supervising director",
        description: 'Supervising directors receive an hourly allowance in addition to their base rate.',
        trigger_condition: 'Employed as a supervising director in TV broadcasting',
        amount: 9.51, amount_type: 'per_hour', per_unit: 'per_hour',
        is_all_purpose: true,
      },
      {
        allowance_type: 'bocp',
        name: 'BOCP allowance',
        description: 'Broadcasting outside coverage program allowance.',
        trigger_condition: 'Required to work under BOCP conditions',
        amount: 0.51, amount_type: 'per_hour', per_unit: 'per_hour',
        is_all_purpose: true,
      },
      {
        allowance_type: 'tvocp',
        name: 'TVOCP allowance',
        description: 'Television outside coverage program allowance.',
        trigger_condition: 'Required to work under TVOCP conditions',
        amount: 1.49, amount_type: 'per_hour', per_unit: 'per_hour',
        is_all_purpose: true,
      },
      {
        allowance_type: 'laundry_motion_picture',
        name: 'Laundry allowance (motion picture)',
        description: 'If you are required to launder your own costume or wardrobe in motion picture production, you receive a daily allowance.',
        trigger_condition: 'Motion picture employee required to launder own costume/wardrobe',
        amount: 8.30, amount_type: 'fixed', per_unit: 'per_day',
        is_all_purpose: false,
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
    // Meal break: 30 min unpaid after 5 hours.
    // Rest break: 10 min paid per 4 hours worked.

    const breaks = [
      {
        employment_type: null,
        shift_hours_min: 4.0, shift_hours_max: null,
        break_type: 'rest', break_duration_min: 10, is_paid: true,
        timing_rule: 'One 10-minute paid rest break per 4 hours worked',
        description: 'You are entitled to a paid 10-minute rest break for every 4 hours of work.',
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
    // Multi-stream question flow:
    //   Q1: sector — Which sector do you work in? (always shown)
    //   Q2a: cinema_role — What best describes your role? (shown when sector=cinema)
    //   Q2b: tv_role — What is your role level? (shown when sector=tv_broadcasting)
    //   Q2c: radio_role — What is your role? (shown when sector=radio)
    //   Q2d: mp_role — What is your role level? (shown when sector=motion_picture)
    //   Q2e: journalist_role — What is your role? (shown when sector=journalist)

    const questions = [
      // ── Q1: Sector selection ──────────────────────────────────────────────
      {
        award_code: AWARD_CODE,
        question_key: 'ma91_sector',
        question_text: 'Which sector do you work in?',
        help_text: 'Select the sector that best describes your workplace. This determines which pay rates and conditions apply to you.',
        question_type: 'single',
        stream: null,
        parent_question_key: null,
        parent_answer_key: null,
        sort_order: 1,
        answers: [
          { answer_key: 'tv_broadcasting', answer_text: 'TV Broadcasting', sort_order: 1 },
          { answer_key: 'radio', answer_text: 'Radio Broadcasting', sort_order: 2 },
          { answer_key: 'cinema', answer_text: 'Cinema', sort_order: 3 },
          { answer_key: 'motion_picture', answer_text: 'Motion Picture Production', sort_order: 4 },
          { answer_key: 'journalist', answer_text: 'Journalism', sort_order: 5 },
        ],
      },

      // ── Q2a: Cinema role ──────────────────────────────────────────────────
      {
        award_code: AWARD_CODE,
        question_key: 'ma91_cinema_role',
        question_text: 'What best describes your role?',
        help_text: 'Select the option that best matches your current duties and level of responsibility.',
        question_type: 'single',
        stream: 'cinema',
        parent_question_key: 'ma91_sector',
        parent_answer_key: 'cinema',
        sort_order: 2,
        answers: [
          { answer_key: 'level_1', answer_text: 'Entry-level worker (ticket sales, ushering, candy bar, cleaning)', sort_order: 1 },
          { answer_key: 'level_2', answer_text: 'Experienced worker (can work independently with limited supervision)', sort_order: 2 },
          { answer_key: 'level_3', answer_text: 'Specialist or technical worker', sort_order: 3 },
          { answer_key: 'level_4', answer_text: 'Senior worker or team leader', sort_order: 4 },
          { answer_key: 'level_5', answer_text: 'Supervisor or technical specialist', sort_order: 5 },
          { answer_key: 'level_6', answer_text: 'Senior supervisor', sort_order: 6 },
          { answer_key: 'level_7', answer_text: 'Cinema manager', sort_order: 7 },
        ],
      },

      // ── Q2b: TV Broadcasting role ─────────────────────────────────────────
      {
        award_code: AWARD_CODE,
        question_key: 'ma91_tv_role',
        question_text: 'What is your role level?',
        help_text: 'Select the option that best matches your current role and level in TV broadcasting.',
        question_type: 'single',
        stream: 'tv_broadcasting',
        parent_question_key: 'ma91_sector',
        parent_answer_key: 'tv_broadcasting',
        sort_order: 3,
        answers: [
          { answer_key: 'level_1',  answer_text: 'Trainee or assistant', sort_order: 1 },
          { answer_key: 'level_2',  answer_text: 'Operator (grade B)', sort_order: 2 },
          { answer_key: 'level_3',  answer_text: 'Operator (grade B+)', sort_order: 3 },
          { answer_key: 'level_4',  answer_text: 'Operator (grade A)', sort_order: 4 },
          { answer_key: 'level_5',  answer_text: 'Senior operator or director entry', sort_order: 5 },
          { answer_key: 'level_6',  answer_text: 'Director or senior operator B', sort_order: 6 },
          { answer_key: 'level_7',  answer_text: 'Coordinator', sort_order: 7 },
          { answer_key: 'level_8',  answer_text: 'Senior operator A', sort_order: 8 },
          { answer_key: 'level_9',  answer_text: 'Senior director', sort_order: 9 },
          { answer_key: 'level_10', answer_text: 'Department supervisor', sort_order: 10 },
          { answer_key: 'level_11', answer_text: 'Senior supervisor or specialist', sort_order: 11 },
          { answer_key: 'level_12', answer_text: 'Specialist or senior management', sort_order: 12 },
          { answer_key: 'level_13', answer_text: 'Chief / supervising director', sort_order: 13 },
        ],
      },

      // ── Q2c: Radio role ───────────────────────────────────────────────────
      {
        award_code: AWARD_CODE,
        question_key: 'ma91_radio_role',
        question_text: 'What is your role?',
        help_text: 'Select the option that best matches your current role in radio broadcasting.',
        question_type: 'single',
        stream: 'radio',
        parent_question_key: 'ma91_sector',
        parent_answer_key: 'radio',
        sort_order: 4,
        answers: [
          { answer_key: 'level_1', answer_text: 'Broadcasting operator', sort_order: 1 },
          { answer_key: 'level_2', answer_text: 'Technician', sort_order: 2 },
          { answer_key: 'level_3', answer_text: 'Announcer or journalist (class 2) / Senior technician', sort_order: 3 },
          { answer_key: 'level_4', answer_text: 'Announcer or journalist (class 1)', sort_order: 4 },
          { answer_key: 'level_5', answer_text: 'Engineer', sort_order: 5 },
          { answer_key: 'level_6', answer_text: 'Chief engineer', sort_order: 6 },
        ],
      },

      // ── Q2d: Motion Picture role ──────────────────────────────────────────
      {
        award_code: AWARD_CODE,
        question_key: 'ma91_mp_role',
        question_text: 'What is your role level?',
        help_text: 'Select the option that best matches your current role level in motion picture production.',
        question_type: 'single',
        stream: 'motion_picture',
        parent_question_key: 'ma91_sector',
        parent_answer_key: 'motion_picture',
        sort_order: 5,
        answers: [
          { answer_key: 'level_1',  answer_text: 'Runner, assistant, entry-level', sort_order: 1 },
          { answer_key: 'level_2',  answer_text: 'Junior crew member', sort_order: 2 },
          { answer_key: 'level_3',  answer_text: 'Experienced crew member', sort_order: 3 },
          { answer_key: 'level_4',  answer_text: 'Skilled tradesperson or operator', sort_order: 4 },
          { answer_key: 'level_5',  answer_text: 'Senior crew member', sort_order: 5 },
          { answer_key: 'level_6',  answer_text: 'Department head', sort_order: 6 },
          { answer_key: 'level_7',  answer_text: 'Senior department head', sort_order: 7 },
          { answer_key: 'level_8',  answer_text: 'Key creative/technical head', sort_order: 8 },
          { answer_key: 'level_9',  answer_text: 'Senior production management', sort_order: 9 },
          { answer_key: 'level_10', answer_text: 'Production executive', sort_order: 10 },
        ],
      },

      // ── Q2e: Journalist role ──────────────────────────────────────────────
      {
        award_code: AWARD_CODE,
        question_key: 'ma91_journalist_role',
        question_text: 'What is your role?',
        help_text: 'Select the option that best matches your current journalist classification.',
        question_type: 'single',
        stream: 'journalist',
        parent_question_key: 'ma91_sector',
        parent_answer_key: 'journalist',
        sort_order: 6,
        answers: [
          { answer_key: 'level_1',  answer_text: 'Cadet 1st year', sort_order: 1 },
          { answer_key: 'level_2',  answer_text: 'Cadet 2nd year', sort_order: 2 },
          { answer_key: 'level_3',  answer_text: 'Cadet 3rd year', sort_order: 3 },
          { answer_key: 'level_4',  answer_text: 'Journalist grade 1 (graduate)', sort_order: 4 },
          { answer_key: 'level_5',  answer_text: 'Journalist grade 2', sort_order: 5 },
          { answer_key: 'level_6',  answer_text: 'Journalist grade 3 (senior)', sort_order: 6 },
          { answer_key: 'level_7',  answer_text: 'Journalist grade 4', sort_order: 7 },
          { answer_key: 'level_8',  answer_text: 'Journalist grade 5', sort_order: 8 },
          { answer_key: 'level_9',  answer_text: 'Journalist grade 6', sort_order: 9 },
          { answer_key: 'level_10', answer_text: 'Journalist grade 7 (chief)', sort_order: 10 },
          { answer_key: 'level_11', answer_text: 'Journalist grade 8 (editor)', sort_order: 11 },
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
    console.log('\n✅ MA000091 seed complete');
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
