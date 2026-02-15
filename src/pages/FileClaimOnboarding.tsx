import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, ArrowRight, ArrowLeft, Upload, X, Loader2, Stethoscope, Heart, Bone, Eye as EyeIcon, Baby } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { usePageTransition } from "@/hooks/usePageTransition";
import { useClaim } from "@/contexts/ClaimContext";
import { supabase } from "@/integrations/supabase/client";
import PageLoader from "@/components/PageLoader";
import { toast } from "@/hooks/use-toast";

const claimCategories = [
  { id: "medical", label: "Medical / Surgical", icon: Stethoscope, desc: "Hospital visits, surgeries, procedures" },
  { id: "preventive", label: "Preventive Care", icon: Heart, desc: "Annual checkups, screenings, vaccines" },
  { id: "specialist", label: "Specialist Visit", icon: Bone, desc: "Orthopedics, dermatology, etc." },
  { id: "vision", label: "Vision / Dental", icon: EyeIcon, desc: "Eye exams, dental procedures" },
  { id: "maternity", label: "Maternity", icon: Baby, desc: "Prenatal, delivery, postnatal care" },
];

const docSlots = [
  { id: "invoice", label: "Medical Invoice / Bill", desc: "Itemized bill from your provider", accept: ".pdf,.doc,.docx,.jpg,.png" },
  { id: "records", label: "Medical Records", desc: "Relevant treatment records", accept: ".pdf,.doc,.docx,.jpg,.png" },
  { id: "referral", label: "Referral / Authorization", desc: "If applicable", accept: ".pdf,.doc,.docx,.jpg,.png" },
];

