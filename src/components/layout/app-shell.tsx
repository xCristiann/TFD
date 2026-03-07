import type { ReactNode } from "react";

import { AppSidebar } from "@/components/layout/app-sidebar";
import type { NavItem } from "@/types";

interface AppShellProps {
  title: string;
  navItems: NavItem[];
  children: ReactNode;
}

export function AppShell({ title, navItems, children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white px-6 py-4">
        <h1 className="text-xl font-semibold text-slate-900">{title}</h1>
      </header>
      <div className="mx-auto flex w-full max-w-7xl gap-6 px-6 py-6">
        <AppSidebar items={navItems} />
        <main className="flex-1 rounded-xl border border-slate-200 bg-white p-6">{children}</main>
      </div>
    </div>
  );
}
