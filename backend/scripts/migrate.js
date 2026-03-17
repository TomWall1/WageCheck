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
        id              SERIAL PRIMARY KEY,
        question_key    VARCHAR(100) NOT NULL UNIQUE,
        question_text   TEXT NOT NULL,
        help_text       TEXT,
        question_type   VARCHAR(20) NOT NULL DEFAULT 'single',  -- 'single', 'multi'
        stream          VARCHAR(50),  -- NULL = applies to all streams
        sort_order      INTEGER NOT NULL DEFAULT 0,
        created_at      TIMESTAMPTZ DEFAULT NOW()
      )
    `);

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
