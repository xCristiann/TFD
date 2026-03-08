import type { ReactNode } from "react";

import { AppShell } from "@/components/layout/app-shell";
import { adminNav } from "@/lib/navigation/routes";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AppShell title="Admin Backoffice" subtitle="Monitor operations, reviews, payouts, and CRM workflows." navItems={adminNav} sectionLabel="Operations">
      {children}
    </AppShell>
  );
}
