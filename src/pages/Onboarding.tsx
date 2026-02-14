import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, ArrowRight, ArrowLeft, Upload, Stethoscope, AlertTriangle, Pill, MapPin, FileText, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { usePageTransition } from "@/hooks/usePageTransition";
import PageLoader from "@/components/PageLoader";

const denialTypes = [
  { id: "surgery", label: "Surgery", icon: Stethoscope, desc: "Surgical procedure denial" },
  { id: "er", label: "Emergency Room", icon: AlertTriangle, desc: "ER visit denial" },
  { id: "medication", label: "Medication", icon: Pill, desc: "Prescription denial" },
  { id: "oon", label: "Out-of-Network", icon: MapPin, desc: "Out-of-network provider" },
  { id: "prior-auth", label: "Prior Authorization", icon: FileText, desc: "Prior auth not obtained" },
];

const docSlots = [
  { id: "policy", label: "Policy PDF", desc: "Your insurance policy document" },
  { id: "denial", label: "Denial Letter", desc: "The denial letter you received" },
  { id: "medical", label: "Medical Reports", desc: "Relevant medical documentation" },
];

export default function Onboarding() {
  const { loading, navigateWithLoader } = usePageTransition();
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [uploadedDocs, setUploadedDocs] = useState<Record<string, string>>({});
  const [form, setForm] = useState({ procedure: "", cpt: "", provider: "", bill: "", description: "" });

  const canProceed = step === 1 ? !!selectedType : step === 2 ? true : form.procedure && form.provider;

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else navigateWithLoader("/analyzing");
  };

  const stepLabels = ["Select Denial Type", "Upload Documents", "Patient Information"];

  return (
    <>
    {loading && <PageLoader />}
    <div className="min-h-screen bg-background flex flex-col">
      <a href="#onboarding-content" className="skip-link">Skip to content</a>

      {/* Top bar */}
      <header className="border-b border-border bg-card/80 backdrop-blur-lg">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-accent" aria-hidden="true" />
            <span className="text-lg font-bold text-foreground">ClaimPilot AI</span>
          </div>
          <button
            onClick={() => navigateWithLoader("/")}
            className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-md"
            aria-label="Close onboarding and return to home"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </header>

      {/* Progress */}
      <div className="max-w-3xl mx-auto w-full px-6 pt-10" role="progressbar" aria-valuenow={step} aria-valuemin={1} aria-valuemax={3} aria-label={`Step ${step} of 3: ${stepLabels[step - 1]}`}>
        <div className="flex items-center gap-3 mb-2">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex-1 flex items-center gap-3">
              <div className={`h-2 flex-1 rounded-full transition-colors duration-300 ${s <= step ? "gradient-accent" : "bg-muted"}`} />
            </div>
          ))}
        </div>
        <p className="text-sm text-muted-foreground mb-10">Step {step} of 3 — {stepLabels[step - 1]}</p>
      </div>

      {/* Content */}
      <main id="onboarding-content" className="flex-1 max-w-3xl mx-auto w-full px-6 pb-10">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} role="group" aria-labelledby="step1-heading">
              <h2 id="step1-heading" className="text-2xl font-bold text-foreground mb-2">What type of denial did you receive?</h2>
              <p className="text-muted-foreground mb-8">Select the category that best describes your insurance denial.</p>
              <div className="grid sm:grid-cols-2 gap-4" role="radiogroup" aria-label="Denial type selection">
                {denialTypes.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedType(t.id)}
                    role="radio"
                    aria-checked={selectedType === t.id}
                    className={`flex items-start gap-4 p-5 rounded-xl border-2 text-left transition-all duration-200 ${
                      selectedType === t.id
                        ? "border-accent bg-emerald-light shadow-glow"
                        : "border-border bg-card hover:border-accent/40 hover:shadow-card"
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${selectedType === t.id ? "gradient-accent" : "bg-muted"}`} aria-hidden="true">
                      <t.icon className={`h-5 w-5 ${selectedType === t.id ? "text-accent-foreground" : "text-muted-foreground"}`} />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{t.label}</p>
                      <p className="text-sm text-muted-foreground">{t.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} role="group" aria-labelledby="step2-heading">
              <h2 id="step2-heading" className="text-2xl font-bold text-foreground mb-2">Upload your documents</h2>
              <p className="text-muted-foreground mb-8">Drag and drop or click to upload. These help our AI analyze your case.</p>
              <div className="space-y-4">
                {docSlots.map((doc) => (
                  <button
                    key={doc.id}
                    className={`w-full relative flex items-center gap-4 p-6 rounded-xl border-2 border-dashed transition-all duration-200 text-left hover:border-accent/60 ${
                      uploadedDocs[doc.id] ? "border-accent bg-emerald-light" : "border-border bg-card"
                    }`}
                    onClick={() => setUploadedDocs((prev) => ({ ...prev, [doc.id]: doc.label + ".pdf" }))}
                    aria-label={`Upload ${doc.label}${uploadedDocs[doc.id] ? " — uploaded" : ""}`}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${uploadedDocs[doc.id] ? "gradient-accent" : "bg-muted"}`} aria-hidden="true">
                      <Upload className={`h-5 w-5 ${uploadedDocs[doc.id] ? "text-accent-foreground" : "text-muted-foreground"}`} />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">{doc.label}</p>
                      <p className="text-sm text-muted-foreground">{uploadedDocs[doc.id] ? `✓ ${uploadedDocs[doc.id]}` : doc.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} role="group" aria-labelledby="step3-heading">
              <h2 id="step3-heading" className="text-2xl font-bold text-foreground mb-2">Patient & Claim Information</h2>
              <p className="text-muted-foreground mb-8">Tell us about the procedure and your insurance details.</p>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="procedure">Procedure Name</Label>
                  <Input id="procedure" placeholder="e.g., Knee Arthroscopy" value={form.procedure} onChange={(e) => setForm({ ...form, procedure: e.target.value })} aria-required="true" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cpt">CPT Code</Label>
                  <Input id="cpt" placeholder="e.g., 29881" value={form.cpt} onChange={(e) => setForm({ ...form, cpt: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="provider">Insurance Provider</Label>
                  <Input id="provider" placeholder="e.g., Blue Cross Blue Shield" value={form.provider} onChange={(e) => setForm({ ...form, provider: e.target.value })} aria-required="true" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bill">Estimated Bill</Label>
                  <Input id="bill" placeholder="e.g., $18,420" value={form.bill} onChange={(e) => setForm({ ...form, bill: e.target.value })} />
                </div>
                <div className="sm:col-span-2 space-y-2">
                  <Label htmlFor="description">Describe your situation</Label>
                  <Textarea id="description" placeholder="Briefly describe the circumstances of your denial..." value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={4} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Bottom bar */}
      <footer className="border-t border-border bg-card/80 backdrop-blur-lg">
        <div className="max-w-3xl mx-auto px-6 py-4 flex justify-between">
          <Button variant="ghost" onClick={() => step > 1 ? setStep(step - 1) : navigateWithLoader("/")} className="gap-2">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back
          </Button>
          <Button onClick={handleNext} disabled={!canProceed} className="gradient-accent text-accent-foreground shadow-glow gap-2 px-8" aria-label={step === 3 ? "Analyze claim and go to dashboard" : `Continue to step ${step + 1}`}>
            {step === 3 ? "Analyze Claim" : "Continue"} <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </footer>
    </div>
    </>
  );
}
