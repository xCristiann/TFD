import { FAQAccordion } from "@/components/marketing/faq-accordion";
import { SiteFooter, SiteHeader } from "@/components/marketing/site-chrome";
import { SectionHeader } from "@/components/ui/section-header";

const questions = [
  { question: "What happens when I pass the challenge?", answer: "Passed accounts move into the review queue, where compliance and risk teams verify trading behavior before funding." },
  { question: "When is an account locked?", answer: "Accounts are automatically locked if the daily or max drawdown rule is breached, or if configured account targets are reached." },
  { question: "Can admins manage client notes and actions?", answer: "Yes. The internal CRM includes notes, statuses, and operational context for all client and account records." },
  { question: "How is payout eligibility checked?", answer: "Eligibility is determined by account phase, consistency checks, and current rule adherence inside the risk workflow." }
];

export default function FAQPage() {
  return (
    <div>
      <SiteHeader />
      <main className="mx-auto w-full max-w-[960px] space-y-10 px-6 py-14">
        <SectionHeader eyebrow="FAQ" title="Program and operations answers." description="Transparent policies, strict controls, and operational clarity to support trusted trader relationships." />
        <FAQAccordion items={questions} />
      </main>
      <SiteFooter />
    </div>
  );
}
