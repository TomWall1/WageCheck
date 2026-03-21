/**
 * Classification decision engine — deterministic
 * Maps a set of question answers to a classification level and stream.
 *
 * Input: { [question_key]: answer_key }
 * Output: { level, stream, confidence, alternateLevel }
 */

/**
 * MA000009 — Hospitality Industry (General) Award 2020
 * Core rules — maps answer patterns to (level, stream) outcomes.
 * Evaluated in order; first match wins.
 */
const CLASSIFICATION_RULES_MA000009 = [

  // ── KITCHEN STREAM ──────────────────────────────────────────────────────────
  {
    stream: 'kitchen',
    conditions: { stream: 'kitchen', kitchen_role_type: 'head_chef' },
    level: 5,
    rationale: 'Head chef with full kitchen responsibility',
  },
  {
    stream: 'kitchen',
    conditions: { stream: 'kitchen', kitchen_role_type: 'sous_chef' },
    level: 4,
    rationale: 'Sous chef / second in charge',
  },
  {
    stream: 'kitchen',
    conditions: { stream: 'kitchen', kitchen_role_type: 'cook_section', kitchen_menu: 'contributes' },
    level: 3,
    rationale: 'Runs own section, contributes to menu',
  },
  {
    stream: 'kitchen',
    conditions: { stream: 'kitchen', kitchen_role_type: 'cook_section', kitchen_supervises: 'yes' },
    level: 3,
    rationale: 'Runs own section, supervises others',
  },
  {
    stream: 'kitchen',
    conditions: { stream: 'kitchen', kitchen_role_type: 'cook_section' },
    level: 3,
    rationale: 'Runs own kitchen section independently',
  },
  {
    stream: 'kitchen',
    conditions: { stream: 'kitchen', kitchen_role_type: 'cook_basic', kitchen_supervises: 'yes' },
    level: 3,
    rationale: 'Experienced cook who supervises others',
  },
  {
    stream: 'kitchen',
    conditions: { stream: 'kitchen', kitchen_role_type: 'cook_basic', experience: 'senior' },
    level: 3,
    rationale: 'Experienced cook (3+ years)',
  },
  {
    stream: 'kitchen',
    conditions: { stream: 'kitchen', kitchen_role_type: 'cook_basic' },
    level: 2,
    rationale: 'Cook working from recipes with some supervision',
  },
  {
    stream: 'kitchen',
    conditions: { stream: 'kitchen', kitchen_role_type: 'kitchenhand', experience: ['experienced', 'senior'] },
    level: 2,
    rationale: 'Experienced kitchen hand',
  },
  {
    stream: 'kitchen',
    conditions: { stream: 'kitchen', kitchen_role_type: 'kitchenhand' },
    level: 1,
    rationale: 'Kitchen hand / basic food prep under supervision',
  },

  // ── FOOD & BEVERAGE STREAM ──────────────────────────────────────────────────
  {
    stream: 'food_beverage',
    conditions: { stream: 'food_beverage', supervises_fb_staff: 'manages_operations' },
    level: 4,
    rationale: 'Manages full food and beverage operation',
  },
  {
    stream: 'food_beverage',
    conditions: {
      stream: 'food_beverage',
      supervises_fb_staff: 'supervises_shift',
      beverage_specialist: ['yes_wine', 'yes_cocktails'],
    },
    level: 3,
    rationale: 'Beverage specialist who also supervises',
  },
  {
    stream: 'food_beverage',
    conditions: { stream: 'food_beverage', supervises_fb_staff: 'supervises_shift' },
    level: 3,
    rationale: 'Shift supervisor in food and beverage',
  },
  {
    stream: 'food_beverage',
    conditions: { stream: 'food_beverage', beverage_specialist: ['yes_wine', 'yes_cocktails'] },
    level: 3,
    rationale: 'Specialist in wine or cocktails',
  },
  {
    stream: 'food_beverage',
    conditions: {
      stream: 'food_beverage',
      takes_orders: 'yes',
      handles_payments: 'yes',
    },
    level: 2,
    rationale: 'Takes orders and handles payments independently',
  },
  {
    stream: 'food_beverage',
    conditions: { stream: 'food_beverage', takes_orders: 'yes' },
    level: 2,
    rationale: 'Takes orders from customers independently',
  },
  {
    stream: 'food_beverage',
    conditions: { stream: 'food_beverage', takes_orders: 'no', experience: ['experienced', 'senior'] },
    level: 2,
    rationale: 'Experienced food runner / busser',
  },
  {
    stream: 'food_beverage',
    conditions: { stream: 'food_beverage', takes_orders: 'no' },
    level: 1,
    rationale: 'Entry-level delivery of food and drinks only',
  },

  // ── FRONT OFFICE STREAM ─────────────────────────────────────────────────────
  {
    stream: 'front_office',
    conditions: { stream: 'front_office', fo_supervises: 'manages' },
    level: 4,
    rationale: 'Manages front office department',
  },
  {
    stream: 'front_office',
    conditions: { stream: 'front_office', fo_supervises: 'supervises' },
    level: 3,
    rationale: 'Supervises front office staff on shift',
  },
  {
    stream: 'front_office',
    conditions: { stream: 'front_office', fo_checks_in_guests: 'yes' },
    level: 2,
    rationale: 'Checks guests in and out independently',
  },
  {
    stream: 'front_office',
    conditions: { stream: 'front_office', fo_checks_in_guests: 'no' },
    level: 1,
    rationale: 'Basic front office or rooms duties under supervision',
  },

  // ── GENERAL STREAM ──────────────────────────────────────────────────────────
  {
    stream: 'general',
    conditions: { stream: 'general', general_level: 'manages' },
    level: 4,
    rationale: 'Manages a team with operational responsibility',
  },
  {
    stream: 'general',
    conditions: { stream: 'general', general_level: 'supervises' },
    level: 3,
    rationale: 'Supervises other staff',
  },
  {
    stream: 'general',
    conditions: { stream: 'general', general_level: 'independent', experience: 'senior' },
    level: 3,
    rationale: 'Experienced independent worker (3+ years)',
  },
  {
    stream: 'general',
    conditions: { stream: 'general', general_level: 'independent' },
    level: 2,
    rationale: 'Works independently without constant supervision',
  },
  {
    stream: 'general',
    conditions: { stream: 'general', general_level: 'basic_tasks', experience: ['some', 'experienced', 'senior'] },
    level: 2,
    rationale: 'Basic tasks but with some experience',
  },
  {
    stream: 'general',
    conditions: { stream: 'general', general_level: 'basic_tasks' },
    level: 1,
    rationale: 'Entry-level, basic tasks under supervision',
  },
];

