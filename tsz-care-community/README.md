# TSZ Care Community

Professional eldercare membership ecosystem: public landing page, authenticated member portal, private Root chat, news/media board, document library, uploads/download tracking, notifications and audit logs.

## Stack

- Next.js App Router + TypeScript
- Supabase Auth, Postgres, Realtime and Storage
- Vercel hosting
- Gmail notification destination for Root
- Google Drive/Docs/Sheets operating documentation

## Local setup

1. Copy `.env.example` to `.env.local`.
2. Fill the Supabase URL and publishable key.
3. Run `npm install` and `npm run dev`.

Database migration is maintained in `supabase/migrations/` after the live project schema is verified.
