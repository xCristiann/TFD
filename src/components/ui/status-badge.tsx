interface StatusBadgeProps {
  status: "active" | "review" | "funded" | "locked" | "pending";
}

const toneMap: Record<StatusBadgeProps["status"], string> = {
  active: "bg-accent/15 text-accent",
  review: "bg-accent.warning/15 text-accent.warning",
  funded: "bg-accent.success/15 text-accent.success",
  locked: "bg-accent.danger/15 text-accent.danger",
  pending: "bg-white/10 text-muted"
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${toneMap[status]}`}>{status}</span>;
}
