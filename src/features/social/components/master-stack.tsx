"use client";

import { motion } from "framer-motion";
import type { NicheExpertise } from "../types";

interface MasterStackProps {
  expertise: NicheExpertise[];
}

function ExpertiseBar({
  item,
  index,
}: {
  item: NicheExpertise;
  index: number;
}) {
  const isHigh = item.score >= 80;

  return (
    <motion.div
      className="flex items-center gap-4"
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.4,
        delay: 0.5 + index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {/* Label */}
      <span className="w-28 shrink-0 text-right text-sm text-foreground-sub">
        {item.label}
      </span>

      {/* Track */}
      <div className="relative h-2 flex-1 overflow-hidden rounded-r-full bg-border">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-r-full"
          style={{
            backgroundColor: isHigh ? "var(--ac)" : "var(--tx-ghost)",
          }}
          initial={{ width: 0 }}
          animate={{ width: `${item.score}%` }}
          transition={{
            duration: 0.8,
            delay: 0.6 + index * 0.1,
            ease: [0.16, 1, 0.3, 1],
          }}
        />
        {/* Glow on high scores */}
        {isHigh && (
          <motion.div
            className="absolute inset-y-0 left-0 rounded-r-full opacity-40 blur-sm"
            style={{ backgroundColor: "var(--ac)" }}
            initial={{ width: 0 }}
            animate={{ width: `${item.score}%` }}
            transition={{
              duration: 0.8,
              delay: 0.6 + index * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
        )}
      </div>

      {/* Score */}
      <motion.span
        className={`w-8 text-right text-sm font-bold ${
          isHigh ? "text-foreground" : "text-foreground-sub"
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 + index * 0.1 }}
      >
        {item.score}
      </motion.span>
    </motion.div>
  );
}

export function MasterStack({ expertise }: MasterStackProps) {
  return (
    <motion.section
      className="rounded-r2 border border-border bg-background-card p-6"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      <h3 className="mb-6 text-xs font-semibold uppercase tracking-widest text-foreground-ghost">
        Master Stack
      </h3>

      <div className="flex flex-col gap-4">
        {expertise.map((item, i) => (
          <ExpertiseBar key={item.id} item={item} index={i} />
        ))}
      </div>
    </motion.section>
  );
}
