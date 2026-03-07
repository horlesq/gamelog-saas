# GameLog SaaS

A modern Next.js SaaS application to track your gaming journey — log games you've played, plan what to play next, and get personalized AI suggestions.

<img width="1467" height="839" alt="GameLog Dashboard" src="https://github.com/user-attachments/assets/cd0e6ea0-d32c-46f9-be8d-23d7a0209447" />

## Features

- **Game Tracking**: Search and log games using the RAWG database (500k+ games)
- **Status Management**: Track progress (Plan to Play, Playing, Completed, Dropped, etc.)
- **Ratings & Notes**: Rate your games, track hours played, and keep personal notes
- **AI Suggestions**: Get personalized game recommendations powered by Groq LLM
- **Analytics & Custom Filters**: Advanced insights and dynamic custom filters (PRO tier and above)
- **SaaS Subscriptions**: Role and Tier-based access control with Polar.sh
- **Data Export**: Export your game library as CSV
- **Secure Authentication**: Built-in credential-based JWT authentication

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4, Framer Motion, Radix UI (Primitives)
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Payments & Subscriptions**: Polar.sh
- **AI & Data**: Groq API, RAWG API

## Quick Start (Development Setup)

### Prerequisites

- Node.js 18+
- PostgreSQL database (local or remote, e.g., Supabase / Neon)
- [Polar.sh](https://polar.sh) account for subscription webhooks
- API Keys: [RAWG](https://rawg.io/apidocs), [Groq](https://console.groq.com/keys)

### 1. Clone & Install

```bash
git clone https://github.com/horlesq/gamelog-saas.git
cd gamelog-saas
npm install
```

### 2. Environment Variables

Create a `.env` file in the root directory based on `.env.example` (if present), or define the following required variables:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/gamelog_saas"
DATABASE_URL_UNPOOLED="postgresql://user:password@localhost:5432/gamelog_saas"

# Auth (generate a secure random string)
JWT_SECRET="your-super-secret-jwt-key"

# External APIs
RAWG_API_KEY="your_rawg_api_key_here"
GROQ_API_KEY="your_groq_api_key_here"

# Polar.sh (Subscriptions)
POLAR_ACCESS_TOKEN="your_polar_access_token"
POLAR_WEBHOOK_SECRET="your_polar_webhook_secret"
NEXT_PUBLIC_POLAR_ORGANIZATION_ID="your_org_id"
```

### 3. Database Setup

Apply the Prisma schema and migrations to your PostgreSQL database:

```bash
npx prisma generate
npx prisma db push
```

_(Note: If using Prisma migrations, run `npx prisma migrate dev` instead)._

### 4. Run the App

Start the Next.js development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Built-In Default Accounts

You can register a new account on the website or create a user manually.
By default, the application uses JWT token-based auth.
For local testing of **PRO/ULTRA** features without Polar.sh webhooks, you can manually update a User's `plan` in the database to `PRO` or `ULTRA`, or set their `isAdmin` flag to `true`.

## Subscription Setup (Polar.sh)

1. Create Products and Pricing tiers in your Polar.sh dashboard (e.g., Free, Pro, Ultra).
2. Configure a Polar.sh Webhook endpoint pointing to `https://your-domain.com/api/webhooks/polar` for `subscription.created`, `subscription.updated`, and `subscription.canceled` events.
3. Use the Polar CLI or ngrok locally to test webhooks and upgrade user plans in your local database.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
