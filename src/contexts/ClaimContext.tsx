import { createContext, useContext, useState, ReactNode } from "react";

export interface ClaimAnalysis {
  claimScore: {
    overall: number;
    label: string;
    policyCoverageMatch: number;
    documentationStrength: number;
    medicalNecessity: number;
    denialTechnicalityRisk: string;
  };
  denialBreakdown: {
    clauses: { original: string; explanation: string; highlight: string }[];
  };
  coverageMap: {
    steps: { label: string; value: string; status: "complete" | "warning" | "missing" }[];
  };
  appealLetter: string;
  evidenceChecklist: { label: string; status: "uploaded" | "missing"; risk: string }[];
  riskInsights: {
    denialRiskBefore: number;
    approvalProbAfter: number;
    estimatedBill: string;
    billDescription: string;
    comparisons: { label: string; before: number; after: number }[];
  };
  timeline: {
    daysRemaining: number;
    events: { label: string; date: string; status: "complete" | "current" | "upcoming"; detail: string }[];
  };
  transparency: {
    confidenceLevel: string;
    summary: string;
    sources: { label: string; detail: string }[];
    reasoning: string;
  };
  claimId: string;
  claimStatus: string;
}

export interface OnboardingData {
  denialType: string;
  filePaths: string[];
  form: {
    procedure: string;
    cpt: string;
    provider: string;
    bill: string;
    description: string;
  };
}

interface ClaimContextType {
  analysis: ClaimAnalysis | null;
  setAnalysis: (a: ClaimAnalysis | null) => void;
  onboardingData: OnboardingData | null;
  setOnboardingData: (d: OnboardingData | null) => void;
}

const ClaimContext = createContext<ClaimContextType | null>(null);

export function ClaimProvider({ children }: { children: ReactNode }) {
  const [analysis, setAnalysis] = useState<ClaimAnalysis | null>(null);
  const [onboardingData, setOnboardingData] = useState<OnboardingData | null>(null);

  return (
    <ClaimContext.Provider value={{ analysis, setAnalysis, onboardingData, setOnboardingData }}>
      {children}
    </ClaimContext.Provider>
  );
}

export function useClaim() {
  const ctx = useContext(ClaimContext);
  if (!ctx) throw new Error("useClaim must be used within ClaimProvider");
  return ctx;
}
