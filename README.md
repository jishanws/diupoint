# DIUPoint

A student marketplace platform built as a pnpm + Turbo monorepo.

## Tech Stack

| Layer        | Technologies                                   |
| ------------ | ---------------------------------------------- |
| **Frontend** | Next.js 16, React 19, TypeScript, Tailwind CSS |
| **Backend**  | NestJS, PostgreSQL, Prisma ORM                 |
| **Auth**     | JWT + Google OAuth                             |

## Monorepo Structure

```
diupoint/
├── apps/
│   ├── api/          # NestJS backend
│   └── web/          # Next.js frontend
├── packages/
│   ├── db/           # Prisma schema and utilities
│   └── types/        # Shared TypeScript types
```

## Getting Started

### Prerequisites

- Node.js v18+
- pnpm 10
- PostgreSQL

### Installation

```bash
# Install dependencies
pnpm install

# Generate Prisma client
pnpm prisma:generate

# Run database migrations
pnpm --filter @diupoint/db prisma:migrate:dev
```

### Environment Setup

Create `apps/api/.env`:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/diupoint
JWT_SECRET=your-secret-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:4000/api/auth/google/callback
FRONTEND_URL=http://localhost:3000
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-smtp-username
SMTP_PASSWORD=your-smtp-password
SMTP_FROM=no-reply@diu.edu.bd
SMTP_SECURE=false
```

## Development Commands

```bash
pnpm dev          # Run all apps in parallel
pnpm dev:web      # Run frontend only
pnpm dev:api      # Run backend only
pnpm build        # Build all apps
pnpm lint         # Lint all apps
```

## Default URLs

- **API**: http://localhost:4000/api
- **Web**: http://localhost:3000

## Key Features

- User authentication (email/password + Google OAuth)
- Marketplace listings with search
- Favorites and shopping cart
- Checkout and order management
- Store profiles
- Email verification for DIU domains
