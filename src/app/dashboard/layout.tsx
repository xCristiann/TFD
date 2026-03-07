import type { ReactNode } from "react";

import { AppShell } from "@/components/layout/app-shell";
import { dashboardNav } from "@/lib/navigation/routes";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <AppShell title="Client Dashboard" navItems={dashboardNav}>
      {children}
    </AppShell>
  );
}