/**
 * MA000003 — Fast Food Industry Award 2020
 * Classifications: Grade 1 (L1), Grade 2 (L2), Grade 3 solo (L3/stream=solo),
 * Grade 3 responsible (L3/stream=responsible).
 * Evaluated in order; first match wins.
 */
const CLASSIFICATION_RULES_MA000003 = [
  {
    conditions: { ff_experience: 'experienced', ff_role: 'supervises_2plus' },
    level: 3,
    stream: 'responsible',
    rationale: 'Experienced employee responsible for supervising 2 or more other employees',
  },
  {
    conditions: { ff_experience: 'experienced', ff_role: 'works_alone' },
    level: 3,
    stream: 'solo',
    rationale: 'Experienced employee who works alone or opens/closes the store without other employees present',
  },
  {
    conditions: { ff_experience: 'experienced', ff_role: 'team_member' },
    level: 2,
    stream: 'general',
    rationale: 'Experienced team member (3+ months) working alongside other staff',
  },
  {
    conditions: { ff_experience: 'experienced' },
    level: 2,
    stream: 'general',
    rationale: 'Experienced fast food employee (3+ months)',
  },
  {
    conditions: { ff_experience: 'new' },
    level: 1,
    stream: 'general',
    rationale: 'New employee (less than 3 months experience) — entry level Grade 1',
  },
];

/**
 * MA000119 — Restaurant Industry Award 2020
 * Classifications: Introductory (L0), Level 1–6 across food_beverage, kitchen, general streams.
 * Evaluated in order; first match wins.
 */
const CLASSIFICATION_RULES_MA000119 = [
  // Introductory
  { conditions: { rest_experience: 'introductory' }, level: 0, stream: 'introductory', rationale: 'Introductory employee — new to the restaurant industry' },

  // Food & Beverage
  { conditions: { rest_experience: 'experienced', rest_stream: 'food_beverage', rest_fb_level: 'grade5' }, level: 5, stream: 'food_beverage', rationale: 'Food & Beverage Supervisor — supervises staff or manages a service section' },
  { conditions: { rest_experience: 'experienced', rest_stream: 'food_beverage', rest_fb_level: 'grade4' }, level: 4, stream: 'food_beverage', rationale: 'Food & Beverage Grade 4 — specialist skills (wine, cocktails, trade qualifications)' },
  { conditions: { rest_experience: 'experienced', rest_stream: 'food_beverage', rest_fb_level: 'grade3' }, level: 3, stream: 'food_beverage', rationale: 'Food & Beverage Grade 3 (trained) — experienced server with full table service' },
  { conditions: { rest_experience: 'experienced', rest_stream: 'food_beverage', rest_fb_level: 'grade2' }, level: 2, stream: 'food_beverage', rationale: 'Food & Beverage Grade 2 — general food service, counter service, basic cashier duties' },
  { conditions: { rest_experience: 'experienced', rest_stream: 'food_beverage', rest_fb_level: 'grade1' }, level: 1, stream: 'food_beverage', rationale: 'Food & Beverage Grade 1 — basic delivery of food/drinks, no order-taking' },

  // Kitchen
  { conditions: { rest_experience: 'experienced', rest_stream: 'kitchen', rest_kitchen_level: 'cook5' }, level: 6, stream: 'kitchen', rationale: 'Cook Grade 5 — specialist cook (advanced pastry or artisan)' },
  { conditions: { rest_experience: 'experienced', rest_stream: 'kitchen', rest_kitchen_level: 'cook4' }, level: 5, stream: 'kitchen', rationale: 'Cook Grade 4 — advanced tradesperson, section head' },
  { conditions: { rest_experience: 'experienced', rest_stream: 'kitchen', rest_kitchen_level: 'cook3' }, level: 4, stream: 'kitchen', rationale: 'Cook Grade 3 — trade qualified cook/chef' },
  { conditions: { rest_experience: 'experienced', rest_stream: 'kitchen', rest_kitchen_level: 'cook2' }, level: 3, stream: 'kitchen', rationale: 'Cook Grade 2 — cooks menu items from recipes independently' },
  { conditions: { rest_experience: 'experienced', rest_stream: 'kitchen', rest_kitchen_level: 'attendant2_cook1' }, level: 2, stream: 'kitchen', rationale: 'Kitchen Attendant Grade 2 / Cook Grade 1 — prepares vegetables, basic cooking' },
  { conditions: { rest_experience: 'experienced', rest_stream: 'kitchen', rest_kitchen_level: 'attendant1' }, level: 1, stream: 'kitchen', rationale: 'Kitchen Attendant Grade 1 — dishwashing, basic cleaning, simple food prep' },

  // General
  { conditions: { rest_experience: 'experienced', rest_stream: 'general', rest_general_level: 'level5' }, level: 5, stream: 'general', rationale: 'General Service Grade 5 — manages a section or is a senior tradesperson' },
  { conditions: { rest_experience: 'experienced', rest_stream: 'general', rest_general_level: 'level4' }, level: 4, stream: 'general', rationale: 'General Service Grade 4 — supervises general service staff or advanced functions' },
  { conditions: { rest_experience: 'experienced', rest_stream: 'general', rest_general_level: 'level3' }, level: 3, stream: 'general', rationale: 'General Service Grade 3 — experienced, handles transactions or specialist equipment' },
  { conditions: { rest_experience: 'experienced', rest_stream: 'general', rest_general_level: 'level2' }, level: 2, stream: 'general', rationale: 'General Service Grade 2 — cleaning, storeperson, or laundry with some experience' },
];

/**
 * MA000004 — General Retail Industry Award 2020
 * Classifications: Levels 1–8, all stream='retail'.
 * Evaluated in order; first match wins.
 */
const CLASSIFICATION_RULES_MA000004 = [
  { conditions: { retail_experience: 'new' }, level: 1, stream: 'retail', rationale: 'New retail employee (less than 3 months experience) — entry level' },
  { conditions: { retail_experience: 'experienced', retail_role: 'cashier_sales' }, level: 2, stream: 'retail', rationale: 'Experienced sales assistant or cashier' },
  { conditions: { retail_experience: 'experienced', retail_role: 'specialist' }, level: 3, stream: 'retail', rationale: 'Specialist product adviser' },
  { conditions: { retail_experience: 'experienced', retail_role: 'senior_specialist' }, level: 4, stream: 'retail', rationale: 'Senior specialist (3+ years or trade qualified)' },
  { conditions: { retail_experience: 'experienced', retail_role: 'key_holder' }, level: 5, stream: 'retail', rationale: 'Key holder or leading hand' },
  { conditions: { retail_experience: 'experienced', retail_role: 'supervisor' }, level: 6, stream: 'retail', rationale: 'Department supervisor with ordering/rostering responsibilities' },
  { conditions: { retail_experience: 'experienced', retail_role: 'dept_manager' }, level: 7, stream: 'retail', rationale: 'Department manager' },
  { conditions: { retail_experience: 'experienced', retail_role: 'senior_manager' }, level: 8, stream: 'retail', rationale: 'Senior manager with multi-department or store-wide responsibility' },
];

