import { motion } from "framer-motion";

const breakdowns = [
  { label: "Policy Coverage Match", value: 85, color: "text-emerald" },
  { label: "Documentation Strength", value: 60, color: "text-amber" },
  { label: "Medical Necessity", value: 92, color: "text-emerald" },
  { label: "Denial Technicality Risk", value: null, level: "Medium", color: "text-amber" },
];

export default function ClaimScorePanel() {
  const score = 78;
  const circumference = 2 * Math.PI * 70;
  const offset = circumference - (score / 100) * circumference;

  return (
    <section aria-labelledby="claim-score-heading">
      <h2 id="claim-score-heading" className="text-xl font-bold text-foreground mb-6">Claim Strength Score</h2>
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Circular gauge */}
        <div className="relative flex items-center justify-center shrink-0" role="meter" aria-valuenow={score} aria-valuemin={0} aria-valuemax={100} aria-label={`Claim strength score: ${score} out of 100`}>
          <svg width="180" height="180" className="-rotate-90" aria-hidden="true">
            <circle cx="90" cy="90" r="70" fill="none" stroke="hsl(var(--muted))" strokeWidth="12" />
            <motion.circle
              cx="90" cy="90" r="70" fill="none"
              stroke="hsl(var(--emerald))"
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center" aria-hidden="true">
            <span className="text-4xl font-extrabold text-foreground">{score}</span>
            <span className="text-sm text-muted-foreground">/100</span>
          </div>
        </div>

        <div className="flex-1 space-y-4 w-full">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-light text-emerald text-sm font-medium" role="status">
            Strong Appeal Potential
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {breakdowns.map((b) => (
              <div key={b.label} className="rounded-xl border border-border bg-card p-4">
                <p className="text-sm text-muted-foreground mb-1">{b.label}</p>
                {b.value !== null ? (
                  <div className="flex items-end gap-2">
                    <span className={`text-2xl font-bold ${b.color}`}>{b.value}%</span>
                    <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden mb-1.5" role="progressbar" aria-valuenow={b.value} aria-valuemin={0} aria-valuemax={100} aria-label={`${b.label}: ${b.value}%`}>
                      <motion.div
                        className={`h-full rounded-full ${b.value >= 80 ? "gradient-accent" : "bg-amber"}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${b.value}%` }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                      />
                    </div>
                  </div>
                ) : (
                  <span className={`text-2xl font-bold ${b.color}`}>{b.level}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
