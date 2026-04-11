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
 * MA000091 — Broadcasting, Recorded Entertainment and Cinemas Award 2020
 * Five streams: cinema (L1–7), tv_broadcasting (L1–13), radio (L1–6),
 * motion_picture (L1–10), journalist (L1–11).
 * Evaluated in order; first match wins.
 */
const CLASSIFICATION_RULES_MA000091 = [
  // ── Cinema stream ──────────────────────────────────────────────────────────
  { conditions: { sector: 'cinema', cinema_role: 'entry' },       level: 1, stream: 'cinema', rationale: 'Cinema Worker Level 1 — entry-level cinema employee' },
  { conditions: { sector: 'cinema', cinema_role: 'experienced' }, level: 2, stream: 'cinema', rationale: 'Cinema Worker Level 2 — experienced cinema employee' },
  { conditions: { sector: 'cinema', cinema_role: 'specialist' },  level: 3, stream: 'cinema', rationale: 'Cinema Worker Level 3 — specialist cinema employee' },
  { conditions: { sector: 'cinema', cinema_role: 'senior' },      level: 4, stream: 'cinema', rationale: 'Cinema Worker Level 4 — senior cinema employee' },
  { conditions: { sector: 'cinema', cinema_role: 'supervisor' },  level: 5, stream: 'cinema', rationale: 'Cinema Worker Level 5 — cinema supervisor' },
  { conditions: { sector: 'cinema', cinema_role: 'senior_supervisor' }, level: 6, stream: 'cinema', rationale: 'Cinema Worker Level 6 — senior cinema supervisor' },
  { conditions: { sector: 'cinema', cinema_role: 'manager' },     level: 7, stream: 'cinema', rationale: 'Cinema Worker Level 7 — cinema manager' },

  // ── TV Broadcasting stream ─────────────────────────────────────────────────
  { conditions: { sector: 'tv_broadcasting', tv_role: 'trainee' },          level: 1,  stream: 'tv_broadcasting', rationale: 'TV Broadcasting Level 1 — trainee' },
  { conditions: { sector: 'tv_broadcasting', tv_role: 'operator_b' },       level: 2,  stream: 'tv_broadcasting', rationale: 'TV Broadcasting Level 2 — Operator Grade B' },
  { conditions: { sector: 'tv_broadcasting', tv_role: 'operator_bplus' },   level: 3,  stream: 'tv_broadcasting', rationale: 'TV Broadcasting Level 3 — Operator Grade B+' },
  { conditions: { sector: 'tv_broadcasting', tv_role: 'operator_a' },       level: 4,  stream: 'tv_broadcasting', rationale: 'TV Broadcasting Level 4 — Operator Grade A' },
  { conditions: { sector: 'tv_broadcasting', tv_role: 'operator_aplus' },   level: 5,  stream: 'tv_broadcasting', rationale: 'TV Broadcasting Level 5 — Operator Grade A+' },
  { conditions: { sector: 'tv_broadcasting', tv_role: 'senior_b' },         level: 6,  stream: 'tv_broadcasting', rationale: 'TV Broadcasting Level 6 — Senior Operator Grade B' },
  { conditions: { sector: 'tv_broadcasting', tv_role: 'coordinator' },      level: 7,  stream: 'tv_broadcasting', rationale: 'TV Broadcasting Level 7 — Coordinator' },
  { conditions: { sector: 'tv_broadcasting', tv_role: 'senior_a' },         level: 8,  stream: 'tv_broadcasting', rationale: 'TV Broadcasting Level 8 — Senior Operator Grade A' },
  { conditions: { sector: 'tv_broadcasting', tv_role: 'senior_director' },  level: 9,  stream: 'tv_broadcasting', rationale: 'TV Broadcasting Level 9 — Senior Director' },
  { conditions: { sector: 'tv_broadcasting', tv_role: 'dept_supervisor' },  level: 10, stream: 'tv_broadcasting', rationale: 'TV Broadcasting Level 10 — Department Supervisor' },
  { conditions: { sector: 'tv_broadcasting', tv_role: 'senior_supervisor' },level: 11, stream: 'tv_broadcasting', rationale: 'TV Broadcasting Level 11 — Senior Supervisor' },
  { conditions: { sector: 'tv_broadcasting', tv_role: 'specialist' },       level: 12, stream: 'tv_broadcasting', rationale: 'TV Broadcasting Level 12 — Specialist' },
  { conditions: { sector: 'tv_broadcasting', tv_role: 'chief' },            level: 13, stream: 'tv_broadcasting', rationale: 'TV Broadcasting Level 13 — Chief' },

  // ── Radio stream ───────────────────────────────────────────────────────────
  { conditions: { sector: 'radio', radio_role: 'broadcasting_operator' }, level: 1, stream: 'radio', rationale: 'Radio Level 1 — Broadcasting Operator' },
  { conditions: { sector: 'radio', radio_role: 'technician' },           level: 2, stream: 'radio', rationale: 'Radio Level 2 — Technician' },
  { conditions: { sector: 'radio', radio_role: 'announcer_2' },          level: 3, stream: 'radio', rationale: 'Radio Level 3 — Announcer Grade 2' },
  { conditions: { sector: 'radio', radio_role: 'announcer_1' },          level: 4, stream: 'radio', rationale: 'Radio Level 4 — Announcer Grade 1' },
  { conditions: { sector: 'radio', radio_role: 'engineer' },             level: 5, stream: 'radio', rationale: 'Radio Level 5 — Engineer' },
  { conditions: { sector: 'radio', radio_role: 'chief_engineer' },       level: 6, stream: 'radio', rationale: 'Radio Level 6 — Chief Engineer' },

  // ── Motion Picture stream ──────────────────────────────────────────────────
  { conditions: { sector: 'motion_picture', mp_role: 'level_1' },  level: 1,  stream: 'motion_picture', rationale: 'Motion Picture Production Level 1' },
  { conditions: { sector: 'motion_picture', mp_role: 'level_2' },  level: 2,  stream: 'motion_picture', rationale: 'Motion Picture Production Level 2' },
  { conditions: { sector: 'motion_picture', mp_role: 'level_3' },  level: 3,  stream: 'motion_picture', rationale: 'Motion Picture Production Level 3' },
  { conditions: { sector: 'motion_picture', mp_role: 'level_4' },  level: 4,  stream: 'motion_picture', rationale: 'Motion Picture Production Level 4' },
  { conditions: { sector: 'motion_picture', mp_role: 'level_5' },  level: 5,  stream: 'motion_picture', rationale: 'Motion Picture Production Level 5' },
  { conditions: { sector: 'motion_picture', mp_role: 'level_6' },  level: 6,  stream: 'motion_picture', rationale: 'Motion Picture Production Level 6' },
  { conditions: { sector: 'motion_picture', mp_role: 'level_7' },  level: 7,  stream: 'motion_picture', rationale: 'Motion Picture Production Level 7' },
  { conditions: { sector: 'motion_picture', mp_role: 'level_8' },  level: 8,  stream: 'motion_picture', rationale: 'Motion Picture Production Level 8' },
  { conditions: { sector: 'motion_picture', mp_role: 'level_9' },  level: 9,  stream: 'motion_picture', rationale: 'Motion Picture Production Level 9' },
  { conditions: { sector: 'motion_picture', mp_role: 'level_10' }, level: 10, stream: 'motion_picture', rationale: 'Motion Picture Production Level 10' },

  // ── Journalist stream ──────────────────────────────────────────────────────
  { conditions: { sector: 'journalist', journalist_role: 'cadet_1' }, level: 1,  stream: 'journalist', rationale: 'Journalist Cadet Year 1' },
  { conditions: { sector: 'journalist', journalist_role: 'cadet_2' }, level: 2,  stream: 'journalist', rationale: 'Journalist Cadet Year 2' },
  { conditions: { sector: 'journalist', journalist_role: 'cadet_3' }, level: 3,  stream: 'journalist', rationale: 'Journalist Cadet Year 3' },
  { conditions: { sector: 'journalist', journalist_role: 'grade_1' }, level: 4,  stream: 'journalist', rationale: 'Journalist Grade 1' },
  { conditions: { sector: 'journalist', journalist_role: 'grade_2' }, level: 5,  stream: 'journalist', rationale: 'Journalist Grade 2' },
  { conditions: { sector: 'journalist', journalist_role: 'grade_3' }, level: 6,  stream: 'journalist', rationale: 'Journalist Grade 3' },
  { conditions: { sector: 'journalist', journalist_role: 'grade_4' }, level: 7,  stream: 'journalist', rationale: 'Journalist Grade 4' },
  { conditions: { sector: 'journalist', journalist_role: 'grade_5' }, level: 8,  stream: 'journalist', rationale: 'Journalist Grade 5' },
  { conditions: { sector: 'journalist', journalist_role: 'grade_6' }, level: 9,  stream: 'journalist', rationale: 'Journalist Grade 6' },
  { conditions: { sector: 'journalist', journalist_role: 'grade_7' }, level: 10, stream: 'journalist', rationale: 'Journalist Grade 7' },
  { conditions: { sector: 'journalist', journalist_role: 'grade_8' }, level: 11, stream: 'journalist', rationale: 'Journalist Grade 8' },
];

