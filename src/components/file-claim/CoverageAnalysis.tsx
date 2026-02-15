import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import { useClaim } from "@/contexts/ClaimContext";

export default function CoverageAnalysis() {
  const { analysis } = useClaim();
  const steps = analysis?.coverageMap?.steps ?? [];

  if (steps.length === 0) return null;

  const statusIcon = (status: string) => {
    if (status === "complete") return <CheckCircle className="h-5 w-5 text-accent" />;
    if (status === "warning") return <AlertTriangle className="h-5 w-5 text-amber" />;
    return <XCircle className="h-5 w-5 text-destructive" />;
  };

  return (
    <section aria-labelledby="coverage-heading">
      <Card className="gradient-card border-border/50 shadow-card">
        <CardHeader>
          <CardTitle id="coverage-heading">Coverage Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {steps.map((step, i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-muted/30 border border-border/50">
                <div className="mt-0.5" aria-hidden="true">{statusIcon(step.status)}</div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">{step.label}</p>
                  <p className="text-sm text-muted-foreground">{step.value}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
