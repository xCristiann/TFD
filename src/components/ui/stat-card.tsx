interface StatCardProps {
  label: string;
  value: string;
  delta?: string;
}

export function StatCard({ label, value, delta }: StatCardProps) {
  return (
    <article className="panel p-5">
      <p className="text-xs uppercase tracking-wide text-muted">{label}</p>
      <p className="mt-3 text-2xl font-semibold text-white">{value}</p>
      {delta ? <p className="mt-2 text-xs text-accent.success">{delta}</p> : null}
    </article>
  );
}