/**
 * MA000094 — Fitness Industry Award 2020
 * Classifications: Levels 1–9 (internal), mapping to Award Levels L1, L2, L3, L3A, L4, L4A, L5, L6, L7.
 * All in a single 'fitness' stream. Evaluated in order; first match wins.
 */
const CLASSIFICATION_RULES_MA000094 = [
  { conditions: { fitness_experience: 'new' }, level: 1, stream: 'fitness', rationale: 'New fitness industry employee — entry level (Award Level 1)' },
  { conditions: { fitness_experience: 'experienced', fitness_role: 'reception_support' }, level: 2, stream: 'fitness', rationale: 'Experienced reception or support employee (Award Level 2)' },
  { conditions: { fitness_experience: 'experienced', fitness_role: 'instructor_unqualified' }, level: 3, stream: 'fitness', rationale: 'Qualified instructor, swim teacher, lifeguard, or gymnastics coach (Award Level 3)' },
  { conditions: { fitness_experience: 'experienced', fitness_role: 'instructor_cert3' }, level: 4, stream: 'fitness', rationale: 'Certificate III qualified fitness instructor or swim teacher (Award Level 3A)' },
  { conditions: { fitness_experience: 'experienced', fitness_role: 'advanced_instructor' }, level: 5, stream: 'fitness', rationale: 'Advanced instructor under limited supervision (Award Level 4)' },
  { conditions: { fitness_experience: 'experienced', fitness_role: 'personal_trainer_cert4' }, level: 6, stream: 'fitness', rationale: 'Certificate IV personal trainer or fitness specialist (Award Level 4A)' },
  { conditions: { fitness_experience: 'experienced', fitness_role: 'diploma_qualified' }, level: 7, stream: 'fitness', rationale: 'Diploma-qualified fitness specialist with high autonomy (Award Level 5)' },
  { conditions: { fitness_experience: 'experienced', fitness_role: 'coordinator' }, level: 8, stream: 'fitness', rationale: 'Area coordinator or department supervisor (Award Level 6)' },
  { conditions: { fitness_experience: 'experienced', fitness_role: 'manager' }, level: 9, stream: 'fitness', rationale: 'Fitness centre or operations manager (Award Level 7)' },
];

/**
 * MA000080 — Amusement, Events and Recreation Award 2020
 * Classifications: Introductory (level 0) + Grade 1–10 (levels 1–10), stream 'general'.
 * Exhibition employees: Grade 2 (level 2), Grade 4 (level 4), Grade 5 (level 5), stream 'exhibition'.
 * Evaluated in order; first match wins.
 */
const CLASSIFICATION_RULES_MA000080 = [
  // Introductory
  { conditions: { am_experience: 'new' }, level: 0, stream: 'general', rationale: 'Introductory level — first month in the industry, receiving on-the-job training' },
  // Exhibition employees (checked before general grades)
  { conditions: { am_experience: 'experienced', am_worker_type: 'exhibition', am_exhibition_type: 'general_hand' },          level: 2, stream: 'exhibition', rationale: 'Exhibition general hand — stand setup/packdown, equipment moving (includes flexible loading)' },
  { conditions: { am_experience: 'experienced', am_worker_type: 'exhibition', am_exhibition_type: 'technician' },            level: 4, stream: 'exhibition', rationale: 'Exhibition technician — AV, electrical, rigging (includes flexible and supervisory loadings)' },
  { conditions: { am_experience: 'experienced', am_worker_type: 'exhibition', am_exhibition_type: 'supervisory_technician' }, level: 5, stream: 'exhibition', rationale: 'Supervisory exhibition technician — manages technicians and hands (includes all loadings)' },
  // General employees (Grades 1–10)
  { conditions: { am_experience: 'experienced', am_worker_type: 'grade1' },  level: 1,  stream: 'general', rationale: 'Grade 1 — general support, tickets, rides under supervision, cash handling, refreshments' },
  { conditions: { am_experience: 'experienced', am_worker_type: 'grade2' },  level: 2,  stream: 'general', rationale: 'Grade 2 — independent ride/amusement operator, cashier, admissions, first aid officer' },
  { conditions: { am_experience: 'experienced', am_worker_type: 'grade3' },  level: 3,  stream: 'general', rationale: 'Grade 3 — specialised equipment operator, handyperson, in charge of lower-grade staff' },
  { conditions: { am_experience: 'experienced', am_worker_type: 'grade4' },  level: 4,  stream: 'general', rationale: 'Grade 4 — apprentice tradesperson (2nd–3rd year) or semi-skilled trades work' },
  { conditions: { am_experience: 'experienced', am_worker_type: 'grade5' },  level: 5,  stream: 'general', rationale: 'Grade 5 — fully qualified tradesperson (electrician, plumber, carpenter, mechanic, etc.)' },
  { conditions: { am_experience: 'experienced', am_worker_type: 'grade6' },  level: 6,  stream: 'general', rationale: 'Grade 6 — senior tradesperson or leading hand (up to 3 employees)' },
  { conditions: { am_experience: 'experienced', am_worker_type: 'grade7' },  level: 7,  stream: 'general', rationale: 'Grade 7 — leading hand responsible for 4 or more employees' },
  { conditions: { am_experience: 'experienced', am_worker_type: 'grade8' },  level: 8,  stream: 'general', rationale: 'Grade 8 — supervisor or section manager' },
  { conditions: { am_experience: 'experienced', am_worker_type: 'grade9' },  level: 9,  stream: 'general', rationale: 'Grade 9 — senior supervisor or operations/department manager' },
  { conditions: { am_experience: 'experienced', am_worker_type: 'grade10' }, level: 10, stream: 'general', rationale: 'Grade 10 — general manager, venue director, or senior manager' },
];

/**
 * MA000081 — Live Performance Award 2020
 * Three streams: general (production & support staff), touring_sl (touring S&L), dancer (company dancers).
 * Performers, musicians, and other artists are out of scope (per-call structures).
 */
