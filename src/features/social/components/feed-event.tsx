"use client";

import { motion } from "framer-motion";
import { Heart, GitFork, Package, Trophy, Flame } from "lucide-react";
import type { FeedEvent } from "../types";
import Link from "next/link";

interface FeedEventCardProps {
  event: FeedEvent;
  index: number;
}

const TYPE_META: Record<
  FeedEvent["type"],
  { icon: typeof Heart; accent: string; border: string; bg: string; label: string }
> = {
  vouch: { icon: Heart, accent: "text-accent", border: "border-l-accent", bg: "bg-accent-subtle", label: "Vouch" },
  remix: { icon: GitFork, accent: "text-success", border: "border-l-success", bg: "bg-success/10", label: "Remix" },
  publish: { icon: Package, accent: "text-info", border: "border-l-info", bg: "bg-info/10", label: "Publish" },
  trophy: { icon: Trophy, accent: "text-warning", border: "border-l-warning", bg: "bg-warning/10", label: "Verified Win" },
  milestone: { icon: Flame, accent: "text-error", border: "border-l-error/70", bg: "bg-error/10", label: "Milestone" },
};

function Pip({ score, handle }: { score: number; handle: string }) {
  return (
    <Link
      href={`/creator/${handle}`}
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-subtle text-[10px] font-bold text-accent transition-transform hover:scale-110"
    >
      {score}
    </Link>
  );
}

export function FeedEventCard({ event, index }: FeedEventCardProps) {
  const meta = TYPE_META[event.type];
  const Icon = meta.icon;

  return (
    <motion.article
      className={`rounded-r border-l-[3px] ${meta.border} border border-glass-border bg-glass p-5 backdrop-blur-sm transition-colors hover:bg-background-hover`}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.06,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {/* Top row: type badge + timestamp */}
      <div className="mb-3 flex items-center justify-between">
        <div className={`flex items-center gap-2 ${meta.accent}`}>
          <div className={`flex h-6 w-6 items-center justify-center rounded-r-sm ${meta.bg}`}>
            <Icon size={13} />
          </div>
          <span className="text-[10px] font-semibold uppercase tracking-widest">
            {meta.label}
          </span>
        </div>
        <span className="text-xs text-foreground-ghost">{event.timeAgo}</span>
      </div>

      {/* Actors */}
      <div className="mb-2 flex items-center gap-2">
        <Pip score={event.actor.authorityScore} handle={event.actor.handle} />
        {event.target && (
          <>
            <span className="text-foreground-ghost">→</span>
            <Pip score={event.target.authorityScore} handle={event.target.handle} />
          </>
        )}
      </div>

      {/* Content */}
      <p className="text-sm leading-relaxed text-foreground">{event.content}</p>

      {/* Detail / quote */}
      {event.detail && (
        <p className="mt-2 border-l-2 border-border pl-3 text-xs leading-relaxed text-foreground-sub italic">
          {event.detail}
        </p>
      )}

      {/* Metrics badge */}
      {event.metrics && (
        <div className="mt-3 inline-flex items-center gap-2 rounded-r-sm border border-glass-border bg-glass px-3 py-1.5">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-foreground-ghost">
            {event.metrics.label}
          </span>
          <span className="text-sm font-bold text-foreground">
            {event.metrics.value}
          </span>
        </div>
      )}

      {/* Related playbook */}
      {event.relatedPlaybook && (
        <div className="mt-2 flex items-center gap-1.5 text-xs text-foreground-ghost">
          <Package size={11} />
          <span>{event.relatedPlaybook}</span>
        </div>
      )}
    </motion.article>
  );
}
