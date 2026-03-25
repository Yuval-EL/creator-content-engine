"use client";

import { motion } from "framer-motion";
import { Users, Package, GitFork, Trophy, Handshake, TrendingUp } from "lucide-react";

interface PlatformStatsProps {
  stats: {
    activeCreators: number;
    publishedPlaybooks: number;
    totalRemixes: number;
    verifiedWins: number;
    avgAuthorityScore: number;
    activeColabs?: number;
  };
}

function fmt(n: number): string {
  if (n >= 10000) return `${(n / 1000).toFixed(1)}k`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return n.toLocaleString();
}

export function CreatorSidebar({ stats }: PlatformStatsProps) {
  return (
    <motion.section
      className="rounded-r2 border border-border bg-background-card p-4"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <h3 className="mb-3 flex items-center gap-2 px-2 text-sm font-bold text-foreground">
        <TrendingUp size={14} className="text-success" />
        Platform Pulse
      </h3>

      <div className="grid grid-cols-2 gap-3 px-2">
        {[
          { icon: Users, label: "Creators", value: fmt(stats.activeCreators), color: "text-accent" },
          { icon: Package, label: "Playbooks", value: fmt(stats.publishedPlaybooks), color: "text-info" },
          { icon: GitFork, label: "Remixes", value: fmt(stats.totalRemixes), color: "text-success" },
          { icon: Trophy, label: "Wins", value: String(stats.verifiedWins), color: "text-warning" },
          ...(stats.activeColabs ? [{ icon: Handshake, label: "Colabs", value: String(stats.activeColabs), color: "text-accent" }] : []),
        ].map((stat) => (
          <div key={stat.label} className="flex flex-col gap-1">
            <stat.icon size={14} className={stat.color} />
            <span className="text-lg font-bold text-foreground">
              {stat.value}
            </span>
            <span className="text-[10px] font-medium uppercase tracking-widest text-foreground-ghost">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
