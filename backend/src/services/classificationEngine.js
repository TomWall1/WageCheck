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
