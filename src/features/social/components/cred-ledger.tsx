"use client";

import { motion } from "framer-motion";
import { Heart, GitFork, Trophy, Flame } from "lucide-react";
import type { CredTransaction } from "../types";

interface CredLedgerProps {
  transactions: CredTransaction[];
}

const TYPE_META: Record<
  CredTransaction["type"],
  { icon: typeof Heart; colorClass: string; bgClass: string }
> = {
  vouch: {
    icon: Heart,
    colorClass: "text-accent",
    bgClass: "bg-accent-subtle",
  },
  remix: {
    icon: GitFork,
    colorClass: "text-success",
    bgClass: "bg-success/10",
  },
  trophy: {
    icon: Trophy,
    colorClass: "text-warning",
    bgClass: "bg-warning/10",
  },
  milestone: {
    icon: Flame,
    colorClass: "text-info",
    bgClass: "bg-info/10",
  },
};

function daysAgo(dateStr: string): string {
  const diff = Math.floor(
    (Date.now() - new Date(dateStr).getTime()) / 86_400_000
  );
  if (diff === 0) return "Today";
  if (diff === 1) return "1d";
  return `${diff}d`;
}

function pointsLabel(points: number): string {
  if (points >= 100) return "high";
  if (points >= 40) return "mid";
  return "low";
}

export function CredLedger({ transactions }: CredLedgerProps) {
  return (
    <motion.section
      className="rounded-r2 border border-border bg-background-card p-6"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="mb-5 flex items-baseline justify-between">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-foreground-ghost">
          Cred Ledger
        </h3>
        <span className="text-sm text-foreground-sub">
          <span className="font-semibold text-foreground">
            +{transactions.reduce((s, t) => s + t.points, 0)}
          </span>{" "}
          this period
        </span>
      </div>

      <motion.div
        className="flex flex-col gap-3"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.06, delayChildren: 0.7 },
          },
        }}
      >
        {transactions.map((tx) => {
          const meta = TYPE_META[tx.type];
          const Icon = meta.icon;
          const tier = pointsLabel(tx.points);

          return (
            <motion.div
              key={tx.id}
              className="flex items-start gap-3 rounded-r border border-glass-border bg-glass p-3 backdrop-blur-sm transition-colors hover:bg-background-hover"
              variants={{
                hidden: { opacity: 0, x: 8 },
                visible: { opacity: 1, x: 0 },
              }}
            >
              {/* Icon */}
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-r-sm ${meta.bgClass}`}
              >
                <Icon size={14} className={meta.colorClass} />
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col gap-0.5">
                <p className="text-sm leading-snug text-foreground-sub">
                  {tx.description}
                </p>
                {tx.fromUser && (
                  <div className="flex items-center gap-1 text-[11px] text-foreground-ghost">
                    <span className="font-medium">{tx.fromUser.handle}</span>
                    <span>· Score {tx.fromUser.authorityScore}</span>
                  </div>
                )}
              </div>

              {/* Points + time */}
              <div className="flex shrink-0 flex-col items-end gap-0.5">
                <span
                  className={`text-sm font-bold ${
                    tier === "high"
                      ? "text-foreground"
                      : tier === "mid"
                        ? "text-foreground-sub"
                        : "text-foreground-ghost"
                  }`}
                >
                  +{tx.points}
                </span>
                <span className="text-[10px] text-foreground-ghost">
                  {daysAgo(tx.createdAt)}
                </span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.section>
  );
}
