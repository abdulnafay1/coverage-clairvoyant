import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, FileSearch, Brain, BarChart3, CheckCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useClaim } from "@/contexts/ClaimContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const stages = [
  { icon: FileSearch, label: "Scanning denial letter…", duration: 2500 },
  { icon: Brain, label: "Analyzing policy coverage…", duration: 2500 },
  { icon: BarChart3, label: "Scoring claim strength…", duration: 2500 },
  { icon: CheckCircle, label: "Generating appeal strategy…", duration: 2500 },
];

export default function AnalyzingClaim() {
  const navigate = useNavigate();
  const { onboardingData, setAnalysis } = useClaim();
  const [progress, setProgress] = useState(0);
  const [stageIndex, setStageIndex] = useState(0);
  const [apiDone, setApiDone] = useState(false);
  const [animDone, setAnimDone] = useState(false);

  // Call the edge function
  useEffect(() => {
    const analyze = async () => {
      try {
        const { data, error } = await supabase.functions.invoke("analyze-claim", {
          body: {
            filePaths: onboardingData?.filePaths || [],
            denialType: onboardingData?.denialType || "",
            form: onboardingData?.form || {},
          },
        });

        if (error) throw error;
        if (data?.error) throw new Error(data.error);

        setAnalysis(data);
        setApiDone(true);
      } catch (e: any) {
        console.error("Analysis failed:", e);
        toast({
          title: "Analysis failed",
          description: e.message || "Something went wrong. Please try again.",
          variant: "destructive",
        });
        // Still navigate to dashboard with null analysis (will show fallback)
        setApiDone(true);
      }
    };
    analyze();
  }, [onboardingData, setAnalysis]);

  // Progress animation (minimum 10s)
  useEffect(() => {
    const totalDuration = 10000;
    const interval = 50;
    let elapsed = 0;

    const timer = setInterval(() => {
      elapsed += interval;
      const pct = Math.min((elapsed / totalDuration) * 100, 100);
      setProgress(pct);
      setStageIndex(Math.min(Math.floor((elapsed / totalDuration) * stages.length), stages.length - 1));

      if (elapsed >= totalDuration) {
        clearInterval(timer);
        setAnimDone(true);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  // Navigate when both API and animation are done
  useEffect(() => {
    if (apiDone && animDone) {
      setTimeout(() => navigate("/dashboard"), 400);
    }
  }, [apiDone, animDone, navigate]);

  const CurrentIcon = stages[stageIndex].icon;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full mx-auto px-6 text-center space-y-8"
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <Shield className="h-7 w-7 text-accent" />
          <span className="text-xl font-bold text-foreground">CareClaim</span>
        </div>

        <div className="relative mx-auto w-20 h-20">
          <div className="absolute inset-0 rounded-full border-4 border-muted border-t-accent animate-spin" />
          <motion.div
            key={stageIndex}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <CurrentIcon className="h-8 w-8 text-accent" />
          </motion.div>
        </div>

        <div className="space-y-3">
          <motion.p
            key={stageIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-lg font-semibold text-foreground"
          >
            {stages[stageIndex].label}
          </motion.p>
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-muted-foreground">{Math.round(progress)}% complete</p>
        </div>

        <p className="text-xs text-muted-foreground/60">
          Our AI is reviewing your documents, policy terms, and medical coding standards…
        </p>
      </motion.div>
    </div>
  );
}
