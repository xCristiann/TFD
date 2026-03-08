import { DataTable } from "@/components/ui/data-table";
import { PageHeader } from "@/components/ui/page-header";
import { ProgressCard } from "@/components/ui/progress-card";
import { StatCard } from "@/components/ui/stat-card";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Overview" description="A live snapshot of your active evaluations and funded accounts." action={<button className="btn-secondary">Request support</button>} />
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Active accounts" value="4" delta="+1 this week" />
        <StatCard label="Total equity" value="$181,320" delta="+4.8% month-over-month" />
        <StatCard label="Pending payouts" value="$6,250" delta="2 requests in review" />
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <ProgressCard label="Profit target completion" value="72%" progress={72} />
        <ProgressCard label="Daily loss buffer" value="$2,430 remaining" progress={61} />
        <ProgressCard label="Max drawdown buffer" value="$6,980 remaining" progress={78} />
      </div>
      <DataTable
        columns={["Account", "Phase", "Status", "P/L", "Next milestone"]}
        rows={[
          ["TFD-2049", "Phase 1", "Active", "+$2,145", "10% target"],
          ["TFD-1955", "Phase 2", "Review", "+$8,310", "Compliance review"],
          ["TFD-1832", "Funded", "Active", "+$4,600", "Payout window opens in 2d"]
        ]}
      />
    </div>
  );
}
