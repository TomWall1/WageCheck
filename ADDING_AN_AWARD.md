# Adding a New Award to WageCheck

This document is the authoritative checklist for adding a new Modern Award.
Every step is required — skipping any one of them causes a broken experience.

---

## Checklist

### 1. Backend — seed script

Create `backend/scripts/seed_MAXXXXXX.js`. It must insert:

- **`award_metadata`** — full name, short name, award code
- **`classifications`** — one row per level/stream combination. `stream` must match
  exactly what the classification engine returns (e.g. `'horticulture'`, `'cleaning'`).
- **`pay_rates`** — `base_hourly` for each classification × employment type
  (`full_time`, `part_time`, `casual`). Casual rate = FT rate × 1.25.
- **`penalty_rates`** — day-of-week and time-of-day penalties. Include `applies_to`
  (`all`, `full_time`, `part_time`, `casual`).
- **`overtime_rules`** — weekly and/or daily OT thresholds.
- **`allowances`** — set `is_all_purpose = true` for any allowance that must be
  added to the base rate **before** casual loading, penalties, and OT multipliers
  are applied (e.g. first aid, leading hand, wet work). Non-all-purpose allowances
  are added after calculation as a flat dollar amount.
- **`break_entitlements`** — meal break rules.
- **`classification_questions`** — questions that drive the questionnaire path.
  For conditional (child) questions, set `parent_question_key` and
  `parent_answer_key` so they only appear when the parent answer matches.
- **`classification_answers`** — answer options for each question. `answer_key`
  values must exactly match the keys used in `classificationEngine.js` rules.

Add the seed to the chain in `backend/scripts/seed.js`.

Run:
```bash
npm run migrate
npm run seed
```

---

### 2. Backend — `awardCalculator.js`

If the award has **junior rates**, add a block inside `getJuniorMultiplier()`:

```js
if (awardCode === 'MAXXXXXX') {
  if (age >= 21) return 1.0;       // adjust cutoff to match award
  if (age < 16) return 0.XX;
  const RATES = { 16: 0.XX, 17: 0.XX, 18: 0.XX, 19: 0.XX, 20: 0.XX };
  return RATES[age] || 1.0;
}
```

If the award has **all-purpose allowances**, no extra calculator changes are needed —
the existing `allPurposeAllowancesPerHour` parameter handles them. The calculator
already fetches the FT base rate, adds the allowance, then reapplies the casual
loading (1.25×) for casual employees.

---

### 3. Backend — `classificationEngine.js`

Add a `CLASSIFICATION_RULES_MAXXXXXX` array. Each rule has:

```js
{ conditions: { answer_key: 'answer_value', ... }, level: N, stream: 'stream_name', rationale: '...' }
```

- Rules are evaluated in order; **first match wins**. Put more specific rules first.
- `stream` must match the stream values in `classifications` table.
- Answer keys and values must exactly match question/answer keys in the DB.

Add a dispatch block inside `classify()`:

```js
if (awardCode === 'MAXXXXXX') {
  for (const rule of CLASSIFICATION_RULES_MAXXXXXX) {
    if (matchesRule(answers, rule.conditions)) {
      return { level: rule.level, stream: rule.stream, rationale: rule.rationale, confidence: 'high' };
    }
  }
  return { level: 1, stream: 'stream_name', rationale: 'Defaulting to Level 1. Please review.', confidence: 'low' };
}
```

---

### 4. Backend — `award.js` route

Add the award code to `VALID_AWARDS`:

```js
const VALID_AWARDS = [..., 'MAXXXXXX'];
```

---

### 5. Frontend — `types/index.ts`

Add the award code to the `AwardCode` union type:

```ts
export type AwardCode = 'MA000009' | ... | 'MAXXXXXX';
```

---

### 6. Frontend — `app/page.tsx`

Add the award to the `AWARD_NAMES` map:

```ts
MAXXXXXX: 'Short Award Name',
```

---

### 7. Frontend — `components/LandingPage.tsx`

Add an entry to the `AWARDS` array:

```ts
{
  code: 'MAXXXXXX' as AwardCode,
  name: 'Full Award Name 2020',
  shortName: 'Short Name Award',
  description: 'Coverage description for this award.',
  examples: 'Job role examples for search',
  badge: 'MAXXXXXX',
},
```

