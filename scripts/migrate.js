/**
 * scripts/migrate.js
 *
 * Bootstrap the UrbanFix PostgreSQL schema.
 * Run with: node scripts/migrate.js
 *
 * Requires DATABASE_URL in the environment (or a .env.local file).
 *
 * Satisfies Requirements:
 *   13.4 — all five tables created via CREATE TABLE IF NOT EXISTS
 *   13.5 — complaint_seq sequence and generate_complaint_no() function
 *   15.2 — all five indexes created for query performance
 */

import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ---------------------------------------------------------------------------
// Minimal .env.local loader — avoids a dotenv runtime dependency.
// Must run BEFORE importing lib/db.js because that module reads DATABASE_URL
// at import time and throws if it is absent.
// ---------------------------------------------------------------------------
function loadEnv() {
  const envPath = resolve(__dirname, '..', '.env.local');
  if (!existsSync(envPath)) return;

  const lines = readFileSync(envPath, 'utf8').split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, '');
    if (!(key in process.env)) process.env[key] = val;
  }
}

loadEnv();

// ---------------------------------------------------------------------------
// Import the shared singleton client from lib/db.js (Requirement 13.1–13.3).
// Dynamic import is used so that loadEnv() runs first and DATABASE_URL is set
// before lib/db.js is evaluated.
// ---------------------------------------------------------------------------
const { getDb } = await import('../lib/db.js');

// ---------------------------------------------------------------------------
// DDL — executed as a single multi-statement string.
// Neon's sql() function accepts a plain string (not just tagged-template) so
// the entire block can be sent in one round-trip.
// ---------------------------------------------------------------------------
const DDL = `
-- ============================================================
-- Sequence for URB-YYYY-NNNNN complaint numbers (Requirement 13.5)
-- ============================================================
CREATE SEQUENCE IF NOT EXISTS complaint_seq
  START WITH 1
  INCREMENT BY 1
  NO MINVALUE
  NO MAXVALUE
  CACHE 1;

-- ============================================================
-- Function: generate_complaint_no()
-- Returns the next value as  URB-<current_year>-<zero-padded 5-digit seq>
-- Example: URB-2025-00042
-- (Requirement 13.5, 15.2)
-- ============================================================
CREATE OR REPLACE FUNCTION generate_complaint_no()
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE
  seq_val  BIGINT;
  yr       TEXT;
BEGIN
  seq_val := nextval('complaint_seq');
  yr      := to_char(now(), 'YYYY');
  RETURN 'URB-' || yr || '-' || lpad(seq_val::TEXT, 5, '0');
END;
$$;

-- ============================================================
-- Table: public_users  (Requirement 13.4)
-- ============================================================
CREATE TABLE IF NOT EXISTS public_users (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT        NOT NULL,
  email      TEXT        UNIQUE NOT NULL,
  password   TEXT        NOT NULL,           -- bcrypt hash
  phone      TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- Table: authority_users  (Requirement 13.4)
-- ============================================================
CREATE TABLE IF NOT EXISTS authority_users (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT        NOT NULL,
  email      TEXT        UNIQUE NOT NULL,
  password   TEXT        NOT NULL,           -- bcrypt hash
  department TEXT,
  role       TEXT        DEFAULT 'officer',  -- 'admin' | 'officer'
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- Table: complaints  (Requirement 13.4)
-- ============================================================
CREATE TABLE IF NOT EXISTS complaints (
  id               UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  complaint_no     TEXT        UNIQUE NOT NULL,       -- e.g. URB-2025-00042
  title            TEXT        NOT NULL,
  description      TEXT,
  category         TEXT        NOT NULL,              -- ComplaintCategory enum (app layer)
  emergency_level  TEXT        NOT NULL DEFAULT 'low',-- low|medium|high|critical
  status           TEXT        NOT NULL DEFAULT 'submitted',
  location_text    TEXT,
  latitude         NUMERIC(10,7),
  longitude        NUMERIC(10,7),
  ward             TEXT,
  reporter_id      UUID        REFERENCES public_users(id)    ON DELETE SET NULL,
  assigned_to      UUID        REFERENCES authority_users(id) ON DELETE SET NULL,
  ai_analysed      BOOLEAN     DEFAULT false,
  ai_raw_response  JSONB,
  created_at       TIMESTAMPTZ DEFAULT now(),
  updated_at       TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- Table: complaint_media  (Requirement 13.4)
-- ============================================================
CREATE TABLE IF NOT EXISTS complaint_media (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  complaint_id UUID        NOT NULL REFERENCES complaints(id) ON DELETE CASCADE,
  media_type   TEXT        NOT NULL,    -- 'image' | 'video' | 'audio'
  file_url     TEXT        NOT NULL,
  file_name    TEXT,
  mime_type    TEXT,
  size_bytes   BIGINT,
  is_primary   BOOLEAN     DEFAULT false,  -- the image used for AI analysis
  created_at   TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- Table: complaint_status_history  (Requirement 13.4)
-- ============================================================
CREATE TABLE IF NOT EXISTS complaint_status_history (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  complaint_id UUID        NOT NULL REFERENCES complaints(id) ON DELETE CASCADE,
  from_status  TEXT,
  to_status    TEXT        NOT NULL,
  changed_by   UUID,        -- authority_user id
  note         TEXT,
  changed_at   TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- Indexes  (Requirement 15.2)
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_complaints_status    ON complaints(status);
CREATE INDEX IF NOT EXISTS idx_complaints_category  ON complaints(category);
CREATE INDEX IF NOT EXISTS idx_complaints_emergency ON complaints(emergency_level);
CREATE INDEX IF NOT EXISTS idx_complaints_reporter  ON complaints(reporter_id);
CREATE INDEX IF NOT EXISTS idx_complaint_media_cid  ON complaint_media(complaint_id);
`;

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function migrate() {
  console.log('🔄  UrbanFix — running schema migration...\n');

  const sql = getDb();

  try {
    console.log('📦  Executing DDL statements...');
    // sql() called with a plain string (not a tagged-template) executes the
    // raw SQL directly via the Neon HTTP driver.
    await sql(DDL);

    console.log('\n✅  Migration completed successfully.\n');
    console.log('   Tables created (if not existed):');
    console.log('     • public_users');
    console.log('     • authority_users');
    console.log('     • complaints');
    console.log('     • complaint_media');
    console.log('     • complaint_status_history');
    console.log('\n   Sequence created (if not existed):');
    console.log('     • complaint_seq');
    console.log('\n   Function created/replaced:');
    console.log('     • generate_complaint_no()');
    console.log('\n   Indexes created (if not existed):');
    console.log('     • idx_complaints_status');
    console.log('     • idx_complaints_category');
    console.log('     • idx_complaints_emergency');
    console.log('     • idx_complaints_reporter');
    console.log('     • idx_complaint_media_cid');

    process.exit(0);
    
  } catch (err) {
    console.error('\n❌  Migration failed:\n');
    console.error(err.message ?? err);
    process.exit(1);
  }
}

migrate();
