import Link from "next/link";

import { publicNav } from "@/lib/navigation/routes";

export function SiteHeader() {
  return (
    <header className="border-b border-line/80">
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-6 py-5">
        <Link href="/" className="text-lg font-semibold tracking-wide text-white">TheFundedDiaries</Link>
        <nav className="hidden gap-6 text-sm text-muted md:flex">
          {publicNav.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-white">{item.label}</Link>
          ))}
        </nav>
        <Link href="/register" className="btn-secondary hidden md:block">Start now</Link>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-line">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-2 px-6 py-10 text-sm text-muted md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} TheFundedDiaries. Built for serious traders.</p>
        <p>Trust • Risk controls • Verified payouts</p>
      </div>
    </footer>
  );
}
