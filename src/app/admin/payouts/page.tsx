import { DataTable } from "@/components/ui/data-table";
import { FilterBar } from "@/components/ui/filter-bar";
import { PageHeader } from "@/components/ui/page-header";

export default function AdminPayoutsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Payout management" description="Review payout requests with account context and policy controls." />
      <FilterBar filters={["All", "New", "In review", "Approved", "Rejected"]} />
      <DataTable
        columns={["Request", "Client", "Account", "Amount", "Risk check", "Status"]}
        rows={[
          ["P-8911", "J. Morgan", "TFD-1832", "$3,200", "Pass", "Approved"],
          ["P-8820", "L. Brooks", "TFD-1790", "$5,000", "Pending", "In review"],
          ["P-8792", "M. Nguyen", "TFD-1772", "$2,600", "Pass", "Paid"]
        ]}
      />
    </div>
  );
}
