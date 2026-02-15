import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import FileClaimSidebar from "@/components/file-claim/FileClaimSidebar";
import FileClaimTopBar from "@/components/file-claim/FileClaimTopBar";
import ClaimOverview from "@/components/file-claim/ClaimOverview";
import CoverageAnalysis from "@/components/file-claim/CoverageAnalysis";
import DocumentPrep from "@/components/file-claim/DocumentPrep";
import SubmissionGuide from "@/components/file-claim/SubmissionGuide";
import CostEstimator from "@/components/file-claim/CostEstimator";

function FileClaimHome() {
  return (
    <div className="space-y-8">
      <ClaimOverview />
      <CoverageAnalysis />
      <CostEstimator />
    </div>
  );
}

export default function FileClaimDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-background">
      <a href="#fileclaim-main" className="skip-link">Skip to main content</a>
      <FileClaimSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0">
        <FileClaimTopBar onMenuClick={() => setSidebarOpen(true)} />
        <main id="fileclaim-main" className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <Routes>
            <Route index element={<FileClaimHome />} />
            <Route path="documents" element={<DocumentPrep />} />
            <Route path="submission" element={<SubmissionGuide />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