const CLASSIFICATION_RULES_MA000081 = [
  // ── Performers/other (out of scope) ────────────────────────────────────────
  { conditions: { lp_worker_type: 'other' }, level: null, stream: null,
    rationale: 'Performers, musicians, and other per-call artists have complex payment structures not supported by this calculator. Please seek specialist advice.' },
  // ── Production & Support Staff — general stream ──────────────────────────
  { conditions: { lp_worker_type: 'production_support', lp_ps_level: 'level1' },  level: 1, stream: 'general', rationale: 'Level 1 — induction/training period for production & support staff' },
  { conditions: { lp_worker_type: 'production_support', lp_ps_level: 'level2' },  level: 2, stream: 'general', rationale: 'Level 2 — general production support (stagehand, bump-in/out crew)' },
  { conditions: { lp_worker_type: 'production_support', lp_ps_level: 'level3' },  level: 3, stream: 'general', rationale: 'Level 3 — higher-level production support (specific equipment, vehicle driving)' },
  { conditions: { lp_worker_type: 'production_support', lp_ps_level: 'level4' },  level: 4, stream: 'general', rationale: 'Level 4 — skilled production technician (rigging, wardrobe, props, equipment)' },
  { conditions: { lp_worker_type: 'production_support', lp_ps_level: 'level5' },  level: 5, stream: 'general', rationale: 'Level 5 — experienced technician or junior head of department' },
  { conditions: { lp_worker_type: 'production_support', lp_ps_level: 'level6' },  level: 6, stream: 'general', rationale: 'Level 6 — senior technician or department head (stage manager, head rigger)' },
  { conditions: { lp_worker_type: 'production_support', lp_ps_level: 'level7' },  level: 7, stream: 'general', rationale: 'Level 7 — head of department (lighting, sound, staging, wardrobe, etc.)' },
  { conditions: { lp_worker_type: 'production_support', lp_ps_level: 'level8' },  level: 8, stream: 'general', rationale: 'Level 8 — very senior HOD or experienced production manager' },
  { conditions: { lp_worker_type: 'production_support', lp_ps_level: 'tech_mgr' }, level: 9, stream: 'general', rationale: 'Technical Manager — the designated overall technical manager for the venue or production' },
  // ── Touring Sound & Lighting stream ─────────────────────────────────────────
  { conditions: { lp_worker_type: 'sound_lighting_tour', lp_sl_level: 'level1' },  level: 1, stream: 'touring_sl', rationale: 'Touring S&L Level 1 — induction/training (embedded S&L OT/penalty allowance included)' },
  { conditions: { lp_worker_type: 'sound_lighting_tour', lp_sl_level: 'level2' },  level: 2, stream: 'touring_sl', rationale: 'Touring S&L Level 2 — general touring crew (embedded S&L allowance included)' },
  { conditions: { lp_worker_type: 'sound_lighting_tour', lp_sl_level: 'level3' },  level: 3, stream: 'touring_sl', rationale: 'Touring S&L Level 3 — skilled touring operator (embedded S&L allowance included)' },
  { conditions: { lp_worker_type: 'sound_lighting_tour', lp_sl_level: 'level4' },  level: 4, stream: 'touring_sl', rationale: 'Touring S&L Level 4 — independent touring operator (embedded S&L allowance included)' },
  { conditions: { lp_worker_type: 'sound_lighting_tour', lp_sl_level: 'level5' },  level: 5, stream: 'touring_sl', rationale: 'Touring S&L Level 5 — experienced touring operator, FOH/LD entry (embedded S&L allowance included)' },
  { conditions: { lp_worker_type: 'sound_lighting_tour', lp_sl_level: 'level6' },  level: 6, stream: 'touring_sl', rationale: 'Touring S&L Level 6 — senior touring operator (embedded S&L allowance included)' },
  { conditions: { lp_worker_type: 'sound_lighting_tour', lp_sl_level: 'level7' },  level: 7, stream: 'touring_sl', rationale: 'Touring S&L Level 7 — touring S&L department head (embedded S&L allowance included)' },
  { conditions: { lp_worker_type: 'sound_lighting_tour', lp_sl_level: 'level8' },  level: 8, stream: 'touring_sl', rationale: 'Touring S&L Level 8 — very senior touring S&L specialist (embedded S&L allowance included)' },
  { conditions: { lp_worker_type: 'sound_lighting_tour', lp_sl_level: 'tech_mgr' }, level: 9, stream: 'touring_sl', rationale: 'Technical Manager (Touring S&L) — designated overall technical manager (embedded S&L allowance included)' },
  // ── Company Dancers ─────────────────────────────────────────────────────────
  { conditions: { lp_worker_type: 'company_dancer', lp_dancer_level: 'dancer1' }, level: 1, stream: 'dancer', rationale: 'Company Dancer Level 1 — $1,165.70/week minimum ($30.68/hr)' },
  { conditions: { lp_worker_type: 'company_dancer', lp_dancer_level: 'dancer2' }, level: 2, stream: 'dancer', rationale: 'Company Dancer Level 2 — $1,208.30/week minimum ($31.80/hr)' },
  { conditions: { lp_worker_type: 'company_dancer', lp_dancer_level: 'dancer3' }, level: 3, stream: 'dancer', rationale: 'Company Dancer Level 3 — $1,250.00/week minimum ($32.89/hr)' },
  { conditions: { lp_worker_type: 'company_dancer', lp_dancer_level: 'dancer4' }, level: 4, stream: 'dancer', rationale: 'Company Dancer Level 4 — $1,289.40/week minimum ($33.93/hr)' },
  { conditions: { lp_worker_type: 'company_dancer', lp_dancer_level: 'dancer5' }, level: 5, stream: 'dancer', rationale: 'Company Dancer Level 5 — $1,332.70/week minimum ($35.07/hr)' },
  { conditions: { lp_worker_type: 'company_dancer', lp_dancer_level: 'dancer6' }, level: 6, stream: 'dancer', rationale: 'Company Dancer Level 6 — $1,381.10/week minimum ($36.34/hr)' },
  { conditions: { lp_worker_type: 'company_dancer', lp_dancer_level: 'dancer7' }, level: 7, stream: 'dancer', rationale: 'Company Dancer Level 7 — $1,438.40/week minimum ($37.85/hr)' },
];

/**
 * MA000022 — Cleaning Services Award 2020
 * Three levels, all stream='cleaning'.
 * Level 1: general cleaning. Level 2: specialized or leading hand. Level 3: specialist/high-access.
 */
const CLASSIFICATION_RULES_MA000022 = [
  { conditions: { cleaning_experience: 'new' }, level: 1, stream: 'cleaning', rationale: 'New to cleaning work — Cleaning service employee Level 1' },
  { conditions: { cleaning_experience: 'experienced', cleaning_role: 'general' }, level: 1, stream: 'cleaning', rationale: 'General cleaning duties — Cleaning service employee Level 1' },
  { conditions: { cleaning_experience: 'experienced', cleaning_role: 'specialized' }, level: 2, stream: 'cleaning', rationale: 'Specialized cleaning or leading hand — Cleaning service employee Level 2' },
  { conditions: { cleaning_experience: 'experienced', cleaning_role: 'specialist' }, level: 3, stream: 'cleaning', rationale: 'Highly specialized/high-access cleaning — Cleaning service employee Level 3' },
];

