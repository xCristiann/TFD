interface FilterBarProps {
  filters: string[];
}

export function FilterBar({ filters }: FilterBarProps) {
  return (
    <div className="panel flex flex-wrap gap-2 p-3">
      {filters.map((filter, index) => (
        <button key={filter} className={`rounded-lg px-3 py-2 text-xs font-semibold ${index === 0 ? "bg-accent text-white" : "bg-white/5 text-muted"}`}>
          {filter}
        </button>
      ))}
    </div>
  );
}
