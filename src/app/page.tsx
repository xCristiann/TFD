import Link from "next/link";

import { ChallengeCard } from "@/components/marketing/challenge-card";
import { FAQAccordion } from "@/components/marketing/faq-accordion";
import { SiteFooter, SiteHeader } from "@/components/marketing/site-chrome";
import { TestimonialCard } from "@/components/marketing/testimonial-card";
import { SectionHeader } from "@/components/ui/section-header";

const challengeModels = [
  { title: "Evaluation", price: "$99", allocation: "$25,000", rules: ["8% target", "5% daily drawdown", "10% max drawdown"] },
  { title: "Pro", price: "$249", allocation: "$100,000", rules: ["10% target", "4% daily drawdown", "8% max drawdown"] },
  { title: "Scale", price: "$449", allocation: "$200,000", rules: ["12% target", "4% daily drawdown", "8% max drawdown"] }
];

const faqs = [
  { question: "How quickly are payouts processed?", answer: "Approved payout requests are released within 24-48 business hours after compliance verification." },
  { question: "Can I manage multiple accounts?", answer: "Yes. Traders can manage multiple active challenge and funded accounts from one dashboard." },
  { question: "How are risk rules enforced?", answer: "Our real-time risk engine tracks equity, daily drawdown, and max drawdown to lock violating accounts automatically." }
];

export default function Home() {
  return (
    <div>
      <SiteHeader />
      <main className="mx-auto w-full max-w-[1200px] space-y-16 px-6 py-14">
        <section className="panel bg-hero-gradient p-10 md:p-14">
          <p className="text-xs uppercase tracking-[0.25em] text-accent">Simulator-first prop trading</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight text-white md:text-5xl">Institutional-grade funding programs for disciplined traders.</h1>
          <p className="mt-5 max-w-2xl text-base text-muted">Pass structured evaluations, receive funded capital, and manage performance with enterprise-grade metrics, risk controls, and payout operations.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/register" className="btn-primary">Start challenge</Link>
            <Link href="/programs" className="btn-secondary">View programs</Link>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              ["$12.8M+", "Processed payouts"],
              ["34,000+", "Trader accounts"],
              ["99.95%", "Platform uptime"]
            ].map(([value, label]) => (
              <div key={label} className="rounded-xl border border-line bg-black/20 p-4">
                <p className="text-2xl font-semibold text-white">{value}</p>
                <p className="text-xs text-muted">{label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-8">
          <SectionHeader eyebrow="Platform" title="Built for execution, risk discipline, and operational trust." description="Access account-level metrics, payout workflows, and rule monitoring with clear operational visibility for every trading phase." />
          <div className="grid gap-4 md:grid-cols-3">
            {["TradingView & MT integration", "Live risk engine and account locks", "Backoffice review queue and CRM"].map((item) => (
              <div key={item} className="panel p-5 text-sm text-muted">{item}</div>
            ))}
          </div>
        </section>

        <section className="space-y-8">
          <SectionHeader eyebrow="Programs" title="Choose your challenge model." description="Flexible evaluation pathways aligned to position sizing, risk appetite, and capital goals." />
          <div className="grid gap-5 lg:grid-cols-3">
            {challengeModels.map((model) => (
              <ChallengeCard key={model.title} {...model} />
            ))}
          </div>
        </section>

        <section className="space-y-8">
          <SectionHeader eyebrow="Proof" title="Payout credibility you can verify." description="Structured review workflows ensure consistent and transparent payout operations for funded traders." />
          <div className="grid gap-5 md:grid-cols-3">
            <TestimonialCard quote="The dashboard gives me exact drawdown and target visibility before every session." name="A. Rahman" payout="$18,700 paid" />
            <TestimonialCard quote="Fast payout review and clear account states made scaling straightforward." name="L. Brooks" payout="$24,120 paid" />
            <TestimonialCard quote="I can manage all challenge accounts with one clean operational flow." name="M. Nguyen" payout="$31,900 paid" />
          </div>
        </section>

        <section className="space-y-8">
          <SectionHeader eyebrow="FAQ" title="Important answers before you begin." description="Clear program structure, strict risk logic, and payout consistency for serious prop traders." />
          <FAQAccordion items={faqs} />
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
