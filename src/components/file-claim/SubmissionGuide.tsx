import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Send, CheckCircle, Clock, FileText } from "lucide-react";
import { useClaim } from "@/contexts/ClaimContext";
import { Button } from "@/components/ui/button";

const defaultSteps = [
  { icon: FileText, title: "Gather Documents", description: "Collect your medical bills, records, and insurance card information." },
  { icon: CheckCircle, title: "Verify Coverage", description: "Review your policy to confirm the procedure is covered under your plan." },
  { icon: Send, title: "Submit to Insurer", description: "Send your claim via your insurer's portal, mail, or fax with all supporting documents." },
  { icon: Clock, title: "Track & Follow Up", description: "Monitor your claim status and follow up within 30 days if no response." },
];

export default function SubmissionGuide() {
  const { analysis } = useClaim();

  return (
    <section aria-labelledby="submission-heading" className="space-y-6">
      <div>
        <h2 id="submission-heading" className="text-xl font-bold text-foreground mb-2">Submission Guide</h2>
        <p className="text-muted-foreground">Follow these steps to submit your claim for the best chance of approval.</p>
      </div>

      <div className="space-y-4">
        {defaultSteps.map((step, i) => (
          <Card key={i} className="gradient-card border-border/50 shadow-card">
            <CardContent className="flex items-start gap-4 pt-6">
              <div className="w-10 h-10 rounded-xl gradient-accent flex items-center justify-center shrink-0" aria-hidden="true">
                <step.icon className="h-5 w-5 text-accent-foreground" />
              </div>
              <div>
                <p className="font-semibold text-foreground mb-1">Step {i + 1}: {step.title}</p>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {analysis?.appealLetter && (
        <Card className="gradient-card border-border/50 shadow-card">
          <CardHeader>
            <CardTitle className="text-base">AI-Generated Claim Letter</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-muted/30 rounded-xl p-6 text-sm text-foreground whitespace-pre-wrap leading-relaxed max-h-96 overflow-y-auto">
              {analysis.appealLetter}
            </div>
            <Button className="mt-4 gradient-accent text-accent-foreground shadow-glow" onClick={() => navigator.clipboard.writeText(analysis.appealLetter)}>
              Copy Letter
            </Button>
          </CardContent>
        </Card>
      )}
    </section>
  );
}
