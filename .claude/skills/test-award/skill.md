---
name: test-award
description: Run the exhaustive award testing agent against one or all awards. Use when the user types "/test-award", "test award", "run award tests", or wants to verify pay calculations for a specific award code (e.g., MA000100). Accepts an award code or "all" as an argument, plus an optional --no-api flag to skip FWC API verification.
user_invocable: true
metadata:
  version: 3.0.0
---

# Exhaustive Award Testing Agent

Verify **every number** in an FWO pay guide PDF against both the database and the production calculator. This is the authoritative test — if a rate is published in the pay guide, it must be verified.

## Usage

The user provides an award code (e.g., `MA000100`) or `all` as the argument. An optional `--no-api` flag skips FWC MAPD API verification.

Formats:
- `/test-award MA000100` - test a single award
- `/test-award MA000100 --no-api` - test without FWC API check
- `/test-award all` - test all awards
- `/test-award all --no-api` - test all awards without API check

## Execution

### Step 1: Parse arguments

Extract the award code from `$ARGUMENTS`. If empty, ask the user which award to test. **Do not add --no-api unless the user explicitly requests it.**

### Step 2: Check for pay guide PDF

Check if `testing/pay_guides/<AWARD_CODE>.pdf` exists.

- If the PDF **exists** → proceed to Step 3 (full PDF verification) AND Step 4 (automated suite) in parallel.
- If the PDF **does NOT exist** → skip to Step 4 (automated suite only) and warn the user that only DB-vs-calculator testing is possible without the PDF.

### Step 3: Extract and verify every number from the PDF pay guide

This is the core of the testing agent. Read the PDF using the Read tool (it supports PDFs natively). Then systematically verify every section below.

**CRITICAL LESSONS FROM PREVIOUS TESTING:**

1. **Casual penalty multipliers are often DIFFERENT from FT/PT.** Do NOT assume casuals use the same multipliers. Always verify from the PDF. For example, SCHADS casuals use ×1.4/×1.8/×2.2 (not ×1.5/×2.0/×2.5). This is the most common source of errors.

2. **Pay points within levels exist for many awards.** A single level (e.g., Level 2) may have 3-4 pay points with different rates. Check if the PDF shows "pay point 1", "pay point 2" etc. within levels.

3. **Multiple streams exist within complex awards.** SCHADS has 5 streams (social_community, crisis_accommodation, family_day_care, home_care_disability, home_care_aged). Each stream has its own rate tables. Verify ALL streams.

4. **Afternoon/night shift rates are specific $/hr amounts** — not just multipliers. The PDF publishes exact dollar amounts per classification. Verify these match the DB's time-band penalty approach.

5. **OT first-band hours may differ by stream or employment type.** SCHADS FT SACS gets 3 hours at ×1.5 before ×2.0, but disability/PT only get 2 hours. Check the OT column headers carefully.

6. **Special shift types exist beyond standard shifts.** Look for: 24-hour care (flat per-shift rates), broken shifts (12hr span penalty), remote work (different penalty table), sleepover (flat allowance), 10-hour break rule (double time). These should be in the `award_features` table.

7. **Not all awards update at the same time.** Some effective dates are July, some October, some other months. Use the date stated on page 1 of the PDF.

8. **The FWC API may not match the PDF timing.** The API can lag behind published pay guides, or return rates in a different structure. When the API and PDF disagree, **the PDF is correct**. Don't let API skips cause concern if PDF verification passes.

#### Sections to verify:

**A. Adult Full-time & Part-time rates**
For every classification row, extract and verify:
- Hourly pay rate (compare against DB `pay_rates` base_hourly)
- Weekly pay rate (= hourly × 38, verify arithmetic)
- Saturday rate (verify multiplier: typically ×1.5 but AWARD-SPECIFIC)
- Sunday rate (verify multiplier: typically ×2.0 but AWARD-SPECIFIC)
- Public holiday rate (verify multiplier: typically ×2.5 but AWARD-SPECIFIC)
- Afternoon shift rate (specific $/hr — calculate the addition above base)
- Night shift rate (specific $/hr — calculate the addition above base)
- Overtime columns (check column headers for tier thresholds — first 2hr vs first 3hr)
- Special columns: less than 10hr break, broken shift, remote work, 24hr care, etc.

**B. Adult Casual rates**
Same structure as FT/PT but with DIFFERENT multipliers. **Always calculate from the PDF values:**
```
casual_saturday_multiplier = PDF_casual_saturday_rate / PDF_casual_base_rate
```
Do NOT assume these match FT/PT multipliers. Common casual multipliers:
- SCHADS: Sat ×1.4, Sun ×1.8, PH ×2.2
- Hospitality: Sat ×1.25, Sun ×1.5/1.75, PH ×2.25
- Retail: Varies by level

Verify casual base = FT base × 1.25 (standard 25% loading).

**C. Junior rates**
Pay guides split juniors by age bracket and employment type. Each sub-section has its own full rate table. Verify:
- Junior percentage = junior_rate / adult_rate (should match `JUNIOR_RATE_TABLES` in test framework)
- All penalty columns at the junior rate
- Both FT/PT and Casual junior tables

