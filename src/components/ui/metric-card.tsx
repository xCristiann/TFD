import { StatusBadge } from "@/components/ui/status-badge";

interface MetricCardProps {
  label: string;
  value: string;
  note: string;
  status?: "active" | "review" | "funded" | "locked" | "pending";
}

export function MetricCard({ label, value, note, status }: MetricCardProps) {
  return (
    <article className="panel p-5">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs uppercase tracking-wide text-muted">{label}</p>
        {status ? <StatusBadge status={status} /> : null}
      </div>
      <p className="mt-3 text-2xl font-semibold text-white">{value}</p>
      <p className="mt-1 text-xs text-muted">{note}</p>
    </article>
  );
}
