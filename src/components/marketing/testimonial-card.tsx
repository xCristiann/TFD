interface TestimonialCardProps {
  quote: string;
  name: string;
  payout: string;
}

export function TestimonialCard({ quote, name, payout }: TestimonialCardProps) {
  return (
    <article className="panel p-6">
      <p className="text-sm leading-6 text-foreground/90">“{quote}”</p>
      <div className="mt-5 flex items-center justify-between">
        <p className="text-sm font-semibold text-white">{name}</p>
        <p className="rounded-full bg-accent.success/20 px-3 py-1 text-xs font-semibold text-accent.success">{payout}</p>
      </div>
    </article>
  );
}
