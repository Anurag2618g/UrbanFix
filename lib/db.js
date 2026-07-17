import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  throw new Error(
    "[UrbanFix] DATABASE_URL environment variable is not set. " +
      "Please add it to your .env.local file or deployment environment. " +
      "Expected format: postgresql://user:password@host/dbname?sslmode=require"
  );
}

/** @type {import('@neondatabase/serverless').NeonQueryFunction<false, false> | null} */
let _db = null;

/**
 * Returns the singleton Neon tagged-template SQL client.
 *
 * The client is created once on first call and reused for all subsequent
 * calls, satisfying the "no new connection per request" requirement (13.3).
 *
 * Usage:
 *   const sql = getDb();
 *   const rows = await sql`SELECT * FROM complaints WHERE id = ${id}`;
 *
 * @returns {import('@neondatabase/serverless').NeonQueryFunction<false, false>}
 */
export function getDb() {
  if (!_db) {
    _db = neon(process.env.DATABASE_URL);
  }
  return _db;
}
