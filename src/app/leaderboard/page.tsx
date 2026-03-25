"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Crown, Trophy, GitFork } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { getAllUsers } from "@/features/social";

export default function LeaderboardPage() {
  const users = getAllUsers();
  const sorted = [...users].sort(
    (a, b) => b.profile.authorityScore - a.profile.authorityScore
  );

  return (
    <div className="min-w-0 flex-1 border-x border-border">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-border bg-background/80 px-4 py-4 backdrop-blur-md sm:px-6">
        <h1 className="flex items-center gap-2 text-lg font-bold text-foreground">
          <Crown size={18} className="text-warning" />
          Leaderboard
        </h1>
        <p className="text-xs text-foreground-ghost">
          Top creators by Authority Score
        </p>
      </div>

      {/* List */}
      <div className="flex flex-col">
        {sorted.map((user, i) => {
          const handle = user.profile.handle.replace("@", "");
          const isTop3 = i < 3;
          const totalRemixes = user.playbooks.reduce(
            (sum, pb) => sum + pb.remixCount,
            0
          );

          return (
            <motion.div
              key={user.profile.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Link
                href={`/creator/${handle}`}
                className="flex items-center gap-4 border-b border-border px-4 py-4 transition-colors hover:bg-background-card/50 sm:px-6"
              >
                {/* Rank */}
                <span
                  className={`w-8 text-center text-lg font-bold ${
                    isTop3 ? "text-warning" : "text-foreground-ghost"
                  }`}
                >
                  {i + 1}
                </span>

                {/* Avatar */}
                <Avatar
                  src={user.profile.avatarUrl}
                  alt={user.profile.name}
                  size="lg"
                  score={user.profile.authorityScore}
                />

                {/* Info */}
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-foreground">
                    {user.profile.name}
                  </p>
                  <p className="truncate text-xs text-foreground-ghost">
                    {user.profile.niche}
                  </p>
                  <div className="mt-1 flex items-center gap-4 text-xs text-foreground-ghost">
                    <span className="flex items-center gap-1">
                      <GitFork size={11} />
                      {totalRemixes.toLocaleString()} remixes
                    </span>
                    <span className="flex items-center gap-1">
                      <Trophy size={11} className="text-warning" />
                      {user.playbooks.reduce(
                        (sum, pb) => sum + (pb.verifiedWins ?? 0),
                        0
                      )}{" "}
                      wins
                    </span>
                  </div>
                </div>

                {/* Score badge */}
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-base font-bold ${
                    isTop3
                      ? "bg-accent text-white"
                      : "bg-accent-subtle text-accent"
                  }`}
                >
                  {user.profile.authorityScore}
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
