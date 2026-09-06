import { Pool } from "pg";

let pool: Pool | null = null;

function getPool(): Pool {
  if (!pool) {
    const connectionString =
      (process.env.DATABASE_URL || process.env.POSTGRES_URL || "").replace(
        "sslmode=require",
        "sslmode=no-verify"
      );
    if (!connectionString) {
      throw new Error(
        "No database connection string found. Add a Postgres integration (Neon/Supabase) in Vercel first."
      );
    }
    pool = new Pool({
      connectionString,
      ssl: { rejectUnauthorized: false },
    });
  }
  return pool;
}

export async function logConfirmation(params: {
  email: string;
  videoSlug: string;
}) {
  const { email, videoSlug } = params;
  const db = getPool();
  await db.query(
    `insert into video_confirmations (email, video_slug, confirmed_at)
     values ($1, $2, now())`,
    [email.trim().toLowerCase(), videoSlug]
  );
}
