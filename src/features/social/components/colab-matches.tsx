"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Handshake, Zap } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import type { HubUser, ColabProposal } from "../types";
import { ColabPitchModal } from "./colab-pitch-modal";

interface ColabMatchesProps {
  users: HubUser[];
  currentUser: HubUser;
  activeColabs: ColabProposal[];
}

interface SkillMatch {
  user: HubUser;
  synergies: string[];
  matchScore: number;
}

function computeMatches(current: HubUser, others: HubUser[]): SkillMatch[] {
  return others
    .filter((u) => u.profile.id !== current.profile.id)
    .map((user) => {
      const synergies: string[] = [];
      let matchScore = 0;

      // Cross-reference expertise — complementary skills score higher
      for (const ce of current.expertise) {
        for (const ue of user.expertise) {
          if (ce.label === ue.label) {
            // Shared skills — mild synergy
            if (ce.score > 70 && ue.score > 70) {
              matchScore += 5;
            }
          }
        }
      }

      // Complementary niches score highest
      const cn = current.profile.niche.toLowerCase();
      const un = user.profile.niche.toLowerCase();
      const complementary = [
        ["film", "sound"],
        ["edit", "vfx"],
        ["ai", "visual"],
        ["story", "data"],
        ["photo", "edit"],
        ["brand", "audio"],
      ];
      for (const [a, b] of complementary) {
        if (
          (cn.includes(a) && un.includes(b)) ||
          (cn.includes(b) && un.includes(a))
        ) {
          matchScore += 20;
          synergies.push(
            `${a.charAt(0).toUpperCase() + a.slice(1)} + ${b.charAt(0).toUpperCase() + b.slice(1)}`,
          );
        }
      }

      // Colab interest overlap
      if (current.profile.colabInterests && user.profile.colabInterests) {
        for (const ci of current.profile.colabInterests) {
          for (const ui of user.profile.colabInterests) {
            if (
              ci
                .toLowerCase()
                .split(" ")
                .some((w) => w.length > 3 && ui.toLowerCase().includes(w))
            ) {
              matchScore += 10;
              if (synergies.length < 2) synergies.push(ui);
            }
          }
        }
      }

      return { user, synergies: synergies.slice(0, 2), matchScore };
    })
    .filter((m) => m.matchScore > 0)
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 3);
}

function ColabMatchCard({
  match,
  currentUser,
}: {
  match: SkillMatch;
  currentUser: HubUser;
}) {
  const [showPitch, setShowPitch] = useState(false);
  const handle = match.user.profile.handle.replace("@", "");

  return (
    <>
      <div className="flex items-start gap-3 rounded-r p-2 transition-colors hover:bg-background-hover">
        <Link href={`/creator/${handle}`} className="shrink-0">
          <Avatar
            src={match.user.profile.avatarUrl}
            alt={match.user.profile.name}
            size="md"
            score={match.user.profile.authorityScore}
          />
        </Link>
        <div className="min-w-0 flex-1">
          <Link href={`/creator/${handle}`}>
            <p className="truncate text-sm font-medium text-foreground hover:underline">
              {match.user.profile.name}
            </p>
          </Link>
          <div className="mt-1 flex flex-wrap gap-1">
            {match.synergies.map((s) => (
              <span
                key={s}
                className="flex items-center gap-0.5 rounded-r-full bg-accent-subtle px-2 py-0.5 text-[10px] font-medium text-accent"
              >
                <Zap size={8} />
                {s}
              </span>
            ))}
          </div>
          <button
            onClick={() => setShowPitch(true)}
            className="mt-1.5 flex items-center gap-1 rounded-r-full border border-accent/30 bg-accent-subtle px-3 py-1 text-[11px] font-semibold text-accent transition-all hover:bg-accent hover:text-white"
          >
            <Handshake size={11} />
            Pitch Colab
          </button>
        </div>
      </div>

      <ColabPitchModal
        isOpen={showPitch}
        onClose={() => setShowPitch(false)}
        from={{
          name: currentUser.profile.name,
          handle: currentUser.profile.handle,
          avatarUrl: currentUser.profile.avatarUrl,
          authorityScore: currentUser.profile.authorityScore,
          niche: currentUser.profile.niche,
          colabInterests: currentUser.profile.colabInterests,
        }}
        to={{
          name: match.user.profile.name,
          handle: match.user.profile.handle,
          avatarUrl: match.user.profile.avatarUrl,
          authorityScore: match.user.profile.authorityScore,
          niche: match.user.profile.niche,
          colabInterests: match.user.profile.colabInterests,
        }}
      />
    </>
  );
}

export function ColabMatches({
  users,
  currentUser,
  activeColabs,
}: ColabMatchesProps) {
  const matches = computeMatches(currentUser, users);

  return (
    <motion.section
      className="rounded-r2 border border-border bg-background-card p-4"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="mb-3 flex items-center gap-2 px-2">
        <Handshake size={14} className="text-accent" />
        <h3 className="text-sm font-bold text-foreground">Colab Matches</h3>
      </div>

      {/* Active colabs count */}
      {activeColabs.length > 0 && (
        <div className="mb-3 flex items-center gap-2 rounded-r border border-accent/20 bg-accent-subtle px-3 py-2 mx-2">
          <span className="flex h-2 w-2 rounded-full bg-accent animate-pulse" />
          <span className="text-[11px] font-medium text-accent">
            {activeColabs.length} active colab{activeColabs.length > 1 ? "s" : ""} on the platform
          </span>
        </div>
      )}

      <div className="flex flex-col">
        {matches.map((match) => (
          <ColabMatchCard
            key={match.user.profile.id}
            match={match}
            currentUser={currentUser}
          />
        ))}
      </div>

      {matches.length === 0 && (
        <p className="px-2 py-4 text-center text-xs text-foreground-ghost">
          Keep building your expertise to unlock colab suggestions.
        </p>
      )}
    </motion.section>
  );
}
