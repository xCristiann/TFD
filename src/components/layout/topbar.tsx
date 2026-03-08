interface TopbarProps {
  title: string;
  subtitle: string;
}

export function Topbar({ title, subtitle }: TopbarProps) {
  return (
    <header className="mb-6 rounded-2xl border border-line bg-gradient-to-r from-white/5 to-transparent p-4 md:p-5">
      <p className="text-xs uppercase tracking-[0.2em] text-muted">Operational dashboard</p>
      <h1 className="mt-2 text-2xl font-semibold text-white">{title}</h1>
      <p className="mt-1 text-sm text-muted">{subtitle}</p>
    </header>
  );
}
