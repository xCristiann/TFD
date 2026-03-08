import { DataTable } from "@/components/ui/data-table";
import { PageHeader } from "@/components/ui/page-header";

export default function AdminAccountsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Accounts" description="Global account state transitions and risk lock monitoring." />
      <DataTable
        columns={["Account", "Client", "Program", "Phase", "Equity", "Rule state"]}
        rows={[
          ["TFD-2049", "J. Morgan", "$100k Pro", "Phase 1", "$102,145", "Within limits"],
          ["TFD-1988", "R. Silva", "$200k Scale", "Phase 2", "$196,550", "Daily DD warning"],
          ["TFD-1901", "S. Patel", "$100k Pro", "Locked", "$93,100", "Max DD breached"]
        ]}
      />
    </div>
  );
}
