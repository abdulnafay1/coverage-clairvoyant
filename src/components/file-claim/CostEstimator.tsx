import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";
import { useClaim } from "@/contexts/ClaimContext";

export default function CostEstimator() {
  const { analysis } = useClaim();
  const bill = analysis?.riskInsights?.estimatedBill;
  const billDesc = analysis?.riskInsights?.billDescription;
  const approvalProb = analysis?.riskInsights?.approvalProbAfter;

  if (!bill) return null;

  return (
    <section aria-labelledby="cost-heading">
      <Card className="gradient-card border-border/50 shadow-card">
        <CardHeader>
          <CardTitle id="cost-heading" className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-accent" aria-hidden="true" />
            Cost & Reimbursement Estimate
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
              <p className="text-sm text-muted-foreground mb-1">Estimated Bill</p>
              <p className="text-2xl font-bold text-foreground">{bill}</p>
              {billDesc && <p className="text-xs text-muted-foreground mt-1">{billDesc}</p>}
            </div>
            {approvalProb !== undefined && (
              <div className="p-4 rounded-xl bg-emerald-light border border-accent/20">
                <p className="text-sm text-muted-foreground mb-1">Approval Probability</p>
                <p className="text-2xl font-bold text-accent">{approvalProb}%</p>
                <p className="text-xs text-muted-foreground mt-1">With complete documentation</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
