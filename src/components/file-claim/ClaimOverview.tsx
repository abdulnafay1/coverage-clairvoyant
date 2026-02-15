import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, AlertTriangle, TrendingUp } from "lucide-react";
import { useClaim } from "@/contexts/ClaimContext";

export default function ClaimOverview() {
  const { analysis } = useClaim();
  const score = analysis?.claimScore?.overall ?? 0;
  const label = analysis?.claimScore?.label ?? "Pending Analysis";

  const stats = [
    { icon: TrendingUp, label: "Approval Likelihood", value: score ? `${score}%` : "—", color: "text-accent" },
    { icon: CheckCircle, label: "Documentation", value: analysis?.claimScore?.documentationStrength ? `${analysis.claimScore.documentationStrength}%` : "—", color: "text-accent" },
    { icon: AlertTriangle, label: "Missing Items", value: analysis?.evidenceChecklist ? `${analysis.evidenceChecklist.filter(e => e.status === "missing").length}` : "—", color: "text-destructive" },
  ];

  return (
    <section aria-labelledby="overview-heading">
      <h2 id="overview-heading" className="text-xl font-bold text-foreground mb-4">Claim Overview</h2>
      <div className="grid sm:grid-cols-3 gap-4">
        {stats.map((s) => (
          <Card key={s.label} className="gradient-card border-border/50 shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <s.icon className={`h-4 w-4 ${s.color}`} aria-hidden="true" />
                {s.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-foreground">{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {analysis?.transparency?.summary && (
        <Card className="mt-6 gradient-card border-border/50 shadow-card">
          <CardHeader>
            <CardTitle className="text-base">AI Analysis Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">{analysis.transparency.summary}</p>
          </CardContent>
        </Card>
      )}

      {!analysis && (
        <Card className="mt-6 gradient-card border-border/50 shadow-card">
          <CardContent className="pt-6">
            <p className="text-muted-foreground text-center">Your claim is being analyzed. Results will appear here shortly.</p>
          </CardContent>
        </Card>
      )}
    </section>
  );
}
