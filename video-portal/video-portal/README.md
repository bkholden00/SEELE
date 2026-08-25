# Teacher Video Portal

Access-code protected portal: enter a code → land on an intro video (home page)
→ use the "Videos" dropdown in the top banner to visit each lesson's own page
→ under every video, confirm-by-email logs who watched what and when.

## How it works

- `app/page.tsx` — access code entry. On success, sets an httpOnly cookie and
  redirects to `/intro`.
- `middleware.ts` — protects `/intro` and `/videos/*`; no cookie = bounced back
  to the code screen.
- `app/intro/page.tsx` — the intro video, acts as the home page after login.
- `app/videos/[slug]/page.tsx` — one page per lesson video, listed in `lib/videos.ts`.
- `components/NavBar.tsx` — the top banner + dropdown linking to every video page.
- `components/EmailConfirmForm.tsx` — the "I watched this" email form under each video.
- `app/api/confirm/route.ts` — logs `{access_code, email, video_slug, confirmed_at}`
  to Postgres. The access code comes from the session cookie (server-side), and
  `video_slug` comes from whichever page the form was submitted on — that's how
  you can tell which page a confirmation came from.

## One-time setup

1. **Install dependencies**
   ```
   npm install
   ```

2. **Push this to a GitHub repo, then import it into Vercel** (New Project →
   your repo).

3. **Add a Postgres database** — in your Vercel project, go to Storage → add
   Neon or Supabase Postgres (Marketplace, free tier). This automatically
   sets `DATABASE_URL` for you.

4. **Create the tracking table** — open the SQL editor for whichever provider
   you picked and run everything in `schema.sql` once.

5. **Add a Blob store** — Storage → Blob → Create. This sets
   `BLOB_READ_WRITE_TOKEN` for you automatically.

6. **Set your access codes** — Project Settings → Environment Variables:
   ```
   ACCESS_CODES=TEACHER2026,CAMP-BLUE,CAMP-RED
   ```
   Give out one code per group (or per teacher, if you want the code itself to
   carry meaning — the email field is what actually identifies the person).

7. **Upload your videos to Blob.** Locally:
   ```
   BLOB_READ_WRITE_TOKEN=<paste from Vercel Storage tab> node scripts/upload-video.mjs ./intro.mp4
   ```
   Repeat for each mp4. Each run prints a URL — paste it into the matching
   env var (`NEXT_PUBLIC_INTRO_VIDEO_URL`, `NEXT_PUBLIC_LESSON_1_URL`, etc.)
   in Vercel's Environment Variables settings, or directly into `lib/videos.ts`.

8. **Add or rename lesson pages** — edit the `videos` array in `lib/videos.ts`.
   Each entry becomes its own page at `/videos/<slug>` and shows up in the nav
   dropdown automatically.

9. **Redeploy** after adding env vars (Vercel doesn't hot-reload them).

## Local development

```
cp .env.example .env.local   # fill in the values
npm run dev
```

## Seeing who watched what

Query the database directly (Neon/Supabase SQL editor), e.g.:

```sql
select access_code, email, video_slug, confirmed_at
from video_confirmations
order by confirmed_at desc;
```

See `schema.sql` for a couple more example queries. If you want an in-app
dashboard instead of querying the database by hand, that's a natural next
addition — just ask.
