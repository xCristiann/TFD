interface ChallengeCardProps {
  title: string;
  price: string;
  allocation: string;
  rules: string[];
}

export function ChallengeCard({ title, price, allocation, rules }: ChallengeCardProps) {
  return (
    <article className="panel p-6">
      <p className="text-xs uppercase tracking-[0.2em] text-accent">{title}</p>
      <p className="mt-4 text-3xl font-semibold text-white">{allocation}</p>
      <p className="mt-1 text-sm text-muted">One-time fee {price}</p>
      <ul className="mt-5 space-y-2 text-sm text-muted">
        {rules.map((rule) => (
          <li key={rule}>• {rule}</li>
        ))}
      </ul>
      <button className="btn-primary mt-6 w-full">Start challenge</button>
    </article>
  );
}