/**
 * MA000106 — Real Estate Industry Award 2020
 * Single stream 'real_estate' with 5 levels.
 * Evaluated in order; first match wins.
 */
/**
 * MA000079 — Architects Award 2020
 * Four streams: student (6 levels), graduate (4 levels), registered (3 levels), bachelor_pathway (3 levels).
 * Evaluated in order; first match wins.
 */
const CLASSIFICATION_RULES_MA000079 = [
  // ── Student stream ──────────────────────────────────────────────────────────
  { conditions: { arch_stream: 'student', student_age: 'yes' }, level: 6, stream: 'student', rationale: 'Student of architecture — 21 years and over (Level 6)' },
  { conditions: { arch_stream: 'student', student_age: 'no', student_experience: 'first_13weeks' }, level: 1, stream: 'student', rationale: 'Student of architecture — under 21, first 13 weeks (Level 1)' },
  { conditions: { arch_stream: 'student', student_age: 'no', student_experience: 'weeks_14_26' }, level: 2, stream: 'student', rationale: 'Student of architecture — under 21, 14–26 weeks (Level 2)' },
  { conditions: { arch_stream: 'student', student_age: 'no', student_experience: 'weeks_27_52' }, level: 3, stream: 'student', rationale: 'Student of architecture — under 21, 27–52 weeks (Level 3)' },
  { conditions: { arch_stream: 'student', student_age: 'no', student_experience: 'year_2' }, level: 4, stream: 'student', rationale: 'Student of architecture — under 21, 2nd year (Level 4)' },
  { conditions: { arch_stream: 'student', student_age: 'no', student_experience: 'year_3' }, level: 5, stream: 'student', rationale: 'Student of architecture — under 21, 3rd year (Level 5)' },
  { conditions: { arch_stream: 'student' }, level: 1, stream: 'student', rationale: 'Student of architecture — default entry level (Level 1)' },
  // ── Graduate stream ─────────────────────────────────────────────────────────
  { conditions: { arch_stream: 'graduate', graduate_level: 'entry' }, level: 1, stream: 'graduate', rationale: 'Graduate of architecture — entry level (Level 1)' },
  { conditions: { arch_stream: 'graduate', graduate_level: 'pay_point_1' }, level: 2, stream: 'graduate', rationale: 'Graduate of architecture — 1st pay point (Level 2)' },
  { conditions: { arch_stream: 'graduate', graduate_level: 'pay_point_2' }, level: 3, stream: 'graduate', rationale: 'Graduate of architecture — 2nd pay point (Level 3)' },
  { conditions: { arch_stream: 'graduate', graduate_level: 'experienced' }, level: 4, stream: 'graduate', rationale: 'Experienced graduate of architecture — Level 2a (Level 4)' },
  // ── Registered stream ───────────────────────────────────────────────────────
  { conditions: { arch_stream: 'registered', registered_level: 'entry' }, level: 1, stream: 'registered', rationale: 'Registered architect — entry level (Level 1)' },
  { conditions: { arch_stream: 'registered', registered_level: 'pay_point_1' }, level: 2, stream: 'registered', rationale: 'Registered architect — 1st pay point (Level 2)' },
  { conditions: { arch_stream: 'registered', registered_level: 'pay_point_2' }, level: 3, stream: 'registered', rationale: 'Registered architect — 2nd pay point (Level 3)' },
  // ── Bachelor pathway stream ─────────────────────────────────────────────────
  { conditions: { arch_stream: 'bachelor_pathway', bachelor_year: 'year_1' }, level: 1, stream: 'bachelor_pathway', rationale: 'Bachelor pathway — 1st year (Level 1)' },
  { conditions: { arch_stream: 'bachelor_pathway', bachelor_year: 'year_2' }, level: 2, stream: 'bachelor_pathway', rationale: 'Bachelor pathway — 2nd year (Level 2)' },
  { conditions: { arch_stream: 'bachelor_pathway', bachelor_year: 'year_3' }, level: 3, stream: 'bachelor_pathway', rationale: 'Bachelor pathway — 3rd year (Level 3)' },
];

const CLASSIFICATION_RULES_MA000106 = [
  { conditions: { re_level: 'associate_first12' }, level: 1, stream: 'real_estate', rationale: 'Associate level — first 12 months at this level (Level 1)' },
  { conditions: { re_level: 'associate_after12' }, level: 2, stream: 'real_estate', rationale: 'Associate level — after first 12 months (Level 2)' },
  { conditions: { re_level: 'representative' }, level: 3, stream: 'real_estate', rationale: 'Representative level — sales agent, property manager, or similar (Level 3)' },
  { conditions: { re_level: 'supervisory' }, level: 4, stream: 'real_estate', rationale: 'Supervisory level — senior agent, team leader (Level 4)' },
  { conditions: { re_level: 'in_charge' }, level: 5, stream: 'real_estate', rationale: 'In-charge level — office manager, principal (Level 5)' },
];

/**
 * MA000016 — Security Services Industry Award 2020
 * Single stream 'security' with 5 levels.
 */
const CLASSIFICATION_RULES_MA000016 = [
  { conditions: { security_level: 'level_1' }, level: 1, stream: 'security', rationale: 'Security Officer Level 1 — entry-level security officer' },
  { conditions: { security_level: 'level_2' }, level: 2, stream: 'security', rationale: 'Security Officer Level 2 — experienced officer (12+ months or additional certifications)' },
  { conditions: { security_level: 'level_3' }, level: 3, stream: 'security', rationale: 'Security Officer Level 3 — senior officer (systems operation, post management)' },
  { conditions: { security_level: 'level_4' }, level: 4, stream: 'security', rationale: 'Security Officer Level 4 — leading officer (team oversight, shift management)' },
  { conditions: { security_level: 'level_5' }, level: 5, stream: 'security', rationale: 'Security Officer Level 5 — supervisor/controller (site or multi-site operations)' },
];

const CLASSIFICATION_RULES_MA000042 = [
  { conditions: { cit_role: 'escort' }, level: 1, stream: 'cash_in_transit', rationale: 'Level 1 — Escort: entry-level security escort for cash-in-transit operations' },
  { conditions: { cit_role: 'soft_skin' }, level: 2, stream: 'cash_in_transit', rationale: 'Level 2 — Non-armoured (soft skin) vehicle operator' },
  { conditions: { cit_role: 'armoured' }, level: 3, stream: 'cash_in_transit', rationale: 'Level 3 — Armoured vehicle operator' },
  { conditions: { cit_role: 'crew_leader' }, level: 4, stream: 'cash_in_transit', rationale: 'Level 4 — Crew leader: leads cash-in-transit crew and coordinates operations' },
];

const CLASSIFICATION_RULES_MA000032 = [
  { conditions: { crane_level: 'mce1' }, level: 1, stream: 'mobile_crane', rationale: 'MCE1 — Mobile crane employee level 1' },
  { conditions: { crane_level: 'mce2' }, level: 2, stream: 'mobile_crane', rationale: 'MCE2 — Mobile crane employee level 2' },
  { conditions: { crane_level: 'mce3' }, level: 3, stream: 'mobile_crane', rationale: 'MCE3 — Mobile crane employee level 3' },
  { conditions: { crane_level: 'mce4' }, level: 4, stream: 'mobile_crane', rationale: 'MCE4 — Mobile crane employee level 4' },
  { conditions: { crane_level: 'mce5' }, level: 5, stream: 'mobile_crane', rationale: 'MCE5 — Mobile crane employee level 5' },
  { conditions: { crane_level: 'mce6' }, level: 6, stream: 'mobile_crane', rationale: 'MCE6 — Mobile crane employee level 6' },
  { conditions: { crane_level: 'mce7' }, level: 7, stream: 'mobile_crane', rationale: 'MCE7 — Mobile crane employee level 7' },
];

