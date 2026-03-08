import { MetricCard } from "@/components/ui/metric-card";
import { PageHeader } from "@/components/ui/page-header";
import { ProgressCard } from "@/components/ui/progress-card";

export default function DashboardMetricsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Metrics" description="Account-level performance and risk telemetry for TFD-2049." action={<button className="btn-secondary">Switch account</button>} />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Starting balance" value="$100,000" note="Initial challenge capital" />
        <MetricCard label="Equity" value="$102,145" note="Updated 4m ago" />
        <MetricCard label="Current P/L" value="+$2,145" note="Open + closed positions" />
        <MetricCard label="Phase" value="Phase 1" note="Status: active" status="active" />
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <ProgressCard label="Profit target remaining" value="$5,855" progress={42} />
        <ProgressCard label="Daily loss remaining" value="$2,430" progress={61} />
        <ProgressCard label="Max loss remaining" value="$6,980" progress={78} />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <article className="panel p-6">
          <h3 className="text-lg font-semibold text-white">Account summary</h3>
          <dl className="mt-4 grid grid-cols-2 gap-3 text-sm text-muted">
            <div><dt>Trading days</dt><dd className="mt-1 text-white">17 / 20</dd></div>
            <div><dt>Status</dt><dd className="mt-1 text-white">Active</dd></div>
            <div><dt>Best day</dt><dd className="mt-1 text-white">+$1,140</dd></div>
            <div><dt>Worst day</dt><dd className="mt-1 text-white">-$620</dd></div>
          </dl>
        </article>
        <article className="panel p-6">
          <h3 className="text-lg font-semibold text-white">Account rules</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            <li>• Profit target: 8%</li>
            <li>• Daily drawdown: 5%</li>
            <li>• Max drawdown: 10%</li>
            <li>• Minimum trading days: 20</li>
          </ul>
        </article>
      </div>
    </div>
  );
}
