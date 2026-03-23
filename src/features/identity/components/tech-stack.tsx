"use client";

import { motion } from "framer-motion";
import { Cpu, Monitor, Sparkles } from "lucide-react";
import type { TechItem } from "../types";

interface TechStackProps {
  items: TechItem[];
}

const CATEGORY_ICON = {
  software: Monitor,
  hardware: Cpu,
  ai: Sparkles,
} as const;

export function TechStack({ items }: TechStackProps) {
  return (
    <motion.section
      className="rounded-r2 border border-border bg-background-card p-6"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
    >
      <h3 className="mb-5 text-xs font-semibold uppercase tracking-widest text-foreground-ghost">
        Tech Stack
      </h3>

      <motion.div
        className="flex flex-wrap gap-2"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.05, delayChildren: 1.1 },
          },
        }}
      >
        {items.map((item) => {
          const Icon = CATEGORY_ICON[item.category];
          return (
            <motion.div
              key={item.name}
              className="flex items-center gap-2 rounded-r-full border border-glass-border bg-glass px-4 py-2 text-sm backdrop-blur-sm transition-colors hover:bg-background-hover"
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: { opacity: 1, scale: 1 },
              }}
            >
              <Icon
                size={13}
                className={
                  item.category === "ai"
                    ? "text-accent"
                    : "text-foreground-ghost"
                }
              />
              <span className="text-foreground-sub">{item.name}</span>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.section>
  );
}
