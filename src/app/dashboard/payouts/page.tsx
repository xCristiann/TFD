import { DataTable } from "@/components/ui/data-table";
import { PageHeader } from "@/components/ui/page-header";

export default function DashboardPayoutsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Payouts" description="Submit and track payout requests from funded accounts." action={<button className="btn-primary">Request payout</button>} />
      <DataTable
        columns={["Request ID", "Account", "Amount", "Status", "Submitted", "Processed"]}
        rows={[
          ["P-8911", "TFD-1832", "$3,200", "Approved", "2026-03-01", "2026-03-03"],
          ["P-8820", "TFD-1832", "$3,050", "Review", "2026-02-14", "-"],
          ["P-8700", "TFD-1701", "$2,900", "Paid", "2026-01-24", "2026-01-26"]
        ]}
      />
    </div>
  );
}
