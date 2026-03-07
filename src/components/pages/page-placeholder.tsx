interface PagePlaceholderProps {
  title: string;
  description: string;
}

export function PagePlaceholder({ title, description }: PagePlaceholderProps) {
  return (
    <section className="space-y-3">
      <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>
      <p className="max-w-2xl text-sm text-slate-600">{description}</p>
      <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-500">
        Module wiring is complete; business workflows can be implemented here next.
      </div>
    </section>
  );
}
