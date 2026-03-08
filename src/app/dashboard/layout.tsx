import type { ReactNode } from "react";

import { AppShell } from "@/components/layout/app-shell";
import { dashboardNav } from "@/lib/navigation/routes";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <AppShell title="Client Dashboard" subtitle="Track challenge progress, account health, and payout readiness." navItems={dashboardNav} sectionLabel="Client workspace">
      {children}
    </AppShell>
  );
}
