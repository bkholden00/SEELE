import { Pool } from "pg";

// DATABASE_URL is provided automatically once you add a Postgres integration
// (Neon or Supabase, via the Vercel Marketplace) to your Vercel project.
let pool: Pool | null = null;

function getPool(): Pool {
  if (!pool) {
    if (!process.env.DATABASE_URL && !process.env.POSTGRES_URL) {
      throw new Error(
        "DATABASE_URL is not set. Add a Postgres integration (Neon/Supabase) in Vercel first."
      );
    }
    pool = new Pool({
      connectionString: process.env.DATABASE_URL || process.env.POSTGRES_URL,
      ssl: { rejectUnauthorized: false },
    });
  }
  return pool;
}

export async function logConfirmation(params: {
  accessCode: string;
  email: string;
  videoSlug: string;
}) {
  const { accessCode, email, videoSlug } = params;
  const db = getPool();
  await db.query(
    `insert into video_confirmations (access_code, email, video_slug, confirmed_at)
     values ($1, $2, $3, now())`,
    [accessCode, email.trim().toLowerCase(), videoSlug]
  );
}

export async function ensureSchema() {
  const db = getPool();
  await db.query(`
    create table if not exists video_confirmations (
      id bigserial primary key,
      access_code text not null,
      email text not null,
      video_slug text not null,
      confirmed_at timestamptz not null default now()
    );
    create index if not exists video_confirmations_video_slug_idx
      on video_confirmations (video_slug);
  `);
}
