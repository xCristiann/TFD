import { DataTable } from "@/components/ui/data-table";
import { FilterBar } from "@/components/ui/filter-bar";
import { PageHeader } from "@/components/ui/page-header";

export default function AdminClientsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Clients" description="Client lifecycle, status history, and intervention visibility." />
      <FilterBar filters={["All", "KYC pending", "At risk", "Funded", "VIP"]} />
      <DataTable
        columns={["Client", "Email", "Accounts", "Last activity", "Status", "Owner"]}
        rows={[
          ["J. Morgan", "jmorgan@mail.com", "3", "12m ago", "Funded", "Ops-12"],
          ["S. Patel", "spatel@mail.com", "2", "1h ago", "KYC pending", "Ops-8"],
          ["R. Silva", "rsilva@mail.com", "5", "3h ago", "At risk", "Ops-2"]
        ]}
      />
    </div>
  );
}
