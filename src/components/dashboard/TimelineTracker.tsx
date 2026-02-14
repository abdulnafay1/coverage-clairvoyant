import { Check, Clock, AlertCircle, FileText } from "lucide-react";

const events = [
  { label: "Claim Submitted", date: "Jan 22, 2026", status: "complete" as const, icon: FileText, detail: "Claim #CLM-2026-04892 submitted to Blue Cross Blue Shield" },
  { label: "Insurer Review", date: "Jan 28, 2026", status: "complete" as const, icon: Check, detail: "Initial review completed. Denial issued for CPT 29881" },
  { label: "Additional Info Requested", date: "Feb 5, 2026", status: "current" as const, icon: AlertCircle, detail: "Insurer requested physician letter and pre-auth documentation" },
  { label: "Appeal Submission", date: "Pending", status: "upcoming" as const, icon: Clock, detail: "Submit formal appeal with supporting evidence" },
  { label: "Final Decision", date: "Pending", status: "upcoming" as const, icon: Clock, detail: "Expected within 30 days of appeal submission" },
];

const statusStyle = {
  complete: "gradient-accent text-accent-foreground",
  current: "bg-amber text-accent-foreground animate-pulse-ring",
  upcoming: "bg-muted text-muted-foreground",
};

export default function TimelineTracker() {
  return (
    <div>
      <h2 className="text-xl font-bold text-foreground mb-2">Timeline & Status</h2>
      <div className="flex items-center gap-2 mb-8 text-sm">
        <Clock className="h-4 w-4 text-destructive" />
        <span className="font-semibold text-destructive">12 days remaining</span>
        <span className="text-muted-foreground">to submit appeal</span>
      </div>

      <div className="space-y-0">
        {events.map((event, i) => (
          <div key={event.label} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 relative ${statusStyle[event.status]}`}>
                <event.icon className="h-4 w-4" />
              </div>
              {i < events.length - 1 && (
                <div className={`w-0.5 flex-1 min-h-[40px] ${event.status === "complete" ? "bg-emerald/30" : "bg-border"}`} />
              )}
            </div>
            <div className="pb-8">
              <p className="font-semibold text-foreground">{event.label}</p>
              <p className="text-sm text-muted-foreground mb-1">{event.date}</p>
              <p className="text-sm text-muted-foreground">{event.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
