import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, ArrowRight, ArrowLeft, Upload, Stethoscope, AlertTriangle, Pill, MapPin, FileText, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

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
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [uploadedDocs, setUploadedDocs] = useState<Record<string, string>>({});
  const [form, setForm] = useState({ procedure: "", cpt: "", provider: "", bill: "", description: "" });

  const canProceed = step === 1 ? !!selectedType : step === 2 ? true : form.procedure && form.provider;

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top bar */}
      <div className="border-b border-border bg-card/80 backdrop-blur-lg">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-accent" />
            <span className="text-lg font-bold text-foreground">ClaimPilot AI</span>
          </div>
          <button onClick={() => navigate("/")} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Progress */}
      <div className="max-w-3xl mx-auto w-full px-6 pt-10">
        <div className="flex items-center gap-3 mb-2">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex-1 flex items-center gap-3">
              <div className={`h-2 flex-1 rounded-full transition-colors duration-300 ${s <= step ? "gradient-accent" : "bg-muted"}`} />
            </div>
          ))}
        </div>
        <p className="text-sm text-muted-foreground mb-10">Step {step} of 3</p>
      </div>

      {/* Content */}
      <div className="flex-1 max-w-3xl mx-auto w-full px-6 pb-10">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              <h2 className="text-2xl font-bold text-foreground mb-2">What type of denial did you receive?</h2>
              <p className="text-muted-foreground mb-8">Select the category that best describes your insurance denial.</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {denialTypes.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedType(t.id)}
                    className={`flex items-start gap-4 p-5 rounded-xl border-2 text-left transition-all duration-200 ${
                      selectedType === t.id
                        ? "border-accent bg-emerald-light shadow-glow"
                        : "border-border bg-card hover:border-accent/40 hover:shadow-card"
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${selectedType === t.id ? "gradient-accent" : "bg-muted"}`}>
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
            <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              <h2 className="text-2xl font-bold text-foreground mb-2">Upload your documents</h2>
              <p className="text-muted-foreground mb-8">Drag and drop or click to upload. These help our AI analyze your case.</p>
              <div className="space-y-4">
                {docSlots.map((doc) => (
                  <div
                    key={doc.id}
                    className={`relative flex items-center gap-4 p-6 rounded-xl border-2 border-dashed transition-all duration-200 cursor-pointer hover:border-accent/60 ${
                      uploadedDocs[doc.id] ? "border-accent bg-emerald-light" : "border-border bg-card"
                    }`}
                    onClick={() => setUploadedDocs((prev) => ({ ...prev, [doc.id]: doc.label + ".pdf" }))}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${uploadedDocs[doc.id] ? "gradient-accent" : "bg-muted"}`}>
                      <Upload className={`h-5 w-5 ${uploadedDocs[doc.id] ? "text-accent-foreground" : "text-muted-foreground"}`} />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">{doc.label}</p>
                      <p className="text-sm text-muted-foreground">{uploadedDocs[doc.id] ? `✓ ${uploadedDocs[doc.id]}` : doc.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              <h2 className="text-2xl font-bold text-foreground mb-2">Patient & Claim Information</h2>
              <p className="text-muted-foreground mb-8">Tell us about the procedure and your insurance details.</p>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Procedure Name</Label>
                  <Input placeholder="e.g., Knee Arthroscopy" value={form.procedure} onChange={(e) => setForm({ ...form, procedure: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>CPT Code</Label>
                  <Input placeholder="e.g., 29881" value={form.cpt} onChange={(e) => setForm({ ...form, cpt: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Insurance Provider</Label>
                  <Input placeholder="e.g., Blue Cross Blue Shield" value={form.provider} onChange={(e) => setForm({ ...form, provider: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Estimated Bill</Label>
                  <Input placeholder="e.g., $18,420" value={form.bill} onChange={(e) => setForm({ ...form, bill: e.target.value })} />
                </div>
                <div className="sm:col-span-2 space-y-2">
                  <Label>Describe your situation</Label>
                  <Textarea placeholder="Briefly describe the circumstances of your denial..." value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={4} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border bg-card/80 backdrop-blur-lg">
        <div className="max-w-3xl mx-auto px-6 py-4 flex justify-between">
          <Button variant="ghost" onClick={() => step > 1 ? setStep(step - 1) : navigate("/")} className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
          <Button onClick={handleNext} disabled={!canProceed} className="gradient-accent text-accent-foreground shadow-glow gap-2 px-8">
            {step === 3 ? "Analyze Claim" : "Continue"} <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
