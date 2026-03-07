# TheFundedDiaries

Build a simulator-first proprietary trading platform with full internal CRM.

Stack:
- Next.js 14
- TypeScript
- Tailwind CSS
- Supabase
- Stripe

Core requirements:
- Full client dashboard
- Full admin backoffice
- Internal CRM for clients and admins
- Multi-account support per client
- Metrics linked to selected account
- Risk engine with daily drawdown, max drawdown, and profit target
- Auto lock account when target is reached
- Move passed accounts to review
- Review queue for admin
- Payout request and payout review flow
- Challenge purchase flow
- Simulator-first trade ingestion

Rules:
- Keep code modular and production-oriented
- Reuse components when possible
- Use strict TypeScript
- Prefer server-side patterns where appropriate
- Do not make unnecessary unrelated changes
- After each task, summarize changed files and remaining blockers
