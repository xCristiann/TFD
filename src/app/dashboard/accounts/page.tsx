import { DataTable } from "@/components/ui/data-table";
import { EmptyState } from "@/components/ui/empty-state";
import { FilterBar } from "@/components/ui/filter-bar";
import { PageHeader } from "@/components/ui/page-header";

export default function DashboardAccountsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Accounts" description="Manage challenge and funded accounts with clear phase and rule visibility." action={<button className="btn-primary">New challenge</button>} />
      <FilterBar filters={["All", "Phase 1", "Phase 2", "Review", "Funded", "Locked"]} />
      <DataTable
        columns={["Account", "Model", "Balance", "Phase", "Status", "Created"]}
        rows={[
          ["TFD-2049", "$100k Pro", "$102,145", "Phase 1", "Active", "2026-02-12"],
          ["TFD-1955", "$200k Scale", "$208,310", "Review", "Pending", "2026-01-30"],
          ["TFD-1832", "$100k Pro", "$104,600", "Funded", "Active", "2025-12-20"]
        ]}
      />
      <EmptyState title="Account archive is empty" description="Closed or breached accounts will appear here for downloadable reporting." />
    </div>
  );
}
