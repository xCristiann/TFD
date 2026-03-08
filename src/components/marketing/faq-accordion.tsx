interface FAQAccordionProps {
  items: Array<{ question: string; answer: string }>;
}

export function FAQAccordion({ items }: FAQAccordionProps) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <details key={item.question} className="panel group p-5">
          <summary className="cursor-pointer list-none pr-8 text-sm font-semibold text-white">{item.question}</summary>
          <p className="mt-3 text-sm text-muted">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