/**
 * MA000084 — Storage Services and Wholesale Award 2020
 * Two streams: storeworkers and wholesale employees (identical rates).
 * Grade 1 has 3 sub-levels based on length of employment.
 * Internal levels: 1=G1 commencement, 2=G1 3m, 3=G1 12m, 4=G2, 5=G3, 6=G4.
 * All in stream 'storeworker'.
 */
const CLASSIFICATION_RULES_MA000084 = [
  // Grade 1 — length of employment determines sub-level
  { conditions: { sw_grade: 'grade1', sw_grade1_duration: 'after_12_months' }, level: 3, stream: 'storeworker', rationale: 'Grade 1 storeworker/wholesale employee — 12 months or more' },
  { conditions: { sw_grade: 'grade1', sw_grade1_duration: 'after_3_months' },  level: 2, stream: 'storeworker', rationale: 'Grade 1 storeworker/wholesale employee — 3 to 12 months' },
  { conditions: { sw_grade: 'grade1', sw_grade1_duration: 'commencement' },    level: 1, stream: 'storeworker', rationale: 'Grade 1 storeworker/wholesale employee — commencement rate (less than 3 months)' },
  { conditions: { sw_grade: 'grade1' },                                         level: 1, stream: 'storeworker', rationale: 'Grade 1 storeworker/wholesale employee — entry level' },
  // Grade 2, 3, 4
  { conditions: { sw_grade: 'grade2' }, level: 4, stream: 'storeworker', rationale: 'Grade 2 storeworker/wholesale employee — experienced operator' },
  { conditions: { sw_grade: 'grade3' }, level: 5, stream: 'storeworker', rationale: 'Grade 3 storeworker/wholesale employee — senior, may supervise others' },
  { conditions: { sw_grade: 'grade4' }, level: 6, stream: 'storeworker', rationale: 'Grade 4 storeworker/wholesale employee — most senior classification' },
];

/**
 * MA000028 — Horticulture Award 2020
 * Classifications: Levels 1–5, all stream='horticulture'.
 * Evaluated in order; first match wins.
 */
const CLASSIFICATION_RULES_MA000028 = [
  { conditions: { hort_experience: 'entry' }, level: 1, stream: 'horticulture', rationale: 'New to horticulture — entry-level worker (Level 1)' },
  { conditions: { hort_experience: 'skilled', hort_role: 'level2' }, level: 2, stream: 'horticulture', rationale: 'Skilled field or nursery hand — 12+ months experience or Certificate I/II (Level 2)' },
  { conditions: { hort_experience: 'skilled', hort_role: 'level3' }, level: 3, stream: 'horticulture', rationale: 'Higher skilled — operates machinery, applies chemicals, or holds Cert II/III (Level 3)' },
  { conditions: { hort_experience: 'skilled', hort_role: 'level4' }, level: 4, stream: 'horticulture', rationale: 'Advanced worker — independently manages programs, may act as leading hand (Level 4)' },
  { conditions: { hort_experience: 'skilled', hort_role: 'level5' }, level: 5, stream: 'horticulture', rationale: 'Foreperson or specialist — team management or Certificate IV equivalent (Level 5)' },
];

/**
 * MA000033 — Nursery Industry Award 2020
 * Classifications: Grade 1A (L1), Grade 1B (L2), Grade 2 (L3), Grade 3 (L4),
 * Grade 4 (L5), Grade 5 (L6), Grade 6 (L7). All stream='nursery'.
 * Evaluated in order; first match wins.
 */
const CLASSIFICATION_RULES_MA000033 = [
  { conditions: { nursery_experience: 'entry' }, level: 1, stream: 'nursery', rationale: 'Grade 1A — new to the nursery industry, performing basic tasks under supervision (Level 1)' },
  { conditions: { nursery_experience: 'basic' }, level: 2, stream: 'nursery', rationale: 'Grade 1B — has basic skills, performs routine nursery tasks with some supervision (Level 2)' },
  { conditions: { nursery_experience: 'experienced', nursery_grade: 'grade2' }, level: 3, stream: 'nursery', rationale: 'Grade 2 — proficient in range of nursery tasks, works independently (Level 3)' },
  { conditions: { nursery_experience: 'experienced', nursery_grade: 'grade3' }, level: 4, stream: 'nursery', rationale: 'Grade 3 — advanced nursery skills, applies chemicals, operates equipment (Level 4)' },
  { conditions: { nursery_experience: 'experienced', nursery_grade: 'grade4' }, level: 5, stream: 'nursery', rationale: 'Grade 4 — highly skilled, may supervise others or manage programs (Level 5)' },
  { conditions: { nursery_experience: 'experienced', nursery_grade: 'grade5' }, level: 6, stream: 'nursery', rationale: 'Grade 5 — specialist or leading hand, Certificate III equivalent (Level 6)' },
  { conditions: { nursery_experience: 'experienced', nursery_grade: 'grade6' }, level: 7, stream: 'nursery', rationale: 'Grade 6 — foreperson or technical specialist, Certificate IV equivalent (Level 7)' },
];

/**
 * MA000002 — Clerks—Private Sector Award 2020
 * Two streams: clerical (levels 1–8) and call_centre (levels 1–2).
 * Levels 1–8 correspond to Award L1Y1, L1Y2, L1Y3, L2Y1, L2Y2, L3, L4, L5.
 * Call centre: level 1 = Principal Specialist, level 2 = Technical Specialist.
 */
