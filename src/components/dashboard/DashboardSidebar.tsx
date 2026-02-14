import { useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, FileEdit, FileCheck, Clock, TrendingUp, Eye, Shield } from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { label: "Appeal Builder", icon: FileEdit, path: "/dashboard/appeal" },
  { label: "Evidence", icon: FileCheck, path: "/dashboard/evidence" },
  { label: "Timeline", icon: Clock, path: "/dashboard/timeline" },
  { label: "Risk Insights", icon: TrendingUp, path: "/dashboard/risk" },
  { label: "Transparency", icon: Eye, path: "/dashboard/transparency" },
];

export default function DashboardSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <aside className="w-64 min-h-screen bg-sidebar text-sidebar-foreground flex flex-col shrink-0" aria-label="Dashboard navigation">
      <div className="p-6 flex items-center gap-2.5">
        <Shield className="h-7 w-7 text-sidebar-primary" aria-hidden="true" />
        <span className="text-lg font-bold text-sidebar-primary-foreground">ClaimPilot AI</span>
      </div>
      <nav aria-label="Dashboard sections">
        <ul className="px-3 space-y-1">
          {navItems.map((item) => {
            const active = location.pathname === item.path || (item.path === "/dashboard" && location.pathname === "/dashboard");
            return (
              <li key={item.path}>
                <button
                  onClick={() => navigate(item.path)}
                  aria-current={active ? "page" : undefined}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? "bg-sidebar-accent text-sidebar-primary-foreground"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                  }`}
                >
                  <item.icon className={`h-4.5 w-4.5 ${active ? "text-sidebar-primary" : ""}`} aria-hidden="true" />
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="p-4 mx-3 mb-4 mt-auto rounded-xl bg-sidebar-accent/50 text-xs text-sidebar-foreground/60">
        <p className="font-medium text-sidebar-foreground/80 mb-1">Need help?</p>
        <p>Contact support for assistance with your appeal process.</p>
      </div>
    </aside>
  );
}
