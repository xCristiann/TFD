import { DataTable } from "@/components/ui/data-table";
import { PageHeader } from "@/components/ui/page-header";

export default function AdminReviewsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Review queue" description="Passed accounts pending compliance and operational validation." action={<button className="btn-secondary">Bulk assign</button>} />
      <DataTable
        columns={["Account", "Client", "Pass date", "Flags", "Reviewer", "Decision"]}
        rows={[
          ["TFD-1955", "A. Khan", "2026-03-07", "0", "Unassigned", "Open"],
          ["TFD-1944", "D. Ross", "2026-03-07", "1", "Ops-3", "Open"],
          ["TFD-1938", "N. Cole", "2026-03-06", "0", "Ops-11", "Approved"]
        ]}
      />
    </div>
  );
}