const CLASSIFICATION_RULES_MA000002 = [
  // Regular clerical / administrative
  { conditions: { clerks_type: 'regular', clerks_level: 'l1y1' }, level: 1, stream: 'clerical', rationale: 'Clerical/Administrative Level 1 Year 1 — entry level, first year' },
  { conditions: { clerks_type: 'regular', clerks_level: 'l1y2' }, level: 2, stream: 'clerical', rationale: 'Clerical/Administrative Level 1 Year 2 — routine tasks with more confidence' },
  { conditions: { clerks_type: 'regular', clerks_level: 'l1y3' }, level: 3, stream: 'clerical', rationale: 'Clerical/Administrative Level 1 Year 3 — broadening duties or 3+ years at Level 1' },
  { conditions: { clerks_type: 'regular', clerks_level: 'l2y1' }, level: 4, stream: 'clerical', rationale: 'Clerical/Administrative Level 2 Year 1 — more complex duties with greater independence' },
  { conditions: { clerks_type: 'regular', clerks_level: 'l2y2' }, level: 5, stream: 'clerical', rationale: 'Clerical/Administrative Level 2 Year 2 — Level 2 with greater proficiency' },
  { conditions: { clerks_type: 'regular', clerks_level: 'l3'   }, level: 6, stream: 'clerical', rationale: 'Clerical/Administrative Level 3 — senior, substantial experience, may supervise others' },
  { conditions: { clerks_type: 'regular', clerks_level: 'l4'   }, level: 7, stream: 'clerical', rationale: 'Clerical/Administrative Level 4 — advanced specialist or team leader' },
  { conditions: { clerks_type: 'regular', clerks_level: 'l5'   }, level: 8, stream: 'clerical', rationale: 'Clerical/Administrative Level 5 — most senior clerical level' },
  // Call centre
  { conditions: { clerks_type: 'call_centre', clerks_cc_role: 'principal' }, level: 1, stream: 'call_centre', rationale: 'Call Centre Principal Specialist — handles escalated/complex cases, coaches others' },
  { conditions: { clerks_type: 'call_centre', clerks_cc_role: 'technical' }, level: 2, stream: 'call_centre', rationale: 'Call Centre Technical Specialist — highest technical expertise in the call centre' },
];

/**
 * MA000063 — Passenger Vehicle Transportation Award 2020
 * Single stream 'transport' with 6 grades.
 */
const CLASSIFICATION_RULES_MA000063 = [
  { conditions: { transport_grade: 'grade1' }, level: 1, stream: 'transport', rationale: 'Grade 1 — entry-level driver or basic operations role' },
  { conditions: { transport_grade: 'grade2' }, level: 2, stream: 'transport', rationale: 'Grade 2 — experienced driver or standard operations' },
  { conditions: { transport_grade: 'grade3' }, level: 3, stream: 'transport', rationale: 'Grade 3 — experienced driver with additional qualifications' },
  { conditions: { transport_grade: 'grade4' }, level: 4, stream: 'transport', rationale: 'Grade 4 — senior driver or supervisor' },
  { conditions: { transport_grade: 'grade5' }, level: 5, stream: 'transport', rationale: 'Grade 5 — fleet coordinator, trainer, or specialist' },
  { conditions: { transport_grade: 'grade6' }, level: 6, stream: 'transport', rationale: 'Grade 6 — manager or most senior classification' },
];

/**
 * MA000095 — Car Parking Award 2020
 * Single stream 'car_parking' with 3 levels.
 */
const CLASSIFICATION_RULES_MA000095 = [
  { conditions: { parking_level: 'level1' }, level: 1, stream: 'car_parking', rationale: 'Car parking officer level 1 — entry-level, basic duties under supervision' },
  { conditions: { parking_level: 'level2' }, level: 2, stream: 'car_parking', rationale: 'Car parking officer level 2 — experienced, cash handling, works independently' },
  { conditions: { parking_level: 'level3' }, level: 3, stream: 'car_parking', rationale: 'Car parking officer level 3 — senior, supervises others, manages operations' },
];

/**
 * MA000105 — Funeral Industry Award 2020
 * Single stream 'funeral' with 6 grades.
 */
const CLASSIFICATION_RULES_MA000105 = [
  { conditions: { funeral_experience: 'entry' }, level: 1, stream: 'funeral', rationale: 'Grade 1 — entry-level, general duties, cleaning, assisting with funerals' },
  { conditions: { funeral_experience: 'experienced', funeral_grade: 'grade2' }, level: 2, stream: 'funeral', rationale: 'Grade 2 — assists with embalming, coffin handling, mortuary duties' },
  { conditions: { funeral_experience: 'experienced', funeral_grade: 'grade3' }, level: 3, stream: 'funeral', rationale: 'Grade 3 — conducts viewings, drives hearse, arranges tributes' },
  { conditions: { funeral_experience: 'experienced', funeral_grade: 'grade4' }, level: 4, stream: 'funeral', rationale: 'Grade 4 — conducts funerals, oversees arrangements' },
  { conditions: { funeral_experience: 'experienced', funeral_grade: 'grade5' }, level: 5, stream: 'funeral', rationale: 'Grade 5 — funeral director, embalmer, senior arranger' },
  { conditions: { funeral_experience: 'experienced', funeral_grade: 'grade6' }, level: 6, stream: 'funeral', rationale: 'Grade 6 — funeral home manager, senior funeral director' },
];

/**
 * MA000101 — Gardening and Landscaping Services Award 2020
 * Single stream 'landscaping' with Intro (0) + Levels 1-5.
 */
const CLASSIFICATION_RULES_MA000101 = [
  { conditions: { land_experience: 'entry' }, level: 0, stream: 'landscaping', rationale: 'Introductory level — new to gardening/landscaping, first 3 months' },
  { conditions: { land_experience: 'basic' }, level: 1, stream: 'landscaping', rationale: 'Level 1 — basic gardening tasks, general labouring under supervision' },
  { conditions: { land_experience: 'skilled', land_role: 'level2' }, level: 2, stream: 'landscaping', rationale: 'Level 2 — experienced, operates equipment, Cert II or 12+ months' },
  { conditions: { land_experience: 'skilled', land_role: 'level3' }, level: 3, stream: 'landscaping', rationale: 'Level 3 — skilled, independent work, landscape construction, Cert III' },
  { conditions: { land_experience: 'skilled', land_role: 'level4' }, level: 4, stream: 'landscaping', rationale: 'Level 4 — tradesperson, manages projects, may supervise' },
  { conditions: { land_experience: 'skilled', land_role: 'level5' }, level: 5, stream: 'landscaping', rationale: 'Level 5 — senior supervisor, specialist, Cert IV or equivalent' },
];

/**
 * MA000030 — Market and Social Research Award 2020
 * Single stream 'research' with 12 levels covering distinct roles.
 * Evaluated in order; first match wins.
 */
