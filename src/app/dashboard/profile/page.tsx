import { PageHeader } from "@/components/ui/page-header";

export default function DashboardProfilePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Profile" description="Identity, security, and payout details for your trader account." />
      <section className="panel p-6">
        <h3 className="text-lg font-semibold text-white">Account information</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <label className="text-sm text-muted">Full name<input className="input-premium mt-1" defaultValue="Alex Trader" /></label>
          <label className="text-sm text-muted">Email<input className="input-premium mt-1" defaultValue="alex@trader.com" /></label>
          <label className="text-sm text-muted">Country<input className="input-premium mt-1" defaultValue="United Kingdom" /></label>
          <label className="text-sm text-muted">Payout method<input className="input-premium mt-1" defaultValue="Bank transfer" /></label>
        </div>
        <button className="btn-primary mt-5">Save updates</button>
      </section>
    </div>
  );
}
