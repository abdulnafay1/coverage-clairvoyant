import { motion } from "framer-motion";
import { TrendingDown, TrendingUp, DollarSign } from "lucide-react";

export default function RiskInsights() {
  return (
    <div>
      <h2 className="text-xl font-bold text-foreground mb-6">Risk Insights</h2>

      <div className="grid sm:grid-cols-2 gap-6 mb-8">
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center gap-2 mb-3">
            <TrendingDown className="h-5 w-5 text-red-risk" />
            <p className="text-sm font-semibold text-muted-foreground">Denial Risk Before Appeal</p>
          </div>
          <p className="text-4xl font-extrabold text-red-risk">42%</p>
          <div className="mt-3 h-3 rounded-full bg-muted overflow-hidden">
            <motion.div className="h-full rounded-full bg-red-risk" initial={{ width: 0 }} animate={{ width: "42%" }} transition={{ duration: 0.8, delay: 0.2 }} />
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="h-5 w-5 text-emerald" />
            <p className="text-sm font-semibold text-muted-foreground">Approval Probability After Appeal</p>
          </div>
          <p className="text-4xl font-extrabold text-emerald">78%</p>
          <div className="mt-3 h-3 rounded-full bg-muted overflow-hidden">
            <motion.div className="h-full rounded-full gradient-accent" initial={{ width: 0 }} animate={{ width: "78%" }} transition={{ duration: 0.8, delay: 0.3 }} />
          </div>
        </div>
      </div>

      {/* Comparison chart */}
      <div className="rounded-xl border border-border bg-card p-6 mb-8">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-6">Before vs. After Appeal Comparison</h3>
        <div className="space-y-6">
          {[
            { label: "Coverage Approval", before: 28, after: 78 },
            { label: "Medical Necessity", before: 45, after: 92 },
            { label: "Documentation Score", before: 35, after: 60 },
          ].map((item) => (
            <div key={item.label}>
              <p className="text-sm font-medium text-foreground mb-2">{item.label}</p>
              <div className="space-y-1.5">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground w-12">Before</span>
                  <div className="flex-1 h-4 rounded-full bg-muted overflow-hidden">
                    <motion.div className="h-full rounded-full bg-red-risk/60" initial={{ width: 0 }} animate={{ width: `${item.before}%` }} transition={{ duration: 0.6, delay: 0.2 }} />
                  </div>
                  <span className="text-xs font-semibold text-red-risk w-10 text-right">{item.before}%</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground w-12">After</span>
                  <div className="flex-1 h-4 rounded-full bg-muted overflow-hidden">
                    <motion.div className="h-full rounded-full gradient-accent" initial={{ width: 0 }} animate={{ width: `${item.after}%` }} transition={{ duration: 0.6, delay: 0.4 }} />
                  </div>
                  <span className="text-xs font-semibold text-emerald w-10 text-right">{item.after}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border-2 border-amber bg-amber-light p-6 flex items-start gap-4">
        <DollarSign className="h-8 w-8 text-amber shrink-0" />
        <div>
          <p className="text-sm font-semibold text-muted-foreground mb-1">Estimated Financial Impact If Denied</p>
          <p className="text-3xl font-extrabold text-foreground">$18,420</p>
          <p className="text-sm text-muted-foreground mt-1">Based on submitted claim for CPT 29881 — Knee Arthroscopy</p>
        </div>
      </div>
    </div>
  );
}
