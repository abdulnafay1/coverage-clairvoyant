import { FileText, Menu } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useClaim } from "@/contexts/ClaimContext";

interface Props {
  onMenuClick?: () => void;
}

export default function FileClaimTopBar({ onMenuClick }: Props) {
  const { analysis } = useClaim();
  const claimId = analysis?.claimId ?? "NEW-CLAIM";

  return (
    <header className="h-14 sm:h-16 border-b border-border bg-card/80 backdrop-blur-lg flex items-center justify-between px-4 sm:px-8" aria-label="Claim status bar">
      <div className="flex items-center gap-3 sm:gap-4">
        <button onClick={onMenuClick} className="lg:hidden p-2 -ml-2 rounded-md text-muted-foreground hover:text-foreground" aria-label="Open navigation menu">
          <Menu className="h-5 w-5" />
        </button>
        <div className="hidden sm:block">
          <span className="text-sm text-muted-foreground">Claim</span>
          <span className="ml-2 font-semibold text-foreground">{claimId}</span>
        </div>
        <Badge variant="outline" className="border-accent bg-emerald-light text-accent font-medium gap-1.5 text-xs sm:text-sm">
          <FileText className="h-3 w-3" aria-hidden="true" />
          New Submission
        </Badge>
      </div>
    </header>
  );
}
