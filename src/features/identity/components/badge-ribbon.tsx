"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import type { Badge } from "../types";

interface BadgeRibbonProps {
  badges: Badge[];
}

export function BadgeRibbon({ badges }: BadgeRibbonProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <motion.div
      className="flex flex-wrap gap-3"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.08, delayChildren: 0.6 } },
      }}
    >
      {badges.map((badge) => (
        <motion.div
          key={badge.id}
          className="relative"
          variants={{
            hidden: { opacity: 0, y: 8 },
            visible: { opacity: 1, y: 0 },
          }}
          onMouseEnter={() => setHoveredId(badge.id)}
          onMouseLeave={() => setHoveredId(null)}
        >
          {/* Badge pill */}
          <div
            className={`
              flex cursor-default items-center gap-2 rounded-r-full
              border border-glass-border px-4 py-2
              text-sm font-medium text-foreground-sub
              backdrop-blur-sm transition-all duration-200
              ${
                badge.glow
                  ? "border-accent/30 bg-accent-subtle shadow-[0_0_16px_rgba(108,99,255,0.12)] hover:shadow-[0_0_24px_rgba(108,99,255,0.2)]"
                  : "bg-glass hover:bg-background-hover"
              }
            `}
          >
            <ShieldCheck
              size={14}
              className={badge.glow ? "text-accent" : "text-foreground-ghost"}
            />
            <span className={badge.glow ? "text-foreground" : ""}>
              {badge.label}
            </span>
          </div>

          {/* Verified tooltip */}
          <AnimatePresence>
            {hoveredId === badge.id && (
              <motion.div
                className="absolute bottom-full left-1/2 z-50 mb-3 w-64 -translate-x-1/2 rounded-r border border-glass-border bg-background-card/80 px-4 py-3 shadow-lg backdrop-blur-xl"
                initial={{ opacity: 0, y: 4, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 4, scale: 0.96 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
              >
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-accent">
                  {badge.category}
                </p>
                <p className="text-sm leading-relaxed text-foreground">
                  {badge.proof}
                </p>
                {/* Tooltip arrow */}
                <div className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-b border-r border-glass-border bg-background-card/80" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </motion.div>
  );
}
