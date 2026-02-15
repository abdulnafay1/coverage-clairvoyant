import { useState } from "react";
import { Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useClaim } from "@/contexts/ClaimContext";

const tones = ["Formal Legal", "Patient Advocacy", "Medical Emphasis", "Financial Hardship"];

const fallbackLetter = `[No AI analysis available yet. Please complete the onboarding flow to generate your personalized appeal letter.]`;

export default function AppealBuilder() {
  const { analysis } = useClaim();
  const [selectedTone, setSelectedTone] = useState("Formal Legal");

  const letter = analysis?.appealLetter ?? fallbackLetter;

  return (
    <section aria-labelledby="appeal-heading">
      <h2 id="appeal-heading" className="text-xl font-bold text-foreground mb-6">Appeal Builder Studio</h2>
      <div className="grid lg:grid-cols-[1fr_280px] gap-6">
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/30">
            <FileText className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
            <span className="text-sm font-medium text-muted-foreground">Appeal Letter Draft</span>
          </div>
          <label htmlFor="appeal-letter" className="sr-only">Appeal letter content</label>
          <textarea
            id="appeal-letter"
            className="w-full h-[300px] sm:h-[400px] lg:h-[500px] p-4 sm:p-6 text-sm font-mono leading-relaxed text-foreground bg-card resize-none focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            defaultValue={letter}
            key={letter}
          />
        </div>

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