export default function FileClaimOnboarding() {
  const { loading, navigateWithLoader } = usePageTransition();
  const { setOnboardingData } = useClaim();
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [uploadedDocs, setUploadedDocs] = useState<Record<string, { name: string; path: string }>>({});
  const [uploading, setUploading] = useState<string | null>(null);
  const [form, setForm] = useState({ procedure: "", cpt: "", provider: "", bill: "", description: "" });
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const canProceed = step === 1 ? !!selectedCategory : step === 2 ? true : form.procedure && form.provider;

  const handleFileUpload = async (slotId: string, file: File) => {
    setUploading(slotId);
    const fileExt = file.name.split(".").pop();
    const filePath = `${crypto.randomUUID()}.${fileExt}`;
    const { error } = await supabase.storage.from("claim-documents").upload(filePath, file);
    if (error) {
      toast({ title: "Upload failed", description: error.message, variant: "destructive" });
      setUploading(null);
      return;
    }
    setUploadedDocs((prev) => ({ ...prev, [slotId]: { name: file.name, path: filePath } }));
    setUploading(null);
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      setOnboardingData({
        denialType: selectedCategory || "",
        filePaths: Object.values(uploadedDocs).map((d) => d.path),
        form,
      });
      navigateWithLoader("/analyzing-claim?flow=file");
    }
  };

  const stepLabels = ["Claim Category", "Upload Documents", "Claim Details"];

  return (
    <>
      {loading && <PageLoader />}
      <div className="min-h-screen bg-background flex flex-col">
        <a href="#onboarding-content" className="skip-link">Skip to content</a>

        <header className="border-b border-border bg-card/80 backdrop-blur-lg">
          <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-accent" aria-hidden="true" />
              <span className="text-lg font-bold text-foreground">CareClaim</span>
            </div>
            <button onClick={() => navigateWithLoader("/choose-path")} className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-md" aria-label="Go back">
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </header>

        <div className="max-w-3xl mx-auto w-full px-6 pt-10" role="progressbar" aria-valuenow={step} aria-valuemin={1} aria-valuemax={3} aria-label={`Step ${step} of 3: ${stepLabels[step - 1]}`}>
          <div className="flex items-center gap-3 mb-2">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex-1"><div className={`h-2 rounded-full transition-colors duration-300 ${s <= step ? "gradient-accent" : "bg-muted"}`} /></div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mb-10">Step {step} of 3 — {stepLabels[step - 1]}</p>
        </div>

        <main id="onboarding-content" className="flex-1 max-w-3xl mx-auto w-full px-6 pb-10">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} role="group" aria-labelledby="step1-heading">
                <h2 id="step1-heading" className="text-2xl font-bold text-foreground mb-2">What type of claim are you filing?</h2>
                <p className="text-muted-foreground mb-8">Select the category that best matches your medical service.</p>
                <div className="grid sm:grid-cols-2 gap-4" role="radiogroup" aria-label="Claim category selection">
                  {claimCategories.map((t) => (
                    <button key={t.id} onClick={() => setSelectedCategory(t.id)} role="radio" aria-checked={selectedCategory === t.id}
                      className={`flex items-start gap-4 p-5 rounded-xl border-2 text-left transition-all duration-200 ${
                        selectedCategory === t.id ? "border-accent bg-emerald-light shadow-glow" : "border-border bg-card hover:border-accent/40 hover:shadow-card"
                      }`}>
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${selectedCategory === t.id ? "gradient-accent" : "bg-muted"}`} aria-hidden="true">
                        <t.icon className={`h-5 w-5 ${selectedCategory === t.id ? "text-accent-foreground" : "text-muted-foreground"}`} />
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
                <h2 id="step2-heading" className="text-2xl font-bold text-foreground mb-2">Upload supporting documents</h2>
                <p className="text-muted-foreground mb-8">These help our AI prepare a stronger claim submission.</p>
                <div className="space-y-4">
                  {docSlots.map((doc) => (
                    <div key={doc.id}>
                      <input type="file" ref={(el) => { fileInputRefs.current[doc.id] = el; }} accept={doc.accept} className="hidden"
                        onChange={(e) => { const file = e.target.files?.[0]; if (file) handleFileUpload(doc.id, file); }} />
                      <button
                        className={`w-full relative flex items-center gap-4 p-6 rounded-xl border-2 border-dashed transition-all duration-200 text-left hover:border-accent/60 ${
                          uploadedDocs[doc.id] ? "border-accent bg-emerald-light" : "border-border bg-card"
                        }`}
                        onClick={() => fileInputRefs.current[doc.id]?.click()}
                        disabled={uploading === doc.id}
                        aria-label={`Upload ${doc.label}${uploadedDocs[doc.id] ? " — uploaded" : ""}`}>
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${uploadedDocs[doc.id] ? "gradient-accent" : "bg-muted"}`} aria-hidden="true">
                          {uploading === doc.id ? <Loader2 className="h-5 w-5 text-muted-foreground animate-spin" /> : <Upload className={`h-5 w-5 ${uploadedDocs[doc.id] ? "text-accent-foreground" : "text-muted-foreground"}`} />}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-foreground">{doc.label}</p>
                          <p className="text-sm text-muted-foreground">{uploading === doc.id ? "Uploading..." : uploadedDocs[doc.id] ? `✓ ${uploadedDocs[doc.id].name}` : doc.desc}</p>
                        </div>
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} role="group" aria-labelledby="step3-heading">
                <h2 id="step3-heading" className="text-2xl font-bold text-foreground mb-2">Claim Details</h2>
                <p className="text-muted-foreground mb-8">Provide details about the medical service for your claim.</p>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="procedure">Procedure / Service</Label>
                    <Input id="procedure" placeholder="e.g., MRI Scan" value={form.procedure} onChange={(e) => setForm({ ...form, procedure: e.target.value })} aria-required="true" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cpt">CPT / Service Code</Label>
                    <Input id="cpt" placeholder="e.g., 70553" value={form.cpt} onChange={(e) => setForm({ ...form, cpt: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="provider">Insurance Provider</Label>
                    <Input id="provider" placeholder="e.g., Aetna" value={form.provider} onChange={(e) => setForm({ ...form, provider: e.target.value })} aria-required="true" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bill">Total Bill Amount</Label>
                    <Input id="bill" placeholder="e.g., $2,500" value={form.bill} onChange={(e) => setForm({ ...form, bill: e.target.value })} />
                  </div>
                  <div className="sm:col-span-2 space-y-2">
                    <Label htmlFor="description">Describe your situation</Label>
                    <Textarea id="description" placeholder="Briefly describe the medical service and why you believe it should be covered..." value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={4} />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <footer className="border-t border-border bg-card/80 backdrop-blur-lg">
          <div className="max-w-3xl mx-auto px-6 py-4 flex justify-between">
            <Button variant="ghost" onClick={() => step > 1 ? setStep(step - 1) : navigateWithLoader("/choose-path")} className="gap-2">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back
            </Button>
            <Button onClick={handleNext} disabled={!canProceed} className="gradient-accent text-accent-foreground shadow-glow gap-2 px-8" aria-label={step === 3 ? "Submit claim for analysis" : `Continue to step ${step + 1}`}>
              {step === 3 ? "Analyze My Claim" : "Continue"} <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </footer>
      </div>
    </>
  );
}
