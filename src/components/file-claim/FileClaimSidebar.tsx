import { useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, FileCheck, Send, Shield, X } from "lucide-react";

const navItems = [
  { label: "Overview", icon: LayoutDashboard, path: "/file-claim/dashboard" },
  { label: "Documents", icon: FileCheck, path: "/file-claim/dashboard/documents" },
  { label: "Submit Claim", icon: Send, path: "/file-claim/dashboard/submission" },
];

interface Props {
  open?: boolean;
  onClose?: () => void;
}

export default function FileClaimSidebar({ open, onClose }: Props) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNav = (path: string) => {
    navigate(path);
    onClose?.();
  };

  return (
    <>
      {open && <div className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={onClose} aria-hidden="true" />}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-sidebar text-sidebar-foreground flex flex-col shrink-0 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:z-auto ${open ? "translate-x-0" : "-translate-x-full"}`}
        aria-label="Claim filing navigation"
      >
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Shield className="h-7 w-7 text-sidebar-primary" aria-hidden="true" />
            <span className="text-lg font-bold text-sidebar-primary-foreground">CareClaim</span>
          </div>
          <button onClick={onClose} className="lg:hidden p-1.5 rounded-md text-sidebar-foreground/70 hover:text-sidebar-foreground" aria-label="Close navigation">
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav aria-label="Claim filing sections">
          <ul className="px-3 space-y-1">
            {navItems.map((item) => {
              const active = location.pathname === item.path || (item.path === "/file-claim/dashboard" && location.pathname === "/file-claim/dashboard");
              return (
                <li key={item.path}>
                  <button
                    onClick={() => handleNav(item.path)}
                    aria-current={active ? "page" : undefined}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      active ? "bg-sidebar-accent text-sidebar-primary-foreground" : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
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
          <p className="font-medium text-sidebar-foreground/80 mb-1">Filing a new claim?</p>
          <p>Our AI will guide you through the process step by step.</p>
        </div>
      </aside>
    </>
  );
}
