import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ClaimProvider } from "@/contexts/ClaimContext";
import Landing from "./pages/Landing";
import ChoosePath from "./pages/ChoosePath";
import Onboarding from "./pages/Onboarding";
import FileClaimOnboarding from "./pages/FileClaimOnboarding";
import Dashboard from "./pages/Dashboard";
import FileClaimDashboard from "./pages/FileClaimDashboard";
import AnalyzingClaim from "./pages/AnalyzingClaim";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ClaimProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/choose-path" element={<ChoosePath />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/file-claim" element={<FileClaimOnboarding />} />
            <Route path="/analyzing" element={<AnalyzingClaim />} />
            <Route path="/analyzing-claim" element={<AnalyzingClaim />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="/file-claim/dashboard/*" element={<FileClaimDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ClaimProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
