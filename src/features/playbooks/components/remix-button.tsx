"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GitFork, Check } from "lucide-react";

interface RemixButtonProps {
  playbookTitle: string;
  remixCount: number;
}

interface Particle {
  id: number;
  x: number;
  y: number;
}

function generateParticles(): Particle[] {
  return Array.from({ length: 12 }, (_, i) => {
    const angle = (i / 12) * 2 * Math.PI;
    const distance = 35 + Math.random() * 35;
    return {
      id: i,
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
    };
  });
}

export function RemixButton({ playbookTitle, remixCount }: RemixButtonProps) {
  const [remixed, setRemixed] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [showShimmer, setShowShimmer] = useState(false);

  const handleRemix = useCallback(() => {
    if (remixed) return;

    setParticles(generateParticles());
    setShowShimmer(true);
    setRemixed(true);

    setTimeout(() => setParticles([]), 700);
    setTimeout(() => setShowShimmer(false), 600);
  }, [remixed]);

  return (
    <div className="relative flex flex-col items-stretch">
      {/* Particle burst layer */}
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center overflow-visible">
        <AnimatePresence>
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute h-1.5 w-1.5 rounded-full bg-accent"
              initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              animate={{
                x: p.x,
                y: p.y,
                opacity: 0,
                scale: 0.2,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Main button */}
      <motion.button
        onClick={handleRemix}
        className={`relative z-0 flex items-center justify-center gap-3 overflow-hidden rounded-r px-6 py-4 text-base font-semibold transition-shadow ${
          remixed
            ? "border border-success/30 bg-success/10 text-success shadow-[0_0_20px_rgba(52,211,153,0.1)]"
            : "bg-accent text-white shadow-[0_0_24px_rgba(108,99,255,0.25)] hover:shadow-[0_0_32px_rgba(108,99,255,0.35)]"
        }`}
        whileHover={remixed ? {} : { scale: 1.02 }}
        whileTap={remixed ? {} : { scale: 0.96 }}
      >
        {/* Shimmer sweep */}
        <AnimatePresence>
          {showShimmer && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          )}
        </AnimatePresence>

        {/* Button content with icon morph */}
        <AnimatePresence mode="wait">
          {remixed ? (
            <motion.span
              key="done"
              className="flex items-center gap-2"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Check size={18} />
              Remixed to Workspace
            </motion.span>
          ) : (
            <motion.span
              key="cta"
              className="flex items-center gap-2"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.2 }}
            >
              <GitFork size={18} />
              Remix This Playbook
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Remix count */}
      <p className="mt-2 text-center text-xs text-foreground-ghost">
        {(remixCount + (remixed ? 1 : 0)).toLocaleString()} creators remixed
        this
      </p>
    </div>
  );
}
