import { Clock, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function TopBar() {
  return (
    <div className="h-16 border-b border-border bg-card/80 backdrop-blur-lg flex items-center justify-between px-8">
      <div className="flex items-center gap-4">
        <div>
          <span className="text-sm text-muted-foreground">Claim ID</span>
          <span className="ml-2 font-semibold text-foreground">CLM-2026-04892</span>
        </div>
        <Badge variant="outline" className="border-amber bg-amber-light text-amber font-medium gap-1.5">
          <AlertCircle className="h-3 w-3" />
          Under Review
        </Badge>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <Clock className="h-4 w-4 text-destructive" />
        <span className="font-semibold text-destructive">12 Days</span>
        <span className="text-muted-foreground">until appeal deadline</span>
      </div>
    </div>
  );
}
