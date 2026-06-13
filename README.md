# HackLab Site

Next.js App Router + TypeScript website for 株式会社ハックラボ / HackLab Inc.

The site presents AI-assisted custom development, Web system development, mobile app development, programming education, case studies, blog content, careers, and contact flows. It also includes a small admin area backed by PostgreSQL and Prisma.

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- CSS Modules
- Framer Motion
- Prisma 7 with PostgreSQL
- pnpm

## Getting Started

Install dependencies:

```bash
pnpm install
```

Start the local development server:

```bash
pnpm dev
```

The default local URL is `http://localhost:3000`.

## Commands

- `pnpm dev` - start the local Next.js dev server
- `pnpm build` - build the production app
- `pnpm start` - run the built production app
- `pnpm lint` - run ESLint
- `pnpm typecheck` - run TypeScript checks
- `pnpm seed:admin` - create or update the initial admin user

## Environment

Create `new/.env` locally. Do not commit local secrets.

Required values:

- `DATABASE_URL` - PostgreSQL connection string used by Prisma and the app

Admin seed values:

- `ADMIN_EMAIL` - email address for the initial admin user
- `ADMIN_INITIAL_PASSWORD` - password for the initial admin user

## Main Routes

- `/` - corporate home page
- `/services` - service overview
- `/services/ai-development` - AI-assisted custom development
- `/services/mobile` - mobile app development
- `/services/web` - Web system development
- `/works` - case studies
- `/company` - company profile
- `/school` - programming education
- `/blog` - blog posts
- `/careers` - recruiting
- `/contact` - contact form
- `/privacy` - privacy policy
- `/lp/ai-development` - AI development landing page
- `/admin` - admin dashboard

## API Routes

- `GET /api/health`
- `POST /api/contact`

## Metadata And SEO

Global metadata lives in `app/layout.tsx`.

Current production URL:

- `https://hacklab.jp`

Public crawl files:

- `public/robots.txt`
- `public/sitemap.xml`

Social preview assets:

- `public/og-image.jpg` - Open Graph and Twitter preview image
- `public/assets/hero-engineers-discussion.mp4` - hero background video, also exposed as Open Graph video
- `public/assets/hero-engineers-discussion-poster.jpg` - poster and fallback image for the hero video

## Content And Data

Database models are defined in `prisma/schema.prisma`. Seed scripts live in `prisma/seed.ts` and `prisma/seed-admin.ts`.
