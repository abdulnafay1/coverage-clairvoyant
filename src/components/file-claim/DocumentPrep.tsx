import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, AlertTriangle } from "lucide-react";
import { useClaim } from "@/contexts/ClaimContext";

export default function DocumentPrep() {
  const { analysis } = useClaim();
  const checklist = analysis?.evidenceChecklist ?? [];

  return (
    <section aria-labelledby="docs-heading" className="space-y-6">
      <div>
        <h2 id="docs-heading" className="text-xl font-bold text-foreground mb-2">Document Preparation</h2>
        <p className="text-muted-foreground">Ensure you have all required documents before submitting your claim.</p>
      </div>

      <Card className="gradient-card border-border/50 shadow-card">
        <CardHeader>
          <CardTitle className="text-base">Required Documents</CardTitle>
        </CardHeader>
        <CardContent>
          {checklist.length > 0 ? (
            <div className="space-y-3">
              {checklist.map((item, i) => (
                <div key={i} className={`flex items-center gap-4 p-4 rounded-xl border ${item.status === "uploaded" ? "bg-emerald-light border-accent/20" : "bg-red-light border-destructive/20"}`}>
                  {item.status === "uploaded" ? (
                    <CheckCircle className="h-5 w-5 text-accent shrink-0" aria-hidden="true" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-destructive shrink-0" aria-hidden="true" />
                  )}
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{item.label}</p>
                    <p className="text-xs text-muted-foreground">Impact: {item.risk}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-4">No document analysis available yet. Complete the onboarding to see recommendations.</p>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
