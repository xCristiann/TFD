interface ProgressCardProps {
  label: string;
  value: string;
  progress: number;
}

export function ProgressCard({ label, value, progress }: ProgressCardProps) {
  return (
    <article className="panel p-5">
      <div className="flex items-center justify-between text-sm">
        <p className="text-muted">{label}</p>
        <span className="font-medium text-white">{value}</span>
      </div>
      <div className="mt-3 h-2 rounded-full bg-white/10">
        <div className="h-2 rounded-full bg-accent" style={{ width: `${Math.max(0, Math.min(100, progress))}%` }} />
      </div>
    </article>
  );
}
