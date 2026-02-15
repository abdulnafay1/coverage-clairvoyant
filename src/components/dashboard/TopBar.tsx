import { Clock, AlertCircle, Menu } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useClaim } from "@/contexts/ClaimContext";

interface Props {
  onMenuClick?: () => void;
}

export default function TopBar({ onMenuClick }: Props) {
  const { analysis } = useClaim();

  const claimId = analysis?.claimId ?? "CLM-2026-XXXX";
  const claimStatus = analysis?.claimStatus ?? "Under Review";
  const daysRemaining = analysis?.timeline?.daysRemaining ?? 12;

  return (
    <header className="h-14 sm:h-16 border-b border-border bg-card/80 backdrop-blur-lg flex items-center justify-between px-4 sm:px-8" aria-label="Claim status bar">
      <div className="flex items-center gap-3 sm:gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 -ml-2 rounded-md text-muted-foreground hover:text-foreground"
          aria-label="Open navigation menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="hidden sm:block">
          <span className="text-sm text-muted-foreground">Claim ID</span>
          <span className="ml-2 font-semibold text-foreground" aria-label={`Claim ID ${claimId}`}>{claimId}</span>
        </div>
        <Badge variant="outline" className="border-amber bg-amber-light text-amber font-medium gap-1.5 text-xs sm:text-sm">
          <AlertCircle className="h-3 w-3" aria-hidden="true" />
          {claimStatus}
        </Badge>
      </div>
      <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm" role="status" aria-label={`Appeal deadline: ${daysRemaining} days remaining`}>
        <Clock className="h-4 w-4 text-destructive" aria-hidden="true" />
        <span className="font-semibold text-destructive">{daysRemaining} Days</span>
        <span className="text-muted-foreground hidden sm:inline">until appeal deadline</span>
      </div>
    </header>
  );
}
