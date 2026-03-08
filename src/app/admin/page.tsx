import { DataTable } from "@/components/ui/data-table";
import { FilterBar } from "@/components/ui/filter-bar";
import { PageHeader } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Admin overview" description="Operational health across clients, accounts, reviews, and payouts." />
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Active clients" value="2,486" />
        <StatCard label="Accounts in review" value="124" />
        <StatCard label="Pending payouts" value="39" />
        <StatCard label="Risk locks today" value="11" />
      </div>
      <FilterBar filters={["All queues", "Review queue", "Payout queue", "Risk alerts"]} />
      <DataTable
        columns={["Queue", "Items", "SLA", "Owner", "Status"]}
        rows={[
          ["Challenge reviews", "124", "< 12h", "Compliance", "Healthy"],
          ["Payout approvals", "39", "< 24h", "Finance", "Needs staffing"],
          ["Risk incidents", "11", "Immediate", "Risk", "Stable"]
        ]}
      />
    </div>
  );
}
