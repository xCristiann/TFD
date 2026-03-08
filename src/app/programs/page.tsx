import { ChallengeCard } from "@/components/marketing/challenge-card";
import { SiteFooter, SiteHeader } from "@/components/marketing/site-chrome";
import { SectionHeader } from "@/components/ui/section-header";

const models = [
  { title: "Starter", price: "$79", allocation: "$10,000", rules: ["8% profit target", "5% daily loss", "10% max loss"] },
  { title: "Professional", price: "$249", allocation: "$100,000", rules: ["10% profit target", "4% daily loss", "8% max loss"] },
  { title: "Institutional", price: "$499", allocation: "$250,000", rules: ["12% profit target", "4% daily loss", "8% max loss"] }
];

export default function ProgramsPage() {
  return (
    <div>
      <SiteHeader />
      <main className="mx-auto w-full max-w-[1200px] space-y-10 px-6 py-14">
        <SectionHeader eyebrow="Programs" title="Evaluation programs designed for consistency and scale." description="Every model includes real-time risk monitoring, account-level metrics, and post-pass review workflows." />
        <div className="grid gap-5 lg:grid-cols-3">
          {models.map((model) => (
            <ChallengeCard key={model.title} {...model} />
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
