"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Handshake, Zap, Clock, CheckCircle2, Send } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { ColabPitchModal } from "@/features/social/components/colab-pitch-modal";
import type { ColabProposal, HubUser } from "@/features/social/types";

interface ColabFeedProps {
  proposals: ColabProposal[];
  users: HubUser[];
  currentUser: HubUser;
}

const STATUS_META = {
  active: { icon: Zap, label: "Active", color: "text-success", bg: "bg-success/10" },
  pending: { icon: Clock, label: "Pending", color: "text-warning", bg: "bg-warning/10" },
  completed: { icon: CheckCircle2, label: "Completed", color: "text-info", bg: "bg-info/10" },
} as const;

const TABS = [
  { id: "all", label: "All Colabs" },
  { id: "active", label: "Active" },
  { id: "pending", label: "Open Pitches" },
] as const;

function ColabCard({
  proposal,
  index,
  currentUser,
}: {
  proposal: ColabProposal;
  index: number;
  currentUser: HubUser;
}) {
  const [showPitch, setShowPitch] = useState(false);
  const meta = STATUS_META[proposal.status];
  const StatusIcon = meta.icon;

  const fromHandle = proposal.from.handle.replace("@", "");
  const toHandle = proposal.to.handle.replace("@", "");

  // Can the current user pitch a colab inspired by this one?
  const isInvolved =
    currentUser.profile.handle === `@${fromHandle}` ||
    currentUser.profile.handle === `@${toHandle}`;

  return (
    <>
      <motion.article
        className="border-b border-border px-4 py-5 transition-colors hover:bg-background-card/50 sm:px-6"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.4,
          delay: index * 0.06,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {/* Status badge */}
        <div className="mb-3 flex items-center gap-2">
          <StatusIcon size={13} className={meta.color} />
          <span className={`text-xs font-medium ${meta.color}`}>
            {meta.label}
          </span>
          <span className="text-xs text-foreground-ghost">
            · {proposal.createdAt}
          </span>
        </div>

        {/* Creator connection */}
        <div className="flex items-center gap-3 mb-4">
          <Link href={`/creator/${fromHandle}`} className="shrink-0">
            <Avatar
              src={proposal.from.avatarUrl}
              alt={proposal.from.name}
              size="md"
              score={proposal.from.authorityScore}
            />
          </Link>
          <div className="flex items-center gap-2">
            <Link
              href={`/creator/${fromHandle}`}
              className="text-sm font-semibold text-foreground hover:underline"
            >
              {proposal.from.name}
            </Link>
            <Handshake size={14} className="text-accent" />
            <Link
              href={`/creator/${toHandle}`}
              className="text-sm font-semibold text-foreground hover:underline"
            >
              {proposal.to.name}
            </Link>
          </div>
        </div>

        {/* Vision */}
        <p className="text-sm leading-relaxed text-foreground mb-3">
          {proposal.vision}
        </p>

        {/* Skill synergies */}
        <div className="flex flex-wrap gap-2 mb-3">
          {proposal.skillSynergies.map((s) => (
            <span
              key={s}
              className="flex items-center gap-1 rounded-r-full border border-accent/20 bg-accent-subtle px-2.5 py-1 text-[10px] font-medium text-accent"
            >
              <Zap size={9} />
              {s}
            </span>
          ))}
        </div>

        {/* Action — inspire the viewer to pitch their own colab */}
        {!isInvolved && (
          <button
            onClick={() => setShowPitch(true)}
            className="flex items-center gap-1.5 rounded-r-full border border-accent/30 bg-accent-subtle px-4 py-1.5 text-[11px] font-semibold text-accent transition-all hover:bg-accent hover:text-white"
          >
            <Send size={11} />
            Pitch your own Colab
          </button>
        )}
      </motion.article>

      {!isInvolved && (
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
            name: proposal.to.name,
            handle: `@${toHandle}`,
            avatarUrl: proposal.to.avatarUrl,
            authorityScore: proposal.to.authorityScore,
            niche: "",
            colabInterests: [],
          }}
        />
      )}
    </>
  );
}

export function ColabFeed({ proposals, currentUser }: ColabFeedProps) {
  const [activeTab, setActiveTab] = useState<string>("all");

  const filtered =
    activeTab === "all"
      ? proposals
      : proposals.filter((p) => p.status === activeTab);

  return (
    <section>
      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="flex items-center justify-between px-4 pt-4 sm:px-6">
          <div className="flex items-center gap-2">
            <Handshake size={18} className="text-accent" />
            <h1 className="text-lg font-bold text-foreground">Colabs</h1>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="flex h-2 w-2 animate-pulse rounded-full bg-accent" />
            <span className="text-xs text-foreground-sub">
              {proposals.filter((p) => p.status === "active").length} active
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="mt-1 px-4 text-xs text-foreground-ghost sm:px-6">
          Where creators find their creative other half. Browse active
          collaborations or pitch your own.
        </p>

        {/* Tabs */}
        <div className="mt-3 flex">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex-1 px-4 py-3 text-xs font-medium transition-colors ${
                activeTab === tab.id
                  ? "text-foreground"
                  : "text-foreground-ghost hover:text-foreground-sub"
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="colabTab"
                  className="absolute bottom-0 left-1/4 right-1/4 h-0.5 rounded-full bg-accent"
                  transition={{
                    duration: 0.25,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Colab cards */}
      <div>
        {filtered.map((proposal, i) => (
          <ColabCard
            key={proposal.id}
            proposal={proposal}
            index={i}
            currentUser={currentUser}
          />
        ))}

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-foreground-ghost">
            <Handshake size={32} className="mb-3 text-border" />
            <p className="text-sm">No colabs in this category yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}
