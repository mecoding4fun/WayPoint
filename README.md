# Waypoint — Job Application Tracker

A full-stack SaaS job application tracker, built as a learning project to go from "I can code" to "I can ship a real product" — auth, a real database, billing, and a full CRUD loop, deployed and working end to end.

**Live demo:** [your-vercel-url.vercel.app](#) — coming soon
**Tech stack:** Next.js (App Router) · TypeScript · Tailwind CSS · Prisma · Supabase (Postgres) · Clerk · Stripe · Vercel

---

## Why I built this

Job hunting is chaotic — tabs, spreadsheets, half-remembered follow-ups. Waypoint puts every application on one visible pipeline (Applied → Interview → Offer → Closed), so momentum doesn't depend on memory.

I built it specifically to learn how a real SaaS product is put together: not just CRUD, but authentication, a relational database, a genuine payment/subscription flow, and the judgment calls that come with building something for real users.

## Features

- **Auth** — email/password and Google sign-in via Clerk, with protected routes
- **Kanban-style dashboard** — applications grouped by status, with live counts and a pipeline overview
- **Full CRUD** — add, view, edit, and delete applications through modals, backed by a real Postgres database
- **Live search** — filter your applications by company or role, client-side
- **Stats & insights** — total applications, active interviews, offers, and a computed response rate
- **Upcoming interview highlight** — automatically surfaces your soonest scheduled interview
- **Profile page** — account management (via Clerk) alongside your personal job-search stats
- **Settings** — reset your data or delete your account entirely
- **Subscription billing** — a real Stripe Checkout + webhook flow that upgrades a user's plan on successful payment

## A product decision worth mentioning

Early on, I almost built this with a standard "free tier capped, pay to unlock more" model — the typical SaaS playbook. But job seekers are often actively trying to *reduce* spending, and gatekeeping the core tool behind a paywall felt tone-deaf for this audience.

Instead: the **free tier is fully unlimited** — every core feature, no caps. The **Pro tier is framed as optional convenience** (automated follow-up reminders, CSV export), not something you *need* to use the product well. The Stripe integration is 100% real and functional either way — I just made a judgment call about where the paywall line should sit, given who'd actually be using this.

## Tech stack, and why

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js (App Router) | One codebase for frontend + backend (API routes), Server Components for direct DB access |
| Language | TypeScript | Catches schema/prop mismatches at compile time, not runtime |
| Styling | Tailwind CSS | Fast iteration, consistent design tokens |
| Database | Supabase (Postgres) | Hosted relational DB — no local setup, generous free tier |
| ORM | Prisma | Type-safe queries and migrations against Postgres |
| Auth | Clerk | Production-grade auth without hand-rolling security-sensitive code |
| Payments | Stripe | Industry-standard Checkout + webhooks for subscriptions |
| Hosting | Vercel | Zero-config deploys for Next.js |

## Architecture notes

- **Server Components fetch data directly** (`await prisma.application.findMany(...)`) — no separate API call needed for the initial page load.
- **Client Components are used sparingly**, only where interactivity is required (modals, forms, the search bar) — kept as small, focused wrappers around otherwise-static UI.
- **Every write operation is double-checked server-side.** The UI hides actions a user shouldn't see (e.g. a locked Pro feature), but the API routes independently verify ownership and plan status before touching the database — so a user can't bypass restrictions by hitting an API route directly.
- **Stripe's webhook is the source of truth for plan status**, not the client-side checkout redirect — a payment isn't considered "complete" until Stripe confirms it server-to-server via `checkout.session.completed`.

## Running locally

```bash
git clone <this-repo>
cd job-tracker
npm install
```

Create a `.env` file with:
```
DATABASE_URL=
DIRECT_URL=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_PRO_PRICE_ID=
STRIPE_WEBHOOK_SECRET=
```

```bash
npx prisma generate
npx prisma migrate dev
npm run dev
```

## What I'd build next

- Automated follow-up email reminders (needs a transactional email service + scheduled jobs)
- Drag-and-drop between board columns
- Full mobile-responsive pass
- A custom domain + Clerk production instance

---

Built by Ramachandran as a portfolio/learning project.
