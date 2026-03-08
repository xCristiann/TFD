import type { ReactNode } from "react";

import { AppSidebar } from "@/components/layout/app-sidebar";
import { Topbar } from "@/components/layout/topbar";
import type { NavItem } from "@/types";

interface AppShellProps {
  title: string;
  subtitle: string;
  navItems: NavItem[];
  sectionLabel: string;
  children: ReactNode;
}

export function AppShell({ title, subtitle, navItems, sectionLabel, children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-hero-gradient">
      <div className="mx-auto flex w-full max-w-[1300px] gap-5 p-4 md:p-6">
        <AppSidebar items={navItems} sectionLabel={sectionLabel} />
        <main className="min-w-0 flex-1">
          <Topbar title={title} subtitle={subtitle} />
          <div className="space-y-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