const CLASSIFICATION_RULES_MA000103 = [
  { conditions: { ses_grade: 'grade_1' }, level: 1, stream: 'supported_employment', rationale: 'Grade 1 — Entry-level supported employment services' },
  { conditions: { ses_grade: 'grade_2' }, level: 2, stream: 'supported_employment', rationale: 'Grade 2 — Supported employment with developing skills' },
  { conditions: { ses_grade: 'grade_3' }, level: 3, stream: 'supported_employment', rationale: 'Grade 3 — Competent supported employment services' },
  { conditions: { ses_grade: 'grade_4' }, level: 4, stream: 'supported_employment', rationale: 'Grade 4 — Experienced supported employment services' },
  { conditions: { ses_grade: 'grade_5' }, level: 5, stream: 'supported_employment', rationale: 'Grade 5 — Senior supported employment services' },
  { conditions: { ses_grade: 'grade_6' }, level: 6, stream: 'supported_employment', rationale: 'Grade 6 — Advanced supported employment services' },
  { conditions: { ses_grade: 'grade_7' }, level: 7, stream: 'supported_employment', rationale: 'Grade 7 — Highest-level supported employment services' },
  { conditions: { ses_grade: 'grade_a' }, level: 8, stream: 'supported_employment', rationale: 'Grade A — Transitional supported wage classification' },
  { conditions: { ses_grade: 'grade_b' }, level: 9, stream: 'supported_employment', rationale: 'Grade B — Transitional supported wage classification' },
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

  if (awardCode === 'MA000091') {
    for (const rule of CLASSIFICATION_RULES_MA000091) {
      if (matchesRule(answers, rule.conditions)) {
        return { level: rule.level, stream: rule.stream, rationale: rule.rationale, confidence: 'high' };
      }
    }
    return { level: 1, stream: 'cinema', rationale: 'Default — Cinema Worker Level 1', confidence: 'low' };
  }

  if (awardCode === 'MA000079') {
    for (const rule of CLASSIFICATION_RULES_MA000079) {
      if (matchesRule(answers, rule.conditions)) {
        return { level: rule.level, stream: rule.stream, rationale: rule.rationale, confidence: 'high' };
      }
    }
    return { level: 1, stream: 'graduate', rationale: 'Unable to determine classification — defaulting to Graduate Level 1. Please review.', confidence: 'low' };
  }

  if (awardCode === 'MA000106') {
    for (const rule of CLASSIFICATION_RULES_MA000106) {
      if (matchesRule(answers, rule.conditions)) {
        return { level: rule.level, stream: rule.stream, rationale: rule.rationale, confidence: 'high' };
      }
    }
    return { level: 1, stream: 'real_estate', rationale: 'Unable to determine classification — defaulting to Level 1. Please review.', confidence: 'low' };
  }

  if (awardCode === 'MA000016') {
    for (const rule of CLASSIFICATION_RULES_MA000016) {
      if (matchesRule(answers, rule.conditions)) {
        return { level: rule.level, stream: rule.stream, rationale: rule.rationale, confidence: 'high' };
      }
    }
    return { level: 1, stream: 'security', rationale: 'Unable to determine classification — defaulting to Level 1. Please review.', confidence: 'low' };
  }

  if (awardCode === 'MA000042') {
    for (const rule of CLASSIFICATION_RULES_MA000042) {
      if (matchesRule(answers, rule.conditions)) {
        return { level: rule.level, stream: rule.stream, rationale: rule.rationale, confidence: 'high' };
      }
    }
    return { level: 1, stream: 'cash_in_transit', rationale: 'Unable to determine classification — defaulting to Level 1. Please review.', confidence: 'low' };
  }

  if (awardCode === 'MA000032') {
    for (const rule of CLASSIFICATION_RULES_MA000032) {
      if (matchesRule(answers, rule.conditions)) {
        return { level: rule.level, stream: rule.stream, rationale: rule.rationale, confidence: 'high' };
      }
    }
    return { level: 1, stream: 'mobile_crane', rationale: 'Unable to determine classification — defaulting to MCE1. Please review.', confidence: 'low' };
  }

  if (awardCode === 'MA000103') {
    for (const rule of CLASSIFICATION_RULES_MA000103) {
      if (matchesRule(answers, rule.conditions)) {
        return { level: rule.level, stream: rule.stream, rationale: rule.rationale, confidence: 'high' };
      }
    }
    return { level: 1, stream: 'supported_employment', rationale: 'Unable to determine classification — defaulting to Grade 1. Please review.', confidence: 'low' };
  }

  if (awardCode === 'MA000092') {
    // MA000092 — Alpine Resorts Award 2020
    // Two-branch dispatch: resort_worker or snowsports instructor.
    if (answers.alpine_role === 'resort_worker') {
      const level = { training: 1, l1: 2, l2: 3, l3: 4, l4: 5, l5: 6, l6: 7, l7: 8 }[answers.alpine_worker_level];
      if (level) {
        const rationales = {
          training: 'Training level — undergoing induction or training (max 7 weeks)',
          l1: 'Resort Worker Level 1 — entry-level, no experience required',
          l2: 'Resort Worker Level 2 — some experience or qualifications',
          l3: 'Resort Worker Level 3 — significant experience or specialist training',
          l4: 'Resort Worker Level 4 — specialist skills and qualifications',
          l5: 'Resort Worker Level 5 — supervisor/trainer of lower-level staff',
          l6: 'Resort Worker Level 6 — qualified trade or specialist role',
          l7: 'Resort Worker Level 7 — senior supervisor of specialist teams',
        };
        return { level, stream: 'resort_worker', rationale: rationales[answers.alpine_worker_level], confidence: 'high' };
      }
      return { level: 2, stream: 'resort_worker', rationale: 'Unable to determine level — defaulting to Resort Worker Level 1. Please review.', confidence: 'low' };
    }
    if (answers.alpine_role === 'snowsports') {
      const level = { cat_a: 1, cat_b: 2, cat_c: 3, cat_d: 4, cat_e: 5 }[answers.alpine_instructor_cat];
      if (level) {
        const rationales = {
          cat_a: 'Snowsports Instructor Category A — APSI Level 4, 10+ seasons',
          cat_b: 'Snowsports Instructor Category B — APSI Level 3',
          cat_c: 'Snowsports Instructor Category C — APSI Level 2',
          cat_d: 'Snowsports Instructor Category D — APSI Level 1',
          cat_e: 'Snowsports Instructor Category E — trainee or recruitment clinic only',
        };
        return { level, stream: 'snowsports', rationale: rationales[answers.alpine_instructor_cat], confidence: 'high' };
      }
      return { level: 5, stream: 'snowsports', rationale: 'Unable to determine category — defaulting to Category E. Please review.', confidence: 'low' };
    }
    return { level: 2, stream: 'resort_worker', rationale: 'Unable to determine role type — defaulting to Resort Worker Level 1. Please review.', confidence: 'low' };
  }

  if (awardCode === 'MA000019') {
    // MA000019 — Banking, Finance and Insurance Award 2020
    const level = { l1: 1, l2: 2, l3: 3, l4: 4, l5: 5, l6: 6 }[answers.banking_level];
    if (level) {
      const rationales = {
        l1: 'Level 1 — entry-level banking/finance employee',
        l2: 'Level 2 — experienced clerical, uses financial product knowledge',
        l3: 'Level 3 — specialised/technical role, exercises judgment',
        l4: 'Level 4 — senior specialist, may supervise others',
        l5: 'Level 5 — management or supervisory role',
        l6: 'Level 6 — senior management',
      };
      return { level, stream: 'banking', rationale: rationales[answers.banking_level], confidence: 'high' };
    }
    return { level: 1, stream: 'banking', rationale: 'Unable to determine level — defaulting to Level 1. Please review.', confidence: 'low' };
  }

  if (awardCode === 'MA000021') {
    // MA000021 — Business Equipment Award 2020
    if (answers.business_equip_stream === 'technical') {
      const level = { l1: 1, l2: 2, l3: 3, l4: 4, l5: 5, l6: 6 }[answers.be_tech_level];
      if (level) {
        const rationales = {
          l1: 'Technical Level 1 — entry-level technical employee',
          l2: 'Technical Level 2 — experienced technical employee',
          l3: 'Technical Level 3 — skilled technical employee',
          l4: 'Technical Level 4 — advanced technical employee',
          l5: 'Technical Level 5 — senior technical employee',
          l6: 'Technical Level 6 — principal technical employee',
        };
        return { level, stream: 'technical', rationale: rationales[answers.be_tech_level], confidence: 'high' };
      }
      return { level: 1, stream: 'technical', rationale: 'Unable to determine level — defaulting to Technical Level 1. Please review.', confidence: 'low' };
    }
    if (answers.business_equip_stream === 'commercial_traveller') {
      const level = { sales1: 1, sales2: 2, sales3: 3 }[answers.be_sales_level];
      if (level) {
        const rationales = {
          sales1: 'Salesperson Level 1 — entry-level sales representative',
          sales2: 'Salesperson Level 2 — experienced sales representative',
          sales3: 'Salesperson Level 3 — senior sales representative',
        };
        return { level, stream: 'commercial_traveller', rationale: rationales[answers.be_sales_level], confidence: 'high' };
      }
      return { level: 1, stream: 'commercial_traveller', rationale: 'Unable to determine level — defaulting to Salesperson Level 1. Please review.', confidence: 'low' };
    }
    return { level: 1, stream: 'technical', rationale: 'Unable to determine stream — defaulting to Technical Level 1. Please review.', confidence: 'low' };
  }

  if (awardCode === 'MA000083') {
    // MA000083 — Commercial Sales Award 2020
    const level = { probationary: 1, merchandiser: 2, commercial_traveller: 3 }[answers.sales_role];
    if (level) {
      const rationales = {
        probationary: 'Probationary Traveller — new commercial traveller in probation (max 3 months)',
        merchandiser: 'Merchandiser — employee who merchandises products at retail outlets',
        commercial_traveller: 'Commercial Traveller/Advertising Sales Representative — travels to sell products or advertising',
      };
      return { level, stream: 'commercial_sales', rationale: rationales[answers.sales_role], confidence: 'high' };
    }
    return { level: 1, stream: 'commercial_sales', rationale: 'Unable to determine role — defaulting to Probationary Traveller. Please review.', confidence: 'low' };
  }

  if (awardCode === 'MA000027') {
    // MA000027 — Health Professionals and Support Services Award 2020
    if (answers.health_stream === 'health_professional') {
      const level = { hp1: 1, hp2: 2, hp3: 3, hp4: 4 }[answers.health_pro_level];
      if (level) {
        const rationales = {
          hp1: 'Health Professional Level 1 — graduate entry (degree-qualified)',
          hp2: 'Health Professional Level 2 — experienced professional (4+ years)',
          hp3: 'Health Professional Level 3 — senior professional, may supervise',
          hp4: 'Health Professional Level 4 — principal professional, manages a service',
        };
        return { level, stream: 'health_professional', rationale: rationales[answers.health_pro_level], confidence: 'high' };
      }
      return { level: 1, stream: 'health_professional', rationale: 'Unable to determine level — defaulting to HP Level 1. Please review.', confidence: 'low' };
    }
    if (answers.health_stream === 'support_services') {
      const level = { l1: 1, l2: 2, l3: 3, l4: 4, l5: 5, l6: 6, l7: 7, l8: 8, l9: 9 }[answers.support_level];
      if (level) {
        const rationales = {
          l1: 'Support Services Level 1 — entry-level (cleaning, food services, laundry)',
          l2: 'Support Services Level 2 — some experience, basic equipment',
          l3: 'Support Services Level 3 — experienced, may guide others',
          l4: 'Support Services Level 4 — trade qualified or advanced',
          l5: 'Support Services Level 5 — experienced tradesperson',
          l6: 'Support Services Level 6 — supervisor or advanced specialist',
          l7: 'Support Services Level 7 — senior supervisor',
          l8: 'Support Services Level 8 — technical specialist',
          l9: 'Support Services Level 9 — senior management',
        };
        return { level, stream: 'support_services', rationale: rationales[answers.support_level], confidence: 'high' };
      }
      return { level: 1, stream: 'support_services', rationale: 'Unable to determine level — defaulting to Support Services Level 1. Please review.', confidence: 'low' };
    }
    return { level: 1, stream: 'support_services', rationale: 'Unable to determine stream — defaulting to Support Services Level 1. Please review.', confidence: 'low' };
  }

  if (awardCode === 'MA000099') {
    // MA000099 — Labour Market Assistance Industry Award 2020
    const level = { admin_assistant: 1, admin_officer: 2, eso_grade1: 3, eso_grade2: 4, coordinator: 5, manager1: 6, manager2: 7 }[answers.lma_role];
    if (level) {
      const rationales = {
        admin_assistant: 'Administrative Assistant — entry-level administration',
        admin_officer: 'Administrative Officer — experienced administration',
        eso_grade1: 'Employment Services Officer Grade 1 — frontline case worker',
        eso_grade2: 'Employment Services Officer Grade 2 — experienced case worker',
        coordinator: 'Employment Services Coordinator — coordinates employment services',
        manager1: 'Manager Grade 1 — manages a team or office',
        manager2: 'Manager Grade 2 — senior management',
      };
      return { level, stream: 'labour_market', rationale: rationales[answers.lma_role], confidence: 'high' };
    }
    return { level: 1, stream: 'labour_market', rationale: 'Unable to determine role — defaulting to Administrative Assistant. Please review.', confidence: 'low' };
  }

  if (awardCode === 'MA000112') {
    // MA000112 — Local Government Industry Award 2020
    const level = { l1: 1, l2: 2, l3: 3, l4: 4, l5: 5, l6: 6, l7: 7, l8: 8, l9: 9, l10: 10, l11: 11 }[answers.local_govt_level];
    if (level) {
      const rationales = {
        l1: 'Level 1 — entry-level, routine tasks under supervision',
        l2: 'Level 2 — some experience, limited supervision',
        l3: 'Level 3 — trades assistant or experienced worker',
        l4: 'Level 4 — trade qualified',
        l5: 'Level 5 — experienced tradesperson or technical employee',
        l6: 'Level 6 — advanced tradesperson or specialist',
        l7: 'Level 7 — senior tradesperson or supervisor',
        l8: 'Level 8 — professional or technical specialist',
        l9: 'Level 9 — senior professional',
        l10: 'Level 10 — management',
        l11: 'Level 11 — senior management',
      };
      return { level, stream: 'local_govt', rationale: rationales[answers.local_govt_level], confidence: 'high' };
    }
    return { level: 1, stream: 'local_govt', rationale: 'Unable to determine level — defaulting to Level 1. Please review.', confidence: 'low' };
  }

  if (awardCode === 'MA000074') {
    // MA000074 — Poultry Processing Award 2020
    const level = { l1: 1, l2: 2, l3: 3, l4: 4, l5: 5, l6: 6 }[answers.poultry_level];
    if (level) {
      const rationales = {
        l1: 'Level 1 — new employee, basic tasks',
        l2: 'Level 2 — some experience, operates basic equipment',
        l3: 'Level 3 — trades assistant, operates specialised equipment',
        l4: 'Level 4 — trade qualified or advanced operator',
        l5: 'Level 5 — supervisor or advanced tradesperson',
        l6: 'Level 6 — senior supervisor or plant manager',
      };
      return { level, stream: 'poultry', rationale: rationales[answers.poultry_level], confidence: 'high' };
    }
    return { level: 1, stream: 'poultry', rationale: 'Unable to determine level — defaulting to Level 1. Please review.', confidence: 'low' };
  }

  if (awardCode === 'MA000065') {
    // MA000065 — Professional Employees Award 2020
    const level = { pp1_3yr: 1, pp1_4yr: 2, pp1_2: 3, pp1_3: 4, pp1_4: 5, level2: 6, level3: 7, level4: 8, level5: 9 }[answers.professional_level];
    if (level) {
      const rationales = {
        pp1_3yr: 'Level 1 Pay Point 1.1 — graduate with 3-year degree',
        pp1_4yr: 'Level 1 Pay Point 1.1 — graduate with 4 or 5-year degree',
        pp1_2: 'Level 1 Pay Point 1.2 — graduate professional, 1+ year experience',
        pp1_3: 'Level 1 Pay Point 1.3 — graduate professional, 2+ years experience',
        pp1_4: 'Level 1 Pay Point 1.4 — graduate professional, 3+ years experience',
        level2: 'Level 2 — experienced professional or quality auditor',
        level3: 'Level 3 — senior professional or lead quality auditor',
        level4: 'Level 4 — principal professional',
        level5: 'Level 5 — experienced medical research employee (highest level)',
      };
      return { level, stream: 'professional', rationale: rationales[answers.professional_level], confidence: 'high' };
    }
    return { level: 1, stream: 'professional', rationale: 'Unable to determine level — defaulting to Pay Point 1.1 (3yr degree). Please review.', confidence: 'low' };
  }

  if (awardCode === 'MA000121') {
    // MA000121 — State Government Agencies Award 2020
    if (answers.state_govt_stream === 'admin') {
      const level = { aps1: 1, aps2: 2, aps3: 3, aps4: 4, aps5: 5, aps6: 6, el1: 7, el2: 8 }[answers.sga_admin_level];
      if (level) return { level, stream: 'admin', rationale: 'Administrative Stream — ' + answers.sga_admin_level.toUpperCase(), confidence: 'high' };
      return { level: 1, stream: 'admin', rationale: 'Unable to determine level — defaulting to APS 1. Please review.', confidence: 'low' };
    }
    if (answers.state_govt_stream === 'technical') {
      const level = { to1: 1, to2: 2, to3: 3, to4: 4 }[answers.sga_tech_level];
      if (level) return { level, stream: 'technical', rationale: 'Technical Stream — TO ' + level, confidence: 'high' };
      return { level: 1, stream: 'technical', rationale: 'Unable to determine level — defaulting to TO 1. Please review.', confidence: 'low' };
    }
    if (answers.state_govt_stream === 'professional') {
      const level = { es1: 1, es2: 2 }[answers.sga_es_level];
      if (level) return { level, stream: 'professional', rationale: 'Engineer/Scientist Stream — ES ' + level, confidence: 'high' };
      return { level: 1, stream: 'professional', rationale: 'Unable to determine level — defaulting to ES 1. Please review.', confidence: 'low' };
    }
    if (answers.state_govt_stream === 'it') {
      const level = { ito1: 1, ito2: 2 }[answers.sga_ito_level];
      if (level) return { level, stream: 'it', rationale: 'IT Officer Stream — ITO ' + level, confidence: 'high' };
      return { level: 1, stream: 'it', rationale: 'Unable to determine level — defaulting to ITO 1. Please review.', confidence: 'low' };
    }
    if (answers.state_govt_stream === 'legal') {
      const level = { lo1: 1, lo2: 2 }[answers.sga_lo_level];
      if (level) return { level, stream: 'legal', rationale: 'Legal Officer Stream — LO ' + level, confidence: 'high' };
      return { level: 1, stream: 'legal', rationale: 'Unable to determine level — defaulting to LO 1. Please review.', confidence: 'low' };
    }
    return { level: 1, stream: 'admin', rationale: 'Unable to determine stream — defaulting to APS 1. Please review.', confidence: 'low' };
  }

  if (awardCode === 'MA000090') {
    // MA000090 — Wine Industry Award 2020
    const level = { g1_new: 1, g1_exp: 2, g2: 3, g3: 4, g4: 5, g5: 6 }[answers.wine_grade];
    if (level) {
      const rationales = {
        g1_new: 'Grade 1 — first 6 months of employment',
        g1_exp: 'Grade 1 — after 6 months of employment',
        g2: 'Grade 2 — experienced worker',
        g3: 'Grade 3 — tradesperson or equivalent',
        g4: 'Grade 4 — advanced tradesperson',
        g5: 'Grade 5 — supervisor or principal tradesperson',
      };
      return { level, stream: 'wine', rationale: rationales[answers.wine_grade], confidence: 'high' };
    }
    return { level: 1, stream: 'wine', rationale: 'Unable to determine grade — defaulting to Grade 1. Please review.', confidence: 'low' };
  }

  if (awardCode === 'MA000018') {
    // MA000018 — Aged Care Award 2010
    if (answers.aged_care_stream === 'aged_care_general') {
      const level = { l1: 1, l2: 2, l3: 3, l4: 4, l5: 5, l6: 6, l7: 7 }[answers.aged_care_general_level];
      if (level) return { level, stream: 'aged_care_general', rationale: 'Aged Care General Level ' + level, confidence: 'high' };
      return { level: 1, stream: 'aged_care_general', rationale: 'Defaulting to General Level 1. Please review.', confidence: 'low' };
    }
    if (answers.aged_care_stream === 'aged_care_direct') {
      const level = { l1: 1, l2: 2, l3: 3, l4: 4, l5: 5, l6: 6 }[answers.aged_care_direct_level];
      if (level) return { level, stream: 'aged_care_direct', rationale: 'Aged Care Direct Care Level ' + level, confidence: 'high' };
      return { level: 1, stream: 'aged_care_direct', rationale: 'Defaulting to Direct Care Level 1. Please review.', confidence: 'low' };
    }
    return { level: 1, stream: 'aged_care_general', rationale: 'Defaulting to General Level 1. Please review.', confidence: 'low' };
  }

  if (awardCode === 'MA000034') {
    // MA000034 — Nurses Award 2020
    const level = { nursing_assistant: 1, enrolled_nurse: 2, rn_l1: 3, rn_l2: 4, rn_l3: 5, rn_l4: 6, rn_l5: 7, nurse_practitioner: 8 }[answers.nursing_level];
    if (level) {
      const rationales = {
        nursing_assistant: 'Nursing Assistant', enrolled_nurse: 'Enrolled Nurse',
        rn_l1: 'Registered Nurse Level 1', rn_l2: 'Registered Nurse Level 2',
        rn_l3: 'Registered Nurse Level 3', rn_l4: 'Registered Nurse Level 4',
        rn_l5: 'Registered Nurse Level 5', nurse_practitioner: 'Nurse Practitioner',
      };
      return { level, stream: 'nursing', rationale: rationales[answers.nursing_level], confidence: 'high' };
    }
    return { level: 1, stream: 'nursing', rationale: 'Defaulting to Nursing Assistant. Please review.', confidence: 'low' };
  }

  if (awardCode === 'MA000100') {
    // MA000100 — SCHADS Award 2010 (5 streams with pay points)
    const pp = { pp1: 1, pp2: 2, pp3: 3, pp4: 4 }[answers.schads_pay_point] || 1;
    const levelMap = { l1: 1, l2: 2, l3: 3, l4: 4, l5: 5, l6: 6, l7: 7, l8: 8 };

    if (answers.schads_stream === 'social_community') {
      const level = levelMap[answers.schads_sacs_level];
      if (level) return { level, stream: 'social_community', payPoint: pp, rationale: `SACS Level ${level} Pay Point ${pp}`, confidence: 'high' };
      return { level: 1, stream: 'social_community', payPoint: 1, rationale: 'Defaulting to SACS Level 1 PP1.', confidence: 'low' };
    }
    if (answers.schads_stream === 'crisis_accommodation') {
      const level = levelMap[answers.schads_crisis_level];
      if (level) return { level, stream: 'crisis_accommodation', payPoint: pp, rationale: `Crisis Accommodation Level ${level} Pay Point ${pp}`, confidence: 'high' };
      return { level: 1, stream: 'crisis_accommodation', payPoint: 1, rationale: 'Defaulting to Crisis Accommodation Level 1 PP1.', confidence: 'low' };
    }
    if (answers.schads_stream === 'family_day_care') {
      const level = levelMap[answers.schads_fdc_level];
      if (level) return { level, stream: 'family_day_care', payPoint: pp, rationale: `Family Day Care Level ${level} Pay Point ${pp}`, confidence: 'high' };
      return { level: 1, stream: 'family_day_care', payPoint: 1, rationale: 'Defaulting to Family Day Care Level 1 PP1.', confidence: 'low' };
    }
    if (answers.schads_stream === 'home_care_disability') {
      const level = levelMap[answers.schads_hc_disability_level];
      if (level) return { level, stream: 'home_care_disability', payPoint: pp, rationale: `Home Care Disability Level ${level} Pay Point ${pp}`, confidence: 'high' };
      return { level: 1, stream: 'home_care_disability', payPoint: 1, rationale: 'Defaulting to HC Disability Level 1 PP1.', confidence: 'low' };
    }
    if (answers.schads_stream === 'home_care_aged') {
      const level = levelMap[answers.schads_hc_aged_level];
      if (level) return { level, stream: 'home_care_aged', payPoint: pp, rationale: `Home Care Aged Care Level ${level} Pay Point ${pp}`, confidence: 'high' };
      return { level: 1, stream: 'home_care_aged', payPoint: 1, rationale: 'Defaulting to HC Aged Care Level 1 PP1.', confidence: 'low' };
    }
    return { level: 1, stream: 'social_community', payPoint: 1, rationale: 'Defaulting to SACS Level 1 PP1. Please review.', confidence: 'low' };
  }

  if (awardCode === 'MA000012') {
    // MA000012 — Pharmacy Industry Award 2020
    const level = { l1: 1, l2: 2, l3: 3, l4: 4, l5: 5, l6: 6, l7: 7, l8: 8, l9: 9, l10: 10 }[answers.pharmacy_level];
    if (level) {
      const rationales = {
        l1: 'Pharmacy Assistant Level 1', l2: 'Pharmacy Assistant Level 2',
        l3: 'Pharmacy Assistant Level 3', l4: 'Pharmacy Assistant Level 4',
        l5: 'Pharmacy Intern (1st half)', l6: 'Pharmacy Intern (2nd half)',
        l7: 'Pharmacist', l8: 'Experienced Pharmacist',
        l9: 'Pharmacist in Charge', l10: 'Pharmacist Manager',
      };
      return { level, stream: 'pharmacy', rationale: rationales[answers.pharmacy_level], confidence: 'high' };
    }
    return { level: 1, stream: 'pharmacy', rationale: 'Defaulting to Pharmacy Assistant Level 1. Please review.', confidence: 'low' };
  }

  if (awardCode === 'MA000010') {
    // MA000010 — Manufacturing and Associated Industries Award 2020
    const level = { c13: 1, c12: 2, c11: 3, c10: 4, c9: 5, c8: 6, c7: 7, c6: 8, c5: 9, c4: 10, c3: 11, c2a: 12 }[answers.manufacturing_level];
    if (level) return { level, stream: 'manufacturing', rationale: 'Manufacturing ' + answers.manufacturing_level.toUpperCase(), confidence: 'high' };
    return { level: 1, stream: 'manufacturing', rationale: 'Defaulting to C13. Please review.', confidence: 'low' };
  }

  if (awardCode === 'MA000020') {
    // MA000020 — Building and Construction General On-site Award 2020
    const level = { cw1a: 1, cw1b: 2, cw1c: 3, cw1d: 4, cw2: 5, cw3: 6, cw4: 7, cw5: 8, cw6: 9 }[answers.construction_level];
    if (level) return { level, stream: 'construction', rationale: 'CW/ECW ' + answers.construction_level.replace('cw', '').toUpperCase(), confidence: 'high' };
    return { level: 1, stream: 'construction', rationale: 'Defaulting to CW1(a). Please review.', confidence: 'low' };
  }

  if (awardCode === 'MA000089') {
    // MA000089 — Vehicle Repair, Services and Retail Award 2020
    const level = { l1: 1, l2: 2, l3: 3, l4: 4, l5: 5, l6: 6, l7: 7 }[answers.vehicle_repair_level];
    if (level) return { level, stream: 'vehicle_repair', rationale: 'Vehicle RSR Level ' + level, confidence: 'high' };
    return { level: 1, stream: 'vehicle_repair', rationale: 'Defaulting to RSR Level 1. Please review.', confidence: 'low' };
  }

  if (awardCode === 'MA000076') {
    // MA000076 — Educational Services (Schools) General Staff Award 2020
    const level = { l1: 1, l2: 2, l3: 3, l4: 4, l5: 5, l6: 6, l7: 7, l8: 8 }[answers.school_support_level];
    if (level) return { level, stream: 'school_support', rationale: 'School Support Level ' + level, confidence: 'high' };
    return { level: 1, stream: 'school_support', rationale: 'Defaulting to Level 1. Please review.', confidence: 'low' };
  }

  if (awardCode === 'MA000077') {
    // MA000077 — Educational Services (Teachers) Award 2020
    const level = { l1: 1, l2: 2, l3: 3, l4: 4, l5: 5 }[answers.teacher_level];
    if (level) {
      const rationales = {
        l1: 'Graduate Teacher (Level 1)', l2: 'Teacher Level 2 (Proficient)',
        l3: 'Teacher Level 3 (3yr at L2)', l4: 'Teacher Level 4 (3yr at L3)',
        l5: 'Teacher Level 5 (Highly Accomplished/Lead)',
      };
      return { level, stream: 'teacher', rationale: rationales[answers.teacher_level], confidence: 'high' };
    }
    return { level: 1, stream: 'teacher', rationale: 'Defaulting to Graduate Teacher. Please review.', confidence: 'low' };
  }

  if (awardCode === 'MA000038') {
    // MA000038 — Road Transport and Distribution Award 2020
    const level = { g1: 1, g2: 2, g3: 3, g4: 4, g5: 5, g6: 6, g7: 7, g8: 8, g9: 9, g10: 10 }[answers.transport_grade];
    if (level) return { level, stream: 'road_transport', rationale: 'Transport Worker Grade ' + level, confidence: 'high' };
    return { level: 1, stream: 'road_transport', rationale: 'Defaulting to Grade 1. Please review.', confidence: 'low' };
  }

  if (awardCode === 'MA000116') {
    // MA000116 — Legal Services Award 2020
    const level = { l1: 1, l2: 2, l3: 3, l4: 4, l5: 5, l6: 6, l7: 7 }[answers.legal_level];
    if (level) {
      const rationales = {
        l1: 'Legal Clerical & Admin Level 1', l2: 'Legal Clerical & Admin Level 2',
        l3: 'Legal Clerical & Admin Level 3', l4: 'Legal Clerical & Admin Level 4',
        l5: 'Legal Clerical & Admin Level 5', l6: 'Law Graduate (Level 5)',
        l7: 'Law Clerk (Level 6)',
      };
      return { level, stream: 'legal', rationale: rationales[answers.legal_level], confidence: 'high' };
    }
    return { level: 1, stream: 'legal', rationale: 'Defaulting to Level 1. Please review.', confidence: 'low' };
  }

  if (awardCode === 'MA000118') {
    // MA000118 — Animal Care and Veterinary Services Award 2020
    if (answers.vet_stream === 'vet_support') {
      const level = { intro: 1, l1: 2, l2: 3, l3: 4, l4: 5, l5: 6 }[answers.vet_support_level];
      if (level) return { level, stream: 'vet_support', rationale: 'Vet Support ' + (level === 1 ? 'Introductory' : 'Level ' + (level - 1)), confidence: 'high' };
      return { level: 1, stream: 'vet_support', rationale: 'Defaulting to Introductory. Please review.', confidence: 'low' };
    }
    if (answers.vet_stream === 'vet_surgeon') {
      const level = { l1a: 1, l1b: 2, l2: 3, l3: 4, l4: 5 }[answers.vet_surgeon_level];
      if (level) return { level, stream: 'vet_surgeon', rationale: 'Veterinary Surgeon Level ' + answers.vet_surgeon_level.toUpperCase(), confidence: 'high' };
      return { level: 1, stream: 'vet_surgeon', rationale: 'Defaulting to Level 1A. Please review.', confidence: 'low' };
    }
    if (answers.vet_stream === 'inspector') {
      const level = { l1: 1, l2: 2, l3: 3 }[answers.inspector_level];
      if (level) return { level, stream: 'inspector', rationale: 'Inspector Level ' + level, confidence: 'high' };
      return { level: 1, stream: 'inspector', rationale: 'Defaulting to Inspector Level 1. Please review.', confidence: 'low' };
    }
    return { level: 1, stream: 'vet_support', rationale: 'Defaulting to Vet Support Introductory. Please review.', confidence: 'low' };
  }

  if (awardCode === 'MA000025') {
    const level = { g1: 1, g2: 2, g3: 3, g4: 4, g5: 5, g6: 6, g7: 7, g8: 8, g9: 9, g10: 10 }[answers.electrical_grade];
    if (level) return { level, stream: 'electrical', rationale: 'Electrical Worker Grade ' + level, confidence: 'high' };
    return { level: 1, stream: 'electrical', rationale: 'Defaulting to Grade 1.', confidence: 'low' };
  }

  if (awardCode === 'MA000036') {
    const level = { l1: 1, l2: 2, l3: 3, l4: 4, l5: 5, l6: 6, l7: 7, l8: 8 }[answers.plumbing_level];
    if (level) return { level, stream: 'plumbing', rationale: 'Plumbing Level ' + level, confidence: 'high' };
    return { level: 1, stream: 'plumbing', rationale: 'Defaulting to Level 1.', confidence: 'low' };
  }

  if (awardCode === 'MA000029') {
    const level = { l1: 1, l2: 2, l3: 3, l4: 4, l5: 5, l6: 6, l7: 7 }[answers.joinery_level];
    if (level) return { level, stream: 'joinery', rationale: 'Joinery Level ' + level, confidence: 'high' };
    return { level: 1, stream: 'joinery', rationale: 'Defaulting to Level 1.', confidence: 'low' };
  }

  if (awardCode === 'MA000073') {
    const level = { l1: 1, l2: 2, l3: 3, l4: 4, l5: 5, l6: 6 }[answers.food_mfg_level];
    if (level) return { level, stream: 'food_manufacturing', rationale: 'Food Manufacturing Level ' + level, confidence: 'high' };
    return { level: 1, stream: 'food_manufacturing', rationale: 'Defaulting to Level 1.', confidence: 'low' };
  }

  if (awardCode === 'MA000059') {
    const level = { mi1: 1, mi2: 2, mi3: 3, mi4: 4, mi5: 5, mi6: 6, mi7: 7, mi8: 8 }[answers.meat_level];
    if (level) return { level, stream: 'meat', rationale: 'Meat Industry Level ' + level, confidence: 'high' };
    return { level: 1, stream: 'meat', rationale: 'Defaulting to MI 1.', confidence: 'low' };
  }

  if (awardCode === 'MA000041') {
    if (answers.telecom_stream === 'telecom_clerical') {
      const level = { l1: 1, l2: 2, l3: 3, l4: 4, l5: 5 }[answers.telecom_clerical_level];
      if (level) return { level, stream: 'telecom_clerical', rationale: 'Telecom Clerical Level ' + level, confidence: 'high' };
      return { level: 1, stream: 'telecom_clerical', rationale: 'Defaulting to C&A Level 1.', confidence: 'low' };
    }
    if (answers.telecom_stream === 'telecom_technical') {
      const level = { l1: 1, l2: 2, l3: 3, l4: 4, l5: 5, l6: 6 }[answers.telecom_tech_level];
      if (level) return { level, stream: 'telecom_technical', rationale: 'Telecom Technical Level ' + level, confidence: 'high' };
      return { level: 1, stream: 'telecom_technical', rationale: 'Defaulting to Trainee.', confidence: 'low' };
    }
    return { level: 1, stream: 'telecom_clerical', rationale: 'Defaulting to C&A Level 1.', confidence: 'low' };
  }

  if (awardCode === 'MA000043') {
    const level = { l1: 1, l2: 2, l3: 3, l4: 4, l5: 5, l6: 6, l7: 7, l8: 8, l9: 9 }[answers.waste_level];
    if (level) return { level, stream: 'waste', rationale: 'Waste Management Level ' + level, confidence: 'high' };
    return { level: 1, stream: 'waste', rationale: 'Defaulting to Level 1.', confidence: 'low' };
  }

  if (awardCode === 'MA000096') {
    if (answers.dc_laundry_stream === 'dry_cleaning') {
      const level = { l1: 1, l2: 2, l3: 3, l4: 4, l5: 5 }[answers.dc_level];
      if (level) return { level, stream: 'dry_cleaning', rationale: 'Dry Cleaning Level ' + level, confidence: 'high' };
      return { level: 1, stream: 'dry_cleaning', rationale: 'Defaulting to DC Level 1.', confidence: 'low' };
    }
    if (answers.dc_laundry_stream === 'laundry') {
      const level = { l1: 1, l2: 2, l3: 3, l4: 4 }[answers.laundry_level];
      if (level) return { level, stream: 'laundry', rationale: 'Laundry Level ' + level, confidence: 'high' };
      return { level: 1, stream: 'laundry', rationale: 'Defaulting to Laundry Level 1.', confidence: 'low' };
    }
    return { level: 1, stream: 'dry_cleaning', rationale: 'Defaulting to DC Level 1.', confidence: 'low' };
  }

  if (awardCode === 'MA000098') {
    const level = { patient_transport: 1, call_taker: 2, clinical_transport: 3, attendant: 4, officer: 5, asst_station: 6, station: 7, mechanic: 8 }[answers.ambulance_role];
    if (level) return { level, stream: 'ambulance', rationale: 'Ambulance ' + answers.ambulance_role.replace(/_/g, ' '), confidence: 'high' };
    return { level: 1, stream: 'ambulance', rationale: 'Defaulting to Patient Transport Officer.', confidence: 'low' };
  }

  if (awardCode === 'MA000113') {
    const level = { l1: 1, l2: 2, l3: 3, l4: 4, l5: 5, l6: 6, l7: 7, l8: 8, l9: 9, l10: 10 }[answers.water_level];
    if (level) return { level, stream: 'water', rationale: 'Water Industry Level ' + level, confidence: 'high' };
    return { level: 1, stream: 'water', rationale: 'Defaulting to Level 1.', confidence: 'low' };
  }

  if (awardCode === 'MA000001') {
    const level = { l1: 1, l2: 2, l3: 3, l4: 4, l5: 5, l6: 6, l7: 7 }[answers.acch_level];
    if (level) return { level, stream: 'health_services', rationale: 'Health Worker Level ' + level, confidence: 'high' };
    return { level: 1, stream: 'health_services', rationale: 'Defaulting to Level 1.', confidence: 'low' };
  }

  if (awardCode === 'MA000017') {
    const level = { l1: 1, l2: 2, l3: 3, l4: 4, l5: 5 }[answers.corrections_level];
    if (level) return { level, stream: 'corrections', rationale: 'Correctional Officer Level ' + level, confidence: 'high' };
    return { level: 1, stream: 'corrections', rationale: 'Defaulting to Level 1.', confidence: 'low' };
  }

  if (awardCode === 'MA000031') {
    const level = { l1: 1, l2: 2, l3: 3 }[answers.model_grade];
    if (level) return { level, stream: 'modelling', rationale: 'Model Grade ' + level, confidence: 'high' };
    return { level: 1, stream: 'modelling', rationale: 'Defaulting to Grade 1.', confidence: 'low' };
  }

  if (awardCode === 'MA000037') {
    const level = { l1: 1, l2: 2, l3: 3, l4: 4, l5: 5 }[answers.salt_level];
    if (level) return { level, stream: 'salt', rationale: 'Salt Industry Level ' + level, confidence: 'high' };
    return { level: 1, stream: 'salt', rationale: 'Defaulting to Level 1.', confidence: 'low' };
  }

  if (awardCode === 'MA000047') {
    const level = { l1: 1, l2: 2, l3: 3, l4: 4, l5: 5 }[answers.asphalt_level];
    if (level) return { level, stream: 'asphalt', rationale: 'Asphalt Industry Level ' + level, confidence: 'high' };
    return { level: 1, stream: 'asphalt', rationale: 'Defaulting to Level 1.', confidence: 'low' };
  }

  if (awardCode === 'MA000048') {
    const level = { l1: 1, l2: 2, l3: 3, l4: 4, l5: 5 }[answers.cemetery_level];
    if (level) return { level, stream: 'cemetery', rationale: 'Cemetery Worker Level ' + level, confidence: 'high' };
    return { level: 1, stream: 'cemetery', rationale: 'Defaulting to Level 1.', confidence: 'low' };
  }

  if (awardCode === 'MA000050') {
    const level = { l1: 1, l2: 2, l3: 3, l4: 4, l5: 5 }[answers.concrete_products_level];
    if (level) return { level, stream: 'concrete_products', rationale: 'Concrete Products Level ' + level, confidence: 'high' };
    return { level: 1, stream: 'concrete_products', rationale: 'Defaulting to Level 1.', confidence: 'low' };
  }

  if (awardCode === 'MA000051') {
    const level = { l1: 1, l2: 2, l3: 3, l4: 4, l5: 5 }[answers.coal_terminal_level];
    if (level) return { level, stream: 'coal_terminal', rationale: 'Terminal Employee Level ' + level, confidence: 'high' };
    return { level: 1, stream: 'coal_terminal', rationale: 'Defaulting to Level 1.', confidence: 'low' };
  }

  if (awardCode === 'MA000054') {
    const level = { l1: 1, l2: 2, l3: 3, l4: 4, l5: 5, l6: 6 }[answers.electrical_power_level];
    if (level) return { level, stream: 'electrical_power', rationale: 'Power Worker Level ' + level, confidence: 'high' };
    return { level: 1, stream: 'electrical_power', rationale: 'Defaulting to Level 1.', confidence: 'low' };
  }

  if (awardCode === 'MA000060') {
    const level = { l1: 1, l2: 2, l3: 3, l4: 4, l5: 5 }[answers.marine_tourism_level];
    if (level) return { level, stream: 'marine_tourism', rationale: 'Marine Tourism Level ' + level, confidence: 'high' };
    return { level: 1, stream: 'marine_tourism', rationale: 'Defaulting to Level 1.', confidence: 'low' };
  }

  if (awardCode === 'MA000061') {
    const level = { l1: 1, l2: 2, l3: 3, l4: 4, l5: 5 }[answers.airline_ground_level];
    if (level) return { level, stream: 'airline_ground', rationale: 'Ground Staff Level ' + level, confidence: 'high' };
    return { level: 1, stream: 'airline_ground', rationale: 'Defaulting to Level 1.', confidence: 'low' };
  }

  if (awardCode === 'MA000062') {
    const level = { l1: 1, l2: 2, l3: 3, l4: 4, l5: 5 }[answers.airport_level];
    if (level) return { level, stream: 'airport', rationale: 'Airport Employee Level ' + level, confidence: 'high' };
    return { level: 1, stream: 'airport', rationale: 'Defaulting to Level 1.', confidence: 'low' };
  }

  if (awardCode === 'MA000064') {
    const level = { l1: 1, l2: 2, l3: 3, l4: 4, l5: 5 }[answers.pest_control_level];
    if (level) return { level, stream: 'pest_control', rationale: 'Pest Control Level ' + level, confidence: 'high' };
    return { level: 1, stream: 'pest_control', rationale: 'Defaulting to Level 1.', confidence: 'low' };
  }

  if (awardCode === 'MA000066') {
    const level = { l1: 1, l2: 2, l3: 3, l4: 4, l5: 5 }[answers.animal_training_level];
    if (level) return { level, stream: 'animal_training', rationale: 'Horse/Greyhound Training Level ' + level, confidence: 'high' };
    return { level: 1, stream: 'animal_training', rationale: 'Defaulting to Level 1.', confidence: 'low' };
  }

  if (awardCode === 'MA000067') {
    const level = { l1: 1, l2: 2, l3: 3, l4: 4, l5: 5, l6: 6 }[answers.hydrocarbons_level];
    if (level) return { level, stream: 'hydrocarbons', rationale: 'Hydrocarbons Level ' + level, confidence: 'high' };
    return { level: 1, stream: 'hydrocarbons', rationale: 'Defaulting to Level 1.', confidence: 'low' };
  }

  if (awardCode === 'MA000070') {
    const level = { l1: 1, l2: 2, l3: 3, l4: 4, l5: 5 }[answers.silviculture_level];
    if (level) return { level, stream: 'silviculture', rationale: 'Silviculture Level ' + level, confidence: 'high' };
    return { level: 1, stream: 'silviculture', rationale: 'Defaulting to Level 1.', confidence: 'low' };
  }

  if (awardCode === 'MA000075') {
    const level = { l1: 1, l2: 2, l3: 3, l4: 4, l5: 5, l6: 6, l7: 7 }[answers.rail_level];
    if (level) return { level, stream: 'rail', rationale: 'Rail Worker Level ' + level, confidence: 'high' };
    return { level: 1, stream: 'rail', rationale: 'Defaulting to Level 1.', confidence: 'low' };
  }

  if (awardCode === 'MA000078') {
    const level = { l1: 1, l2: 2, l3: 3, l4: 4, l5: 5 }[answers.stevedoring_level];
    if (level) return { level, stream: 'stevedoring', rationale: 'Stevedore Level ' + level, confidence: 'high' };
    return { level: 1, stream: 'stevedoring', rationale: 'Defaulting to Level 1.', confidence: 'low' };
  }

  if (awardCode === 'MA000006') {
    const level = { l1: 1, l2: 2, l3: 3, l4: 4, l5: 5 }[answers.coal_mining_level];
    if (level) return { level, stream: 'coal_mining', rationale: 'Black Coal Mining Level ' + level, confidence: 'high' };
    return { level: 1, stream: 'coal_mining', rationale: 'Defaulting to Level 1.', confidence: 'low' };
  }

  if (awardCode === 'MA000007') {
    const level = { l1: 1, l2: 2, l3: 3, l4: 4, l5: 5 }[answers.cement_quarry_level];
    if (level) return { level, stream: 'cement_quarry', rationale: 'Cement & Quarrying Level ' + level, confidence: 'high' };
    return { level: 1, stream: 'cement_quarry', rationale: 'Defaulting to Level 1.', confidence: 'low' };
  }

  if (awardCode === 'MA000008') {
    const level = { l1: 1, l2: 2, l3: 3, l4: 4 }[answers.wool_level];
    if (level) return { level, stream: 'wool', rationale: 'Wool Storage Level ' + level, confidence: 'high' };
    return { level: 1, stream: 'wool', rationale: 'Defaulting to Level 1.', confidence: 'low' };
  }

  if (awardCode === 'MA000011') {
    const level = { l1: 1, l2: 2, l3: 3, l4: 4, l5: 5 }[answers.oil_refining_level];
    if (level) return { level, stream: 'oil_refining', rationale: 'Oil Refining Level ' + level, confidence: 'high' };
    return { level: 1, stream: 'oil_refining', rationale: 'Defaulting to Level 1.', confidence: 'low' };
  }

  if (awardCode === 'MA000014') {
    const level = { l1: 1, l2: 2, l3: 3, l4: 4, l5: 5 }[answers.mining_level];
    if (level) return { level, stream: 'mining', rationale: 'Mining Industry Level ' + level, confidence: 'high' };
    return { level: 1, stream: 'mining', rationale: 'Defaulting to Level 1.', confidence: 'low' };
  }

  if (awardCode === 'MA000015') {
    const level = { l1: 1, l2: 2, l3: 3, l4: 4, l5: 5 }[answers.ports_level];
    if (level) return { level, stream: 'ports', rationale: 'Ports & Harbours Level ' + level, confidence: 'high' };
    return { level: 1, stream: 'ports', rationale: 'Defaulting to Level 1.', confidence: 'low' };
  }

  if (awardCode === 'MA000024') {
    const level = { l1: 1, l2: 2, l3: 3, l4: 4, l5: 5 }[answers.cotton_ginning_level];
    if (level) return { level, stream: 'cotton_ginning', rationale: 'Cotton Ginning Level ' + level, confidence: 'high' };
    return { level: 1, stream: 'cotton_ginning', rationale: 'Defaulting to Level 1.', confidence: 'low' };
  }

  if (awardCode === 'MA000035') {
    const level = { l1: 1, l2: 2, l3: 3, l4: 4, l5: 5 }[answers.pastoral_level];
    if (level) return { level, stream: 'pastoral', rationale: 'Pastoral Award Level ' + level, confidence: 'high' };
    return { level: 1, stream: 'pastoral', rationale: 'Defaulting to Level 1.', confidence: 'low' };
  }

  if (awardCode === 'MA000039') {
    const level = { l1: 1, l2: 2, l3: 3, l4: 4, l5: 5 }[answers.seafood_level];
    if (level) return { level, stream: 'seafood', rationale: 'Seafood Processing Level ' + level, confidence: 'high' };
    return { level: 1, stream: 'seafood', rationale: 'Defaulting to Level 1.', confidence: 'low' };
  }

  if (awardCode === 'MA000040') {
    const level = { l1: 1, l2: 2, l3: 3, l4: 4, l5: 5 }[answers.sugar_level];
    if (level) return { level, stream: 'sugar', rationale: 'Sugar Industry Level ' + level, confidence: 'high' };
    return { level: 1, stream: 'sugar', rationale: 'Defaulting to Level 1.', confidence: 'low' };
  }

  if (awardCode === 'MA000044') {
    const level = { l1: 1, l2: 2, l3: 3, l4: 4, l5: 5, l6: 6 }[answers.timber_level];
    if (level) return { level, stream: 'timber', rationale: 'Timber Industry Level ' + level, confidence: 'high' };
    return { level: 1, stream: 'timber', rationale: 'Defaulting to Level 1.', confidence: 'low' };
  }

  if (awardCode === 'MA000045') {
    const level = { l1: 1, l2: 2, l3: 3, l4: 4, l5: 5 }[answers.concrete_level];
    if (level) return { level, stream: 'concrete', rationale: 'Premixed Concrete Level ' + level, confidence: 'high' };
    return { level: 1, stream: 'concrete', rationale: 'Defaulting to Level 1.', confidence: 'low' };
  }

  if (awardCode === 'MA000046') {
    const level = { l1: 1, l2: 2, l3: 3, l4: 4, l5: 5 }[answers.textile_level];
    if (level) return { level, stream: 'textile', rationale: 'Textile Industry Level ' + level, confidence: 'high' };
    return { level: 1, stream: 'textile', rationale: 'Defaulting to Level 1.', confidence: 'low' };
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
