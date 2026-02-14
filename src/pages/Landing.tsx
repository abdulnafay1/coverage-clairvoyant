import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Shield, BarChart3, FileCheck, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-illustration.png";

const features = [
  {
    icon: BarChart3,
    title: "Claim Strength Scoring",
    description: "AI analyzes your denial against policy terms, medical necessity, and precedent to score your appeal potential.",
  },
  {
    icon: Sparkles,
    title: "AI Appeal Builder",
    description: "Generate professionally structured appeal letters with legal citations, policy references, and medical evidence.",
  },
  {
    icon: FileCheck,
    title: "Smart Evidence Checklist",
    description: "Auto-generated checklist of required documents with risk impact scoring for missing items.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <a href="#main-content" className="skip-link">Skip to main content</a>

      {/* Nav */}
      <nav aria-label="Main navigation" className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-7 w-7 text-accent" aria-hidden="true" />
            <span className="text-xl font-bold text-foreground">ClaimPilot AI</span>
          </div>
          <Button variant="default" size="sm" onClick={() => navigate("/onboarding")}>
            Get Started
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <main id="main-content">
        <section aria-labelledby="hero-heading" className="pt-32 pb-20 px-6">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-light text-accent text-sm font-medium">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                AI-Powered Denial Recovery
              </motion.div>
              <motion.h1 id="hero-heading" variants={fadeUp} custom={1} className="text-5xl lg:text-6xl font-extrabold leading-[1.1] text-foreground">
                Denied health insurance coverage?{" "}
                <span className="text-gradient">Fight back with AI.</span>
              </motion.h1>
              <motion.p variants={fadeUp} custom={2} className="text-lg text-muted-foreground max-w-lg leading-relaxed">
                Upload your denial. We analyze your policy, score your case, and generate a stronger appeal — in minutes, not weeks.
              </motion.p>
              <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-4">
                <Button size="lg" className="gradient-accent text-accent-foreground shadow-glow px-8 h-12 text-base font-semibold" onClick={() => navigate("/onboarding")}>
                  Analyze My Claim
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Button>
                <Button variant="outline" size="lg" className="h-12 text-base px-8" onClick={() => navigate("/dashboard")}>
                  See Demo
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="relative hidden lg:block"
            >
              <div className="absolute -inset-4 rounded-3xl bg-primary/5 blur-3xl" aria-hidden="true" />
              <img
                src={heroImage}
                alt="Preview of the ClaimPilot AI dashboard showing claim strength scoring and appeal builder features"
                className="relative rounded-2xl shadow-card w-full"
              />
            </motion.div>
          </div>
        </section>

        {/* Features */}
        <section aria-labelledby="features-heading" className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-16"
            >
              <motion.h2 id="features-heading" variants={fadeUp} custom={0} className="text-3xl font-bold text-foreground mb-4">
                Everything you need to overturn a denial
              </motion.h2>
              <motion.p variants={fadeUp} custom={1} className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Our AI engine combines policy analysis, medical coding standards, and regulatory knowledge to build the strongest possible appeal.
              </motion.p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, i) => (
                <motion.article
                  key={feature.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                  variants={fadeUp}
                  className="group gradient-card rounded-2xl p-8 border border-border/50 shadow-card hover:shadow-card-hover transition-shadow duration-300"
                >
                  <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center mb-6" aria-hidden="true">
                    <feature.icon className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-accent" aria-hidden="true" />
            <span className="font-semibold text-foreground">ClaimPilot AI</span>
          </div>
          <p>© 2026 ClaimPilot AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
