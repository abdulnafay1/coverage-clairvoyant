import { useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useClaim } from "@/contexts/ClaimContext";

const fallbackClauses = [
  { original: "The requested procedure is deemed not medically necessary", explanation: "The insurer claims the surgery isn't required.", highlight: "not medically necessary" },
  { original: "based on the documentation provided at the time of review.", explanation: "Documents submitted didn't prove the need.", highlight: "documentation provided" },
  { original: "The member's plan excludes coverage for elective procedures", explanation: "Plan classifies this as 'elective' — can be challenged.", highlight: "elective procedures" },
  { original: "unless prior authorization is obtained.", explanation: "Prior auth was required but not completed.", highlight: "prior authorization" },
];

export default function DenialBreakdown() {
  const { analysis } = useClaim();
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const denialClauses = analysis?.denialBreakdown?.clauses ?? fallbackClauses;

  return (
    <section aria-labelledby="denial-heading">
      <h2 id="denial-heading" className="text-xl font-bold text-foreground mb-6">Denial Breakdown</h2>
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Original Denial Letter</h3>
          <div className="space-y-3 text-sm leading-relaxed text-foreground">
            <p className="text-muted-foreground">Dear Member,</p>
            <p className="text-muted-foreground">After careful review of your claim, we regret to inform you that:</p>
            {denialClauses.map((clause, i) => (
              <Tooltip key={i}>
                <TooltipTrigger asChild>
                  <p
                    tabIndex={0}
                    role="button"
                    aria-label={`Denial clause: ${clause.highlight}. Activate or hover for explanation.`}
                    className={`cursor-pointer transition-colors duration-200 rounded px-1 -mx-1 ${
                      hoveredIdx === i ? "bg-amber-light" : "hover:bg-muted"
                    }`}
                    onMouseEnter={() => setHoveredIdx(i)}
                    onMouseLeave={() => setHoveredIdx(null)}
                    onFocus={() => setHoveredIdx(i)}
                    onBlur={() => setHoveredIdx(null)}
                  >
                    {clause.original.split(clause.highlight).map((part, pi, arr) => (
                      <span key={pi}>
                        {part}
                        {pi < arr.length - 1 && (
                          <span className="font-semibold text-destructive underline decoration-dotted underline-offset-4">
                            {clause.highlight}
                          </span>
                        )}
                      </span>
                    ))}
                  </p>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-xs text-sm">
                  {clause.explanation}
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Plain English Explanation</h3>
          <div className="space-y-4">
            {denialClauses.map((clause, i) => (
              <div
                key={i}
                className={`p-4 rounded-lg border transition-all duration-200 ${
                  hoveredIdx === i ? "border-accent bg-emerald-light shadow-glow" : "border-border"
                }`}
                aria-current={hoveredIdx === i ? "true" : undefined}
              >
                <p className="text-sm font-medium text-foreground mb-1">"{clause.highlight}"</p>
                <p className="text-sm text-muted-foreground">{clause.explanation}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
