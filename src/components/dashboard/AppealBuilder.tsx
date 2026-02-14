import { useState } from "react";
import { Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const tones = ["Formal Legal", "Patient Advocacy", "Medical Emphasis", "Financial Hardship"];

const mockLetter = `[Date: February 14, 2026]

Blue Cross Blue Shield
Attn: Appeals Department
P.O. Box 105568
Atlanta, GA 30348

RE: Appeal of Claim Denial — Claim #CLM-2026-04892
Member: John Patterson
Member ID: BCBS-884721
CPT Code: 29881 — Knee Arthroscopy
Date of Service: January 22, 2026

Dear Appeals Review Board,

I am writing to formally appeal the denial of coverage for the above-referenced knee arthroscopy procedure (CPT 29881), performed on January 22, 2026, by Dr. Sarah Mitchell at Northwest Medical Center.

MEDICAL NECESSITY

The procedure was deemed medically necessary by the treating orthopedic surgeon based on the following clinical findings:
• MRI dated December 15, 2025, revealed a complex meniscal tear (medial compartment)
• Conservative treatment (physical therapy, NSAIDs, corticosteroid injections) was attempted for 8 weeks without improvement
• Patient experienced significant functional impairment affecting daily activities and employment

Per AMA CPT guidelines and AAOS clinical practice recommendations, arthroscopic intervention is the standard of care when conservative treatment fails for meniscal pathology of this severity.

POLICY COVERAGE

Under Section 4.2.1 of the member's policy (Plan ID: PPO-Gold-2025), orthopedic surgical procedures are covered when:
1. Medical necessity is established by the treating physician
2. Conservative treatment has been attempted and documented
3. The procedure is performed at an in-network facility

All three conditions have been met in this case.

REQUESTED ACTION

I respectfully request that Blue Cross Blue Shield reverse the denial of Claim #CLM-2026-04892 and process payment in the amount of $18,420.00 in accordance with the member's plan benefits.

Sincerely,
John Patterson`;

export default function AppealBuilder() {
  const [selectedTone, setSelectedTone] = useState("Formal Legal");

  return (
    <section aria-labelledby="appeal-heading">
      <h2 id="appeal-heading" className="text-xl font-bold text-foreground mb-6">Appeal Builder Studio</h2>
        <div className="grid lg:grid-cols-[1fr_280px] gap-6">
        {/* Editor */}
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/30">
            <FileText className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
            <span className="text-sm font-medium text-muted-foreground">Appeal Letter Draft</span>
          </div>
          <label htmlFor="appeal-letter" className="sr-only">Appeal letter content</label>
          <textarea
            id="appeal-letter"
            className="w-full h-[300px] sm:h-[400px] lg:h-[500px] p-4 sm:p-6 text-sm font-mono leading-relaxed text-foreground bg-card resize-none focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            defaultValue={mockLetter}
          />
        </div>

        {/* Side panel */}
        <div className="space-y-6">
          <fieldset className="rounded-xl border border-border bg-card p-5">
            <legend className="text-sm font-semibold text-foreground mb-3 px-1">Tone Selector</legend>
            <div className="space-y-2" role="radiogroup" aria-label="Appeal letter tone">
              {tones.map((tone) => (
                <button
                  key={tone}
                  onClick={() => setSelectedTone(tone)}
                  role="radio"
                  aria-checked={selectedTone === tone}
                  className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    selectedTone === tone
                      ? "gradient-accent text-accent-foreground shadow-glow"
                      : "bg-muted text-muted-foreground hover:bg-secondary"
                  }`}
                >
                  {tone}
                </button>
              ))}
            </div>
          </fieldset>

          <Button className="w-full gradient-accent text-accent-foreground shadow-glow gap-2 h-11">
            <Download className="h-4 w-4" aria-hidden="true" />
            Download as PDF
          </Button>

          <div className="rounded-xl border border-border bg-card p-5 text-sm">
            <h3 className="font-semibold text-foreground mb-2">Includes</h3>
            <ul className="space-y-1.5 text-muted-foreground">
              <li>✓ Legal citations</li>
              <li>✓ Policy references</li>
              <li>✓ Medical evidence</li>
              <li>✓ Structured formatting</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
