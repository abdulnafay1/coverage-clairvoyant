import { Brain, FileText, Scale, BookOpen } from "lucide-react";

const sources = [
  { icon: FileText, label: "Policy Clauses", detail: "Section 4.2.1, 6.1.3, and 8.4 of BCBS PPO Gold 2025" },
  { icon: BookOpen, label: "CPT Code Standards", detail: "AMA CPT 29881 guidelines and AAOS clinical recommendations" },
  { icon: Scale, label: "State Regulations", detail: "Georgia Insurance Code §33-24-59.5 — External Review Rights" },
];

export default function TransparencyPanel() {
  return (
    <div>
      <h2 className="text-xl font-bold text-foreground mb-6">AI Transparency</h2>

      <div className="rounded-xl border border-border bg-card p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl gradient-accent flex items-center justify-center">
            <Brain className="h-5 w-5 text-accent-foreground" />
          </div>
          <div>
            <p className="font-semibold text-foreground">Confidence Level</p>
            <p className="text-sm text-emerald font-medium">High</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          ClaimPilot AI analyzed your denial letter, insurance policy, and medical documentation against CPT coding standards and state insurance regulations. 
          The analysis cross-referenced 3 policy clauses, verified medical necessity criteria against AAOS guidelines, and identified 2 procedural deficiencies 
          in the denial that can be challenged on appeal.
        </p>
      </div>

      <div className="space-y-3 mb-6">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Sources Used</h3>
        {sources.map((source) => (
          <div key={source.label} className="flex items-start gap-4 p-4 rounded-xl border border-border bg-card">
            <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center shrink-0">
              <source.icon className="h-4 w-4 text-muted-foreground" />
            </div>
            <div>
              <p className="font-medium text-foreground text-sm">{source.label}</p>
              <p className="text-sm text-muted-foreground">{source.detail}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl bg-muted/50 border border-border p-6">
        <h3 className="text-sm font-semibold text-foreground mb-2">How AI Reached This Conclusion</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The AI identified that your denial is primarily based on a <strong>medical necessity</strong> determination and a 
          <strong> missing pre-authorization</strong>. By cross-referencing your MRI results and physician notes against the AAOS 
          standard of care for meniscal tears, the AI determined that conservative treatment was appropriately exhausted, 
          meeting the threshold for surgical intervention. The pre-authorization gap is procedural rather than substantive, 
          which historically has a high overturn rate on appeal in Georgia (estimated 68% based on state data).
        </p>
      </div>
    </div>
  );
}