---

### 8. Frontend — `components/steps/StepClassification.tsx`

This is the most commonly forgotten file and the root cause of classification not working.
**Every new award requires all of the following:**

#### a) Add a stream order constant
```ts
const STREAM_ORDER_MAXXXXXX = ['stream_name'];  // list all streams for this award
```

#### b) Add stream label(s)
In `STREAM_LABELS`, add an entry for each stream used by the award:
```ts
stream_name: 'Human Readable Label',
```

#### c) Add an `is<Award>` flag
```ts
const isXxx = awardCode === 'MAXXXXXX';
```

#### d) Add to `isParentGated`
**All awards except MA000009 (Hospitality) must be in `isParentGated`.**
MA000009 uses stream-based question gating; all other awards use
`parent_question_key`/`parent_answer_key` gating. If you omit this,
the questions will not appear.

```ts
const isParentGated = isFF || ... || isXxx;
```

#### e) Wire into `STREAM_ORDER`
```ts
const STREAM_ORDER = ...
  : isXxx ? STREAM_ORDER_MAXXXXXX
  : STREAM_ORDER_MA000009;
```

#### f) Wire into `awardShortName`
```ts
const awardShortName = ...
  : isXxx ? 'Short Name Award'
  : 'Hospitality Award';
```

#### g) Add award description copy (Phase 1 screen)
Find the two `isCleaning ? '...' : '...'` ternaries in the JSX and add
`isXxx ? '...' :` before the final fallback for both:
- The classification level range description (e.g. "Levels run from Level 1...")
- The payslip hint text (e.g. "It might say something like...")

#### h) Add junior rate table (if applicable)
In `renderRateBox()`, add a junior rate table and wire it in:
```ts
const JUNIOR_MAXXXXXX: Record<number, number> = { 16: 0.XX, 17: 0.XX, 18: 0.XX, 19: 0.XX };
const juniorTable = ... : isXxx ? JUNIOR_MAXXXXXX : JUNIOR_DEFAULT;
const juniorMult = ... : isXxx ? 0.XX : 0.40) : 1.0;  // fallback for unlisted ages
```

---

### 9. Frontend — `components/steps/StepAllowances.tsx`

For each allowance the award has, add an entry to `ALLOWANCE_QUESTIONS`.

For **all-purpose allowances** (those with `is_all_purpose = true`):
- These affect the base rate before loading/penalties. Do NOT collect them as a
  flat add-on — instead, use them to trigger a recalculation in StepResults.
- Mark with `isAllPurpose: true` in the question definition.
- Handle their `answer_key` in the `useEffect` that builds `answers` state,
  mapping to the correct `allowance_type` value.

For **standard (non-all-purpose) allowances**:
- These are flat additions shown as a separate line in the results.
- Handled automatically once added to `ALLOWANCE_QUESTIONS`.

---

### 10. Frontend — `components/steps/StepResults.tsx`

If the award has **all-purpose allowances**:
- The `useEffect` in StepResults already handles recalculation generically when
  `is_all_purpose` allowances are triggered. No extra code is needed provided the
  allowances are correctly seeded with `is_all_purpose = true`.

---

### 11. Frontend — `lib/api.ts`

No changes needed unless the award requires a new API parameter.

---

## Quick verification after adding

```bash
# 1. Seed runs without errors
cd backend && npm run seed

# 2. Questions load correctly
curl "http://localhost:3001/api/award/questions?award=MAXXXXXX"

# 3. Classification works
curl -X POST "http://localhost:3001/api/award/classify?award=MAXXXXXX" \
  -H "Content-Type: application/json" \
  -d '{"answers": {"<first_question_key>": "<first_answer_key>"}, "employmentType": "full_time"}'

# 4. Calculation works
curl -X POST "http://localhost:3001/api/award/calculate?award=MAXXXXXX" \
  -H "Content-Type: application/json" \
  -d '{"employmentType":"full_time","classificationId":<id>,"shifts":[{"date":"2025-07-14","startTime":"09:00","endTime":"17:00"}]}'
```

Walk through the full UI flow (all 6 steps) for at least one FT and one casual scenario.
