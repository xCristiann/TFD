import type { NavItem } from "@/types";

export const publicNav: NavItem[] = [
  { label: "Programs", href: "/programs" },
  { label: "FAQ", href: "/faq" },
  { label: "Login", href: "/login" },
  { label: "Register", href: "/register" }
];

export const dashboardNav: NavItem[] = [
  { label: "Overview", href: "/dashboard" },
  { label: "Accounts", href: "/dashboard/accounts" },
  { label: "Metrics", href: "/dashboard/metrics" },
  { label: "Payouts", href: "/dashboard/payouts" },
  { label: "Profile", href: "/dashboard/profile" }
];

export const adminNav: NavItem[] = [
  { label: "Overview", href: "/admin" },
  { label: "Clients", href: "/admin/clients" },
  { label: "Accounts", href: "/admin/accounts" },
  { label: "Reviews", href: "/admin/reviews" },
  { label: "Payouts", href: "/admin/payouts" },
  { label: "CRM", href: "/admin/crm" }
];
