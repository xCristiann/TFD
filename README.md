# TheFundedDiaries Foundation

Production-oriented scaffold for a simulator-first prop trading platform with client dashboard, admin backoffice, and CRM modules.

## Stack
- Next.js 14 + App Router
- TypeScript (strict)
- Tailwind CSS
- Supabase (client/server setup)
- Stripe (server SDK setup)

## Run locally
```bash
npm install
npm run dev
```

## Environment
Copy `.env.example` into `.env.local` and fill values.

## Included routes
- `/login`
- `/register`
- `/dashboard`
- `/dashboard/accounts`
- `/dashboard/metrics`
- `/dashboard/payouts`
- `/dashboard/profile`
- `/admin`
- `/admin/clients`
- `/admin/accounts`
- `/admin/reviews`
- `/admin/payouts`
- `/admin/crm`
