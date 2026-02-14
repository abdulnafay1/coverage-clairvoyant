import { motion } from "framer-motion";
import { Shield } from "lucide-react";

export default function PageLoader() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
    >
      <div className="relative flex flex-col items-center gap-6">
        <div className="relative">
          <div className="h-12 w-12 rounded-full border-4 border-muted border-t-accent animate-spin" />
          <Shield className="absolute inset-0 m-auto h-5 w-5 text-accent" />
        </div>
        <p className="text-sm font-medium text-muted-foreground animate-pulse">Loading…</p>
      </div>
    </motion.div>
  );
}
