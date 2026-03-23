"use client";

import { motion } from "framer-motion";
import { Clock, FileText, Star, MessageCircle, Lightbulb } from "lucide-react";
import type { DirectorNote } from "../types";

interface DirectorNotesProps {
  notes: DirectorNote[];
}

const TYPE_META: Record<
  DirectorNote["type"],
  { icon: typeof Star; label: string; dotClass: string }
> = {
  praise: {
    icon: Star,
    label: "Praise",
    dotClass: "bg-success",
  },
  feedback: {
    icon: MessageCircle,
    label: "Feedback",
    dotClass: "bg-accent",
  },
  suggestion: {
    icon: Lightbulb,
    label: "Suggestion",
    dotClass: "bg-warning",
  },
};

function daysAgo(dateStr: string): string {
  const diff = Math.floor(
    (Date.now() - new Date(dateStr).getTime()) / 86_400_000
  );
  if (diff === 0) return "Today";
  if (diff === 1) return "1 day ago";
  return `${diff}d ago`;
}

export function DirectorNotes({ notes }: DirectorNotesProps) {
  return (
    <motion.section
      className="rounded-r2 border border-border bg-background-card p-6"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <h3 className="mb-5 text-xs font-semibold uppercase tracking-widest text-foreground-ghost">
        Director&apos;s Notes
        <span className="ml-2 text-foreground-sub">{notes.length} pinned</span>
      </h3>

      <motion.div
        className="flex flex-col gap-4"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.1, delayChildren: 0.5 },
          },
        }}
      >
        {notes.map((note) => {
          const meta = TYPE_META[note.type];
          const Icon = meta.icon;

          return (
            <motion.div
              key={note.id}
              className="group relative rounded-r border border-glass-border bg-glass p-4 backdrop-blur-sm transition-colors hover:bg-background-hover"
              variants={{
                hidden: { opacity: 0, y: 8 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              {/* Header row */}
              <div className="mb-2.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {/* Type dot */}
                  <div className={`h-2 w-2 rounded-full ${meta.dotClass}`} />
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-foreground-ghost">
                    {meta.label}
                  </span>
                </div>
                <span className="text-[11px] text-foreground-ghost">
                  {daysAgo(note.createdAt)}
                </span>
              </div>

              {/* Anchor — timestamp or asset */}
              {(note.timestamp || note.assetRef) && (
                <div className="mb-2 flex items-center gap-1.5">
                  {note.timestamp ? (
                    <>
                      <Clock size={12} className="text-accent" />
                      <span className="rounded-r-sm bg-accent-subtle px-1.5 py-0.5 font-mono text-xs font-medium text-accent">
                        {note.timestamp}
                      </span>
                    </>
                  ) : (
                    <>
                      <FileText size={12} className="text-accent" />
                      <span className="rounded-r-sm bg-accent-subtle px-1.5 py-0.5 text-xs font-medium text-accent">
                        {note.assetRef}
                      </span>
                    </>
                  )}
                </div>
              )}

              {/* Content */}
              <p className="text-sm leading-relaxed text-foreground-sub">
                &ldquo;{note.content}&rdquo;
              </p>

              {/* Author */}
              <div className="mt-3 flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent-subtle text-[9px] font-bold text-accent">
                  {note.author.authorityScore}
                </div>
                <span className="text-xs font-medium text-foreground">
                  {note.author.name}
                </span>
                <span className="text-xs text-foreground-ghost">
                  {note.author.handle}
                </span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.section>
  );
}
