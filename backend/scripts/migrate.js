require('dotenv').config();
const pool = require('../src/db/pool');

async function migrate() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // ── Metadata ────────────────────────────────────────────────────────────────
    await client.query(`
      CREATE TABLE IF NOT EXISTS award_metadata (
        id          SERIAL PRIMARY KEY,
        award_code  VARCHAR(50) NOT NULL UNIQUE,
        award_name  TEXT NOT NULL,
        effective_date DATE NOT NULL,
        last_scraped_at TIMESTAMPTZ,
        source_url  TEXT,
        created_at  TIMESTAMPTZ DEFAULT NOW(),
        updated_at  TIMESTAMPTZ DEFAULT NOW()
      )
    `);

    // ── Raw scraped content ──────────────────────────────────────────────────────
    await client.query(`
      CREATE TABLE IF NOT EXISTS scraped_pages (
        id          SERIAL PRIMARY KEY,
        url         TEXT NOT NULL,
        page_type   VARCHAR(50) NOT NULL,  -- 'award_text', 'pay_guide', 'fact_sheet'
        raw_html    TEXT,
        raw_text    TEXT,
        scraped_at  TIMESTAMPTZ DEFAULT NOW(),
        UNIQUE(url)
      )
    `);

    // ── Employment classifications ───────────────────────────────────────────────
    await client.query(`
      CREATE TABLE IF NOT EXISTS classifications (
        id              SERIAL PRIMARY KEY,
        award_code      VARCHAR(50) NOT NULL DEFAULT 'MA000009',
        level           INTEGER NOT NULL,         -- 1-5 (plus special levels)
        stream          VARCHAR(50) NOT NULL,     -- 'general', 'food_beverage', 'kitchen', 'front_office'
        title           TEXT NOT NULL,
        description     TEXT NOT NULL,            -- plain English description from award
        duties          JSONB NOT NULL DEFAULT '[]',  -- array of duty strings
        indicative_tasks JSONB NOT NULL DEFAULT '[]',
        sort_order      INTEGER NOT NULL DEFAULT 0,
        created_at      TIMESTAMPTZ DEFAULT NOW(),
        UNIQUE(award_code, level, stream)
      )
    `);

    // ── Pay rates ────────────────────────────────────────────────────────────────
    await client.query(`
      CREATE TABLE IF NOT EXISTS pay_rates (
        id                  SERIAL PRIMARY KEY,
        award_code          VARCHAR(50) NOT NULL DEFAULT 'MA000009',
        classification_id   INTEGER REFERENCES classifications(id),
        employment_type     VARCHAR(20) NOT NULL,  -- 'full_time', 'part_time', 'casual'
        rate_type           VARCHAR(30) NOT NULL,  -- 'base_hourly', 'casual_loading'
        rate_amount         NUMERIC(10,4) NOT NULL,
        effective_date      DATE NOT NULL,
        created_at          TIMESTAMPTZ DEFAULT NOW(),
        UNIQUE(award_code, classification_id, employment_type, rate_type, effective_date)
      )
    `);

    // ── Penalty rates ────────────────────────────────────────────────────────────
    await client.query(`
      CREATE TABLE IF NOT EXISTS penalty_rates (
        id              SERIAL PRIMARY KEY,
        award_code      VARCHAR(50) NOT NULL DEFAULT 'MA000009',
        employment_type VARCHAR(20) NOT NULL,  -- 'full_time', 'part_time', 'casual'
        day_type        VARCHAR(30) NOT NULL,  -- 'weekday', 'saturday', 'sunday', 'public_holiday'
        time_band_start TIME,                  -- NULL = applies all day
        time_band_end   TIME,                  -- NULL = applies all day
        time_band_label VARCHAR(50),           -- e.g. 'midnight_to_7am', 'after_midnight'
        multiplier      NUMERIC(5,4) NOT NULL, -- e.g. 1.25, 1.5, 2.0
        addition_per_hour NUMERIC(8,4),        -- flat $/hr addition (e.g. 2.81 for evening, 4.22 for night)
        description     TEXT NOT NULL,
        effective_date  DATE NOT NULL,
        created_at      TIMESTAMPTZ DEFAULT NOW()
      )
    `);

    // ── Overtime rates ───────────────────────────────────────────────────────────
    await client.query(`
      CREATE TABLE IF NOT EXISTS overtime_rates (
        id              SERIAL PRIMARY KEY,
        award_code      VARCHAR(50) NOT NULL DEFAULT 'MA000009',
        employment_type VARCHAR(20) NOT NULL,
        threshold_hours NUMERIC(5,2) NOT NULL,  -- hours before this rate kicks in
        period          VARCHAR(20) NOT NULL,    -- 'daily', 'weekly'
        multiplier      NUMERIC(5,4) NOT NULL,
        description     TEXT NOT NULL,
        effective_date  DATE NOT NULL,
        created_at      TIMESTAMPTZ DEFAULT NOW()
      )
    `);

    // ── Allowances ───────────────────────────────────────────────────────────────
    await client.query(`
      CREATE TABLE IF NOT EXISTS allowances (
        id              SERIAL PRIMARY KEY,
        award_code      VARCHAR(50) NOT NULL DEFAULT 'MA000009',
        allowance_type  VARCHAR(50) NOT NULL,  -- 'meal', 'split_shift', 'uniform', 'vehicle', 'first_aid', 'laundry'
        name            TEXT NOT NULL,
        description     TEXT NOT NULL,         -- plain English when it applies
        trigger_condition TEXT NOT NULL,       -- what causes it to be payable
        amount          NUMERIC(10,4),         -- NULL if % based
        amount_type     VARCHAR(20) NOT NULL DEFAULT 'fixed',  -- 'fixed', 'per_km', 'weekly', 'per_wash'
        per_unit        VARCHAR(20),           -- 'per_meal', 'per_shift', 'per_week', 'per_km', 'per_wash'
        effective_date  DATE NOT NULL,
        created_at      TIMESTAMPTZ DEFAULT NOW(),
        UNIQUE(award_code, allowance_type, effective_date)
      )
    `);

    // Add is_all_purpose column if it does not yet exist (idempotent)
    await client.query(`
      ALTER TABLE allowances ADD COLUMN IF NOT EXISTS is_all_purpose BOOLEAN NOT NULL DEFAULT FALSE
    `);

    // ── Break entitlements ───────────────────────────────────────────────────────
    await client.query(`
      CREATE TABLE IF NOT EXISTS break_entitlements (
        id                  SERIAL PRIMARY KEY,
        award_code          VARCHAR(50) NOT NULL DEFAULT 'MA000009',
        employment_type     VARCHAR(20),       -- NULL = applies to all
        shift_hours_min     NUMERIC(5,2) NOT NULL,
        shift_hours_max     NUMERIC(5,2),      -- NULL = no upper limit
        break_type          VARCHAR(20) NOT NULL,  -- 'rest', 'meal'
        break_duration_min  INTEGER NOT NULL,   -- minutes
        is_paid             BOOLEAN NOT NULL,
        timing_rule         TEXT,              -- e.g. 'within first 5 hours'
        description         TEXT NOT NULL,
        created_at          TIMESTAMPTZ DEFAULT NOW()
      )
    `);

    // ── Classification decision tree ─────────────────────────────────────────────
    await client.query(`
      CREATE TABLE IF NOT EXISTS classification_questions (
        id                  SERIAL PRIMARY KEY,
        award_code          VARCHAR(50) NOT NULL DEFAULT 'MA000009',
        question_key        VARCHAR(100) NOT NULL UNIQUE,
        question_text       TEXT NOT NULL,
        help_text           TEXT,
        question_type       VARCHAR(20) NOT NULL DEFAULT 'single',  -- 'single', 'multi'
        stream              VARCHAR(50),  -- NULL = applies to all streams
        parent_question_key VARCHAR(100),  -- NULL = always show; set = only show when parent answered
        parent_answer_key   VARCHAR(100),  -- required answer on the parent question to show this question
        sort_order          INTEGER NOT NULL DEFAULT 0,
        created_at          TIMESTAMPTZ DEFAULT NOW()
      )
    `);

    // Add new columns to classification_questions if not already present (idempotent)
    await client.query(`ALTER TABLE classification_questions ADD COLUMN IF NOT EXISTS award_code VARCHAR(50) NOT NULL DEFAULT 'MA000009'`);
    await client.query(`ALTER TABLE classification_questions ADD COLUMN IF NOT EXISTS parent_question_key VARCHAR(100)`);
    await client.query(`ALTER TABLE classification_questions ADD COLUMN IF NOT EXISTS parent_answer_key VARCHAR(100)`);

    // ── Pay point support (SCHADS and other awards with progression within levels) ──
    await client.query(`ALTER TABLE classifications ADD COLUMN IF NOT EXISTS pay_point INTEGER NOT NULL DEFAULT 1`);
    // Drop old unique constraint and add new one including pay_point (idempotent via IF EXISTS)
    await client.query(`DO $$ BEGIN
      IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'classifications_award_code_level_stream_key') THEN
        ALTER TABLE classifications DROP CONSTRAINT classifications_award_code_level_stream_key;
      END IF;
    END $$`);
    await client.query(`DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'classifications_award_code_level_stream_pay_point_key') THEN
        ALTER TABLE classifications ADD CONSTRAINT classifications_award_code_level_stream_pay_point_key UNIQUE (award_code, level, stream, pay_point);
      END IF;
    END $$`);

    // ── Stream-specific overtime (SCHADS: SACS FT gets 3hr first band, disability/PT gets 2hr) ──
    await client.query(`ALTER TABLE overtime_rates ADD COLUMN IF NOT EXISTS stream VARCHAR(50)`);

    // ── Shift-type-specific penalty rates (remote work, 24hr care) ──
    await client.query(`ALTER TABLE penalty_rates ADD COLUMN IF NOT EXISTS shift_type VARCHAR(30)`);

    // ── Shift-type-specific pay rates (24hr care flat per-shift amounts) ──
    // rate_type already supports this via '24hr_care_shift' — no schema change needed

    await client.query(`
      CREATE TABLE IF NOT EXISTS classification_answers (
        id              SERIAL PRIMARY KEY,
        question_id     INTEGER REFERENCES classification_questions(id),
        answer_key      VARCHAR(100) NOT NULL,
        answer_text     TEXT NOT NULL,
        sort_order      INTEGER NOT NULL DEFAULT 0,
        created_at      TIMESTAMPTZ DEFAULT NOW()
      )
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS classification_rules (
        id              SERIAL PRIMARY KEY,
        classification_id INTEGER REFERENCES classifications(id),
        rule_type       VARCHAR(20) NOT NULL DEFAULT 'require_all',  -- 'require_all', 'require_any'
        conditions      JSONB NOT NULL,  -- [{question_key, answer_key}]
        priority        INTEGER NOT NULL DEFAULT 0,
        created_at      TIMESTAMPTZ DEFAULT NOW()
      )
    `);

    // ── Static content blocks ────────────────────────────────────────────────────
    await client.query(`
      CREATE TABLE IF NOT EXISTS content_blocks (
        id          SERIAL PRIMARY KEY,
        block_key   VARCHAR(100) NOT NULL UNIQUE,
        title       TEXT,
        body        TEXT NOT NULL,
        content_type VARCHAR(20) NOT NULL DEFAULT 'markdown',
        created_at  TIMESTAMPTZ DEFAULT NOW(),
        updated_at  TIMESTAMPTZ DEFAULT NOW()
      )
    `);

    // ── Anonymous calculation logs (analytics) ────────────────────────────────
    await client.query(`
      CREATE TABLE IF NOT EXISTS calculation_logs (
        id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        created_at            TIMESTAMPTZ DEFAULT NOW(),
        award_code            VARCHAR(50) NOT NULL,
        classification_level  INTEGER,
        classification_stream VARCHAR(50),
        employment_type       VARCHAR(20) NOT NULL,
        age_bracket           VARCHAR(20),
        total_shifts          INTEGER NOT NULL,
        calculated_gross      NUMERIC(10,2) NOT NULL,
        actual_pay_entered    NUMERIC(10,2),
        gap_amount            NUMERIC(10,2),
        gap_percent           NUMERIC(6,2),
        appears_underpaid     BOOLEAN,
        is_test               BOOLEAN NOT NULL DEFAULT FALSE
      )
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS calculation_shift_logs (
        id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        calculation_id       UUID NOT NULL REFERENCES calculation_logs(id) ON DELETE CASCADE,
        day_type             VARCHAR(30) NOT NULL,
        shift_duration_hours NUMERIC(5,2) NOT NULL,
        break_minutes        INTEGER NOT NULL DEFAULT 0,
        ordinary_hours       NUMERIC(5,2) NOT NULL,
        ordinary_pay         NUMERIC(10,2) NOT NULL,
        penalty_hours        NUMERIC(5,2) NOT NULL DEFAULT 0,
        penalty_pay          NUMERIC(10,2) NOT NULL DEFAULT 0,
        overtime_hours       NUMERIC(5,2) NOT NULL DEFAULT 0,
        overtime_pay         NUMERIC(10,2) NOT NULL DEFAULT 0,
        total_shift_pay      NUMERIC(10,2) NOT NULL,
        missed_break_penalty BOOLEAN NOT NULL DEFAULT FALSE,
        missed_break_amount  NUMERIC(10,2) NOT NULL DEFAULT 0
      )
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS calculation_allowance_logs (
        id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        calculation_id   UUID NOT NULL REFERENCES calculation_logs(id) ON DELETE CASCADE,
        allowance_type   VARCHAR(50) NOT NULL,
        allowance_amount NUMERIC(10,4) NOT NULL DEFAULT 0,
        qualified        BOOLEAN NOT NULL DEFAULT FALSE
      )
    `);

    // Analytics indexes
    await client.query('CREATE INDEX IF NOT EXISTS idx_calc_logs_award ON calculation_logs(award_code)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_calc_logs_created ON calculation_logs(created_at)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_calc_logs_test ON calculation_logs(is_test)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_calc_shift_logs_calc ON calculation_shift_logs(calculation_id)');
    await client.query('CREATE INDEX IF NOT EXISTS idx_calc_allowance_logs_calc ON calculation_allowance_logs(calculation_id)');

    // ── Scrape log ───────────────────────────────────────────────────────────────
    await client.query(`
      CREATE TABLE IF NOT EXISTS scrape_log (
        id          SERIAL PRIMARY KEY,
        triggered_by VARCHAR(50) NOT NULL DEFAULT 'manual',  -- 'manual', 'admin', 'scheduled'
        started_at  TIMESTAMPTZ DEFAULT NOW(),
        completed_at TIMESTAMPTZ,
        status      VARCHAR(20) NOT NULL DEFAULT 'running',  -- 'running', 'success', 'failed'
        pages_scraped INTEGER DEFAULT 0,
        error_message TEXT
      )
    `);

    // ── Award features ────────────────────────────────────────────────────────
    // Records which calculator features apply to each award. Used by the test
    // runner and gap analyzer to know what to test — features are code logic,
    // not DB data rows, so they can't be discovered by reading tables.
    await client.query(`
      CREATE TABLE IF NOT EXISTS award_features (
        id              SERIAL PRIMARY KEY,
        award_code      VARCHAR(50) NOT NULL,
        feature_key     VARCHAR(50) NOT NULL,  -- e.g. 'broken_shift', '24hr_care', 'remote_work', '10hr_break_rule', 'sleepover'
        applies_to      JSONB,                 -- optional: which streams/emp types this applies to, e.g. {"streams": ["home_care_disability"]}
        description     TEXT NOT NULL,
        test_params     JSONB,                 -- parameters the test runner needs to generate test cases
        created_at      TIMESTAMPTZ DEFAULT NOW(),
        UNIQUE(award_code, feature_key)
      )
    `);

    await client.query('COMMIT');
    console.log('✓ Migration complete');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Migration failed:', err);
    throw err;
  } finally {
    client.release();
    await pool.end();
  }
}

migrate().catch(() => process.exit(1));
