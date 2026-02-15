import { Check, AlertTriangle, Upload } from "lucide-react";

const items = [
  { label: "Physician Letter", status: "uploaded" as const, risk: "Critical — may result in automatic denial" },
  { label: "CPT Code Documentation", status: "uploaded" as const, risk: "High — weakens medical necessity argument" },
  { label: "Pre-Authorization Proof", status: "missing" as const, risk: "Critical — primary reason for current denial" },
  { label: "Medical Necessity Statement", status: "uploaded" as const, risk: "High — required for appeal review" },
  { label: "Previous Claims History", status: "missing" as const, risk: "Medium — strengthens pattern argument" },
];

export default function EvidenceChecklist() {
  return (
    <section aria-labelledby="evidence-heading">
      <h2 id="evidence-heading" className="text-xl font-bold text-foreground mb-6">Evidence Checklist</h2>
      <ul className="space-y-3" aria-label="Required evidence documents">
        {items.map((item) => (
          <li
            key={item.label}
            className={`flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-4 sm:p-5 rounded-xl border-2 transition-colors ${
              item.status === "uploaded"
                ? "border-emerald/30 bg-emerald-light"
                : "border-red-risk/30 bg-red-risk-light"
            }`}
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
              item.status === "uploaded" ? "gradient-accent" : "bg-red-risk"
            }`} aria-hidden="true">
              {item.status === "uploaded" ? (
                <Check className="h-5 w-5 text-accent-foreground" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-accent-foreground" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <p className="font-semibold text-foreground">{item.label}</p>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                  item.status === "uploaded"
                    ? "bg-emerald/10 text-emerald"
                    : "bg-red-risk/10 text-red-risk"
                }`}>
                  {item.status === "uploaded" ? "Uploaded" : "Missing"}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">Risk if missing: {item.risk}</p>
            </div>
            {item.status === "missing" && (
              <button
                className="flex items-center gap-1.5 text-sm font-medium text-primary hover:text-accent transition-colors"
                aria-label={`Upload ${item.label}`}
              >
                <Upload className="h-4 w-4" aria-hidden="true" /> Upload
              </button>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
