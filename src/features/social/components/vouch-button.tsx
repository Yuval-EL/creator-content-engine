"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Lock, Check } from "lucide-react";
import type { VouchGateState } from "../types";

interface VouchButtonProps {
  gate: VouchGateState;
  targetName: string;
}

export function VouchButton({ gate, targetName }: VouchButtonProps) {
  const [vouched, setVouched] = useState(gate.hasVouched);
  const progress = (gate.currentScore / gate.requiredScore) * 100;

  const handleVouch = useCallback(() => {
    if (!gate.canVouch || vouched) return;
    setVouched(true);
  }, [gate.canVouch, vouched]);

  // ── Gated state: user lacks authority ──
  if (!gate.canVouch) {
    return (
      <motion.div
        className="rounded-r2 border border-border bg-background-card p-6"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="flex items-center gap-2 text-foreground-ghost">
          <Lock size={14} />
          <span className="text-xs font-semibold uppercase tracking-widest">
            Authority Required
          </span>
        </div>

        <p className="mt-3 text-sm text-foreground-sub">
          Reach a score of{" "}
          <span className="font-semibold text-foreground">
            {gate.requiredScore}
          </span>{" "}
          to vouch for {targetName}.
        </p>

        {/* Progress bar */}
        <div className="mt-4">
          <div className="mb-1.5 flex justify-between text-xs">
            <span className="text-foreground-sub">
              Your score:{" "}
              <span className="font-semibold text-foreground">
                {gate.currentScore}
              </span>
            </span>
            <span className="text-foreground-ghost">{gate.requiredScore}</span>
          </div>
          <div className="h-2 overflow-hidden rounded-r-full bg-border">
            <motion.div
              className="h-full rounded-r-full bg-foreground-ghost"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </div>

        <p className="mt-3 text-xs leading-relaxed text-foreground-ghost">
          Build authority by publishing playbooks, earning vouches, and
          maintaining your creation streak.
        </p>
      </motion.div>
    );
  }

  // ── Unlocked state: can vouch ──
  return (
    <motion.div
      className="rounded-r2 border border-border bg-background-card p-6"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <motion.button
        onClick={handleVouch}
        disabled={vouched}
        className={`flex w-full items-center justify-center gap-2.5 rounded-r px-5 py-3 text-sm font-semibold transition-shadow ${
          vouched
            ? "border border-success/30 bg-success/10 text-success"
            : "bg-accent text-white shadow-[0_0_20px_rgba(108,99,255,0.2)] hover:shadow-[0_0_28px_rgba(108,99,255,0.3)]"
        }`}
        whileHover={vouched ? {} : { scale: 1.02 }}
        whileTap={vouched ? {} : { scale: 0.97 }}
      >
        <AnimatePresence mode="wait">
          {vouched ? (
            <motion.span
              key="done"
              className="flex items-center gap-2"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Check size={16} />
              Vouched for {targetName}
            </motion.span>
          ) : (
            <motion.span
              key="cta"
              className="flex items-center gap-2"
              exit={{ opacity: 0, y: 6 }}
            >
              <Heart size={16} />
              Vouch for {targetName}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {!vouched && (
        <p className="mt-3 text-center text-xs text-foreground-ghost">
          Your vouch weight is based on your authority score
        </p>
      )}
    </motion.div>
  );
}
