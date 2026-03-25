"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { UserPlus, Check } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import type { HubUser } from "../types";

interface WhoToFollowProps {
  users: HubUser[];
}

function FollowCard({ user }: { user: HubUser }) {
  const [following, setFollowing] = useState(false);
  const handle = user.profile.handle.replace("@", "");

  return (
    <div className="flex items-center gap-3 rounded-r p-2 transition-colors hover:bg-background-hover">
      <Link href={`/creator/${handle}`}>
        <Avatar
          src={user.profile.avatarUrl}
          alt={user.profile.name}
          size="md"
          score={user.profile.authorityScore}
        />
      </Link>
      <div className="min-w-0 flex-1">
        <Link href={`/creator/${handle}`}>
          <p className="truncate text-sm font-medium text-foreground hover:underline">
            {user.profile.name}
          </p>
          <p className="truncate text-xs text-foreground-ghost">
            {user.profile.niche.split("&")[0].trim()}
          </p>
        </Link>
      </div>
      <button
        onClick={() => setFollowing(!following)}
        className={`flex shrink-0 items-center gap-1 rounded-r-full px-3 py-1 text-xs font-semibold transition-all ${
          following
            ? "border border-border bg-transparent text-foreground-sub"
            : "bg-foreground text-background hover:opacity-90"
        }`}
      >
        {following ? (
          <>
            <Check size={12} />
            <span>Following</span>
          </>
        ) : (
          <>
            <UserPlus size={12} />
            <span>Follow</span>
          </>
        )}
      </button>
    </div>
  );
}

export function WhoToFollow({ users }: WhoToFollowProps) {
  // Show 3 random-ish users (skip the first one since they're "logged in")
  const suggestions = users.slice(1, 4);

  return (
    <motion.section
      className="rounded-r2 border border-border bg-background-card p-4"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
    >
      <h3 className="mb-3 px-2 text-sm font-bold text-foreground">
        Who to follow
      </h3>
      <div className="flex flex-col">
        {suggestions.map((user) => (
          <FollowCard key={user.profile.id} user={user} />
        ))}
      </div>
      <Link
        href="/leaderboard"
        className="mt-2 block px-2 text-xs text-accent hover:underline"
      >
        Show more
      </Link>
    </motion.section>
  );
}