const CLASSIFICATION_RULES_MA000030 = [
  { conditions: { research_role_type: 'trainee' }, level: 1, stream: 'research', rationale: 'Market research trainee — learning basic research tasks (Level 1)' },
  { conditions: { research_role_type: 'support', research_support_year: 'first_year' }, level: 2, stream: 'research', rationale: 'Support employee — first year in this classification (Level 2)' },
  { conditions: { research_role_type: 'support', research_support_year: 'thereafter' }, level: 3, stream: 'research', rationale: 'Support employee — one or more years in this classification (Level 3)' },
  { conditions: { research_role_type: 'interviewer', research_interview_type: 'phone' }, level: 4, stream: 'research', rationale: 'Market research interviewer — telephone or online interviewing (Level 4)' },
  { conditions: { research_role_type: 'interviewer', research_interview_type: 'face_to_face' }, level: 5, stream: 'research', rationale: 'Executive (face-to-face) interviewer / door-to-door interviewer (Level 5)' },
  { conditions: { research_role_type: 'editor_coder' }, level: 6, stream: 'research', rationale: 'Editor / Coder / Keyboard operator — data editing and coding (Level 6)' },
  { conditions: { research_role_type: 'leadership', research_leader_role: 'team_leader' }, level: 7, stream: 'research', rationale: 'Team leader — supervises interviewers or support staff (Level 7)' },
  { conditions: { research_role_type: 'leadership', research_leader_role: 'field_supervisor' }, level: 8, stream: 'research', rationale: 'Field supervisor — manages field interviewing operations (Level 8)' },
  { conditions: { research_role_type: 'leadership', research_leader_role: 'field_manager' }, level: 10, stream: 'research', rationale: 'Field manager — manages all field operations (Level 10)' },
  { conditions: { research_role_type: 'research_pro', research_pro_role: 'assistant' }, level: 9, stream: 'research', rationale: 'Research assistant — assists with research design and analysis (Level 9)' },
  { conditions: { research_role_type: 'research_pro', research_pro_role: 'officer' }, level: 11, stream: 'research', rationale: 'Research officer — independently manages research projects (Level 11)' },
  { conditions: { research_role_type: 'research_pro', research_pro_role: 'manager' }, level: 12, stream: 'research', rationale: 'Research manager — manages a research team or department (Level 12)' },
];

/**
 * Check if a set of answers matches a rule's conditions.
 * Conditions values can be a single string or array (matches any of those values).
 */
function matchesRule(answers, conditions) {
  for (const [key, expected] of Object.entries(conditions)) {
    const actual = answers[key];
    if (!actual) return false;
    if (Array.isArray(expected)) {
      if (!expected.includes(actual)) return false;
    } else {
      if (actual !== expected) return false;
    }
  }
  return true;
}

/**
 * Classify the worker based on their questionnaire answers.
 * Returns the best matching classification.
 */
