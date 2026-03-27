"use client";

import { motion } from "framer-motion";
import { Hammer } from "lucide-react";

export default function PlaceholderPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[60vh] text-center px-6">
      <motion.div 
        initial={{ rotate: -10 }}
        animate={{ rotate: 10 }}
        transition={{ repeat: Infinity, duration: 1, repeatType: "reverse" }}
        className="mb-8"
      >
        <Hammer className="w-16 h-16 text-gold opacity-50" />
      </motion.div>
      <h1 className="text-3xl font-serif text-white font-bold mb-4">Module Under Construction</h1>
      <p className="text-muted max-w-md mx-auto">
        This feature is part of the Phase 2 rollout. The UI is being polished for a production-grade experience.
      </p>
      <button 
        onClick={() => window.history.back()}
        className="mt-8 px-6 py-2 border border-gold/30 text-gold rounded-full hover:bg-gold/10 transition-colors"
      >
        Go Back
      </button>
    </div>
  );
}
