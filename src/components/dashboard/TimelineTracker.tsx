import { Check, Clock, AlertCircle, FileText } from "lucide-react";
import { useClaim } from "@/contexts/ClaimContext";

const fallbackEvents = [
  { label: "Claim Submitted", date: "Jan 22, 2026", status: "complete" as const, detail: "Claim submitted to insurer" },
  { label: "Insurer Review", date: "Jan 28, 2026", status: "complete" as const, detail: "Initial review completed. Denial issued" },
  { label: "Additional Info Requested", date: "Feb 5, 2026", status: "current" as const, detail: "Insurer requested additional documentation" },
  { label: "Appeal Submission", date: "Pending", status: "upcoming" as const, detail: "Submit formal appeal with supporting evidence" },
  { label: "Final Decision", date: "Pending", status: "upcoming" as const, detail: "Expected within 30 days of appeal submission" },
];

const statusStyle = {
  complete: "gradient-accent text-accent-foreground",
  current: "bg-amber text-accent-foreground animate-pulse-ring",
  upcoming: "bg-muted text-muted-foreground",
};

const statusLabel = {
  complete: "Completed",
  current: "In progress",
  upcoming: "Upcoming",
};

const iconMap = {
  complete: Check,
  current: AlertCircle,
  upcoming: Clock,
};

export default function TimelineTracker() {
  const { analysis } = useClaim();
  const events = analysis?.timeline?.events ?? fallbackEvents;
  const daysRemaining = analysis?.timeline?.daysRemaining ?? 12;

  return (
    <section aria-labelledby="timeline-heading">
      <h2 id="timeline-heading" className="text-xl font-bold text-foreground mb-2">Timeline & Status</h2>
      <div className="flex items-center gap-2 mb-8 text-sm" role="status" aria-label={`${daysRemaining} days remaining to submit appeal`}>
        <Clock className="h-4 w-4 text-destructive" aria-hidden="true" />
        <span className="font-semibold text-destructive">{daysRemaining} days remaining</span>
        <span className="text-muted-foreground">to submit appeal</span>
      </div>

      <ol className="space-y-0" aria-label="Claim timeline">
        {events.map((event, i) => {
          const IconComp = iconMap[event.status] || Clock;
          return (
            <li key={event.label} className="flex gap-4">
              <div className="flex flex-col items-center" aria-hidden="true">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 relative ${statusStyle[event.status]}`}>
                  <IconComp className="h-4 w-4" />
                </div>
                {i < events.length - 1 && (
                  <div className={`w-0.5 flex-1 min-h-[40px] ${event.status === "complete" ? "bg-emerald/30" : "bg-border"}`} />
                )}
              </div>
              <div className="pb-8">
                <p className="font-semibold text-foreground">
                  {event.label}
                  <span className="sr-only"> — {statusLabel[event.status]}</span>
                </p>
                <p className="text-sm text-muted-foreground mb-1">{event.date}</p>
                <p className="text-sm text-muted-foreground">{event.detail}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