function classify(answers, awardCode = 'MA000009') {
  if (awardCode === 'MA000022') {
    for (const rule of CLASSIFICATION_RULES_MA000022) {
      if (matchesRule(answers, rule.conditions)) {
        return { level: rule.level, stream: rule.stream, rationale: rule.rationale, confidence: 'high' };
      }
    }
    return { level: 1, stream: 'cleaning', rationale: 'Unable to determine classification — defaulting to Level 1. Please review.', confidence: 'low' };
  }

  if (awardCode === 'MA000003') {
    for (const rule of CLASSIFICATION_RULES_MA000003) {
      if (matchesRule(answers, rule.conditions)) {
        return { level: rule.level, stream: rule.stream, rationale: rule.rationale, confidence: 'high' };
      }
    }
    return { level: 1, stream: 'general', rationale: 'Unable to determine level — defaulting to entry level. Please review.', confidence: 'low' };
  }

  if (awardCode === 'MA000119') {
    for (const rule of CLASSIFICATION_RULES_MA000119) {
      if (matchesRule(answers, rule.conditions)) {
        return { level: rule.level, stream: rule.stream, rationale: rule.rationale, confidence: 'high' };
      }
    }
    return { level: 1, stream: 'food_beverage', rationale: 'Unable to determine level — defaulting to entry level. Please review.', confidence: 'low' };
  }

  if (awardCode === 'MA000004') {
    for (const rule of CLASSIFICATION_RULES_MA000004) {
      if (matchesRule(answers, rule.conditions)) {
        return { level: rule.level, stream: rule.stream, rationale: rule.rationale, confidence: 'high' };
      }
    }
    return { level: 1, stream: 'retail', rationale: 'Unable to determine level — defaulting to entry level. Please review.', confidence: 'low' };
  }

  if (awardCode === 'MA000094') {
    for (const rule of CLASSIFICATION_RULES_MA000094) {
      if (matchesRule(answers, rule.conditions)) {
        return { level: rule.level, stream: rule.stream, rationale: rule.rationale, confidence: 'high' };
      }
    }
    return { level: 1, stream: 'fitness', rationale: 'Unable to determine level — defaulting to entry level. Please review.', confidence: 'low' };
  }

  if (awardCode === 'MA000080') {
    for (const rule of CLASSIFICATION_RULES_MA000080) {
      if (matchesRule(answers, rule.conditions)) {
        return { level: rule.level, stream: rule.stream, rationale: rule.rationale, confidence: 'high' };
      }
    }
    return { level: 1, stream: 'general', rationale: 'Unable to determine level — defaulting to Grade 1. Please review.', confidence: 'low' };
  }

  if (awardCode === 'MA000084') {
    for (const rule of CLASSIFICATION_RULES_MA000084) {
      if (matchesRule(answers, rule.conditions)) {
        return { level: rule.level, stream: rule.stream, rationale: rule.rationale, confidence: 'high' };
      }
    }
    return { level: 1, stream: 'storeworker', rationale: 'Unable to determine classification — defaulting to Grade 1 commencement. Please review.', confidence: 'low' };
  }

  if (awardCode === 'MA000081') {
    for (const rule of CLASSIFICATION_RULES_MA000081) {
      if (matchesRule(answers, rule.conditions)) {
        if (rule.level === null) {
          return { level: null, stream: null, rationale: rule.rationale, confidence: 'low' };
        }
        return { level: rule.level, stream: rule.stream, rationale: rule.rationale, confidence: 'high' };
      }
    }
    return { level: 1, stream: 'general', rationale: 'Unable to determine classification — defaulting to Level 1 production & support. Please review.', confidence: 'low' };
  }

  if (awardCode === 'MA000028') {
    for (const rule of CLASSIFICATION_RULES_MA000028) {
      if (matchesRule(answers, rule.conditions)) {
        return { level: rule.level, stream: rule.stream, rationale: rule.rationale, confidence: 'high' };
      }
    }
    return { level: 1, stream: 'horticulture', rationale: 'Unable to determine classification — defaulting to Level 1. Please review.', confidence: 'low' };
  }

  if (awardCode === 'MA000033') {
    for (const rule of CLASSIFICATION_RULES_MA000033) {
      if (matchesRule(answers, rule.conditions)) {
        return { level: rule.level, stream: rule.stream, rationale: rule.rationale, confidence: 'high' };
      }
    }
    return { level: 1, stream: 'nursery', rationale: 'Unable to determine classification — defaulting to Grade 1A. Please review.', confidence: 'low' };
  }

  if (awardCode === 'MA000002') {
    for (const rule of CLASSIFICATION_RULES_MA000002) {
      if (matchesRule(answers, rule.conditions)) {
        return { level: rule.level, stream: rule.stream, rationale: rule.rationale, confidence: 'high' };
      }
    }
    return { level: 1, stream: 'clerical', rationale: 'Unable to determine classification — defaulting to Level 1 Year 1. Please review.', confidence: 'low' };
  }

  if (awardCode === 'MA000013') {
    // Liquor employees
    if (answers.race_worker_type === 'liquor') {
      const isJunior = answers.race_liquor_age === 'junior';
      return {
        level: isJunior ? 2 : 1,
        stream: 'liquor',
        rationale: isJunior
          ? 'Junior glass collector (under 19) — casual all-in rate'
          : 'Adult bar attendant, cashier or glass collector — casual all-in rate',
        confidence: 'high',
      };
    }
    // Raceday officials
    if (answers.race_dept === 'official' && answers.race_ro_grade) {
      const level = { grade1: 1, grade2: 2, grade3: 3, grade4: 4 }[answers.race_ro_grade];
      const labels = { 1: 'Grade 1 Raceday Official', 2: 'Grade 2 Raceday Official', 3: 'Grade 3 Raceday Official', 4: 'Grade 4 Raceday Official' };
      if (level) return { level, stream: 'official', rationale: labels[level], confidence: 'high' };
    }
    // Racecourse attendants
    if (answers.race_ra_grade) {
      const level = { introductory: 0, grade1: 1, grade2: 2, grade3: 3, grade4: 4 }[answers.race_ra_grade];
      const labels = { 0: 'Introductory Level Employee', 1: 'Grade 1 Racecourse Attendant', 2: 'Grade 2 Racecourse Attendant', 3: 'Grade 3 Racecourse Attendant', 4: 'Grade 4 Racecourse Attendant' };
      if (level !== undefined) return { level, stream: 'racecourse', rationale: labels[level], confidence: 'high' };
    }
    return { level: 0, stream: 'racecourse', rationale: 'Unable to determine classification — defaulting to Introductory level. Please review.', confidence: 'low' };
  }

  if (awardCode === 'MA000030') {
    for (const rule of CLASSIFICATION_RULES_MA000030) {
      if (matchesRule(answers, rule.conditions)) {
        return { level: rule.level, stream: rule.stream, rationale: rule.rationale, confidence: 'high' };
      }
    }
    return { level: 1, stream: 'research', rationale: 'Unable to determine classification — defaulting to Market Research Trainee. Please review.', confidence: 'low' };
  }

  if (awardCode === 'MA000063') {
    for (const rule of CLASSIFICATION_RULES_MA000063) {
      if (matchesRule(answers, rule.conditions)) {
        return { level: rule.level, stream: rule.stream, rationale: rule.rationale, confidence: 'high' };
      }
    }
    return { level: 1, stream: 'transport', rationale: 'Unable to determine classification — defaulting to Grade 1. Please review.', confidence: 'low' };
  }

  if (awardCode === 'MA000095') {
    for (const rule of CLASSIFICATION_RULES_MA000095) {
      if (matchesRule(answers, rule.conditions)) {
        return { level: rule.level, stream: rule.stream, rationale: rule.rationale, confidence: 'high' };
      }
    }
    return { level: 1, stream: 'car_parking', rationale: 'Unable to determine classification — defaulting to Level 1. Please review.', confidence: 'low' };
  }

  if (awardCode === 'MA000105') {
    for (const rule of CLASSIFICATION_RULES_MA000105) {
      if (matchesRule(answers, rule.conditions)) {
        return { level: rule.level, stream: rule.stream, rationale: rule.rationale, confidence: 'high' };
      }
    }
    return { level: 1, stream: 'funeral', rationale: 'Unable to determine classification — defaulting to Grade 1. Please review.', confidence: 'low' };
  }

  if (awardCode === 'MA000101') {
    for (const rule of CLASSIFICATION_RULES_MA000101) {
      if (matchesRule(answers, rule.conditions)) {
        return { level: rule.level, stream: rule.stream, rationale: rule.rationale, confidence: 'high' };
      }
    }
    return { level: 0, stream: 'landscaping', rationale: 'Unable to determine classification — defaulting to Introductory level. Please review.', confidence: 'low' };
  }

  if (awardCode === 'MA000104') {
    // MA000104 — Miscellaneous Award 2020
    // Simple single-question dispatch: misc_level maps directly to level 1–4.
    const level = { l1: 1, l2: 2, l3: 3, l4: 4 }[answers.misc_level];
    if (level) {
      const rationales = {
        l1: 'Employed less than 3 months, no trade qualifications required (Level 1)',
        l2: 'Employed 3 months or more, no trade qualifications required (Level 2)',
        l3: 'Trade qualified, carrying out duties requiring that qualification (Level 3)',
        l4: 'Advanced trade qualifications or sub-professional role (Level 4)',
      };
      return { level, stream: 'general', rationale: rationales[answers.misc_level], confidence: 'high' };
    }
    return { level: 1, stream: 'general', rationale: 'Unable to determine classification — defaulting to Level 1. Please review.', confidence: 'low' };
  }

  // MA000009 (and default)
  const stream = answers.stream;
  if (!stream) {
    return {
      level: null,
      stream: null,
      rationale: null,
      confidence: 'low',
      error: 'No stream selected',
    };
  }

  for (const rule of CLASSIFICATION_RULES_MA000009) {
    if (rule.stream !== stream) continue;
    if (matchesRule(answers, rule.conditions)) {
      return {
        level: rule.level,
        stream: rule.stream,
        rationale: rule.rationale,
        confidence: 'high',
      };
    }
  }

  // Fallback — if no rule matched, go to level 1 for the stream
  return {
    level: 1,
    stream,
    rationale: 'Unable to determine level — defaulting to entry level. Please review.',
    confidence: 'low',
  };
}

/**
 * Full classification lookup — enriches with DB data
 */
async function classifyAndFetch(answers, db, employmentType = 'full_time', awardCode = 'MA000009') {
  const result = classify(answers, awardCode);
  if (!result.level) return result;

  // Fetch rate for the actual employment type requested
  const fetchRate = async (stream) => db.query(`
    SELECT c.*, pr.rate_amount as base_rate, pr.effective_date as rate_effective_date
    FROM classifications c
    LEFT JOIN pay_rates pr ON pr.classification_id = c.id
      AND pr.employment_type = $4
      AND pr.rate_type = 'base_hourly'
    WHERE c.award_code = $1 AND c.level = $2 AND c.stream = $3
    ORDER BY pr.effective_date DESC
    LIMIT 1
  `, [awardCode, result.level, stream, employmentType]);

  let classRow = await fetchRate(result.stream);

  if (!classRow.rows.length) {
    classRow = await fetchRate('general');
  }

  return {
    ...result,
    employmentType,
    classification: classRow.rows[0] || null,
  };
}

module.exports = { classify, classifyAndFetch };
