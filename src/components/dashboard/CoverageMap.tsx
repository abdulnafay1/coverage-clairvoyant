import { ArrowRight, Check, X, AlertTriangle } from "lucide-react";

const steps = [
  { label: "Procedure", value: "Knee Arthroscopy (CPT 29881)", status: "complete" as const, icon: Check },
  { label: "Relevant Policy Clause", value: "Section 4.2.1 — Orthopedic Surgery Coverage", status: "complete" as const, icon: Check },
  { label: "Exclusions", value: "Elective procedures without prior authorization", status: "warning" as const, icon: AlertTriangle },
  { label: "Conditions Required", value: "Physician attestation of medical necessity", status: "warning" as const, icon: AlertTriangle },
  { label: "Missing Documentation", value: "Pre-authorization form, Specialist referral letter", status: "missing" as const, icon: X },
];

const statusStyles = {
  complete: "border-emerald bg-emerald-light text-emerald",
  warning: "border-amber bg-amber-light text-amber",
  missing: "border-red-risk bg-red-risk-light text-red-risk",
};

const iconBg = {
  complete: "gradient-accent text-accent-foreground",
  warning: "bg-amber text-accent-foreground",
  missing: "bg-red-risk text-accent-foreground",
};

export default function CoverageMap() {
  return (
    <div>
      <h2 className="text-xl font-bold text-foreground mb-6">Coverage Map</h2>
      <div className="flex flex-col gap-3">
        {steps.map((step, i) => (
          <div key={step.label} className="flex items-start gap-4">
            {/* Connector line */}
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${iconBg[step.status]}`}>
                <step.icon className="h-5 w-5" />
              </div>
              {i < steps.length - 1 && <div className="w-0.5 h-8 bg-border mt-1" />}
            </div>
            <div className={`flex-1 rounded-xl border-2 p-4 ${statusStyles[step.status]}`}>
              <p className="text-xs font-semibold uppercase tracking-wider opacity-70 mb-1">{step.label}</p>
              <p className="font-medium text-foreground">{step.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
