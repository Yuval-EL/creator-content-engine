"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { HubUser } from "../types";

interface HubHeaderProps {
  users: HubUser[];
  currentHandle?: string;
}

export function HubHeader({ users, currentHandle }: HubHeaderProps) {
  const sorted = [...users].sort(
    (a, b) => b.profile.authorityScore - a.profile.authorityScore
  );

  return (
    <motion.header
      className="mb-10 flex flex-col gap-6"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Branding */}
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-baseline gap-3">
          <h1 className="text-xl font-bold tracking-tight text-foreground">
            The Hub
          </h1>
          <span className="hidden text-sm text-foreground-ghost sm:inline">
            Creative Reputation Layer
          </span>
        </Link>
      </div>

      {/* Creator avatars nav */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <Link
          href="/"
          className={`shrink-0 rounded-r border px-3 py-1.5 text-xs font-medium transition-colors ${
            !currentHandle
              ? "border-accent/30 bg-accent-subtle text-accent"
              : "border-glass-border bg-glass text-foreground-sub hover:bg-background-hover"
          }`}
        >
          Feed
        </Link>

        {sorted.map((user) => {
          const handle = user.profile.handle.replace("@", "");
          const isActive = currentHandle === handle;

          return (
            <Link
              key={user.profile.id}
              href={`/creator/${handle}`}
              className={`flex shrink-0 items-center gap-2 rounded-r border px-3 py-1.5 transition-colors ${
                isActive
                  ? "border-accent/30 bg-accent-subtle"
                  : "border-glass-border bg-glass hover:bg-background-hover"
              }`}
            >
              <div
                className={`flex h-6 w-6 items-center justify-center rounded-full text-[9px] font-bold ${
                  isActive
                    ? "bg-accent text-white"
                    : "bg-accent-subtle text-accent"
                }`}
              >
                {user.profile.authorityScore}
              </div>
              <span
                className={`text-xs font-medium ${
                  isActive ? "text-accent" : "text-foreground-sub"
                }`}
              >
                {user.profile.name.split(" ")[0]}
              </span>
            </Link>
          );
        })}
      </div>
    </motion.header>
  );
}
