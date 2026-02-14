import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import TopBar from "@/components/dashboard/TopBar";
import ClaimScorePanel from "@/components/dashboard/ClaimScorePanel";
import DenialBreakdown from "@/components/dashboard/DenialBreakdown";
import CoverageMap from "@/components/dashboard/CoverageMap";
import AppealBuilder from "@/components/dashboard/AppealBuilder";
import EvidenceChecklist from "@/components/dashboard/EvidenceChecklist";
import TimelineTracker from "@/components/dashboard/TimelineTracker";
import RiskInsights from "@/components/dashboard/RiskInsights";
import TransparencyPanel from "@/components/dashboard/TransparencyPanel";

function DashboardHome() {
  return (
    <div className="space-y-8">
      <ClaimScorePanel />
      <DenialBreakdown />
      <CoverageMap />
    </div>
  );
}

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-background">
      <a href="#dashboard-main" className="skip-link">Skip to main content</a>
      <DashboardSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar onMenuClick={() => setSidebarOpen(true)} />
        <main id="dashboard-main" className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <Routes>
            <Route index element={<DashboardHome />} />
            <Route path="appeal" element={<AppealBuilder />} />
            <Route path="evidence" element={<EvidenceChecklist />} />
            <Route path="timeline" element={<TimelineTracker />} />
            <Route path="risk" element={<RiskInsights />} />
            <Route path="transparency" element={<TransparencyPanel />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
