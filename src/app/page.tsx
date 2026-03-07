import Link from "next/link";

import { publicNav } from "@/lib/navigation/routes";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col justify-center gap-6 px-6">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-slate-900">TheFundedDiaries</h1>
        <p className="text-slate-600">Production-ready foundation scaffold for client and admin trading operations.</p>
      </div>

      <div className="flex gap-3">
        {publicNav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
          >
            {item.label}
          </Link>
        ))}
        <Link href="/dashboard" className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700">
          Go to Dashboard
        </Link>
      </div>
    </main>
  );
}