**D. Special sections (award-specific)**
Look for any of these — they vary by award:
- Loaded rate arrangements (Mon-Fri 40hr, Mon-Sat 45hr, etc.)
- Apprentice rates (by year/stage)
- 24-hour care shift flat rates
- Remote work rate tables
- Broken shift rates
- Sleepover provisions

**E. Allowances**
Extract every allowance row. Compare name, amount, per-unit, and all-purpose flag against DB `allowances` table. Flag any PDF allowance NOT in the DB.

**F. Superannuation**
Verify SGC rate = 12%. The automated suite now tests both positive and negative super cases — see the SU-* tests for details. When reviewing PDF results, confirm the super section covers:
- **Positive (OTE — super SHOULD apply):** ordinary hours, penalty rate hours (Sat/Sun/PH), casual loading, shift loadings (evening/night)
- **Negative (NOT OTE — super should NOT apply):** overtime hours, missed-break double-time pay, meal allowances (expense reimbursements)
- **Breakdown audit:** every `superBreakdown` row has the correct `superApplies` flag for its pay category

### Step 4: Run the automated test suite

Run the existing test framework:
```bash
cd C:/Documents/WageCheck && node testing/run_exhaustive_tests.js <AWARD_CODE> [--no-api if user specified]
```
Use a 5-minute timeout (300000ms).

**When interpreting results:**
- **PASS**: Rate matches expected value
- **PARTIAL**: Sub-cent rounding difference (within $0.05 tolerance) — acceptable
- **FAIL**: Significant mismatch — investigate
- **SKIPPED**: Usually FWC API format issues or missing fwc_classification_fixed_id — not a concern if PDF verification passes
- **Stage 0 gaps = 0**: DB fully covers the pay guide spec
- **Stage 0 gaps > 0**: Missing streams, classifications, rates, or allowances — action needed

### Step 5: Compile and report results

#### If PDF was verified (Step 3):

Count every distinct rate value checked. Report:

```
VERDICT: X of Y pay guide values verified — Z failures, W gaps

SECTION RESULTS:
  A. FT/PT rates:     N values, X pass, Y fail
  B. Casual rates:    N values, X pass, Y fail
  C. Junior rates:    N values, X pass, Y fail
  D. Special shifts:  N values, X pass, Y fail
  E. Allowances:      N values, X pass, Y fail
  F. Super (positive): N values, X pass, Y fail  (items that SHOULD attract super)
  F. Super (negative): N values, X pass, Y fail  (items that should NOT attract super)
  F. Super (audit):    N rows audited, X flag errors

AUTOMATED SUITE: X PASS, Y PARTIAL, Z FAIL, W SKIPPED (N total)
Results file: testing/<AWARD_CODE>_Exhaustive_Tests.xlsx

CRITICAL FINDINGS: (any multiplier errors, missing data, wrong rates)

ACTION ITEMS: (prioritized list of what to fix)
```

#### If only automated suite (no PDF):

```
AUTOMATED SUITE: X PASS, Y PARTIAL, Z FAIL, W SKIPPED (N total)
Stage 0 gaps: N
Results file: testing/<AWARD_CODE>_Exhaustive_Tests.xlsx

NOTE: No pay guide PDF at testing/pay_guides/<AWARD_CODE>.pdf
      Only DB-vs-calculator testing was performed.
      Add the PDF for full pay guide verification.
```

### Step 6: If issues found, suggest fixes

For each failure category, state clearly:
- Whether the **DB seed** or the **calculator logic** needs fixing
- The specific file to modify (e.g., `backend/scripts/seed_maXXXXXX.js`)
- The exact values that need to change
- Whether this affects other awards (e.g., casual multiplier pattern)

## Key files

| File | Purpose |
|------|---------|
| `testing/run_exhaustive_tests.js` | Main automated test suite |
| `testing/pay_guides/<CODE>.pdf` | FWO pay guide PDF (source of truth) |
| `testing/pay_guides/<CODE>.spec.json` | Structured spec extracted from PDF |
| `testing/lib/referenceCalculator.js` | Independent oracle for expected values |
| `testing/lib/seedVerifier.js` | DB vs FWC API verification |
| `testing/lib/gapAnalyzer.js` | Pay guide spec vs DB gap analysis |
| `backend/scripts/seed_<code>.js` | Seed data for each award |
| `backend/src/services/awardCalculator.js` | Production calculator |
| `backend/scripts/migrate.js` | DB schema (classifications, pay_rates, penalty_rates, overtime_rates, allowances, award_features) |

## DB schema reference (for verification queries)

```sql
-- Base rate for a classification
SELECT rate_amount FROM pay_rates
WHERE award_code = 'MA000100' AND classification_id = X
  AND employment_type = 'full_time' AND rate_type = 'base_hourly'
ORDER BY effective_date DESC LIMIT 1;

-- Penalty multipliers
SELECT employment_type, day_type, multiplier, time_band_start, shift_type
FROM penalty_rates WHERE award_code = 'MA000100';

-- Overtime rules (may be stream-specific)
SELECT employment_type, stream, threshold_hours, period, multiplier
FROM overtime_rates WHERE award_code = 'MA000100';

-- Award features (special shift types)
SELECT feature_key, applies_to, test_params
FROM award_features WHERE award_code = 'MA000100';

-- Classifications with pay points
SELECT level, stream, pay_point, title
FROM classifications WHERE award_code = 'MA000100' ORDER BY stream, level, pay_point;
```
