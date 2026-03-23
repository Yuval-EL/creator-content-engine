"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Crown, Users, Package, GitFork, Trophy, TrendingUp } from "lucide-react";
import type { HubUser } from "../types";

interface CreatorSidebarProps {
  users: HubUser[];
  stats: {
    activeCreators: number;
    publishedPlaybooks: number;
    totalRemixes: number;
    verifiedWins: number;
    avgAuthorityScore: number;
  };
}

function fmt(n: number): string {
  if (n >= 10000) return `${(n / 1000).toFixed(1)}k`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return n.toLocaleString();
}

export function CreatorSidebar({ users, stats }: CreatorSidebarProps) {
  const sorted = [...users].sort(
    (a, b) => b.profile.authorityScore - a.profile.authorityScore
  );

  return (
    <div className="flex flex-col gap-8">
      {/* Leaderboard */}
      <motion.section
        className="rounded-r2 border border-border bg-background-card p-6"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <h3 className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-foreground-ghost">
          <Crown size={13} className="text-warning" />
          Top Creators
        </h3>

        <div className="flex flex-col gap-2">
          {sorted.map((user, i) => {
            const handle = user.profile.handle.replace("@", "");
            const isTop3 = i < 3;

            return (
              <motion.div
                key={user.profile.id}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.3 + i * 0.06 }}
              >
                <Link
                  href={`/creator/${handle}`}
                  className="flex items-center gap-3 rounded-r p-2 transition-colors hover:bg-background-hover"
                >
                  {/* Rank */}
                  <span
                    className={`w-5 text-right text-xs font-bold ${
                      isTop3 ? "text-warning" : "text-foreground-ghost"
                    }`}
                  >
                    {i + 1}
                  </span>

                  {/* Score pip */}
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                      isTop3
                        ? "bg-accent-subtle text-accent"
                        : "bg-glass text-foreground-sub"
                    }`}
                  >
                    {user.profile.authorityScore}
                  </div>

                  {/* Info */}
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-foreground">
                      {user.profile.name}
                    </span>
                    <span className="text-[11px] text-foreground-ghost">
                      {user.profile.niche.split("&")[0].trim()}
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* Platform Stats */}
      <motion.section
        className="rounded-r2 border border-border bg-background-card p-6"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <h3 className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-foreground-ghost">
          <TrendingUp size={13} className="text-success" />
          Platform Pulse
        </h3>

        <div className="grid grid-cols-2 gap-4">
          {[
            { icon: Users, label: "Creators", value: fmt(stats.activeCreators), color: "text-accent" },
            { icon: Package, label: "Playbooks", value: fmt(stats.publishedPlaybooks), color: "text-info" },
            { icon: GitFork, label: "Remixes", value: fmt(stats.totalRemixes), color: "text-success" },
            { icon: Trophy, label: "Verified Wins", value: String(stats.verifiedWins), color: "text-warning" },
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
    </div>
  );
}
