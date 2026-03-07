import type { ReactNode } from "react";

import { AppShell } from "@/components/layout/app-shell";
import { adminNav } from "@/lib/navigation/routes";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AppShell title="Admin Backoffice" navItems={adminNav}>
      {children}
    </AppShell>
  );
}
