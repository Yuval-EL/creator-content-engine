"use client";

import { motion } from "framer-motion";
import { TrendingUp, GitFork, Trophy } from "lucide-react";
import type { Playbook } from "@/features/playbooks/types";

interface TrendingPlaybooksProps {
  playbooks: Playbook[];
}

export function TrendingPlaybooks({ playbooks }: TrendingPlaybooksProps) {
  // Sort by remix count, take top 5
  const trending = [...playbooks]
    .sort((a, b) => b.remixCount - a.remixCount)
    .slice(0, 5);

  return (
    <motion.section
      className="rounded-r2 border border-border bg-background-card p-4"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <h3 className="mb-3 flex items-center gap-2 px-2 text-sm font-bold text-foreground">
        <TrendingUp size={14} className="text-accent" />
        Trending Playbooks
      </h3>
      <div className="flex flex-col gap-1">
        {trending.map((pb, i) => (
          <div
            key={pb.id}
            className="flex items-start gap-3 rounded-r p-2 transition-colors hover:bg-background-hover cursor-pointer"
          >
            <span className="mt-0.5 text-xs font-bold text-foreground-ghost">
              {i + 1}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium leading-snug text-foreground">
                {pb.title}
              </p>
              <div className="mt-1 flex items-center gap-3">
                <span className="flex items-center gap-1 text-xs text-foreground-ghost">
                  <GitFork size={11} />
                  {pb.remixCount.toLocaleString()} remixes
                </span>
                {pb.verifiedWins && pb.verifiedWins > 0 && (
                  <span className="flex items-center gap-1 text-xs text-warning">
                    <Trophy size={11} />
                    {pb.verifiedWins}
                  </span>
                )}
              </div>
              <p className="mt-0.5 text-xs text-foreground-ghost">
                by {pb.creator.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
