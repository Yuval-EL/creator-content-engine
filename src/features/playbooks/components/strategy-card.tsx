"use client";

import { motion } from "framer-motion";
import { Play, Package, GitFork, Trophy } from "lucide-react";
import type { Playbook } from "../types";

interface StrategyCardProps {
  playbook: Playbook;
  index: number;
}

const ASSET_TYPE_LABELS: Record<string, string> = {
  prompt: "Prompt",
  preset: "Preset",
  template: "Template",
  lut: "LUT",
  script: "Script",
};

function summarizeAssets(assets: Playbook["assets"]): string {
  const counts: Record<string, number> = {};
  for (const a of assets) {
    const label = ASSET_TYPE_LABELS[a.type] ?? a.type;
    counts[label] = (counts[label] ?? 0) + 1;
  }
  return Object.entries(counts)
    .map(([label, count]) => `${count} ${label}${count > 1 ? "s" : ""}`)
    .join(" · ");
}

export function StrategyCard({ playbook, index }: StrategyCardProps) {
  return (
    <motion.article
      className="group flex cursor-pointer flex-col overflow-hidden rounded-r2 border border-border bg-background-card transition-colors hover:border-accent/20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
    >
      {/* Thumbnail */}
      <div
        className="relative flex h-44 items-center justify-center overflow-hidden"
        style={{ background: playbook.thumbnailGradient }}
      >
        {/* Play indicator */}
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-sm transition-transform group-hover:scale-110">
          <Play size={18} className="ml-0.5 text-white/70" />
        </div>

        {/* Duration */}
        <span className="absolute bottom-3 right-3 rounded-r-sm bg-black/50 px-2 py-0.5 text-xs font-medium text-white/80 backdrop-blur-sm">
          {playbook.duration}
        </span>

        {/* Category */}
        <span className="absolute left-3 top-3 rounded-r-sm bg-black/40 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-white/60 backdrop-blur-sm">
          {playbook.category}
        </span>

        {/* Success Credits trophy */}
        {playbook.verifiedWins && playbook.verifiedWins > 0 && (
          <span className="absolute right-3 top-3 flex items-center gap-1 rounded-r-sm border border-warning/20 bg-warning/15 px-2 py-0.5 backdrop-blur-sm">
            <Trophy size={11} className="text-warning" />
            <span className="text-[10px] font-semibold text-warning">
              {playbook.verifiedWins} Win{playbook.verifiedWins > 1 ? "s" : ""}
            </span>
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="text-base font-semibold leading-snug text-foreground group-hover:text-accent transition-colors">
          {playbook.title}
        </h3>

        <p className="line-clamp-2 text-sm leading-relaxed text-foreground-sub">
          {playbook.description}
        </p>

        {/* Creator pip */}
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent-subtle text-[10px] font-bold text-accent">
            {playbook.creator.authorityScore}
          </div>
          <span className="text-xs text-foreground-ghost">
            {playbook.creator.name}
          </span>
        </div>

        {/* Footer: Asset rack + Remixes */}
        <div className="mt-auto flex items-center justify-between border-t border-border pt-3">
          <div className="flex items-center gap-1.5 text-xs text-foreground-ghost">
            <Package size={12} />
            <span>{summarizeAssets(playbook.assets)}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-foreground-ghost">
            <GitFork size={12} />
            <span>{playbook.remixCount.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
