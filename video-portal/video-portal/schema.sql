-- Run this once against your Postgres database (Neon or Supabase, added via
-- the Vercel Marketplace). You can paste it into the SQL editor in either
-- provider's dashboard, or it will be created automatically the first time
-- someone confirms a video if you call ensureSchema() (see lib/db.ts).

create table if not exists video_confirmations (
  id bigserial primary key,
  access_code text not null,
  email text not null,
  video_slug text not null,
  confirmed_at timestamptz not null default now()
);

create index if not exists video_confirmations_video_slug_idx
  on video_confirmations (video_slug);

-- Example query: who watched what, most recent first
-- select access_code, email, video_slug, confirmed_at
-- from video_confirmations
-- order by confirmed_at desc;

-- Example query: did a given email confirm every video?
-- select email, array_agg(distinct video_slug) as watched
-- from video_confirmations
-- group by email;
