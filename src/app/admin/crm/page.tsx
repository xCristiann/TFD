import { EmptyState } from "@/components/ui/empty-state";
import { PageHeader } from "@/components/ui/page-header";

export default function AdminCrmPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="CRM" description="Internal notes, follow-ups, and account context for client operations." action={<button className="btn-primary">Create note</button>} />
      <section className="panel p-6">
        <h3 className="text-lg font-semibold text-white">Client detail</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-line bg-white/5 p-4 text-sm text-muted">Recent interaction: payout query handled by Ops-9.</div>
          <div className="rounded-xl border border-line bg-white/5 p-4 text-sm text-muted">Internal tag: High consistency trader. Eligible for scaling offer.</div>
        </div>
      </section>
      <EmptyState title="No open follow-up tasks" description="Create CRM tasks for escalations, KYC requests, or retention outreach." />
    </div>
  );
}
