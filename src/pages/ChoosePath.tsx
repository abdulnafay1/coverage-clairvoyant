import { motion } from "framer-motion";
import { Shield, FileText, ShieldAlert, ArrowRight } from "lucide-react";
import { usePageTransition } from "@/hooks/usePageTransition";
import PageLoader from "@/components/PageLoader";

const paths = [
  {
    id: "file-claim",
    icon: FileText,
    title: "I want to file a claim",
    description: "Submit a new insurance claim with AI-powered guidance to maximize your approval chances.",
    route: "/file-claim",
    accent: "gradient-hero",
  },
  {
    id: "appeal-denial",
    icon: ShieldAlert,
    title: "My claim got denied, I want to appeal",
    description: "Upload your denial letter and let our AI build a stronger appeal with legal citations and evidence.",
    route: "/onboarding",
    accent: "gradient-accent",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};

export default function ChoosePath() {
  const { loading, navigateWithLoader } = usePageTransition();

  return (
    <>
      {loading && <PageLoader />}
      <div className="min-h-screen bg-background flex flex-col">
        <a href="#choose-content" className="skip-link">Skip to content</a>

        <header className="border-b border-border bg-card/80 backdrop-blur-lg">
          <div className="max-w-3xl mx-auto px-6 h-16 flex items-center">
            <button onClick={() => navigateWithLoader("/")} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Shield className="h-6 w-6 text-accent" aria-hidden="true" />
              <span className="text-lg font-bold text-foreground">CareClaim</span>
            </button>
          </div>
        </header>

        <main id="choose-content" className="flex-1 flex items-center justify-center px-6 py-16">
          <motion.div
            initial="hidden"
            animate="visible"
            className="max-w-2xl w-full space-y-10"
          >
            <motion.div variants={fadeUp} custom={0} className="text-center space-y-3">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground">How can we help you?</h1>
              <p className="text-muted-foreground text-lg">Choose the option that best describes your situation.</p>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-6">
              {paths.map((path, i) => (
                <motion.button
                  key={path.id}
                  variants={fadeUp}
                  custom={i + 1}
                  onClick={() => navigateWithLoader(path.route)}
                  className="group relative flex flex-col items-start text-left p-8 rounded-2xl border-2 border-border bg-card hover:border-accent/60 hover:shadow-card-hover transition-all duration-300"
                >
                  <div className={`w-14 h-14 rounded-xl ${path.accent} flex items-center justify-center mb-6`} aria-hidden="true">
                    <path.icon className="h-7 w-7 text-accent-foreground" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground mb-2">{path.title}</h2>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">{path.description}</p>
                  <div className="mt-auto flex items-center gap-2 text-accent font-semibold text-sm group-hover:gap-3 transition-all">
                    Get Started <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </main>
      </div>
    </>
  );
}
