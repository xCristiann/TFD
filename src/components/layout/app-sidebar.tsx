import Link from "next/link";

import type { NavItem } from "@/types";

interface AppSidebarProps {
  items: NavItem[];
}

export function AppSidebar({ items }: AppSidebarProps) {
  return (
    <aside className="w-60 shrink-0 rounded-xl border border-slate-200 bg-white p-4">
      <nav className="space-y-2">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
