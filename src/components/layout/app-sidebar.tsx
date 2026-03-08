"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type { NavItem } from "@/types";

interface AppSidebarProps {
  items: NavItem[];
  sectionLabel: string;
}

export function AppSidebar({ items, sectionLabel }: AppSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="panel hidden w-72 shrink-0 p-4 lg:block">
      <p className="mb-3 px-3 text-xs uppercase tracking-[0.2em] text-muted">{sectionLabel}</p>
      <nav className="space-y-1">
        {items.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded-xl px-3 py-2.5 text-sm font-medium transition ${active ? "bg-accent text-white shadow-soft" : "text-muted hover:bg-white/5 hover:text-white"}`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
