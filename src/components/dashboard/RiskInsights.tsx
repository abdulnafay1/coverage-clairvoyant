import { motion } from "framer-motion";
import { TrendingDown, TrendingUp, DollarSign } from "lucide-react";
import { useClaim } from "@/contexts/ClaimContext";

export default function RiskInsights() {
  const { analysis } = useClaim();

  const denialRisk = analysis?.riskInsights?.denialRiskBefore ?? 42;
  const approvalProb = analysis?.riskInsights?.approvalProbAfter ?? 78;
  const estimatedBill = analysis?.riskInsights?.estimatedBill ?? "$18,420";
  const billDescription = analysis?.riskInsights?.billDescription ?? "Based on submitted claim";
  const comparisons = analysis?.riskInsights?.comparisons ?? [
    { label: "Coverage Approval", before: 28, after: 78 },
    { label: "Medical Necessity", before: 45, after: 92 },
    { label: "Documentation Score", before: 35, after: 60 },
  ];

  return (
    <section aria-labelledby="risk-heading">
      <h2 id="risk-heading" className="text-xl font-bold text-foreground mb-6">Risk Insights</h2>

      <div className="grid sm:grid-cols-2 gap-6 mb-8">
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center gap-2 mb-3">
            <TrendingDown className="h-5 w-5 text-red-risk" aria-hidden="true" />
            <p className="text-sm font-semibold text-muted-foreground">Denial Risk Before Appeal</p>
          </div>
          <p className="text-4xl font-extrabold text-red-risk" aria-label={`Denial risk before appeal: ${denialRisk} percent`}>{denialRisk}%</p>
          <div className="mt-3 h-3 rounded-full bg-muted overflow-hidden" role="progressbar" aria-valuenow={denialRisk} aria-valuemin={0} aria-valuemax={100}>
            <motion.div className="h-full rounded-full bg-red-risk" initial={{ width: 0 }} animate={{ width: `${denialRisk}%` }} transition={{ duration: 0.8, delay: 0.2 }} />
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="h-5 w-5 text-emerald" aria-hidden="true" />
            <p className="text-sm font-semibold text-muted-foreground">Approval Probability After Appeal</p>
          </div>
          <p className="text-4xl font-extrabold text-emerald" aria-label={`Approval probability after appeal: ${approvalProb} percent`}>{approvalProb}%</p>
          <div className="mt-3 h-3 rounded-full bg-muted overflow-hidden" role="progressbar" aria-valuenow={approvalProb} aria-valuemin={0} aria-valuemax={100}>
            <motion.div className="h-full rounded-full gradient-accent" initial={{ width: 0 }} animate={{ width: `${approvalProb}%` }} transition={{ duration: 0.8, delay: 0.3 }} />
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 mb-8">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-6">Before vs. After Appeal Comparison</h3>
        <div className="space-y-6">
          {comparisons.map((item) => (
            <div key={item.label}>
              <p className="text-sm font-medium text-foreground mb-2">{item.label}</p>
              <div className="space-y-1.5">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground w-12">Before</span>
                  <div className="flex-1 h-4 rounded-full bg-muted overflow-hidden" role="progressbar" aria-valuenow={item.before} aria-valuemin={0} aria-valuemax={100}>
                    <motion.div className="h-full rounded-full bg-red-risk/60" initial={{ width: 0 }} animate={{ width: `${item.before}%` }} transition={{ duration: 0.6, delay: 0.2 }} />
                  </div>
                  <span className="text-xs font-semibold text-red-risk w-10 text-right">{item.before}%</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground w-12">After</span>
                  <div className="flex-1 h-4 rounded-full bg-muted overflow-hidden" role="progressbar" aria-valuenow={item.after} aria-valuemin={0} aria-valuemax={100}>
                    <motion.div className="h-full rounded-full gradient-accent" initial={{ width: 0 }} animate={{ width: `${item.after}%` }} transition={{ duration: 0.6, delay: 0.4 }} />
                  </div>
                  <span className="text-xs font-semibold text-emerald w-10 text-right">{item.after}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border-2 border-amber bg-amber-light p-6 flex items-start gap-4" role="alert">
        <DollarSign className="h-8 w-8 text-amber shrink-0" aria-hidden="true" />
        <div>
          <p className="text-sm font-semibold text-muted-foreground mb-1">Estimated Financial Impact If Denied</p>
          <p className="text-3xl font-extrabold text-foreground">{estimatedBill}</p>
          <p className="text-sm text-muted-foreground mt-1">{billDescription}</p>
        </div>
      </div>
    </section>
  );
}
