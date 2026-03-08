interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description: string;
}

export function SectionHeader({ eyebrow, title, description }: SectionHeaderProps) {
  return (
    <div className="space-y-3">
      {eyebrow ? <p className="text-xs uppercase tracking-[0.25em] text-accent">{eyebrow}</p> : null}
      <h2 className="text-3xl font-semibold text-white">{title}</h2>
      <p className="max-w-3xl text-sm text-muted">{description}</p>
    </div>
  );
}
