"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import type { Vouch } from "../types";

interface PeerVouchesProps {
  vouches: Vouch[];
}

function Initials({ name }: { name: string }) {
  const letters = name
    .split(" ")
    .map((w) => w[0])
    .join("");

  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-subtle text-sm font-bold text-accent">
      {letters}
    </div>
  );
}

function ScorePip({ score }: { score: number }) {
  return (
    <div className="flex items-center gap-1 rounded-r-full border border-glass-border bg-glass px-2 py-0.5">
      <div className="h-1.5 w-1.5 rounded-full bg-accent" />
      <span className="text-[11px] font-semibold text-foreground-sub">
        {score}
      </span>
    </div>
  );
}

export function PeerVouches({ vouches }: PeerVouchesProps) {
  return (
    <motion.section
      className="rounded-r2 border border-border bg-background-card p-6"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="mb-5 flex items-baseline justify-between">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-foreground-ghost">
          Peer Vouches
        </h3>
        <span className="text-sm text-foreground-sub">
          <span className="font-semibold text-foreground">{vouches.length}</span>{" "}
          verified
        </span>
      </div>

      <motion.div
        className="flex flex-col gap-4"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.12, delayChildren: 1.4 },
          },
        }}
      >
        {vouches.map((vouch) => (
          <motion.div
            key={vouch.id}
            className="group relative rounded-r border border-glass-border bg-glass p-4 backdrop-blur-sm transition-colors hover:bg-background-hover"
            variants={{
              hidden: { opacity: 0, x: 12 },
              visible: { opacity: 1, x: 0 },
            }}
          >
            <Quote
              size={14}
              className="absolute right-4 top-4 text-foreground-ghost/40"
            />

            {/* Author */}
            <div className="mb-3 flex items-center gap-3">
              <Initials name={vouch.creatorName} />
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-foreground">
                  {vouch.creatorName}
                </span>
                <span className="text-xs text-foreground-ghost">
                  {vouch.creatorHandle}
                </span>
              </div>
              <div className="ml-auto">
                <ScorePip score={vouch.creatorScore} />
              </div>
            </div>

            {/* Testimonial */}
            <p className="text-sm leading-relaxed text-foreground-sub">
              &ldquo;{vouch.testimonial}&rdquo;
            </p>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}
