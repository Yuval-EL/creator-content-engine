"use client";

import { motion } from "framer-motion";
import { Circle, CircleDot } from "lucide-react";
import type { VersionEntry } from "../types";

interface EvolutionTimelineProps {
  versions: VersionEntry[];
}

export function EvolutionTimeline({ versions }: EvolutionTimelineProps) {
  return (
    <motion.section
      className="rounded-r2 border border-border bg-background-card p-6"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <h3 className="mb-5 text-xs font-semibold uppercase tracking-widest text-foreground-ghost">
        Evolution Timeline
      </h3>

      <div className="relative flex flex-col">
        {/* Vertical branch line */}
        <div className="absolute bottom-4 left-[11px] top-4 w-px bg-border" />

        {versions.map((entry, i) => (
          <motion.div
            key={entry.version}
            className="relative flex gap-4 pb-6 last:pb-0"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.4,
              delay: 0.7 + i * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {/* Node */}
            <div className="relative z-10 mt-0.5 shrink-0">
              {entry.isCurrent ? (
                <CircleDot size={22} className="text-accent" />
              ) : (
                <Circle size={22} className="text-foreground-ghost/40" />
              )}
            </div>

            {/* Content */}
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-2">
                <span
                  className={`text-sm font-semibold ${
                    entry.isCurrent ? "text-foreground" : "text-foreground-sub"
                  }`}
                >
                  v{entry.version}
                </span>
                {entry.isCurrent && (
                  <span className="rounded-r-full bg-accent-subtle px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-accent">
                    Latest
                  </span>
                )}
                <span className="text-xs text-foreground-ghost">
                  {entry.date}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-foreground-sub">
                {entry.summary}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
