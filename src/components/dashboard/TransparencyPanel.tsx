import { Brain, FileText, Scale, BookOpen } from "lucide-react";
import { useClaim } from "@/contexts/ClaimContext";

const fallbackSources = [
  { label: "Policy Clauses", detail: "Standard policy section analysis" },
  { label: "CPT Code Standards", detail: "AMA CPT guidelines and clinical recommendations" },
  { label: "State Regulations", detail: "Applicable state insurance regulations" },
];

const iconMap: Record<string, any> = {
  "Policy Clauses": FileText,
  "CPT Code Standards": BookOpen,
  "State Regulations": Scale,
};

export default function TransparencyPanel() {
  const { analysis } = useClaim();

  const confidence = analysis?.transparency?.confidenceLevel ?? "High";
  const summary = analysis?.transparency?.summary ?? "CareClaim analyzed your denial letter, insurance policy, and medical documentation against CPT coding standards and state insurance regulations.";
  const sources = analysis?.transparency?.sources ?? fallbackSources;
  const reasoning = analysis?.transparency?.reasoning ?? "The AI identified key denial reasons and cross-referenced them against policy terms and medical standards.";

  return (
    <section aria-labelledby="transparency-heading">
      <h2 id="transparency-heading" className="text-xl font-bold text-foreground mb-6">AI Transparency</h2>

      <div className="rounded-xl border border-border bg-card p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl gradient-accent flex items-center justify-center" aria-hidden="true">
            <Brain className="h-5 w-5 text-accent-foreground" />
          </div>
          <div>
            <p className="font-semibold text-foreground">Confidence Level</p>
            <p className="text-sm text-emerald font-medium">{confidence}</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">{summary}</p>
      </div>

      <div className="space-y-3 mb-6">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Sources Used</h3>
        <ul aria-label="AI analysis sources">
          {sources.map((source) => {
            const IconComp = iconMap[source.label] || FileText;
            return (
              <li key={source.label} className="flex items-start gap-4 p-4 rounded-xl border border-border bg-card mb-3">
                <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center shrink-0" aria-hidden="true">
                  <IconComp className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">{source.label}</p>
                  <p className="text-sm text-muted-foreground">{source.detail}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="rounded-xl bg-muted/50 border border-border p-6">
        <h3 className="text-sm font-semibold text-foreground mb-2">How AI Reached This Conclusion</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{reasoning}</p>
      </div>
    </section>
  );
}
